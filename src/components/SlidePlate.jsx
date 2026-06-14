import { useApp } from '../context/AppContext.jsx'
import CompassRose from './CompassRose.jsx'

/*
  SlidePlate — the Atlas "map plate" chrome shared by every slide:
  neatline border, corner coordinates, header (eyebrow + title + sheet), and
  optional legend / north rose. Slides render their content as children.

  Clicking empty space on the plate advances the slide's reveals (phases).
  Clicks that land on an interactive element (button/link/input or an SVG
  marker .node) are ignored, so those keep their own behaviour.
*/
export default function SlidePlate({
  eyebrow,
  title,
  sheet,
  corners = {},
  legend,
  north = false,
  qr = false,
  onNotes,
  notesLabel = 'Survey notes',
  children,
}) {
  const { tl, tr, bl, br } = corners
  const { advancePhase, position, selfGuided, introDone } = useApp()

  const canBuild = (position?.phases ?? 1) > 1 && position.phase < position.phases - 1
  const fullyRevealed = (position?.phase ?? 0) >= (position?.phases ?? 1) - 1
  // Presenter mode: hint as soon as the plate can build. Self-guided: hold the
  // hint until the intro finishes (introDone), then guide the click.
  const showBuildHint = canBuild && (!selfGuided || introDone)
  const guided = selfGuided && introDone
  const hintText = selfGuided ? 'click anywhere on the plate to continue ▾' : 'click the plate to reveal ▾'
  // Once a self-guided plate is fully exposed and its intro is done, flash the
  // "what am I looking at?" button to invite the deeper dive.
  const flashNotes = guided && fullyRevealed && !!onNotes
  const onPlateClick = (e) => {
    if (e.target.closest('button, a, input, textarea, select, .node, [data-no-advance]')) return
    advancePhase()
  }

  return (
    <div className={`plate${canBuild ? ' buildable' : ''}`} onClick={onPlateClick}>
      {tl && <span className="corner tl">{tl}</span>}
      {tr && <span className="corner tr">{tr}</span>}
      {bl && <span className="corner bl">{bl}</span>}
      {br && <span className="corner br">{br}</span>}

      <div className="plate-header">
        <div>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          {title && <h1 className="slide-title">{title}</h1>}
          {onNotes && (
            <button className={`platenote${flashNotes ? ' flash' : ''}`} onClick={(e) => { e.stopPropagation(); onNotes() }}>
              ▷ {notesLabel}
            </button>
          )}
        </div>
        {sheet && <div className="sheet">{sheet}</div>}
      </div>

      <div className="stage">{children}</div>

      {legend && (
        <div className="legend">
          <div className="lt">Legend</div>
          {legend.map((row, i) => (
            <div className="row" key={i}>
              <span className="key" style={row.dashed ? { borderStyle: 'dashed', background: 'transparent' } : { background: row.color }} />
              {row.label}
            </div>
          ))}
        </div>
      )}
      <a
        className="compass"
        href="https://truenorthaiservices.com"
        target="_blank"
        rel="noopener noreferrer"
        title="True North AI Services"
        aria-label="True North AI Services"
      >
        <CompassRose />
      </a>
      {qr && (
        <a
          className="deck-qr"
          href="https://beyond-the-chatbot.onrender.com/#/title"
          target="_blank"
          rel="noopener noreferrer"
          title="Open this presentation"
        >
          <img src={`${import.meta.env.BASE_URL}qr-deck.svg`} alt="QR code to this presentation" />
          <span>scan to view</span>
        </a>
      )}
      {showBuildHint && <div className={`build-hint${guided ? ' guided' : ''}`} aria-hidden="true">{hintText}</div>}
    </div>
  )
}
