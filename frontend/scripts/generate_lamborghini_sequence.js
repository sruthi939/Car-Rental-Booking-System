import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_FRAMES = 120;
const OUTPUT_DIR = path.resolve(__dirname, '../public/lamborghini-sequence');
const WIDTH = 1920;
const HEIGHT = 1080;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Generating ${TOTAL_FRAMES} Lamborghini Aventador SVJ sequence frames in ${OUTPUT_DIR}...`);

function generateSVGFrame(index, total) {
  const progress = index / (total - 1); // 0.0 to 1.0
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2 - 20;

  // Calculate Explosion Factor (0 -> 1 -> 0)
  let exp = 0;
  if (progress <= 0.15) {
    exp = 0;
  } else if (progress <= 0.60) {
    exp = (progress - 0.15) / 0.45;
  } else if (progress <= 0.75) {
    exp = 1.0;
  } else if (progress <= 0.90) {
    exp = 1.0 - (progress - 0.75) / 0.15;
  } else {
    exp = 0;
  }

  // Component separation offsets based on exp factor (Exploded perspective matching reference image)
  const monocoqueY = cy - exp * 80;
  const v12EngineY = cy - exp * 200;
  const v12EngineX = cx - exp * 40;
  const canopyY = cy - exp * 350;
  const intakeY = cy - exp * 280;
  const radiatorLeftY = cy + exp * 120;
  const radiatorLeftX = cx - 380 - exp * 180;
  const radiatorRightY = cy + exp * 140;
  const radiatorRightX = cx + 360 + exp * 160;
  const steeringRackY = cy + exp * 180;
  const wheelLeftX = cx - 440 - exp * 280;
  const wheelRightX = cx + 440 + exp * 280;
  const wingY = cy - exp * 420;

  // Visual opacity & glow parameters
  const laserOpacity = (0.2 + exp * 0.8).toFixed(2);
  const rotAngle = (exp * 55).toFixed(1);

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Pure Dark Background Radial Highlight -->
      <radialGradient id="pureDarkBg" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#12141c" stop-opacity="0.85"/>
        <stop offset="50%" stop-color="#080808" stop-opacity="0.98"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
      </radialGradient>

      <!-- Glossy Carbon Fiber Monocoque Body -->
      <linearGradient id="svjCarbon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2a2e3d"/>
        <stop offset="40%" stop-color="#11131a"/>
        <stop offset="80%" stop-color="#050608"/>
        <stop offset="100%" stop-color="#1c202b"/>
      </linearGradient>

      <!-- Lamborghini Yellow Caliper Gold -->
      <linearGradient id="lamboYellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="35%" stop-color="#eab308"/>
        <stop offset="100%" stop-color="#ca8a04"/>
      </linearGradient>

      <!-- V12 Engine Metallic Cylinder Block -->
      <linearGradient id="v12Metallic" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="50%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>

      <!-- Glowing Filter -->
      <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Pure Black Background (#000000) -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#000000"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#pureDarkBg)"/>

    <!-- 1. STEERING RACK & LOWER TIE RODS (Descends) -->
    <g transform="translate(0, ${steeringRackY - cy})">
      <rect x="${cx - 240}" y="${cy + 160}" width="480" height="24" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
      <!-- Steering Box & Pinion Shaft -->
      <rect x="${cx - 60}" y="${cy + 148}" width="120" height="48" rx="8" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
      <line x1="${cx - 420}" y1="${cy + 172}" x2="${cx + 420}" y2="${cy + 172}" stroke="#cbd5e1" stroke-width="5"/>
    </g>

    <!-- 2. TWIN SIDE RADIATORS & COOLING MATRIX -->
    <!-- Left Radiator -->
    <g transform="translate(${radiatorLeftX - (cx - 380)}, ${radiatorLeftY - cy})">
      <rect x="${cx - 440}" y="${cy + 70}" width="130" height="85" rx="10" fill="#090d16" stroke="#94a3b8" stroke-width="2.5"/>
      ${Array.from({ length: 6 }).map((_, i) => `
        <line x1="${cx - 430}" y1="${cy + 82 + i * 11}" x2="${cx - 320}" y2="${cy + 82 + i * 11}" stroke="#475569" stroke-width="2"/>
      `).join('')}
    </g>
    <!-- Right Radiator -->
    <g transform="translate(${radiatorRightX - (cx + 360)}, ${radiatorRightY - cy})">
      <rect x="${cx + 310}" y="${cy + 70}" width="130" height="85" rx="10" fill="#090d16" stroke="#94a3b8" stroke-width="2.5"/>
      ${Array.from({ length: 6 }).map((_, i) => `
        <line x1="${cx + 320}" y1="${cy + 82 + i * 11}" x2="${cx + 430}" y2="${cy + 82 + i * 11}" stroke="#475569" stroke-width="2"/>
      `).join('')}
    </g>

    <!-- 3. CARBON FIBER MONOCOQUE CHASSIS CELL -->
    <g transform="translate(0, ${monocoqueY - cy})">
      <!-- Passenger Safety Tub Outer Contour -->
      <path d="M ${cx - 420} ${cy + 60} 
               L ${cx - 360} ${cy - 120} 
               Q ${cx} ${cy - 180} ${cx + 360} ${cy - 120} 
               L ${cx + 420} ${cy + 60} 
               L ${cx + 340} ${cy + 100} 
               L ${cx - 340} ${cy + 100} Z" 
            fill="url(#svjCarbon)" stroke="#94a3b8" stroke-width="3"/>
      
      <!-- Carbon Door Sill Openings -->
      <path d="M ${cx - 320} ${cy + 40} L ${cx - 260} ${cy - 90} Q ${cx - 100} ${cy - 140} ${cx} ${cy - 140} L ${cx - 80} ${cy + 40} Z" 
            fill="#050608" stroke="#475569" stroke-width="2"/>
      <path d="M ${cx + 320} ${cy + 40} L ${cx + 260} ${cy - 90} Q ${cx + 100} ${cy - 140} ${cx} ${cy - 140} L ${cx + 80} ${cy + 40} Z" 
            fill="#050608" stroke="#475569" stroke-width="2"/>
    </g>

    <!-- 4. NATURALLY ASPIRATED 6.5L V12 ENGINE CORE (Rises Up & Separates) -->
    <g transform="translate(${v12EngineX - cx}, ${v12EngineY - cy})">
      <!-- V12 Cylinder Bank Left -->
      <polygon points="${cx - 160},${cy - 130} ${cx - 40},${cy - 190} ${cx - 20},${cy - 80} ${cx - 140},${cy - 30}" fill="url(#v12Metallic)" stroke="#cbd5e1" stroke-width="3"/>
      <!-- V12 Cylinder Bank Right -->
      <polygon points="${cx + 160},${cy - 130} ${cx + 40},${cy - 190} ${cx + 20},${cy - 80} ${cx + 140},${cy - 30}" fill="url(#v12Metallic)" stroke="#cbd5e1" stroke-width="3"/>
      
      <!-- Dual Carbon Intake Manifolds -->
      <rect x="${cx - 130}" y="${cy - 210}" width="100" height="35" rx="8" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
      <rect x="${cx + 30}" y="${cy - 210}" width="100" height="35" rx="8" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
      <text x="${cx}" y="${cy - 120}" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="700" text-anchor="middle">V12 6.5L</text>
    </g>

    <!-- 5. FORGED WHEELS & LAMBORGHINI YELLOW BREMBO CALIPERS -->
    <!-- Front Left Wheel & Yellow Caliper -->
    <g transform="translate(${wheelLeftX}, ${cy + 40}) rotate(${-rotAngle})">
      <circle cx="0" cy="0" r="115" fill="#050608" stroke="#ffffff" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="88" fill="#1e293b" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="16 8"/>
      <!-- Iconic Yellow SVJ Caliper -->
      <path d="M -78 -46 A 90 90 0 0 1 -46 -78 L -36 -58 A 66 66 0 0 0 -58 -36 Z" fill="url(#lamboYellow)" filter="url(#yellowGlow)"/>
      <text x="-58" y="-52" fill="#000000" font-family="sans-serif" font-size="9" font-weight="900">LAMBORGHINI</text>
      ${Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return `<line x1="0" y1="0" x2="${Math.cos(a) * 110}" y2="${Math.sin(a) * 110}" stroke="#64748b" stroke-width="6"/>`;
      }).join('')}
    </g>
    <!-- Front Right Wheel & Yellow Caliper -->
    <g transform="translate(${wheelRightX}, ${cy + 40}) rotate(${rotAngle})">
      <circle cx="0" cy="0" r="115" fill="#050608" stroke="#ffffff" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="88" fill="#1e293b" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="16 8"/>
      <!-- Iconic Yellow SVJ Caliper -->
      <path d="M 46 -78 A 90 90 0 0 1 78 -46 L 58 -36 A 66 66 0 0 0 36 -58 Z" fill="url(#lamboYellow)" filter="url(#yellowGlow)"/>
      <text x="36" y="-52" fill="#000000" font-family="sans-serif" font-size="9" font-weight="900">LAMBORGHINI</text>
      ${Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return `<line x1="0" y1="0" x2="${Math.cos(a) * 110}" y2="${Math.sin(a) * 110}" stroke="#64748b" stroke-width="6"/>`;
      }).join('')}
    </g>

    <!-- 6. AERODINAMICA LAMBORGHINI ATTIVA (ALA) CARBON WING (Top Layer) -->
    <g transform="translate(0, ${wingY - cy})">
      <path d="M ${cx - 460} ${cy - 180} L ${cx + 460} ${cy - 180} L ${cx + 520} ${cy - 200} L ${cx - 520} ${cy - 200} Z" 
            fill="url(#svjCarbon)" stroke="#ffffff" stroke-width="3"/>
      <!-- ALA Active Aero Air Channels -->
      <line x1="${cx - 180}" y1="${cy - 190}" x2="${cx - 60}" y2="${cy - 190}" stroke="#eab308" stroke-width="3" filter="url(#yellowGlow)"/>
      <line x1="${cx + 60}" y1="${cy - 190}" x2="${cx + 180}" y2="${cy - 190}" stroke="#eab308" stroke-width="3" filter="url(#yellowGlow)"/>
    </g>

    <!-- 7. CANOPY & GLASS CANOPY (Rises Above) -->
    <g transform="translate(0, ${canopyY - cy})">
      <path d="M ${cx - 290} ${cy - 90} Q ${cx} ${cy - 230} ${cx + 290} ${cy - 90} Z" 
            fill="rgba(255, 255, 255, 0.06)" stroke="#cbd5e1" stroke-width="2.5"/>
    </g>

    <!-- 8. TECHNICAL METRIC TAGS (Visible during explosion phase) -->
    ${exp > 0.25 ? `
    <g opacity="${laserOpacity}">
      <!-- V12 Engine Tag -->
      <line x1="${cx - 40}" y1="${v12EngineY - 140}" x2="${cx - 320}" y2="${v12EngineY - 220}" stroke="#eab308" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="${cx - 320}" cy="${v12EngineY - 220}" r="4" fill="#eab308"/>
      <text x="${cx - 335}" y="${v12EngineY - 225}" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="end">770 HP 6.5L V12 Core</text>

      <!-- ALA Aero Tag -->
      <line x1="${cx + 360}" y1="${wingY - 190}" x2="${cx + 600}" y2="${wingY - 250}" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="${cx + 600}" cy="${wingY - 250}" r="4" fill="#ffffff"/>
      <text x="${cx + 615}" y="${wingY - 255}" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600">Aerodinamica ALA 2.0</text>
    </g>
    ` : ''}

  </svg>`;
}

async function run() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const filename = `lamborghini_${String(i + 1).padStart(4, '0')}.webp`;
    const filePath = path.join(OUTPUT_DIR, filename);
    const svgContent = generateSVGFrame(i, TOTAL_FRAMES);

    await sharp(Buffer.from(svgContent))
      .webp({ quality: 90 })
      .toFile(filePath);

    if ((i + 1) % 20 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Generated ${i + 1}/${TOTAL_FRAMES} Lamborghini Aventador SVJ frames...`);
    }
  }
  console.log('All 120 Lamborghini Aventador SVJ sequence frames successfully generated!');
}

run().catch(console.error);
