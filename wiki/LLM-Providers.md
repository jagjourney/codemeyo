# LLM Providers

CodeMeYo supports **8 LLM providers** through a unified adapter system. Each provider implements the same `LLMProvider` Rust trait so agent loops, tool calls, streaming, and multi-model strategies like [Deep Think](Deep-Think) work the same across all of them.

**BYOK — Bring Your Own Key.** You pay the provider directly. CodeMeYo never proxies API calls through our servers and never sees your prompts, responses, or keys. Traffic flows:

```
CodeMeYo app (your machine) ──HTTPS──▶ provider API (Anthropic / OpenAI / xAI / Google / etc.)
```

Keys live in your **operating system's secure keychain** — see [Configuration → Where keys are stored](Configuration#where-keys-are-stored).

---

## Provider matrix

| Provider | Get a key | Tool calling | Streaming | Best-for |
|---|---|---|---|---|
| **Anthropic (Claude)** | [console.anthropic.com](https://console.anthropic.com) | Yes | Yes | Deep reasoning, long context, code reviews |
| **OpenAI (GPT)** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Yes | Yes | General-purpose coding, fast iteration |
| **xAI (Grok)** | [console.x.ai](https://console.x.ai) | Yes | Yes | Multi-agent reasoning, large context |
| **Google (Gemini)** | [aistudio.google.com](https://aistudio.google.com) | Yes | Yes | Very long context, cheap tokens |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) | Yes | Yes | Cost-efficient coding |
| **Mistral** | [console.mistral.ai](https://console.mistral.ai) | Yes | Yes | European data-sovereignty, Codestral |
| **Ollama (local)** | [ollama.com](https://ollama.com) | Yes (model-dependent) | Yes | Fully offline, open-weight models |
| **Groq** | [console.groq.com](https://console.groq.com) | Yes | Yes | Latency — sub-second inference |

---

## 1. Anthropic (Claude)

1. Go to [console.anthropic.com](https://console.anthropic.com) and create an account.
2. Add a payment method and load credits.
3. Navigate to **API Keys** → **Create Key**.
4. Copy the key (starts with `sk-ant-`).
5. In CodeMeYo: **Settings → Providers → Anthropic**, paste the key, enable the toggle.
6. Pick a model:
   - `Claude Opus 4.6` — most capable, best for Deep Think flagship role.
   - `Claude Sonnet 4.6` — best balance of speed/intelligence (recommended default).
   - `Claude Haiku 4.5` — fastest, cheapest, great for simple edits.

Context: up to 1M tokens (model-dependent). Output: 8K–64K tokens (model-dependent).

---

## 2. OpenAI (GPT)

1. Go to [platform.openai.com](https://platform.openai.com) and create an account.
2. Add credits in **Billing** (prepaid, not monthly).
3. **API Keys → Create new secret key**.
4. Copy the key (starts with `sk-`).
5. Settings → Providers → OpenAI, paste, enable.
6. Model picks:
   - `GPT-5.4` — frontier, best quality.
   - `GPT-4.1` — stable workhorse.
   - `GPT-4.1 Mini` / `Nano` — cheap, fast, still solid for small edits.
   - `o4-mini` — reasoning-focused, slower, good for planning.

---

## 3. xAI (Grok)

1. Go to [console.x.ai](https://console.x.ai) (requires an X/Twitter account).
2. Fund the account.
3. Create an API key.
4. Settings → Providers → Grok, paste, enable.
5. Model picks:
   - `Grok 4.20 Multi-Agent` — flagship, used by Deep Think when Grok is enabled.
   - `Grok 4.1 Fast Reasoning` — cost-efficient reasoning at $0.20/$0.50 per 1M.
   - `Grok Code Fast` — coding-specialized.
   - `Grok 3` — stable, widely available.
   - `Grok 3 Mini` — cheap.

Note: Multi-agent models route to xAI's Responses API (`/v1/responses`) automatically. The adapter handles the routing — you don't need to configure anything.

---

## 4. Google (Gemini)

1. Visit [aistudio.google.com](https://aistudio.google.com).
2. Sign in with a Google account.
3. Click **Get API Key** → **Create API key in new project**.
4. Copy it.
5. Settings → Providers → Gemini, paste, enable.
6. Model picks:
   - `Gemini 2.5 Pro` — flagship, 2M token context.
   - `Gemini 2.5 Flash` — fast + cheap.
   - `Gemini 2.5 Flash-Lite` — cheapest.

CodeMeYo uses Gemini's **native API** (not the OpenAI-compatible endpoint) since v0.1.355 — supports `functionDeclarations` tool format and `inlineData` images.

---

## 5. DeepSeek

1. Sign up at [platform.deepseek.com](https://platform.deepseek.com).
2. Add credits.
3. Create an API key.
4. Settings → Providers → DeepSeek, paste, enable.
5. Model picks:
   - `DeepSeek V3.2` — 128K context at $0.28 input / $0.42 output per 1M. Best price-per-quality ratio of any frontier model right now.

DeepSeek uses the OpenAI-compatible endpoint under the hood.

---

## 6. Mistral

1. Sign up at [console.mistral.ai](https://console.mistral.ai).
2. Fund the account.
3. Create an API key.
4. Settings → Providers → Mistral, paste, enable.
5. Model picks:
   - `Mistral Large 3` — flagship.
   - `Mistral Medium 3.1` — mid-tier.
   - `Mistral Small 4` — cheap general-purpose.
   - `Devstral 2` — coding-specialized.
   - `Codestral` — older coding model (still strong for JS / TS / Python).
   - `Ministral 3B` — edge / mobile.

Uses OpenAI-compatible endpoint.

---

## 7. Ollama (local models)

Runs on your machine. No API key, no internet required, no per-token cost.

1. Download Ollama from [ollama.com](https://ollama.com).
2. Install and launch. Ollama listens on `http://localhost:11434`.
3. Pull a model:
   ```bash
   ollama pull llama3.1
   ollama pull qwen2.5-coder:32b
   ollama pull deepseek-r1
   ```
4. Open CodeMeYo → Settings → Providers → Ollama. No key needed. Toggle on.
5. Click **Refresh** — CodeMeYo detects every installed model via `/api/tags`. Custom / fine-tuned models show up automatically. Model size + parameter info is displayed next to each one.

### Tool calling with Ollama

Not every Ollama model supports native tool calling (JSON function schemas). Since v0.1.710, CodeMeYo falls back to parsing tool calls from JSON code fences for models that don't implement the formal `tool_calls` API. Recommended tool-capable models:

- `llama3.1` (8B / 70B)
- `qwen2.5-coder` (7B / 14B / 32B)
- `deepseek-r1` (7B / 14B / 70B)

If you see `"does not support tools"`, pick one of those instead.

---

## 8. Groq

1. Sign up at [console.groq.com](https://console.groq.com).
2. Create an API key (free tier generous).
3. Settings → Providers → Groq, paste, enable.
4. Model picks:
   - `GPT-OSS 120B` / `20B` — open-weight frontier.
   - `Llama 3.3 70B`.
   - `Llama 4 Scout`.

Groq's claim to fame is **insane latency** — tokens per second measured in the hundreds. Great for Round Robin + Deep Think when you want fast multi-model opinions.

---

## Multi-model strategies

Any enabled provider can participate in any strategy. You don't pick providers per strategy — just enable the ones you want available.

| Strategy | Behavior |
|---|---|
| **Single** | One provider (the "active" one) does the whole task |
| **Round Robin** | Rotates between enabled providers each agent loop iteration |
| **Deep Think** | All enabled providers analyze in parallel, critique, synthesize. Each provider contributes its **best** model automatically — see [Deep Think](Deep-Think). |
| **Consensus** | Like Deep Think but debate continues until providers converge on an answer |
| **Fallback** | If one provider fails (rate limit, 5xx), the agent silently retries on the next enabled provider |

---

## Token usage + cost tracking

Every LLM call is counted per-provider in the **Usage** panel (sidebar → chart icon). Shown:

- Input tokens consumed
- Output tokens generated
- Estimated USD cost based on the model's current pricing (pricing kept current in the model registry)
- Per-session reset button

CodeMeYo tracks this **locally only** unless you opt in to anonymous usage telemetry (Settings → Privacy). Even then, only aggregate counts are sent — no prompts, no responses, no keys.

---

## Privacy posture

- We never see your prompts.
- We never see your API keys.
- We never see the code you share with the LLM.
- We never see the LLM's response.

All of that flows directly from your machine to the provider. CodeMeYo's server at codemeyo.com only handles account state, entitlements, updater checks, optional telemetry counts, and donations. See [codemeyo.com/privacy](https://codemeyo.com/privacy) for the full policy.

---

## Adding a new provider (not supported)

CodeMeYo's source is closed. You can't add a custom provider at runtime. If there's a provider we don't support that you want, file an issue at [github.com/jagjourney/codemeyo/issues](https://github.com/jagjourney/codemeyo/issues).

If a provider has an OpenAI-compatible endpoint, you can often point one of the existing "openai-compatible" providers (DeepSeek, Mistral, Groq) at a custom base URL in their advanced settings. Not officially supported but usually works.

---

## Related pages

- [Getting Started → Add your first API key](Getting-Started#4-add-your-first-api-key)
- [Deep Think](Deep-Think)
- [Configuration](Configuration)
- [Release Notes](Release-Notes) for model-registry updates
