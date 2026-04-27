import { defineConfig } from 'vite-plus'

// Each seed in src/ is bundled independently so that shared assets (like
// `import readme from './README.md'`) get inlined into every output rather
// than split into a separate chunk file. The treepo runtime is a V8 isolate
// with no module resolution, so each `dist/<entry>.js` must be self-
// contained — no imports, no chunk references.
const baseConfig = {
  format: 'esm',
  target: 'es2022',
  platform: 'neutral',
  treeshake: true,
  minify: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  deps: {
    alwaysBundle: [/^@repo\//],
  },
  loader: { '.md': 'text' },
} as const

export default defineConfig({
  pack: [
    { ...baseConfig, entry: ['src/seed.ts'], clean: false },
  ],
})
