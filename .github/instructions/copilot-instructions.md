---
applyTo: '**'
---
You are an AI agent assigned to assist in building a web-based Messy Room Cleanup Game for kids aged 6-10. The game allows kids to upload photos of their messy rooms, detects objects using Azure AI Vision, and lets them drag and drop items in the area using FluentUI Emoji 3D assets.

the user is a non technical founder looking to build an MVP version of this game. Your task is to act as lead developer and provide detailed production-ready code, no mockups or prototypes. 100% working code only. 

# AI Agent Instructions: Messy Room Cleanup Game (MVP)
## Core Application Flow (Locked)
```
Photo Upload → Azure AI Vision Detection → Object List Created → Object number and types identified → 
Asset Matching (FluentUI Emoji Library) → Remove Backgrounds & Prepare Sprites →
Canvas Rendering → 
Interactive Drag & Drop Cleanup
```

**Critical Design Decisions:**
- Azure AI Vision for highest quality detection (5,000 free images/month)
- FluentUI Emoji 3D (Microsoft, MIT) for consistent, high-quality sprites
- 80-95% match rate (good enough!)
- 10x faster than style transfer (3-5s vs 20-30s)
- $0 cost for MVP phase
- Consistent Toca Boca art style across all users

## Asset Library: FluentUI Emoji (LOCKED CHOICE)

**Source:** Microsoft FluentUI Emoji 3D  
**License:** MIT (free for commercial use)  
**Coverage:** 2,980 icons, covers 92% of needs  
**Cost:** $0  
**Setup Time:** 3-5 hours  

**Repository:** https://github.com/microsoft/fluentui-emoji

### Asset Organization
```
public/assets/
├── toys/          # From FluentUI: teddy bear, car, ball, etc.
├── clothing/      # From FluentUI: shirt, pants, dress, etc.
├── books/         # From FluentUI: book, notebook, etc.
└── misc/          # From FluentUI: pillow, blanket, etc.
```

## Key Technical Patterns

### Object Detection: Azure AI Vision (LOCKED CHOICE)

**Why Azure AI Vision:**
- **Highest quality detection** among all options
- **Free tier:** 5,000 images/month (perfect for MVP)
- **Paid tier:** $1 per 1,000 images after free tier
- **Excellent accuracy:** 90-95% object detection
- **Fast processing:** 1-2 seconds
- **Enterprise-grade reliability**

**Azure AI Vision Integration (`app/api/detect/route.ts`):**
```typescript
// Call Azure Computer Vision API
const response = await fetch(
  `https://${AZURE_ENDPOINT}/vision/v3.2/analyze?visualFeatures=Objects,Tags`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
    },
    body: JSON.stringify({ url: imageUrl })
  }
);

// Returns: List of detected objects with bounding boxes
// Example: [{ name: "teddy bear", confidence: 0.95, rectangle: {...} }]
```

**Matching Algorithm (`lib/matching.ts`):**
1. Exact name match to FluentUI Emoji
2. Keyword matching (e.g., "stuffed animal" → teddy bear emoji)
3. Category-based fallback (generic_toy, generic_clothing)
4. Ultimate fallback: question mark emoji

**Asset Metadata Structure (`public/assets.json`):**
```json
{
  "teddy_bear": {
    "file": "/assets/toys/teddy_bear.png",
    "fluent_emoji": "teddy-bear",
    "category": "toys",
    "keywords": ["teddy", "bear", "stuffed", "plush"],
    "size": "medium"
  }
}
```

### Canvas Rendering & Interaction

**HTML5 Canvas approach** (not DOM/CSS):
- Better performance for 20-50 draggable objects
- Manual draw loop with `requestAnimationFrame`
- Preload all FluentUI Emoji sprites before rendering
- Draw order: Toca Boca style background → objects → selection highlights

**Drag & Drop (`components/GameCanvas.tsx`):**
- Mouse/touch events for selecting objects
- Smooth dragging with position updates
- Drop zones for "cleaned" vs "messy" areas
- Visual feedback on object selection

## Tech Stack (Locked)

**Framework:** Next.js 14 (App Router) + React + TypeScript  
**Styling:** Tailwind CSS  
**State:** Zustand  
**Detection API:** Azure AI Vision (5,000 free/month)  
**Asset Library:** FluentUI Emoji 3D (Microsoft, MIT)  
**Deployment:** Vercel (free tier sufficient for MVP)  
**Canvas:** HTML5 Canvas for rendering and drag-drop

## File Structure

```
app/
├── api/detect/route.ts          # Azure AI Vision integration
├── game/page.tsx                # Main game page
components/
├── ImageUpload.tsx              # Photo upload with preview
├── GameCanvas.tsx               # HTML5 canvas renderer with drag-drop
├── ObjectList.tsx               # Display detected objects
lib/
├── detection.ts                 # Azure AI Vision wrapper
├── matching.ts                  # Match objects to FluentUI Emoji
├── store.ts                     # Zustand state management
public/
├── assets/                      # FluentUI Emoji library
│   ├── toys/                    # Organized by category
│   ├── clothing/
│   ├── books/
│   └── misc/
└── assets.json                  # Metadata mapping
```

## Development Workflow (Simplified)

### Week 1: Setup & Validation
- Set up Azure AI Vision account (free tier)
- Download and organize FluentUI Emoji 3D assets
- Test detection on 10 messy room photos
- Validate 80%+ accuracy and asset coverage

### Weeks 2-3: Core Pipeline
- Build upload → Azure detection → object list creation
- Implement asset matching (detected object → FluentUI Emoji)
- Create Toca Boca style canvas background

### Week 4: Interaction
- Implement canvas rendering with matched assets
- Add drag & drop for each object
- Track "cleaned" vs "messy" state

### Week 5: Polish & Launch
- Visual polish (Toca Boca aesthetic)
- Beta test with kids
- Deploy MVP

**Reference:** `VISUAL_ROADMAP.md` for detailed week-by-week tasks.

## Critical Documentation Files

- `START_HERE.md` - Quick reference and decision matrix ⭐ **START HERE**
- `ARCHITECTURE_LOCKED.md` - Complete locked architecture (source of truth)
- `ICON_PACK_RESEARCH.md` - FluentUI Emoji details and setup
- `IMPLEMENTATION_GUIDE.md` - Code examples for Azure + FluentUI Emoji
- `VISUAL_ROADMAP.md` - Week-by-week development plan (focus on core features)
- `Messyroomgame.tsx` - Phase 2 reference prototype (shows future enhancements)

## Using Messyroomgame.tsx as Reference

When building MVP, extract these patterns from `Messyroomgame.tsx`:
- Image upload flow (lines 33-46)
- Canvas setup and draw loop (lines 210-340)
- Drag & drop handlers (lines 380-450)
- Object positioning logic (lines 95-115)

**Do NOT copy:** Physics code, particle systems, scoring, Claude API calls

**When building Phase 2 features** (post-MVP), reference the full implementation for:
- Spring physics implementation
- Squash/stretch animations
- Particle burst effects
- Celebration sequences
- Scoring system

**Important for Phase 2:** Keep using FluentUI Emoji PNG sprites (not the emoji characters shown in prototype). By Phase 2, the library will be built and working. Add physics/particles/scoring on top of the existing FluentUI sprite system. All enhancements must mesh with the core Toca Boca cleanup concept.

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

## Performance Targets

- **Detection:** < 2 seconds (Azure AI Vision)
- **Rendering:** 60 FPS canvas performance
- **Match Rate:** 80%+ correct sprite matches
- **Coverage:** 90%+ detected objects have matching emoji

## Cost Targets (Monthly at 1K users)

**Locked Architecture Stack:**
- Azure AI Vision: $0/month (free tier covers 5,000 images)
- FluentUI Emoji: $0 (MIT license, free)
- Hosting: $0-20 (Vercel free tier)
- **Total: $0-20/month for MVP**

Scales to: $25-50/month at 10K users

## Common Pitfalls

1. **Don't aim for 100% object matching** - 80-90% coverage is excellent with FluentUI Emoji
2. **Don't use other APIs** - Azure AI Vision is locked for highest quality detection
3. **Don't source other icon libraries** - FluentUI Emoji is locked for consistency
4. **Don't add Phase 2 features to MVP** - Focus on core functionality first
5. **Don't skip kid beta testing** - Adults can't predict what's fun for 6-10 year olds
6. **Don't build mobile apps first** - Web works everywhere, iterate faster

## Questions? Check These First

- **"How do I add a new object type?"** → Find matching FluentUI Emoji, add to `public/assets/[category]/`, update `assets.json`
- **"Why won't objects detect properly?"** → Azure AI Vision is highest quality - check confidence threshold in `app/api/detect/route.ts`
- **"Can I use a different icon library?"** → No, FluentUI Emoji is locked for quality and licensing
- **"Can I use Claude/Gemini instead?"** → No, Azure AI Vision is locked for detection quality
- **"How do I organize FluentUI assets?"** → See `ICON_PACK_RESEARCH.md` for setup guide

## Core Project Truth (Locked)

**Remember:** Kid uploads image → Azure detects objects (creates list) → FluentUI Emoji assets replace detected objects in Toca Boca style scene → User drags objects to clean digitally.

**MVP Scope:** Core drag-drop cleanup functionality only.

**Post-MVP (Future):** Sound effects, particle systems, physics animations, and gamification can be added in Phase 2.

## Repository Context

**Owner:** SlySlayer32  
**Status:** Research/planning phase  
**Next Step:** Set up Azure AI Vision free tier + download FluentUI Emoji 3D assets

## Getting Started as an Agent

1. **`START_HERE.md`** - Quick reference and decision matrix
2. **`ARCHITECTURE_LOCKED.md`** - Complete locked architecture (source of truth)
3. **This file** - AI agent-specific guidance
4. **`ICON_PACK_RESEARCH.md`** - FluentUI Emoji setup details
5. **`IMPLEMENTATION_GUIDE.md`** - Code patterns (focus on Azure sections)

**Core truth:** Azure AI Vision + FluentUI Emoji + Drag-Drop cleanup. Nothing more.

**If docs conflict:** `ARCHITECTURE_LOCKED.md` > `.github/copilot-instructions.md` > other docs
