# backend

The authoritative game server for Pattaya.

- **Stack:** Node + TypeScript (ESM).
- **Responsibilities (high level):**
  - **Synchronize the participants** of a game session.
  - **Store and run the game logic** — owns the authoritative game state, which
    is essentially a finite **state machine** advanced by player turn actions.
- **Hosting:** a long-running process; hosting is decided later (GitHub Pages
  serves only the static frontend).

## Layout

```
src/
├── index.ts                 # entry point — minimal HTTP server (/health) + wiring
├── game/
│   └── stateMachine.ts      # authoritative game state machine (types + transition)
└── session/
    └── sessionStore.ts      # create game (shareable id) / join by id (in-memory)
```

## Scripts

```bash
npm install        # install dev dependencies
npm run dev        # run with hot reload (tsx watch)
npm run typecheck  # type-check without emitting
npm run build      # compile TypeScript to dist/
npm start          # run the compiled server (dist/index.js)
```

The server listens on `PORT` (default `3000`) and exposes `GET /health`.

> **Skeleton only.** The concrete API, the participant-sync transport (e.g.
> WebSockets), state persistence, and the game state-machine rules are
> intentionally not implemented yet — tracked in beads. See
> [`docs/architecture/overview.md`](../docs/architecture/overview.md).
