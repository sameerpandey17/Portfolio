export interface ProjectFeature {
  heading: string;
  body: string | string[];
}

export interface ProjectHighlight {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  category: string;
  whatItIs: string;
  feature: ProjectFeature;
  techStack: string[];
  howIMadeIt: string;
  links: { label: string; url: string }[];
  iconType: 'visionlink' | 'calorupee' | 'nutrisync' | 'package-scanner';
}

export interface SkillCategory {
  title: string;
  items: string[];
  isSharpening?: boolean;
  note?: string;
}

export interface AchievementItem {
  date: string;
  title: string;
  description: string;
  badge?: string;
}

export interface WhatsNextItem {
  number: string;
  title: string;
  body: string;
}

export const portfolioContent = {
  profile: {
    name: 'Sameer Pandey',
    role: 'AI & Full-Stack Developer',
    eyebrow: 'AI & FULL-STACK DEVELOPER',
    valueLine:
      'I build the infrastructure behind AI products: real-time pipelines, scalable backends, and the interfaces on top.',
    location: 'Pune, Maharashtra, India',
    remote: 'Open to Remote',
    email: 'sameerpandey17nov@gmail.com',
    phone: '+91 6204570289',
    linkedin: 'https://www.linkedin.com/in/sameer-pandey17/',
    github: 'https://github.com/sameerpandey17',
    resumeUrl: '/assets/Sameer_Pandey_Resume.pdf',
  },

  heroTags: [
    'Python',
    'FastAPI',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Redis Pub/Sub',
    'Docker Compose',
    'RL & AI Systems',
  ] as const,

  about: {
    summary:
      'Currently a second-year B.E. student in Artificial Intelligence & Data Science at Dr. D. Y. Patil Institute of Technology, Pune (Sep 2025–Present, First Year CGPA 8.71).',
    architectureFocus:
      'I independently build and ship full-stack AI-integrated products from end to end. Rather than treating AI as simple API calls, I focus on the architecture around it — resilient WebSocket streaming, Redis Pub/Sub message brokers, automatic multi-provider failover, and production Docker orchestrations.',
    statusBadge: 'B.E. AI & DS (Second Year) · CGPA 8.71',
    institution: 'Dr. D. Y. Patil Institute of Technology, Pune',
    period: 'Sep 2025 – Present',
  },

  skills: [
    {
      title: 'Languages & Tools',
      items: [
        'Python',
        'JavaScript',
        'TypeScript',
        'SQL',
        'C++',
        'Git',
        'Docker',
        'PostgreSQL',
        'Redis',
        'REST APIs',
      ],
    },
    {
      title: 'Frameworks & Platforms',
      items: [
        'FastAPI',
        'React',
        'Next.js',
        'Docker Compose',
        'Redis Pub/Sub',
        'WebSocket',
        'Nginx',
      ],
    },
    {
      title: 'Technical Areas',
      items: [
        'AI/ML Integration',
        'Computer Vision & OCR',
        'Full-Stack Development',
        'System Design',
        'RL Environments',
      ],
    },
    {
      title: 'Currently Sharpening',
      items: [
        'RAG',
        'Vector Databases',
        'Data Structures & Algorithms',
      ],
      isSharpening: true,
      note: 'Active growth: Designing high-recall RAG pipelines with vector databases (embeddings & hybrid search), and daily algorithmic problem solving (graph & tree traversals, dynamic programming).',
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 'visionlink',
      number: '01',
      title: 'VisionLink',
      eyebrow: 'REC // 01',
      category: 'Real-Time Vision & Stream Broker',
      whatItIs:
        'Instant facial emotion telemetry streamed directly from browser webcams to concurrent client dashboards without dropping frames.',
      feature: {
        heading: 'Notable Architecture',
        body: [
          'Decoupled frame capture from inference using Redis Pub/Sub channels, allowing multiple stateless FastAPI workers to consume video frames and broadcast processed landmarks to hundreds of concurrent WebSocket subscribers without thread starvation.',
          'Shipped cursor-based pagination over PostgreSQL detection logs, scoped API key authentication, and BuildKit cache-layered multi-stage Docker builds for lean container footprints.',
        ],
      },
      techStack: ['FastAPI', 'React', 'Redis Pub/Sub', 'PostgreSQL', 'Docker Compose', 'MediaPipe', 'Nginx'],
      howIMadeIt:
        'The biggest headache was keeping inference latency sub-50ms when multiple browsers opened streams simultaneously. Running MediaPipe Face Mesh synchronously inside the WebSocket event loop choked the server immediately. I solved this by treating the ingestion server purely as a frame pipe into Redis Pub/Sub, letting dedicated worker processes chew through classification and fan results back out asynchronously.',
      links: [
        { label: 'Code', url: 'https://github.com/sameerpandey17/VisionLink' },
        { label: 'Live', url: '#' },
      ],
      iconType: 'visionlink',
    },
    {
      id: 'calorupee',
      number: '02',
      title: 'CaloRupee',
      eyebrow: 'REC // 02',
      category: 'AI Budget & Nutrition Engine',
      whatItIs:
        'A hyper-localized meal planning engine that solves daily calorie and macro targets strictly under a user-defined rupee budget.',
      feature: {
        heading: 'Worth Knowing',
        body:
          'Dual-provider LLM orchestration with automatic health-checked failover — if the primary model hits rate limits or latency spikes, requests reroute to the secondary provider within 400ms so student meal planning never halts midway through generation.',
      },
      techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Groq / LLaMA', 'Docker'],
      howIMadeIt:
        'Indian student diets are notoriously constrained by hyper-local ingredient prices that generic nutrition apps completely miss. I built a structured prompt pipeline that verifies regional pantry costs before calculating macronutrient densities, paired with a client-side tracker backed by 45 curated student meals. The real win was building a fallback state machine that made API downtime completely invisible to users.',
      links: [
        { label: 'Code', url: 'https://github.com/sameerpandey17/CaloRupee' },
        { label: 'Live', url: '#' },
      ],
      iconType: 'calorupee',
    },
    {
      id: 'nutrisync',
      number: '03',
      title: 'NutriSync',
      eyebrow: 'REC // 03',
      category: 'Reinforcement Learning Environment',
      whatItIs:
        'An OpenEnv-standardized Gym environment where reinforcement learning agents learn 4-meal dietary sequencing under strict non-linear penalties.',
      feature: {
        heading: 'Reward Engineering',
        body: [
          'Engineered an uncheatable multi-objective reward engine combining continuous reward shaping with instant kill-switches: any single allergen breach or budget ceiling violation immediately zeros the episode return.',
          'Structured three progressive constraint tiers (Omnivore, Vegetarian, and Vegan) over a 50-ingredient Indian food database with heat-and-fry nutritional transform modifiers.',
          'Provided an interactive Gradio diagnostic visualizer for researchers to inspect trajectory state-action transitions step-by-step.',
        ],
      },
      techStack: ['Python', 'OpenAI Gym / OpenEnv', 'NumPy', 'Gradio', 'RL Reward Engine'],
      howIMadeIt:
        'RL agents are notorious reward-hackers: in my early training runs, the policy figured out it could hit calorie goals by chugging oil and raw sugar while ignoring protein altogether. I had to restructure the reward manifold with diminishing returns and multiplicative barrier functions so the agent had to balance micronutrients and cost in equilibrium. Testing policy actions through a custom Gradio dashboard shaved days off debugging reward curves.',
      links: [
        { label: 'Code', url: 'https://github.com/sameerpandey17/NutriSync' },
      ],
      iconType: 'nutrisync',
    },
    {
      id: 'package-scanner',
      number: '04',
      title: 'PackDrishti',
      eyebrow: 'REC // 04',
      category: 'Edge Inspection & Trust Registry',
      whatItIs:
        'An edge-assisted packaging verification system that cross-references barcode and label integrity against a crowd-validated public trust index.',
      feature: {
        heading: 'System Design',
        body:
          'A multi-stage pipeline where repeated barcode scans compute an authenticated Bayesian trust score across batch defect histories, syncing through a low-overhead REST backend to a real-time public transparency board.',
      },
      techStack: ['Android', 'REST API', 'PostgreSQL', 'FastAPI', 'Public Dashboard'],
      howIMadeIt:
        'A single scan can never give an accurate rating of product authenticity or batch quality — false positives happen constantly with damaged labels. I structured the trust metric to require 3-4 distinct multi-angle scans before updating the public brand registry, dampening single-scan variance and giving consumers a reliable score they can check in the aisle before paying.',
      links: [
        { label: 'Code', url: 'https://github.com/sameerpandey17/PackDrishti' },
      ],
      iconType: 'package-scanner',
    },
  ] as ProjectHighlight[],

  achievements: [
    {
      date: 'March 2026',
      title: '1st Place — Impromptu Hackathon (3-Hour Sprint)',
      description:
        'Secured first place in a high-intensity 3-hour hackathon by building a full-stack college canteen web app featuring live menu updates, an administrative operations panel, and payment gateway integration.',
      badge: 'Winner',
    },
    {
      date: 'Sep 2025 – Present',
      title: 'B.E. in AI & Data Science, Dr. D. Y. Patil Institute of Technology',
      description:
        'Second Year Undergraduate student in Artificial Intelligence & Data Science. Finished first year with an 8.71 CGPA, focusing on algorithmic reasoning, system design, and applied intelligence.',
      badge: 'CGPA 8.71',
    },
    {
      date: 'Ongoing',
      title: 'Relevant Coursework & Rigorous Self-Study',
      description:
        'Core curriculum and extensive independent deep dives into Artificial Intelligence, Data Structures & Algorithms, Database Management Systems, Computer Networks, and Operating Systems.',
      badge: 'Curriculum',
    },
  ] as AchievementItem[],

  whatsNext: [
    {
      number: '01',
      title: 'Deepening Data Structures & Algorithms',
      body: 'Actively advancing problem solving speed, edge-case coverage, and complexity proofs across graph algorithms, dynamic programming, and memory-conscious data structures.',
    },
    {
      number: '02',
      title: 'Applied AI in High-Ownership Product Teams',
      body: 'Looking to bring end-to-end AI product engineering into teams building production distributed backends, low-latency streaming pipelines, and real-world agentic interfaces.',
    },
    {
      number: '03',
      title: 'Open to Full-Stack & Applied AI Internships',
      body: 'Seeking rigorous internship opportunities where systems engineering, real-time data flow, and modern web interfaces directly impact user outcomes.',
    },
  ] as WhatsNextItem[],

  contact: {
    statement: "Let's build something intelligent together.",
    subtext:
      'Whether you have an opening on a high-ownership engineering team, want to collaborate on AI-driven systems, or want to discuss backend architecture — my inbox is open.',
    email: 'sameerpandey17nov@gmail.com',
    phone: '+91 6204570289',
    location: 'Pune, Maharashtra, India',
    remote: 'Open to Remote Worldwide',
    socials: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sameer-pandey17/', icon: 'linkedin' },
      { label: 'GitHub', url: 'https://github.com/sameerpandey17', icon: 'github' },
      { label: 'Email', url: 'mailto:sameerpandey17nov@gmail.com', icon: 'email' },
      { label: 'Resume PDF', url: '/assets/Sameer_Pandey_Resume.pdf', icon: 'resume' },
    ],
  },
} as const;