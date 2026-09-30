# Cinematic AI & Systems Engineering Portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-1.1-black)](https://lenis.darkroom.engineering/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F55036)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An open-source, editorial engineering portfolio designed for AI systems engineers, researchers, and full-stack builders. Built with a 60fps frame-synced cinematic camera scrub, WebGL noise-dissolve shaders, an interactive horizontal project filmstrip, and a two-layer hybrid AI assistant powered by client-side regex matching and Groq (Llama 3.3 70B).

---

## ✦ Key Features

- **60fps Frame-Synced Hero Scrub**: Preloads 240 WebP frames into memory with progressive decode. Seamlessly scrubs through camera zoom into the workstation via GSAP ScrollTrigger and Lenis smooth scrolling.
- **Horizontal Filmstrip Projects Section**: Smooth desktop horizontal pinning that translates cards across the screen as you scroll, with interactive viewfinder reticles and deep architectural build logs.
- **Custom WebGL Noise-Dissolve Transitions**: Handcrafted GLSL fragment shaders (`src/components/morph-image.js`) utilizing Simplex & Fractional Brownian Motion (FBM) noise for organic texture morphing between project highlights.
- **Two-Layer Hybrid AI Assistant**:
  - *Layer 1 (Offline / Zero-Config)*: Instant client-side keyword and fuzzy matcher responding with 0ms latency to questions about background, tech stack, and projects.
  - *Layer 2 (Cloud LLM)*: Proxied serverless endpoint querying `llama-3.3-70b-versatile` on Groq with sliding-window conversation memory and graceful degradation.
- **Engineered Editorial Design System**: High-contrast, tactile aesthetic pairing variable serif typography (**Fraunces**) with technical sans (**Inter Tight**) and monospace (**JetBrains Mono**).
- **Responsive & Accessible**: Complete desktop horizontal experience with fluid fallback to touch-friendly vertical layouts on mobile. WCAG AA compliant contrast ratios and reduced-motion considerations.

---

## ✦ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Component state, type safety, modular UI hierarchy |
| **Build Tooling** | [Vite 5](https://vitejs.dev/) | Sub-second HMR, tree-shaking, fast ESM builds |
| **Kinetic Motion** | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger | Scrubbed timelines, pin-spacers, horizontal scrub, easing curves |
| **Smooth Scrolling**| [Lenis](https://lenis.darkroom.engineering/) | Inertial normalized wheel/trackpad scrolling |
| **Graphics / Shader** | HTML5 Canvas + WebGL 1.0/2.0 (GLSL) | Simplex noise morph transitions and threshold dissolves |
| **Serverless AI** | [Netlify Functions](https://docs.netlify.com/functions/overview/) / Vite Middleware | Secure proxy to [Groq Cloud](https://groq.com/) for Llama 3.3 70B inference |
| **Styling** | Vanilla CSS (CSS Variables) | Zero runtime overhead, bespoke theme tokens, fluid typography |

---

## ✦ Getting Started (Local Setup)

Follow these steps to clone and run the portfolio locally on your machine.

### 1. Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.0.0` or higher (tested on Node v20 LTS and v22)
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Git**

Verify your environment:
```bash
node -v
npm -v
git --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/sameerpandey17/Portfolio.git
cd Portfolio
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables (Optional)

The portfolio comes with an instant offline brain (Layer 1) that answers questions without requiring any external API keys.

If you wish to enable the live Groq Llama 3.3 70B fallback (Layer 2):
1. Get a free API key at [Groq Console](https://console.groq.com/keys).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Add your key:
   ```env
   GROQ_API_KEY=gsk_your_groq_api_key_here
   ```

*(Note: In local development, Vite automatically loads `.env` via a built-in dev proxy plugin defined in `vite.config.ts`.)*

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✦ Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts local development server on port `5173` with live chat proxy |
| `npm run build` | `vite build` | Compiles optimized production bundle into `dist/` |
| `npm run preview`| `vite preview` | Locally serves and previews the production build |
| `npm run typecheck`| `tsc --noEmit` | Runs strict TypeScript compiler check with zero emit |

---

## ✦ Project Structure

```
Portfolio/
├── netlify/
│   └── functions/
│       └── chat.js            # Serverless function proxying Groq LLM requests
├── public/
│   ├── assets/
│   │   ├── frames/            # 240 compressed WebP frames for hero scrub
│   │   ├── projects/          # High-resolution project artwork
│   │   ├── hero_scrub.mp4     # Video scrub fallback source
│   │   ├── laptop.webp        # Isolated laptop frame graphic
│   │   └── sameer-workspace-portrait.webp # Archival halftone portrait
│   ├── favicon.svg            # Minimal SVG favicon
│   └── robots.txt             # SEO crawling directives
├── src/
│   ├── chatbot/
│   │   ├── client.ts          # Client-side chat dispatcher & memory
│   │   ├── context.ts         # Persona system prompt & fallback answers
│   │   ├── knowledge.ts       # Layer 1 instant zero-latency regex database
│   │   └── respond.ts         # Query router (Layer 1 match -> Layer 2 LLM)
│   ├── components/
│   │   ├── about-section.tsx       # Bio, archival portrait, narrative cards
│   │   ├── chat-widget.tsx         # Floating AI assistant dialog & launcher
│   │   ├── contact-section.tsx     # Copy-email button, socials, and footer
│   │   ├── custom-cursor.tsx       # Smooth trailing circular canvas reticle
│   │   ├── halftone-divider.tsx    # Technical raster section separators
│   │   ├── morph-image.js          # WebGL GLSL Simplex/FBM noise shader
│   │   ├── projects-horizontal.tsx # Horizontal pinning filmstrip container
│   │   ├── scribble-link.tsx       # Animated hand-drawn SVG underline links
│   │   ├── section-heading.tsx     # Standardized editorial section masthead
│   │   ├── skills-section.tsx      # Grouped engineering capability matrix
│   │   └── timeline.tsx            # Milestones and trajectory list
│   ├── pages/
│   │   └── not-found.tsx      # Editorial 404 page
│   ├── App.tsx                # Main cinematic scroll orchestration & layout
│   ├── config.ts              # Hero coordinates, timeline keys & asset config
│   ├── content.ts             # Central single-source-of-truth data configuration
│   ├── index.css              # Design tokens, typography & layout stylesheet
│   └── main.tsx               # React root entry point
├── .env.example               # Environment variables template
├── .gitignore                 # Clean repository ignore rules
├── index.html                 # Main HTML template with fonts and preloads
├── netlify.toml               # Netlify build, redirect, and function routing
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build pipeline and local API middleware
```

---

## ✦ Customization Guide (Making it Your Own)

This portfolio is built to be easily forkable and adaptable for your own projects:

### 1. Update Personal Data & Projects
All personal details, skills, timelines, and projects live in a single centralized file:
👉 **[src/content.ts](src/content.ts)**

- Modify `profile`: Name, role, location, bio, and social links.
- Modify `skills`: Languages, frameworks, tools, and sharpening stacks.
- Modify `projects`: Add your titles, descriptions, feature bullets, tech stacks, and repo URLs.
- Modify `achievements`: Update your education, hackathons, and certifications.

### 2. Update AI Chatbot Persona
To teach the assistant about your specific background and resume:
- Edit the instant offline brain in **[src/chatbot/knowledge.ts](src/chatbot/knowledge.ts)**.
- Edit the system context and background narrative in **[src/chatbot/context.ts](src/chatbot/context.ts)** and **[src/chatbot/context.md](src/chatbot/context.md)**.

### 3. Change Colors and Typography
Adjust theme variables in **[src/index.css](src/index.css)**:
```css
:root {
  --paper: #F7F4EE;         /* Background tone */
  --cobalt: #1E3A8A;        /* Primary accent */
  --red: #E5484D;           /* Signal highlight */
  --ink: #151515;           /* Primary text */
  --display: 'Fraunces', serif;
  --body: 'Inter Tight', sans-serif;
  --mono: 'JetBrains Mono', monospace;
}
```

---

## ✦ Deployment

### Deploy to Netlify (Recommended)
This repository includes a pre-configured `netlify.toml` and serverless API route in `netlify/functions/chat.js`.

1. Push your repository to GitHub.
2. Sign in to [Netlify](https://www.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub repository.
4. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
5. In **Site Settings** > **Environment variables**, add:
   - `GROQ_API_KEY`: Your Groq API key (optional for LLM mode)
6. Click **Deploy Site**.

### Deploy to Vercel
1. Import the repository in [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`, Output Directory: `dist`.
4. Deploy!

---

## ✦ Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/sameerpandey17/Portfolio/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ✦ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## ✦ Author

**Sameer Pandey**
- Email: [sameerpandey17nov@gmail.com](mailto:sameerpandey17nov@gmail.com)
- GitHub: [@sameerpandey17](https://github.com/sameerpandey17)
- Location: Pune, India
