import { useApp } from '../context/AppContext.jsx'

export default function Controls() {
  const { theme, toggleTheme, narrationMode, toggleNarration, selfGuided, toggleSelfGuided, toggleMenu } = useApp()
  return (
    <div className="controls">
      <button className="pill" onClick={toggleMenu} title="Slide index (M)">☰ Index</button>
      <button
        className={`pill${selfGuided ? ' on' : ''}`}
        onClick={toggleSelfGuided}
        title="Self-Guided mode: each plate introduces itself and guides you through"
      >
        <span className="dot" /> Self-Guided {selfGuided ? 'On' : 'Off'}
      </button>
      <button
        className={`pill${narrationMode ? ' on' : ''}`}
        onClick={toggleNarration}
        title="Narration: auto-play audio"
      >
        <span className="dot" /> Narration {narrationMode ? 'On' : 'Off'}
      </button>
      <button className="pill" onClick={toggleTheme} title="Light / dark (T)">
        {theme === 'dark' ? '☀' : '☾'} {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}
