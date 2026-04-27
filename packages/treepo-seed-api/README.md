# treepo-seed-api

Ambient TypeScript declarations for the [treepo.xyz](https://treepo.xyz) seed-script runtime.

A treepo seed script is an ES module that exports an async `seed()` function. Treepo evaluates it inside a V8 isolate and injects four globals — `commit`, `readFile`, `listFiles`, `log`. This package declares those globals so seed scripts get autocomplete and type checking.

## Usage in a seed script (JavaScript)

Reference the package from `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "module": "esnext",
    "target": "es2022",
    "strict": true,
    "types": ["treepo-seed-api"]
  },
  "include": ["seeds/**/*.js"]
}
```

Then `pnpm tsc --noEmit` (or `pnpm typecheck`) checks every seed file against the runtime contract.

For per-file opt-in, add `// @ts-check` and a triple-slash directive:

```js
// @ts-check
/// <reference types="treepo-seed-api" />

export async function seed() {
  await commit({
    path: '1971/k-0001.tree',
    content: '...',
    message: 'planted.',
    author: { name: 'Dr. Ingrid Vohl' },
    date: '1971-03-14T08:00:00Z',
  });
}
```

## What it covers

- `commit({ path, content, message, author?, date? })`
- `readFile(path)` / `listFiles(prefix?)` / `log(message)`
- `TreepoAuthor`, `TreepoDate`, `TreepoCommitInput`, `TreepoSeed`
- Documented hard limits (`TreepoLimits`)

## What it doesn't (yet)

- The vet rejection error shape (`vet_rejected` reason strings)
- `SeedCapExceededError` constructor
- Per-file or total-bytes limits (not yet documented by treepo.xyz)
- Whether `crypto.subtle`, `TextEncoder`, `DecompressionStream`, etc. are available in the isolate
