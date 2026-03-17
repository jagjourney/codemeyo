# Getting Started

This guide walks you through installing CodeMeYo, setting up your API keys, and running your first autonomous coding task.

---

## System Requirements

| Requirement | Details |
|---|---|
| **OS** | Windows 10+, macOS 11+, Linux (Ubuntu 20.04+, Fedora 38+, etc.) |
| **RAM** | 4 GB minimum, 8 GB recommended |
| **Disk** | ~200 MB for the application |
| **Internet** | Required for LLM API calls (not required for Ollama local models) |
| **WebView** | WebView2 (Windows, pre-installed on Windows 10+), WebKitGTK (Linux) |

---

## Installation

### Windows

1. Download the latest `.msi` or `.exe` installer from the [Releases page](https://github.com/jagjourney/codemeyo/releases/latest).
2. Run the installer and follow the prompts.
3. Launch CodeMeYo from the Start Menu or desktop shortcut.

> **Note:** Windows may show a SmartScreen warning for unsigned builds. Click "More info" then "Run anyway" to proceed.

### macOS

1. Download the latest `.dmg` file from the [Releases page](https://github.com/jagjourney/codemeyo/releases/latest).
2. Open the `.dmg` and drag CodeMeYo to your Applications folder.
3. On first launch, right-click the app and select "Open" to bypass Gatekeeper.

> **Note:** If macOS blocks the app, go to **System Settings > Privacy & Security** and click "Open Anyway."

### Linux

Download the appropriate package for your distribution from the [Releases page](https://github.com/jagjourney/codemeyo/releases/latest):

**Debian/Ubuntu (.deb):**
```bash
sudo dpkg -i codemeyo_0.1.0_amd64.deb
sudo apt-get install -f  # Install any missing dependencies
```

**Fedora/RHEL (.rpm):**
```bash
sudo rpm -i codemeyo-0.1.0-1.x86_64.rpm
```

**AppImage (universal):**
```bash
chmod +x CodeMeYo_0.1.0_amd64.AppImage
./CodeMeYo_0.1.0_amd64.AppImage
```

**Required Linux dependencies:**
```bash
# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev

# Fedora
sudo dnf install webkit2gtk4.1-devel libappindicator-gtk3-devel librsvg2-devel
```

---

## First Launch Walkthrough

### Step 1: Open the Settings Panel

When you first launch CodeMeYo, open the **Settings** panel by clicking the gear icon in the sidebar or pressing `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS).

### Step 2: Add Your API Keys

CodeMeYo requires API keys from the LLM providers you want to use. You need at least one key to get started.

| Provider | Where to Get a Key | Link |
|---|---|---|
| **Anthropic (Claude)** | Anthropic Console | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI (GPT)** | OpenAI Platform | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| **xAI (Grok)** | xAI Console | [console.x.ai](https://console.x.ai) |
| **Google (Gemini)** | Google AI Studio | [aistudio.google.com](https://aistudio.google.com) |
| **DeepSeek** | DeepSeek Platform | [platform.deepseek.com](https://platform.deepseek.com) |
| **Ollama (local)** | Install Ollama | [ollama.com](https://ollama.com) |

Enter your API key in the corresponding field under **Settings > Providers**. Enable each provider you want to use with the toggle switch.

> **Security:** API keys are stored in your operating system's secure keychain (Windows Credential Manager, macOS Keychain, or Linux Secret Service). They are never transmitted anywhere except directly to the respective provider's API.

### Step 3: Choose a Model

Each provider offers multiple models with different capabilities, speeds, and costs. Select a model from the dropdown for each enabled provider. The Settings panel shows context window size, output limits, and pricing for each model.

**Recommended starting models:**

| Provider | Recommended Model | Why |
|---|---|---|
| Claude | Claude Sonnet 4.6 | Best balance of speed and intelligence |
| GPT | GPT-5.4 | Latest frontier model |
| Grok | Grok 3 | Most capable Grok model |

### Step 4: Open a Project

Click the folder icon in the sidebar or use `Ctrl+O` / `Cmd+O` to open a project directory. CodeMeYo will index your codebase to understand the project structure and provide relevant context to the agent.

### Step 5: Start Coding

Type a task in the chat input at the bottom of the screen and press Enter. For example:

- "Add a dark mode toggle to the settings page"
- "Fix the failing tests in the auth module"
- "Create a REST API endpoint for user registration"
- "Refactor the database layer to use connection pooling"

The agent will read your codebase, plan its approach, execute changes using its tools, and verify the results.

### Step 6: Control Autonomy

Set your preferred permission level in Settings:

| Level | Behavior |
|---|---|
| **Ask Every Time** | Agent proposes each action, you approve |
| **Auto-Read** | Reads files freely, asks before edits |
| **Auto-All** | Works autonomously, asks before push/delete |
| **Full Auto** | Complete autonomy for maximum speed |

---

## Building from Source

If you prefer to build CodeMeYo yourself:

### Prerequisites

- **Rust** (latest stable) — install via [rustup.rs](https://rustup.rs)
- **Node.js** 20+ and **pnpm** 9+
- **Tauri CLI** — `cargo install tauri-cli`
- Platform-specific build tools:
  - **Windows:** Visual Studio C++ Build Tools, WebView2
  - **macOS:** Xcode Command Line Tools
  - **Linux:** `libwebkit2gtk-4.1-dev`, `libappindicator3-dev`, `librsvg2-dev`

### Build Steps

```bash
# Clone the repository
git clone https://github.com/jagjourney/codemeyo.git
cd codemeyo

# Install frontend dependencies
pnpm install

# Run in development mode (with hot reload)
pnpm tauri dev

# Build production release
pnpm tauri build
```

The built application will be in `src-tauri/target/release/bundle/`.

---

## Next Steps

- [Features](Features) — learn about all of CodeMeYo's capabilities
- [Configuration](Configuration) — detailed configuration options
- [FAQ](FAQ) — common questions and answers
