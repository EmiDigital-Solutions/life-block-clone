import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── ATLAS AI DEMO — Tablet Hybrid ── */
const AtlasAIDemoAnimation = () => {
  const [showFinding, setShowFinding] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [vis, setVis] = useState(0);
  const [photoFlash, setPhotoFlash] = useState(false);

  useEffect(() => {
    const t = [400, 1000, 2000, 3000].map((d, i) => setTimeout(() => setVis(i + 1), d));
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setMicActive(true), 1800);
    const t2 = setTimeout(() => setMicActive(false), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowFinding(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSelectedAnswer("NO"), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { setPhotoFlash(true); setTimeout(() => setPhotoFlash(false), 250); }, 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white p-3 md:p-6 overflow-hidden">
      {/* Tablet Frame */}
      <div className="w-full h-full max-w-[1100px] bg-white rounded-[20px] md:rounded-[28px] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden relative">

        {/* Flash */}
        <AnimatePresence>
          {photoFlash && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white z-50 rounded-[28px]" />
          )}
        </AnimatePresence>

        {/* Tablet Top Bar */}
        <div className="flex items-center justify-between px-5 md:px-7 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3DC88E]" />
            <span className="text-[10px] md:text-[11px] text-slate-400 font-medium tracking-wider uppercase">Live Audit</span>
          </div>
          <span className="text-[13px] md:text-[15px] font-bold text-slate-900 tracking-wide">Atlas AI · Auditor View</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400 hidden md:inline">Progress 45%</span>
            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* LEFT — Checklist + Evidence */}
          <div className="flex-[25] border-r border-slate-100 flex flex-col overflow-hidden bg-slate-50/30">
            {/* Checklist Header */}
            <div className="px-4 py-3 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Checklist</span>
              <div className="text-[9px] text-slate-400 mt-0.5">IATF 16949 · Precision Parts</div>
            </div>

            {/* Checklist Items */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
              <div className="text-[10px] font-bold text-slate-400 mb-1">▼ 4. QUALITY MGMT</div>
              <CheckItem done label="4.1.1 Process Approach" />
              <div className="text-[10px] font-semibold text-slate-400 pl-2 mt-1 mb-0.5">▼ 4.2 Documentation</div>
              <CheckItem done label="4.2.1 General" indent />
              <CheckItem done label="4.2.2 Quality Manual" indent />
              {/* Active item */}
              <div className="bg-primary/10 border border-primary/25 rounded-lg px-2.5 py-2 ml-2 my-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-900">4.2.3 Control</span>
                </div>
                <span className="text-[8px] px-1.5 py-0.5 bg-[#E04545] text-white font-bold rounded ml-5 inline-block mt-1">HIGH RISK</span>
              </div>
              <CheckItem label="4.2.4 Records" indent pending />
              <div className="text-[10px] font-bold text-slate-400 mt-2 mb-1">▶ 5. MANAGEMENT</div>
              <CheckItem label="5.1 Commitment" pending />
              <CheckItem label="5.2 Customer Focus" pending />
            </div>

            {/* Evidence Manager */}
            <div className="border-t border-slate-100 px-3 py-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Evidence</span>
                <span className="text-[9px] text-primary font-bold">12 files</span>
              </div>
              <div className="space-y-1.5">
                <EvidenceItem name="IMG_2847.jpg" type="img" status="verified" />
                <EvidenceItem name="calibration_cert.pdf" type="doc" status="review" />
                <EvidenceItem name="CNC_nameplate.jpg" type="img" status="verified" />
              </div>
              <div className="flex gap-2 mt-2.5">
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg py-2 transition-colors group border border-slate-200">
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="text-[9px] text-slate-500 font-medium">Capture</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg py-2 transition-colors group border border-slate-200">
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-[9px] text-slate-500 font-medium">Upload</span>
                </button>
              </div>
            </div>
          </div>

          {/* MIDDLE — Question + AI Context */}
          <div className="flex-[45] border-r border-white/6 flex flex-col overflow-hidden">
            {/* Question Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-5 py-4 border-b border-white/6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Question</span>
                <div className="flex gap-1.5">
                  {["🔊", "📷", "📎"].map((icon, i) => (
                    <button key={i} className="w-7 h-7 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-[12px]">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[14px] md:text-[16px] text-white font-medium leading-relaxed mb-4">
                Is the fire suppression system compliant with local regulations?
              </p>
              <div className="flex gap-3">
                {["YES", "NO", "N/A"].map((label) => {
                  const isSelected = selectedAnswer === label;
                  const base = label === "YES" ? "border-[#3DC88E]" : label === "NO" ? "border-primary" : "border-white/15";
                  const active = label === "YES" ? "bg-[#3DC88E] border-[#3DC88E] shadow-lg shadow-[#3DC88E]/20" : label === "NO" ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-white/15 border-white/25";
                  return (
                    <motion.button key={label} animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                      className={`flex-1 py-2.5 text-[13px] md:text-[15px] font-bold rounded-xl border-2 transition-all duration-300 ${isSelected ? `${active} text-white` : `${base} text-white/60 bg-white/5`}`}
                    >{label}</motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* AI Intelligence Feed */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
              {vis >= 1 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/8 border border-primary/20 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Context</span>
                    <span className="text-[8px] px-1.5 py-0.5 bg-[#E04545] text-white font-bold rounded">HIGH PRIORITY</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    BMW Tier-2 rejected 2 suppliers for document control gaps. Issues found in 73% of 47 similar audits.
                  </p>
                </motion.div>
              )}

              {vis >= 2 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-xl p-3.5">
                  <span className="text-[10px] font-semibold text-white/45 uppercase tracking-wider">What to Check</span>
                  <div className="mt-2 space-y-2">
                    {["Document control procedure exists?", "Approval signatures on documents?", "Revision history tracked?"].map((q, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[11px] text-primary font-bold shrink-0 mt-0.5">{i + 1}.</span>
                        <span className="text-[11px] text-white/50">{q}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {vis >= 3 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-xl p-3.5">
                  <span className="text-[10px] font-semibold text-[#F5A623] uppercase tracking-wider">Common Issues</span>
                  <div className="mt-2 space-y-1.5">
                    {["Register not used (73%)", "Obsolete docs accessible (68%)", "Missing signatures (54%)"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                        <span className="text-[11px] text-white/45">{t}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {vis >= 4 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/8 border border-primary/15 rounded-xl p-3.5">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">AI Assessment</span>
                  <p className="text-[11px] text-white/45 mt-1.5 leading-relaxed italic">
                    "Document register not current. Last 4 revisions missing from master list."
                  </p>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-white/6 px-4 py-3">
              <div className="flex items-center gap-2">
                <button className={`w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-all ${micActive ? "bg-primary/20 border border-primary" : "bg-white/5 border border-white/10 hover:border-primary/30"}`}>
                  <svg className={`w-4 h-4 ${micActive ? "text-primary" : "text-white/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="9" y="1" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0014 0" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 flex items-center">
                  <span className="text-[11px] text-white/25">Ask Atlas AI or add findings...</span>
                </div>
                <button className="w-9 h-9 flex items-center justify-center bg-primary rounded-xl shrink-0 hover:bg-primary/80 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Copilot + Intelligence */}
          <div className="flex-[30] flex flex-col overflow-hidden">
            {/* Atlas Copilot Voice */}
            <div className="px-4 py-4 border-b border-white/6 flex flex-col items-center">
              <span className="text-[12px] font-bold text-white tracking-wide mb-3">Atlas Copilot</span>
              <div className="relative flex items-center justify-center">
                <AnimatePresence>
                  {micActive && (
                    <>
                      <motion.div initial={{ scale: 0.8, opacity: 0.4 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-16 h-16 rounded-full border border-primary/25" />
                      <motion.div initial={{ scale: 0.9, opacity: 0.3 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="absolute w-16 h-16 rounded-full border border-primary/15" />
                    </>
                  )}
                </AnimatePresence>
                <motion.div
                  animate={micActive ? { boxShadow: ["0 0 15px hsl(var(--primary) / 0.2)", "0 0 30px hsl(var(--primary) / 0.4)", "0 0 15px hsl(var(--primary) / 0.2)"] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${micActive ? "bg-primary/15 border-2 border-primary" : "bg-white/5 border-2 border-white/15"}`}
                >
                  <svg className={`w-6 h-6 ${micActive ? "text-primary" : "text-white/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="9" y="1" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0014 0" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="8" y1="21" x2="16" y2="21" />
                  </svg>
                </motion.div>
              </div>
              <span className={`text-[10px] font-medium mt-2 ${micActive ? "text-primary" : "text-white/30"}`}>
                {micActive ? "Listening..." : "Tap to speak"}
              </span>
              {/* Waveform */}
              <AnimatePresence>
                {micActive && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-0.5 mt-2">
                    {[...Array(14)].map((_, i) => (
                      <motion.div key={i} className="w-[3px] rounded-full bg-primary" animate={{ height: [2, Math.random() * 12 + 3, 2] }}
                        transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, repeatType: "reverse", delay: i * 0.04 }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Intelligence Cards */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
              <IntelCard title="Priority" titleColor="text-[#E04545]">
                <div className="space-y-1 text-[10px] text-white/45">
                  <div>• Calibration (78%)</div>
                  <div>• Training (62%)</div>
                  <div className="text-primary mt-1">→ Check proactively</div>
                </div>
              </IntelCard>

              <IntelCard title="Client Focus">
                <div className="space-y-1.5 text-[10px] text-white/45">
                  <div><span className="text-[8px] px-1.5 bg-[#E04545] text-white font-bold rounded mr-1.5">1</span>Documentation</div>
                  <div><span className="text-[8px] px-1.5 bg-[#E04545] text-white font-bold rounded mr-1.5">2</span>Calibration</div>
                  <div><span className="text-[8px] px-1.5 bg-[#F5A623] text-white font-bold rounded mr-1.5">3</span>Process Cap.</div>
                </div>
              </IntelCard>

              <IntelCard title="Benchmark">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px]"><span className="text-white/40">This supplier</span><span className="text-white/60 font-bold">7.2/10</span></div>
                  <BarRound value={72} />
                  <div className="flex justify-between text-[10px]"><span className="text-white/40">Industry avg</span><span className="text-white/60 font-bold">8.1/10</span></div>
                  <BarRound value={81} color="bg-white/20" />
                  <div className="text-[10px] text-[#3DC88E] font-semibold mt-1">Approved with conditions</div>
                </div>
              </IntelCard>

              {/* AI Finding */}
              <AnimatePresence>
                {showFinding && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="bg-[#F5A623]/8 border border-[#F5A623]/25 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[11px] font-bold text-white">AI Finding</span>
                      <span className="text-[#F5A623]">⚠</span>
                    </div>
                    <p className="text-[10px] text-white/45 leading-relaxed">Check pressure gauge on adjacent unit. Calibration expired 2024-11.</p>
                    <div className="flex gap-1.5 mt-2">
                      <button className="flex-1 py-1.5 text-[9px] font-bold text-[#3DC88E] border border-[#3DC88E]/25 rounded-lg bg-[#3DC88E]/5 uppercase tracking-wider">Accept</button>
                      <button className="flex-1 py-1.5 text-[9px] font-bold text-white/35 border border-white/10 rounded-lg bg-white/5 uppercase tracking-wider">Dismiss</button>
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
  <div className={`flex items-center gap-2 py-1 ${indent ? "pl-4" : "pl-1"}`}>
    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${done ? "bg-[#3DC88E]" : "border border-white/15"}`}>
      {done && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>}
    </div>
    <span className={`text-[10px] ${done ? "text-white/40" : pending ? "text-white/20" : "text-white/50"}`}>{label}</span>
  </div>
);

const EvidenceItem = ({ name, type, status }: { name: string; type: "img" | "doc"; status: "verified" | "review" }) => (
  <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
    <span className="text-[10px]">{type === "img" ? "🖼" : "📄"}</span>
    <span className="text-[9px] text-white/35 truncate flex-1">{name}</span>
    <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${status === "verified" ? "bg-[#3DC88E]/15 text-[#3DC88E]" : "bg-[#F5A623]/15 text-[#F5A623]"}`}>
      {status === "verified" ? "AI ✓" : "Review"}
    </span>
  </div>
);

const IntelCard = ({ title, titleColor = "text-white/50", children }: { title: string; titleColor?: string; children: React.ReactNode }) => (
  <div className="bg-white/5 rounded-xl p-3">
    <span className={`text-[10px] font-bold uppercase tracking-wider ${titleColor}`}>{title}</span>
    <div className="mt-1.5">{children}</div>
  </div>
);

const BarRound = ({ value, color = "bg-primary", delay = 0.3 }: { value: number; color?: string; delay?: number }) => (
  <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, delay }} className={`h-full rounded-full ${color}`} />
  </div>
);

export default AtlasAIDemoAnimation;
