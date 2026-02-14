import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── ATLAS AI DEMO — Tablet Hybrid ── */
const AtlasAIDemoAnimation = () => {
  const [showFinding, setShowFinding] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [vis, setVis] = useState(0);
  const [photoFlash, setPhotoFlash] = useState(false);
  const [guidanceOpen, setGuidanceOpen] = useState(false);

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
    <div className="w-full h-full overflow-hidden">
      {/* Tablet Frame */}
      <div className="w-full h-full bg-[hsl(220,18%,13%)] rounded-[16px] md:rounded-[20px] border border-white/10 flex flex-col overflow-hidden relative">

        {/* Flash */}
        <AnimatePresence>
          {photoFlash && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white z-50 rounded-[28px]" />
          )}
        </AnimatePresence>

        {/* Tablet Top Bar */}
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

        {/* Main 3-Column Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* LEFT — Checklist + Evidence */}
          <div className="flex-[25] border-r border-white/6 flex flex-col overflow-hidden">
            {/* Checklist Header */}
            <div className="px-4 py-3 border-b border-white/6">
              <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Checklist</span>
              <div className="text-[10px] text-white/25 mt-1">IATF 16949 · Precision Parts</div>
            </div>

            {/* Checklist Items — increased spacing */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
              <div className="text-[12px] font-bold text-white/40 mb-2">▼ 4. QUALITY MGMT</div>
              <CheckItem done label="4.1.1 Process Approach" />
              <div className="text-[12px] font-semibold text-white/35 pl-2 mt-2 mb-1">▼ 4.2 Documentation</div>
              <CheckItem done label="4.2.1 General" indent />
              <CheckItem done label="4.2.2 Quality Manual" indent />
              {/* Active item */}
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

            {/* Evidence Manager — clear requirements */}
            <div className="border-t border-white/6 px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Evidence</span>
                <span className="text-[12px] text-[#3DC88E] font-bold">3 / 5 required</span>
              </div>
              <div className="space-y-2">
                <EvidenceItem name="IMG_2847.jpg" type="img" status="verified" />
                <EvidenceItem name="calibration_cert.pdf" type="doc" status="review" />
                <EvidenceItem name="CNC_nameplate.jpg" type="img" status="verified" />
              </div>
              <div className="mt-2 text-[10px] text-[#F5A623] font-medium">⚠ 2 more evidence items required</div>
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

          {/* MIDDLE — Question + AI Context */}
          <div className="flex-[45] border-r border-white/6 flex flex-col overflow-hidden">
            {/* Question Section — 30% larger with more padding */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-8 py-6 border-b border-white/6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Question</span>
                <div className="flex gap-2">
                  {["🔊", "📷", "📎"].map((icon, i) => (
                    <button key={i} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-[14px] border border-transparent hover:border-white/10">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[18px] md:text-[20px] text-white font-medium leading-[1.5] mb-6">
                Is the fire suppression system compliant with local regulations?
              </p>
              {/* Color-coded answer buttons with clear hierarchy */}
              <div className="flex gap-3">
                {["YES", "NO", "N/A"].map((label) => {
                  const isSelected = selectedAnswer === label;
                  const colors = {
                    YES: { border: "border-[#3DC88E]/40", activeBg: "bg-[#3DC88E]", activeBorder: "border-[#3DC88E]", hoverBg: "hover:bg-[#3DC88E]/10", hoverBorder: "hover:border-[#3DC88E]/60" },
                    NO: { border: "border-[#E04545]/40", activeBg: "bg-[#E04545]", activeBorder: "border-[#E04545]", hoverBg: "hover:bg-[#E04545]/10", hoverBorder: "hover:border-[#E04545]/60" },
                    "N/A": { border: "border-white/15", activeBg: "bg-white/20", activeBorder: "border-white/30", hoverBg: "hover:bg-white/8", hoverBorder: "hover:border-white/25" },
                  }[label]!;
                  return (
                    <motion.button key={label} animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                      className={`flex-1 py-3 text-[14px] md:text-[16px] font-bold rounded-lg border-2 transition-all duration-300 ${
                        isSelected 
                          ? `${colors.activeBg} ${colors.activeBorder} text-white` 
                          : `${colors.border} text-white/50 bg-white/5 ${colors.hoverBg} ${colors.hoverBorder}`
                      }`}
                    >{label}</motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* AI Intelligence Feed — collapsed by default */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <button 
                onClick={() => setGuidanceOpen(!guidanceOpen)}
                className="w-full flex items-center justify-between py-2 mb-2 group"
              >
                <span className="text-[12px] font-bold text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">AI Guidance</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/25">{vis} insights</span>
                  <svg className={`w-3.5 h-3.5 text-white/30 transition-transform ${guidanceOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {guidanceOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
                    {vis >= 1 && (
                      <div className="bg-[#E04545]/8 border border-[#E04545]/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[12px] font-bold text-[#E04545] uppercase tracking-wider">Risk Alert</span>
                        </div>
                        <p className="text-[12px] text-white/50 leading-[1.5]">
                          BMW Tier-2 rejected 2 suppliers for document control gaps. Issues found in 73% of 47 similar audits.
                        </p>
                      </div>
                    )}

                    {vis >= 2 && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <span className="text-[12px] font-semibold text-white/45 uppercase tracking-wider">What to Check</span>
                        <div className="mt-2 space-y-2">
                          {["Document control procedure exists?", "Approval signatures on documents?", "Revision history tracked?"].map((q, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-[12px] text-white/60 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                              <span className="text-[12px] text-white/50 leading-[1.5]">{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {vis >= 3 && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <span className="text-[12px] font-semibold text-[#F5A623] uppercase tracking-wider">Common Issues</span>
                        <div className="mt-2 space-y-2">
                          {["Register not used (73%)", "Obsolete docs accessible (68%)", "Missing signatures (54%)"].map(t => (
                            <div key={t} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
                              <span className="text-[12px] text-white/45 leading-[1.5]">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {vis >= 4 && (
                      <div className="bg-white/5 border border-white/8 rounded-lg p-4">
                        <span className="text-[12px] font-semibold text-white/50 uppercase tracking-wider">AI Assessment</span>
                        <p className="text-[12px] text-white/45 mt-2 leading-[1.5] italic">
                          "Document register not current. Last 4 revisions missing from master list."
                        </p>
                      </div>
                    )}
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
            {/* Atlas Copilot Voice */}
            <div className="px-4 py-4 border-b border-white/6 flex flex-col items-center">
              <span className="text-[14px] font-bold text-white tracking-wide mb-3">Atlas Copilot</span>
              <div className="relative flex items-center justify-center">
                <AnimatePresence>
                  {micActive && (
                    <>
                      <motion.div initial={{ scale: 0.8, opacity: 0.4 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-16 h-16 rounded-full border border-[#3DC88E]/25" />
                      <motion.div initial={{ scale: 0.9, opacity: 0.3 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="absolute w-16 h-16 rounded-full border border-[#3DC88E]/15" />
                    </>
                  )}
                </AnimatePresence>
                <motion.div
                  animate={micActive ? { boxShadow: ["0 0 15px rgba(61,200,142,0.2)", "0 0 30px rgba(61,200,142,0.4)", "0 0 15px rgba(61,200,142,0.2)"] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${micActive ? "bg-[#3DC88E]/15 border-2 border-[#3DC88E]" : "bg-white/5 border-2 border-white/15"}`}
                >
                  <svg className={`w-6 h-6 ${micActive ? "text-[#3DC88E]" : "text-white/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="9" y="1" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0014 0" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="8" y1="21" x2="16" y2="21" />
                  </svg>
                </motion.div>
              </div>
              <span className={`text-[12px] font-medium mt-2 ${micActive ? "text-[#3DC88E]" : "text-white/30"}`}>
                {micActive ? "Listening..." : "Tap to speak"}
              </span>
              {/* Waveform */}
              <AnimatePresence>
                {micActive && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-0.5 mt-2">
                    {[...Array(14)].map((_, i) => (
                      <motion.div key={i} className="w-[3px] rounded-full bg-[#3DC88E]" animate={{ height: [2, Math.random() * 12 + 3, 2] }}
                        transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, repeatType: "reverse", delay: i * 0.04 }} />
                    ))}
                  </motion.div>
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
