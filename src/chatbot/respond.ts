/**
 * Layer 1 Instant Matcher
 * Evaluates incoming questions against the Layer 1 knowledge base.
 * Employs normalized tokenization, exact phrase matching, and weighted keyword frequency.
 */

import { KNOWLEDGE_BASE, KnowledgeEntry } from './knowledge';

export interface Layer1MatchResult {
  matched: boolean;
  confidence: number;
  entry: KnowledgeEntry | null;
  answer: string | null;
  topic: string | null;
}

export const CONFIDENCE_THRESHOLD = 0.60;

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'do', 'does', 'did', 'have',
  'i', 'you', 'your', 'his', 'him', 'my', 'me', 'please', 'tell', 'show'
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

/**
 * Matches a user query against Layer 1 knowledge base.
 * Returns instant answer if confidence exceeds threshold, or signals Layer 2 LLM fallback.
 */
export function matchLayer1(query: string): Layer1MatchResult {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return {
      matched: false,
      confidence: 0,
      entry: null,
      answer: null,
      topic: null,
    };
  }

  const rawNormalized = normalizeText(query);
  const queryTokens = tokenize(query);

  let bestMatch: KnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    // 1. Exact phrase or substring match (high confidence)
    for (const phrase of entry.phrases) {
      const normalizedPhrase = normalizeText(phrase);
      if (rawNormalized === normalizedPhrase) {
        score = Math.max(score, 0.98);
        break;
      }
      if (rawNormalized.includes(normalizedPhrase) || normalizedPhrase.includes(rawNormalized)) {
        score = Math.max(score, 0.85);
      }
    }

    // 2. High-value specific entity match (e.g. project names)
    const entityMatches = ['visionlink', 'calorupee', 'nutrisync', 'packdrishti', 'drishti'];
    for (const entity of entityMatches) {
      if (rawNormalized.includes(entity) && entry.id.includes(entity)) {
        score = Math.max(score, 0.92);
      }
    }

    // 3. Keyword overlap scoring
    if (queryTokens.length > 0) {
      let matchedKeywordCount = 0;
      for (const token of queryTokens) {
        if (entry.keywords.some(k => k === token || token.includes(k) || k.includes(token))) {
          matchedKeywordCount += 1;
        }
      }

      const keywordRatio = matchedKeywordCount / Math.max(1, queryTokens.length);
      const densityScore = Math.min(1.0, keywordRatio * 0.85);
      score = Math.max(score, densityScore);
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore >= CONFIDENCE_THRESHOLD) {
    return {
      matched: true,
      confidence: Math.round(highestScore * 100) / 100,
      entry: bestMatch,
      answer: bestMatch.answer,
      topic: bestMatch.topic,
    };
  }

  return {
    matched: false,
    confidence: Math.round(highestScore * 100) / 100,
    entry: null,
    answer: null,
    topic: null,
  };
}
