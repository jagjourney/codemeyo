# Terminal Commands

CodeMeYo includes a built-in terminal powered by [xterm.js](https://xtermjs.org/) with JetBrains Mono font. It serves two purposes:

1. **Direct shell access** - Run any command yourself
2. **Agent command viewer** - Watch what the AI agent executes in real time

## Built-in Commands

| Command | Description |
|---------|-------------|
| `help`, `?`, `/help` | Show the full command reference |
| `clear` | Clear the terminal screen |

## Shell Commands

Any standard shell command works directly in the terminal:

```bash
# File operations
ls                    # List files (or dir on Windows)
cd <path>             # Change directory

# Package managers
npm install           # Install Node.js dependencies
npm run dev           # Start dev server
pip install -r req.txt  # Python packages
cargo build           # Rust build

# Version control
git status            # Check repository status
git add .             # Stage all changes
git commit -m "msg"   # Commit changes
git push              # Push to remote

# Run scripts
python script.py      # Run Python
node index.js          # Run Node.js
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Execute the command |
| `Ctrl+C` | Cancel current command / clear input |
| `Backspace` | Delete last character |

## Agent Commands

When the AI agent runs commands, they appear in the terminal with a yellow `[Agent]` prefix:

```
[Agent] $ npm install express
[Agent] $ npm run test
```

Agent command output is displayed in real time. Output is limited to 50 lines in the terminal view to prevent flooding (full output is still captured internally).

If an agent command fails, you'll see `(command failed)` in red.

## Safety Features

- **120-second timeout** (default) - commands are killed after 2 minutes. Max configurable to 600s.
- **Dangerous pattern blocking** - patterns like `rm -rf /`, `format`, `shutdown`, `dd if=` are blocked.
- **Output truncation** - output is capped at 50,000 characters to prevent memory issues.
- **Working directory validation** - commands only run in valid project paths.

## 27 Agent Tools

The AI agent has access to 27 built-in tools that it selects automatically based on your request:

### File Operations
| Tool | Description |
|------|-------------|
| `ReadFile` | Read file contents |
| `WriteFile` | Create or overwrite a file |
| `EditFile` | Targeted string replacement in a file |
| `SearchFiles` | Find files by name pattern |
| `SearchContent` | Grep across all project files |
| `ListDirectory` | List files at a path |

### Execution
| Tool | Description |
|------|-------------|
| `RunCommand` | Execute shell commands (build, test, install) |
| `GitOps` | Git operations (commit, push, branch, merge) |

### Screen Capture
| Tool | Description |
|------|-------------|
| `CaptureScreenshot` | Screenshot the screen or a region |
| `ListBrowserWindows` | Detect open browser windows |
| `CaptureBrowserWindow` | Screenshot a specific browser window |

### CDP Browser Tools (requires debug browser)
| Tool | Description |
|------|-------------|
| `BrowserConnect` | Connect to browser via CDP |
| `BrowserListTabs` | List open browser tabs |
| `BrowserScreenshot` | Pixel-perfect browser screenshot |
| `BrowserGetDOM` | Read page HTML / DOM |
| `BrowserEvalJS` | Execute JavaScript in the page |
| `BrowserGetConsole` | Read console logs |
| `BrowserGetNetwork` | Read network requests |
| `BrowserGetStyles` | Get computed CSS styles |
| `BrowserClick` | Click elements or coordinates |
| `BrowserType` | Type text into fields |
| `BrowserNavigate` | Navigate to a URL |

### Extension Tools (requires CodeMeYo Bridge extension)
| Tool | Description |
|------|-------------|
| `ExtGetDOMMutations` | Live DOM change tracking |
| `ExtGetStorage` | Read localStorage/sessionStorage |
| `ExtInjectCSS` | Inject CSS rules into the page |
| `ExtGetPageInfo` | Get URL, title, meta tags |

## Agent Modes

CodeMeYo supports multiple agent modes that affect how commands are orchestrated:

| Mode | Description |
|------|-------------|
| **Single** | One LLM provider codes the entire task |
| **Round Robin** | Rotate between providers each iteration |
| **Deep Think** | All providers analyze, debate, then one executes |
| **Fallback** | Auto-switch to next provider on failure |

In **Round Robin** mode, if a provider fails, it's skipped and the terminal shows a warning. The agent continues with the next provider.

In **Deep Think** mode, there are 4 phases: Analysis, Debate, Synthesis, and Execution. Only the Execution phase runs tools in the terminal.

## Tips

- The terminal shares the same working directory as your loaded project
- You can manually run commands between agent iterations
- Agent tool calls appear in the terminal in real time, so you can monitor what the AI is doing
- If a command seems stuck, press `Ctrl+C` to cancel
- Type `help` anytime to see the full reference
