# Implementation Guide: Step-by-Step Code Examples

**⚠️ UPDATE IN PROGRESS:** This guide is being updated to align with **[VISUAL_ROADMAP.md](./VISUAL_ROADMAP.md)** (Gold Standard).

**Current Stack (VISUAL_ROADMAP.md):**
- **Detection API:** OpenAI GPT-4o Vision (not Claude)
- **Canvas Library:** Konva.js with react-konva (not raw HTML5 Canvas)
- **Dependencies:** konva, react-konva, zustand, lucide-react
- **MVP Scope:** Week 1-8 features only (no physics, particles, or gamification)

**For now, refer to:**
- **[VISUAL_ROADMAP.md](./VISUAL_ROADMAP.md)** for complete 8-week implementation plan
- **[ARCHITECTURE_LOCKED.md](./ARCHITECTURE_LOCKED.md)** for technology stack details
- Code examples below are being updated to reflect the correct stack

---

## Table of Contents
1. [Project Setup](#project-setup) ✅ Updated
2. [Image Upload & Detection](#image-upload--detection) ⚠️ Being updated
3. [Asset Library System](#asset-library-system) ⚠️ Being updated
4. [Canvas Rendering (Konva.js)](#canvas-rendering) ⚠️ Being updated
5. [Drag & Drop Interaction](#drag-drop-interaction) ⚠️ Being updated
6. ~~[Kawaii Physics Implementation]~~ Phase 2 only
7. ~~[Gamification Features]~~ Phase 2 only

---

## Project Setup

### Create Next.js Project with TypeScript (Week 1 of VISUAL_ROADMAP.md)

```bash
# Create new Next.js app
npx create-next-app@latest toca-room --typescript --tailwind

# Install dependencies
cd toca-room
npm install konva react-konva zustand lucide-react

# Optional dev dependencies
npm install -D @types/node
```

### Project Structure (From VISUAL_ROADMAP.md)

```
toca-room/
├── app/
│   ├── api/
│   │   └── detect/
│   │       └── route.ts          # OpenAI GPT-4o Vision API endpoint
│   ├── game/
│   │   └── page.tsx              # Main game page
│   ├── layout.tsx
│   └── page.tsx                  # Landing/upload page
├── components/
│   ├── ImageUpload.tsx           # Photo upload component
│   ├── GameCanvas.tsx            # Konva.js Stage component
│   └── ProgressTracker.tsx       # Progress UI
├── lib/
│   ├── detection.ts                 # Object detection logic
│   ├── matching.ts                  # Asset matching algorithm
│   ├── physics.ts                   # Physics engine
│   └── store.ts                     # Zustand state management
├── public/
│   ├── assets/
│   │   ├── toys/                    # Toy sprites
│   │   ├── clothing/                # Clothing sprites
│   │   ├── books/                   # Book sprites
│   │   └── misc/                    # Misc sprites
│   ├── sounds/                      # Sound effects
│   └── assets.json                  # Asset metadata
└── styles/
    └── globals.css
```

---

## Image Upload & Detection

### 1. Image Upload Component

```typescript
// components/ImageUpload.tsx
'use client';

import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
}

export default function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      setPreview(previewUrl);
      onImageSelected(file, previewUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-96 
                         border-4 border-dashed border-purple-300 rounded-xl 
                         cursor-pointer hover:border-purple-500 transition-colors 
                         bg-purple-50">
          <Camera className="w-16 h-16 text-purple-400 mb-3" />
          <span className="text-xl text-purple-600 font-semibold">
            Upload messy room photo
          </span>
          <span className="text-sm text-purple-400 mt-2">
            JPG, PNG, or HEIC
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Room preview"
            className="w-full h-96 object-cover rounded-xl border-4 border-purple-200"
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg
                     hover:bg-white transition-colors"
          >
            Change Photo
          </button>
        </div>
      )}
    </div>
  );
}
```

---

### 2. Claude Vision API Integration

```typescript
// app/api/detect/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType } = await request.json();

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `Analyze this messy kid's room and identify ALL movable objects.

For each object, provide:
- name: Specific object name (e.g., "teddy bear", "toy car", "t-shirt")
- category: One of [toys, clothing, books, misc]
- position: Approximate location [top-left, top-center, top-right, middle-left, center, middle-right, bottom-left, bottom-center, bottom-right]
- size: Object size [small, medium, large]
- color: Primary color if visible

Return ONLY a valid JSON array with no additional text:
[{"name": "...", "category": "...", "position": "...", "size": "...", "color": "..."}]`,
            },
          ],
        },
      ],
    });

    // Extract JSON from response
    const textContent = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    const jsonMatch = textContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const detectedObjects = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      objects: detectedObjects,
      count: detectedObjects.length,
    });
  } catch (error) {
    console.error('Detection error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to detect objects' },
      { status: 500 }
    );
  }
}
```

---

### 3. Detection Hook

```typescript
// lib/detection.ts
export interface DetectedObject {
  name: string;
  category: 'toys' | 'clothing' | 'books' | 'misc';
  position: string;
  size: 'small' | 'medium' | 'large';
  color?: string;
}

export async function detectObjects(imageFile: File): Promise<DetectedObject[]> {
  // Convert file to base64
  const base64 = await fileToBase64(imageFile);
  const imageBase64 = base64.split(',')[1]; // Remove data:image/...;base64, prefix

  const response = await fetch('/api/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageBase64,
      mimeType: imageFile.type,
    }),
  });

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }

  return data.objects;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

---

## Asset Library System

### 1. Asset Metadata Structure

```json
// public/assets.json
{
  "teddy_bear": {
    "file": "/assets/toys/teddy_bear.png",
    "category": "toys",
    "keywords": ["teddy", "bear", "stuffed bear", "plush bear", "teddy bear"],
    "aliases": ["stuffed animal bear", "toy bear", "bear plush"],
    "size": "medium",
    "color": "#D2691E"
  },
  "toy_car": {
    "file": "/assets/toys/toy_car.png",
    "category": "toys",
    "keywords": ["car", "toy car", "vehicle", "automobile"],
    "aliases": ["matchbox car", "hot wheels", "race car"],
    "size": "small",
    "color": "#FF0000"
  },
  "tshirt": {
    "file": "/assets/clothing/tshirt.png",
    "category": "clothing",
    "keywords": ["shirt", "t-shirt", "tshirt", "tee"],
    "aliases": ["top", "clothing"],
    "size": "medium",
    "color": "#4169E1"
  },
  "book": {
    "file": "/assets/books/book_closed.png",
    "category": "books",
    "keywords": ["book", "novel", "textbook"],
    "aliases": ["reading material"],
    "size": "medium",
    "color": "#8B4513"
  },
  "generic_toy": {
    "file": "/assets/generic/generic_toy.png",
    "category": "toys",
    "keywords": ["toy", "plaything"],
    "size": "medium",
    "color": "#FFB6C1"
  },
  "generic_clothing": {
    "file": "/assets/generic/generic_clothing.png",
    "category": "clothing",
    "keywords": ["clothes", "garment"],
    "size": "medium",
    "color": "#87CEEB"
  },
  "mystery_object": {
    "file": "/assets/generic/mystery_object.png",
    "category": "misc",
    "keywords": ["unknown", "object"],
    "size": "medium",
    "color": "#DDA0DD"
  }
}
```

---

### 2. Matching Algorithm

```typescript
// lib/matching.ts
import assetsData from '../public/assets.json';

export interface Asset {
  file: string;
  category: string;
  keywords: string[];
  aliases?: string[];
  size: string;
  color: string;
}

export interface GameObject {
  id: string;
  name: string;
  asset: Asset;
  position: { x: number; y: number };
  size: number;
  category: string;
  moved: boolean;
  velocity: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
}

const assets = assetsData as Record<string, Asset>;

export function matchObjectToAsset(detectedObject: DetectedObject): Asset {
  const objectName = detectedObject.name.toLowerCase().trim();

  // 1. Direct exact match
  if (assets[objectName]) {
    return assets[objectName];
  }

  // 2. Keyword matching
  for (const [assetKey, asset] of Object.entries(assets)) {
    // Check keywords
    if (
      asset.keywords.some(
        (keyword) =>
          objectName.includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(objectName)
      )
    ) {
      return asset;
    }

    // Check aliases
    if (
      asset.aliases?.some(
        (alias) =>
          objectName.includes(alias.toLowerCase()) ||
          alias.toLowerCase().includes(objectName)
      )
    ) {
      return asset;
    }
  }

  // 3. Category-based fallback
  const categoryFallbacks: Record<string, string> = {
    toys: 'generic_toy',
    clothing: 'generic_clothing',
    books: 'book',
    misc: 'mystery_object',
  };

  const fallbackKey = categoryFallbacks[detectedObject.category];
  if (fallbackKey && assets[fallbackKey]) {
    return assets[fallbackKey];
  }

  // 4. Ultimate fallback
  return assets['mystery_object'];
}

export function createGameObject(
  detectedObject: DetectedObject,
  index: number
): GameObject {
  const asset = matchObjectToAsset(detectedObject);

  // Position mapping
  const positionMap: Record<string, { x: number; y: number }> = {
    'top-left': { x: 100, y: 150 },
    'top-center': { x: 300, y: 150 },
    'top-right': { x: 500, y: 150 },
    'middle-left': { x: 100, y: 300 },
    center: { x: 300, y: 300 },
    'middle-right': { x: 500, y: 300 },
    'bottom-left': { x: 100, y: 450 },
    'bottom-center': { x: 300, y: 450 },
    'bottom-right': { x: 500, y: 450 },
  };

  const position =
    positionMap[detectedObject.position] ||
    { x: 100 + (index * 50) % 500, y: 150 + Math.floor(index / 10) * 80 };

  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  return {
    id: `obj-${index}`,
    name: detectedObject.name,
    asset,
    position,
    size: sizeMap[detectedObject.size] || 60,
    category: detectedObject.category,
    moved: false,
    velocity: { x: 0, y: 0 },
    rotation: 0,
    scale: { x: 1, y: 1 },
  };
}
```

---

## Canvas Rendering

### 1. Game Canvas Component

```typescript
// components/GameCanvas.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { GameObject } from '@/lib/matching';

interface GameCanvasProps {
  objects: GameObject[];
  onObjectsUpdate: (objects: GameObject[]) => void;
  onObjectCleaned: () => void;
}

export default function GameCanvas({
  objects,
  onObjectsUpdate,
  onObjectCleaned,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});

  // Preload images
  useEffect(() => {
    const loadedImages: Record<string, HTMLImageElement> = {};
    let loadedCount = 0;

    objects.forEach((obj) => {
      const img = new Image();
      img.src = obj.asset.file;
      img.onload = () => {
        loadedImages[obj.id] = img;
        loadedCount++;
        if (loadedCount === objects.length) {
          setImages(loadedImages);
        }
      };
    });
  }, [objects]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#FFF5F7');
      gradient.addColorStop(1, '#E8F4F8');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cleanup zone
      ctx.fillStyle = 'rgba(144, 238, 144, 0.2)';
      ctx.fillRect(0, 0, canvas.width, 100);
      ctx.strokeStyle = '#90EE90';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.strokeRect(5, 5, canvas.width - 10, 90);
      ctx.setLineDash([]);

      // Draw cleanup zone text
      ctx.fillStyle = '#2D5016';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('✨ CLEAN ZONE ✨', canvas.width / 2, 50);

      // Draw objects
      objects.forEach((obj) => {
        const img = images[obj.id];
        if (!img) return;

        ctx.save();
        ctx.translate(obj.position.x, obj.position.y);
        ctx.rotate(obj.rotation);
        ctx.scale(obj.scale.x, obj.scale.y);

        // Draw shadow if not moved
        if (!obj.moved) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.beginPath();
          ctx.ellipse(0, obj.size / 2, obj.size * 0.5, obj.size * 0.15, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw image
        ctx.drawImage(
          img,
          -obj.size / 2,
          -obj.size / 2,
          obj.size,
          obj.size
        );

        // Draw checkmark if cleaned
        if (obj.moved) {
          ctx.fillStyle = '#2D5016';
          ctx.font = `${obj.size * 0.5}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', 0, 0);
        }

        ctx.restore();

        // Draw label
        ctx.fillStyle = obj.moved ? '#2D5016' : '#666';
        ctx.font = `bold ${obj.size / 4}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(
          obj.name.slice(0, 12),
          obj.position.x,
          obj.position.y + obj.size / 2 + 15
        );
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [objects, images]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked object
    const clicked = objects.find((obj) => {
      const dx = x - obj.position.x;
      const dy = y - obj.position.y;
      return Math.sqrt(dx * dx + dy * dy) < obj.size / 2;
    });

    if (clicked) {
      setDragging(clicked.id);
      setDragOffset({
        x: x - clicked.position.x,
        y: y - clicked.position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedObjects = objects.map((obj) => {
      if (obj.id === dragging) {
        const newX = x - dragOffset.x;
        const newY = y - dragOffset.y;

        return {
          ...obj,
          position: { x: newX, y: newY },
          velocity: {
            x: (newX - obj.position.x) * 0.5,
            y: (newY - obj.position.y) * 0.5,
          },
          rotation: (newX - obj.position.x) * 0.02,
        };
      }
      return obj;
    });

    onObjectsUpdate(updatedObjects);
  };

  const handleMouseUp = () => {
    if (!dragging) return;

    const draggedObj = objects.find((obj) => obj.id === dragging);
    if (!draggedObj) return;

    // Check if in cleanup zone
    const inCleanZone = draggedObj.position.y < 100;

    if (inCleanZone && !draggedObj.moved) {
      // Mark as cleaned
      const updatedObjects = objects.map((obj) =>
        obj.id === dragging ? { ...obj, moved: true } : obj
      );
      onObjectsUpdate(updatedObjects);
      onObjectCleaned();
    }

    setDragging(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={500}
      className="border-4 border-purple-200 rounded-xl cursor-pointer shadow-lg bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
```

---

## Kawaii Physics Implementation

### Physics Engine

```typescript
// lib/physics.ts

export class SpringPhysics {
  current: { x: number; y: number };
  target: { x: number; y: number };
  velocity: { x: number; y: number };
  stiffness: number;
  damping: number;

  constructor(
    initialPos = { x: 0, y: 0 },
    stiffness = 0.1,
    damping = 0.8
  ) {
    this.current = { ...initialPos };
    this.target = { ...initialPos };
    this.velocity = { x: 0, y: 0 };
    this.stiffness = stiffness;
    this.damping = damping;
  }

  setTarget(x: number, y: number) {
    this.target = { x, y };
  }

  update() {
    // Calculate spring force
    const forceX = (this.target.x - this.current.x) * this.stiffness;
    const forceY = (this.target.y - this.current.y) * this.stiffness;

    // Update velocity
    this.velocity.x += forceX;
    this.velocity.y += forceY;

    // Apply damping
    this.velocity.x *= this.damping;
    this.velocity.y *= this.damping;

    // Update position
    this.current.x += this.velocity.x;
    this.current.y += this.velocity.y;

    return this.current;
  }

  getSpeed() {
    return Math.sqrt(
      this.velocity.x ** 2 + this.velocity.y ** 2
    );
  }
}

export class SquashStretch {
  scaleX = 1;
  scaleY = 1;
  targetScaleX = 1;
  targetScaleY = 1;

  apply(velocity: { x: number; y: number }) {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    const squashAmount = Math.min(speed * 0.02, 0.3);

    if (speed > 0.1) {
      const angle = Math.atan2(velocity.y, velocity.x);
      this.targetScaleX = 1 + squashAmount * Math.abs(Math.cos(angle));
      this.targetScaleY = 1 - squashAmount * Math.abs(Math.sin(angle));
    } else {
      this.targetScaleX = 1;
      this.targetScaleY = 1;
    }
  }

  update() {
    // Spring back to target
    this.scaleX += (this.targetScaleX - this.scaleX) * 0.15;
    this.scaleY += (this.targetScaleY - this.scaleY) * 0.15;

    return { x: this.scaleX, y: this.scaleY };
  }
}

export function idleWiggle(time: number, objectId: string) {
  const offset = objectId.charCodeAt(objectId.length - 1);
  
  return {
    scale: 1 + Math.sin(time * 0.002 + offset) * 0.03,
    rotation: Math.sin(time * 0.001 + offset) * 0.05,
    yOffset: Math.sin(time * 0.003 + offset) * 0.5,
  };
}
```

---

## Gamification Features

### Score & Progress Tracker

```typescript
// components/ProgressTracker.tsx
'use client';

import { Trophy, Star } from 'lucide-react';

interface ProgressTrackerProps {
  score: number;
  movedCount: number;
  totalCount: number;
}

export default function ProgressTracker({
  score,
  movedCount,
  totalCount,
}: ProgressTrackerProps) {
  const percentClean = totalCount > 0
    ? Math.round((movedCount / totalCount) * 100)
    : 0;

  const stars = percentClean >= 95 ? 3 : percentClean >= 80 ? 2 : percentClean >= 60 ? 1 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-500" />
          <div>
            <div className="text-3xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">points</div>
          </div>
        </div>

        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <Star
              key={i}
              className={`w-8 h-8 ${
                i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-bold text-purple-600">
            {movedCount} / {totalCount}
          </span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 
                     transition-all duration-500 ease-out"
            style={{ width: `${percentClean}%` }}
          />
        </div>
        <div className="text-center text-2xl font-bold text-green-600">
          {percentClean}%
        </div>
      </div>

      {percentClean === 100 && (
        <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 
                      p-4 rounded-lg text-center animate-bounce">
          <p className="text-2xl font-bold text-white">🎉 PERFECT! 🎉</p>
          <p className="text-white">Now clean your REAL room!</p>
        </div>
      )}
    </div>
  );
}
```

---

### State Management with Zustand

```typescript
// lib/store.ts
import { create } from 'zustand';
import { GameObject } from './matching';

interface GameState {
  // Image state
  image: File | null;
  imagePreview: string | null;
  
  // Game state
  objects: GameObject[];
  score: number;
  totalStars: number;
  currentStreak: number;
  
  // Actions
  setImage: (file: File, preview: string) => void;
  setObjects: (objects: GameObject[]) => void;
  updateObject: (id: string, updates: Partial<GameObject>) => void;
  cleanObject: (id: string) => void;
  addScore: (points: number) => void;
  incrementStreak: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  image: null,
  imagePreview: null,
  objects: [],
  score: 0,
  totalStars: 0,
  currentStreak: 0,

  // Actions
  setImage: (file, preview) =>
    set({ image: file, imagePreview: preview }),

  setObjects: (objects) =>
    set({ objects }),

  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    })),

  cleanObject: (id) =>
    set((state) => {
      const object = state.objects.find((obj) => obj.id === id);
      if (!object || object.moved) return state;

      return {
        objects: state.objects.map((obj) =>
          obj.id === id ? { ...obj, moved: true } : obj
        ),
        score: state.score + 10,
      };
    }),

  addScore: (points) =>
    set((state) => ({ score: state.score + points })),

  incrementStreak: () =>
    set((state) => ({ currentStreak: state.currentStreak + 1 })),

  reset: () =>
    set({
      image: null,
      imagePreview: null,
      objects: [],
      score: 0,
    }),
}));
```

---

## Complete Game Page

```typescript
// app/game/page.tsx
'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import GameCanvas from '@/components/GameCanvas';
import ProgressTracker from '@/components/ProgressTracker';
import { detectObjects } from '@/lib/detection';
import { createGameObject } from '@/lib/matching';
import { useGameStore } from '@/lib/store';

export default function GamePage() {
  const [isDetecting, setIsDetecting] = useState(false);
  const { 
    imagePreview, 
    objects, 
    score,
    setImage, 
    setObjects, 
    cleanObject,
    addScore 
  } = useGameStore();

  const handleImageSelected = async (file: File, preview: string) => {
    setImage(file, preview);
    setIsDetecting(true);

    try {
      // Detect objects
      const detected = await detectObjects(file);
      
      // Match to assets and create game objects
      const gameObjects = detected.map((obj, idx) => createGameObject(obj, idx));
      
      setObjects(gameObjects);
    } catch (error) {
      console.error('Detection failed:', error);
      alert('Failed to detect objects. Please try another image.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleObjectCleaned = () => {
    // Celebration!
    addScore(10);
    // TODO: Play sound effect, show particles
  };

  const movedCount = objects.filter((obj) => obj.moved).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 
                     bg-gradient-to-r from-pink-500 to-purple-600 
                     bg-clip-text text-transparent">
          Kawaii Cleanup Game! ✨
        </h1>

        {objects.length > 0 && (
          <ProgressTracker
            score={score}
            movedCount={movedCount}
            totalCount={objects.length}
          />
        )}

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Room Photo</h2>
            <ImageUpload onImageSelected={handleImageSelected} />
            
            {isDetecting && (
              <div className="mt-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 
                              border-4 border-purple-200 border-t-purple-600 
                              mx-auto mb-2" />
                <p className="text-purple-600 font-semibold">
                  Detecting objects...
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Play & Clean!</h2>
            {objects.length > 0 ? (
              <GameCanvas
                objects={objects}
                onObjectsUpdate={setObjects}
                onObjectCleaned={handleObjectCleaned}
              />
            ) : (
              <div className="h-[500px] flex items-center justify-center 
                            border-4 border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-400 text-lg">Upload a photo to start!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Environment Variables

```bash
# .env.local
ANTHROPIC_API_KEY=your_claude_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000/game
```

---

## Next Steps

1. **Add Sound Effects:**
   - Install `howler.js` for audio
   - Add pickup, drop, and success sounds

2. **Improve Physics:**
   - Add gravity and bouncing
   - Implement collision detection
   - Fine-tune spring parameters

3. **Add Particle System:**
   - Create particle component
   - Emit particles on success
   - Add different particle types

4. **Implement Persistence:**
   - Save game state to localStorage
   - Track user progress over time
   - Implement streak system

5. **Polish UI:**
   - Add tutorial/onboarding
   - Create victory screen
   - Improve mobile responsiveness

---

This guide provides a solid foundation for building the game. Each section can be expanded and enhanced based on your specific needs!
