# frontend

The player-facing web client for Pattaya — a mobile-first, turn-based web game.

- **Stack:** React + TypeScript, bundled with **Vite** (ESM).
- **Flow:** create a game (get a shareable id) → others join by id → render the
  board → take turn actions. The backend is authoritative.
- **Deploy:** static build (`dist/`) served from GitHub Pages. `vite.config.ts`
  sets `base` to `/Pattaya-project/` to match the Pages path. Wiring the build
  into the Pages workflow is a follow-up (beads: pat-ejs).

## Layout

```
index.html              # Vite entry
vite.config.ts          # base path + React plugin
src/
├── main.tsx            # React root
├── App.tsx             # landing: create game / join by id (skeleton)
├── api/client.ts       # backend client interface + stub implementation
├── index.css           # global styles (mobile-first, safe-area aware)
└── App.css             # component styles
```

## Scripts

```bash
npm install        # install dependencies
npm run dev        # Vite dev server with HMR
npm run typecheck  # type-check (tsc -b)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

> **Skeleton only.** The create/join flows use a stub client; there is no real
> backend transport, board rendering, or turn logic yet — all tracked in beads
> (pat-czs, pat-wze, pat-3rm).
