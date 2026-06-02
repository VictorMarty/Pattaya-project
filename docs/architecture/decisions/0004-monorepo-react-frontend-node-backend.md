# ADR-0004: Monorepo with a React frontend and a Node backend

- **Status:** Accepted
- **Date:** 2026-06-02

## Context

Pattaya is a multiplayer, turn-based "board / walking" game: a player creates a
game (getting a shareable id), others join the session by that id, and play
proceeds through turn actions. That implies two cooperating parts — a client UI
and an authoritative server that synchronizes participants and runs the game
logic — that share concepts (game state, actions, ids) and benefit from evolving
together.

This is a high-level stack decision only; the internal design of either part is
intentionally **not** decided here.

## Decision

Organize the repository as a **monorepo** with three top-level directories:

| Dir | Role | Stack |
|-----|------|-------|
| `frontend/` | Player-facing web client | **React + TypeScript** |
| `backend/`  | Authoritative game server | **Node + TypeScript** |
| `docs/`     | Architecture, design, schemas, drafts, process | Markdown |

High-level responsibilities:

- **Frontend (React + TS):** create a game → produce a shareable id; join a
  session by id; render the board and let players take turn actions.
- **Backend (Node + TS):** synchronize the participants of a session, and
  **store and run the game logic** — the game is essentially a state machine, and
  the backend is its authoritative owner.

## Consequences

- Frontend and backend live and version together; shared types/contracts can be
  factored out later within the monorepo.
- The frontend is a static build → it fits GitHub Pages (ADR-0003). The backend
  is a long-running Node process and will need separate hosting — to be decided
  later.
- A bundler/build tool (Vite is the expected default for a React + TS app) and
  the participant-sync transport (e.g. WebSockets) are left to follow-up
  decisions and beads issues.
- Supersedes the placeholder intent to defer the framework choice.
