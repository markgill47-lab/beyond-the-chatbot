import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const SKILLS = [
  {
    id: 'critical', glyph: '◎', name: 'Critical Thinking', color: 'var(--accent)', fig: { n: '01', file: 'skill_critical-thinking.png' },
    tag: 'The right question matters more than the right syntax',
    body: [
      'An agent can generate a hundred answers. Only a critical thinker knows which question to ask in the first place.',
      'This means evaluating whether the problem has been framed correctly before any work begins. It means recognising when an agent is confidently solving the wrong problem, and knowing when to stop and rethink the approach entirely.',
      'Critical thinking was always the most important skill in any profession. Agentic AI just made it impossible to fake.',
    ],
  },
  {
    id: 'judgment', glyph: '◇', name: 'Judgment', color: 'var(--accent-water)', fig: { n: '02', file: 'skill_judgment.png' },
    tag: 'Knowing whether the output is good, not just whether it ran',
    body: [
      'An agent can produce work that is technically correct and completely wrong for the situation. Judgment is the ability to tell the difference.',
      'This is domain-specific and earned through experience. A financial analyst knows when a model’s assumptions are unrealistic. A teacher knows when a lesson plan looks polished but won’t survive contact with actual students.',
      'Judgment can’t be prompted. It comes from years of knowing what good looks like.',
    ],
  },
  {
    id: 'creativity', glyph: '✦', name: 'Creativity', color: 'var(--accent-elev)', fig: { n: '03', file: 'skill_creativity.png' },
    tag: 'Seeing possibilities the agent can’t imagine on its own',
    body: [
      'Agents are powerful executors, but they don’t wake up with ideas. They don’t see a connection between two unrelated projects, or feel the itch to try something no one has tried.',
      'Creativity in agentic work means imagining what could exist and then directing an agent to help build it. The agent handles the mechanics. You supply the vision.',
      'The most valuable skill isn’t knowing how to do the work. It’s knowing what work is worth doing.',
    ],
  },
  {
    id: 'experience', glyph: '◈', name: 'Experience', color: 'var(--accent-forest)', fig: { n: '04', file: 'skill_experience.png' },
    tag: 'Knowing what matters in your field and where the stakes are',
    body: [
      'Every domain has knowledge that doesn’t appear in any manual — the unwritten rules, the political dynamics, the things that technically should work but never do.',
      'An experienced professional brings pattern recognition no model has been trained on. They know which corner cases cause problems, and when a 90% solution is good enough versus when the last 10% is everything.',
      'Experience is why a twenty-year teacher using AI for the first time can outperform a computer-science graduate who has never stood in front of a classroom.',
    ],
  },
  {
    id: 'communication', glyph: '⟡', name: 'Communication', color: 'var(--accent)', fig: { n: '05', file: 'skill_communication.png' },
    tag: 'It doesn’t start with a prompt. It starts with a conversation.',
    body: [
      'Working with an agent is not about writing the perfect prompt. It’s about describing what you need clearly enough that a collaborator can execute it — then watching the work, recognising drift, and redirecting.',
      'This is the same skill that makes someone good at leading a team, mentoring a junior colleague, or explaining a project to a stakeholder. You already have it.',
      'The best agent users aren’t the most technical people in the room. They’re the clearest communicators.',
    ],
  },
]

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.5s ease ${d}s` })

export default function SkillsSlide({ phase }) {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>The Skills That <em>Actually</em> Matter</>}
      sheet={<>Section III · The Human Layer<br /><b>Plate 09</b></>}
      corners={{ tl: 'INSTRUMENTS', tr: 'NONE ARE TECHNICAL', bl: 'SHEET 09', br: 'click any instrument' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, width: '100%' }}>
        <div className="cards" style={{ maxWidth: 1020 }}>
          {SKILLS.map((s, i) => (
            <div key={s.id} className="card" onClick={(e) => { e.stopPropagation(); openModal(s) }}
              style={{ borderColor: 'var(--neat)', ...fade(phase >= 0, 0.08 * i) }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neat)' }}>
              <div className="num"><span className="marker-dot" style={{ background: s.color, borderRadius: '50%', width: 7, height: 7 }} /> {String(i + 1).padStart(2, '0')}</div>
              <div className="glyph" style={{ color: s.color }}>{s.glyph}</div>
              <div className="nm">{s.name}</div>
              <div className="tg">{s.tag}</div>
            </div>
          ))}
        </div>
        <p className="lede" style={fade(phase >= 0, 0.5)}>None of them are technical.</p>
      </div>
    </SlidePlate>
  )
}
