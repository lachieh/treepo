/**
 * Mulberry32 — a simple, fast, deterministic 32-bit PRNG. Good enough for
 * scattering specimens across a grid, picking phrases from a phrase bank,
 * driving L-systems, and similar generative work. Not cryptographic.
 *
 * Returns a function that yields uniformly-distributed floats in `[0, 1)`.
 *
 * Pair with {@link hash} to derive a seed from any string.
 *
 * @example
 * ```ts
 * import { hash, prng } from '@repo/utils'
 * const rng = prng(hash('chorus-bacillus-1988'))
 * rng() // 0.7314...
 * rng() // 0.1162...
 * ```
 */
export function prng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
