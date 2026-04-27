# the tree of life — game of life

> **viewer:** <https://treepo.xyz/f/the-tree-of-life-game-of-life>

Imagined catalogue of the **KOS Institute for Cellular Botany** (Brno, 1969–1996). Each `.tree` file is a specimen of Conway's Game of Life — a lattice organism deterministically seeded from its Latin binomial. Every commit is one observation, filed by the institute's rotating staff: Ingrid Vohl (terse), Tomáš Řezník (poetic), Henri Lemaire (methodical), Oskar Halden (contrarian), Aino Virtanen (excitable), and one anonymous final hand. Different observers use different ASCII glyphs, so each specimen looks visually distinct in their care.

## Layout

- `src/1-readme-only.ts` — minimal seed: writes a single README to the forest's `main`.
- `src/2-seed.ts` — the full institute archive (3,108 generations + README at the end). Bundles to ~20 KB, well under the 40 KB cap.
- `dist/*.js` — bundled output (gitignored). Run `pnpm build` to produce it.

## Branches

`main` is currently `seed-492e77fc` (3,109 commits — the full institute archive plus a README), produced by the bundle of `src/2-seed.ts`. The first run, `seed-082023ea`, is identical minus the README.

## Building & seeding

From this directory:

```sh
pnpm build                                                          # src/*.ts → dist/*.js
ACCESS=$(mise exec -- age -d -i ~/.ssh/id_ed25519 access-code.age)  # decrypt the access code
jq -Rs --arg ac "$ACCESS" '{script: ., accessCode: $ac}' dist/2-seed.js \
  | curl -sS -X POST https://api.treepo.xyz/repo/the-tree-of-life-game-of-life/dry-run \
      -H 'content-type: application/json' --data-binary @-
```

(Then `/seed` instead of `/dry-run` for the real run. Takes a minute or so.)

## Validation

The forest used to ship a `validate.mjs` that cross-checks Conway's Game of Life dynamics against three independent `step()` implementations and against the live snapshot at `api.treepo.xyz`. Last result: 3,075 transitions cross-validated, 21/21 specimens matched server HEAD. The script is currently absent from this directory — bring it back if you want to re-run the verification, or recover it from the previous `forests/the-tree-of-life-game-of-life/` layout in this repo's history.
