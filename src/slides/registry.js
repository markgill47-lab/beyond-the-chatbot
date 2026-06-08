import LandingSlide from './LandingSlide.jsx'
import WhatIsAnAgent from './WhatIsAnAgent.jsx'
import GenerativeVsAgentic from './GenerativeVsAgentic.jsx'
import WhereKnowledgeLives from './WhereKnowledgeLives.jsx'
import WhoControlsData from './WhoControlsData.jsx'
import CreativeEngine from './CreativeEngine.jsx'
import AgentFramework from './AgentFramework.jsx'
import RethinkingTaxonomy from './RethinkingTaxonomy.jsx'
import LiveDemo from './LiveDemo.jsx'
import SkillsSlide from './SkillsSlide.jsx'
import HowIWork from './HowIWork.jsx'
import RisksSlide from './RisksSlide.jsx'
import ThankYou from './ThankYou.jsx'
import AdoptionTiming from './AdoptionTiming.jsx'
import AutomatedFrameworks from './AutomatedFrameworks.jsx'
import EmergenceWorld from './EmergenceWorld.jsx'
import AboutThis from './AboutThis.jsx'
import PlaceholderSlide from './PlaceholderSlide.jsx'

/*
  Slide registry. `phases` = number of click/▶ reveals within a slide (the deck
  advances through phases before moving to the next slide). `from` records the
  prototype a placeholder will be ported from. Built slides set their own
  Component; everything not yet ported uses PlaceholderSlide.
*/
export const MAIN_SLIDES = [
  { id: 'title',                 title: 'Beyond the Chatbot',             section: 'Frontispiece',          phases: 1, Component: LandingSlide },
  { id: 'what-is-an-agent',      title: 'What Is an Agent?',              section: 'I · The Survey',        phases: 4, Component: WhatIsAnAgent },
  { id: 'generative-vs-agentic', title: 'Generative vs. Agentic',         section: 'I · The Survey',        phases: 3, Component: GenerativeVsAgentic },
  { id: 'where-knowledge-lives', title: 'Where Does the Knowledge Live?', section: 'I · The Survey',        phases: 3, Component: WhereKnowledgeLives },
  { id: 'who-controls-data',     title: 'Who Controls the Data?',         section: 'I · The Survey',        phases: 2, Component: WhoControlsData },
  { id: 'creative-engine',       title: 'The Creative Engine',            section: 'II · In Practice',      phases: 3, Component: CreativeEngine },
  { id: 'agent-framework',       title: 'Anatomy of an Agent Framework',  section: 'II · In Practice',      phases: 6, Component: AgentFramework },
  { id: 'skills',                title: 'The Skills That Actually Matter', section: 'III · The Human Layer', phases: 1, Component: SkillsSlide },
  { id: 'how-i-work',            title: 'How I Actually Work',            section: 'III · The Human Layer', phases: 1, Component: HowIWork },
  { id: 'agentic-risk',          title: 'Agentic Risk Is Different',      section: 'IV · The Risk',         phases: 1, Component: RisksSlide },
  { id: 'thank-you',             title: 'Thank You',                      section: 'Close',                 phases: 1, Component: ThankYou, skipGuided: true },
]

export const RESERVE_SLIDES = [
  { id: 'rethinking-taxonomy',   title: 'Rethinking the Taxonomy',        section: 'Reserve',               phases: 3, Component: RethinkingTaxonomy, skipGuided: true },
  { id: 'live-demo',             title: 'Live Demo',                      section: 'Reserve',               phases: 2, Component: LiveDemo,             skipGuided: true },
  { id: 'adoption-timing',       title: 'Adoption Timing',                section: 'Reserve',               phases: 1, Component: AdoptionTiming },
  { id: 'automated-frameworks',  title: 'Automated Frameworks',           section: 'Reserve',               phases: 1, Component: AutomatedFrameworks },
  { id: 'emergence-world',       title: 'Emergence World',                section: 'Reserve',               phases: 2, Component: EmergenceWorld },
  { id: 'about-this',            title: 'About This',                     section: 'Reserve',               phases: 1, Component: AboutThis },
]

export function slideById(id) {
  const m = MAIN_SLIDES.findIndex(s => s.id === id)
  if (m >= 0) return { list: 'main', index: m, slide: MAIN_SLIDES[m] }
  const r = RESERVE_SLIDES.findIndex(s => s.id === id)
  if (r >= 0) return { list: 'reserve', index: r, slide: RESERVE_SLIDES[r] }
  return null
}
