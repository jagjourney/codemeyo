# CodeMeYo

**Multi-LLM Autonomous Coding Agent** -- a native desktop app that reads your project, writes code, runs tests, fixes errors, and commits, all on its own.

CodeMeYo integrates **8 LLM providers** -- **Claude**, **Grok**, **GPT**, **Gemini**, **DeepSeek**, **Mistral**, **Ollama** (local), and **Groq** -- with full tool use and function calling support.

## What Makes CodeMeYo Different

- **It actually codes.** Give it a task and it reads your codebase, writes/edits files, installs deps, runs tests, fixes failures, commits, and pushes. Autonomously.
- **8 LLM providers, one app.** Pick one, rotate between them, or use all of them at once.
- **Conversation mode.** Chat with multiple AIs simultaneously in an interactive roundtable. You steer the discussion, @mention specific AIs, then hand off to execution.
- **Deep Think mode.** Send the same hard problem to multiple AIs, compare their approaches side-by-side, let them debate, and synthesize a combined solution.
- **Run models locally.** Ollama integration detects your installed models and runs them with zero API cost.
- **Visual debugging.** Screenshot a bug on your screen -- the agent sees it, reads the relevant code, fixes it, and verifies the fix.
- **You control the autonomy level.** From "ask me before every file edit" to "full autopilot, just get it done."

## Features

### 8 LLM Providers

| Provider | Models | Key Needed? |
|---|---|---|
| **Claude** (Anthropic) | Opus 4.6, Sonnet 4.6, Haiku 4.5 | Yes |
| **Grok** (xAI) | Grok 4.20 Multi-Agent, Code Fast, 4.1 Fast | Yes |
| **OpenAI** (GPT) | GPT-5.4, GPT-4.1, o3, o4-mini | Yes |
| **Gemini** (Google) | 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite | Yes |
| **DeepSeek** | V3.2, R1 Reasoner | Yes |
| **Mistral** | Large 3, Devstral 2, Codestral, Small 4 | Yes |
| **Ollama** (Local) | Auto-detects installed models | No |
| **Groq** | GPT-OSS 120B, Llama 3.3 70B, Llama 4 Scout | Yes |

### Agent Capabilities
- Read, write, edit, and search files across your project
- Run shell commands (build, test, lint, install deps)
- Git operations (add, commit, push, branch, checkout)
- Screenshot capture and visual debugging with annotation
- Project-aware context -- indexes your codebase and selects relevant files automatically

### Multi-Model Modes

| Mode | Description |
|---|---|
| **Single Agent** | One LLM does all the work |
| **Conversation** | Chat with multiple AIs interactively -- you steer the debate |
| **Round Robin** | LLMs take turns on each iteration |
| **Deep Think** | All analyze in parallel, debate, and synthesize |
| **Consensus** | Debate-driven consensus across multiple AIs |
| **Fallback** | If one API fails, auto-switch to the next |

### Terminal
- Built-in terminal with xterm.js (JetBrains Mono font)
- Type `help`, `?`, or `/help` for full command reference
- Run any shell command directly
- Watch agent commands execute in real time (yellow `[Agent]` prefix)
- Safety: 120s timeout, dangerous pattern blocking, 50KB output cap
- No visible cmd.exe windows on Windows (CREATE_NO_WINDOW)

### Browser Debug (3 levels)
- **Level 1 - Window Capture:** Zero setup, screenshot any browser window
- **Level 2 - CDP:** Full DevTools access (DOM, console, network, JS eval, click, type, navigate)
- **Level 3 - Extension:** Install CodeMeYo Bridge extension for live DOM mutations, localStorage, CSS injection
- Browser extension included at `extensions/codemeyo-bridge/`

### Code Editor
- Integrated Monaco code editor with syntax highlighting
- Click files in Explorer to open and view them
- Live diffs when agent writes or edits files
- Multiple file tabs with close/switch

### Interface
- Chat with real-time agent activity log
- File tree explorer with project indexing
- Git panel (status, branches, log) using active project path
- Terminal panel for command output
- Dark and light themes
- Keyboard shortcuts (Ctrl+N, Ctrl+K, Ctrl+E)
- Conversation search and export (Markdown/JSON)
- Conversation branching (fork to explore different approaches)
- Token usage and cost tracking per provider
- F12 DevTools support in release builds

### MCP (Model Context Protocol)
- Connect to external services via MCP servers
- Visual server management with status indicators
- Bundle manager for discovering and installing MCP servers
- Registry browser for official MCP repositories
- Tool, resource, and prompt template browsing
- Keychain storage for server secrets
- Supports stdio and HTTP transports

### Permission Levels

| Level | Behavior |
|---|---|
| Ask Every Time | Agent proposes each action, user approves |
| Auto-Read | Reads freely, asks before edits |
| Auto-All | Works autonomously, asks before push/delete |
| Full Auto | Complete autonomy -- maximum speed |

### Smart Error Messages
- Ollama: OOM (model too large for GPU), model not found, connection refused
- API providers: rate limit, auth failure, billing issues, context length exceeded
- Models without tool support: suggests compatible alternatives

## Tech Stack

- **Desktop Framework:** Tauri 2.x (Rust backend + React frontend)
- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Zustand
- **Backend:** Rust with reqwest, rusqlite, serde, tokio
- **Code Editor:** Monaco Editor
- **Terminal:** xterm.js
- **Database:** SQLite (local persistence)
- **Screenshot:** xcap crate (cross-platform)
- **MCP:** rmcp crate (Model Context Protocol client)

## Download

Download the latest release for your platform:

- **Windows:** [.exe installer](https://github.com/jagjourney/codemeyo/releases/latest)
- **macOS:** [.dmg](https://github.com/jagjourney/codemeyo/releases/latest)
- **Linux:** [.deb / .AppImage / .rpm](https://github.com/jagjourney/codemeyo/releases/latest)

Auto-updates are built in -- the app checks for new versions on launch.

## API Keys

You need your own API keys from one or more providers:

| Provider | Get Key | Pricing |
|---|---|---|
| Anthropic (Claude) | [console.anthropic.com](https://console.anthropic.com) | Pay-per-token |
| xAI (Grok) | [console.x.ai](https://console.x.ai) | Pay-per-token |
| OpenAI (GPT) | [platform.openai.com](https://platform.openai.com/api-keys) | Pay-per-token |
| Google (Gemini) | [ai.google.dev](https://ai.google.dev) | Pay-per-token / Free tier |
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com) | Pay-per-token |
| Mistral | [console.mistral.ai](https://console.mistral.ai) | Pay-per-token |
| Ollama (Local) | [ollama.com](https://ollama.com) | Free (runs on your hardware) |
| Groq | [console.groq.com](https://console.groq.com) | Pay-per-token |

Add your keys in Settings after launching the app. Ollama requires no key -- just install it and CodeMeYo auto-detects your models.

## Security

- API keys stored locally only -- never transmitted except to the respective provider
- No telemetry -- all data stays on your machine
- CSP headers enforced by Tauri
- Command sandboxing with configurable timeouts
- Local-only SQLite database
- No cmd.exe window flashing on Windows

## Documentation

- [Terminal Commands](https://github.com/jagjourney/codemeyo/wiki/Terminal-Commands) -- built-in commands, 27+ agent tools, agent modes
- [Browser Debug Guide](https://github.com/jagjourney/codemeyo/wiki/Browser-Debug-Guide) -- 3-level browser debugging setup and usage
- [Full Wiki](https://github.com/jagjourney/codemeyo/wiki)

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

Built by [Jag Journey, LLC](https://jagjourney.ai)
