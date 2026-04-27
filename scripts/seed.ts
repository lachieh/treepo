// Submit a forest's bundled seed to the treepo API.
//
// Run from inside a forest package directory (where meta.json,
// access-code.age, and dist/seed.js all live):
//
//   node ../scripts/seed.ts dry-run    # POST /repo/<slug>/dry-run
//   node ../scripts/seed.ts seed       # POST /repo/<slug>/seed (deploys)
//
// Reads:
//   ./meta.json          { slug, viewUrl?, displayName? }
//   ./dist/seed.js       (run `pnpm build` first)
//   ./access-code.age    (decrypted via `age -d -i $AGE_IDENTITY`)
//
// Environment:
//   AGE_IDENTITY         identity file path (default: ~/.ssh/id_ed25519)
//   TREEPO_ACCESS_CODE   skip age and use this value instead

import { readFile, access } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import process from 'node:process'

const SCRIPT_CHAR_CAP = 40_000
const API_BASE = 'https://api.treepo.xyz'

type Command = 'dry-run' | 'seed'

interface ForestMeta {
  slug: string
  displayName?: string
  viewUrl?: string
}

interface SeedApiResponse {
  runId?: string
  branch?: string
  status?: string
  commitCount?: number
  dryRun?: boolean
  viewUrl?: string
  pushedToArtifacts?: boolean
  headOid?: string
  error?: string
  reason?: string
}

const command = process.argv[2] as Command | undefined
if (command !== 'dry-run' && command !== 'seed') {
  console.error('usage: node scripts/seed.ts <dry-run|seed>')
  process.exit(2)
}

const cwd = process.cwd()
const metaPath = resolve(cwd, 'meta.json')
const seedPath = resolve(cwd, 'dist/seed.js')
const accessAgePath = resolve(cwd, 'access-code.age')

const meta = JSON.parse(await readFile(metaPath, 'utf8')) as ForestMeta
if (!meta.slug) {
  console.error(`meta.json at ${metaPath} is missing "slug"`)
  process.exit(2)
}

try {
  await access(seedPath)
} catch {
  console.error(`No bundled seed at ${seedPath}.\n  Run \`pnpm build\` first.`)
  process.exit(2)
}
const script = await readFile(seedPath, 'utf8')

if (script.length > SCRIPT_CHAR_CAP) {
  const over = script.length - SCRIPT_CHAR_CAP
  console.error(`!! seed is ${script.length} chars; treepo caps at ${SCRIPT_CHAR_CAP} (${over} over).`)
  if (command === 'seed') {
    console.error('   refusing to deploy. trim source or tighten minify settings.')
    process.exit(2)
  }
  console.error('   sending anyway since this is a dry-run; the API will reject.')
}

const accessCode = await getAccessCode(accessAgePath)

const url = `${API_BASE}/repo/${meta.slug}/${command}`
const action = command === 'seed' ? 'DEPLOY' : 'DRY-RUN'
console.error(`${action} → ${url}`)
console.error(`  script: ${script.length} chars (${seedPath})`)
console.error(`  access: ${accessCode.slice(0, 6)}…${accessCode.slice(-2)} (${accessCode.length} chars)`)

const response = await fetch(url, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ script, accessCode }),
})

const bodyText = await response.text()
let body: SeedApiResponse | undefined
try {
  body = JSON.parse(bodyText) as SeedApiResponse
} catch {
  /* not JSON */
}

if (body) {
  console.log(JSON.stringify(body, null, 2))
} else {
  console.log(bodyText)
}

if (!response.ok) {
  console.error(`\n✗ HTTP ${response.status} ${response.statusText}`)
  process.exit(1)
}

if (body?.viewUrl) {
  console.error(`\n→ ${body.viewUrl}`)
}

async function getAccessCode(agePath: string): Promise<string> {
  const fromEnv = process.env['TREEPO_ACCESS_CODE']
  if (fromEnv) return fromEnv.trim()

  const home = process.env['HOME'] ?? ''
  const identity = process.env['AGE_IDENTITY'] ?? `${home}/.ssh/id_ed25519`

  return new Promise<string>((res, rej) => {
    const proc = spawn('age', ['-d', '-i', identity, agePath], {
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let out = ''
    let err = ''
    proc.stdout.on('data', (d: Buffer) => { out += d.toString() })
    proc.stderr.on('data', (d: Buffer) => { err += d.toString() })
    proc.on('close', (code) => {
      if (code === 0) res(out.trim())
      else rej(new Error(`age decrypt failed (exit ${code}): ${err.trim() || 'no stderr'}`))
    })
    proc.on('error', rej)
  }).catch((err: Error) => {
    console.error(`Could not decrypt access code: ${err.message}`)
    console.error('\nHints:')
    console.error('  • set AGE_IDENTITY to your SSH private key path')
    console.error('  • or pre-decrypt and set TREEPO_ACCESS_CODE')
    process.exit(2)
  }) as Promise<string>
}
