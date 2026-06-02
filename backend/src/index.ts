/**
 * Backend entry point.
 *
 * Skeleton only: starts a minimal HTTP server exposing a health check and
 * constructs the in-memory session store. The real API surface and the
 * participant-sync transport (e.g. WebSockets) are deliberately not implemented
 * yet — see docs/architecture/overview.md and the beads roadmap.
 */

import { createServer } from 'node:http';
import { SessionStore } from './session/sessionStore.js';

const PORT = Number(process.env.PORT ?? 3000);

const sessions = new SessionStore();

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', sessions: sessions.count() }));
    return;
  }

  // TODO: create-game / join-by-id / take-action endpoints (beads: pat-czs, pat-wiz, pat-wze).
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`[pattaya-backend] listening on http://localhost:${PORT}`);
});
