# TFP BRIEFING — Complete Build Specification
## For CC (Claude Code) — Execute exactly as written
## Date: March 28, 2026

---

## OVERVIEW

Build a cinematic capabilities presentation for Task Force Protection LLC. This is NOT a pitch — the pitch already happened. This is a post-meeting "statement piece" that Bo emails to a Cordish Companies executive. It plays automatically, runs exactly 128 seconds synced to a cinematic music track, and leaves the viewer thinking TFP operates at a level no other private security firm in Kansas City can match.

**No voiceover.** Text on screen + video backgrounds + music. That's it.

**Format:** Standard web project (HTML + CSS + JS + asset files). NOT a single monolithic HTML file. NOT base64-encoded assets.

**Deployment:** Railway from GitHub, accessed at `briefing.taskforceprotectiongov.com`

---

## REPO STRUCTURE

```
TFP-BRIEFING/
├── index.html              (HTML structure only — ~200 lines max)
├── style.css               (All styling — ~300 lines max)
├── script.js               (All logic, timing, transitions — ~250 lines max)
├── assets/
│   ├── audio/
│   │   └── music.mp3       (music-alt.mp3 renamed — "The Mountain" 128s)
│   ├── video/
│   │   ├── act1-bg.mp4     (dark atmospheric — smoke or similar)
│   │   ├── act2-aerial.mp4
│   │   ├── act2-counterterror.mp4
│   │   ├── act2-ground.mp4
│   │   ├── act2-command.mp4
│   │   ├── act2-medical.mp4
│   │   ├── act3-bg.mp4     (proof points background)
│   │   ├── act4-drone.mp4  (Apex Box / drone footage)
│   │   └── act5-bg.mp4     (closing — dark atmospheric)
│   └── img/
│       ├── tfp-logo.png    (Spartan helmet lockup — white on transparent)
│       └── apex-pictogram.png (isometric Apex Box diagram)
└── README.md
```

### CRITICAL RULES FOR CC:
1. **Three code files only.** index.html, style.css, script.js. Nothing else.
2. **Commit after completing each Act.** Not at the end. After each Act is working.
3. **No file exceeds 300 lines.** If it does, you're overbuilding.
4. **Assets are referenced by relative path** (`assets/video/act1-bg.mp4`), never embedded.
5. **Test each Act in isolation before moving to the next.** Open in browser, confirm it works.
6. **Do not write any code that references the old presentation.** This is a clean build.

---

## DESIGN SYSTEM

### Colors
```css
:root {
  --navy: #030d1a;
  --gold: #c9a84c;
  --red: #8b0000;
  --white: #ffffff;
  --grey: #a0a8b0;
}
```

### Typography
- **Headlines:** `'Bebas Neue', sans-serif` — all caps, large
- **Body/Labels:** `'Barlow Condensed', sans-serif` — weights 400, 500, 600
- Google Fonts import: `Bebas+Neue` and `Barlow+Condensed:wght@400;500;600`

### Visual Treatment
- All video backgrounds play at reduced opacity (0.25–0.35) with a dark overlay
- Subtle scanline effect (CSS repeating gradient, fixed position, pointer-events: none)
- Vignette overlay (radial gradient, fixed position)
- Gold accent color for lines, borders, small text elements
- Dark red (#8b0000) used sparingly for confidential stamps or alert elements
- All transitions are smooth fades or subtle vertical slides — nothing flashy

---

## RUNTIME & TIMING

Total runtime: **128 seconds** (music duration: 128.6s)

The music starts when the user clicks "play" on a start screen. Everything after that is automated — no user interaction.

### Start Screen (before timer begins)
- Black background
- TFP logo centered, ~200px wide
- Text below: `TASK FORCE PROTECTION LLC`
- Subtitle: `CAPABILITIES BRIEFING`
- Pulsing gold border on a "PLAY" button or text that says `▶ CLICK TO BEGIN`
- On click: start music, hide start screen, begin Act 1 at t=0

### Act Timing Breakdown

| Act | Time | Duration | Content |
|-----|------|----------|---------|
| **1 — Identity** | 0:00–0:12 | 12s | Logo reveal, name, tagline |
| **2 — Capabilities** | 0:12–0:52 | 40s | 5 capability cards, 8s each |
| **3 — Proof Points** | 0:52–1:20 | 28s | 4 notable engagements |
| **4 — The Edge** | 1:20–1:55 | 35s | Apex Box tech showcase |
| **5 — Close** | 1:55–2:08 | 13s | Logo, contact, fade to black |

---

## ACT-BY-ACT SPECIFICATION

---

### ACT 1 — IDENTITY (0:00–0:12)

**Purpose:** Immediate brand presence. Who is this.

**Background:** `act1-bg.mp4` — dark, atmospheric (smoke/fog). Looped. Low opacity (0.25).

**Animation sequence:**
- **0:00–0:03:** Black screen. Music begins. Slight fade-in of video background.
- **0:03–0:06:** TFP logo fades in and scales from 0.7 to 1.0 (ease-out). Centered. ~180px wide.
- **0:06–0:08:** Gold horizontal line expands from center outward (0 → 200px width). Below logo.
- **0:08–0:10:** Text fades in below line:
  - Line 1: `TASK FORCE PROTECTION LLC` — Bebas Neue, 28px, white, letter-spacing 0.15em
  - Line 2: `Premier Private Security · Service-Disabled Veteran-Owned` — Barlow Condensed 400, 14px, gold, letter-spacing 0.3em
- **0:10–0:12:** Hold. Then everything fades out over 0.5s as Act 2 fades in.

---

### ACT 2 — CAPABILITIES (0:12–0:52)

**Purpose:** Show what TFP does. Five capabilities, each with its own video background and text overlay. Fast, confident, rhythmic.

**Structure:** 5 cards, 8 seconds each. Each card is a full-screen takeover with a unique video background.

**Transition between cards:** Crossfade (outgoing card fades to 0 over 0.4s while incoming card fades to 1 over 0.4s, overlapping).

#### Card 1 — Aerial Drone Surveillance (0:12–0:20)
- **Video:** `act2-aerial.mp4` (looped, opacity 0.3)
- **Text (centered):**
  - Label: `01` — Barlow Condensed 600, 13px, gold, letter-spacing 0.5em
  - Title: `AERIAL DRONE SURVEILLANCE` — Bebas Neue, clamp(36px, 5vw, 60px), white
  - Line: gold, 80px wide, 2px tall, centered
  - Description: `Real-time overhead monitoring for venues, events, and district perimeters` — Barlow Condensed 400, 16px, grey, max-width 500px, centered

#### Card 2 — Counter-Terrorism Operations (0:20–0:28)
- **Video:** `act2-counterterror.mp4`
- **Text:**
  - Label: `02`
  - Title: `COUNTER-TERRORISM OPERATIONS`
  - Description: `Special Operations veterans integrated into planning, threat assessment, and ground response`

#### Card 3 — Armed Ground Teams (0:28–0:36)
- **Video:** `act2-ground.mp4`
- **Text:**
  - Label: `03`
  - Title: `ARMED GROUND TEAMS`
  - Description: `Uniformed and plainclothes personnel — former military and law enforcement throughout the district`

#### Card 4 — Mobile Command Center (0:36–0:44)
- **Video:** `act2-command.mp4`
- **Text:**
  - Label: `04`
  - Title: `MOBILE COMMAND CENTER`
  - Description: `On-site coordination hub for real-time situational awareness and rapid response`

#### Card 5 — Medical Trauma Response (0:44–0:52)
- **Video:** `act2-medical.mp4`
- **Text:**
  - Label: `05`
  - Title: `MEDICAL TRAUMA RESPONSE`
  - Description: `Stop the Bleed certified — emergency first response before EMS arrival`

---

### ACT 3 — PROOF POINTS (0:52–1:20)

**Purpose:** Establish credibility. Not explained — just stated. Names and contexts that speak for themselves.

**Background:** `act3-bg.mp4` — one continuous video behind all four proof points (dark, urban, cinematic). Opacity 0.25.

**Structure:** 4 proof points displayed sequentially, 7 seconds each. Each appears with a subtle fade-in + slight upward slide (translateY 20px → 0).

**Layout for each proof point:** Left-aligned block, roughly 40% from left edge, vertically centered.

#### Proof Point 1 — (0:52–0:59)
- **Title:** `PATRICK MAHOMES` — Bebas Neue, clamp(32px, 4.5vw, 52px), white
- **Subtitle:** `Kansas City Chiefs — NFL MVP & Super Bowl Champion` — Barlow Condensed 500, 16px, gold
- **Detail:** `Ongoing executive protection` — Barlow Condensed 400, 14px, grey

#### Proof Point 2 — (0:59–1:06)
- **Title:** `DIPLOMATIC SECURITY`
- **Subtitle:** `International Dignitary Protection`
- **Detail:** `Foreign diplomatic personnel operating within the United States`

#### Proof Point 3 — (1:06–1:13)
- **Title:** `FILM & PRODUCTION SECURITY`
- **Subtitle:** `Kansas City Production Companies`
- **Detail:** `Set security and talent protection across major productions`

#### Proof Point 4 — (1:13–1:20)
- **Title:** `CREDENTIALS`
- **Subtitle (multi-line, stacked, each line fades in staggered 0.3s apart):**
  - `✓ Federal Protective Services — Standard Exceeded`
  - `✓ KCPD Firing Range Qualified`
  - `✓ Counter-Terrorism Operations Trained`
  - `✓ Special Operations Personnel`
  - `✓ Service-Disabled Veteran-Owned (SDVOSB)`
- Barlow Condensed 400, 14px, white. Check marks in gold.

---

### ACT 4 — THE EDGE: APEX BOX (1:20–1:55)

**Purpose:** The crescendo. This is what separates TFP from every other security company. They don't just bring people — they bring deployable surveillance infrastructure powered by Secure Passage technology.

**This act gets the most screen time (35 seconds) because it's the differentiator.**

**Background:** `act4-drone.mp4` — drone/aerial footage, dark tones. Opacity 0.2. This is the darkest background of the presentation — the text and the pictogram image are the stars.

**Animation sequence:**

- **1:20–1:24:** Transition in. Screen is dark. Text fades in, centered:
  - `INTEGRATED TECHNOLOGY` — Barlow Condensed 600, 13px, gold, letter-spacing 0.5em
  - Then 0.3s later:
  - `APEX` — Bebas Neue, clamp(60px, 9vw, 100px), white
  - Gold line expands below (same style as Act 1)

- **1:24–1:30:** The Apex Box pictogram image (`apex-pictogram.png`) fades in. Centered, ~350px wide. The isometric diagram showing the container, drone, cameras, satellite, weather station. Below it:
  - `DEPLOY ANYWHERE. DEFEND EVERYWHERE.` — Barlow Condensed 500, 15px, gold, letter-spacing 0.25em

- **1:30–1:45:** Feature callouts appear one at a time, staggered every 2.5 seconds. These appear as small text blocks arranged around or below the pictogram image. Each fades in with a subtle slide.
  - `GUNSHOT DETECTION & BEHAVIOR ANALYSIS` — white, 13px
  - `THERMAL & NIGHT VISION SURVEILLANCE` — white, 13px
  - `LICENSE PLATE RECOGNITION & CROWD TRACKING` — white, 13px
  - `AUTONOMOUS DRONE SURVEILLANCE` — white, 13px
  - `TRUMAN PDR & Hx OIC INTEGRATION` — white, 13px
  - `POWERED BY SECURE PASSAGE` — gold, 12px, appears last

- **1:45–1:55:** Hold on the complete Apex display for 5 seconds. Then all Apex content fades out over 1.5s. Music should be building toward its final moments here.

---

### ACT 5 — CLOSE (1:55–2:08)

**Purpose:** TFP logo. Contact info. Done. Confident, not desperate.

**Background:** `act5-bg.mp4` — dark atmospheric (can reuse act1-bg.mp4). Opacity 0.2.

**Animation sequence:**

- **1:55–1:58:** Black screen (brief pause after Apex content fades). Then TFP logo fades in. Centered. ~240px wide.

- **1:58–2:02:** Below logo, text fades in:
  - `TASK FORCE PROTECTION LLC` — Bebas Neue, 24px, white
  - Gold line (120px)
  - `(660) 227-9063` — Barlow Condensed 400, 16px, grey
  - `taskforceprotectiongov.com` — Barlow Condensed 400, 16px, gold

- **2:02–2:06:** Hold. Music fading.

- **2:06–2:08:** Everything fades to pure black. Music ends. Presentation complete.

- **After 2:08:** Screen stays black. No restart. No loop. It's done.

---

## JAVASCRIPT ARCHITECTURE

### Core Concepts
- **One timer drives everything.** A single `requestAnimationFrame` loop (or `setInterval` at 100ms) tracks elapsed time from music start.
- **Scene activation is time-based.** A simple array of `{ startTime, endTime, enterFn, exitFn }` objects.
- **No scene state machine.** No complex state management. Just: "what time is it? What should be visible?"

### Pseudocode Structure
```javascript
const music = document.getElementById('music');
let startTime = null;

const timeline = [
  { start: 0,    end: 12,   scene: 'act1' },
  { start: 12,   end: 20,   scene: 'card1' },
  { start: 20,   end: 28,   scene: 'card2' },
  { start: 28,   end: 36,   scene: 'card3' },
  { start: 36,   end: 44,   scene: 'card4' },
  { start: 44,   end: 52,   scene: 'card5' },
  { start: 52,   end: 59,   scene: 'proof1' },
  { start: 59,   end: 66,   scene: 'proof2' },
  { start: 66,   end: 73,   scene: 'proof3' },
  { start: 73,   end: 80,   scene: 'proof4' },
  { start: 80,   end: 115,  scene: 'act4' },
  { start: 115,  end: 128,  scene: 'act5' },
];

function tick() {
  const elapsed = music.currentTime;
  // Show/hide scenes based on elapsed time
  // Trigger sub-animations within scenes based on elapsed time
  requestAnimationFrame(tick);
}

// Start button click:
music.play();
requestAnimationFrame(tick);
```

### Video Management
- Each scene's video starts playing when the scene activates, pauses when it deactivates.
- Videos are set to `loop`, `muted`, `playsinline`.
- Preload strategy: set `preload="none"` on all videos. When a scene is 3 seconds away from activation, set `preload="auto"` and call `.load()`. On activation, call `.play()`.

### Music
- Volume: start at 0.15 (this track is cinematic and can overwhelm text-reading)
- Volume adjustment: may need tuning after first build — expose as a CSS custom property or JS constant at the top of script.js for easy changes.
- At t=120s (8 seconds before end), begin fading volume to 0 over 8 seconds.

---

## ASSET PREPARATION

Brian will provide the video files. Some need compression before deployment.

### Video specs for all assets:
```bash
# Standard compression for all video assets
ffmpeg -i INPUT.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -pix_fmt yuv420p OUTPUT.mp4
```
- All videos are muted (audio stripped with `-an`)
- All videos should be under 2MB each, ideally under 1MB
- Target resolution: 1280px wide (height auto)

### Asset mapping (Brian fills in source files):

| Target filename | Source | Notes |
|---|---|---|
| `act1-bg.mp4` | smoke.mp4 or similar | Dark, atmospheric, loopable |
| `act2-aerial.mp4` | card-aerial.mp4 | Already compressed |
| `act2-counterterror.mp4` | card-counterterror.mp4 | Already compressed |
| `act2-ground.mp4` | card-ground.mp4 | Already compressed |
| `act2-command.mp4` | card-command.mp4 | Already compressed |
| `act2-medical.mp4` | card-medical.mp4 | Already compressed |
| `act3-bg.mp4` | TBD — Grok or existing | Urban/cinematic, ~28s |
| `act4-drone.mp4` | TBD — Grok drone footage | Drone/tech, ~35s |
| `act5-bg.mp4` | Same as act1-bg.mp4 | Reuse is fine |
| `music.mp3` | music-alt.mp3 renamed | "The Mountain" 128s |
| `tfp-logo.png` | tfp-logo.png | White on transparent |
| `apex-pictogram.png` | apex-pictogram-d.png | Isometric diagram, dark bg |

---

## GROK VIDEO PROMPTS

Brian will generate these with Grok. Suggested prompts:

### Act 3 Background (Proof Points — needs ~28s, can loop a shorter clip)
> "Cinematic slow-motion nighttime footage of a modern urban entertainment district with neon lights reflecting on wet streets, security camera perspective, dark blue and gold color tones, no people in focus, atmospheric and moody, 4K"

### Act 4 Background (Apex Box — needs ~35s, can loop a shorter clip)
> "Military-grade surveillance drone flying over a city at night, thermal imaging overlay effect, dark tactical atmosphere, subtle grid overlay on the footage, blue-black color palette with occasional red data points, cinematic, 4K"

### Alternative Act 4 if needed:
> "Close-up of a rugged tactical shipping container converted into a mobile command center at night, exterior security cameras and antennas visible, LED status lights glowing, dark industrial setting, cinematic lighting with blue and gold accents, 4K"

---

## DEPLOYMENT

### Railway Setup
1. Create new repo: `TFP-BRIEFING` on GitHub (github.com/MathrusseB/TFP-BRIEFING)
2. Push code + assets
3. Create new Railway project from GitHub repo
4. Railway serves static files — no build step needed, just a static file server
5. Add `railway.json` or `nixpacks.toml` for static serving if needed, or use a simple `serve` package

### Static Server (package.json)
```json
{
  "name": "tfp-briefing",
  "scripts": {
    "start": "npx serve -s . -l $PORT"
  }
}
```

### DNS
Point `briefing.taskforceprotectiongov.com` via Cloudflare DNS (CNAME) to the Railway deployment URL.

---

## CC EXECUTION ORDER

1. Create the GitHub repo `TFP-BRIEFING`
2. Build `index.html` — structure only, all acts, all elements. **Commit.**
3. Build `style.css` — all styling, responsive, overlays. **Commit.**
4. Build `script.js` — Act 1 only. Test. **Commit.**
5. Add Act 2 logic to `script.js`. Test. **Commit.**
6. Add Act 3 logic. Test. **Commit.**
7. Add Act 4 logic. Test. **Commit.**
8. Add Act 5 logic. Test. **Commit.**
9. Add `package.json` for Railway. **Commit.**
10. Deploy to Railway.
11. Configure DNS.
12. Brian tests. Fixes happen as targeted edits, never full rewrites.

---

## WHAT SUCCESS LOOKS LIKE

A Cordish executive opens a link. A dark screen with a TFP logo and a play button. They click play. For the next two minutes and eight seconds, they watch a cinematic capabilities presentation backed by an epic orchestral score. No narration. No selling. Just: this is who we are, this is what we do, this is who we've done it for, and this is the technology we deploy that nobody else has. Logo. Contact. Black.

They forward the link to their COO.

---

*This spec is the single source of truth. CC executes against this document. Any changes go through Brian → this spec → CC. No improvisation.*
