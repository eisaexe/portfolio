import { useState, useRef, useEffect, useCallback } from 'react';
import { knowledgeBase } from '../data/resumeData';

const SUGGESTIONS = [
  "Tell me about Python skills",
  "What's your experience with RAG?",
  "Which LLMs have you worked with?",
  "Tell me about your projects",
];

function query(input) {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(kw => lower.includes(kw.toLowerCase()))) return entry;
  }
  return {
    answer: "Great question! Ask me about Mohammed's skills (Python, RAG, LLMs, MCP), projects (IDP, Fraud Dashboard, Travel App), or experience at SLK Software.",
    effect: null,
  };
}

// ── Animated Robot SVG ────────────────────────────────────────────────────────
function RobotIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="16" y1="2" x2="16" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="2" r="1.5" fill="#00eeff"/>
      {/* Head */}
      <rect x="7" y="7" width="18" height="13" rx="3" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.4"/>
      {/* Eyes */}
      <circle cx="12" cy="13" r="2.2" fill="#00eeff" opacity="0.9"/>
      <circle cx="20" cy="13" r="2.2" fill="#00eeff" opacity="0.9"/>
      <circle cx="12.7" cy="12.3" r="0.7" fill="white"/>
      <circle cx="20.7" cy="12.3" r="0.7" fill="white"/>
      {/* Mouth */}
      <path d="M12 17.5 Q16 19.5 20 17.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* Neck */}
      <rect x="14" y="20" width="4" height="2.5" rx="1" fill="rgba(255,255,255,0.4)"/>
      {/* Body */}
      <rect x="9" y="22.5" width="14" height="8" rx="2.5" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.3"/>
      {/* Body buttons */}
      <circle cx="13" cy="26.5" r="1.2" fill="#7c5cfc" opacity="0.8"/>
      <circle cx="16" cy="26.5" r="1.2" fill="#00eeff" opacity="0.8"/>
      <circle cx="19" cy="26.5" r="1.2" fill="#00ffaa" opacity="0.8"/>
    </svg>
  );
}

export default function ChatBot({ onParticleEffect }) {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState([
    { role: 'ai', text: "👋 Hi! I'm Mo-Bot. Ask me anything about Mohammed's AI projects, Python skills, or experience!" }
  ]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const [showSugg, setShowSugg] = useState(true);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const bottomRef               = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  // Hide bubble after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setBubbleVisible(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const send = useCallback((text) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs(p => [...p, { role: 'user', text: t }]);
    setInput('');
    setShowSugg(false);
    setTyping(true);
    setTimeout(() => {
      const { answer, effect } = query(t);
      setMsgs(p => [...p, { role: 'ai', text: answer }]);
      setTyping(false);
      if (effect) onParticleEffect(effect);
    }, 600 + Math.random() * 400);
  }, [input, onParticleEffect]);

  return (
    <>
      {/* Floating launcher with bubble */}
      <div className="chat-launcher-wrap">
        {/* Prompt bubble */}
        {!open && bubbleVisible && (
          <div className="chat-prompt-bubble" onClick={() => { setOpen(true); setBubbleVisible(false); }}>
            <span>💬 Talk to my Resume!</span>
            <div className="chat-bubble-tail" />
          </div>
        )}

        {/* Robot button */}
        <button
          className={`chat-bubble-btn ${open ? 'chat-btn-open' : ''}`}
          onClick={() => { setOpen(o => !o); setBubbleVisible(false); }}
          title={open ? 'Close' : 'Chat with Mo-Bot'}
          aria-label="Toggle chatbot"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <div className="robot-wrap">
              <RobotIcon size={30} />
              <span className="robot-glow-dot" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${open ? '' : 'closed'}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar">
            <RobotIcon size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="chat-header-name">Mo-Bot</p>
            <p className="chat-header-sub">AI · Mohammed Eisa's Resume</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="online-dot" />
            <span className="online-label">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
          ))}
          {typing && (
            <div className="chat-msg ai chat-typing">
              {[0, 150, 300].map(delay => (
                <span
                  key={delay}
                  className="typing-dot"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}
          {showSugg && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="chat-suggestion-btn" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-bar">
          <div className="chat-input-wrap">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send(); } }}
              placeholder="Ask about skills, projects…"
              className="chat-input"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="chat-send-btn"
              style={{
                background: input.trim() ? 'linear-gradient(135deg,#00eeff,#7c5cfc)' : 'rgba(255,255,255,0.06)',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="m22 2-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
