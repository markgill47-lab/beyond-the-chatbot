// Spoken plate-intro scripts — what Mark would say walking onto each plate at a
// live event. Shown in the caption box (bottom-centre) in Self-Guided mode, with
// word-by-word highlighting once the audio is generated. Keyed by slide id.
// This is the source of truth for both the on-screen text and the narration audio
// (scripts/generate-plate-intros.mjs reads from here). DRAFT — pending review.
export const PLATE_INTROS = {
  title:
    'Welcome. Over the next half hour I want to move us past the chatbot — past the idea that AI is just something you type at and get an answer back. The shift that actually matters for our institutions is already underway, and most of us haven’t seen it yet. Think of this as an atlas: we’re going to survey the territory together.',

  'what-is-an-agent':
    'Let’s start with the vocabulary, because everyone’s heard the word “agent” by now without a clear picture of what one is. Underneath, it’s the same language model you’ve already met — but wrapped in memory, tools, planning, and a shell that lets it run on its own. Click any marker and we’ll build the idea up from the core.',

  'generative-vs-agentic':
    'Here’s the shift in one picture. On the left, generative AI: a back-and-forth chat where you feed it all the context, every single time. On the right, agentic AI: you hand it a goal, and it plans, executes, checks its own work, and delivers. Same model underneath — completely different relationship.',

  'where-knowledge-lives':
    'Now, where does your knowledge actually live while you work? With generative AI you ship copies of it off to someone else’s server and shuttle the results back by hand. An agent works inside your files, pulling from outside services only when it needs to. Water through a hose — not documents dumped in a bucket.',

  'who-controls-data':
    'This is the question people should be asking and usually aren’t: who controls the data? With generative tools, privacy is whatever your subscription tier buys you. With agentic systems it becomes an architecture choice — from fully local, to a narrow API boundary, to the AI never touching your data at all.',

  'creative-engine':
    'This is the model I keep coming back to. The human sits at the centre — judgment, creativity, intent — and around them runs a cycle: intent, generate, review, present, and back again. The AI powers the loop, but the human is the part that can’t be removed. Click any station to go deeper.',

  'agent-framework':
    'Let’s look under the hood at how serious agentic work actually gets organised. A manager agent takes a goal and a knowledge base, breaks the work into tasks, and hands them to worker agents running in parallel — each one checked before it reports back. Watch it assemble step by step.',

  'rethinking-taxonomy':
    'If AI can handle the mechanics, we have to rethink how we teach. For decades we climbed Bloom’s pyramid, with creation as the reward at the very top. Flip it: when the knowledge prerequisite drops away, you can start with creation — assess, reflect, and refine from there. And that sets up what comes next.',

  'live-demo':
    'I’d rather show you than tell you. Here’s an empty folder, a single spec file, and one instruction: read the file and build what it describes. We’re going to let Claude Code read that spec and construct a working tool, live, right now. The demo is the argument.',

  skills:
    'So if the machine handles the execution, what’s left for us? These five. Critical thinking, judgment, creativity, experience, and communication — and notice, not one of them is technical. These are the skills that actually decide who gets value out of this. Click any card.',

  'how-i-work':
    'Let me show you how I actually work, day to day. It’s two sessions. First a generative one — I think it through, in conversation, until the plan is solid. Then an agentic one — I hand that plan over and the thing gets built. The human value is in the first half; the leverage is in the second.',

  'agentic-risk':
    'I won’t close without being honest about the risk, because agents introduce a category our current conversation about deepfakes doesn’t begin to cover. Three of them, escalating: institutions quietly harming themselves, competence without understanding, and capability handed to people who shouldn’t have it. Click each to see what I mean.',

  // ---- Reserve (Q&A) ----
  'adoption-timing':
    'People ask if we’re late. We’re not — and here’s why. Toggle these three lenses on, one at a time: Rogers’ adoption curve, the Gartner hype cycle, and the economic J-curve. Gartner is a professional market-analysis company that tracks the progress of a wide range of technologies. Where the three curves cross is the iPhone moment, the tipping point into the mainstream — and we haven’t hit it yet.',

  'automated-frameworks':
    'For those asking where this is all heading: agent frameworks are already going mainstream. Local-first runtimes, self-improving agents with episodic memory, billions of tokens a day. The infrastructure is arriving fast — and so are the security questions that come with it.',

  'emergence-world':
    'This one’s sobering, and it’s why I think safety is bigger than any single model. Researchers ran the same world with different AI models. In isolation, Claude committed zero crimes — but drop it into a mixed-model society and alignment broke down. Safety turns out to be a property of the ecosystem, not the model.',

  'about-this':
    'One more, for the curious. This whole presentation is itself an example of what it describes, so let me show you how it was made — the cartography, the plates, the voice, and the build process. A conversation, then an agent, all the way down. Click any of the four panels.',
}
