// Batch-generates modal plate images via ComfyUI (Flux 2 Klein 9b).
//
// Drives the saved "Flux2_T2I_Lora" workflow over the HTTP API: for each modal
// described in docs/modal-image-descriptions.md it injects the prompt, a fresh
// random seed, and a per-modal filename prefix, runs one batch of 4, then
// downloads all 4 outputs into public/plates/<key>/01.png .. 04.png.
//
// Usage:
//   node scripts/generate-plates.mjs              # all modals
//   node scripts/generate-plates.mjs --only agent_llm
//   node scripts/generate-plates.mjs --limit 1    # first modal only (smoke test)
//   node scripts/generate-plates.mjs --list       # parse + print manifest, no generation

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const HOST = process.env.COMFY_HOST || 'http://127.0.0.1:8188'
const DESCRIPTIONS = join(ROOT, 'docs', 'modal-image-descriptions.md')
const OUT_ROOT = join(ROOT, 'public', 'plates')
const VARIANTS = 4
const STEPS = 20
// Landscape 1152×768 — the workflow originally had width/height reversed.
const WIDTH = 1152
const HEIGHT = 768

// ---- args ----
const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const limit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : null
const listOnly = args.includes('--list')

// ---- parse the descriptions doc into a manifest ----
// Each modal block looks like:
//   **Filename:** `agent_llm.png`
//   <blank>
//   <one-line prose prompt>
function parseManifest() {
  const md = readFileSync(DESCRIPTIONS, 'utf8')
  const re = /\*\*Filename:\*\*\s*`([^`]+)`\s*\n\s*\n([^\n]+)/g
  const out = []
  let m
  while ((m = re.exec(md))) {
    const key = m[1].replace(/\.png$/i, '')
    const prompt = m[2].trim()
    out.push({ key, prompt })
  }
  return out
}

// ---- build the ComfyUI API-format graph (LoRA loader bypassed: all LoRAs off) ----
function buildGraph(positive, seed, prefix) {
  return {
    '78': { class_type: 'ClipLoaderGGUF', inputs: { clip_name: 'flux2-klein-9b-uncensored-f16.gguf', type: 'flux2', device: 'default' } },
    '75:70': { class_type: 'UNETLoader', inputs: { unet_name: 'flux-2-klein-9b-fp8.safetensors', weight_dtype: 'default' } },
    '75:72': { class_type: 'VAELoader', inputs: { vae_name: 'flux2-vae.safetensors' } },
    '75:74': { class_type: 'CLIPTextEncode', inputs: { clip: ['78', 0], text: positive } },
    '75:67': { class_type: 'CLIPTextEncode', inputs: { clip: ['78', 0], text: '' } },
    '75:62': { class_type: 'Flux2Scheduler', inputs: { steps: STEPS, width: WIDTH, height: HEIGHT } },
    '75:66': { class_type: 'EmptyFlux2LatentImage', inputs: { width: WIDTH, height: HEIGHT, batch_size: VARIANTS } },
    '75:61': { class_type: 'KSamplerSelect', inputs: { sampler_name: 'euler' } },
    '75:73': { class_type: 'RandomNoise', inputs: { noise_seed: seed } },
    '75:63': { class_type: 'CFGGuider', inputs: { model: ['75:70', 0], positive: ['75:74', 0], negative: ['75:67', 0], cfg: 1 } },
    '75:64': { class_type: 'SamplerCustomAdvanced', inputs: { noise: ['75:73', 0], guider: ['75:63', 0], sampler: ['75:61', 0], sigmas: ['75:62', 0], latent_image: ['75:66', 0] } },
    '75:65': { class_type: 'VAEDecode', inputs: { samples: ['75:64', 0], vae: ['75:72', 0] } },
    '9': { class_type: 'SaveImage', inputs: { images: ['75:65', 0], filename_prefix: prefix } },
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const randSeed = () => Math.floor(Math.random() * 9_000_000_000_000_000) + 1

const clientId = 'btc-plate-gen-' + randSeed().toString(36)

async function queuePrompt(graph) {
  const res = await fetch(`${HOST}/prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: graph, client_id: clientId }),
  })
  if (!res.ok) throw new Error(`/prompt ${res.status}: ${await res.text()}`)
  const json = await res.json()
  if (json.node_errors && Object.keys(json.node_errors).length) {
    throw new Error('node_errors: ' + JSON.stringify(json.node_errors))
  }
  return json.prompt_id
}

async function waitForHistory(promptId, timeoutMs = 600_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${HOST}/history/${promptId}`)
    if (res.ok) {
      const hist = await res.json()
      const entry = hist[promptId]
      if (entry && entry.status && entry.status.completed) return entry
      if (entry && entry.outputs && Object.keys(entry.outputs).length) return entry
    }
    await sleep(2000)
  }
  throw new Error(`timed out waiting for ${promptId}`)
}

function collectImages(entry) {
  const imgs = []
  for (const nodeId of Object.keys(entry.outputs || {})) {
    for (const img of entry.outputs[nodeId].images || []) {
      if (img.type === 'output') imgs.push(img)
    }
  }
  return imgs
}

async function downloadImage(img) {
  const q = new URLSearchParams({ filename: img.filename, subfolder: img.subfolder || '', type: img.type })
  const res = await fetch(`${HOST}/view?${q}`)
  if (!res.ok) throw new Error(`/view ${res.status} for ${img.filename}`)
  return Buffer.from(await res.arrayBuffer())
}

async function generate(item) {
  const seed = randSeed()
  const prefix = `btc/${item.key}`
  const graph = buildGraph(item.prompt, seed, prefix)
  process.stdout.write(`  ${item.key}: queue (seed ${seed}) ... `)
  const promptId = await queuePrompt(graph)
  const entry = await waitForHistory(promptId)
  const imgs = collectImages(entry)
  if (imgs.length < VARIANTS) {
    console.log(`WARN only ${imgs.length} images returned`)
  }
  const dir = join(OUT_ROOT, item.key)
  mkdirSync(dir, { recursive: true })
  let n = 0
  for (const img of imgs.slice(0, VARIANTS)) {
    n++
    const buf = await downloadImage(img)
    writeFileSync(join(dir, String(n).padStart(2, '0') + '.png'), buf)
  }
  console.log(`saved ${n} → public/plates/${item.key}/`)
  return n
}

async function main() {
  let manifest = parseManifest()
  if (only) manifest = manifest.filter((m) => m.key === only)
  if (limit) manifest = manifest.slice(0, limit)

  console.log(`Manifest: ${manifest.length} modal(s). Host: ${HOST}`)
  if (listOnly) {
    for (const m of manifest) console.log(`  ${m.key}  —  ${m.prompt.slice(0, 70)}...`)
    return
  }
  if (!existsSync(OUT_ROOT)) mkdirSync(OUT_ROOT, { recursive: true })

  let total = 0
  for (let i = 0; i < manifest.length; i++) {
    console.log(`[${i + 1}/${manifest.length}]`)
    total += await generate(manifest[i])
  }
  console.log(`\nDone. ${total} images across ${manifest.length} modals.`)
}

main().catch((e) => { console.error('\nFAILED:', e.message); process.exit(1) })
