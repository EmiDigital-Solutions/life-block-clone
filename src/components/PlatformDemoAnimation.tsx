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
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 3400),
      setTimeout(() => setPhase(6), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const profileFields = [
    { label: "Industry", value: "Aerospace & Defense" },
    { label: "Capabilities", value: "CNC Machining, 5-Axis, EDM" },
    { label: "Certifications", value: "ISO 9001, AS9100 Rev D" },
    { label: "Employees", value: "120 · Founded 2004" },
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG} p-3 gap-2`}>
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-background flex items-center justify-center">
             <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
             </svg>
           </div>
           <span className="text-sm font-semibold text-foreground">New Audit Order</span>
         </div>
         <span className="text-[10px] text-foreground/60 uppercase tracking-wider">Step 1</span>
       </div>

      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {/* Step 1: Client enters supplier info */}
        {phase >= 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard layer={2} className="p-3 space-y-2">
              <div className="text-[9px] text-background/60 uppercase tracking-wider font-semibold">Enter Supplier Details</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-background/50 w-14">Name</span>
                  <div className="flex-1 border-b border-background/20 pb-0.5">
                    <span className="text-xs text-background font-medium">PräzisionsTech GmbH</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-background/50 w-14">Country</span>
                  <div className="flex-1 border-b border-background/20 pb-0.5">
                    <span className="text-xs text-background font-medium">Germany</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-background/50 w-14">City</span>
                  <div className="flex-1 border-b border-background/20 pb-0.5">
                    <span className="text-xs text-background font-medium">Stuttgart</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 2: AI searching for suppliers */}
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-primary">
            <motion.div animate={{ rotate: phase < 2 ? 360 : 0 }} transition={{ repeat: phase < 2 ? Infinity : 0, duration: 1, ease: "linear" }}
              className={`w-4 h-4 border-2 border-primary ${phase < 2 ? 'border-t-transparent rounded-full' : 'rounded-full bg-primary'}`} />
            {phase < 2 ? "AI searching suppliers…" : (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Found 1 match
              </span>
            )}
          </motion.div>
        )}

        {/* Step 3: Search results showing supplier match */}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard layer={2} className="p-3">
              <div className="text-[9px] text-background/60 uppercase tracking-wider font-semibold mb-2">Search Results</div>
              <GlassCard highlight className="p-2.5 flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-background">PräzisionsTech GmbH</div>
                  <div className="text-[10px] text-background/70">Stuttgart, Germany · Aerospace</div>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 border border-primary/40 bg-primary/5">
                  <span className="text-lg font-bold text-primary">94</span>
                  <span className="text-[8px] text-primary">%</span>
                </div>
              </GlassCard>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 4: AI generating intelligence profile */}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-primary">
            <motion.div animate={{ rotate: phase < 3 ? 360 : 0 }} transition={{ repeat: phase < 3 ? Infinity : 0, duration: 1, ease: "linear" }}
              className={`w-4 h-4 border-2 border-primary ${phase < 3 ? 'border-t-transparent rounded-full' : 'rounded-full bg-primary'}`} />
            {phase < 3 ? "AI building intelligence profile…" : (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Intelligence profile created
              </span>
            )}
          </motion.div>
        )}

        {/* Step 5: AI-generated intelligence profile */}
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard highlight layer={2} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-background">PräzisionsTech GmbH</div>
                  <div className="text-[10px] text-background/60">Stuttgart, Germany</div>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 border border-primary/40">
                  <div className="w-1.5 h-1.5 bg-primary" />
                  <span className="text-[8px] text-primary font-bold uppercase">AI Verified</span>
                </div>
              </div>
              <div className="space-y-1">
                {profileFields.map((f, i) => (
                  <motion.div key={f.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2">
                    <span className="text-[9px] text-background/50 w-20 flex-shrink-0 uppercase">{f.label}</span>
                    <span className="text-[11px] text-background font-medium">{f.value}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 4: Upload checklists */}
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard layer={2} className="p-2.5">
              <div className="text-[9px] text-background/60 uppercase tracking-wider font-semibold mb-1.5">Upload Checklists</div>
              <div className="space-y-1">
                {["ISO_9001_Checklist.pdf", "Custom_Requirements.xlsx"].map((file, i) => (
                  <motion.div key={file} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-[11px]">
                    <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-background font-medium">{file}</span>
                    <svg className="w-3 h-3 text-primary ml-auto" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 5: Order confirmed */}
        {phase >= 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <GlassCard highlight className="flex items-center gap-3 p-3">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <div>
                <span className="text-sm font-semibold text-background">Audit Order Confirmed</span>
                <div className="text-[10px] text-background/60">Timeline: 3 business days</div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase >= 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-center">
           <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 1 of 5 · Discover</span>
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
    { name: "Markus Hoffmann", match: 94, cert: "ISO 9001 · Stuttgart · 15 yrs", img: auditorGen2 },
    { name: "Dr. Anna Weber", match: 91, cert: "AS9100 · Frankfurt · 12 yrs", img: auditorGen3 },
    { name: "Thomas Richter", match: 88, cert: "IATF 16949 · Munich · 9 yrs", img: auditorGen4 },
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
           <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 2 of 5 · Match</span>
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
    "CNC machine calibration verified",
    "Quality management system active",
    "Traceability documentation complete",
    "Operator certifications valid",
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-3 py-2 border-b border-foreground/10 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
           <span className="text-sm font-semibold text-foreground">Live Audit</span>
           <span className="text-xs text-foreground/60">· PräzisionsTech GmbH</span>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="M. Hoffmann" className="w-6 h-6 object-cover" />
           <span className="text-xs text-foreground/60">M. Hoffmann</span>
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
            transition={{ delay: 0.4, duration: 0.5 }} className="absolute top-3 left-3 right-3">
             <GlassCard highlight layer={2} className="p-2">
               <div className="flex items-center gap-2">
                 <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
                 <span className="text-xs font-semibold text-primary">DMG MORI NLX 2500</span>
               </div>
               <span className="text-[10px] text-background/70 mt-1 block">AI Equipment Detection</span>
             </GlassCard>
          </motion.div>
          <div className="absolute bottom-3 left-3">
            <div className="px-2 py-1 bg-foreground/70 text-background text-[10px] font-medium">CNC Turning Center</div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col border-l border-muted-foreground/10">
           <div className="px-3 py-2 border-b border-foreground/10">
             <div className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">ISO 9001 Checklist</div>
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
             <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 3 of 5 · Audit</span>
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
    { label: "Calibration Compliance", value: "97", unit: "%", delta: "+4", bars: [60, 68, 74, 78, 83, 87, 90, 93, 95, 97] },
    { label: "NCR Close-out Rate", value: "94", unit: "%", delta: "+8", bars: [55, 62, 70, 75, 80, 84, 88, 91, 93, 94] },
    { label: "Process Capability (Cpk)", value: "1.67", unit: "", delta: "+0.3", bars: [40, 50, 58, 65, 72, 78, 83, 87, 92, 96] },
  ];

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-3 py-2 border-b border-foreground/10 flex items-center justify-between">
         <div>
           <div className="text-sm font-semibold text-foreground">PräzisionsTech GmbH</div>
           <div className="text-xs text-foreground/60">ISO 9001 Audit Report</div>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="M. Hoffmann" className="w-6 h-6 object-cover" />
           <span className="text-xs text-foreground/60">M. Hoffmann</span>
         </div>
       </div>

      <div className="flex-1 flex">
        <div className="w-3/5 p-3 flex flex-col gap-2 overflow-hidden">
          {/* Main score — donut + stat */}
          {showElements >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard layer={2} className="p-3 flex items-center gap-3 overflow-hidden relative">
                <div className="-ml-5 -my-3 flex-shrink-0">
                  <DonutScore score={91} size={110} />
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

          {/* Process scores + segmented toggle */}
          {showElements >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={3} className="p-2.5">
               <div className="text-xs font-semibold text-background mb-2">Process Scores</div>
                 <div className="flex items-end justify-between gap-2">
                   {[
                     { label: "Quality", val: 93 },
                     { label: "Equipment", val: 89 },
                     { label: "Docs", val: 94 },
                     { label: "Process", val: 88 },
                   ].map((p) => (
                     <div key={p.label} className="text-center">
                       <div className="flex items-baseline justify-center gap-0.5">
                         <span className="text-lg font-bold text-background">{p.val}</span>
                         <span className="text-[9px] text-background/70">%</span>
                       </div>
                       <span className="text-[8px] text-background/70 uppercase">{p.label}</span>
                     </div>
                   ))}
                 </div>
                <div className="mt-2">
                  <SegmentedToggle items={["ISO 9001", "AS9100", "IATF"]} activeIndex={activeSegment} />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Audit KPI bar charts */}
          {showElements >= 4 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
              {auditKpis.map((kpi, idx) => (
                <motion.div key={kpi.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.15 }}>
                  <GlassCard layer={2} className="px-2.5 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] text-background/60 uppercase tracking-wider font-semibold">{kpi.label}</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-sm font-bold text-background">{kpi.value}</span>
                        <span className="text-[8px] text-background/70">{kpi.unit}</span>
                        <span className="text-[7px] text-primary font-semibold ml-0.5 -translate-y-1">{kpi.delta}</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-[2px] h-6">
                      {kpi.bars.map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                          className={`flex-1 ${i >= 8 ? 'bg-primary' : 'bg-background/30'}`}
                        />
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Non-conformances */}
          {showElements >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto">
              <div className="flex gap-2">
                 <GlassCard layer={1} className="px-3 py-1.5 flex-1 text-center">
                   <span className="text-base font-bold text-background">0</span>
                   <span className="text-[9px] text-background/70 uppercase block">Major</span>
                 </GlassCard>
                 <GlassCard layer={1} className="px-3 py-1.5 flex-1 text-center">
                   <span className="text-base font-bold text-background">1</span>
                   <span className="text-[9px] text-background/70 uppercase block">Minor</span>
                 </GlassCard>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Evidence + Auditor */}
        <div className="w-2/5 border-l border-muted-foreground/10 flex flex-col">
          {showElements >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 flex-1">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border-t border-muted-foreground/10">
               <GlassCard layer={2} className="flex items-center gap-3 p-2.5">
                 <img src={auditorGen2} alt="M. Hoffmann" className="w-9 h-9 object-cover" />
                 <div className="flex-1">
                   <div className="text-sm font-medium text-background">Markus Hoffmann</div>
                   <div className="text-[11px] text-background/70">ISO 9001 Lead Auditor</div>
                 </div>
                 <span className="text-[10px] text-primary font-semibold">24h</span>
               </GlassCard>
            </motion.div>
          )}

          <div className="px-4 py-2 border-t border-muted-foreground/10 text-center">
             <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 4 of 5 · Intelligence</span>
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

  const statusColor = (s: string) => s === "overdue" ? "bg-destructive" : s === "in-progress" ? "bg-primary" : "bg-background/40";
  const statusLabel = (s: string) => s === "overdue" ? "Overdue" : s === "in-progress" ? "In Progress" : "Open";
  const typeColor = (t: string) => t === "Major NC" ? "text-destructive" : t === "Minor NC" ? "text-background" : "text-primary";

  return (
    <div className={`h-full flex flex-col ${SCREEN_BG}`}>
       <div className="px-3 py-2 border-b border-foreground/10 flex items-center justify-between">
         <div>
           <div className="text-sm font-semibold text-foreground">CAPA Tracker</div>
           <div className="text-xs text-foreground/60">PräzisionsTech GmbH · Findings</div>
         </div>
         <div className="flex items-center gap-2">
           <img src={auditorGen2} alt="M. Hoffmann" className="w-6 h-6 object-cover" />
           <span className="text-xs text-foreground/60">Monitored</span>
         </div>
       </div>

      <div className="flex-1 flex">
        {/* Left: Findings list */}
        <div className="w-3/5 p-3 flex flex-col gap-1.5 overflow-hidden">
          {/* Summary stats */}
          {phase >= 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-2 mb-1">
                <GlassCard layer={2} className="px-2.5 py-1.5 flex-1 text-center">
                  <span className="text-lg font-bold text-destructive">1</span>
                  <span className="text-[8px] text-background/70 uppercase block">Major NC</span>
                </GlassCard>
                <GlassCard layer={2} className="px-2.5 py-1.5 flex-1 text-center">
                  <span className="text-lg font-bold text-background">1</span>
                  <span className="text-[8px] text-background/70 uppercase block">Minor NC</span>
                </GlassCard>
                <GlassCard layer={2} className="px-2.5 py-1.5 flex-1 text-center">
                  <span className="text-lg font-bold text-primary">2</span>
                  <span className="text-[8px] text-background/70 uppercase block">OFI</span>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* Findings cards */}
          {findings.map((f, idx) => (
            phase >= idx + 2 && (
              <motion.div key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                <GlassCard highlight={f.status === "overdue"} layer={2} className="p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-background/50">{f.id}</span>
                      <span className={`text-[9px] font-bold uppercase ${typeColor(f.type)}`}>{f.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${statusColor(f.status)}`} />
                      <span className="text-[8px] text-background/60 font-semibold">{statusLabel(f.status)}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-background font-medium mb-1.5 leading-tight">{f.title}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-background/20 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${f.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full ${f.status === "overdue" ? "bg-destructive" : "bg-primary"}`}
                      />
                    </div>
                    <span className="text-[8px] text-background/60 font-semibold">{f.progress}%</span>
                    <span className="text-[8px] text-background/50">Due {f.due}</span>
                  </div>
                </GlassCard>
              </motion.div>
            )
          ))}
        </div>

        {/* Right: Timeline + status */}
        <div className="w-2/5 border-l border-muted-foreground/10 flex flex-col p-3 gap-2">
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={3} className="p-3">
                <div className="text-[10px] font-semibold text-background/60 uppercase tracking-wider mb-2">Close-out Progress</div>
                <DonutScore score={49} size={100} />
                <div className="text-center mt-1">
                  <span className="text-[9px] text-background/60">2 of 4 findings addressed</span>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <GlassCard layer={2} className="p-2.5">
                <div className="text-[9px] font-semibold text-background/60 uppercase tracking-wider mb-1.5">Activity</div>
                {[
                  { time: "2h ago", text: "Calibration evidence uploaded", actor: "Supplier" },
                  { time: "5h ago", text: "Training records requested", actor: "Client" },
                  { time: "1d ago", text: "NC-001 response submitted", actor: "Supplier" },
                ].map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-2 mb-1.5 last:mb-0">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-background font-medium leading-tight">{a.text}</div>
                      <div className="text-[8px] text-background/50">{a.actor} · {a.time}</div>
                    </div>
                  </motion.div>
                ))}
              </GlassCard>
            </motion.div>
          )}

          {phase >= 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-auto">
              <GlassCard highlight className="p-2.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-[10px] font-semibold text-background">Client notified — NC-001 overdue</span>
              </GlassCard>
            </motion.div>
          )}

          <div className="px-2 py-2 border-t border-muted-foreground/10 text-center mt-auto">
            <span className="text-[10px] text-foreground/60 tracking-wider uppercase">Step 5 of 5 · CAPA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────
const PlatformDemoAnimation = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [DiscoverScreen, MatchScreen, AuditScreen, IntelligenceScreen, CAPAScreen];
  const labels = ["Discover", "Match", "Audit", "Intel", "CAPA"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 5);
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
