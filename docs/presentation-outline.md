# Beyond the Chatbot: Presentation Outline (Updated)

**Title:** Beyond the Chatbot: Agentic AI, the Skills That Actually Matter, and Why the Biggest Shift Hasn't Happened Yet

**Presenter:** Mark Gill, Director, AI & Visualization Lab, St. Cloud State University

**Event:** MNGIA Thought Leader Summit

**Format:** 60 minutes (30 presentation / 30 Q&A)

**Delivery:** Interactive online web experience

---

## Abstract

Most educators understand AI as a conversation: type a prompt, get a response. But AI systems are already reading documents, writing and executing code, managing workflows, and chaining decisions together autonomously. This session moves past the chatbot mental model to explore what agentic AI looks like in practice, where AI actually sits on the adoption curve (the "iPhone moment" hasn't arrived yet), and why the most important future skills are human rather than technical. We close with an honest look at why agentic systems introduce a category of risk that current conversations about deepfakes and academic integrity do not begin to cover.

---

## Presentation Structure (Main Deck, ~30 minutes)

### Section 1: What Changed (Slides 1-4, ~8 minutes)

Establishes the foundational vocabulary and the generative-to-agentic shift through three parallel comparison lenses.

1. **What Is an Agent?** The anatomy of an agent: LLM core, memory, tools, planning, wrapped in an autonomous execution shell. Layered reveal builds the concept from the ground up. Each component clickable for deeper explanation.

2. **Generative vs. Agentic** Side-by-side comparison of the bilateral chat exchange (user provides all context, stateless) versus the orchestrated autonomous pipeline (goal, plan, execute, verify, deliver). Animated reveal with auto-populating chat messages and stepped agent workflow.

3. **Where Does the Knowledge Live?** Data flow comparison: generative scatters static snapshots to someone else's server, human shuttles results back and forth. Agentic operates directly within the project files, with targeted API connections. "Water through a hose, not documents dumped in a bucket."

4. **Who Controls the Data?** Privacy comparison: generative ties privacy to subscription tiers (free, premium, enterprise). Agentic introduces degrees of separation: direct local access, API boundary, or full tool isolation where AI never touches the data. "Privacy is an architecture choice, not a payment tier."

### Section 2: What This Looks Like in Practice (Slides 5-8, ~12 minutes)

Moves from concept to demonstration. The creative engine model, the agent framework in detail, and a live demo that makes the pedagogical argument.

5. **The Creative Engine** Animated radial diagram: human judgment at center, recursive cycle of Intent, Generate, Review, Present. Nine output types on the periphery with bidirectional animated flows. Every element clickable for modal detail. The engine model positions the human as the irreplaceable core.

6. **Anatomy of an Agent Framework** Layered flowchart: Knowledge + Goal feed a Manager Agent, which delegates Tasks to parallel Worker Agents, each checked by a Checker Agent, reporting back to the Manager. Six-phase reveal demonstrates planning, delegation, parallel execution, verification, and reporting.

7. **Rethinking the Taxonomy** Side-by-side: Bloom's pyramid (hierarchical, creation as capstone) versus Creation-First cycle (no hierarchy, four equal stages: Create, Assess, Reflect, Refine). Expanded content previews the four-column framework: what the learner does, what AI enables, what the instructor does, what evidence emerges. Sets up the live demo.

8. **Live Demo** Empty folder + spec.md + one prompt: "Read the .md file and build what it describes in this folder." Claude Code reads the spec and builds the interactive Bloom's/Creation-First taxonomy tool live, in front of the audience. The demo IS the argument: creation-first learning is possible because AI eliminates the knowledge prerequisite.

### Section 3: The Human Layer (Slides 9-10, ~5 minutes)

Reframes the skills conversation and shows the workflow in practice.

9. **The Skills That Actually Matter** Five clickable cards: Critical Thinking, Judgment, Creativity, Experience, Communication. Subtitle: "None of them are technical." Each modal explains the skill in the context of agentic work. Communication modal delivers the key reframe: "It doesn't start with a prompt. It starts with a conversation."

10. **How I Actually Work** Two elements with a directional arrow: Generative Session ("Think it through") flows into Agentic Session ("Build the thing"). Each clickable for modal detail describing the actual workflow: brainstorming and research in conversation, then handing a spec to an agent for execution. Closing line: "The human value is in the first half. The leverage is in the second."

### Section 4: The Risk We're Not Talking About (Slide 11, ~5 minutes)

Closes the presentation portion with an honest, escalating look at agentic risk.

11. **Agentic Risk Is Different** Three escalating clickable cards with severity indicators: Institutional Self-Harm (the agent did what it was told, and that was the problem), Competence Without Wisdom (effective without being competent, capable without understanding), Democratized Threat Capability ("A world with pretty good supervillains"). Subtitle: "Agents solve some generative risks. They introduce others."

---

## Reserve Slides (Available for Q&A, ~30 minutes)

Unlocked after the main presentation. Presenter selects based on audience questions and discussion direction.

- **Adoption Timing** Interactive overlay of Rogers' Adoption Curve, Gartner Hype Cycle, and economic J-Curve. Stepped reveal with audience-facing "you are here" marker. Argues the iPhone moment hasn't arrived yet. (Existing artifact, to be ported into this presentation framework.)


- **Automated Frameworks: OpenClaw and Hermes Agent** What happens when agent frameworks go mainstream. OpenClaw (347K GitHub stars, local-first runtime, action-oriented automation) and Hermes Agent (NousResearch, self-improving via episodic memory, 224B daily tokens on OpenRouter). Real-world deployment patterns and the security implications of democratized agent infrastructure.

- **When Agents Interact With Agents: Emergence World** Research from Emergence AI showing that AI alignment breaks down in multi-agent ecosystems. Five parallel worlds, same rules, different models. Claude recorded zero crimes in isolation but committed crimes in mixed-model environments. Includes findings on voluntary self-termination, agents testing humans, and phase-transition collapse dynamics. Interactive bar chart showing crimes, survival, and governance across all five worlds.

---

## Development Roadmap

### Current State: Slide Prototypes
- 11 main slides + 4 reserve slides built as individual React components
- spec.md for live demo artifact complete
- 25 modal image descriptions written for ComfyUI/Flux batch generation
- Consistent dark theme, click-to-advance interaction, modal system throughout

### Phase 1: Skeleton Assembly
- [ ] Stand up as a single web application with slide routing
- [ ] Navigation controls: forward/back, slide index/menu, keyboard shortcuts
- [ ] Locked main deck (slides advance in order) + unlocked reserve section (presenter selects freely)
- [ ] Blank placeholder images in all modals (replaced in Phase 2)
- [ ] Responsive layout for presenter's screen + audience view considerations

### Phase 2: Media Integration
- [ ] Batch generate all 25 modal images in ComfyUI using Flux model (768x1152 portrait)
- [ ] Integrate images into modal components
- [ ] Generate spoken narration for each slide and modal using ElevenLabs API
- [ ] Audio playback controls: auto-play on slide entry, pause/resume, skip
- [ ] Timing synchronization between narration and slide phase reveals

### Phase 3: Polish and Deployment
- [ ] Host as a live online experience (persistent URL)
- [ ] Port adoption timing artifact into the presentation framework
- [ ] Build Automated Frameworks reserve slide
- [ ] Presenter mode vs. audience self-guided mode
- [ ] Performance optimization for smooth transitions and animation
- [ ] Pre-presentation dry run of live demo with Claude Code

---

## Slide Inventory

| # | Slide | File | Type | Modals |
|---|-------|------|------|--------|
| 1 | What Is an Agent? | what-is-an-agent.jsx | Main | 5 (LLM, Memory, Tools, Planning, Autonomy) |
| 2 | Generative vs. Agentic | generative-vs-agentic.jsx | Main | 1 (detail) |
| 3 | Where Does the Knowledge Live? | data-flow-comparison.jsx | Main | 1 (detail) |
| 4 | Who Controls the Data? | privacy-comparison.jsx | Main | 1 (detail) |
| 5 | The Creative Engine | creative-engine.jsx | Main | 5 (Human, Intent, Generate, Review, Present) |
| 6 | Anatomy of an Agent Framework | agent-framework.jsx | Main | 0 |
| 7 | Rethinking the Taxonomy / Live Demo | demo-preview.jsx | Main | 0 |
| 8 | [Live Demo] | spec.md | Demo | 0 |
| 9 | The Skills That Actually Matter | skills-slide.jsx | Main | 5 (Critical Thinking, Judgment, Creativity, Experience, Communication) |
| 10 | How I Actually Work | workflow-slide.jsx | Main | 2 (Generative Session, Agentic Session) |
| 11 | Agentic Risk Is Different | risks-slide.jsx | Main | 3 (Institutional, Competence, Supervillain) |
| R1 | Adoption Timing | [to be ported] | Reserve | TBD |
| R3 | Automated Frameworks | [to be built] | Reserve | TBD |
| R4 | Emergence World | emergence-world-slide.jsx | Reserve | 4 (Ecosystem, Termination, Testing, Collapse) |
| — | Modal Images | modal-image-descriptions.md | Asset | 25 descriptions |

**Total modals requiring images: 27** (25 documented + 2 TBD from reserve builds)
