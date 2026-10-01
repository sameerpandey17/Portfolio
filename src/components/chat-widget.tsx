import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, ChatMessage } from '../chatbot/client';

const SUGGESTED_CHIPS = [
  { label: "What's his tech stack?", tier: 'Layer 1' },
  { label: 'Tell me about AIVOA', tier: 'Layer 1' },
  { label: 'Why should I hire Sameer?', tier: 'Layer 1' },
  { label: 'Pineapple on pizza?', tier: 'Layer 1' },
  { label: 'What is your villain origin story?', tier: 'Layer 1' },
  { label: 'How does he design low-latency pipelines?', tier: 'Layer 1' },
];

const INITIAL_GREETING: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey, I can tell you about Sameer's projects, skills, or what he's looking for next. What are you curious about?",
  source: 'system',
  timestamp: Date.now(),
};

// In-memory same-session storage: preserves conversation and input for the current page session
// Survives open/close toggles, scroll auto-closes, and component re-renders. Clears on tab close / hard refresh.
const sessionChatState = {
  messages: [INITIAL_GREETING] as ChatMessage[],
  input: '',
  scrollTop: 0,
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(() => sessionChatState.input);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => sessionChatState.messages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const openScrollYRef = useRef<number>(0);
  const openTimeRef = useRef<number>(0);
  const isTypingRef = useRef<boolean>(false);
  isTypingRef.current = isTyping;
  const isPointerInsideChatRef = useRef<boolean>(false);

  // Sync to in-memory session cache
  useEffect(() => {
    sessionChatState.messages = messages;
  }, [messages]);

  useEffect(() => {
    sessionChatState.input = input;
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChatBodyScroll = () => {
    if (chatBodyRef.current) {
      sessionChatState.scrollTop = chatBodyRef.current.scrollTop;
    }
  };

  // Scroll-aware auto-close:
  // If the chat panel is OPEN and the user scrolls the page (in either direction past a threshold),
  // automatically collapse back to the launcher while preserving exact conversation state in memory.
  // NEVER close if the user's cursor or touch is actively inside the chatbot window.
  useEffect(() => {
    if (!isOpen) return;

    openScrollYRef.current = window.scrollY;
    openTimeRef.current = Date.now();

    const handleWindowScroll = () => {
      // If user's pointer/touch is inside the chat window, they are actively reading or scrolling the chat!
      if (isPointerInsideChatRef.current) {
        openScrollYRef.current = window.scrollY;
        return;
      }

      // Grace period: ignore scrolls in first 350ms after opening
      if (Date.now() - openTimeRef.current < 350) return;

      // Do not interrupt while an LLM answer is actively generating
      if (isTypingRef.current) return;

      const delta = Math.abs(window.scrollY - openScrollYRef.current);
      // Threshold (50px) prevents minor touch bounce or incidental micro-scrolls from closing
      if (delta > 50) {
        if (chatBodyRef.current) {
          sessionChatState.scrollTop = chatBodyRef.current.scrollTop;
        }
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [isOpen]);

  // Listen to open-sameer-chat event dispatched by watermark cover button or nav links
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-sameer-chat', handleOpen);
    return () => window.removeEventListener('open-sameer-chat', handleOpen);
  }, []);

  // Keyboard navigation: Close on Escape (preserves state)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (chatBodyRef.current) {
          sessionChatState.scrollTop = chatBodyRef.current.scrollTop;
        }
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Restore scroll position or scroll to bottom when opening
  useEffect(() => {
    if (isOpen) {
      if (sessionChatState.scrollTop > 0 && chatBodyRef.current) {
        chatBodyRef.current.scrollTop = sessionChatState.scrollTop;
      } else {
        scrollToBottom();
      }
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && messages.length > 1) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const result = await sendChatMessage(query, messages);
      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: result.content,
        source: result.source,
        confidence: result.confidence,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble reaching my brain right now — try asking about my projects, skills, or how to reach me directly at sameerpandey17nov@gmail.com",
        source: 'fallback',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  const handleResetChat = () => {
    const refreshedGreeting: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: "Conversation refreshed. I can walk you through any of Sameer's 4 core projects, his technical stack, or his background. What would you like to explore?",
      source: 'system',
      timestamp: Date.now(),
    };
    sessionChatState.scrollTop = 0;
    sessionChatState.input = '';
    setInput('');
    setMessages([refreshedGreeting]);
  };

  return (
    <aside className={`sp-chat-root ${isOpen ? 'is-open' : ''}`} aria-label="Portfolio AI Chat Assistant">
      {/* ── FLOATING TRIGGER BUTTON (MINIMAL ICON-ONLY LAUNCHER) ── */}
      <button
        type="button"
        className={`sp-chat-trigger ${isOpen ? 'is-active' : ''}`}
        onClick={() => {
          if (isOpen && chatBodyRef.current) {
            sessionChatState.scrollTop = chatBodyRef.current.scrollTop;
          }
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-controls="sp-chat-window"
        aria-label={isOpen ? "Close AI chat assistant" : "Chat with me about my work"}
      >
        <div className="chat-trigger-icon-wrap">
          {isOpen ? (
            <svg className="chat-close-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <div className="chat-trigger-bot-wrapper">
              <img
                src="/assets/chatbot-avatar.webp"
                alt=""
                className="chat-trigger-bot-img"
              />
              <span className="chat-trigger-status-dot" aria-hidden="true" />
            </div>
          )}
        </div>
        {!isOpen && (
          <span className="chat-trigger-tooltip" role="tooltip">
            Chat with me
          </span>
        )}
      </button>

      {/* ── CHAT MODAL / DRAWER WINDOW ── */}
      {isOpen && (
        <div
          className="sp-chat-window"
          id="sp-chat-window"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-heading"
          onMouseEnter={() => { isPointerInsideChatRef.current = true; }}
          onMouseLeave={() => { isPointerInsideChatRef.current = false; }}
          onTouchStart={() => { isPointerInsideChatRef.current = true; }}
          onTouchEnd={() => { isPointerInsideChatRef.current = false; }}
        >
          {/* Header */}
          <div className="sp-chat-header">
            <div className="sp-chat-header-brand">
              <div className="sp-chat-avatar-container">
                <img
                  src="/assets/chatbot-avatar.webp"
                  alt="Sameer AI Robot Logo"
                  className="sp-chat-header-avatar"
                />
                <span className="chat-status-dot" aria-hidden="true" />
              </div>
              <div className="sp-chat-header-titles">
                <div className="sp-chat-title-row">
                  <h3 className="sp-chat-title" id="chat-heading">Sameer AI Brain</h3>
                  <span className="sp-chat-version-tag">Llama 3.3 70B</span>
                </div>
                <div className="sp-chat-subtitle">
                  <span>Layer 1 Instant · Groq LLM Fallback</span>
                </div>
              </div>
            </div>

            <div className="sp-chat-header-actions">
              <button
                type="button"
                className="sp-chat-header-btn btn-reset"
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                type="button"
                className="sp-chat-header-btn btn-close"
                onClick={() => {
                  if (chatBodyRef.current) {
                    sessionChatState.scrollTop = chatBodyRef.current.scrollTop;
                  }
                  setIsOpen(false);
                }}
                title="Close chat (Esc)"
                aria-label="Close chat window"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="sp-chat-body" ref={chatBodyRef} data-lenis-prevent onScroll={handleChatBodyScroll}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`sp-chat-message-row msg-${msg.role}`}
              >
                {msg.role === 'assistant' && (
                  <div className="msg-avatar" aria-hidden="true">
                    <img
                      src="/assets/chatbot-avatar.webp"
                      alt=""
                      className="msg-avatar-img"
                    />
                  </div>
                )}
                <div className="msg-content-wrapper">
                  <div className="msg-bubble">
                    <p className="msg-text">{msg.content}</p>
                  </div>

                  {/* Metadata source badges & copy button */}
                  <div className="msg-meta-row">
                    {msg.source && msg.source !== 'system' && (
                      <div className="msg-source-badges">
                        {msg.source === 'instant' && (
                          <span className="source-badge badge-instant" title="Resolved in under 200ms via Layer 1 knowledge base">
                            ⚡ Instant Q&A
                          </span>
                        )}
                        {msg.source === 'llm' && (
                          <span className="source-badge badge-llm" title="Generated server-side via Groq Llama 3.3 70B">
                            🧠 Groq Llama-3.3
                          </span>
                        )}
                        {msg.source === 'fallback' && (
                          <span className="source-badge badge-fallback" title="Fail-safe fallback response">
                            🛡️ Offline Safe
                          </span>
                        )}
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.source !== 'system' && (
                      <button
                        type="button"
                        className="msg-copy-btn"
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        title="Copy answer to clipboard"
                        aria-label="Copy answer"
                      >
                        {copiedId === msg.id ? '✓ Copied' : 'Copy'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="sp-chat-message-row msg-assistant msg-typing">
                <div className="msg-avatar" aria-hidden="true">
                  <img
                    src="/assets/chatbot-avatar.webp"
                    alt=""
                    className="msg-avatar-img"
                  />
                </div>
                <div className="msg-bubble typing-bubble">
                  <div className="typing-dots-anim">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                  <span className="typing-hint">Consulting Sameer's brain...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="sp-chat-chips-tray" aria-label="Suggested quick inquiries">
            <div className="chips-tray-head">
              <span className="chips-tray-label">Quick Inquiries</span>
              <span className="chips-tray-sub">Layer 1 (⚡) & Layer 2 (🧠)</span>
            </div>
            <div className="chips-list">
              {SUGGESTED_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className={`chat-chip ${chip.tier === 'Layer 1' ? 'chip-instant' : 'chip-llm'}`}
                  onClick={() => handleSend(chip.label)}
                  disabled={isTyping}
                >
                  <span className="chip-tier-tag">{chip.tier === 'Layer 1' ? '⚡' : '🧠'}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <div className="sp-chat-footer">
            <div className="chat-input-wrapper">
              <textarea
                ref={inputRef}
                className="chat-textarea"
                rows={1}
                placeholder="Ask about projects, architecture, tech stack..."
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                aria-label="Ask a question"
              />
              <button
                type="button"
                className="chat-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="chat-footer-note">
              <span className={`char-counter ${input.length > 450 ? 'is-warning' : ''}`}>
                {input.length}/500
              </span>
              <span className="kbd-hint">Press Enter ↵ to send</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
