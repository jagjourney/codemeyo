# Troubleshooting

Solutions to common issues with CodeMeYo, grouped by what's going wrong.

If your issue isn't here, search [GitHub Issues](https://github.com/jagjourney/codemeyo/issues) or file a new one. For private reports email `support@jagjourney.com`. For security disclosures use `security@jagjourney.com` (see [Contributing → Security](Contributing#security-disclosures)).

---

## Installation & downloads

### "Download button redirects me to register"

That's intentional. As of v1.9.0, downloads at [codemeyo.com/download](https://codemeyo.com/download) require a free account. Create one at [codemeyo.com/register](https://codemeyo.com/register), then come back to download. See [Account System](Account-System).

You'll only do this once — after you sign in on the website, the download buttons work normally.

### Windows — SmartScreen blocks the installer

SmartScreen flags unsigned Windows installers as "unrecognized". We're working toward EV code-signing; until then:

1. Click **More info** on the SmartScreen dialog.
2. Click **Run anyway**.

If you don't trust that, check the SHA256 hash on the [GitHub Releases page](https://github.com/jagjourney/codemeyo/releases) against your download.

### macOS — "CodeMeYo can't be opened because it is from an unidentified developer"

1. Right-click the app in Applications and choose **Open** (instead of double-clicking).
2. Or go to **System Settings → Privacy & Security** and click **Open Anyway**.
3. If the app reports as damaged: `xattr -cr /Applications/CodeMeYo.app` in Terminal.

### Linux — WebKitGTK error on launch

```bash
# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev

# Fedora
sudo dnf install webkit2gtk4.1-devel libappindicator-gtk3-devel librsvg2-devel

# Arch
sudo pacman -S webkit2gtk-4.1 libappindicator-gtk3 librsvg
```

If on Wayland and the app renders oddly:

```bash
GDK_BACKEND=x11 codemeyo
```

---

## App won't start

### Blank white window on startup (Windows)

1. **WebView2 runtime missing.** Pre-installed on Windows 10 1803+. If missing, install from [developer.microsoft.com/en-us/microsoft-edge/webview2/](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).
2. **Antivirus interference.** Some AVs block Tauri apps' WebView child process. Add CodeMeYo to your AV exclusion list.
3. **Corrupt install.** Uninstall, delete `%APPDATA%\com.jagjourney.codemeyo\`, reinstall.

### Crash on startup (was fixed)

If you're on v1.0.10 or earlier, you might be hitting the rustls-tls regression that broke Windows networking. Upgrade to v1.0.11 or later. See [Release Notes → v1.0.11](Release-Notes).

### I upgraded from v1.8.x and now I see two CodeMeYo icons

Expected. The bundle ID changed from `com.codemeyo.app` to `com.jagjourney.codemeyo` in v1.9.0.

- **macOS:** delete the old `CodeMeYo.app` from Applications.
- **Windows + Linux:** the installer updates in place, only one icon expected. If you still see two, remove the old one from the Start Menu / desktop shortcut.

Your old app-data directory stays on disk but unused. Delete `%APPDATA%\com.codemeyo.app\` (Windows) / `~/Library/Application Support/com.codemeyo.app/` (macOS) / `~/.config/com.codemeyo.app/` (Linux) once you're confident the new install is stable. See [Configuration → Upgrading from older bundle ID](Configuration#upgrading-from-older-bundle-id).

---

## API key errors

### "Invalid API key" / "Authentication failed"

1. **Re-paste the key.** Make sure no trailing whitespace, no line breaks.
2. **Correct provider.** Claude keys start with `sk-ant-`, OpenAI with `sk-`, xAI with `xai-`.
3. **Key still valid.** Log in to the provider's dashboard to confirm the key hasn't been revoked.
4. **Account has credits.** OpenAI and Anthropic require prepaid balance.

### "Rate limited" / 429

1. Wait it out — rate limits are short-window. The agent usually retries automatically.
2. Switch to **Fallback** strategy so we silently route around rate-limited providers.
3. Pick a cheaper model (higher rate limits).

### "Model not found" / "Invalid model"

Model IDs drift over time. Check the provider's current docs. CodeMeYo's model registry is updated each release — upgrade if you're on older. See [Release Notes](Release-Notes) for when your provider's models were last refreshed.

### Ollama — "does not support tools"

Some Ollama models don't implement tool calling. CodeMeYo's smart error message suggests models that do. Recommended tool-capable Ollama models:

- `llama3.1`
- `qwen2.5-coder`
- `deepseek-r1`

See [LLM Providers → Ollama](LLM-Providers#7-ollama-local-models).

---

## Chat mode / strategies

### "Chat mode treating my question like code"

Fixed in v0.2.515 / v0.2.910. Chat mode now sends the raw user message with zero project context, file list, or code injection. Upgrade if you're on older.

If you still see it on v1.0+, file a bug with the conversation transcript.

### Deep Think doesn't actually use multiple providers

You have only one enabled. Settings → Providers, enable at least two (or all 8). See [Deep Think → Provider selection](Deep-Think#provider-selection).

### Deep Think state doesn't persist across restart

Fixed in v1.5.4. All four proposal cards, critiques, synthesis, and phase indicator are now restored on restart. Upgrade.

### Synthesis plan lost on restart

Fixed in v0.1.900. Upgrade.

### Round Robin skips providers silently

By design. If a provider fails (rate limit, 5xx), Round Robin logs a yellow `[Agent] Provider X failed, continuing with Y` and moves on. Check **Activity** to see which provider errored and why.

---

## Conversations

### Conversations disappear on restart

Fixed across multiple versions:

- v0.1.710 — CSP was blocking Tauri IPC, causing every `invoke()` to silently fail. Upgrade.
- v0.1.855 — Conversations-not-saving for Gemini/DeepSeek/Mistral/Ollama/Groq (database only seeded 3 providers originally). Upgrade.
- v1.5.0 — AI responses in Deep Think / synthesis / certain strategies weren't being saved. Upgrade.
- v1.5.1 — "FOREIGN KEY constraint failed" when saving messages. Upgrade.

If on latest and still seeing this, open DevTools (F12) and check for errors in the console.

### Deleted conversations come back

Fixed in v0.1.855. `deleteConversation` now calls the backend `delete_conversation` Tauri command. Upgrade.

### New conversations from "+" button don't stick

Fixed in v1.5.1. Upgrade.

---

## Account + sign-in

### "Your account is banned"

Reason is shown on the login screen. Email `support@jagjourney.com` if you think it's a mistake.

### Email verification never arrives

1. Check spam.
2. Sign in at [codemeyo.com/login](https://codemeyo.com/login) — there's a banner at the top of every page with a **Resend verification email** link.
3. If still nothing, email `support@jagjourney.com`. The admin panel has a "send manual verification" action.

### 2FA code never accepted

1. Device clock drift. Make sure your phone clock is auto-synced.
2. Wrong app. The QR code is a standard TOTP URL — any authenticator works (Google, Authy, 1Password, Bitwarden, etc.).
3. Lost device. Use one of the recovery codes you saved at setup. Contact support if you didn't save them.

### "Sign in via browser" hangs forever

Device-code flow. The browser might have popped up behind another window — bring it forward and complete the flow. If the code has already expired (10min window), cancel and start over in the app.

---

## Billing + donations

### I donated but don't see it in `/dashboard/billing`

Several possibilities:

1. **Mode mismatch.** If you donated while the admin panel was set to **test** mode but is now in **live** mode (or vice versa), the dashboard might filter it out. Check the admin panel's Stripe mode and flip temporarily. See [Donations → Test vs live mode](Donations#test-vs-live-mode).
2. **Webhook not delivered.** Check [/admin/donations](https://codemeyo.com/admin/donations) — if your row doesn't appear there, the Stripe webhook at `POST /api/webhooks/stripe` didn't receive the event. Re-check webhook setup: URL, signing secret, selected events. See [Donations → Stripe webhook setup](Donations#stripe-webhook-setup).
3. **Different email.** Donation is matched by the Stripe Checkout email. If you donated with one email and signed up with another, they don't auto-link. Email `support@jagjourney.com` to link them.

If nothing else works, admins can backfill — see [Donations → Backfilling missed donations](Donations#backfilling-missed-donations).

### `/dashboard/billing` 500

Fixed in v1.9.1. The earlier issue was a missing Stripe customer record for users who'd never done a Stripe checkout. The page is now a native Laravel page showing donation history + OS-level subscription deep-links, no Stripe customer lookup required.

Upgrade / reload. If still 500ing, check `storage/logs/laravel.log` on the server side.

### Pro subscription from iPhone doesn't show in desktop app

The entitlement endpoint (`GET /api/v1/entitlements`) caches for 24 hours on the client. Sign out + back in to force a refresh. Or wait up to 24h.

If it still doesn't show after a fresh sign-in, the Apple IAP webhook might have failed to verify (since v1.9.0 it does full ES256 JWS verification). Admin: check `/admin/subscriptions` for the user — if no row is there, the IAP server notification didn't succeed.

---

## MCP servers

### Server won't start

1. Check the command exists on your PATH:
   ```bash
   which npx      # or whatever your server uses
   ```
2. Check the `args` array is correct — a missing comma is a common trap in hand-edited JSON.
3. Check env vars referenced as `${VAR}` are actually set in your system env.
4. **MCP → Activity** tab shows stderr from the server process.

### Server connects but no tools appear

1. Wait — discovery is async, takes a few seconds after connect.
2. Restart the server from the Servers tab.
3. Server might expose only resources / prompts, not tools. Check the **Tools** tab → Resources / Prompts sub-tabs.

### HTTP transport connection refused

1. Verify URL with `curl -X POST <url>`.
2. Firewall / corporate proxy blocking.
3. Auth token expired — refresh in the OAuth tab.

### stdio server fails on iOS / Android

stdio MCP servers run as child processes, which isn't possible on mobile. Use HTTP/remote MCP servers on mobile instead. See [MCP Servers](MCP-Servers).

---

## Browser automation

### "Cannot reach CDP at port 9222"

Browser isn't running with `--remote-debugging-port=9222`. Click the **Launch** button in the Browser Debug panel (creates a separate profile automatically), or close all browser windows and reopen with the flag. See [Browser Debug Guide](Browser-Debug-Guide).

### Launch button opens browser but Connect still fails

1. Wait 2-3 seconds after launch — browser needs time to boot.
2. Another process on port 9222? Check with `netstat -ano | findstr :9222` (Windows).

### Extension shows "Disconnected"

1. Start the Extension Server in CodeMeYo (Extension tab → Start Server).
2. Token mismatch between app and extension popup.
3. Port mismatch (default 9333 in both).

### CDP screenshot is blank

You're on a `chrome://` or `about:` page. CDP can only screenshot real web content. Switch to a tab with a normal URL via `BrowserListTabs`.

---

## Terminal / commands

### Agent command timed out

Default timeout is 120s, max 600s. Long-running commands (big builds, Rust compilation) might need the max. Change in Settings → Agent → Command timeout.

### "cmd.exe window keeps popping up on Windows"

Fixed in v0.1.725. `CREATE_NO_WINDOW` flag added to all `Command::new` calls. Upgrade.

### Git panel crashes without a project

Fixed in v0.1.725. Upgrade.

---

## Auto-updater

### "Sign in for updates" banner but I am signed in

Force-refresh the sign-in state:

1. Account panel → Sign out.
2. Sign back in.
3. Banner should disappear.

If persistent, delete `updater_cache.json` from the app data directory (see [Configuration → Application data location](Configuration#application-data-location)) and restart.

### Updater prompts for same version repeatedly

Usually a semver issue. Fixed in v1.0.5 — all tags are now strict semver. If on v1.0+, this shouldn't happen. File a bug if it does.

### Signature verification failed during update

Corrupt download or CDN hiccup. Retry. Don't install if the signature fails — it means the archive was tampered with or truncated in transit.

### Windows auto-update doesn't detect anything

Fixed in v1.5.2. `latest.json` now includes Windows platform entries. Upgrade manually to v1.5.2+ and future updates will flow automatically.

---

## Log file locations

| OS | Path |
|---|---|
| Windows | `%APPDATA%\com.jagjourney.codemeyo\` |
| macOS | `~/Library/Application Support/com.jagjourney.codemeyo/` |
| Linux | `~/.config/com.jagjourney.codemeyo/` |

Key files:

| File | Contents |
|---|---|
| `codemeyo.db` | SQLite — conversations, messages, settings, history |
| `mcp_servers.json` | MCP configs |
| `entitlement_cache.json` | Cached plan / Pro status |
| `updater_cache.json` | Latest-version metadata |

### Viewing live logs

- **Development builds:** logs print to the terminal where you ran `pnpm tauri dev`.
- **Release builds:** press F12 or `Ctrl+Shift+I` / `Cmd+Option+I` to open DevTools. Rust-side tracing logs still print to stdout only — run from a terminal if you need them.

---

## Reset all settings

Delete the local database to nuke all conversations, settings, and project history. API keys in the OS keychain survive.

**Close CodeMeYo first**, then:

```powershell
# Windows
Remove-Item "$env:APPDATA\com.jagjourney.codemeyo\codemeyo.db"
```

```bash
# macOS
rm ~/Library/Application\ Support/com.jagjourney.codemeyo/codemeyo.db
```

```bash
# Linux
rm ~/.config/com.jagjourney.codemeyo/codemeyo.db
```

### Reset just MCP config

```powershell
# Windows
Remove-Item "$env:APPDATA\com.jagjourney.codemeyo\mcp_servers.json"
```

```bash
# macOS
rm ~/Library/Application\ Support/com.jagjourney.codemeyo/mcp_servers.json
```

```bash
# Linux
rm ~/.config/com.jagjourney.codemeyo/mcp_servers.json
```

### Reset API keys

Clear each key field in Settings, or delete from the OS keychain directly:

```bash
# Windows — open Credential Manager → Windows Credentials → find com.jagjourney.codemeyo entries → Remove

# macOS
security delete-generic-password -s com.jagjourney.codemeyo

# Linux
secret-tool clear service com.jagjourney.codemeyo
```

### Full reset (sign out + clear everything)

1. Account panel → Sign out.
2. Close CodeMeYo.
3. Delete the whole app-data directory:

```powershell
# Windows
Remove-Item "$env:APPDATA\com.jagjourney.codemeyo\" -Recurse -Force
```

```bash
# macOS
rm -rf ~/Library/Application\ Support/com.jagjourney.codemeyo/

# Linux
rm -rf ~/.config/com.jagjourney.codemeyo/
```

4. Delete keychain entries (commands above).
5. Relaunch — fresh install experience.

---

## Common error messages

| Error | Cause | Fix |
|---|---|---|
| "Failed to invoke command" | Tauri IPC error | Restart the app. If persistent, reinstall. |
| "Database locked" | Multiple CodeMeYo instances running | Close all, relaunch. |
| "Connection refused" | LLM API unreachable | Check internet, check endpoint override in Settings. |
| "Context length exceeded" | Message history too big | Use a bigger-context model, or start a new conversation. |
| "Insufficient funds" | Provider account out of credits | Add credits on the provider's dashboard. |
| "account_banned" (API) | User is banned | Email `support@jagjourney.com` with your ban reason. |
| "feature_disabled" (API) | Feature flag is off | Admin needs to flip the flag at `/admin/feature-flags`. |

---

## Getting help

1. Search [GitHub Issues](https://github.com/jagjourney/codemeyo/issues).
2. Open a [new issue](https://github.com/jagjourney/codemeyo/issues/new) with:
   - Steps to reproduce
   - Expected vs actual behavior
   - OS + version
   - CodeMeYo version (shown in Settings → About or the title bar)
   - Relevant console errors / log lines
3. For private reports: `support@jagjourney.com`.
4. For security disclosures: `security@jagjourney.com`.

---

## Related pages

- [Configuration](Configuration) — paths, settings, keychain details.
- [Account System](Account-System) — sign-in, 2FA, device list.
- [Auto-Updater](Auto-Updater) — update behavior.
- [Release Notes](Release-Notes) — what got fixed in which version.
- [FAQ](FAQ) — short answers to common questions.
- [Contributing](Contributing) — how to file a bug or security report.
