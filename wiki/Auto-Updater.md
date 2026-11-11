# Auto-Updater

CodeMeYo uses Tauri's built-in updater. The desktop app asks **[codemeyo.com/api/v1/updater/latest/{target}-{arch}](https://codemeyo.com/api/v1/updater/latest/windows-x86_64)** whether a newer version exists, and every update is downloaded from codemeyo.com and checked against a signature before it is installed.

Mobile apps do **not** use this endpoint - iOS and Android updates come from their app stores.

---

## The rule in one sentence

**Everyone can see that a new version is out. Signed-in users install it from inside the app; guests download it from [codemeyo.com/download](https://codemeyo.com/download).**

The app is never crippled without an account.

---

## Supported targets

The desktop builds published to the feed are:

| Target | Arch | Platform |
|---|---|---|
| `windows` | `x86_64` | Windows 10+, 64-bit Intel/AMD |
| `darwin` | `aarch64` | macOS on Apple Silicon (M1 and later) |
| `linux` | `x86_64` | Linux 64-bit (AppImage) |

---

## Update behavior by account state

### Guest (no account)

- The app checks the feed and tells you when a newer version is out.
- Installing happens from [codemeyo.com/download](https://codemeyo.com/download), which asks for a free account.

### Signed-in account

- The app checks the feed and offers **Install** when a newer version is out.
- The update prompt shows the version number and its release notes.
- Tauri verifies the download's signature before it replaces anything.

---

## How the check works (technical)

1. The app calls `GET /api/v1/updater/latest/{target}-{arch}` on codemeyo.com.
2. When a newer signed release exists, the answer looks like:
   ```json
   {
     "version": "1.11.12",
     "notes": "What changed in this release",
     "pub_date": "2026-10-26T22:05:59+00:00",
     "url": "https://codemeyo.com/api/v1/updater/files/123",
     "signature": "<base64 minisign>"
   }
   ```
   When nothing newer is published, the answer is `204 No Content`.
3. Tauri compares `version` to the installed version. Newer? It offers the update.
4. On **Install**, Tauri downloads the file from `url` on codemeyo.com.
5. Tauri verifies the file's minisign signature against the public key built into the app. A mismatch aborts the update and shows an error.
6. Tauri installs the update and restarts the app.

The signing key is held privately by CodeMeYo and never leaves our release process. The public key is built into every release. If you see a signature verification error, either the download was corrupted or someone tampered with it in transit - don't install it.

---

## Version highlights for updater users

- **v1.5.9** - Release notes in the update prompt.
- **v1.5.2** - Windows updates are detected reliably.
- **v1.0.5** - Strict semver for every release. Tauri's updater won't detect a new version if either the installed or available version is malformed semver.

---

## Rolling back

If a release is broken we withdraw it from the feed, and new checks get the previous good version. Tauri's updater does not downgrade an app that already updated; to go back, download the older installer from [codemeyo.com/download](https://codemeyo.com/download) when it is offered, or wait for the fixed release.

---

## Mobile updates

iOS and Android updates come from the App Store and Play Store respectively. **Not** the `/api/v1/updater/latest` endpoint. If you see a "new version available" on mobile, it's the store telling you, not CodeMeYo.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| The app says an update is out but offers no Install button | Sign in from the Account tab, or download the new version from [codemeyo.com/download](https://codemeyo.com/download). |
| "Update available" but clicking Install does nothing | Check disk space and write permissions to the install directory. On Windows you may need to run as admin for writes to `Program Files\CodeMeYo\`. |
| Signature verification failed | Redownload. Don't install. If it keeps failing on fresh downloads, contact us at [codemeyo.com/contact](https://codemeyo.com/contact). |
| Updater keeps prompting for the same version | Install the newest version from [codemeyo.com/download](https://codemeyo.com/download) once, then let the updater take over. |

---

## Related pages

- [Account System](Account-System) - why signing in matters.
- [Changelog](https://codemeyo.com/changelog) - every release's changes.
- [Configuration](Configuration) - app settings and data locations.
