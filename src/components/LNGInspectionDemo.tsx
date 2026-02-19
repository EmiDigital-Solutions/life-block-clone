import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lngWeldInspection from "@/assets/lng-weld-inspection.jpg";
import lngControlRoom from "@/assets/lng-control-room.jpg";
import lngRotatingEquipment from "@/assets/lng-rotating-equipment.jpg";
import lngStorageTanks from "@/assets/lng-storage-tanks.jpg";
import lngDimensionalControl from "@/assets/lng-dimensional-control.jpg";

const SCREEN_DURATION = 6000;
const SCREEN_BG = "bg-[hsl(0,0%,92%)]";

/* ── Frosted glass card ── */
const GlassCard = ({ children, className = "", highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) => (
  <div className={`border backdrop-blur-md ${highlight ? 'border-accent/40 bg-white/85' : 'bg-white/70 border-white/80'} ${className}`}>
    {children}
  </div>
);

/* ── Big stat ── */
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

/* ── Mini bar chart ── */
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

/* ── Donut score ── */
const DonutScore = ({ score, size = 120 }: { score: number; size?: number }) => {
  const strokeW = Math.max(5, size * 0.07);
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="hsl(0,0%,82%)" strokeWidth={strokeW} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="hsl(161,26%,55%)" strokeWidth={strokeW} strokeLinecap="square"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-xl font-bold text-foreground leading-none">{score}%</div>
        <div className="text-[7px] text-muted-foreground uppercase tracking-wider mt-0.5">Score</div>
      </div>
    </div>
  );
};

// ─── SCREEN 1: AI INSPECTION PROTOCOL ──────────────────────────
const InspectionProtocolScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3200),
      setTimeout(() => setPhase(6), 4200),
      setTimeout(() => setPhase(7), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const phases = [
    { name: "Engineering", progress: 100, status: "Complete", items: ["HAZOP Review", "P&ID Validation", "Stress Analysis"], multiplier: "0.5×" },
    { name: "Procurement", progress: 78, status: "Active", items: ["FAT Protocol", "Material PMI", "Vendor Surveillance"], multiplier: "1.5×" },
    { name: "Construction", progress: 35, status: "Planned", items: ["Weld Inspection", "NDT Verification", "PWHT Monitoring"], multiplier: "2.0×" },
    { name: "Commissioning", progress: 0, status: "Pending", items: ["Hydro Test", "Performance Test", "Punch List"], multiplier: "3.0×" },
  ];

  return (
    <div className={`h-full flex ${SCREEN_BG}`}>
      {/* LEFT — Phase Timeline */}
      <div className="w-[42%] flex flex-col border-r border-foreground/10">
        <div className="px-4 py-3 border-b border-foreground/10">
          <span className="text-sm font-semibold text-foreground">EPC Phase Inspection</span>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-2.5 overflow-hidden">
          {phases.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: phase >= i + 1 ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.15 }}>
              <GlassCard className="p-3" highlight={i === 1}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-foreground">{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-foreground/40">{p.multiplier}</span>
                    <span className={`text-[9px] font-bold uppercase ${p.status === 'Active' ? 'text-accent' : p.status === 'Complete' ? 'text-foreground/50' : 'text-foreground/30'}`}>{p.status}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-foreground/10">
                  <motion.div className="h-full bg-accent" initial={{ width: 0 }}
                    animate={{ width: phase >= i + 2 ? `${p.progress}%` : '0%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                {phase >= 3 && i <= 2 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.items.map((item, j) => (
                      <motion.span key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: j * 0.1 }}
                        className="text-[8px] text-foreground/50 bg-foreground/5 px-1.5 py-0.5">{item}</motion.span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT — Risk-Based Inspection */}
      <div className="w-[58%] flex flex-col">
        <div className="px-4 py-3 border-b border-foreground/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Dynamic RBI Engine</span>
          {phase >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-1 px-2 py-1 border border-accent/40">
              <div className="w-1.5 h-1.5 bg-accent" />
              <span className="text-[9px] text-accent font-bold uppercase">AI Active</span>
            </motion.div>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Risk Formula */}
          {phase >= 4 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Inspection Intensity Formula</div>
                <div className="font-mono text-[10px] text-foreground/70 leading-relaxed">
                  I = f(Criticality × CoF × Phase × Track Record)
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Equipment Risk Cards */}
          {phase >= 5 && (
            <div className="flex flex-col gap-2">
              {[
                { name: "MCHE — Main Cryogenic Heat Exchanger", risk: "Critical", score: 97, class: "SC-1" },
                { name: "C-101 — Refrigeration Compressor", risk: "High", score: 89, class: "SC-1" },
                { name: "V-201 — HP Separator", risk: "Medium", score: 74, class: "SC-2" },
              ].map((eq, i) => (
                <motion.div key={eq.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}>
                  <GlassCard className="p-3 flex items-center gap-3" highlight={i === 0}>
                    <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 text-xs font-bold ${i === 0 ? 'bg-destructive/20 text-destructive' : i === 1 ? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'}`}>
                      {eq.score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">{eq.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[9px] font-bold uppercase ${i === 0 ? 'text-destructive' : i === 1 ? 'text-warning' : 'text-accent'}`}>{eq.risk}</span>
                        <span className="text-[9px] text-foreground/40 font-mono">{eq.class}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* AI Alert */}
          {phase >= 6 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard highlight className="p-3">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-warning text-[10px] font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-foreground block">Predictive Alert</span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed">MCHE tube bundle assembly nearing critical milestone. Recommend 100% witness inspection at vendor facility. Helium leak test scheduled in 14 days.</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Schedule Impact */}
          {phase >= 7 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="mt-auto">
              <div className="flex items-center gap-4">
                <BigStat value="$1.2M" delta="−38%" label="Daily delay cost" unit="/day" />
                <BigStat value="14" delta="+2d" label="Days to milestone" unit="days" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-foreground/10 text-center">
          <span className="text-[10px] text-primary tracking-wider uppercase">Screen 1 of 4 · AI Inspection Protocol</span>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 2: COMPUTER VISION ENGINE ──────────────────────────
const ComputerVisionScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => setPhase(6), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`h-full flex ${SCREEN_BG}`}>
      {/* LEFT — Image Analysis */}
      <div className="w-[50%] flex flex-col border-r border-foreground/10">
        <div className="px-4 py-3 border-b border-foreground/10">
          <span className="text-sm font-semibold text-foreground">Weld Quality Analysis</span>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Inspection Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-[4/3] overflow-hidden">
            <img src={lngWeldInspection} alt="Weld inspection" className="w-full h-full object-cover" />
            {/* Detection overlays */}
            {phase >= 2 && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute top-[20%] left-[30%] w-[40%] h-[30%] border-2 border-accent">
                  <span className="absolute -top-4 left-0 text-[8px] bg-accent text-white px-1 py-0.5 font-bold">WELD-001 · PASS</span>
                </motion.div>
                {phase >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute top-[55%] left-[50%] w-[25%] h-[20%] border-2 border-warning">
                    <span className="absolute -top-4 left-0 text-[8px] bg-warning text-white px-1 py-0.5 font-bold">SLAG-IND · 12mm</span>
                  </motion.div>
                )}
              </>
            )}
            {/* Scanning animation */}
            {phase >= 1 && phase < 3 && (
              <motion.div
                initial={{ top: 0 }} animate={{ top: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute left-0 right-0 h-px bg-accent shadow-[0_0_8px_hsl(161,26%,55%)]"
              />
            )}
          </motion.div>

          {/* Detection Results */}
          {phase >= 3 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Root Gap", value: "2.1mm", status: "pass" },
                  { label: "Reinforcement", value: "1.8mm", status: "pass" },
                  { label: "Porosity", value: "0.3%", status: "pass" },
                ].map((r) => (
                  <GlassCard key={r.label} className="p-2 text-center">
                    <div className="text-[8px] text-muted-foreground uppercase">{r.label}</div>
                    <div className="text-sm font-bold text-foreground">{r.value}</div>
                    <div className={`text-[8px] font-bold uppercase ${r.status === 'pass' ? 'text-accent' : 'text-destructive'}`}>{r.status}</div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT — Analysis Results */}
      <div className="w-[50%] flex flex-col">
        <div className="px-4 py-3 border-b border-foreground/10">
          <span className="text-sm font-semibold text-foreground">Multi-Modal Detection</span>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Detection categories */}
          {phase >= 4 && (
            <div className="space-y-2">
              {[
                { name: "Welding", desc: "RT interpretation, UT validation", checks: 847, pass: 98.2 },
                { name: "Coating/DFT", desc: "Surface prep, holiday detection", checks: 1240, pass: 96.8 },
                { name: "Dimensional", desc: "3D scan vs. design model", checks: 312, pass: 99.1 },
                { name: "Material PMI", desc: "XRF verification, heat numbers", checks: 1893, pass: 99.7 },
              ].map((cat, i) => (
                <motion.div key={cat.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}>
                  <GlassCard className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                      <span className="text-xs font-bold text-accent">{cat.pass}%</span>
                    </div>
                    <div className="text-[9px] text-muted-foreground mb-1.5">{cat.desc}</div>
                    <div className="w-full h-1 bg-foreground/10">
                      <motion.div className="h-full bg-accent" initial={{ width: 0 }}
                        animate={{ width: `${cat.pass}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                    </div>
                    <div className="text-[8px] text-foreground/40 mt-1">{cat.checks.toLocaleString()} checks completed</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* ASME Compliance Badge */}
          {phase >= 6 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard highlight className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border-2 border-accent flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">ASME Section VIII Compliant</div>
                    <div className="text-[9px] text-muted-foreground">All welds meet acceptance criteria per ASME B31.3</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-foreground/10 text-center">
          <span className="text-[10px] text-primary tracking-wider uppercase">Screen 2 of 4 · Computer Vision Engine</span>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 3: RISK & DELAY ANALYSIS ───────────────────────────
const RiskDelayScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 3600),
      setTimeout(() => setPhase(6), 4600),
      setTimeout(() => setPhase(7), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const ncrs = [
    { id: "NCR-0847", desc: "Shell weld RT linear indication — slag inclusion 45mm", severity: "Critical", risk: 97, party: "Contractor", days: 12 },
    { id: "NCR-0848", desc: "Compressor vibration exceeds API 617 limit (4.5 vs 3.5 mm/s)", severity: "High", risk: 89, party: "Vendor", days: 8 },
    { id: "NCR-0849", desc: "DFT below spec on cryogenic insulation vapor barrier", severity: "Medium", risk: 62, party: "Subcontractor", days: 3 },
  ];

  return (
    <div className={`h-full flex ${SCREEN_BG}`}>
      {/* LEFT — NCR Feed */}
      <div className="w-[45%] flex flex-col border-r border-foreground/10">
        <div className="px-4 py-3 border-b border-foreground/10">
          <span className="text-sm font-semibold text-foreground">NCR Risk Analysis</span>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-2 overflow-hidden">
          {ncrs.map((ncr, i) => (
            <motion.div key={ncr.id} initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase >= i + 1 ? 1 : 0.2, y: 0 }}
              transition={{ delay: i * 0.15 }}>
              <GlassCard className="p-3" highlight={i === 0}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-foreground/50">{ncr.id}</span>
                  <span className={`text-[9px] font-bold uppercase ${ncr.severity === 'Critical' ? 'text-destructive' : ncr.severity === 'High' ? 'text-warning' : 'text-accent'}`}>{ncr.severity}</span>
                </div>
                <div className="text-xs text-foreground font-medium mb-1.5 leading-tight">{ncr.desc}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-foreground/40">Risk Score: <span className="font-bold text-foreground">{ncr.risk}</span></span>
                  <span className="text-[9px] text-foreground/40">+{ncr.days}d schedule impact</span>
                </div>
                {phase >= 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-2 pt-2 border-t border-foreground/10">
                    <span className="text-[9px] text-muted-foreground">Responsibility: </span>
                    <span className="text-[9px] font-semibold text-foreground">{ncr.party}</span>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}

          {/* Delay Attribution */}
          {phase >= 5 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Delay Attribution</div>
                <div className="space-y-1.5">
                  {[
                    { party: "Engineering", pct: 15, color: "bg-primary" },
                    { party: "Procurement", pct: 35, color: "bg-warning" },
                    { party: "Construction", pct: 40, color: "bg-destructive" },
                    { party: "Owner", pct: 10, color: "bg-foreground/30" },
                  ].map((d) => (
                    <div key={d.party} className="flex items-center gap-2">
                      <span className="text-[9px] text-foreground/60 w-20">{d.party}</span>
                      <div className="flex-1 h-1.5 bg-foreground/10">
                        <motion.div className={`h-full ${d.color}`} initial={{ width: 0 }}
                          animate={{ width: `${d.pct}%` }} transition={{ duration: 0.6 }} />
                      </div>
                      <span className="text-[9px] font-mono text-foreground/50 w-8 text-right">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT — AI Corrective Action */}
      <div className="w-[55%] flex flex-col">
        <div className="px-4 py-3 border-b border-foreground/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">AI Corrective Action</span>
          {phase >= 6 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-1 px-2 py-1 border border-accent/40">
              <div className="w-1.5 h-1.5 bg-accent" />
              <span className="text-[9px] text-accent font-bold uppercase">CAPA Generated</span>
            </motion.div>
          )}
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
          {/* Root Cause Analysis */}
          {phase >= 3 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">5-Why Root Cause — NCR-0847</div>
                <div className="space-y-1">
                  {[
                    "Slag inclusion in weld",
                    "↳ Poor joint preparation",
                    "↳ Welder rushed due to schedule pressure",
                    "↳ Late material delivery cascading effect",
                    "↳ Supplier manufacturing capacity constraint",
                  ].map((why, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className={`text-[10px] ${i === 0 ? 'text-foreground font-semibold' : 'text-foreground/60'} ${i > 0 ? 'pl-' + (i * 2) : ''}`}>
                      {why}
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Corrective Actions */}
          {phase >= 6 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard highlight className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">AI-Recommended Actions</div>
                <div className="space-y-1.5">
                  {[
                    { action: "Grind out defect, re-weld per approved repair procedure", priority: "Immediate" },
                    { action: "100% RT of all welds by same welder (next 10 joints)", priority: "Short-term" },
                    { action: "Refresher training on joint preparation for all welders", priority: "Systemic" },
                  ].map((ca, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className={`text-[8px] font-bold uppercase flex-shrink-0 mt-0.5 ${i === 0 ? 'text-destructive' : i === 1 ? 'text-warning' : 'text-accent'}`}>{ca.priority}</span>
                      <span className="text-[10px] text-foreground/70">{ca.action}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Financial Impact */}
          {phase >= 7 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="mt-auto">
              <div className="flex items-center gap-4">
                <BigStat value="$14.4M" label="Rework cost avoided" />
                <BigStat value="23" delta="−8d" label="Days saved" unit="days" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-foreground/10 text-center">
          <span className="text-[10px] text-primary tracking-wider uppercase">Screen 3 of 4 · Risk & Delay Analysis</span>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 4: LIVE MONITORING DASHBOARD ───────────────────────
const LiveMonitoringScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2300),
      setTimeout(() => setPhase(5), 3200),
      setTimeout(() => setPhase(6), 4200),
      setTimeout(() => setPhase(7), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const bars = [45, 55, 60, 65, 70, 72, 68, 75, 78, 80, 82, 78, 85, 88, 90, 87, 92, 95, 93, 88];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
      {/* Top metrics bar */}
      <div className="px-4 py-3 border-b border-foreground/10 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Project Health — Qatar LNG Mega Train</span>
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-1 px-2 py-1 bg-accent/10">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-[9px] text-accent font-bold uppercase">Live</span>
          </motion.div>
        )}
      </div>

      <div className="flex-1 flex">
        {/* LEFT — KPIs */}
        <div className="w-[40%] p-4 flex flex-col gap-3 border-r border-foreground/10 overflow-hidden">
          {/* Overall Progress */}
          {phase >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard className="p-3 flex items-center gap-3">
                <DonutScore score={67} size={80} />
                <div>
                  <div className="text-xs font-semibold text-foreground">Overall Progress</div>
                  <div className="text-[9px] text-muted-foreground">Eng: 98% · Proc: 82% · Con: 45%</div>
                  <div className="text-[9px] text-accent font-semibold mt-0.5">SPI: 0.94</div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Safety & Quality KPIs */}
          {phase >= 3 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "TRIR", value: "0.28", status: "green" },
                  { label: "NCR Rate", value: "2.1", status: "green" },
                  { label: "Weld Reject", value: "3.8%", status: "amber" },
                  { label: "ITP Backlog", value: "14", status: "green" },
                ].map((kpi) => (
                  <GlassCard key={kpi.label} className="p-2 text-center">
                    <div className="text-[8px] text-muted-foreground uppercase">{kpi.label}</div>
                    <div className="text-lg font-bold text-foreground">{kpi.value}</div>
                    <div className={`w-2 h-2 mx-auto mt-0.5 ${kpi.status === 'green' ? 'bg-accent' : 'bg-warning'}`} />
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* Manpower */}
          {phase >= 5 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Manpower — This Week</div>
                <BarChart bars={bars} accentIndex={19} />
                <div className="flex justify-between mt-1">
                  <span className="text-[8px] text-foreground/40">Week 1</span>
                  <span className="text-[8px] text-foreground/40">Week 20</span>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        {/* RIGHT — Equipment Tracker + Alerts */}
        <div className="w-[60%] p-4 flex flex-col gap-3 overflow-hidden">
          {/* Critical Equipment Tracker */}
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Critical Equipment Tracker</div>
                <div className="space-y-2">
                  {[
                    { name: "MCHE — Main Cryogenic HEX", status: "Manufacturing", pct: 78, risk: "On Track" },
                    { name: "C-101 — Refrig. Compressor", status: "FAT Complete", pct: 95, risk: "On Track" },
                    { name: "T-201 — LNG Storage Tank", status: "Construction", pct: 52, risk: "At Risk" },
                  ].map((eq, i) => (
                    <motion.div key={eq.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-semibold text-foreground">{eq.name}</span>
                        <span className={`text-[8px] font-bold uppercase ${eq.risk === 'On Track' ? 'text-accent' : 'text-warning'}`}>{eq.risk}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-foreground/10">
                          <motion.div className={`h-full ${eq.risk === 'On Track' ? 'bg-accent' : 'bg-warning'}`}
                            initial={{ width: 0 }} animate={{ width: `${eq.pct}%` }}
                            transition={{ duration: 0.8 }} />
                        </div>
                        <span className="text-[9px] font-mono text-foreground/50 w-8 text-right">{eq.pct}%</span>
                      </div>
                      <div className="text-[8px] text-foreground/40 mt-0.5">{eq.status}</div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Real-time Alerts */}
          {phase >= 4 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-3">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Active Alerts</div>
                <div className="space-y-1.5">
                  {[
                    { level: "critical", msg: "Weld reject rate trending upward — Area 3 piping", time: "2m ago" },
                    { level: "warning", msg: "Weather: 40°C forecast — coating work suspended", time: "15m ago" },
                    { level: "info", msg: "MCHE shipping documentation received from vendor", time: "1h ago" },
                  ].map((alert, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 mt-1 flex-shrink-0 ${alert.level === 'critical' ? 'bg-destructive' : alert.level === 'warning' ? 'bg-warning' : 'bg-accent'}`} />
                      <div className="flex-1">
                        <span className="text-[10px] text-foreground">{alert.msg}</span>
                        <span className="text-[8px] text-foreground/30 ml-2">{alert.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Monte Carlo Prediction */}
          {phase >= 6 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard highlight className="p-3">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-[10px] font-bold">⚡</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-foreground block">AI Schedule Prediction</span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed">Monte Carlo simulation: 73% probability of achieving MC by Q3 2026. Critical path: LNG storage tank construction + MCHE installation sequence.</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Cost Summary */}
          {phase >= 7 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="mt-auto">
              <div className="flex items-center gap-6">
                <BigStat value="$4.2B" label="EAC" />
                <BigStat value="15%" delta="−$750M" label="Overrun prevented" />
                <BigStat value="0.94" label="CPI" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="px-4 py-2 border-t border-foreground/10 text-center">
        <span className="text-[10px] text-primary tracking-wider uppercase">Screen 4 of 4 · Live Monitoring Dashboard</span>
      </div>
    </div>
  );
};

// ─── MAIN DEMO COMPONENT ───────────────────────────────────────
const screens = [
  { id: "protocol", label: "AI Inspection", component: InspectionProtocolScreen },
  { id: "vision", label: "Computer Vision", component: ComputerVisionScreen },
  { id: "risk", label: "Risk & Delay", component: RiskDelayScreen },
  { id: "monitoring", label: "Live Dashboard", component: LiveMonitoringScreen },
];

const LNGInspectionDemo = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, SCREEN_DURATION);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeScreen]);

  const handleScreenClick = (index: number) => {
    setActiveScreen(index);
    setIsAutoPlaying(false);
  };

  const ActiveComponent = screens[activeScreen].component;

  return (
    <section id="lng-platform-demo" data-nav-theme="light" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">Platform Demo</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
            AI-driven field inspection<br />for LNG mega-projects
          </h2>
          <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-xl">
            From engineering review to commissioning — every phase covered by intelligent inspection protocols, computer vision, and predictive analytics.
          </p>
        </motion.div>

        {/* Screen Tabs */}
        <div className="flex border border-foreground/15 mb-0 overflow-x-auto">
          {screens.map((screen, i) => (
            <button
              key={screen.id}
              onClick={() => handleScreenClick(i)}
              className={`flex-1 px-4 py-3 text-xs font-semibold tracking-wide transition-colors text-center whitespace-nowrap ${
                i === activeScreen ? 'bg-foreground text-background' : 'bg-transparent text-foreground/50 hover:text-foreground/70'
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>

        {/* Demo Screen */}
        <div className="border border-t-0 border-foreground/15 aspect-[16/9] overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => handleScreenClick(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === activeScreen ? 'w-8 bg-accent' : 'w-1.5 bg-foreground/20'
              }`}
            />
          ))}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="ml-4 text-[10px] font-mono text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            {isAutoPlaying ? "PAUSE" : "PLAY"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LNGInspectionDemo;
