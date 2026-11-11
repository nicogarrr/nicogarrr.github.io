# nicogarrr.github.io

Personal portfolio of Nicolás Iglesias García, AI Engineer in Gijón, Spain.

- **Live:** <https://nicogarrr.github.io>
- **Stack:** static site (HTML + CSS + vanilla JS), no build step, no external requests
- **Language:** English
- **Hosting:** GitHub Pages (`.nojekyll`, served as plain files)

## What's in it

Hero, scroll-lit statement, project chapters (GerarAI, Asistenta, UWB indoor positioning) with device mockups and stat counters, a GitHub activity calendar, an experience timeline, a "How I work" tools section and a message-style contact block. Light and dark themes (follows the system, toggle in the nav). `prefers-reduced-motion` turns every animation off.

Numbers on the page were counted from the public repositories on 11 Nov 2026 (commits with `git rev-list --count`, test files and test cases by searching the test sources). The previous version of the site is kept on the `backup-pre-redesign-2026-11-11` branch.

## Run locally

```bash
python3 -m http.server 8000
# http://localhost:8000
```
