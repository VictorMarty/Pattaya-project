# ADR-0003: Host the game on GitHub Pages

- **Status:** Accepted
- **Date:** 2026-06-02

## Context

We want to see work-in-progress on a real phone via a plain URL, with zero
hosting cost and no separate deploy pipeline to maintain. The game is (or will
compile to) a static web bundle.

## Decision

Publish the site with **GitHub Pages**, deployed by a **GitHub Actions**
workflow (`.github/workflows/pages.yml`) using the official
`actions/configure-pages` / `upload-pages-artifact` / `deploy-pages` actions.

The workflow runs on push to `main` and the active feature branch, so changes
appear at the public URL automatically:

```
https://victormarty.github.io/Pattaya-project/
```

To make Pages available on the free tier (and reachable without auth from a
phone), the repository is **public**.

## Consequences

- Push-to-deploy: no manual release step.
- Free hosting, HTTPS, CDN.
- The repository must stay public for free Pages; the code is therefore open.
- Today the workflow publishes the repo root (`index.html`). When a build step
  is introduced, the workflow will build and publish the bundler's output
  (e.g. `dist/`) instead. Tracked in beads.
