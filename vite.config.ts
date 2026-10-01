import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { SYSTEM_PROMPT } from './src/chatbot/context';

function localChatApiPlugin() {
  return {
    name: 'local-chat-api',
    configureServer(server: any) {
      server.middlewares.use('/api/chat', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const { message, conversationHistory = [] } = parsed;
            const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
            const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                response: "I'm currently in local preview mode without a configured GROQ_API_KEY. Once deployed to Netlify or Vercel (or when GROQ_API_KEY is placed in .env), I will run on Groq Llama 3.3 70B! Feel free to test Layer 1 instant questions like 'What is his tech stack?', 'Tell me about AIVOA', or 'Pineapple on pizza?'.",
                source: 'preview_fallback',
              }));
              return;
            }

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                  {
                    role: 'system',
                    content: SYSTEM_PROMPT,
                  },
                  ...(Array.isArray(conversationHistory) ? conversationHistory.slice(-4) : []),
                  { role: 'user', content: message },
                ],
                temperature: 0.5,
                max_tokens: 450,
              }),
            });

            if (!response.ok) throw new Error('Groq upstream error');
            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content?.trim();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ response: reply || 'Ready to assist!', source: 'groq-llama-3.3-70b' }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              response: "I'm having trouble reaching my brain right now — try asking about my projects, skills, or how to reach me directly at sameerpandey17nov@gmail.com",
              source: 'error_fallback',
            }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localChatApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(__dirname),
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
    host: 'localhost',
  },
});
