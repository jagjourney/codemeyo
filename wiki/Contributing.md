# Contributing

First things first: **CodeMeYo's source is closed.** The app is published as free binaries (desktop + mobile), but we don't accept pull requests and the source repository is not public.

That doesn't mean we don't want your input - we do. There are three good ways to contribute to CodeMeYo, none of which involve sending us code.

---

## 1. File a bug or feature request

**[github.com/jagjourney/codemeyo/issues](https://github.com/jagjourney/codemeyo/issues)**

This is the main channel. Every issue is read. Most bug reports get a fix within a release or two.

### Before filing

- **Search existing issues.** Someone might have already reported it.
- **Check the [Troubleshooting](Troubleshooting) page.** Lots of common issues already have documented fixes.
- **Check the [changelog](https://codemeyo.com/changelog).** Your bug might already be fixed - upgrade first.

### A good bug report includes

- **Steps to reproduce.** The smallest sequence of clicks / keystrokes that triggers the problem.
- **Expected vs actual.** What you expected to happen vs what actually happened.
- **CodeMeYo version.** Settings → About, or the title bar.
- **OS + version.** `Windows 11 26200`, `macOS 26.4.1 arm64`, etc.
- **Error messages or screenshots.** Copy the exact error text the app shows, or attach a screenshot.
- **Log excerpts** if relevant - see [Troubleshooting → Log file locations](Troubleshooting#log-file-locations).

### A good feature request includes

- **What you're trying to do.** The use case, not the solution.
- **Why existing features don't solve it.** What's missing or awkward today.
- **How you'd use it.** Concrete example - "if I could do X, I'd use it to Y".

We prioritize features that serve many users, strengthen Pro, or reduce support load.

---

## 2. Private reports

Some issues aren't appropriate for a public issue tracker:

- **Bugs involving your proprietary code, API keys, or sensitive data.**
- **Complaints about specific users or staff.**
- **Business inquiries** (partnerships, licensing, etc.).

Use **[codemeyo.com/contact](https://codemeyo.com/contact)**.

We read it. We respond (usually within a few days, sometimes a week if we're in the middle of a release).

---

## 3. Security disclosures

Don't file security issues publicly on GitHub. Use **[codemeyo.com/contact](https://codemeyo.com/contact)** instead and mark the message as a security report.

### What counts as security

- Ways to run code on another user's machine via CodeMeYo.
- API key leaks (in logs, telemetry, network traces, etc.).
- Authentication / session / token issues on codemeyo.com.
- Permission-bypass in the agent (e.g. Full Auto executing something it shouldn't).
- Ways to forge payment or store notifications sent to codemeyo.com.
- MCP server sandbox escapes.
- iOS / Android app-store guideline violations that could get us pulled.

### What we ask

- **Give us a chance to fix before disclosing publicly.** We aim to ship a patch within 14 days for high-severity issues, faster for critical ones.
- **Include reproduction steps.** A proof-of-concept is best. A detailed write-up works too.
- **Your contact details stay private.** We credit disclosures in release notes with your permission, but we never share your contact details.

### What we won't do

- Cash bounties (yet). We're a small shop. We may launch a formal bug bounty later.
- Ignore reports. Every disclosure gets acknowledged within 48 hours.

---

## Donations

Unrelated to bug reports, but worth mentioning: donating at [codemeyo.com/donate](https://codemeyo.com/donate) directly funds development time.

Not a requirement for us to take your issue seriously - we read everything. But the math is simple: more donations = more time = more features + fixes.

---

## What we won't do

Being explicit so there's no confusion:

- **Accept pull requests.** Source is closed. Even if you send great code, we can't merge it.
- **Share source code** with individual users. Not under NDA, not for research, not for forks.
- **Let you build from source.** There's no `make` target we're hiding. Official builds are made by us only.
- **Port to new platforms on request.** Windows, macOS, Linux, iOS, Android are the five we support. Adding anything else is a big lift - file an issue, we'll consider, no promises.
- **Custom features for one user.** We build for the ecosystem, not bespoke. But many "custom" asks turn out to be widely useful once asked - which is why feature requests matter.

---

## Community

- **GitHub Issues** - bugs, features, discussion threads.
- **Private messages** - [codemeyo.com/contact](https://codemeyo.com/contact).
- **Discord / forum** - not yet. We may spin one up when the user base warrants. Until then, Issues works.

---

## Code of Conduct

We expect everyone - issue reporters, support seekers, donors, future Pro subscribers - to be civil and in good faith.

- Be respectful of other people in issue threads.
- Don't post API keys, passwords, or private URLs in public issues. Never send them to us either; describe the problem through [codemeyo.com/contact](https://codemeyo.com/contact) instead.
- Don't spam / harass. We lock threads and ban accounts when necessary.

Full text at [github.com/jagjourney/codemeyo/blob/main/CODE_OF_CONDUCT.md](https://github.com/jagjourney/codemeyo/blob/main/CODE_OF_CONDUCT.md).

---

## One last thing

The best "contribution" right now is **using CodeMeYo and telling us what's broken**. That's the loop we care most about - a user hits something rough, files a good bug, we fix it, everyone benefits. That's the contract.

Thanks for using the thing. We're shipping as fast as we can.

- Jag Journey, LLC

---

## Related pages

- [Home](Home)
- [FAQ](FAQ) - short answers.
- [Troubleshooting](Troubleshooting) - self-serve fixes.
