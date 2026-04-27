import { defineConfig } from 'vite-plus'

// Single seed entry: src/seed.ts → dist/seed.js. The treepo runtime is a
// V8 isolate with no module resolution, so the bundle must inline every
// import — workspace packages (@repo/*) are forced into the bundle via
// `deps.alwaysBundle`. Markdown files are loaded as text by tsdown's
// default loader (`import md from './X.md'`). Output is minified and
// tree-shaken to keep the seed under treepo's 40 KB script-size cap.
export default defineConfig({
  pack: {
    entry: ['src/seed.ts'],
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
  },
})
