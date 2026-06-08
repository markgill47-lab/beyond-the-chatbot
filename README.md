# Beyond the Chatbot

Interactive web presentation for the **MNGIA Thought Leader Summit** — *Mark Gill, Director, AI & Visualization Lab, St. Cloud State University.*

Built with **Vite + React**. Visual identity: the **Cartographic / Atlas** theme (every slide is a map "plate"). Light = aged paper, dark = night chart.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # preview the production build
```

## Controls

- **← / →**, Space, or the lower-third **Prev / Next** buttons — navigate (advances reveals within a slide, then moves to the next slide). No auto-advance.
- **Swipe** left/right on touch devices. Taps remain clicks.
- **T** — toggle light / dark theme. **M** — slide index. **Esc** — close modal / index.
- Click a marker on a slide to open its modal. **Narration mode** (top-right or on the title slide): on → audio auto-plays when a modal opens; off → use the ▶ button in the modal.

## Layout

```
docs/        Planning docs, prototypes (.jsx), spec.md, modal image descriptions
mockups/     Throwaway style-comparison HTML (not the app)
src/
  styles/    tokens.css (Atlas palette, light/dark) + global.css
  context/   AppContext.jsx — theme, narration, deck nav, modal, menu
  components/ DeckShell, Controls, SlideNav, SlidePlate, Modal, SlideMenu
  slides/    registry.js + LandingSlide, WhatIsAnAgent, PlaceholderSlide
```

## Status

Phase 1 skeleton. The title slide and **What Is an Agent?** are built into the Atlas;
the remaining slides are placeholders to be ported from `docs/*.jsx`. Modal images
(Phase 2, generated per `docs/modal-image-descriptions.md`) and narration audio
(Phase 2, ElevenLabs) are stubbed — narration currently shows a simulated progress bar.

To change the look, edit `src/styles/tokens.css` — the whole deck themes from there.
