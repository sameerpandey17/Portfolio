# Sameer Pandey — Cinematic AI & Systems Portfolio

> A high-performance, editorial portfolio showcasing AI systems engineering, computer vision pipelines, and full-stack architecture. Features a 60fps frame-synced cinematic hero scrub, custom WebGL noise dissolve transitions, and an integrated two-layer AI assistant running on Groq (Llama 3.3 70B).

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green.svg)](https://greensock.com/gsap/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-orange.svg)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

---

## ✦ Architectural Highlights

### 1. Frame-Synced Cinematic Scrub (GSAP + Lenis)
- Preloads 240 compressed WebP frames into memory with progressive decode.
- Ties playback frame interpolation directly to scroll progress via **GSAP ScrollTrigger** and **Lenis smooth scrolling**.
- Coordinates an unpin zoom-out release into an editorial narrative layout with fluid easing.
- Dynamically covers the original backdrop watermark using an interactive robot badge that doubles as a chat launcher.

### 2. WebGL Noise Dissolve Transitions
- Built with custom GLSL vertex and fragment shaders (`src/components/morph-image.js`).
- Employs smooth Perlin noise threshold modulation to morph between project preview frames without layout shifts or memory leaks.

### 3. Two-Layer AI Chatbot Brain
- **Layer 1 — Instant Client-Side Matcher (`src/chatbot/knowledge.ts`)**:
  - Zero-latency keyword and regex matcher covering Sameer's background, education (2nd-year B.E. at DY Patil Pune, 8.71 CGPA), skills, project details, and contact points.
  - Returns structured, immediate answers with zero external network overhead.
- **Layer 2 — Serverless LLM Fallback (`netlify/functions/chat.js` & `src/chatbot/client.ts`)**:
  - Proxied securely via Netlify serverless functions in production and a local Vite dev plugin locally.
  - Queries `llama-3.3-70b-versatile` on Groq with Sameer's background context.
  - Features sliding-window conversation memory, client-side rate limiting (10 queries / 10 min), and graceful fallback if no API key is provided.

### 4. Editorial Design System
- Rooted in a tactile, high-contrast palette:
  - **Paper**: `#F7F4EE`
  - **Cobalt**: `#1E3A8A`
  - **Signal Red**: `#E5484D`
  - **Ink**: `#151515`
- Typography: Variable serif **Fraunces** with zero soft rounding (`"SOFT" 0, "WONK" 0`), paired with **Inter Tight** and **JetBrains Mono**.

---

## ✦ Project Structure

```
Portfolio/
├── .agents/
│   └── skills/              # Consolidated engineering skills hub (16 skills)
│       ├── awwwards-animations/
│       ├── design-motion-principles/
│       ├── gsap-core/
│       ├── gsap-frameworks/
│       ├── gsap-performance/
│       ├── gsap-plugins/
│       ├── gsap-react/
│       ├── gsap-scrolltrigger/
│       ├── gsap-timeline/
│       ├── gsap-utils/
│       ├── high-end-visual-design/
│       ├── impeccable/
│       ├── microinteractions/
│       ├── top-design/
│       ├── typography-selector/
│       └── web-typography/
├── netlify/
│   └── functions/
│       └── chat.js          # Netlify serverless endpoint for Groq LLM
├── public/
│   ├── assets/
│   │   ├── frames/          # Frame sequence (frame_0001.webp - frame_0240.webp)
│   │   ├── projects/        # 4 high-res project artwork previews
│   │   ├── chatbot-avatar.webp
│   │   ├── chatbot-avatar.png
│   │   ├── chatbot-logo.webp
│   │   ├── chatbot-logo.png
│   │   ├── hero_scrub.mp4
│   │   ├── laptop.webp
│   │   ├── poster.webp
│   │   └── Sameer_Pandey_Resume.pdf
│   └── favicon.svg
├── src/
│   ├── chatbot/             # Two-layer conversational brain
│   │   ├── client.ts        # Layer 2 client with rate-limiting & timeout
│   │   ├── context.md       # Knowledge markdown reference
│   │   ├── context.ts       # Structured system context & profile constants
│   │   ├── knowledge.ts     # Layer 1 instant intent matcher & QA table
│   │   └── respond.ts       # Central dispatcher (Layer 1 -> Layer 2)
│   ├── components/          # 17 bespoke UI and animation components
│   │   ├── about-section.tsx
│   │   ├── chat-widget.tsx
│   │   ├── contact-section.tsx
│   │   ├── custom-cursor.tsx
│   │   ├── error-boundary.tsx
│   │   ├── halftone-divider.tsx
│   │   ├── isometric-workspace.tsx
│   │   ├── monogram-mark.tsx
│   │   ├── morph-image.js   # WebGL Perlin noise dissolve shaders
│   │   ├── project-icon.tsx
│   │   ├── projects-horizontal.tsx
│   │   ├── scribble-link.tsx
│   │   ├── section-heading.tsx
│   │   ├── skills-section.tsx
│   │   ├── tag-row.tsx
│   │   ├── timeline.tsx
│   │   └── whats-next-section.tsx
│   ├── pages/
│   │   └── not-found.tsx     # Editorial 404 page
│   ├── App.tsx              # Main application orchestrator & scrub canvas
│   ├── config.ts            # Geometry calibration, coordinates & project catalog
│   ├── content.ts           # Portfolio data, career timeline & copy
│   ├── index.css            # Master editorial stylesheet
│   └── main.tsx             # React 18 DOM mount
├── .env.example             # Environment variable template
├── .gitignore               # Ignored dependencies, build outputs, and keys
├── index.html               # Semantic HTML shell & Google Fonts preconnect
├── netlify.toml             # Netlify deployment and redirect rules
├── package.json             # Scripts and dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite config with local /api/chat middleware
```

---

## ✦ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/sameerpandey17/PackDrishti.git
cd Portfolio
npm install
```

### 3. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open `.env` and add your Groq API key:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
> **Tip**: You can get a free API key at [Groq Console](https://console.groq.com/keys). If you do not supply an API key, the site works normally — Layer 1 instant answers continue to function, and Layer 2 gracefully informs the user that demo mode is active.

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Vite Local Chat Middleware**: The dev server includes a built-in proxy in `vite.config.ts` for `/api/chat` that directly tests the Groq endpoint locally without needing the Netlify CLI.

---

## ✦ Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Runs the Vite dev server with hot reload at `localhost:5173`. |
| `build` | `npm run build` | Compiles TypeScript and creates optimized production bundle in `dist/`. |
| `preview` | `npm run preview` | Locally serves the production build from `dist/`. |
| `typecheck` | `npm run typecheck` | Validates TypeScript types across the entire project with zero emit. |

---

## ✦ Production Deployment (Netlify)

The project includes pre-configured [netlify.toml](file:///c:/Users/samee/OneDrive/Desktop/Portfolio/netlify.toml) settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Serverless functions**: `netlify/functions`
- **Redirects**: `/api/chat` routes seamlessly to `/.netlify/functions/chat`

### Setting up Environment Variables on Netlify:
1. Navigate to **Site Configuration** > **Environment Variables** in your Netlify dashboard.
2. Add a new variable:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (`gsk_...`)
3. Trigger a redeploy. Your serverless `/api/chat` endpoint is now live and fully secured.

---

## ✦ Skills Hub (`.agents/skills`)

This codebase contains 16 specialized design, animation, and engineering skills located in `.agents/skills/`:
- **`impeccable`**: UI/UX design heuristics, visual hierarchy, and typography discipline.
- **`gsap-*` (8 skills)**: Core GSAP, ScrollTrigger, timelines, performance tuning, and React hooks.
- **`awwwards-animations`**: Award-winning micro-interactions and scroll sequences.
- **`web-typography` & `typography-selector`**: Editorial type systems and font loading.
- **`high-end-visual-design` & `top-design`**: Color palettes, surface elevation, and layout tokens.
- **`design-motion-principles` & `microinteractions`**: Motion choreographies and haptic affordances.

---

## ✦ Author & Contact

**Sameer Pandey**
- **Location**: Pune, Maharashtra, India (Open to Remote)
- **Email**: [sameerpandey17nov@gmail.com](mailto:sameerpandey17nov@gmail.com)
- **Phone**: +91 6204570289
- **Resume**: Available in [public/assets/Sameer_Pandey_Resume.pdf](file:///c:/Users/samee/OneDrive/Desktop/Portfolio/public/assets/Sameer_Pandey_Resume.pdf)
