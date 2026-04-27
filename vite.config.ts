import { defineConfig } from 'vite-plus'

// Workspace root: orchestrate `vp run` across packages with caching for
// every package.json script.
export default defineConfig({
  run: {
    cache: {
      scripts: true,
    },
  },
})
