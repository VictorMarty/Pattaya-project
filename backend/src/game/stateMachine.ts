/**
 * Game logic — the authoritative state machine.
 *
 * Pattaya is a turn-based "board / walking" game. The game is modelled as a
 * finite state machine: an action proposed by a player is validated against the
 * current state and either advances the game to a new state or is rejected.
 *
 * This is a high-level skeleton. The concrete board model, the set of actions,
 * and the transition rules are intentionally not defined yet — see the beads
 * issue "Define the game state-machine model" and
 * docs/architecture/overview.md.
 */

/** Coarse lifecycle phases of a single game session. */
export type GamePhase = 'lobby' | 'in_progress' | 'finished';

export interface PlayerState {
  readonly id: string;
  readonly name: string;
  // TODO: position on the board, resources, etc.
}

/** Authoritative state of one game. Owned by the backend. */
export interface GameState {
  readonly phase: GamePhase;
  readonly players: readonly PlayerState[];
  /** Index into `players` whose turn it is, or null outside `in_progress`. */
  readonly activePlayerIndex: number | null;
  /** Monotonic turn counter, for ordering/idempotency. */
  readonly turn: number;
  // TODO: board state, history, win condition data, ...
}

/**
 * A turn action proposed by a player. The concrete action set is TBD; this is a
 * placeholder discriminated union with a single example variant.
 */
export type GameAction =
  | { readonly type: 'noop'; readonly playerId: string };

/** A rejected action carries a reason; an accepted one carries the next state. */
export type TransitionResult =
  | { readonly ok: true; readonly state: GameState }
  | { readonly ok: false; readonly reason: string };

/** The initial state of a freshly created game (empty lobby). */
export function initialState(): GameState {
  return { phase: 'lobby', players: [], activePlayerIndex: null, turn: 0 };
}

/**
 * Pure transition function: given the current state and an action, return the
 * next state (or a rejection). Kept pure so it is trivial to test and to run
 * server-side as the single source of truth.
 */
export function transition(state: GameState, action: GameAction): TransitionResult {
  // TODO: implement real rules once the model is defined (beads: pat-3rm).
  switch (action.type) {
    case 'noop':
      return { ok: true, state };
    default:
      return { ok: false, reason: 'unknown action' };
  }
}
