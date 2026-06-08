import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

// Meta reserve plate: how this presentation was made — the cartography, the
// locally-generated imagery, the synthesized voice, and the build workflow
// (the same generative→agentic pattern the deck argues for). Text-only modals
// (no fig) narrated via audioKey.
const CARDS = [
  {
    id: 'design', glyph: '◳', name: 'The Cartography', color: 'var(--accent-elev)', audioKey: 'about_design',
    tag: 'An atlas, not a slide deck',
    body: [
      'Every plate in this deck is a map. The visual language is cartographic — neatlines, corner coordinates, graticules, legends — so a talk about software reads like a survey of unfamiliar territory.',
      'Two typefaces carry it: Fraunces, a high-contrast serif, for the display and body; and Space Mono for the labels and coordinates. Light mode is aged paper; dark mode is a night chart — both drawn from a single file of design tokens.',
      'Change one token and the whole atlas re-themes. Nothing about the look is hard-coded into any slide.',
    ],
  },
  {
    id: 'imagery', glyph: '▦', name: 'The Plates', color: 'var(--accent)', audioKey: 'about_imagery',
    tag: 'Printed on a local press',
    body: [
      'The photographic plates inside the modals aren’t stock images or a cloud service. They were generated locally, on a single graphics card, with ComfyUI driving the Flux 2 Klein model.',
      'Each description was written to match the atlas aesthetic — desaturated, matte, archival — then rendered four times at landscape resolution. The deck picks one of the four at random every time a modal opens, so no two runs look quite the same.',
      'It’s the agentic pattern in miniature: a written brief, handed to a tool, executed in batch — with the human choosing the medium and the mood.',
    ],
  },
  {
    id: 'voice', glyph: '♪', name: 'The Voice', color: 'var(--accent-water)', audioKey: 'about_voice',
    tag: 'Synthesized, and synced to the word',
    body: [
      'The voice you’ve been hearing is synthesized. The scripts were written the way I’d speak them, then turned into audio by ElevenLabs text-to-speech.',
      'The word-by-word highlighting isn’t guesswork. The same request returns character-level timestamps, grouped into words — so the caption follows the voice exactly, on every plate and in every modal.',
      'Write the script, generate the audio and its timing together, and the karaoke falls out for free.',
    ],
  },
  {
    id: 'build', glyph: '⬡', name: 'The Build', color: 'var(--accent-forest)', audioKey: 'about_build',
    tag: 'Built the way it argues you should',
    body: [
      'This presentation was built the way it tells you to build. It started as a conversation — a generative session to think through the structure, the metaphor, the content.',
      'Then the thinking was handed to an agent. Claude Code read the plan and constructed the thing: the Vite and React application, every plate, the navigation, the narration pipeline, the image-generation scripts.',
      'The human value was in the first half — the judgment, the voice, the decisions about what belongs. The leverage was in the second. The medium is the message.',
    ],
  },
]

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.5s ease ${d}s` })

export default function AboutThis({ phase }) {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — Reserve · Colophon</>}
      title={<>About <em>This</em></>}
      sheet={<>Reserve · How It Was Made<br /><b>Sheet R5</b></>}
      corners={{ tl: 'COLOPHON', tr: 'THE MAP OF THE MAP', bl: 'SHEET R5', br: 'click any panel' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
        <div className="cards" style={{ maxWidth: 900 }}>
          {CARDS.map((c, i) => (
            <div key={c.id} className="card" style={{ width: 196, ...fade(phase >= 0, 0.08 * i) }}
              onClick={(e) => { e.stopPropagation(); openModal({ ...c, plno: `Colophon · ${c.name}` }) }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neat)' }}>
              <div className="glyph" style={{ color: c.color }}>{c.glyph}</div>
              <div className="nm">{c.name}</div>
              <div className="tg">{c.tag}</div>
            </div>
          ))}
        </div>
        <p className="lede" style={fade(phase >= 0, 0.5)}>
          A conversation, then an agent. The same workflow it describes — all the way down.
        </p>
      </div>
    </SlidePlate>
  )
}
