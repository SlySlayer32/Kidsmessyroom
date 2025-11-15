# Visual Development Roadmap

## Overview: From Concept to Launch in 5 Weeks (MVP)

This document provides a visual, week-by-week roadmap for building the MVP of your Toca Boca-style kids cleanup game.

---

## Project Timeline (MVP)

```
Week 1: Asset Library Setup (FluentUI Emoji)
Week 2: Azure AI Vision Detection & Object List
Week 3: Image Processing (Remove Objects or Style Transfer)
Week 4: Scene Building (Toca Boca Background + Asset Placement)
Week 5: Drag & Drop Interaction + Testing
```

**Phase 2 (Optional):** Physics, particles, scoring - only if MVP succeeds
## Week 1: Build FluentUI Emoji Asset Library

### Goals
- ✅ Download and organize FluentUI Emoji 3D assets
- ✅ Create asset metadata mapping
- ✅ Set up project structure

### Tasks

#### Monday-Tuesday: Download FluentUI Emoji 3D Assets
```
[ ] Clone FluentUI Emoji repository
    - https://github.com/microsoft/fluentui-emoji
    - Navigate to assets/[emoji-name]/3D/ folder
    - Select 3D style PNG files (512x512px, high quality)
    
[ ] Download these specific emoji (FluentUI 3D style):
    
    Core Objects (Start with these):
    🧸 Teddy Bear (U+1F9F8) - teddy-bear.png
    📄 Paper/Page (U+1F4C4) - page-facing-up.png  
    👕 T-Shirt (U+1F455) - t-shirt.png
    
    Additional Toys:
    🚗 Toy Car, ⚽ Ball, 🪀 Yo-Yo, 🎮 Game Controller
    🧩 Puzzle Piece, 🎨 Art Supplies, 🎲 Dice, 🪁 Kite
    
    Clothing Items:
    👖 Jeans, 👗 Dress, 🧦 Socks, 👟 Sneakers, 🧢 Cap
    🧥 Jacket, 👔 Necktie, 🎽 Running Shirt, 🩳 Shorts
    
    Books & School:
    📚 Books, 📓 Notebook, 📝 Memo, ✏️ Pencil, 🖍️ Crayon
    📏 Ruler, ✂️ Scissors, 🎒 Backpack
    
    Room Items:
    🛏️ Bed, 🪑 Chair, 🕯️ Candle, 🧸 Pillow (if available)
    🥤 Cup, 🍽️ Plate, 🥄 Spoon, 🍴 Fork
    
[ ] IMPORTANT: Use FluentUI 3D style ONLY
    - Look for the 3D/ subdirectory in each emoji folder
    - Files are high-quality PNG with transparency
    - Consistent rounded, playful Toca Boca-like aesthetic
    - DO NOT use flat 2D emoji or emoji characters
    
[ ] Target: 50-60 objects total for MVP
```

#### Wednesday-Thursday: Organize Asset Library
```
[ ] Create folder structure:
    public/assets/
    ├── toys/           (teddy-bear.png, toy-car.png, etc.)
    ├── clothing/       (t-shirt.png, pants.png, etc.)
    ├── books/          (book.png, notebook.png, etc.)
    └── misc/           (pillow.png, blanket.png, etc.)
    
[ ] Resize all assets:
    - 512x512px PNG with transparency
    - Optimize file sizes
    - Consistent naming (kebab-case)
```

#### Friday: Create Asset Metadata
```
[ ] Build public/assets.json with specific emoji data:
    {
      "teddy_bear": {
        "file": "/assets/toys/teddy-bear.png",
        "unicode": "U+1F9F8",
        "emoji": "🧸",
        "fluent_name": "teddy-bear",
        "category": "toys",
        "keywords": ["teddy", "bear", "stuffed", "plush", "toy"],
        "shortcodes": ["teddy_bear"],
        "size": "medium"
      },
      "paper": {
        "file": "/assets/books/page-facing-up.png",
        "unicode": "U+1F4C4",
        "emoji": "📄",
        "fluent_name": "page-facing-up",
        "category": "books",
        "keywords": ["paper", "page", "document", "printed", "sheet"],
        "shortcodes": ["page_facing_up"],
        "size": "small"
      },
      "tshirt": {
        "file": "/assets/clothing/t-shirt.png",
        "unicode": "U+1F455",
        "emoji": "👕",
        "fluent_name": "t-shirt",
        "category": "clothing",
        "keywords": ["shirt", "tshirt", "t-shirt", "polo", "tee", "clothing"],
        "shortcodes": ["shirt", "tshirt", "t_shirt"],
        "size": "medium"
      }
      // ... Add all 50-60 objects following this pattern
    }
    
[ ] Include comprehensive keyword lists for matching
[ ] Map common detection names to FluentUI emoji names
[ ] Test asset loading in browser
[ ] Verify all PNG files are 3D style from FluentUI
```
## Week 2: Azure AI Vision Detection & Object List Building

### Goals
- ✅ Set up Azure AI Vision account
- ✅ Build object detection pipeline
- ✅ Create object list from detected items

### Tasks

#### Monday: Azure AI Vision Setup
```
[ ] Create Azure account
    - https://portal.azure.com
    - Create Computer Vision resource
    - Copy API key and endpoint
    - Validate free tier (5,000 images/month)
    
[ ] Test Azure API with curl:
    - Upload test image
    - Verify object detection works
    - Check response format
```

#### Tuesday-Wednesday: Dev Environment & Detection Integration
```
[ ] Create Next.js project
    npx create-next-app@latest kidsmessyroom --typescript --tailwind

[ ] Install dependencies:
    - zustand (state management)
    - lucide-react (icons)
    
[ ] Set up project structure:
    - /components
    - /lib
    - /app/api
    - /public/assets (already has FluentUI library)

[ ] Build /app/api/detect/route.ts:
    - Accept image upload
    - Call Azure Computer Vision API
    - Parse detected objects
    - Return object list with positions
```

#### Thursday-Friday: Object List Building & UI
```
[ ] Build ImageUpload component
    - File input with preview
    - Image validation
    - Upload to detection API
    
[ ] Build ObjectList component
    - Display detected objects
    - Show confidence scores
    - Categorize by type
    
[ ] Test with 10 messy room photos
    - Target: 80%+ detection accuracy
    - Verify object list is useful
## Week 3: Image Processing (Remove Objects or Style Transfer)

### Goals
- ✅ Process original image to prepare for asset placement
- ✅ Either: Remove detected objects OR convert to Toca Boca style background
- ✅ Create clean canvas for asset placement

### Tasks

#### Monday-Tuesday: Choose Image Processing Approach
```
Option A: Remove Detected Objects (Inpainting)
[ ] Research image inpainting APIs:
    - ClipDrop API
    - Stable Diffusion Inpainting
    - Photoshop API
    
[ ] Test object removal:
    - Use bounding boxes from Azure detection
    - Remove objects from original image
    - Fill in background automatically
    
Option B: Style Transfer to Toca Boca Background
[ ] Research style transfer APIs:
    - Stable Diffusion img2img
    - Custom style transfer models
    
[ ] Test background conversion:
    - Convert room to flat Toca Boca aesthetic
    - Keep spatial layout
    - Simplify to cartoon style
    
[ ] Decision: Choose Option A or B based on quality
```

#### Wednesday-Thursday: Implement Chosen Approach
```
[ ] Build image processing pipeline
[ ] Create /app/api/process-image/route.ts
[ ] Test with multiple room photos
[ ] Ensure background looks clean and Toca Boca style
```

#### Friday: Integration & Testing
```
[ ] Connect detection → processing pipeline
[ ] Test end-to-end flow:
    1. Upload image
    2. Detect objects
    3. Process image (remove objects or style transfer)
    4. Return clean background
    
[ ] Verify processed background is ready for asset placement
---

## Week 3: Core Detection & Matching

### Goals
- ✅ Integrate Claude Vision API
- ✅ Build object matching system
- ✅ Receive 20 assets from artist

### Tasks

#### Monday-Tuesday: API Integration
```
[ ] Create /api/detect endpoint
    - Accept base64 image
    - Call Claude Vision API
    - Parse JSON response
    - Handle errors
    
[ ] Test with 20 different images
[ ] Store object positions for asset placement
```

### Deliverables
- ✅ Processed background image (objects removed or Toca Boca style)
- ✅ Clean canvas ready for FluentUI Emoji placement
- ✅ Object positions mapped for asset placement

---

## Week 4: Scene Building (Toca Boca Background + Asset Placement)

### Goals
- ✅ Match detected objects to FluentUI Emoji assets
- ✅ Create final Toca Boca style scene
- ✅ Place FluentUI assets in correct positions

### Tasks

#### Monday-Tuesday: Asset Matching Algorithm
```
[ ] Build lib/matching.ts:
    - Load assets.json metadata
    - Match detected object names to FluentUI Emoji
    - Exact name matching
    - Keyword matching (e.g., "stuffed animal" → teddy bear)
    - Category fallback (generic toy, clothing, etc.)
    - Unknown object fallback (question mark)
    
[ ] Test matching accuracy:
    - Target: 85%+ correct matches
    - Log unmatched objects for improvement
```

#### Wednesday: Canvas Setup & Background Rendering
```
[ ] Create components/GameCanvas.tsx
[ ] Set up HTML5 Canvas
[ ] Draw processed background image (from Week 3)
[ ] OR draw simple Toca Boca style background if using assets only
[ ] Add clean zone indicator at top
```

#### Thursday-Friday: Asset Placement & Scene Building
```
[ ] Load matched FluentUI Emoji PNG sprites
[ ] Position sprites based on Azure detection coordinates
[ ] Scale sprites appropriately (small/medium/large)
[ ] Render final Toca Boca scene:
    - Toca Boca style background
    - FluentUI Emoji assets replacing detected objects
    - Maintain spatial relationships from original photo
    
[ ] Test with 10 different room photos
[ ] Verify scene looks clean and playful
```

### Deliverables
- ✅ Asset matching algorithm (85%+ accuracy)
- ✅ Toca Boca style scene with FluentUI Emoji assets
- ✅ Objects positioned correctly based on detection
- ✅ Complete visual transformation working

---

## Week 5: Drag & Drop Interaction + Testing

### Goals
- ✅ Implement drag & drop cleanup interaction
- ✅ Track cleaning progress
- ✅ Test and launch MVP

### Tasks

#### Monday-Tuesday: Canvas Interaction Implementation
```
[ ] Implement drag & drop system
    - Mouse/touch event handlers (mousedown, mousemove, mouseup)
    - Object selection on click
    - Smooth dragging with position updates
    - Visual feedback (highlight, scale, cursor)
    
[ ] Add cleanup zones
    - Define "clean" vs "messy" areas
    - Detect when object enters clean zone
    - Mark objects as "cleaned"
    - Visual state change for cleaned objects
    
[ ] Progress tracking
    - Count cleaned vs total objects
    - Display progress UI (X/Y cleaned)
```

#### Wednesday: Testing & Polish
```
[ ] Test with 10 different room photos
    - Verify detection accuracy
    - Check asset matching quality
    - Test drag & drop on all objects
    - Validate cleanup detection
    
[ ] Beta test with 3-5 kids (ages 6-10)
    - Observe interaction patterns
    - Note confusion points
    - Gather feedback on fun factor
    
[ ] Polish based on feedback
    - Adjust drag sensitivity
    - Improve visual feedback
    - Fix any bugs found
```

#### Thursday-Friday: MVP Deployment
```
[ ] Final QA pass
    - Test on mobile devices
    - Test on desktop browsers
    - Verify Azure API calls working
    - Check asset loading performance
    
[ ] Deploy to Vercel
    - Set up production environment
    - Add Azure API keys
    - Test production build
    - Monitor for errors
    
[ ] Launch MVP
    - Share with beta testers
    - Monitor usage
    - Track detection success rate
    - Collect user feedback
```

### Deliverables
- ✅ Fully functional drag & drop cleanup gameplay
- ✅ Progress tracking and cleanup zones
- ✅ Deployed MVP on Vercel
- ✅ Beta tested with kids (6-10 age group)
- ✅ Ready for Phase 2 enhancements (optional)

---

## 🎉 MVP COMPLETE - 5 Week Timeline

**Core Functionality Delivered:**
- ✅ Photo upload with Azure AI Vision detection
- ✅ Object list creation from detection results
- ✅ FluentUI Emoji 3D asset library (50+ sprites)
- ✅ Asset matching algorithm (85%+ accuracy)
- ✅ Image processing (object removal or style transfer)
- ✅ Toca Boca style scene with asset placement
- ✅ Interactive drag & drop cleanup gameplay
- ✅ Progress tracking and cleanup zones

**Success Metrics:**
- Detection accuracy: 90%+ (Azure AI Vision)
- Asset match rate: 85%+ (FluentUI Emoji library)
- Processing time: < 5 seconds (upload to playable scene)
- Cost: $0/month (free tiers)

---

## Phase 2: Optional Enhancements (Post-MVP)

**Important:** Phase 2 features should only be implemented AFTER MVP validates core concept with real users. These enhancements build on top of the working FluentUI Emoji sprite system.

### Phase 2.1: Physics & Animation (2-3 weeks)

**Reference Implementation:** See `Messyroomgame.tsx` for pattern examples

#### Spring Physics
```
[ ] Create physics.ts module
[ ] Implement spring forces on FluentUI sprite movement
[ ] Add smooth following during drag
[ ] Natural deceleration and momentum
```
    - Stiffness: 0.1-0.15
    - Damping: 0.8-0.9
    - Squash amount: 0.2-0.3
```

#### Squash & Stretch Animation
```
[ ] Apply to FluentUI sprite during drag
    - Stretch in direction of motion
    - Compress perpendicular
    
[ ] Bounce effect on drop
    - Squash on impact
    - Spring back to normal
    
[ ] Idle animations
    - Breathing scale pulse
    - Gentle rotation sway
    - Vertical bobbing (use object ID as seed)
```

#### Particle System
```
[ ] Create ParticleSystem class
[ ] Emit particles on cleanup
    - Stars, sparkles, hearts
    - Random velocities with gravity
    
[ ] Particle types
    - Success particles (stars)
    - Trail particles during drag
    - Ambient sparkles in clean zone
    
[ ] Test performance (60 FPS target)
```

**Reference:** See `Messyroomgame.tsx` lines 210-340 (canvas), 380-450 (drag handlers) for implementation patterns.

**Deliverables:**
- ✅ Smooth spring physics on FluentUI sprites
- ✅ Squash & stretch animations
- ✅ Idle animations with variation
- ✅ Particle effects system

### Phase 2.2: Sound & Polish (1 week)

#### Sound Effects
```
[ ] Source sound effects
    - Freesound.org (free)
    - Or commission pack ($50-100)
    
[ ] Required sounds:
    - pickup.mp3 (grab object)
    - whoosh.mp3 (drag)
    - drop.mp3 (release)
    - success.mp3 (cleanup)
    - complete.mp3 (all clean)
    
[ ] Integrate Howler.js
[ ] Add audio controls (mute button)
[ ] Test audio on mobile devices
```

#### Visual Polish
```
[ ] Improve UI design
    - Consistent color scheme
    - Better spacing and layout
    - Rounded corners, shadows
    
[ ] Polish cleanup zone
    - Animated sparkles
    - Pulsing border
    - Visual feedback
    
[ ] Add helper character (optional)
    - Cute mascot
    - Encouraging expressions
```

#### Celebration Animations
```
[ ] Create celebration sequence
    1. Particle burst (0.5s)
    2. Object transforms/disappears (0.3s)
    3. Success indicator (0.2s)
    4. Sound effect plays
    
[ ] Add milestone celebrations
    - 25%, 50%, 75%, 100% clean
    - Encouraging messages
    
[ ] Victory screen
    - Confetti animation
    - Completion message
```

#### Performance Optimization
```
[ ] Profile canvas rendering
[ ] Optimize draw calls
    - Batch operations
    - Skip offscreen objects
    - Reduce particles if needed
    
[ ] Test on older devices
[ ] Cross-browser testing
```

**Deliverables:**
- ✅ Complete sound design
- ✅ Polished visual design
- ✅ Engaging celebrations
- ✅ 60 FPS on target devices

### Phase 2.3: Gamification (1 week)

#### Scoring System
```
[ ] Implement point system
    - Points per object cleaned
    - Time bonuses
    - Combo multipliers
    
[ ] Star rating
    - Calculate based on completion %
    - Pop-in animation
    - Sound effects
    
[ ] Display score with animations
[ ] Progress tracking UI
```

#### Achievements & Unlockables (Optional)
```
[ ] Design unlockable items
    - Room themes
    - Special decorations
    - Avatar items
    
[ ] Achievement system
    - First cleanup
    - Speed records
    - Streak milestones
```

#### Streak Tracking (Optional)
```
[ ] Track daily usage
[ ] Calculate streak length
[ ] Display streak counter with flame icon
[ ] Reward milestones
```

**Deliverables:**
- ✅ Scoring system with star rating
- ✅ Progress tracking UI
- ✅ Optional achievements/unlockables
- ✅ Optional streak tracking

---

## Phase 2 Summary

**Total Timeline:** 2-4 weeks after MVP validation  
**Cost:** $50-200 (sound effects, optional assets)  
**Reference:** `Messyroomgame.tsx` contains implementation examples

**Important Notes:**
1. Only implement Phase 2 AFTER MVP validates with real users
2. Keep using FluentUI Emoji sprites (don't switch to emoji characters)
3. All enhancements must mesh with core Toca Boca cleanup concept
4. Extract patterns from Messyroomgame.tsx but adapt to Azure + FluentUI architecture

---

## Quick Reference: Key Files

```
MVP Files (Weeks 1-5):
1. /app/game/page.tsx                - Main game page
2. /components/GameCanvas.tsx        - Canvas rendering & drag-drop
3. /components/ImageUpload.tsx       - Photo upload component
4. /lib/detection.ts                 - Azure AI Vision wrapper
5. /lib/matching.ts                  - Object to FluentUI Emoji matching
6. /lib/store.ts                     - Zustand state management
7. /app/api/detect/route.ts          - Azure AI Vision API route
8. /public/assets/                   - FluentUI Emoji 3D library
9. /public/assets.json               - Asset metadata mapping

Phase 2 Files (Optional):
1. /lib/physics.ts                   - Spring physics engine
2. /lib/particles.ts                 - Particle system
3. /lib/scoring.ts                   - Scoring & achievements

To add a new FluentUI asset:
1. Add PNG to /public/assets/[category]/
2. Add entry to assets.json with keywords
3. Test matching with sample images
```

---

## Celebration Milestones

Track your progress and celebrate wins! 🎉

```
✓ Week 1: FluentUI Emoji library organized (50+ assets)
✓ Week 2: Azure AI Vision detection working
✓ Week 3: Image processing pipeline complete
✓ Week 4: First playable Toca Boca scene
✓ Week 5: MVP LAUNCHED! 🚀

Phase 2 (Optional):
✓ Physics & animations feel amazing
✓ Sound effects add charm
✓ Gamification increases engagement
```

---

## Final Checklist Before MVP Launch

```
Technical:
[ ] Photo upload working
[ ] Azure AI Vision API connected
[ ] Object detection accurate (90%+)
[ ] FluentUI assets loading properly
[ ] Asset matching functional (85%+)
[ ] Image processing working (remove objects OR style transfer)
[ ] Canvas rendering at 60 FPS
[ ] Drag & drop smooth and responsive
[ ] Progress tracking functional
[ ] No critical bugs
[ ] Error tracking enabled (Sentry/LogRocket)

Content:
[ ] 50+ FluentUI Emoji assets organized
[ ] assets.json metadata complete
[ ] All common objects covered
[ ] Toca Boca background created

Deployment:
[ ] Azure API keys secured (environment variables)
[ ] Deployed to Vercel
[ ] Custom domain (optional)
[ ] SSL certificate enabled
[ ] Analytics configured (Google Analytics/Plausible)

Testing:
[ ] Tested with 10 different room photos
[ ] Beta tested with 3-5 kids (ages 6-10)
[ ] Mobile device testing (iOS/Android)
[ ] Desktop browser testing (Chrome/Safari/Firefox)
[ ] All feedback addressed
```

---

## You've Got This! 💪

Remember:
- Start small, iterate often
- Test with real kids early
- Focus on core cleanup gameplay first
- Launch MVP quickly, add enhancements later
- Celebrate every win!

**Questions?** Review these docs:
- `ARCHITECTURE_LOCKED.md` - Complete locked architecture
- `START_HERE.md` - Quick reference and decision matrix
- `IMPLEMENTATION_GUIDE.md` - Code examples (focus on Azure sections)
- `ICON_PACK_RESEARCH.md` - FluentUI Emoji setup details
- `.github/instructions/copilot-instructions.md` - AI agent guidance

**Need code patterns?** Check `Messyroomgame.tsx` for Phase 2 reference examples.

**Ready to start?** Begin with Week 1 tasks above!

---

Good luck building your Toca Boca-style cleanup game! 🌟
```
Background: #FFF5F7 (light pink)
Cards:      #FFFFFF (white)
Text:       #2D3436 (dark gray)
Success:    #00B894 (green)
Warning:    #FDCB6E (yellow)
```

### Typography
```
Headings:   Poppins Bold, 24-48px
Body:       Inter Regular, 16px
Buttons:    Poppins SemiBold, 18px
Labels:     Inter Medium, 14px
```

### Component Styling
```
Border Radius: 12-16px (very rounded)
Shadows: 0 4px 6px rgba(0,0,0,0.1)
Buttons: Gradient backgrounds
Cards: White with subtle shadows
```

---

## Debugging Checklist

If something isn't working:

### Detection Issues
```
[ ] Check API key is set correctly
[ ] Verify image is valid base64
[ ] Ensure image is < 5MB
[ ] Check API response format
[ ] Log detected objects count
[ ] Test with different images
```

### Matching Issues
```
[ ] Verify assets.json is valid
[ ] Check asset files exist
[ ] Log matching algorithm steps
[ ] Test with known objects
[ ] Review keyword lists
[ ] Add debug mode toggle
```

### Performance Issues
```
[ ] Profile canvas rendering
[ ] Check for memory leaks
[ ] Reduce particle count
[ ] Optimize image sizes
[ ] Test on target devices
[ ] Add FPS counter
```

### Physics Issues
```
[ ] Log velocity values
[ ] Check spring parameters
[ ] Verify update loop runs
[ ] Test with single object
[ ] Review collision detection
[ ] Adjust damping values
```

---

## Quick Reference: Key Files

```
Most Important Files:
1. /app/game/page.tsx         - Main game page
2. /components/GameCanvas.tsx - Canvas rendering
3. /lib/matching.ts           - Object matching
4. /lib/physics.ts            - Physics engine
5. /app/api/detect/route.ts   - Claude API
6. /public/assets.json        - Asset metadata

To add a new asset:
1. Add PNG to /public/assets/[category]/
2. Add entry to assets.json
3. Test matching with sample images

To tune physics:
1. Edit /lib/physics.ts
2. Adjust stiffness (0.1-0.2)
3. Adjust damping (0.8-0.95)
4. Test with different object sizes
```

---

## Celebration Milestones

Track your progress and celebrate wins! 🎉

```
✓ Week 1: Technical approach validated
✓ Week 2: First 5 assets received
✓ Week 3: Object detection working
✓ Week 4: First playable prototype
✓ Week 5: Physics feel amazing
✓ Week 6: Everything is polished
✓ Week 7: Gamification complete
✓ Week 8: MVP LAUNCHED! 🚀
```

---

## Final Checklist Before Launch

```
Technical:
[ ] All features working
[ ] No critical bugs
[ ] 60 FPS on target devices
[ ] API keys secured
[ ] Error tracking enabled
[ ] Analytics configured

Content:
[ ] 50 assets complete
[ ] All sounds present
[ ] Copy reviewed
[ ] Tutorial clear
[ ] Privacy policy added

Marketing:
[ ] Landing page live
[ ] Demo video ready
[ ] Social posts scheduled
[ ] Press kit prepared

Business:
[ ] Payment processing setup
[ ] Terms of service added
[ ] Support email configured
[ ] Monitoring dashboard ready
```

---

## You've Got This! 💪

Remember:
- Start small, iterate often
- Test with real kids early
- Focus on fun > features
- Launch imperfect, improve fast
- Celebrate every win!

**Questions?** Review the TECHNICAL_RESEARCH.md for detailed explanations.

**Need code help?** Check IMPLEMENTATION_GUIDE.md for examples.

**Ready to start?** Begin with Week 1 tasks above!

---

Good luck building your Toca Boca-style cleanup game! 🌟
