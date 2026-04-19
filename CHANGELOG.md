# Changelog

All notable changes to CodeMeYo will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).
This project uses [Semantic Versioning](https://semver.org/).

---

## Versioning Rules

| Bump  | When to use | Example |
|-------|-------------|---------|
| **PATCH** (0.0.x) | Bug fixes, typos, dependency bumps, docs | v0.1.0 → v0.1.1 |
| **MINOR** (0.x.0) | New features, enhancements, non-breaking changes | v0.1.1 → v0.2.0 |
| **MAJOR** (x.0.0) | Breaking changes, major milestones, architecture rewrites | v0.2.0 → v1.0.0 |

**Every version tag MUST have a corresponding entry below before tagging.**

To release:
```bash
# 1. Update this file with what changed
# 2. Commit: git add CHANGELOG.md && git commit -m "Release v0.1.0"
# 3. Tag:    git tag v0.1.0
# 4. Push:   git push origin main --tags
```

---

## [1.9.2] - 2026-04-19

### Fixed
- **Sign-in now persists across app restarts.** If you signed in on 1.9.0 and had to re-enter your credentials every launch, that's fixed — your session is remembered.
- **Automatic data migration** for users updating from 1.5.x. If your API keys, conversations, or usage history appeared to be missing after the update, they're restored on the next launch.

---

## [1.9.1] - 2026-04-19

Small polish release on top of 1.9.0.

### Fixed
- Build + packaging fixes that affected some platforms in the previous release.

### Added
- A few small admin tooling improvements.

---

## [1.9.0] - 2026-04-19

Free accounts, a refreshed website, and a preview of what's coming next.

### Added
- **Free CodeMeYo accounts.** Sign in from the Account tab to get automatic updates and early access to new features. Your own API keys still stay on your device — nothing changes there.
- **Remote PC Code — Coming Soon.** A new tab in the app previews an upcoming feature that'll let you drive the desktop agent from your phone. Not live yet; sign in now to be among the first to try it.
- **Privacy-respecting telemetry (opt-in).** If you'd like to help us understand which providers and models get the most use, toggle it on in Settings → Privacy. Off by default. We never see prompts or code.
- **Refreshed donations page.** One-time or monthly options at codemeyo.com/donate.

### Changed
- **Bundle ID updated.** The app's internal identifier changed from `com.codemeyo.app` to `com.jagjourney.codemeyo`.
  - **Windows / Linux**: the installer updates in place. A one-time migration in 1.9.2 copies your settings, conversations, and API keys over automatically if anything landed in the wrong folder.
  - **macOS**: v1.9.0 may appear as a separate app alongside your existing install. Once you've confirmed everything carried over, you can delete the old icon.
- Website refresh at codemeyo.com with updated Privacy, Terms, and pricing information.

### Fixed
- Miscellaneous stability and login-flow fixes.

---

## [1.5.9] - 2026-04-18

### Added
- **In-app Changelog viewer** — A new "Changelog" tab under Help shows release notes for every version, fetched live from our public CHANGELOG. Current version is highlighted, older versions are collapsible, and you can search the whole history.
- **Release notes in the update prompt** — When the auto-updater detects a new version, you'll see what's actually changing before you click "Install".

### Improved
- Release notes are now backfilled all the way from v1.0.5, so every GitHub release page and every in-app changelog entry shows real, human-readable notes instead of "Release vX.X.X — see CHANGELOG.md".

---

## [1.5.8] - 2026-04-18

### Fixed
- **Android builds no longer time out.** The x86_64 Android variant was hanging for nearly two hours in the cross-compile step on Windows. Android APKs now build only for the ARM architectures real phones use (aarch64 + armv7), which is what the Play Store actually distributes. Cuts Android CI time roughly in half and avoids the hang entirely.

---

## [1.5.7] - 2026-04-18

### Added
- **Full Git client** — Branch picker with search (switch / create / delete branches, protected-branch guard on main/master), commit composer with optional "amend last commit", Fetch / Pull / Push toolbar, and inline per-file stage, unstage, and discard buttons on every changed file. Stage-all and Unstage-all toggles included.
- **Robust terminal CLI** — Slash commands that mirror the whole GUI: `/project list|add|rm|switch`, `/git status|checkout|commit|push|pull|fetch|...`, `/chat new|list|switch|rename|delete`, `/mode code|chat`, `/strategy single|roundrobin|deepthink|consensus`, `/provider <name>`, `/status`, `/open <file>`, `/version`, `/help`, `/clear`. Accepts both `/cmd` and `cmy cmd`. Type `/help` in the terminal to see everything.
- **25 new MCP servers** in the registry: **Unreal Engine 5.7**, Unity, Blender, Meshy AI, Leonardo.ai, Canva, Figma, Adobe Express, Stability AI, ElevenLabs, Runway, cPanel / WHM, Cloudflare, Vercel, Netlify, Railway, DigitalOcean, Supabase, Firebase, MongoDB, MySQL / MariaDB, Redis, Notion, Linear, Jira, Asana, Google Calendar, Gmail, OpenAI DALL·E, Perplexity, Stripe, Shopify, and WordPress.
- **Help search** — Ctrl/Cmd+F in the Help tab searches across every feature description with term highlighting.
- **Remove projects** — Inline trash icon on each project in the dropdown. Keeps files on disk; just removes the entry from CodeMeYo.

### Improved
- Project list is now sorted alphabetically everywhere it appears — dropdown, CLI, title bar.
- Terminal now runs shell commands in your active project's directory automatically (no more hardcoded paths).
- Terminal keeps command history — Up/Down arrows navigate through the last 200 commands. Ctrl+L clears the screen.
- Terminal reacts live when you switch the active project.
- Theme stays consistent — all the new Git controls respect your light/dark theme automatically.

---

## [1.5.6] - 2026-04-18

### Added
- **GitHub-style Git diff viewer** — Click any file in the Git tab and see its changes with line numbers, color-coded additions and removals, unchanged-line context, and collapsible per-file cards. Monospace rendering preserves whitespace exactly.

### Improved
- Git panel reorganized into a split layout — file list on the left, live diff viewer on the right.

---

## [1.5.5] - 2026-04-18

### Fixed
- The new LLM Providers and MCP Servers sections on codemeyo.com now render as proper cards matching the rest of the site's design (were unstyled in 1.5.4).

---

## [1.5.4] - 2026-04-18

### Added
- **Deep Think visual state persists across app restarts.** When you reopen a Deep Think conversation, all four proposal cards, every critique, the final synthesis, and the phase-progress indicator are fully restored — not just the text response.
- Homepage at codemeyo.com fully refreshed — all 8 LLM providers highlighted, 22+ MCP servers listed by category, Deep Think and Conversation Mode featured, iOS/Android availability called out, privacy and terms pages linked.

---

## [1.5.3] - 2026-04-18

### Fixed
- Mac build runner back online and healthy, restoring macOS + iOS CI builds.

---

## [1.5.2] - 2026-04-18

### Fixed
- **Windows installer now appears on GitHub releases.** Previous release published empty because Windows artifacts were written to a new D:\ cache location that the CI upload step didn't know about. Junction added so artifacts land where expected.
- **Auto-updater now detects Windows updates.** The `latest.json` published to GitHub now includes both Mac and Windows platform entries.

---

## [1.5.1] - 2026-04-18

### Fixed
- **Folders now render as folders** in the file tree — they were previously showing as generic files.
- **File editor loads file contents** when you click a file — was showing blank.
- **Conversations no longer crash with "FOREIGN KEY constraint failed"** when saving messages.
- **New conversations from the sidebar "+" button persist immediately** — previously they'd disappear on restart unless you sent a message first.

### Improved
- Windows CI cache moved to a persistent `D:\codemeyo-cache` — after the first warm-up, subsequent Windows builds drop from ~32 minutes to ~8 minutes.

---

## [1.5.0] - 2026-04-17

### Added
- **Writable code editor** — Edit any file directly in the app. Auto-saves 1.5 seconds after you stop typing, or Ctrl+S to save immediately. Supports 40+ languages with bracket colorization, minimap, find/replace, and format-on-paste.
- **Conversation rename** — Hover any conversation in the sidebar, click the pencil, rename inline.
- **Real folder icons in the file tree** — Closed folders vs open folders look different, color-coded files by extension (TypeScript blue, Rust orange, Python green, JSON yellow, images green, and more).

### Fixed
- **All AI responses now persist across app restarts** — Deep Think conversations with Claude, Grok, OpenAI, and Gemini no longer vanish when you close the app. The message-save path had gaps for synthesis responses and certain strategies.

### Improved
- **Linux CI time: 50 minutes → 6 minutes.** Pre-built container image with cached Rust toolchain and cargo registry volumes eliminates per-build package installs.

---

## [1.0.11 — 1.0.12] - 2026-04-17

### Fixed
- **Windows desktop app no longer crashes on startup.** A prior change to enable Android cross-compilation had swapped the TLS backend and broken Windows networking. Now uses the right TLS per platform automatically (native-tls on desktop, rustls on mobile builds).

---

## [1.0.10] - 2026-04-17

### Fixed
- Android cross-compilation no longer fails on missing OpenSSL.

---

## [1.0.9] - 2026-04-17

### Fixed
- iOS signing works reliably in CI — keychain access now configured correctly for SSH-initiated builds.

---

## [1.0.7] - 2026-04-17

### Improved
- Linux CI builds now use all available CPU cores on the build host.
- All CI jobs bumped to a 2-hour timeout (was 1 hour), accommodating cold-cache runs.

---

## [1.0.5] - 2026-04-17

### Changed
- **Version numbering fixed to strict semver.** No more leading zeros like `1.0.012` — the auto-updater requires valid semver to detect new releases.

---

## [1.0.000] - 2026-04-13

### Added
- **iOS CI/CD build** - Automatic iOS builds on Mac runner with codesign
- **Android CI/CD build** - Automatic Android builds on RV PC runner (Runner #6)
- Full 5-platform pipeline: Windows, macOS, Linux, iOS, Android

---

## [0.2.910] - 2026-04-13

### Fixed
- **Chat + Deep Think no longer scans codebase** - New text-only `run_debate()` replaces `run_deepthink()` for Chat mode. All analysis, debate, synthesis phases are pure conversation with zero file tools. Chat mode is completely tool-free across all strategies.

---

## [0.2.900] - 2026-04-13

### Added
- **iOS build support** - CodeMeYo compiles for aarch64-apple-ios with Rust 1.88
- **Android project initialized** - Tauri Android project at src-tauri/gen/android/
- **Mobile capabilities** - Separate permission config for iOS/Android (no dialog/updater)
- **Desktop-only gating** - xcap, screenshot, browser modules compile-gated for mobile
- **Mobile stubs** - Screenshot/browser commands return "not available" on mobile instead of crashing

### Changed
- CI/CD macOS runner switched from Homebrew Rust 1.94 to rustup Rust 1.88 (fixes iOS cross-compilation)
- CI/CD macOS before_script sets TMPDIR, IPHONEOS_DEPLOYMENT_TARGET, cargo/bin PATH priority
- Cargo.toml: xcap is the only desktop-only dependency, all others available on all platforms

### Fixed
- **Chat mode injected project context** - Chat mode now sends raw user message
- **Chat + Deep Think/Consensus ignored strategy** - Now routes correctly
- **All LLMs: skip tools/tool_choice when empty** - Fixes Grok "no tools specified" error in Chat mode
- **Mac runner disk full (249MB free)** - Cleaned to 32GB free

---

## [0.2.515] - 2026-04-13

### Fixed
- **Chat mode no longer injects project/coding context** - Chat mode now sends raw user message without project type, file list, or code context. LLMs treat conversations as genuine discussions, not coding tasks.
- **Chat + Deep Think/Consensus now uses the strategy** - Chat + Single asks only active provider. Chat + Deep Think/Consensus runs the full debate engine (parallel analysis, debate, synthesis) for multi-AI discussion. Chat + Round Robin runs sequential conversation.

---

## [0.2.510] - 2026-04-12

### Fixed
- **App crash on startup** - Reverted from rustls-tls back to native-tls for desktop builds. The rustls switch (for Android cross-compilation) broke TLS on Windows causing instant crash. Android will use rustls via target-specific config when mobile builds are ready.

---

## [0.2.505] - 2026-04-12

### Fixed
- **Grok "tool_choice but no tools" error in Chat mode** - All providers (Claude, Grok, OpenAI) now skip sending `tools` and `tool_choice` when the tools array is empty. Fixes conversation/chat mode crashing on Grok and potentially other providers.

---

## [0.2.500] - 2026-04-12

### Changed
- **Code/Chat + Strategy architecture** - Complete redesign of the mode system:
  - **Two interaction modes**: Code (autonomous agent) and Chat (interactive conversation)
  - **Four strategies**: Single, Round Robin, Deep Think, Consensus
  - **ALL strategies work with BOTH modes**: Chat + Deep Think = all AIs debate with you. Code + Deep Think = all AIs debate and execute autonomously.
  - Top bar: [Providers] | [Code/Chat] | [Strategy]
  - Title bar shows: "Chat | Deep Think" or "Code | Single" etc.
  - `interactionMode` stored separately from `agentMode` (both persisted)
  - Backend routes: chat -> conversation.rs, code -> agent loops as before

---

## [0.2.131] - 2026-04-12

### Changed
- **Redesigned mode selector** - Two primary modes: **Code** and **Chat**
  - **Code** mode: autonomous coding agent with strategy selector (Single, Round Robin, Deep Think, Consensus)
  - **Chat** mode: interactive multi-LLM conversation
  - Code strategies only shown when in Code mode (cleaner UI)
  - Deep Think and Consensus are execution strategies within Code, not separate top-level modes
- Title bar shows "Code - Single", "Code - Round Robin", "Code - Deep Think", "Chat" etc.

---

## [0.2.130] - 2026-04-12

### Added
- **Conversation Mode (complete)** - Interactive multi-LLM roundtable with full feature set:
  - ConversationView component with participant badges, turn indicators, round/free mode toggle
  - ConversationState in chatStore (participants, currentSpeaker, mode, turnCount)
  - @mention autocomplete in InputBar (type @ to mention specific AI, arrow keys to navigate, Enter to select)
  - Each LLM response saved as separate message with provider badge (persists across app restart)
  - "Execute Plan" button transitions from conversation to single-agent execution mode
  - Free mode: user picks which AI speaks next via provider buttons
  - Round mode: all enabled providers respond in sequence automatically
  - Token truncation for long conversations (keeps first + last 18 messages)
- **Mobile Responsive UI (Phase 2)** - all behind `@media (max-width: 768px)`, desktop untouched:
  - MobileNav bottom tab bar (Chat, Files, Git, Settings, More)
  - Sidebar hidden on mobile, MobileNav replaces it
  - StatusBar hidden on mobile
  - Full-screen chat, settings, explorer on mobile
  - Monaco editor hidden on mobile (fallback to pre blocks)
  - Terminal and browser debug panels hidden on mobile
  - Git panel simplified (no inline diffs)
  - Touch targets minimum 44px, safe area padding for notch/home bar
  - Mode selector compact layout on mobile
- **Android project initialized** via `pnpm tauri android init` (Phase 3 started)

---

## [0.2.0] - 2026-04-12

### Added
- **Conversation Mode** - New interactive multi-LLM chat mode where you debate with multiple AIs in real-time. Each enabled provider responds in sequence. You steer the discussion, then switch to Single/Deep Think to execute the plan.
- "Chat" button in mode selector (between Single and Round Robin)
- Conversation events: thinking indicators per provider, error handling per provider, accumulated multi-provider responses

### Changed
- Mode selector now shows 5 modes: Single, Chat, Round Robin, Deep Think, Consensus
- Title bar displays "Conversation" label when in Chat mode

---

## [0.1.900] - 2026-04-11

### Fixed
- **Grok multi-agent "reasoningEffort" error** - Removed unsupported `reasoning` parameter from Grok multi-agent Responses API calls. Deep Think and Consensus modes with Grok now work correctly
- **Deep Think/Consensus synthesis plan not saved** - The synthesized plan from multi-agent debate was only stored in ephemeral UI state and lost on app restart. Now persisted as the assistant message content in the database

---

## [0.1.855] - 2026-04-02

### Fixed
- **Conversations not saving for Gemini/DeepSeek/Mistral/Ollama/Groq** - Database only seeded 3 providers (Claude/Grok/OpenAI). Now seeds all 8 providers on init so messages persist for every LLM
- **Deleted conversations keep coming back** - `deleteConversation` only removed from local state, never called the backend. Added `delete_conversation` Tauri command that deletes conversation + all its messages from SQLite
- **Welcome screen only shows Claude/Grok/OpenAI badges** - Now dynamically shows all enabled providers
- **Usage panel only tracks 3 providers** - Updated colors, labels, session grid, and filter dropdown to include all 8 providers
- **Auto-updater** - Verified working, latest.json serves from GitHub. Will detect v0.1.855 on next launch

### Added
- `delete_conversation` Tauri command (deletes messages + conversation from DB)
- All 8 providers seeded in database on first run

---

## [0.1.775] - 2026-04-01

### Fixed
- **File editor shows blank content** - Clicking files in Explorer now loads content from disk via `read_file_content` Tauri command
- **Directories open as file tabs** - Clicking folders no longer opens blank editor tabs
- **"does not support tools" error** - Smart error message when Ollama model lacks tool calling support, suggests compatible models
- **Conversations not saving for new providers** - CSP fix in v0.1.710 enables all Tauri IPC calls including conversation persistence for all 8 providers

### Changed
- File explorer only opens actual files (files without extensions like Makefile/Dockerfile still open correctly)

---

## [0.1.725] - 2026-04-01

### Fixed
- **File Editor shows blank** - Files opened from Explorer now load content from disk via new `read_file_content` Tauri command
- **Git tab spawns cmd.exe windows** - Added `CREATE_NO_WINDOW` flag to all `Command::new` calls on Windows (git_ops + run_command)
- **Git panel hardcoded path** - Now uses the active project from project store instead of hardcoded path
- **Git panel crashes without project** - Shows "Select a project first" when no project is active

### Added
- `read_file_content` Tauri command for code editor file loading
- `write_file_content` Tauri command for editor save support

### Changed
- Help panel updated to list all 8 LLM providers with descriptions
- Git panel uses active project path dynamically

---

## [0.1.710] - 2026-04-01

### Fixed
- **Chat history not persisting** - CSP was blocking all Tauri IPC calls to `ipc.localhost`, causing every `invoke()` to silently fail. Added `connect-src` directive for `ipc:`, `http://ipc.localhost`, and `http://localhost:11434`
- **FOREIGN KEY constraint failed on messages** - `create_conversation` was fire-and-forget, so messages tried to save before the conversation existed in DB. Now properly awaited
- **usage_log missing task_ref column** - Added schema migration to add `task_ref` column to existing databases created before v0.1.355
- **Ollama model detection** - Uses Tauri backend command instead of browser fetch (CSP blocked localhost requests)
- **Ollama requires no API key** - Skip API key gate for Ollama in chat and health checks
- **Ollama tool calling** - Parse tool calls from JSON text/code fences for local models that don't use the tool_calls API
- **Smart error messages** - Translate raw API errors into human-readable messages (OOM, model not found, connection refused, rate limit, auth, billing, context length)

### Added
- DevTools support in release builds (F12 to open)
- Backend debug logging for create_conversation and save_message
- Ollama auto-detect models on Settings mount with Refresh button

---

## [0.1.360] - 2026-04-01

### Added
- **Ollama auto-detection** — Automatically discovers locally installed Ollama models via `localhost:11434/api/tags`
  - No more hardcoded model list — shows exactly what's installed on your machine
  - Custom models (like fine-tuned or Modelfile-based models) appear automatically
  - "Refresh" button in settings to re-scan for new models
  - Model size and parameter info displayed in descriptions
- Model count indicator in Ollama settings ("X models detected")

### Changed
- Ollama model list is now dynamic instead of static (was 6 hardcoded models)
- Ollama models auto-load on app startup during settings initialization

---

## [0.1.355] - 2026-04-01

### Added
- **5 New LLM Providers**: Google Gemini, DeepSeek, Mistral AI, Ollama (local), and Groq
  - 8 total providers now supported (up from 3)
  - Each with full tool calling, health checks, and token tracking
  - Ollama runs locally with no API key required
- **Google Gemini provider** with native Gemini API support (not OpenAI-compatible)
  - Supports functionDeclarations tool format, alternating role requirements, inlineData images
- **OpenAI-compatible provider reuse** - DeepSeek, Mistral, Ollama, and Groq all use a configurable base URL on the OpenAI client
- **Coding-specific models** for each provider:
  - Grok Code Fast, Devstral 2, Codestral, Qwen 2.5 Coder (Ollama), Code Llama (Ollama), DeepSeek V3.2
- **40+ models** across all providers with April 2026 pricing and specs
- New provider colors in dark and light themes
- Token usage tracking for all 8 providers
- Deep Think mode support for all 8 providers with best-model selection
- Internal feature comparison document (docs/FEATURE_COMPARISON.md)

### Fixed
- Deep Think token overflow crashing debate/synthesis phases
  - Proposals capped at 30K tokens, critiques at 30K, task context at 8K
  - Tool results in analysis phase capped at 8K tokens
  - Empty tools array sent in text-only debate/synthesis phases (saves thousands of tokens)
- CI/CD Windows build OOM (STATUS_STACK_BUFFER_OVERRUN) from Rustc compiling windows crate
  - Added CARGO_BUILD_JOBS=1 environment variable
  - Added cargo clean before builds
  - Added release profile: codegen-units=16, lto=false
- CI/CD deploy-website SSH key auth (gitlab-runner@s2 to codemez@s1)

### Changed
- Model registry updated to April 2026 latest for all providers
- Grok model IDs updated (grok-4.20-0309-reasoning, grok-4.1-fast-reasoning)
- OpenAI models updated (GPT-5.4 Mini/Nano, o3, o4-mini with correct pricing)
- Gemini models updated (2.5 Pro, 2.5 Flash, 2.5 Flash-Lite)
- DeepSeek updated to V3.2 (128K context, $0.28/$0.42)
- Mistral updated (Large 3, Medium 3.1, Small 4, Devstral 2, Ministral 3B)
- Groq updated (GPT-OSS 120B/20B, Llama 3.3 70B, Llama 4 Scout)
- Ollama defaults updated (llama3.1, qwen3, qwen2.5-coder, deepseek-r1)
- ModelSelector now only shows enabled providers (horizontal scroll for overflow)
- Token usage grid changed from 3 to 4 columns, hides unused providers
- Runner concurrency set to 2 for parallel CI jobs

---

## [0.1.8] - 2026-03-28

### Fixed
- Deep Think token overflow crashing debate/synthesis phases
- CI: Windows build OOM - single-job compilation + cargo clean

---

## [0.1.7] - 2026-03-20

### Fixed
- Grok multi-agent model (grok-4.20-multi-agent-beta-0309) now routes to xAI Responses API (`/v1/responses`) instead of Chat Completions — fixes "Multi Agent requests are not allowed on chat completions" error
- Health check also routes correctly per model type

---

## [0.1.6] — 2026-03-18

### Added
- Grok 4.20 model family: Multi-Agent, Reasoning, and Non-Reasoning variants (2M context)
- Grok 4 Fast Reasoning and Non-Reasoning models ($0.20/$0.50)
- Grok 4 (grok-4-0709) with 256K context
- Deep Think mode now uses Grok 4.20 Multi-Agent as flagship

### Changed
- Grok model registry expanded from 4 to 9 models
- Grok 3 moved to balanced tier (no longer flagship)

---

## [0.1.5] — 2026-03-18

### Fixed
- Auto-updater: download errors are now shown to the user instead of silently hiding the notification
- Auto-updater: added retry button when download/install fails
- CI/CD: pipeline now validates updater artifacts (signatures and bundles) exist before generating latest.json
- CI/CD: latest.json is no longer uploaded with empty signatures and incomplete URLs when signing key is missing

---

## [0.1.0] — 2026-03-16

### Added
- Multi-LLM agent core with OpenAI, Anthropic, Google Gemini, and Ollama providers
- Tauri 2 desktop app with React frontend and Rust backend
- Monaco code editor integration with syntax highlighting
- Terminal emulator (xterm.js) for agent command execution
- Browser automation tools: window listing, screenshot capture
- CDP (Chrome DevTools Protocol) integration for browser inspection
- SQLite database for conversation and project history
- Zustand state management for all frontend stores

### Added — MCP Integration (Phases 4A–4D)
- MCP server management: add, remove, start, stop, restart servers
- Stdio transport for local MCP servers (command + args)
- Streamable HTTP transport for remote MCP servers (URL + auth)
- Tool discovery and execution via JSON-RPC 2.0
- Activity logging for all MCP operations
- Server health monitoring with auto-reconnect
- MCP configuration persistence (JSON file)
- Environment variable resolution in server configs

### Added — MCP Phase 5A
- OS keychain integration (Windows Credential Manager / macOS Keychain / Linux Secret Service)
- `.mcpb` bundle installer with ZIP parsing and security validation
- OAuth 2.1 PKCE flow for authenticated MCP servers
- Resources primitive: list and read resources from MCP servers
- Prompts primitive: list, configure arguments, and render prompts
- MCP server registry browser with 12 curated official servers
- 6-tab MCP panel (Servers / Tools / Resources / Prompts / Bundles / Registry)

### Added — CI/CD
- GitLab CI/CD pipeline for Windows, macOS, and Linux builds
- Version-tag-only builds (no builds on regular pushes)
- Automatic GitLab release creation with changelog extraction

### Fixed
- xcap crate upgraded 0.0.14 → 0.9.1 for macOS compatibility

---

## [0.1.2] — 2026-03-16

### Added
- 12 new MCP servers in registry: Jira, Linear, Docker, Kubernetes, MongoDB, Redis, Discord, Microsoft Teams, Notion, Trello, AWS S3 (total: 24 servers)
- Auto-updater with signed releases via Tauri updater plugin
- Tauri signing key pair for cryptographic update verification
- Version number displayed in status bar next to "Powered by Jag Journey, LLC"
- Updater signature files (.sig) included in CI/CD build artifacts

### Changed
- CI/CD pipeline now signs all platform builds with TAURI_SIGNING_PRIVATE_KEY
- GitHub release sync now uploads updater bundles (.nsis.zip, .app.tar.gz, .AppImage.tar.gz) with signatures
- latest.json now includes cryptographic signatures for each platform

---

## [0.1.3] -- 2026-03-17

### Added
- Terminal `help`, `?`, and `/help` commands with full reference: built-in commands, 27 agent tools, agent modes, keyboard shortcuts, safety features
- Terminal welcome banner now shows "Type help or ? for command list"
- Browser extension (`extensions/codemeyo-bridge/`) bundled as Tauri resource, ships with installer
- Browser extension zip (`codemeyo-bridge-extension.zip`) uploaded to GitHub Releases for standalone download
- GitHub Wiki: Terminal Commands and Browser Debug Guide pages with sidebar navigation
- GitLab Wiki: Terminal Commands, Browser Debug Guide, and Home pages

### Fixed
- CDP browser launch now uses separate `--user-data-dir` so the debug instance starts independently even when Brave/Chrome is already running (previously, Chromium ignored `--remote-debugging-port` if an existing instance owned the profile)
- CDP launch pre-checks if port 9222 is already reachable before spawning a new browser
- CDP error message improved to guide users: "Click Launch to start a debug browser"
- Added `--no-first-run` and `--no-default-browser-check` flags to debug browser launch

### Changed
- CI/CD pipeline packages `extensions/codemeyo-bridge/` as a zip and uploads it alongside platform installers
- Terminal `clear` command now case-insensitive

---

## [Unreleased]

_Changes staged for the next release go here._
