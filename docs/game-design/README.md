# Game Design Document (GDD)

> Status: **high-level sketch.** Captures the concept agreed so far; mechanics
> and content are filled in later.

## Concept

Pattaya is a **multiplayer turn-based "board / walking" game** ("настолка-
бродилка"): players move and take actions on their turn, like a digital tabletop
game. Play is session-based and the rules behave like a **state machine** —
each player action advances the game from one well-defined state to the next.

## Core loop (high level)

1. A player **creates a game** → the system produces a **shareable id**.
2. They share the id; other players **join the session** by that id.
3. Players take **turns**, performing actions; the (server-side) game state
   machine validates each action and advances the game.
4. Play continues until the game reaches an end state.

## Roles & sessions

- **Host:** the player who created the game (owns the shareable id).
- **Participants:** players who joined via the id.
- A **session** is one running game, identified by its id, with the authoritative
  state held by the backend.

## Platform

- Mobile-first web (phone browser).
- Client: React + TS. Authoritative logic: Node + TS backend.
  See [architecture overview](../architecture/overview.md).

## To be defined later

- The board and movement model (what "walking" means concretely).
- The set of turn actions and their rules.
- Win/lose conditions and scoring.
- Number of players, turn order, timers.
- Art direction, audio, theme.

> Add details here as decisions are made. Significant *technical* decisions go to
> [`docs/architecture/decisions/`](../architecture/decisions/) as ADRs; design
> decisions are captured in this document.
