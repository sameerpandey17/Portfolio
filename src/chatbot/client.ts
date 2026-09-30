/**
 * Chatbot Client Orchestrator
 * Coordinates Layer 1 (Instant Matcher) and Layer 2 (Groq Serverless Fallback).
 * Implements client-side session rate limiting and input truncation.
 */

import { matchLayer1, Layer1MatchResult } from './respond';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: 'instant' | 'llm' | 'fallback' | 'system';
  confidence?: number;
  timestamp: number;
}

export interface ChatResponse {
  content: string;
  source: 'instant' | 'llm' | 'fallback';
  confidence?: number;
}

const MAX_INPUT_LENGTH = 500;
const RATE_LIMIT_COUNT = 15;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Checks and updates per-session rate limiting in sessionStorage.
 * Allows maximum 15 messages per 10-minute window per browser session.
 */
function checkRateLimit(): { allowed: boolean; remaining: number; resetMinutes: number } {
  try {
    const key = 'sp_chat_timestamps';
    const now = Date.now();
    const stored = sessionStorage.getItem(key);
    const timestamps: number[] = stored ? JSON.parse(stored) : [];

    // Filter to timestamps within the last 10 minutes
    const valid = timestamps.filter(t => (now - t) < RATE_LIMIT_WINDOW_MS);

    if (valid.length >= RATE_LIMIT_COUNT) {
      const oldest = valid[0];
      const resetMinutes = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 60000));
      return { allowed: false, remaining: 0, resetMinutes };
    }

    valid.push(now);
    sessionStorage.setItem(key, JSON.stringify(valid));
    return {
      allowed: true,
      remaining: RATE_LIMIT_COUNT - valid.length,
      resetMinutes: 10,
    };
  } catch {
    // If sessionStorage is restricted or disabled, allow gracefully
    return { allowed: true, remaining: 10, resetMinutes: 10 };
  }
}

/**
 * Main query dispatcher:
 * 1. Checks Layer 1 instant matcher. If confident, resolves instantly with simulated light feel delay.
 * 2. If below threshold, verifies session rate limits and dispatches to serverless /api/chat.
 * 3. Gracefully degrades to static fail-safe message if offline or provider error.
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  const trimmed = message.trim();
  if (!trimmed) {
    return {
      content: "Please enter a question about Sameer's projects, skills, or background.",
      source: 'fallback',
    };
  }

  // 1. Truncate input length to prevent spam
  const sanitizedInput = trimmed.slice(0, MAX_INPUT_LENGTH);

  // 2. LAYER 1: Instant Placeholder Q&A
  const layer1Result: Layer1MatchResult = matchLayer1(sanitizedInput);

  if (layer1Result.matched && layer1Result.answer) {
    // Simulated subtle human-feel delay (150-250ms) so it feels fluid rather than jarring
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      content: layer1Result.answer,
      source: 'instant',
      confidence: layer1Result.confidence,
    };
  }

  // 3. LAYER 2: LLM Fallback (Groq Serverless API)
  // Check rate limit before dispatching network request
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      content: `Session rate limit reached (${RATE_LIMIT_COUNT} queries per 10 minutes). Please take a quick breath or email me directly at sameerpandey17nov@gmail.com!`,
      source: 'fallback',
    };
  }

  // Format conversation history for context continuity (last 4 turns)
  const conversationHistory = history
    .filter(m => m.source !== 'fallback')
    .slice(-4)
    .map(m => ({ role: m.role, content: m.content }));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: sanitizedInput,
        conversationHistory,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    if (data.response) {
      return {
        content: data.response,
        source: data.source === 'groq-llama-3.3-70b' ? 'llm' : 'fallback',
      };
    }

    throw new Error('Invalid response payload');
  } catch (error) {
    console.warn('[Chatbot Client] Layer 2 LLM call failed, falling back:', error);
    return {
      content: "I'm having trouble reaching my brain right now — try asking about my projects, skills, or how to reach me directly at sameerpandey17nov@gmail.com",
      source: 'fallback',
    };
  }
}
