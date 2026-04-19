# Auto-Updater

CodeMeYo uses Tauri's built-in updater, driven by an authenticated endpoint at **[codemeyo.com/api/v1/updater/latest/{target}-{arch}](https://codemeyo.com/api/v1/updater/latest/windows-x86_64)**. Signed-in users get automatic update checks; guests see a "Sign in for updates" prompt with no background polling.

This design shipped in v1.9.0 as part of the SaaS platform build. Before that the updater pointed at GitHub's public `latest.json` directly — now it goes through the Laravel backend so we can deduplicate real users, measure actual active-install counts, and (eventually) offer opt-in pre-release channels for Pro.

Mobile apps do **not** use this endpoint — iOS and Android updates come from their respective app stores.

---

## The rule in one sentence

**Signed-in users auto-update. Guests stay on whatever version they installed until they sign in or manually re-download.**

The app is never crippled without an account — it just doesn't check for updates in the background.

---

## Supported targets

The endpoint accepts these `{target}-{arch}` values:

| Target | Arch | Platform |
|---|---|---|
| `windows` | `x86_64` | Windows 10+, 64-bit Intel/AMD |
| `darwin` | `aarch64` | macOS on Apple Silicon (M1/M2/M3/M4) |
| `darwin` | `x86_64` | macOS on Intel |
| `linux` | `x86_64` | Linux 64-bit |

Requests to unknown targets return 404. Route regex:

```
windows-x86_64 | darwin-aarch64 | darwin-x86_64 | linux-x86_64
```

---

## Update behavior by account state

### Guest (no account)

- App runs forever on whatever version was installed.
- On each launch, a **dismissible banner** reads "Sign in for updates" with a one-click link to `codemeyo.com/signup`.
- **No update check** happens in the background.
- User can manually download a newer version from [codemeyo.com/download](https://codemeyo.com/download) (which now requires creating a free account — so this is a one-time friction to stay on the update treadmill).

### Signed-in Free account

- Updater hits `GET /api/v1/updater/latest/{target}-{arch}` with the user's Sanctum bearer token.
- Server returns a signed Tauri `latest.json` pointing at GitHub release artifacts via short-lived signed URLs.
- Tauri installer verifies the minisign signature against the bundled public key.
- Update prompt shows the version number, release notes (pulled from the in-app changelog — see v1.5.9), and **Install / Later** buttons.
- Default behavior: notify me, don't auto-install. Toggleable in Settings → Updates.

### Signed-in Pro account

- Same as Free, **plus** opt-in to pre-release / beta channel in Settings → Updates → Channel. Pre-release builds are cut from tagged release candidates (`v2.0.0-rc.1`, etc.).
- Pre-release isn't wired yet (since Pro itself isn't sold yet) — the toggle exists but the channel only returns stable versions for now. TODO: flip when we ship the first RC.

### Offline signed-in user

- App runs normally using last-known entitlement cache (24h TTL).
- Update check is deferred. Once online, a normal background check happens within 60 minutes.

---

## How Tauri's updater works (technical)

1. Tauri fires a check either on app start or on a timer (every 6h).
2. Check hits `GET /api/v1/updater/latest/{target}-{arch}` with `Authorization: Bearer <sanctum-token>`.
3. Response:
   ```json
   {
     "version": "1.9.1",
     "notes": "Pipeline fixes + homepage CMS wiring…",
     "pub_date": "2026-04-19T12:00:00Z",
     "platforms": {
       "windows-x86_64": {
         "signature": "<base64 minisign>",
         "url": "https://github.com/.../CodeMeYo_1.9.1_x64-setup.exe.tar.gz"
       }
     }
   }
   ```
4. Tauri compares `version` to the current app version (`package.json`). Newer? Prompt.
5. User clicks **Install**. Tauri downloads the archive from the signed URL.
6. Tauri verifies the archive's minisign signature against our bundled public key (set in `src-tauri/tauri.conf.json` → `plugins.updater.pubkey`). Signature mismatch → abort, log, show error.
7. Tauri extracts, replaces the installed binary, and restarts.

The signing private key is held by Jag Journey, LLC and lives on an offline machine. The public key is baked into every release. If you see a signature verification error, that means either a corrupted download or someone tampering with the archive mid-flight — don't install it.

---

## Settings toggles

In the app, open **Settings → Updates**. Three main toggles:

| Setting | Default | Options |
|---|---|---|
| **Update behavior** | Notify me | Auto-install on next restart / Notify me / Manual only |
| **Update channel** | Stable | Stable / Pre-release (Pro only, currently no-op) |
| **Check frequency** | Every 6 hours | Every hour / 6h / 24h / On launch only |

Setting "Manual only" means the app never checks automatically. Use **Check for updates** in the Help menu to trigger a manual check.

---

## Version highlights for updater users

- **v1.5.9** — Release notes in the update prompt. Before this, the prompt just said "v1.9.1 available"; now it shows what actually changed.
- **v1.5.2** — Windows updates now actually detected. Fixed a regression where `latest.json` was missing the Windows platform entry.
- **v1.0.5** — Strict semver for every release. No more `1.0.012`-style tags. Required because Tauri's updater won't detect a new version if either the installed or available version is malformed semver.

---

## Release channel behind the endpoint

The endpoint serves the **latest stable** release by default. Behind the scenes the server looks up the most recent row in the `releases` table (seeded by CI on every tag push) with channel `stable`. The `releases` row stores:

- Version
- Release notes (markdown)
- `pub_date`
- Per-platform: signed URL + minisign signature + SHA256 + file size

GitHub is the actual artifact host. The Laravel API is just the signed-URL issuer and the release-metadata source of truth. That split means we can swap GitHub for another host (S3 / R2 / MinIO) without touching the desktop app.

---

## Rolling back

If a release is broken and we need to pull it:

1. Admin flips the `releases` row's `channel` from `stable` to `broken` in the admin panel.
2. The endpoint immediately returns the previous stable release for any new updater checks.
3. Users who already updated can roll back by downloading the older installer from [GitHub Releases](https://github.com/jagjourney/codemeyo/releases) and installing over the top.

There's no automatic rollback for already-updated users — Tauri's updater doesn't support downgrades.

---

## Mobile updates

iOS and Android updates come from the App Store and Play Store respectively. **Not** the `/api/v1/updater/latest` endpoint. If you see a "new version available" on mobile, it's the OS telling you, not CodeMeYo.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Banner says "Sign in for updates" but I am signed in | Force-refresh the entitlement cache: sign out and back in. If persistent, file a bug with `updater_cache.json` contents (see [Configuration → Application data location](Configuration#application-data-location)). |
| "Update available" but clicking Install does nothing | Check disk space + write permissions to the install directory. On Windows you may need to run as admin for writes to `Program Files\CodeMeYo\`. |
| Signature verification failed | Redownload. Don't install. If it keeps failing on fresh downloads, file a bug — might be a CDN / build-pipeline issue. |
| Updater keeps prompting for the same version | Happens if `package.json`'s `version` doesn't match the tagged release. We fixed this class of bug in v1.0.5 by enforcing strict semver. |

---

## Related pages

- [Account System](Account-System) — why signing in matters.
- [Backend API → /updater/latest](Backend-API#get-updaterlatestplatform) — endpoint details.
- [Release Notes](Release-Notes) — every release's changes.
- [Configuration → Updates](Configuration#updates) — the in-app toggle.
