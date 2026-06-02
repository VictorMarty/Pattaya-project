# ADR-0002: Use beads for task tracking, synced through git

- **Status:** Accepted
- **Date:** 2026-06-02

## Context

Development is autonomous and spread across ephemeral sessions (Claude Code on
the web), each starting from a fresh clone in a throwaway container. We need a
task tracker that:

1. survives between sessions with **no external service**,
2. lives **inside the repository** so the repo is the single source of truth, and
3. understands **dependencies** between tasks so an agent can pick the next
   unblocked piece of work.

## Decision

Use **[beads](https://github.com/gastownhall/beads) (`bd`)** as the tracker.

Because the default beads sync (Dolt remotes) requires external infrastructure,
we instead sync **through git as plain text**:

- `.beads/issues.jsonl` is committed and is the **source of truth**.
- The binary Dolt working DB (`.beads/embeddeddolt/`) is **gitignored**.
- `.claude/hooks/session-start.sh` (a SessionStart hook) installs `bd`, wires
  bd's git hooks, and rehydrates the DB from the JSONL at the start of every
  session.
- bd's git hooks (`core.hooksPath=.beads/hooks`) export the JSONL into commits
  and re-import after pull/checkout, so ordinary `git` persists tracker state.
- bd's `sync.remote` is deliberately left **unset** in `.beads/config.yaml`.
  With it set, `bd bootstrap` tries to clone Dolt data from the git origin (which
  has none) and fails instead of falling through to the JSONL import. Do not
  re-add it unless we intentionally switch to Dolt-over-git sync.

## Consequences

- No accounts, servers, or `bd dolt push` — `git push` is enough.
- The tracker is reviewable in PRs (JSONL diffs) and travels with branches.
- Trade-off: we forgo Dolt's cell-level merge; concurrent edits to the JSONL can
  conflict like any text file. Acceptable for largely single-writer development.
- A new session that cannot reach npm will start without `bd`; the hook fails
  soft and logs a warning rather than blocking the session.
