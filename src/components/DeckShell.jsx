import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Controls from './Controls.jsx'
import SlideNav from './SlideNav.jsx'
import Modal from './Modal.jsx'
import SlideMenu from './SlideMenu.jsx'
import PlateIntro from './PlateIntro.jsx'

const SWIPE_THRESHOLD = 55

export default function DeckShell() {
  const { position, nextSlide, prevSlide, advancePhase, retreatPhase, activeModal, closeModal, menuOpen, setMenuOpen, toggleMenu, toggleTheme } = useApp()
  const Current = position.current?.Component
  const touch = useRef({ x: 0, y: 0 })

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (activeModal) { closeModal(); return }
        if (menuOpen) { setMenuOpen(false); return }
        return
      }
      if (activeModal) return // let the modal own the keyboard while open
      switch (e.key) {
        // ←/→ and PageUp/Down move between plates
        case 'ArrowRight': case 'PageDown': e.preventDefault(); nextSlide(); break
        case 'ArrowLeft': case 'PageUp': prevSlide(); break
        // Space and ↓/↑ build / unbuild the current plate's reveals
        case ' ': case 'ArrowDown': e.preventDefault(); advancePhase(); break
        case 'ArrowUp': e.preventDefault(); retreatPhase(); break
        case 'm': case 'M': toggleMenu(); break
        case 't': case 'T': toggleTheme(); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeModal, menuOpen, nextSlide, prevSlide, advancePhase, retreatPhase, closeModal, setMenuOpen, toggleMenu, toggleTheme])

  /* swipe (mobile) — taps remain clicks */
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    if (activeModal || menuOpen) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dx < 0 ? nextSlide() : prevSlide()
    }
  }

  return (
    <>
      <div className="app-field" />
      <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Controls />
        {Current && <Current key={position.current.id} phase={position.phase} />}
        <PlateIntro />
        <SlideNav />
      </div>
      {activeModal && <Modal />}
      {menuOpen && <SlideMenu />}
    </>
  )
}
