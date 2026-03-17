# Troubleshooting

Solutions to common issues with CodeMeYo.

---

## App Won't Start

### Windows

**Problem:** The app crashes or shows a blank white window on startup.

**Solutions:**

1. **Ensure WebView2 is installed.** WebView2 comes pre-installed on Windows 10 (version 1803+) and Windows 11. If missing, download it from [developer.microsoft.com/en-us/microsoft-edge/webview2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).

2. **Check for antivirus interference.** Some antivirus software may block Tauri apps. Add CodeMeYo to your antivirus exclusion list.

3. **Run as administrator.** Right-click the CodeMeYo shortcut and select "Run as administrator" to rule out permission issues.

### macOS

**Problem:** macOS blocks the app with "CodeMeYo can't be opened because it is from an unidentified developer."

**Solutions:**

1. Right-click the app and select **Open** (instead of double-clicking).
2. Go to **System Settings > Privacy & Security** and click **Open Anyway**.
3. If the app is damaged after download, run:
   ```bash
   xattr -cr /Applications/CodeMeYo.app
   ```

### Linux

**Problem:** The app fails to start or shows a WebKit error.

**Solutions:**

1. **Install required dependencies:**
   ```bash
   # Debian/Ubuntu
   sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev

   # Fedora
   sudo dnf install webkit2gtk4.1-devel libappindicator-gtk3-devel librsvg2-devel

   # Arch
   sudo pacman -S webkit2gtk-4.1 libappindicator-gtk3 librsvg
   ```

2. **Check for Wayland issues.** If using Wayland and the app renders incorrectly, try launching with:
   ```bash
   GDK_BACKEND=x11 codemeyo
   ```

3. **AppImage permissions.** Ensure the AppImage is executable:
   ```bash
   chmod +x CodeMeYo_*.AppImage
   ```

---

## API Key Errors

### "Invalid API key" or "Authentication failed"

1. **Verify the key is correct.** Open Settings and check that the key was pasted completely without extra spaces or line breaks.
2. **Check the key is for the right provider.** Claude keys start with `sk-ant-`, OpenAI keys start with `sk-`.
3. **Confirm the key is active.** Visit the provider's console to ensure the key hasn't been revoked or expired.
4. **Check your account balance.** Some providers require prepaid credits. Verify your account has sufficient balance.

### "Rate limited" or "429 Too Many Requests"

1. **Wait and retry.** Rate limits are temporary. The agent will usually retry automatically.
2. **Switch providers.** Use Fallback mode to automatically switch to another provider when rate-limited.
3. **Use a cheaper model.** Smaller models often have higher rate limits.

### "Model not found" or "Invalid model"

1. **Check model availability.** Some models may be restricted to certain API tiers or regions.
2. **Update the model name.** Model IDs may change over time. Check the provider's documentation for current model names.

---

## Build from Source Issues

### Frontend build fails

```bash
# Ensure you have the right Node.js version
node --version  # Should be 20+

# Clear and reinstall dependencies
rm -rf node_modules
pnpm install

# Check for TypeScript errors
npx tsc --noEmit
```

### Rust build fails

```bash
# Ensure Rust is up to date
rustup update stable

# Clean and rebuild
cd src-tauri
cargo clean
cargo build

# Check for missing system dependencies (Linux)
# See the Linux dependencies section above
```

### Tauri CLI not found

```bash
# Install the Tauri CLI
cargo install tauri-cli

# Or use pnpm to run it
pnpm tauri dev
pnpm tauri build
```

### `xcap` crate build error (screenshot feature)

On some Linux systems, the screenshot library requires additional dependencies:

```bash
# Debian/Ubuntu
sudo apt install libxcb-randr0-dev libxcb-shm0-dev

# Fedora
sudo dnf install libxcb-devel
```

---

## Log File Locations

CodeMeYo stores logs and data in platform-specific directories:

| OS | Application Data Directory |
|---|---|
| **Windows** | `%APPDATA%\com.codemeyo.app\` |
| **macOS** | `~/Library/Application Support/com.codemeyo.app/` |
| **Linux** | `~/.config/com.codemeyo.app/` |

Key files in this directory:

| File | Description |
|---|---|
| `codemeyo.db` | SQLite database (conversations, settings, project history) |
| `mcp_servers.json` | MCP server configurations |

### Viewing Logs

For development builds, Rust backend logs are printed to the terminal where you ran `pnpm tauri dev`. Frontend console logs can be viewed in the WebView DevTools (press `Ctrl+Shift+I` / `Cmd+Option+I` on development builds).

---

## How to Reset Settings

### Reset API keys

1. Open Settings and clear each API key field manually.
2. Or delete the keys from your OS keychain directly:
   - **Windows:** Open Credential Manager > Windows Credentials, find entries for `codemeyo`
   - **macOS:** Open Keychain Access, search for `codemeyo`
   - **Linux:** Use `secret-tool` to search and remove entries

### Reset all settings

Delete the application database to reset all settings, conversations, and project history:

**Windows:**
```powershell
Remove-Item "$env:APPDATA\com.codemeyo.app\codemeyo.db"
```

**macOS:**
```bash
rm ~/Library/Application\ Support/com.codemeyo.app/codemeyo.db
```

**Linux:**
```bash
rm ~/.config/com.codemeyo.app/codemeyo.db
```

> **Warning:** This deletes all conversation history and settings. API keys stored in the OS keychain are not affected.

### Reset MCP configuration

Delete the MCP configuration file:

**Windows:**
```powershell
Remove-Item "$env:APPDATA\com.codemeyo.app\mcp_servers.json"
```

**macOS:**
```bash
rm ~/Library/Application\ Support/com.codemeyo.app/mcp_servers.json
```

**Linux:**
```bash
rm ~/.config/com.codemeyo.app/mcp_servers.json
```

---

## MCP Server Issues

### Server won't start

1. **Check the command exists.** Verify the command in your MCP config is installed and on your PATH:
   ```bash
   which npx  # or the command your server uses
   ```

2. **Check arguments.** Ensure the `args` array is correct for your server.

3. **Check environment variables.** If your config uses `${VAR}` references, make sure those variables are set in your system environment.

4. **View the activity log.** Open the **MCP > Activity** tab to see error messages from the server process.

### Server connects but tools don't appear

1. **Wait for tool discovery.** After connecting, tool discovery may take a few seconds.
2. **Restart the server.** Use the restart button in the MCP Servers tab.
3. **Check the server implementation.** The server may not expose any tools (only resources or prompts).

### HTTP transport connection failures

1. **Verify the URL.** Ensure the endpoint URL is correct and accessible.
2. **Check authentication.** If the server requires auth, verify your bearer token or OAuth credentials.
3. **Check network/firewall.** Ensure your network allows outbound connections to the server URL.

---

## Common Error Messages

| Error | Cause | Solution |
|---|---|---|
| "Failed to invoke command" | Tauri IPC error | Restart the app; if persistent, rebuild from source |
| "Database locked" | Multiple app instances | Close all CodeMeYo instances and relaunch |
| "Connection refused" | LLM API unreachable | Check internet connection; verify API endpoint |
| "Context length exceeded" | Message too large for model | Use a model with a larger context window, or start a new conversation |
| "Insufficient funds" | API account out of credits | Add credits to your provider account |

---

## Getting Help

If your issue isn't covered here:

1. Search existing [GitHub Issues](https://github.com/jagjourney/codemeyo/issues)
2. Open a [new issue](https://github.com/jagjourney/codemeyo/issues/new) with reproduction steps and log output
3. Visit [codemeyo.com](https://codemeyo.com) for additional resources
