import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── ATLAS AI DEMO — Tablet Hybrid ── */
const AtlasAIDemoAnimation = () => {
  const [showFinding, setShowFinding] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [vis, setVis] = useState(0);
  const [photoFlash, setPhotoFlash] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [evidenceComplete, setEvidenceComplete] = useState(false);
  const [showMaturity, setShowMaturity] = useState(false);
  const [atlasMaturity, setAtlasMaturity] = useState<number | null>(null);
  const [auditorMaturity, setAuditorMaturity] = useState<number | null>(null);
  const [copilotSpeaking, setCopilotSpeaking] = useState(false);
  const [copilotText, setCopilotText] = useState("");
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [loopKey, setLoopKey] = useState(0);
  const middleScrollRef = useRef<HTMLDivElement>(null);

  const LOOP_DURATION = 16000; // total cycle length in ms
  const PAUSE_ON_MATURITY = 3000; // pause showing maturity before restart

  const riskAlertText = "BMW Tier-2 rejected 2 suppliers for document control gaps. Issues found in 73% of 47 similar audits. Recommend thorough check of document control procedures, approval signatures, and revision history.";

  const speakRiskAlert = useCallback(() => {
    if (copilotSpeaking) {
      window.speechSynthesis.cancel();
      setCopilotSpeaking(false);
      setCopilotText("");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(riskAlertText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";
    
    // Force English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith("en"));
    const preferred = englishVoices.find(v => v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel")) || englishVoices[0];
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      setCopilotSpeaking(true);
      setCopilotText("Reading risk alert...");
    };

    const segments = [
      { time: 1500, text: "BMW Tier-2 rejected 2 suppliers for document control gaps." },
      { time: 4000, text: "Issues found in 73% of similar audits." },
      { time: 6500, text: "Recommend thorough check of procedures and signatures." },
    ];
    const timers: number[] = [];
    segments.forEach(s => {
      timers.push(window.setTimeout(() => setCopilotText(s.text), s.time));
    });

    utterance.onend = () => {
      timers.forEach(clearTimeout);
      setCopilotSpeaking(false);
      setCopilotText("");
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [copilotSpeaking]);

  // Single animation loop driven by loopKey
  useEffect(() => {
    // Reset all states
    setShowFinding(false);
    setVis(0);
    setChatStep(0);
    setEvidenceComplete(false);
    setShowMaturity(false);
    setAtlasMaturity(null);
    setAuditorMaturity(null);
    setPhotoFlash(false);

    const timers: number[] = [];
    const t = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, delay));
    };

    // Staged reveal of intelligence cards
    t(400, () => setVis(1));
    t(1000, () => setVis(2));
    t(2000, () => setVis(3));
    t(3000, () => setVis(4));

    // Chat messages animate in
    t(1200, () => setChatStep(1));
    t(2800, () => setChatStep(2));
    t(4500, () => setChatStep(3));

    // AI Finding appears
    t(2500, () => setShowFinding(true));

    // Photo flash
    t(5500, () => setPhotoFlash(true));
    t(5750, () => setPhotoFlash(false));

    // Evidence completes → maturity
    t(8000, () => setEvidenceComplete(true));
    t(9000, () => {
      setShowMaturity(true);
      // Auto-scroll to bottom so maturity is fully visible
      setTimeout(() => {
        middleScrollRef.current?.scrollTo({ top: middleScrollRef.current.scrollHeight, behavior: "smooth" });
      }, 200);
    });
    t(10000, () => setAtlasMaturity(3));
    t(11500, () => {
      setAuditorMaturity(2);
      setTimeout(() => {
        middleScrollRef.current?.scrollTo({ top: middleScrollRef.current.scrollHeight, behavior: "smooth" });
      }, 300);
    });

    // Restart loop after maturity pause
    t(LOOP_DURATION, () => setLoopKey(k => k + 1));

    return () => {
      timers.forEach(clearTimeout);
      window.speechSynthesis.cancel();
    };
  }, [loopKey]);
  

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full bg-[hsl(220,18%,13%)] rounded-[16px] md:rounded-[20px] border border-white/10 flex flex-col overflow-hidden relative">

        {/* Flash */}
        <AnimatePresence>
          {photoFlash && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white z-50" />
          )}
        </AnimatePresence>

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 md:px-8 py-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3DC88E]" />
            <span className="text-[12px] text-white/40 font-medium tracking-wider uppercase">Live Audit</span>
          </div>
          <span className="text-[14px] font-bold text-white tracking-wide">Atlas AI · Auditor View</span>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-white/30 hidden md:inline">Progress 45%</span>
            <div className="w-20 h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-[#3DC88E] rounded-full" />
            </div>
          </div>
        </div>

        {/* Main 3-Column */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* LEFT — Checklist + Evidence */}
          <div className="flex-[25] border-r border-white/6 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/6">
              <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Checklist</span>
              <div className="text-[10px] text-white/25 mt-1">IATF 16949 · Precision Parts</div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
              <div className="text-[12px] font-bold text-white/40 mb-2">▼ 4. QUALITY MGMT</div>
              <CheckItem done label="4.1.1 Process Approach" />
              <div className="text-[12px] font-semibold text-white/35 pl-2 mt-2 mb-1">▼ 4.2 Documentation</div>
              <CheckItem done label="4.2.1 General" indent />
              <CheckItem done label="4.2.2 Quality Manual" indent />
              <div className="bg-[#E04545]/8 border border-[#E04545]/25 rounded-lg px-3 py-2.5 ml-2 my-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E04545] animate-pulse" />
                  <span className="text-[12px] font-bold text-white">4.2.3 Control</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#E04545] text-white font-bold rounded ml-5 inline-block mt-1">HIGH RISK</span>
              </div>
              <CheckItem label="4.2.4 Records" indent pending />
              <div className="text-[12px] font-bold text-white/40 mt-3 mb-2">▶ 5. MANAGEMENT</div>
              <CheckItem label="5.1 Commitment" pending />
              <CheckItem label="5.2 Customer Focus" pending />
            </div>

            {/* Evidence */}
            <div className="border-t border-white/6 px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Evidence</span>
                <span className={`text-[12px] font-bold ${evidenceComplete ? "text-[#3DC88E]" : "text-[#F5A623]"}`}>
                  {evidenceComplete ? "5 / 5 ✓" : "3 / 5 required"}
                </span>
              </div>
              <div className="space-y-2">
                <EvidenceItem name="IMG_2847.jpg" type="img" status="verified" />
                <EvidenceItem name="calibration_cert.pdf" type="doc" status={evidenceComplete ? "verified" : "review"} />
                <EvidenceItem name="CNC_nameplate.jpg" type="img" status="verified" />
                <AnimatePresence>
                  {evidenceComplete && (
                    <>
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                        <EvidenceItem name="fire_cert_2024.pdf" type="doc" status="verified" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ delay: 0.2 }}>
                        <EvidenceItem name="inspection_photo.jpg" type="img" status="verified" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              {!evidenceComplete && (
                <div className="mt-2 text-[10px] text-[#F5A623] font-medium">⚠ 2 more evidence items required</div>
              )}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-lg py-2.5 transition-colors group border border-white/8 hover:border-white/20">
                  <svg className="w-4 h-4 text-white/30 group-hover:text-[#3DC88E] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="text-[10px] text-white/30 group-hover:text-white/60 font-medium">Capture</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-lg py-2.5 transition-colors group border border-white/8 hover:border-white/20">
                  <svg className="w-4 h-4 text-white/30 group-hover:text-[#3DC88E] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-[10px] text-white/30 group-hover:text-white/60 font-medium">Upload</span>
                </button>
              </div>
            </div>
          </div>

          {/* MIDDLE — Question + Maturity */}
          <div className="flex-[45] border-r border-white/6 flex flex-col overflow-hidden">
            {/* Question */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-8 py-6 border-b border-white/6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Question</span>
                <div className="flex gap-2">
                  {["🔊", "📷", "📎"].map((icon, i) => (
                    <button key={i} onClick={i === 0 ? speakRiskAlert : undefined} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-[14px] border ${i === 0 && copilotSpeaking ? "bg-[#3DC88E]/15 border-[#3DC88E] ring-1 ring-[#3DC88E]/30" : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10 active:bg-white/15"}`}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[18px] md:text-[20px] text-white font-medium leading-[1.5]">
                Is the fire suppression system compliant with local regulations?
              </p>
            </motion.div>

            {/* AI Guidance — auto-animated chat */}
            <div ref={middleScrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <span className="text-[12px] font-bold text-white/40 uppercase tracking-wider block mb-3">AI Guidance</span>

              <AnimatePresence>
                {chatStep >= 1 && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="bg-[#E04545]/8 border border-[#E04545]/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-bold text-[#E04545] uppercase tracking-wider">Risk Alert</span>
                    </div>
                    <p className="text-[12px] text-white/50 leading-[1.5]">
                      BMW Tier-2 rejected 2 suppliers for document control gaps. Issues found in 73% of 47 similar audits.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {chatStep >= 2 && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="bg-white/5 rounded-lg p-4">
                    <span className="text-[12px] font-semibold text-white/45 uppercase tracking-wider">What to Check</span>
                    <div className="mt-2 space-y-2">
                      {["Document control procedure exists?", "Approval signatures on documents?", "Revision history tracked?"].map((q, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[12px] text-white/60 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                          <span className="text-[12px] text-white/50 leading-[1.5]">{q}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {chatStep >= 3 && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="bg-white/5 rounded-lg p-4">
                    <span className="text-[12px] font-semibold text-[#F5A623] uppercase tracking-wider">Common Issues</span>
                    <div className="mt-2 space-y-2">
                      {["Register not used (73%)", "Obsolete docs accessible (68%)", "Missing signatures (54%)"].map(t => (
                        <div key={t} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
                          <span className="text-[12px] text-white/45 leading-[1.5]">{t}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Maturity Rating — appears after guidance + evidence */}
              <AnimatePresence>
                {showMaturity && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 180 }}
                    className="mt-6 space-y-4">
                    <div className="border-t border-white/8 pt-4">
                      <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Maturity Assessment</span>
                    </div>

                    {/* Atlas AI suggestion */}
                    <div className="bg-[#3DC88E]/8 border border-[#3DC88E]/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#3DC88E]" />
                        <span className="text-[12px] font-bold text-[#3DC88E] uppercase tracking-wider">Atlas AI suggests</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <motion.div key={level}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: level * 0.1 }}
                            className={`flex-1 py-2 text-center text-[14px] font-bold rounded-lg transition-all ${
                              atlasMaturity === level
                                ? "bg-[#3DC88E] text-white"
                                : level <= (atlasMaturity || 0)
                                  ? "bg-[#3DC88E]/15 text-[#3DC88E]/60"
                                  : "bg-white/5 text-white/20"
                            }`}
                          >{level}</motion.div>
                        ))}
                      </div>
                      <p className="text-[10px] text-white/35 mt-2">Level 3 — Defined process with gaps in execution</p>
                    </div>

                    {/* Auditor selection */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <span className="text-[12px] font-bold text-white/60 uppercase tracking-wider mb-3 block">Your Assessment</span>
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((level) => {
                          const isSelected = auditorMaturity === level;
                          return (
                            <motion.div key={level}
                              animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
                              className={`flex-1 py-2.5 text-center text-[14px] font-bold rounded-lg transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-white text-[hsl(220,18%,13%)]"
                                  : "bg-white/8 text-white/30 hover:bg-white/12 hover:text-white/50"
                              }`}
                            >{level}</motion.div>
                          );
                        })}
                      </div>
                      {/* Comment field */}
                      <AnimatePresence>
                        {auditorMaturity !== null && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                            <div className="bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 mt-2 hover:border-white/15 transition-colors">
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-[12px] text-white/40 italic"
                              >
                                Fire suppression cert expired. Needs renewal before next audit...
                              </motion.span>
                            </div>
                            <div className="flex justify-end mt-3">
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="px-4 py-2 bg-[#3DC88E] text-white text-[12px] font-bold rounded-lg hover:bg-[#3DC88E]/80 active:bg-[#3DC88E]/60 transition-colors"
                              >
                                Submit & Next →
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Input */}
            <div className="border-t border-white/6 px-6 py-4">
              <div className="flex items-center gap-2">
                <button className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 transition-all ${micActive ? "bg-[#3DC88E]/15 border border-[#3DC88E]" : "bg-white/5 border border-white/10 hover:border-white/20"}`}>
                  <svg className={`w-4 h-4 ${micActive ? "text-[#3DC88E]" : "text-white/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="9" y="1" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0014 0" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-lg px-4 py-2.5 flex items-center hover:border-white/15 transition-colors">
                  <span className="text-[12px] text-white/25">Ask Atlas AI or add findings...</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center bg-[#3DC88E] rounded-lg shrink-0 hover:bg-[#3DC88E]/80 active:bg-[#3DC88E]/60 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Copilot + Intelligence */}
          <div className="flex-[30] flex flex-col overflow-hidden">
            {/* Atlas Copilot Voice — animated speaker */}
            <div className="px-4 py-4 border-b border-white/6 flex flex-col items-center">
              <span className="text-[14px] font-bold text-white tracking-wide mb-3">Atlas Copilot</span>
              <div className="relative flex items-center justify-center">
                <AnimatePresence>
                  {copilotSpeaking && (
                    <>
                      <motion.div initial={{ scale: 0.8, opacity: 0.4 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-16 h-16 rounded-full border border-[#3DC88E]/30" />
                      <motion.div initial={{ scale: 0.9, opacity: 0.3 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="absolute w-16 h-16 rounded-full border border-[#3DC88E]/20" />
                      <motion.div initial={{ scale: 1.0, opacity: 0.2 }} animate={{ scale: 1.3, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="absolute w-16 h-16 rounded-full border border-[#3DC88E]/10" />
                    </>
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={speakRiskAlert}
                  animate={copilotSpeaking ? {
                    boxShadow: ["0 0 15px rgba(61,200,142,0.15)", "0 0 35px rgba(61,200,142,0.4)", "0 0 15px rgba(61,200,142,0.15)"],
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${copilotSpeaking ? "bg-[#3DC88E]/15 border-2 border-[#3DC88E]" : "bg-white/5 border-2 border-white/15 hover:border-white/30"}`}
                >
                  <svg className={`w-6 h-6 ${copilotSpeaking ? "text-[#3DC88E]" : "text-white/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    {copilotSpeaking ? (
                      <>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                        <motion.path d="M15.54 8.46a5 5 0 010 7.07" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
                        <motion.path d="M19.07 4.93a10 10 0 010 14.14" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                      </>
                    ) : (
                      <>
                        <rect x="9" y="1" width="6" height="12" rx="3" />
                        <path d="M5 10a7 7 0 0014 0" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                      </>
                    )}
                  </svg>
                </motion.button>
              </div>
              <span className={`text-[12px] font-medium mt-2 ${copilotSpeaking ? "text-[#3DC88E]" : "text-white/30"}`}>
                {copilotSpeaking ? "Speaking..." : "Tap to speak"}
              </span>
              {/* Waveform */}
              <AnimatePresence>
                {copilotSpeaking && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-0.5 mt-2">
                    {[...Array(16)].map((_, i) => (
                      <motion.div key={i} className="w-[3px] rounded-full bg-[#3DC88E]"
                        animate={{ height: [2, Math.random() * 16 + 4, 2] }}
                        transition={{ duration: 0.25 + Math.random() * 0.25, repeat: Infinity, repeatType: "reverse", delay: i * 0.03 }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Copilot speech text */}
              <AnimatePresence mode="wait">
                {copilotText && (
                  <motion.p key={copilotText} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-[10px] text-white/40 text-center mt-3 px-2 leading-[1.5] max-w-[200px]">
                    {copilotText}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Intelligence Cards */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <IntelCard title="Priority" titleColor="text-[#E04545]">
                <div className="space-y-2 text-[12px] text-white/45">
                  <div>• Calibration (78%)</div>
                  <div>• Training (62%)</div>
                  <div className="text-[#3DC88E] mt-1 font-medium">→ Check proactively</div>
                </div>
              </IntelCard>

              <IntelCard title="Client Focus">
                <div className="space-y-2 text-[12px] text-white/45">
                  <div><span className="text-[10px] px-1.5 py-0.5 bg-[#E04545] text-white font-bold rounded mr-2">1</span>Documentation</div>
                  <div><span className="text-[10px] px-1.5 py-0.5 bg-[#E04545] text-white font-bold rounded mr-2">2</span>Calibration</div>
                  <div><span className="text-[10px] px-1.5 py-0.5 bg-[#F5A623] text-white font-bold rounded mr-2">3</span>Process Cap.</div>
                </div>
              </IntelCard>

              <IntelCard title="Benchmark">
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">This supplier</span><span className="text-white/60 font-bold">7.2/10</span></div>
                  <BarRound value={72} />
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">Industry avg</span><span className="text-white/60 font-bold">8.1/10</span></div>
                  <BarRound value={81} color="bg-white/20" />
                  <div className="text-[12px] text-[#3DC88E] font-semibold mt-2">Approved with conditions</div>
                </div>
              </IntelCard>

              {/* AI Finding */}
              <AnimatePresence>
                {showFinding && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="bg-[#F5A623]/8 border border-[#F5A623]/25 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-bold text-white">AI Finding</span>
                      <span className="text-[#F5A623]">⚠</span>
                    </div>
                    <p className="text-[12px] text-white/45 leading-[1.5]">Check pressure gauge on adjacent unit. Calibration expired 2024-11.</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 text-[10px] font-bold text-[#3DC88E] border border-[#3DC88E]/25 rounded-lg bg-[#3DC88E]/5 hover:bg-[#3DC88E]/15 active:bg-[#3DC88E]/25 uppercase tracking-wider transition-colors">Accept</button>
                      <button className="flex-1 py-2 text-[10px] font-bold text-white/35 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 uppercase tracking-wider transition-colors">Dismiss</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Sub-components ── */

const CheckItem = ({ done, label, indent, pending }: { done?: boolean; label: string; indent?: boolean; pending?: boolean }) => (
  <div className={`flex items-center gap-2 py-1.5 ${indent ? "pl-4" : "pl-1"}`}>
    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${done ? "bg-[#3DC88E]" : pending ? "border border-white/10" : "border border-white/20"}`}>
      {done && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>}
    </div>
    <span className={`text-[12px] leading-[1.5] ${done ? "text-white/40" : pending ? "text-white/20" : "text-white/50"}`}>{label}</span>
  </div>
);

const EvidenceItem = ({ name, type, status }: { name: string; type: "img" | "doc"; status: "verified" | "review" }) => (
  <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${status === "review" ? "bg-[#F5A623]/5 border border-[#F5A623]/15" : "bg-white/5 border border-transparent"}`}>
    <span className="text-[12px]">{type === "img" ? "🖼" : "📄"}</span>
    <span className="text-[10px] text-white/40 truncate flex-1">{name}</span>
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${status === "verified" ? "bg-[#3DC88E]/15 text-[#3DC88E]" : "bg-[#F5A623]/15 text-[#F5A623]"}`}>
      {status === "verified" ? "✓ Verified" : "⚠ Review"}
    </span>
  </div>
);

const IntelCard = ({ title, titleColor = "text-white/50", children }: { title: string; titleColor?: string; children: React.ReactNode }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <span className={`text-[12px] font-bold uppercase tracking-wider ${titleColor}`}>{title}</span>
    <div className="mt-2">{children}</div>
  </div>
);

const BarRound = ({ value, color = "bg-[#3DC88E]", delay = 0.3 }: { value: number; color?: string; delay?: number }) => (
  <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, delay }} className={`h-full rounded-full ${color}`} />
  </div>
);

export default AtlasAIDemoAnimation;
