# Development Workflow

How to work in this repository — for both humans and AI agents.

## Sessions & environment

Most development happens in **Claude Code on the web**: each session starts from
a fresh clone in an ephemeral container. The container is set up automatically by
the SessionStart hook (`.claude/hooks/session-start.sh`), which installs the
`bd` tracker, wires its git hooks, and rebuilds the tracker DB from
`.beads/issues.jsonl`.

Anything not committed and pushed is lost when the container is reclaimed.

## Task tracking with beads

All work is tracked in [beads](https://github.com/gastownhall/beads). Typical loop:

```bash
bd ready                 # list unblocked, ready-to-start work
bd show <id>             # read an issue and its dependencies
bd update <id> --claim   # start it (marks in_progress)
# ... do the work ...
bd close <id>            # finish it
```

Create issues for anything non-trivial *before* coding:

```bash
bd create --title="Short summary" \
          --description="Why this exists and what done looks like" \
          --type=task|feature|bug --priority=2     # 0=critical … 4=backlog

bd dep add <issue> <depends-on>   # <issue> is blocked until <depends-on> closes
```

The tracker state lives in `.beads/issues.jsonl` and is committed automatically
by bd's git hooks — a normal `git commit` includes the latest tracker changes.
See [ADR-0002](../architecture/decisions/0002-use-beads-for-task-tracking.md).

## Branches

- Feature work happens on a dedicated branch (e.g. `claude/<topic>`).
- Do **not** push to `main` without explicit permission.
- Open a PR into `main` when a unit of work is ready for review.

## Deploy & preview

Pushing to `main` or the active feature branch triggers
[`.github/workflows/pages.yml`](../../.github/workflows/pages.yml), which deploys
to GitHub Pages:

```
https://victormarty.github.io/Pattaya-project/
```

Open that on a phone to preview. The first-ever deploy can take a minute or two
to propagate.

## Code vs docs (monorepo)

- Frontend code (React + TS) → `frontend/`.
- Backend code (Node + TS) → `backend/`.
- Architecture, design, schemas, rationale, drafts, process → `docs/`.
- Record significant decisions as ADRs under
  `docs/architecture/decisions/`.

## Coming soon (tracked in beads)

- Scaffold `frontend/` (React + TS) and `backend/` (Node + TS).
- Define the game state machine and the create/join-by-id flow.
- Add participant sync between client and server.
- Wire the frontend build into the Pages deploy; decide backend hosting.
- Add linting/formatting and a test runner.
