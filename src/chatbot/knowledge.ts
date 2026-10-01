/**
 * Layer 1 Knowledge Base
 * Pre-written, high-confidence instant Q&A answers for common recruiter and developer questions.
 * Answers immediately without making network calls or incurring API costs.
 */

export interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  phrases: string[];
  answer: string;
  suggestedQuestions?: string[];
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 1. Tech Stack & Skills
  {
    id: 'tech-stack',
    topic: 'Core Technical Stack & Skills',
    keywords: [
      'stack', 'tech', 'skills', 'technologies', 'tools', 'languages',
      'frameworks', 'python', 'fastapi', 'react', 'typescript', 'postgresql',
      'redis', 'docker', 'frontend', 'backend', 'langgraph', 'redux'
    ],
    phrases: [
      'what is your tech stack',
      'what is his tech stack',
      'what technologies do you use',
      'what do you code in',
      'what skills do you have',
      'tell me about your skills',
      'what programming languages',
      'technical skills'
    ],
    answer: "My core languages & tools are Python, FastAPI, REST API, PostgreSQL, Git, Docker, Redis, SQLAlchemy, and SEO. On the frameworks and platforms side, I build with React, TypeScript, Redux Toolkit, LangGraph, Nginx, Docker Compose, WebSocket, and Redis Pub/Sub. I specialize in AI/ML integration, LLM agents, and system design, and I'm currently sharpening Data Structures & Algorithms."
  },

  // 2. AIVOA Project (Lead Project)
  {
    id: 'project-aivoa',
    topic: 'AIVOA Project',
    keywords: [
      'aivoa', 'deviation', 'qms', 'pharma', 'manufacturing', 'langgraph',
      'groq', 'copilot', 'intake', 'deviation intake', 'quality management'
    ],
    phrases: [
      'what is aivoa',
      'tell me about aivoa',
      'how does aivoa work',
      'explain aivoa',
      'pharma project',
      'deviation copilot'
    ],
    answer: "AIVOA is an AI-powered deviation intake & copilot for pharmaceutical manufacturing QMS (2026). Built with Python, FastAPI, LangGraph, Groq LLMs, React 18, and PostgreSQL/SQLite with Docker Compose, it lets QA teams log, edit, and question manufacturing deviations via chat or document ingestion (PDF, DOCX, XLSX, OCR). A LangGraph agent pipeline automates intent routing, entity extraction, Pydantic validation, and risk assessment."
  },

  // 3. VisionLink Project
  {
    id: 'project-visionlink',
    topic: 'VisionLink Project',
    keywords: [
      'visionlink', 'vision-link', 'vision link', 'video', 'streaming',
      'webrtc', 'websockets', 'opencv', 'real-time vision', 'camera stream', 'low latency'
    ],
    phrases: [
      'what is visionlink',
      'tell me about visionlink',
      'tell me about vision link',
      'how does visionlink work',
      'explain visionlink'
    ],
    answer: "VisionLink is a real-time computer vision streaming pipeline built with Python, FastAPI, WebSockets, OpenCV, and React. It decouples video ingestion from model inference using Redis Pub/Sub worker queues, achieving low-latency live bounding-box overlays and telemetry in an interactive web viewfinder."
  },

  // 4. CaloRupee Project
  {
    id: 'project-calorupee',
    topic: 'CaloRupee Project',
    keywords: [
      'calorupee', 'calo-rupee', 'calo rupee', 'nutrition', 'calorie',
      'indian meal', 'cost intelligence', 'thali', 'gemini vision', 'food', 'diet'
    ],
    phrases: [
      'what is calorupee',
      'tell me about calorupee',
      'tell me about calo rupee',
      'how does calorupee work',
      'explain calorupee'
    ],
    answer: "CaloRupee is a multimodal nutrition intelligence system tailored for Indian meals. Built with FastAPI, PostgreSQL, and Gemini Vision, it analyzes meal images to extract macronutrients and simultaneously estimates per-meal costs in Indian Rupees based on local grocery pricing, featuring dual-provider failover for demo reliability."
  },

  // 5. NutriSync Project
  {
    id: 'project-nutrisync',
    topic: 'NutriSync Project',
    keywords: [
      'nutrisync', 'nutri-sync', 'nutri sync', 'openenv', 'reinforcement learning',
      'rl', 'gymnasium', 'diet environment', 'reward function', 'reward engine'
    ],
    phrases: [
      'what is nutrisync',
      'tell me about nutrisync',
      'tell me about nutri sync',
      'how does nutrisync work',
      'explain nutrisync'
    ],
    answer: "NutriSync is an OpenEnv-compliant Reinforcement Learning environment for personalized dietary optimization. Developed using Python, Gymnasium, and PyTorch, it features a 50-item Indian ingredient database and a 15-component reward function balancing caloric goals, glycemic load, micronutrients, and regional dietary constraints with a hard kill-switch for allergen breaches."
  },

  // 6. Personality: Pineapple on Pizza
  {
    id: 'pineapple-pizza',
    topic: 'Pineapple on Pizza Debate',
    keywords: ['pineapple', 'pizza', 'pineapple on pizza', 'hawaiian', 'toppings'],
    phrases: [
      'pineapple on pizza',
      'do you like pineapple on pizza',
      'pineapple pizza',
      'pineapple on pizza yes or no',
      'opinion on pineapple pizza'
    ],
    answer: "Yes — and I'll defend it with the same logic as my AI provider failover: redundancy and variety beat a single point of failure. A pizza with only savory toppings has no graceful degradation when you want something different halfway through the slice."
  },

  // 7. Personality: Villain Origin Story
  {
    id: 'villain-origin',
    topic: 'Villain Origin Story & Traumatizing Outage',
    keywords: ['villain', 'origin story', 'traumatized', 'trauma', 'worst outage', 'worst bug', 'outage', 'failover origin'],
    phrases: [
      'what is your villain origin story',
      'what is your villain origin',
      'what bug traumatized you',
      'worst outage you had',
      'villain origin'
    ],
    answer: "The first time I pushed something live and watched a \"100% uptime\" claim get tested in real time by an AI provider going down mid-demo. That's exactly why CaloRupee has automatic failover between two AI providers now — I don't get surprised by the same outage twice."
  },

  // 8. Personality: If Your Code Could Talk
  {
    id: 'code-personality',
    topic: 'If Your Code Could Talk',
    keywords: ['code talk', 'code could talk', 'code personality', 'what would your code say', 'what does your code say'],
    phrases: [
      'if your code could talk what would it say',
      'if your code could talk',
      'what would your code say about you',
      'code personality'
    ],
    answer: "\"He really likes Docker Compose and he will find a way to add Redis to something that didn't need Redis.\" Also probably \"why does every project have a failover system, does he not trust anything.\""
  },

  // 9. Work Culture: Team Culture
  {
    id: 'team-culture',
    topic: 'Ideal Team Culture',
    keywords: ['culture', 'team culture', 'thrive', 'work environment', 'ideal team', 'team style'],
    phrases: [
      'what team culture do you thrive in',
      'what team culture does he thrive in',
      'what kind of team do you like',
      'work culture preference',
      'ideal team culture'
    ],
    answer: "Small, fast-moving teams where people actually ship instead of just planning to ship. I like environments where I can own a problem end-to-end — not just \"build the frontend\" but understand why the feature exists. I work well with people who'll tell me directly when something's wrong instead of being polite about it."
  },

  // 10. Low-Latency Pipeline Design
  {
    id: 'low-latency',
    topic: 'Designing Low-Latency Pipelines',
    keywords: ['low latency', 'low-latency', 'latency pipelines', 'design low latency', 'pubsub architecture'],
    phrases: [
      'how do you design low latency pipelines',
      'how do you handle latency',
      'low latency pipeline design',
      'pipeline latency'
    ],
    answer: "I lean on pub/sub patterns instead of polling — VisionLink broadcasts processed frames to unlimited WebSocket clients through Redis Pub/Sub specifically so multiple workers can push updates without clients waiting on a request cycle. My instinct is to ask \"does this need to be synchronous?\" before optimizing anything — most latency problems are architecture problems wearing a performance costume."
  },

  // 11. Hardest Bug
  {
    id: 'hardest-bug',
    topic: 'Hardest Bug Tracked Down',
    keywords: ['hardest bug', 'toughest bug', 'difficult bug', 'race condition', 'hardest bug you had to track down'],
    phrases: [
      'what is the hardest bug you ever had to track down',
      'what is the hardest bug you tracked down',
      'hardest bug you solved',
      'toughest bug'
    ],
    answer: "Honestly, race conditions in anything involving Redis Pub/Sub and multiple workers — the kind of bug that only shows up under load, works fine every time you're staring at it, and vanishes the moment you add a print statement."
  },

  // 12. Rebuild VisionLink
  {
    id: 'rebuild-visionlink',
    topic: 'Rebuilding VisionLink From Scratch',
    keywords: ['rebuild visionlink', 'visionlink differently', 'rebuild differently', 'visionlink scratch'],
    phrases: [
      'if you had to rebuild visionlink from scratch',
      'what would you do differently in visionlink',
      'rebuild visionlink'
    ],
    answer: "I'd probably reconsider the real-time architecture earlier instead of bolting on WebSocket scaling after the fact — I built the emotion detection first and the \"how do I broadcast this to unlimited clients\" problem second, when honestly that's the harder engineering problem and should've shaped the design from day one."
  },

  // 13. Uncertain Decision
  {
    id: 'uncertain-decision',
    topic: 'Uncertain Technical Decision',
    keywords: ['uncertain decision', 'not 100% sure', 'technical regret', 'tradeoff regret', 'dubious architecture'],
    phrases: [
      'what is a technical decision you made that you are still not 100% sure was right',
      'technical decision you are not sure about',
      'technical regrets',
      'uncertain technical decision'
    ],
    answer: "Going with dual-mode persistence in AIVOA — PostgreSQL via Docker Compose with automatic SQLite fallback. It's genuinely useful for reliability, but it also means I maintain two code paths that need to behave identically, and I go back and forth on whether that complexity earns its keep."
  },

  // 14. Redis vs Database
  {
    id: 'redis-vs-db',
    topic: 'When to Use Redis vs Database',
    keywords: ['redis vs db', 'redis vs database', 'when to use redis', 'redis caching', 'polling vs pubsub'],
    phrases: [
      'how do you decide when to use redis vs database',
      'redis vs db',
      'when do you use redis',
      'why use redis'
    ],
    answer: "If it's state that needs to fan out to multiple consumers in real time, it's Redis. If it's something one request needs once, it's the database. Redis Pub/Sub in VisionLink exists because the alternative — clients polling Postgres for new frames — would've been both slower and embarrassing."
  },

  // 15. Secretly Proud
  {
    id: 'secretly-proud',
    topic: 'Secretly Most Proud Of',
    keywords: ['secretly proud', 'most proud', 'proudest', 'secret pride', 'underappreciated feature'],
    phrases: [
      'what are you secretly most proud of',
      'what is something you built that you are secretly proud of',
      'proudest feature',
      'secretly proud'
    ],
    answer: "The kill-switch logic in NutriSync's reward system — allergen use or a budget breach instantly zeros the score, no partial credit, no negotiating. It's a small design choice, but it's the part where I actually thought like a systems person instead of just a meal-planning app developer."
  },

  // 16. Weak Skill / Currently Sharpening
  {
    id: 'weak-skill',
    topic: 'Weak Skill Actively Working On',
    keywords: ['weakness', 'weak skill', 'weak', 'weaknesses', 'what are you bad at', 'sharpening', 'practicing dsa', 'dsa'],
    phrases: [
      'what is a skill you are weak at',
      'what are you weak at',
      'what is your weakness',
      'what are you actively working on',
      'what skill are you working on'
    ],
    answer: "Data Structures & Algorithms — it's literally on my resume as \"practicing\" because I'm not going to pretend otherwise. I can build and ship real systems, but I'm still closing the gap on the classic interview-style problem solving, and I'm doing it deliberately, not avoiding it."
  },

  // 17. Why Hire a Second-Year Student
  {
    id: 'why-hire',
    topic: 'Value Proposition & Why Hire',
    keywords: [
      'why hire', 'why should i hire you', 'why you', 'strengths', 'value',
      'what makes you different', 'advantages', 'hire me', 'second year', 'second-year'
    ],
    phrases: [
      'why should i hire you',
      'why should we hire you',
      'why sameer',
      'what makes you stand out',
      'why hire a second year student',
      'why hire a second-year'
    ],
    answer: "Because I'm not asking you to imagine what I could build — I've already built four production-shaped systems with authentication, failover, Docker orchestration, and real architecture decisions behind them, as a second-year. Give me two more years and an actual team around me and think about where that curve goes."
  },

  // 18. Education / Year / CGPA
  {
    id: 'education',
    topic: 'Education, University & Academic Standing',
    keywords: [
      'education', 'college', 'university', 'institute', 'degree', 'cgpa',
      'gpa', 'grades', 'marks', 'academic', 'year', 'study', 'student', 'patil', 'dypit'
    ],
    phrases: [
      'where do you study',
      'what college do you go to',
      'what is your cgpa',
      'what is his cgpa',
      'what year are you in',
      'what is your degree',
      'tell me about your education',
      'educational background'
    ],
    answer: "I am currently a second-year B.E. student majoring in Artificial Intelligence & Data Science at Dr. D. Y. Patil Institute of Technology in Pune (Sep 2025–Present). I completed my first year with an 8.71 CGPA (High Distinction)."
  },

  // 19. Availability / Internship Status
  {
    id: 'availability',
    topic: 'Internship Availability & Work Status',
    keywords: [
      'available', 'availability', 'internship', 'hire', 'hiring', 'job',
      'full-time', 'part-time', 'start date', 'remote', 'relocate', 'open to work'
    ],
    phrases: [
      'are you looking for an internship',
      'are you available for hire',
      'what kind of role is he looking for',
      'what kind of role are you looking for',
      'can you work remotely',
      'are you open to relocate',
      'when can you start'
    ],
    answer: "I am actively seeking AI Engineering, Backend Development, or Full-Stack Developer internship opportunities. I am open to remote roles globally, as well as on-site roles in Pune, Bangalore, Mumbai, and other major tech hubs."
  },

  // 20. Contact Information
  {
    id: 'contact',
    topic: 'Contact Info & Links',
    keywords: [
      'contact', 'email', 'phone', 'reach', 'get in touch', 'linkedin',
      'github', 'resume', 'call', 'message', 'address', 'portfolio'
    ],
    phrases: [
      'how can i contact you',
      'what is your email',
      'what is your phone number',
      'how to reach sameer',
      'where is your resume',
      'github link',
      'linkedin profile'
    ],
    answer: "You can reach me directly via email at sameerpandey17nov@gmail.com or by phone at +91 6204570289. You can also explore my code on GitHub (https://github.com/sameerpandey17) and connect on LinkedIn (https://www.linkedin.com/in/sameer-pandey17/)."
  }
];
