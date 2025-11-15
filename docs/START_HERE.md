# START HERE - Quick Reference

**Last Updated:** November 15, 2025

---

## 🎯 Project Core Truth

> "Kid uploads original messy room image → Azure AI Vision detects all objects and creates list → App converts scene to Toca Boca style room using FluentUI Emoji library assets to replace detected objects → User selects and moves each object to digitally clean their room up."

**That's it. Nothing more.**

---

## 📋 Quick Decision Matrix

| Question | Answer | Details |
|----------|--------|---------|
| **What API for detection?** | Azure AI Vision | `ARCHITECTURE_LOCKED.md` |
| **What assets to use?** | FluentUI Emoji 3D | `ICON_PACK_RESEARCH.md` |
| **Gamification?** | No | Out of scope |
| **Physics animations?** | No | Out of scope |
| **Alternative APIs?** | No | Azure locked |
| **Commission artists?** | No | FluentUI locked |
| **Generate with AI?** | No | FluentUI locked |

---

## 📚 Document Hierarchy (Read in Order)

### 1. Architecture (Start Here)
- **`ARCHITECTURE_LOCKED.md`** ← **READ THIS FIRST**
  - Final locked decisions
  - What's in scope, what's not
  - Technology stack
  - Implementation priorities

### 2. Implementation Guides
- **`ICON_PACK_RESEARCH.md`**
  - FluentUI Emoji setup
  - How to download and organize assets
  - Coverage analysis

- **`IMPLEMENTATION_GUIDE.md`**
  - Code examples for Azure AI Vision
  - Asset matching algorithm
  - Canvas rendering patterns
  - Focus on sections relevant to locked architecture

- **`VISUAL_ROADMAP.md`**
  - 5-week implementation plan
  - Week-by-week tasks
  - Skip gamification/physics sections

### 3. Reference (Additional Context)
- **`PROJECT_SUMMARY.md`** - Original navigation hub
- **`QUICK_START.md`** - Week 1 guide (some sections outdated)
- **`README.md`** - Original brainstorming notes

---

## 🚀 Quick Start (5 Steps)

### Step 1: Set Up Azure AI Vision (15 minutes)
1. Create Azure account: https://portal.azure.com
2. Create Computer Vision resource
3. Copy API key and endpoint
4. Test with curl or Postman
5. Validate free tier (5,000 images/month)

### Step 2: Download FluentUI Emoji (30 minutes)
1. Clone: https://github.com/microsoft/fluentui-emoji
2. Navigate to `assets/` folder
3. Select 3D style, high contrast
4. Copy ~50 relevant icons to project
5. Organize into: toys/, clothing/, books/, misc/

### Step 3: Set Up Next.js Project (20 minutes)
```bash
npx create-next-app@latest kidsmessyroom --typescript --tailwind --app
cd kidsmessyroom
npm install zustand
```

### Step 4: Create Core Files (1 hour)
1. `app/api/detect/route.ts` - Azure API integration
2. `components/ImageUpload.tsx` - Photo upload
3. `components/GameCanvas.tsx` - Canvas renderer
4. `lib/matching.ts` - Asset matching
5. `public/assets.json` - Metadata

### Step 5: Test & Iterate (Ongoing)
1. Test with 10 real messy room photos
2. Validate detection accuracy (target: 80%+)
3. Validate matching accuracy (target: 85%+)
4. Iterate on matching keywords

---

## 🔧 Common Tasks

### Add a New Object Type
1. Find matching FluentUI Emoji
2. Add PNG to `public/assets/[category]/`
3. Update `public/assets.json`:
```json
{
  "new_object": {
    "file": "/assets/toys/new_object.png",
    "fluent_emoji": "new-object",
    "category": "toys",
    "keywords": ["keyword1", "keyword2"],
    "size": "medium"
  }
}
```

### Improve Matching Accuracy
1. Review unmatched objects in logs
2. Add more keywords to `assets.json`
3. Add category fallbacks
4. Test with more photos

### Update Azure API Integration
1. Edit `app/api/detect/route.ts`
2. Adjust `visualFeatures` parameter
3. Parse response fields
4. Test with sample images

---

## ⚠️ If Someone Asks...

### "Can we add scoring/gamification?"
**Answer:** Not in MVP. Can be added in Phase 2 after MVP launch.

### "Can we add physics/sound/particles?"
**Answer:** Not in MVP. Can be added in Phase 2 after MVP launch.

### "Can we use Claude/Gemini instead?"
**Answer:** No, Azure AI Vision is locked for highest quality.

### "Can we generate custom assets with DALL-E?"
**Answer:** No, FluentUI Emoji is locked for consistency.

### "This doc conflicts with another doc"
**Answer:** `ARCHITECTURE_LOCKED.md` is source of truth.

---

## 📞 Getting Help

### For Developers
1. Check `ARCHITECTURE_LOCKED.md` first
2. Check `.github/copilot-instructions.md` for AI guidance
3. Reference `IMPLEMENTATION_GUIDE.md` for code patterns
4. Ask @SlySlayer32 for clarification

### For AI Agents
1. Read `.github/copilot-instructions.md` thoroughly
2. Adhere to locked architecture decisions
3. Do not suggest out-of-scope features
4. Reference code patterns from `IMPLEMENTATION_GUIDE.md`

---

## ✅ Success Checklist

Before considering MVP complete:

- [ ] Azure AI Vision integrated and tested
- [ ] 50+ FluentUI Emoji assets organized
- [ ] Asset matching algorithm working (85%+ accuracy)
- [ ] Canvas rendering Toca Boca style background
- [ ] Drag & drop interaction functional
- [ ] Progress counter showing X/Y cleaned
- [ ] Tested with 10+ real messy room photos
- [ ] Works on desktop and mobile browsers
- [ ] Deployed to Vercel

---

## 🎯 Timeline

**Week 1:** Azure setup + FluentUI download  
**Week 2:** Detection pipeline  
**Week 3:** Matching + rendering  
**Week 4:** Drag & drop interaction  
**Week 5:** Testing + deployment  

**Total:** 5 weeks to MVP

---

**Questions? Start with `ARCHITECTURE_LOCKED.md`.**
