# backend

The authoritative game server for Pattaya.

- **Stack:** Node + TypeScript.
- **Responsibilities (high level):**
  - **Synchronize the participants** of a game session.
  - **Store and run the game logic** — owns the authoritative game state, which
    is essentially a finite **state machine** advanced by player turn actions.
- **Hosting:** a long-running process; hosting is decided later (GitHub Pages
  serves only the static frontend).

> Not scaffolded yet — this is the placeholder for the Node service. The sync
> transport (e.g. WebSockets), state persistence, and the state-machine model
> are tracked as beads issues. See
> [`docs/architecture/overview.md`](../docs/architecture/overview.md).
