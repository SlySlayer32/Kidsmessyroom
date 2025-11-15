# Architecture - LOCKED DECISIONS

**Last Updated:** November 15, 2025  
**Status:** Final Architecture Decisions (Aligned with VISUAL_ROADMAP.md)

---

## ⚠️ CORE PROJECT TRUTH (DO NOT DEVIATE)

> "Kid uploads messy room image → OpenAI GPT-4o API detects all objects with positions → App converts scene to Toca Boca style room using FluentUI Emoji library assets to replace detected objects → User drags and drops objects to cleanup zones to digitally clean their room."

This is the **SOLE PURPOSE** of this project.

**Source of Truth:** All architectural decisions follow **VISUAL_ROADMAP.md** (Gold Standard)

---

## 🔒 LOCKED TECHNOLOGY DECISIONS

### Object Detection: OpenAI GPT-4o API
- **Choice:** OpenAI's GPT-4o Vision API
- **Reason:** State-of-the-art object identification with positions, cost-effective per-call basis, simpler than training custom models
- **Accuracy:** 90-95% object detection with bounding box coordinates
- **Cost:** ~$0.01-0.03 per image
- **API Endpoint:** OpenAI Vision API with structured JSON response

### Asset Library: FluentUI Emoji 3D
- **Choice:** Microsoft FluentUI Emoji 3D (MIT License)
- **Source:** https://github.com/microsoft/fluentui-emoji
- **Coverage:** 50-70 high-quality 3D PNGs for MVP (toys, clothes, books, furniture)
- **Cost:** $0 (MIT license, no attribution required)
- **Quality:** Fantastic, free, high-quality starting point with playful aesthetic

### Game Canvas: Konva.js
- **Choice:** Konva.js (2D HTML5 Canvas library)
- **Reason:** Powerful, works seamlessly with React, makes drag-and-drop, scaling, and layering simple
- **Integration:** react-konva for React components
- **Built-in Features:** Draggable property, visual feedback, event handling

---

## 🚫 DEPRECATED APPROACHES (DO NOT USE)

### ❌ Alternative APIs
- **Azure AI Vision** - Previously considered but GPT-4o is the locked choice
- **Claude Vision API** - Not the chosen solution
- **Google Gemini Flash** - Not the chosen solution
- **Custom YOLO models** - Unnecessary complexity for MVP

### ❌ Alternative Asset Sources
- **Commissioned artists (Fiverr)** - Reserved for Phase 2 "Gold Standard" custom art
- **DALL-E/Stable Diffusion generation** - Inconsistent style for MVP
- **Other icon libraries** - FluentUI Emoji is the locked MVP choice

### ❌ Alternative Canvas Libraries
- **Raw HTML5 Canvas** - Konva.js provides better developer experience
- **Phaser.js** - Overkill for this use case
- **PixiJS** - More complex than needed

---

## 🎯 PHASED APPROACH (FROM VISUAL_ROADMAP.md)

### Phase 1: The MVP (8 Weeks) - Building Core Magic
**Goal:** Prove the concept works and is fun

**Core Features (IN SCOPE):**
- Photo upload and preview
- GPT-4o API object detection with bounding boxes
- Asset matching algorithm (FluentUI Emoji)
- Konva.js canvas scene reconstruction
- Drag & drop interaction with visual feedback
- Cleanup zones and cleanup logic
- Progress UI (Items Cleaned: X / Y)

**MVP Success Criteria:**
- User can upload photo
- App detects 20-50 objects with 80%+ accuracy
- Objects are replaced with appropriate FluentUI Emoji sprites
- User can drag objects to cleanup zones
- Progress is tracked and displayed

### Phase 2: "Gold Standard" Polish (Post-MVP)
**Only begin after MVP proves concept is fun and engaging**

**Milestone 1: Custom Art & Branding**
- Commission digital artist for 50-70 custom Toca Boca-style assets
- Design brand identity (logo, colors, fonts)
- Replace FluentUI placeholders with custom sprites

**Milestone 2: Adding "Juice" (Physics & Animation)**
- Implement spring physics (react-spring)
- Add squash & stretch animations
- Create particle effects for cleanup success

**Milestone 3: Sound & Music**
- Source/purchase sound effects
- Add background music

**Milestone 4: Gamification & Retention**
- Scoring system and star ratings
- Victory screen with celebrations
- Challenge modes (Beat the Clock, themed rooms)

---

## ✅ IN-SCOPE MVP FEATURES (8-Week Timeline)

### Week 1-2: Foundations & Asset Pipeline
- [ ] Setup Next.js project with TypeScript and Tailwind
- [ ] Install dependencies: konva, react-konva, zustand, lucide-react
- [ ] Download & organize 50-70 FluentUI Emoji 3D PNGs
- [ ] Create scalable asset structure (toys/, clothing/, books/, furniture/)
- [ ] Build master asset metadata file (`public/assets.json`)
- [ ] Create comprehensive keyword system for matching

### Week 3-4: AI Vision & Object Detection
- [ ] Set up OpenAI API account and get API key
- [ ] Build image upload component with preview
- [ ] Create backend detection API route (`/app/api/detect/route.ts`)
- [ ] Send images to GPT-4o with specific prompt for object detection
- [ ] Parse JSON response with object names and bounding boxes
- [ ] Build debug UI to display detected objects and coordinates

### Week 5-6: Scene Reconstruction & Asset Matching
- [ ] Build asset matching algorithm (`/lib/matching.ts`)
- [ ] Implement keyword search with fallback logic
- [ ] Create Konva.js Stage component (`/components/GameCanvas.tsx`)
- [ ] Set up background layer with Toca Boca-style colors
- [ ] Load and position FluentUI Emoji sprites using bounding box data
- [ ] Scale sprites appropriately on canvas

### Week 7: Interaction & Core Gameplay Loop
- [ ] Implement drag & drop using Konva.js draggable property
- [ ] Add visual feedback for dragging (scale, shadow)
- [ ] Define cleanup zones on canvas
- [ ] Implement cleanup logic (detect when object in zone)
- [ ] Visual feedback for cleaned objects (snap, animate, transparency)
- [ ] Build progress UI: "Items Cleaned: X / Y"

### Week 8: User Testing, Polish & Deployment
- [ ] Conduct user testing with 3-5 kids (with parental permission)
- [ ] Address critical issues from testing
- [ ] Improve UI/UX feedback (buttons, instructions)
- [ ] Ensure responsive (mobile and desktop)
- [ ] Deploy to Vercel with production environment variables
- [ ] Test live production build thoroughly

**Deliverable:** 🎉 **MVP LAUNCHED!** Fully functional web app ready for initial users.

---

## 📁 PROJECT FILE STRUCTURE (FROM VISUAL_ROADMAP.md)

```
toca-room/                        # Created via: npx create-next-app@latest toca-room --typescript --tailwind
├── app/
│   ├── api/
│   │   └── detect/
│   │       └── route.ts          # OpenAI GPT-4o Vision API integration
│   ├── game/
│   │   └── page.tsx              # Main game page
│   ├── layout.tsx
│   └── page.tsx                  # Landing/upload page
│
├── components/
│   ├── ImageUpload.tsx           # Photo upload with preview
│   ├── GameCanvas.tsx            # Konva.js Stage component with drag-drop
│   └── ProgressTracker.tsx       # Progress UI component
│
├── lib/
│   ├── matching.ts               # Asset matching algorithm
│   └── store.ts                  # Zustand state management
│
├── public/
│   └── assets/
│       ├── toys/                 # FluentUI Emoji 3D - toys category
│       ├── clothing/             # FluentUI Emoji 3D - clothing category
│       ├── books/                # FluentUI Emoji 3D - books category
│       ├── furniture/            # FluentUI Emoji 3D - furniture category
│       └── assets.json           # Master metadata file with keywords
│
├── docs/
│   ├── VISUAL_ROADMAP.md         # ⭐ SOURCE OF TRUTH - Gold Standard Plan
│   ├── ARCHITECTURE_LOCKED.md    # This file - aligned with VISUAL_ROADMAP.md
│   └── [other docs]              # Supporting documentation
│
└── package.json                  # Dependencies: konva, react-konva, zustand, lucide-react
```

---

## 🛠️ RECOMMENDED TECHNOLOGY STACK

**Based on VISUAL_ROADMAP.md "Gold Standard" recommendations:**

- **Frontend Framework:** Next.js (React) - Robust, great for web apps, easy to deploy
- **AI Object Detection:** OpenAI's GPT-4o API - State-of-the-art, cost-effective per-call basis
- **Asset Library (MVP):** FluentUI Emoji (3D Style) - Free, high-quality, playful aesthetic
- **Game Canvas:** Konva.js - Powerful 2D HTML5 canvas library with React integration
- **State Management:** Zustand - Lightweight, simple state management
- **Icons:** lucide-react - Clean, modern icon set
- **Styling:** Tailwind CSS - Utility-first CSS framework
- **Deployment:** Vercel - Generous free tier, perfect for Next.js MVP

### Installation Command
```bash
npx create-next-app@latest toca-room --typescript --tailwind
cd toca-room
npm install konva react-konva zustand lucide-react
```

---

## 🛠️ IMPLEMENTATION PRIORITIES (8-WEEK MVP)

See **VISUAL_ROADMAP.md** for complete week-by-week breakdown. Summary:

### Week 1-2: Foundations & Asset Pipeline
- Setup Next.js project structure
- Download and organize 50-70 FluentUI Emoji 3D assets
- Build master asset metadata with comprehensive keywords
- **Deliverable:** Functional Next.js project displaying all organized assets

### Week 3-4: AI Vision & Object Detection
- OpenAI API setup and integration
- Build upload UI and detection pipeline
- Parse GPT-4o responses with bounding boxes
- **Deliverable:** User can upload photo and see detected objects list

### Week 5-6: Scene Reconstruction & Asset Matching
- Implement matching algorithm with fallbacks
- Create Konva.js canvas component
- Render Toca Boca-style scene with positioned sprites
- **Deliverable:** Static Toca Boca scene generated from photo

### Week 7: Interaction & Core Gameplay Loop
- Implement Konva.js drag & drop
- Define cleanup zones and logic
- Build progress tracker UI
- **Deliverable:** Fully playable MVP with drag-drop cleanup

### Week 8: User Testing, Polish & Deployment
- Beta test with 3-5 kids in target age range
- Address critical feedback
- Polish UI/UX and ensure responsiveness
- Deploy to Vercel production
- **Deliverable:** 🎉 **MVP LAUNCHED!**

---

## 🎯 POST-MVP: PHASE 2 ENHANCEMENTS

**IMPORTANT:** Only begin Phase 2 after MVP proves concept is fun and engaging.

Reference `Messyroomgame.tsx` for implementation examples when building Phase 2:
- Spring physics with react-spring
- Squash & stretch animations
- Particle effects for celebrations
- Sound effects integration
- Scoring and gamification

**Phase 2 Timeline:** 4-8 weeks additional development after successful MVP launch.

---

## 💰 COST STRUCTURE (ALIGNED WITH VISUAL_ROADMAP.md)

### Development (One-Time, 8 Weeks)
- **FluentUI Emoji setup:** $0 (MIT license, free)
- **OpenAI API testing:** $10-20 (API testing during development)
- **Next.js development:** 8 weeks @ $0 (DIY) or $4,000-6,000 (hire developer)
- **Domain & misc:** $50
- **Total:** $60-6,070

### Operating (Monthly) - MVP Phase
- **OpenAI GPT-4o API:** ~$0.01-0.03 per image
  - At 1,000 users, ~3,000 images/month = $30-90/month
  - Cost-effective on per-call basis
- **Hosting (Vercel):** $0/month (free tier sufficient for MVP)
- **Total:** $30-90/month for MVP

### Scaling (at 10,000 users, ~30,000 images/month)
- **OpenAI GPT-4o API:** $300-900/month
- **Hosting (Vercel):** $20/month (Pro tier)
- **CDN/Storage:** $20/month
- **Total:** $340-940/month

### Future Cost Optimization (Phase 3+)
- Train custom YOLO model for high-volume scenarios
- Reduces per-image cost significantly at scale
- Initial investment: $500-2,000 for model training

**Cost-Benefit:** OpenAI GPT-4o is simpler and more cost-effective than training custom models for MVP phase.

---

## 📊 SUCCESS METRICS (FROM VISUAL_ROADMAP.md)

### MVP Technical KPIs (Must-Have)
- ✅ Object detection accuracy: **>80%** (GPT-4o provides 90-95%)
- ✅ Asset match rate: **>85%** (FluentUI Emoji covers 92% of needs)
- ✅ Processing time: **<5 seconds** (upload → rendered scene)
- ✅ Frame rate: **60 FPS** (Konva.js optimization)
- ✅ User can complete cleanup: **>70%** completion rate

### MVP User Experience KPIs
- 🎯 Session length: **10+ minutes** of engaged play
- 🎯 Usability: Kids aged 6-10 can use **without adult help**
- 🎯 Fun factor: Kids want to **play again** after real cleanup
- 🎯 Return rate: **>50%** return within 7 days

### MVP Validation Questions
By end of Week 8, answer:
- ✅ Can we successfully transform a photo into a playable game?
- ✅ Do kids find it fun and engaging?
- ✅ Does it motivate real-world cleanup?
- ✅ Is the match rate "good enough" (80-90%)?

### Phase 2 Enhancement Metrics (Post-MVP)
Only measure after implementing Phase 2 features:
- **Custom art impact:** Does it increase engagement vs. FluentUI Emoji?
- **Physics impact:** Do animations increase session time?
- **Sound impact:** Does audio improve fun factor?
- **Gamification impact:** Do scores/stars improve retention?

---

## 🚨 WHAT TO DO IF...

### Someone suggests adding features beyond MVP
**Response:** "Phase 2 features are documented but out of MVP scope. See VISUAL_ROADMAP.md Phase 2 section."

### Someone suggests different APIs
**Response:** "OpenAI GPT-4o is the locked choice per VISUAL_ROADMAP.md. See reasoning in roadmap."

### Someone suggests different canvas library
**Response:** "Konva.js is locked choice per VISUAL_ROADMAP.md for React integration and ease of use."

### Documentation conflicts with VISUAL_ROADMAP.md
**Response:** "VISUAL_ROADMAP.md is the gold standard source of truth. Update conflicting docs to align."

### Documentation conflicts with this file
**Response:** "Both this file and VISUAL_ROADMAP.md should align. VISUAL_ROADMAP.md takes precedence."

### You're an AI agent unsure about approach
**Response:** "Read VISUAL_ROADMAP.md first, then this file. If unclear, ask owner @SlySlayer32."

---

## 📚 DOCUMENTATION HIERARCHY

1. **VISUAL_ROADMAP.md** ⭐ - Gold Standard source of truth for all decisions
2. **ARCHITECTURE_LOCKED.md** - This file, aligned with VISUAL_ROADMAP.md
3. **IMPLEMENTATION_GUIDE.md** - Code examples following the architecture
4. **START_HERE.md** - Quick reference guide
5. **Other docs** - Supporting documentation

**If any conflict arises:** VISUAL_ROADMAP.md > ARCHITECTURE_LOCKED.md > other docs

---

## 📝 REVISION HISTORY

- **November 15, 2025:** Completely aligned with VISUAL_ROADMAP.md gold standard approach
  - Changed from Azure AI Vision → OpenAI GPT-4o API
  - Changed from raw HTML5 Canvas → Konva.js
  - Updated timeline from 5 weeks → 8 weeks
  - Made VISUAL_ROADMAP.md the definitive source of truth
- Future changes must maintain alignment with VISUAL_ROADMAP.md

---

## 🎯 CORE PRINCIPLES (FROM VISUAL_ROADMAP.md)

- **MVP First, Polish Second:** Build functional core experience first, then enhance
- **Open-Source by Default:** Use free, open-source libraries without compromising quality
- **Asset Replacement is Key:** Toca Boca aesthetic via sprite replacement, not photo styling
- **User Feedback is Crucial:** Build in testing with target audience (kids) early

---

**This document is aligned with VISUAL_ROADMAP.md (Gold Standard). All decisions follow the proven development pattern outlined in the roadmap.**
