# Frequently Asked Questions

---

### Is CodeMeYo free?

**Yes.** CodeMeYo is completely free and open source under the MIT license. There are no premium tiers, no feature gates, and no subscriptions. You will always have access to every feature at no cost.

If you find CodeMeYo useful and want to support development, donations are welcome at [jagjourney.ai/shop/codemeyo-donation](https://jagjourney.ai/shop/codemeyo-donation/).

---

### What LLMs does CodeMeYo support?

CodeMeYo supports six LLM providers:

| Provider | Models |
|---|---|
| **Anthropic (Claude)** | Opus 4.6, Sonnet 4.6, Haiku 4.5, Opus 4.5, Sonnet 4.5 |
| **OpenAI (GPT)** | GPT-5.4, GPT-4.1, GPT-4.1 Mini, GPT-4.1 Nano, o4-mini, GPT-5 Mini |
| **xAI (Grok)** | Grok 3, Grok Code Fast, Grok 4.1 Fast Reasoning, Grok 3 Mini |
| **Google (Gemini)** | Via OpenAI-compatible endpoint |
| **DeepSeek** | Via OpenAI-compatible endpoint |
| **Ollama** | Any locally hosted model |

New providers and models are added regularly as they become available.

---

### Do I need API keys?

**Yes, for cloud providers.** CodeMeYo uses a "bring your own key" model. You need to obtain an API key from each cloud LLM provider you want to use and enter it in Settings.

**No, for Ollama.** If you run models locally using [Ollama](https://ollama.com), no API key is needed.

You only need one working provider to use CodeMeYo. See the [Getting Started](Getting-Started) guide for links to obtain API keys.

---

### Is my data sent anywhere?

**No.** CodeMeYo is a local-first application:

- **API keys** are stored in your operating system's native keychain (Windows Credential Manager, macOS Keychain, Linux Secret Service). They are never stored in plaintext files.
- **Conversations** are stored in a local SQLite database on your machine.
- **Project files** are read locally and only sent to the LLM provider you choose when they are included as context for a task.
- **No telemetry.** CodeMeYo does not collect any usage data, analytics, or crash reports.
- **No server.** There is no CodeMeYo cloud service. The app communicates directly with LLM provider APIs.

The only outbound network requests are to the LLM provider APIs you have configured.

---

### What platforms are supported?

CodeMeYo runs on all major desktop operating systems:

| Platform | Formats |
|---|---|
| **Windows** | `.msi` installer, `.exe` installer |
| **macOS** | `.dmg` disk image |
| **Linux** | `.deb` (Debian/Ubuntu), `.rpm` (Fedora/RHEL), `.AppImage` (universal) |

System requirements: Windows 10+, macOS 11+, or a modern Linux distribution with WebKitGTK. See the [Getting Started](Getting-Started) guide for details.

---

### How do I report bugs?

Open an issue on GitHub: [github.com/jagjourney/codemeyo/issues/new](https://github.com/jagjourney/codemeyo/issues/new)

Please include:

1. **Steps to reproduce** the issue
2. **Expected behavior** vs. **actual behavior**
3. **Operating system** and version
4. **CodeMeYo version** (shown in the app title bar or Settings)
5. **Relevant error messages** or screenshots
6. **Log files** if applicable (see [Troubleshooting](Troubleshooting) for log locations)

---

### Can I contribute?

**Yes.** CodeMeYo welcomes contributions. The project uses:

- **Rust** for the backend (Tauri 2 + Tokio)
- **TypeScript/React** for the frontend
- **pnpm** as the package manager

See the [Contributing Guide](https://github.com/jagjourney/codemeyo/blob/main/CONTRIBUTING.md) for development setup instructions, project structure, coding guidelines, and how to add new LLM providers or agent tools.

---

### How does auto-update work?

CodeMeYo checks for new versions automatically when the app starts. When an update is available:

1. A notification appears with the new version number and changelog
2. You can choose to download and install the update
3. The app restarts with the new version

Updates are downloaded from the official GitHub Releases page. You can also manually download the latest version at any time from [github.com/jagjourney/codemeyo/releases/latest](https://github.com/jagjourney/codemeyo/releases/latest).

---

### Is CodeMeYo open source?

**Yes.** CodeMeYo is licensed under the [MIT License](https://github.com/jagjourney/codemeyo/blob/main/LICENSE), one of the most permissive open source licenses. You are free to use, modify, and distribute CodeMeYo for any purpose.

The source code is available at [github.com/jagjourney/codemeyo](https://github.com/jagjourney/codemeyo).

---

### How much does it cost to use the LLM APIs?

CodeMeYo itself is free. The LLM providers charge per token (input and output). Costs vary by model:

| Model | Input Cost (per 1M tokens) | Output Cost (per 1M tokens) |
|---|---|---|
| Claude Sonnet 4.6 | $3.00 | $15.00 |
| GPT-5.4 | $2.50 | $15.00 |
| Grok 3 | $3.00 | $15.00 |
| GPT-4.1 Nano | $0.20 | $0.80 |
| Grok 4.1 Fast Reasoning | $0.20 | $0.50 |

CodeMeYo tracks token usage and estimated cost per session in real time, shown in the usage panel.

For free local inference, use **Ollama** with open-weight models.

---

### Can I use CodeMeYo offline?

**Partially.** CodeMeYo itself runs entirely on your machine. However:

- **Cloud LLM providers** (Claude, GPT, Grok, Gemini, DeepSeek) require an internet connection.
- **Ollama** runs locally and works fully offline once models are downloaded.

All other features — the editor, terminal, file explorer, git panel — work without an internet connection.

---

### What is MCP and do I need it?

**MCP (Model Context Protocol)** is an open standard for connecting AI agents to external tools and data sources. It is optional — CodeMeYo works fully without any MCP servers.

MCP becomes useful when you want the agent to interact with external services like databases, APIs, or cloud platforms. See the [Features](Features#mcp-server-integration) page for details.

---

### How is CodeMeYo different from other coding assistants?

- **It acts, not advises.** CodeMeYo doesn't just suggest code — it reads your project, writes files, runs builds, fixes errors, and commits.
- **Multiple LLMs in one app.** Switch between providers freely, or use Deep Think to compare responses from all of them simultaneously.
- **Native desktop app.** Not a VS Code extension or web app. Runs as a native application with direct file system access.
- **Full MCP support.** Extend the agent's capabilities with any MCP-compatible server.
- **Privacy-first.** No accounts, no telemetry, no cloud storage. Your data stays on your machine.
