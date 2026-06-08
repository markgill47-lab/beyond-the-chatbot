import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { PLATE_INTROS } from '../data/plateIntros.js'

/*
  Self-Guided plate intro: a caption box at the bottom-centre of the window that
  speaks the plate's introduction (audio/intro-<id>.mp3) with word-by-word
  highlighting (audio/intro-<id>.json). When the intro finishes it flips
  introDone — which surfaces the on-plate affordances (click the plate, the
  flashing "what am I looking at?" button, the pulsing Next button) — and then
  the box auto-fades a couple of seconds later so it stops covering the plate.
  Audio auto-plays only when Narration is also on; otherwise the text just shows.
*/
export default function PlateIntro() {
  const { selfGuided, narrationMode, position, activeModal, setIntroDone } = useApp()
  const id = position.current?.id
  const text = id ? PLATE_INTROS[id] : null

  const [timing, setTiming] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [activeWord, setActiveWord] = useState(-1)
  const [dismissed, setDismissed] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const audioRef = useRef(null)
  const rafRef = useRef(0)
  const activeRef = useRef(-1)
  const timers = useRef([])
  const fadeRef = useRef(0)

  const audioBase = id ? `${import.meta.env.BASE_URL}audio/intro-${id}` : null
  const flatWords = useMemo(() => (timing?.paragraphs || []).flat(), [timing])

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; clearTimeout(fadeRef.current) }
  const after = (ms, fn) => { timers.current.push(setTimeout(fn, ms)) }
  const beginLeave = () => { setLeaving(true); after(480, () => setDismissed(true)) }
  // The fade is a FALLBACK that only fires if the audio isn't actively playing.
  // It is cancelled the instant audio starts (onPlay) and re-armed 2s after the
  // audio ends (onEnded), so the box never fades mid-narration.
  const scheduleFade = (ms) => { clearTimeout(fadeRef.current); fadeRef.current = setTimeout(beginLeave, ms) }
  const cancelFade = () => clearTimeout(fadeRef.current)

  // (re)set per plate; load timings; auto-play when narration is on; arm fallback fade
  useEffect(() => {
    clearAll()
    setDismissed(false); setLeaving(false); setPlaying(false); setActiveWord(-1); activeRef.current = -1; setTiming(null)
    if (!selfGuided || !text) { after(60, () => setIntroDone(true)); return () => clearAll() } // deferred past per-plate reset
    let cancelled = false
    fetch(audioBase + '.json').then(r => (r.ok ? r.json() : null)).then(j => { if (!cancelled) setTiming(j && j.paragraphs ? j : null) }).catch(() => {})

    // generous fallback fade for when no audio plays (narration off, or autoplay blocked)
    const words = text.split(/\s+/).length
    scheduleFade(Math.min(16000, Math.max(7000, words * 340)))

    if (narrationMode) {
      after(140, () => { const a = audioRef.current; if (a) a.play().then(() => setPlaying(true)).catch(() => setIntroDone(true)) })
    } else {
      after(900, () => setIntroDone(true)) // narration off: affordances after a brief read beat
    }
    return () => { cancelled = true; clearAll(); cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selfGuided, narrationMode, text])

  // karaoke highlight loop
  useEffect(() => {
    if (!playing || !flatWords.length) return
    const tick = () => {
      const a = audioRef.current
      if (a) {
        const t = a.currentTime
        let lo = 0, hi = flatWords.length - 1, idx = -1
        while (lo <= hi) { const m = (lo + hi) >> 1; if (flatWords[m].s <= t) { idx = m; lo = m + 1 } else { hi = m - 1 } }
        if (idx !== activeRef.current) { activeRef.current = idx; setActiveWord(idx) }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, flatWords])

  useEffect(() => () => { clearAll(); cancelAnimationFrame(rafRef.current) }, [])

  if (!selfGuided || !text || dismissed || activeModal) return null

  const toggle = (e) => {
    e.stopPropagation()
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause() }
    else { if (a.ended || a.currentTime >= (a.duration || 1)) a.currentTime = 0; a.play().catch(() => {}) }
  }

  return (
    <div className={`plate-intro${leaving ? ' leaving' : ''}`} onClick={(e) => e.stopPropagation()}>
      <audio
        ref={audioRef}
        src={audioBase + '.mp3'}
        preload="auto"
        onPlay={() => { cancelFade(); setPlaying(true) }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setIntroDone(true); scheduleFade(2000) }}
        onError={() => { setIntroDone(true); scheduleFade(2500) }}
      />
      <div className="pi-body">
        <div className="pi-text">
          {flatWords.length ? (
            flatWords.map((word, i) => (
              <span key={i}>
                <span className={i === activeWord ? 'spoken on' : 'spoken'}>{word.w}</span>{i < flatWords.length - 1 ? ' ' : ''}
              </span>
            ))
          ) : text}
        </div>
        <div className="pi-tools">
          <button className="iconbtn" onClick={toggle} title={playing ? 'Pause' : 'Play intro'}>{playing ? '❚❚' : '▶'}</button>
          <button className="iconbtn" onClick={(e) => { e.stopPropagation(); setIntroDone(true); beginLeave() }} title="Dismiss intro">✕</button>
        </div>
      </div>
    </div>
  )
}
