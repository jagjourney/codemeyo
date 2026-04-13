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
