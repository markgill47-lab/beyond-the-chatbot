import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/slides.css'
import { AppProvider } from './context/AppContext.jsx'
import DeckShell from './components/DeckShell.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <DeckShell />
    </AppProvider>
  </StrictMode>
)
