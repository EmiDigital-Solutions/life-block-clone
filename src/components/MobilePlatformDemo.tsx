import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";

const SCREEN_DURATION = 5000;
const SCREEN_BG = "bg-[hsl(0,0%,85%)]";

/* ── Solid dark grey cards — no glass, no shadow, no blur ── */
const GlassCard = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
  const layerBg = layer === 1
    ? 'bg-[hsl(0,0%,45%)] border-[hsl(0,0%,40%)]'
    : 'bg-[hsl(0,0%,38%)] border-[hsl(0,0%,33%)]';
  return (
    <div className={`border ${highlight ? 'border-primary/30 bg-[hsl(0,0%,42%)]' : layerBg} ${className}`}>
      {children}
    </div>
  );
};

/* Mini bar chart */
const BarChart = ({ bars, accentIndex = -1 }: { bars: number[]; accentIndex?: number }) => (
  <div className="flex items-end gap-[2px] h-8">
    {bars.map((h, i) => (
      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
        transition={{ duration: 0.3, delay: i * 0.02 }}
        className={`w-[2px] ${i === accentIndex ? 'bg-primary' : 'bg-background/40'}`}
      />
    ))}
  </div>
);

/* Overflowing donut chart */
const DonutScore = ({ score, size = 80 }: { score: number; size?: number }) => {
  const strokeW = 6;
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const tickCount = 40;
  const tickR = r + strokeW + 1;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: tickCount }).map((_, i) => {
          const angle = (i / tickCount) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const cx = size / 2;
          const cy = size / 2;
          const x1 = cx + Math.cos(rad) * (tickR - 2);
          const y1 = cy + Math.sin(rad) * (tickR - 2);
          const x2 = cx + Math.cos(rad) * tickR;
          const y2 = cy + Math.sin(rad) * tickR;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i / tickCount <= score / 100 ? 'hsl(199,91%,64%)' : 'hsl(0,0%,60%)'}
              strokeWidth={0.6} strokeLinecap="square" />
          );
        })}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(0,0%,55%)" strokeWidth={strokeW} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="hsl(199, 91%, 64%)" strokeWidth={strokeW} strokeLinecap="square"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <span className="text-sm font-bold text-foreground z-10">{score}%</span>
    </div>
  );
};

const MobileDiscoverScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
     <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-1.5`}>
       <div className="text-xs text-foreground/60 uppercase tracking-wider">SearchPro+ · AI-Powered</div>

       <div className="flex gap-2">
         <div className="w-5 h-5 bg-foreground flex items-center justify-center flex-shrink-0">
           <span className="text-[8px] font-bold text-background">AI</span>
         </div>
         <GlassCard className="px-2.5 py-1.5 text-[11px] text-background">
           What are you looking for?
         </GlassCard>
       </div>

       {phase >= 1 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
           <GlassCard className="px-2.5 py-1.5 text-[11px] text-background max-w-[80%]">
             CNC-machined precision components
           </GlassCard>
         </motion.div>
       )}

       {phase >= 2 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
           <div className="w-5 h-5 bg-foreground flex items-center justify-center flex-shrink-0">
             <span className="text-[8px] font-bold text-background">AI</span>
           </div>
           <GlassCard className="px-2.5 py-1.5 text-[11px] text-background">
             Searching: AS9100 + CNC + Titanium…
           </GlassCard>
         </motion.div>
       )}

       {phase >= 3 && (
         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5 mt-1">
           <div className="flex items-center gap-1.5">
             <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
             </svg>
             <span className="text-[11px] font-semibold text-foreground">4 Suppliers Found</span>
           </div>
           {["PräzisionsTech GmbH · Stuttgart", "Alpine CNC Solutions · Zurich"].map((s, i) => (
             <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
               <GlassCard highlight={i === 0} className="px-2.5 py-1.5 text-[10px] text-background">
                 {s}
               </GlassCard>
             </motion.div>
           ))}
         </motion.div>
       )}

      {phase >= 4 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-center">
           <span className="text-[9px] text-foreground/60 uppercase tracking-wider">Step 1 · Discover</span>
         </motion.div>
      )}
    </div>
  );
};

const MobileMatchScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const matchBars = [30, 45, 55, 40, 60, 50, 70, 65, 80, 75, 85, 90, 94, 88, 70];

  return (
     <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-2`}>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">Auditor Matching</div>

       <GlassCard layer={2} className="p-3">
         <div className="flex items-baseline gap-1 mb-1">
           <span className="text-xl font-bold text-background">3</span>
           <span className="text-[10px] text-primary font-semibold -translate-y-1.5">+3</span>
         </div>
         <span className="text-[9px] text-background/70 uppercase">Auditors Matched</span>
         <div className="mt-2">
           <BarChart bars={matchBars} accentIndex={12} />
         </div>
       </GlassCard>

      {phase >= 1 && (
         <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
           <GlassCard highlight className="p-3 flex items-center gap-3">
             <img src={auditorGen2} alt="M. Hoffmann" className="w-10 h-10 object-cover" />
             <div className="flex-1">
               <div className="text-sm font-semibold text-background">Markus Hoffmann</div>
               <div className="text-[11px] text-background/70">ISO 9001 Lead Auditor</div>
             </div>
             <div className="flex items-baseline gap-0.5">
               <span className="text-lg font-bold text-background">94</span>
               <span className="text-[10px] text-background/70">%</span>
             </div>
           </GlassCard>
         </motion.div>
      )}

      {phase >= 2 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <GlassCard highlight className="flex items-center gap-2 p-2.5">
             <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
             </svg>
             <span className="text-xs font-semibold text-background">Confirmed — On-site Dec 22</span>
           </GlassCard>
         </motion.div>
      )}
    </div>
  );
};

const MobileAuditScreen = () => {
  const [checked, setChecked] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setChecked(1), 600),
      setTimeout(() => setChecked(2), 1500),
      setTimeout(() => setChecked(3), 2500),
      setTimeout(() => setChecked(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const items = ["CNC calibration verified", "Quality management active", "Traceability complete", "Operator certifications valid"];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="relative h-28 overflow-hidden">
         <img src={equipmentImage} alt="Cleanroom" className="w-full h-full object-cover" />
         <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-foreground/70 text-background text-[10px]">
           <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> Live Audit
         </div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
           className="absolute bottom-2 left-2 border border-primary bg-primary/10 px-2 py-1">
           <span className="text-[10px] text-primary font-semibold">Clean Room Class 7</span>
         </motion.div>
       </div>
       <div className="flex-1 p-3 space-y-2">
         <div className="text-[10px] font-semibold text-foreground/60 uppercase tracking-wider">ISO 9001 Checklist</div>
         {items.map((item, i) => (
           <div key={item} className="flex items-center gap-2">
             <div className={`w-4 h-4 flex items-center justify-center ${i < checked ? 'bg-foreground' : 'border border-foreground/20'}`}>
               {i < checked && (
                 <svg className="w-2.5 h-2.5 text-background" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                 </svg>
               )}
             </div>
             <span className={`text-xs ${i < checked ? 'text-foreground' : 'text-foreground/50'}`}>{item}</span>
           </div>
         ))}
       </div>
    </div>
  );
};

const MobileIntelligenceScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const scores = [
    { name: "Quality", score: 93 },
    { name: "Equipment", score: 89 },
    { name: "Docs", score: 94 },
    { name: "Process", score: 88 },
  ];

  const auditKpis = [
    { label: "Calibration Compliance", value: "97", unit: "%", delta: "+4", bars: [60, 68, 78, 87, 93, 95, 97] },
    { label: "NCR Close-out Rate", value: "94", unit: "%", delta: "+8", bars: [55, 65, 75, 84, 90, 93, 94] },
    { label: "Process Capability", value: "1.67", unit: "Cpk", delta: "+0.3", bars: [40, 55, 68, 78, 87, 93, 96] },
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-1.5`}>
       {/* Overall score with donut */}
       <GlassCard layer={2} className="p-2.5 flex items-center gap-3 overflow-hidden relative">
         <div className="-ml-4 -my-3 flex-shrink-0">
           <DonutScore score={91} size={80} />
         </div>
         <div className="flex-1">
           <div className="text-sm font-semibold text-background">PräzisionsTech GmbH</div>
           <div className="text-[11px] text-background/60">ISO 9001 Report</div>
           <div className="flex items-baseline gap-1 mt-1">
             <span className="text-lg font-bold text-background">91.3</span>
             <span className="text-[10px] text-background/60">%</span>
             <span className="text-[9px] text-primary font-semibold -translate-y-1">+2.1</span>
           </div>
         </div>
       </GlassCard>

       {/* Process scores */}
       {phase >= 1 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <GlassCard layer={3} className="p-2.5">
             <div className="flex items-end justify-between gap-2">
               {scores.map((p) => (
                 <div key={p.name} className="text-center">
                   <div className="flex items-baseline justify-center gap-0.5">
                     <span className="text-lg font-bold text-background">{p.score}</span>
                     <span className="text-[9px] text-background/70">%</span>
                   </div>
                   <span className="text-[8px] text-background/70 uppercase">{p.name}</span>
                 </div>
               ))}
             </div>
             <div className="flex mt-2 border border-background/20 overflow-hidden">
               <div className="px-2.5 py-1 text-[9px] font-semibold bg-background text-foreground flex-1 text-center">0 Major</div>
               <div className="px-2.5 py-1 text-[9px] font-semibold bg-transparent text-background/70 flex-1 text-center">1 Minor</div>
             </div>
           </GlassCard>
         </motion.div>
       )}

       {/* Audit KPI bar charts */}
       {auditKpis.map((kpi, idx) => (
         phase >= idx + 2 && (
           <motion.div key={kpi.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
             <GlassCard layer={2} className="p-2">
               <div className="flex items-center justify-between mb-0.5">
                 <span className="text-[8px] text-background/60 uppercase tracking-wider font-semibold">{kpi.label}</span>
                 <div className="flex items-baseline gap-0.5">
                   <span className="text-xs font-bold text-background">{kpi.value}</span>
                   <span className="text-[8px] text-background/70">{kpi.unit}</span>
                   <span className="text-[7px] text-primary font-semibold ml-0.5 -translate-y-1">{kpi.delta}</span>
                 </div>
               </div>
               <div className="flex items-end gap-[2px] h-5">
                 {kpi.bars.map((h, i) => (
                   <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                     transition={{ duration: 0.3, delay: i * 0.03 }}
                     className={`flex-1 ${i >= 5 ? 'bg-primary' : 'bg-background/30'}`}
                   />
                 ))}
               </div>
             </GlassCard>
           </motion.div>
         )
       ))}
    </div>
  );
};

// ─── SCREEN 5: CAPA (Mobile) ────────────────────────────────────
const MobileCAPAScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const findings = [
    { id: "NC-001", type: "Major NC", title: "Calibration records incomplete", status: "overdue", progress: 60 },
    { id: "NC-002", type: "Minor NC", title: "Operator training log missing", status: "in-progress", progress: 80 },
    { id: "OFI-001", type: "OFI", title: "Improve traceability labeling", status: "in-progress", progress: 45 },
    { id: "OFI-002", type: "OFI", title: "Update SPC charts", status: "open", progress: 10 },
  ];

  const statusColor = (s: string) => s === "overdue" ? "bg-destructive" : s === "in-progress" ? "bg-primary" : "bg-background/40";
  const typeColor = (t: string) => t === "Major NC" ? "text-destructive" : t === "Minor NC" ? "text-background" : "text-primary";

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-1.5`}>
      <div className="text-xs text-foreground/60 uppercase tracking-wider">CAPA Tracker · Findings</div>

      {/* Summary */}
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex gap-1.5">
            <GlassCard layer={2} className="px-2 py-1 flex-1 text-center">
              <span className="text-sm font-bold text-destructive">1</span>
              <span className="text-[7px] text-background/70 uppercase block">Major</span>
            </GlassCard>
            <GlassCard layer={2} className="px-2 py-1 flex-1 text-center">
              <span className="text-sm font-bold text-background">1</span>
              <span className="text-[7px] text-background/70 uppercase block">Minor</span>
            </GlassCard>
            <GlassCard layer={2} className="px-2 py-1 flex-1 text-center">
              <span className="text-sm font-bold text-primary">2</span>
              <span className="text-[7px] text-background/70 uppercase block">OFI</span>
            </GlassCard>
          </div>
        </motion.div>
      )}

      {/* Findings */}
      {findings.map((f, idx) => (
        phase >= 2 && idx <= phase && (
          <motion.div key={f.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}>
            <GlassCard highlight={f.status === "overdue"} layer={2} className="p-2">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-bold text-background/50">{f.id}</span>
                  <span className={`text-[8px] font-bold uppercase ${typeColor(f.type)}`}>{f.type}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${statusColor(f.status)}`} />
              </div>
              <div className="text-[10px] text-background font-medium mb-1 leading-tight">{f.title}</div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-1 bg-background/20 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.progress}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full ${f.status === "overdue" ? "bg-destructive" : "bg-primary"}`}
                  />
                </div>
                <span className="text-[7px] text-background/60 font-semibold">{f.progress}%</span>
              </div>
            </GlassCard>
          </motion.div>
        )
      ))}

      {phase >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto">
          <GlassCard highlight className="p-2 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-[9px] font-semibold text-background">Client notified — NC-001 overdue</span>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

const MobilePlatformDemo = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [MobileDiscoverScreen, MobileMatchScreen, MobileAuditScreen, MobileIntelligenceScreen, MobileCAPAScreen];
  const labels = ["Discover", "Match", "Audit", "Intel", "CAPA"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 5);
    }, SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const Screen = screens[currentScreen];

  return (
    <div className={`w-full aspect-[3/4] border border-muted-foreground/15 shadow-xl overflow-hidden flex flex-col ${SCREEN_BG}`}>
       <div className="flex items-center justify-center gap-3 py-2 border-b border-foreground/10">
         {labels.map((label, i) => (
           <div key={label} className="flex items-center gap-1.5">
             <div className={`w-2 h-2 transition-colors ${i === currentScreen ? 'bg-primary' : 'bg-foreground/15'}`} />
             <span className={`text-[10px] font-medium ${i === currentScreen ? 'text-primary' : 'text-foreground/60'}`}>{label}</span>
           </div>
         ))}
       </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentScreen} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="absolute inset-0">
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="py-2 text-center border-t border-muted-foreground/10">
         <span className="text-[10px] text-foreground/60">Discover → Match → Audit → Intel → CAPA. All in 3 days.</span>
      </div>
    </div>
  );
};

export default MobilePlatformDemo;
