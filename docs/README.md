# Pattaya — Documentation

This directory holds everything **descriptive** about the project — the parts
that explain *why* and *how*, as opposed to the executable code under `src/`.

## Map

| Area | Path | What's there |
|------|------|--------------|
| Architecture | [`architecture/`](./architecture/) | System overview and Architecture Decision Records (ADRs) |
| Development | [`development/`](./development/) | How to set up, build, deploy, and the task-tracking workflow |
| Game design | [`game-design/`](./game-design/) | The game design document (GDD): concept, mechanics, scope |

## Conventions

- One topic per file; keep documents short and link between them.
- Significant, hard-to-reverse decisions get an **ADR** under
  [`architecture/decisions/`](./architecture/decisions/) — see
  [ADR-0001](./architecture/decisions/0001-record-architecture-decisions.md).
- Code-level details (function docs, module READMEs) stay next to the code in
  `frontend/` and `backend/`, not here.
