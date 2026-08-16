'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';

// --- Configuration ---
const TOTAL_FRAMES = 90;
const SEQUENCE_PATH = '/sequence';
const FILE_PREFIX = 'frame';
const IMAGE_EXTENSION = 'webp';

// Helper to format filename with leading zeros: frame_0001.webp
const getFilename = (index: number) => {
  const paddedIndex = String(index + 1).padStart(4, '0');
  return `${FILE_PREFIX}_${paddedIndex}.${IMAGE_EXTENSION}`;
};

// --- Types ---
interface TextOverlay {
  id: number;
  content: React.ReactNode;
  start: number; // Start trigger (0 - 1)
  end: number;   // End trigger (0 - 1)
  align: 'center' | 'left' | 'right';
}

// --- Content Configuration ---
const textOverlays: TextOverlay[] = [
  {
    id: 1,
    content: <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white">The Apex Kinetic.</h1>,
    start: 0,
    end: 0.15,
    align: 'center',
  },
  {
    id: 2,
    content: <p className="text-2xl md:text-3xl font-light tracking-tight text-white/80 max-w-xl">Precision milled aerospace-grade aluminum chassis.</p>,
    start: 0.28,
    end: 0.42,
    align: 'left',
  },
  {
    id: 3,
    content: <p className="text-2xl md:text-3xl font-light tracking-tight text-white/80 max-w-xl">Modular internal architecture allows for infinite customization.</p>,
    start: 0.55,
    end: 0.72,
    align: 'right',
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-5xl md:text-6xl font-medium tracking-tighter text-white">Engineered for tomorrow.</p>
        <button className="mt-8 px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-white/80 transition-colors pointer-events-auto cursor-pointer">
          Pre-order Now
        </button>
      </div>
    ),
    start: 0.88,
    end: 1,
    align: 'center',
  },
];

// Sub-component for individual text overlay to respect React Hook rules cleanly
function OverlayItem({ 
  overlay, 
  scrollYProgress 
}: { 
  overlay: TextOverlay; 
  scrollYProgress: MotionValue<number>; 
}) {
  const mid = (overlay.start + overlay.end) / 2;
  const opacity = useTransform(
    scrollYProgress, 
    [overlay.start, mid, overlay.end], 
    [0, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [overlay.start, mid, overlay.end],
    [20, 0, -20]
  );

  const getAlignmentClass = (align: string) => {
    switch (align) {
      case 'left': return 'items-start text-left';
      case 'right': return 'items-end text-right';
      case 'center': default: return 'items-center text-center';
    }
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex ${getAlignmentClass(overlay.align)}`}
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        {overlay.content}
      </div>
    </motion.div>
  );
}

export default function ProductSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for loading management
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  // State for canvas sizing
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 1920, height: 1080 });

  // --- 1. Preloading Strategy ---
  useEffect(() => {
    document.body.classList.add('isLoading');
    let loadedCount = 0;
    const imageArray: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loadedCount++;
      setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
      if (loadedCount === TOTAL_FRAMES) {
        setImagesLoaded(true);
        document.body.classList.remove('isLoading');
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${SEQUENCE_PATH}/${getFilename(i)}`;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Even on error, increment to prevent getting stuck
      imageArray.push(img);
    }
    setImages(imageArray);

    return () => {
      document.body.classList.remove('isLoading');
    };
  }, []);

  // --- 2. Canvas Sizing & Responsiveness ---
  const updateCanvasSize = useCallback(() => {
    if (canvasRef.current) {
      const img = images[0] && images[0].width ? images[0] : { width: 1920, height: 1080 };
      const aspectRatio = img.width / img.height;
      
      let width = window.innerWidth;
      let height = width / aspectRatio;

      if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height * aspectRatio;
      }

      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      setCanvasDimensions({ width, height });
    }
  }, [images]);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    if (imagesLoaded) updateCanvasSize(); 

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize, imagesLoaded]);

  // --- 3. Rendering Logic ---
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      // Draw actual loaded frame image
      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      
      const centerShift_x = (width - img.width * ratio) / 2;
      const centerShift_y = (height - img.height * ratio) / 2;
      
      ctx.drawImage(
        img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    } else {
      // Procedural Canvas Fallback visualization while frames load or if image is missing
      const progress = index / Math.max(1, TOTAL_FRAMES - 1);
      const cx = width / 2;
      const cy = height / 2;

      ctx.save();
      // Glow background
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.min(width, height) * 0.4);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      grad.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Kinetic component layers (Exploding view visualization fallback)
      const spread = progress * (height * 0.28);
      
      // Core battery block
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cx - 160, cy - 40 + spread * 0.2, 320, 80, 16);
      ctx.fill();
      ctx.stroke();

      // Powertrain motor
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(cx, cy - spread * 0.6, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Outer Aerodynamic Shell
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(cx, cy - spread * 1.1, 240, 100, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Laser energy lines
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 + progress * 0.6})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 240, cy - spread * 1.1);
      ctx.lineTo(cx - 160, cy - 40 + spread * 0.2);
      ctx.moveTo(cx + 240, cy - spread * 1.1);
      ctx.lineTo(cx + 160, cy - 40 + spread * 0.2);
      ctx.stroke();

      ctx.restore();
    }
  }, [images]);

  // Initialize first frame
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
    }
  }, [imagesLoaded, renderFrame]);

  // --- 4. Scroll & Animation Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    const unsubscribe = frameIndex.on('change', (latest) => {
      const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
      renderFrame(idx);
    });

    return () => unsubscribe();
  }, [frameIndex, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6" />
            <p className="text-white/60 text-sm tracking-widest uppercase font-mono">
              Loading Experience {Math.round(loadProgress)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="opacity-100 transition-opacity duration-300"
          style={{ 
            width: canvasDimensions.width, 
            height: canvasDimensions.height 
          }}
        />

        {/* Text Overlays - Positioned over canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 h-full relative">
            {textOverlays.map((overlay) => (
              <OverlayItem 
                key={overlay.id} 
                overlay={overlay} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
