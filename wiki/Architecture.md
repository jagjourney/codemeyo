# Architecture

A technical overview of CodeMeYo's system design and implementation.

---

## High-Level Architecture

```
+-------------------------------------------------------------------+
|                        CodeMeYo Desktop App                        |
|                                                                    |
|  +-----------------------------+  +-----------------------------+  |
|  |        Frontend (React)     |  |       Backend (Rust)        |  |
|  |                             |  |                             |  |
|  |  React 19 + TypeScript      |  |  Tauri 2 + Tokio           |  |
|  |  Vite 7 (bundler)           |  |  reqwest (HTTP client)     |  |
|  |  Tailwind CSS 4             |  |  rusqlite (database)       |  |
|  |  Zustand (state)            |  |  rmcp (MCP client)         |  |
|  |  Monaco Editor              |  |  keyring (secure storage)  |  |
|  |  xterm.js (terminal)        |  |  xcap (screenshots)        |  |
|  |                             |  |  tokio-tungstenite (WS)    |  |
|  +-------------+---------------+  +-------------+---------------+  |
|                |          Tauri IPC              |                  |
|                +----------(commands)-------------+                  |
+-------------------------------------------------------------------+
                               |
              +----------------+----------------+
              |                |                |
        LLM APIs        MCP Servers       Browser CDP
    (Claude, GPT,      (stdio, HTTP)    (DevTools Protocol)
     Grok, Gemini,
     DeepSeek, Ollama)
```

---

## Frontend

### Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 5.8 | Type-safe JavaScript |
| **Vite** | 7 | Build tool and dev server |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **Zustand** | 5 | Lightweight state management |
| **Monaco Editor** | 0.55 | Code editor (VS Code engine) |
| **xterm.js** | 6 | Terminal emulator |
| **react-markdown** | 10 | Markdown rendering in chat |
| **lucide-react** | — | Icon library |

### Directory Structure

```
src/
├── App.tsx                 # Root component
├── main.tsx                # Entry point
├── vite-env.d.ts           # Vite type declarations
├── components/
│   ├── agent/              # Agent activity display
│   ├── browser/            # Browser automation UI
│   ├── chat/               # Chat interface
│   ├── editor/             # Monaco editor wrapper
│   ├── explorer/           # File tree explorer
│   ├── git/                # Git panel (status, branches, log)
│   ├── help/               # Help and documentation views
│   ├── layout/             # App layout, sidebar, title bar
│   ├── mcp/                # MCP server management (6 tabs)
│   ├── settings/           # Settings panel
│   ├── terminal/           # xterm.js terminal
│   └── usage/              # Token usage tracking
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── stores/                 # Zustand state stores
│   ├── chatStore.ts        # Conversation state
│   ├── settingsStore.ts    # Settings, providers, models
│   ├── projectStore.ts     # Project files and indexing
│   ├── mcpStore.ts         # MCP server state
│   └── browserStore.ts     # Browser automation state
└── styles/                 # Global CSS
```

### State Management

CodeMeYo uses **Zustand** for all client-side state. Each domain has its own store:

| Store | Responsibility |
|---|---|
| `chatStore` | Conversations, messages, streaming state, conversation branching |
| `settingsStore` | Provider configs, API keys, theme, permissions, token usage tracking |
| `projectStore` | Open project path, file tree, project index |
| `mcpStore` | MCP server list, connection status, tools, resources, prompts |
| `browserStore` | CDP connections, browser tabs, extension bridge state |

Settings are persisted to the SQLite database via Tauri commands. The frontend calls `invoke("save_setting", { key, value })` and `invoke("load_all_settings")` for persistence.

---

## Backend

### Technology Stack

| Crate | Purpose |
|---|---|
| **tauri** 2 | Desktop framework, windowing, IPC |
| **tokio** 1 | Async runtime |
| **reqwest** 0.12 | HTTP client for LLM API calls |
| **rusqlite** 0.32 | SQLite database (bundled) |
| **serde** / **serde_json** | Serialization |
| **rmcp** 1.2 | MCP client (stdio + HTTP transport) |
| **keyring** 3 | OS keychain integration |
| **xcap** 0.9 | Cross-platform screenshot capture |
| **tokio-tungstenite** 0.24 | WebSocket client (CDP) |
| **dashmap** 6 | Concurrent hash map |
| **chrono** 0.4 | Date/time handling |
| **uuid** 1 | Unique ID generation |
| **image** 0.25 | Image processing (PNG/JPEG) |
| **zip** 2 | ZIP archive handling (MCP bundles) |
| **sha2** / **hex** | Cryptographic hashing |
| **tiny_http** 0.12 | Lightweight HTTP server (OAuth callback) |
| **url** 2 | URL parsing |
| **open** 5 | Open URLs in default browser |
| **base64** 0.22 | Base64 encoding (screenshots, images) |
| **async-trait** 0.1 | Async trait support |
| **futures** 0.3 | Async stream utilities |

### Directory Structure

```
src-tauri/src/
├── main.rs                 # Tauri entry point
├── lib.rs                  # Library crate root
├── agent/
│   ├── mod.rs              # Agent loop, system prompt, tool execution
│   └── deepthink.rs        # Deep Think multi-model analysis
├── llm/
│   ├── mod.rs              # LLMProvider trait, provider factory
│   ├── claude.rs           # Anthropic Claude adapter
│   ├── openai.rs           # OpenAI GPT adapter (also Gemini, DeepSeek, Ollama)
│   └── grok.rs             # xAI Grok adapter
├── tools/
│   ├── mod.rs              # ToolResult type
│   ├── registry.rs         # Tool schema definitions
│   ├── read_file.rs        # ReadFile tool
│   ├── write_file.rs       # WriteFile tool
│   ├── edit_file.rs        # EditFile tool
│   ├── search_files.rs     # SearchFiles tool
│   ├── search_content.rs   # SearchContent tool
│   ├── list_dir.rs         # ListDir tool
│   ├── run_command.rs       # RunCommand tool
│   ├── git_ops.rs          # GitOps tool
│   ├── screenshot.rs       # CaptureScreenshot tool
│   ├── browser.rs          # Browser window tools
│   └── project_index.rs    # ProjectIndex tool
├── browser/
│   ├── mod.rs              # Module declarations
│   ├── cdp_client.rs       # CDP WebSocket client
│   ├── cdp_manager.rs      # CDP connection manager
│   ├── cdp_types.rs        # CDP protocol types
│   └── extension_server.rs # Browser extension bridge server
├── mcp/
│   ├── mod.rs              # MCPManager (server lifecycle)
│   ├── client.rs           # MCP JSON-RPC client
│   ├── config.rs           # Config file load/save, env var resolution
│   ├── types.rs            # MCPServerConfig, transport types
│   ├── keychain.rs         # Secure key storage for MCP
│   ├── oauth.rs            # OAuth 2.1 PKCE flow
│   ├── bundle.rs           # .mcpb bundle installer
│   └── primitives.rs       # Resources and Prompts
├── db/
│   └── mod.rs              # SQLite schema, queries, migrations
└── commands/               # Tauri command handlers (IPC)
```

---

## Agent System

### Agent Loop

The agent operates in a loop that continues until the task is complete or the LLM signals it is done:

```
              ┌──────────────────────────────────┐
              │         User sends task           │
              └──────────────┬───────────────────┘
                             │
                             v
              ┌──────────────────────────────────┐
              │    Build system prompt + tools    │
              │  (built-in tools + MCP tools)     │
              └──────────────┬───────────────────┘
                             │
                             v
              ┌──────────────────────────────────┐
              │      Send to LLM provider        │◄───────┐
              └──────────────┬───────────────────┘        │
                             │                            │
                  ┌──────────┴──────────┐                 │
                  │                     │                 │
                  v                     v                 │
           ┌───────────┐        ┌──────────────┐         │
           │   Text    │        │   ToolUse    │         │
           │ response  │        │   response   │         │
           └─────┬─────┘        └──────┬───────┘         │
                 │                     │                 │
                 v                     v                 │
           ┌───────────┐     ┌──────────────────┐       │
           │   Done    │     │  Execute tools   │       │
           │  (return) │     │  (with perms)    │       │
           └───────────┘     └────────┬─────────┘       │
                                      │                 │
                                      v                 │
                              ┌──────────────────┐      │
                              │  Append results  │      │
                              │  to messages     │──────┘
                              └──────────────────┘
```

### LLM Response Types

The `LLMResponse` enum normalizes responses across all providers:

| Variant | Meaning |
|---|---|
| `Text` | The LLM returned a text response (may continue the loop) |
| `ToolUse` | The LLM wants to call one or more tools |
| `Done` | The LLM considers the task complete |
| `Error` | An error occurred during the API call |

### Tool Execution

When the LLM returns a `ToolUse` response:

1. Each tool call is validated against the permission level
2. Built-in tools are executed directly via their Rust implementations
3. MCP tools are routed to the appropriate MCP server via JSON-RPC
4. Results are collected and appended to the conversation
5. The updated conversation is sent back to the LLM

---

## LLM Adapter Pattern

All LLM providers implement the `LLMProvider` trait:

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

Each adapter handles:
- Message format conversion (Anthropic uses a different format than OpenAI)
- Tool schema translation (each provider has slightly different tool calling formats)
- Response normalization into the unified `LLMResponse` enum
- Streaming support
- Error handling and retries

The `create_provider` factory function routes model names to the correct adapter:
- `claude-*` models use the Claude adapter
- `gpt-*`, `o1-*`, `o3-*`, `o4-*`, `o5-*` models use the OpenAI adapter
- `grok-*` models use the Grok adapter
- All other models default to the OpenAI-compatible adapter (covers Gemini, DeepSeek, Ollama)

---

## MCP Client Integration

CodeMeYo implements the MCP (Model Context Protocol) specification using the `rmcp` crate.

### Architecture

```
MCPManager
├── Server Registry (HashMap<String, MCPServerConfig>)
├── Active Connections (DashMap<String, MCPClient>)
├── Config Persistence (JSON file)
└── OAuth Handler (PKCE flow)

MCPClient
├── Stdio Transport (child process via tokio)
│   └── JSON-RPC 2.0 over stdin/stdout
└── HTTP Transport (reqwest)
    └── JSON-RPC 2.0 over HTTP POST (Streamable HTTP)
```

### Server Lifecycle

1. **Configuration** — server configs loaded from `mcp_servers.json`
2. **Start** — spawn process (stdio) or establish HTTP connection
3. **Initialization** — JSON-RPC `initialize` handshake
4. **Discovery** — `tools/list`, `resources/list`, `prompts/list`
5. **Operation** — tool calls routed from agent via `tools/call`
6. **Health monitoring** — periodic checks with auto-reconnect
7. **Shutdown** — graceful cleanup on app close

### Tool Merging

When the agent loop prepares tool schemas for an LLM call, it merges:
1. Built-in tools (from `registry.rs`)
2. Tools from all connected MCP servers (namespaced by server name)

This produces a single unified tool list that the LLM can call transparently.

---

## Browser Automation

### CDP (Chrome DevTools Protocol)

```
CodeMeYo Backend
    │
    ├── CDPManager
    │   └── Manages connections to browser instances
    │
    ├── CDPClient
    │   └── WebSocket connection to chrome://devtools
    │       └── Sends CDP commands (Page, DOM, Runtime, Network, etc.)
    │
    └── CDPTypes
        └── Typed representations of CDP protocol messages
```

The CDP client connects via WebSocket (`tokio-tungstenite`) to a browser running with `--remote-debugging-port=9222`. It sends JSON-RPC commands to interact with the page at a DevTools level.

### Extension Bridge

```
Browser Extension                    CodeMeYo Backend
    │                                      │
    └── HTTP POST ──────────────> ExtensionServer (tiny_http)
    └── <─────────── JSON Response ────────┘
```

The browser extension communicates with CodeMeYo via a lightweight HTTP server (`tiny_http`). This enables DOM mutation tracking, localStorage access, and CSS injection without requiring CDP.

---

## Database

### Technology

SQLite via `rusqlite` with the `bundled` feature (statically links SQLite, no external dependency).

### Storage

The database file (`codemeyo.db`) is stored in the platform-specific application data directory:

| OS | Location |
|---|---|
| Windows | `%APPDATA%\com.jagjourney.codemeyo\codemeyo.db` |
| macOS | `~/Library/Application Support/com.jagjourney.codemeyo/codemeyo.db` |
| Linux | `~/.config/com.jagjourney.codemeyo/codemeyo.db` |

### Schema

The database stores:
- **Conversations** — metadata (id, title, created_at, project_path)
- **Messages** — chat messages (id, conversation_id, role, content, timestamp)
- **Settings** — key-value pairs for all application settings
- **Project history** — recently opened projects

Migrations are applied automatically on startup.

---

## IPC (Tauri Commands)

Frontend-backend communication uses Tauri's command system. The frontend calls `invoke("command_name", { args })` which maps to a Rust function annotated with `#[tauri::command]`.

### Key Commands

| Command | Direction | Purpose |
|---|---|---|
| `send_message` | Frontend -> Backend | Send a chat message and start the agent loop |
| `save_setting` / `load_all_settings` | Both | Persist/retrieve settings |
| `list_conversations` / `load_conversation` | Frontend -> Backend | Conversation management |
| `open_project` | Frontend -> Backend | Open and index a project directory |
| `mcp_*` commands | Frontend -> Backend | MCP server management |
| `browser_*` commands | Frontend -> Backend | Browser automation |

### Event System

The backend emits events to the frontend using Tauri's event system (`app.emit()`). This is used for:

- **Streaming LLM responses** — tokens are emitted as they arrive
- **Agent activity updates** — tool calls, results, progress
- **MCP server status changes** — connection, disconnection, errors

The frontend subscribes to these events via `listen("event_name", callback)`.

---

## Security Model

| Layer | Protection |
|---|---|
| **API Keys** | OS keychain (never in plaintext files or databases) |
| **CSP** | Content Security Policy enforced by Tauri (restricts script/style sources) |
| **IPC** | Tauri command allowlist (only declared commands are accessible) |
| **Command Execution** | Configurable timeouts, permission-gated |
| **Network** | Direct HTTPS to LLM providers only (no proxy, no intermediate servers) |
| **MCP** | Per-server risk levels, OAuth 2.1 PKCE for authenticated servers |
| **Data** | All data local (SQLite DB, JSON configs, OS keychain) |

---

## Build and CI/CD

### Build System

- **Frontend:** Vite 7 builds the React app to `dist/`
- **Backend:** Cargo builds the Rust binary, Tauri bundles it with the frontend

### CI/CD Pipeline

GitLab CI/CD handles cross-platform builds:

- **Trigger:** Version tags only (e.g., `v0.1.0`)
- **Platforms:** Windows (MSVC), macOS (x86_64 + ARM64), Linux (x86_64)
- **Output:** `.msi`, `.exe`, `.dmg`, `.AppImage`, `.deb`, `.rpm`
- **Release:** Automatic GitLab release creation with changelog extraction

### Development Workflow

```bash
pnpm tauri dev     # Development with hot reload (frontend) and auto-rebuild (backend)
pnpm tauri build   # Production build
cargo clippy       # Lint Rust code
cargo fmt          # Format Rust code
npx tsc --noEmit   # Type-check TypeScript
```
