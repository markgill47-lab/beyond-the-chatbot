// Generates the deck QR code as a static SVG (public/qr-deck.svg) pointing at the
// live presentation. Ink-on-paper to match the Atlas palette while staying high
// contrast for reliable scanning. Re-run if the URL changes:
//   npm i -D qrcode && node scripts/generate-qr.mjs
import QRCode from 'qrcode'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'qr-deck.svg')
const URL = 'https://beyond-the-chatbot.onrender.com/#/title'

const svg = await QRCode.toString(URL, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 2,
  color: { dark: '#2e2920', light: '#efe7d3' }, // Atlas ink on aged paper
})
writeFileSync(OUT, svg)
console.log(`wrote ${OUT}\n  → ${URL}`)
