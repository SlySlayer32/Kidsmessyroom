import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Wand2, Trophy, Sparkles } from 'lucide-react';

export default function KawaiiPhysicsCleanupGame() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [step, setStep] = useState('upload');
  const [objects, setObjects] = useState([]);
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setStep('upload');
      setObjects([]);
      setScore(0);
      setParticles([]);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) return;

    setStep('detecting');
    
    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
                    media_type: image.type,
                    data: base64Data,
                  },
                },
                {
                  type: 'text',
                  text: `Analyze this messy room and identify ALL movable objects. Return ONLY a JSON array:
[
  {
    "name": "object name",
    "category": "toys/clothing/books/misc",
    "emoji": "appropriate emoji",
    "size": "small/medium/large",
    "position": "top-left/top-center/top-right/middle-left/center/middle-right/bottom-left/bottom-center/bottom-right"
  }
]`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const textContent = data.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('');

      const jsonMatch = textContent.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Could not parse results');
      
      const detectedObjects = JSON.parse(jsonMatch[0]);

      const positionMap = {
        'top-left': { x: 80, y: 120 },
        'top-center': { x: 250, y: 120 },
        'top-right': { x: 420, y: 120 },
        'middle-left': { x: 80, y: 220 },
        'center': { x: 250, y: 220 },
        'middle-right': { x: 420, y: 220 },
        'bottom-left': { x: 80, y: 320 },
        'bottom-center': { x: 250, y: 320 },
        'bottom-right': { x: 420, y: 320 },
      };

      const categoryColors = {
        toys: '#FF6B9D',
        clothing: '#4ECDC4',
        books: '#FFA07A',
        misc: '#FFD93D',
      };

      const styledObjects = detectedObjects.map((obj, idx) => ({
        id: `obj-${idx}`,
        name: obj.name,
        emoji: obj.emoji || '🎁',
        category: obj.category,
        baseColor: categoryColors[obj.category] || '#FFD93D',
        size: obj.size === 'large' ? 55 : obj.size === 'medium' ? 45 : 35,
        position: positionMap[obj.position] || { x: 100 + (idx * 35) % 400, y: 150 + Math.floor(idx / 10) * 60 },
        velocity: { x: 0, y: 0 },
        rotation: 0,
        rotationVelocity: 0,
        scale: 1,
        squash: 1,
        moved: false,
        bouncing: false,
      }));

      setObjects(styledObjects);
      setStep('playing');

    } catch (error) {
      console.error('Error:', error);
      setStep('upload');
    }
  };

  // Animation loop
  useEffect(() => {
    if (step !== 'playing') return;

    const animate = () => {
      // Update object physics
      setObjects(prev => prev.map(obj => {
        let newObj = { ...obj };

        // Apply velocity (drift after drag)
        if (!dragging || dragging !== obj.id) {
          newObj.position.x += newObj.velocity.x;
          newObj.position.y += newObj.velocity.y;
          
          // Friction
          newObj.velocity.x *= 0.92;
          newObj.velocity.y *= 0.92;
          
          // Rotation from velocity
          newObj.rotation += newObj.rotationVelocity;
          newObj.rotationVelocity *= 0.95;
          
          // Bounce animation
          if (newObj.bouncing) {
            newObj.squash = 1 + Math.sin(Date.now() * 0.02) * 0.1;
            if (Math.abs(newObj.velocity.x) < 0.1 && Math.abs(newObj.velocity.y) < 0.1) {
              newObj.bouncing = false;
              newObj.squash = 1;
            }
          }
          
          // Idle wiggle for unmoved objects
          if (!newObj.moved && !newObj.bouncing) {
            newObj.scale = 1 + Math.sin(Date.now() * 0.003 + obj.id.charCodeAt(5)) * 0.03;
          }
        }

        // Keep in bounds
        newObj.position.x = Math.max(50, Math.min(450, newObj.position.x));
        newObj.position.y = Math.max(100, Math.min(380, newObj.position.y));

        return newObj;
      }));

      // Update particles
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2, // gravity
          life: p.life - 1,
          scale: p.scale * 0.97,
        }))
        .filter(p => p.life > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [step, dragging]);

  // Canvas drawing
  useEffect(() => {
    if (step !== 'playing' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#FFF5F7');
      gradient.addColorStop(1, '#E8F4F8');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cleanup zone with sparkles
      ctx.fillStyle = 'rgba(144, 238, 144, 0.2)';
      ctx.fillRect(0, 0, canvas.width, 80);
      ctx.strokeStyle = '#90EE90';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.strokeRect(5, 5, canvas.width - 10, 70);
      ctx.setLineDash([]);
      
      // Animated text
      const bounce = Math.sin(Date.now() * 0.005) * 3;
      ctx.fillStyle = '#2D5016';
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('✨ CLEAN ZONE ✨', canvas.width / 2, 40 + bounce);

      // Draw particles
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.scale(p.scale, p.scale);
        ctx.font = '20px Arial';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      // Draw objects
      objects.forEach(obj => {
        const x = obj.position.x;
        const y = obj.position.y;
        const size = obj.size * obj.scale;
        const isDragging = dragging === obj.id;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(obj.rotation);

        // Shadow
        if (!obj.moved) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.beginPath();
          ctx.ellipse(0, size/2 + 5, size * 0.7, size * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Squash & stretch
        ctx.scale(1 / obj.squash, obj.squash);

        // Glow when dragging
        if (isDragging) {
          ctx.shadowColor = obj.baseColor;
          ctx.shadowBlur = 20;
        }

        // Main object body (kawaii style)
        ctx.fillStyle = obj.moved ? '#90EE90' : obj.baseColor;
        ctx.strokeStyle = darkenColor(obj.moved ? '#90EE90' : obj.baseColor);
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Kawaii face
        if (!obj.moved) {
          // Eyes
          ctx.fillStyle = '#333';
          ctx.beginPath();
          ctx.arc(-size/5, -size/8, size/12, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(size/5, -size/8, size/12, 0, Math.PI * 2);
          ctx.fill();
          
          // Eye shine
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(-size/5 + size/20, -size/8 - size/20, size/20, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(size/5 + size/20, -size/8 - size/20, size/20, 0, Math.PI * 2);
          ctx.fill();

          // Smile
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, size/10, size/4, 0, Math.PI);
          ctx.stroke();

          // Blush
          ctx.fillStyle = 'rgba(255, 150, 150, 0.4)';
          ctx.beginPath();
          ctx.ellipse(-size/3, size/8, size/8, size/12, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(size/3, size/8, size/8, size/12, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Happy cleaned face
          ctx.fillStyle = '#2D5016';
          ctx.font = `${size/2}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', 0, 0);
        }

        // Emoji
        ctx.font = `${size * 0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.emoji, 0, -size * 0.6);

        ctx.restore();

        // Label below
        ctx.fillStyle = obj.moved ? '#2D5016' : '#666';
        ctx.font = `bold ${size/4}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(obj.name.slice(0, 12), x, y + size + 15);
      });

      requestAnimationFrame(drawScene);
    };

    drawScene();
  }, [objects, dragging, particles, step]);

  const handleMouseDown = (e) => {
    if (step !== 'playing') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = objects.find(obj => {
      const dx = x - obj.position.x;
      const dy = y - obj.position.y;
      return Math.sqrt(dx * dx + dy * dy) < obj.size / 2;
    });

    if (clicked) {
      setDragging(clicked.id);
      setDragOffset({
        x: x - clicked.position.x,
        y: y - clicked.position.y
      });
      
      // Start wiggle animation
      setObjects(prev => prev.map(obj => 
        obj.id === clicked.id 
          ? { ...obj, scale: 1.1, velocity: { x: 0, y: 0 } }
          : obj
      ));
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging || step !== 'playing') return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setObjects(prev => prev.map(obj => {
      if (obj.id === dragging) {
        const newX = x - dragOffset.x;
        const newY = y - dragOffset.y;
        const velX = (newX - obj.position.x) * 0.5;
        const velY = (newY - obj.position.y) * 0.5;
        
        return {
          ...obj,
          position: { x: newX, y: newY },
          velocity: { x: velX, y: velY },
          rotationVelocity: velX * 0.02,
        };
      }
      return obj;
    }));
  };

  const handleMouseUp = () => {
    if (!dragging || step !== 'playing') return;

    setObjects(prev => prev.map(obj => {
      if (obj.id === dragging) {
        const inCleanZone = obj.position.y < 80;
        
        if (inCleanZone && !obj.moved) {
          // Create particle burst!
          const newParticles = [];
          for (let i = 0; i < 15; i++) {
            newParticles.push({
              x: obj.position.x,
              y: obj.position.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8 - 3,
              life: 30,
              scale: 1,
              emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)],
              color: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'][Math.floor(Math.random() * 4)],
            });
          }
          setParticles(prev => [...prev, ...newParticles]);
          setScore(s => s + 10);
          
          return {
            ...obj,
            moved: true,
            scale: 1,
            bouncing: true,
            squash: 1.3,
          };
        }
        
        return {
          ...obj,
          scale: 1,
          bouncing: true,
        };
      }
      return obj;
    }));

    setDragging(null);
  };

  const darkenColor = (color) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 40);
    const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 40);
    const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 40);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const movedCount = objects.filter(o => o.moved).length;
  const totalCount = objects.length;
  const percentClean = totalCount > 0 ? Math.round((movedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-12 h-12 text-pink-500 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Kawaii Physics Cleanup!
            </h1>
            <Sparkles className="w-12 h-12 text-blue-500 animate-pulse" />
          </div>
          <p className="text-lg text-gray-700">Bouncy, wiggly, cute cleanup game with physics!</p>
        </div>

        {step === 'playing' && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">Score: {score}</div>
                  <div className="text-sm text-gray-600">{movedCount} / {totalCount} cleaned</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{percentClean}%</div>
                <div className="text-sm text-gray-600">Clean</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Upload className="w-6 h-6" />
              Upload Your Room
            </h2>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-96 border-4 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 transition-colors bg-purple-50">
                <Camera className="w-16 h-16 text-purple-400 mb-3" />
                <span className="text-xl text-purple-600 font-semibold">Upload messy room photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Room"
                  className="w-full h-96 object-cover rounded-xl border-4 border-purple-200"
                />
                
                {step === 'upload' && (
                  <button
                    onClick={processImage}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Wand2 className="w-6 h-6" />
                    Create Kawaii Game!
                  </button>
                )}

                {step === 'detecting' && (
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-200 border-t-purple-600"></div>
                      <span className="text-lg font-semibold text-purple-800">Detecting objects...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Sparkles className="w-6 h-6" />
              Physics Cleanup Game
            </h2>

            {step !== 'playing' ? (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Wand2 className="w-16 h-16 mb-3" />
                <p className="text-lg">Upload a photo to start!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={400}
                  className="border-4 border-purple-200 rounded-xl cursor-pointer shadow-inner bg-white"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-2 border-purple-200">
                  <p className="text-center text-purple-800 font-semibold">
                    🎮 Drag the bouncy kawaii objects to the sparkly zone!
                  </p>
                  <p className="text-center text-sm text-gray-600 mt-1">
                    Watch them wiggle, bounce, and celebrate! ✨
                  </p>
                </div>

                {percentClean === 100 && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-xl text-center animate-bounce">
                    <p className="text-3xl font-bold text-white mb-2">🎉 PERFECT! 🎉</p>
                    <p className="text-xl text-white">Your room is sparkling clean!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Physics Features in This Demo:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-2">
              <li>✨ <strong>Idle Wiggle:</strong> Objects breathe and wiggle when untouched</li>
              <li>💫 <strong>Drag Physics:</strong> Objects follow cursor with smooth momentum</li>
              <li>🎯 <strong>Bounce Effect:</strong> Squash & stretch when dropped</li>
            </ul>
            <ul className="space-y-2">
              <li>🌟 <strong>Rotation:</strong> Objects rotate based on drag velocity</li>
              <li>⭐ <strong>Particle Burst:</strong> Sparkles explode when cleaned!</li>
              <li>🎨 <strong>Kawaii Faces:</strong> Cute expressions on every object</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}