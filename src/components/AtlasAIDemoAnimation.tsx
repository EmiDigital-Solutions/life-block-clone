import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCREEN_BG = "bg-[hsl(0,0%,85%)]";

const C = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
  const bg = layer === 1
    ? 'bg-[hsl(0,0%,45%)] border-[hsl(0,0%,40%)]'
    : layer === 2
    ? 'bg-[hsl(0,0%,38%)] border-[hsl(0,0%,33%)]'
    : 'bg-[hsl(0,0%,32%)] border-[hsl(0,0%,28%)]';
  return (
    <div className={`border ${highlight ? 'border-primary/30 bg-[hsl(0,0%,42%)]' : bg} ${className}`}>
      {children}
    </div>
  );
};

const Bar = ({ value, color = "bg-primary", delay = 0 }: { value: number; color?: string; delay?: number }) => (
  <div className="h-1.5 w-full bg-background/10 overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, delay }} className={`h-full ${color}`} />
  </div>
);

const Check = ({ done = false }: { done?: boolean }) => (
  <div className={`w-3 h-3 border flex items-center justify-center shrink-0 ${done ? 'bg-[#3DC88E] border-[#3DC88E]' : 'border-background/30'}`}>
    {done && <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>}
  </div>
);

/* ── ICON COMPONENTS ── */
const MicIcon = ({ active = false }: { active?: boolean }) => (
  <svg className={`w-3.5 h-3.5 ${active ? 'text-primary' : 'text-background/50'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="9" y="1" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0014 0" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const CameraIcon = () => (
  <svg className="w-3.5 h-3.5 text-background/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const SpeakerIcon = ({ active = false }: { active?: boolean }) => (
  <svg className={`w-3.5 h-3.5 ${active ? 'text-[#3DC88E]' : 'text-background/50'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    {active && <>
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </>}
  </svg>
);

const FileIcon = () => (
  <svg className="w-3 h-3 text-background/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-3 h-3 text-background/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

/* ── LEFT PANEL ── */
const LeftPanel = () => (
  <div className="h-full flex flex-col p-3 gap-2 overflow-hidden">
    <C layer={2} className="p-2">
      <span className="text-[10px] font-bold text-background uppercase tracking-wider">Audit Checklist</span>
      <div className="text-[8px] text-background/50 mt-1">IATF 16949 · Precision Parts</div>
      <div className="mt-1.5"><Bar value={45} /></div>
      <div className="text-[8px] text-background/40 mt-1">Progress: 45%</div>
    </C>

    <div className="flex-1 overflow-hidden space-y-1">
      <div className="text-[9px] font-bold text-foreground/60">▼ 4. QUALITY MGMT</div>
      <div className="pl-3 space-y-1">
        <div className="flex items-center gap-1.5"><Check done /> <span className="text-[8px] text-foreground/50">4.1.1 Process</span></div>
        <div className="text-[9px] text-foreground/50 font-semibold">▼ 4.2 Documentation</div>
        <div className="pl-3 space-y-1">
          <div className="flex items-center gap-1.5"><Check done /> <span className="text-[8px] text-foreground/50">4.2.1 General</span></div>
          <div className="flex items-center gap-1.5"><Check done /> <span className="text-[8px] text-foreground/50">4.2.2 Manual</span></div>
          <C highlight className="p-1.5 -ml-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-background">4.2.3 Control</span>
              <span className="text-[7px] px-1 bg-[#E04545] text-white font-bold ml-auto">HIGH</span>
            </div>
          </C>
          <div className="flex items-center gap-1.5 text-foreground/30"><div className="w-3 h-3 border border-foreground/20" /> <span className="text-[8px]">4.2.4 Records</span></div>
        </div>
      </div>
      <div className="text-[9px] font-bold text-foreground/60 mt-2">▼ 5. MANAGEMENT</div>
      <div className="pl-3 flex items-center gap-1.5 text-foreground/30">
        <div className="w-3 h-3 border border-foreground/20" /> <span className="text-[8px]">5.1 Commitment</span>
      </div>
    </div>

    {/* Evidence Manager Mini */}
    <C layer={3} className="p-2 mt-auto">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[8px] font-bold text-background/70 uppercase tracking-wider">Evidence</span>
        <span className="text-[7px] text-primary font-bold">12 files</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <ImageIcon />
          <span className="text-[7px] text-background/50 truncate">IMG_2847.jpg</span>
          <span className="text-[6px] px-1 bg-[#3DC88E]/20 text-[#3DC88E] font-bold ml-auto">AI ✓</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileIcon />
          <span className="text-[7px] text-background/50 truncate">calibration_cert.pdf</span>
          <span className="text-[6px] px-1 bg-[#F5A623]/20 text-[#F5A623] font-bold ml-auto">Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ImageIcon />
          <span className="text-[7px] text-background/50 truncate">CNC_nameplate.jpg</span>
          <span className="text-[6px] px-1 bg-[#3DC88E]/20 text-[#3DC88E] font-bold ml-auto">AI ✓</span>
        </div>
      </div>
      <div className="mt-1.5 flex gap-1">
        <button className="flex-1 flex items-center justify-center gap-1 bg-background/10 py-1 hover:bg-background/20 transition-colors">
          <CameraIcon />
          <span className="text-[7px] text-background/50">Capture</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 bg-background/10 py-1 hover:bg-background/20 transition-colors">
          <FileIcon />
          <span className="text-[7px] text-background/50">Upload</span>
        </button>
      </div>
    </C>
  </div>
);

/* ── MIDDLE PANEL ── */
const MiddlePanel = () => {
  const [vis, setVis] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [showVoiceWave, setShowVoiceWave] = useState(false);
  const fullTyping = "Check document register for rev. history...";

  useEffect(() => {
    const t = [300, 900, 1800, 2800].map((d, i) => setTimeout(() => setVis(i + 1), d));
    return () => t.forEach(clearTimeout);
  }, []);

  // Simulate typing in chat input
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= fullTyping.length) {
          setTypingText(fullTyping.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);
      return () => clearInterval(typeInterval);
    }, 3500);
    return () => clearTimeout(startDelay);
  }, []);

  // Simulate AI voice output
  useEffect(() => {
    const t1 = setTimeout(() => setIsAISpeaking(true), 1200);
    const t2 = setTimeout(() => setIsAISpeaking(false), 3200);
    const t3 = setTimeout(() => setShowVoiceWave(true), 1200);
    const t4 = setTimeout(() => setShowVoiceWave(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* AI Voice Status Bar */}
      <AnimatePresence>
        {isAISpeaking && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[hsl(0,0%,38%)] border-b border-[hsl(0,0%,33%)] px-3 py-1.5 flex items-center gap-2"
          >
            <SpeakerIcon active />
            <div className="flex items-center gap-0.5 flex-1">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-[#3DC88E]"
                  animate={{
                    height: [2, Math.random() * 10 + 3, 2],
                  }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
            <span className="text-[7px] text-[#3DC88E] font-medium">AI Speaking</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat/Content Area */}
      <div className="flex-1 p-3 gap-2 overflow-y-auto overflow-x-hidden flex flex-col">
        <div>
          <span className="text-[12px] font-bold text-foreground/80">4.2.3 Control of Documents</span>
          <div className="text-[8px] text-foreground/40 mt-0.5">IATF 16949:2016 · ISO 9001:2015 7.5.3</div>
        </div>

        {vis >= 1 && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <C highlight className="p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-bold text-primary uppercase tracking-wider">AI Context</span>
                <span className="text-[7px] px-1 bg-[#E04545] text-white font-bold">HIGH PRIORITY</span>
              </div>
              <p className="text-[8px] text-background/60 mt-1 leading-relaxed">
                BMW Tier-2 rejected 2 suppliers for document control gaps. Issues appear in 73% of 47 similar audits.
              </p>
            </C>
          </motion.div>
        )}

        {vis >= 2 && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <C layer={1} className="p-2">
              <span className="text-[8px] font-semibold text-background/70 uppercase tracking-wider">What to Check</span>
              <div className="mt-1.5 space-y-1.5">
                {[
                  "Document control procedure exists?",
                  "Approval signatures on documents?",
                  "Revision history tracked?",
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-[8px] text-primary font-bold shrink-0">{i + 1}.</span>
                    <span className="text-[8px] text-background/60">{q}</span>
                  </div>
                ))}
              </div>
            </C>
          </motion.div>
        )}

        {vis >= 3 && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <C layer={2} className="p-2">
              <span className="text-[8px] font-semibold text-[#F5A623] uppercase tracking-wider">Common Issues</span>
              <div className="mt-1 space-y-1">
                {[
                  "Register not used (73%)",
                  "Obsolete docs accessible (68%)",
                  "Missing signatures (54%)",
                ].map(t => (
                  <div key={t} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-[#F5A623]" />
                    <span className="text-[8px] text-background/50">{t}</span>
                  </div>
                ))}
              </div>
            </C>
          </motion.div>
        )}

        {vis >= 4 && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <C highlight className="p-2">
              <span className="text-[8px] font-semibold text-primary uppercase tracking-wider">AI Assessment</span>
              <p className="text-[8px] text-background/50 mt-1 leading-relaxed">
                "Document register not current. Last 4 revisions missing from master list."
              </p>
            </C>
          </motion.div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="border-t border-[hsl(0,0%,33%)] bg-[hsl(0,0%,40%)] p-2">
        <div className="flex items-center gap-1.5">
          {/* Voice Input Button */}
          <button className="w-7 h-7 flex items-center justify-center bg-[hsl(0,0%,35%)] hover:bg-[hsl(0,0%,30%)] transition-colors shrink-0">
            <MicIcon />
          </button>

          {/* Camera Button */}
          <button className="w-7 h-7 flex items-center justify-center bg-[hsl(0,0%,35%)] hover:bg-[hsl(0,0%,30%)] transition-colors shrink-0">
            <CameraIcon />
          </button>

          {/* Text Input */}
          <div className="flex-1 bg-[hsl(0,0%,32%)] border border-[hsl(0,0%,28%)] px-2 py-1.5 flex items-center">
            <span className="text-[8px] text-background/40 truncate">
              {typingText || "Ask Atlas AI or type findings..."}
              {typingText && typingText.length < fullTyping.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-primary"
                >|</motion.span>
              )}
            </span>
          </div>

          {/* Send Button */}
          <button className="w-7 h-7 flex items-center justify-center bg-primary hover:bg-primary/80 transition-colors shrink-0">
            <SendIcon />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-1 mt-1.5">
          {["📸 Photo Evidence", "🎤 Voice Note", "⚠️ Add Finding", "📎 Attach"].map((action) => (
            <button
              key={action}
              className="text-[6px] text-background/40 bg-[hsl(0,0%,35%)] px-1.5 py-0.5 hover:bg-[hsl(0,0%,30%)] hover:text-background/60 transition-colors whitespace-nowrap"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── RIGHT PANEL ── */
const RightPanel = () => (
  <div className="h-full flex flex-col p-3 gap-2 overflow-hidden">
    <span className="text-[9px] font-bold text-foreground/60 uppercase tracking-wider">Intelligence</span>

    <C highlight className="p-2">
      <span className="text-[8px] font-bold text-[#E04545] uppercase">Priority</span>
      <div className="mt-1 text-[8px] text-background/60 space-y-0.5">
        <div>• Calibration (78%)</div>
        <div>• Training (62%)</div>
        <div className="text-primary mt-1">→ Check proactively</div>
      </div>
    </C>

    <C layer={1} className="p-2">
      <span className="text-[8px] font-bold text-background/70 uppercase">Client Focus</span>
      <div className="mt-1 space-y-1 text-[8px] text-background/50">
        <div><span className="px-1 bg-[#E04545] text-white font-bold text-[7px]">1</span> Documentation</div>
        <div><span className="px-1 bg-[#E04545] text-white font-bold text-[7px]">2</span> Calibration</div>
        <div><span className="px-1 bg-[#F5A623] text-white font-bold text-[7px]">3</span> Process Cap.</div>
      </div>
    </C>

    <C layer={1} className="p-2">
      <span className="text-[8px] font-bold text-background/70 uppercase">Progress</span>
      <div className="mt-1"><Bar value={45} delay={0.5} /></div>
      <div className="mt-1 space-y-0.5 text-[8px] text-background/50">
        <div>Major NC: <span className="text-[#E04545] font-bold">1</span></div>
        <div>Minor NC: <span className="text-[#F5A623] font-bold">3</span></div>
      </div>
    </C>

    <C layer={2} className="p-2 mt-auto">
      <span className="text-[8px] font-bold text-background/70 uppercase">Benchmark</span>
      <div className="mt-1 space-y-1">
        <div className="flex justify-between text-[8px]"><span className="text-background/50">This</span><span className="text-background/70 font-bold">7.2/10</span></div>
        <Bar value={72} delay={0.3} />
        <div className="flex justify-between text-[8px]"><span className="text-background/50">Industry</span><span className="text-background/70 font-bold">8.1/10</span></div>
        <Bar value={81} color="bg-background/30" delay={0.5} />
      </div>
      <div className="text-[8px] text-[#3DC88E] font-semibold mt-1.5">Approved with conditions</div>
    </C>
  </div>
);

/* ── MAIN ── */
const AtlasAIDemoAnimation = () => (
  <div className={`w-full h-full flex flex-col ${SCREEN_BG} overflow-hidden`}>
    <div className="flex items-center px-4 py-2 border-b border-muted-foreground/10">
      <div className="flex-[22] text-center">
        <span className="text-[9px] font-medium text-foreground/50 uppercase tracking-wider">Checklist & Evidence</span>
      </div>
      <div className="w-px h-3 bg-muted-foreground/10" />
      <div className="flex-[50] text-center">
        <span className="text-[9px] font-medium text-primary uppercase tracking-wider">AI Copilot</span>
      </div>
      <div className="w-px h-3 bg-muted-foreground/10" />
      <div className="flex-[28] text-center">
        <span className="text-[9px] font-medium text-foreground/50 uppercase tracking-wider">Intelligence</span>
      </div>
    </div>
    <div className="flex-1 flex overflow-hidden min-h-0">
      <div className="flex-[22] border-r border-muted-foreground/10 overflow-hidden"><LeftPanel /></div>
      <div className="flex-[50] border-r border-muted-foreground/10 overflow-hidden"><MiddlePanel /></div>
      <div className="flex-[28] overflow-hidden"><RightPanel /></div>
    </div>
  </div>
);

export default AtlasAIDemoAnimation;
