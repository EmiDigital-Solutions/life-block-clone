import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import evidenceCNC from "@/assets/evidence-cnc-machine.jpg";
import evidenceCMM from "@/assets/evidence-cmm-measurement.jpg";
import evidenceControlPlan from "@/assets/evidence-control-plan.jpg";
import evidenceAssembly from "@/assets/evidence-assembly-station.jpg";
import evidenceCertification from "@/assets/evidence-certification.jpg";
import evidenceInspector from "@/assets/evidence-inspector.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";
import auditorGen4 from "@/assets/auditor-gen-4.jpg";

const SCREEN_DURATION = 5000;

/* Light grey background color for all screens */
const SCREEN_BG = "bg-[hsl(0,0%,92%)]";

/* ── White frosted glass cards — subtle transparency on grey ── */
const GlassCard = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
  const layerBg = layer === 1
    ? 'bg-white/70 border-white/80'
    : layer === 2
    ? 'bg-white/75 border-white/85'
    : 'bg-white/80 border-white/90';
  return (
    <div className={`border backdrop-blur-md ${highlight ? 'border-accent/40 bg-white/85' : layerBg} ${className}`}>
      {children}
    </div>
  );
};

/* Stat with superscript delta */
const BigStat = ({ value, delta, label, unit = "" }: { value: string; delta?: string; label?: string; unit?: string }) => (
  <div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-foreground tracking-tight">{value}</span>
      {unit && <span className="text-base font-medium text-foreground/70">{unit}</span>}
      {delta && <span className="text-xs font-semibold text-accent ml-1 -translate-y-3">{delta}</span>}
    </div>
    {label && <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>}
  </div>
);

/* Mini bar chart */
const BarChart = ({ bars, accentIndex = -1 }: { bars: number[]; accentIndex?: number }) => (
  <div className="flex items-end gap-[3px] h-14">
    {bars.map((h, i) => (
      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
        transition={{ duration: 0.4, delay: i * 0.03 }}
        className={`w-[4px] ${i === accentIndex ? 'bg-accent' : 'bg-foreground/25'}`}
      />
    ))}
  </div>
);

/* Overflowing donut chart — clips at card boundary */
const DonutScore = ({ score, size = 160, labelSize = "text-2xl" }: { score: number; size?: number; labelSize?: string }) => {
  const strokeW = Math.max(6, size * 0.07);
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const tickCount = 60;
  const tickR = r + strokeW + 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: tickCount }).map((_, i) => {
          const angle = (i / tickCount) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const cx = size / 2;
          const cy = size / 2;
          const x1 = cx + Math.cos(rad) * (tickR - 3);
          const y1 = cy + Math.sin(rad) * (tickR - 3);
          const x2 = cx + Math.cos(rad) * (tickR + 1);
          const y2 = cy + Math.sin(rad) * (tickR + 1);
          const filled = i / tickCount <= score / 100;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={filled ? 'hsl(161,26%,55%)' : 'hsl(0,0%,60%)'}
              strokeWidth={0.8} strokeLinecap="square" />
          );
        })}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="hsl(0,0%,82%)" strokeWidth={strokeW} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="hsl(161,26%,55%)" strokeWidth={strokeW} strokeLinecap="square"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className={`${labelSize} font-bold text-foreground leading-none`}>{score}%</div>
        <div className="text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">Score</div>
      </div>
    </div>
  );
};

/* Segmented toggle — squared, ORION style */
const SegmentedToggle = ({ items, activeIndex }: { items: string[]; activeIndex: number }) => (
  <div className="flex border border-foreground/15 overflow-hidden">
    {items.map((item, i) => (
      <div key={item} className={`px-4 py-2 text-xs font-semibold tracking-wide transition-colors flex-1 text-center ${
        i === activeIndex ? 'bg-foreground text-background' : 'bg-transparent text-foreground/50'
      }`}>
        {item}
      </div>
    ))}
  </div>
);

// ─── SCREEN 1: DISCOVER ────────────────────────────────────────
const DiscoverScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => setPhase(6), 3800),
      setTimeout(() => setPhase(7), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const suppliers = [
    { name: "PräzisionsTech GmbH", location: "Stuttgart, DE", industry: "CNC Machining", score: 94, certs: "ISO 9001, AS9100" },
    { name: "AeroComponents SA", location: "Toulouse, FR", industry: "Aerospace Parts", score: 89, certs: "EN 9100, ISO 14001" },
    { name: "TurboValve Ltd", location: "Sheffield, UK", industry: "Valve Manufacturing", score: 86, certs: "ISO 9001, PED" },
  ];

  return (
    <div className={`h-full flex ${SCREEN_BG}`}>
      {/* LEFT PANEL — Client Input */}
      <div className="w-[42%] flex flex-col border-r border-foreground/10">
        <div className="px-4 py-3 border-b border-foreground/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">New Audit Order</span>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Supplier name inputs */}
          {phase >= 0 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Suppliers to Audit</div>
              <div className="space-y-1.5">
                {suppliers.map((s, i) => (
                  <motion.div key={s.name} initial={{ opacity: 0, x: -4 }} animate={{ opacity: phase >= 1 ? 1 : i === 0 ? 1 : 0.3, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-2 border-b border-foreground/10 pb-1.5">
                    <div className={`w-4 h-4 flex items-center justify-center ${phase >= 2 ? 'bg-accent' : 'border border-foreground/20'}`}>
                      {phase >= 2 && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                    </div>
                    <span className="text-sm text-foreground font-medium">{s.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Standards selection */}
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Audit Standard</div>
              <div className="flex gap-1.5">
                {["ISO 9001", "AS9100", "IATF"].map((std, i) => (
                  <div key={std} className={`px-3 py-1.5 text-xs font-semibold ${i === 0 ? 'bg-foreground text-background' : 'border border-foreground/15 text-foreground/50'}`}>
                    {std}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Document upload */}
          {phase >= 3 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Documents & Checklists</div>
              <GlassCard layer={2} className="p-3">
                <div className="space-y-1.5">
                  {[
                    { name: "ISO_9001_Checklist.pdf", size: "2.4 MB" },
                    { name: "Custom_Requirements.xlsx", size: "1.1 MB" },
                    { name: "Supplier_Specs.pdf", size: "3.8 MB" },
                  ].map((file, i) => (
                    <motion.div key={file.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-foreground/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-xs text-foreground font-medium flex-1">{file.name}</span>
                      <span className="text-[10px] text-muted-foreground">{file.size}</span>
                      <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Timeline */}
          {phase >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Timeline</div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-foreground text-background text-xs font-semibold">3 Business Days</div>
                <span className="text-xs text-muted-foreground">per audit</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL — Supplier Cards + AI Guidance */}
      <div className="w-[58%] flex flex-col">
        <div className="px-4 py-3 border-b border-foreground/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">AI Supplier Intelligence</span>
          {phase >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-1 px-2 py-1 border border-accent/40">
              <div className="w-1.5 h-1.5 bg-accent" />
              <span className="text-[9px] text-accent font-bold uppercase">AI Verified</span>
            </motion.div>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* AI searching indicator */}
          {phase >= 2 && phase < 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-foreground/60">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-foreground/40 border-t-transparent rounded-full" />
              <span>{phase < 4 ? "AI analyzing suppliers…" : "Building intelligence profiles…"}</span>
            </motion.div>
          )}

          {/* 3 Supplier Cards — square, stacked */}
          {phase >= 5 && (
            <div className="flex flex-col gap-2.5 flex-1 overflow-auto">
              {suppliers.map((s, i) => {
                const riskWidths = [[88, 82, 95], [84, 90, 87], [79, 85, 92]];
                return (
                  <motion.div key={s.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}>
                    <GlassCard highlight={i === 0} layer={2} className="p-4 flex gap-4 aspect-[3/1]">
                      {/* Score block */}
                      <div className={`w-14 h-14 flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-accent text-foreground' : 'bg-foreground/10 text-foreground'}`}>
                        <span className="text-lg font-bold">{s.score}%</span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-base font-semibold text-foreground truncate">{s.name}</span>
                          {i === 0 && <span className="text-[9px] text-accent font-bold uppercase flex-shrink-0">Best Match</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{s.location} · {s.industry}</div>
                        <div className="text-xs text-foreground/60 mt-0.5">{s.certs}</div>
                        {/* Risk bars */}
                        <div className="flex gap-2 mt-2">
                          {["Quality", "Delivery", "Compliance"].map((r, ri) => (
                            <div key={r} className="flex-1">
                              <div className="w-full h-1.5 bg-accent/20"><div className="h-full bg-accent" style={{ width: `${riskWidths[i][ri]}%` }} /></div>
                              <span className="text-[8px] text-muted-foreground block mt-0.5">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* AI Guidance & Recommendation */}
          {phase >= 6 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard highlight className="p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-foreground block">AI Recommendation</span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed">All 3 suppliers qualify for ISO 9001 audit. PräzisionsTech shows strongest quality metrics. Recommend parallel audit execution for fastest qualification.</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Order Button */}
          {phase >= 7 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-accent text-white px-4 py-2.5 text-sm font-semibold text-center cursor-pointer">
                  Confirm & Order 3 Audits
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground block">€8,400</span>
                  <span className="text-[10px] text-muted-foreground">€2,800 / audit</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-foreground/10 text-center">
          <span className="text-[10px] text-primary tracking-wider uppercase">Step 1 of 6 · Discover</span>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 2: MATCH ────────────────────────────────────────────
const MatchScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setPhase(5), 3200),
      setTimeout(() => setPhase(6), 4000),
      setTimeout(() => setPhase(7), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const auditors = [
    { name: "Markus Hoffmann", region: "DACH", location: "Stuttgart, DE", match: 96, cert: "ISO 9001 Lead · 15 yrs", supplier: "PräzisionsTech", img: auditorGen2 },
    { name: "Dr. Anna Weber", region: "Western EU", location: "Toulouse, FR", match: 93, cert: "AS9100 Lead · 12 yrs", supplier: "AeroComponents", img: auditorGen3 },
    { name: "Thomas Richter", region: "UK & Ireland", location: "Manchester, UK", match: 89, cert: "ISO 9001 · 9 yrs", supplier: "TurboValve", img: auditorGen4 },
  ];

  const reasoningSteps = [
    "Analyzing audit requirements across 3 regions…",
    "Matching certifications: ISO 9001, AS9100, PED…",
    "Optimizing auditor proximity to supplier locations…",
    "Evaluating auditor availability for Dec timeline…",
    "3 optimal auditors selected for parallel execution",
  ];

  return (
    <div className={`h-full flex ${SCREEN_BG}`}>
      {/* LEFT PANEL — AI Reasoning */}
      <div className="w-[42%] flex flex-col border-r border-foreground/10">
        <div className="px-4 py-3 border-b border-foreground/10">
          <span className="text-sm font-semibold text-foreground">AI Matching Engine</span>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* AI reasoning steps */}
          <div className="space-y-2.5">
            {reasoningSteps.map((step, i) => (
              phase >= i + 1 && (
                <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}>
                  <div className="flex-1">
                    <span className={`text-xs leading-relaxed ${phase > i + 1 ? 'text-foreground/60' : 'text-foreground font-medium'}`}>
                      {step}
                    </span>
                    {phase === i + 1 && i < reasoningSteps.length - 1 && (
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-12 h-0.5 bg-foreground/30 mt-1" />
                    )}
                  </div>
                </motion.div>
              )
            ))}
          </div>

          {/* Matching stats */}
          {phase >= 5 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard layer={2} className="p-3">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Matching Summary</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <span className="text-lg font-bold text-foreground block">47</span>
                    <span className="text-[9px] text-muted-foreground uppercase">Evaluated</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-foreground block">12</span>
                    <span className="text-[9px] text-muted-foreground uppercase">Qualified</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-accent block">3</span>
                    <span className="text-[9px] text-muted-foreground uppercase">Selected</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Processing bar chart */}
          {phase >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={1} className="p-3">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Match Distribution</div>
                <BarChart bars={[15, 25, 35, 30, 45, 55, 60, 70, 75, 80, 85, 90, 96, 93, 89, 75, 60, 45, 30, 20]} accentIndex={12} />
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL — Selected Auditors */}
      <div className="w-[58%] flex flex-col">
        <div className="px-4 py-3 border-b border-foreground/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Selected Auditors</span>
          <span className="text-[10px] text-foreground/50 uppercase tracking-wider">3 Regions</span>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Waiting state */}
          {phase < 6 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-8 h-8 border-2 border-foreground/30 border-t-transparent rounded-full mx-auto mb-3" />
                <span className="text-xs text-muted-foreground">AI selecting optimal auditors…</span>
              </div>
            </div>
          )}

          {/* 3 Auditor cards — prominent, symmetric */}
          {phase >= 6 && (
            <div className="space-y-2.5 flex-1">
              {auditors.map((a, i) => (
                <motion.div key={a.name} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.15 }}>
                  <GlassCard highlight={i === 0} layer={2} className="p-3 flex items-center gap-3">
                    <img src={a.img} alt={a.name} className="w-11 h-11 object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-foreground truncate">{a.name}</span>
                        <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase bg-accent/15 text-accent">{a.region}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{a.cert}</div>
                      <div className="text-[10px] text-foreground/60 mt-0.5">→ {a.supplier} · {a.location}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xl font-bold text-foreground">{a.match}</span>
                      <span className="text-[10px] text-muted-foreground">%</span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Confirmation */}
          {phase >= 7 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <GlassCard highlight className="p-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-foreground">3 Auditors Confirmed</span>
                  <span className="text-[10px] text-muted-foreground block">On-site audits scheduled: Dec 18–22</span>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-foreground/10 text-center">
          <span className="text-[10px] text-primary tracking-wider uppercase">Step 2 of 6 · Match</span>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 3: AUDIT ───────────────────────────────────────────
const AuditScreen = () => {
  const [checkedItems, setCheckedItems] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCheckedItems(1), 600),
      setTimeout(() => setCheckedItems(2), 1500),
      setTimeout(() => setCheckedItems(3), 2500),
      setTimeout(() => setCheckedItems(4), 3200),
      setTimeout(() => setFlash(true), 3800),
      setTimeout(() => setFlash(false), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const checklistItems = [
    "CNC machine calibration verified",
    "Quality management system active",
    "Traceability documentation complete",
    "Operator certifications valid",
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-5 py-3 border-b border-foreground/10 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
           <span className="text-base font-semibold text-foreground">Live Audit</span>
           <span className="text-sm text-foreground/60">· PräzisionsTech GmbH</span>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="M. Hoffmann" className="w-7 h-7 object-cover" />
           <span className="text-sm text-foreground/60">M. Hoffmann</span>
         </div>
       </div>

      <div className="flex-1 flex">
        <div className="w-1/2 relative overflow-hidden">
          <img src={equipmentImage} alt="CNC Machine" className="w-full h-full object-cover" />
          <AnimatePresence>
            {flash && (
              <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} className="absolute inset-0 bg-background" />
            )}
          </AnimatePresence>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }} className="absolute top-4 left-4 right-4">
             <GlassCard highlight layer={2} className="p-3">
               <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
                 <span className="text-sm font-semibold text-accent">DMG MORI NLX 2500</span>
               </div>
               <span className="text-xs text-muted-foreground mt-1 block">AI Equipment Detection</span>
             </GlassCard>
          </motion.div>
          <div className="absolute bottom-4 left-4">
             <div className="px-3 py-1.5 bg-foreground/70 text-background text-xs font-medium">CNC Turning Center</div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col border-l border-muted-foreground/10">
           <div className="px-5 py-3 border-b border-foreground/10">
             <div className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">ISO 9001 Checklist</div>
           </div>
          <div className="flex-1 p-5 space-y-3">
             {checklistItems.map((item, i) => (
               <motion.div key={item} initial={{ opacity: 0.4 }} animate={{ opacity: i < checkedItems ? 1 : 0.4 }}
                 className="flex items-center gap-3">
                 <div className={`w-6 h-6 flex items-center justify-center transition-colors duration-300 ${
                   i < checkedItems ? 'bg-foreground' : 'border border-foreground/20'
                 }`}>
                   {i < checkedItems && (
                     <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }}
                       className="w-4 h-4 text-background" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                     </motion.svg>
                   )}
                 </div>
                 <span className={`text-base ${i < checkedItems ? 'text-foreground font-medium' : 'text-foreground/50'}`}>{item}</span>
               </motion.div>
             ))}
          </div>
          {checkedItems >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="px-5 py-3 border-t border-muted-foreground/10 flex items-center gap-2">
               <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               <span className="text-xs text-accent font-medium">Evidence photos capturing…</span>
             </motion.div>
          )}
          <div className="px-5 py-3 border-t border-muted-foreground/10 text-center">
             <span className="text-sm text-primary tracking-wider uppercase">Step 3 of 6 · Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 3.5: ATLAS AI — Computer Vision ────────────────────
const AtlasAIScreen = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => setPhase(6), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const detections = [
    { label: "CNC Lathe", confidence: 94, x: 5, y: 8, w: 90, h: 80 },
    { label: "Control Panel", confidence: 91, x: 8, y: 15, w: 22, h: 25 },
    { label: "Spindle Unit", confidence: 88, x: 55, y: 30, w: 30, h: 35 },
    { label: "Safety Guard", confidence: 96, x: 35, y: 10, w: 35, h: 20 },
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
      <div className="px-5 py-3 border-b border-foreground/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 ${phase < 4 ? 'bg-primary animate-pulse' : 'bg-accent'}`} />
          <span className="text-base font-semibold text-foreground">Atlas AI</span>
          <span className="text-sm text-foreground/60">· Computer Vision</span>
        </div>
        {phase >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-1 px-2 py-1 border border-accent/40">
            <div className="w-1.5 h-1.5 bg-accent" />
            <span className="text-[9px] text-accent font-bold uppercase">4 Objects Detected</span>
          </motion.div>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Image with scanning overlay */}
        <div className="w-3/5 relative overflow-hidden">
          <img src={equipmentImage} alt="CNC Machine" className="w-full h-full object-cover" />
          
          {/* Scanning line */}
          {phase >= 1 && phase < 4 && (
            <>
              <div className="absolute inset-0 bg-primary/5" />
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-primary/60"
              />
            </>
          )}

          {/* Detection bounding boxes */}
          {phase >= 4 && detections.map((obj, i) => (
            <motion.div
              key={obj.label}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="absolute border-2 border-primary"
              style={{ left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.w}%`, height: `${obj.h}%` }}
            >
              <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-primary" />
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="absolute -top-7 left-0 px-2.5 py-1 bg-primary flex items-center gap-1.5">
                <span className="text-background text-[11px] font-semibold whitespace-nowrap">{obj.label}</span>
                <span className="text-background/80 text-[10px]">{obj.confidence}%</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Right panel — detection results */}
        <div className="w-2/5 flex flex-col border-l border-foreground/10">
          <div className="px-4 py-3 border-b border-foreground/10">
            <span className="text-sm font-semibold text-foreground">Detection Results</span>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
            {/* Progress */}
            {phase >= 1 && phase < 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-foreground/60">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-foreground/40 border-t-transparent rounded-full" />
                <span>Analyzing equipment…</span>
              </motion.div>
            )}

            {/* Detected objects list */}
            {phase >= 4 && detections.map((obj, i) => (
              <motion.div key={obj.label} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}>
                <GlassCard layer={2} className={`p-3 flex items-center gap-3 ${i === 0 ? 'border-accent/40' : ''}`}>
                  <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-accent' : 'bg-foreground/10'}`}>
                    <svg className={`w-4 h-4 ${i === 0 ? 'text-white' : 'text-foreground/50'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-foreground block">{obj.label}</span>
                    <span className="text-[10px] text-muted-foreground">{obj.confidence}% confidence</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Equipment ID */}
            {phase >= 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard highlight className="p-3">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Identified Equipment</div>
                  <span className="text-sm font-bold text-foreground">DMG MORI NLX 2500</span>
                  <span className="text-[10px] text-muted-foreground block">Asset: MCH-2024-0847 · CE · ISO 12100</span>
                </GlassCard>
              </motion.div>
            )}

            {/* Compliance check */}
            {phase >= 6 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <GlassCard highlight className="p-3 flex items-center gap-2 border-accent/40">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-xs font-semibold text-foreground">All equipment verified & compliant</span>
                </GlassCard>
              </motion.div>
            )}
          </div>
          <div className="px-4 py-2 border-t border-foreground/10 text-center">
            <span className="text-[10px] text-primary tracking-wider uppercase">Step 4 of 6 · Atlas AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 4: INTELLIGENCE ─────────────────────────────────────
const IntelligenceScreen = () => {
  const [showElements, setShowElements] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(1), 400),
      setTimeout(() => setShowElements(2), 1200),
      setTimeout(() => setShowElements(3), 2200),
      setTimeout(() => setShowElements(4), 3200),
      setTimeout(() => { setShowElements(5); setActiveSegment(2); }, 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const evidenceImages = [evidenceCNC, evidenceCMM, evidenceControlPlan, evidenceAssembly, evidenceCertification, evidenceInspector, equipmentImage, auditorGen2];

  const auditKpis = [
    { label: "Calibration", value: 97, delta: "+4" },
    { label: "NCR Close-out", value: 94, delta: "+8" },
    { label: "Process Cap.", value: 87, delta: "+0.3" },
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-5 py-3 border-b border-foreground/10 flex items-center justify-between">
         <div>
           <div className="text-base font-semibold text-foreground">PräzisionsTech GmbH</div>
           <div className="text-sm text-foreground/60">ISO 9001 Audit Report</div>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="M. Hoffmann" className="w-7 h-7 object-cover" />
           <span className="text-sm text-foreground/60">M. Hoffmann</span>
         </div>
       </div>

      <div className="flex-1 flex">
        <div className="w-3/5 p-5 flex flex-col gap-3 overflow-hidden">
          {/* Main score — donut + stat */}
          {showElements >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard layer={2} className="p-5 flex items-center gap-5 overflow-hidden relative max-w-md">
                <div className="-ml-3 -my-1 flex-shrink-0">
                  <DonutScore score={91} size={140} labelSize="text-2xl" />
                </div>
                 <div className="flex-1">
                   <BigStat value="91.3" unit="%" delta="+2.1" />
                   <span className="text-xs text-muted-foreground uppercase tracking-wider">Overall Score</span>
                   <div className="flex items-center gap-1 text-accent text-sm font-medium mt-1.5">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z" /></svg>
                     trending up
                   </div>
                 </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Process scores + segmented toggle */}
          {showElements >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={3} className="p-2.5">
               <div className="text-xs font-semibold text-foreground mb-2">Process Scores</div>
                  <div className="flex items-end justify-between gap-2">
                    {[
                      { label: "Quality", val: 93 },
                      { label: "Equipment", val: 89 },
                      { label: "Docs", val: 94 },
                      { label: "Process", val: 88 },
                    ].map((p) => (
                      <div key={p.label} className="text-center">
                        <div className="flex items-baseline justify-center gap-0.5">
                          <span className="text-lg font-bold text-foreground">{p.val}</span>
                          <span className="text-[9px] text-muted-foreground">%</span>
                        </div>
                        <span className="text-[8px] text-muted-foreground uppercase">{p.label}</span>
                     </div>
                   ))}
                 </div>
                <div className="mt-2">
                  <SegmentedToggle items={["ISO 9001", "AS9100", "IATF"]} activeIndex={activeSegment} />
                </div>
              </GlassCard>
            </motion.div>
          )}

           {/* Audit KPI pie charts — 3 in one card */}
           {showElements >= 4 && (
             <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
               <GlassCard layer={2} className="p-5 max-w-md">
                 <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">Key Performance Indicators</div>
                 <div className="flex items-center justify-around">
                   {auditKpis.map((kpi, idx) => {
                     const size = 100;
                     const strokeW = 6;
                     const r = (size - strokeW * 2) / 2;
                     const circ = 2 * Math.PI * r;
                     const tickCount = 36;
                     const tickR = r + strokeW + 2;
                     return (
                       <motion.div key={kpi.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.2 }}
                         className="flex flex-col items-center gap-1.5">
                         <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                           <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
                             {Array.from({ length: tickCount }).map((_, i) => {
                               const angle = (i / tickCount) * 360 - 90;
                               const rad = (angle * Math.PI) / 180;
                               const cx = size / 2;
                               const cy = size / 2;
                               const x1 = cx + Math.cos(rad) * (tickR - 2);
                               const y1 = cy + Math.sin(rad) * (tickR - 2);
                               const x2 = cx + Math.cos(rad) * (tickR + 1);
                               const y2 = cy + Math.sin(rad) * (tickR + 1);
                               const filled = i / tickCount <= kpi.value / 100;
                               return (
                                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={filled ? 'hsl(161,26%,55%)' : 'hsl(0,0%,60%)'}
                                    strokeWidth={0.7} strokeLinecap="square" />
                                );
                              })}
                              <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(0,0%,82%)" strokeWidth={strokeW} />
                              <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none"
                                stroke="hsl(161,26%,55%)" strokeWidth={strokeW} strokeLinecap="square"
                               transform={`rotate(-90 ${size / 2} ${size / 2})`}
                               initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
                               animate={{ strokeDashoffset: circ * (1 - kpi.value / 100) }}
                               transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.2 }}
                             />
                           </svg>
                           <div className="text-center z-10">
                              <span className="text-lg font-bold text-foreground">{kpi.value}%</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="text-xs text-muted-foreground uppercase block">{kpi.label}</span>
                           <span className="text-[10px] text-accent font-semibold">{kpi.delta}</span>
                         </div>
                       </motion.div>
                     );
                   })}
                 </div>
               </GlassCard>
             </motion.div>
           )}

          {/* Non-conformances */}
          {showElements >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto">
              <div className="flex gap-3 max-w-[240px]">
                  <GlassCard layer={1} className="px-4 py-3 flex-1 text-center">
                    <span className="text-xl font-bold text-foreground">0</span>
                    <span className="text-xs text-muted-foreground uppercase block">Major</span>
                  </GlassCard>
                  <GlassCard layer={1} className="px-4 py-3 flex-1 text-center">
                    <span className="text-xl font-bold text-foreground">1</span>
                    <span className="text-xs text-muted-foreground uppercase block">Minor</span>
                 </GlassCard>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Evidence + Auditor */}
        <div className="w-2/5 border-l border-muted-foreground/10 flex flex-col">
          {showElements >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 flex-1">
               <div className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">Evidence Gallery</div>
              <div className="grid grid-cols-4 gap-1.5">
                {evidenceImages.map((img, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }} className="aspect-square overflow-hidden">
                    <img src={img} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {showElements >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 border-t border-muted-foreground/10">
               <GlassCard layer={2} className="flex items-center gap-3 p-3">
                 <img src={auditorGen2} alt="M. Hoffmann" className="w-10 h-10 object-cover" />
                 <div className="flex-1">
                    <div className="text-base font-medium text-foreground">Markus Hoffmann</div>
                    <div className="text-sm text-muted-foreground">ISO 9001 Lead Auditor</div>
                 </div>
                 <span className="text-xs text-accent font-semibold">24h</span>
               </GlassCard>
            </motion.div>
          )}

          <div className="px-5 py-3 border-t border-muted-foreground/10 text-center">
             <span className="text-sm text-primary tracking-wider uppercase">Step 5 of 6 · Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 5: CAPA / FINDINGS ──────────────────────────────────
const CAPAScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const findings = [
    { id: "NC-001", type: "Major NC", title: "Calibration records incomplete for CNC #3", owner: "PräzisionsTech", due: "Jan 15", status: "overdue", progress: 60 },
    { id: "NC-002", type: "Minor NC", title: "Operator training log missing signatures", owner: "PräzisionsTech", due: "Jan 22", status: "in-progress", progress: 80 },
    { id: "OFI-001", type: "OFI", title: "Improve traceability labeling on raw materials", owner: "PräzisionsTech", due: "Feb 05", status: "in-progress", progress: 45 },
    { id: "OFI-002", type: "OFI", title: "Update SPC charts for critical dimensions", owner: "PräzisionsTech", due: "Feb 12", status: "open", progress: 10 },
  ];

  const statusColor = (s: string) => s === "overdue" ? "bg-destructive" : s === "in-progress" ? "bg-accent" : "bg-foreground/30";
  const statusLabel = (s: string) => s === "overdue" ? "Overdue" : s === "in-progress" ? "In Progress" : "Open";
  const typeColor = (t: string) => t === "Major NC" ? "text-destructive" : t === "Minor NC" ? "text-foreground" : "text-warning";

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-5 py-3 border-b border-foreground/10 flex items-center justify-between">
         <div>
           <div className="text-base font-semibold text-foreground">CAPA Tracker</div>
           <div className="text-sm text-foreground/60">PräzisionsTech GmbH · Findings</div>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="M. Hoffmann" className="w-7 h-7 object-cover" />
           <span className="text-sm text-foreground/60">Monitored</span>
         </div>
       </div>

      <div className="flex-1 flex">
        {/* Left: Findings list */}
        <div className="w-3/5 p-5 flex flex-col gap-2 overflow-hidden">
          {/* Summary stats */}
          {phase >= 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-3 mb-2 max-w-xs">
                <GlassCard layer={2} className="px-4 py-3 flex-1 text-center">
                  <span className="text-2xl font-bold text-destructive">1</span>
                   <span className="text-xs text-muted-foreground uppercase block">Major NC</span>
                 </GlassCard>
                 <GlassCard layer={2} className="px-4 py-3 flex-1 text-center">
                   <span className="text-2xl font-bold text-foreground">1</span>
                   <span className="text-xs text-muted-foreground uppercase block">Minor NC</span>
                 </GlassCard>
                 <GlassCard layer={2} className="px-4 py-3 flex-1 text-center">
                    <span className="text-2xl font-bold text-warning">2</span>
                    <span className="text-xs text-muted-foreground uppercase block">OFI</span>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* Findings cards */}
          {findings.map((f, idx) => (
            phase >= idx + 2 && (
              <motion.div key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                <GlassCard highlight={f.status === "overdue"} layer={2} className="p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-bold text-muted-foreground">{f.id}</span>
                       <span className={`text-xs font-bold uppercase ${typeColor(f.type)}`}>{f.type}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <div className={`w-2 h-2 rounded-full ${statusColor(f.status)}`} />
                       <span className="text-[10px] text-muted-foreground font-semibold">{statusLabel(f.status)}</span>
                     </div>
                   </div>
                   <div className="text-sm text-foreground font-medium mb-2 leading-tight">{f.title}</div>
                   <div className="flex items-center gap-2">
                     <div className="flex-1 h-2 bg-foreground/15 overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: `${f.progress}%` }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className={`h-full ${f.status === "overdue" ? "bg-destructive" : "bg-accent"}`}
                       />
                     </div>
                     <span className="text-[10px] text-muted-foreground font-semibold">{f.progress}%</span>
                     <span className="text-[10px] text-muted-foreground">Due {f.due}</span>
                  </div>
                </GlassCard>
              </motion.div>
            )
          ))}
        </div>

        {/* Right: Timeline + status */}
        <div className="w-2/5 border-l border-muted-foreground/10 flex flex-col p-5 gap-3">
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <GlassCard layer={3} className="p-5">
                 <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Close-out Progress</div>
                 <DonutScore score={49} size={130} labelSize="text-xl" />
                 <div className="text-center mt-2">
                   <span className="text-xs text-muted-foreground">2 of 4 findings addressed</span>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={2} className="p-4">
                 <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Activity</div>
                 {[
                   { time: "2h ago", text: "Calibration evidence uploaded", actor: "Supplier" },
                   { time: "5h ago", text: "Training records requested", actor: "Client" },
                   { time: "1d ago", text: "NC-001 response submitted", actor: "Supplier" },
                 ].map((a, i) => (
                   <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
                     className="flex items-start gap-2 mb-2 last:mb-0">
                     <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 flex-shrink-0" />
                     <div>
                       <div className="text-sm text-foreground font-medium leading-tight">{a.text}</div>
                       <div className="text-xs text-muted-foreground">{a.actor} · {a.time}</div>
                    </div>
                  </motion.div>
                ))}
              </GlassCard>
            </motion.div>
          )}

          {phase >= 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-auto">
              <GlassCard highlight className="p-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm font-semibold text-foreground">Client notified — NC-001 overdue</span>
              </GlassCard>
            </motion.div>
          )}

          <div className="px-3 py-3 border-t border-muted-foreground/10 text-center mt-auto">
            <span className="text-sm text-primary tracking-wider uppercase">Step 6 of 6 · CAPA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────
const PlatformDemoAnimation = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [DiscoverScreen, MatchScreen, AuditScreen, AtlasAIScreen, IntelligenceScreen, CAPAScreen];
  const labels = ["Discover", "Match", "Audit", "Atlas AI", "Intel", "CAPA"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 6);
    }, SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const CurrentScreenComponent = screens[currentScreen];

  return (
    <div className={`w-full h-full flex flex-col ${SCREEN_BG} overflow-hidden`}>
      <div className="flex items-center gap-1 px-4 py-2 border-b border-muted-foreground/10">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1 flex-1">
             <div className={`h-1 flex-1 transition-colors duration-500 ${
              i <= currentScreen ? 'bg-primary' : 'bg-muted-foreground/15'
            }`} />
            <span className={`text-[10px] font-medium transition-colors duration-300 ${
              i === currentScreen ? 'text-foreground' : 'text-muted-foreground'
            }`}>{label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentScreen} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="absolute inset-0">
            <CurrentScreenComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
