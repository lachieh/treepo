/**
 * FNV-1a 32-bit hash. Stable, fast, no allocations. Useful as a deterministic
 * seed for {@link prng} so that the same input string always produces the
 * same pseudorandom stream.
 *
 * @example
 * ```ts
 * import { hash, prng, pick } from '@repo/utils'
 * const rng = prng(hash('prima-stellaria-1971'))
 * const colour = pick(['rust', 'moss', 'salt', 'iron'], rng)
 * ```
 */
export function hash(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return h >>> 0
}
