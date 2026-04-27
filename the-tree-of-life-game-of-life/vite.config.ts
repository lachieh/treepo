import { defineConfig } from 'vite-plus'

// Each TS source file in src/ is a standalone treepo seed script. The pack
// step bundles each one to a single ES module under dist/, with no imports
// (the treepo runtime is a V8 isolate that cannot resolve modules). The
// resulting .js file is what's POSTed to the treepo dry-run / seed API.
export default defineConfig({
  pack: {
    entry: ['src/1-readme-only.ts', 'src/2-seed.ts'],
    format: 'esm',
    target: 'es2022',
    platform: 'neutral',
    treeshake: true,
    minify: false,
    sourcemap: false,
    clean: true,
    outDir: 'dist',
  },
})
