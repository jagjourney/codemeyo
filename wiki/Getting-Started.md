# Getting Started

This page walks you through installing CodeMeYo, creating your free account, adding your first API key, and running your first autonomous task.

As of v1.9.0, downloads are gated behind a free [codemeyo.com](https://codemeyo.com) account. The app itself remains free to use — the account exists so you can receive auto-updates, pair mobile devices, and (when it ships) unlock [Remote PC Code](Mobile-App#remote-pc-code).

---

## 1. Create a free account

1. Go to [codemeyo.com/register](https://codemeyo.com/register).
2. Enter an email, password, and click **Create account**.
3. Check your inbox for the verification link. Verified email is required before Pro features unlock. You can download immediately without verification — but [Backend API](Backend-API) access and (later) Pro need it.
4. Optional but recommended: turn on **2FA** from [/dashboard/profile](https://codemeyo.com/dashboard/profile). See [Account System → 2FA](Account-System#2fa-setup).

No credit card. Free forever for the desktop + mobile app itself. See [Account System](Account-System) for the full tour.

---

## 2. Download and install

Go to [codemeyo.com/download](https://codemeyo.com/download) while signed in. You'll be offered the installer for your current platform with the right architecture pre-selected.

### System requirements

| Platform | Minimum |
|---|---|
| Windows | Windows 10 (1803+) or Windows 11, WebView2 |
| macOS | macOS 11 Big Sur+, Apple Silicon or Intel |
| Linux | Ubuntu 20.04+, Fedora 38+, or any distro with WebKitGTK 4.1 |
| iOS | iOS 15+ (TestFlight during preview — see [Mobile App](Mobile-App)) |
| Android | Android 10+ (aarch64 / armv7 — [Mobile App](Mobile-App)) |

### Windows

1. Download the `.msi` or `.exe` installer for your architecture.
2. Run the installer.
3. If SmartScreen flags the installer as unrecognized, click **More info** → **Run anyway**. We're working toward full EV code-signing; until then it shows as unsigned.
4. Launch from the Start Menu.

### macOS

1. Download the `.dmg`.
2. Open the DMG and drag **CodeMeYo** to **Applications**.
3. On first launch right-click the app and choose **Open** to bypass Gatekeeper. (Or **System Settings → Privacy & Security → Open Anyway**.)
4. If the app reports as damaged after download: `xattr -cr /Applications/CodeMeYo.app`

If you had v1.8.x or earlier installed under the old bundle ID `com.codemeyo.app`, v1.9.0+ registers as `com.jagjourney.codemeyo` and will show up beside your old copy. Drag the old one to the Trash after you've signed in on v1.9.

### Linux

```bash
# Debian / Ubuntu
sudo dpkg -i codemeyo_1.9.1_amd64.deb
sudo apt-get install -f        # if any deps are missing

# Fedora / RHEL
sudo rpm -i codemeyo-1.9.1-1.x86_64.rpm

# Universal (AppImage)
chmod +x CodeMeYo_1.9.1_amd64.AppImage
./CodeMeYo_1.9.1_amd64.AppImage
```

Runtime dependencies (Debian/Ubuntu):
```bash
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev
```

---

## 3. Sign in from inside the app

Open CodeMeYo. In the sidebar, click the **Account** tab (person icon).

You have two sign-in paths:

- **Email + password** — just type your credentials from step 1.
- **Device-code flow** (recommended for mobile or when you don't want to type a password) — click **Sign in via browser**, CodeMeYo opens your default browser to `codemeyo.com/device`, you confirm the short code it displays, and the app picks up the session automatically. Same pattern as `gh auth login`. See [Account System → Device-code login](Account-System#device-code-login).

Once signed in, the sidebar shows your plan (Free / Pro / Team), avatar, and a link to your dashboard. The auto-updater now runs on your account — see [Auto-Updater](Auto-Updater).

---

## 4. Add your first API key

CodeMeYo uses **bring your own key** (BYOK) for all 8 LLM providers. You need at least one working key to do anything useful.

1. Open **Settings** (gear icon, or `Ctrl+,` / `Cmd+,`).
2. Find the **Providers** section. Toggle a provider **on** and paste your key.
3. Pick a model from the dropdown.

Full provider-by-provider key acquisition steps are on the [LLM Providers](LLM-Providers) page. Shortest path for each:

| Provider | Get a key |
|---|---|
| Anthropic (Claude) | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| OpenAI (GPT) | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| xAI (Grok) | [console.x.ai](https://console.x.ai) |
| Google (Gemini) | [aistudio.google.com](https://aistudio.google.com) |
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com) |
| Mistral | [console.mistral.ai](https://console.mistral.ai) |
| Groq | [console.groq.com](https://console.groq.com) |
| Ollama (local) | [ollama.com](https://ollama.com) — no key, runs on `localhost:11434` |

Keys are stored in your **operating system's native keychain** (Windows Credential Manager / macOS Keychain / Linux Secret Service). They are never written to plaintext files, the SQLite database, or any CodeMeYo server. Outbound traffic goes directly from the app to the provider's API.

---

## 5. Open a project and run your first task

1. Click the folder icon in the sidebar, or `Ctrl+O` / `Cmd+O`.
2. Pick a project directory. CodeMeYo indexes it — no contents uploaded anywhere, just paths and metadata.
3. Type a task in the chat input at the bottom and press Enter:
   - `"Add a dark mode toggle to the settings page."`
   - `"Fix the failing tests in the auth module."`
   - `"Create a REST API endpoint for user registration."`
4. Watch it go. The agent plans, reads files, edits them, runs commands, and verifies.

### Code vs Chat mode

Top bar has **Code** / **Chat** selector. In **Code** mode the agent runs tools (reads files, writes files, runs commands, commits). In **Chat** mode it just talks — no tools, no file edits. Useful for brainstorming before you commit to an approach.

### Strategies

Within either mode, pick a **strategy**:

| Strategy | What it does |
|---|---|
| **Single** | One provider does the whole task |
| **Round Robin** | Rotates between enabled providers each turn |
| **Deep Think** | All providers analyze in parallel, debate, and synthesize a single answer. See [Deep Think](Deep-Think). |
| **Consensus** | Like Deep Think but optimized for correctness — debate continues until providers converge |

### Permission levels

In Settings → Permissions, pick how much autonomy the agent has:

| Level | Reads | Writes | Commands | Git push/delete |
|---|---|---|---|---|
| Ask Every Time | Ask | Ask | Ask | Ask |
| Auto-Read | Auto | Ask | Ask | Ask |
| Auto-All | Auto | Auto | Auto | Ask |
| Full Auto | Auto | Auto | Auto | Auto |

Start on **Auto-Read** while you get comfortable.

---

## 6. Try Deep Think

The headline multi-LLM feature. On any task:

1. Enable at least two providers in Settings.
2. In the top bar switch the strategy from Single to **Deep Think**.
3. Ask a question or describe a task.

All enabled providers will analyze the problem in parallel, critique each other's proposals, and synthesize a final answer. You'll see four panels update live: **Analysis**, **Debate**, **Synthesis**, **Execution**. See [Deep Think](Deep-Think) for the full walkthrough.

---

## 7. Pair a phone (Coming Soon)

The **Remote** tab in the sidebar currently shows a Coming Soon card. When we open the feature up:

1. You'll open Remote on desktop, get a short pair code.
2. Install the iOS or Android app (see [Mobile App](Mobile-App)).
3. Enter the code on the phone.
4. Drive your desktop agent from anywhere.

Remote PC Code will be a Pro-tier feature sold through Apple App Store + Google Play only. Sign in with a free account now to be first in line.

---

## Where to go next

- [LLM Providers](LLM-Providers) — detailed key setup + recommended models.
- [MCP Servers](MCP-Servers) — extend the agent with external tools.
- [Deep Think](Deep-Think) — multi-model debate + synthesis.
- [Configuration](Configuration) — every setting, every config path.
- [Troubleshooting](Troubleshooting) — fixes for common issues.
- [FAQ](FAQ) — the short answers.

---

## Building from source?

Source is **closed**. We don't accept pull requests and the repository is not public. Bug reports and feature requests go to [GitHub Issues](https://github.com/jagjourney/codemeyo/issues). See [Contributing](Contributing).
