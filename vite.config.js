import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Scoped to just `buffer` — that's the specific module Vite's
    // "externalized for browser compatibility" error named. Something in
    // the @circle-fin/app-kit / adapter-ethers-v6 chain reaches for
    // Node's Buffer at runtime; Vite 5+ no longer polyfills it by default.
    // If a later error names a different Node core module (e.g.
    // "process", "stream"), add it to `include` then — don't polyfill
    // everything up front.
    nodePolyfills({
      include: ['buffer'],
      globals: {
        Buffer: true,
        global: false,
        process: false,
      },
    }),
  ],
})