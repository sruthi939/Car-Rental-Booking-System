'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';

// --- Configuration ---
const TOTAL_FRAMES = 50;
const SEQUENCE_PATH = '/car-sequence';
const FILE_PREFIX = 'car';
const IMAGE_EXTENSION = 'webp';

// Helper for filename: car_0001.webp with fallback frame (1).jpg
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
      case 'left': return 'items-start text-left pl-6 md:pl-20';
      case 'right': return 'items-end text-right pr-6 md:pr-20';
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

export default function ExploreScrollytelling() {
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

  // --- 1. Preload 120 WebP Sequence Frames ---
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
      const primarySrc = `${SEQUENCE_PATH}/${getFilename(i)}`;
      const fallbackSrc = `${SEQUENCE_PATH}/frame (${i + 1}).jpg`;
      img.src = primarySrc;
      img.onload = handleLoad;
      img.onerror = () => {
        if (!img.dataset.retried) {
          img.dataset.retried = 'true';
          img.src = fallbackSrc;
        } else {
          handleLoad();
        }
      };
      imageArray.push(img);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // --- 2. High-DPI & Responsive Canvas Sizing (Contain Fit) ---
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

  // --- 3. Optimized Canvas Frame Drawing via rAF ---
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas to pure #000000
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Contain fit calculation
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

  // Smooth rAF render loop
  const renderLoop = useCallback(() => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;

    if (Math.abs(current - target) > 0.01) {
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

  // Initial draw when fully loaded
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
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#000000]">

      {/* Preloader Screen (0% -> 100%) */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] text-white"
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
            
            <p className="text-white/50 text-xs tracking-[0.35em] uppercase font-mono mb-3">
              INITIALIZING EXPERIENCE
            </p>
            <div className="w-52 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-200 ease-out" 
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000]">
        <canvas
          ref={canvasRef}
          style={{
            width: canvasDimensions.width,
            height: canvasDimensions.height,
          }}
          className="block select-none pointer-events-none"
        />

        {/* --- Story Overlays --- */}

        {/* 0% Scroll: AVENTADOR DECONSTRUCTED */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0, 0.08, 0.16]} 
          align="center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-3 font-mono">
            LAMBORGHINI EXPLORE
          </p>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white/90 uppercase leading-none">
            AVENTADOR<br />DECONSTRUCTED
          </h1>
        </TextSection>

        {/* 30% Scroll: 770 HP V12 Core */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.22, 0.32, 0.44]} 
          align="left"
        >
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white/90 uppercase mb-4 leading-tight">
            770 HP V12 Core
          </h2>
          <p className="text-lg md:text-xl font-light text-white/60 tracking-tight leading-relaxed">
            Naturally aspirated 6.5L V12 engine pushing<br className="hidden md:inline" />
            8,500 RPM of pure acoustic fury.
          </p>
        </TextSection>

        {/* 60% Scroll: Aerodinamica ALA */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.52, 0.62, 0.74]} 
          align="right"
        >
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white/90 uppercase mb-4 leading-tight">
            Aerodinamica ALA
          </h2>
          <p className="text-lg md:text-xl font-light text-white/60 tracking-tight leading-relaxed">
            Active aerodynamics matrix dynamically controlling<br className="hidden md:inline" />
            downforce and aero-vectoring in real time.
          </p>
        </TextSection>

        {/* 90% Scroll: THE ART OF ASSEMBLY */}
        <TextSection 
          scrollYProgress={scrollYProgress} 
          range={[0.82, 0.90, 0.98]} 
          align="center"
        >
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-white/90 uppercase mb-3 leading-none">
            THE ART<br />OF ASSEMBLY
          </h2>
          <p className="text-lg md:text-2xl font-light text-white/60 tracking-tight max-w-lg mx-auto mt-4">
            Every titanium bolt and carbon monocoque panel<br />returning to form.
          </p>
        </TextSection>

      </div>
    </div>
  );
}
