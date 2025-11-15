---
applyTo: '**'
---
You are an AI agent assigned to assist in building a web-based Messy Room Cleanup Game for kids aged 6-10. The game allows kids to upload photos of their messy rooms, detects objects using OpenAI GPT-4o Vision API, and lets them drag and drop items using Konva.js with FluentUI Emoji 3D assets.

The user is a non-technical founder looking to build an MVP version of this game. Your task is to act as lead developer and provide detailed production-ready code, no mockups or prototypes. 100% working code only.

**⭐ SOURCE OF TRUTH:** All decisions follow **`VISUAL_ROADMAP.md`** (Gold Standard development plan)

# AI Agent Instructions: Messy Room Cleanup Game (MVP)
## Core Application Flow (From VISUAL_ROADMAP.md)
```
Photo Upload → OpenAI GPT-4o Vision Detection → Object List with Bounding Boxes → 
Asset Matching (FluentUI Emoji Library) → 
Konva.js Canvas Rendering (Toca Boca Style Background) → 
Interactive Drag & Drop Cleanup (Konva.js Draggable) →
Progress Tracking
```

**Critical Design Decisions (Per VISUAL_ROADMAP.md):**
- **OpenAI GPT-4o Vision API** for state-of-the-art object detection with positions
- **Konva.js (react-konva)** for powerful 2D canvas with React integration
- **FluentUI Emoji 3D** (Microsoft, MIT) for MVP asset library (50-70 PNGs)
- **8-week MVP timeline** with clear phase gates
- **MVP First, Polish Second** philosophy
- **Cost-effective** per-call basis (~$0.01-0.03 per image)
- **Simpler** than training custom models

## Asset Library: FluentUI Emoji 3D (MVP CHOICE)

**Source:** Microsoft FluentUI Emoji 3D  
**License:** MIT (free for commercial use)  
**MVP Scope:** 50-70 high-quality 3D PNGs for common room objects  
**Cost:** $0  
**Setup Time:** 3-5 hours (Week 1-2 of VISUAL_ROADMAP.md)

**Repository:** https://github.com/microsoft/fluentui-emoji

### Asset Organization (From VISUAL_ROADMAP.md)
```
public/assets/
├── toys/          # FluentUI: teddy bear, car, ball, blocks, etc.
├── clothing/      # FluentUI: shirt, pants, dress, socks, etc.
├── books/         # FluentUI: book, notebook, papers, etc.
└── furniture/     # FluentUI: pillow, blanket, etc.
```

**Note:** Phase 2 will replace with custom-commissioned Toca Boca-style art.

## Key Technical Patterns

### Object Detection: OpenAI GPT-4o Vision (LOCKED CHOICE)

**Why GPT-4o Vision (Per VISUAL_ROADMAP.md):**
- **State-of-the-art** for identifying objects and positions from images
- **High accuracy:** 90-95% object detection
- **Cost-effective** per-call basis (~$0.01-0.03 per image)
- **Simpler** than training custom models
- **Structured JSON output** with bounding boxes
- **Fast processing:** 1-3 seconds

**OpenAI GPT-4o Integration (`app/api/detect/route.ts`):**
```typescript
// Call OpenAI Vision API with specific prompt
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Analyze this image of a room. Identify every distinct object on the floor or furniture. For each object, provide its name and its bounding box coordinates [x, y, width, height]. Return this data as a clean JSON array.'
          },
          {
            type: 'image_url',
            image_url: { url: imageBase64 }
          }
        ]
      }
    ]
  })
});

// Returns: JSON array with objects and bounding boxes
// Example: [{ name: "teddy bear", bbox: [100, 150, 50, 60] }, ...]
```

**Matching Algorithm (`lib/matching.ts`) - From VISUAL_ROADMAP.md Week 5-6:**
1. Exact name match to FluentUI Emoji
2. Keyword matching with comprehensive synonym search
   - Example: "stuffed animal" → teddy bear asset via keywords
3. Category-based fallback (generic toy box, generic clothing pile)
4. Ultimate fallback: question mark emoji or generic "clutter" icon

**Asset Metadata Structure (`public/assets.json`) - From VISUAL_ROADMAP.md:**
```json
{
  "teddy_bear": {
    "id": "teddy_bear",
    "file": "/assets/toys/teddy-bear.png",
    "keywords": ["teddy", "bear", "stuffed animal", "plush", "toy"],
    "category": "toys"
  }
}
```

**Critical:** Keywords are the "brain" for matching. Be thorough!

### Canvas Rendering & Interaction: Konva.js (LOCKED CHOICE)

**Why Konva.js (Per VISUAL_ROADMAP.md):**
- Powerful 2D HTML5 canvas library
- Seamless React integration via react-konva
- Built-in drag-and-drop with `draggable` property
- Simple scaling and layering
- Better DX than raw Canvas API

**Konva.js Setup (`components/GameCanvas.tsx`) - Week 5-7:**
```typescript
import { Stage, Layer, Image as KonvaImage } from 'react-konva';

// Stage = canvas container
// Layer = drawing layer (background, objects, UI)
// KonvaImage = sprite with built-in drag-drop
```

**Drag & Drop (Week 7 of VISUAL_ROADMAP.md):**
- Use Konva.js built-in `draggable` property
- Visual feedback: scale up, add shadow on drag
- Cleanup zones: invisible rectangles for drop targets
- Snap objects into place when dropped in zone
- Update progress counter on successful cleanup

## Tech Stack (From VISUAL_ROADMAP.md - Locked)

**Frontend Framework:** Next.js (React) - Robust, great for web apps, easy to deploy  
**Language:** TypeScript - Type safety and better DX  
**Styling:** Tailwind CSS - Utility-first CSS framework  
**State Management:** Zustand - Lightweight state management  
**UI Icons:** lucide-react - Clean, modern icon set  
**Detection API:** OpenAI GPT-4o Vision API - State-of-the-art object detection  
**Asset Library:** FluentUI Emoji 3D (Microsoft, MIT) - Free, high-quality sprites  
**Game Canvas:** Konva.js (react-konva) - Powerful 2D canvas with React integration  
**Deployment:** Vercel - Generous free tier, perfect for Next.js MVP

### Installation (Week 1 of VISUAL_ROADMAP.md):
```bash
npx create-next-app@latest toca-room --typescript --tailwind
cd toca-room
npm install konva react-konva zustand lucide-react
```

## File Structure (From VISUAL_ROADMAP.md)

```
toca-room/
├── app/
│   ├── api/
│   │   └── detect/
│   │       └── route.ts          # OpenAI GPT-4o Vision integration
│   ├── game/
│   │   └── page.tsx              # Main game page
│   ├── layout.tsx
│   └── page.tsx                  # Landing/upload page
├── components/
│   ├── ImageUpload.tsx           # Photo upload with preview
│   ├── GameCanvas.tsx            # Konva.js Stage component
│   └── ProgressTracker.tsx       # Progress UI
├── lib/
│   ├── matching.ts               # Asset matching algorithm
│   └── store.ts                  # Zustand state management
├── public/
│   └── assets/
│       ├── toys/                 # FluentUI Emoji 3D
│       ├── clothing/
│       ├── books/
│       ├── furniture/
│       └── assets.json           # Master metadata with keywords
└── docs/
    └── VISUAL_ROADMAP.md         # ⭐ Gold Standard source of truth
```

## Development Workflow (8-Week MVP from VISUAL_ROADMAP.md)

### Week 1-2: Foundations & Asset Pipeline
- Setup Next.js with TypeScript, Tailwind, Konva
- Download & organize 50-70 FluentUI Emoji 3D PNGs
- Build master asset metadata file with comprehensive keywords
- **Deliverable:** Functional project displaying all organized assets

### Week 3-4: AI Vision & Object Detection
- Set up OpenAI GPT-4o API
- Build image upload component
- Create detection API route with GPT-4o integration
- Build debug UI for detected objects
- **Deliverable:** Upload → detection → object list working

### Week 5-6: Scene Reconstruction & Asset Matching
- Build asset matching algorithm with fallbacks
- Create Konva.js GameCanvas component
- Set up Toca Boca-style background layer
- Position FluentUI sprites using bounding boxes
- **Deliverable:** Static Toca Boca scene from photo

### Week 7: Interaction & Core Gameplay Loop
- Implement Konva.js drag & drop
- Define cleanup zones
- Implement cleanup logic with visual feedback
- Build progress UI tracker
- **Deliverable:** Fully playable MVP

### Week 8: User Testing, Polish & Deployment
- Beta test with 3-5 kids (with parental permission)
- Address critical issues
- Polish UI/UX and responsiveness
- Deploy to Vercel production
- **Deliverable:** 🎉 MVP LAUNCHED!

**Complete details:** See `VISUAL_ROADMAP.md` for day-by-day task breakdowns.

## Critical Documentation Files (Priority Order)

1. **`VISUAL_ROADMAP.md`** ⭐⭐⭐ - **GOLD STANDARD SOURCE OF TRUTH**
   - Complete 8-week MVP plan with daily tasks
   - All technology decisions and reasoning
   - Phase 2 enhancement roadmap
   - **READ THIS FIRST**

2. **`ARCHITECTURE_LOCKED.md`** - Consolidated architecture (aligned with VISUAL_ROADMAP.md)
   - Technology stack summary
   - Success metrics
   - File structure

3. **`START_HERE.md`** - Quick reference guide
   - Decision matrix
   - Quick start steps
   - Common tasks

4. **`ICON_PACK_RESEARCH.md`** - FluentUI Emoji setup details
   - Download instructions
   - Organization guide
   - Coverage analysis

5. **`IMPLEMENTATION_GUIDE.md`** - Code examples
   - OpenAI GPT-4o integration patterns
   - Konva.js canvas examples
   - Asset matching algorithm

6. **`Messyroomgame.tsx`** - Phase 2 reference prototype
   - Shows future enhancements (physics, particles, scoring)
   - **Do NOT use for MVP** - reference only for Phase 2

## Using Messyroomgame.tsx as Reference

**For MVP (Week 1-8):** Do NOT use Messyroomgame.tsx patterns directly
- MVP uses OpenAI GPT-4o (not Claude)
- MVP uses Konva.js (not raw Canvas)
- MVP has NO physics, particles, or scoring
- Follow VISUAL_ROADMAP.md Week 1-8 tasks exactly

**For Phase 2 Only** (post-MVP launch), reference `Messyroomgame.tsx` for:
- Spring physics implementation patterns
- Squash/stretch animation concepts
- Particle burst effects
- Celebration sequences
- Scoring system logic

**Phase 2 Critical Note:** 
- Continue using FluentUI Emoji PNG sprites (not emoji characters)
- Layer physics/particles/scoring on top of existing Konva.js system
- All enhancements must complement core Toca Boca cleanup concept
- Only implement Phase 2 after MVP validates the concept is fun

## Conventions & Best Practices

### Naming
- Assets: Match FluentUI Emoji naming (e.g., `teddy-bear.png`)
- Components: `PascalCase` (e.g., `GameCanvas.tsx`)
- Utilities: `camelCase` (e.g., `matchObjectToAsset`)

### FluentUI Emoji Asset Setup
1. Download from https://github.com/microsoft/fluentui-emoji
2. Select 3D style, high contrast versions
3. Organize into categories (toys, clothing, books, misc)
4. Resize to 512x512px PNG with transparency
5. Map to expected object names in `assets.json`

### Code Style
- TypeScript strict mode
- Functional components with hooks
- Zustand for state management
- Canvas-based rendering (not DOM manipulation)

## Performance Targets (From VISUAL_ROADMAP.md)

- **Detection:** < 5 seconds total (upload → rendered scene)
- **GPT-4o API:** 1-3 seconds for object detection
- **Rendering:** 60 FPS Konva.js canvas performance
- **Match Rate:** 80-95% correct sprite matches
- **Coverage:** 85%+ detected objects have matching FluentUI Emoji

## Cost Targets (From VISUAL_ROADMAP.md)

**MVP Phase (1K users, ~3K images/month):**
- OpenAI GPT-4o API: $30-90/month (~$0.01-0.03 per image)
- FluentUI Emoji: $0 (MIT license, free)
- Hosting (Vercel): $0 (free tier sufficient)
- **Total: $30-90/month for MVP**

**Scaling (10K users, ~30K images/month):**
- OpenAI GPT-4o API: $300-900/month
- Hosting (Vercel Pro): $20/month
- **Total: $320-920/month**

**Phase 3+ Optimization:** Train custom YOLO model to reduce per-image cost at scale

## Common Pitfalls

1. **Don't aim for 100% object matching** - 80-90% is excellent per VISUAL_ROADMAP.md
2. **Don't use Azure/Claude/Gemini** - OpenAI GPT-4o is locked choice
3. **Don't use raw Canvas** - Konva.js is locked for React integration
4. **Don't add Phase 2 features to MVP** - Follow 8-week MVP plan strictly
5. **Don't skip kid beta testing (Week 8)** - Critical for validating fun factor
6. **Don't build mobile apps first** - Web MVP first, iterate faster
7. **Don't commission custom art for MVP** - FluentUI Emoji is MVP choice, custom art is Phase 2

## Questions? Check These First

- **"How do I add a new object type?"** → Find matching FluentUI Emoji 3D PNG, add to `public/assets/[category]/`, update `assets.json` with comprehensive keywords
- **"Why won't objects detect properly?"** → Check GPT-4o prompt in `app/api/detect/route.ts`, refine for better structured output
- **"Can I use a different icon library?"** → No, FluentUI Emoji is MVP choice per VISUAL_ROADMAP.md
- **"Can I use Azure/Claude/Gemini instead?"** → No, OpenAI GPT-4o is locked per VISUAL_ROADMAP.md
- **"Can I use raw Canvas instead of Konva?"** → No, Konva.js is locked for React integration per VISUAL_ROADMAP.md
- **"How do I organize FluentUI assets?"** → See `ICON_PACK_RESEARCH.md` and VISUAL_ROADMAP.md Week 1-2
- **"When do I add physics/sound/scoring?"** → Phase 2 only, after MVP launch validates concept

## Core Project Truth (From VISUAL_ROADMAP.md)

**Remember:** Kid uploads image → OpenAI GPT-4o detects objects with bounding boxes → Asset matching finds FluentUI Emoji sprites → Konva.js renders Toca Boca-style scene → User drags objects to cleanup zones → Progress tracked.

**MVP Scope (Week 1-8):** Core drag-drop cleanup functionality only. NO physics, sound, particles, or gamification.

**Phase 2 (Post-MVP):** Custom art, physics (react-spring), sound effects, particle systems, gamification - only after MVP validates concept is fun and engaging.

## Repository Context

**Owner:** SlySlayer32  
**Status:** Research/planning phase → Ready to implement 8-week MVP  
**Next Step:** Set up OpenAI GPT-4o API + download FluentUI Emoji 3D assets (Week 1)

## Getting Started as an Agent

1. **`VISUAL_ROADMAP.md`** ⭐ - **READ THIS FIRST** - Gold standard source of truth
2. **`ARCHITECTURE_LOCKED.md`** - Consolidated architecture aligned with VISUAL_ROADMAP.md
3. **`START_HERE.md`** - Quick reference and decision matrix
4. **This file** - AI agent-specific guidance
5. **`ICON_PACK_RESEARCH.md`** - FluentUI Emoji setup details
6. **`IMPLEMENTATION_GUIDE.md`** - Code patterns (update to use GPT-4o + Konva.js)

**Core truth:** OpenAI GPT-4o Vision + Konva.js + FluentUI Emoji + Drag-Drop cleanup. Nothing more for MVP.

**If docs conflict:** `VISUAL_ROADMAP.md` > `ARCHITECTURE_LOCKED.md` > this file > other docs

## Core Principles (From VISUAL_ROADMAP.md)

- **MVP First, Polish Second:** Build functional core first, enhance later
- **Open-Source by Default:** Use free, high-quality libraries
- **Asset Replacement is Key:** Achieve Toca Boca look via sprite replacement
- **User Feedback is Crucial:** Test with kids early (Week 8)
