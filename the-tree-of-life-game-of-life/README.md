# the tree of life — game of life

> **viewer:** <https://treepo.xyz/f/the-tree-of-life-game-of-life>

Imagined catalogue of the **KOS Institute for Cellular Botany** (Brno, 1969–1996). Each `.tree` file is a specimen of Conway's Game of Life — a lattice organism deterministically seeded from its Latin binomial. Every commit is one observation, filed by the institute's rotating staff: Ingrid Vohl (terse), Tomáš Řezník (poetic), Henri Lemaire (methodical), Oskar Halden (contrarian), Aino Virtanen (excitable), and one anonymous final hand. Different observers use different ASCII glyphs, so each specimen looks visually distinct in their care.

## Branches

`main` is currently `seed-492e77fc` (3,109 commits — the full institute archive plus a README), produced by `seeds/v2-with-readme-current.js`. The first run, `seed-082023ea`, is identical minus the README.

## Validation

`validate.mjs` is an independent verifier of the Game of Life dynamics:

- Re-runs the seed's deterministic init + step locally
- Cross-checks against two independently written `step()` implementations (a flat-array version and a pure functional version)
- Hand-checks: a vertical blinker rotates to horizontal and back; a glider translates `(+1,+1)` after 4 generations
- Pulls the live snapshot from `api.treepo.xyz` and compares each specimen's `.tree` file at HEAD against the locally-computed final generation

To run:

```sh
curl -sS https://api.treepo.xyz/snapshots/the-tree-of-life-game-of-life/$(curl -sS https://api.treepo.xyz/forests | jq -r '.forests[] | select(.slug=="the-tree-of-life-game-of-life") | .headOid').json -o /tmp/treepo-snapshot.json
node validate.mjs
```

Last result: 3,075 transitions cross-validated, 21/21 specimens match server HEAD.

## Re-seeding

```sh
ACCESS=$(mise exec -- age -d -i ~/.ssh/id_ed25519 ../../secrets/the-tree-of-life-game-of-life.access-code.age)
jq -Rs --arg ac "$ACCESS" '{script: ., accessCode: $ac}' seeds/v2-with-readme-current.js \
  | curl -sS -X POST https://api.treepo.xyz/repo/the-tree-of-life-game-of-life/dry-run \
      -H 'content-type: application/json' --data-binary @-
```

(Then `/seed` instead of `/dry-run` for the real run. Takes a minute or so.)
