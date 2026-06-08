import { useApp } from '../context/AppContext.jsx'

export default function SlideNav() {
  const { nextSlide, prevSlide, position, selfGuided, introDone } = useApp()
  const { list, index, total, current, phase, phases, atEnd } = position
  const label = list === 'reserve' ? 'Reserve' : 'Plate'
  const num = String(index + 1).padStart(2, '0')

  // scale-bar ticks reflect progress through the current section
  const ticks = Array.from({ length: total }, (_, i) => (
    <i key={i} className={i <= index ? 'on' : ''} />
  ))

  // self-guided: once the plate is fully revealed and its intro is done, invite
  // the move to the next plate.
  const fullyRevealed = phase >= phases - 1
  const pulseNext = selfGuided && introDone && fullyRevealed && !atEnd

  return (
    <nav className="deck-nav">
      <button className="navbtn" onClick={prevSlide} disabled={position.atStart}>
        <span className="a">←</span> Prev
      </button>
      <div className="scale">
        {label} {num} / {String(total).padStart(2, '0')}
        <div className="bar">{ticks}</div>
        <span style={{ opacity: 0.6 }}>{current?.title}</span>
      </div>
      <button className={`navbtn${pulseNext ? ' pulse' : ''}`} onClick={nextSlide} disabled={atEnd}>
        Next <span className="a">→</span>
        {pulseNext && <span className="nav-cue">next plate</span>}
      </button>
    </nav>
  )
}
