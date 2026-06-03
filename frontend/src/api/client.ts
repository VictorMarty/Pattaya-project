/**
 * Backend client (skeleton).
 *
 * Mirrors the backend session API shape: create a game (returns a shareable id)
 * and join an existing game by id. The transport is not decided yet — these are
 * stubs so the UI can be built against a stable interface. Real wiring (HTTP +
 * a participant-sync channel such as WebSockets) is tracked in beads
 * (pat-czs, pat-wze).
 */

export interface Participant {
  id: string;
  name: string;
}

export interface GameSession {
  id: string;
  participants: Participant[];
}

export interface PattayaClient {
  createGame(host: Participant): Promise<GameSession>;
  joinGame(id: string, participant: Participant): Promise<GameSession>;
}

/**
 * Placeholder client used until the backend transport exists. It fabricates a
 * local session id so the create/join flows are clickable end-to-end in the UI.
 */
export function createStubClient(): PattayaClient {
  return {
    async createGame(host) {
      // TODO: POST to backend; the server is authoritative for the id.
      const id = Math.random().toString(36).slice(2, 8);
      return { id, participants: [host] };
    },
    async joinGame(id, participant) {
      // TODO: POST to backend; server validates the id and returns the roster.
      return { id, participants: [participant] };
    },
  };
}
