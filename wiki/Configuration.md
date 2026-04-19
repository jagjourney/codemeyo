# Configuration

Every setting, every config file, every path. This page covers the desktop + mobile app only — see [Admin Panel](Admin-Panel) for the Filament `/admin/settings` backoffice.

As of v1.9.0 the bundle ID changed from `com.codemeyo.app` to `com.jagjourney.codemeyo`. All app-data paths now use the new identifier. If you're upgrading from v1.8.x or earlier, your old data directory is still on disk — nothing is migrated automatically. See [Upgrading from older bundle ID](#upgrading-from-older-bundle-id) below.

---

## Application data location

CodeMeYo stores the local SQLite database, MCP config, cached entitlements, and a few small JSON files in the platform-standard app-data directory:

| OS | Path |
|---|---|
| Windows | `%APPDATA%\com.jagjourney.codemeyo\` |
| macOS | `~/Library/Application Support/com.jagjourney.codemeyo/` |
| Linux | `~/.config/com.jagjourney.codemeyo/` |

Inside that directory:

| File | What it holds |
|---|---|
| `codemeyo.db` | SQLite — conversations, messages, settings, project history |
| `mcp_servers.json` | MCP server configurations (Claude Desktop-compatible format) |
| `entitlement_cache.json` | Signed-in user's cached plan (24h TTL) |
| `updater_cache.json` | Latest-version info pulled from the authenticated updater endpoint |

### Upgrading from older bundle ID

If you had v1.8.x or earlier installed, your old directory (`%APPDATA%\com.codemeyo.app\`, etc.) still exists after upgrading to v1.9.x. Nothing in it is used by the new app. Two options:

- **Fresh start** — nothing to do. v1.9.x creates the new directory on first launch and you reset your settings by signing in again.
- **Migrate manually** — copy `codemeyo.db` and `mcp_servers.json` from the old directory to the new one, close CodeMeYo first. Conversation history and MCP servers come with you. API keys do not (they live in the OS keychain under the old service name — re-enter them once).

After you've confirmed the new setup works, you can delete the old directory.

---

## API key setup

### Accessing Settings

Open Settings by clicking the **gear icon** in the sidebar or pressing `Ctrl+,` (Windows/Linux) / `Cmd+,` (macOS).

### Configuring providers

Each of the 8 LLM providers has three fields:

1. **Enable toggle** — turns the provider on or off.
2. **API key** — your secret key from the provider.
3. **Model** — which model to use.

Provider-by-provider setup with links and recommended models is on the [LLM Providers](LLM-Providers) page.

### Where keys are stored

API keys are stored in your **operating system's native secure keychain**:

| OS | Storage backend |
|---|---|
| Windows | Windows Credential Manager |
| macOS | macOS Keychain |
| Linux | Secret Service (GNOME Keyring / KDE Wallet) |

Keys are never written to plaintext files, environment variables, or the SQLite database. Only the `keyring` Rust crate accesses them, scoped to service name `com.jagjourney.codemeyo`. The OS returns them to the app at runtime and they flow directly over HTTPS to the provider.

---

## Settings panel — 8 tabs

### General

| Setting | Options |
|---|---|
| **Theme** | Dark, Light, System |
| **Active Provider** | Any enabled provider — default for new conversations |
| **Interaction Mode** | Code, Chat |
| **Strategy** | Single, Round Robin, Deep Think, Consensus |
| **Permission Level** | Ask Every Time, Auto-Read, Auto-All, Full Auto |

### Providers

Per-provider enable / API key / model. See [LLM Providers](LLM-Providers).

### Agent

| Setting | Description |
|---|---|
| **Command timeout** | Default 120s, max 600s for `RunCommand` tool |
| **Max self-correction retries** | Default 5 — how many times the agent re-runs a failing build before asking you |
| **Working directory** | Auto-tracks the active project, override here if needed |

### Privacy

| Setting | Default | Description |
|---|---|---|
| **Opt-in anonymous usage telemetry** | Off | Sends LLM call counts per provider to `codemeyo.com/api/v1/usage/events`. Never prompts, code, or API responses. Signed-in accounts only. |
| **Send crash reports** | Off | Stack traces only, PII-stripped. |

Both require a verified account before they even appear.

### Updates

See [Auto-Updater](Auto-Updater). Toggle between "auto install", "notify me", and "manual only".

### MCP

Browse, add, and configure MCP servers. See [MCP Servers](MCP-Servers).

### Keyboard Shortcuts

Remap any shortcut. Defaults:

| Shortcut | Action |
|---|---|
| `Ctrl+N` / `Cmd+N` | New chat |
| `Ctrl+K` / `Cmd+K` | Command palette |
| `Ctrl+,` / `Cmd+,` | Settings |
| `Ctrl+O` / `Cmd+O` | Open project |
| `Ctrl+E` / `Cmd+E` | Toggle editor |
| `Ctrl+S` / `Cmd+S` | Save current file |
| `Ctrl+Shift+I` / `Cmd+Option+I` | Toggle DevTools |
| `F12` | Toggle DevTools (release builds too, since v0.1.710) |

### About

Version, build commit, bundle ID, update channel, and a link to [Release Notes](Release-Notes) and the in-app changelog.

---

## MCP server configuration

### Config file path

MCP server configs are stored in a JSON file compatible with Claude Desktop's format:

| OS | Path |
|---|---|
| Windows | `%APPDATA%\com.jagjourney.codemeyo\mcp_servers.json` |
| macOS | `~/Library/Application Support/com.jagjourney.codemeyo/mcp_servers.json` |
| Linux | `~/.config/com.jagjourney.codemeyo/mcp_servers.json` |

You can edit this file directly or manage servers in **MCP panel → Servers** tab.

### Example — stdio (local) server

```json
{
  "mcpServers": {
    "filesystem": {
      "transport": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"],
      "env": {
        "NODE_ENV": "production"
      },
      "autoStart": true,
      "riskLevel": "medium"
    }
  }
}
```

### Example — HTTP (remote) server

```json
{
  "mcpServers": {
    "cloud-db": {
      "transport": "http",
      "url": "https://mcp.example.com/v1",
      "headers": {
        "X-Workspace": "${WORKSPACE_ID}"
      },
      "authToken": "${MY_BEARER_TOKEN}",
      "autoStart": false,
      "riskLevel": "high"
    }
  }
}
```

Env var syntax: `${VAR}` (required) or `${VAR:-default}` (optional with fallback). See [MCP Servers](MCP-Servers) for the full list of bundled/registry servers and per-server config details.

---

## Project indexing

Opening a project triggers the indexer. It scans the directory, identifies the project type (Node, Rust, Python, Go, etc.), detects package manager / build system / test framework, and builds a lightweight file-path-and-metadata index.

The index is **never uploaded anywhere**. It's stored in memory and rebuilt per session. File contents only leave your machine when the agent explicitly sends them as context to the LLM you chose.

Excluded by default: `node_modules`, `.git`, `target`, `dist`, `build`, `.next`, `.venv`, `vendor`, `.gradle`. Edit `.codemeyoignore` at the project root to add more.

---

## Terminal

120-second default timeout per command (max 600s). Dangerous patterns (`rm -rf /`, `format`, `shutdown`, `dd if=`) are blocked regardless of permission level. Output is capped at 50,000 characters to prevent memory issues. See [Terminal Commands](Terminal-Commands) for the full built-in slash-command reference.

---

## Browser automation

CDP debugging and extension bridge. See [Browser Debug Guide](Browser-Debug-Guide) for setup.

Config lives inline in Settings → Browser:

| Setting | Default |
|---|---|
| **CDP port** | 9222 |
| **Extension server port** | 9333 |
| **Preferred browser** | Brave, Chrome, Edge, Firefox |
| **Screenshot downscale target** | 1280px |

---

## Sign-in state

Your sign-in session token is stored in the OS keychain under service `com.jagjourney.codemeyo` / account `sanctum_token`. Delete it to force re-sign-in without clearing your conversations.

```bash
# macOS
security delete-generic-password -s com.jagjourney.codemeyo -a sanctum_token

# Linux
secret-tool clear service com.jagjourney.codemeyo account sanctum_token

# Windows (PowerShell)
# Open "Credential Manager" → Windows Credentials → find com.jagjourney.codemeyo → Remove
```

---

## Reset everything

If you want a clean slate without reinstalling: see [Troubleshooting → Reset Settings](Troubleshooting#reset-all-settings).

---

## Related pages

- [Getting Started](Getting-Started) — install + first launch.
- [LLM Providers](LLM-Providers) — every provider's key setup + models.
- [MCP Servers](MCP-Servers) — server registry + adding custom ones.
- [Auto-Updater](Auto-Updater) — update behavior once signed in.
- [Troubleshooting](Troubleshooting) — when something goes wrong.
