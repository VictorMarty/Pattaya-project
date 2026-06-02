import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` matches the GitHub Pages project path so built asset URLs resolve at
// https://victormarty.github.io/Pattaya-project/. Wiring this build into the
// Pages deploy is tracked separately (beads: pat-ejs).
export default defineConfig({
  base: '/Pattaya-project/',
  plugins: [react()],
});
