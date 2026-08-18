import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carSeqDir = path.resolve(__dirname, '../public/car-sequence');
const assetsFramesDir = path.resolve(__dirname, '../src/assets/frames');

let sourceDir = carSeqDir;
if (!fs.existsSync(sourceDir) || fs.readdirSync(sourceDir).length === 0) {
  sourceDir = assetsFramesDir;
}

console.log(`Syncing user frame sequence from ${sourceDir}...`);

const files = fs.readdirSync(sourceDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.webp'));

files.sort((a, b) => {
  const matchA = a.match(/\((\d+)\)/);
  const matchB = b.match(/\((\d+)\)/);
  const numA = matchA ? parseInt(matchA[1], 10) : 0;
  const numB = matchB ? parseInt(matchB[1], 10) : 0;
  return numA - numB;
});

console.log(`Found ${files.length} frame files.`);

async function sync() {
  for (let i = 0; i < files.length; i++) {
    const srcFile = files[i];
    const srcPath = path.join(sourceDir, srcFile);
    const num = i + 1;

    // Standardized names
    const destJpgName = `frame (${num}).jpg`;
    const destWebpName = `car_${String(num).padStart(4, '0')}.webp`;

    const destJpgPath = path.join(carSeqDir, destJpgName);
    const destWebpPath = path.join(carSeqDir, destWebpName);

    // Make sure JPG exists
    if (!fs.existsSync(destJpgPath)) {
      fs.copyFileSync(srcPath, destJpgPath);
    }

    // Convert to WebP for fast loading
    await sharp(srcPath)
      .webp({ quality: 92 })
      .toFile(destWebpPath);
  }

  console.log(`Synced all ${files.length} frames into public/car-sequence!`);
}

sync().catch(console.error);
