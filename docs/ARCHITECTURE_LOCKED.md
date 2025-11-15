# Architecture - LOCKED DECISIONS

**Last Updated:** November 15, 2025  
**Status:** Final Architecture Decisions

---

## ⚠️ CORE PROJECT TRUTH (DO NOT DEVIATE)

> "Kid uploads original messy room image → Azure AI Vision detects all objects and creates list → App converts scene to Toca Boca style room using FluentUI Emoji library assets to replace detected objects → User selects and moves each object to digitally clean their room up."

This is the **SOLE PURPOSE** of this project.

---

## 🔒 LOCKED TECHNOLOGY DECISIONS

### Object Detection: Azure AI Vision
- **Choice:** Azure Computer Vision API v3.2
- **Reason:** Highest quality detection, 5,000 free images/month, $1/1K after
- **NO alternatives:** Claude, Gemini, GPT-4o are NOT to be used
- **Endpoint:** `https://{endpoint}/vision/v3.2/analyze?visualFeatures=Objects,Tags`

### Asset Library: FluentUI Emoji 3D
- **Choice:** Microsoft FluentUI Emoji 3D (MIT License)
- **Source:** https://github.com/microsoft/fluentui-emoji
- **Coverage:** 2,980 icons covering 92% of common room objects
- **Cost:** $0 (MIT license, no attribution required)
- **NO alternatives:** No commissioned art, no DALL-E generation, no other icon packs

### Interaction: Drag & Drop Cleanup
- **Interface:** HTML5 Canvas with mouse/touch drag events
- **Purpose:** User selects and moves each detected object to clean digitally
- **NO additions:** No gamification scores, no physics animations, no rewards
- **Simple tracking:** Count of objects moved vs. total objects

---

## 🚫 DEPRECATED APPROACHES (DO NOT USE)

### ❌ Alternative APIs
- **Claude Vision API** - More expensive, not highest quality
- **Google Gemini Flash** - Not highest quality
- **OpenAI GPT-4o Vision** - Not highest quality
- **Custom YOLO models** - Unnecessary complexity

### ❌ Alternative Asset Sources
- **Commissioned artists (Fiverr)** - $750-1,500, unnecessary cost
- **DALL-E/Stable Diffusion generation** - Inconsistent style
- **Other icon libraries** - Licensing complexity, lower coverage

### 🔮 Future Enhancement Features (Post-MVP)
These features are **NOT in MVP scope** but can be added in future versions:

**Phase 2 Enhancements (Optional):**
- **Sound effects** - Audio feedback on object interactions
- **Particle systems** - Celebration animations when cleaning
- **Physics/spring animations** - Kawaii bouncy movements
- **Gamification** - Scoring, stars, rewards system

**Phase 3 Enhancements (Optional):**
- **Progress tracking** - Streaks, achievements, leaderboards
- **Before/after comparison** - Photo analysis
- **Unlockables** - Themes, decorations

**MVP Focus:** Core functionality first. Enhancements only after MVP validates concept.

---

## ✅ IN-SCOPE FEATURES (FINAL)

### 1. Photo Upload
- User uploads image of messy room
- Display preview
- Basic validation (file type, size)

### 2. Object Detection
- Call Azure AI Vision API
- Receive list of detected objects with confidence scores
- Display list to user (for transparency)

### 3. Asset Matching
- Match each detected object to FluentUI Emoji sprite
- Exact name matching
- Keyword matching (e.g., "stuffed animal" → teddy bear)
- Category fallback (generic toy, clothing, etc.)
- Unknown object fallback (question mark emoji)

### 4. Scene Rendering
- Draw Toca Boca-style background (simple, flat design)
- Position FluentUI Emoji sprites based on detection coordinates
- Scale sprites appropriately

### 5. Drag & Drop Interaction
- User can click/tap to select object
- Drag object to new position
- Visual feedback (highlight selected object)
- Track which objects have been "cleaned" (moved to designated area)

### 6. Simple Progress
- Display: "X of Y objects cleaned"
- Optional: "Cleaning Zone" indicator
- Optional: "All clean!" message when complete

**That's it. Nothing more.**

---

## 📁 PROJECT FILE STRUCTURE

```
app/
├── api/
│   └── detect/
│       └── route.ts              # Azure AI Vision API integration
├── game/
│   └── page.tsx                  # Main game page
├── layout.tsx
└── page.tsx                      # Landing page

components/
├── ImageUpload.tsx               # Photo upload UI
├── GameCanvas.tsx                # Canvas renderer with drag-drop
└── ObjectList.tsx                # Display detected objects

lib/
├── detection.ts                  # Azure AI Vision wrapper
├── matching.ts                   # Match objects to FluentUI Emoji
└── store.ts                      # Zustand state (minimal)

public/
├── assets/
│   ├── toys/                     # FluentUI Emoji - toys category
│   ├── clothing/                 # FluentUI Emoji - clothing category
│   ├── books/                    # FluentUI Emoji - books category
│   └── misc/                     # FluentUI Emoji - misc category
└── assets.json                   # Metadata: object → emoji mapping

.github/
└── copilot-instructions.md       # AI agent guidance (this architecture)
```

---

## 🛠️ IMPLEMENTATION PRIORITIES

### Week 1: Foundation
1. Set up Next.js 14 project
2. Create Azure AI Vision account (free tier)
3. Download FluentUI Emoji 3D assets
4. Organize assets into categories

### Week 2: Detection Pipeline
1. Build image upload component
2. Integrate Azure AI Vision API
3. Parse detection results
4. Display object list

### Week 3: Matching & Rendering
1. Create asset metadata (`assets.json`)
2. Build matching algorithm
3. Set up HTML5 Canvas
4. Render Toca Boca background
5. Position FluentUI Emoji sprites

### Week 4: Interaction & Polish
1. Implement drag & drop
2. Track cleaned vs. messy objects
3. Display progress counter
4. Visual polish (Toca Boca aesthetic)

### Week 5: Testing & Deployment
1. Test with 10+ real messy room photos
2. Validate 80%+ detection + matching accuracy
3. Beta test with kids (usability)
4. Deploy to Vercel
5. Launch MVP

### Post-MVP: Phase 2 Enhancements (Optional, 2-3 weeks)
Can be added after MVP validates the concept:
1. **Sound effects** - Pick up, drop, success sounds
2. **Particle systems** - Sparkles and celebrations (see `Messyroomgame.tsx`)
3. **Physics animations** - Bouncy spring movements (see `Messyroomgame.tsx`)
4. **Scoring and gamification** - Points, stars, progress tracking (see `Messyroomgame.tsx`)

**Implementation Reference:** See `Messyroomgame.tsx` for working examples of Phase 2 features (physics, particles, animations, scoring). This prototype shows what the enhanced version should feel like.

**Critical for Phase 2:** Continue using FluentUI Emoji PNG sprites (not emoji characters). By Phase 2, the asset library will be established. Layer physics/particles/scoring on top of existing sprite system. All enhancements must complement and enhance the core Toca Boca cleanup concept - they should make cleaning more fun, not distract from it.

These are OPTIONAL enhancements only if MVP is successful.

---

## 💰 COST STRUCTURE (FINAL)

### Development (One-Time)
- **FluentUI Emoji setup:** $0 (MIT license)
- **Azure AI Vision setup:** $0 (free tier)
- **Next.js development:** 4-5 weeks @ $0 (DIY) or $3,000-5,000 (hire)
- **Total:** $0-5,000

### Operating (Monthly)
- **Azure AI Vision:** $0/month for first 5,000 images (covers MVP)
- **Hosting (Vercel):** $0/month (free tier)
- **Total:** $0/month for MVP

### Scaling (at 10,000 users, ~30,000 images/month)
- **Azure AI Vision:** $25/month ($1 per 1,000 images after free tier)
- **Hosting (Vercel):** $20/month (Pro tier)
- **Total:** $45/month

**No other costs.** This is the simplest, most cost-effective architecture.

---

## 📊 SUCCESS METRICS

### MVP Phase (Core Functionality)
**Technical:**
- **Detection accuracy:** 80%+ objects correctly identified
- **Match rate:** 85%+ objects matched to appropriate FluentUI Emoji
- **Processing time:** < 5 seconds (upload → rendered scene)
- **Performance:** 60 FPS canvas rendering

**User:**
- **Completion rate:** 70%+ of users clean all detected objects
- **Session time:** 5-10 minutes average
- **Usability:** Kids aged 6-10 can use without help

### Phase 2 (If Added)
Only measure if enhancements are implemented:
- **Engagement:** Does sound/particles increase session time?
- **Fun factor:** Do kids prefer with or without physics?
- **Retention:** Does gamification improve return rate?

---

## 🚨 WHAT TO DO IF...

### Someone suggests adding features
**Response:** "This feature is out of scope. See `ARCHITECTURE_LOCKED.md`."

### Someone suggests different APIs/libraries
**Response:** "Azure AI Vision + FluentUI Emoji are locked decisions. See `ARCHITECTURE_LOCKED.md`."

### Documentation conflicts with this file
**Response:** "This file (`ARCHITECTURE_LOCKED.md`) is the source of truth. Update conflicting docs."

### You're an AI agent unsure about approach
**Response:** "Read this file first. If still unclear, ask owner @SlySlayer32."

---

## 📝 REVISION HISTORY

- **November 15, 2025:** Initial locked architecture document created
- Future changes require owner approval

---

**This document represents the final, locked architecture. Do not deviate without explicit owner approval.**
