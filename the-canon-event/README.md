# the canon event

> **viewer:** <https://treepo.xyz/f/the-canon-event>

Imagined working file of the **Bureau of Canon Events, Field Office ∞, Desk 37,412** — an archive of every universe's variant of the radioactive-spider bite. The canon, the chaos, the mundane, the cosmic. Each `.tree` is one branch of one universe; every commit lands on August 10 of some year.

## Branches on the artifacts repo

The viewer's `main` is currently `seed-6a6ab2b5` (just the README; see `seeds/v3-readme-only-current.js`).

The full 1,492-commit Bureau archive sits on the prior branch **`seed-b61ed100`** — produced by `seeds/v1-original-1492-commits.js`. That seed is 51 KB, which is over treepo's 40 KB seed-script cap, so it can't be re-run as-is. `seeds/v2-with-readme-unused.js` is the version with a README appended; kept here because it's a smaller delta away from a fitting size if you want to trim and re-seed later.

## Re-seeding

```sh
ACCESS=$(mise exec -- age -d -i ~/.ssh/id_ed25519 ../../secrets/the-canon-event.access-code.age)
jq -Rs --arg ac "$ACCESS" '{script: ., accessCode: $ac}' seeds/v3-readme-only-current.js \
  | curl -sS -X POST https://api.treepo.xyz/repo/the-canon-event/dry-run \
      -H 'content-type: application/json' --data-binary @-
```

(Then `/seed` instead of `/dry-run` for the real run.)
