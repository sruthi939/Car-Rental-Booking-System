'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';

// --- Configuration ---
const TOTAL_FRAMES = 50;
const SEQUENCE_PATH = '/car-sequence';
const FILE_PREFIX = 'car';
const IMAGE_EXTENSION = 'webp';

// Helper for 4-digit padded filename: car_0001.webp
const getFilename = (index: number) => {
  const paddedIndex = String(index + 1).padStart(4, '0');
  return `${FILE_PREFIX}_${paddedIndex}.${IMAGE_EXTENSION}`;
};

// --- Sub-component for Scroll-Synced Text Overlay ---
interface TextSectionProps {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  range: [number, number, number]; // [start, peak, end]
  align: 'center' | 'left' | 'right';
}

function TextSection({ children, scrollYProgress, range, align }: TextSectionProps) {
  const opacity = useTransform(scrollYProgress, range, [0, 1, 0]);
  const y = useTransform(scrollYProgress, range, [25, 0, -25]);
  const filter = useTransform(scrollYProgress, range, ['blur(8px)', 'blur(0px)', 'blur(8px)']);

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'left': return 'items-start text-left pl-6 md:pl-16';
      case 'right': return 'items-end text-right pr-6 md:pr-16';
      case 'center': default: return 'items-center text-center px-6';
    }
  };

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className={`absolute inset-0 flex flex-col justify-center ${getAlignmentClass(align)} pointer-events-none`}
    >
      <div className="max-w-xl md:max-w-2xl w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function CarScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for high-performance rAF rendering without React state updates during scroll
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Loading state
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 1920, height: 1080 });

  // --- 1. Preload Image Sequence ---
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let loadedCount = 0;
    const imageArray: HTMLImageElement[] = [];

    const handleLoad = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(pct);

      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = imageArray;
        setImagesLoaded(true);
        document.body.style.overflow = '';
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${SEQUENCE_PATH}/${getFilename(i)}`;
      img.onload = handleLoad;
      img.onerror = handleLoad; // Increment even on error to avoid stuck screen
      imageArray.push(img);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // --- 2. High-DPI & Responsive Canvas Sizing ---
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const firstImg = imagesRef.current[0];
    const aspect = firstImg && firstImg.naturalWidth ? firstImg.naturalWidth / firstImg.naturalHeight : 16 / 9;

    let width = window.innerWidth;
    let height = width / aspect;

    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = height * aspect;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    setCanvasDimensions({ width: Math.floor(width), height: Math.floor(height) });
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    if (imagesLoaded) updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize, imagesLoaded]);

  // --- 3. Optimized Canvas Frame Rendering via rAF ---
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Object-fit contain math
      const hRatio = width / img.naturalWidth;
      const vRatio = height / img.naturalHeight;
      const ratio = Math.min(hRatio, vRatio);

      const centerShiftX = (width - img.naturalWidth * ratio) / 2;
      const centerShiftY = (height - img.naturalHeight * ratio) / 2;

      ctx.drawImage(
        img, 0, 0, img.naturalWidth, img.naturalHeight,
        centerShiftX, centerShiftY, img.naturalWidth * ratio, img.naturalHeight * ratio
      );
    }
  }, []);

  // Smooth rAF loop
  const renderLoop = useCallback(() => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;

    if (Math.abs(current - target) > 0.01) {
      // Smooth lerp step towards target frame
      currentFrameRef.current += (target - current) * 0.25;
      const roundedFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));
      drawFrame(roundedFrame);
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    } else {
      currentFrameRef.current = target;
      drawFrame(Math.round(target));
      animFrameIdRef.current = null;
    }
  }, [drawFrame]);

  const scheduleFrameRender = useCallback((targetFrame: number) => {
    targetFrameRef.current = targetFrame;
    if (animFrameIdRef.current === null) {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    }
  }, [renderLoop]);

  // Initial draw when loaded
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0);
    }
  }, [imagesLoaded, drawFrame]);

  // --- 4. Scroll Tracking with Framer Motion ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (!imagesLoaded) return;
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest * (TOTAL_FRAMES - 1))));
      scheduleFrameRender(frameIndex);
    });

    return () => {
      unsubscribe();
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [scrollYProgress, imagesLoaded, scheduleFrameRender]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">

      {/* Loading Overlay (0% -> 100%) */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
              <div 
                className="absolute inset-0 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" 
              />
              <span className="font-mono text-xs text-white/70">{loadProgress}%</span>
            </div>
            
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-mono mb-2">
              INITIALIZING EXPERIENCE
            </p>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-200 ease-out" 
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        <canvas
          ref={canvasRef}
          style={{
            width: canvasDimensions.width,
            height: canvasDimensions.height,
          }}
          className="block select-none pointer-events-none"
        />

        {/* --- Scroll-driven Text Overlays --- */}

        {/* 1. HERO SECTION (0% - Assembled Supercar) */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0, 0.08, 0.16]} 
          align="center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-3 font-mono">
            THE FUTURE OF PERFORMANCE
          </p>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white uppercase leading-none">
            ENGINEERED<br />TO MOVE.
          </h1>
        </TextSection>

        {/* 2. FEATURE SECTION #1 (30% - Panel Disassembly) */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.22, 0.35, 0.46]} 
          align="left"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white uppercase mb-4 leading-tight">
            PRECISION<br />IN EVERY LAYER.
          </h2>
          <p className="text-lg md:text-xl font-light text-white/60 tracking-tight leading-relaxed">
            Every component is engineered with purpose.<br className="hidden md:inline" />
            Nothing unnecessary. Nothing compromised.
          </p>
        </TextSection>

        {/* 3. FEATURE SECTION #2 (60% - Fully Exploded Technical View) */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.52, 0.65, 0.76]} 
          align="right"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white uppercase mb-4 leading-tight">
            BEAUTY<br />UNDER THE SURFACE.
          </h2>
          <p className="text-lg md:text-xl font-light text-white/60 tracking-tight leading-relaxed">
            From aerodynamic bodywork to the precision-built<br className="hidden md:inline" />
            systems beneath it, every detail works together.
          </p>
        </TextSection>

        {/* 4. FINAL SECTION (90% - Reassembly Contraction) */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.82, 0.89, 0.94]} 
          align="center"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase mb-3 leading-none">
            BUILT<br />WITHOUT LIMITS.
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/60 tracking-tight">
            Performance, redefined.
          </p>
        </TextSection>

        {/* 5. FINAL CTA SECTION (100% - Fully Reassembled Supercar) */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.95, 0.98, 1.0]} 
          align="center"
        >
          <div className="flex flex-col items-center gap-6 pointer-events-auto">
            <span className="text-xs uppercase tracking-[0.5em] text-white/40 font-mono">
              VANTORA
            </span>
            <h2 className="text-5xl md:text-8xl font-normal tracking-tighter text-white uppercase">
              DRIVE THE NEXT.
            </h2>
            <button className="mt-4 px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/50 backdrop-blur-md rounded-full text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-2xl">
              EXPLORE THE MACHINE
            </button>
          </div>
        </TextSection>

      </div>
    </div>
  );
}
