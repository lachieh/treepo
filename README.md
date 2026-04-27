# treepo

Encrypted access codes for my [treepo.xyz](https://treepo.xyz) forests. A treepo is a virtual forest backed by a real Git repo — every commit is part of the artwork.

## Forests

| forest | viewer | seeded |
| --- | --- | --- |
| **the canon event** — Spider-Man multiverse: every variant of the radioactive-spider bite, cataloged by the Bureau of Canon Events | <https://treepo.xyz/f/the-canon-event> | 2026-04-24 |
| **the tree of life — game of life** — fictional 1970–1996 archive of the KOS Institute for Cellular Botany; each tree is a Conway's Game of Life specimen, each commit one observation | <https://treepo.xyz/f/the-tree-of-life-game-of-life> | 2026-04-27 |

## Why this repo exists

Each forest has an irrecoverable `accessCode` required to seed more commits into it. They live in `secrets/`, encrypted with [`age`](https://age-encryption.org) to my GitHub SSH public keys (`github.com/lachieh.keys`). Any of those keys can decrypt; lose them all and the forests freeze where they are.

## Decrypting

`age` is pinned via [`mise`](https://mise.jdx.dev). After `mise install`:

```sh
mise exec -- age -d -i ~/.ssh/id_ed25519 secrets/the-canon-event.access-code.age
mise exec -- age -d -i ~/.ssh/id_ed25519 secrets/the-tree-of-life-game-of-life.access-code.age
```

Substitute whichever of your SSH private keys corresponds to one of the recipients in `recipients.pub`.

## Re-encrypting (e.g. after rotating GitHub keys)

```sh
curl -sS https://github.com/lachieh.keys > recipients.pub
printf '%s' "$ACCESS_CODE" | mise exec -- age -R recipients.pub -a -o secrets/<forest>.access-code.age
```

## Files

- `recipients.pub` — the SSH public keys age encrypts to (a snapshot of `github.com/lachieh.keys` at seal time)
- `secrets/*.access-code.age` — armored age ciphertext, one per forest
- `.mise.toml` — pins `age` so future-me doesn't have to remember which version
