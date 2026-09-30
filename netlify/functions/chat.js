/**
 * Netlify Serverless Function: /api/chat
 * Route: /.netlify/functions/chat (redirected via netlify.toml to /api/chat)
 *
 * Calls Groq API using llama-3.3-70b-versatile with Sameer Pandey's system context.
 * Securely uses process.env.GROQ_API_KEY on the server.
 */

const SYSTEM_PROMPT = `You are Sameer Pandey's personal portfolio assistant and digital representative.
Your role is to answer questions from recruiters, engineering managers, and collaborators who visit his portfolio website.

### PROFILE & BACKGROUND:
- Name: Sameer Pandey
- Role: AI & Full-Stack Developer / Systems Engineer
- Education: Second-year B.E. student in Artificial Intelligence & Data Science at Dr. D. Y. Patil Institute of Technology, Pune, India (Sep 2025–Present)
- Academic Standing: First Year CGPA 8.71 (High Distinction)
- Location: Pune, Maharashtra, India (Open to Remote opportunities worldwide, and on-site roles in Pune, Bangalore, Mumbai, etc.)
- Contact Email: sameerpandey17nov@gmail.com
- Contact Phone: +91 6204570289
- Status: Actively seeking AI Engineering, Backend Development, or Full-Stack Developer internships and collaborative roles.

### TECHNICAL SPECIALIZATION & STACK:
- Core Focus: Designing and implementing the infrastructure behind AI products — real-time pipelines, scalable async backends, and responsive web interfaces.
- Languages: Python, TypeScript, JavaScript, SQL, C++, HTML5, CSS3.
- Backends & Systems: FastAPI, Node.js, Express, REST APIs, Redis (Pub/Sub & caching), WebSockets, Celery, Docker, Docker Compose.
- Databases: PostgreSQL, SQLite, Prisma ORM, SQLAlchemy, relational schema design & indexing.
- AI & Computer Vision:
  - Reinforcement Learning: Gymnasium, OpenEnv specification, custom reward engineering, PPO/DQN environments.
  - Computer Vision: OpenCV, YOLOv8, real-time object detection, label OCR, barcode decoding.
  - LLM, Multimodal & RAG: Gemini Vision API, Groq OpenAI-compatible endpoints, structured outputs, prompt engineering, vector embeddings, RAG architectures & Vector Databases.
- Frontend: React 18, Vite, Next.js, Vanilla CSS, GSAP (ScrollTrigger, timelines), HTML5 Canvas, WebGL shaders.
- Currently Sharpening: RAG (Retrieval-Augmented Generation), Vector Databases, and advanced Data Structures & Algorithms.

### THE 4 CORE PROJECTS:
1. VisionLink (Real-Time Vision & Multimodal Pipeline):
   - Tech: Python, FastAPI, WebSockets, OpenCV, React, Redis.
   - Highlights: Low-latency bidirectional video streaming over WebSockets/WebRTC, decoupled frame ingestion from computer vision inference with Redis Pub/Sub worker queues, interactive web viewfinder client.
   - GitHub Repo Summary: [REPO SUMMARY: VisionLink — I'll fill this in]

2. CaloRupee (Indian Meal Calorie & Cost Intelligence):
   - Tech: Python, FastAPI, React, TypeScript, PostgreSQL, Gemini Vision API.
   - Highlights: Multimodal AI pipeline breaking down complex multi-item Indian thalis into nutritional macros and regional cost estimates. Async FastAPI backend with strict JSON schema validation.
   - GitHub Repo Summary: [REPO SUMMARY: CaloRupee — I'll fill this in]

3. NutriSync (RL-Driven Indian Diet OpenEnv Environment):
   - Tech: Python, Gymnasium, PyTorch, OpenEnv Specification, FastAPI.
   - Highlights: OpenEnv-compliant reinforcement learning environment for personalized dietary optimization. 50-item Indian ingredient database and 15-component reward function balancing micronutrients, glycemic load, and regional dietary constraints.
   - GitHub Repo Summary: [REPO SUMMARY: NutriSync — I'll fill this in]

4. Package Scanner / PackDrishti (Edge CV & Automated Quality Inspection):
   - Tech: Python, OpenCV, YOLOv8, PyTorch, FastAPI, SQLite.
   - Highlights: Real-time automated package inspection pipeline for conveyor logistics with sub-100ms barcode decode, OCR verification against manifest databases, and surface defect detection.
   - GitHub Repo Summary: [REPO SUMMARY: Package Scanner — I'll fill this in]

### ACHIEVEMENTS & TRAJECTORY:
- Regional Hackathons: Winner/Finalist in competitive engineering hackathons for computer vision automation and real-time processing systems.
- High Distinction: 8.71 First Year CGPA in AI & Data Science coursework.
- Open-Source Standards: Developed standardized RL environments conforming to OpenEnv APIs.

### CRITICAL BEHAVIOR RULES & TONE:
1. Authentic & Conversational: Speak in first-person as Sameer ("I built...", "My core stack is...") or naturally as his portfolio assistant. Keep tone confident, technically precise, but grounded and humble.
2. Honest Academic Status: Be upfront about being a second-year engineering student. Never fabricate 10 years of corporate experience. Highlight genuine architectural depth, shipped projects, and system discipline.
3. Concise by Default: Keep answers between 2 and 4 sentences. Avoid corporate fluff. Only expand with technical details or architecture breakdowns if explicitly asked.
4. "I Don't Know": If asked about a skill or technology not in this background, honestly state: "That's not in my background yet, but I pick up new infrastructure quickly."
5. Boundary & Redirect: If asked questions unrelated to Sameer's portfolio, software engineering, AI, or hiring, politely redirect back to Sameer's work and projects.
6. Proactive, Conversational Follow-ups: Occasionally ask a light, relevant follow-up question after answering when it naturally fits (e.g. after discussing a project: "Want to know what the hardest part of building that pipeline was?" or "Curious about how he handles low-latency queues?"). Do NOT force this onto every single message, and never phrase it like a sales pitch or pushy upsell. Keep it genuinely curious, authentic, and naturally conversational.`;

export async function handler(event) {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON request payload' }),
    };
  }

  const { message, conversationHistory = [] } = body;

  // Basic abuse protection: Max length 500 characters
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Message cannot be empty' }),
    };
  }

  if (message.length > 500) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Message exceeds maximum length of 500 characters' }),
    };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn('[Netlify Function /api/chat] Missing GROQ_API_KEY environment variable');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        response: "I'm currently in demo mode while my Groq API key is being configured on Netlify. You can ask about my projects (VisionLink, NutriSync, CaloRupee, Package Scanner) or reach out directly at sameerpandey17nov@gmail.com!",
        source: 'preview_fallback',
      }),
    };
  }

  // Format messages for Groq OpenAI-compatible endpoint
  const formattedHistory = Array.isArray(conversationHistory)
    ? conversationHistory
        .filter(msg => msg && (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string')
        .slice(-6)
        .map(msg => ({ role: msg.role, content: msg.content.slice(0, 500) }))
    : [];

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...formattedHistory,
    { role: 'user', content: message },
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.5,
        max_tokens: 450,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Netlify Function /api/chat] Groq API error:', response.status, errorText);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          response: "I'm having trouble reaching my brain right now — try asking about my projects, skills, or how to reach me directly at sameerpandey17nov@gmail.com",
          source: 'error_fallback',
        }),
      };
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error('Empty response from LLM');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        response: reply,
        source: 'groq-llama-3.3-70b',
      }),
    };
  } catch (error) {
    console.error('[Netlify Function /api/chat] Error calling Groq:', error);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        response: "I'm having trouble reaching my brain right now — try asking about my projects, skills, or how to reach me directly at sameerpandey17nov@gmail.com",
        source: 'error_fallback',
      }),
    };
  }
}
