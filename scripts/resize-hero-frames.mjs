import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const framesDir = path.resolve('public/assets/frames');
const targetWidth = 1152;  // 1280 * 0.9 = 1152 (10% resolution reduction)
const targetHeight = 648;  // 720 * 0.9 = 648

async function resizeFrames() {
  console.log(`Starting frame resize to ${targetWidth}x${targetHeight}...`);
  const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp'));
  console.log(`Found ${files.length} frames.`);

  let totalBefore = 0;
  let totalAfter = 0;
  const startTime = Date.now();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(framesDir, file);
    const inputBuffer = fs.readFileSync(filePath);
    const beforeSize = inputBuffer.length;
    totalBefore += beforeSize;

    const resizedBuffer = await sharp(inputBuffer)
      .resize(targetWidth, targetHeight, {
        fit: 'fill',
        kernel: sharp.kernel.lanczos3
      })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();

    fs.writeFileSync(filePath, resizedBuffer);
    totalAfter += resizedBuffer.length;

    if ((i + 1) % 40 === 0 || i === files.length - 1) {
      console.log(`Processed ${i + 1}/${files.length} frames (${Math.round((i + 1) / files.length * 100)}%)`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Done in ${duration}s!`);
  console.log(`Original size: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Resized size: ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Savings: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
}

resizeFrames().catch(err => {
  console.error('Resize failed:', err);
  process.exit(1);
});
