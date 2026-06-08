import { useApp } from '../context/AppContext.jsx'

export default function SlideMenu() {
  const { registry, jumpTo, position, setMenuOpen } = useApp()

  const Item = ({ slide, list, index, label }) => {
    const isCurrent = position.list === list && position.index === index
    return (
      <button className={`item${isCurrent ? ' current' : ''}`} onClick={() => jumpTo(list, index)}>
        <span className="ix">{label}</span>
        <span className="nm">{slide.title}</span>
      </button>
    )
  }

  return (
    <div className="menu-overlay" onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false) }}>
      <div className="menu">
        <div className="menu-inner">
          <div className="menu-title">Beyond the Chatbot</div>
          <div className="menu-sub">Slide Index · Esc or M to close</div>

          <h3>Main Deck</h3>
          {registry.main.map((s, i) => (
            <Item key={s.id} slide={s} list="main" index={i} label={String(i + 1).padStart(2, '0')} />
          ))}

          <h3>Reserve · Q&amp;A</h3>
          {registry.reserve.map((s, i) => (
            <Item key={s.id} slide={s} list="reserve" index={i} label={`R${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
