# Architecture

A technical overview of CodeMeYo's system design, from the Rust backend through the React frontend through the Laravel platform at codemeyo.com.

Source is **closed** but the architecture shape is worth documenting — both for future maintainers and for developers integrating with the public [Backend API](Backend-API).

---

## The full stack in one picture

```
+---------------------------------------------------------------------+
|                    User's machine / phone                            |
|                                                                      |
|  +---------------------+     +---------------------+                 |
|  |  Desktop app        |     |  Mobile app         |                 |
|  |  (Tauri 2)          |     |  (Tauri 2 mobile)   |                 |
|  |                     |     |                     |                 |
|  |  React 19 + TS      |     |  React 19 + TS      |                 |
|  |  Vite 7             |     |  Vite 7             |                 |
|  |  Tauri IPC          |     |  Tauri IPC          |                 |
|  |  Rust backend       |     |  Rust backend       |                 |
|  |                     |     |  (mobile-gated)     |                 |
|  +----------+----------+     +----------+----------+                 |
|             |                           |                            |
|             |                           |                            |
|   +---------+---------+       +---------+---------+                  |
|   | OS Keychain       |       | iOS Keychain /    |                  |
|   | (API keys)        |       | Android Keystore  |                  |
|   +-------------------+       +-------------------+                  |
+-----------+-----------------------------+---------------------------+
            |                             |
            | HTTPS (BYOK)               | HTTPS (BYOK)
            |                             |
            v                             v
     +-------------+               +-------------+
     | Claude API  |               | Claude API  |
     | OpenAI API  |               | OpenAI API  |
     | Grok / etc. |               | Grok / etc. |
     +-------------+               +-------------+
            |
            | Also: HTTPS w/ Sanctum bearer (cloud-backed features only)
            v
+---------------------------------------------------------------------+
|                    codemeyo.com — Laravel 12 + Filament v5          |
|                    (s1, behind Cloudflare)                           |
|                                                                      |
|  /               /dashboard        /admin           /api/v1          |
|  (marketing     (user area)       (Filament)       (REST API)       |
|   + CMS)                                                             |
|                                                                      |
|  +-------------------+  +-------------------+  +-------------------+ |
|  | Laravel Cashier   |  | Sanctum tokens    |  | Horizon queues    | |
|  | Stripe donations  |  | 2FA via Fortify   |  | Redis cache       | |
|  +-------------------+  +-------------------+  +-------------------+ |
|                                                                      |
|  MySQL 8 · Redis · S3/MinIO · Cloudflare R2 for assets               |
+---------------------------------------------------------------------+
            |                             |
            | Stripe webhooks             | Apple / Google RTDN
            v                             v
     +-------------+               +-------------+
     | Stripe      |               | App Store / |
     | (donations) |               | Play Store  |
     +-------------+               | (IAP)       |
                                   +-------------+
```

Two subsystems, connected by the REST API:

1. **The desktop + mobile app** — native binaries the user installs. Does the real work.
2. **The codemeyo.com platform** — Laravel + Filament stack handling accounts, billing, and the REST API.

Almost all LLM traffic is **direct from the app to the provider** — the codemeyo.com platform is never in that loop.

---

## Desktop + mobile app

### Frontend — React 19 + TypeScript

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 5.8 | Type-safe JS |
| **Vite** | 7 | Build + dev server |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **Zustand** | 5 | State management |
| **Monaco Editor** | 0.55 | Code editor (VS Code engine) — desktop only |
| **xterm.js** | 6 | Terminal emulator — desktop only |
| **react-markdown** | 10 | Markdown rendering in chat |
| **lucide-react** | — | Icons |

**Directory layout** (`src/`):

```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── account/           # Account sign-in / plan display
│   ├── agent/             # Agent activity panel
│   ├── browser/           # Browser automation UI
│   ├── chat/              # Chat interface + conversation mode
│   ├── editor/            # Monaco wrapper (desktop only)
│   ├── explorer/          # File tree
│   ├── git/               # Git client (diff, branches, stage/unstage)
│   ├── help/              # Help panel
│   ├── layout/            # Sidebar, title bar, layout
│   ├── mcp/               # MCP panel (6 tabs)
│   ├── remote/            # Remote PC Code (currently teaser)
│   ├── settings/          # Settings
│   ├── terminal/          # xterm.js (desktop only)
│   └── usage/             # Token usage + cost tracking
├── hooks/
├── lib/
├── stores/
│   ├── accountStore.ts    # Sign-in state + entitlements
│   ├── chatStore.ts       # Conversations, messages, streaming
│   ├── settingsStore.ts   # Providers, API keys, theme
│   ├── projectStore.ts    # Open project + indexing
│   ├── mcpStore.ts        # MCP servers
│   └── browserStore.ts    # CDP + extension state
└── styles/
```

**Mobile-specific behaviors** live behind `@media (max-width: 768px)`. Desktop-only components (Monaco, terminal, browser debug) are hidden at that breakpoint. Everything else uses the `<MobileNav>` bottom tab bar in place of the sidebar.

### Backend — Rust + Tauri 2

| Crate | Purpose |
|---|---|
| `tauri` 2 | Desktop framework, windowing, IPC |
| `tokio` 1 | Async runtime |
| `reqwest` 0.12 | HTTP client (LLM calls) |
| `rusqlite` 0.32 | SQLite — bundled, no external deps |
| `serde` / `serde_json` | Serialization |
| `rmcp` 1.2 | MCP client (stdio + HTTP) |
| `keyring` 3 | OS keychain |
| `xcap` 0.9 | Desktop-only — screenshots |
| `tokio-tungstenite` 0.24 | WebSocket (CDP) |
| `dashmap` 6 | Concurrent hash map |
| `tiny_http` 0.12 | Local HTTP (OAuth callback, extension bridge) |
| `base64`, `sha2`, `hex` | Crypto basics |
| `zip` 2 | `.mcpb` bundle extraction |
| `open` 5 | Open URLs in default browser |

**Directory layout** (`src-tauri/src/`):

```
src-tauri/src/
├── main.rs
├── lib.rs
├── agent/
│   ├── mod.rs           # Agent loop, system prompt, tool execution
│   └── deepthink.rs     # Deep Think multi-model analysis
├── llm/
│   ├── mod.rs           # LLMProvider trait, factory
│   ├── claude.rs        # Anthropic
│   ├── openai.rs        # OpenAI (also Gemini native + OpenAI-compatible providers)
│   └── grok.rs          # xAI (with /v1/responses routing for multi-agent)
├── tools/               # Built-in agent tools (27 total)
├── browser/             # CDP client + extension server (desktop only)
├── mcp/                 # MCP client, config, OAuth, bundles
├── db/                  # SQLite schema + migrations
└── commands/            # Tauri IPC command handlers
```

**Compile-time gating for mobile:** `src-tauri/Cargo.toml` uses target-specific features. On iOS and Android, `xcap`, screenshot commands, and browser debug are compiled out entirely. The rest of the app is the same binary logic.

### Agent loop

```
     User task
         |
         v
Build system prompt + tools (builtins + MCP)
         |
         v
Send to LLM provider ────> Text response ────> Done
         |                                       ^
         └──> ToolUse response                   |
                  |                              |
                  v                              |
             Validate permissions                |
                  |                              |
                  v                              |
             Execute tools (builtin in Rust,     |
             MCP over JSON-RPC)                  |
                  |                              |
                  v                              |
             Append results to messages ─────────┘
```

The loop continues until the LLM returns `Done`, a hard error, or the iteration cap (defaults to 50) is hit.

### LLM adapter pattern

Every provider implements:

```rust
#[async_trait]
pub trait LLMProvider: Send + Sync {
    async fn send(
        &self,
        messages: &[Value],
        system_prompt: &str,
        tools: &[Value],
    ) -> Result<LLMResponse, String>;

    fn provider_name(&self) -> &str;
    async fn health_check(&self) -> Result<bool, String>;
}
```

The factory routes model names to adapters:

- `claude-*` → Claude
- `gpt-*`, `o1-*`, `o3-*`, `o4-*`, `o5-*` → OpenAI
- `grok-*` → Grok (multi-agent variants go to `/v1/responses`, others to chat completions)
- Gemini uses its native adapter (not OpenAI-compatible) since v0.1.355
- DeepSeek, Mistral, Ollama, Groq use the OpenAI-compatible path with configurable base URL

Response normalization: every adapter returns one of `Text` / `ToolUse` / `Done` / `Error`. Format differences between providers (Anthropic uses content blocks, OpenAI uses delta chunks, Gemini uses function parts) all collapse into the same enum.

### MCP client

Wraps `rmcp` with two transports:

- **stdio** — spawns a child process with `tokio::process::Command`, wires stdin/stdout into the MCP JSON-RPC frame parser.
- **Streamable HTTP** — POSTs JSON-RPC frames to the server URL, handles SSE-style streaming responses.

Per-server lifecycle:

1. **Config load** — from `mcp_servers.json`.
2. **Start** — spawn process or open HTTP.
3. **Initialize** — JSON-RPC `initialize` handshake.
4. **Discovery** — `tools/list`, `resources/list`, `prompts/list`.
5. **Operation** — `tools/call` invocations from the agent.
6. **Health monitoring** — periodic `ping` with auto-reconnect.
7. **Shutdown** — graceful on app exit.

Tool merging: on every agent loop iteration, built-in tools + all MCP tools (namespaced by server) are sent to the LLM as one unified list.

### Local database

SQLite 3 via `rusqlite` with the `bundled` feature (statically links — no system SQLite dep).

Path:

| OS | Location |
|---|---|
| Windows | `%APPDATA%\com.jagjourney.codemeyo\codemeyo.db` |
| macOS | `~/Library/Application Support/com.jagjourney.codemeyo/codemeyo.db` |
| Linux | `~/.config/com.jagjourney.codemeyo/codemeyo.db` |

Stores: conversations, messages, settings, project history, MCP server state, usage events. Migrations auto-run on startup.

### IPC

React → Rust via Tauri's `invoke("command_name", {args})`. Rust → React via event emission (`app.emit("event", payload)`). Streaming LLM tokens, agent activity, MCP status changes all flow through events.

### Security boundaries

| Layer | Protection |
|---|---|
| API keys | OS keychain only — never in plaintext / DB / env |
| Sanctum tokens | Also OS keychain |
| CSP | Tauri-enforced — script / style sources locked down |
| IPC | Command allowlist — only declared commands callable from JS |
| Command exec | Dangerous-pattern blocklist + per-command timeout (max 600s) |
| Network | Direct HTTPS to providers + codemeyo.com only |
| MCP | Risk levels + OAuth 2.1 PKCE for auth'd servers |

---

## codemeyo.com platform

### Laravel 12 + Filament v5

Hosted on s1 behind Cloudflare (see `docs/PLAN_PHASE7_SAAS_PLATFORM.md`).

| Component | Purpose |
|---|---|
| **Laravel 12** | HTTP framework |
| **Filament v5** | Admin panel UI at `/admin` |
| **Fortify** | Auth (register / login / 2FA / email verification) |
| **Sanctum** | API bearer tokens for `/api/v1/*` |
| **Cashier (Stripe)** | Donation checkouts + webhooks |
| **Horizon** | Redis-backed queues (webhook processing, email, background jobs) |
| **MySQL 8** | Primary database |
| **Redis** | Cache + queues + sessions |
| **S3 / MinIO / R2** | Media library (via Storage in `/admin/settings`) |

### Surface areas

- `/` — marketing home (CMS-driven since v1.9.1 when `cms_pages.slug=home` exists; static Blade fallback otherwise).
- `/{slug}` — catch-all CMS route, see [CMS Page Builder](CMS-Page-Builder).
- `/register`, `/login`, `/forgot-password` — Fortify-backed auth.
- `/dashboard/*` — user area (overview, devices, usage, API tokens, pair, profile, billing).
- `/admin/*` — Filament panel for Jag Journey staff, see [Admin Panel](Admin-Panel).
- `/donate` — Stripe donations, see [Donations](Donations).
- `/subscribe` — App Store + Play Store badges only (no web Stripe checkout).
- `/api/v1/*` — public REST API, see [Backend API](Backend-API).
- `/api/webhooks/stripe` — donation webhook (outside `/api/v1` for historical reasons).

### Feature flags

Boolean toggles stored in the `feature_flags` table, used as route middleware (`->middleware('feature:<flag>')`). Flip at `/admin/feature-flags`. Current flags:

`donations_enabled`, `blog_enabled`, `public_api_docs`, `auto_updater`, `remote_pc_code_enabled` (off), `referral_credits` (off), `usage_cost_alerts` (off).

---

## How the two sides talk

The desktop + mobile app talks to codemeyo.com for **five things only**:

1. **Authentication** — `POST /api/v1/auth/*`.
2. **Entitlements check** — `GET /api/v1/entitlements` (cached 24h locally).
3. **Device registration** — `POST /api/v1/devices/register` on sign-in.
4. **Auto-update** — `GET /api/v1/updater/latest/*`, signed-in users only.
5. **Opt-in usage telemetry** — `POST /api/v1/usage/events`, anonymized counts only.

Everything else — LLM calls, file edits, agent loops, Deep Think, MCP — happens locally. We are never in the loop between the user and their LLM provider.

---

## CI/CD

GitLab CI on s1 runners + the JAGASUS-100 Windows/Android runner + the Mac runner. Tag-triggered only. Full 5-platform pipeline since v1.0.000:

- `.msi` + `.exe` for Windows
- `.dmg` for macOS (Apple Silicon + Intel)
- `.AppImage` + `.deb` + `.rpm` for Linux
- `.ipa` for iOS (signed, queued for TestFlight / App Store)
- `.apk` + `.aab` for Android (aarch64 + armv7 only since v1.5.8)

All binaries land on the **GitHub Releases** page (source stays closed on GitLab). The Laravel updater endpoint proxies to GitHub signed URLs.

Post-1.0 CI improvements:
- v1.5.0 — Linux container image with pre-cached Rust toolchain. 50min → 6min.
- v1.5.1 — Windows persistent cache on `D:\codemeyo-cache`. 32min → 8min.
- v1.5.8 — Dropped x86_64 Android. ~50% faster.

---

## Directory reference

| Path | Contents |
|---|---|
| `src/` | React frontend |
| `src-tauri/` | Rust backend |
| `src-tauri/gen/android/` | Tauri Android project (Gradle) |
| `src-tauri/gen/apple/` | Tauri iOS project (Xcode) |
| `extensions/codemeyo-bridge/` | Browser extension (Manifest V3) |
| `website-app/` | Laravel 12 + Filament v5 platform |
| `website-app/routes/` | api.php, web.php, dashboard.php |
| `website-app/app/Http/Controllers/Api/V1/` | REST API controllers |
| `website-app/app/Filament/Admin/` | Admin panel Resources + Pages |
| `website-app/resources/views/cms/blocks/` | CMS block templates |
| `docs/` | Internal planning docs (not shipped) |
| `wiki/` | This documentation |

---

## Related pages

- [Getting Started](Getting-Started) — install + first launch.
- [Configuration](Configuration) — every setting + app-data paths.
- [Backend API](Backend-API) — REST endpoints.
- [Admin Panel](Admin-Panel) — Filament surface.
- [Release Notes](Release-Notes) — what's shipped when.
