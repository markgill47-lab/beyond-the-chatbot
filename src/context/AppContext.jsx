import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { MAIN_SLIDES, RESERVE_SLIDES, slideById } from '../slides/registry.js'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const THEME_KEY = 'btc-theme'
const NARR_KEY = 'btc-narration'
const GUIDE_KEY = 'btc-self-guided'

// In self-guided (kiosk) mode the deck is one continuous run: all main plates,
// then all reserve plates — skipGuided plates (e.g. "Thank You") stepped over.
const FULL_ORDER = [
  ...MAIN_SLIDES.map((s, i) => ({ list: 'main', index: i, skip: !!s.skipGuided })),
  ...RESERVE_SLIDES.map((s, i) => ({ list: 'reserve', index: i, skip: false })),
]
function guidedStep(list, index, dir) {
  let p = FULL_ORDER.findIndex((x) => x.list === list && x.index === index)
  if (p < 0) return null
  do { p += dir } while (FULL_ORDER[p] && FULL_ORDER[p].skip)
  return FULL_ORDER[p] || null
}

function initialTheme() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  }
  return 'light' // paper is the projector-friendly default; toggle to night chart
}

function initialFromHash() {
  if (typeof location === 'undefined') return { list: 'main', index: 0 }
  const id = location.hash.replace(/^#\/?/, '')
  const found = slideById(id)
  if (found) return { list: found.list, index: found.index }
  return { list: 'main', index: 0 }
}

export function AppProvider({ children }) {
  const start = initialFromHash()
  const [theme, setTheme] = useState(initialTheme)
  const [narrationMode, setNarrationMode] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem(NARR_KEY) === 'on'
  )
  const [selfGuided, setSelfGuided] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem(GUIDE_KEY) === 'on'
  )
  const [list, setList] = useState(start.list) // 'main' | 'reserve'
  const [index, setIndex] = useState(start.index)
  const [phase, setPhase] = useState(0)
  const [introDone, setIntroDone] = useState(false) // self-guided: plate intro finished playing
  const [activeModal, setActiveModal] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const slides = list === 'main' ? MAIN_SLIDES : RESERVE_SLIDES
  const current = slides[index]
  const phases = current?.phases ?? 1

  /* ---- theme + narration ---- */
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem(THEME_KEY, theme) } catch {}
  }, [theme])
  const toggleTheme = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])
  const toggleNarration = useCallback(() => setNarrationMode(n => {
    const next = !n
    try { localStorage.setItem(NARR_KEY, next ? 'on' : 'off') } catch {}
    return next
  }), [])
  const toggleSelfGuided = useCallback(() => setSelfGuided(g => {
    const next = !g
    try { localStorage.setItem(GUIDE_KEY, next ? 'on' : 'off') } catch {}
    return next
  }), [])

  /* ---- deck navigation ----
     Plate-to-plate: nextSlide / prevSlide (Prev/Next buttons, ←/→ arrows, swipe).
     Within-plate reveals: advancePhase / retreatPhase (clicking the plate body,
     Space, ↑/↓). The two are deliberately separate so the presenter drives the
     build with clicks and moves between plates with the buttons. */
  // Guided mode flows across main → reserve as one run; presenter mode stays
  // within the current list (reserve reached via the index/menu).
  const nextSlide = useCallback(() => {
    if (selfGuided) {
      const t = guidedStep(list, index, 1)
      if (t) { setActiveModal(null); setList(t.list); setIndex(t.index); setPhase(0) }
    } else if (index < slides.length - 1) { setActiveModal(null); setIndex(index + 1); setPhase(0) }
  }, [selfGuided, list, index, slides.length])

  const prevSlide = useCallback(() => {
    if (selfGuided) {
      const t = guidedStep(list, index, -1)
      if (t) { setActiveModal(null); setList(t.list); setIndex(t.index); setPhase(0) }
    } else if (index > 0) { setActiveModal(null); setIndex(index - 1); setPhase(0) }
  }, [selfGuided, list, index])

  const advancePhase = useCallback(() => {
    setPhase(p => Math.min(p + 1, phases - 1))
  }, [phases])

  const retreatPhase = useCallback(() => {
    setPhase(p => Math.max(p - 1, 0))
  }, [])

  const jumpTo = useCallback((targetList, targetIndex) => {
    setList(targetList)
    setIndex(targetIndex)
    setPhase(0)
    setMenuOpen(false)
    setActiveModal(null)
  }, [])

  /* ---- modal ---- */
  const openModal = useCallback((content) => setActiveModal(content), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  const toggleMenu = useCallback(() => setMenuOpen(m => !m), [])

  /* every new plate restarts the self-guided intro/affordance cycle */
  useEffect(() => { setIntroDone(false) }, [current])

  /* ---- hash sync (shareable deep links, no history spam) ---- */
  useEffect(() => {
    if (current) {
      const target = `#/${current.id}`
      if (location.hash !== target) history.replaceState(null, '', target)
    }
  }, [current])

  useEffect(() => {
    const onHash = () => {
      const id = location.hash.replace(/^#\/?/, '')
      const found = slideById(id)
      if (found && !(found.list === list && found.index === index)) {
        setList(found.list); setIndex(found.index); setPhase(0)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [list, index])

  const atStart = selfGuided ? !guidedStep(list, index, -1) : index === 0
  const atEnd = selfGuided ? !guidedStep(list, index, 1) : index === slides.length - 1

  const value = useMemo(() => ({
    theme, toggleTheme, narrationMode, toggleNarration,
    selfGuided, toggleSelfGuided, introDone, setIntroDone,
    activeModal, openModal, closeModal,
    menuOpen, toggleMenu, setMenuOpen,
    nextSlide, prevSlide, advancePhase, retreatPhase, jumpTo,
    position: { list, index, phase, phases, current, total: slides.length, atStart, atEnd },
    registry: { main: MAIN_SLIDES, reserve: RESERVE_SLIDES },
  }), [theme, toggleTheme, narrationMode, toggleNarration, selfGuided, toggleSelfGuided, introDone,
       activeModal, openModal, closeModal,
       menuOpen, toggleMenu, nextSlide, prevSlide, advancePhase, retreatPhase, jumpTo,
       list, index, phase, phases, current, slides.length, atStart, atEnd])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
