import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const imageSets = [
  { input: 'src/assets/me-cutout.png',          output: 'src/assets/me-cutout.webp',          quality: 90 },
  { input: 'src/assets/me2.png',                output: 'src/assets/me2.webp',                quality: 85 },
  { input: 'src/assets/projects/Cookie.png',    output: 'src/assets/projects/Cookie.webp',    quality: 82 },
  { input: 'src/assets/projects/QuoteFlow.png', output: 'src/assets/projects/QuoteFlow.webp', quality: 82 },
  { input: 'src/assets/projects/Luxe.png',      output: 'src/assets/projects/Luxe.webp',      quality: 82 },
  { input: 'src/assets/projects/GirlsCode.png', output: 'src/assets/projects/GirlsCode.webp', quality: 82 },
  { input: 'src/assets/projects/Sabat.png',     output: 'src/assets/projects/Sabat.webp',     quality: 82 },
];

async function convert() {
  console.log('Converting images to WebP...\n');

  for (const item of imageSets) {
    if (!existsSync(item.input)) {
      console.warn(`  SKIP (not found): ${item.input}`);
      continue;
    }

    const metadata = await sharp(item.input).metadata();
    const inputSize = (await import('fs')).statSync(item.input).size;

    await sharp(item.input)
      .webp({ quality: item.quality, effort: 6 })
      .toFile(item.output);

    const outputSize = (await import('fs')).statSync(item.output).size;
    const saved = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);
    console.log(`  ✓ ${path.basename(item.input)} → ${path.basename(item.output)}`);
    console.log(`    ${(inputSize / 1024).toFixed(0)} KB → ${(outputSize / 1024).toFixed(0)} KB  (saved ${saved}%)`);
  }

  console.log('\nDone!');
}

convert().catch(console.error);
