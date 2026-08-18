import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../src/assets/frames');
const outputDir = path.resolve(__dirname, '../public/car-sequence');

if (!fs.existsSync(inputDir)) {
  console.error(`Input directory not found: ${inputDir}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all frame files
const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp'));

console.log(`Found ${files.length} user frame files in ${inputDir}`);

// Sort files numerically by number inside parentheses: frame (1).jpg, frame (2).jpg ... frame (50).jpg
files.sort((a, b) => {
  const matchA = a.match(/\((\d+)\)/);
  const matchB = b.match(/\((\d+)\)/);
  const numA = matchA ? parseInt(matchA[1], 10) : 0;
  const numB = matchB ? parseInt(matchB[1], 10) : 0;
  return numA - numB;
});

// Clear old files in output directory
const oldFiles = fs.readdirSync(outputDir);
for (const file of oldFiles) {
  if (file.startsWith('car_')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

async function processFrames() {
  console.log(`Processing ${files.length} frames into ${outputDir}...`);

  for (let i = 0; i < files.length; i++) {
    const srcFile = files[i];
    const srcPath = path.join(inputDir, srcFile);
    const destFileName = `car_${String(i + 1).padStart(4, '0')}.webp`;
    const destPath = path.join(outputDir, destFileName);

    // Convert frame image to high quality WebP
    await sharp(srcPath)
      .webp({ quality: 92 })
      .toFile(destPath);
  }

  console.log(`Successfully processed all ${files.length} user frames into WebP sequence!`);
}

processFrames().catch(console.error);
