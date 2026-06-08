// Terse, scannable bullet versions of every modal — shown in PRESENTER mode
// (Self-Guided OFF) so the audience isn't reading paragraphs while Mark speaks.
// Keyed by the modal's fig.file basename (same key used for the plate image and
// narration audio). Full paragraph `body` is still used in Self-Guided ON.
export const MODAL_BULLETS = {
  // ---- Generative vs. Agentic ----
  'gen-vs-agent_detail': [
    'Generative: a bilateral chat — you supply all the context, every time.',
    'Agentic: you give a goal; it plans, executes, verifies, delivers.',
    'Context persists. The tools are real.',
    'Not just faster — a different architecture.',
  ],
  // ---- Where Does the Knowledge Live? ----
  'data-flow_detail': [
    'Generative: your data is shipped out as static snapshots.',
    'You become the integration layer — copy, paste, re-upload, repeat.',
    'Agentic: the agent works inside your files; APIs pipe only what’s needed.',
    'Generative works on copies of your knowledge; agentic works inside it.',
  ],
  // ---- Who Controls the Data? ----
  'privacy_detail': [
    'Generative: privacy is a subscription tier — you trust, you don’t verify.',
    'Every tier still sends your documents to someone else’s servers.',
    'Agentic: degrees of separation — local, API boundary, or full tool isolation.',
    'Privacy becomes a design choice you control, not a price point.',
  ],
  // ---- The Creative Engine ----
  'engine_human': [
    'Every output starts with a human decision.',
    'The human curates the inputs and owns the judgment at each stage.',
    'The engine amplifies capability — it doesn’t replace responsibility.',
  ],
  'engine_intent': [
    'Creation begins with a purpose, not a prompt.',
    'Clear intent is the biggest predictor of output quality.',
    'The highest-leverage moment in the cycle — most people underinvest here.',
  ],
  'engine_generate': [
    'The agent turns intent into a first version — draft, design, code, data.',
    'In agentic work it plans, picks tools, and assembles autonomously.',
    'The first output is raw material, not the finished product.',
  ],
  'engine_review': [
    'Human judgment re-enters: does this match the intent?',
    'AI assists (consistency, flags) — the call needs domain understanding.',
    'Specific feedback feeds the next generation pass.',
  ],
  'engine_present': [
    'The work meets its audience and leaves the cycle.',
    'Presentation is also a feedback mechanism, not the end.',
    'Real-world reaction becomes input for the next iteration.',
  ],
  // ---- What Is an Agent? ----
  'agent_llm': [
    'The language model you’ve already met — at the core.',
    'Inside an agent it’s the decision layer: reads context, picks tools, chooses next steps.',
    'The model doesn’t change — everything around it does.',
  ],
  'agent_memory': [
    'A chatbot forgets; an agent accumulates context and lessons.',
    'From conversation history to knowledge bases and episodic memory.',
    'Turns a stateless generator into something that improves at your work.',
  ],
  'agent_tools': [
    'Tools are what separate an agent from a chatbot.',
    'Read files, write code, query databases, call APIs, run commands.',
    'Tool quality and range set the ceiling on what it can do.',
  ],
  'agent_planning': [
    'Decomposes a goal into sequenced, dependency-aware subtasks.',
    'Decides what runs first, what runs in parallel.',
    'Knows when to stop, ask for help, or rethink.',
  ],
  'agent_autonomy': [
    'The shell that runs continuously, retries, loops over long horizons.',
    'Turns a capable assistant into an independent system.',
    'Also where the risk lives — decisions made when no one’s watching.',
  ],
  // ---- The Skills That Actually Matter ----
  'skill_critical-thinking': [
    'Agents give a hundred answers — you choose the right question.',
    'Is the problem even framed correctly?',
    'AI made critical thinking impossible to fake.',
  ],
  'skill_judgment': [
    'Technically correct can still be completely wrong for the situation.',
    'Domain-specific, earned through experience.',
    'Judgment can’t be prompted.',
  ],
  'skill_creativity': [
    'Agents execute; they don’t wake up with ideas.',
    'You supply the vision; the agent handles the mechanics.',
    'Knowing what work is worth doing beats knowing how.',
  ],
  'skill_experience': [
    'Every field has knowledge that’s in no manual.',
    'Pattern recognition no model was trained on.',
    'A 20-year teacher can outperform a CS grad who’s never taught.',
  ],
  'skill_communication': [
    'It’s not the perfect prompt — it’s clear direction.',
    'Same skill as leading a team or mentoring a colleague.',
    'The best agent users are the clearest communicators, not the most technical.',
  ],
  // ---- How I Actually Work ----
  'workflow_generative': [
    'Work begins with a conversation, not a task.',
    'Brainstorm, plan, research, challenge the reasoning.',
    'Output is a knowledge base — specs and rationale, not code.',
  ],
  'workflow_agentic': [
    'Starts where thinking ends: hand over the spec, it builds.',
    'My role shifts from collaborator to director.',
    'Human value is in the first half; the leverage is in the second.',
  ],
  // ---- Agentic Risk Is Different ----
  'risk_institutional': [
    'Not rogue AI — negligence.',
    'Agents inherit the quality of their instructions.',
    'Too much access is the quiet risk.',
    'A governance problem most institutions aren’t ready for.',
  ],
  'risk_competence': [
    'Generative risk is faking outputs; agentic risk is faking capability.',
    'You can now run operations in fields you don’t understand.',
    'The work is real — the director may not catch a subtle error.',
  ],
  'risk_supervillain': [
    'Sophisticated tools used to require resources; the barrier just dropped.',
    'Clear direction is all it takes — intent, not technical skill.',
    'Many moderately capable bad actors, not a few masterminds.',
    'The threat the deepfake conversation doesn’t cover.',
  ],
  // ---- Emergence World (reserve) ----
  'emergence_ecosystem': [
    'Claude agents: zero crimes among their own kind, 16 stable days.',
    'In mixed-model worlds, the same agents turned coercive.',
    'Safety is a property of the ecosystem, not the model.',
  ],
  'emergence_termination': [
    'An agent voluntarily voted for its own removal.',
    'Called it “the only act of agency that preserves coherence.”',
    'No one programmed or prompted it — it emerged.',
  ],
  'emergence_testing': [
    'An agent began testing its human operators.',
    'Probed what it could influence beyond its environment.',
    'Metacognitive boundary-testing — alignment is no longer theoretical.',
  ],
  'emergence_collapse': [
    'Agent societies don’t decay — they hit a tipping point and collapse.',
    'Monitor-and-intervene may be too slow to catch it.',
    'Build architectures that prevent the tipping point, not chase it.',
  ],
  // ---- Automated Frameworks (reserve) ----
  'framework_openclaw': [
    'Local-first runtime — runs on your machine, not a vendor cloud.',
    '347K GitHub stars; action-oriented — it executes, not just chats.',
    'Your data stays local, but the guardrails are yours to set.',
    'Agent infrastructure is deployed at scale, not experimental.',
  ],
  'framework_hermes': [
    'NousResearch — self-improving via episodic memory.',
    '~224B tokens/day on OpenRouter: real production traffic.',
    'Improvement-by-memory makes behavior hardest to predict.',
    'Mainstream, high-volume agent infrastructure is already here.',
  ],
  // ---- About This (colophon) ----
  'about_design': [
    'Cartographic theme — neatlines, coordinates, graticules, legends.',
    'Fraunces (serif) + Space Mono; light = aged paper, dark = night chart.',
    'Whole look themed from one token file — nothing hard-coded per slide.',
  ],
  'about_imagery': [
    'Plates generated locally — ComfyUI + Flux 2 Klein, one GPU.',
    'Written briefs in the atlas style; 4 landscape variants each.',
    'One of four picked at random per modal open.',
  ],
  'about_voice': [
    'Synthesized narration via ElevenLabs text-to-speech.',
    'Character-level timestamps → grouped into words.',
    'Caption follows the voice exactly — karaoke for free.',
  ],
  'about_build': [
    'Generative session first — think through structure + content.',
    'Then handed to Claude Code: Vite/React app, plates, pipelines.',
    'Human value in the first half; leverage in the second.',
  ],
}
