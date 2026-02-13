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
const SCREEN_BG = "bg-[hsl(0,0%,85%)]";

/* ── Solid dark grey cards — no glass, no shadow, no blur ── */
const GlassCard = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
  const layerBg = layer === 1
    ? 'bg-[hsl(0,0%,45%)] border-[hsl(0,0%,40%)]'
    : layer === 2
    ? 'bg-[hsl(0,0%,38%)] border-[hsl(0,0%,33%)]'
    : 'bg-[hsl(0,0%,32%)] border-[hsl(0,0%,28%)]';
  return (
    <div className={`border ${highlight ? 'border-primary/30 bg-[hsl(0,0%,42%)]' : layerBg} ${className}`}>
      {children}
    </div>
  );
};

/* Stat with superscript delta */
const BigStat = ({ value, delta, label, unit = "" }: { value: string; delta?: string; label?: string; unit?: string }) => (
  <div>
    <div className="flex items-baseline gap-0.5">
      <span className="text-2xl font-bold text-background tracking-tight">{value}</span>
      {unit && <span className="text-sm font-medium text-background/70">{unit}</span>}
      {delta && <span className="text-[10px] font-semibold text-primary ml-0.5 -translate-y-2">{delta}</span>}
    </div>
    {label && <span className="text-[10px] text-background/60 uppercase tracking-wider">{label}</span>}
  </div>
);

/* Mini bar chart */
const BarChart = ({ bars, accentIndex = -1 }: { bars: number[]; accentIndex?: number }) => (
  <div className="flex items-end gap-[2px] h-10">
    {bars.map((h, i) => (
      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
        transition={{ duration: 0.4, delay: i * 0.03 }}
        className={`w-[3px] ${i === accentIndex ? 'bg-primary' : 'bg-background/40'}`}
      />
    ))}
  </div>
);

/* Overflowing donut chart — clips at card boundary */
const DonutScore = ({ score, size = 160 }: { score: number; size?: number }) => {
  const strokeW = 10;
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
              stroke={filled ? 'hsl(199,91%,64%)' : 'hsl(0,0%,60%)'}
              strokeWidth={0.8} strokeLinecap="square" />
          );
        })}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="hsl(0,0%,55%)" strokeWidth={strokeW} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="hsl(199, 91%, 64%)" strokeWidth={strokeW} strokeLinecap="square"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-bold text-background leading-none">{score}%</div>
        <div className="text-[8px] text-background/70 uppercase tracking-wider mt-0.5">Score</div>
      </div>
    </div>
  );
};

/* Segmented toggle — squared, ORION style */
const SegmentedToggle = ({ items, activeIndex }: { items: string[]; activeIndex: number }) => (
  <div className="flex border border-background/20 overflow-hidden">
    {items.map((item, i) => (
      <div key={item} className={`px-3 py-1.5 text-[10px] font-semibold tracking-wide transition-colors flex-1 text-center ${
        i === activeIndex ? 'bg-background text-foreground' : 'bg-transparent text-background/60'
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
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => setPhase(6), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const suppliers = [
    { name: "MediParts GmbH", location: "Munich, Germany", certs: "ISO 13485, ISO 9001" },
    { name: "BioTech Precision SA", location: "Geneva, Switzerland", certs: "ISO 13485, FDA" },
    { name: "MedTech Components Inc", location: "Boston, USA", certs: "ISO 13485, FDA" },
    { name: "SurgiPrecision Ltd", location: "Dublin, Ireland", certs: "ISO 13485, CE" },
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-2`}>
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-background flex items-center justify-center">
             <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
           </div>
           <span className="text-sm font-semibold text-foreground">SearchPro+</span>
         </div>
         <span className="text-[10px] text-foreground/60 uppercase tracking-wider">AI-Powered</span>
       </div>

      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {phase >= 0 && (
         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
             <div className="w-6 h-6 bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
               <span className="text-[9px] font-bold text-foreground">AI</span>
             </div>
             <GlassCard className="px-3 py-2 text-xs text-background max-w-[80%]">
               What type of product or service are you looking for?
             </GlassCard>
           </motion.div>
        )}

        {phase >= 1 && (
         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
             <GlassCard className="px-3 py-2 text-xs text-background max-w-[75%]">
               Implantable medical device components
             </GlassCard>
           </motion.div>
        )}

        {phase >= 2 && (
         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
             <div className="w-6 h-6 bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
               <span className="text-[9px] font-bold text-foreground">AI</span>
             </div>
             <GlassCard className="px-3 py-2 text-xs text-background max-w-[80%]">
               What certifications and materials do you require?
             </GlassCard>
           </motion.div>
        )}

        {phase >= 3 && (
         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
             <GlassCard className="px-3 py-2 text-xs text-background max-w-[75%]">
               ISO 13485, FDA registered, titanium and medical-grade steel
             </GlassCard>
           </motion.div>
        )}

        {phase >= 4 && (
         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
             <div className="w-6 h-6 bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
               <span className="text-[9px] font-bold text-foreground">AI</span>
             </div>
             <GlassCard className="px-3 py-2 text-xs text-background max-w-[85%]">
               Searching: Implantable + ISO 13485 + FDA + Titanium…
             </GlassCard>
           </motion.div>
        )}

        {phase >= 5 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 mt-1">
             <div className="flex items-center gap-2 mb-0.5">
               <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
               </svg>
             <span className="text-xs font-semibold text-foreground">4 Matching Suppliers</span>
             </div>
             {suppliers.map((s, i) => (
               <motion.div key={s.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                 <GlassCard highlight={i === 0} layer={i === 0 ? 1 : 1} className="px-3 py-2 text-[11px] flex items-center justify-between">
                   <div>
                     <span className="font-semibold text-background">{s.name}</span>
                     <span className="text-background/70 ml-1.5">· {s.location}</span>
                   </div>
                   <span className="text-[10px] text-background/70">{s.certs}</span>
                 </GlassCard>
               </motion.div>
             ))}
           </motion.div>
        )}

        {phase >= 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-center">
           <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 1 of 4 · Discover</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN 2: MATCH ────────────────────────────────────────────
const MatchScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => setPhase(4), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const auditors = [
    { name: "Dr. Klaus Schmidt", match: 94, cert: "ISO 13485 · Munich · 15 yrs", img: auditorGen2 },
    { name: "Dr. Anna Weber", match: 91, cert: "ISO 13485 · Frankfurt · 12 yrs", img: auditorGen3 },
    { name: "Thomas Richter", match: 88, cert: "ISO 13485 · Stuttgart · 9 yrs", img: auditorGen4 },
  ];

  const matchBars = [30, 45, 55, 40, 60, 50, 70, 65, 80, 75, 85, 90, 94, 88, 70, 60, 55, 45, 35, 30];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-2`}>
       <div className="flex items-center justify-between">
         <span className="text-sm font-semibold text-foreground">Auditor Matching</span>
         <span className="text-[10px] text-foreground/60 uppercase tracking-wider">ScanPro+</span>
       </div>

      {/* Stat card with bar chart — layer 2 for depth */}
      <GlassCard layer={2} className="p-3">
        <div className="flex items-center justify-between mb-2">
          <BigStat value="3" delta="+3" label="Auditors Matched" />
          <div className="w-6 h-6 border border-muted-foreground/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
        <BarChart bars={matchBars} accentIndex={12} />
      </GlassCard>

       {phase >= 1 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-primary">
           <motion.div animate={{ rotate: 360 }} transition={{ repeat: phase < 2 ? Infinity : 0, duration: 1, ease: "linear" }}
             className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
           {phase < 2 ? "Matching auditors…" : "3 auditors matched"}
         </motion.div>
       )}

      {phase >= 2 && (
        <div className="space-y-2 flex-1">
           {auditors.map((a, i) => (
             <motion.div key={a.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
               <GlassCard highlight={i === 0} layer={i === 0 ? 2 : 1} className="flex items-center gap-3 p-3">
                 <img src={a.img} alt={a.name} className="w-10 h-10 object-cover" />
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-semibold text-background truncate">{a.name}</span>
                   </div>
                   <div className="text-[11px] text-background/70 truncate">{a.cert}</div>
                 </div>
                 <div className="flex items-baseline gap-0.5">
                   <span className="text-lg font-bold text-background">{a.match}</span>
                   <span className="text-[10px] text-background/70">%</span>
                 </div>
               </GlassCard>
             </motion.div>
           ))}
        </div>
      )}

      {phase >= 3 && (
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
           <GlassCard highlight className="flex items-center gap-3 p-3">
             <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
             </svg>
             <span className="text-sm font-semibold text-background">Auditor confirmed: On-site Dec 22</span>
           </GlassCard>
         </motion.div>
      )}

      {phase >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
           <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 2 of 4 · Match</span>
        </motion.div>
      )}
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
    "Sterile environment validated",
    "Quality management system active",
    "Traceability documentation complete",
    "Personnel qualified",
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-3 py-2 border-b border-foreground/10 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
           <span className="text-sm font-semibold text-foreground">Live Audit</span>
           <span className="text-xs text-foreground/60">· MediParts GmbH</span>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="Dr. Schmidt" className="w-6 h-6 object-cover" />
           <span className="text-xs text-foreground/60">Dr. Schmidt</span>
         </div>
       </div>

      <div className="flex-1 flex">
        <div className="w-1/2 relative overflow-hidden">
          <img src={equipmentImage} alt="Cleanroom" className="w-full h-full object-cover" />
          <AnimatePresence>
            {flash && (
              <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} className="absolute inset-0 bg-background" />
            )}
          </AnimatePresence>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }} className="absolute top-3 left-3 right-3">
             <GlassCard highlight layer={2} className="p-2">
               <div className="flex items-center gap-2">
                 <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
                 <span className="text-xs font-semibold text-primary">Clean Room Class 7</span>
               </div>
               <span className="text-[10px] text-background/70 mt-1 block">Computer Vision Detected</span>
             </GlassCard>
          </motion.div>
          <div className="absolute bottom-3 left-3">
            <div className="px-2 py-1 bg-foreground/70 text-background text-[10px] font-medium">Control Panel</div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col border-l border-muted-foreground/10">
           <div className="px-3 py-2 border-b border-foreground/10">
             <div className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">ISO 13485 Checklist</div>
           </div>
          <div className="flex-1 p-3 space-y-2">
             {checklistItems.map((item, i) => (
               <motion.div key={item} initial={{ opacity: 0.4 }} animate={{ opacity: i < checkedItems ? 1 : 0.4 }}
                 className="flex items-center gap-3">
                 <div className={`w-5 h-5 flex items-center justify-center transition-colors duration-300 ${
                   i < checkedItems ? 'bg-foreground' : 'border border-foreground/20'
                 }`}>
                   {i < checkedItems && (
                     <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }}
                       className="w-3 h-3 text-background" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                     </motion.svg>
                   )}
                 </div>
                 <span className={`text-sm ${i < checkedItems ? 'text-foreground font-medium' : 'text-foreground/50'}`}>{item}</span>
               </motion.div>
             ))}
          </div>
          {checkedItems >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="px-4 py-2 border-t border-muted-foreground/10 flex items-center gap-2">
               <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               <span className="text-[10px] text-primary font-medium">Evidence photos capturing…</span>
             </motion.div>
          )}
          <div className="px-4 py-3 border-t border-muted-foreground/10 text-center">
             <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 3 of 4 · Audit</span>
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

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-3 py-2 border-b border-foreground/10 flex items-center justify-between">
         <div>
           <div className="text-sm font-semibold text-foreground">MediParts GmbH</div>
           <div className="text-xs text-foreground/60">ISO 13485 Audit Report</div>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="Dr. Schmidt" className="w-6 h-6 object-cover" />
           <span className="text-xs text-foreground/60">Dr. Schmidt</span>
         </div>
       </div>

      <div className="flex-1 flex">
        <div className="w-3/5 p-3 flex flex-col gap-2 overflow-hidden">
          {/* Main score — ORION donut + stat card layered */}
          {showElements >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard layer={2} className="p-4 flex items-center gap-4 overflow-hidden relative">
                <div className="-ml-6 -my-4 flex-shrink-0">
                  <DonutScore score={91} size={140} />
                </div>
                 <div className="flex-1">
                   <BigStat value="91.3" unit="%" delta="+2.1" />
                   <span className="text-[10px] text-background/60 uppercase tracking-wider">Overall Score</span>
                   <div className="flex items-center gap-1 text-primary text-xs font-medium mt-1">
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z" /></svg>
                     trending up
                   </div>
                 </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Process stats — ORION "Candidates Online" style, deeper layer */}
          {showElements >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={3} className="p-3">
               <div className="text-sm font-semibold text-background mb-3">Process Scores</div>
                 <div className="flex items-end justify-between gap-2">
                   {[
                     { label: "Quality", val: 93 },
                     { label: "Equipment", val: 89 },
                     { label: "Docs", val: 94 },
                     { label: "Process", val: 88 },
                   ].map((p) => (
                     <div key={p.label} className="text-center">
                       <div className="flex items-baseline justify-center gap-0.5">
                         <span className="text-xl font-bold text-background">{p.val}</span>
                         <span className="text-[10px] text-background/70">%</span>
                       </div>
                       <span className="text-[9px] text-background/70 uppercase">{p.label}</span>
                     </div>
                   ))}
                 </div>
                <div className="mt-3">
                  <SegmentedToggle items={["ISO 13485", "FDA", "CE Mark"]} activeIndex={activeSegment} />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Non-conformances */}
          {showElements >= 4 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-auto">
              <div className="flex gap-2">
                 <GlassCard layer={1} className="px-3 py-2 flex-1 text-center">
                   <span className="text-lg font-bold text-background">0</span>
                   <span className="text-[9px] text-background/70 uppercase block">Major</span>
                 </GlassCard>
                 <GlassCard layer={1} className="px-3 py-2 flex-1 text-center">
                   <span className="text-lg font-bold text-background">1</span>
                   <span className="text-[9px] text-background/70 uppercase block">Minor</span>
                 </GlassCard>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Evidence + Auditor */}
        <div className="w-2/5 border-l border-muted-foreground/10 flex flex-col">
          {showElements >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 flex-1">
               <div className="text-[10px] font-semibold text-foreground/60 uppercase tracking-wider mb-2">Evidence Gallery</div>
              <div className="grid grid-cols-4 gap-1">
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
                 <img src={auditorGen2} alt="Dr. Schmidt" className="w-10 h-10 object-cover" />
                 <div className="flex-1">
                   <div className="text-sm font-medium text-background">Dr. Klaus Schmidt</div>
                   <div className="text-[11px] text-background/70">ISO 13485 Certified</div>
                 </div>
                 <span className="text-[10px] text-primary font-semibold">24h</span>
               </GlassCard>
            </motion.div>
          )}

          <div className="px-4 py-3 border-t border-muted-foreground/10 text-center">
             <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 4 of 4 · Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────
const PlatformDemoAnimation = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [DiscoverScreen, MatchScreen, AuditScreen, IntelligenceScreen];
  const labels = ["Discover", "Match", "Audit", "Intelligence"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 4);
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
              i === currentScreen ? 'text-primary' : 'text-muted-foreground'
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
