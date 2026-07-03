import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // The workspace packages export TypeScript source, so Vite must transpile
  // them (rather than externalize them) when rendering on the server.
  ssr: { noExternal: ['@chess-lib/core', '@chess-lib/react-hooks'] },
  plugins: [devtools(), nitro(), tailwindcss(), tanstackStart(), viteReact()],
})

export default config
