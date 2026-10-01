import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('public/assets/projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const WIDTH = 1280;
const HEIGHT = 720;

const projects = [
  {
    name: 'visionlink',
    title: 'VISIONLINK // REAL-TIME AI STREAMING',
    iconSvg: `
      <!-- Face mesh & video node -->
      <polygon points="640,240 760,310 760,450 640,520 520,450 520,310" fill="none" stroke="#F0E9DD" stroke-width="6" stroke-linejoin="round" />
      <polygon points="640,280 720,330 720,430 640,480 560,430 560,330" fill="none" stroke="#E5484D" stroke-width="4" stroke-linejoin="round" />
      <circle cx="640" cy="380" r="32" fill="#E5484D" opacity="0.9" />
      <line x1="640" y1="240" x2="640" y2="520" stroke="#F0E9DD" stroke-width="2" stroke-dasharray="6 6" />
      <line x1="520" y1="380" x2="760" y2="380" stroke="#F0E9DD" stroke-width="2" stroke-dasharray="6 6" />
      <circle cx="600" cy="350" r="8" fill="#F0E9DD" />
      <circle cx="680" cy="350" r="8" fill="#F0E9DD" />
    `
  },
  {
    name: 'calorupee',
    title: 'CALORUPEE // MULTI-MODAL CV &amp; COST ENGINE',
    iconSvg: `
      <!-- Plate and Rupee symbol -->
      <ellipse cx="640" cy="380" rx="150" ry="85" fill="none" stroke="#F0E9DD" stroke-width="6" />
      <ellipse cx="640" cy="380" rx="105" ry="58" fill="none" stroke="#F0E9DD" stroke-width="3" stroke-dasharray="8 6" />
      <!-- Rupee symbol in accent -->
      <path d="M 610,340 L 670,340 M 610,358 L 665,358 M 628,340 L 628,420 M 628,358 C 655,358 655,390 628,395 L 665,430" fill="none" stroke="#E5484D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
    `
  },
  {
    name: 'nutrisync',
    title: 'NUTRISYNC // RL OPTIMIZATION &amp; GYM ENV',
    iconSvg: `
      <!-- RL Decision Tree -->
      <circle cx="640" cy="270" r="28" fill="#E5484D" />
      <circle cx="540" cy="410" r="22" fill="none" stroke="#F0E9DD" stroke-width="5" />
      <circle cx="740" cy="410" r="22" fill="none" stroke="#F0E9DD" stroke-width="5" />
      <circle cx="480" cy="490" r="16" fill="#F0E9DD" />
      <circle cx="600" cy="490" r="16" fill="#F0E9DD" />
      <circle cx="680" cy="490" r="16" fill="#F0E9DD" />
      <circle cx="800" cy="490" r="16" fill="#F0E9DD" />
      <line x1="640" y1="298" x2="540" y2="388" stroke="#F0E9DD" stroke-width="4" />
      <line x1="640" y1="298" x2="740" y2="388" stroke="#F0E9DD" stroke-width="4" />
      <line x1="540" y1="432" x2="480" y2="474" stroke="#F0E9DD" stroke-width="3" />
      <line x1="540" y1="432" x2="600" y2="474" stroke="#F0E9DD" stroke-width="3" />
      <line x1="740" y1="432" x2="680" y2="474" stroke="#F0E9DD" stroke-width="3" />
      <line x1="740" y1="432" x2="800" y2="474" stroke="#F0E9DD" stroke-width="3" />
    `
  },
  {
    name: 'aivoa',
    title: 'AIVOA // AI DEVIATION INTAKE &amp; COPILOT',
    iconSvg: `
      <!-- QMS Document Shield with Agent Flow Graph -->
      <polygon points="640,240 760,280 760,440 640,520 520,440 520,280" fill="#182E6E" stroke="#F0E9DD" stroke-width="6" stroke-linejoin="round" />
      <polygon points="640,270 730,300 730,420 640,480 550,420 550,300" fill="none" stroke="#E5484D" stroke-width="4" stroke-linejoin="round" />
      <!-- Workflow nodes: Router -> Extract -> Validate -> Diff -->
      <circle cx="640" cy="330" r="18" fill="#E5484D" />
      <circle cx="590" cy="390" r="14" fill="#F0E9DD" />
      <circle cx="690" cy="390" r="14" fill="#F0E9DD" />
      <circle cx="640" cy="445" r="14" fill="#F0E9DD" />
      <line x1="640" y1="348" x2="590" y2="376" stroke="#F0E9DD" stroke-width="3" />
      <line x1="640" y1="348" x2="690" y2="376" stroke="#F0E9DD" stroke-width="3" />
      <line x1="590" y1="404" x2="640" y2="431" stroke="#F0E9DD" stroke-width="3" />
      <line x1="690" y1="404" x2="640" y2="431" stroke="#F0E9DD" stroke-width="3" />
      <!-- Checkmark in center -->
      <polyline points="633,330 638,335 648,324" fill="none" stroke="#F0E9DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    `
  }
];

async function generate() {
  for (const proj of projects) {
    const svg = `
      <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-${proj.name}" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(240, 233, 221, 0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <!-- Background: Solid Duotone Cobalt -->
        <rect width="${WIDTH}" height="${HEIGHT}" fill="#1E3A8A" />
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid-${proj.name})" />
        
        <!-- Viewfinder Ticks -->
        <path d="M 60 90 L 60 60 L 90 60" fill="none" stroke="#F0E9DD" stroke-width="2" />
        <path d="M 1220 90 L 1220 60 L 1190 60" fill="none" stroke="#F0E9DD" stroke-width="2" />
        <path d="M 60 630 L 60 660 L 90 660" fill="none" stroke="#F0E9DD" stroke-width="2" />
        <path d="M 1220 630 L 1220 660 L 1190 660" fill="none" stroke="#F0E9DD" stroke-width="2" />

        <!-- Center Graphic -->
        ${proj.iconSvg}

        <!-- Label Overlay -->
        <rect x="60" y="610" width="340" height="32" rx="4" fill="#E0DEC7" opacity="0.95" />
        <text x="76" y="632" font-family="monospace, sans-serif" font-size="12" font-weight="bold" fill="#1E3A8A" letter-spacing="2">${proj.title}</text>
      </svg>
    `;

    const dest = path.join(outDir, `${proj.name}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(dest);
    console.log(`Generated ${dest}`);
  }
}

generate().catch(console.error);
