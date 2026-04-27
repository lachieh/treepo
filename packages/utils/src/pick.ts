/**
 * Pick a uniformly-random element from `arr`, using `rng` as the source of
 * randomness. The array must be non-empty.
 *
 * The `rng`-first argument order keeps call sites compact when the caller
 * already has the rng and is reaching for short literal arrays:
 * `pick(rng, ['a', 'b', 'c'])` reads as "use this rng, pick from this list."
 *
 * @example
 * ```ts
 * import { hash, prng, pick } from '@repo/utils'
 * const rng = prng(hash('the-bite'))
 * const verb = pick(rng, ['descends', 'lands', 'arrives', 'is already there'])
 * ```
 */
export function pick<T>(rng: () => number, arr: readonly T[]): T {
  if (arr.length === 0) throw new Error('pick: empty array')
  return arr[Math.floor(rng() * arr.length)]!
}
