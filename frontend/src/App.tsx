import { useState } from 'react';
import { createStubClient, type GameSession } from './api/client.ts';
import './App.css';

const client = createStubClient();

// A throwaway local identity until real auth/lobby exists (beads: pat-czs).
const me = { id: 'me', name: 'Player' };

export default function App() {
  const [session, setSession] = useState<GameSession | null>(null);
  const [joinId, setJoinId] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleCreate() {
    setBusy(true);
    try {
      setSession(await client.createGame(me));
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin() {
    if (!joinId.trim()) return;
    setBusy(true);
    try {
      setSession(await client.joinGame(joinId.trim(), me));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app">
      <h1 className="title">Pattaya</h1>

      {session ? (
        <section className="card" aria-label="Game lobby">
          <p className="label">Game id</p>
          <p className="code">{session.id}</p>
          <p className="hint">Share this id so others can join.</p>
          {/* TODO: render the board and turn actions (beads: pat-czs, pat-3rm). */}
          <button className="btn ghost" onClick={() => setSession(null)}>
            Leave
          </button>
        </section>
      ) : (
        <section className="card" aria-label="Start or join a game">
          <button className="btn" onClick={handleCreate} disabled={busy}>
            Create game
          </button>

          <div className="divider">or</div>

          <div className="join">
            <input
              className="input"
              inputMode="text"
              autoCapitalize="none"
              placeholder="Enter game id"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
            />
            <button className="btn" onClick={handleJoin} disabled={busy || !joinId.trim()}>
              Join
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
