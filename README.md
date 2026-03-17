# CodeMeYo

**Multi-LLM Autonomous Coding Agent** â€” a native desktop app that reads your project, writes code, runs tests, fixes errors, and commits, all on its own.

CodeMeYo integrates three of the most powerful LLMs â€” **Claude (Anthropic)**, **Grok (xAI)**, and **GPT (OpenAI)** â€” with full tool use / function calling support.

## What Makes CodeMeYo Different

- **It actually codes.** Give it a task and it reads your codebase, writes/edits files, installs deps, runs tests, fixes failures, commits, and pushes. Autonomously.
- **Three LLMs, one app.** Pick one, round-robin between them, or use all three at once.
- **Deep Think mode.** Send the same hard problem to all three simultaneously, compare their approaches side-by-side, pick the best one or synthesize a combined solution.
- **Visual debugging.** Screenshot a bug on your screen â€” the agent sees it, reads the relevant code, fixes it, and verifies the fix.
- **You control the autonomy level.** From "ask me before every file edit" to "full autopilot, just get it done."

## Features

### Agent Capabilities
- Read, write, edit, and search files across your project
- Run shell commands (build, test, lint, install deps)
- Git operations (add, commit, push, branch, checkout)
- Screenshot capture and visual debugging with annotation
- Project-aware context â€” indexes your codebase and selects relevant files automatically

### Multi-Model Modes
| Mode | Description |
|---|---|
| **Single Agent** | One LLM does all the work |
| **Round Robin** | LLMs take turns on each iteration |
| **Deep Think** | All 3 analyze in parallel, debate, and synthesize |
| **Consensus** | All 3 work in parallel, debate-based consensus |
| **Fallback** | If one API fails, auto-switch to the next |

### Terminal
- Built-in terminal with xterm.js (JetBrains Mono font)
- Type `help`, `?`, or `/help` for full command reference
- Run any shell command directly
- Watch agent commands execute in real time (yellow `[Agent]` prefix)
- Safety: 120s timeout, dangerous pattern blocking, 50KB output cap

### Browser Debug (3 levels)
- **Level 1 - Window Capture:** Zero setup, screenshot any browser window
- **Level 2 - CDP:** Full DevTools access (DOM, console, network, JS eval, click, type, navigate)
- **Level 3 - Extension:** Install CodeMeYo Bridge extension for live DOM mutations, localStorage, CSS injection
- Browser extension included at `extensions/codemeyo-bridge/`

### Interface
- Chat with real-time agent activity log
- Integrated Monaco code editor with live diffs
- File tree explorer with project indexing
- Git panel (status, branches, log)
- Terminal panel for command output
- Dark and light themes
- Keyboard shortcuts (Ctrl+N, Ctrl+K, Ctrl+E)
- Conversation search and export (Markdown/JSON)
- Conversation branching (fork to explore different approaches)

### Permission Levels
| Level | Behavior |
|---|---|
| Ask Every Time | Agent proposes each action, user approves |
| Auto-Read | Reads freely, asks before edits |
| Auto-All | Works autonomously, asks before push/delete |
| Full Auto | Complete autonomy â€” maximum speed |

## Tech Stack

- **Desktop Framework:** Tauri 2.x (Rust backend + React frontend)
- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Zustand
- **Backend:** Rust with reqwest, rusqlite, serde
- **Code Editor:** Monaco Editor
- **Database:** SQLite (local persistence)
- **Screenshot:** xcap crate (cross-platform)

## Prerequisites

- **Rust** (latest stable via [rustup](https://rustup.rs))
- **Node.js** 20+ and **pnpm** 9+
- **Tauri CLI:** `cargo install tauri-cli`
- Platform-specific:
  - **Windows:** Visual Studio C++ Build Tools, WebView2
  - **macOS:** Xcode Command Line Tools
  - **Linux:** `libwebkit2gtk-4.1-dev`, `libappindicator3-dev`, `librsvg2-dev`

## Getting Started

```bash
# Clone the repo
git clone <repo-url> codemeyo && cd codemeyo

# Install frontend dependencies
pnpm install

# Run in development mode (hot reload)
pnpm tauri dev

# Build for production
pnpm tauri build
```

## API Keys

You need your own API keys from one or more providers:

| Provider | Get Key | Pricing |
|---|---|---|
| Anthropic (Claude) | [console.anthropic.com](https://console.anthropic.com) | Pay-per-token |
| xAI (Grok) | [console.x.ai](https://console.x.ai) | Pay-per-token |
| OpenAI (GPT) | [platform.openai.com](https://platform.openai.com/api-keys) | Pay-per-token |

Add your keys in Settings after launching the app.

## Security

- API keys stored locally only â€” never transmitted except to the respective provider
- No telemetry â€” all data stays on your machine
- CSP headers enforced by Tauri
- Command sandboxing with configurable timeouts
- Local-only SQLite database

## Documentation

- [Terminal Commands](https://github.com/jagjourney/codemeyo/wiki/Terminal-Commands) -- built-in commands, 27 agent tools, agent modes
- [Browser Debug Guide](https://github.com/jagjourney/codemeyo/wiki/Browser-Debug-Guide) -- 3-level browser debugging setup and usage
- [Full Wiki](https://github.com/jagjourney/codemeyo/wiki)

## License

MIT License -- see [LICENSE](LICENSE) for details.
