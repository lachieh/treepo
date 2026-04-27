// KOS Institute for Cellular Botany — an imagined 1970–1996 archive.
// Each "tree" is a specimen of Conway's Game of Life; each commit one
// observation, filed by the rotating staff of the institute.

export async function seed() {
  // ---- deterministic rng ----
  function fnv(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }
  function mulb(a) {
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (arr, r) => arr[Math.floor(r * arr.length) % arr.length];

  // ---- game of life ----
  function makeBoard(seedStr, w, h, density) {
    const r = mulb(fnv(seedStr));
    const b = [];
    for (let y = 0; y < h; y++) {
      const row = new Array(w);
      for (let x = 0; x < w; x++) row[x] = r() < density ? 1 : 0;
      b.push(row);
    }
    return b;
  }
  function step(b) {
    const H = b.length, W = b[0].length;
    const n = [];
    for (let y = 0; y < H; y++) {
      const row = new Array(W);
      for (let x = 0; x < W; x++) {
        let c = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < H && nx >= 0 && nx < W && b[ny][nx]) c++;
          }
        }
        const alive = b[y][x] === 1;
        row[x] = (alive && (c === 2 || c === 3)) || (!alive && c === 3) ? 1 : 0;
      }
      n.push(row);
    }
    return n;
  }
  function liveCount(b) {
    let n = 0;
    for (const r of b) for (const c of r) if (c) n++;
    return n;
  }

  // ---- staff ----
  const STAFF = {
    vohl:    { name: 'Dr. Ingrid Vohl',      email: 'vohl@kos-institute.cz.1971' },
    reznik:  { name: 'Tomáš Řezník',         email: 'trezn@kos-institute.cz.1973' },
    lemaire: { name: 'Henri Lemaire',        email: 'lemaire@kos-institute.cz.1978' },
    halden:  { name: 'Oskar Halden',         email: 'halden@kos-institute.cz.1982' },
    virt:    { name: 'Aino Virtanen',        email: 'virtanen@kos-institute.cz.1987' },
    anon:    { name: 'unsigned',             email: 'filed-anon@kos-institute.cz' },
  };

  // Each observer has their own grid glyphs — the same lattice looks
  // different in different hands.
  const SYMBOLS = {
    vohl:    ['█', '·'],
    reznik:  ['✦', '∙'],
    lemaire: ['■', '□'],
    halden:  ['#', '.'],
    virt:    ['*', ' '],
    anon:    ['?', '·'],
  };

  // ---- rendering ----
  function headerFor(spec, obs, gen, living, delta, rng) {
    const lines = [];
    lines.push(`kos institute for cellular botany   ·   observation`);
    lines.push(`specimen-no:  ${spec.id}`);
    lines.push(`binomial:     ${spec.binomial}`);
    lines.push(`observer:     ${STAFF[obs].name}`);
    lines.push(`generation:   ${gen}`);
    lines.push(`living-cells: ${living}`);
    lines.push(`delta:        ${delta >= 0 ? '+' : ''}${delta}`);
    if (obs === 'reznik') {
      lines.push(`mood:         ${pick(['rain','unsure','devotional','tired','watched','foggy','holy','bitter','weary','green'], rng())}`);
    } else if (obs === 'lemaire') {
      lines.push(`form:         ${pick(['oscillatory','static','migratory','fragmenting','coalescing','radiant','glidenic'], rng())}`);
    } else if (obs === 'halden') {
      lines.push(`note:         binomial contested (cf. K-0071 correspondence, 1982).`);
    } else if (obs === 'virt') {
      lines.push(`!!`);
    } else if (obs === 'anon') {
      lines.push(`provenance:   unknown. the dish was running when we opened the door.`);
    }
    if (spec.fate === 'extinct' && gen === spec.maxGen && living === 0) {
      lines.push(`status:       extinct. observation terminated per protocol K1 §4.`);
    }
    return lines.join('\n');
  }

  function renderBoard(b, header, obs) {
    const [alive, dead] = SYMBOLS[obs] || SYMBOLS.vohl;
    const body = b.map(r => r.map(c => c ? alive : dead).join(' ')).join('\n');
    return body + '\n' + '─'.repeat(60) + '\n' + header + '\n';
  }

  function plantMsg(obs, spec) {
    switch (obs) {
      case 'vohl':    return `planted. ${spec.id} ${spec.binomial}. dish K-${spec.id.slice(-2)}.`;
      case 'reznik':  return `planted ${spec.id}. a ${spec.binomial.toLowerCase()} begins.`;
      case 'lemaire': return `[fieldbook] ${spec.id} filed. gen 0 catalogued.`;
      case 'halden':  return `${spec.id} planted. binomial provisional — contested.`;
      case 'virt':    return `new one!! ${spec.id} is alive!`;
      case 'anon':    return `${spec.id} filed. no signature on the slip.`;
      default:        return `${spec.id} planted.`;
    }
  }

  // ---- commit message voices ----
  function voiceMsg(obs, gen, living, delta, rng) {
    if (obs === 'vohl') {
      return pick([
        `gen ${gen}. ${living} cells.`,
        `obs ${gen}: ${living} living, Δ=${delta>=0?'+':''}${delta}.`,
        `gen ${gen}. no anomaly.`,
        `${living} cells. protocol K1 unchanged.`,
        `gen ${gen} logged.`,
        `count: ${living}. continued monitoring.`,
        `gen ${gen}. ${living}. second count agrees.`,
      ], rng());
    }
    if (obs === 'reznik') {
      return pick([
        `gen ${gen} — the figure turns inward.`,
        `${living} lights. less than yesterday.`,
        `the pattern dreams itself again.`,
        `i have watched it ${gen} times. i am not sure who is the specimen.`,
        `something is missing this morning. i cannot say what.`,
        `if a pattern forgets itself, is that death?`,
        `${living} cells. i counted twice.`,
        `gen ${gen}. the cold has reached the dish.`,
        `a small change, but one i have been waiting for.`,
        `gen ${gen} — holding its breath.`,
        `${living} still. more than i thought would remain.`,
        `gen ${gen}. the room is quiet.`,
      ], rng());
    }
    if (obs === 'lemaire') {
      return `[fieldbook §${gen}] living=${living}, Δ=${delta>=0?'+':''}${delta}. form: ${pick(['oscillatory','static','migratory','fragmenting','coalescing','radiant'], rng())}.`;
    }
    if (obs === 'halden') {
      return pick([
        `gen ${gen}. ${living} cells. the binomial remains wrong.`,
        `obs ${gen}: ${living}. contra Řezník — this is not a "spirit".`,
        `gen ${gen}. ${living}. Dr. Vohl's method, applied correctly this time.`,
        `gen ${gen}. ${living} cells. cf. my 1983 note on boundary bias.`,
        `${living} cells at gen ${gen}. unremarkable. filed.`,
      ], rng());
    }
    if (obs === 'virt') {
      return pick([
        `gen ${gen}!! ${living} cells and still going`,
        `ok Dr. Lemaire said count carefully. ${living} at gen ${gen}.`,
        `is that a glider?? (gen ${gen})`,
        `gen ${gen}. ${living}. it made the same shape again i swear`,
        `gen ${gen} — first time i've seen this one settle`,
        `${living} cells at gen ${gen} :)`,
        `aaah gen ${gen}, three of them vanished at once`,
      ], rng());
    }
    return `gen ${gen}. ${living}.`;
  }

  // ---- specimens ----
  const specimens = [
    { id: 'K-0001', binomial: 'Prima stellaria',      seed: 'prima-stellaria-1971',    dir: '1971', observer: 'vohl',    w: 23, h: 13, density: 0.32, maxGen: 90,  intervalMs: 6  * 3600000, discovered: '1971-03-14T08:00:00Z' },
    { id: 'K-0002', binomial: 'Oscillans vulgaris',   seed: 'oscillans-vulgaris-K',    dir: '1971', observer: 'vohl',    w: 21, h: 11, density: 0.40, maxGen: 200, intervalMs: 3  * 3600000, discovered: '1971-04-22T10:30:00Z' },
    { id: 'K-0007', binomial: 'Glidensis migrans',    seed: 'glidensis-migrans-7',     dir: '1971', observer: 'vohl',    w: 27, h: 15, density: 0.28, maxGen: 120, intervalMs: 4  * 3600000, discovered: '1971-11-08T09:00:00Z' },
    { id: 'K-0014', binomial: 'Colonia fragmentaris', seed: 'colonia-fragmentaris-14', dir: '1972', observer: 'vohl',    w: 25, h: 15, density: 0.38, maxGen: 170, intervalMs: 2  * 3600000, discovered: '1972-06-01T07:00:00Z' },
    { id: 'K-0019', binomial: 'Rosa infinitum',       seed: 'rosa-infinitum-19',       dir: '1973', observer: 'reznik',  w: 23, h: 13, density: 0.35, maxGen: 220, intervalMs: 12 * 3600000, discovered: '1973-02-17T22:00:00Z' },
    { id: 'K-0023', binomial: 'Cellula pulchra',      seed: 'cellula-pulchra-23',      dir: '1973', observer: 'reznik',  w: 25, h: 13, density: 0.33, maxGen: 130, intervalMs: 8  * 3600000, discovered: '1973-09-04T18:45:00Z' },
    { id: 'K-0031', binomial: 'Ephemera brevis',      seed: 'ephemera-brevis-31',      dir: '1974', observer: 'vohl',    w: 19, h: 11, density: 0.20, maxGen: 45,  intervalMs: 1  * 3600000, discovered: '1974-04-02T11:00:00Z', fate: 'extinct' },
    { id: 'K-0037', binomial: 'Ambiguus halden',      seed: 'ambiguus-halden-37',      dir: '1974', observer: 'reznik',  w: 23, h: 13, density: 0.45, maxGen: 90,  intervalMs: 18 * 3600000, discovered: '1974-12-18T14:00:00Z' },
    { id: 'K-0044', binomial: 'Nocturnus flickeris',  seed: 'nocturnus-flickeris-44',  dir: '1976', observer: 'reznik',  w: 27, h: 15, density: 0.30, maxGen: 240, intervalMs: 24 * 3600000, discovered: '1976-05-30T23:00:00Z' },
    { id: 'K-0052', binomial: 'Lemaire constans',     seed: 'lemaire-constans-52',     dir: '1978', observer: 'lemaire', w: 25, h: 15, density: 0.34, maxGen: 180, intervalMs: 6  * 3600000, discovered: '1978-01-14T06:00:00Z' },
    { id: 'K-0058', binomial: 'Triangulum aequum',    seed: 'triangulum-aequum-58',    dir: '1979', observer: 'lemaire', w: 21, h: 11, density: 0.38, maxGen: 110, intervalMs: 4  * 3600000, discovered: '1979-08-12T15:00:00Z' },
    { id: 'K-0066', binomial: 'Cor fractum',          seed: 'cor-fractum-66',          dir: '1981', observer: 'lemaire', w: 23, h: 13, density: 0.30, maxGen: 150, intervalMs: 7  * 3600000, discovered: '1981-11-11T11:11:00Z' },
    { id: 'K-0071', binomial: 'Spiritus sanctus',     seed: 'spiritus-sanctus-71',     dir: '1982', observer: 'halden',  w: 25, h: 13, density: 0.36, maxGen: 140, intervalMs: 9  * 3600000, discovered: '1982-04-04T04:04:00Z' },
    { id: 'K-0078', binomial: 'Ruinae tardus',        seed: 'ruinae-tardus-78',        dir: '1984', observer: 'halden',  w: 29, h: 17, density: 0.27, maxGen: 180, intervalMs: 12 * 3600000, discovered: '1984-09-23T20:00:00Z' },
    { id: 'K-0084', binomial: 'Last-light',           seed: 'last-light-84',           dir: '1985', observer: 'reznik',  w: 19, h: 11, density: 0.22, maxGen: 60,  intervalMs: 30 * 60000,   discovered: '1985-12-21T16:00:00Z', fate: 'brief' },
    { id: 'K-0089', binomial: 'Virtanen primum',      seed: 'virtanen-primum-89',      dir: '1987', observer: 'virt',    w: 23, h: 13, density: 0.33, maxGen: 170, intervalMs: 3  * 3600000, discovered: '1987-10-01T09:00:00Z' },
    { id: 'K-0091', binomial: 'Chorus bacillus',      seed: 'chorus-bacillus-91',      dir: '1988', observer: 'virt',    w: 27, h: 15, density: 0.32, maxGen: 230, intervalMs: 5  * 3600000, discovered: '1988-03-14T14:00:00Z' },
    { id: 'K-0095', binomial: 'Infinitus minimus',    seed: 'infinitus-minimus-95',    dir: '1989', observer: 'virt',    w: 21, h: 13, density: 0.28, maxGen: 120, intervalMs: 6  * 3600000, discovered: '1989-06-06T06:00:00Z' },
    { id: 'K-0101', binomial: 'Vohl memoriam',        seed: 'vohl-memoriam-101',       dir: '1991', observer: 'reznik',  w: 25, h: 15, density: 0.31, maxGen: 100, intervalMs: 24 * 3600000, discovered: '1991-02-28T00:00:00Z' },
    { id: 'K-0109', binomial: 'Chorus minimus',       seed: 'chorus-minimus-109',      dir: '1995', observer: 'virt',    w: 29, h: 17, density: 0.29, maxGen: 260, intervalMs: 8  * 3600000, discovered: '1995-07-17T12:00:00Z' },
    { id: 'K-0112', binomial: 'Phoenix',              seed: 'phoenix-112-anon',        dir: '1996', observer: 'anon',    w: 23, h: 13, density: 0.40, maxGen: 70,  intervalMs: 1  * 3600000, discovered: '1996-04-01T00:00:00Z', fate: 'unsigned' },
  ];

  // ---- build timeline ----
  const events = [];

  // Founding charter
  events.push({
    t: Date.parse('1970-01-02T10:00:00Z'),
    fn: () => commit({
      path: 'founding/charter-1969.md',
      content:
'KOS INSTITUTE FOR CELLULAR BOTANY\n' +
'Filed 2 January 1970, concerning events of 4 October 1969.\n' +
'\n' +
'We hold that the living form — be it vascular, mycelial, or, as observed\n' +
'in the preceding autumn upon a lattice of conditionally-surviving cells —\n' +
'is a legitimate subject of botanical study.\n' +
'\n' +
'Specimens shall be assigned catalogue prefix K- and observed across all\n' +
'generations until stabilisation, extinction, or institutional closure.\n' +
'\n' +
'  — I. Vohl\n' +
'    O. Mráček (d. 1970)\n' +
'    A. Skřivan\n',
      message: 'charter. the lattice is alive enough.',
      author: STAFF.vohl,
      date: '1970-01-02T10:00:00Z',
    }),
  });

  // Archival letters, memos, notes
  const archival = [
    { t: '1974-05-02T15:00:00Z', path: 'notices/1974-05-02-extinction-K-0031.memo', author: STAFF.vohl,
      message: 'extinction noted. specimen K-0031.',
      content: 'NOTICE OF EXTINCTION — K-0031 ("Ephemera brevis")\n\n' +
'Filed 2 May 1974 by I. Vohl.\n\n' +
'The specimen reached gen 45 at 08:00 this morning, at which hour no\n' +
'living cell remained. Observation terminated per protocol K1 §4.\n\n' +
'Cause: low starting density. Catalogue retained.\n' },
    { t: '1975-03-01T09:00:00Z', path: 'method/1975-03-01-protocol-K1-revised.md', author: STAFF.vohl,
      message: 'protocol K1 revised. Mráček\'s original equations preserved.',
      content: 'PROTOCOL K1 (rev. 1975)\n\n' +
'The lattice shall be of finite extent. Edge cells observe no neighbour\n' +
'beyond the frame. Living cells persist iff neighbour count ∈ {2, 3}.\n' +
'Dead cells become living iff neighbour count = 3.\n\n' +
'Initial configurations are derived from the binomial according to the\n' +
'method of Mráček (1968, unpublished). No further details are recorded\n' +
'here, by his request, as filed in envelope K-1968-Mracek.\n\n' +
'  — I. Vohl, 1 March 1975\n' },
    { t: '1978-01-10T11:00:00Z', path: 'correspondence/1978-01-10-lemaire-hired.letter', author: STAFF.vohl,
      message: 'lemaire will begin Monday. he is careful.',
      content: 'Brno, 10 January 1978\n\nDear M. Lemaire,\n\n' +
'It is with some pleasure that I confirm your appointment, beginning Monday\n' +
'next, as Junior Observer. Dr. Řezník will orient you to the catalogue. Do\n' +
'not be troubled by his manner — he means it kindly. Protocol K1 is\n' +
'enclosed.\n\n' +
'Count twice. Write everything down. The lattice does not forgive a\n' +
'careless hand.\n\n' +
'  Cordially,\n' +
'    I. Vohl\n' },
    { t: '1982-04-10T17:00:00Z', path: 'correspondence/1982-04-10-halden-vs-reznik.letter', author: STAFF.halden,
      message: 'formal objection re: binomial of K-0071.',
      content: 'Brno, 10 April 1982\n\nDr. Řezník,\n\n' +
'I write to register my objection — not informally, but for the record —\n' +
'to the name you have given specimen K-0071. "Spiritus sanctus" is a\n' +
'statement of faith, not taxonomy. We are not in a church. We are in a\n' +
'laboratory.\n\n' +
'I will continue to observe it. I will not call it that.\n\n' +
'  Regards,\n' +
'    O. Halden\n' },
    { t: '1983-07-12T10:00:00Z', path: 'method/1983-07-12-boundary-bias.note', author: STAFF.halden,
      message: 'boundary bias — short note.',
      content: 'BOUNDARY BIAS IN FINITE-FRAME LATTICE OBSERVATION\n\n' +
'O. Halden, 12 July 1983. Internal note, KOS.\n\n' +
'Cells at the frame edge observe at most 5 neighbours, never 8. This skews\n' +
'the survival statistic of any specimen whose initial mass clusters near\n' +
'the wall. Recommendation: report "interior living-cell count" alongside\n' +
'total living, for all specimens w ≥ 21 cells wide.\n\n' +
'Not adopted. — I.V.\n' },
    { t: '1985-12-22T08:30:00Z', path: 'correspondence/1985-12-22-reznik-on-last-light.letter', author: STAFF.reznik,
      message: 'notes on K-0084 — informally.',
      content: 'Brno, 22 December 1985\n\n' +
'Ingrid —\n\n' +
'I sat with it from sixteen-hundred yesterday until just before dawn.\n' +
'It lived for fifty-five half-hours and then it did not. That is all I\n' +
'can write down. The dish is cold now. I have called it "Last-light"\n' +
'in the catalogue, though you will say that is not a name.\n\n' +
'  — T.\n' },
    { t: '1987-09-30T13:00:00Z', path: 'correspondence/1987-09-30-virtanen-hired.letter', author: STAFF.lemaire,
      message: 'virtanen begins tomorrow. she is fast.',
      content: 'Brno, 30 September 1987\n\nDr. Vohl,\n\n' +
'A. Virtanen has accepted the junior post. She is fast with the counting\n' +
'grid and her handwriting is clean. She does use exclamation marks. We\n' +
'will see how the catalogue tolerates that.\n\n' +
'  — H. Lemaire\n' },
    { t: '1990-11-04T12:00:00Z', path: 'notices/1990-11-04-vohl-obituary.memo', author: STAFF.reznik,
      message: 'ingrid is gone. filed accordingly.',
      content: 'NOTICE — I. VOHL, 1929–1990\n\n' +
'Filed 4 November 1990 by T. Řezník.\n\n' +
'Dr. Ingrid Vohl, founder of this institute, died on the second of\n' +
'November at her home. She had been ill since the spring and insisted\n' +
'upon continuing to observe K-0101 until the final week.\n\n' +
'The specimen is renamed, at her request, "Vohl memoriam." Observations\n' +
'will resume in the new year, daily, by me.\n\n' +
'She asked that the lattice not be turned off.\n' },
    { t: '1991-03-01T09:00:00Z', path: 'correspondence/1991-03-01-reznik-memorial.letter', author: STAFF.reznik,
      message: 'for ingrid, who counted twice.',
      content: 'Brno, 1 March 1991\n\n' +
'She used to say: count twice, write everything down, the lattice does\n' +
'not forgive a careless hand.\n\n' +
'I write this down.\n\n' +
'  — T.\n' },
    { t: '1996-05-15T10:00:00Z', path: 'notices/1996-05-15-institute-closing.memo', author: STAFF.lemaire,
      message: 'institute to close 1 August. funding withdrawn.',
      content: 'NOTICE OF CLOSURE — KOS INSTITUTE FOR CELLULAR BOTANY\n\n' +
'Filed 15 May 1996 by H. Lemaire, acting director.\n\n' +
'Funding has been withdrawn from the Ministry, effective 1 August next.\n' +
'All active observations will be terminated in good order. The catalogue,\n' +
'including all observation series K-0001 through K-0112, will be sealed\n' +
'and deposited with the Brno University archive.\n\n' +
'No further specimens will be admitted.\n' },
    { t: '1996-06-01T17:00:00Z', path: 'notices/1996-06-01-archive-sealed.memo', author: STAFF.anon,
      message: 'archive sealed. the lattice is dark now.',
      content: 'The archive was sealed this afternoon. The dishes are dark.\n\n' +
'Someone has left K-0112 running, filed without signature, dated to the\n' +
'first of April. No one admits to having planted it. We have not\n' +
'terminated it.\n\n' +
'  — (unsigned)\n' },
  ];

  for (const a of archival) {
    events.push({
      t: Date.parse(a.t),
      fn: () => commit({
        path: a.path,
        content: a.content,
        message: a.message,
        author: a.author,
        date: a.t,
      }),
    });
  }

  // Specimens — generate all generations, push one event per gen
  for (const spec of specimens) {
    const rng = mulb(fnv('msg-' + spec.id));
    let board = makeBoard(spec.seed, spec.w, spec.h, spec.density);
    const slug = spec.binomial.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
    const path = `${spec.dir}/${spec.id}-${slug}.tree`;
    const t0 = Date.parse(spec.discovered);

    // gen 0
    {
      const living = liveCount(board);
      const header = headerFor(spec, spec.observer, 0, living, 0, rng);
      const content = renderBoard(board, header, spec.observer);
      const msg = plantMsg(spec.observer, spec);
      events.push({
        t: t0,
        fn: () => commit({
          path, content, message: msg,
          author: STAFF[spec.observer],
          date: new Date(t0).toISOString(),
        }),
      });
    }

    let prev = liveCount(board);
    for (let g = 1; g <= spec.maxGen; g++) {
      board = step(board);
      const living = liveCount(board);
      const delta = living - prev;
      prev = living;
      const header = headerFor(spec, spec.observer, g, living, delta, rng);
      const content = renderBoard(board, header, spec.observer);
      const t = t0 + g * spec.intervalMs;
      const msg = voiceMsg(spec.observer, g, living, delta, rng);
      const obs = spec.observer;
      events.push({
        t,
        fn: () => commit({
          path, content, message: msg,
          author: STAFF[obs],
          date: new Date(t).toISOString(),
        }),
      });
    }
  }

  // Sort by timestamp and fire
  events.sort((a, b) => a.t - b.t);
  await log(`KOS archive opening. ${events.length} entries queued, 1970–1996.`);
  for (const e of events) {
    await e.fn();
  }
  await log(`the archive is sealed. the lattice is dark now.`);
}
