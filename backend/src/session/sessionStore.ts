/**
 * Session management — create a game (shareable id) and join by that id.
 *
 * The store is the backend's registry of running games. This skeleton keeps
 * everything in memory; persistence (in-memory vs a database) and the
 * participant-sync transport are deliberately left for later decisions
 * (see docs/architecture/overview.md and the beads roadmap).
 */

import { randomBytes } from 'node:crypto';
import { initialState, type GameState } from '../game/stateMachine.js';

export type SessionId = string;

export interface Participant {
  readonly id: string;
  readonly name: string;
}

export interface GameSession {
  readonly id: SessionId;
  readonly hostId: string;
  readonly participants: Participant[];
  state: GameState;
  readonly createdAt: number;
}

/** Generate a short, URL-friendly, shareable session id (e.g. "k3f9q2a1"). */
export function generateSessionId(): SessionId {
  return randomBytes(5).toString('hex'); // 10 hex chars
}

/** In-memory registry of active game sessions. */
export class SessionStore {
  private readonly sessions = new Map<SessionId, GameSession>();

  /** Create a new game owned by `host`; returns its shareable session. */
  createGame(host: Participant): GameSession {
    const session: GameSession = {
      id: generateSessionId(),
      hostId: host.id,
      participants: [host],
      state: initialState(),
      createdAt: Date.now(),
    };
    this.sessions.set(session.id, session);
    return session;
  }

  /** Join an existing session by id. Returns undefined if it does not exist. */
  joinGame(id: SessionId, participant: Participant): GameSession | undefined {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    if (!session.participants.some((p) => p.id === participant.id)) {
      session.participants.push(participant);
    }
    return session;
  }

  get(id: SessionId): GameSession | undefined {
    return this.sessions.get(id);
  }

  count(): number {
    return this.sessions.size;
  }
}
