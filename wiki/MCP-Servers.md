# MCP Servers

CodeMeYo implements the **Model Context Protocol** (MCP) — an open JSON-RPC 2.0 standard for connecting AI agents to external tools and data sources. Every MCP-compatible server in the ecosystem works with CodeMeYo out of the box.

Config format is **Claude Desktop-compatible** — drop your existing `claude_desktop_config.json` MCP section into CodeMeYo's `mcp_servers.json` and everything just works.

---

## How MCP works in CodeMeYo

1. You add an MCP server via the **MCP panel** in the sidebar (or edit `mcp_servers.json` directly).
2. On app start (or when you click **Start**), CodeMeYo spawns the server (for stdio) or opens the HTTP/WebSocket connection.
3. After the `initialize` JSON-RPC handshake, CodeMeYo calls `tools/list`, `resources/list`, and `prompts/list` to discover what the server exposes.
4. Discovered tools are merged with the 27 built-in tools and passed to the LLM on every agent loop iteration.
5. When the LLM calls an MCP tool, CodeMeYo routes the `tools/call` to the right server, gets the result, and feeds it back to the LLM.

Under the hood CodeMeYo uses the `rmcp` Rust crate (MCP 1.2 client) with two transport options:

- **stdio** — local process over stdin/stdout (the common case).
- **Streamable HTTP** — remote server over HTTP POST with JSON-RPC frames.

---

## MCP panel — 6 tabs

Click the MCP icon in the sidebar to open the panel:

| Tab | What's in it |
|---|---|
| **Servers** | List + start/stop/restart controls for every configured server. |
| **Registry** | Browse the 50+ curated servers CodeMeYo ships knowledge of. One-click install. |
| **Bundles** | Install `.mcpb` bundle files (signed, self-contained MCP packages). |
| **Tools** | Every tool currently discovered across all connected servers. |
| **Activity** | Live log of every JSON-RPC call, response, and error. |
| **OAuth** | Manage OAuth 2.1 PKCE-authenticated servers. |

---

## Built-in registry (50+ servers)

The **Registry** tab has one-click install for:

**Development & Version Control**
GitHub, GitLab, Filesystem, Docker, Kubernetes

**Databases**
PostgreSQL, MySQL / MariaDB, MongoDB, Redis, SQLite, Supabase, Firebase

**Productivity & Collaboration**
Notion, Linear, Jira, Asana, Trello, Google Drive, Google Calendar, Gmail, Slack, Discord, Microsoft Teams

**Search & Knowledge**
Brave Search, Perplexity, Memory

**Cloud & Hosting**
AWS S3, Cloudflare, Vercel, Netlify, Railway, DigitalOcean, cPanel / WHM

**Content & Media**
Canva, Figma, Adobe Express, Stability AI, Leonardo.ai, Meshy AI, ElevenLabs, Runway ML, OpenAI DALL·E

**Game Dev & 3D**
Unreal Engine 5.7, Unity, Blender

**Commerce & Payments**
Stripe, Shopify, WordPress

**Browser & Web**
Puppeteer, Fetch

**Observability**
Sentry

**Communication**
Discord, Microsoft Teams, Slack

The Registry list is maintained in `src/components/mcp/RegistryBrowser.tsx`. New servers are added each release — see [Release Notes](Release-Notes). v1.5.7 alone added 25+ new servers (Unreal Engine, Unity, Blender, Meshy, Leonardo, Canva, Figma, Adobe Express, Stability AI, ElevenLabs, Runway, cPanel / WHM, Cloudflare, Vercel, Netlify, Railway, DigitalOcean, Supabase, Firebase, Notion, Linear, Jira, Asana, Google Calendar, Gmail, DALL·E, Perplexity, Stripe, Shopify, WordPress).

---

## Adding a server

### From the Registry

1. MCP panel → **Registry** tab.
2. Browse or search by name / category.
3. Click **Install** on the server you want.
4. CodeMeYo pre-fills the stdio command / HTTP URL and prompts for any required credentials (API keys go straight to the OS keychain, not the JSON config).
5. Click **Start**.

### Manually (stdio)

1. MCP panel → **Servers** → **Add Server**.
2. Choose **Stdio**.
3. Fill in:

| Field | Description |
|---|---|
| Name | Friendly name — used to namespace tools |
| Command | Executable (e.g. `npx`, `uvx`, `docker`, `python`) |
| Args | Command-line arguments (array) |
| Env | Key/value environment variables, supports `${VAR}` and `${VAR:-default}` |
| Auto-start | Start when CodeMeYo launches |
| Risk level | Low / Medium / High — see [Risk levels](#risk-levels) |

Example JSON equivalent:

```json
{
  "mcpServers": {
    "filesystem": {
      "transport": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"],
      "env": { "NODE_ENV": "production" },
      "autoStart": true,
      "riskLevel": "medium"
    }
  }
}
```

### Manually (HTTP)

1. MCP panel → **Servers** → **Add Server**.
2. Choose **HTTP**.
3. Fill in:

| Field | Description |
|---|---|
| URL | Remote endpoint (e.g. `https://mcp.example.com/v1`) |
| Headers | Custom HTTP headers |
| Auth token | Bearer token (stored in the OS keychain, not the JSON config) |
| Auto-start | Connect when CodeMeYo launches |
| Risk level | Low / Medium / High |

```json
{
  "mcpServers": {
    "cloud-db": {
      "transport": "http",
      "url": "https://mcp.example.com/v1",
      "headers": { "X-Workspace": "acme" },
      "authToken": "${MY_BEARER_TOKEN}",
      "autoStart": false,
      "riskLevel": "high"
    }
  }
}
```

### OAuth 2.1 servers

Some servers require OAuth. CodeMeYo implements the **OAuth 2.1 PKCE** flow — full browser-based auth with no client secret in the desktop app.

1. When connecting, CodeMeYo opens your default browser to the server's authorize URL.
2. You sign in and grant access.
3. The authorization code redirects to CodeMeYo's local HTTP server (`tiny_http` on a random port).
4. CodeMeYo exchanges the code for a token and stores it in the keychain.
5. Tokens are refreshed automatically.

OAuth'd servers show up in the **OAuth** tab with their token expiry and a manual refresh button.

---

## `.mcpb` bundles

MCP bundles are ZIP files containing a server's binaries, manifest, icons, and default config. Install one with:

1. Download the `.mcpb` file.
2. MCP panel → **Bundles** → **Install Bundle** → pick the file.
3. CodeMeYo validates the bundle structure, extracts to the app data directory, and adds it to `mcp_servers.json`.

Security: bundles are unpacked into an isolated subdirectory. Malicious command / args fields are filtered (no `rm -rf /` smuggled into `args`).

---

## Risk levels

Each MCP server can be assigned a risk level that affects permission prompts:

| Level | Behavior |
|---|---|
| **Low** | Tools execute without confirmation. |
| **Medium** | Confirmation required for potentially destructive operations (default for most). |
| **High** | Every tool invocation requires explicit approval. |

Risk level is per-server, set at install time, editable later in the **Servers** tab.

---

## Config file path

| OS | Path |
|---|---|
| Windows | `%APPDATA%\com.jagjourney.codemeyo\mcp_servers.json` |
| macOS | `~/Library/Application Support/com.jagjourney.codemeyo/mcp_servers.json` |
| Linux | `~/.config/com.jagjourney.codemeyo/mcp_servers.json` |

---

## Environment variable resolution

MCP server configs support env var references:

```json
{
  "env": {
    "DATABASE_URL": "${DATABASE_URL:-postgresql://localhost:5432/mydb}",
    "API_KEY": "${MY_SERVICE_KEY}"
  }
}
```

- `${VAR}` — resolves to the system env var, or errors if unset.
- `${VAR:-default}` — resolves to the system env var, or uses the default.

Secrets are best kept in the OS keychain instead of env vars — use the **Auth token / API key** field in the Servers tab, which stores the value in `keyring` rather than the JSON file.

---

## Primitives beyond tools

MCP defines three primitive types. CodeMeYo supports all three:

- **Tools** — functions the LLM can call. The most common type.
- **Resources** — read-only data the LLM can consume (e.g. "list all files in this Postgres table"). Browse these in MCP panel → **Tools** → **Resources** sub-tab.
- **Prompts** — templated prompts the server provides. Browse + render these in MCP panel → **Tools** → **Prompts** sub-tab.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Server won't start | Check **Activity** tab for the stderr output. Usually missing `npx` / wrong Python version / bad env var. |
| Tools don't appear after connect | Wait a few seconds — discovery is async. Restart the server if it's been 10+ seconds. |
| HTTP transport connection failures | Verify the URL (try `curl -X POST <url>` with your auth header). Check your firewall. |
| OAuth redirect hangs | Make sure no other process is on the OAuth redirect port. CodeMeYo picks a free one per attempt — but corporate firewalls sometimes block `localhost` redirects. |
| Server keeps crashing | Check the server's own logs (e.g. `~/.cache/mcp-server-name/` depending on implementation). Raise the issue with the MCP server maintainer, not us — we're just the client. |

See [Troubleshooting → MCP Server Issues](Troubleshooting#mcp-server-issues) for more.

---

## Building your own MCP server

See the official MCP docs at [modelcontextprotocol.io](https://modelcontextprotocol.io). CodeMeYo is a reference-quality MCP client and works with any spec-compliant server.

---

## Related pages

- [Configuration](Configuration#mcp-server-configuration)
- [Architecture → MCP Client Integration](Architecture#mcp-client-integration)
- [Troubleshooting](Troubleshooting#mcp-server-issues)
