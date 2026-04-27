# treepo

Source, seed scripts, and encrypted access codes for my [treepo.xyz](https://treepo.xyz) forests. A treepo is a virtual forest backed by a real Git repo — every commit is part of the artwork.

This is a [Vite+](https://viteplus.dev) workspace, with [`mise`](https://mise.jdx.dev) pinning the toolchain (`age`, `node`, `pnpm`) and [`pnpm`](https://pnpm.io) running the workspace.

## Forests

| forest | viewer | source |
| --- | --- | --- |
| **the canon event** — Spider-Man multiverse: every variant of the radioactive-spider bite, cataloged by the Bureau of Canon Events | <https://treepo.xyz/f/the-canon-event> | [`the-canon-event/`](the-canon-event/) |
| **the tree of life — game of life** — 1970–1996 archive of the KOS Institute for Cellular Botany; each tree is a Conway's Game of Life specimen, each commit one observation | <https://treepo.xyz/f/the-tree-of-life-game-of-life> | [`the-tree-of-life-game-of-life/`](the-tree-of-life-game-of-life/) |

Each forest is a Vite+ library package: TypeScript sources in `src/`, bundled to ES module `.js` files in `dist/` by `vp pack`. The bundled `.js` is what's POSTed as the seed script to the treepo API.

## Layout

```
treepo/
├─ .mise.toml                              # pins age, node, pnpm
├─ pnpm-workspace.yaml
├─ package.json                            # root workspace
├─ vite.config.ts                          # Vite+ run config (task cache)
├─ tsconfig.json                           # shared TS compiler options
├─ recipients.pub                          # snapshot of github.com/lachieh.keys
├─ packages/
│  └─ treepo-seed-api/                     # ambient TS declarations for the
│     └─ index.d.ts                        # treepo seed-script runtime
└─ <forest-slug>/
   ├─ src/                                 # forest source code (TS)
   ├─ dist/                                # bundled seed script (JS)
   ├─ access-code.age                      # age-encrypted access code for seeding
   └─ package.json                         # forest package manifest
```

## Commands

From the workspace root:

```sh
mise install               # provision age, node, pnpm
pnpm install               # resolve workspace deps
pnpm build                 # vp pack every forest (src/*.ts → dist/*.js)
pnpm typecheck             # tsc --noEmit in every forest
pnpm check                 # vp check (format + lint + types via Oxc)
```

`pnpm build` and `pnpm typecheck` invoke `vp run --filter './the-*' <task>` under the hood, which only targets the forest packages (skipping the workspace root and the types package).

## Why this repo exists

Each forest has an irrecoverable `accessCode` required to seed more commits into it. They live next to the forest as `<forest>/access-code.age`, encrypted with [`age`](https://age-encryption.org) to my GitHub SSH public keys (`github.com/lachieh.keys`). Any of those keys can decrypt; lose them all and the forests freeze where they are.

## Decrypting

```sh
mise exec -- age -d -i ~/.ssh/id_ed25519 the-canon-event/access-code.age
mise exec -- age -d -i ~/.ssh/id_ed25519 the-tree-of-life-game-of-life/access-code.age
```

Substitute whichever of your SSH private keys corresponds to one of the recipients in `recipients.pub`.

## Re-encrypting (e.g. after rotating GitHub keys)

```sh
curl -sS https://github.com/lachieh.keys > recipients.pub
printf '%s' "$ACCESS_CODE" | mise exec -- age -R recipients.pub -a -o <forest>/access-code.age
```

## Building & Seeding

From the workspace root, first test the seed script with a dry run:

```sh
pnpm -F the-canon-event dry-run # test the seed script without actually seeding
```

Then to run the seed script for real:

```sh
pnpm -F the-canon-event seed
