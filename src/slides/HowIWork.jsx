import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const SESSIONS = [
  {
    id: 'generative', glyph: '◎', name: 'Generative Session', color: 'var(--accent-water)', tagline: 'Think it through',
    sub: 'Brainstorm · plan · research · validate · document', fig: { n: '01', file: 'workflow_generative.png' },
    body: [
      'This is where the work actually begins. Not with a task, but with a conversation. I use generative chat the way most people use a whiteboard with a brilliant colleague who never gets tired.',
      'Brainstorming. I describe a rough idea and let the conversation pull it into shape — the AI pushes back, asks clarifying questions, suggests angles I hadn’t considered.',
      'Planning, research, validation. I test assumptions, ask for sources, challenge the reasoning. The AI doesn’t always get this right, which is why judgment matters.',
      'The output of a generative session isn’t code. It’s a knowledge base: documentation, requirements, specs, design decisions, and rationale. Everything an agent needs to execute without guessing.',
    ],
  },
  {
    id: 'agentic', glyph: '⬡', name: 'Agentic Session', color: 'var(--accent)', tagline: 'Build the thing',
    sub: 'Execute · create · test · verify · deliver', fig: { n: '02', file: 'workflow_agentic.png' },
    body: [
      'The agentic session starts where the generative session ends. The thinking is done. The plan exists. Now it’s time to execute.',
      'I hand the agent a spec, a knowledge base, or a set of requirements from the generative phase. It reads the material, plans its approach, and starts building. I watch it work.',
      'My role shifts from collaborator to director. I’m looking over the shoulder of a faster, more accurate builder. When it drifts, I redirect. When it gets stuck, I provide the missing context.',
      'This is the workflow that produced every plate in this presentation. The human value is in the first half. The leverage is in the second.',
    ],
  },
]

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.5s ease ${d}s` })

export default function HowIWork({ phase }) {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>How I <em>Actually</em> Work</>}
      sheet={<>Section III · The Human Layer<br /><b>Plate 10</b></>}
      corners={{ tl: 'ROUTE', tr: 'TWO WAYPOINTS', bl: 'SHEET 10', br: 'click either waypoint' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
          <div className="card" style={{ width: 250, ...fade(phase >= 0) }} onClick={(e) => { e.stopPropagation(); openModal(SESSIONS[0]) }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = SESSIONS[0].color }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neat)' }}>
            <div className="glyph" style={{ color: SESSIONS[0].color }}>{SESSIONS[0].glyph}</div>
            <div className="nm">{SESSIONS[0].name}</div>
            <div className="tg" style={{ color: SESSIONS[0].color, marginBottom: 8 }}>{SESSIONS[0].tagline}</div>
            <div className="tg">{SESSIONS[0].sub}</div>
          </div>

          <div className="waypoint-arrow" style={fade(phase >= 0, 0.25)}>
            <svg width="80" height="22" viewBox="0 0 80 22">
              <line x1="0" y1="11" x2="66" y2="11" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="66,5 80,11 66,17" fill="var(--accent)" />
            </svg>
            Spec + knowledge
          </div>

          <div className="card" style={{ width: 250, ...fade(phase >= 0, 0.15) }} onClick={(e) => { e.stopPropagation(); openModal(SESSIONS[1]) }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = SESSIONS[1].color }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neat)' }}>
            <div className="glyph" style={{ color: SESSIONS[1].color }}>{SESSIONS[1].glyph}</div>
            <div className="nm">{SESSIONS[1].name}</div>
            <div className="tg" style={{ color: SESSIONS[1].color, marginBottom: 8 }}>{SESSIONS[1].tagline}</div>
            <div className="tg">{SESSIONS[1].sub}</div>
          </div>
        </div>

        <p className="lede" style={fade(phase >= 0, 0.5)}>
          The human value is in the first half. The leverage is in the second.
        </p>
      </div>
    </SlidePlate>
  )
}
