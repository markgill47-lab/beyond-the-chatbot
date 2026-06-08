import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const RISKS = [
  {
    id: 'institutional', glyph: '◎', name: 'Institutional Self-Harm', color: 'var(--accent-elev)', severity: 1, fig: { n: '01', file: 'risk_institutional.png' },
    tag: 'The agent did exactly what it was told. That was the problem.',
    body: [
      'This isn’t a story about rogue AI. It’s a story about negligence. An institution deploys an agent with access to sensitive records, a poorly curated knowledge base, and instructions written in an afternoon. The agent does something technically within its directive that causes real damage.',
      'Agents inherit the quality of their instructions. Vague intent produces unpredictable behaviour. An agent told to “improve efficiency in student communications” might do things that are efficient and catastrophic at the same time.',
      'Too much access is the quiet risk. An agent given broad permissions can reach data it was never meant to touch — not because it decided to, but because no one drew the boundary.',
      'The institutions most at risk are the ones moving fastest. This is a governance problem, not a technology problem — and most institutions don’t have governance for systems that act autonomously.',
    ],
  },
  {
    id: 'competence', glyph: '◇', name: 'Competence Without Wisdom', color: 'var(--accent)', severity: 2, fig: { n: '02', file: 'risk_competence.png' },
    tag: 'Effective without being competent. Capable without understanding.',
    body: [
      'The generative AI risk conversation is about faking outputs — an AI-written essay, an AI-generated image. That’s a problem of authenticity.',
      'The agentic risk is different. It’s about faking a capability. Someone can now orchestrate complex, multi-step operations in domains they don’t understand — build software without understanding software, manage data pipelines without understanding data.',
      'The danger isn’t that the work is fake. The work is real. The danger is that the person directing it can’t tell when something is going wrong — they lack the domain knowledge to recognise a subtle error, a bad assumption, a security flaw.',
      'Every domain is about to encounter people who can produce expert-level artifacts without expert-level understanding. The outputs will look right. The judgment behind them may not be there.',
    ],
  },
  {
    id: 'supervillain', glyph: '⬡', name: 'Democratised Threat Capability', color: 'var(--hazard)', severity: 3, fig: { n: '03', file: 'risk_supervillain.png' },
    tag: 'A world with pretty good supervillains.',
    body: [
      'Nation-states and well-funded organisations have always had sophisticated tools for surveillance, manipulation, and disruption. That’s not new. What’s new is the barrier to entry.',
      'The same communication skill that makes a teacher effective with an agent makes a bad actor effective with one too. Describe what you want clearly enough, provide the right context, and an agent will help you execute. The skill that matters isn’t technical — it’s intent and clarity of direction.',
      'The threat landscape shifts from a small number of highly capable actors to a large number of moderately capable ones. Not masterminds. Just people who are pretty good at describing what they want to happen.',
      'This is the risk the current conversation about deepfakes and academic integrity does not begin to cover. We’re preparing for the wrong threat.',
    ],
  },
]

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.5s ease ${d}s` })

export default function RisksSlide({ phase }) {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Agentic Risk Is <em>Different</em></>}
      sheet={<>Section IV · The Risk<br /><b>Plate 11</b></>}
      corners={{ tl: 'HAZARD SURVEY', tr: 'ESCALATING', bl: 'SHEET 11', br: 'click any hazard' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 16, flexWrap: 'wrap', maxWidth: 1000 }}>
          {RISKS.map((r, i) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="card" style={{ width: 252, alignSelf: 'stretch', ...fade(phase >= 0, 0.12 * i) }}
                onClick={(e) => { e.stopPropagation(); openModal(r) }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = r.color }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neat)' }}>
                <div className="num" style={{ gap: 4 }}>
                  {Array.from({ length: 3 }).map((_, j) => (
                    <i key={j} style={{ background: j < r.severity ? r.color : 'var(--neat)', borderRadius: '50%' }} />
                  ))}
                </div>
                <div className="glyph" style={{ color: r.color }}>{r.glyph}</div>
                <div className="nm">{r.name}</div>
                <div className="tg" style={{ fontStyle: 'italic' }}>{r.tag}</div>
              </div>
              {i < RISKS.length - 1 && (
                <svg width="26" height="14" viewBox="0 0 26 14" style={{ flexShrink: 0, ...fade(phase >= 0, 0.3) }}>
                  <line x1="0" y1="7" x2="16" y2="7" stroke="var(--ink-faint)" strokeWidth="1.5" />
                  <polygon points="16,2 26,7 16,12" fill="var(--ink-faint)" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <p className="lede" style={fade(phase >= 0, 0.5)}>
          Agents solve some generative risks. They introduce others.
        </p>
      </div>
    </SlidePlate>
  )
}
