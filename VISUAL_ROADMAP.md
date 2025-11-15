# Visual Development Roadmap

## Overview: From Concept to Launch in 8 Weeks

This document provides a visual, week-by-week roadmap for building your Toca Boca-style kids cleanup game.

---

## Project Timeline

```
Week 1-2: Foundation & Assets
Week 3-4: Core Features
Week 5-6: Polish & Animation
Week 7-8: Gamification & Launch
```

---

## Week 1: Research & Planning

### Goals
- ✅ Validate the technical approach
- ✅ Understand object detection capabilities
- ✅ Create comprehensive asset list

### Tasks

#### Monday-Tuesday: Technical Validation
```
[ ] Test Claude Vision API
    - Upload 10 messy room photos
    - Analyze detection accuracy
    - Document common objects
    - Measure processing time
    
[ ] Expected Results:
    - 20-50 objects per image
    - 80-90% accuracy
    - 2-3 second processing
```

#### Wednesday-Thursday: Asset Research
```
[ ] Analyze detection results
    - Create frequency table
    - Identify top 50 objects
    - Categorize by type
    - Prioritize for MVP
    
[ ] Output: Spreadsheet with columns:
    Object Name | Frequency | Category | Priority
```

#### Friday: Artist Search
```
[ ] Browse Fiverr for artists
    - Search "Toca Boca style"
    - Review 10+ portfolios
    - Save top 3 candidates
    - Request style samples
    
[ ] Prepare commission brief
    - Write detailed requirements
    - Gather style references
    - Set budget and timeline
```

### Deliverables
- ✅ Validated detection accuracy (>80%)
- ✅ Prioritized list of 50 assets
- ✅ 3 shortlisted artists
- ✅ Commission brief document

---

## Week 2: Asset Creation Begins

### Goals
- ✅ Commission and receive first assets
- ✅ Set up development environment
- ✅ Build basic upload functionality

### Tasks

#### Monday: Hire Artist
```
[ ] Review sample work from 3 artists
[ ] Select best fit (style + communication)
[ ] Negotiate package deal for 50 assets
[ ] Sign contract with milestones:
    - Milestone 1: 5 sample assets (3 days)
    - Milestone 2: 20 assets (week 3)
    - Milestone 3: 25 assets (week 4)
```

#### Tuesday-Wednesday: Dev Environment
```
[ ] Create Next.js project
    npx create-next-app@latest kidsmessyroom

[ ] Install dependencies
    - framer-motion (animations)
    - zustand (state management)
    - @anthropic-ai/sdk (Claude API)
    - lucide-react (icons)
    
[ ] Set up project structure
    - /components
    - /lib
    - /app/api
    - /public/assets
```

#### Thursday-Friday: Image Upload
```
[ ] Build ImageUpload component
    - File input with preview
    - Image validation
    - Base64 conversion
    - Upload UI with Tailwind
    
[ ] Test with sample images
[ ] Deploy to Vercel for testing
```

### Deliverables
- ✅ 5 approved sample assets from artist
- ✅ Working development environment
- ✅ Image upload interface

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
[ ] Optimize prompt for best results
[ ] Add loading states
```

#### Wednesday: Asset Matching
```
[ ] Receive 20 assets from artist
[ ] Create assets.json metadata file
[ ] Build matching algorithm
    - Exact match
    - Keyword matching
    - Fuzzy matching
    - Category fallback
    
[ ] Test matching accuracy
    Target: 80%+ correct matches
```

#### Thursday-Friday: Integration
```
[ ] Connect upload → detect → match
[ ] Display detected objects as list
[ ] Show matched sprites
[ ] Add debugging tools
[ ] Test end-to-end flow
```

### Deliverables
- ✅ Working object detection (80%+ accuracy)
- ✅ Asset matching system (85%+ match rate)
- ✅ 20 Toca Boca-style sprites
- ✅ End-to-end prototype

---

## Week 4: Canvas & Basic Interactivity

### Goals
- ✅ Render objects on canvas
- ✅ Implement drag & drop
- ✅ Complete asset library (50 total)

### Tasks

#### Monday-Tuesday: Canvas Setup
```
[ ] Create GameCanvas component
[ ] Set up HTML5 Canvas
[ ] Load sprite images
[ ] Position objects based on detection
[ ] Draw background and zones
[ ] Add object labels
```

#### Wednesday: Drag & Drop
```
[ ] Implement mouse event handlers
    - mousedown: Start drag
    - mousemove: Update position
    - mouseup: Drop object
    
[ ] Add visual feedback
    - Highlight on hover
    - Scale up when dragging
    - Cursor changes
    
[ ] Test on different devices
```

#### Thursday: Cleanup Zones
```
[ ] Define "clean zone" at top
[ ] Detect when object enters zone
[ ] Mark object as "cleaned"
[ ] Change object appearance
[ ] Track progress (X/Y cleaned)
```

#### Friday: Asset Completion
```
[ ] Receive final 30 assets
[ ] Review all 50 sprites
[ ] Request any revisions
[ ] Organize in /assets folder
[ ] Update assets.json
[ ] Test with all assets
```

### Deliverables
- ✅ Interactive canvas with drag & drop
- ✅ Cleanup zone detection
- ✅ Complete 50-asset library
- ✅ Basic gameplay working

---

## Week 5: Kawaii Physics & Animation

### Goals
- ✅ Add spring physics
- ✅ Implement squash & stretch
- ✅ Create idle animations
- ✅ Add particle effects

### Tasks

#### Monday: Physics Foundation
```
[ ] Create physics.ts module
[ ] Implement SpringPhysics class
    - Calculate spring forces
    - Apply damping
    - Update positions
    
[ ] Add to drag system
    - Smooth following
    - Natural deceleration
    - Momentum on release
```

#### Tuesday: Squash & Stretch
```
[ ] Create SquashStretch class
[ ] Apply during drag
    - Stretch in direction of motion
    - Compress perpendicular
    
[ ] Add bounce effect on drop
    - Squash on impact
    - Spring back to normal
    
[ ] Fine-tune parameters
```

#### Wednesday: Idle Animations
```
[ ] Add subtle wiggle when stationary
    - Breathing scale pulse
    - Gentle rotation sway
    - Vertical bobbing
    
[ ] Make each object unique
    - Use object ID as seed
    - Vary frequency and amplitude
    - Offset timing
```

#### Thursday: Particle System
```
[ ] Create ParticleSystem class
[ ] Emit particles on cleanup
    - Stars, sparkles, hearts
    - Random velocities
    - Gravity and fade
    
[ ] Add particle types
    - Success particles (stars)
    - Trail particles (drag)
    - Ambient sparkles
```

#### Friday: Polish Physics
```
[ ] Tune all parameters
    - Spring stiffness: 0.1-0.15
    - Damping: 0.8-0.9
    - Squash amount: 0.2-0.3
    
[ ] Test with different object sizes
[ ] Ensure 60 FPS performance
[ ] Add performance monitoring
```

### Deliverables
- ✅ Smooth spring physics
- ✅ Squash & stretch on all objects
- ✅ Charming idle animations
- ✅ Particle effects system

---

## Week 6: Sound & Visual Polish

### Goals
- ✅ Add sound effects
- ✅ Improve visual design
- ✅ Create success animations
- ✅ Optimize performance

### Tasks

#### Monday: Sound Effects
```
[ ] Source sound effects
    - Freesound.org (free)
    - Or commission pack ($50-100)
    
[ ] Required sounds:
    ✓ pickup.mp3 (grab object)
    ✓ whoosh.mp3 (drag)
    ✓ drop.mp3 (release)
    ✓ success.mp3 (clean)
    ✓ complete.mp3 (all clean)
    
[ ] Integrate Howler.js
[ ] Add audio controls (mute button)
[ ] Test audio on mobile
```

#### Tuesday: Visual Design
```
[ ] Improve UI design
    - Better color scheme
    - Consistent spacing
    - Rounded corners
    - Shadows and depth
    
[ ] Design cleanup zone
    - Animated sparkles
    - Pulsing border
    - Gradient background
    
[ ] Add character/mascot
    - Cute helper character
    - Encouraging expressions
    - Appears on milestones
```

#### Wednesday: Success Animations
```
[ ] Create celebration sequence
    1. Particle burst (0.5s)
    2. Object transforms green (0.3s)
    3. Checkmark appears (0.2s)
    4. Sound effect plays
    
[ ] Add milestone celebrations
    - 25% clean: "Good start!"
    - 50% clean: "Halfway there!"
    - 75% clean: "Almost done!"
    - 100% clean: "Perfect!"
    
[ ] Victory screen
    - Confetti animation
    - Star rating (1-3 stars)
    - Encouraging message
    - "Clean REAL room now" prompt
```

#### Thursday: Performance
```
[ ] Profile canvas rendering
[ ] Optimize draw calls
    - Batch similar operations
    - Skip offscreen objects
    - Reduce particle count if needed
    
[ ] Test on older devices
    - iPhone 8 (2017)
    - Samsung Galaxy S8
    - iPad 6th gen
    
[ ] Add "low power mode" toggle
```

#### Friday: Bug Fixes
```
[ ] Fix any reported issues
[ ] Test edge cases
    - 0 objects detected
    - 100+ objects detected
    - Very large/small images
    
[ ] Cross-browser testing
    - Chrome, Safari, Firefox
    - iOS Safari, Android Chrome
```

### Deliverables
- ✅ Complete sound design
- ✅ Polished visual design
- ✅ Engaging celebrations
- ✅ 60 FPS on all devices

---

## Week 7: Gamification & Progression

### Goals
- ✅ Implement scoring system
- ✅ Add unlockable rewards
- ✅ Create streak tracking
- ✅ Build before/after comparison

### Tasks

#### Monday: Scoring System
```
[ ] Implement point system
    - 10 points per object
    - Bonus for speed
    - Combo multipliers
    
[ ] Add progress tracking
    - Objects cleaned: X/Y
    - Percentage complete
    - Progress bar animation
    
[ ] Display score prominently
    - Animated number counter
    - Celebration on milestones
```

#### Tuesday: Star Rating
```
[ ] Calculate star rating
    - 60-79% = 1 star
    - 80-94% = 2 stars
    - 95-100% = 3 stars
    
[ ] Create star animation
    - Pop in one by one
    - Sparkle effect
    - Sound for each star
    
[ ] Store total stars earned
```

#### Wednesday: Unlockables
```
[ ] Design unlockable items
    - Room themes (space, underwater, etc.)
    - Decorations (rainbows, clouds)
    - Avatars (animals, characters)
    
[ ] Create unlock screen
    - "New item unlocked!"
    - Show item preview
    - Save to user profile
    
[ ] Implement progression
    - 5 stars: First unlock
    - 10 stars: Second unlock
    - Etc.
```

#### Thursday: Streak System
```
[ ] Track daily cleanups
[ ] Calculate streak length
    - Consecutive days
    - Longest streak
    
[ ] Streak bonuses
    - 3 days: +1 star
    - 7 days: +3 stars
    - 14 days: +5 stars
    - 30 days: +10 stars
    
[ ] Streak UI
    - Flame icon with number
    - Encouraging messages
    - Reminder notifications
```

#### Friday: Before/After
```
[ ] Save "before" photo
[ ] Prompt for "after" photo
[ ] Compare images
    - Run detection on both
    - Calculate objects removed
    - Show improvement %
    
[ ] Display comparison
    - Side-by-side view
    - Highlight changes
    - Award bonus stars
```

### Deliverables
- ✅ Complete scoring system
- ✅ Unlockable content
- ✅ Streak tracking
- ✅ Photo comparison feature

---

## Week 8: Testing & Launch

### Goals
- ✅ Beta test with kids
- ✅ Fix critical bugs
- ✅ Create marketing materials
- ✅ Launch MVP

### Tasks

#### Monday-Tuesday: Beta Testing
```
[ ] Recruit 10-20 kids (ages 6-10)
[ ] Provide test access
[ ] Observe gameplay sessions
[ ] Collect feedback
    - What's fun?
    - What's confusing?
    - What's missing?
    
[ ] Analyze data
    - Session length
    - Completion rate
    - Return rate
    - Most/least cleaned objects
```

#### Wednesday: Critical Fixes
```
[ ] Fix showstopper bugs
[ ] Improve confusing UI
[ ] Adjust difficulty
[ ] Optimize based on feedback
[ ] Re-test with kids
```

#### Thursday: Marketing Prep
```
[ ] Create landing page
    - Hero image
    - Feature highlights
    - Screenshots/GIFs
    - CTA to download
    
[ ] Make demo video
    - 30-60 seconds
    - Show full flow
    - Highlight fun features
    
[ ] Social media assets
    - Preview images
    - Short clips
    - Announcement posts
```

#### Friday: Launch! 🚀
```
[ ] Final checks
    - All features working
    - No critical bugs
    - Analytics configured
    - Error tracking setup
    
[ ] Deploy to production
    - Vercel or Netlify
    - Custom domain
    - SSL certificate
    - CDN configured
    
[ ] Announce launch
    - Social media posts
    - Product Hunt (optional)
    - Parenting forums
    - Friends & family
    
[ ] Monitor closely
    - Watch analytics
    - Respond to feedback
    - Fix urgent issues
```

### Deliverables
- ✅ Beta-tested MVP
- ✅ Marketing materials
- ✅ Live production app
- ✅ Launch announcement

---

## Post-Launch: First 30 Days

### Week 9-10: Monitoring & Iteration

```
[ ] Daily monitoring
    - User count
    - Session duration
    - Error rate
    - API costs
    
[ ] Collect feedback
    - User reviews
    - Support requests
    - Feature requests
    
[ ] Quick fixes
    - Bug fixes
    - Minor improvements
    - Performance tweaks
```

### Week 11-12: Expansion

```
[ ] Analyze unmatched objects
    - Identify most common
    - Commission 10 new assets
    - Update matching system
    
[ ] Add requested features
    - Most popular requests
    - Low-hanging fruit
    - High-impact additions
    
[ ] Plan v2.0
    - Native mobile apps
    - More room themes
    - Multiplayer features
```

---

## Success Metrics Dashboard

Track these KPIs weekly:

### Technical Metrics
```
✓ Object Detection Accuracy: __%
✓ Asset Match Rate: __%
✓ Processing Time: __s
✓ FPS Performance: __
✓ Error Rate: __%
```

### Engagement Metrics
```
✓ Daily Active Users: __
✓ Avg Session Length: __m
✓ Completion Rate: __%
✓ Return Rate (7-day): __%
✓ Streak Rate (3+ days): __%
```

### Business Metrics
```
✓ Total Users: __
✓ Free → Paid Conversion: __%
✓ Monthly Revenue: $__
✓ API Costs: $__
✓ Net Profit: $__
```

---

## Risk Management Checklist

### Week 1-2 Risks
- [ ] ⚠️ Artist doesn't deliver quality work
  - **Mitigation:** Test with 5 samples first
  - **Backup:** Have 2 backup artists ready

- [ ] ⚠️ Detection accuracy below 80%
  - **Mitigation:** Test early with 20+ images
  - **Backup:** Consider YOLO model

### Week 3-4 Risks
- [ ] ⚠️ Asset matching below 80%
  - **Mitigation:** Expand keyword lists
  - **Backup:** Add manual correction UI

- [ ] ⚠️ API costs too high
  - **Mitigation:** Implement caching
  - **Backup:** Rate limit free users

### Week 5-6 Risks
- [ ] ⚠️ Performance below 60 FPS
  - **Mitigation:** Profile early, optimize
  - **Backup:** Reduce particle count

- [ ] ⚠️ Animations not "fun"
  - **Mitigation:** Beta test with kids
  - **Backup:** Study Toca Boca references

### Week 7-8 Risks
- [ ] ⚠️ Kids don't find it engaging
  - **Mitigation:** Iterate based on feedback
  - **Backup:** Add more juice/rewards

- [ ] ⚠️ Launch delays
  - **Mitigation:** Cut non-essential features
  - **Backup:** Launch with MVP, iterate

---

## Visual Style Guide

### Color Palette (Toca Boca Inspired)

**Primary Colors:**
```
Pink:     #FF6B9D  ██████
Purple:   #9B59B6  ██████
Blue:     #4ECDC4  ██████
Yellow:   #FFD93D  ██████
Green:    #90EE90  ██████
Orange:   #FFA07A  ██████
```

**UI Colors:**
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
