import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const videoPath = path.resolve(__dirname, '../public/Cinematic_D_animation_transit.mp4');
const outputDir = path.resolve(__dirname, '../public/car-sequence');

if (!fs.existsSync(videoPath)) {
  console.error(`Video file not found at ${videoPath}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Extracting 120 video frames from ${videoPath} to ${outputDir}...`);

// Clear existing car_*.webp files
const files = fs.readdirSync(outputDir);
for (const file of files) {
  if (file.startsWith('car_') && (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg'))) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

// Extract 120 frames using ffmpeg directly
ffmpeg(videoPath)
  .outputOptions([
    '-vf fps=15',
    '-vframes 120',
    '-quality 90'
  ])
  .output(path.join(outputDir, 'car_%04d.webp'))
  .on('end', () => {
    console.log('Video frame extraction completed!');
    const extractedFiles = fs.readdirSync(outputDir).filter(f => f.startsWith('car_') && f.endsWith('.webp')).sort();
    console.log(`Total extracted frames: ${extractedFiles.length}`);

    // If fewer than 120 frames extracted, pad by copying the last frame
    if (extractedFiles.length > 0 && extractedFiles.length < 120) {
      console.log(`Padding frames to reach 120...`);
      const lastFile = extractedFiles[extractedFiles.length - 1];
      const lastFilePath = path.join(outputDir, lastFile);

      for (let i = extractedFiles.length + 1; i <= 120; i++) {
        const newName = `car_${String(i).padStart(4, '0')}.webp`;
        fs.copyFileSync(lastFilePath, path.join(outputDir, newName));
      }
    }
    console.log('All 120 video sequence frames successfully extracted & padded!');
  })
  .on('error', (err) => {
    console.error('FFmpeg extraction error:', err);
  })
  .run();
