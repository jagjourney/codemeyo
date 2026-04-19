# Release Notes

Every CodeMeYo release, grouped by major-version series. For the canonical release-by-release log see [CHANGELOG.md](https://github.com/jagjourney/codemeyo/blob/main/CHANGELOG.md). The in-app **Help → Changelog** tab (since v1.5.9) also renders this live.

Summaries below; full details are in the CHANGELOG.

---

## v1.9.x — SaaS platform, accounts, admin panel

### v1.9.1 — 2026-04-19

Pipeline fixes and homepage CMS wiring.

- Android build no longer fails on duplicate `BuildTask` Kotlin classes left over from the `com.codemeyo.app` → `com.jagjourney.codemeyo` rename.
- `build-website` CI job passes `--ignore-platform-req=ext-sodium` so composer install works on AlmaLinux runners.
- `proguard-tauri.pro` updated to reference `com.jagjourney.codemeyo.TauriActivity`.
- Homepage `/` now renders from the `cms_pages` row with slug `home` when blocks are populated. Falls back to the static Blade template on fresh installs.
- SMTP "Send Test Email" header action on `/admin/settings` → Mail tab.

### v1.9.0 — 2026-04-19

Lays the full account + CMS + billing infrastructure. Bundle ID renamed. Remote PC Code teased.

- **Account system** — device-code login (like `gh auth login`), email + password, optional 2FA, verified email required for Pro. See [Account System](Account-System).
- **Remote PC Code (teaser)** — new Remote tab in sidebar + mobile nav. "Coming Soon" card. See [Mobile App → Remote PC Code](Mobile-App#remote-pc-code).
- **Authenticated auto-updater** — signed-in users pull from `codemeyo.com/api/v1/updater/latest/*`. See [Auto-Updater](Auto-Updater).
- **Opt-in usage telemetry** — anonymized call counts only, off by default, toggle in Settings → Privacy.
- **Admin panel** at `codemeyo.com/admin` with users, donations, subscriptions, entitlements, blog, CMS pages, feature flags, audit log, media library, and the block-based page builder. See [Admin Panel](Admin-Panel).
- **Donations** at `codemeyo.com/donate` via Stripe — one-time or monthly. See [Donations](Donations).
- **Bundle ID renamed** from `com.codemeyo.app` to `com.jagjourney.codemeyo`. App-data paths moved. See [Configuration → Application data location](Configuration#application-data-location).
- **Pricing page** at `/subscribe` shows App Store + Google Play badges only. Web Stripe Checkout for subscriptions removed — Pro is app-store-only.
- **Downloads gated** behind a free account now that source is closed.
- **Privacy + Terms** rewritten to reflect the new account model and "never sold, shared, or rented" data posture.
- **Apple IAP webhook** does real ES256 JWS verification with Apple Root CA G3 pinning, cert validity-window checks, bundleId + environment assertions, replay-guard ledger.
- **Google Play RTDN webhook** does RS256 JWT verification with JWKS caching, Pub/Sub service-account email match, packageName guard, replay protection.
- **Admin panel gated** to `role=admin` via `canAccessPanel()`. Banned users blocked from sign-in.
- **Download gate** at `/download/{platform}` — guests bounced to `/register`.
- Fixed: `/home` redirect after login (Fortify now → `/dashboard`).
- Fixed: `/dashboard/billing` no longer 500s for users without a Stripe customer record.

---

## v1.5.x — mobile, Git client, MCP registry expansion

Series of minor-release improvements across desktop and mobile.

- **v1.5.9** — In-app Changelog viewer under Help. Release notes surfaced in the auto-updater prompt.
- **v1.5.8** — Android builds dropped x86_64 (ARM only now). Cuts CI time ~50% and avoids a 2-hour Windows-side cross-compile hang.
- **v1.5.7** — Full Git client in the desktop app (branch picker, commit composer with amend, Fetch / Pull / Push, per-file stage/unstage/discard). Robust terminal CLI (`/project`, `/git`, `/chat`, `/mode`, `/strategy`, `/provider`, `/open`, `/version`). **25+ new MCP servers** added to the registry (Unreal Engine 5.7, Unity, Blender, Meshy, Leonardo.ai, Canva, Figma, Adobe Express, Stability AI, ElevenLabs, Runway, cPanel / WHM, Cloudflare, Vercel, Netlify, Railway, DigitalOcean, Supabase, Firebase, Notion, Linear, Jira, Asana, Google Calendar, Gmail, DALL·E, Perplexity, Stripe, Shopify, WordPress). Help search (Ctrl/Cmd+F) with term highlighting. Remove projects from the dropdown with an inline trash icon.
- **v1.5.6** — GitHub-style Git diff viewer split-pane. Click any file, see the colored diff live.
- **v1.5.5** — Homepage providers / MCP section styling fix.
- **v1.5.4** — **Deep Think state persists across app restarts** — all four proposal cards, every critique, synthesis, and phase indicator fully restored. Homepage refreshed to highlight all 8 LLM providers.
- **v1.5.3** — Mac build runner back online.
- **v1.5.2** — Windows installer actually appears on GitHub releases. Auto-updater detects Windows updates.
- **v1.5.1** — Folders render as folders in the file tree. File editor loads content on click. Conversations no longer crash with FOREIGN KEY constraint errors. New conversations from "+" button persist immediately. Windows CI cache moved to persistent `D:\codemeyo-cache` — subsequent Windows builds drop from ~32min to ~8min.
- **v1.5.0** — **Writable code editor.** Edit any file directly, auto-saves 1.5s after you stop typing or Ctrl+S immediately. 40+ languages, bracket colorization, minimap, find/replace, format-on-paste. Conversation rename (hover, pencil). Real folder icons, color-coded files. All AI responses now persist across restart (gap in save path for synthesis / some strategies). Linux CI time: **50 minutes → 6 minutes** (pre-built container image).

---

## v1.0.x — cross-platform CI/CD milestone

First 1.x releases: full 5-platform pipeline (Windows / macOS / Linux / iOS / Android) with strict semver.

- **v1.0.11 / v1.0.12** — Windows desktop no longer crashes on startup. A prior TLS-backend swap for Android cross-compilation broke Windows networking; now uses the right TLS per platform automatically.
- **v1.0.10** — Android cross-compile no longer fails on missing OpenSSL.
- **v1.0.9** — iOS signing works reliably in CI (keychain access for SSH-initiated builds).
- **v1.0.7** — Linux CI uses all available CPU cores. All jobs bumped to 2-hour timeout.
- **v1.0.5** — **Strict semver.** No more `1.0.012`. Tauri's updater requires valid semver.
- **v1.0.000** — iOS + Android CI/CD build. Full 5-platform pipeline.

---

## v0.2.x — mode/strategy redesign, conversation mode, mobile UI, iOS/Android init

- **v0.2.910** — Chat + Deep Think no longer scans codebase. Text-only `run_debate()` replaces `run_deepthink()` in Chat mode. All Chat-mode strategies are now completely tool-free.
- **v0.2.900** — iOS build support (aarch64-apple-ios with Rust 1.88). Android project initialized at `src-tauri/gen/android/`. Mobile capabilities config (no dialog/updater on mobile). `xcap`, screenshot, browser modules compile-gated off for mobile. Chat-mode project-context injection removed.
- **v0.2.515** — Chat + Deep Think / Consensus properly uses the strategy. Chat mode sends raw user message (no project-type / file-list context).
- **v0.2.510** — App crash on startup fixed. Reverted from rustls-tls to native-tls for desktop. Android uses rustls via target-specific config.
- **v0.2.505** — Grok "tool_choice but no tools" error in Chat mode fixed across all providers.
- **v0.2.500** — **Code / Chat + Strategy architecture** — two interaction modes (Code / Chat), four strategies (Single, Round Robin, Deep Think, Consensus). All strategies work with both modes.
- **v0.2.131** — Redesigned mode selector: Code and Chat as primary modes, strategy-only shown in Code. Title bar reflects both.
- **v0.2.130** — **Conversation Mode** with participant badges, turn indicators, round/free mode toggle. @mention autocomplete. Mobile responsive UI (bottom MobileNav tab bar, full-screen chat/settings/explorer on mobile, 44px touch targets, notch/home-bar padding). Android project scaffolded via `pnpm tauri android init`.
- **v0.2.0** — Conversation Mode first cut. "Chat" in mode selector (between Single and Round Robin).

---

## v0.1.x — foundations, 8 providers, MCP, browser debug, auto-update

- **v0.1.900** — Grok multi-agent `reasoningEffort` error fixed. Deep Think / Consensus synthesis plan now persisted as the assistant message content (was ephemeral UI state before).
- **v0.1.855** — All 8 providers seeded in the database on init. Fixed conversations-not-saving for Gemini / DeepSeek / Mistral / Ollama / Groq. `delete_conversation` Tauri command. Usage panel tracks all 8 providers.
- **v0.1.775** — File editor content load on click fixed. Directories no longer open as file tabs. "Does not support tools" Ollama error message.
- **v0.1.725** — Git tab no longer spawns cmd.exe windows on Windows (`CREATE_NO_WINDOW` flag). Git panel uses active project path dynamically. `read_file_content` + `write_file_content` Tauri commands.
- **v0.1.710** — Chat history persistence fixed (CSP was blocking Tauri IPC to `ipc.localhost`). FOREIGN KEY constraint issue on messages fixed. Ollama model auto-detection, tool-call fallback for models without `tool_calls` API. Smart error messages (OOM / model not found / rate limit / auth / billing / context length). DevTools in release builds (F12).
- **v0.1.360** — Ollama auto-detection via `localhost:11434/api/tags`. Dynamic model list instead of hardcoded.
- **v0.1.355** — **5 new LLM providers** — Gemini, DeepSeek, Mistral, Ollama, Groq. 8 total. 40+ models with April 2026 pricing. Coding-specific models (Grok Code Fast, Devstral 2, Codestral, Qwen 2.5 Coder, Code Llama, DeepSeek V3.2). Deep Think supports all 8 providers with best-model selection. Token overflow fix in debate/synthesis phases (30K proposal cap, 30K critique cap, 8K task-context cap, 8K analysis tool-result cap).
- **v0.1.8** — Deep Think token overflow hardening. Windows CI OOM fix.
- **v0.1.7** — Grok multi-agent model routes to `/v1/responses` correctly.
- **v0.1.6** — Grok 4.20 model family (Multi-Agent, Reasoning, Non-Reasoning variants — 2M context). Grok 4 Fast. Grok 4 at 256K.

Earlier pre-v0.1 releases are captured in the full [CHANGELOG.md](https://github.com/jagjourney/codemeyo/blob/main/CHANGELOG.md).

---

## Release cadence + semver

CodeMeYo follows strict [semantic versioning](https://semver.org/):

| Bump | When |
|---|---|
| **PATCH** (`x.y.Z`) | Bug fixes, typos, dependency bumps, docs |
| **MINOR** (`x.Y.0`) | New features, enhancements, non-breaking |
| **MAJOR** (`X.0.0`) | Breaking changes, architecture pivots |

Every tag has a corresponding CHANGELOG entry — we don't tag without one.

**Upcoming:**

- **v2.0.0** — the Remote PC Code unlock. When this ships, the Remote teaser becomes a real feature, Pro subscriptions go live on App Store + Play Store, and the "Coming Soon" banners come down. No ship date promised.

See [Roadmap](Roadmap) for what else is in flight.

---

## Related pages

- [CHANGELOG.md](https://github.com/jagjourney/codemeyo/blob/main/CHANGELOG.md) — the canonical list.
- [Roadmap](Roadmap) — what's next.
- [Getting Started](Getting-Started) — install the latest.
