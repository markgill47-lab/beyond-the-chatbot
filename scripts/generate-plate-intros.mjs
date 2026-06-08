// Generates the per-plate intro narration (Self-Guided mode) via ElevenLabs.
// Reads scripts from src/data/plateIntros.js and writes public/audio/intro-<id>.mp3
// plus intro-<id>.json (per-word timings for the karaoke caption box). Same key /
// voice / config as scripts/generate-narration.mjs.
//
// Usage:
//   node scripts/generate-plate-intros.mjs            # all plates
//   node scripts/generate-plate-intros.mjs --only title
//   node scripts/generate-plate-intros.mjs --limit 1  # smoke test

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { PLATE_INTROS } from '../src/data/plateIntros.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'audio')
const SECRETS = join(__dirname, 'secrets.json')

const MODEL_ID = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'
const VOICE_SETTINGS = { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true }

const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const limit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : null

function loadConfig() {
  let key = process.env.ELEVENLABS_API_KEY || ''
  let voice = process.env.ELEVENLABS_VOICE_ID || ''
  if ((!key || !voice) && existsSync(SECRETS)) {
    const s = JSON.parse(readFileSync(SECRETS, 'utf8'))
    key = key || s.elevenlabs_api_key || ''
    voice = voice || s.elevenlabs_voice_id || ''
  }
  if (!key || key.includes('PASTE_YOUR')) throw new Error('No ElevenLabs API key in scripts/secrets.json or ELEVENLABS_API_KEY.')
  if (!voice) throw new Error('No voice id (elevenlabs_voice_id).')
  return { key, voice }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const round = (n) => Math.round(n * 1000) / 1000

async function synthesize({ key, voice }, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=${OUTPUT_FORMAT}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
  })
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`)
  const json = await res.json()
  return { audio: Buffer.from(json.audio_base64, 'base64'), alignment: json.alignment }
}

function buildParagraphs(alignment) {
  if (!alignment) return null
  const chars = alignment.characters || []
  const st = alignment.character_start_times_seconds || []
  const en = alignment.character_end_times_seconds || []
  const paragraphs = []
  let para = [], cur = null, nl = 0
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i]
    if (/\s/.test(c)) {
      if (cur) { para.push(cur); cur = null }
      if (c === '\n') nl++
    } else {
      if (cur === null) {
        if (nl >= 2 && para.length) { paragraphs.push(para); para = [] }
        nl = 0
        cur = { w: c, s: round(st[i]), e: round(en[i]) }
      } else { cur.w += c; cur.e = round(en[i]) }
    }
  }
  if (cur) para.push(cur)
  if (para.length) paragraphs.push(para)
  return paragraphs
}

async function main() {
  let entries = Object.entries(PLATE_INTROS)
  if (only) entries = entries.filter(([id]) => id === only)
  if (limit) entries = entries.slice(0, limit)

  const cfg = loadConfig()
  console.log(`Plate intros: ${entries.length} · voice ${cfg.voice} · model ${MODEL_ID}`)
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  let ok = 0
  for (let i = 0; i < entries.length; i++) {
    const [id, text] = entries[i]
    process.stdout.write(`[${i + 1}/${entries.length}] intro-${id} (${text.length} chars) ... `)
    try {
      const { audio, alignment } = await synthesize(cfg, text)
      writeFileSync(join(OUT_DIR, `intro-${id}.mp3`), audio)
      const paragraphs = buildParagraphs(alignment)
      const words = paragraphs ? paragraphs.reduce((n, p) => n + p.length, 0) : 0
      writeFileSync(join(OUT_DIR, `intro-${id}.json`), JSON.stringify({ paragraphs }))
      console.log(`saved ${(audio.length / 1024).toFixed(0)}KB + ${words} words`)
      ok++
    } catch (e) { console.log(`FAILED: ${e.message}`) }
    await sleep(350)
  }
  console.log(`\nDone. ${ok}/${entries.length} plate intros in public/audio/`)
}

main().catch((e) => { console.error('\nFATAL:', e.message); process.exit(1) })
