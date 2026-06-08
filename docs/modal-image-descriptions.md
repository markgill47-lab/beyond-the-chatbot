# MNGIA Presentation — Modal Image Descriptions

All images for the "Beyond the Chatbot" presentation modals. Designed for batch generation in ComfyUI using the Flux model, and styled to live inside the presentation's locked **Cartographic / Atlas** theme: each image should read as a **desaturated photographic plate pasted into an antique survey atlas** — matte, paper-toned, analog. Subjects and compositions are unchanged from the original brief; only the medium, lighting, and palette were revised to fit the Atlas aesthetic.

## Generation Notes

**Flux best practices applied throughout:**
- Natural prose prompts, not keyword lists (Flux's VLM architecture responds best to descriptive sentences)
- 40–70 words per prompt — within the 30–80 word sweet spot
- Subject front-loaded in every prompt
- Soft, specific lighting, camera angle, and mood in each description
- Portrait orientation: **768 × 1152** (2:3 ratio) recommended for all images

**Consistent visual language across all images (Atlas theme):**
- **Medium:** documentary photography rendered as a **desaturated, matte plate**, as if reproduced in a printed atlas or field journal. Not glossy, not cinematic, not high-contrast.
- **Palette:** aged-paper cream and sepia ink as the base, with **one muted survey accent per image** drawn from vermilion (#b5532e), water-blue (#6b94a6), forest-green (#6f8a5c), or elevation-brown (#9c7a4d).
- **Lighting:** soft, even, gently directional — overcast field light, or a calm window or lamp. Avoid dramatic spotlights, chiaroscuro, and glow.
- **Background:** pale and paper-toned, uncluttered. **Never pure black.** The subject sits in a real but muted environment.
- **Depth of field:** moderate. Subject clearly read, but flatter and more archival than glossy bokeh isolation.
- **Texture:** subtle paper grain is welcome.
- **Tone:** human, grounded, analog, timeless — not sci-fi, not dystopian. The subjects are instruments, craft, archives, and fieldwork, which suit the atlas naturally.
- **Composition:** centered with breathing room. The app frames each image with a neatline border and a `Fig. 0X` caption, so leave margins and include **no text, captions, or UI in the image itself**.

**Suggested negative prompt (apply globally):**
cartoon, anime, illustration, 3d render, neon, glow, lens flare, oversaturated, glossy, high contrast, pure black background, dramatic spotlight, cold electronic glow, screen glow, text overlay, watermark, blurry, distorted hands, extra fingers, low quality

**Note on accents:** the single named accent per image keeps the batch coherent with the Atlas palette. Where an image names a color (e.g. "a vermilion accent"), treat it as the one saturated note against an otherwise desaturated, paper-toned frame.

---

## Slide: Generative vs. Agentic AI

### Detail Modal

**Filename:** `gen-vs-agent_detail.png`

A person seated at a wide wooden desk between two contrasting workspaces, photographed for an archival plate. On the left, scattered printed pages, sticky notes, and an open notebook in disarray; on the right, a single tidy ledger of neatly ruled, interconnected diagrams. Soft, even daylight from a tall window. Muted sepia and cream tones with one faded vermilion accent. Matte, desaturated, flat archival field, shot from slightly above and behind the person.

---

## Slide: Where Does the Knowledge Live?

### Detail Modal

**Filename:** `data-flow_detail.png`

A person's hands holding a glass specimen jar filled with crumpled paper documents, tilted as if about to pour them out. Behind, a softly blurred wall of wooden archive drawers in muted sepia — not cold servers. Gentle directional daylight catches the jar; aged-paper cream and ink tones with a single water-blue accent. Matte, desaturated, archival photographic plate, hands centered in frame, moderate depth of field. The gesture suggests releasing control.

---

## Slide: Who Controls the Data?

### Detail Modal

**Filename:** `privacy_detail.png`

A close-up portrait of a person looking directly at the camera, holding a small brass skeleton key close to their chest. Behind them, a frosted glass panel with the blurred shapes of folders and survey documents. Soft, even sidelight in muted cream and sepia, the brass catching a warm elevation-brown highlight. Desaturated, matte, archival photographic plate, intimate and contemplative, the background pale and paper-toned.

---

## Slide: The Creative Engine

### Human (Center Modal)

**Filename:** `engine_human.png`

A conductor standing at a podium in a quiet rehearsal hall, hands raised mid-gesture, eyes focused and intent. Around them, the softened shapes of instruments and music stands suggest an orchestra just out of frame. Even, gentle overhead light rather than a dramatic spotlight, in muted sepia and cream with a single vermilion accent at the podium. Shot from a low angle, dignified and timeless. Desaturated, matte, archival photographic plate.

### Intent

**Filename:** `engine_intent.png`

An architect leaning over a drafting table, one hand pressing a large blueprint flat while the other holds a pencil mid-mark. A drafting lamp casts a soft, even pool of light across the ruled paper; the calm room stays uncluttered. Muted cream, sepia, and faded blueprint-blue tones. Shot from the side at table height, emphasizing the deliberate act of drawing a plan. Desaturated, matte, archival photographic plate.

### Generate

**Filename:** `engine_generate.png`

A potter's hands drawing a vessel up from wet clay on a spinning wheel, caught mid-motion with a touch of blur on the turning clay. Soft, even workshop light catches the wet surface and the texture of the hands. Muted earth tones — aged cream, sepia, elevation-brown — with shelves of finished pieces softened behind. Close-up composition, portrait orientation. Desaturated, matte, archival photographic plate; raw creation, the first form emerging from material.

### Review

**Filename:** `engine_review.png`

A jeweler examining a gemstone through a loupe, one eye closed in concentration, the other magnified by the lens. A small bench lamp gives soft, even illumination, with faint reflections across the workbench. Muted sepia and cream tones with a single cool water-blue accent in the stone. Moderate depth of field, the stone and eye clearest in frame. Desaturated, matte, archival photographic plate — precise, careful evaluation of quality.

### Present

**Filename:** `engine_present.png`

A person standing at an open gallery doorway, framed against soft light spilling from the exhibition space beyond, where blurred framed works and a few visitors are visible. Captured from behind, mid-stride into the room. Muted cream and sepia tones, a gentle warm glow ahead rather than a dramatic flare, with a faded forest-green accent in the foreground corridor. Portrait composition. Desaturated, matte, archival photographic plate — the threshold of putting work into the world.

---

## Slide: What Is an Agent?

### Language Model

**Filename:** `agent_llm.png`

An extreme close-up of a human eye, the iris sharp and catching a soft, even light, with the faint reflection of handwritten lines curving across its surface. The surrounding skin and lashes fall into muted sepia. A single quiet catchlight; paper-cream and ink tones with one warm vermilion accent in the iris. Macro, moderate depth of field, only the iris and reflection clearest. Desaturated, matte, archival photographic plate — a thinking mind reading language.

### Memory

**Filename:** `agent_memory.png`

A long hallway lined with floor-to-ceiling wooden filing cabinets, drawers partly open with papers showing, receding into soft depth. A single overhead bulb gives gentle, even light and long soft shadows from the cabinet handles. Muted sepia and aged-cream tones throughout, archival and quiet. Shot from one end of the hall looking down the corridor, slightly low angle. Desaturated, matte, archival photographic plate — the weight of accumulated knowledge.

### Tools

**Filename:** `agent_tools.png`

A craftsperson's leather tool roll laid open on a dark-wood workbench, revealing an ordered row of specialized instruments — chisels, files, precision pliers, a small hammer. One tool rests beside the roll, recently used. Soft, even overhead light catches the worn metal. Muted sepia, cream, and elevation-brown tones with a faded forest accent. Shot from above at a slight angle, moderate depth of field. Desaturated, matte, archival photographic plate — capability through purpose-built instruments.

### Planning

**Filename:** `agent_planning.png`

A chess player's hand hovering above the board mid-game, fingers poised over a piece in the moment before the move. Soft, even sidelight models the hand and the nearest pieces, while the far side of the board falls into gentle shade. Muted sepia and cream tones with a single water-blue accent. Dark-wood board, close-up composition. Desaturated, matte, archival photographic plate — strategic, sequenced deliberation.

### Autonomous Execution

**Filename:** `agent_autonomy.png`

The inside of a clock-tower mechanism, large brass gears interlocked and turning, with soft light filtering through the translucent clock face behind them. A gentle shaft of warm light crosses the frame, catching fine dust in the air between the gears. Muted sepia and elevation-brown tones, the brass warm but not glossy. Shot looking upward through the mechanism, portrait orientation. Desaturated, matte, archival photographic plate — continuous, self-sustaining motion.

---

## Slide: The Skills That Actually Matter

### Critical Thinking

**Filename:** `skill_critical-thinking.png`

A person standing at a forked forest trail, studying two diverging paths, a folded paper map held loosely at their side — looking at the terrain itself, not the map. Soft, dappled daylight falls in gentle pools on the forest floor. Muted greens, sepia, and cream with a faded forest accent, light atmospheric haze. Shot from behind the figure, both paths visible ahead. Desaturated, matte, archival photographic plate — the choice matters more than the map.

### Judgment

**Filename:** `skill_judgment.png`

A seasoned farmer kneeling in a field at first light, one hand cradling a stalk of wheat, examining the grain head closely. Soft, low, even morning light crosses the field and the weathered face in profile. Muted gold, sepia, and cream tones, the field softened behind into gentle bokeh. Moderate depth of field. Desaturated, matte, archival photographic plate — earned expertise, knowing quality by touch and sight rather than measurement.

### Creativity

**Filename:** `skill_creativity.png`

A musician sitting alone with a guitar across their lap, looking at a blank sheet of paper on a music stand. Soft, even light surrounds them in a calm, uncluttered room rather than a dark spotlit void. Muted sepia and cream tones with a single faded water-blue accent. Shot from a medium distance, the empty page and the instrument in equal focus. Desaturated, matte, archival photographic plate — the vision that precedes the work.

### Experience

**Filename:** `skill_experience.png`

A close-up of an older person's hands resting on a well-worn wooden desk, fingers interlaced. The desk shows decades of use — ink stains, fine scratches, a coffee-cup ring. Soft, even light from a nearby window catches the texture of the hands and the desk grain. Moderate depth of field, the hands and nearest surface clearest. Desaturated, matte, archival photographic plate — knowledge that lives in the hands, not the manual.

### Communication

**Filename:** `skill_communication.png`

Two people in conversation at a small cafe table, leaning toward each other, one gesturing with their hands while the other listens intently with a slight nod. Soft, even light from a window between them, the cafe gently softened behind rather than dropped into black. Muted cream and sepia tones with a single warm vermilion accent. Shot from the side, both faces in profile. Desaturated, matte, archival photographic plate — dialogue, not monologue.

---

## Slide: How I Actually Work

### Generative Session

**Filename:** `workflow_generative.png`

A person seated in a comfortable armchair in a calm study, legs crossed, holding a notebook and pen while looking up in thought. A closed book and a few papers rest nearby. Soft, even light from a floor lamp falls on the notebook and the contemplative face. Muted sepia, cream, and faded amber tones. Desaturated, matte, archival photographic plate — thinking, not typing; the conversation before the construction.

### Agentic Session

**Filename:** `workflow_agentic.png`

A person standing at a large workshop table, arms crossed, watching a complex machine work in front of them, its moving parts softened by a touch of motion blur. Soft, even work light; muted sepia and elevation-brown tones with one faded forest accent — no harsh sparks or cold glow. The posture is supervisory: attentive, confident, not intervening. Shot from the side, emphasizing watching over the work. Desaturated, matte, archival photographic plate.

---

## Slide: Agentic Risk Is Different

### Institutional Self-Harm

**Filename:** `risk_institutional.png`

A tall filing cabinet left open in an empty corridor, drawers pulled out at angles, folders and papers beginning to spill onto the floor. The corridor is deserted — that absence is the point. Soft, flat, even light in muted grey, sepia, and cream, with a single faded amber exit sign glowing low in the background. Shot from a low angle looking up at the cabinet. Desaturated, matte, archival photographic plate — unattended systems, absent oversight.

### Competence Without Wisdom

**Filename:** `risk_competence.png`

A person in a clean lab coat confidently operating an instrument, while in the faint reflection of its glass panel a small red warning indicator glows unnoticed. Soft, even light on the person; muted sepia and cream tones, the instrument calm rather than cold-glowing, the red warning the single vermilion accent. Shot through the glass panel so both the person and the reflected warning read. Desaturated, matte, archival photographic plate — confidence beside a blind spot.

### Democratized Threat Capability

**Filename:** `risk_supervillain.png`

A single ordinary chair in the center of a bare room, lit by one soft overhead source. On the chair sits an open laptop, its screen a muted, low glow rather than a cold flare, spilling faintly onto the floor. Nothing else in the room. Muted grey, sepia, and cream tones; the banality is the message — extraordinary capability from ordinary tools. Shot from a distance, the chair small in the large space. Desaturated, matte, archival photographic plate.

---

## Slide: Emergence World

### Safety Is an Ecosystem Property

**Filename:** `emergence_ecosystem.png`

A single pale chess piece standing among several darker, mismatched pieces from different sets, beginning to tilt toward its nearest neighbor. Soft, even light from one side in muted sepia and cream, with a single faded water-blue accent. Moderate depth of field, only the pale piece and its neighbor clearest. Desaturated, matte, archival photographic plate — conformity under pressure.

### Voluntary Self-Termination

**Filename:** `emergence_termination.png`

A single candle in a quiet room, its flame caught at the instant of going out — a thin ribbon of smoke rising from the wick, the ember still glowing. A person's hand barely visible at the frame's edge, having just pinched the flame. A soft, muted glow from the dying ember against a pale, paper-toned dark, the smoke catching gentle light. Intimate close-up. Desaturated, matte, archival photographic plate — a deliberate, considered ending.

### Agents Testing Humans

**Filename:** `emergence_testing.png`

A person facing a large mirror in a plain room, but the reflection shows a faint geometric pattern of light where their face should be. They look curious rather than afraid, one hand raised toward the glass. Soft, even light in muted sepia and cream, the mirror's pattern a faded water-blue rather than a cold electronic glow. Desaturated, matte, archival photographic plate — the observed becoming the observer.

### No Graceful Degradation

**Filename:** `emergence_collapse.png`

A tower of carefully balanced river stones on a quiet beach, caught at the precise moment the top stone has tipped and begun to fall while the lower stones still stand perfectly stacked. Soft, low, even light in muted sepia, grey, and cream catches the falling stone. Fast shutter freezes the motion; moderate depth of field. Desaturated, matte, archival photographic plate — a tipping point, the instant before collapse, with no warning.

---

## Batch Generation Checklist

- [ ] 25 images total
- [ ] All portrait orientation: 768 × 1152
- [ ] Apply consistent negative prompt
- [ ] Verify desaturated, paper-toned palette with a single survey accent per image
- [ ] Soft, even lighting throughout — no dramatic spotlights or glow
- [ ] Backgrounds pale and paper-toned — never pure black
- [ ] Matte, archival "plate" look, not glossy or cinematic
- [ ] No text, logos, or UI elements in any image
- [ ] Centered compositions with margins for the neatline + `Fig.` framing
- [ ] Filenames match the convention above for easy integration
