# Architecture Overview

> Status: **early setup** — high-level only. Internal design is intentionally not
> decided yet. This document evolves as the project takes shape.

## What Pattaya is

A **multiplayer, turn-based web game** — a "board / walking" tabletop-style game
("настолка-бродилка"). One player creates a game and shares an id; others join
that session by the id; play proceeds through turn actions. Mechanically the game
is a **state machine**, owned authoritatively by the backend.

It is mobile-first: the client runs in a phone browser.

## Repository shape (monorepo)

```
.
├── frontend/   # React + TypeScript  — player-facing web client
├── backend/    # Node + TypeScript   — authoritative game server
└── docs/       # architecture, design, schemas, drafts, process
```

See [ADR-0004](./decisions/0004-monorepo-react-frontend-node-backend.md).

## High-level components

```
   Player (mobile browser)                 Player (mobile browser)
            │                                        │
            ▼                                        ▼
   ┌─────────────────┐                      ┌─────────────────┐
   │  frontend        │                      │  frontend        │
   │  React + TS      │   create / join      │  React + TS      │
   │  - create game   │   by shareable id    │  - join by id    │
   │  - render board  │                      │  - take turns    │
   └────────┬─────────┘                      └────────┬─────────┘
            │                                          │
            └──────────────┬───────────────────────────┘
                           ▼   (participant sync)
                  ┌────────────────────────┐
                  │  backend  (Node + TS)   │
                  │  - synchronize players  │
                  │  - store game state     │
                  │  - run game logic       │
                  │    (the state machine)  │
                  └────────────────────────┘
```

### Frontend — `frontend/` (React + TypeScript)

- Create a game → generate a **shareable game id**.
- Join an existing session by entering/opening that id.
- Render the board and let the current player take **turn actions**.
- Static build → hosted on GitHub Pages (ADR-0003).

### Backend — `backend/` (Node + TypeScript)

- **Synchronize the participants** of a game session.
- **Store and run the game logic** — owns the authoritative game state, which is
  essentially a finite **state machine** advanced by player actions.
- Long-running process → needs its own hosting (decided later).

## Deliberately undecided (for now)

These are noted so nobody assumes them — each will get its own decision/ADR and
beads issue when the time comes:

- The sync transport between client and server (e.g. WebSockets vs polling).
- The bundler/build setup (Vite is the expected default for React + TS).
- State persistence (in-memory vs a database).
- Backend hosting.
- The concrete shape of the game state machine and its actions.

## Qualities we optimize for

1. **Mobile UX** — touch input, responsive layout, fast load.
2. **Authoritative server** — the backend is the source of truth for game state.
3. **Shareable sessions** — create → share id → join is the core entry flow.
4. **Autonomous development** — work is tracked in beads so it can be picked up
   across sessions.
