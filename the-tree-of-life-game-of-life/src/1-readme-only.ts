/// <reference types="treepo-seed-api" />
// KOS Institute for Cellular Botany — an imagined 1970-1996 archive.
// Each "tree" is a specimen of Conway's Game of Life; each commit one
// observation, filed by the rotating staff of the institute.

export async function seed() {
  await commit({
    path: 'README.md',
    content:
'# the tree of life — game of life\n' +
'\n' +
'A [treepo](https://treepo.xyz) by [Lachlan Heywood](https://github.com/lachieh) at <https://treepo.xyz/f/the-tree-of-life-game-of-life>.\n' +
'\n' +
'This forest is the imagined catalogue of the **KOS Institute for Cellular Botany** (Brno, 1969-1996). Each `.tree` file is a specimen of Conway\'s Game of Life — a lattice organism deterministically seeded from its Latin binomial. Every commit is one observation, filed by the institute\'s rotating staff: Ingrid Vohl (terse), Tomáš Řezník (poetic), Henri Lemaire (methodical), Oskar Halden (contrarian), Aino Virtanen (excitable), and one anonymous final hand. Different observers use different ASCII glyphs, so each specimen looks visually distinct in their care.\n' +
'\n' +
'Scrub the commit history to watch the lattices evolve generation by generation across twenty-five years.\n' +
'\n' +
'## Access\n' +
'\n' +
'The encrypted access code for this forest lives at <https://github.com/lachieh/treepo>.\n',
    message: 'README. for whoever opens the drawer.',
    author: { name: 'the descendant', email: 'descendant@kos-institute.cz.archive' },
    date: '1996-06-15T12:00:00Z',
  })
  await log("README filed. the original archive is on branch seed-b61ed100.");
}
