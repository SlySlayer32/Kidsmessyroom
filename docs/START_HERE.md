# START HERE - Quick Reference

**Last Updated:** November 15, 2025  
**Status:** Aligned with VISUAL_ROADMAP.md (Gold Standard)

---

## 🎯 Project Core Truth

> "Kid uploads messy room photo → OpenAI GPT-4o detects all objects with positions → App matches objects to FluentUI Emoji sprites → Konva.js renders Toca Boca-style scene → User drags objects to cleanup zones → Track progress and celebrate completion!"

**Source of Truth:** **VISUAL_ROADMAP.md** - The gold standard development plan.

---

## 📋 Quick Decision Matrix

| Question | Answer | Details |
|----------|--------|---------|
| **What API for detection?** | OpenAI GPT-4o Vision | `VISUAL_ROADMAP.md` |
| **What canvas library?** | Konva.js (react-konva) | `VISUAL_ROADMAP.md` |
| **What assets to use?** | FluentUI Emoji 3D (MVP) | `VISUAL_ROADMAP.md` |
| **Timeline for MVP?** | 8 weeks | `VISUAL_ROADMAP.md` |
| **Gamification in MVP?** | No - Phase 2 only | `VISUAL_ROADMAP.md` |
| **Physics in MVP?** | No - Phase 2 only | `VISUAL_ROADMAP.md` |
| **Alternative APIs?** | No - GPT-4o locked | `VISUAL_ROADMAP.md` |
| **Custom art in MVP?** | No - Phase 2 only | `VISUAL_ROADMAP.md` |

---

## 📚 Document Hierarchy (Read in Order)

### 1. ⭐ Source of Truth
- **`VISUAL_ROADMAP.md`** ← **READ THIS FIRST**
  - Gold standard development plan
  - 8-week MVP timeline with detailed tasks
  - Technology stack decisions and reasoning
  - Phase 2 enhancement roadmap
  - All architectural decisions originate here

### 2. Architecture & Implementation
- **`ARCHITECTURE_LOCKED.md`** ← **READ THIS SECOND**
  - Aligned with VISUAL_ROADMAP.md
  - Consolidated architectural decisions
  - Technology stack summary
  - Success metrics

- **`IMPLEMENTATION_GUIDE.md`**
  - Code examples for OpenAI GPT-4o Vision
  - Konva.js canvas patterns
  - Asset matching algorithm
  - **Note:** Update examples to match VISUAL_ROADMAP.md stack

- **`ICON_PACK_RESEARCH.md`**
  - FluentUI Emoji setup guide
  - Download and organization instructions
  - Coverage analysis (92% of needed assets)

### 3. Reference & Supporting Docs
- **`PROJECT_SUMMARY.md`** - Overview and navigation
- **`QUICK_START.md`** - Quick start guide for founders
- **`README.md`** - Project introduction

---

## 🚀 Quick Start (Following VISUAL_ROADMAP.md)

### Step 1: Set Up OpenAI GPT-4o API (15 minutes)
1. Create OpenAI account: https://platform.openai.com/
2. Add payment method and get API key
3. Securely store key in environment variables
4. Test with a sample image upload
5. Cost: ~$0.01-0.03 per image

### Step 2: Download FluentUI Emoji (30 minutes)
1. Clone: https://github.com/microsoft/fluentui-emoji
2. Navigate to `assets/` folder
3. Select 3D style versions
4. Download 50-70 high-quality 3D PNGs
5. Organize into: toys/, clothing/, books/, furniture/
6. Optimize PNGs for web

### Step 3: Set Up Next.js Project (20 minutes)
```bash
npx create-next-app@latest toca-room --typescript --tailwind
cd toca-room
npm install konva react-konva zustand lucide-react
```

### Step 4: Create Core Files (Following VISUAL_ROADMAP.md structure)
1. `app/api/detect/route.ts` - OpenAI GPT-4o integration
2. `components/ImageUpload.tsx` - Photo upload with preview
3. `components/GameCanvas.tsx` - Konva.js Stage component
4. `lib/matching.ts` - Asset matching algorithm
5. `public/assets.json` - Master asset metadata with keywords

### Step 5: Follow 8-Week Timeline
See **VISUAL_ROADMAP.md** for detailed week-by-week tasks:
- Week 1-2: Foundations & Asset Pipeline
- Week 3-4: AI Vision & Object Detection
- Week 5-6: Scene Reconstruction & Matching
- Week 7: Interaction & Gameplay
- Week 8: Testing & Deployment

---

## 🔧 Common Tasks

### Add a New Object Type
1. Find matching FluentUI Emoji 3D asset
2. Add PNG to `public/assets/[category]/`
3. Update `public/assets.json` with comprehensive keywords:
```json
{
  "new_object": {
    "id": "new_object",
    "file": "/assets/toys/new_object.png",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "category": "toys"
  }
}
```

### Improve Matching Accuracy
1. Review unmatched objects from GPT-4o responses
2. Add more synonyms and keywords to `assets.json`
3. Implement fallback logic (generic category icons)
4. Test with diverse room photos

### Update OpenAI API Integration
1. Edit `app/api/detect/route.ts`
2. Refine the prompt for better object detection
3. Parse JSON response for object names and bounding boxes
4. Test with sample images and adjust prompt as needed

---

## ⚠️ If Someone Asks...

### "Can we add scoring/gamification?"
**Answer:** Not in MVP (Week 1-8). Phase 2 enhancement. See VISUAL_ROADMAP.md Phase 2.

### "Can we add physics/sound/particles?"
**Answer:** Not in MVP (Week 1-8). Phase 2 enhancement. See VISUAL_ROADMAP.md Phase 2.

### "Can we use Azure/Claude/Gemini instead of GPT-4o?"
**Answer:** No, OpenAI GPT-4o is locked per VISUAL_ROADMAP.md for accuracy and simplicity.

### "Can we generate custom assets with DALL-E for MVP?"
**Answer:** No, FluentUI Emoji is MVP choice. Custom art is Phase 2. See VISUAL_ROADMAP.md.

### "Can we use raw Canvas instead of Konva.js?"
**Answer:** No, Konva.js is locked per VISUAL_ROADMAP.md for React integration and ease.

### "This doc conflicts with another doc"
**Answer:** VISUAL_ROADMAP.md is the gold standard source of truth.

---

## 📞 Getting Help

### For Developers
1. Check **`VISUAL_ROADMAP.md`** first - Gold standard plan
2. Check `ARCHITECTURE_LOCKED.md` for consolidated decisions
3. Reference `IMPLEMENTATION_GUIDE.md` for code patterns
4. Check `.github/instructions/copilot-instructions.md` for AI guidance
5. Ask @SlySlayer32 for clarification

### For AI Agents
1. Read **`VISUAL_ROADMAP.md`** thoroughly - This is the source of truth
2. Read `.github/instructions/copilot-instructions.md` for agent-specific guidance
3. Adhere to decisions in VISUAL_ROADMAP.md and ARCHITECTURE_LOCKED.md
4. Do not suggest features outside Phase 1 MVP scope
5. Reference code patterns from `IMPLEMENTATION_GUIDE.md`

---

## ✅ Success Checklist (8-Week MVP)

Before considering MVP complete (Week 8):

- [ ] OpenAI GPT-4o API integrated and tested
- [ ] 50-70 FluentUI Emoji 3D assets downloaded and organized
- [ ] Master asset metadata file (assets.json) with comprehensive keywords
- [ ] Asset matching algorithm working (85%+ accuracy)
- [ ] Konva.js canvas rendering Toca Boca-style background
- [ ] Drag & drop interaction using Konva.js draggable
- [ ] Cleanup zones defined with visual feedback
- [ ] Progress UI showing "Items Cleaned: X / Y"
- [ ] Beta tested with 3-5 kids in target age range
- [ ] Addressed critical feedback from user testing
- [ ] Tested with 10+ real messy room photos
- [ ] Works on desktop and mobile browsers (responsive)
- [ ] Deployed to Vercel with production config
- [ ] 🎉 MVP LAUNCHED!

---

## 🎯 Timeline (From VISUAL_ROADMAP.md)

**Week 1-2:** Foundations & Asset Pipeline  
**Week 3-4:** AI Vision & Object Detection  
**Week 5-6:** Scene Reconstruction & Matching  
**Week 7:** Interaction & Core Gameplay Loop  
**Week 8:** User Testing, Polish & Deployment  

**Total:** 8 weeks to MVP launch

**Phase 2 (Post-MVP):** Custom art, physics, sound, gamification

---

**Questions? Start with `VISUAL_ROADMAP.md` - The Gold Standard Plan.**
