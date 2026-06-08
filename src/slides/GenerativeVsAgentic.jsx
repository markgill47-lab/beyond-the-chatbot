import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const reduceMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/* Types the chat out one line at a time, character by character. */
function TypedFieldLog({ messages, run }) {
  const [lineCount, setLineCount] = useState(0) // lines fully revealed
  const [partial, setPartial] = useState('')    // partial text of the typing line

  useEffect(() => {
    if (!run) return
    if (reduceMotion()) { setLineCount(messages.length); setPartial(''); return }
    setLineCount(0); setPartial('')
    let li = 0, ci = 0, timer
    const CHAR_MS = 15, LINE_PAUSE = 430
    const tick = () => {
      if (li >= messages.length) return
      const text = messages[li].text
      if (ci < text.length) {
        ci++; setPartial(text.slice(0, ci)); timer = setTimeout(tick, CHAR_MS)
      } else {
        li++; ci = 0; setLineCount(li); setPartial(''); timer = setTimeout(tick, LINE_PAUSE)
      }
    }
    timer = setTimeout(tick, 280)
    return () => clearTimeout(timer)
  }, [run, messages])

  const allDone = lineCount >= messages.length

  return (
    <>
      <div className="flog">
        {messages.map((m, i) => {
          if (i > lineCount) return null
          const typing = i === lineCount && !allDone
          if (typing && partial === '') return null
          return (
            <div className={`flog__entry ${m.who === 'You' ? 'you' : 'ai'}`} key={i}>
              <span className="flog__who">{m.who}</span>
              <span className="flog__text">
                {typing ? partial : m.text}
                {typing && <span className="caret" />}
              </span>
            </div>
          )
        })}
      </div>
      <div className="flog__tail" style={{ opacity: allDone ? 0.8 : 0, transition: 'opacity 0.5s ease' }}>
        …paste it again, with more context this time…
      </div>
    </>
  )
}

const CHAT = [
  { who: 'You', text: "Here's our Q3 revenue: [200 rows]. Target was $2.4M. How did we do by region?" },
  { who: 'AI', text: 'Based on the data you provided, the Midwest exceeded target by 12% while the West Coast fell short by 8%…' },
  { who: 'You', text: "Now here's the data again plus last year's: [400 rows]. Compare YoY growth." },
  { who: 'AI', text: 'Comparing the two datasets you’ve shared, year-over-year growth was strongest in…' },
  { who: 'You', text: 'Wait — some rows were cut off. Let me paste it again. Also here’s Q2 for context: [200 more rows]…' },
]

const STEPS = [
  { t: 'Goal', d: 'Analyse Q3 vs targets, compare YoY' },
  { t: 'Plan', d: 'Break into subtasks, locate sources' },
  { t: 'Execute', d: 'Read files, query databases — in parallel' },
  { t: 'Verify', d: 'Cross-check totals, validate assumptions' },
  { t: 'Deliver', d: 'Report, charts, sources cited, caveats' },
]

const CONTEXT = ['Project files', 'Databases', 'Prior analysis', 'Company context', 'Tool access']

const DETAIL = {
  plno: 'Survey Notes · Plate 02', name: 'Generative vs. Agentic AI', tag: 'The fundamental architectural shift',
  color: 'var(--accent)', fig: { n: '02', file: 'gen-vs-agent_detail.png' },
  body: [
    'Most people experience AI as a conversation. You type a prompt, it responds, you refine, it responds again. This is generative AI — a bilateral exchange where every interaction starts fresh and the human provides all the context.',
    'The left plate shows that pattern. The user re-pastes data, re-explains context, and manually shuttles every piece of information into the chat. The AI only knows what you tell it in that moment.',
    'The right plate shows what changes with agentic AI. The system receives a goal, not a prompt. It plans the work, breaks it into subtasks, executes them in parallel, verifies its own output, and delivers a complete result. The context persists. The tools are real.',
    'The difference isn’t just speed — it’s architecture. Generative AI is a conversation. Agentic AI is a collaborator that can plan, act, and check its own work.',
  ],
}

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.55s ease ${d}s` })

export default function GenerativeVsAgentic({ phase }) {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Generative <span style={{ color: 'var(--ink-faint)', fontStyle: 'italic' }}>vs.</span> Agentic</>}
      sheet={<>Section I · The Survey<br /><b>Plate 02</b></>}
      corners={{ tl: 'COMPARATIVE', tr: 'TWO TERRITORIES', bl: 'SHEET 02', br: 'SCALE 1:1' }}
      onNotes={() => openModal(DETAIL)}
      notesLabel="What am I looking at?"
    >
      <div className="cmp">
        {/* LEFT — generative */}
        <div className="cmp__col" style={fade(phase >= 0)}>
          <div className="cmp__head">
            <div className="cmp__side" style={{ color: 'var(--accent-water)' }}>Generative AI</div>
            <div className="cmp__sub">Bilateral exchange</div>
          </div>
          <div className="cmp__panel">
            <div className="region__label">◷ Field Log — Chat Interface</div>
            <TypedFieldLog messages={CHAT} run={phase >= 0} />
          </div>
          <div className="cmp__caption" style={fade(phase >= 2, 0.1)}>
            {['User provides all context', 'Knowledge resets each exchange', 'Single response per turn', 'Can’t act, only advise'].map((t, i) => (
              <div className="row" key={i}><span className="mk" style={{ color: 'var(--accent-water)' }}>—</span>{t}</div>
            ))}
          </div>
        </div>

        <div className="cmp__fold" style={fade(phase >= 1)} />

        {/* RIGHT — agentic */}
        <div className="cmp__col" style={fade(phase >= 1)}>
          <div className="cmp__head">
            <div className="cmp__side" style={{ color: 'var(--accent)' }}>Agentic AI</div>
            <div className="cmp__sub">Orchestrated autonomy</div>
          </div>
          <div className="cmp__panel">
            <div className="region__label">⤳ Itinerary — Autonomous Pipeline</div>
            <div>
              {phase >= 1 && STEPS.map((s, i) => (
                <div key={i} className="step-cascade" style={{ animationDelay: 0.12 * i + 's' }}>
                  <div className="step">
                    <span className="step__no">{String(i + 1).padStart(2, '0')}</span>
                    <div className="step__body">
                      <div className="t">{s.t}{s.t === 'Execute' && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--accent-forest)', marginLeft: 8, letterSpacing: '0.12em' }}>PARALLEL</span>}</div>
                      <div className="d">{s.d}</div>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && <div className="step__rule" />}
                </div>
              ))}
            </div>
            {phase >= 1 && (
              <div className="region dashed step-cascade" style={{ marginTop: 'auto', animationDelay: 0.12 * STEPS.length + 's' }}>
                <div className="region__label" style={{ color: 'var(--accent)' }}>⟐ Persistent Context Layer</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {CONTEXT.map((c, i) => (
                    <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-soft)', border: '1px solid var(--neat)', padding: '3px 7px' }}>{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="cmp__caption" style={fade(phase >= 2, 0.1)}>
            {['Agent holds the context', 'Plans before executing', 'Parallelises subtasks', 'Checks its own work'].map((t, i) => (
              <div className="row" key={i}><span className="mk" style={{ color: 'var(--accent)' }}>◆</span>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </SlidePlate>
  )
}
