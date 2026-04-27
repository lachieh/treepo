/// <reference types="@repo/treepo-seed-api" />
// THE CANON EVENT — Bureau of Canon Events, Field Office ∞, Desk 37,412
// Every universe's spider bite. Cataloged.

import { hash, prng, pick } from '@repo/utils'
import readme from './README.md'

export async function seed() {
  // ====================== forest-local utilities ======================
  const ri = (r, lo, hi) => Math.floor(r() * (hi - lo)) + lo;
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  // Every commit on August 10, some year in [1970, 2095]. The canon date.
  const AUG = (y, h = 15, m = 47, s = 0) => `${pad(y, 4)}-08-10T${pad(h)}:${pad(m)}:${pad(s)}Z`;

  // ====================== authors ======================
  const ARC = { name: "the archivist", email: "desk-37412@bureau-of-canon-events.∞" };
  const SPI = { name: "the spider", email: "vitrine-7@midtown-science-expo.1962" };
  const WAT = { name: "uatu", email: "observer@blue-area.moon" };
  const MAY = { name: "may reilly parker", email: "may@forest-hills.queens" };
  const BEN = { name: "uncle ben (†)", email: "ben@that-last-tuesday.1963" };
  const PET = { name: "peter b. parker", email: "p.parker@midtown-high.62" };
  const CPA = { name: "peter parker, cpa", email: "pparker@schultz-goldfarb-assoc.07" };
  const MJ  = { name: "mary jane watson", email: "mj@face-it-tiger.1966" };
  const GWEN = { name: "gwen stacy", email: "g.stacy@the-bridge.1973" };
  const MIL = { name: "miles g. morales", email: "miles@visions-academy.1610" };
  const OSC = { name: "osborn legal, LLP", email: "litigation@osborn-corporation" };
  const NOR = { name: "norman osborn", email: "n.osborn@osborn-corporation" };
  const ME  = { name: "dr. elena vasquez, ME", email: "evasquez@ny-coroner.616" };
  const HAM = { name: "a ham sandwich", email: "mayo@sliced-rye.1962" };
  const LIB = { name: "margaret voss", email: "shh@queens-public-library" };
  const GOD = { name: "the spider-god", email: "small-god@web" };
  const TOC = { name: "tōcatl (she-who-weaves)", email: "spinneret@tenochtitlan.pre-cortés" };
  const DMV = { name: "clerk, window 7", email: "window-7@dmv-queens" };
  const ENT = { name: "dr. nathan okafor, phd", email: "okafor@cornell-entomology" };
  const DIR = { name: "director kowalski", email: "kowalski@rehearsal-studio-c" };
  const JUN = { name: "junior archivist rye", email: "rye@desk-37413" };
  const eye = (n, addr) => ({ name: `eye: ${n}`, email: `${addr}@the-spider.∞` });
  const EYES = [
    eye("dorsal-left", "01"), eye("dorsal-right", "02"),
    eye("medial-left", "03"), eye("medial-right", "04"),
    eye("lateral-left", "05"), eye("lateral-right", "06"),
    eye("principal-left", "07"), eye("principal-right", "08"),
  ];

  // ====================== spider ASCII ======================
  const SPIDER_NORMAL = [
    "          \\\\      |      //",
    "           \\\\     |     //",
    "     \\______\\\\____|____//______/",
    "               ( ● ● )",
    "    /_______//    |    \\\\_______\\",
    "          //      |      \\\\",
    "         /        |        \\",
  ].join("\n");

  const SPIDER_TINY = ["  \\\\|//", "  ──●──", "   /|\\\\"].join("\n");

  const SPIDER_COSMIC = [
    "        *         |         *",
    "        \\\\        |        //",
    "   *     \\\\_______|_______//     *",
    "      ─────────( ✦ ✦ )─────────",
    "   *     //       |       \\\\     *",
    "        //        |        \\\\",
    "        *         |         *",
  ].join("\n");

  const SPIDER_DEAD = [
    "        \\\\  |  //",
    "         \\\\_|_//",
    "           ╳ ╳",
    "         /  |  \\",
    "    (legs curled upward, like a small fist)",
  ].join("\n");

  const SPIDER_HUGE = [
    "          \\\\              |              //",
    "    \\\\     \\\\             |             //      //",
    "     \\\\     \\\\            |            //      //",
    "      \\\\_____\\\\___________|___________//______//",
    "                    (           )",
    "           .─────'──(   ●   ●   )──'─────.",
    "          /         (           )         \\",
    "         /      ___/             \\___      \\",
    "        /______/                     \\______\\",
    "              /           |           \\",
    "       /     /            |            \\     \\",
    "      /     /             |             \\     \\",
    "           /              |              \\",
  ].join("\n");

  const SPIDER_GOD = [
    "           †         |         †",
    "      †     †††   ██ █ ██   †††     †",
    "   †††           █ █ █ █ █           †††",
    "  ─────────  ●  ●  ● ● ●  ●  ●  ─────────",
    "   †††           ((     ))           †††",
    "      †     †††    █████    †††     †",
    "           †         |         †",
    "  (eight-limbed, crowned with unsayable names)",
  ].join("\n");

  const SPIDER_MACHINE = [
    "    ┌┐         │         ┌┐",
    "    ├┴┐   ┌────┴────┐   ┌┴┤",
    "    ├─┤───┤ ▢  ▢  ▢ ├───├─┤",
    "    └┬┘   └──┬─┬─┬──┘   └┬┘",
    "     │   serial: 0810-1962",
    "     │   firmware: canon/v∞",
    "     │   warranty: void",
  ].join("\n");

  const SPIDER_DISSECTED = [
    "  ┌──────────────────────────┐",
    "  │  Fig. 1. Specimen ARC-7  │",
    "  ├──────────────────────────┤",
    "  │  A ──── cephalothorax    │",
    "  │  B ──── pedipalps        │",
    "  │  C ──── chelicerae       │",
    "  │           ( x · x )      │",
    "  │  D ──── spinnerets       │",
    "  │  E ──── abdomen (ant.)   │",
    "  │          abdomen (post.) │",
    "  │                          │",
    "  │  pinned, 10-viii-1962.   │",
    "  └──────────────────────────┘",
  ].join("\n");

  // ====================== tree-diagram helper ======================
  // produces ├── and └── branching diagrams.
  const tree = (root, children = []) => {
    const out = [root];
    const walk = (nodes, prefix) => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const [label, subs] = Array.isArray(node) ? [node[0], node[1] || []] : [node, []];
        const last = i === nodes.length - 1;
        out.push(prefix + (last ? "└── " : "├── ") + label);
        walk(subs, prefix + (last ? "    " : "│   "));
      }
    };
    walk(children, "");
    return out.join("\n");
  };

  // ====================== the bureau opens ======================
  await commit({
    path: "0-bureau-of-canon-events.md",
    content:
`# THE BUREAU OF CANON EVENTS
# FIELD OFFICE ∞ ─ SECTOR: ARACHNOLOGICAL BRANCHINGS
# DESK 37,412.

I am an archivist. There are 37,000 of us on this floor.
We catalog one event.

On August 10th, in every universe that has an August 10th,
a radioactive spider bites a boy named Peter.

    (Sometimes it is not August 10th.
     Sometimes the spider is not radioactive.
     Sometimes the boy is not a boy.
     Sometimes the boy is not Peter.
     Sometimes the bite does not happen.
     Sometimes, upon reflection, the spider declines.)

We catalog all of them.

This forest is my desk.

                                       ─ the archivist,
                                         desk 37,412,
                                         field office ∞.
`,
    message: "the bureau opens. the file is begun. on august 10th we catalog.",
    author: ARC,
    date: AUG(1970, 0, 0, 1),
  });

  await commit({
    path: "0-the-spider.tree",
    content:
`                           THE SPIDER
                          (one, perhaps)

${SPIDER_NORMAL}

     There is a view among the junior archivists
     that it is always the same spider across all
     universes — only the boy varies.

     I do not hold this view.
     I no longer hold views.
`,
    message: "the spider. small. the weight of what follows is not.",
    author: ARC,
    date: AUG(1970, 0, 0, 2),
  });

  // ====================== archivist's journal (grows throughout) ======================
  const journalPath = "archivist-journal.md";
  let journal =
`# JOURNAL OF THE ARCHIVIST
# DESK 37,412 · FIELD OFFICE ∞

Opened: August 10. Year unknown. Filing unclear.

The pages are not lined. I have requested lined paper eleven times.
I no longer file requests.

═════════════════════════════════════════════════════════════

`;
  const journalEntry = async (dateStr, author, body) => {
    journal += `\n${body}\n\n─────────────────────────────────\n`;
    const firstLine = body.split("\n")[0].replace(/[#>*]/g, "").trim().slice(0, 90).toLowerCase();
    await commit({ path: journalPath, content: journal, message: firstLine || "journal.", author, date: dateStr });
  };

  await journalEntry(AUG(1970, 0, 0, 30), ARC,
`[entry 0001]
I have been assigned the Parker File. They tell me it is easy.
There are, they say, only a few forks. I have counted forty-two thousand
so far and I have not yet opened my eyes.`);

  // ====================== universe definitions ======================
  // Each universe has a flavor and a year-anchor. Every commit of a given universe
  // is dated August 10 of that universe's year. Sub-seconds distinguish commits.
  const universes = [
    { id: "earth-616", year: 1970, summary: "canon. peter parker bitten. uncle ben dies. spider-man is made.", spider: SPIDER_NORMAL, victim: "peter benjamin parker, 15", outcome: "spider-man", narrator: PET, voice: "canon" },
    { id: "earth-1610", year: 1996, summary: "miles morales bitten. uncle aaron, not uncle ben.", spider: SPIDER_NORMAL, victim: "miles g. morales, 13", outcome: "spider-man (the next)", narrator: MIL, voice: "miles" },
    { id: "earth-ham-sandwich", year: 1970, summary: "peter ducks. the spider misses. he goes home and has a ham sandwich.", spider: SPIDER_NORMAL, victim: "peter parker (never spider-man)", outcome: "a ham sandwich, on rye, with mayo", narrator: HAM, voice: "sandwich" },
    { id: "earth-mundane", year: 1970, summary: "the bite happens. nothing happens. peter grows up, gets a cpa.", spider: SPIDER_NORMAL, victim: "peter parker, cpa", outcome: "moderate success in tax accounting", narrator: CPA, voice: "terse-botanist" },
    { id: "earth-aunt-may", year: 1970, summary: "aunt may is bitten. she becomes spider-grandma. she is wonderful at it.", spider: SPIDER_NORMAL, victim: "may reilly parker, 63", outcome: "spider-grandma, beloved of queens", narrator: MAY, voice: "grandma" },
    { id: "earth-spider-dies", year: 1970, summary: "the spider has a small stroke mid-fall. lands on peter's left shoe.", spider: SPIDER_DEAD, victim: "the spider itself", outcome: "a small arachnid funeral, and otherwise nothing", narrator: ME, voice: "coroner" },
    { id: "earth-theological", year: 1974, summary: "the spider is a small god. peter becomes its prophet.", spider: SPIDER_GOD, victim: "peter parker, prophet", outcome: "a cult of small reverence, 8 members", narrator: GOD, voice: "theology" },
    { id: "earth-inverted", year: 1970, summary: "peter bites the spider. the spider becomes a man. it files taxes poorly.", spider: SPIDER_DISSECTED, victim: "the spider (now human, confused)", outcome: "a slightly worse man than peter would have been", narrator: SPI, voice: "tiny-human" },
    { id: "earth-still-waiting", year: 1970, summary: "the bite has not yet happened. fifty-four years. the spider is very old.", spider: SPIDER_TINY, victim: "no one yet", outcome: "pending", narrator: ARC, voice: "patient" },
    { id: "earth-legal", year: 1970, summary: "osborn legal serves peter on the gymnasium floor. the bite is litigated for decades.", spider: SPIDER_NORMAL, victim: "peter parker (plaintiff/defendant)", outcome: "settled 1987 for $400 and a letter of apology", narrator: OSC, voice: "legal" },
    { id: "earth-nahuatl", year: 1980, summary: "the spider speaks nahuatl. in this universe, the day is cē tōchtli. there is no peter.", spider: SPIDER_NORMAL, victim: "tōcatl (she-who-weaves)", outcome: "a weaving. also a warning.", narrator: TOC, voice: "nahuatl" },
    { id: "earth-recursive", year: 1971, summary: "every spider in the universe begins biting every human. a normal day.", spider: SPIDER_NORMAL, victim: "everybody", outcome: "nobody is spider-man because everybody is", narrator: ARC, voice: "flat" },
    { id: "earth-library", year: 1971, summary: "the bite happens in a library. margaret voss shushes the spider. it complies.", spider: SPIDER_NORMAL, victim: "peter parker (whisper-level)", outcome: "a very quiet spider-man", narrator: LIB, voice: "librarian" },
    { id: "earth-cooking", year: 1970, summary: "peter eats the spider by accident. it was on his sandwich.", spider: SPIDER_DEAD, victim: "the spider, swallowed", outcome: "mild indigestion. otherwise unchanged.", narrator: PET, voice: "canon" },
    { id: "earth-silent", year: 1970, summary: "the bite happens. peter loses the ability to speak. he webs at people who ask why.", spider: SPIDER_NORMAL, victim: "peter parker", outcome: "a silent spider-man, widely respected", narrator: ARC, voice: "quiet" },
    { id: "earth-paused", year: 1970, summary: "the bite is paused mid-air. has been since 1962. the spider's fangs are open.", spider: SPIDER_TINY, victim: "peter parker (still 15)", outcome: "pending", narrator: WAT, voice: "watcher" },
    { id: "earth-quantum", year: 1982, summary: "every observation creates a branch. each moment, every possibility. the archivist weeps.", spider: SPIDER_COSMIC, victim: "an infinity of peters", outcome: "all of them / none of them", narrator: ARC, voice: "unraveling" },
    { id: "earth-uncle-ben", year: 1970, summary: "uncle ben is bitten. he gives the speech, and immediately dies of heart failure.", spider: SPIDER_NORMAL, victim: "benjamin franklin parker, 62", outcome: "a speech. a death. no spider-man.", narrator: BEN, voice: "ghost" },
    { id: "earth-machine", year: 2024, summary: "the spider is a drone. the bite is a vaccine trial. the aftermath is a lawsuit.", spider: SPIDER_MACHINE, victim: "peter parker (clinical trial subject #7)", outcome: "a settlement and a non-disclosure agreement", narrator: OSC, voice: "legal" },
    { id: "earth-comma", year: 1970, summary: "the bite is a comma in a longer sentence. we do not know who peter is.", spider: SPIDER_TINY, victim: "[redacted]", outcome: "[redacted], [redacted]", narrator: ARC, voice: "redacted" },
    { id: "earth-rehearsal", year: 1970, summary: "it is a rehearsal. peter is an actor. the spider is a prop. the director takes notes.", spider: SPIDER_DEAD, victim: "peter parker (character, tbc)", outcome: "off-broadway revival, closes after 4 nights", narrator: DIR, voice: "director" },
    { id: "earth-00001", year: 1970, summary: "the spider is 0.00001 mm. the bite is real. nothing happens.", spider: SPIDER_TINY, victim: "peter parker (microscopically)", outcome: "nothing, at 0.00001 mm", narrator: ENT, voice: "terse-botanist" },
    { id: "earth-weekday", year: 1970, summary: "the bite only happens on tuesdays. today is thursday. the spider waits.", spider: SPIDER_NORMAL, victim: "pending", outcome: "pending until tuesday", narrator: SPI, voice: "spider" },
    { id: "earth-no-peter", year: 1970, summary: "there is no peter. the spider is looking for someone. it has not yet found them.", spider: SPIDER_NORMAL, victim: "nobody (yet)", outcome: "a long, careful search", narrator: SPI, voice: "spider" },
    { id: "earth-huge", year: 1970, summary: "the spider is the size of a greyhound bus. the bite cannot be called a bite. no survivors.", spider: SPIDER_HUGE, victim: "midtown high, entire", outcome: "a crater, and a county-level news story", narrator: ME, voice: "coroner" },
    { id: "earth-dmv", year: 1974, summary: "the bite requires a permit. peter has the wrong form. he is sent to window 12.", spider: SPIDER_NORMAL, victim: "peter parker (denied)", outcome: "file re-submitted 1976, 1981, 1994, pending", narrator: DMV, voice: "clerk" },
  ];

  // ====================== voice grammars ======================
  const msg = {
    canon: (r) => pick(r, [
      "the boy is fifteen. the spider is hungry.",
      "fang enters skin. queens. tuesday, august 10.",
      "radioactivity confirmed. see trials log.",
      "the boy does not yet know. he will.",
      "a blue web, caught in the corner of the eye.",
      "great power, etc. the second half hasn't arrived.",
      "uncle ben is reading the paper.",
      "mary jane is putting on eyeshadow two blocks away.",
    ]),
    miles: (r) => pick(r, [
      "the spider on the subway was not gray. it was purple.",
      "tío aaron would have laughed.",
      "uncle aaron, today i think about you again.",
      "the leap of faith — i still have not.",
      "visions academy. physics. 2pm. i felt the hair on my arm.",
      "mami asked at dinner if i felt sick.",
    ]),
    sandwich: (r) => pick(r, [
      "rye. mayonnaise. a single slice of kosher ham.",
      "peter chews with the left side. he does every time.",
      "there is a small crumb on the linoleum.",
      "the spider is across town, furious and still moving.",
      "the refrigerator hums through the door.",
      "one hour post-sandwich: nothing.",
      "two hours post-sandwich: nothing.",
      "peter falls asleep watching dragnet.",
    ]),
    "terse-botanist": (r) => pick(r, [
      "t+0. bite confirmed. no envenomation.",
      "t+1d. serum clear. no anomaly.",
      "t+7d. specimen unremarkable.",
      "t+30d. reflex normal. no webbing.",
      "t+1y. vital signs within range.",
      "t+5y. patient employed. filing season.",
      "t+10y. patient married. no events.",
      "t+20y. patient owns a townhouse in yonkers.",
    ]),
    grandma: (r) => pick(r, [
      "i feel different today. quicker.",
      "i climbed the refrigerator to get down the good china.",
      "the boy hasn't noticed. good.",
      "i made spaghetti. the sauce was fine.",
      "i can smell the cat two buildings over.",
      "i will not waste this.",
      "the mailman feared me today. i did not mean it.",
    ]),
    coroner: (r) => pick(r, [
      "CASE 1962-Aug-10-A. specimen, arachnid, DOA.",
      "no external trauma. cause: probable aneurism.",
      "body released to estate.",
      "t.o.d.: 15:47:03. notable, given reports.",
      "filed under: anomalous.",
      "no next of kin.",
      "disposition: formalin. jar 7.",
    ]),
    theology: (r) => pick(r, [
      "and on the tenth day of the eighth month i descended.",
      "my prophet numbers eight, then seven, then one.",
      "my name is not pronounced. it is woven.",
      "great power is only a sentence.",
      "i bless. i am small.",
      "i do not forgive. i do not need to.",
      "the cult meets in a laundromat. this is acceptable.",
    ]),
    "tiny-human": (r) => pick(r, [
      "i am a man now. i do not know what that means.",
      "i filed my taxes incorrectly.",
      "i miss having eight eyes.",
      "meat is not web. this is troubling.",
      "why are you all so large.",
      "the boy is somewhere. i owe him an apology.",
    ]),
    patient: (r) => pick(r, [
      "still. the spider is thinking.",
      "fifty-four years. i file what i can.",
      "the fang has not descended.",
      "the boy is waiting. in this universe, the boy is also fifty-four.",
      "time does not pass here. it waits also.",
      "desk 37,412. no activity.",
    ]),
    legal: (r) => pick(r, [
      "OSBORN vs. PARKER: Motion to dismiss. Denied.",
      "Exhibit 8-A: the fang, cast in resin. Admitted.",
      "Discovery phase: 22 months.",
      "Subpoena issued: the spider. Unserved.",
      "Counsel moves for summary judgment.",
      "Hearing continued. Counsel late.",
      "Stipulation: the bite occurred. Remains: liability.",
    ]),
    nahuatl: (r) => pick(r, [
      "tōnacā cuēcuepzozī. eight-pointed weaving.",
      "tōcatl hangs on her thread. the world hangs from her.",
      "this is the day of one-rabbit. this is the day of the spider.",
      "she does not bite. she names.",
      "i named him also. he was not peter.",
      "the codex burned. what i write now is what remains.",
    ]),
    flat: (r) => pick(r, [
      "every spider in queens: bite. every human in queens: bit.",
      "the subway at 3:47pm: 14,000 bites.",
      "the bodega at the corner: 7 bites.",
      "nobody develops powers. it is a normal day.",
      "the dry cleaner is closed. unrelated.",
      "by 5pm the spiders have dispersed.",
      "evening news makes no mention.",
    ]),
    librarian: (r) => pick(r, [
      "shhhh.",
      "this is a quiet corner of the reading room.",
      "the boy has been bitten. he is trying to scream. i have pointed at the sign.",
      "the spider, to its credit, has complied.",
      "volume 7 of the encyclopedia is due back.",
      "we close at six.",
    ]),
    quiet: (r) => pick(r, [
      "the boy cannot speak.",
      "he webs at people who ask why.",
      "he writes notes. most are graceful.",
      "he is a better spider-man for it.",
      "at his funeral, no one speaks.",
    ]),
    watcher: (r) => pick(r, [
      "I have been watching this moment for sixty years.",
      "The fang is still descending. The air has thickened.",
      "I cannot intervene. I can only record.",
      "In another universe, this has long since resolved.",
      "The boy's left hand is still halfway to his backpack.",
    ]),
    unraveling: (r) => pick(r, [
      "branch. branch. branch. branch. branch.",
      "in every observation a new universe opens. i am observing.",
      "i stop observing. it does not help.",
      "i close my eyes. i can still feel them branching.",
      "the file is infinite. the desk is infinite. the margin is no wider.",
      "i resign. i re-hire myself. i resign.",
    ]),
    ghost: (r) => pick(r, [
      "with great power there comes — oh.",
      "may, i'm sorry about the paper i left on the couch.",
      "the boy. tell the boy. tell the boy what.",
      "i was holding the cat. he is unbitten. good.",
      "the ceiling is — i can see it from here.",
      "i have written a will. it is in the desk drawer. the middle one.",
    ]),
    director: (r) => pick(r, [
      "ACT I SCENE III — BITE. Bigger. More. Again.",
      "peter, you're not *feeling* it. from the top.",
      "the spider is a prop. the prop is perfect. you are not.",
      "CURTAIN. Lunch is thirty minutes. Do not leave the building.",
      "casting is considering recasting. don't tell him yet.",
      "closing night: we lost money. we lost hope. we struck the set.",
    ]),
    redacted: (r) => pick(r, [
      "[redacted] bitten by [redacted]. [redacted].",
      "[redacted], on [redacted], at [redacted].",
      "name not given. day not given. outcome not given.",
      "in compliance with the [redacted] act of [redacted].",
      "the file is sealed. i am the seal.",
    ]),
    clerk: (r) => pick(r, [
      "Form B-17 required. Please see Window 12.",
      "Window 12 is closed. Please see Window 7.",
      "Please take a number.",
      "Now serving B-402. You are B-411.",
      "Your form expired while you were waiting. Please begin again.",
    ]),
    spider: (r) => pick(r, [
      "i am small. i am patient.",
      "the boy will come. i will wait.",
      "today is not tuesday. i wait.",
      "i have been here a long time.",
      "i can see him. eight times.",
    ]),
  };

  // ====================== per-universe seeding ======================
  for (let ui = 0; ui < universes.length; ui++) {
    const U = universes[ui];
    const r = prng(hash(U.id));
    const folder = `universes/${U.id}`;
    const y = U.year;

    // --- 1. the spider appears ---
    await commit({
      path: `${folder}/the-spider.tree`,
      content:
`                          THE SPIDER
                         (${U.id})

${U.spider}

     this particular spider, in this particular universe.
     nothing about it is inevitable.
`,
      message: `${U.id}: a spider, in a vitrine, thinking.`,
      author: SPI,
      date: AUG(y, 15, 46, 30),
    });

    // --- 2. the place ---
    await commit({
      path: `${folder}/the-place.tree`,
      content:
`                          THE PLACE
                         (${U.id})

     midtown high, science hall, exhibit seven.
     the bell is about to ring.
     (unless it isn't. this varies.)

${tree("midtown high", [
  ["science hall", [
    ["exhibit seven", [
      "one spider, radioactive",
      "seventeen other specimens, nonradioactive",
      "a folding chair, fire code violation",
    ]],
    ["exhibit six", ["rocks", "also rocks"]],
    ["exhibit five", ["a diorama of the solar system, pluto included"]],
  ]],
  ["the hallway"],
  ["the gymnasium"],
])}

     summary: ${U.summary}
`,
      message: `${U.id}: the place is established. bell, pending.`,
      author: ARC,
      date: AUG(y, 15, 46, 45),
    });

    // --- 3. the bite sequence (many commits, rewriting one file) ---
    const bitePath = `${folder}/the-bite.tree`;
    const biteBefore =
`                           THE BITE
                          (${U.id})

                       (nothing yet.)
                       (a hum.)
                       (the clock clicks.)
`;
    await commit({ path: bitePath, content: biteBefore, message: `${U.id}: before. a hum.`, author: ARC, date: AUG(y, 15, 47, 0) });

    await commit({
      path: bitePath,
      content:
`                           THE BITE
                          (${U.id})

     the spider descends on one silken thread.

                    ·
                    ·
                    ·
                    ·
                    ·
${U.spider.split("\n").slice(0, 3).join("\n")}
`,
      message: `${U.id}: approach. the thread.`,
      author: SPI,
      date: AUG(y, 15, 47, 2),
    });

    await commit({
      path: bitePath,
      content:
`                           THE BITE
                          (${U.id})

${U.spider}

     victim: ${U.victim}
     temperature: 73°F
     observers: ${pick(r, ["0", "1 (asleep)", "the watcher only", "an infinite number"])}
`,
      message: `${U.id}: contact.`,
      author: pick(r, [SPI, ARC, WAT]),
      date: AUG(y, 15, 47, 4),
    });

    await commit({
      path: bitePath,
      content:
`                           THE BITE
                          (${U.id})

${U.spider}

${tree("the bite [" + U.id + "]", [
  ["victim: " + U.victim],
  ["time: 15:47:05 EST"],
  ["temperature: 73°F"],
  ["observers: 0"],
  ["outcome (pending): " + U.outcome],
])}
`,
      message: `${U.id}: impact. the fang enters the flesh.`,
      author: pick(r, [SPI, WAT, ARC]),
      date: AUG(y, 15, 47, 5),
    });

    for (let s = 6; s <= 30; s += pick(r, [2, 3, 4])) {
      const narrateFn = msg[U.voice] || msg.canon;
      await commit({
        path: bitePath,
        content:
`                           THE BITE
                          (${U.id})

${U.spider}

${tree("the bite [" + U.id + "]", [
  ["victim: " + U.victim],
  ["outcome: " + U.outcome],
  ["t+" + (s - 5) + "s",
    [
      narrateFn(r).replace(/\n/g, " ").slice(0, 72),
      pick(r, ["pulse: steady", "pulse: quickening", "pulse: absent", "pulse: ∞"]),
    ],
  ],
  ["cascade", [
    "first: " + pick(r, ["a shudder", "a sneeze", "a small laugh", "a whisper", "silence"]),
    "second: " + pick(r, ["the body ages four seconds", "the body forgets", "the body remembers", "the body does not notice"]),
    "third: " + pick(r, ["the day continues", "the day does not continue", "the day begins"]),
  ]],
])}
`,
        message: `${U.id}: t+${s - 5}s — ${(narrateFn(r)).split(".")[0].toLowerCase().slice(0, 66)}`,
        author: pick(r, [U.narrator, ARC, SPI, WAT]),
        date: AUG(y, 15, 47, s),
      });
    }

    // --- 4. the victim's own tree ---
    const victimPath = `${folder}/the-${U.id === "earth-aunt-may" ? "grandma" : "boy"}.tree`;
    await commit({
      path: victimPath,
      content:
`                       THE ${U.id === "earth-aunt-may" ? "GRANDMA" : "BOY"}
                         (${U.id})

${tree(U.victim, [
  ["lineage", [
    ["mother: mary parker" + (U.id === "earth-no-peter" ? " (does not exist)" : " (deceased)")],
    ["father: richard parker" + (U.id === "earth-no-peter" ? " (does not exist)" : " (deceased)")],
    ["uncle: benjamin" + (U.id === "earth-uncle-ben" ? " (bitten)" : " (†)" )],
    ["aunt: may"],
  ]],
  ["the day", [
    "woke at 06:15",
    "forgot to eat breakfast",
    "walked to school",
    "did not know what was coming",
  ]],
  ["the aftermath", [U.outcome]],
])}
`,
      message: `${U.id}: the victim, rooted. lineage and breakfast.`,
      author: U.narrator,
      date: AUG(y, 15, 47, 35),
    });

    // --- 5. one non-tree file per universe, shaped by its theme ---
    if (U.id === "earth-legal") {
      await commit({
        path: `${folder}/complaint-no-OSC-1962-0810.txt`,
        content:
`IN THE MATTER OF: OSBORN INDUSTRIES vs. PARKER
Case No.: OSC-1962-0810-A
Filed: August 10, 1970, 15:48 EST
Counsel for Plaintiff: Osborn Legal, LLP
Counsel for Defendant: Public defender (pending)

COMPLAINT.

1. On August 10, at approximately 15:47 EST, the Defendant,
   PETER B. PARKER, a minor, did come into contact with
   Specimen 7-A ("the spider"), the exclusive intellectual property
   of OSBORN INDUSTRIES (OSC).
2. Said contact resulted in the transfer of proprietary material,
   including but not limited to: radioactivity, arachnid DNA,
   and several confidential research findings.
3. Plaintiff seeks damages, an injunction against further
   wall-crawling, and the return of the spider's remains.

DAMAGES SOUGHT: $4,800,000
INJUNCTION: No wall-crawling within 500 ft of Osborn properties.
`,
        message: "earth-legal: complaint filed.",
        author: OSC,
        date: AUG(y, 15, 48, 0),
      });
    }

    if (U.id === "earth-ham-sandwich") {
      await commit({
        path: `${folder}/receipt.txt`,
        content:
`FOREST HILLS DELI
41-17 QUEENS BLVD · FOREST HILLS · NY
─────────────────────────────────────
Aug 10  15:51 EST

    1  HAM ON RYE         $0.45
       (mayonnaise, extra)
    1  COKE (small)       $0.10
                          ─────
                  TOTAL   $0.55

CASH: $1.00
CHANGE: $0.45

— THANK YOU COME AGAIN —
`,
        message: "earth-ham-sandwich: receipt, on rye, with mayo.",
        author: HAM,
        date: AUG(y, 15, 51, 0),
      });
    }

    if (U.id === "earth-spider-dies") {
      await commit({
        path: `${folder}/coroner-report-spider.txt`,
        content:
`NEW YORK COUNTY, OFFICE OF THE CHIEF MEDICAL EXAMINER
CASE: 1970-08-10-ARACHNID-A
Decedent: Unnamed spider, female, adult.
Examined by: Dr. Elena Vasquez, MD

Findings:
  External: No external trauma. Radiation burn, minor, left
    pedipalp (antemortem).
  Internal: Aneurysm, mid-dorsal vessel. Cause of death.
  Time of death: 15:47:03 EST. Noted, given reports.
  Chelicerae: clean. No transfer.
  Contents of ventriculus: one housefly (M. domestica),
    mostly digested; trace radionuclides consistent with
    Osborn Industries exhibits, sector 7.

Conclusion: DEATH BY NATURAL CAUSES, accelerated by
  acute radiological exposure. Not a bite event.

Signed: E. Vasquez, MD.
`,
        message: "earth-spider-dies: ME report filed. aneurysm, mid-dorsal.",
        author: ME,
        date: AUG(y, 16, 12, 0),
      });
    }

    if (U.id === "earth-uncle-ben") {
      await commit({
        path: `${folder}/last-will-and-testament.txt`,
        content:
`LAST WILL AND TESTAMENT OF BENJAMIN FRANKLIN PARKER
of Forest Hills, Queens, New York.

I, Benjamin Franklin Parker, being of sound mind,
write this in the thirty-seven seconds I suspect I have
left to me.

To my wife, May, I leave everything.
To the boy, Peter, I leave the following, in full:

    "With great power, there must also come—"

I am sorry I could not finish the sentence. I hope
the boy finishes it, even though he is not the one
who was bitten.

— Ben
  August 10, 15:47:42 EST
  at the kitchen table, pen running.
`,
        message: "earth-uncle-ben: will. the speech begins. the heart gives.",
        author: BEN,
        date: AUG(y, 15, 47, 42),
      });
    }

    if (U.id === "earth-rehearsal") {
      await commit({
        path: `${folder}/stage-notes-act-I.txt`,
        content:
`THE BITE — A PLAY IN THREE ACTS
Directed by Kowalski. Studio C.

ACT I · SCENE III · "THE EXHIBIT"
─────────────────────────────────

[PETER crosses DS. He wears the brown cardigan. He does not
know he wears the brown cardigan. This is the craft.]

PETER (feigning interest):  Wow! A radioactive spider!

[SPIDER — a prop on a thread — descends.]

[The bite.]

PETER:  ...ow.

DIRECTOR'S NOTE: No. No no no. It is not "ow." It is a
gasp that contains the next sixty years of American comics.
FROM THE TOP.
`,
        message: "earth-rehearsal: from the top. 'ow' is insufficient.",
        author: DIR,
        date: AUG(y, 16, 0, 0),
      });
    }

    if (U.id === "earth-nahuatl") {
      await commit({
        path: `${folder}/codex-fragment.txt`,
        content:
`CODEX FRAGMENT 7 (recovered, partial, cē tōchtli)

     tōcatl, she who weaves, descends.
     she names the one she bites.
     the one she bites is tōcatl also.
     in this way the thread is closed.

     the boy is not the boy.
     the boy does not exist.
     only the weaver, only the weaving,
     only the day of one-rabbit,
     only the eighth sun.

     (the rest burned, 1529,
      in the plaza at tlatelolco.
      ash is also a record.)
`,
        message: "earth-nahuatl: codex fragment 7, recovered, partial.",
        author: TOC,
        date: AUG(y, 16, 30, 0),
      });
    }

    if (U.id === "earth-mundane") {
      await commit({
        path: `${folder}/peter-tax-return-2007.txt`,
        content:
`FORM 1040 · PETER B. PARKER, CPA · TAX YEAR 2007

Filing status: Married filing jointly (spouse: Mary Jane Parker)
Dependents: 0
W-2 income: $112,400
Mortgage interest deduction: $14,221
Schedule A itemized: $27,990
Refund due: $1,241

Notes: nothing notable this year. Last year's amended return
processed. Expecting a calm 2008.

Signed: Peter B. Parker
        April 14, 2008
`,
        message: "earth-mundane: fiscal year 2007 complete. nothing notable.",
        author: CPA,
        date: AUG(y + 37, 17, 0, 0),
      });
    }

    if (U.id === "earth-machine") {
      await commit({
        path: `${folder}/device-manifest.json`,
        content:
`{
  "device": "SPIDER-DRONE-0810-1962",
  "firmware": "canon/v∞",
  "manufacturer": "Osborn Industries / Biosystems Division",
  "purpose": "vaccine trial delivery (Phase IV)",
  "trial_id": "OSC-VX-7A",
  "subject_id": "P-PARKER-15",
  "warranty": "void upon bite",
  "mtbf": "1 bite",
  "disposition": "recovered, pinned, storage locker 7",
  "nda_signed": true
}
`,
        message: "earth-machine: manifest logged.",
        author: NOR,
        date: AUG(y, 15, 47, 1),
      });
    }

    // --- 6. long aftermath: many commits, yearly, rewriting one file ---
    const aftermathPath = `${folder}/the-aftermath.tree`;
    const aftermathBase = (yrs, events) =>
`                         THE AFTERMATH
                          (${U.id})

${tree(U.outcome, [
  ["years since the bite: " + yrs,
    events
  ],
])}
`;
    const events = [];
    for (let d = 1; d <= 35; d++) {
      const event = pick(r, [
        `${d}y: the outcome holds.`,
        `${d}y: the outcome holds, mostly.`,
        `${d}y: a small shift. ${pick(r, ["rain", "a letter", "a knock at the door", "a phone call", "a dream"])}.`,
        `${d}y: one additional witness.`,
        `${d}y: one fewer witness.`,
        `${d}y: the weather is ${pick(r, ["fine", "unusual", "wrong", "perfect", "remembered"])}.`,
        `${d}y: the spider is gone.`,
        `${d}y: the spider is, perhaps, returned.`,
        `${d}y: nothing.`,
        `${d}y: everything.`,
        `${d}y: a quiet year.`,
        `${d}y: a loud year.`,
        `${d}y: ${U.victim.split(",")[0]} writes a letter. it is not sent.`,
      ]);
      events.push(event);
      const yCap = Math.min(2094, y + d);
      await commit({
        path: aftermathPath,
        content: aftermathBase(d, events.slice()),
        message: `${U.id}: +${d}y — ${event.replace(/^\d+y:\s*/, "").toLowerCase().slice(0, 60)}`,
        author: pick(r, [U.narrator, ARC]),
        date: AUG(yCap, 15 + Math.min(23 - 15, Math.floor(d / 5)), (47 + d) % 60, ri(r, 0, 60)),
      });
    }

    // --- 7. one journal entry per universe from the archivist ---
    await journalEntry(
      AUG(Math.min(2094, y + 40), 23, 59, ri(r, 0, 60)),
      ARC,
`[entry ${String(ui + 2).padStart(4, "0")}]  file: ${U.id}
${U.summary}

observations:
  · ${msg[U.voice] ? msg[U.voice](r) : "unremarkable."}
  · ${msg[U.voice] ? msg[U.voice](r) : "unremarkable."}
  · filing complete. placed in drawer ${ui + 1}.`);

    // --- 8. voice-spam: 6 extra commits narrated entirely in voice ---
    for (let k = 0; k < 6; k++) {
      const narrateFn = msg[U.voice] || msg.canon;
      const path = `${folder}/the-aftermath.tree`; // rewrite same file for voice weight
      const stampYear = Math.min(2094, y + 3 + k * 2);
      await commit({
        path: path,
        content: aftermathBase(3 + k * 2, events.concat([`[voice]: ${narrateFn(r)}`])),
        message: narrateFn(r).split(".")[0].toLowerCase().slice(0, 70),
        author: U.narrator,
        date: AUG(stampYear, ri(r, 0, 24), ri(r, 0, 60), ri(r, 0, 60)),
      });
    }
  }

  // ====================== the spider itself (meta-tree) ======================
  // Its eight eyes each narrate one vision, across 80 commits.
  for (let eIdx = 0; eIdx < EYES.length; eIdx++) {
    const e = EYES[eIdx];
    const r = prng(hash(e.name));
    const eyePath = `the-spider-itself/eight-eyes/eye-0${eIdx + 1}.tree`;
    for (let k = 0; k < 10; k++) {
      const vision = pick(r, [
        "a boy on a folding chair",
        "a girl with a notebook",
        "an old woman feeding a cat",
        "the radioactive hum of the exhibit",
        "three hundred fluorescent tubes",
        "the crack in the ceiling, slightly spreading",
        "peter, but older, and sad",
        "peter, but younger, and laughing",
        "no peter at all, a blank place",
        "the watcher watching me watching",
        "tōcatl across a loom, ten miles long",
        "a hundred other spiders, smaller than i am",
        "a courtroom",
        "a library. margaret voss points at a sign.",
        "a ham sandwich on a plate",
        "my own legs, curled",
        "a great wheel, turning",
        "a page, burning",
        "the word 'uncle'",
        "the word 'responsibility', incomplete",
      ]);
      const content =
`                        EYE ${String(eIdx + 1).padStart(2, "0")}
                       (${e.name.replace("eye: ", "")})

${tree("what i see", [
  ["now", [vision]],
  ["before", [pick(r, ["the dark of the vitrine", "a hand approaching", "my own prior vision", "nothing resolvable"])]],
  ["after", [pick(r, ["the hand", "the boy", "the dark", "the fang"])]],
])}
`;
      await commit({
        path: eyePath,
        content: content,
        message: `eye-${pad(eIdx + 1)}: ${vision.slice(0, 66)}`,
        author: e,
        date: AUG(1970 + eIdx * 2, 15, 47, k * 2),
      });
    }
  }

  // ====================== the spider-itself tree-file ======================
  await commit({
    path: "the-spider-itself/is-it-always-the-same-spider.tree",
    content:
`              IS IT ALWAYS THE SAME SPIDER
               (an internal bureau memo)

${tree("hypotheses", [
  ["H1: yes, it is always the same spider.",
    ["proponent: junior archivist rye",
     "evidence: apparent in the eyes",
     "objection: mortality; distance; physics"]],
  ["H2: no, a different spider each time.",
    ["proponent: desk 37,412 (me)",
     "evidence: the DNA varies; the size varies; the fang-pattern varies",
     "objection: then why always august 10"]],
  ["H3: there is no spider. the bite is a shape in the universe.",
    ["proponent: field office ∞, wing 3",
     "evidence: the file opens before the arachnid is sampled",
     "objection: this is philosophy, not arachnology"]],
  ["H4: it is always the same spider, but time is not linear.",
    ["proponent: uatu",
     "evidence: i have seen it descend twice simultaneously",
     "objection: uatu will not return my calls"]],
  ["H5: the spider is a god, and we are not.",
    ["proponent: earth-theological (non-binding)",
     "evidence: reverence",
     "objection: methodology"]],
])}

                           — the archivist,
                             desk 37,412.
`,
    message: "memo: is it always the same spider. five hypotheses. no conclusion.",
    author: ARC,
    date: AUG(1990, 23, 58, 0),
  });

  // ====================== failures / edge-universes (short sketches) ======================
  const failures = [
    ["earth-allergic", "peter is allergic to the bite. his lip swells. he takes benadryl and sleeps for twelve hours."],
    ["earth-polite", "the spider descends, hovers near peter's neck, and says 'i will not do this without your consent.' peter declines politely."],
    ["earth-orchestra", "the bite occurs during the strings section of shostakovich's 10th. no one notices. peter continues to play."],
    ["earth-in-transit", "the bite occurs on the 7 train between 46th and 33rd. by flushing meadows peter feels nothing."],
    ["earth-bureaucratic", "the bite is scheduled but peter is out sick. it is rescheduled for the following tuesday. the spider is irritated."],
    ["earth-cloaked", "the spider is invisible. peter is invisible. the bite is invisible. uatu is confused."],
    ["earth-dogs", "the spider lands on a dog. the dog does not notice. the dog becomes spider-dog, briefly, then eats the spider and is just a dog again."],
    ["earth-auction", "the spider is rare. it is auctioned for $4,400 before it can bite. it lives out its natural life in a glass case in beverly hills."],
    ["earth-mayfly", "the spider is a mayfly. it dies before reaching peter. the bite never begins."],
    ["earth-mute-peter", "peter cannot feel pain. the bite does nothing noticeable. he becomes spider-man without ever realizing."],
    ["earth-spanish", "peter replies in spanish: 'no, gracias.' the spider ascends its thread."],
    ["earth-thrown", "the spider misses. lands on a kid named ezekiel. ezekiel becomes spider-man. peter never knows."],
    ["earth-poem", "the bite occurs in a sonnet. all fourteen lines are spent on the approach. no time remains."],
  ];
  for (let fi = 0; fi < failures.length; fi++) {
    const [id, sum] = failures[fi];
    const r = prng(hash(id));
    const path = `failures/${id}.tree`;
    const y = 1970 + fi;
    await commit({
      path,
      content:
`                          ${id.toUpperCase()}

${tree(id, [
  ["summary", [sum]],
  ["disposition", [pick(r, ["filed under ANOMALOUS", "filed under MUNDANE", "filed under IRREGULAR", "filed under UNREPEATABLE"])]],
  ["archivist note", [pick(r, ["i liked this one.", "i did not understand this one.", "i filed this one twice, in error.", "i will re-read this in twenty years.", "i should not have cataloged this."])]],
])}
`,
      message: `${id}: ${sum.slice(0, 70).toLowerCase()}`,
      author: ARC,
      date: AUG(y, 23, 0, fi),
    });
    // and one short journal note each
    if (fi % 3 === 0) {
      await journalEntry(AUG(y, 23, 1, fi), ARC,
`[brief]  ${id}. ${sum}`);
    }
  }

  // ====================== the paused universe — 80 commits of nothing ======================
  // earth-paused: the fang is descending. each commit is a different year, same event, same zero-progress.
  const pausePath = "universes/earth-paused/the-fang-descending.tree";
  for (let d = 0; d < 80; d++) {
    const yr = 1970 + d;
    if (yr > 2094) break;
    await commit({
      path: pausePath,
      content:
`                     THE FANG, DESCENDING
                       (earth-paused)

                          still descending.
                          year ${yr}.
                          no progress observed.

${SPIDER_TINY}

     peter parker is still fifteen.
     the bell has not rung in fifty-${yr - 1962} years.
`,
      message: `earth-paused: still descending. year ${yr}.`,
      author: WAT,
      date: AUG(yr, 15, 47, 5),
    });
  }

  // ====================== the looping universe — same event, 80 iterations ======================
  // earth-still-waiting: the spider waits. one commit per year until 2094 or cap.
  const waitPath = "universes/earth-still-waiting/the-waiting.tree";
  for (let d = 0; d < 80; d++) {
    const yr = 1970 + d;
    if (yr > 2094) break;
    const spiderAge = yr - 1962;
    await commit({
      path: waitPath,
      content:
`                        THE WAITING
                     (earth-still-waiting)

                      year ${yr}.
                      spider's age: ${spiderAge}.
                      bite: not yet.

${SPIDER_TINY}

     the spider has been in exhibit seven longer than
     most of the building's employees have been employed.
     the exhibit's lighting has been upgraded twice.
     the spider has not changed.

     peter parker, also fifty-${spiderAge}, has not yet been bitten.
     he has become a teacher.
     he teaches middle school physics.
     he is good at it.
`,
      message: `earth-still-waiting: year ${yr}. spider is ${spiderAge}. no bite.`,
      author: SPI,
      date: AUG(yr, 15, 47, 5),
    });
  }

  // ====================== the quantum universe — branching cascade ======================
  // earth-quantum: every commit adds a branch to a growing tree of possibilities.
  const qPath = "universes/earth-quantum/every-possibility.tree";
  const qBase = ["the bite"];
  const qGrow = [];
  for (let d = 0; d < 100; d++) {
    const fork = pick(prng(hash("q" + d)), [
      "bitten; spider-man",
      "bitten; silent spider-man",
      "bitten; dies in six weeks",
      "bitten; retires at 22",
      "ducked; sandwich",
      "ducked; tax attorney",
      "ducked; army, 1965",
      "spider dies; nothing",
      "spider escapes; nothing",
      "spider bites uncle ben; speech; death",
      "spider bites aunt may; spider-grandma",
      "spider bites the principal; disgrace",
      "spider bites a dog; briefly, spider-dog",
      "spider bites a pigeon; loop",
      "spider bites itself; meta",
      "spider does not bite; watches peter leave",
      "peter already has powers, from before",
      "peter is in a coma the whole time",
      "peter is an actor in a play",
      "peter is an archivist",
    ]);
    qGrow.push(fork);
    const nested = [];
    for (let k = 0; k < qGrow.length; k++) {
      nested.push(`[${k + 1}] ${qGrow[k]}`);
    }
    const content =
`                    EVERY POSSIBILITY
                     (earth-quantum)

${tree("the bite", nested)}

     (${qGrow.length} observed branches. each one creates more.
      the archivist is not sleeping well.)
`;
    await commit({
      path: qPath,
      content,
      message: `quantum: branch ${qGrow.length} — ${fork}.`,
      author: ARC,
      date: AUG(Math.min(2094, 1982 + Math.floor(d / 2)), ri(prng(d + 1), 0, 24), ri(prng(d + 3), 0, 60), ri(prng(d + 5), 0, 60)),
    });
  }

  // ====================== final memo ======================
  await commit({
    path: "0-closing-memo.md",
    content:
`# CLOSING MEMO
# DESK 37,412 · FIELD OFFICE ∞

I have filed what I can.
The file is not closed. The file cannot be closed.
The event is still branching.

I have asked to be reassigned.
I have been told there is nowhere else to be assigned to.
I have accepted this.

In every universe, on August 10,
a spider descends, or does not,
a boy is bitten, or is not,
a world turns, or does not.

I am one of thirty-seven thousand archivists.
My desk is 37,412.
My drawer is full.

                             ─ the archivist,
                               August 10, one of these years.
`,
    message: "the file is not closed. the file cannot be closed.",
    author: ARC,
    date: AUG(2094, 23, 59, 59),
  });

  // README — filed the morning after, by junior archivist rye, with a
  // forwarding address. Sourced from src/README.md (bundled as text by
  // tsdown's default markdown loader).
  await commit({
    path: "README.md",
    content: readme,
    message: "README. filed for whoever inherits the drawer.",
    author: JUN,
    date: AUG(2095, 9, 0, 0),
  });

  await log("the bureau has cataloged what it could. in every universe, on august 10.");
}
