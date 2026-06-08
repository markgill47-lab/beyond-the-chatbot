import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const CX = 340, CY = 300, INNER_R = 116, OUTER_R = 236
const polar = (r, deg) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)]

const STAGES = [
  { id: 'intent', label: 'Intent', color: 'var(--accent-elev)', angle: -90 },
  { id: 'generate', label: 'Generate', color: 'var(--accent-water)', angle: 0 },
  { id: 'review', label: 'Review', color: 'var(--accent)', angle: 90 },
  { id: 'present', label: 'Present', color: 'var(--accent-forest)', angle: 180 },
]

const OUTPUTS = [
  { label: 'Documents', glyph: '▤' },
  { label: 'Video', glyph: '►' },
  { label: 'Imagery', glyph: '◳' },
  { label: 'Music', glyph: '♪' },
  { label: 'Software', glyph: '{ }' },
  { label: 'Presentations', glyph: '▭' },
  { label: 'Databases', glyph: '⊟' },
  { label: '3D Models', glyph: '⬡' },
  { label: 'Spreadsheets', glyph: '▦' },
]

const CONTENT = {
  human: {
    plno: 'Station ✶ · Centre', name: 'The Human at the Centre', tag: 'Judgment, creativity, initiative',
    color: 'var(--accent)', fig: { n: '00', file: 'engine_human.png' },
    body: [
      'Every output begins with a human decision. The engine doesn’t start itself. Someone has to define the intent — what are we making, why does it matter, and what does good look like.',
      'The human curates the knowledge that feeds the system. Selecting, organising, and validating the inputs is a skill that determines the quality of everything downstream.',
      'And at every stage of the cycle, human judgment is the checkpoint. The AI can generate, but only a human can decide whether the output serves the purpose.',
      'The engine amplifies human capability. It does not replace human responsibility.',
    ],
  },
  intent: {
    plno: 'Station I', name: 'Intent', tag: 'Define what you’re making and why',
    color: 'var(--accent-elev)', fig: { n: '01', file: 'engine_intent.png' },
    body: [
      'Intent is where creation begins. Before anything is generated, someone has to articulate what needs to exist. Not a prompt — a purpose. What problem does this solve? Who is it for?',
      'Clear intent is the single biggest predictor of output quality. A precise intent — with constraints, audience, format, and success criteria — gives the engine everything it needs to produce something useful on the first pass.',
      'This is where most people underinvest. The time spent defining intent is never wasted. It’s the highest-leverage moment in the entire cycle.',
    ],
  },
  generate: {
    plno: 'Station II', name: 'Generate', tag: 'Produce the first version',
    color: 'var(--accent-water)', fig: { n: '02', file: 'engine_generate.png' },
    body: [
      'Generation is the stage most people associate with AI. The system takes the defined intent and produces something: a draft, a design, a dataset, a piece of code, an image.',
      'In an agentic workflow, generation isn’t just a single response. The agent may plan the work, select tools, execute across steps, and assemble a complete first version autonomously.',
      'The key shift: generation is not the end. The first output is raw material, not a finished product. The value comes from what happens next.',
    ],
  },
  review: {
    plno: 'Station III', name: 'Review', tag: 'Evaluate against the original intent',
    color: 'var(--accent)', fig: { n: '03', file: 'engine_review.png' },
    body: [
      'Review is where human judgment re-enters the cycle. Does this output match the intent? Is it accurate? Does it serve the audience? These are questions only a human with domain knowledge can answer.',
      'The AI can assist — checking consistency, flagging issues, comparing against criteria. But the final judgment call requires contextual understanding that comes from experience, not computation.',
      'Each review produces specific, actionable feedback that feeds directly into the next generation pass. The output improves through informed iteration.',
    ],
  },
  present: {
    plno: 'Station IV', name: 'Present', tag: 'Deliver and gather feedback',
    color: 'var(--accent-forest)', fig: { n: '04', file: 'engine_present.png' },
    body: [
      'Presentation is the moment the work meets its audience — publishing a document, shipping software, presenting to stakeholders. The output leaves the cycle and enters the world.',
      'But presentation is not the end — it’s a feedback mechanism. The audience reaction, the real-world performance, the questions people ask all become input for the next cycle.',
      'This is what makes the engine recursive rather than linear. Every presentation generates new information that refines the next iteration.',
    ],
  },
}

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.6s ease ${d}s` })

export default function CreativeEngine({ phase }) {
  const { openModal } = useApp()
  const open = (id) => (e) => { e.stopPropagation(); openModal(CONTENT[id]) }

  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>The <em>Creative</em> Engine</>}
      sheet={<>Section II · In Practice<br /><b>Plate 05</b></>}
      corners={{ tl: 'AZIMUTH', tr: 'HUMAN AT CENTRE', bl: 'SHEET 05', br: 'click any station' }}
      legend={[
        { color: 'var(--accent)', label: 'Human · recursive cycle' },
        { color: 'var(--accent-water)', label: 'Generation' },
        { color: 'var(--accent-elev)', label: 'Intent / inputs' },
        { color: 'var(--ink-faint)', label: 'Output types' },
      ]}
    >
      <svg viewBox="0 0 680 600" style={{ width: '100%', maxWidth: 620, height: '100%', maxHeight: '62vh', overflow: 'visible' }}>
        {/* azimuth ring + ticks */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="var(--grat)" strokeWidth="1" />
        {Array.from({ length: 36 }).map((_, i) => {
          const [x1, y1] = polar(OUTER_R, i * 10), [x2, y2] = polar(OUTER_R - (i % 3 === 0 ? 9 : 5), i * 10)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--grat)" strokeWidth="1" />
        })}

        {/* inner cycle ring — dashes drift to suggest the recursive flow */}
        <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 7" opacity="0.45">
          <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* a comet orbiting the cycle, passing through each station */}
        <g>
          <circle cx={CX} cy={CY - INNER_R} r="9" fill="var(--accent)" opacity="0.16" />
          <circle cx={CX} cy={CY - INNER_R} r="4.5" fill="var(--accent)" />
          <animateTransform attributeName="transform" attributeType="XML" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="9s" repeatCount="indefinite" />
        </g>

        {/* connectors core → cycle */}
        {STAGES.map((s, i) => {
          const [x, y] = polar(INNER_R, s.angle)
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--neat)" strokeWidth="1" strokeDasharray="1 5" opacity="0.6" />
        })}

        {/* outputs (phase >= 1) — larger, bolder formats with glyphs, plus
            arrows that radiate from the core out to each format and back */}
        <g style={fade(phase >= 1)}>
          {OUTPUTS.map((o, i) => {
            const a = (i * 360) / OUTPUTS.length - 90
            const [x, y] = polar(OUTER_R, a)
            const [lx, ly] = polar(OUTER_R + 30, a)
            const anchor = lx < CX - 14 ? 'end' : lx > CX + 14 ? 'start' : 'middle'
            return (
              <g key={i}>
                <line x1={CX} y1={CY} x2={x} y2={y} stroke="var(--grat)" strokeWidth="0.6" strokeDasharray="1 6" />
                <circle cx={x} cy={y} r="19" fill="var(--surface)" stroke="var(--ink-soft)" strokeWidth="1.4" />
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize={o.glyph.length > 1 ? 12 : 18} fill="var(--ink)">{o.glyph}</text>
                <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" letterSpacing="0.04em" fill="var(--ink-soft)">{o.label}</text>
              </g>
            )
          })}

          {/* radiating + returning arrows along each spoke (staggered) */}
          {OUTPUTS.map((o, i) => {
            const a = (i * 360) / OUTPUTS.length - 90
            const [ox, oy] = polar(OUTER_R - 21, a)   // stop just shy of the node
            const [ix, iy] = polar(INNER_R + 4, a)
            const DUR = 3.4
            const begin = (i * DUR) / OUTPUTS.length
            return (
              <g key={'flow' + i}>
                {/* outbound: core → format */}
                <path d="M-3,-2.6 L4.2,0 L-3,2.6 Z" fill="var(--accent-water)">
                  <animateMotion path={`M${ix},${iy} L${ox},${oy}`} dur={`${DUR}s`} begin={`${begin}s`} repeatCount="indefinite" rotate="auto" />
                  <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.15;0.8;1" dur={`${DUR}s`} begin={`${begin}s`} repeatCount="indefinite" />
                </path>
                {/* inbound: format → core (feedback) */}
                <path d="M-3,-2.6 L4.2,0 L-3,2.6 Z" fill="var(--accent)">
                  <animateMotion path={`M${ox},${oy} L${ix},${iy}`} dur={`${DUR}s`} begin={`${begin + DUR / 2}s`} repeatCount="indefinite" rotate="auto" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.8;1" dur={`${DUR}s`} begin={`${begin + DUR / 2}s`} repeatCount="indefinite" />
                </path>
              </g>
            )
          })}
        </g>

        {/* cycle stations */}
        {STAGES.map((s, i) => {
          const [x, y] = polar(INNER_R, s.angle)
          return (
            <g key={i} className="node" onClick={open(s.id)} style={fade(phase >= 0, 0.1 * i)}>
              <circle className="marker" cx={x} cy={y} r="30" fill="var(--surface)" stroke={s.color} strokeWidth="1.6" />
              <circle className="pin" cx={x} cy={y} r="3" fill={s.color} />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" className="mlabel" fontSize="12" fill={s.color}>{s.label}</text>
            </g>
          )
        })}

        {/* human core */}
        <g className="node" onClick={open('human')} style={fade(phase >= 0)}>
          <circle className="marker" cx={CX} cy={CY} r="34" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <path d={`M${CX} ${CY - 16} l13 24 h-26 z`} fill="var(--accent)" opacity="0.85" />
          <text x={CX} y={CY + 30} textAnchor="middle" className="mtag" fill="var(--accent)">HUMAN ✶ STATION</text>
        </g>

        {phase >= 2 && (
          <text x={CX} y={CY + OUTER_R + 48} textAnchor="middle" className="mtag" style={fade(phase >= 2)}>
            judgment at the centre · outputs radiate, feedback returns
          </text>
        )}
      </svg>
    </SlidePlate>
  )
}
