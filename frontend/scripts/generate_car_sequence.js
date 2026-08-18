import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_FRAMES = 120;
const OUTPUT_DIR = path.resolve(__dirname, '../public/car-sequence');
const WIDTH = 1920;
const HEIGHT = 1080;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Generating ${TOTAL_FRAMES} luxury supercar sequence frames in ${OUTPUT_DIR}...`);

function generateSVGFrame(index, total) {
  const progress = index / (total - 1); // 0.0 to 1.0
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2 + 40; // Center car slightly below middle

  // Calculate Explosion Factor (0 -> 1 -> 0)
  let exp = 0;
  if (progress <= 0.15) {
    exp = 0; // Assembled
  } else if (progress <= 0.60) {
    exp = (progress - 0.15) / 0.45; // Exploding: 0 to 1
  } else if (progress <= 0.75) {
    exp = 1.0; // Peak explosion
  } else if (progress <= 0.90) {
    exp = 1.0 - (progress - 0.75) / 0.15; // Reassembling: 1 to 0
  } else {
    exp = 0; // Fully reassembled
  }

  // Component separation offsets based on exp factor
  const bodyY = cy - exp * 240;
  const canopyY = cy - exp * 410;
  const doorLeftY = cy - exp * 320;
  const doorRightY = cy - exp * 320;
  const batteryY = cy + exp * 220;
  const motorY = cy + exp * 130;
  const chassisY = cy + exp * 60;
  const wheelLeftFrontX = cx - 480 - exp * 240;
  const wheelRightFrontX = cx + 480 + exp * 240;
  const wheelLeftRearX = cx - 360 - exp * 200;
  const wheelRightRearX = cx + 360 + exp * 200;

  // Dynamic visual parameters
  const rotAngle = (exp * 60).toFixed(1);
  const glowOpacity = (0.2 + exp * 0.8).toFixed(2);
  const floorReflectionOpacity = (0.35 - exp * 0.25).toFixed(2);

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Studio Radial Background -->
      <radialGradient id="studioBg" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#141824" stop-opacity="0.95"/>
        <stop offset="55%" stop-color="#080a10" stop-opacity="1"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
      </radialGradient>

      <!-- Glossy Carbon Fiber Body Gradient -->
      <linearGradient id="carbonBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e2430"/>
        <stop offset="35%" stop-color="#0d111a"/>
        <stop offset="70%" stop-color="#06080d"/>
        <stop offset="100%" stop-color="#1a202c"/>
      </linearGradient>

      <!-- Metallic Rim Highlight -->
      <linearGradient id="rimLight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="#94a3b8" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.1"/>
      </linearGradient>

      <!-- Battery Neon Glow -->
      <linearGradient id="batteryCyan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="50%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#38bdf8"/>
      </linearGradient>

      <!-- Floor Reflection Gradient -->
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" stop-opacity="${floorReflectionOpacity}"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
      </linearGradient>

      <!-- Glow Filter -->
      <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="10" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Pure Dark Studio Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#050505"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#studioBg)"/>

    <!-- Reflective Studio Floor Grid -->
    <ellipse cx="${cx}" cy="${cy + 180}" rx="780" ry="160" fill="url(#floorGrad)"/>
    <g opacity="0.12" stroke="#64748b" stroke-width="1">
      ${Array.from({ length: 7 }).map((_, i) => {
        const y = cy + 120 + i * 25;
        return `<line x1="200" y1="${y}" x2="1720" y2="${y}" stroke-dasharray="8 12"/>`;
      }).join('')}
    </g>

    <!-- Ambient Studio Spotlight Rim Cone -->
    <polygon points="${cx - 400},0 ${cx + 400},0 ${cx + 700},${HEIGHT} ${cx - 700},${HEIGHT}" fill="rgba(255, 255, 255, 0.015)"/>

    <!-- 1. 800V HIGH-DENSITY BATTERY CELL MATRIX (Descends down) -->
    <g transform="translate(0, ${batteryY - cy})">
      <!-- Floor Tray Base -->
      <rect x="${cx - 420}" y="${cy + 90}" width="840" height="95" rx="18" fill="#0b0f19" stroke="#0284c7" stroke-width="2.5" filter="url(#cyanGlow)"/>
      <!-- Individual Cell Modules -->
      ${Array.from({ length: 10 }).map((_, i) => {
        const mx = cx - 390 + i * 78;
        const cellOffset = Math.sin((i + index) * 0.4) * exp * 30;
        return `
          <rect x="${mx}" y="${cy + 105 - cellOffset}" width="66" height="65" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <line x1="${mx + 8}" y1="${cy + 138 - cellOffset}" x2="${mx + 58}" y2="${cy + 138 - cellOffset}" stroke="#38bdf8" stroke-width="2" opacity="${glowOpacity}"/>
          <circle cx="${mx + 33}" cy="${cy + 120 - cellOffset}" r="4" fill="#38bdf8"/>
        `;
      }).join('')}
    </g>

    <!-- 2. HIGH-PERFORMANCE CHASSIS & SUSPENSION -->
    <g transform="translate(0, ${chassisY - cy})">
      <path d="M ${cx - 460} ${cy + 40} L ${cx + 460} ${cy + 40} L ${cx + 420} ${cy + 85} L ${cx - 420} ${cy + 85} Z" 
            fill="#090d16" stroke="#475569" stroke-width="3"/>
      <!-- Double Wishbone Suspension Links -->
      <line x1="${cx - 450}" y1="${cy + 55}" x2="${cx - 520}" y2="${cy + 75}" stroke="#94a3b8" stroke-width="4"/>
      <line x1="${cx + 450}" y1="${cy + 55}" x2="${cx + 520}" y2="${cy + 75}" stroke="#94a3b8" stroke-width="4"/>
    </g>

    <!-- 3. TRI-MOTOR POWERTRAIN UNIT (Rear Center) -->
    <g transform="translate(0, ${motorY - cy})">
      <rect x="${cx - 210}" y="${cy - 40}" width="420" height="110" rx="22" fill="#0f172a" stroke="#38bdf8" stroke-width="3" filter="url(#cyanGlow)"/>
      <circle cx="${cx - 105}" cy="${cy + 15}" r="36" fill="#1e293b" stroke="#ef4444" stroke-width="3"/>
      <circle cx="${cx + 105}" cy="${cy + 15}" r="36" fill="#1e293b" stroke="#ef4444" stroke-width="3"/>
      <!-- Torque Vectoring Axle -->
      <line x1="${cx - 300}" y1="${cy + 15}" x2="${cx + 300}" y2="${cy + 15}" stroke="#cbd5e1" stroke-width="6"/>
    </g>

    <!-- 4. ALLOY WHEELS & CARBON-CERAMIC BRAKES (Explode Outward) -->
    <!-- Front Left Wheel & Red Caliper -->
    <g transform="translate(${wheelLeftFrontX}, ${cy + 30}) rotate(${-rotAngle})">
      <circle cx="0" cy="0" r="115" fill="#090d16" stroke="#ffffff" stroke-width="3.5" filter="url(#cyanGlow)"/>
      <circle cx="0" cy="0" r="88" fill="#1e293b" stroke="#ef4444" stroke-width="4" stroke-dasharray="14 10"/>
      <!-- Brembo Red Caliper -->
      <path d="M -75 -45 A 88 88 0 0 1 -45 -75 L -35 -55 A 65 65 0 0 0 -55 -35 Z" fill="#ef4444"/>
      ${Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return `<line x1="0" y1="0" x2="${Math.cos(a) * 110}" y2="${Math.sin(a) * 110}" stroke="#94a3b8" stroke-width="6"/>`;
      }).join('')}
    </g>
    <!-- Front Right Wheel & Red Caliper -->
    <g transform="translate(${wheelRightFrontX}, ${cy + 30}) rotate(${rotAngle})">
      <circle cx="0" cy="0" r="115" fill="#090d16" stroke="#ffffff" stroke-width="3.5" filter="url(#cyanGlow)"/>
      <circle cx="0" cy="0" r="88" fill="#1e293b" stroke="#ef4444" stroke-width="4" stroke-dasharray="14 10"/>
      <!-- Brembo Red Caliper -->
      <path d="M 45 -75 A 88 88 0 0 1 75 -45 L 55 -35 A 65 65 0 0 0 35 -55 Z" fill="#ef4444"/>
      ${Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return `<line x1="0" y1="0" x2="${Math.cos(a) * 110}" y2="${Math.sin(a) * 110}" stroke="#94a3b8" stroke-width="6"/>`;
      }).join('')}
    </g>

    <!-- 5. VANTORA AERODYNAMIC CARBON MONOCOQUE BODY SHELL (Rises Up) -->
    <g transform="translate(0, ${bodyY - cy})">
      <!-- Main Sculpted Body Path -->
      <path d="M ${cx - 560} ${cy + 25} 
               C ${cx - 420} ${cy - 130}, ${cx - 200} ${cy - 200}, ${cx} ${cy - 200} 
               C ${cx + 200} ${cy - 200}, ${cx + 420} ${cy - 130}, ${cx + 560} ${cy + 25}
               C ${cx + 380} ${cy + 80}, ${cx - 380} ${cy + 80}, ${cx - 560} ${cy + 25} Z" 
            fill="url(#carbonBody)" stroke="url(#rimLight)" stroke-width="3.5"/>
      
      <!-- Hood Vents & Carbon Fenders -->
      <path d="M ${cx - 220} ${cy - 110} L ${cx - 140} ${cy - 150} L ${cx - 80} ${cy - 120}" fill="none" stroke="#38bdf8" stroke-width="2"/>
      <path d="M ${cx + 220} ${cy - 110} L ${cx + 140} ${cy - 150} L ${cx + 80} ${cy - 120}" fill="none" stroke="#38bdf8" stroke-width="2"/>

      <!-- Active Aero Carbon Rear Spoiler Wing -->
      <path d="M ${cx + 400} ${cy - 130 - exp * 60} L ${cx + 580} ${cy - 145 - exp * 70}" stroke="#f8fafc" stroke-width="6"/>

      <!-- Sharp LED Laser Matrix Headlights -->
      <polygon points="${cx - 510},${cy - 10} ${cx - 460},${cy - 30} ${cx - 440},${cy - 5}" fill="#ffffff" filter="url(#cyanGlow)"/>
      <polygon points="${cx + 510},${cy - 10} ${cx + 460},${cy - 30} ${cx + 440},${cy - 5}" fill="#ffffff" filter="url(#cyanGlow)"/>
      <line x1="${cx - 510}" y1="${cy - 10}" x2="${cx - 440}" y2="${cy - 5}" stroke="#38bdf8" stroke-width="3"/>
      <line x1="${cx + 510}" y1="${cy - 10}" x2="${cx + 440}" y2="${cy - 5}" stroke="#38bdf8" stroke-width="3"/>
    </g>

    <!-- 6. GULLWING DOORS (Separate Diagonally) -->
    <g transform="translate(${-exp * 120}, ${doorLeftY - cy})">
      <path d="M ${cx - 320} ${cy - 100} Q ${cx - 180} ${cy - 170} ${cx - 100} ${cy - 160} L ${cx - 220} ${cy - 60} Z" 
            fill="#0d111a" stroke="#cbd5e1" stroke-width="2"/>
    </g>
    <g transform="translate(${exp * 120}, ${doorRightY - cy})">
      <path d="M ${cx + 320} ${cy - 100} Q ${cx + 180} ${cy - 170} ${cx + 100} ${cy - 160} L ${cx + 220} ${cy - 60} Z" 
            fill="#0d111a" stroke="#cbd5e1" stroke-width="2"/>
    </g>

    <!-- 7. PANORAMIC GLASS CANOPY & COCKPIT (Highest Top Layer) -->
    <g transform="translate(0, ${canopyY - cy})">
      <path d="M ${cx - 300} ${cy - 100} 
               Q ${cx} ${cy - 240} ${cx + 300} ${cy - 100} 
               Z" 
            fill="rgba(255, 255, 255, 0.08)" stroke="#ffffff" stroke-width="2.5" opacity="0.9"/>
      <!-- Steering Yoke & Curved HUD Screen Silhouette -->
      <rect x="${cx - 120}" y="${cy - 140}" width="240" height="35" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" opacity="${glowOpacity}"/>
    </g>

    <!-- 8. TECHNICAL EXPLOSION GUIDELINES & SPECIFICATION LABELS -->
    ${exp > 0.25 ? `
    <g opacity="${(exp * 0.9).toFixed(2)}">
      <!-- Monocoque Shell Leader Line -->
      <line x1="${cx - 440}" y1="${bodyY - 70}" x2="${cx - 660}" y2="${bodyY - 140}" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="${cx - 660}" cy="${bodyY - 140}" r="3" fill="#ffffff"/>
      
      <!-- Powertrain Leader Line -->
      <line x1="${cx + 140}" y1="${motorY}" x2="${cx + 620}" y2="${motorY - 50}" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="${cx + 620}" cy="${motorY - 50}" r="3" fill="#ffffff"/>

      <!-- Battery Array Leader Line -->
      <line x1="${cx - 240}" y1="${batteryY + 110}" x2="${cx - 580}" y2="${batteryY + 170}" stroke="rgba(56,189,248,0.6)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="${cx - 580}" cy="${batteryY + 170}" r="3" fill="#38bdf8"/>
    </g>
    ` : ''}

  </svg>`;
}

async function run() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const filename = `car_${String(i + 1).padStart(4, '0')}.webp`;
    const filePath = path.join(OUTPUT_DIR, filename);
    const svgContent = generateSVGFrame(i, TOTAL_FRAMES);

    await sharp(Buffer.from(svgContent))
      .webp({ quality: 90 })
      .toFile(filePath);

    if ((i + 1) % 20 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Generated ${i + 1}/${TOTAL_FRAMES} supercar sequence frames...`);
    }
  }
  console.log('All 120 VANTORA sequence frames successfully generated!');
}

run().catch(console.error);
