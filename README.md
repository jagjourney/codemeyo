# CodeMeYo

**Multi-LLM Autonomous Coding Agent** — a native desktop app that reads your project, writes code, runs tests, fixes errors, and commits, all on its own.

CodeMeYo gives you **three ways to access the world's best coding models**:

1. **Direct** — bring your own API keys for **Claude**, **GPT**, **Grok**, **Gemini**, **DeepSeek**, **Mistral**, **Ollama** (local), and **Groq**.
2. **JagAI** — one credit balance, every top model. Buy credits at [codemeyo.com](https://codemeyo.com), no per-provider API keys required.
3. **SideKick** — use your existing **Claude Pro / Max** subscription via the Claude Code CLI. Zero extra cost on top of what you already pay Anthropic.

## What Makes CodeMeYo Different

- **It actually codes.** Give it a task and it reads your codebase, writes/edits files, installs deps, runs tests, fixes failures, commits, and pushes. Autonomously.
- **One app, every top model.** Pick one, rotate between them, or run them in parallel.
- **No API keys required (with JagAI).** Sign in to codemeyo.com, buy credits, and use Claude Opus 4.7, GPT-5.5, Grok 4.20, Gemini 3.1 Pro, DeepSeek V4, and Mistral with one balance. Three credit tiers (Spark / Nova / Apex) so cheap models cost less and flagships cost more.
- **Or use what you already have.** SideKick mode pipes your Claude Pro/Max subscription straight into the agent — no extra spend.
- **Conversation mode.** Chat with multiple AIs simultaneously in an interactive roundtable. You steer the discussion, @mention specific AIs, then hand off to execution.
- **Deep Think mode.** Send the same hard problem to multiple AIs, watch them debate each other's proposals, and synthesize a unified plan that's stronger than any one model alone.
- **Consensus mode.** Same multi-agent approach, but optimized for finding common ground instead of adversarial critique. Surfaces points of agreement and flags genuine dissent transparently.
- **Run models locally.** Ollama integration auto-detects your installed models and runs them at zero API cost.
- **Visual debugging.** Screenshot a bug on your screen — the agent sees it, reads the relevant code, fixes it, and verifies the fix.
- **Pair with your phone.** Type from your desktop, get a live mirror of every chat message on your phone. Or run the agent from anywhere.
- **You control the autonomy level.** From "ask me before every file edit" to "full autopilot, just get it done."

## Features

### LLM Lineup

CodeMeYo always tracks the latest flagship from every major provider. Current lineup:

| Provider | Recent flagships | Other tiers |
|---|---|---|
| **Claude** (Anthropic) | Opus 4.7, Opus 4.6 | Sonnet 4.6 (balanced), Haiku 4.5 (fast) |
| **OpenAI** (GPT) | GPT-5.5, GPT-5.4 | GPT-5.4 Mini, GPT-5.4 Nano, GPT-4.1, o3 |
| **Grok** (xAI) | Grok 4.20, Grok 4.20 Multi-Agent | Grok 4.20 Reasoning, Grok 4.1 Fast |
| **Gemini** (Google) | Gemini 3.1 Pro, Gemini 3 Flash | Gemini 3.1 Flash-Lite, 2.5 Pro / Flash / Flash-Lite |
| **DeepSeek** | DeepSeek V4 Pro | V4 Flash, Chat, Reasoner |
| **Mistral** | Mistral Large 3, Devstral 2 | Mistral Small 4, Medium 3.1, Codestral, Ministral 3B |
| **Groq** (fast inference) | GPT-OSS 120B, Llama 4 Scout | Qwen3 32B, Llama 3.3 70B, Llama 3.1 8B |
| **Ollama** (local) | Auto-detects every model you've installed | Free — runs on your hardware |

### JagAI — one balance, every model

Don't want to manage seven API keys? Pair CodeMeYo with **JagAI** at [codemeyo.com/dashboard/credits](https://codemeyo.com/dashboard/credits):

- **One balance, every top model.** Apex tier (Claude Opus 4.7, GPT-5.5, Grok 4.20 Multi-Agent, Gemini 3.1 Pro, DeepSeek V4 Pro). Nova tier (Sonnet 4.6, GPT-5.4 Mini, Grok 4.20, Gemini 2.5 Pro). Spark tier (Haiku 4.5, GPT-5.4 Nano, Grok 4.1 Fast, Gemini 2.5 Flash-Lite, DeepSeek V4 Flash).
- **Pay only for what you use.** 1 credit = $0.01. Spark = 5 credits / 1K tokens, Nova = 25, Apex = 100. No subscriptions.
- **Multi-agent flows just work.** Pick JagAI in Deep Think, Consensus, or Round Robin and CodeMeYo automatically fans out to whichever upstream models are configured. No need to wire up multiple direct keys.
- **Credits expire 360 days from purchase if unused** (oldest used first). Honest in-app expiration warnings — no surprise burn.

### SideKick — use your Claude subscription

Already paying Anthropic for Claude Pro or Max? **SideKick mode** uses your existing subscription via the Claude Code CLI:

- **Zero per-call cost.** Usage bills against your existing Claude plan, not a separate CodeMeYo balance.
- **Same model access.** Whatever your plan unlocks (Opus, Sonnet, Haiku) is what CodeMeYo runs.
- **Just sign in to Claude Code once.** CodeMeYo detects the CLI and uses it transparently.

### Multi-Model Modes

| Mode | Description |
|---|---|
| **Single Agent** | One LLM does all the work |
| **Conversation** | Chat with multiple AIs interactively — you steer the debate |
| **Round Robin** | LLMs take turns on each iteration |
| **Deep Think** | All analyze in parallel, debate, and synthesize a unified plan |
| **Consensus** | Reconciliation flow — agents converge on common ground, dissent surfaced transparently |
| **Fallback** | If one API fails, auto-switch to the next |

### Agent Capabilities

- Read, write, edit, and search files across your project
- Run shell commands (build, test, lint, install deps)
- Git operations (add, commit, push, branch, checkout)
- Screenshot capture and visual debugging with annotation
- Project-aware context — indexes your codebase and selects relevant files automatically

### Pair with Your Phone (Mobile Remote Control)

- Scan a QR code from your desktop to pair your phone
- Type messages from your desktop, see them on your phone in real time
- Watch the agent's thinking, file edits, and tool calls live from anywhere
- Bidirectional mirror — what you see on the desktop, you see on the phone

### Terminal

- Built-in terminal with xterm.js (JetBrains Mono font)
- Type `help`, `?`, or `/help` for full command reference
- Run any shell command directly
- Watch agent commands execute in real time (yellow `[Agent]` prefix)
- Safety: 120s timeout, dangerous pattern blocking, 50KB output cap
- No visible cmd.exe windows on Windows

### Browser Debug (3 levels)

- **Level 1 — Window Capture:** Zero setup, screenshot any browser window
- **Level 2 — CDP:** Full DevTools access (DOM, console, network, JS eval, click, type, navigate)
- **Level 3 — Extension:** Install CodeMeYo Bridge extension for live DOM mutations, localStorage, CSS injection
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
- Conversation search and export (Markdown / JSON)
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
| Full Auto | Complete autonomy — maximum speed |

### Smart Error Messages

- Ollama: OOM (model too large for GPU), model not found, connection refused
- Direct providers: rate limit, auth failure, billing issues, context length exceeded
- JagAI: insufficient credits prompts inline buy link, missing-key for upstream surfaces clearly
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
- **JagAI backend:** Laravel 11 / Cashier / Sanctum at codemeyo.com (cloud-hosted, optional)

## Download

Download the latest release for your platform:

- **Windows:** [.exe installer](https://github.com/jagjourney/codemeyo/releases/latest)
- **macOS:** [.dmg](https://github.com/jagjourney/codemeyo/releases/latest)
- **Linux:** [.deb / .AppImage / .rpm](https://github.com/jagjourney/codemeyo/releases/latest)
- **iOS / Android:** Coming soon — pair your phone with your desktop today as the next-best thing.

Auto-updates are built in — the app checks for new versions on launch.

## How to Pay for Models

Pick whichever fits your workflow. You can mix and match — e.g. run Deep Think on JagAI while keeping a direct Anthropic key for SideKick.

| Path | What you do | Cost model |
|---|---|---|
| **JagAI** | Sign in at [codemeyo.com](https://codemeyo.com), buy a credit pack | Pay-as-you-go credits (1 credit = $0.01); 360-day expiration |
| **SideKick** | Install the Claude Code CLI and sign in | Bills against your Claude Pro / Max subscription |
| **Direct keys** | Add your own provider keys in Settings | Pay-per-token at the provider's published rate |
| **Ollama** | Install Ollama and pull models | Free — runs on your hardware |

### Direct Provider Keys (Optional)

If you'd rather use your own keys instead of JagAI:

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

Add your keys in Settings after launching the app. Ollama and SideKick require no key.

## Security

- API keys stored locally only — never transmitted except to the respective provider
- JagAI auth uses session-bound bearer tokens (Sanctum) — no plaintext keys ever leave your machine for upstream providers
- No telemetry — all data stays on your machine
- CSP headers enforced by Tauri
- Command sandboxing with configurable timeouts
- Local-only SQLite database
- No cmd.exe window flashing on Windows

## Documentation

- [Terminal Commands](https://github.com/jagjourney/codemeyo/wiki/Terminal-Commands) — built-in commands, agent tools, agent modes
- [Browser Debug Guide](https://github.com/jagjourney/codemeyo/wiki/Browser-Debug-Guide) — 3-level browser debugging setup and usage
- [Full Wiki](https://github.com/jagjourney/codemeyo/wiki)

## Support

- **Issues / bugs:** [GitHub Issues](https://github.com/jagjourney/codemeyo/issues)
- **Contact:** [codemeyo.com/contact](https://codemeyo.com/contact)
- **Manage credits / account:** [codemeyo.com/dashboard](https://codemeyo.com/dashboard)

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [Jag Journey, LLC](https://jagjourney.ai)
