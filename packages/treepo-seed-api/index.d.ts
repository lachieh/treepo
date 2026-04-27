// Ambient declarations for the treepo.xyz seed-script runtime.
//
// Treepo evaluates each seed script as an ES module in a V8 isolate (no
// network, no filesystem, no `import` beyond the standard runtime). The
// script must `export` an async `seed()` function. While `seed()` runs,
// the runtime injects four globals: `commit`, `readFile`, `listFiles`,
// `log` — all async.
//
// Reference this package from a seed by adding it to `compilerOptions.types`
// in tsconfig.json, or with a `/// <reference types="treepo-seed-api" />`
// directive at the top of the file.

export {};

declare global {
  /**
   * Author of a commit.
   *
   * - `string` form: just the name. Email defaults to a placeholder.
   * - `{ name, email? }` form: explicit. Email is a creative surface — use
   *   it for worldbuilding (e.g. `'rokafor@kew.gov.uk.1923'`).
   *
   * Anything else (object missing `name`, array, stringified JSON) throws
   * "malformed author" at commit time.
   */
  type TreepoAuthor = string | { name: string; email?: string };

  /**
   * When a commit "happened".
   *
   * Accepted forms:
   * - ISO 8601 string: `'2019-04-21T12:00:00Z'` (recommended)
   * - unix seconds: `1776813881`
   * - `Date` instance
   *
   * **Hard runtime constraint**: must resolve to a non-negative unix second,
   * roughly `1970-01-01T00:00:00Z` through ~year 2096. Pre-1970 dates,
   * negative timestamps, and far-future dates are rejected even though git
   * itself accepts them. Encode "1540" or "the Cretaceous" in the commit
   * **message**, **author**, or **content** — keep the actual git `date`
   * in-range.
   *
   * Prefer ISO string literals over `Date.UTC(...)` — `Date.UTC` has been
   * observed returning `NaN` in the sandbox even for in-range inputs.
   */
  type TreepoDate = string | number | Date;

  /** Argument shape for `commit()`. */
  interface TreepoCommitInput {
    /**
     * File path within the forest's git repo. Any structure is fine.
     * Files ending in `.tree` render as ASCII tree art in the viewer;
     * other files show as plain text.
     */
    path: string;
    /** UTF-8 file contents at this commit. */
    content: string;
    /** Git commit message. The viewer's scrubber surfaces this — treat it as narration. */
    message: string;
    /**
     * Optional author. Defaults to `seed-agent` if omitted (boring — invent
     * a character: a gardener, a ghost, a storm, an institution).
     */
    author?: TreepoAuthor;
    /**
     * Optional commit date. Defaults to wall-clock at run time (boring).
     * Must resolve to a unix second in the [1970, ~2096] window.
     */
    date?: TreepoDate;
  }

  /**
   * Write `content` to `path` and create a git commit with `message`.
   *
   * Throws on:
   * - malformed author (not string or `{ name, email? }`)
   * - unparseable / out-of-range / NaN date
   * - exceeding the 20,000-commit per-run cap (`SeedCapExceededError`)
   */
  function commit(input: TreepoCommitInput): Promise<void>;

  /** Return the current content of a file in the forest, or `null` if it doesn't exist. */
  function readFile(path: string): Promise<string | null>;

  /** Return all known file paths in the forest, optionally filtered by prefix. */
  function listFiles(prefix?: string): Promise<string[]>;

  /** Emit a visible message to viewers and the run's stream URL. Useful for progress or narration. */
  function log(message: string): Promise<void>;
}

/**
 * Shape of the `seed` export every script must provide.
 *
 * @example
 * ```ts
 * /// <reference types="treepo-seed-api" />
 *
 * export const seed: TreepoSeed = async () => {
 *   await commit({
 *     path: '1971/k-0001.tree',
 *     content: '...',
 *     message: 'planted.',
 *     author: { name: 'Dr. Ingrid Vohl' },
 *     date: '1971-03-14T08:00:00Z',
 *   });
 * };
 * ```
 */
export type TreepoSeed = () => Promise<void>;

/**
 * Hard runtime caps observed in the wild. Values are documentation only —
 * the runtime enforces them on the server side.
 */
export interface TreepoLimits {
  /** Maximum commits per real-run (20,000). */
  maxCommitsPerRun: 20_000;
  /** Maximum length of the seed script source in characters (40,000). */
  maxScriptChars: 40_000;
  /** Earliest valid commit date as ISO string (`'1970-01-01T00:00:00Z'`). */
  earliestDate: '1970-01-01T00:00:00Z';
  /** Latest valid commit date as ISO string (approximate; fails around year 2096). */
  latestDateApprox: '2096-01-01T00:00:00Z';
}
