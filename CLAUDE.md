# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:6cd5cc61 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->


## Project: Pattaya

Pattaya is a **multiplayer, turn-based mobile web game** — a "board / walking"
tabletop-style game. A player creates a game (getting a shareable id), others
join by that id, and play proceeds through turn actions (mechanically a state
machine owned by the backend). See
[`docs/architecture/overview.md`](docs/architecture/overview.md).

### Repository layout (monorepo)

```
.
├── frontend/               # React + TypeScript — player-facing web client
├── backend/                # Node + TypeScript  — authoritative game server
├── docs/                   # Architecture & descriptive docs (not code)
│   ├── architecture/       #   overview + ADRs (decision records)
│   ├── development/        #   how to work in this repo
│   └── game-design/        #   game design document (GDD)
├── index.html              # Current GitHub Pages entry (placeholder hello-world)
├── .beads/                 # Task tracker data (beads) — see below
├── .github/workflows/      # CI: GitHub Pages deploy
└── .claude/                # Claude Code settings + SessionStart hook
```

Keep the split clean: **code lives in `frontend/` and `backend/`**; everything
descriptive (architecture, rationale, design, schemas, drafts, process) lives in
**`docs/`**.

### Stack (high level)

- **Frontend** (`frontend/`): React + TypeScript. Create game → shareable id;
  join by id; render board; take turn actions. Static build → GitHub Pages.
- **Backend** (`backend/`): Node + TypeScript. Synchronize participants; store
  and run the game logic (the authoritative state machine). Hosting TBD.

### Build, deploy & test

- **Build:** not scaffolded yet — `frontend`/`backend` are placeholders. Tooling
  (bundler, sync transport) is tracked in beads. Until then `index.html` is
  served as-is.
- **Deploy:** every push to `main` or the active feature branch triggers
  `.github/workflows/pages.yml`, which publishes the repo root to GitHub Pages:
  https://victormarty.github.io/Pattaya-project/ (will later serve the frontend
  build).
- **Tests / lint:** not set up yet (no code) — tracked by beads issues.

### Task tracking sync (important for this repo)

The beads integration block above describes Dolt-remote sync, which this repo
does **not** use. Here the tracker is synced **through git as plain text**:

- `.beads/issues.jsonl` is the single source of truth and **is committed**.
- The binary Dolt DB (`.beads/embeddeddolt/`) is gitignored and rebuilt each
  session from the JSONL by `.claude/hooks/session-start.sh`.
- bd's git hooks (`core.hooksPath=.beads/hooks`) auto-export the JSONL into your
  commits and re-import it after pull/checkout — so normal `git add/commit/push`
  is all that's needed to persist tracker state. No `bd dolt push` required.

### Working agreement

- Track ALL work in beads (`bd ready` → `bd update <id> --claim` → `bd close`).
- File a beads issue before starting non-trivial work; record decisions as ADRs
  under `docs/architecture/decisions/`.
- Develop on the designated feature branch; do not push to `main` without
  explicit permission.
