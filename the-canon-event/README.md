# the canon event

> **viewer:** <https://treepo.xyz/f/the-canon-event>

Imagined working file of the **Bureau of Canon Events, Field Office ∞, Desk 37,412** — an archive of every universe's variant of the radioactive-spider bite. The canon, the chaos, the mundane, the cosmic. Each `.tree` is one branch of one universe; every commit lands on August 10 of some year.

## Layout

- `src/1-readme-only.ts` — minimal seed: writes a single README to the forest's `main`.
- `src/2-seed.ts` — the full Bureau archive. **Source is 53 KB; it bundles to ~49 KB**, still over treepo's 40 KB seed-script cap, so it can't be re-run as-is. Kept for reference and as a starting point if you want to trim and re-seed later.
- `dist/*.js` — bundled output (gitignored). Run `pnpm build` to produce it.

## Branches on the artifacts repo

The viewer's `main` is currently `seed-6a6ab2b5` (the README from `1-readme-only.ts`). The full 1,492-commit Bureau archive sits on the prior branch **`seed-b61ed100`**.

## Building & seeding

From this directory:

```sh
pnpm build                                                          # src/*.ts → dist/*.js
ACCESS=$(mise exec -- age -d -i ~/.ssh/id_ed25519 access-code.age)  # decrypt the access code
jq -Rs --arg ac "$ACCESS" '{script: ., accessCode: $ac}' dist/1-readme-only.js \
  | curl -sS -X POST https://api.treepo.xyz/repo/the-canon-event/dry-run \
      -H 'content-type: application/json' --data-binary @-
```

(Then `/seed` instead of `/dry-run` for the real run.)
