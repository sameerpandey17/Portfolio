// All overlay coordinates are percentages of the covered 1280 × 720 content box.
// Use ?debug=1 + arrow keys to nudge values; press 1 = title, 2 = watermark.
export const FRAME_WIDTH  = 1280;
export const FRAME_HEIGHT = 720;
export const FRAME_RATE   = 24;
export const TOTAL_HERO_FRAMES = 80; // 80 frames (~20fps equivalent) reduces initial network transfer from 32MB to ~10MB for instant loading
export const FRAME_COUNT  = TOTAL_HERO_FRAMES;
export const GET_HERO_FRAME_PATH = (index: number) => {
  const clamped = Math.max(0, Math.min(TOTAL_HERO_FRAMES - 1, index));
  // Maps 0..79 evenly across the 240 available rendered WebP source frames
  const originalFrameNum = Math.round(clamped * (239 / (TOTAL_HERO_FRAMES - 1))) + 1;
  return `/assets/frames/frame_${String(originalFrameNum).padStart(4, '0')}.webp`;
};
export const FRAME_PATH = GET_HERO_FRAME_PATH;

export const SCROLL_LENGTH = '+=600%'; // keeps the final-frame hold unhurried
export const ZOOM_END      = 0.6;      // 0–ZOOM_END scrubs camera; ZOOM_END–1 holds last frame
export const SMOOTHING     = 0.12;     // reserved for MP4 fallback path

// ── LAPTOP_RECT & TITLE_RECT ──────────────────────────────────────────────────
// Position and size of the laptop inner screen (% of covered stage).
// Houses the central hero masthead: Eyebrow, Sameer Pandey heading, Bio, and Tech Stack.
// → Tune with ?debug=1, press 1, then drag or arrow-key nudge.
export const LAPTOP_RECT = { x: 34.8, y: 23.0, w: 29.8, h: 32.1 };
export const TITLE_RECT = LAPTOP_RECT;

// ── WATERMARK_COVER (CHATBOT LOGO LAUNCHER) ───────────────────────────────────
// Positions the chatbot robot logo badge directly over the 4-point sparkle Gemini watermark
// baked into the bottom-right corner of the video frames.
// Watermark exact bounds: x=[89.14%, 91.88%], y=[81.39%, 84.86%].
// This badge is opaque and always visible (scroll progress 0 to 1), perfectly masking it.
// → Tune with ?debug=1, press 2, then drag or arrow-key nudge.
export const WATERMARK_COVER = { x: 87.6, y: 79.0, w: 6.2, h: 8.8 };

// Deprecated photo frame (removed per user request)
export const PHOTO_OVERLAY = false;
export const PHOTO_RECT = { x: 0, y: 0, w: 0, h: 0 };



// ── TIMELINE ──────────────────────────────────────────────────────────────────
// All values are ScrollTrigger progress positions (0 = top, 1 = pin end).
export const TIMELINE = {
  introFadeOut: [0,    0.12] as const,  // initial big-text fades out as camera drops
  titleIn:      [0.68, 0.78] as const,  // covered-stage title line-reveals
  hintIn:       [0.88, 0.94] as const,  // keep-scrolling hint + watermark badge
} as const;

// ── VIDEO_ASSETS ─────────────────────────────────────────────────────────────
export const VIDEO_ASSETS = {
  mp4:      '/assets/hero_scrub.mp4',
  poster:   '/assets/poster.webp',
  fallback: '/assets/poster.webp',      // clean room poster fallback
  myPhoto:  '/assets/my-photo.jpg',     // user photo placed in photo frame when PHOTO_OVERLAY = true
};