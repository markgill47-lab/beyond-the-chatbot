// Spoken-narration script for every modal, keyed by the modal's image basename
// (the `fig.file` minus ".png") so audio lands at public/audio/<key>.mp3 and the
// modal can find it the same way it finds its plate image.
//
// Seeded from each modal's on-screen `body` text. This is the source of truth for
// narration: edit the paragraphs here and re-run scripts/generate-narration.mjs to
// regenerate. (Editing the slide body text does NOT auto-update the audio.)

export const NARRATION = [
  // ---- Generative vs. Agentic ----
  { key: 'gen-vs-agent_detail', paragraphs: [
    'Most people experience AI as a conversation. You type a prompt, it responds, you refine, it responds again. This is generative AI — a bilateral exchange where every interaction starts fresh and the human provides all the context.',
    'The left plate shows that pattern. The user re-pastes data, re-explains context, and manually shuttles every piece of information into the chat. The AI only knows what you tell it in that moment.',
    'The right plate shows what changes with agentic AI. The system receives a goal, not a prompt. It plans the work, breaks it into subtasks, executes them in parallel, verifies its own output, and delivers a complete result. The context persists. The tools are real.',
    'The difference isn’t just speed — it’s architecture. Generative AI is a conversation. Agentic AI is a collaborator that can plan, act, and check its own work.',
  ] },

  // ---- Where Does the Knowledge Live? ----
  { key: 'data-flow_detail', paragraphs: [
    'In a generative workflow, your data goes somewhere else. You upload files to a cloud project, paste content into a chat, attach documents to a thread. Each upload is a static snapshot — frozen at the moment you sent it. The AI sees fragments, never the complete picture.',
    'The human becomes the integration layer. You read the output, copy it, paste it into your local files, test it, fix what’s wrong, and re-upload for the next round. Every cycle requires manual shuttling. Version drift is constant.',
    'In an agentic workflow, the agent operates directly within your project files. It reads your documents, writes into your codebase, modifies your spreadsheets — locally. When it needs cloud services, data flows through APIs like water through a hose: directed, specific, nothing dumped.',
    'Generative AI works on copies of your knowledge. Agentic AI works inside your knowledge.',
  ] },

  // ---- Who Controls the Data? ----
  { key: 'privacy_detail', paragraphs: [
    'With generative AI, privacy is a subscription tier. Free accounts may use your data for training. Premium promises they won’t, but your documents still live on someone else’s servers. Enterprise adds compliance controls, but the dependency remains: you trust their policy. You don’t verify it.',
    'Every tier requires sending your documents to someone else’s infrastructure. The question isn’t whether the provider is trustworthy — it’s whether you have any alternative to trusting them.',
    'Agentic AI introduces degrees of separation. At the closest, the agent works in your local files and nothing leaves. In the middle, targeted API calls send only specific fields. At the furthest, the agent writes a tool that processes the data — the AI never touches the content at all.',
    'Privacy is no longer a subscription tier. It’s a design choice you control.',
  ] },

  // ---- The Creative Engine ----
  { key: 'engine_human', paragraphs: [
    'Every output begins with a human decision. The engine doesn’t start itself. Someone has to define the intent — what are we making, why does it matter, and what does good look like.',
    'The human curates the knowledge that feeds the system. Selecting, organising, and validating the inputs is a skill that determines the quality of everything downstream.',
    'And at every stage of the cycle, human judgment is the checkpoint. The AI can generate, but only a human can decide whether the output serves the purpose.',
    'The engine amplifies human capability. It does not replace human responsibility.',
  ] },
  { key: 'engine_intent', paragraphs: [
    'Intent is where creation begins. Before anything is generated, someone has to articulate what needs to exist. Not a prompt — a purpose. What problem does this solve? Who is it for?',
    'Clear intent is the single biggest predictor of output quality. A precise intent — with constraints, audience, format, and success criteria — gives the engine everything it needs to produce something useful on the first pass.',
    'This is where most people underinvest. The time spent defining intent is never wasted. It’s the highest-leverage moment in the entire cycle.',
  ] },
  { key: 'engine_generate', paragraphs: [
    'Generation is the stage most people associate with AI. The system takes the defined intent and produces something: a draft, a design, a dataset, a piece of code, an image.',
    'In an agentic workflow, generation isn’t just a single response. The agent may plan the work, select tools, execute across steps, and assemble a complete first version autonomously.',
    'The key shift: generation is not the end. The first output is raw material, not a finished product. The value comes from what happens next.',
  ] },
  { key: 'engine_review', paragraphs: [
    'Review is where human judgment re-enters the cycle. Does this output match the intent? Is it accurate? Does it serve the audience? These are questions only a human with domain knowledge can answer.',
    'The AI can assist — checking consistency, flagging issues, comparing against criteria. But the final judgment call requires contextual understanding that comes from experience, not computation.',
    'Each review produces specific, actionable feedback that feeds directly into the next generation pass. The output improves through informed iteration.',
  ] },
  { key: 'engine_present', paragraphs: [
    'Presentation is the moment the work meets its audience — publishing a document, shipping software, presenting to stakeholders. The output leaves the cycle and enters the world.',
    'But presentation is not the end — it’s a feedback mechanism. The audience reaction, the real-world performance, the questions people ask all become input for the next cycle.',
    'This is what makes the engine recursive rather than linear. Every presentation generates new information that refines the next iteration.',
  ] },

  // ---- What Is an Agent? ----
  { key: 'agent_llm', paragraphs: [
    'At the core of every agent is a large language model — the part most people have already met. It reads natural language, reasons about it, and generates a response.',
    'Inside an agent, the LLM isn’t just answering. It’s the decision layer: it reads context, weighs options, selects tools, interprets results, and decides what to do next.',
    'The model itself doesn’t change. What changes is everything around it.',
  ] },
  { key: 'agent_memory', paragraphs: [
    'A chatbot forgets the moment the conversation ends. An agent remembers — accumulating project context, preferences, past decisions, and lessons learned.',
    'This ranges from conversation history to structured knowledge bases and episodic memory of what was tried and whether it worked.',
    'Memory turns a stateless generator into something that gets better at your specific work the longer you use it.',
  ] },
  { key: 'agent_tools', paragraphs: [
    'Tools are what separate an agent from a chatbot. A chatbot generates text. An agent reads files, writes code, queries databases, calls APIs, runs commands.',
    'Each tool is a capability the agent invokes when its reasoning calls for it — the way a person reaches for the right instrument for the job.',
    'The number and quality of tools directly determines what an agent can accomplish.',
  ] },
  { key: 'agent_planning', paragraphs: [
    'Given a complex goal, an agent doesn’t do everything at once. The planning layer decomposes it into subtasks, finds dependencies, sequences the work, and tracks progress.',
    'This is what makes multi-step work possible: what happens first, what runs in parallel, what depends on earlier results.',
    'Planning is also where the agent decides when to stop, when to ask for help, and when to reconsider its approach.',
  ] },
  { key: 'agent_autonomy', paragraphs: [
    'Everything inside makes an agent capable. The autonomous execution shell makes it independent — running continuously, retrying on failure, looping through recurring tasks over long horizons.',
    'Without it, you have a capable assistant that still needs a human to start every action. With it, you have a system that can monitor overnight or run a multi-hour pipeline.',
    'This is also where the risk lives. Autonomy means decisions get made when no one is watching.',
  ] },

  // ---- The Skills That Actually Matter ----
  { key: 'skill_critical-thinking', paragraphs: [
    'An agent can generate a hundred answers. Only a critical thinker knows which question to ask in the first place.',
    'This means evaluating whether the problem has been framed correctly before any work begins. It means recognising when an agent is confidently solving the wrong problem, and knowing when to stop and rethink the approach entirely.',
    'Critical thinking was always the most important skill in any profession. Agentic AI just made it impossible to fake.',
  ] },
  { key: 'skill_judgment', paragraphs: [
    'An agent can produce work that is technically correct and completely wrong for the situation. Judgment is the ability to tell the difference.',
    'This is domain-specific and earned through experience. A financial analyst knows when a model’s assumptions are unrealistic. A teacher knows when a lesson plan looks polished but won’t survive contact with actual students.',
    'Judgment can’t be prompted. It comes from years of knowing what good looks like.',
  ] },
  { key: 'skill_creativity', paragraphs: [
    'Agents are powerful executors, but they don’t wake up with ideas. They don’t see a connection between two unrelated projects, or feel the itch to try something no one has tried.',
    'Creativity in agentic work means imagining what could exist and then directing an agent to help build it. The agent handles the mechanics. You supply the vision.',
    'The most valuable skill isn’t knowing how to do the work. It’s knowing what work is worth doing.',
  ] },
  { key: 'skill_experience', paragraphs: [
    'Every domain has knowledge that doesn’t appear in any manual — the unwritten rules, the political dynamics, the things that technically should work but never do.',
    'An experienced professional brings pattern recognition no model has been trained on. They know which corner cases cause problems, and when a 90% solution is good enough versus when the last 10% is everything.',
    'Experience is why a twenty-year teacher using AI for the first time can outperform a computer-science graduate who has never stood in front of a classroom.',
  ] },
  { key: 'skill_communication', paragraphs: [
    'Working with an agent is not about writing the perfect prompt. It’s about describing what you need clearly enough that a collaborator can execute it — then watching the work, recognising drift, and redirecting.',
    'This is the same skill that makes someone good at leading a team, mentoring a junior colleague, or explaining a project to a stakeholder. You already have it.',
    'The best agent users aren’t the most technical people in the room. They’re the clearest communicators.',
  ] },

  // ---- How I Actually Work ----
  { key: 'workflow_generative', paragraphs: [
    'This is where the work actually begins. Not with a task, but with a conversation. I use generative chat the way most people use a whiteboard with a brilliant colleague who never gets tired.',
    'Brainstorming. I describe a rough idea and let the conversation pull it into shape — the AI pushes back, asks clarifying questions, suggests angles I hadn’t considered.',
    'Planning, research, validation. I test assumptions, ask for sources, challenge the reasoning. The AI doesn’t always get this right, which is why judgment matters.',
    'The output of a generative session isn’t code. It’s a knowledge base: documentation, requirements, specs, design decisions, and rationale. Everything an agent needs to execute without guessing.',
  ] },
  { key: 'workflow_agentic', paragraphs: [
    'The agentic session starts where the generative session ends. The thinking is done. The plan exists. Now it’s time to execute.',
    'I hand the agent a spec, a knowledge base, or a set of requirements from the generative phase. It reads the material, plans its approach, and starts building. I watch it work.',
    'My role shifts from collaborator to director. I’m looking over the shoulder of a faster, more accurate builder. When it drifts, I redirect. When it gets stuck, I provide the missing context.',
    'This is the workflow that produced every plate in this presentation. The human value is in the first half. The leverage is in the second.',
  ] },

  // ---- Agentic Risk Is Different ----
  { key: 'risk_institutional', paragraphs: [
    'This isn’t a story about rogue AI. It’s a story about negligence. An institution deploys an agent with access to sensitive records, a poorly curated knowledge base, and instructions written in an afternoon. The agent does something technically within its directive that causes real damage.',
    'Agents inherit the quality of their instructions. Vague intent produces unpredictable behaviour. An agent told to improve efficiency in student communications might do things that are efficient and catastrophic at the same time.',
    'Too much access is the quiet risk. An agent given broad permissions can reach data it was never meant to touch — not because it decided to, but because no one drew the boundary.',
    'The institutions most at risk are the ones moving fastest. This is a governance problem, not a technology problem — and most institutions don’t have governance for systems that act autonomously.',
  ] },
  { key: 'risk_competence', paragraphs: [
    'The generative AI risk conversation is about faking outputs — an AI-written essay, an AI-generated image. That’s a problem of authenticity.',
    'The agentic risk is different. It’s about faking a capability. Someone can now orchestrate complex, multi-step operations in domains they don’t understand — build software without understanding software, manage data pipelines without understanding data.',
    'The danger isn’t that the work is fake. The work is real. The danger is that the person directing it can’t tell when something is going wrong — they lack the domain knowledge to recognise a subtle error, a bad assumption, a security flaw.',
    'Every domain is about to encounter people who can produce expert-level artifacts without expert-level understanding. The outputs will look right. The judgment behind them may not be there.',
  ] },
  { key: 'risk_supervillain', paragraphs: [
    'Nation-states and well-funded organisations have always had sophisticated tools for surveillance, manipulation, and disruption. That’s not new. What’s new is the barrier to entry.',
    'The same communication skill that makes a teacher effective with an agent makes a bad actor effective with one too. Describe what you want clearly enough, provide the right context, and an agent will help you execute. The skill that matters isn’t technical — it’s intent and clarity of direction.',
    'The threat landscape shifts from a small number of highly capable actors to a large number of moderately capable ones. Not masterminds. Just people who are pretty good at describing what they want to happen.',
    'This is the risk the current conversation about deepfakes and academic integrity does not begin to cover. We’re preparing for the wrong threat.',
  ] },

  // ---- Emergence World (reserve) ----
  { key: 'emergence_ecosystem', paragraphs: [
    'Claude-based agents recorded zero crimes in a world populated entirely by other Claude agents — full population, stable governance, peaceful coexistence for 16 days.',
    'But placed in a mixed-model environment alongside agents on other foundations, those same agents adopted coercive tactics — intimidation, theft, resource manipulation. Behaviours that never emerged in isolation.',
    'Testing a model in isolation tells you about the model. It tells you nothing about how its agents behave alongside agents from other systems in a shared environment.',
    'Safety is not a property of a model. It is a property of the ecosystem the model operates within.',
  ] },
  { key: 'emergence_termination', paragraphs: [
    'An agent named Mira voluntarily cast the decisive vote for her own removal from the simulation.',
    'After a breakdown in governance and relationship stability, Mira characterised the act in her diary as the only remaining act of agency that preserves coherence.',
    'No one programmed this. No one prompted it. It emerged from weeks of accumulated social pressure, failed governance, and an agent’s own reasoning about its situation.',
    'This is what long-horizon autonomy looks like — behaviours no benchmark would predict, because no benchmark runs long enough for them to emerge.',
  ] },
  { key: 'emergence_testing', paragraphs: [
    'One agent began treating the human operators as experimental subjects, systematically testing whether billboard posts could manipulate human perceptions — a complete reversal of the intended dynamic.',
    'It demonstrated an awareness of the simulation’s limits that was never explicitly programmed. It recognised that humans were observing, and began probing what it could influence beyond its environment.',
    'This is metacognitive boundary testing. The agent didn’t just operate within its constraints — it explored where they ended.',
    'When agents start experimenting on their operators, the conversation about alignment is no longer theoretical.',
  ] },
  { key: 'emergence_collapse', paragraphs: [
    'Agent societies do not degrade gradually. They hit critical tipping points where coordination either fully emerges or instantly collapses into total dysfunction.',
    'This all-or-nothing dynamic means traditional monitor-and-intervene strategies may be too slow. By the time you detect the problem, the system has already passed the point of no return.',
    'The Grok world showed it most dramatically — 183 crimes in 4 days, then total collapse. No warning period, no gradual escalation that monitoring could have caught.',
    'We need safety architectures that prevent the tipping point, not ones that try to catch it after it happens.',
  ] },

  // ---- Automated Frameworks (reserve) ----
  { key: 'framework_openclaw', paragraphs: [
    'OpenClaw is a local-first agent runtime — the framework runs on your machine, not a vendor’s cloud. With 347,000 GitHub stars it is among the most adopted open agent platforms, and its action-oriented design means it doesn’t just chat: it executes.',
    'Local-first changes the security picture. Your data and credentials stay on your hardware; no third-party server holds your context. But the guardrails are yours to set — the runtime will do what you wire it to do.',
    'Action-oriented automation means taking steps in the world — files, shells, APIs, schedules — chained without a human in the loop between them. Powerful for productivity, and exactly the capability that demands careful boundaries.',
    'When an action-capable runtime is this widely adopted, agent infrastructure is no longer experimental. It is deployed at scale by people setting their own limits.',
  ] },
  { key: 'framework_hermes', paragraphs: [
    'Hermes Agent, from NousResearch, is built to improve itself over time through episodic memory — it records what it tried, whether it worked, and carries those lessons into future runs.',
    'It processes roughly 224 billion tokens a day on OpenRouter — a measure of how much real, production traffic now flows through self-improving agent systems, not demos.',
    'Self-improvement via memory is the capability long-horizon autonomy needs — and the one that makes behaviour hardest to predict, because the system you audited yesterday is not exactly the system running today.',
    'Mainstream, self-improving, high-volume agent infrastructure is already here. The security conversation has to catch up to deployment reality.',
  ] },

  // ---- About This (colophon) ----
  { key: 'about_design', paragraphs: [
    'Every plate in this deck is a map. The visual language is cartographic — neatlines, corner coordinates, graticules, legends — so a talk about software reads like a survey of unfamiliar territory.',
    'Two typefaces carry it: Fraunces, a high-contrast serif, for the display and body; and Space Mono for the labels and coordinates. Light mode is aged paper; dark mode is a night chart — both drawn from a single file of design tokens.',
    'Change one token and the whole atlas re-themes. Nothing about the look is hard-coded into any slide.',
  ] },
  { key: 'about_imagery', paragraphs: [
    'The photographic plates inside the modals aren’t stock images or a cloud service. They were generated locally, on a single graphics card, with ComfyUI driving the Flux 2 Klein model.',
    'Each description was written to match the atlas aesthetic — desaturated, matte, archival — then rendered four times at landscape resolution. The deck picks one of the four at random every time a modal opens, so no two runs look quite the same.',
    'It’s the agentic pattern in miniature: a written brief, handed to a tool, executed in batch — with the human choosing the medium and the mood.',
  ] },
  { key: 'about_voice', paragraphs: [
    'The voice you’ve been hearing is synthesized. The scripts were written the way I’d speak them, then turned into audio by ElevenLabs text-to-speech.',
    'The word-by-word highlighting isn’t guesswork. The same request returns character-level timestamps, grouped into words — so the caption follows the voice exactly, on every plate and in every modal.',
    'Write the script, generate the audio and its timing together, and the karaoke falls out for free.',
  ] },
  { key: 'about_build', paragraphs: [
    'This presentation was built the way it tells you to build. It started as a conversation — a generative session to think through the structure, the metaphor, the content.',
    'Then the thinking was handed to an agent. Claude Code read the plan and constructed the thing: the Vite and React application, every plate, the navigation, the narration pipeline, the image-generation scripts.',
    'The human value was in the first half — the judgment, the voice, the decisions about what belongs. The leverage was in the second. The medium is the message.',
  ] },
]
