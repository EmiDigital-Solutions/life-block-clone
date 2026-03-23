import { useState, useRef, useEffect, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .audit-root {
    font-family: 'DM Sans', sans-serif;
    background: #0f1117;
    color: #f1f5f9;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; height: 40px; background: #161b26;
    border-bottom: 1px solid #2a3145; flex-shrink: 0;
  }
  .live-badge {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    color: #2dd4bf; text-transform: uppercase;
  }
  .live-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #2dd4bf; box-shadow: 0 0 6px #2dd4bf;
    animation: audit-pulse 2s infinite;
  }
  @keyframes audit-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .header-title { font-size: 13px; font-weight: 600; color: #f1f5f9; letter-spacing: 0.02em; }
  .header-title span { color: #94a3b8; font-weight: 400; }
  .progress-wrap { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #94a3b8; }
  .progress-bar { width: 80px; height: 4px; background: #1c2333; border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; background: #2dd4bf; border-radius: 2px; width: 45%; }

  .body { display: grid; grid-template-columns: 220px 1fr 240px; flex: 1; overflow: hidden; }
  @media (min-width: 1200px) {
    .body { grid-template-columns: 260px 1fr 280px; }
  }
  @media (max-width: 900px) {
    .body { grid-template-columns: 200px 1fr 220px; }
  }
  @media (max-width: 700px) {
    .body { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }
    .left-panel { display: none; }
    .right-panel { max-height: 200px; border-left: none; border-top: 1px solid #2a3145; }
  }

  .left-panel { background: #161b26; border-right: 1px solid #2a3145; display: flex; flex-direction: column; overflow: hidden; }
  .panel-section { padding: 14px 16px 10px; border-bottom: 1px solid #2a3145; }
  .panel-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: #4b5675; text-transform: uppercase; margin-bottom: 2px; }
  .panel-sublabel { font-size: 11px; color: #94a3b8; }
  .checklist-scroll { flex: 1; overflow-y: auto; padding: 10px 0; }
  .checklist-scroll::-webkit-scrollbar { width: 3px; }
  .checklist-scroll::-webkit-scrollbar-track { background: transparent; }
  .checklist-scroll::-webkit-scrollbar-thumb { background: #2a3145; border-radius: 2px; }

  .section-header {
    display: flex; align-items: center; gap: 6px; padding: 5px 16px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
    color: #2dd4bf; text-transform: uppercase; cursor: pointer;
  }
  .section-header svg { opacity: 0.7; }

  .checklist-item {
    display: flex; align-items: flex-start; gap: 8px;
    padding: 5px 16px 5px 28px; font-size: 12px; color: #94a3b8;
    cursor: pointer; transition: background 0.15s; position: relative;
  }
  .checklist-item:hover { background: #212840; }
  .checklist-item.active { background: rgba(45,212,191,0.15); color: #f1f5f9; }
  .checklist-item.active::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: #2dd4bf;
  }
  .checklist-item.sub { padding-left: 40px; }

  .check-icon {
    width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid #2a3145;
    flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center;
  }
  .check-icon.done { background: #2dd4bf; border-color: #2dd4bf; }
  .risk-dot { width: 7px; height: 7px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 5px #ef4444; flex-shrink: 0; margin-top: 4px; }
  .high-risk-badge {
    display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.06em;
    background: #3d1515; color: #ef4444; border: 1px solid rgba(239,68,68,0.3);
    padding: 1px 6px; border-radius: 3px; margin-top: 3px; text-transform: uppercase;
  }

  .evidence-panel { border-top: 1px solid #2a3145; padding: 12px 16px; flex-shrink: 0; }
  .evidence-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .evidence-count { font-size: 11px; font-weight: 600; }
  .evidence-count.ok { color: #2dd4bf; }
  .evidence-file {
    display: flex; align-items: center; justify-content: space-between;
    padding: 5px 0; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #2a3145;
  }
  .evidence-file:last-child { border-bottom: none; }
  .file-name { display: flex; align-items: center; gap: 6px; overflow: hidden; }
  .file-name span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 130px; }
  .file-icon {
    width: 16px; height: 16px; background: #1c2333; border-radius: 2px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 8px; color: #4b5675; font-family: 'IBM Plex Mono', monospace;
  }
  .status-badge { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 3px; flex-shrink: 0; }
  .status-badge.verified { background: #14532d; color: #22c55e; }
  .status-badge.review { background: rgba(245,158,11,0.15); color: #f59e0b; }
  .action-row { display: flex; gap: 8px; margin-top: 10px; }
  .btn-secondary {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
    padding: 7px; background: #1c2333; border: 1px solid #2a3145; border-radius: 6px;
    font-size: 12px; font-family: 'DM Sans', sans-serif; color: #94a3b8; cursor: pointer; transition: all 0.15s;
  }
  .btn-secondary:hover { border-color: #2dd4bf; color: #f1f5f9; }

  .center-panel { display: flex; flex-direction: column; overflow: hidden; background: #0f1117; }
  .question-area { padding: 14px 18px 12px; border-bottom: 1px solid #2a3145; flex-shrink: 0; }
  .question-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .question-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: #4b5675; text-transform: uppercase; }
  .question-actions { display: flex; gap: 6px; }
  .icon-btn {
    width: 28px; height: 28px; background: #1c2333; border: 1px solid #2a3145; border-radius: 5px;
    display: flex; align-items: center; justify-content: center; cursor: pointer; color: #4b5675; transition: all 0.15s;
  }
  .icon-btn:hover { border-color: #2dd4bf; color: #2dd4bf; }
  .question-text { font-size: 16px; font-weight: 600; line-height: 1.4; color: #f1f5f9; letter-spacing: -0.01em; }

  .center-scroll { flex: 1; overflow-y: auto; padding: 14px 18px; }
  .center-scroll::-webkit-scrollbar { width: 3px; }
  .center-scroll::-webkit-scrollbar-thumb { background: #2a3145; border-radius: 2px; }

  .risk-alert-box {
    background: #3d1515; border: 1px solid rgba(239,68,68,0.35);
    border-radius: 8px; padding: 14px 16px; margin-bottom: 16px;
  }
  .risk-alert-title { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #ef4444; text-transform: uppercase; margin-bottom: 8px; }
  .risk-alert-text { font-size: 12px; color: #fca5a5; line-height: 1.6; }

  .guidance-block {
    background: #1c2333; border: 1px solid #2a3145; border-radius: 8px; padding: 14px 16px; margin-bottom: 14px;
  }
  .guidance-title { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: #4b5675; text-transform: uppercase; margin-bottom: 10px; }
  .check-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .check-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #94a3b8; }
  .check-num {
    width: 18px; height: 18px; border-radius: 50%; background: #212840; border: 1px solid #2a3145;
    font-size: 10px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; color: #2dd4bf;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
  }
  .issue-list { display: flex; flex-direction: column; gap: 6px; }
  .issue-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #94a3b8; }
  .issue-dot { width: 6px; height: 6px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  .guidance-section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: #4b5675; text-transform: uppercase; margin-bottom: 12px; }
  .section-divider { height: 1px; background: #2a3145; margin: 20px 0 16px; }

  .score-block { background: #1c2333; border: 1px solid #2a3145; border-radius: 8px; padding: 16px; margin-bottom: 14px; }
  .score-block-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
  .ai-suggests-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #2dd4bf; text-transform: uppercase; }
  .ai-dot { width: 7px; height: 7px; border-radius: 50%; background: #2dd4bf; }
  .score-row { display: flex; gap: 8px; margin-bottom: 8px; }
  .score-btn {
    flex: 1; height: 38px; border-radius: 6px; border: 1.5px solid #2a3145; background: #212840;
    color: #4b5675; font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all 0.15s;
  }
  .score-btn:hover { border-color: #2dd4bf; color: #f1f5f9; }
  .score-btn.ai-pick { background: #2dd4bf; border-color: #2dd4bf; color: #0f1117; }
  .score-btn.user-pick { background: #1c2333; border-color: #94a3b8; color: #f1f5f9; box-shadow: 0 0 0 2px rgba(241,245,249,0.15); }
  .score-hint { font-size: 11px; color: #4b5675; margin-top: 4px; font-style: italic; }
  .override-notice { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #f59e0b; margin-top: 6px; }
  .your-assessment-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: #4b5675; text-transform: uppercase; margin-bottom: 12px; }

  .findings-input {
    width: 100%; background: #212840; border: 1px solid #2a3145; border-radius: 6px;
    padding: 10px 12px; font-size: 12px; font-family: 'DM Sans', sans-serif; color: #f1f5f9;
    resize: none; height: 70px; outline: none; transition: border-color 0.15s; margin-top: 12px;
  }
  .findings-input:focus { border-color: #2dd4bf; }
  .findings-input::placeholder { color: #4b5675; }

  .submit-btn {
    width: 100%; padding: 12px; background: #2dd4bf; border: none; border-radius: 7px;
    font-size: 13px; font-weight: 700; font-family: 'DM Sans', sans-serif; color: #0f1117;
    cursor: pointer; letter-spacing: 0.02em; transition: all 0.15s; margin-top: 14px;
  }
  .submit-btn:hover { background: #5eead4; transform: translateY(-1px); }

  .bottom-bar {
    padding: 10px 24px; border-top: 1px solid #2a3145; display: flex; align-items: center; gap: 10px;
    flex-shrink: 0; background: #161b26;
  }
  .bottom-input {
    flex: 1; background: #1c2333; border: 1px solid #2a3145; border-radius: 7px;
    padding: 8px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: #f1f5f9;
    outline: none; transition: border-color 0.15s;
  }
  .bottom-input:focus { border-color: #2dd4bf; }
  .bottom-input::placeholder { color: #4b5675; }
  .mic-btn {
    width: 34px; height: 34px; background: #1c2333; border: 1px solid #2a3145; border-radius: 7px;
    display: flex; align-items: center; justify-content: center; cursor: pointer; color: #4b5675; transition: all 0.15s;
  }
  .mic-btn:hover { border-color: #2dd4bf; color: #2dd4bf; }
  .send-btn {
    width: 34px; height: 34px; background: #2dd4bf; border: none; border-radius: 7px;
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s;
  }
  .send-btn:hover { background: #5eead4; }

  .right-panel {
    background: #161b26; border-left: 1px solid #2a3145; display: flex; flex-direction: column;
    overflow-y: auto; padding: 16px; gap: 14px;
  }
  .right-panel::-webkit-scrollbar { width: 3px; }
  .right-panel::-webkit-scrollbar-thumb { background: #2a3145; }
  .copilot-header { display: flex; align-items: center; justify-content: space-between; }
  .copilot-title { font-size: 12px; font-weight: 700; color: #f1f5f9; letter-spacing: 0.03em; }

  .flagged-issues { display: flex; flex-direction: column; gap: 6px; }
  .flag-item {
    display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #1c2333;
    border: 1px solid #2a3145; border-radius: 6px; font-size: 12px; color: #94a3b8;
    transition: background 0.15s; cursor: pointer;
  }
  .flag-item:hover { background: #212840; }
  .flag-num {
    width: 18px; height: 18px; border-radius: 4px; font-size: 10px; font-weight: 700;
    font-family: 'IBM Plex Mono', monospace; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .flag-num.n1 { background: rgba(239,68,68,0.2); color: #ef4444; }
  .flag-num.n2 { background: rgba(245,158,11,0.2); color: #f59e0b; }
  .flag-num.n3 { background: rgba(148,163,184,0.1); color: #94a3b8; }

  .benchmark-card { background: #1c2333; border: 1px solid #2a3145; border-radius: 8px; padding: 14px; }
  .benchmark-title { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: #4b5675; text-transform: uppercase; margin-bottom: 12px; }
  .benchmark-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .benchmark-name { font-size: 12px; color: #94a3b8; }
  .benchmark-score { font-size: 13px; font-weight: 700; font-family: 'IBM Plex Mono', monospace; color: #f1f5f9; }
  .bm-bar { height: 4px; border-radius: 2px; margin-bottom: 10px; }
  .bm-bar.good { background: #2dd4bf; }
  .bm-bar.low { background: #475569; }
  .benchmark-verdict { font-size: 11px; font-weight: 600; color: #ef4444; padding-top: 6px; border-top: 1px solid #2a3145; }
  .benchmark-context { font-size: 10px; color: #4b5675; margin-top: 4px; font-family: 'IBM Plex Mono', monospace; }

  .ai-finding-card { background: #1c2333; border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 14px; }
  .ai-finding-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #f1f5f9; margin-bottom: 10px; }
  .ai-finding-text { font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 12px; }
  .finding-actions { display: flex; gap: 8px; }
  .btn-accept {
    flex: 1; padding: 8px; background: #1a7a6e; border: 1px solid #2dd4bf; border-radius: 5px;
    color: #2dd4bf; font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
    font-family: 'DM Sans', sans-serif; text-transform: uppercase; cursor: pointer; transition: all 0.15s;
  }
  .btn-accept:hover { background: #2dd4bf; color: #0f1117; }
  .btn-dismiss {
    flex: 1; padding: 8px; background: transparent; border: 1px solid #2a3145; border-radius: 5px;
    color: #4b5675; font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
    font-family: 'DM Sans', sans-serif; text-transform: uppercase; cursor: pointer; transition: all 0.15s;
  }
  .btn-dismiss:hover { border-color: #94a3b8; color: #94a3b8; }
  .divider { height: 1px; background: #2a3145; }
`;

const CheckIconComp = ({ done }: { done?: boolean }) => (
  <div className={`check-icon ${done ? "done" : ""}`}>
    {done && (
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5L3.5 6L8 1" stroke="#0f1117" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
);

const MicIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const SpeakerIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const ImgIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const PaperclipIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const CaptureIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

type ChatMsg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

const AtlasLiveAudit = () => {
  const [userScore, setUserScore] = useState<number | null>(null);
  const aiScore = 3;
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const evidenceFiles = [
    { name: "molding_cell_overview.jpg", type: "jpg", status: "verified" },
    { name: "cpk_report_air_vent.pdf", type: "pdf", status: "review" },
    { name: "cavity_pressure_chart.jpg", type: "jpg", status: "verified" },
    { name: "color_delta_e_report.pdf", type: "pdf", status: "verified" },
    { name: "pp_t20_material_cert.pdf", type: "pdf", status: "verified" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChat = useCallback(async () => {
    const text = chatInput.trim();
    if (!text || isStreaming) return;
    setChatInput("");
    const userMsg: ChatMsg = { role: "user", content: text };
    const allMessages = [...chatMessages, userMsg];
    setChatMessages(allMessages);
    setIsStreaming(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({ error: "Request failed" }));
        setChatMessages(prev => [...prev, { role: "assistant", content: `⚠ ${errData.error || "Error occurred"}` }]);
        setIsStreaming(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const upsert = (chunk: string) => {
        assistantSoFar += chunk;
        const content = assistantSoFar;
        setChatMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && prev.length > allMessages.length) {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content } : m);
          }
          return [...prev, { role: "assistant", content }];
        });
      };

      let done = false;
      while (!done) {
        const { done: readerDone, value } = await reader.read();
        if (readerDone) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch { /* partial chunk */ }
        }
      }

      // If no content was streamed, show fallback
      if (!assistantSoFar) {
        setChatMessages(prev => [...prev, { role: "assistant", content: "No response generated." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages(prev => [...prev, { role: "assistant", content: "⚠ Connection error. Please try again." }]);
    } finally {
      setIsStreaming(false);
    }
  }, [chatInput, chatMessages, isStreaming]);

  return (
    <>
      <style>{styles}</style>
      <div className="audit-root">
        <div className="header">
          <div className="live-badge"><div className="live-dot" />Live Audit</div>
          <div className="header-title">Atlas AI · <span>AD Plastik — BMW Interior Trim Audit</span></div>
          <div className="progress-wrap">
            <span>Progress 45%</span>
            <div className="progress-bar"><div className="progress-fill" /></div>
          </div>
        </div>

        <div className="body">
          <div className="left-panel">
            <div className="panel-section">
              <div className="panel-label">Checklist</div>
              <div className="panel-sublabel">Injection Molding · AD Plastik d.d., Solin</div>
            </div>
            <div className="checklist-scroll">
              <div className="section-header">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M2 3l3 4 3-4H2z"/></svg>
                4. Injection Molding Process
              </div>
              <div className="checklist-item"><CheckIconComp done /><span>4.1 Machine Park &amp; Clamping Force</span></div>
              <div className="checklist-item">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{color:'#4b5675',flexShrink:0,marginTop:3}}><path d="M2 3l3 4 3-4H2z"/></svg>
                <span>4.2 Dashboard Air Vent Production</span>
              </div>
              <div className="checklist-item sub"><CheckIconComp done /><span>4.2.1 Mold Condition &amp; Maintenance Log</span></div>
              <div className="checklist-item sub"><CheckIconComp done /><span>4.2.2 Cavity Pressure Monitoring</span></div>
              <div className="checklist-item sub active">
                <div className="risk-dot" />
                <div><div>4.2.3 Dimensional Stability (Cpk)</div><div className="high-risk-badge">High Risk</div></div>
              </div>
              <div className="checklist-item sub" style={{color:'#4b5675'}}><CheckIconComp /><span>4.2.4 Color Matching (ΔE &lt; 0.5)</span></div>
              <div className="section-header" style={{marginTop:6}}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M3 2l4 3-4 3V2z"/></svg>
                5. Material &amp; Traceability
              </div>
              <div className="checklist-item" style={{color:'#4b5675'}}><CheckIconComp /><span>5.1 PP-T20 Material Certificates</span></div>
            </div>
            <div className="evidence-panel">
              <div className="evidence-header">
                <div className="panel-label">Evidence</div>
                <div className="evidence-count ok">5 / 5 ✓</div>
              </div>
              {evidenceFiles.map((f, i) => (
                <div className="evidence-file" key={i}>
                  <div className="file-name">
                    <div className="file-icon">{f.type.toUpperCase()}</div>
                    <span title={f.name}>{f.name}</span>
                  </div>
                  <span className={`status-badge ${f.status}`}>{f.status === "verified" ? "✓ Verified" : "⚠ Review"}</span>
                </div>
              ))}
              <div className="action-row">
                <button className="btn-secondary"><CaptureIcon /> Capture</button>
                <button className="btn-secondary"><UploadIcon /> Upload</button>
              </div>
            </div>
          </div>

          <div className="center-panel">
            <div className="question-area">
              <div className="question-meta">
                <div className="question-label">Question</div>
                <div className="question-actions">
                  <div className="icon-btn"><SpeakerIcon /></div>
                  <div className="icon-btn"><ImgIcon /></div>
                  <div className="icon-btn"><PaperclipIcon /></div>
                </div>
              </div>
              <div className="question-text">
                Does the injection molding process for BMW air vent assemblies meet Cpk ≥ 1.67 and color ΔE &lt; 0.5 per IATF 16949?
              </div>
            </div>
            <div className="center-scroll">
              <div className="guidance-section-label">AI Guidance</div>
              <div className="risk-alert-box">
                <div className="risk-alert-title">⚠ Risk Alert</div>
                <div className="risk-alert-text">
                  Cpk for critical dimension (clip retention force) at 1.42 — below BMW requirement of 1.67. Color deviation ΔE = 0.72 on batch 2024-11, exceeding 0.5 tolerance. Potential mold wear on cavity 3.
                </div>
              </div>
              <div className="guidance-block">
                <div className="guidance-title">What to Check</div>
                <ul className="check-list">
                  <li><div className="check-num">1</div><span>Cpk ≥ 1.67 on clip retention force?</span></li>
                  <li><div className="check-num">2</div><span>Color ΔE &lt; 0.5 across all cavities?</span></li>
                  <li><div className="check-num">3</div><span>Mold maintenance log current (&lt; 50K shots since last service)?</span></li>
                </ul>
              </div>
              <div className="guidance-block">
                <div className="guidance-title">Common Issues</div>
                <div className="issue-list">
                  <div className="issue-item"><div className="issue-dot" /><span>Cpk drift after 40K shots (72% of findings)</span></div>
                  <div className="issue-item"><div className="issue-dot" /><span>Color shift on aged mold inserts (58%)</span></div>
                  <div className="issue-item"><div className="issue-dot" /><span>Clip force out-of-spec on cavity 3–4 (44%)</span></div>
                </div>
              </div>
              <div className="section-divider" />
              <div className="guidance-section-label">Maturity Assessment</div>
              <div className="score-block">
                <div className="score-block-header"><div className="ai-dot" /><div className="ai-suggests-label">Atlas AI Suggests</div></div>
                <div className="score-row">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} className={`score-btn ${n === aiScore ? "ai-pick" : ""}`}>{n}</button>
                  ))}
                </div>
                <div className="score-hint">Level 3 — Process capable but Cpk below BMW threshold on critical dimensions</div>
              </div>
              <div className="score-block">
                <div className="your-assessment-label">Your Assessment</div>
                <div className="score-row">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} className={`score-btn ${userScore === n ? "user-pick" : ""}`} onClick={() => setUserScore(n)}>{n}</button>
                  ))}
                </div>
                {userScore && userScore !== aiScore && (
                  <div className="override-notice">
                    <WarningIcon />
                    Override {userScore > aiScore ? `+${userScore - aiScore}` : userScore - aiScore} vs AI suggestion — add reason below
                  </div>
                )}
                <textarea className="findings-input" placeholder="Add findings or override justification..." />
                <button className="submit-btn">Submit &amp; Next →</button>
              </div>
            </div>
            <div className="bottom-bar">
              <div className="mic-btn"><MicIcon /></div>
              <input
                className="bottom-input"
                placeholder="Ask Atlas AI..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
                disabled={isStreaming}
              />
              <button className="send-btn" onClick={sendChat} disabled={isStreaming || !chatInput.trim()}>
                <SendIcon />
              </button>
            </div>
          </div>

          <div className="right-panel">
            <div className="copilot-header"><div className="copilot-title">Atlas Copilot</div></div>

            {/* Chat Messages */}
            {chatMessages.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '40vh', overflowY: 'auto' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    padding: '8px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    lineHeight: 1.6,
                    background: msg.role === 'user' ? '#212840' : '#1c2333',
                    color: msg.role === 'user' ? '#f1f5f9' : '#94a3b8',
                    border: `1px solid ${msg.role === 'user' ? '#2a3145' : '#2a3145'}`,
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '95%',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.role === 'assistant' && (
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#2dd4bf', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Atlas AI
                      </div>
                    )}
                    {msg.content}
                  </div>
                ))}
                {isStreaming && chatMessages[chatMessages.length - 1]?.role !== 'assistant' && (
                  <div style={{ padding: '8px 10px', borderRadius: 6, fontSize: 12, background: '#1c2333', color: '#4b5675', border: '1px solid #2a3145' }}>
                    <span style={{ animation: 'audit-pulse 1s infinite' }}>Thinking...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            {chatMessages.length === 0 && (
              <div style={{ fontSize: 11, color: '#4b5675', textAlign: 'center', padding: '12px 0' }}>
                Ask questions in the bottom bar to get AI-powered audit guidance
              </div>
            )}

            <div className="divider" />

            <div>
              <div className="panel-label" style={{marginBottom:8}}>Flagged Issues</div>
              <div className="flagged-issues">
                <div className="flag-item"><div className="flag-num n1">1</div><span>Dimensional Stability (Cpk)</span></div>
                <div className="flag-item"><div className="flag-num n2">2</div><span>Color Matching ΔE</span></div>
                <div className="flag-item"><div className="flag-num n3">3</div><span>Mold Shot Count</span></div>
              </div>
            </div>
            <div className="divider" />
            <div className="benchmark-card">
              <div className="benchmark-title">Benchmark</div>
              <div className="benchmark-row"><div className="benchmark-name">AD Plastik</div><div className="benchmark-score">6.4/10</div></div>
              <div className="bm-bar good" style={{width:'64%'}} />
              <div className="benchmark-row"><div className="benchmark-name">BMW Tier-1 avg</div><div className="benchmark-score">8.1/10</div></div>
              <div className="bm-bar low" style={{width:'81%'}} />
              <div className="benchmark-verdict">Hold — mold rework required before run-at-rate</div>
              <div className="benchmark-context">Based on 34 Tier-1 suppliers · Q1 2025</div>
            </div>
            <div className="divider" />
            <div className="ai-finding-card">
              <div className="ai-finding-title"><WarningIcon /> AI Finding</div>
              <div className="ai-finding-text">
                Cavity 3 shows 62K shots since last insert service — BMW limit is 50K. Clip retention force Cpk dropped to 1.42. Color masterbatch lot 2024-11 shows ΔE 0.72. Recommend mold insert replacement and masterbatch qualification before BMW run-at-rate approval.
              </div>
              <div className="finding-actions">
                <button className="btn-accept">Accept</button>
                <button className="btn-dismiss">Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtlasLiveAudit;
