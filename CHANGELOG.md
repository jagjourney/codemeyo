# Changelog

Customer-facing additions, improvements, and fixes for CodeMeYo.

## Unreleased

## [2.1.3] - 2026-11-16

- JagAI models that hold a very long conversation, Claude Fable 5.2 among them, are now used at their full size. A long run is summed up when the model is really full, not far earlier, and a tool can hand the model much more at once.
- A JagAI web search can now write an answer as long as its model allows, instead of one fixed length.
- If you type the code from an earlier sign-in email after asking for a new one, CodeMeYo now tells you it is the earlier code, and it does not count as a wrong try.
- A finished JagAI reply now waits for your app for up to 30 days, instead of 30 minutes.
- A signed-in app is no longer asked to slow down: remote control from your phone, support tickets, updates and the model list answer as often as your app asks.
- JagAI models can now see pictures: a picture you attach, a screenshot the agent takes and a picture file it reads all go to the model itself. When a model can not read pictures the run says so and carries on without them.
- Thinking effort has two new choices, Minimum and Maximum: the lowest and the highest level each model takes. When a model thinks at another level than you picked, the run says which.
- Web search can run as many searches as a question needs, and a long search is no longer cut off after about two minutes.
- A model you typed in yourself on an API key card is no longer held to a fixed reply length: it writes as much as the model itself allows. Replies from workers and from Deep Think and Consensus models can now be as long as the model allows too.
- A local model is now offered every tool its context has room for, tool servers, workers and questions included, and can write longer replies. When something does not fit, the run says what was left out.
- A worker can now hire workers of its own for a part of the job that splits further. The worker count you set is how many work at once across the whole run, and the Subagents tab shows each worker under the one that hired it. A worker also gets the run's full step limit, not half.
- A change of any size is now shown line by line: a long change opens in pages you can go through, on its approval card and in the list of files a run changed, and a long line is no longer cut.
- The Git page now shows a new file or a folder of new files of any size, in pages you can go through. It no longer says a file is too large to show.
- Undo now covers every file a signed-in Claude, Codex or Grok app changes in one step, however many files and however large.
- Copies kept for Undo are no longer removed after 30 days. They stay until you keep or undo the change, and the list of files a run changed shows how much disk they hold, with one button to clear them all.
- A running command's card keeps showing new output for as long as the command runs, and All output lets you page through everything it wrote.
- The phone keeps every step of a run. Earlier steps brings back older ones, and no update is dropped when many arrive at once.
- Photos sent from the phone go at their full size, still with location and other hidden data removed.
- A skill's name can be as long as a folder name.
- On an iPhone the app now says iPhone, not iPad.
- On the emailed sign-in code screen, a code that is refused stays in the box, selected, so you can see which code it was and type over it, and the notice says when the newest code was sent.

## [2.1.2] - 2026-11-15

- No more fixed limits on what you can do: attach files and pictures of any size, keep notes and skills of any length, read any file or folder to its end from your phone, keep every schedule run and every background command's output, undo a change to a file of any size, write support tickets of any length, and send as many photos from your phone as you like. Deep Think waits for every model as long as it is still working, long conversations are summed up instead of cut, and where a model or your disk truly runs out of room the app says so and tells you what to do.
- Talk instead of typing on a Mac: the microphone in the message box, or Ctrl+Shift+D, listens and writes what you say into the box as you speak, and pressing it again or Escape stops. Your Mac turns the speech into text on the Mac where it can, and the box says when Apple does it instead.
- A conversation can now work in a copy of your project on a branch of its own, so several conversations at once never change the same files. See its changes, bring them into your project, keep the branch or discard the copy. Settings lists every copy with its size.
- Tool servers that ask you to sign in with your account now work: press Sign in on the server's row and finish in your browser. The sign-in renews itself and you can sign out at any time.
- Slack, Gmail, Google Drive, Google Calendar, Jira and Confluence, Asana, Canva and Vercel are back in the tool server catalog.
- Clicking a CodeMeYo notification now opens the conversation it is about, and you choose which notices you get: a run waits for you, finishes, or fails.
- While a run waits for you, the icon by the clock (in the menu bar on a Mac) says how many wait and lists each one. Schedules start on time with the window put away.
- In Deep Think and Consensus, the files a signed-in app reads and the searches it runs before the plan now show under that model, marked "By the app", and count in the run's tool calls.
- A JagAI coding step is no longer held to one fixed length: it can write as much as its model is set to allow. When your credits hold less, the step says so.
- When a model's provider turns a JagAI request down before it runs, the app now says so and suggests another model, instead of a general error.
- JagAI runs keep going when a model's provider is busy: the run says it is waiting and sends the step again. A conversation that has grown too long for the model is summed up and sent again, a step is never bigger than the room the conversation leaves, and the few models that cost more for a very long prompt show that rate on the JagAI page.
- JagAI models that can not use tools, such as Grok 4.20 Multi Agent and the GPT-5 Search models, are marked "Chat only". They work in Chat as before, and in Code the app asks you to pick another model instead of starting a run that would fail. What you typed stays in the box.
- Write to CodeMeYo Support from the contact page on the website. Your message becomes a support ticket: signed in, it shows under your account's tickets; signed out, we answer by email with a link where you read the answer and write back.
- No more fixed tops: run as many conversations at once as you like, pair any number of phones, set any number of workers on any model, and let a run take every step it needs. The step limit now starts at No limit, and a number you set has no top. When a provider or your computer says no, the app tells you why and keeps going.
- The Mac app now runs on Intel Macs as well as Apple Silicon. One download and one Mac App Store app serve both, and Intel Macs get updates in the app like every other Mac.
- When JagAI stops working on a reply before it is finished, the credits held for it now come back and the app says so in plain words, instead of waiting several minutes for an answer that will not come.
- Fewer limits again: the agent reads whole files and gets every search result and folder entry, and when something is more than the model can take it gets as much as fits and is told how to ask for the rest. Your instructions and the project's instruction files are sent whole, step lists and questions hold any number of items, a phone task can carry any number of photos, a hook runs as long as you set or with no time limit, a schedule can repeat every minute, and commands can run as long as they need.
- Anyone signed in can now open a support ticket from the app, with usage sharing and crash reports on or off. With them off, the ticket carries only what you write.

## [2.1.1] - 2026-11-15

- Code runs with your own OpenAI API key work with the newest OpenAI models again.
- Code runs with your own Gemini API key no longer stop after the first tool step.
- When a Codex, Claude or Grok subscription run fails, the app now says what went wrong and what to do, such as signing in again or choosing a model your plan includes.
- Multi-model runs use everything you switched on. Deep Think and Consensus now include every model that is on and every extra model you ticked for multi-model runs, each once, and each is labelled with its own model.
- A model that is too slow in a multi-model run is left behind after a set time, and the run says so instead of waiting on it.
- Round Robin no longer stops when one model only says what it will do next. The run ends when a second model agrees the task is done.
- DeepSeek now takes its turn in Round Robin, Deep Think and Consensus runs alongside other models.
- The reply of a multi-model run shows the model that wrote it, with its tokens, cost and duration.
- Talk instead of typing on Windows: a microphone in the message box, or Ctrl+Shift+D, starts Windows voice typing, and the words appear in the box for you to edit before you send. On a Mac, use Edit, Start Dictation.
- CodeMeYo can keep running by the clock on Windows and in the menu bar on a Mac when you close or minimize its window, so your runs, schedules and paired phones carry on. Choose what the close button and minimize do in Settings, Prompts and alerts.
- Pair up to five phones with one desktop. The Remote page lists each phone and can end one or all, and ending one leaves the others paired. When two phones answer the same approval or question, the first answer counts and the others see who answered.
- New Files screen on the phone: browse the desktop's open project and read its files, with pictures shown as pictures. A setting on the desktop's Remote page turns this off. Phones never change files.
- Ask for help inside CodeMeYo: open Support under You, write a ticket, and our replies show up right there, with a count when we have answered. The same tickets are under your account on the website.
- The Models page is now called LLMs, and the Claude subscription is called Claude Sub.
- The editor beside the conversation always fits the window. On a narrower window it opens over the conversation when you ask for it, and its scroll bar preview shows again.
- The top bar of the Workspace stays on one row. LLMs that do not fit are listed under a +N button, and the lead LLM always shows.
- The Files page shows the project's files in one list.
- Long lists are easier to read: the Usage request log and your account's devices show ten at a time with Previous and Next. The Devices list also shows which devices were revoked.
- Tools you add under MCP now start on Windows.
- A conversation started with the New conversation button is named after its first message.
- The Terminal's /git branches command lists your branches again.
- Long coding runs on JagAI no longer end early. A run used to stop at about 48 steps.
- Every model now knows its own name and the current date and time, so it can answer when you ask.
- With your own Claude, Gemini or DeepSeek key, the agent can write much longer files in one reply.
- Local Ollama models load with enough room for coding, get a lighter setup on small models, and show their reply as they write it. A model too small for coding says so right away.
- Work done by Claude Sub, Codex Sub and Grok Sub shows in the run step by step, and every file they change is listed under the reply with Keep and Undo.
- If your ChatGPT plan can not use the model Codex is set to, Codex Sub switches to a model your plan supports and tells you which one it used.
- New files show their content on the Git page before you stage them.
- Push, Pull and Fetch say what happened in plain words. When git can not sign in to a host, the page names the host and says how to fix it.
- The Terminal's command list is easier to read: drag the pane taller and it stays that way. Every command is also listed at codemeyo.com/guide/terminal.
- Tools from the MCP catalog ask for the key they need before they start, and explain plainly when a tool stops right after starting.
- The credit balance in the left bar no longer jumps back to an older number after a run.
- The Usage page on codemeyo.com shows the right token and cost totals. It counted JagAI calls more than once and showed cost too high. What you were charged was never affected.
- Writing a support ticket: when usage sharing or crash reports is off, the New ticket screen explains both and switches them on for you there.
- With your own OpenAI, Grok, Mistral or Groq key, the agent can write much longer files in one reply, and Grok, Mistral and Groq replies show as they are written.
- The tool catalog under MCP lists only tools their makers publish, each set up the way its maker documents. A tool that needs a key or a folder asks for it when you press Start.
- Long lines of code wrap inside the editor, with a switch to scroll sideways instead. Drag the edge of the side panel, the editor or the Activity drawer to make it wider or narrower, or put it away. The app remembers the sizes.
- CodeMeYo no longer reports a crash when Windows shuts down, restarts or signs out while the app is still running.
- Voice typing on Windows: when the Windows key is switched off on the computer, the app says so instead of typing a letter into the message box.
- Grok Sub no longer drops out of the later stages of a Consensus or Deep Think run on Windows.
- In Consensus and Deep Think, models only read your project until the plan is agreed. Files are changed and commands run only when the plan is carried out.
- A file open in the editor updates when a run, Git, the terminal or another program changes it. If you have unsaved edits in it, a bar tells you and lets you load the new version or keep your edits.
- Undo of a run by Claude Sub, Codex Sub or Grok Sub puts each file back exactly as it was, line ends included, so Git no longer lists an undone file as changed.

## [2.1.0] - 2026-11-15

- Fixed: version 2.0.8 closed as soon as the agent started working, in Chat and in Code, on every model. Runs start again.

## [2.0.8] - 2026-11-14

- JagAI models can now write far longer replies in one step, up to four times as much as before on Claude and GPT models. Writing or rewriting a large file no longer stops the run.
- A long JagAI reply no longer depends on one connection staying open while the model writes. The app hands the request over and collects the reply when it is ready.
- When a reply still runs past a model's output limit, the run no longer fails. The agent is told, and does the same work in smaller steps.
- An empty reply from JagAI is no longer reported as an OpenAI error.
- JagAI credits go further on a long job. Each step of a run sends the conversation so far again, and the part a model has already read is now billed at its much lower cached price instead of the full input price.
- A run keeps everything it did. Every file it read, every change and every command is saved as it happens and shown again when you open the conversation, also after a restart, a Stop or a failure, and your next message carries on from that work instead of starting over.
- Long jobs keep going. A run now works for up to 200 steps, a number you can change in Settings, and when it reaches the limit it says so and offers Continue. When a conversation fills the model's context, the agent sums up the older part and carries on instead of failing.
- You can type while the agent works. A message sent during a run waits in view, can be taken back, and reaches the agent before its next step. From a paired phone too.
- The conversation shows what the agent says between its tool calls, and a new Thinking view shows a model's reasoning where the model gives it.
- CodeMeYo tells you when a run ends, fails or waits for your approval while you are in another window: the taskbar or Dock signals it and the app shows a notice. An approval now waits for you instead of being refused after five minutes. You can turn the signals off in Settings.
- The agent reads your project's AGENTS.md and CLAUDE.md, follows standing instructions you write in Settings, and keeps notes about a project from one conversation to the next. Workers get the same, and the agent can start a worker that only reads and searches.
- Search finds text in every kind of file, including PHP, Vue, Ruby, C#, Kotlin and Swift, which it used to skip without saying so. It takes patterns, can ignore case, shows lines around a match and can filter by file name.
- The agent's git commands accept a commit message with spaces, and it can revert, restore, move, remove and blame.
- A command is no longer refused because a word such as halt or shutdown appears somewhere in it.
- The agent reads part of a long file by line, sees images and reads PDF text, makes several changes to a file in one step, and refuses to overwrite a file that changed since it read it.
- The agent can start a command in the background, such as a development server, keep working, read its output and stop it. A command's output shows on its card while it runs, and a command can run in a folder of the project.
- The agent can read a web page you point it to, after asking.
- Reads and searches the agent asks for together now run at the same time.
- Browser tools are offered to the model only when a browser is connected, which makes every step smaller.
- Type @ in the message box to name a file of your project, and / to use a prompt you saved in Settings.
- Code in a reply has a copy button, and colours on desktop. The conversation list searches what was said, not only titles. Deleting a conversation asks first. A finished run shows the tokens it used and about what it cost.
- Create, rename and delete files and folders from the file list. Stage or unstage part of a file on the Git page. The Terminal keeps its folder from one command to the next.
- On Windows and Linux, closing the window while a run is going asks first.
- Tools from a connected MCP server whose name has an underscore now work, a server's time limit is respected, and images a tool returns reach the model.
- The agent keeps a list of the job's steps, pinned above the message box, so you can see what is done, what it is working on and what is left. It shows on a paired phone too.
- Plan first: turn it on beside Strategy and the agent only reads and searches, writes a plan, and changes nothing until you approve it. You can answer with what to change instead, and it plans again.
- The agent can ask you a question with choices when your answer changes what it does next, and waits for it. Answer on the desktop or from your phone.
- For a large job the agent can propose how many workers to put on it, say which pieces can run side by side, and ask you first. Your answer sets the number for that run.
- Undo a run. CodeMeYo keeps each file as it was before the agent changed it, also across a restart, and every finished reply lists the files its run changed with Keep and Undo for the whole run, for one file, or for one part of a file.
- Always allow in this project: approve a command, a git action, a website or a connected tool once and the agent no longer asks for it in that project. Your rules are listed in Settings, where you can remove them. A rule never lets a longer or riskier command through.
- Change a command before you allow it, right on its approval card. The agent is told what you changed it to.
- A JagAI reply now shows while the model writes it, instead of appearing all at once when it is finished.
- The agent can search the web. A search runs through your CodeMeYo account and uses JagAI credits, whatever model the run is on, and comes back with a short answer and the pages it rests on. The agent asks before it searches.
- CodeMeYo sends a system notification when a run ends, fails or waits for you while you are in another window.
- The Terminal page is a real terminal: your own shell, with colours, prompts, interactive programs and Ctrl+C. The CodeMeYo commands sit in a bar below it.
- Commands the agent started no longer keep running when CodeMeYo closes unexpectedly.
- Several conversations can work at the same time, up to four. Start a job in one, switch to another and start a second: each keeps going in the background and is stopped, answered and approved on its own. The conversation list marks the ones at work and the ones waiting for you.
- Schedules: have a run start by itself every few hours, daily, on chosen weekdays or once at a set time, while CodeMeYo is open. Each schedule keeps a history of its runs, and a missed time can be caught up once.
- Skills: the agent loads instructions for one kind of work from a skill folder in your project or your home folder, and you can call one by typing / and its name. Skills you already use with Claude work as they are.
- Hooks: your own commands can run before or after a tool call, when a run ends or when it waits for you. A hook that runs before a tool call can block it and tell the agent why.
- Commands the agent runs can be kept inside the project, with or without the network, on Linux and on the direct download for Mac. When a command needs more, you are asked to run it once with full access.
- Thinking effort: choose how long JagAI models think on each step. The default is Medium, which uses fewer credits on simple steps.
- What a JagAI run cost is now read from your account, so the figure matches what was charged, also when you stop a run while a request is still being answered.
- On Windows and Linux, starting CodeMeYo a second time brings the open window forward instead of opening another one.
- A web search answer is no longer cut short on a question that needs several searches.
- A fresh install no longer shows the old JagAI tier prices before it has read the current rates.

## [2.0.7] - 2026-11-14

- On Windows, a command the agent runs with a path in double quotes now works. Before, every such command failed, and the agent spent steps and credits trying other ways to write it.
- The agent now knows from its first step which system it is on and which shell its commands run in.
- JagAI now prices each model by its own input and output rate, and the Models screen shows that price on the JagAI card. Credits go much further than before.
- Choose how much of a run the conversation shows, from the View menu beside Strategy. Normal keeps the changes to your files and folds every other tool call into one line you can open. Tool calls gives each call a row. Verbose opens every call on its input and output.
- A file the agent only reads no longer opens in the editor. The editor shows the files the agent changed and the files you open.
- The editor beside the chat has a close button, and it stays closed, also while the agent works and after a restart, until you open it again from the bar at the edge or open a file yourself.
- The file list in the editor and the Activity drawer remember that you closed them. The Activity drawer no longer opens itself on every run once you have collapsed it.
- The JagAI credit counter is right within seconds of stopping a run, instead of staying short by the amount held for the last request.

## [2.0.6] - 2026-11-14

- Signing in with your email and password now asks for a 7 digit code sent to your email. The code box takes a paste and fills from your phone's one-time-code suggestion.
- Choose the model each Claude, Codex and Grok subscription account runs, or keep its plan's default. Those subscriptions now list their models, and you can type a model id on their cards too.
- Several models of one subscription can take part in the same Round Robin, Deep Think or Consensus run.
- From your phone or tablet you can now pick which of your desktop's projects to work on, right after pairing and at any time from the run screen.
- A paired phone now stays paired for up to 30 days, and the Remote screen, the phone's Settings and your account's Pair page show until when.
- Unpairing on the phone, signing out, removing a device or the end of your plan now ends the pairing on both sides at once. You can also end a pairing from the Pair page of your account on codemeyo.com.
- Removing a device from your account now signs it out and ends its pairing.
- Every password box and API key box now has a Show button, so you can check what you typed.
- One tap on Send now sends your prompt while the phone keyboard is open.
- After a restart the desktop opens the project you were working in, so the desktop and a paired phone stay on the same project.
- The phone's Back button now closes an open panel instead of leaving the app.
- Typing a pair code in landscape now keeps the code boxes in view above the keyboard.
- The Delete account panel no longer opens the keyboard or lets a password manager fill in your password.
- Scrollbars no longer show on the phone and tablet screens.
- The run feed, Usage and the status bar now name the model that ran, and Grok subscription use no longer shows Grok API prices.
- The subscription cards on the Models screen show their full description again, and a card set to an older model offers to switch to the current one.
- When you add a tool server, its secret values and token can be shown to check them.
- On Mac, a HEIC photo you attach is now seen by the model.
- A follow-up in a chat now remembers that chat's earlier messages, in Code and Chat and with every model.
- A run that ended because its model failed now says Failed, on the desktop and on a paired phone, instead of Finished.
- Usage now counts the tokens of every model in a multi-model run and prices each call by the model that ran.
- The agent no longer asks you to approve a write or edit that would leave a file exactly as it is.
- Sign out is now one tap away on the phone and tablet, from the Pair screen and the run screen.
- New: Sign out and clear, on the phone, tablet and desktop, removes your sign-in and pairing from the device after asking first.
- Signing out now ends that sign-in on codemeyo.com and tells the paired device right away.
- An open app now notices within minutes when its sign-in ends, and says why.
- The Plan screen now tells a Pro you were given apart from an App Store or Google Play subscription.
- The chat stays readable on small windows: the editor narrows and the Activity panel opens over the chat when space runs short.
- The code editor fits narrow spaces better: the minimap hides, the file list opens over the code, and the status line trims itself.
- Switching projects now closes the files of the project you left, saving any unsaved edits first.
- The Remote screen says a phone is paired rather than connected, shows when it last sent a command, and the remote control banner shows the date the pairing ends.
- The Git screen explains a folder that is not a repository in plain words.
- The Models screen marks the active model card instead of showing a button that does nothing.
- The Subagents panel says plainly how many workers run beside the main agent.
- On Mac, the window fits the screen above the Dock and comes back to its size after full screen.
- On Mac, the direct download no longer asks for your login keychain password when the App Store version is signed in on the same Mac.
- A sign-in that has not been used for 90 days now ends, and that device asks you to sign in again.
- The Devices page of your account shows a device as paired only while its pairing is live.
- Signing out on the desktop now asks first.
- A follow-up also knows which files and commands the earlier turns used, and in a multi-model chat which model said what.
- A failed run now shows one error on a paired phone, not the same error several times.
- Reopening a file you closed shows what is on disk now.
- The API Tokens page of your account says that a token unused for 90 days stops working.

## [2.0.5] - 2026-11-14

- Tablets get their own layout: the run feed sits beside the controls, Pair and Settings use the width, and the app says tablet or iPad instead of phone.
- On Android, screens no longer run under the status bar or the navigation bar, and the prompt box, the send button and the Delete account buttons stay above the keyboard.
- The phone's run feed stays on the newest step, shows model and tool names in plain words, and formats the agent's replies with headings, lists and code.
- Approval requests on the phone and the desktop say what the agent wants to do in plain words. A screenshot request says it sees your screen, and denying one request no longer shows an error.
- Opening a CodeMeYo pairing link now opens the pairing prompt, including when the app was closed.
- Signing out on the phone now asks first.
- Picking several photos at once on Android adds them all.
- Screen readers can read and use the phone's approval, project and model sheets.
- The phone's status bar stays readable in the light and dark system themes, and the tab bar and sheets fit on screens with a side status strip.
- On Android, signing in with a code opens the approval page for you and keeps waiting if the connection drops while you approve. The approval page names the phone or tablet that is asking.
- Create account now says what to fix, such as a password that is too short, and reminds you to confirm your email before signing in.
- The phone and tablet sign-in screen no longer shows desktop-only options and has a Forgot password link. On iPhone, iPad and Mac it explains how to set a password for an account made on the website with Apple or another sign-in.
- When JagAI is busy, the app says so and asks you to try again in a moment. Nothing is charged.
- A JagAI run no longer stops with a security message after the agent takes a screenshot.
- Photos you attach, or send from the phone, are seen by Claude Code, Codex and Grok, and no longer fill the prompt with unreadable text.
- Runs on Claude Code now list each step it takes and show in Usage.
- Chat with one model asks only that model, and it knows the open project.
- Files the agent creates show up in the file list right away, and each project lists only its own conversations.
- The agent no longer asks to repeat an edit it already made, or to run checks a small task does not need.
- A paired phone no longer drops by itself, and is shown by its own name.
- The JagAI credit count updates during and after a run.
- A new install starts on JagAI instead of a model that needs a key.
- The code editor no longer marks every import as an error, Git says when a folder is not a repository, and a project folder that cannot be opened says so and lets you choose it again.
- Web fetch and Brave Search are marked read only.
- Right-clicking no longer shows browser or developer menu items, and F5, Ctrl+R and Ctrl+P no longer reload the screen or open a print dialog, so a running chat or task stays on screen.
- Signing in to another Claude, Codex or Grok account tells you where to finish and updates by itself when you come back.
- On Mac, your project folders stay open after you quit and reopen CodeMeYo. A project added before this update needs its folder chosen once more.
- On Mac, closing the window no longer quits CodeMeYo: a running task keeps going and the Dock icon brings the window back. Quitting during a task asks first.
- On Mac, View, Enter Full Screen and the green window button now go full screen.
- On the Models screen, the way-in cards always bring you to their provider, and typing your own model id no longer shows the previous model's details over the box.
- New models arrive in the list with a proper name, beside the other current models, and the Claude and OpenAI cards start on a current model instead of a legacy one.
- If codemeyo.com is briefly unavailable, the app waits a moment and checks again instead of showing an error.
- Your computers and phones show by name and app version in your device list after an update, and a new pairing code ends the earlier pairing.
- A device you remove from your device list no longer comes back by itself when that app is opened.
- Clearer wording on the Plan tab for subscribers.
- Reliability polish for the website during updates and short outages.

## [2.0.4] - 2026-11-13

- The model lists in the app now keep themselves up to date. A newly released model can appear in your list without waiting for an app update.
- Each API key card in Settings, Models has a custom model id field, so you can run a model on your own key before it is in the list.
- Reliability polish for JagAI requests from the desktop app.

## [2.0.3] - 2026-11-12

- The phone remote now tells you when your desktop is not answering instead of sending a task into thin air, and your photos only go out once the desktop is ready for them.
- Your desktop reconnects to your paired phone on its own after a restart or an update, and pairing no longer adds extra copies of your devices to your device list.
- Ending a remote session on the desktop now ends it for the phone too, even if the phone was closed at the time.
- The phone app now stays inside the screen in portrait and landscape: it no longer zooms in when you tap a field, and the send button stays visible above the keyboard.
- Signing in from the desktop app by approving in your browser now completes.
- The "Powered by Jag Journey, LLC" link at the bottom of the app now opens the right page.

## [2.0.2] - 2026-11-11

- The Models screen now shows providers as a grid of compact cards, three or four across on a wide window, so there is far less scrolling.
- From the phone app, choose which of your desktop's projects your next task goes to.
- Attach up to four photos from your library or camera to a task sent from your phone. They are resized on the phone and reach your desktop like any other attachment.
- Your phone now appears once in your device list, named iPhone, iPad or your Android model, instead of adding a new "unknown" entry each time you sign in.
- Signing up on the website with an email that already has an account, or one scheduled for deletion, now shows a clear message instead of an error page.
- Reliability polish: closing the app or installing an update is no longer counted as a crash.

## [2.0.1] - 2026-11-11

- Fixes a crash when opening the app on iPhone and iPad.
- Reliability polish for starting an agent run on every platform.

## [2.0.0] - 2026-11-11

- A new design for the whole desktop app, in dark and light, with an option to reduce motion.
- Replies now appear as they are written, with the models that support it.
- Pause and resume an agent run, from the desktop or from your phone.
- Before the agent writes or edits a file, you see what will change.
- A run timeline shows each step of a task and the model that took it.
- The iPhone, iPad and Android apps are now a remote for your desktop app: follow a run, send a task, approve or deny a request, pause, resume or stop, and switch models. Projects, files and the agent itself run on your Windows, Mac or Linux computer.
- On Windows and Mac, your API keys, your sign-in and saved tool secrets are now kept in the system's secure storage instead of the app's own files.
- Sign in to more than one Claude Code, Codex or Grok account. Give each one a name in Settings, Models, and sign in to it with the official app.
- A run order for Claude, OpenAI and Grok: choose which account a run tries first, and whether it may move on to JagAI credits or an API key when an account is signed out or has a billing problem. Moving on when an account reaches its usage limit is a separate switch that starts off.
- The run timeline shows when a run changes account, and why.
- Runs through the official Claude Code, Codex and Grok apps no longer pick up an API key set elsewhere on your computer, so they use your plan as intended.
- The Models screen now says which model families JagAI runs.
- Long project names no longer spill out of their card, and the support reminder no longer covers the Send button.
- Reliability polish across the agent, git, browser, tools and settings screens.

## [1.11.12] - 2026-10-26

- Fixes the crash on launch on iPhone and iPad with iOS 27 that 1.11.11 did not fully resolve.
- Improved stability on iPhone and iPad when the app's window is rearranged.

## [1.11.11] - 2026-10-25

- Fixes a crash on launch on iPhone and iPad with iOS 27.
- Linux installs now update themselves to new versions from inside the app.
- Updated the app framework on every platform, including stability work on Android for returning to the app from the background.

## [1.11.10] - 2026-10-25

- Brings every 1.11.9 improvement to Mac and Android.
- Reliability polish for Google Play subscriptions on Android.

## [1.11.9] - 2026-10-25

- JagAI credit packs can be bought through the App Store on iPhone, iPad, and Mac.
- App Store purchases finish only after your credits or Pro are on your account, so an interrupted purchase is delivered when you retry.
- Closing or switching away from a file comparison in the code editor no longer causes an error.
- Usage reports from installs that use your own provider API key upload again instead of retrying over and over.
- Error reports now say what kind of problem stopped an agent task, such as sign-in, credits, network, or an unavailable model, without sending your message.
- Agent errors are no longer reported as phone remote errors when no phone is connected.

## [1.11.8] - 2026-10-02

- Improved Google Play subscription compatibility on Android.

## [1.11.7] - 2026-10-02

- Reliability polish for Google Play subscriptions.

## [1.11.6] - 2026-10-02

- A paired phone stays connected for 12 hours. The pair code itself still expires after 5 minutes.
- Phone remote shows the desktop chat as it streams, including the current task, token counts, and file changes, and reconnects after a drop.
- Subscribe and billing pages only offer plans that are actually for sale, and they no longer promise synced conversations or a remote that is not offered.

## [1.11.5] - 2026-10-02

- Reliability polish for sign-in, sessions, and error reports.

## [1.11.4] - 2026-08-26

### Fixed

- On Apple, Settings billing no longer shows a greyed-out Use the App Store on Apple button. Subscribe Monthly and Subscribe Yearly remain the working App Store purchase buttons.

## [1.11.3] - 2026-08-26

### Added

- Paste, pick, or drag documents, spreadsheets, presentations, source files, archives, images, and other files into Chat or Code mode.
- File attachments now stay with saved and forked conversations.

### Improved

- CodeMeYo extracts readable file content for every model and keeps original files available to tool-capable coding agents for deeper inspection.
- Images keep their real file type when sent to vision-capable models.

## [1.11.2] - 2026-08-25

### Improved

- Signed-in users can now find Delete Account directly under Account > Privacy.
- Account deletion now signs out every device immediately and clearly explains permanent deletion timing and App Store subscription handling.

## [1.11.1] - 2026-08-23

### Added

- Added an All Projects tab where you can search, open, add, and remove every project CodeMeYo knows about.
- Added multi-folder selection so you can bring several existing projects into CodeMeYo at once.
- Added quick actions to continue working in a project or open its folder on your computer.
- Added a Mac App Store choice to the CodeMeYo download page alongside the direct macOS download.

### Improved

- The left navigation now follows a clearer Chat, Projects, Files, Git workflow.
- Project management clearly identifies the active project and explains that removing a project from CodeMeYo never deletes its files.
- Project management is available from the command search as well as the left navigation.

### Fixed

- On Apple, Account Plan now shows App Store subscribe buttons, prices, length, Terms of Use, and Privacy Policy. Play Store wording is gone from Apple builds.
- Adding the same folder more than once now selects the existing project instead of creating duplicates.
- CodeMeYo now protects unsaved file changes when removing a project and closes that project's open file references after removal.
- Activity history is no longer displayed in customer dashboards.

## [1.11.0] - 2026-08-19

### Added

- Right-hand Activity bar now has a Subagents tab. Set workers from 1 (main agent only) up to the max for the active provider. Extra workers are billed as more model usage and show live while they run.

## [1.10.61] - 2026-08-18

### Improved

- Reliability and account improvements.

## [1.10.60] - 2026-08-17

### Support

- Official help is only available when usage sharing and crash reports are both on. If either is off, use GitHub issues.

### Remote

- Monthly support of $3 to $9,999 now unlocks phone-to-desktop pairing, the same as Pro. One-time gifts still do not.
- Phone apps can scan the desktop QR, see live tasks, and join the conversation from anywhere. Android now asks for camera permission so the scanner can open.

## [1.10.59] - 2026-08-17

### Bug reports fixed and Improvements made

- The in-app Changelog now loads from the CodeMeYo site.

## [1.10.58] - 2026-08-17

### Models

- Subscription chips now say Claude Code Sub, Codex Sub, and Grok Sub, each with its own color. API chips say Claude API, Grok API, and the other vendor keys.

## [1.10.57] - 2026-08-17

### Improvements and bug fixes

- Reliability and polish.

## [1.10.56] - 2026-08-17

### Updates from the CodeMeYo site

- In-app updates come from this site. Signed-in installs check every 30 minutes and can update in place.
- Release notes come from the public changelog on this site.

### Billing and usage

- Settings, You, Billing shows monthly support, gifts, and a Pay by Jag checkout for monthly or one-time gifts.
- Usage totals can help improve reliability when usage sharing is on.

## [1.10.55] - 2026-08-17

### Downloads from CodeMeYo

- Installers now come from the CodeMeYo site. If you are not signed in, leave your email once so we can send product notes.
- Signed-in accounts get in-app updates. Without an account, CodeMeYo tells you a build is out and sends you to the site to download it.

### Version and build

- The app now shows the marketing version and a Build number, the same way our other desktop apps do.

## [1.10.54] - 2026-08-17

### Official Claude, Codex, and Grok

- Those three official apps need a signed-in CodeMeYo account and monthly support of $3 to $9,999. One-time gifts do not unlock them.
- JagAI credits and pasted API keys still work if you are signed out or not a monthly supporter.
- Turning off usage sharing does not close a paid monthly window.

## [1.10.53] - 2026-08-17

### Easier to find things

- The left rail groups Work, You, and Settings. You can expand it for labels or collapse it to icons, and hide the side panel.
- The title bar now shows the version, the active model, Chat or Code, and the strategy.
- Settings uses tabs: Subscriptions, API keys, Agent, Privacy, Look, Help, and Changelog.

### Subscriptions and API keys are separate

- Subscriptions is Claude Code, Codex, Grok, and JagAI. API keys is the pasted-key path. Claude Code no longer appears twice.

### Extra tools

- MCP is now Extra tools. Start only what you need. Search, filter On or Off, and see a short description instead of a long command list.

### Updates and activity

- Changelog search sits next to Check for update. You can also check every 30 minutes from Privacy.
- While the agent works, an Activity drawer shows live status and you can collapse it.

## [1.10.52] - 2026-08-17

### Claude, Codex, and Grok subscriptions

- Settings now finds the official Claude, Codex, and Grok apps in their normal install folders, even when Windows does not put them on PATH.
- Grok subscription chats no longer fail or stop mid-reply. SuperGrok / grok.com serves Grok 4.6 and 4.5; older Grok IDs still need an API key.
- Longer JagAI replies no longer cut off mid-sentence.

## [1.10.51] - 2026-08-16

### Sending a message no longer closes the Windows app

- Sending a Chat message could close CodeMeYo on Windows. The window now stays open.
- If Claude or Grok is selected without an API key or connected subscription, you get a Settings message instead of a blank crash.

## [1.10.50] - 2026-08-16

### Current models in Settings

- The model picker now lists the current Claude, OpenAI, Grok, Gemini, DeepSeek, Mistral, and Groq models as of August 16, 2026, including speeds and prices.
- New defaults: Claude Sonnet 5, Grok 4.6, GPT-5.6 Terra, Gemini 3.7 Flash.
- JagAI credit tiers now route those current models (Opus 5, GPT-5.6 Sol, Grok 4.6, and the matching Nova and Spark picks).
- Groq no longer offers the Llama 3.1 / 3.3 IDs that shut down today. Use GPT-OSS or Qwen 3.6 instead.

## [1.10.49] - 2026-08-16

### Claude, Codex, and Grok without API keys

- Connect the official Claude Code, Codex, or Grok subscription from Settings so you do not need to paste vendor API keys.
- Claude and Grok still accept a pasted key if you prefer that path.
- On Windows, Connect now starts the official Claude and Grok sign-in flow reliably.
- After you authorize Grok in the browser, Settings shows signed in. It no longer stays stuck on sign-in required.

## [1.10.48] - 2026-08-15

### Account

- You can create a CodeMeYo account or sign in from the Account tab. Signing in is optional if you use your own API keys.
- After you sign in, this device is listed on your account so you can see it on the website.
- The Account tab now shows JagAI credits, your plan, monthly support, and signed-in devices.

### Credits and support

- Buy JagAI credit packs from the Account tab on desktop. Checkout opens in your browser and credits return after you refresh.
- Once a day, CodeMeYo can ask you to support the project on the website. Monthly support of $3 to $9,999 turns off that reminder for 30 days. It does not add JagAI credits.

## [1.10.47] - 2026-08-15

### Sign-in and project path

- JagAI now asks you to sign in when you are signed out, instead of failing with a generic error.
- SideKick and the activity-log Run action now use the project you have open.

### Remote PC Code

- Pairing still sends messages live between your phone and desktop. Diagnostic logs no longer keep the text of those messages or tool output.

### Usage

- Signed-in usage sharing now records app opens, how long the app stayed open, and how long each run took. It still never sends what you type.

## [1.10.46] - 2026-08-15

### Sign-in and project path

- JagAI now asks you to sign in when you are signed out, instead of failing with a generic error.
- SideKick and the activity-log Run action now use the project you have open.

### Remote PC Code

- Pairing still sends messages live between your phone and desktop. Diagnostic logs no longer keep the text of those messages or tool output.

## [1.10.45] - 2026-08-15

- Same user-facing changes as 1.10.46. Download 1.10.46.

## [1.10.44] - 2026-06-23

### Android - pair links open the app reliably

- Fixed Android pair links so scanning or tapping a CodeMeYo pairing link can open the installed app directly instead of staying on the website.
- The manual pair-code fallback still remains available when the app is not installed.

## [1.10.39] - 2026-05-27

### Remote PC Code - stable QR pairing

- Fixed desktop QR pairing so the pair code stays stable instead of regenerating repeatedly.
- Removed unnecessary pairing messages.

## [1.10.38] - 2026-05-27

### Remote PC Code - phone pairing hotfix

- Fixed phone-to-desktop pairing so the secure connection can finish after the QR code is created.
- The desktop pairing screen now opens on the QR view first, making the phone scan flow the default path.

## [1.10.37] - 2026-05-27

### Remote PC Code availability

- Remote PC Code now includes live phone-to-desktop pairing for supported testers.
- Improved reliability for starting a remote control session from the phone app and connecting it to the signed-in desktop app.

## [1.10.36] - 2026-05-11

### macOS launch and window reliability

- Fixed a macOS crash that could occur while maximizing or resizing the app window.

## [1.10.35] - 2026-05-09

### macOS App Store subscriptions

- Mac users can subscribe monthly or yearly, restore purchases, and manage their subscription inside the app, with Terms of Use and Privacy Policy links beside the purchase controls.

## [1.10.34] - 2026-05-06

### iOS privacy compatibility

- Improved iOS privacy compatibility so new versions can be installed and tested reliably.

## [1.10.33] - 2026-05-06

### iOS privacy declarations

- Updated iOS privacy declarations to match the app's published privacy information.

## [1.10.32] - 2026-05-06

### iOS release reliability

- Improved iOS release reliability and privacy compatibility.

## [1.10.31] - 2026-05-06

### Pair flow no longer crashes when the relay isn't reachable

- Entering a pair code no longer crashes the desktop app when the connection is unavailable. CodeMeYo now shows a clear error and lets you try again.

## [1.10.30] - 2026-05-06

### JagAI request reliability

- JagAI requests recover from more model compatibility changes and now show clearer errors when a request cannot finish.

### SideKick now actually engages instead of saying "Standing by for your request"

- SideKick now produces real analysis in Deep Think instead of returning a standing-by message.

## [1.10.29] - 2026-05-05

### iOS privacy compatibility

- Improved iOS privacy compatibility for current Apple requirements.

### Phone-to-desktop pairing actually works now

- The desktop now responds immediately when a phone completes pairing. Messages, permission decisions, and stop actions work from the phone.

### QR code on the desktop pair tile is reliably scannable

- Desktop pairing codes are now easier for phone cameras to scan on the first try.

### Website sign-in and navigation

- Signed-in users stay signed in during updates and no longer encounter a missing verification screen.

## [1.10.28] - 2026-05-05

### Hotfix: blank-screen crash when JagAI or SideKick is the active provider

- Fixed a blank-screen crash when JagAI or SideKick was active at startup, and restored their correct colors throughout the app.

## [1.10.27] - 2026-05-05

### Credits dashboard and website speed

- **Redesigned the Credits dashboard.** A prominent balance card and clear Purchase, Transactions, and Help views make credits easier to buy and understand on desktop and mobile.
- Website pages load faster, and signed-in sessions remain available during updates.

## [1.10.26] - 2026-05-05

### Android compatibility

- Improved compatibility with current Android devices and Google Play requirements.

## [1.10.25] - 2026-05-05

### iOS privacy compatibility

- Improved compatibility with current Apple privacy requirements.

## [1.10.24] - 2026-05-04

### iOS release reliability

- Improved iOS release reliability.

## [1.10.23] - 2026-05-04

### iOS release reliability

- Fixed an issue that could prevent an iOS release from completing.

## [1.10.22] - 2026-05-04

### TestFlight availability

- Fixed an issue that could prevent the iOS build from appearing in TestFlight.

## [1.10.21] - 2026-05-04

### TestFlight availability

- Improved the reliability of iOS TestFlight availability.

## [1.10.20] - 2026-05-04

### Fix: TestFlight upload no longer flips to "Invalid Binary"

- Fixed an issue that prevented the iOS build from becoming available for testing.

## [1.10.19] - 2026-05-04

### JagAI - fixes for users running JagAI on its own

- **The Enabled checkbox for JagAI (All-in-One) now persists when you relaunch the app.** Previously it would silently revert to off after every restart. Toggle once and it stays.
- **JagAI now works standalone** - you no longer need a Claude / GPT / Grok / Gemini / DeepSeek API key configured underneath for JagAI to fire. Toggle JagAI on, leave everything else off, pick a JagAI model, and chat.
- **JagAI is now a button in the chat top bar.** Up through v1.10.18 the chat header listed every other provider but JagAI itself was missing, so users with JagAI enabled and every other provider disabled had no way to actually select JagAI in the chat. Now there's a JagAI button there whenever JagAI is enabled.
- **SideKick is now a chat top-bar button too**, for the same reason - it was previously enabled in Settings but invisible in the chat selector.
- **Distinct JagAI + SideKick brand colors** so the new buttons read at a glance against Claude, Grok, GPT, etc.

### iPhone + iPad sign-in is one tap from anywhere

- **New Account tab on the bottom nav.** v1.10.18 added the in-app sign-in form Apple required, but the form was only reachable via the Remote → "Sign in" prompt - testers landing on Chat or Settings looked for a sign-in CTA, found none, and concluded the app couldn't be signed into. The bottom nav now surfaces an Account tab so the email + password form is one tap from anywhere on iPhone and iPad. Help → moved into Settings, where it already lives on desktop.

## [1.10.18] - 2026-05-01

### iOS sign-in and subscriptions

- **In-app sign-in on iPhone and iPad.** Sign in directly with email and password without leaving CodeMeYo.
- **App Store subscriptions on iOS.** Pro subscribe and billing actions now use the App Store purchase flow.
- **Cleaner iOS updates.** Update notices are handled by the App Store and no longer appear inside the iOS app.

### iOS privacy + compliance

- **Clear privacy disclosures.** iOS now includes current privacy information covering account details and App Store purchase history, with no tracking.
- **Improved App Store compatibility.** Required compliance information is included with the app.

## [1.10.17] - 2026-05-01

### Pair Device: pair-code generation no longer hangs
- **Fixed: desktop QR tile stuck on "Generating QR…".** Pair-code generation responds reliably, and the Regenerate button continues to work.

## [1.10.16] - 2026-05-01

### Pair Device - Regenerate works, retries don't get stuck on "already used"
- **Fixed: Regenerate button on the desktop pair tile didn't fire.** Up through v1.10.15 the button was permanently disabled after the first pair code was generated because the connection-status flag never transitioned out of "pairing". Click now correctly mints a fresh code.
- **Fixed: "Pair code has already been used" lockout after a phone connection failed.** The same device can retry briefly without regenerating its code.
- **Better network errors.** Connection failures now suggest practical steps such as switching between Wi-Fi and cellular.

## [1.10.15] - 2026-05-01

### Pair Device - fixed "device id field is required" QR-scan error
- **Pairing now works on a brand-new phone install.** Scan the QR code or enter the pair code without registering the phone first.

### Android compatibility
- **Improved support for current Android devices.** CodeMeYo meets current Google Play compatibility requirements.

## [1.10.14] - 2026-05-01

### Pair Device - back to 6-digit numeric codes
- **Pair codes are now 6 numeric digits, like SMS / 2FA / Apple ID / Google verifiers.** v1.10.13 briefly tried 8-character alphanumeric to maximise entropy, but every Apple TestFlight reviewer hit the alphanumeric keyboard mismatch on phone (the iOS numeric keyboard is one-handed and finger-friendly; the alphanumeric one is not). Switching to 6 numeric digits matches the universal SMS-code pattern users already know.
- **All input boxes are numeric on every device** - phone, tablet, desktop browser, web dashboard. The desktop simply renders the same numeric component; non-digits are silently dropped.
- **Safer pair codes** with limited attempts, a short lifetime, and single-use protection.
- **Website pairing** now accepts the same 6-digit format as the apps.
- **iOS auto-fill works again** - `autoComplete="one-time-code"` lets iOS surface the SMS-style suggestion bar above the keyboard if the OS captured a code from a connected message.

## [1.10.13] - 2026-05-01

### Pair Device - phone QR scan & code entry now work
- **Fixed: phone could not type the desktop's pair code.** Phone entry now matches the code shown on desktop and clearly explains which characters to use.
- **Fixed: QR scan never matched.** QR scanning now recognizes pair codes from supported camera and scanner apps.
- All "enter the 6-digit code" copy across the desktop Settings panel, the in-app Remote pane, the website dashboard's "Pair with my phone" page, and the empty-input error message now correctly say "8-character code".

## [1.10.12] - 2026-05-01

### Credits & billing
- **Duplicate credit prevention.** Recovered payments no longer risk granting the same credits twice.
- **Clear purchase status.** Transaction history distinguishes real purchases from test purchases.
- **Cleaner Buy Credits cards.** The per-card "$X + $Y Processing Fee" math has been removed - just the final total is shown. The "Includes Processing Fee." hint above the grid covers the explainer.

### Connected-tool bundles
- **Safer bundle installs.** CodeMeYo verifies supported bundles before installation and refuses modified files with a clear error.
- **Manage connected-tool credentials together.** Save, load, or delete all credentials for a connected tool in one action, protected by your operating system.
- **Manage connection access.** Saved authorization can now be reviewed or cleared from Settings.
- **"Open install folder" support.** Jump directly to an installed connected tool's folder from Settings.

### Browser helper panel
- **Clearer browser helper status.** Connection, pairing, activity, and saved-state details are now shown separately.
- **Browser helper status.** The browser toolbar now shows a live connected or disconnected indicator.

### JagAI credits
- **Faster balance refresh.** The JagAI settings card updates more quickly after each chat turn.

## [1.10.11] - 2026-05-01

### JagAI multi-agent reliability
- **Deep Think, Consensus, and Round Robin now only fan out to JagAI providers you actually have keys for.** Previously, picking JagAI in multi-agent modes always tried Claude + GPT + Grok regardless of which keys were configured, so requests for unconfigured providers failed. Now the desktop client checks which JagAI providers are available and only routes to those.
- **Smarter failure messages.** If a multi-agent run can't get enough working providers to debate, the error now tells you exactly which providers failed and why - instead of a generic "need at least 2 providers."
- **Boilerplate filter.** Agents that respond with refusals, "I'm just an AI" disclaimers, or get stuck emitting fake tool-call text are now treated as failed analyses instead of feeding into the debate.

### Deep Think / Consensus UI polish
- **Mode-aware section labels.** The view now properly distinguishes Deep Think (adversarial debate) from Consensus (reconciliation). Phase pill, section headings, and per-agent labels all swap to match the mode you picked.
- **Failed agents are now visible.** When an agent's analysis fails, a red placeholder card appears in the analysis grid showing which agent dropped out - no more silently rendering two boxes when you had three agents.
- **Synthesis failures stop the spinner.** If the final synthesis step itself fails, the spinner now clears and a failure banner explains what happened, instead of spinning forever.
- **Cleaner section headers.** Section names no longer repeat the phase name (the pill strip already shows that) - just "Critiques" or "Reconciled Positions" instead of "Debate - Critiques" / "Reconcile - Reconciled Positions".

### Credits dashboard polish
- **Cleaner transaction history.** Temporary credit holds no longer clutter the list. You only see purchases, deductions, refunds, complimentary credits, and expirations.

## [1.10.5] - 2026-04-30

### Mobile remote control - bidirectional mirror live
- **"Pair with mobile device" button now switches to the correct tab.**
- **Phone shows your PC's chat live.** When paired, desktop messages appear on your phone in real time.
- Phone activity feed now mirrors message updates (streaming → done) so the phone sees the same conversation flow as the PC.

### Available models
- **The Credits dashboard now shows the models available to your account** so you know what your credits can use.

## [1.10.4] - 2026-04-30

### What changed since v1.10.2
This release includes the intended mobile fixes and credit-policy improvements from the previous update.

### Mobile fixes - TestFlight feedback v1.9.86
- **Bottom navigation no longer clips on the iPhone home indicator.** Tabs render fully above the gesture bar.
- **"Connect to your PC" flow on phone** - settings + remote tab now show the right copy when you're on a phone (you scan the PC's code, you don't host one). The pair button on mobile is now labeled "Scan PC's code" so testers know what they're doing.
- **No more useless phone-side pair codes** - the remote tab no longer auto-mints a pair session on mobile devices. Mobile users land directly on the QR scanner.
- **iOS camera permission** - added the camera, microphone, and photo-library usage descriptions so iOS actually shows the permission prompt when the QR scanner starts.
- **Cleaner Remote tab icon** - switched from a phone icon (testers misread as a camera) to a cable icon that better signals "your phone is connected to your PC".

### Credits - important policy fix
- **Credits expire 360 days from purchase if unused.** The Credits page now clearly states this policy, and older credits are used first.
- Account dashboard now shows the **next expiration date + remaining credits in that batch** inline, so you always know which credits time out next.

## [1.10.2] - 2026-04-30

### Reliability
- Improved checkout and purchase reliability while preserving prior receipts.

## [1.10.1] - 2026-04-30

### Added - JagAI in the desktop app
- **JagAI is now selectable in the provider list** - pick "JagAI (All-in-One)" and choose any of 12 models across the apex / nova / spark tiers (Claude Opus 4.7, GPT-5.5, Grok 4.20 Multi-Agent, Claude Sonnet 4.6, Grok 4.20, GPT-5.4 Mini, Gemini 2.5 Pro, Claude Haiku 4.5, GPT-5.4 Nano, Grok 4.1 Fast, Gemini 2.5 Flash-Lite, DeepSeek V4 Flash).
- **Manage Credits button** - opens your default browser pre-authenticated to your account dashboard so you can buy credits without typing a password again.
- **Live balance** in the JagAI settings card - see your credits and dollar equivalent at a glance, refresh on demand.
- No API keys to manage - your CodeMeYo sign-in is the only auth needed.

## [1.10.0] - 2026-04-30

### Added: JagAI, all your favorite AI models in one place
- **One credit balance for leading AI models.** Buy credit packs from your CodeMeYo account without managing API keys.
- **Credits dashboard.** See your balance, purchase credits, and review transaction history in one place.
- **Clear checkout totals.** Processing costs are shown before purchase.

### Reliability
- Concurrent requests no longer risk spending the same credits twice.
- Repeated payment notifications no longer risk granting duplicate credits.

## [1.9.86] - 2026-04-29

The "Sign in for automatic updates" prompt no longer appears on macOS. Mac App Store users receive updates through the App Store, while direct-download users can get the latest installer from CodeMeYo's download page.

This release also includes smaller Mac App Store compatibility improvements.

---

## [1.9.85] - 2026-04-29

Pro status is now recognized correctly after sign-in. Earlier versions could show an active Pro account as Free and hide Pro features such as Remote PC pairing. Resolved.

The Refresh account status and Restore Purchases flows now also pull the correct tier on first try instead of silently retaining the old value.

---

## [1.9.84] - 2026-04-26

The refreshed model lineup is now available across supported platforms.

The new models from v1.9.83 - Claude Opus 4.7, GPT-5.5, DeepSeek V4 Pro/Flash, Gemini 3.x previews, Qwen3 32B on Groq - now ship.

---

## [1.9.83] - 2026-04-26

Refreshed model lineup - Claude Opus 4.7 (Anthropic's newest flagship, with a step-change improvement in agentic coding), GPT-5.5 (OpenAI's newest frontier model), DeepSeek V4 Pro and V4 Flash, and the Gemini 3.x preview series are now available in the model picker. Groq's lineup adds Qwen3 32B for high-speed reasoning. Mistral Small 4 description updated to reflect its merged reasoning, vision, and code capabilities.

Models that the providers themselves have retired or deprecated are now clearly labeled so you can migrate before they're shut down.

Bug fix: Grok 4.20 Multi-Agent can now be selected successfully. Other Grok models were unaffected.

---

## [1.9.82] - 2026-04-22

Android release polish - drops 32-bit ARM build to comply with Google Play's 64-bit requirement. All modern Android devices (2019+) support arm64, no user-visible change.

---

## [1.9.81] - 2026-04-22

Universal Links are restored. Opening a CodeMeYo pairing link now launches the app directly on macOS and mobile. Updates also recover more reliably from temporary network interruptions.

Fixed an update loop that could occur with the previous version.

---

## [1.9.80] - 2026-04-22

No functional changes. Use v1.9.81 or later for the update-loop fix.

---

## [1.9.79] - 2026-04-22

Reliability polish for the earlier iPad launch-crash fix.

---

## [1.9.78] - 2026-04-22

Reliability follow-up for availability across Mac, iOS, and Android.

---

## [1.9.77] - 2026-04-22

### Fixed
- **iPad launch crash.** CodeMeYo now launches reliably on every supported iPad and iPhone running iOS 15 or later.

---

## [1.9.76] - 2026-04-22

Reliability follow-up for iOS and macOS pairing links. Desktop pair links continue to work while Universal Links receive additional compatibility work.

---

## [1.9.75] - 2026-04-22

Reliability follow-up for profile refresh, device pairing, persistent Windows sign-in, clear QR errors, and desktop pair links. The in-app QR and code flow remains available on macOS.

---

## [1.9.73] - 2026-04-21

### Fixed
- **Account tier auto-refreshes at launch.** If your Pro status changed on the server since the last time you opened the app - a new comp, a renewal, an expired subscription - CodeMeYo now re-syncs silently a moment after startup instead of waiting for you to hit the manual Refresh button.
- **Pair Device actually pairs.** Device pairing could fail with an "Unauthenticated" error even for signed-in Pro users, which also left the QR code stuck on "Generating QR…" forever. The pairing panel now uses your signed-in session correctly on the first try.
- **Windows sign-in now persists securely.** Quitting and relaunching keeps you signed in without re-entering your password.
- **QR panel shows a clear error instead of hanging.** When a pair code can't be generated (e.g. you're signed out, or on Free tier), the QR tile now shows an error state pointing at the detail below it, rather than the indefinite "Generating QR…" spinner.

### Added
- **Deep-link support for `codemeyo://pair/<CODE>` and Universal Links.** Scanning a pair QR from your phone now opens CodeMeYo directly on desktop (via `codemeyo://`) or on iPhone (via `https://codemeyo.com/pair/<CODE>`), and auto-fills the code so pairing is one step instead of three.

---

## [1.9.70] - 2026-04-21

### Fixed
- **iPhone portrait and landscape layouts.** The bottom menu no longer gets clipped by the home indicator in portrait, and the left rail no longer disappears behind the Dynamic Island in landscape. Also polished the chat input and the title bar to respect every safe area.
- **Friendlier sign-in and billing error messages.** Raw server responses have been replaced with clear copy - "Sign-in failed. Check your email and password.", "Your Pro subscription has ended.", "Can't reach the server.", etc. - across the Sign-in and Upgrade screens.

### Added
- **Refresh account status.** Settings → Billing has a new "Refresh account status" button that re-syncs your Pro entitlement with your account on the fly, so you never have to reinstall to pick up a fresh subscription.

---

## [1.9.61] - 2026-04-21

### Added
- **In-app Pro subscription on iPhone + iPad.** Subscribe to CodeMeYo Pro directly inside the app using Apple's In-App Purchase - monthly or yearly. Pricing, auto-renewal terms, Terms of Use, Privacy Policy and Apple's EULA are all visible next to the subscribe button.
- **Restore Purchases.** Tap Settings → Billing → Restore Purchases to bring back an existing Pro subscription you already bought on another platform - no need to pay twice.
- **Manage Subscription.** A new link takes you straight to Apple's subscription settings so cancelling or changing plans is one tap away.
- **Delete your account from anywhere.** Settings → Account → Delete Account fully removes your CodeMeYo account, any active subscriptions, and all associated data after a password confirmation.
- **In-app sign-in.** Signing in now happens right inside the app - no more popping out to a browser. Enter your email and password and you're in.

### Changed
- CodeMeYo is no longer available on the App Store in China mainland. (Your existing installation continues to work.)
- The Settings → Billing area now shows "You're subscribed - next renewal: [date]" when Pro is active, so you can always see your status at a glance.

---

## [1.9.60] - 2026-04-20

### Added
- **SideKick with Claude.** Connect your official Claude Max or Pro subscription from Settings, with clear connection status and no pasted API key required.
- **Your devices show up in your account.** Visit codemeyo.com/dashboard/devices and every machine you've signed into CodeMeYo on will be listed. Previously that page was always empty.
- **Daily cleanup of expired pair codes.** Old unused pair codes are now automatically cleaned up. Successful pairings stay untouched.

### Fixed
- **Improved availability on Android, iOS, and macOS stores.**

---

## [1.9.53] - 2026-04-20

### Added
- **iOS QR pairing works.** Open the iOS app → Remote PC Code → Scan QR, and the camera decodes the QR on screen and pairs you in one shot. Previously the QR tab on mobile was a placeholder and only the 6-digit code worked.
- Real QR image rendered on the desktop side too.

### Fixed
- **Revoke button** on the Pair Device page now works.
- **QR code** on the Pair Device page renders immediately instead of hanging on "Loading QR…".
- Improved macOS TestFlight availability.

---

## [1.9.52] - 2026-04-20

### Added
- **Remote PC Code is live.** Pair your phone with a signed-in desktop and drive the agent from anywhere. (Was previously gated behind a "Coming Soon" card.)

### Fixed
- Deep Think no longer shows duplicate proposals after multiple sends in the same conversation.
- The macOS app now includes every icon size required by Apple.

---

## [1.9.51] - 2026-04-20

### Changed
- Updates now reach iOS, macOS, and Android stores more consistently.

### Fixed
- Android updates are now recognized correctly by Google Play.
- Minor bug fixes.

---

## [1.9.50] - 2026-04-20

### Added
- **Pro - Remote PC Code.** Pair your phone with your desktop once, then drive your coding agent from anywhere. Send a new task, approve a risky tool call, or check progress from your phone even when you're away from your desk.
- The phone app also works standalone - write code and chat with LLMs on your phone without a desktop.
- **codemeyo.com Pair Device page** now lists your active pair codes and paired devices, with a one-click **Unpair** button for each.

### Fixed
- Mobile viewport rendering on iOS and Android - the UI now fills the full screen, including notched iPhones (no more cut-off bottom nav).
- Browser helper no longer reports an unnecessary warning on some payment pages.

---

## [1.9.13] - 2026-04-20

### Fixed
- Your **codemeyo.com** account dashboard now loads with proper styling - no more unstyled Pair Device page.
- **Start pairing** on the web dashboard now works - you can generate a code from the browser without needing a device registered first.

---

## [1.9.12] - 2026-04-20

Reliability polish.

### Changed
- Improved update availability across supported platforms.

---

## [1.9.11] - 2026-04-19

App Improvements for the better good of seamless updates.

### Added
- Updates now reach Google Play, TestFlight, and the App Store more consistently.

### Fixed
- Browser helper no longer reports an unnecessary warning on some payment pages.

---

## [1.9.10] - 2026-04-19

### Added
- First iOS + macOS + Android store submissions to Apple App Store, Mac App Store, and Google Play (Closed + Open Testing tracks).
- Polished Google Play Console store listing with a full set of graphics (app icon, feature graphic, phone + tablet screenshots).

### Fixed
- Improved Android availability through Google Play.

---

## [1.9.7] - 2026-04-19

### Fixed
- Signed-in users now see their profile immediately on app start - no more "Loading your profile from codemeyo.com…" spinner while the server round-trip runs. The last-known profile renders instantly; the background refresh updates it silently.
- Shorter network timeout so any real connection issue surfaces as an error quickly instead of looking like an indefinite hang.

---

## [1.9.6] - 2026-04-19

### Added
- Android installers are now available from CodeMeYo's download page for supported direct-install use.
- Homepage download buttons can be wired to direct download URLs per platform.

### Fixed
- Sign-in now truly persists across app restarts on all platforms - survives any OS keychain quirks.
- Homepage console errors cleaned up.
- The "Sign in for automatic updates" banner disappears immediately once you sign in.

---

## [1.9.4] - 2026-04-19

### Fixed
- Release pages are tidier - no stale installers from old versions showing up next to the current one.

---

## [1.9.3] - 2026-04-19

### Fixed
- Clean installer assets on release pages - no more leftover files from older versions showing up next to the current one.
- Sign-in nudge now disappears automatically once you sign in; the update check re-runs without needing an app restart.

---

## [1.9.2] - 2026-04-19

### Fixed
- **Sign-in now persists across app restarts.** If you signed in on 1.9.0 and had to re-enter your credentials every launch, that's fixed - your session is remembered.
- **Automatic data migration** for users updating from 1.5.x. If your API keys, conversations, or usage history appeared to be missing after the update, they're restored on the next launch.

---

## [1.9.1] - 2026-04-19

Small polish release on top of 1.9.0.

### Fixed
- Availability fixes for platforms affected by the previous release.

---

## [1.9.0] - 2026-04-19

Free accounts, a refreshed website, and a preview of what's coming next.

### Added
- **Free CodeMeYo accounts.** Sign in from the Account tab to get automatic updates and early access to new features. Your own API keys still stay on your device - nothing changes there.
- **Remote PC Code - Coming Soon.** A new tab in the app previews an upcoming feature that'll let you drive the desktop agent from your phone. Not live yet; sign in now to be among the first to try it.
- **Privacy-respecting telemetry (opt-in).** If you'd like to help us understand which providers and models get the most use, toggle it on in Settings → Privacy. Off by default. We never see prompts or code.
- **Refreshed donations page.** One-time or monthly options at codemeyo.com/donate.

### Changed
- **Windows / Linux**: the installer updates in place. A one-time migration in 1.9.2 copies your settings, conversations, and API keys over automatically if anything landed in the wrong folder.
  - **macOS**: v1.9.0 may appear as a separate app alongside your existing install. Once you've confirmed everything carried over, you can delete the old icon.
- Website refresh at codemeyo.com with updated Privacy, Terms, and pricing information.

### Fixed
- Miscellaneous stability and login-flow fixes.

---

## [1.5.9] - 2026-04-18

### Added
- **In-app Changelog viewer** - A new "Changelog" tab under Help shows release notes for every version, fetched live from our public CHANGELOG. Current version is highlighted, older versions are collapsible, and you can search the whole history.
- **Release notes in the update prompt** - When the auto-updater detects a new version, you'll see what's actually changing before you click "Install".

### Improved
- Release notes now cover every version from v1.0.5 onward, both in the app and on the public release page.

---

## [1.5.8] - 2026-04-18

### Fixed
- **Improved Android release availability.** Updates now reach the Play Store more reliably.

---

## [1.5.7] - 2026-04-18

### Added
- **Full Git client** - Branch picker with search (switch / create / delete branches, protected-branch guard on main/master), commit composer with optional "amend last commit", Fetch / Pull / Push toolbar, and inline per-file stage, unstage, and discard buttons on every changed file. Stage-all and Unstage-all toggles included.
- **Robust terminal CLI** - Slash commands that mirror the whole GUI: `/project list|add|rm|switch`, `/git status|checkout|commit|push|pull|fetch|...`, `/chat new|list|switch|rename|delete`, `/mode code|chat`, `/strategy single|roundrobin|deepthink|consensus`, `/provider <name>`, `/status`, `/open <file>`, `/version`, `/help`, `/clear`. Accepts both `/cmd` and `cmy cmd`. Type `/help` in the terminal to see everything.
- **25 new connected tools** across design, coding, cloud, data, productivity, and commerce.
- **Help search** - Ctrl/Cmd+F in the Help tab searches across every feature description with term highlighting.
- **Remove projects** - Inline trash icon on each project in the dropdown. Keeps files on disk; just removes the entry from CodeMeYo.

### Improved
- Project list is now sorted alphabetically everywhere it appears - dropdown, CLI, title bar.
- Terminal now runs shell commands in your active project's directory automatically (no more hardcoded paths).
- Terminal keeps command history - Up/Down arrows navigate through the last 200 commands. Ctrl+L clears the screen.
- Terminal reacts live when you switch the active project.
- Theme stays consistent - all the new Git controls respect your light/dark theme automatically.

---

## [1.5.6] - 2026-04-18

### Added
- **GitHub-style Git diff viewer** - Click any file in the Git tab and see its changes with line numbers, color-coded additions and removals, unchanged-line context, and collapsible per-file cards. Monospace rendering preserves whitespace exactly.

### Improved
- Git panel reorganized into a split layout - file list on the left, live diff viewer on the right.

---

## [1.5.5] - 2026-04-18

### Fixed
- The LLM Providers and MCP Servers sections on codemeyo.com now render as proper cards matching the rest of the site's design.

---

## [1.5.4] - 2026-04-18

### Added
- **Deep Think visual state persists across app restarts.** When you reopen a Deep Think conversation, all four proposal cards, every critique, the final synthesis, and the phase-progress indicator are fully restored - not just the text response.
- Homepage at codemeyo.com fully refreshed - all 8 LLM providers highlighted, 22+ MCP servers listed by category, Deep Think and Conversation Mode featured, iOS/Android availability called out, privacy and terms pages linked.

---

## [1.5.3] - 2026-04-18

### Fixed
- macOS and iOS builds restored after a temporary interruption.

---

## [1.5.2] - 2026-04-18

### Fixed
- **Windows installer now appears on release pages.** A prior release published empty; fixed.
- **Auto-updater now detects Windows updates.**

---

## [1.5.1] - 2026-04-18

### Fixed
- **Folders now render as folders** in the file tree - they were previously showing as generic files.
- **File editor loads file contents** when you click a file - was showing blank.
- **Conversations no longer crash** when saving messages.
- **New conversations from the sidebar "+" button persist immediately** - previously they'd disappear on restart unless you sent a message first.

### Improved
- Windows updates are prepared more quickly.

---

## [1.5.0] - 2026-04-17

### Added
- **Writable code editor** - Edit any file directly in the app. Auto-saves 1.5 seconds after you stop typing, or Ctrl+S to save immediately. Supports 40+ languages with bracket colorization, minimap, find/replace, and format-on-paste.
- **Conversation rename** - Hover any conversation in the sidebar, click the pencil, rename inline.
- **Real folder icons in the file tree** - Closed and open folders look different, with color-coded files by language and type.

### Fixed
- **All AI responses now persist across app restarts** - Deep Think conversations with Claude, Grok, OpenAI, and Gemini no longer vanish when you close the app.

### Improved
- Linux updates are prepared more quickly.

---

## [1.0.11 - 1.0.12] - 2026-04-17

### Fixed
- **Windows desktop app no longer crashes on startup.** Networking now works correctly on every platform.

---

## [1.0.10] - 2026-04-17

### Fixed
- Android release reliability improved.

---

## [1.0.9] - 2026-04-17

### Fixed
- iOS release availability is more reliable.

---

## [1.0.7] - 2026-04-17

### Improved
- Updates are prepared more reliably.

---

## [1.0.5] - 2026-04-17

### Changed
- **Improved update detection.** New versions are now recognized more reliably.

---

## [1.0.000] - 2026-04-13

### Added
- Expanded availability across Windows, macOS, Linux, iOS, and Android.

---

## [0.2.910] - 2026-04-13

### Fixed
- **Chat + Deep Think no longer scans your codebase.** Chat mode is completely tool-free across all strategies - it's pure conversation, no file access.

---

## [0.2.900] - 2026-04-13

### Added
- **iOS build support.**
- **Android build support.**
- **Desktop and mobile feature gating** - mobile builds skip desktop-only capabilities (like screen capture and browser integration) gracefully.

### Fixed
- **Chat mode** no longer injects project context when it shouldn't.
- **Chat + Deep Think / Consensus** strategies are now respected correctly.
- Fixed a "no tools specified" error that could show up on some providers in Chat mode.
