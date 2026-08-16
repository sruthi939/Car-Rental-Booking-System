import React, { useEffect, useRef, useState } from 'react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Disc, 
  Activity, 
  Sparkles, 
  RotateCcw, 
  Play, 
  Pause, 
  Layers, 
  ChevronRight,
  Video,
  Monitor
} from 'lucide-react';
import { assets } from '../assets/assets';

const CAR_PRESETS = [
  {
    id: 'gt-cyber',
    name: 'Aero GT Cyber',
    tagline: 'Pure Performance Electric Coupe',
    color: '#3B82F6',
    secondaryColor: '#60A5FA',
    accentColor: '#38BDF8',
    specs: {
      hp: '1,020 HP',
      acceleration: '1.99s (0-60)',
      range: '520 Mi',
      topSpeed: '200+ mph'
    }
  },
  {
    id: 'apex-suv',
    name: 'Apex Nomad SUV',
    tagline: 'All-Terrain Intelligent Luxury',
    color: '#10B981',
    secondaryColor: '#34D399',
    accentColor: '#6EE7B7',
    specs: {
      hp: '850 HP',
      acceleration: '2.8s (0-60)',
      range: '480 Mi',
      topSpeed: '175 mph'
    }
  },
  {
    id: 'phantom-roadster',
    name: 'Phantom EV Roadster',
    tagline: 'Track-Focused Light-Weight Architecture',
    color: '#EC4899',
    secondaryColor: '#F472B6',
    accentColor: '#F43F5E',
    specs: {
      hp: '1,250 HP',
      acceleration: '1.85s (0-60)',
      range: '450 Mi',
      topSpeed: '215 mph'
    }
  }
];

const CAR_PARTS = [
  {
    id: 'aero',
    title: 'Aerodynamic Outer Shell',
    category: 'Aero & Exterior',
    icon: Sparkles,
    range: [0.1, 0.45],
    stat: '0.20 Cd Drag',
    desc: 'Ultra-light carbon fiber composite body shell featuring active aerodynamic flaps and laser matrix headlights.',
    metrics: ['Weight: 185 kg', 'Material: Carbon Monocoque', 'Downforce: 450 kg @ 150mph']
  },
  {
    id: 'cabin',
    title: 'Holographic Smart Cabin',
    category: 'Interior & Tech',
    icon: Cpu,
    range: [0.2, 0.6],
    stat: 'Level 3 Autonomy',
    desc: 'Ergonomic eco-leather seating, panoramic AR glass canopy, and 15.6" curved OLED neural cockpit screen.',
    metrics: ['Display: 8K OLED', 'Audio: 22-Speaker Dolby Atmos', 'AI Core: 500 TOPS']
  },
  {
    id: 'powertrain',
    title: 'Tri-Motor Drive Unit',
    category: 'Powertrain',
    icon: Zap,
    range: [0.35, 0.8],
    stat: '1,020 Total HP',
    desc: 'Independent front and dual-rear electric motors with carbon-sleeved rotors and torque-vectoring differentials.',
    metrics: ['RPM: 20,000 Max', 'Cooling: Direct Liquid Spray', 'Vectoring: Millisecond Milligravity']
  },
  {
    id: 'battery',
    title: '800V High-Density Battery',
    category: 'Energy & Range',
    icon: Activity,
    range: [0.45, 0.9],
    stat: '120 kWh Capacity',
    desc: 'Structural floor-integrated cell-to-pack battery matrix supporting ultra-fast 350 kW DC charging.',
    metrics: ['Charge 10-80%: 12 Mins', 'Voltage: 800V Architecture', 'Thermal Guard: Liquid Gel Phase']
  },
  {
    id: 'chassis',
    title: 'Adaptive Air Suspension & Brakes',
    category: 'Chassis & Dynamics',
    icon: Disc,
    range: [0.55, 1.0],
    stat: '6-Piston Brembo',
    desc: 'Carbon-ceramic brake rotors paired with continuous damping air suspension and forged 21-inch aero wheels.',
    metrics: ['Rotors: 420mm Carbon-Ceramic', 'Travel: 120mm Active Lift', 'Tires: Michelin Pilot Sport EV']
  }
];

export const ExplodedCarShowcase = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualProgress, setManualProgress] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(CAR_PRESETS[0]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [inspectedPart, setInspectedPart] = useState(null);
  const [viewMode, setViewMode] = useState('video'); // 'video' | 'canvas'
  
  const animFrameId = useRef(null);
  const smoothProgress = useRef(0);
  const autoPlayAngle = useRef(0);

  const effectiveProgress = manualProgress !== null ? manualProgress : scrollProgress;

  // Handle Scroll Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;
      
      const currentScroll = -rect.top;
      const rawProgress = Math.min(1, Math.max(0, currentScroll / totalScrollableHeight));
      setScrollProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Video Frame Scrubbing tied to scroll position
  useEffect(() => {
    if (viewMode === 'video' && videoRef.current) {
      const vid = videoRef.current;
      if (vid.duration && !isNaN(vid.duration)) {
        const targetTime = effectiveProgress * vid.duration;
        if (Math.abs(vid.currentTime - targetTime) > 0.02) {
          vid.currentTime = targetTime;
        }
      }
    }
  }, [effectiveProgress, viewMode]);

  // Auto Play scrub animation option
  useEffect(() => {
    let timer;
    if (isPlayingAuto) {
      timer = setInterval(() => {
        setManualProgress(prev => {
          const next = (prev === null ? scrollProgress : prev) + 0.005;
          return next > 1 ? 0 : next;
        });
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto, scrollProgress]);

  // Main Canvas Render Loop (60 FPS smooth interpolation when in canvas mode)
  useEffect(() => {
    if (viewMode !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      smoothProgress.current += (effectiveProgress - smoothProgress.current) * 0.12;
      const progress = smoothProgress.current;
      
      autoPlayAngle.current += 0.002;
      const hoverYaw = Math.sin(autoPlayAngle.current) * 0.05;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 30;
      const carBaseWidth = Math.min(width * 0.55, 520);
      const carBaseHeight = carBaseWidth * 0.42;

      drawCyberGrid(ctx, width, height, progress, selectedPreset.color);
      drawCarShadow(ctx, centerX, centerY + carBaseHeight * 0.45, carBaseWidth * (1 + progress * 0.2), progress, selectedPreset.color);

      const explodeFactor = progress;
      const aeroY = -explodeFactor * 170;
      const cabinY = -explodeFactor * 95;
      const motorY = -explodeFactor * 40;
      const chassisY = 0;
      const batteryY = explodeFactor * 65;
      const wheelX = explodeFactor * 75;
      const wheelY = explodeFactor * 25;

      if (progress > 0.1) {
        drawConnectionLines(ctx, centerX, centerY, { aeroY, cabinY, batteryY, wheelX, selectedPreset });
      }

      if (activeFilter === 'all' || activeFilter === 'chassis') {
        drawWheelSystem(ctx, centerX - carBaseWidth * 0.38 - wheelX, centerY + wheelY, carBaseWidth * 0.16, true, selectedPreset, progress);
        drawWheelSystem(ctx, centerX + carBaseWidth * 0.38 + wheelX, centerY + wheelY, carBaseWidth * 0.16, false, selectedPreset, progress);
      }

      if (activeFilter === 'all' || activeFilter === 'battery') {
        drawBatteryPack(ctx, centerX, centerY + batteryY + 40, carBaseWidth * 0.72, carBaseHeight * 0.3, selectedPreset, progress);
      }

      if (activeFilter === 'all' || activeFilter === 'chassis' || activeFilter === 'powertrain') {
        drawChassisFrame(ctx, centerX, centerY + chassisY, carBaseWidth * 0.78, carBaseHeight * 0.45, selectedPreset, progress);
      }

      if (activeFilter === 'all' || activeFilter === 'powertrain') {
        drawPowertrainUnit(ctx, centerX - carBaseWidth * 0.22, centerY + motorY, carBaseWidth * 0.2, selectedPreset, progress);
        drawPowertrainUnit(ctx, centerX + carBaseWidth * 0.22, centerY + motorY, carBaseWidth * 0.2, selectedPreset, progress);
      }

      if (activeFilter === 'all' || activeFilter === 'cabin') {
        drawInteriorCabin(ctx, centerX, centerY + cabinY - 15, carBaseWidth * 0.65, carBaseHeight * 0.5, selectedPreset, progress);
      }

      if (activeFilter === 'all' || activeFilter === 'aero') {
        drawOuterBodyShell(ctx, centerX, centerY + aeroY - 45, carBaseWidth * 0.82, carBaseHeight * 0.6, selectedPreset, progress, hoverYaw);
      }

      drawHudParticles(ctx, width, height, progress, selectedPreset.color);
      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [effectiveProgress, selectedPreset, activeFilter, viewMode]);

  // Helper Canvas Drawing Functions
  const drawCyberGrid = (ctx, w, h, progress, themeColor) => {
    ctx.save();
    const horizon = h * 0.65;
    ctx.strokeStyle = `${themeColor}22`;
    ctx.lineWidth = 1;

    const gridCols = 16;
    for (let i = -gridCols; i <= gridCols; i++) {
      const x1 = w / 2 + i * 25;
      const x2 = w / 2 + i * 180;
      ctx.beginPath();
      ctx.moveTo(x1, horizon);
      ctx.lineTo(x2, h);
      ctx.stroke();
    }

    const rows = 12;
    for (let i = 0; i < rows; i++) {
      const y = horizon + Math.pow(i / rows, 2) * (h - horizon);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const grad = ctx.createLinearGradient(0, horizon - 80, 0, horizon + 120);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0)');
    grad.addColorStop(0.5, `${themeColor}15`);
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, horizon - 80, w, h - horizon + 80);

    ctx.restore();
  };

  const drawCarShadow = (ctx, x, y, width, progress, themeColor) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, width * 0.5, 30, 0, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(x, y, 5, x, y, width * 0.5);
    grad.addColorStop(0, `${themeColor}40`);
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  };

  const drawConnectionLines = (ctx, cx, cy, { aeroY, cabinY, batteryY, wheelX, selectedPreset }) => {
    ctx.save();
    ctx.strokeStyle = `${selectedPreset.color}55`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(cx, cy + aeroY - 40);
    ctx.lineTo(cx, cy + batteryY + 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 200 - wheelX, cy + 25);
    ctx.lineTo(cx + 200 + wheelX, cy + 25);
    ctx.stroke();

    ctx.restore();
  };

  const drawOuterBodyShell = (ctx, x, y, w, h, preset, progress, yaw) => {
    ctx.save();
    ctx.translate(x, y + Math.sin(yaw * 10) * 3);

    ctx.beginPath();
    ctx.moveTo(-w * 0.48, h * 0.1);
    ctx.quadraticCurveTo(-w * 0.42, -h * 0.15, -w * 0.25, -h * 0.35);
    ctx.quadraticCurveTo(-w * 0.05, -h * 0.65, w * 0.15, -h * 0.55);
    ctx.quadraticCurveTo(w * 0.38, -h * 0.4, w * 0.48, -h * 0.05);
    ctx.quadraticCurveTo(w * 0.45, h * 0.25, w * 0.35, h * 0.25);
    ctx.lineTo(-w * 0.38, h * 0.25);
    ctx.quadraticCurveTo(-w * 0.46, h * 0.25, -w * 0.48, h * 0.1);
    ctx.closePath();

    const grad = ctx.createLinearGradient(-w * 0.5, -h * 0.5, w * 0.5, h * 0.5);
    grad.addColorStop(0, '#1E293B');
    grad.addColorStop(0.35, '#334155');
    grad.addColorStop(0.7, preset.color);
    grad.addColorStop(1, '#0F172A');

    ctx.fillStyle = grad;
    ctx.shadowColor = preset.color;
    ctx.shadowBlur = 15 + progress * 20;
    ctx.fill();

    ctx.strokeStyle = preset.secondaryColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-w * 0.44, -h * 0.05);
    ctx.lineTo(-w * 0.36, -h * 0.08);
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#60A5FA';
    ctx.shadowBlur = 15;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w * 0.36, -h * 0.1);
    ctx.lineTo(w * 0.46, -h * 0.02);
    ctx.strokeStyle = '#F43F5E';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#F43F5E';
    ctx.shadowBlur = 15;
    ctx.stroke();

    if (progress > 0.2) {
      drawLayerTag(ctx, w * 0.2, -h * 0.45, 'CARBON AERO SHELL', preset.color);
    }

    ctx.restore();
  };

  const drawInteriorCabin = (ctx, x, y, w, h, preset, progress) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.moveTo(-w * 0.35, -h * 0.2);
    ctx.quadraticCurveTo(-w * 0.1, -h * 0.55, w * 0.2, -h * 0.45);
    ctx.quadraticCurveTo(w * 0.35, -h * 0.25, w * 0.3, h * 0.1);
    ctx.lineTo(-w * 0.3, h * 0.1);
    ctx.closePath();

    ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
    ctx.fill();
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = preset.accentColor;
    ctx.shadowColor = preset.accentColor;
    ctx.shadowBlur = 10;
    ctx.fillRect(-w * 0.18, -h * 0.2, w * 0.22, 6);

    ctx.fillStyle = '#475569';
    ctx.fillRect(-w * 0.1, -h * 0.1, 28, 40);
    ctx.fillRect(w * 0.04, -h * 0.1, 28, 40);

    if (progress > 0.25) {
      drawLayerTag(ctx, -w * 0.28, -h * 0.35, 'SMART COCKPIT HUD', '#38BDF8');
    }

    ctx.restore();
  };

  const drawPowertrainUnit = (ctx, x, y, size, preset, progress) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
    ctx.strokeStyle = preset.color;
    ctx.lineWidth = 3;
    ctx.shadowColor = preset.color;
    ctx.shadowBlur = 12;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 15;
    ctx.fill();

    ctx.restore();
  };

  const drawChassisFrame = (ctx, x, y, w, h, preset, progress) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.rect(-w * 0.45, -h * 0.3, w * 0.9, h * 0.6);
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-w * 0.45, -h * 0.3);
    ctx.lineTo(w * 0.45, h * 0.3);
    ctx.moveTo(-w * 0.45, h * 0.3);
    ctx.lineTo(w * 0.45, -h * 0.3);
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (progress > 0.4) {
      drawLayerTag(ctx, -w * 0.42, h * 0.35, 'ALUMINUM SPACEFRAME', '#94A3B8');
    }

    ctx.restore();
  };

  const drawBatteryPack = (ctx, x, y, w, h, preset, progress) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.roundRect(-w * 0.45, -h * 0.4, w * 0.9, h * 0.8, 8);
    ctx.fillStyle = '#090D16';
    ctx.fill();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#10B981';
    ctx.shadowBlur = 14;
    ctx.stroke();

    const cols = 8;
    const rows = 3;
    const cellW = (w * 0.8) / cols;
    const cellH = (h * 0.6) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = -w * 0.38 + c * cellW;
        const cy = -h * 0.25 + r * cellH;
        ctx.fillStyle = '#059669';
        ctx.fillRect(cx, cy, cellW - 4, cellH - 4);
      }
    }

    if (progress > 0.45) {
      drawLayerTag(ctx, w * 0.15, h * 0.45, '800V CELL-TO-PACK BATTERY', '#10B981');
    }

    ctx.restore();
  };

  const drawWheelSystem = (ctx, x, y, radius, isLeft, preset, progress) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.7, Math.PI * 0.2, Math.PI * 0.75);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 8;
    ctx.shadowColor = '#EF4444';
    ctx.shadowBlur = 10;
    ctx.stroke();

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    const spokes = 5;
    for (let i = 0; i < spokes; i++) {
      const angle = (i * Math.PI * 2) / spokes + (progress * Math.PI);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * radius * 0.85, Math.sin(angle) * radius * 0.85);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawLayerTag = (ctx, x, y, text, color) => {
    ctx.save();
    ctx.font = 'bold 10px Outfit, sans-serif';
    const textWidth = ctx.measureText(text).width;
    
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - 8, y - 12, textWidth + 16, 20, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F8FAFC';
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillText(text, x, y + 2);
    ctx.restore();
  };

  const drawHudParticles = (ctx, w, h, progress, themeColor) => {
    ctx.save();
    ctx.fillStyle = `${themeColor}44`;
    for (let i = 0; i < 15; i++) {
      const px = (Math.sin(i * 99 + autoPlayAngle.current) * 0.5 + 0.5) * w;
      const py = (Math.cos(i * 33 + autoPlayAngle.current * 1.5) * 0.5 + 0.5) * h;
      ctx.beginPath();
      ctx.arc(px, py, 1.5 + Math.sin(i) * 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  return (
    <div ref={containerRef} className="relative min-h-[320vh] bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 md:p-8">
        
        {/* TOP BAR: Header, Mode Switcher & Presets */}
        <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-800/80 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">{selectedPreset.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  {viewMode === 'video' ? 'SCROLL VIDEO SCRUB' : '3D VECTOR STAGE'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{selectedPreset.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher (Video Scrub vs Canvas Vector) */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'video'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> HD Video
              </button>
              <button
                onClick={() => setViewMode('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'canvas'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> 3D Stage
              </button>
            </div>

            {/* Model Switcher Buttons */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              {CAR_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    selectedPreset.id === preset.id
                      ? 'bg-slate-800 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* CENTER STAGE: Video / Canvas Scrub Viewport */}
        <div className="relative flex-1 w-full flex items-center justify-center my-2 overflow-hidden rounded-3xl border border-slate-800/40 bg-slate-950">
          
          {/* Mode A: Scroll-Driven Video Scrubbing (okey_generate_the_video.mp4) */}
          {viewMode === 'video' && assets.car_video && (
            <video
              ref={videoRef}
              src={assets.car_video}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-90 transition-opacity"
            />
          )}

          {/* Mode B: HTML5 Canvas 2D/3D Vector Engine */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${viewMode === 'canvas' ? 'block' : 'hidden'}`}
          />

          {/* Ambient Lighting Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

          {/* Floating Glassmorphism Spec Cards (Dynamic by Scroll Range) */}
          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pointer-events-none px-4">
            {CAR_PARTS.map((part) => {
              const Icon = part.icon;
              const isVisible = 
                (activeFilter === 'all' || activeFilter === part.id) &&
                effectiveProgress >= part.range[0] && 
                effectiveProgress <= part.range[1];

              return (
                <div
                  key={part.id}
                  onClick={() => setInspectedPart(part)}
                  className={`pointer-events-auto transition-all duration-500 transform ${
                    isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95 pointer-events-none hidden md:block'
                  }`}
                >
                  <div className="group relative bg-slate-900/75 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 hover:border-blue-500/50 p-5 rounded-2xl shadow-2xl transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-xl bg-slate-800/80 group-hover:bg-blue-600/20 group-hover:text-blue-400 text-slate-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {part.stat}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {part.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {part.desc}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{part.category}</span>
                      <span className="flex items-center text-blue-400 group-hover:translate-x-1 transition-transform font-medium">
                        Inspect Specs <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM BAR: Scroll Scrub Bar, Filter Tabs & Auto Play */}
        <footer className="relative z-20 bg-slate-900/70 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          
          {/* Component Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Layers' },
              { id: 'aero', label: 'Aero Shell' },
              { id: 'cabin', label: 'Cockpit HUD' },
              { id: 'powertrain', label: 'Tri-Motor' },
              { id: 'battery', label: '800V Battery' },
              { id: 'chassis', label: 'Chassis & Brakes' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Scrub Slider & Scroll Progress Indicator */}
          <div className="flex items-center gap-4 w-full md:w-80">
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
              title={isPlayingAuto ? "Pause Auto Scrub" : "Play Auto Scrub"}
            >
              {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>SCROLL DISASSEMBLE</span>
                <span className="text-blue-400 font-mono">{Math.round(effectiveProgress * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={effectiveProgress}
                onChange={(e) => {
                  setManualProgress(parseFloat(e.target.value));
                  setIsPlayingAuto(false);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {manualProgress !== null && (
              <button
                onClick={() => setManualProgress(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Sync Back to Scroll"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* INSPECTOR MODAL: Technical Breakdown Drawer */}
      {inspectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-lg w-full shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400">
                  <inspectedPart.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{inspectedPart.title}</h3>
                  <p className="text-xs text-blue-400 font-medium">{inspectedPart.category}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectedPart(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              {inspectedPart.desc}
            </p>

            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Engineering Specs</h4>
              <div className="grid grid-cols-1 gap-2">
                {inspectedPart.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200">
                    <span className="font-mono text-blue-400">#0{idx + 1}</span>
                    <span className="font-medium">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setInspectedPart(null)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplodedCarShowcase;
