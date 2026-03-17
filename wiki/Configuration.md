# Configuration

This guide covers all configuration options in CodeMeYo.

---

## API Key Setup

### Accessing Settings

Open the Settings panel using one of these methods:

- Click the **gear icon** in the sidebar
- Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS)

### Configuring Providers

Each LLM provider has its own section in Settings with three fields:

1. **Enable/Disable toggle** — turns the provider on or off
2. **API Key** — your secret key from the provider
3. **Model** — which model to use (dropdown with all available models)

### Provider-Specific Setup

#### Anthropic (Claude)

1. Create an account at [console.anthropic.com](https://console.anthropic.com)
2. Navigate to **API Keys** and create a new key
3. Copy the key (starts with `sk-ant-`)
4. Paste it into the **Claude API Key** field in CodeMeYo Settings
5. Select a model (recommended: **Claude Sonnet 4.6** for general use)

#### OpenAI (GPT)

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Navigate to **API Keys** and create a new secret key
3. Copy the key (starts with `sk-`)
4. Paste it into the **OpenAI API Key** field in CodeMeYo Settings
5. Select a model (recommended: **GPT-5.4** for best quality or **GPT-4.1 Nano** for cost efficiency)

#### xAI (Grok)

1. Create an account at [console.x.ai](https://console.x.ai)
2. Navigate to **API Keys** and create a new key
3. Copy the key
4. Paste it into the **Grok API Key** field in CodeMeYo Settings
5. Select a model (recommended: **Grok 3** for general use)

#### Google (Gemini)

1. Get an API key from [Google AI Studio](https://aistudio.google.com)
2. CodeMeYo connects to Gemini through an OpenAI-compatible endpoint
3. Enter the key and endpoint URL in Settings

#### DeepSeek

1. Get an API key from [platform.deepseek.com](https://platform.deepseek.com)
2. CodeMeYo connects to DeepSeek through an OpenAI-compatible endpoint
3. Enter the key and endpoint URL in Settings

#### Ollama (Local Models)

1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull a model: `ollama pull llama3` (or any supported model)
3. Ollama runs on `http://localhost:11434` by default
4. In CodeMeYo Settings, enable Ollama and select your model
5. No API key is required

### Key Security

All API keys are stored in your operating system's native secure keychain:

| OS | Storage Backend |
|---|---|
| Windows | Windows Credential Manager |
| macOS | macOS Keychain |
| Linux | Secret Service (GNOME Keyring / KDE Wallet) |

Keys are never written to plaintext files, environment variables, or the SQLite database.

---

## MCP Server Configuration

### Adding an MCP Server

1. Open the **MCP panel** in the sidebar
2. Click the **Servers** tab
3. Click **Add Server**
4. Choose the transport type:

#### Stdio Transport (Local Servers)

For MCP servers that run as local processes:

```json
{
  "mcpServers": {
    "my-server": {
      "transport": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
      "env": {
        "NODE_ENV": "production"
      },
      "autoStart": true
    }
  }
}
```

| Field | Description |
|---|---|
| `command` | The executable to run |
| `args` | Command-line arguments |
| `env` | Environment variables (supports `${VAR}` and `${VAR:-default}` syntax) |
| `autoStart` | Whether to start the server automatically when CodeMeYo launches |

#### HTTP Transport (Remote Servers)

For MCP servers hosted on the internet:

```json
{
  "mcpServers": {
    "remote-server": {
      "transport": "http",
      "url": "https://api.example.com/mcp",
      "headers": {
        "X-Custom-Header": "value"
      },
      "authToken": "your-bearer-token",
      "autoStart": true
    }
  }
}
```

| Field | Description |
|---|---|
| `url` | The remote MCP endpoint URL |
| `headers` | Custom HTTP headers (supports `${VAR}` syntax) |
| `authToken` | Bearer token for the Authorization header |

### MCP Configuration File

Server configurations are stored in a JSON file compatible with Claude Desktop's format. The file location is:

| OS | Path |
|---|---|
| Windows | `%APPDATA%\com.codemeyo.app\mcp_servers.json` |
| macOS | `~/Library/Application Support/com.codemeyo.app/mcp_servers.json` |
| Linux | `~/.config/com.codemeyo.app/mcp_servers.json` |

You can edit this file directly if you prefer working with JSON.

### Environment Variable Resolution

MCP server configs support environment variable references:

- `${VAR}` — resolves to the value of the environment variable `VAR`
- `${VAR:-default}` — resolves to `VAR` if set, otherwise uses `default`

Example:
```json
{
  "env": {
    "DATABASE_URL": "${DATABASE_URL:-postgresql://localhost:5432/mydb}",
    "API_KEY": "${MY_SERVICE_KEY}"
  }
}
```

### MCP Server Risk Levels

Each server can be assigned a risk level that affects permission prompts:

| Risk Level | Behavior |
|---|---|
| **Low** | Tools execute without confirmation |
| **Medium** | Confirmation required for potentially destructive operations |
| **High** | Every tool invocation requires explicit approval |

### Installing MCP Bundles

CodeMeYo supports `.mcpb` bundle files for one-click MCP server installation:

1. Download a `.mcpb` file
2. Open CodeMeYo and go to the **MCP > Bundles** tab
3. Click **Install Bundle** and select the file
4. The bundle is validated for security and installed automatically

### MCP Registry

Browse curated MCP servers directly in the app:

1. Open the **MCP > Registry** tab
2. Browse or search the available servers
3. Click **Install** on any server to add it to your configuration

### OAuth Authentication

Some MCP servers require OAuth authentication:

1. When connecting to an OAuth-protected server, CodeMeYo opens your browser
2. Authenticate with the service
3. CodeMeYo receives the token via the OAuth 2.1 PKCE flow
4. The token is stored securely and refreshed automatically

---

## Settings Panel Walkthrough

### General Settings

| Setting | Options | Description |
|---|---|---|
| **Theme** | Dark, Light | Application color scheme |
| **Active Provider** | Claude, GPT, Grok, Gemini, DeepSeek, Ollama | Default LLM provider for new conversations |
| **Agent Mode** | Single, Round Robin, Deep Think, Consensus | How the agent uses multiple LLMs |
| **Permission Level** | Ask Every Time, Auto-Read, Auto-All, Full Auto | Agent autonomy level |

### Per-Provider Settings

For each provider:

| Setting | Description |
|---|---|
| **Enabled** | Toggle to enable/disable the provider |
| **API Key** | Your secret key (stored in OS keychain) |
| **Model** | Specific model to use, with details on context window, output limits, and pricing |

### Usage Tracking

The usage panel shows real-time statistics for the current session:

- Input tokens consumed per provider
- Output tokens generated per provider
- Estimated cost in USD based on the model's pricing
- Reset button to clear session usage

---

## Project Indexing Setup

### How Indexing Works

When you open a project directory, CodeMeYo automatically:

1. Scans the directory structure
2. Identifies the project type (Node.js, Rust, Python, etc.)
3. Detects the package manager, build system, and test framework
4. Creates a lightweight index for fast file discovery

### Indexing Behavior

- **Automatic:** Indexing runs when you open a project
- **Incremental:** The index updates as files change
- **Selective:** Common directories like `node_modules`, `.git`, `target`, and `dist` are excluded by default
- **Lightweight:** The index stores file paths and metadata, not file contents

### Opening a Project

- Click the **folder icon** in the sidebar
- Press `Ctrl+O` (Windows/Linux) or `Cmd+O` (macOS)
- Or use the file dialog to select a project directory

The file tree explorer in the sidebar shows your project structure with real-time navigation.
