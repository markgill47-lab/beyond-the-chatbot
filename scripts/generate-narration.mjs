// Generates narration audio for every modal via the ElevenLabs text-to-speech API.
//
// Reads the spoken script from scripts/narration-manifest.mjs and the API key from
// scripts/secrets.json (or the ELEVENLABS_API_KEY env var), calls ElevenLabs's
// with-timestamps endpoint once per modal, and saves BOTH public/audio/<key>.mp3
// and public/audio/<key>.json (per-word start/end times grouped into paragraphs,
// for karaoke-style word highlighting). The key is used ONLY here — it never enters
// the React bundle or the deployed build; only the .mp3/.json files ship.
//
// Usage:
//   node scripts/generate-narration.mjs            # all modals
//   node scripts/generate-narration.mjs --only agent_llm
//   node scripts/generate-narration.mjs --limit 1  # first modal only (smoke test)
//   node scripts/generate-narration.mjs --list     # print manifest, no API calls

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { NARRATION } from './narration-manifest.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'audio')
const SECRETS = join(__dirname, 'secrets.json')

const MODEL_ID = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'
const VOICE_SETTINGS = { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true }

// ---- args ----
const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const limit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : null
const listOnly = args.includes('--list')

// ---- credentials ----
function loadConfig() {
  let key = process.env.ELEVENLABS_API_KEY || ''
  let voice = process.env.ELEVENLABS_VOICE_ID || ''
  if ((!key || !voice) && existsSync(SECRETS)) {
    const s = JSON.parse(readFileSync(SECRETS, 'utf8'))
    key = key || s.elevenlabs_api_key || ''
    voice = voice || s.elevenlabs_voice_id || ''
  }
  if (!key || key.includes('PASTE_YOUR')) {
    throw new Error('No ElevenLabs API key found. Put it in scripts/secrets.json (elevenlabs_api_key) or set ELEVENLABS_API_KEY.')
  }
  if (!voice) throw new Error('No voice id found (elevenlabs_voice_id in scripts/secrets.json).')
  return { key, voice }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const textOf = (entry) => entry.paragraphs.join('\n\n')
const round = (n) => Math.round(n * 1000) / 1000

async function synthesize({ key, voice }, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=${OUTPUT_FORMAT}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`ElevenLabs ${res.status}: ${detail.slice(0, 300)}`)
  }
  const json = await res.json()
  return { audio: Buffer.from(json.audio_base64, 'base64'), alignment: json.alignment }
}

// Turn ElevenLabs character timings into paragraphs of timed words.
// A "word" is a run of non-whitespace characters; a run of whitespace containing
// two or more newlines starts a new paragraph (matches the '\n\n' paragraph joins).
function buildParagraphs(alignment) {
  if (!alignment) return null
  const chars = alignment.characters || []
  const st = alignment.character_start_times_seconds || []
  const en = alignment.character_end_times_seconds || []
  const paragraphs = []
  let para = []
  let cur = null
  let nl = 0
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
      } else {
        cur.w += c
        cur.e = round(en[i])
      }
    }
  }
  if (cur) para.push(cur)
  if (para.length) paragraphs.push(para)
  return paragraphs
}

async function main() {
  let manifest = NARRATION
  if (only) manifest = manifest.filter((m) => m.key === only)
  if (limit) manifest = manifest.slice(0, limit)

  console.log(`Narration manifest: ${manifest.length} modal(s).`)
  if (listOnly) {
    for (const m of manifest) console.log(`  ${m.key}  (${textOf(m).length} chars)`)
    return
  }

  const cfg = loadConfig()
  console.log(`Voice: ${cfg.voice} · model: ${MODEL_ID}`)
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  let ok = 0
  for (let i = 0; i < manifest.length; i++) {
    const m = manifest[i]
    const text = textOf(m)
    process.stdout.write(`[${i + 1}/${manifest.length}] ${m.key} (${text.length} chars) ... `)
    try {
      const { audio, alignment } = await synthesize(cfg, text)
      writeFileSync(join(OUT_DIR, `${m.key}.mp3`), audio)
      const paragraphs = buildParagraphs(alignment)
      const words = paragraphs ? paragraphs.reduce((n, p) => n + p.length, 0) : 0
      writeFileSync(join(OUT_DIR, `${m.key}.json`), JSON.stringify({ paragraphs }))
      console.log(`saved ${(audio.length / 1024).toFixed(0)}KB + ${words} timed words`)
      ok++
    } catch (e) {
      console.log(`FAILED: ${e.message}`)
    }
    await sleep(350) // be gentle with rate limits
  }
  console.log(`\nDone. ${ok}/${manifest.length} narration files in public/audio/`)
}

main().catch((e) => { console.error('\nFATAL:', e.message); process.exit(1) })
