import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Pause, Play } from "lucide-react";
import LNGPredictionModal from "./LNGPredictionModal";
import LNGClaimModal from "./LNGClaimModal";

/* ── Scroll Nav ── */
const ScrollNav = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) => {
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanUp(el.scrollTop > 10);
      setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
    };
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, [scrollRef]);
  const scroll = (dir: "up" | "down") => {
    scrollRef.current?.scrollBy({ top: dir === "up" ? -120 : 120, behavior: "smooth" });
  };
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10">
      <button onClick={() => scroll("up")} className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${canUp ? "bg-white/10 text-white/50 hover:bg-white/20" : "opacity-0 pointer-events-none"}`}>
        <ChevronUp className="w-3.5 h-3.5" />
      </button>
      <button onClick={() => scroll("down")} className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${canDown ? "bg-white/10 text-white/50 hover:bg-white/20" : "opacity-0 pointer-events-none"}`}>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/* ── LNG Atlas AI Demo ── */
const LNGAtlasDemo = () => {
  const [paused, setPaused] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const [step, setStep] = useState(0);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const middleScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // Animation timeline
  useEffect(() => {
    setStep(0);
    const timers: number[] = [];
    const t = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(() => {
        if (!pausedRef.current) fn();
        else {
          // Retry when unpaused
          const retry = () => {
            if (!pausedRef.current) fn();
            else window.setTimeout(retry, 500);
          };
          window.setTimeout(retry, 500);
        }
      }, delay));
    };

    // NCR Detection phase
    t(400, () => setStep(1));
    t(1000, () => setStep(2));
    t(1800, () => setStep(3));
    t(2800, () => setStep(4));
    // Prediction Analysis phase
    t(4000, () => setStep(5));
    t(5500, () => setStep(6));
    t(7000, () => setStep(7));
    t(8500, () => setStep(8));
    // Claim Generation phase
    t(10000, () => setStep(9));
    t(11500, () => setStep(10));
    t(13000, () => setStep(11));
    t(14500, () => setStep(12));
    // Capital Hemorrhage overview
    t(16000, () => setStep(13));
    t(18000, () => setStep(14));
    // Restart
    t(22000, () => setLoopKey(k => k + 1));

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  const togglePause = useCallback(() => setPaused(p => !p), []);

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-full bg-[hsl(220,18%,13%)] rounded-[16px] md:rounded-[20px] border border-white/10 flex flex-col overflow-hidden relative">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 md:px-8 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#AE3D3D] animate-pulse" />
              <span className="text-[12px] text-white/40 font-medium tracking-wider uppercase">NCR Investigation</span>
            </div>
            <span className="text-[14px] font-bold text-white tracking-wide">Atlas AI · EPC Inspector View</span>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePause}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
              >
                {paused ? <Play className="w-3 h-3 text-[#6EA996]" /> : <Pause className="w-3 h-3 text-white/50" />}
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{paused ? "Play" : "Pause"}</span>
              </button>
              <div className="w-24 h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  key={loopKey}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 22, ease: "linear" }}
                  className="h-full bg-[#6EA996] rounded-full"
                  style={paused ? { animationPlayState: "paused" } : {}}
                />
              </div>
            </div>
          </div>

          {/* Main 3-Column */}
          <div className="flex-1 flex overflow-hidden min-h-0">

            {/* LEFT — NCR Defect List & Evidence */}
            <div className="flex-[25] border-r border-white/[0.03] flex flex-col overflow-hidden">
              <div className="px-4 py-3">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">NCR Defects</span>
                <div className="text-[10px] text-white/25 mt-1">G1-22E05 · Deethanizer Condenser</div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 relative" ref={leftScrollRef} style={{ scrollbarWidth: "none" }}>
                <ScrollNav scrollRef={leftScrollRef} />
                {[
                  { id: "DEF-1", name: "Underfilled Weld", severity: "MAJOR", loc: "Seam joint", active: step >= 1 },
                  { id: "DEF-2", name: "Surface Crack (HAZ)", severity: "CRITICAL", loc: "40mm from toe", active: step >= 2 },
                  { id: "DEF-3", name: "Longitudinal Crack", severity: "CRITICAL", loc: "Seam weld", active: step >= 2 },
                  { id: "DEF-4", name: "Rust Contamination", severity: "MAJOR", loc: "Saddle support", active: step >= 3 },
                  { id: "DEF-5", name: "General Weld Quality", severity: "MAJOR", loc: "Multiple", active: step >= 3 },
                ].map((defect, i) => (
                  <motion.div key={defect.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: defect.active ? 1 : 0.2, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-lg px-3 py-2.5 ${i === 0 && step >= 4 ? 'bg-[#AE3D3D]/8 border border-[#AE3D3D]/25' : 'bg-white/[0.03] border border-transparent'}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-mono text-white/40">{defect.id}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${defect.severity === 'CRITICAL' ? 'bg-[#AE3D3D]/20 text-[#AE3D3D]' : 'bg-[#F5A623]/20 text-[#F5A623]'}`}>{defect.severity}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-white">{defect.name}</div>
                    <div className="text-[9px] text-white/30 mt-0.5">{defect.loc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Evidence */}
              <div className="px-4 py-4 border-t border-white/[0.05]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Evidence</span>
                  <span className={`text-[12px] font-bold ${step >= 8 ? "text-[#6EA996]" : "text-[#F5A623]"}`}>
                    {step >= 8 ? "5/5 ✓" : step >= 3 ? "3/5" : "0/5"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {step >= 1 && <EvidenceItem name="weld_underfill.jpg" type="img" status="verified" />}
                  {step >= 2 && <EvidenceItem name="HAZ_crack_40mm.jpg" type="img" status="verified" />}
                  {step >= 3 && <EvidenceItem name="rust_saddle.jpg" type="img" status={step >= 4 ? "verified" : "review"} />}
                  {step >= 8 && <EvidenceItem name="mill_certificate.pdf" type="doc" status="verified" />}
                  {step >= 8 && <EvidenceItem name="WPS_deviation_log.pdf" type="doc" status="verified" />}
                </div>
              </div>
            </div>

            {/* MIDDLE — AI Analysis Flow */}
            <div className="flex-[45] border-r border-white/[0.03] flex flex-col overflow-hidden">
              <div className="px-6 py-3 border-b border-white/[0.05]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">AI Investigation</span>
                  {step >= 5 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 px-2 py-1 border border-[#6EA996]/40 rounded">
                      <div className="w-1.5 h-1.5 bg-[#6EA996] rounded-full animate-pulse" />
                      <span className="text-[9px] text-[#6EA996] font-bold uppercase">AI Active</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div ref={middleScrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3 relative" style={{ scrollbarWidth: "none" }}>
                <ScrollNav scrollRef={middleScrollRef} />

                {/* Root Cause Analysis */}
                <AnimatePresence>
                  {step >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-[#AE3D3D]/8 border border-[#AE3D3D]/20 rounded-lg p-4">
                      <div className="text-[12px] font-bold text-[#AE3D3D] uppercase tracking-wider mb-2">Root Cause — 5-Why Analysis</div>
                      <div className="space-y-1">
                        {["Underfilled weld + HAZ crack detected", "↳ Poor joint preparation by welder", "↳ Welder not qualified per ASME Section IX", "↳ No third-party inspection during FAT", "↳ Fabricator QMS failure — production pressure"].map((why, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
                            className={`text-[11px] ${i === 0 ? 'text-white font-semibold' : 'text-white/50'}`}>
                            {why}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Prediction Analysis */}
                <AnimatePresence>
                  {step >= 5 && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-bold text-[#F5A623] uppercase tracking-wider">Repair Prediction Analysis</span>
                        <button
                          onClick={() => setShowPredictionModal(true)}
                          className="text-[9px] font-bold text-[#6EA996] border border-[#6EA996]/30 px-2 py-1 rounded hover:bg-[#6EA996]/10 transition-colors"
                        >
                          View Full Report →
                        </button>
                      </div>
                      {step >= 6 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {[
                              { label: "Best Case", value: "42d", cost: "€52K", color: "text-[#6EA996]" },
                              { label: "Most Likely", value: "56d", cost: "€74K", color: "text-[#F5A623]" },
                              { label: "Worst Case", value: "84d", cost: "€128K", color: "text-[#AE3D3D]" },
                            ].map((s) => (
                              <div key={s.label} className="text-center bg-white/[0.03] rounded p-2">
                                <div className="text-[9px] text-white/40 uppercase">{s.label}</div>
                                <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                                <div className="text-[10px] text-white/50">{s.cost}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {step >= 7 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                          {[
                            { cause: "Welder Qualification", prob: 95 },
                            { cause: "Insufficient FAT", prob: 90 },
                            { cause: "WPS Deviation", prob: 85 },
                            { cause: "H₂ Cracking", prob: 75 },
                          ].map((rc) => (
                            <div key={rc.cause} className="flex items-center gap-2">
                              <span className="text-[10px] text-white/50 w-28 truncate">{rc.cause}</span>
                              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${rc.prob}%` }} transition={{ duration: 0.6 }}
                                  className={`h-full rounded-full ${rc.prob >= 90 ? 'bg-[#AE3D3D]' : rc.prob >= 80 ? 'bg-[#F5A623]' : 'bg-white/30'}`} />
                              </div>
                              <span className="text-[10px] font-mono text-white/40 w-8 text-right">{rc.prob}%</span>
                            </div>
                          ))}
                          <div className="text-[10px] text-[#6EA996] font-medium mt-2">
                            ✓ Recommended: Return to Fabricator (56 days, €74K, 70% success)
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Claim Generation */}
                <AnimatePresence>
                  {step >= 9 && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-[#AE3D3D]/8 border border-[#AE3D3D]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-bold text-[#AE3D3D] uppercase tracking-wider">AI Claim Letter Generated</span>
                        <button
                          onClick={() => setShowClaimModal(true)}
                          className="text-[9px] font-bold text-[#AE3D3D] border border-[#AE3D3D]/30 px-2 py-1 rounded hover:bg-[#AE3D3D]/10 transition-colors"
                        >
                          View Full Claim →
                        </button>
                      </div>
                      {step >= 10 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-bold text-[#AE3D3D]">€76,400</span>
                            <span className="text-sm text-white/30">—</span>
                            <span className="text-2xl font-bold text-[#AE3D3D]">€118,000</span>
                          </div>
                          <div className="space-y-1 text-[10px] text-white/50">
                            <div className="flex justify-between"><span>Direct Repair</span><span className="text-white">€34K–€57K</span></div>
                            <div className="flex justify-between"><span>Schedule Impact</span><span className="text-white">€15K–€44K</span></div>
                            <div className="flex justify-between"><span>Inspection/Engineering</span><span className="text-white">€12K–€19K</span></div>
                            <div className="flex justify-between"><span>Logistics</span><span className="text-white">€11K–€16.5K</span></div>
                          </div>
                        </motion.div>
                      )}
                      {step >= 11 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-t border-[#AE3D3D]/20 space-y-1">
                          <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Breach Basis</div>
                          {["Express Warranties — GOST-34347-2017", "Implied Warranty of Merchantability", "Failure to perform FAT", "Preservation non-compliance"].map((b, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#AE3D3D]" />
                              <span className="text-[10px] text-white/50">{b}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Capital Hemorrhage Prevention */}
                <AnimatePresence>
                  {step >= 13 && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-lg p-4">
                      <div className="text-[12px] font-bold text-white uppercase tracking-wider mb-3">Capital Hemorrhage Prevention</div>
                      <div className="space-y-2">
                        {[
                          { icon: "💰", title: "Uncontested Supplier Claims", desc: "Paying for errors we cannot disprove", saving: "€76K–€118K recovered", color: "text-[#AE3D3D]" },
                          { icon: "⏱", title: "Uncollected Penalties", desc: "Inability to attribute delays", saving: "23 days schedule protected", color: "text-[#F5A623]" },
                          { icon: "🔍", title: "Late Detection Costs", desc: "The 10× multiplier rule", saving: "95% defect detection rate", color: "text-[#6EA996]" },
                        ].map((leak, i) => (
                          <motion.div key={leak.title} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex items-start gap-3 bg-white/[0.03] rounded-lg p-3">
                            <span className="text-lg">{leak.icon}</span>
                            <div className="flex-1">
                              <div className="text-[11px] font-semibold text-white">{leak.title}</div>
                              <div className="text-[10px] text-white/40">{leak.desc}</div>
                              <div className={`text-[10px] font-bold ${leak.color} mt-1`}>→ {leak.saving}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input bar */}
              <div className="px-6 py-3 border-t border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 border border-white/8 rounded-lg px-4 py-2.5 flex items-center">
                    <span className="text-[12px] text-white/25">Ask Atlas AI about this NCR...</span>
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center bg-[#6EA996] rounded-lg shrink-0">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — Intelligence Panel */}
            <div className="flex-[30] flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.05]">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Intelligence</span>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative" ref={rightScrollRef} style={{ scrollbarWidth: "none" }}>
                <ScrollNav scrollRef={rightScrollRef} />

                {/* WPS Deviation Analysis */}
                {step >= 3 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-lg p-4">
                    <span className="text-[12px] font-bold text-[#F5A623] uppercase tracking-wider">WPS Deviations</span>
                    <div className="mt-2 space-y-1.5">
                      {[
                        { param: "Preheat", spec: "150°C", actual: "<100°C" },
                        { param: "Heat Input", spec: "1.5 kJ/mm", actual: ">2.0 kJ/mm" },
                        { param: "Electrode", spec: "120°C oven", actual: "Ambient" },
                      ].map((d) => (
                        <div key={d.param} className="flex items-center justify-between text-[10px]">
                          <span className="text-white/40">{d.param}</span>
                          <span className="text-[#6EA996]">{d.spec}</span>
                          <span className="text-[#AE3D3D]">{d.actual}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Compliance Status */}
                {step >= 4 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-lg p-4">
                    <span className="text-[12px] font-bold text-[#AE3D3D] uppercase tracking-wider">Compliance</span>
                    <div className="mt-2 space-y-2">
                      {[
                        { std: "GOST-34347-2017 §5.2", status: "FAIL", note: "Zero tolerance: cracks" },
                        { std: "ASME Section IX", status: "FAIL", note: "Welder qual. expired" },
                        { std: "GSP-QA-PR-004", status: "FAIL", note: "Preservation violation" },
                      ].map((c) => (
                        <div key={c.std} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#AE3D3D] mt-1.5 flex-shrink-0" />
                          <div>
                            <div className="text-[10px] text-white/60 font-medium">{c.std}</div>
                            <div className="text-[9px] text-white/30">{c.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Financial Impact */}
                {step >= 8 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#6EA996]/8 border border-[#6EA996]/20 rounded-lg p-4">
                    <span className="text-[12px] font-bold text-[#6EA996] uppercase tracking-wider">Financial Impact</span>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/50">Claim Recovery</span>
                        <span className="text-white font-bold">€76K–€118K</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/50">Schedule Protected</span>
                        <span className="text-white font-bold">23 days</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/50">Delay Cost Avoided</span>
                        <span className="text-[#6EA996] font-bold">$1.2M/day</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Vendor Rating */}
                {step >= 12 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-lg p-4">
                    <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Vendor Rating Update</span>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-white/40">Shanghai Bu Hau Tech.</span>
                        <span className="text-[#AE3D3D] font-bold">2.1/10</span>
                      </div>
                      <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "21%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-[#AE3D3D]" />
                      </div>
                      <div className="text-[11px] text-[#AE3D3D] font-semibold">⚠ Recommended: Probation / Debarment</div>
                    </div>
                  </motion.div>
                )}

                {/* AI Summary */}
                {step >= 14 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-[#F5A623]/8 border border-[#F5A623]/25 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-bold text-white">AI Summary</span>
                      <span className="text-[#F5A623]">⚡</span>
                    </div>
                    <p className="text-[11px] text-white/45 leading-[1.6]">
                      NCR investigation complete. 5 major defects traced to fabricator QMS failure. Prediction: 56-day repair, €74K. Formal claim generated: €76K–€118K. Without YVOO, this would be an uncontested supplier claim — capital hemorrhage.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LNGPredictionModal open={showPredictionModal} onClose={() => setShowPredictionModal(false)} />
      <LNGClaimModal open={showClaimModal} onClose={() => setShowClaimModal(false)} />
    </>
  );
};

/* ── Sub-components ── */
const EvidenceItem = ({ name, type, status }: { name: string; type: "img" | "doc"; status: "verified" | "review" }) => (
  <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${status === "review" ? "bg-[#F5A623]/5 border border-[#F5A623]/15" : "bg-white/5 border border-transparent"}`}>
    <span className="text-[12px]">{type === "img" ? "🖼" : "📄"}</span>
    <span className="text-[10px] text-white/40 truncate flex-1">{name}</span>
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${status === "verified" ? "bg-[#6EA996]/15 text-[#6EA996]" : "bg-[#F5A623]/15 text-[#F5A623]"}`}>
      {status === "verified" ? "✓" : "⚠"}
    </span>
  </div>
);

export default LNGAtlasDemo;
