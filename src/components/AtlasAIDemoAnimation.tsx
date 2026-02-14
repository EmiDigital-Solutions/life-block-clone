import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AtlasAIDemoAnimation = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showFinding, setShowFinding] = useState(false);
  const [vis, setVis] = useState(0);

  useEffect(() => {
    const t = [400, 1200, 2400, 3600].map((d, i) => setTimeout(() => setVis(i + 1), d));
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSelectedAnswer("NO"), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowFinding(true), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full bg-[hsl(220,18%,13%)] rounded-[16px] md:rounded-[20px] border border-white/10 flex flex-col overflow-hidden relative">

        {/* Top Bar — 8px system */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--primary))]" />
            <span className="text-[12px] text-white/40 font-medium tracking-wider uppercase">Live Audit</span>
          </div>
          <span className="text-[14px] font-bold text-white tracking-wide">Atlas AI · Auditor View</span>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-white/30 hidden md:inline">45%</span>
            <div className="w-20 h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-[hsl(var(--primary))] rounded-full" />
            </div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* LEFT — Checklist */}
          <div className="flex-[25] border-r border-white/6 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/6">
              <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Checklist</span>
              <div className="text-[12px] text-white/25 mt-1">IATF 16949 · Precision Parts</div>
            </div>

            {/* Items — 1.5 line-height, 8px spacing */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              <div className="text-[12px] font-bold text-white/40 mb-2">▼ 4. QUALITY MGMT</div>
              <CheckItem done label="4.1.1 Process Approach" />
              <div className="text-[12px] font-semibold text-white/35 pl-4 mt-2 mb-1">▼ 4.2 Documentation</div>
              <CheckItem done label="4.2.1 General" indent />
              <CheckItem done label="4.2.2 Quality Manual" indent />
              {/* Active */}
              <div className="bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/25 rounded-lg px-3 py-2.5 ml-4 my-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
                  <span className="text-[14px] font-bold text-white leading-relaxed">4.2.3 Control</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-destructive text-white font-bold rounded ml-5 inline-block mt-1">HIGH RISK</span>
              </div>
              <CheckItem label="4.2.4 Records" indent pending />
              <div className="text-[12px] font-bold text-white/40 mt-4 mb-2">▶ 5. MANAGEMENT</div>
              <CheckItem label="5.1 Commitment" pending />
              <CheckItem label="5.2 Customer Focus" pending />
            </div>

            {/* Evidence — clear requirements */}
            <div className="border-t border-white/6 px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Evidence Required</span>
                <span className="text-[12px] text-[hsl(var(--primary))] font-bold">3 / 5</span>
              </div>
              <div className="space-y-2">
                <EvidenceItem name="IMG_2847.jpg" type="img" status="verified" />
                <EvidenceItem name="calibration_cert.pdf" type="doc" status="review" />
                <EvidenceItem name="CNC_nameplate.jpg" type="img" status="verified" />
              </div>
              <div className="mt-3 p-2 rounded-lg border border-dashed border-white/15 text-center">
                <span className="text-[12px] text-white/30">+ 2 more required</span>
              </div>
            </div>
          </div>

          {/* MIDDLE — Question + AI Guidance */}
          <div className="flex-[45] border-r border-white/6 flex flex-col overflow-hidden">
            {/* Question — 30% larger, more padding */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-6 py-6 border-b border-white/6">
              <span className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-3 block">Question 7 of 24</span>
              <p className="text-[18px] md:text-[20px] text-white font-semibold leading-relaxed mb-6">
                Is the fire suppression system compliant with local regulations?
              </p>
              {/* Color-coded answer buttons with hierarchy */}
              <div className="flex gap-3">
                <AnswerButton label="YES" color="success" selected={selectedAnswer === "YES"} />
                <AnswerButton label="NO" color="destructive" selected={selectedAnswer === "NO"} />
                <AnswerButton label="N/A" color="neutral" selected={selectedAnswer === "N/A"} />
              </div>
            </motion.div>

            {/* AI Guidance — collapsed by default, progressive disclosure */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {vis >= 1 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <button
                    onClick={() => setShowGuidance(!showGuidance)}
                    className="w-full flex items-center justify-between bg-white/5 hover:bg-white/8 rounded-lg px-4 py-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-[hsl(var(--primary))] uppercase tracking-wider">AI Guidance</span>
                      <span className="text-[10px] px-2 py-0.5 bg-destructive/20 text-destructive font-bold rounded">HIGH PRIORITY</span>
                    </div>
                    <span className="text-[14px] text-white/30">{showGuidance ? "▲" : "▼"}</span>
                  </button>

                  <AnimatePresence>
                    {showGuidance && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-3">
                          <div className="bg-[hsl(var(--primary))]/8 border border-[hsl(var(--primary))]/15 rounded-lg p-4">
                            <p className="text-[12px] text-white/50 leading-relaxed">
                              BMW Tier-2 rejected 2 suppliers for document control gaps. Issues found in 73% of 47 similar audits.
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4">
                            <span className="text-[12px] font-semibold text-white/45 uppercase tracking-wider">What to Check</span>
                            <div className="mt-2 space-y-2">
                              {["Document control procedure exists?", "Approval signatures on documents?", "Revision history tracked?"].map((q, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="text-[12px] text-[hsl(var(--primary))] font-bold shrink-0">{i + 1}.</span>
                                  <span className="text-[12px] text-white/50 leading-relaxed">{q}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {vis >= 2 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-lg p-4">
                  <span className="text-[12px] font-semibold text-[hsl(160,50%,50%)] uppercase tracking-wider">Common Issues</span>
                  <div className="mt-2 space-y-2">
                    {["Register not used (73%)", "Obsolete docs accessible (68%)", "Missing signatures (54%)"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[hsl(160,50%,50%)]" />
                        <span className="text-[12px] text-white/45 leading-relaxed">{t}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/6 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/5 border border-white/8 rounded-lg px-4 py-2.5">
                  <span className="text-[12px] text-white/25">Add observation or note...</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center bg-[hsl(var(--primary))] rounded-lg shrink-0 hover:bg-[hsl(var(--primary))]/80 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Simplified Copilot: current state only */}
          <div className="flex-[30] flex flex-col overflow-hidden">
            {/* Status Header */}
            <div className="px-4 py-4 border-b border-white/6">
              <span className="text-[14px] font-bold text-white tracking-wide">Current Status</span>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-[12px] text-white/50">Non-Conformance Detected</span>
              </div>
            </div>

            {/* Intelligence — semantic colors */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <IntelCard title="Risk Level" semantic="destructive">
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[14px] font-bold text-white">High</span>
                  <span className="text-[12px] text-white/40">78% failure rate</span>
                </div>
                <BarRound value={78} color="bg-destructive" />
              </IntelCard>

              <IntelCard title="Benchmark" semantic="neutral">
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">This supplier</span><span className="text-white/60 font-bold">7.2</span></div>
                  <BarRound value={72} />
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">Industry avg</span><span className="text-white/60 font-bold">8.1</span></div>
                  <BarRound value={81} color="bg-white/20" />
                </div>
              </IntelCard>

              {/* AI Finding — progressive */}
              <AnimatePresence>
                {showFinding && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="border border-[hsl(40,90%,50%)]/25 rounded-lg p-4 bg-[hsl(40,90%,50%)]/5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[14px] font-bold text-white">AI Finding</span>
                      <span className="text-[hsl(40,90%,50%)]">⚠</span>
                    </div>
                    <p className="text-[12px] text-white/45 leading-relaxed mb-3">Check pressure gauge on adjacent unit. Calibration expired 2024-11.</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 text-[12px] font-bold text-[hsl(150,60%,45%)] border border-[hsl(150,60%,45%)]/25 rounded-lg bg-[hsl(150,60%,45%)]/5 hover:bg-[hsl(150,60%,45%)]/10 transition-colors uppercase tracking-wider">Accept</button>
                      <button className="flex-1 py-2 text-[12px] font-bold text-white/35 border border-white/10 rounded-lg bg-white/5 hover:bg-white/8 transition-colors uppercase tracking-wider">Dismiss</button>
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

const AnswerButton = ({ label, color, selected }: { label: string; color: "success" | "destructive" | "neutral"; selected: boolean }) => {
  const colors = {
    success: { border: "border-[hsl(150,60%,45%)]", bg: "bg-[hsl(150,60%,45%)]", shadow: "shadow-[hsl(150,60%,45%)]/20" },
    destructive: { border: "border-destructive", bg: "bg-destructive", shadow: "shadow-destructive/20" },
    neutral: { border: "border-white/20", bg: "bg-white/15", shadow: "" },
  };
  const c = colors[color];

  return (
    <motion.button
      animate={selected ? { scale: 1.05 } : { scale: 1 }}
      className={`flex-1 py-3 text-[16px] font-bold rounded-lg border-2 transition-all duration-300 ${
        selected
          ? `${c.bg} ${c.border} text-white shadow-lg ${c.shadow}`
          : `${c.border} text-white/50 bg-white/5 hover:bg-white/8`
      }`}
    >
      {label}
    </motion.button>
  );
};

const CheckItem = ({ done, label, indent, pending }: { done?: boolean; label: string; indent?: boolean; pending?: boolean }) => (
  <div className={`flex items-center gap-2 py-1.5 leading-relaxed ${indent ? "pl-4" : "pl-1"}`}>
    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${done ? "bg-[hsl(150,60%,45%)]" : "border border-white/15"}`}>
      {done && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>}
    </div>
    <span className={`text-[12px] leading-relaxed ${done ? "text-white/40" : pending ? "text-white/20" : "text-white/50"}`}>{label}</span>
  </div>
);

const EvidenceItem = ({ name, type, status }: { name: string; type: "img" | "doc"; status: "verified" | "review" }) => (
  <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
    <span className="text-[12px]">{type === "img" ? "🖼" : "📄"}</span>
    <span className="text-[12px] text-white/35 truncate flex-1">{name}</span>
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${status === "verified" ? "bg-[hsl(150,60%,45%)]/15 text-[hsl(150,60%,45%)]" : "bg-[hsl(40,90%,50%)]/15 text-[hsl(40,90%,50%)]"}`}>
      {status === "verified" ? "✓ Done" : "Needed"}
    </span>
  </div>
);

const IntelCard = ({ title, semantic = "neutral", children }: { title: string; semantic?: "destructive" | "neutral"; children: React.ReactNode }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <span className={`text-[12px] font-bold uppercase tracking-wider ${semantic === "destructive" ? "text-destructive" : "text-white/50"}`}>{title}</span>
    {children}
  </div>
);

const BarRound = ({ value, color = "bg-[hsl(var(--primary))]", delay = 0.3 }: { value: number; color?: string; delay?: number }) => (
  <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden mt-1">
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, delay }} className={`h-full rounded-full ${color}`} />
  </div>
);

export default AtlasAIDemoAnimation;
