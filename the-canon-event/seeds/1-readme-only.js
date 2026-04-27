// Minimal seed: place a README on the canon event forest's main branch.
// The original 1492-commit forest is preserved on the prior branch
// (seed-b61ed100) on the artifacts repo.
export async function seed() {
  await commit({
    path: "README.md",
    content:
"# the canon event\n" +
"\n" +
"A [treepo](https://treepo.xyz) by [Lachlan Heywood](https://github.com/lachieh) at <https://treepo.xyz/f/the-canon-event>.\n" +
"\n" +
"This forest is the imagined working file of the **Bureau of Canon Events, Field Office ∞, Desk 37,412** — an archive of every universe's variant of the radioactive-spider bite. The canon, the chaos, the mundane, the cosmic. Each `.tree` file is one branch of one universe; every commit lands on August 10 of some year. The archivist files what they can; the file is not closed; the file cannot be closed.\n" +
"\n" +
"> The original 1,492-commit body of the archive is preserved on the prior artifact branch `seed-b61ed100`.\n" +
"\n" +
"## Access\n" +
"\n" +
"The encrypted access code for this forest lives at <https://github.com/lachieh/treepo>.\n",
    message: "README. forwarding address for whoever opens the drawer.",
    author: { name: "junior archivist rye", email: "rye@desk-37413" },
    date: "2095-08-10T09:00:00Z",
  });
  await log("README filed. the original archive is on branch seed-b61ed100.");
}
