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
