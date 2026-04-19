# Deep Think

Deep Think is CodeMeYo's multi-model analysis strategy. Instead of asking one LLM, Deep Think asks **all your enabled providers** in parallel, lets them critique each other, and synthesizes a single answer from the debate.

Ships in every release since v0.1.8. Visual state persists across app restarts as of v1.5.4 — close and reopen a Deep Think conversation and you'll see all four proposals, every critique, the synthesis, and the phase indicator restored exactly as they were.

---

## When to use Deep Think

| Situation | Recommendation |
|---|---|
| Quick edit, no ambiguity | **Single** — faster, cheaper |
| Hard architectural decision | **Deep Think** — multi-model disagreement surfaces edge cases |
| Debugging a weird error | **Deep Think** — different providers catch different things |
| Cost-sensitive task | **Single** or **Round Robin** — Deep Think uses every enabled provider |
| Need provably correct output | **Consensus** — debate continues until providers converge |
| Writing docs / prose / email | **Chat + Deep Think** — each provider offers a different voice |

Deep Think uses 3–4× the tokens of Single for a given task. Turn it on for hard problems; leave it off for trivial ones.

---

## The four phases

Deep Think runs through four phases, each visible as its own panel in the chat view:

### 1. Analysis

Every enabled provider independently reads the task and produces its **initial proposal**. These are **parallel** — all providers run at the same time, you don't wait for one before the next starts. In **Code** mode, proposals include tool calls (each provider runs its own exploration — reads files, greps, etc.). In **Chat** mode, proposals are pure text.

Proposals are capped at **30,000 tokens each** (since v0.1.355) to prevent context overflow downstream.

### 2. Debate

Each provider receives every other provider's proposal (but not its own) and writes a **critique**. Critiques point out bugs, missed edge cases, better approaches, etc. Critiques are also capped at 30K tokens each.

### 3. Synthesis

One designated "synthesizer" provider receives the original task, all proposals, and all critiques, and produces a **single unified answer** that picks the best ideas from the debate while addressing the criticisms.

### 4. Execution (Code mode only)

The synthesized plan is executed as a regular agent loop. Tool calls run, files are edited, builds are verified. Chat mode ends after Synthesis.

---

## Provider selection

Deep Think ignores the model picker in Settings — it picks each provider's **flagship model** automatically for maximum quality:

| Provider | Deep Think flagship |
|---|---|
| Anthropic | `Claude Opus 4.6` |
| OpenAI | `GPT-5.4` |
| xAI | `Grok 4.20 Multi-Agent` |
| Google | `Gemini 2.5 Pro` |
| DeepSeek | `DeepSeek V3.2` |
| Mistral | `Mistral Large 3` |
| Groq | `GPT-OSS 120B` |
| Ollama | Currently excluded from Deep Think flagship auto-selection |

You need **at least 2 providers enabled** for Deep Think to actually be "multi" — with only one enabled it falls back to Single. Two is fine; more is better.

---

## Token + cost awareness

Deep Think is expensive. A rough estimate:

- **Analysis:** 1 call per provider, up to 30K tokens each.
- **Debate:** 1 call per provider, input = sum of other providers' proposals.
- **Synthesis:** 1 call on the synthesizer, input = original task + all proposals + all critiques.

With 4 providers enabled on a mid-size task, that's roughly **8–12 API calls** totaling **50K–250K tokens** across providers. Usage panel tracks this live.

Task context (the project files / history passed to each provider at start) is capped at **8K tokens** to keep the debate focused. Tool results in the analysis phase are also capped at 8K per call.

---

## Chat + Deep Think

Since v0.2.515, Deep Think works with **both** interaction modes:

- **Code + Deep Think** — all providers analyze, debate, synthesize a plan, then the plan is executed autonomously with tools.
- **Chat + Deep Think** — all providers analyze, debate, synthesize a final text answer. **No tools, no code, no project context injection** — just pure multi-LLM conversation.

v0.2.910 fixed a regression where Chat + Deep Think was still scanning your codebase; now Chat mode is completely tool-free across every strategy.

---

## Consensus mode

Consensus is a stricter version of Deep Think where the debate continues until providers **converge** on an answer. More iterations, higher token cost, higher confidence in the result.

Use Consensus for:

- Security-sensitive decisions
- "The AI has to be right" production debugging
- Architectural recommendations you're about to commit to

Use Deep Think for:

- Everything else that would benefit from multi-perspective input

---

## Persistence (since v1.5.4)

Deep Think conversations used to lose their visual state on restart — you'd reopen the chat and see only the final synthesis. Since v1.5.4, every element is persisted to SQLite and fully restored:

- All four proposal cards with per-provider badges
- Every critique message and which provider wrote it
- The final synthesis
- The phase-progress indicator

---

## Keyboard + UI

- Top-bar **Strategy** selector → **Deep Think**.
- Title bar reads `Code | Deep Think` or `Chat | Deep Think`.
- Chat view shows phase-progress bar at the top of each Deep Think turn.
- Each proposal and critique is labeled with the provider that wrote it (Claude, GPT, Grok, Gemini, DeepSeek, Mistral, Ollama, Groq — each with its own color).
- Click any proposal to expand its full reasoning.

---

## Round Robin + Fallback (related strategies)

For completeness:

- **Round Robin** — not parallel. Each agent loop iteration uses the next enabled provider. Useful for cost-balancing across providers or working around per-minute rate limits.
- **Fallback** — if the active provider fails (rate limit, 5xx), the agent silently retries on the next enabled provider. Single-provider behavior with a safety net.

Both are in the Strategy selector alongside Single / Deep Think / Consensus.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Deep Think behaves like Single | You have only 1 provider enabled. Enable at least 2. |
| "tool_choice but no tools" Grok error | Fixed in v0.2.505. Upgrade if you're on older. |
| Deep Think doesn't persist on restart | Upgrade to v1.5.4+. |
| Synthesis plan lost on restart | Fixed in v0.1.900. |
| Context length exceeded in debate | Too many providers / too long a task. Trim the task or disable the biggest providers temporarily. |
| Providers disagree wildly and synthesis picks the worst option | Use **Consensus** instead — it iterates until agreement. |

---

## Related pages

- [LLM Providers](LLM-Providers) — each provider's Deep Think flagship.
- [Release Notes](Release-Notes) — Deep Think fixes over time.
- [Architecture → Agent System](Architecture#agent-system)
