# Features

A comprehensive reference of everything CodeMeYo can do.

---

## Multi-LLM Support

CodeMeYo integrates with six LLM providers through a unified adapter system. Each provider implements the same `LLMProvider` trait, normalizing tool calling and response handling across all models.

### Supported Providers

| Provider | Models | Tool Calling | Streaming |
|---|---|---|---|
| **Anthropic (Claude)** | Opus 4.6, Sonnet 4.6, Haiku 4.5, Opus 4.5, Sonnet 4.5 | Yes | Yes |
| **OpenAI (GPT)** | GPT-5.4, GPT-4.1, GPT-4.1 Mini, GPT-4.1 Nano, o4-mini, GPT-5 Mini | Yes | Yes |
| **xAI (Grok)** | Grok 3, Grok Code Fast, Grok 4.1 Fast Reasoning, Grok 3 Mini | Yes | Yes |
| **Google (Gemini)** | Gemini models via OpenAI-compatible API | Yes | Yes |
| **DeepSeek** | DeepSeek models via OpenAI-compatible API | Yes | Yes |
| **Ollama** | Any locally hosted model | Yes | Yes |

### Multi-Model Modes

CodeMeYo supports five distinct operating modes:

| Mode | How It Works |
|---|---|
| **Single Agent** | One LLM handles the entire task from start to finish |
| **Round Robin** | LLMs take turns on each iteration of the agent loop |
| **Deep Think** | All enabled LLMs analyze the problem in parallel; their responses are compared and the best approach is synthesized |
| **Consensus** | All LLMs work in parallel with debate-based consensus to arrive at a solution |
| **Fallback** | If one provider's API fails or is rate-limited, automatically switches to the next available provider |

**Deep Think mode** automatically uses each provider's most capable model (Claude Opus 4.6, GPT-5.4, Grok 3) regardless of the user's model selection, ensuring the highest quality analysis.

---

## Autonomous Coding Agent

The core of CodeMeYo is its agent loop — an autonomous system that plans, executes, verifies, and self-corrects.

### The Agent Loop

```
User Task
    |
    v
[1. Explore] -- Read files, index project, understand codebase
    |
    v
[2. Plan]    -- Determine approach, identify files to modify
    |
    v
[3. Execute] -- Write/edit files, install deps, run commands
    |
    v
[4. Verify]  -- Run tests, builds, lint checks
    |            |
    |        [Pass] --> [5. Summarize] --> Done
    |            |
    |        [Fail] --> Read errors --> Back to [3. Execute]
    |                   (up to 5 retries per command)
    v
[6. Commit]  -- Git add, commit (if requested)
```

### Self-Correction Protocol

When a build, test, or lint command fails, the agent does not give up. It:

1. Reads the error output carefully
2. Identifies the root cause from error messages
3. Fixes the code using its file editing tools
4. Re-runs the failing command to verify the fix
5. Repeats up to 5 times per command before asking for human help

### Agent Tools

The agent has access to a comprehensive set of built-in tools:

| Tool | Description |
|---|---|
| **ReadFile** | Read the contents of any file in the project |
| **WriteFile** | Create new files or overwrite existing ones |
| **EditFile** | Make targeted edits by replacing specific strings |
| **SearchFiles** | Find files by name or glob pattern |
| **SearchContent** | Search file contents with regex patterns |
| **ListDir** | List directory contents with metadata |
| **RunCommand** | Execute shell commands (build, test, install, etc.) |
| **GitOps** | Git operations — add, commit, push, branch, checkout, status, log |
| **CaptureScreenshot** | Capture the user's screen for visual debugging |
| **ProjectIndex** | Analyze and index the project structure |

### Permission Levels

You control how much autonomy the agent has:

| Level | File Read | File Write | Commands | Git Push/Delete |
|---|---|---|---|---|
| **Ask Every Time** | Ask | Ask | Ask | Ask |
| **Auto-Read** | Auto | Ask | Ask | Ask |
| **Auto-All** | Auto | Auto | Auto | Ask |
| **Full Auto** | Auto | Auto | Auto | Auto |

---

## MCP Server Integration

CodeMeYo implements the **Model Context Protocol (MCP)** — an open standard for connecting AI agents to external tools and data sources.

### What is MCP?

MCP defines a JSON-RPC 2.0-based protocol for AI applications to discover and invoke tools provided by external servers. This allows CodeMeYo to be extended with capabilities like database access, API integrations, cloud services, and more — without modifying the core application.

### Transport Types

| Transport | Use Case | Configuration |
|---|---|---|
| **Stdio** | Local MCP servers (processes on your machine) | Command + arguments + environment variables |
| **Streamable HTTP** | Remote MCP servers (cloud-hosted endpoints) | URL + headers + auth token |

### MCP Features

- **Server Management** — Add, remove, start, stop, and restart MCP servers
- **Tool Discovery** — Automatically discovers tools exposed by connected servers
- **Tool Execution** — Seamlessly invoke MCP tools alongside built-in tools
- **Activity Logging** — Full log of all MCP operations for debugging
- **Health Monitoring** — Automatic health checks with reconnection on failure
- **Configuration Persistence** — Server configs stored in a JSON file compatible with Claude Desktop format
- **Environment Variable Resolution** — Supports `${VAR}` and `${VAR:-default}` syntax in configs
- **Risk Levels** — Configure risk assessment per server (low, medium, high)

### MCP Primitives

Beyond tools, CodeMeYo supports the full MCP specification:

- **Resources** — List and read structured data from MCP servers
- **Prompts** — List, configure arguments, and render prompt templates from servers

### MCP Bundles

CodeMeYo supports `.mcpb` bundle files — pre-packaged MCP server configurations that can be installed with one click. Bundles include ZIP parsing and security validation.

### MCP Registry

A built-in registry browser with curated official MCP servers. Browse, search, and install servers directly from the app.

### OAuth 2.1 Support

For MCP servers that require authentication, CodeMeYo implements the OAuth 2.1 PKCE flow — enabling secure, browser-based authentication without exposing credentials.

### How to Add an MCP Server

See the [Configuration](Configuration) page for step-by-step instructions.

---

## Browser Automation

CodeMeYo provides deep browser debugging capabilities through multiple methods.

### Window Capture

- **ListBrowserWindows** — Discover open browser windows (Brave, Chrome, Firefox, Edge)
- **CaptureBrowserWindow** — Capture a targeted screenshot of a specific browser window

### CDP (Chrome DevTools Protocol)

For deep debugging, CodeMeYo connects directly to the browser's DevTools Protocol:

| Tool | Description |
|---|---|
| **BrowserConnect** | Connect to a browser's CDP debug port |
| **BrowserListTabs** | List all open tabs |
| **BrowserScreenshot** | Pixel-perfect viewport screenshot (no OS chrome) |
| **BrowserGetDOM** | Read page HTML structure by CSS selector |
| **BrowserEvalJS** | Execute JavaScript in the page context |
| **BrowserGetConsole** | Read console.log, console.error, uncaught exceptions |
| **BrowserGetNetwork** | View HTTP requests with status, timing, and size |
| **BrowserGetStyles** | Get computed CSS for any element |
| **BrowserClick** | Click elements on the page |
| **BrowserType** | Type text into form fields |
| **BrowserNavigate** | Navigate to a URL |

**Typical CDP debug flow:**
```
BrowserConnect --> BrowserScreenshot --> BrowserGetConsole
    --> Identify error --> ReadFile --> Fix code --> BrowserScreenshot (verify)
```

### Browser Extension Bridge

The CodeMeYo browser extension provides additional tools that work without restarting the browser:

| Tool | Description |
|---|---|
| **ExtGetDOMMutations** | Live DOM change tracking via MutationObserver |
| **ExtGetStorage** | Read localStorage and sessionStorage |
| **ExtInjectCSS** | Inject CSS for live visual debugging |
| **ExtGetPageInfo** | Get current URL, title, and meta tags |

---

## Project Indexing

When you open a project, CodeMeYo analyzes the codebase to build an intelligent index. This allows the agent to:

- Understand the project structure and technology stack
- Automatically select relevant files as context for each task
- Navigate large codebases efficiently without reading every file
- Detect the project's package manager, build system, and test framework

---

## Screenshot and Screen Capture

The agent can capture your screen at any time using the `CaptureScreenshot` tool (powered by the `xcap` crate for cross-platform support). This enables:

- **Visual debugging** — attach a screenshot of a bug and the agent will analyze it, find the relevant code, and fix the issue
- **Verification** — after making changes, the agent can capture a screenshot to verify the fix visually
- **UI development** — describe a design and the agent can check its work against the actual rendered output

---

## Monaco Editor

CodeMeYo includes an integrated **Monaco Editor** (the same editor engine that powers VS Code):

- Full syntax highlighting for all major languages
- Live diff view showing the agent's changes
- IntelliSense-style autocompletion
- Search and replace with regex support
- Multiple file tabs
- Minimap navigation

---

## Terminal

An embedded terminal powered by **xterm.js** provides:

- Real-time output from agent commands (builds, tests, installs)
- Interactive shell access
- ANSI color support
- Scrollback buffer
- Web link detection and clickability

---

## SQLite Chat Persistence

All conversations are persisted locally in a SQLite database (via `rusqlite`):

- Chat history survives app restarts
- Search across past conversations
- Export conversations as Markdown or JSON
- Conversation branching — fork at any point to explore different approaches
- Project history tracking

---

## Secure Keychain Storage

API keys are stored using your operating system's native secure keychain:

| OS | Keychain Backend |
|---|---|
| **Windows** | Windows Credential Manager |
| **macOS** | macOS Keychain |
| **Linux** | Secret Service (GNOME Keyring / KDE Wallet) |

Keys are never stored in plaintext files, environment variables, or application databases. They are only transmitted to the respective LLM provider's API endpoint.

---

## Additional Features

- **Dark and light themes** with system preference detection
- **Keyboard shortcuts** — `Ctrl+N` (new chat), `Ctrl+K` (command palette), `Ctrl+E` (editor toggle), and more
- **Conversation search** across all chat history
- **Conversation export** in Markdown and JSON formats
- **Conversation branching** — fork conversations to explore alternative approaches
- **File tree explorer** with real-time project navigation
- **Git panel** — status, branches, log, and diff views
- **Token usage tracking** — real-time input/output token counts with estimated cost per provider
- **Auto-update** — checks for new versions and updates automatically
- **Custom title bar** — native-feeling frameless window with custom controls
