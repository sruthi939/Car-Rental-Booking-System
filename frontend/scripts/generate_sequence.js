import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_FRAMES = 90;
const OUTPUT_DIR = path.resolve(__dirname, '../public/sequence');
const WIDTH = 1920;
const HEIGHT = 1080;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Generating ${TOTAL_FRAMES} sequence frames in ${OUTPUT_DIR}...`);

function generateSVGFrame(index, total) {
  const p = index / (total - 1); // 0.0 to 1.0
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;

  // Separation offsets based on progress
  const bodyY = cy - p * 220;
  const canopyY = cy - p * 380;
  const batteryY = cy + p * 200;
  const motorY = cy + p * 110;
  const wheelLeftX = cx - 450 - p * 260;
  const wheelRightX = cx + 450 + p * 260;
  
  // Opacity & glow dynamics
  const laserOpacity = Math.sin(p * Math.PI).toFixed(2);
  const coreGlow = (0.3 + p * 0.7).toFixed(2);
  const rotAngle = (p * 45).toFixed(1);

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Radial Gradient -->
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0b1329" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#050505" stop-opacity="1"/>
      </radialGradient>

      <!-- Blue Core Glow -->
      <radialGradient id="coreGlowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="${coreGlow}"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
      </radialGradient>

      <!-- Battery Module Glow -->
      <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0284c7"/>
        <stop offset="50%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>

      <!-- Glowing Filter -->
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Deep Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#050505"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>

    <!-- Ambient Grid Lines -->
    <g opacity="0.15" stroke="#38bdf8" stroke-width="1">
      ${Array.from({ length: 9 }).map((_, i) => {
        const y = 100 + i * 110;
        return `<line x1="100" y1="${y}" x2="1820" y2="${y}" stroke-dasharray="4 8"/>`;
      }).join('')}
    </g>

    <!-- Central Core Energy Glow -->
    <circle cx="${cx}" cy="${cy}" r="${180 + p * 120}" fill="url(#coreGlowGrad)"/>

    <!-- 1. BATTERY MATRIX LAYER (Descends) -->
    <g transform="translate(0, ${batteryY - cy})" filter="url(#neonGlow)">
      <!-- Floor Pack Base -->
      <rect x="${cx - 360}" y="${cy + 80}" width="720" height="90" rx="16" fill="#090d16" stroke="#0284c7" stroke-width="2.5"/>
      <!-- Individual Battery Modules -->
      ${Array.from({ length: 8 }).map((_, i) => {
        const mx = cx - 330 + i * 82;
        const offset = Math.sin((i + index) * 0.5) * p * 25;
        return `
          <rect x="${mx}" y="${cy + 95 - offset}" width="70" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <line x1="${mx + 10}" y1="${cy + 125 - offset}" x2="${mx + 60}" y2="${cy + 125 - offset}" stroke="#38bdf8" stroke-width="2"/>
        `;
      }).join('')}
    </g>

    <!-- 2. TRI-MOTOR POWERTRAIN (Center-Rear) -->
    <g transform="translate(0, ${motorY - cy})">
      <!-- Main Motor Housing -->
      <rect x="${cx - 180}" y="${cy - 50}" width="360" height="100" rx="20" fill="#0f172a" stroke="#60a5fa" stroke-width="3" filter="url(#neonGlow)"/>
      <circle cx="${cx - 90}" cy="${cy}" r="32" fill="#1e293b" stroke="#f97316" stroke-width="3"/>
      <circle cx="${cx + 90}" cy="${cy}" r="32" fill="#1e293b" stroke="#f97316" stroke-width="3"/>
      <!-- High Voltage Cable Connectors -->
      <path d="M ${cx - 90} ${cy} Q ${cx} ${cy - 80} ${cx + 90} ${cy}" fill="none" stroke="#f97316" stroke-width="4" stroke-dasharray="6 4"/>
    </g>

    <!-- 3. FORGED WHEELS & BRAKE ROTORS (Move Outward) -->
    <!-- Left Wheel -->
    <g transform="translate(${wheelLeftX}, ${cy}) rotate(${-rotAngle})">
      <circle cx="0" cy="0" r="110" fill="#090d16" stroke="#38bdf8" stroke-width="4" filter="url(#neonGlow)"/>
      <circle cx="0" cy="0" r="85" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="12 8"/>
      ${Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return `<line x1="0" y1="0" x2="${Math.cos(a) * 105}" y2="${Math.sin(a) * 105}" stroke="#94a3b8" stroke-width="5"/>`;
      }).join('')}
    </g>
    <!-- Right Wheel -->
    <g transform="translate(${wheelRightX}, ${cy}) rotate(${rotAngle})">
      <circle cx="0" cy="0" r="110" fill="#090d16" stroke="#38bdf8" stroke-width="4" filter="url(#neonGlow)"/>
      <circle cx="0" cy="0" r="85" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="12 8"/>
      ${Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return `<line x1="0" y1="0" x2="${Math.cos(a) * 105}" y2="${Math.sin(a) * 105}" stroke="#94a3b8" stroke-width="5"/>`;
      }).join('')}
    </g>

    <!-- 4. AERODYNAMIC CAR BODY SHELL (Rises Up) -->
    <g transform="translate(0, ${bodyY - cy})" filter="url(#neonGlow)">
      <!-- Outer Slick Monocoque Body Path -->
      <path d="M ${cx - 520} ${cy + 20} 
               C ${cx - 380} ${cy - 120}, ${cx - 180} ${cy - 180}, ${cx} ${cy - 180} 
               C ${cx + 180} ${cy - 180}, ${cx + 380} ${cy - 120}, ${cx + 520} ${cy + 20}
               C ${cx + 360} ${cy + 70}, ${cx - 360} ${cy + 70}, ${cx - 520} ${cy + 20} Z" 
            fill="none" stroke="#38bdf8" stroke-width="4"/>
      
      <!-- Active Aero Rear Wing -->
      <path d="M ${cx + 380} ${cy - 120 - p * 50} L ${cx + 540} ${cy - 130 - p * 60}" stroke="#60a5fa" stroke-width="5"/>

      <!-- Matrix LED Headlight Beams -->
      <polygon points="${cx - 480},${cy - 20} ${cx - 440},${cy - 35} ${cx - 430},${cy - 15}" fill="#38bdf8"/>
      <polygon points="${cx + 480},${cy - 20} ${cx + 440},${cy - 35} ${cx + 430},${cy - 15}" fill="#38bdf8"/>
    </g>

    <!-- 5. HOLOGRAPHIC CANOPY & GLASS (Top Layer) -->
    <g transform="translate(0, ${canopyY - cy})">
      <path d="M ${cx - 280} ${cy - 90} 
               Q ${cx} ${cy - 220} ${cx + 280} ${cy - 90} 
               Z" 
            fill="rgba(56, 189, 248, 0.12)" stroke="#93c5fd" stroke-width="2" stroke-dasharray="6 3"/>
      <!-- AR Canopy HUD Reticle -->
      <circle cx="${cx}" cy="${cy - 130}" r="24" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
      <line x1="${cx - 35}" y1="${cy - 130}" x2="${cx + 35}" y2="${cy - 130}" stroke="#38bdf8" stroke-width="1.5"/>
    </g>

    <!-- 6. HUD TECH LEADER LINES & SPECS (Visible during explosion) -->
    ${p > 0.15 ? `
    <g opacity="${laserOpacity}">
      <!-- Aero Tag -->
      <line x1="${cx - 420}" y1="${bodyY - 60}" x2="${cx - 620}" y2="${bodyY - 120}" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="${cx - 620}" cy="${bodyY - 120}" r="4" fill="#38bdf8"/>
      <text x="${cx - 635}" y="${bodyY - 130}" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="end">0.20 Cd Aero Monocoque</text>

      <!-- Powertrain Tag -->
      <line x1="${cx + 120}" y1="${motorY}" x2="${cx + 560}" y2="${motorY - 40}" stroke="#f97316" stroke-width="1.5"/>
      <circle cx="${cx + 560}" cy="${motorY - 40}" r="4" fill="#f97316"/>
      <text x="${cx + 575}" y="${motorY - 45}" fill="#f97316" font-family="sans-serif" font-size="14" font-weight="600">1,020 HP Tri-Motor Drive</text>

      <!-- Battery Tag -->
      <line x1="${cx - 200}" y1="${batteryY + 110}" x2="${cx - 520}" y2="${batteryY + 160}" stroke="#0284c7" stroke-width="1.5"/>
      <circle cx="${cx - 520}" cy="${batteryY + 160}" r="4" fill="#0284c7"/>
      <text x="${cx - 535}" y="${batteryY + 165}" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="end">800V Cell-To-Pack 120 kWh</text>
    </g>
    ` : ''}

    <!-- Frame Indicator & Watermark -->
    <text x="40" y="50" fill="rgba(255,255,255,0.3)" font-family="monospace" font-size="16">FRAME: ${String(index + 1).padStart(4, '0')} / ${TOTAL_FRAMES}</text>
    <text x="${WIDTH - 40}" y="50" fill="rgba(255,255,255,0.3)" font-family="sans-serif" font-size="14" text-anchor="end">APEX KINETIC • EXPLODED VIEW SEQUENCE</text>
  </svg>`;
}

async function run() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const filename = `frame_${String(i + 1).padStart(4, '0')}.webp`;
    const filePath = path.join(OUTPUT_DIR, filename);
    const svgContent = generateSVGFrame(i, TOTAL_FRAMES);

    await sharp(Buffer.from(svgContent))
      .webp({ quality: 85 })
      .toFile(filePath);

    if ((i + 1) % 15 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Generated ${i + 1}/${TOTAL_FRAMES} frames...`);
    }
  }
  console.log('All 90 sequence frames successfully generated!');
}

run().catch(console.error);
