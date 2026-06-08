# Build Spec: Learning Taxonomy Explorer

Build a single `index.html` file (all CSS and JS inline, no external dependencies) that presents two competing learning taxonomies with an animated toggle between them.

## Overview

This is an interactive educational tool with two modes:

1. **Bloom's Taxonomy** -- the traditional six-level pyramid hierarchy
2. **Creation-First** -- a cyclical, non-hierarchical alternative with four equal stages

A toggle at the top switches between modes. The visual representation should change dramatically between modes: a pyramid for Bloom's, a circular cycle for Creation-First. This visual shift IS the argument -- hierarchy vs. equality.

## Design

- Dark background (#0a0a10), light text (#c8c8d8), bright white (#e8e8f0) for emphasis
- Monospace font for UI: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace
- Serif font for headings: 'Playfair Display', Georgia, serif (load from Google Fonts)
- Smooth CSS transitions on all state changes (0.4s ease minimum)
- Centered layout, max-width 900px, comfortable padding
- No scrolling required on a 1080p screen in default state

## Color Palette

- Bloom's accent: #5a7aaa (muted blue)
- Create stage: #e8a035 (amber)
- Assess stage: #5ab8d8 (cyan)
- Reflect stage: #9a6ad8 (purple)
- Refine stage: #4aba7a (green)
- Surface/card: #12121c
- Borders: #1e1e30
- Dim text: #444466

## The Toggle

A prominent, centered toggle at the top of the visualization area. Two labels: "Bloom's Taxonomy" on the left, "Creation-First" on the right. The active side is highlighted with its accent color. Clicking either side or the toggle itself switches modes. The entire visualization below animates between states.

## Mode 1: Bloom's Taxonomy (Pyramid)

Display the six levels as a centered pyramid of horizontal bars, widest at the bottom, narrowest at the top:

1. **Remember** (bottom, widest) -- Color intensity: lowest
2. **Understand**
3. **Apply**
4. **Analyze**
5. **Evaluate**
6. **Create** (top, narrowest) -- Color intensity: highest

All bars use the Bloom's accent color (#5a7aaa) at varying opacity/intensity. A subtle label on the side indicates "Higher-order thinking" at top and "Lower-order thinking" at bottom.

### Bloom's Click-to-Expand

Clicking any pyramid level expands a panel below the pyramid (or inline, pushing other levels aside) showing three columns:

| Column | Description |
|--------|-------------|
| **Action Verbs** | The standard Bloom's verbs for that level |
| **Example Activities** | Typical classroom activities at this level |
| **Assessment Methods** | How learning is typically assessed |

#### Bloom's Content

**Remember:**
- Verbs: Recall, List, Define, Identify, Name, Memorize, Repeat
- Activities: Flashcards, vocabulary drills, reading assignments, lecture note-taking
- Assessment: Multiple choice tests, fill-in-the-blank, matching exercises, factual quizzes

**Understand:**
- Verbs: Explain, Summarize, Interpret, Classify, Compare, Discuss, Paraphrase
- Activities: Class discussions, concept mapping, written summaries, group explanations
- Assessment: Short answer questions, compare/contrast essays, explain-in-your-own-words prompts

**Apply:**
- Verbs: Use, Implement, Solve, Demonstrate, Execute, Illustrate, Operate
- Activities: Problem sets, case studies, lab exercises, simulations, role-playing
- Assessment: Practical demonstrations, problem-solving tasks, applied projects

**Analyze:**
- Verbs: Compare, Contrast, Examine, Differentiate, Organize, Deconstruct, Categorize
- Activities: Data analysis, literary analysis, debate preparation, systems diagramming
- Assessment: Analytical essays, case study breakdowns, research critiques

**Evaluate:**
- Verbs: Judge, Critique, Assess, Justify, Defend, Prioritize, Recommend
- Activities: Peer review, editorial writing, thesis defense preparation, policy analysis
- Assessment: Argumentative essays, evaluation rubrics applied to others' work, recommendation reports

**Create:**
- Verbs: Design, Construct, Produce, Develop, Compose, Invent, Formulate
- Activities: Original research, creative projects, prototype building, business plan creation
- Assessment: Portfolio review, project presentations, original work evaluation

Only one level expands at a time. Clicking an expanded level collapses it.

## Mode 2: Creation-First (Cycle)

Display four stages as equal-sized nodes arranged in a circle, connected by a circular path with directional indicators showing the cycle flow. The center of the circle contains the text "No Hierarchy" in subdued styling.

The four stages, equally sized and equally spaced:

1. **Create** (top, amber #e8a035) -- "Start by making something"
2. **Assess** (right, cyan #5ab8d8) -- "Evaluate what you made"
3. **Reflect** (bottom, purple #9a6ad8) -- "Understand why it works"
4. **Refine** (left, green #4aba7a) -- "Improve through iteration"

Each node is a circle with the stage name inside, its accent color as the border, and a subtle tagline near it. Directional dots or arrows on the connecting ring show clockwise flow: Create -> Assess -> Reflect -> Refine -> back to Create.

### Creation-First Click-to-Expand

Clicking any stage node expands a detail panel showing four categories in a grid or card layout. Each category has a distinct icon or marker:

| Category | Description |
|----------|-------------|
| **What the learner does** | The primary learner activity |
| **What AI enables** | How AI makes this stage possible from day one |
| **What the instructor does** | The shifted role of the educator |
| **What evidence emerges** | Observable learning outcomes |

#### Creation-First Content

**Create:**
- What the learner does: Produces an artifact from day one. A draft, prototype, composition, design, or working model. No prerequisite knowledge required to begin.
- What AI enables: Fills knowledge gaps in real time, provides scaffolding and starting points, handles mechanical complexity so the learner focuses on intent and decisions.
- What the instructor does: Defines the problem space, sets creative constraints, curates prompts and starting conditions that make productive creation possible.
- What evidence emerges: The artifact itself, the decisions made during creation, the questions the learner asked, the creative direction chosen.

**Assess:**
- What the learner does: Evaluates their own creation against criteria. Compares with peers. Identifies what works, what doesn't, and what they don't yet understand.
- What AI enables: Provides structured feedback against rubrics, surfaces blind spots the learner can't see, compares work against standards or exemplars.
- What the instructor does: Provides assessment frameworks and rubrics, facilitates peer review, models how experts evaluate work in this domain.
- What evidence emerges: Self-evaluation accuracy, ability to apply criteria, specificity of gap identification, quality of questions asked.

**Reflect:**
- What the learner does: Articulates what worked and why. Connects process to outcomes. Identifies what they learned through making that they didn't know before.
- What AI enables: Prompts deeper analysis with targeted questions, surfaces patterns across iterations, documents growth over time, connects to broader concepts.
- What the instructor does: Asks probing questions, connects individual learning moments to course-level concepts, helps learners see their own growth.
- What evidence emerges: Metacognitive depth, conceptual connections made, ability to articulate learning, awareness of growth trajectory.

**Refine:**
- What the learner does: Returns to the artifact and improves it. Applies insights from assessment and reflection. Targets specific elements for improvement.
- What AI enables: Suggests targeted improvements, handles mechanical refinements, enables rapid iteration cycles, lowers the cost of experimentation.
- What the instructor does: Provides targeted guidance, raises the bar with new constraints or challenges, introduces adjacent concepts that deepen the work.
- What evidence emerges: Quality delta between iterations, specificity and intentionality of improvements, integration of feedback, willingness to restructure rather than just polish.

Only one stage expands at a time. Clicking an expanded stage collapses it.

## Animation Requirements

- Toggle between modes: the pyramid should fade/scale out while the cycle fades/scales in (or a creative morph transition)
- Expand/collapse panels: smooth height animation, content fades in after panel reaches size
- Node hover states: subtle glow or scale on the clickable elements
- The cycle ring should have a subtle animated element (rotating dot, pulsing connection) to convey continuous motion
- All transitions should feel polished, not abrupt

## Responsive

Should look good at 1280px and above. Reasonable behavior at 1024px. Does not need to be mobile-optimized (this is a presentation tool).

## Important Notes

- This is a SINGLE index.html file. All CSS in a style tag. All JS in a script tag. Google Fonts loaded via link tag is the only external resource.
- No frameworks. Vanilla HTML, CSS, and JavaScript only.
- The tool should feel like a polished, professional interactive -- not a homework assignment.
- Accessibility: clickable elements should have cursor:pointer and visible focus states.

## When Complete

Open the finished index.html in the default browser automatically.
