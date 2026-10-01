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
      'redis', 'docker', 'frontend', 'backend'
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
    answer: "My core languages are Python, JavaScript, TypeScript, SQL, and C++. For frameworks and platforms, I build with FastAPI, React, Next.js, Redis Pub/Sub, and Docker Compose. I am currently sharpening high-recall RAG systems, vector databases, and advanced data structures & algorithms.\n\nAre you curious how he applies these in distributed pipelines, or looking for specific backend depth?"
  },

  // 1b. RAG & Vector Databases
  {
    id: 'sharpening-rag',
    topic: 'RAG & Vector Databases',
    keywords: [
      'rag', 'vector database', 'vector databases', 'embeddings', 'retrieval',
      'vector db', 'qdrant', 'chroma', 'milvus', 'pinecone', 'sharpening', 'currently sharpening'
    ],
    phrases: [
      'tell me about your rag work',
      'what are you currently sharpening',
      'what are you learning right now',
      'do you know rag',
      'vector databases experience'
    ],
    answer: "I am actively deepening my work in Retrieval-Augmented Generation (RAG) architectures and vector databases. This includes designing chunking strategies, dense & sparse hybrid retrieval, embedding models, and vector indexing benchmarks, alongside daily algorithmic problem-solving in data structures."
  },

  // 2. VisionLink Project
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
    answer: "VisionLink is a real-time computer vision streaming pipeline built with Python, FastAPI, WebSockets, OpenCV, and React. It decouples video ingestion from model inference using Redis Pub/Sub worker queues, achieving low-latency live bounding-box overlays and telemetry in an interactive web viewfinder.\n\nWant to know what the hardest part of building the WebRTC pipeline was, or curious about another project?"
  },

  // 3. CaloRupee Project
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
    answer: "CaloRupee is a multimodal nutrition intelligence system tailored for Indian meals. Built with FastAPI, PostgreSQL, and Gemini Vision, it analyzes meal images to extract macronutrients and simultaneously estimates per-meal costs in Indian Rupees based on local grocery pricing.\n\nCurious how we achieved high OCR and segmentation accuracy across complex thalis, or want to explore NutriSync?"
  },

  // 4. NutriSync Project
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
    answer: "NutriSync is an OpenEnv-compliant Reinforcement Learning environment for personalized dietary optimization. Developed using Python, Gymnasium, and PyTorch, it features a 50-item Indian ingredient database and a 15-component reward function balancing caloric goals, glycemic load, micronutrients, and regional dietary constraints.\n\nInterested in how the custom reward engine was engineered, or should we look at VisionLink?"
  },

  // 5. Package Scanner / PackDrishti Project
  {
    id: 'project-package-scanner',
    topic: 'Package Scanner (PackDrishti) Project',
    keywords: [
      'package scanner', 'packdrishti', 'pack drishti', 'drishti', 'barcode',
      'ocr', 'yolov8', 'defect detection', 'industrial inspection', 'logistics'
    ],
    phrases: [
      'what is package scanner',
      'tell me about package scanner',
      'what is packdrishti',
      'tell me about packdrishti',
      'how does package scanner work',
      'explain package scanner'
    ],
    answer: "Package Scanner (PackDrishti) is an automated edge computer vision system for industrial parcel inspection. It pairs OpenCV, YOLOv8, and FastAPI to achieve sub-100ms barcode decode, optical character verification against shipping manifests, and automated package surface defect detection.\n\nWant to hear how it maintains 30+ FPS on edge hardware, or what tech stack he uses day-to-day?"
  },

  // 6. Education / Year / CGPA
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
    answer: "I am currently a second-year B.E. student majoring in Artificial Intelligence & Data Science at Dr. D. Y. Patil Institute of Technology in Pune (Sep 2025–Present). I completed my first year with an 8.71 CGPA (High Distinction).\n\nWould you like to hear about his hackathon projects or what engineering roles he's targeting next?"
  },

  // 7. Availability / Internship Status
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
    answer: "I am actively seeking AI Engineering, Backend Development, or Full-Stack Developer internship opportunities. I am open to remote roles globally, as well as on-site roles in Pune, Bangalore, Mumbai, and other major tech hubs.\n\nDo you have a specific role or team in mind, or want his direct contact details?"
  },

  // 8. Contact Information
  {
    id: 'contact',
    topic: 'Contact Info & Links',
    keywords: [
      'contact', 'email', 'phone', 'reach', 'get in touch', 'linkedin',
      'github', 'resume', 'call', 'message', 'address'
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
  },

  // 9. Hackathons & Milestones
  {
    id: 'achievements',
    topic: 'Hackathons & Recognitions',
    keywords: [
      'hackathon', 'hackathons', 'awards', 'achievements', 'competition',
      'won', 'win', 'recognition', 'milestones', 'timeline'
    ],
    phrases: [
      'have you won any hackathons',
      'tell me about your achievements',
      'what competitions have you won',
      'hackathon wins',
      'key milestones'
    ],
    answer: "I've competed in and placed in regional hackathons building real-time vision pipelines and automated inspection tools. These milestones demonstrate my ability to rapidly architect, test, and ship working prototypes under tight constraints."
  },

  // 10. Why Should I Hire You?
  {
    id: 'why-hire',
    topic: 'Value Proposition & Why Hire',
    keywords: [
      'why hire', 'why should i hire you', 'why you', 'strengths', 'value',
      'what makes you different', 'advantages', 'hire me'
    ],
    phrases: [
      'why should i hire you',
      'why should we hire you',
      'why sameer',
      'what makes you stand out',
      'what is your value proposition'
    ],
    answer: "I don't just build UI wrappers or simple CRUD forms — I build the foundational infrastructure behind AI products: real-time streaming pipelines, async message queues, custom RL training environments, and polished frontend interfaces. I bring deep architectural curiosity, production discipline, and speed to every team I join.\n\nWhat kind of engineering challenges is your team currently tackling?"
  },

  // 11. What Do You Like Building?
  {
    id: 'what-like-building',
    topic: 'Interests & What Excites Him',
    keywords: [
      'like building', 'passionate', 'interests', 'what excites you',
      'enjoy', 'favorite', 'culture fit', 'philosophy'
    ],
    phrases: [
      'what do you like building',
      'what kind of projects do you enjoy',
      'what are you passionate about',
      'what is your engineering philosophy'
    ],
    answer: "I'm most excited by systems where AI meets low-latency production engineering: event-driven backends, computer vision pipelines running over WebSockets, and developer tooling. I love the challenge of taking an ML model from an isolated notebook into an observable, scalable system."
  },

  // 12. What Are You Learning Now?
  {
    id: 'learning-now',
    topic: 'Current Studies & Next Technologies',
    keywords: [
      'learning', 'currently learning', 'sharpening', 'studying',
      'next', 'future', 'what are you learning now'
    ],
    phrases: [
      'what are you learning now',
      'what are you currently studying',
      'what skills are you sharpening',
      'whats next for you'
    ],
    answer: "Right now I'm deepening my skills in distributed systems architecture, WebGPU shaders for high-performance in-browser rendering, and formal RL evaluation benchmark frameworks with Gymnasium and OpenEnv."
  }
];
