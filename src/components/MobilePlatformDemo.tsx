import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";

const SCREEN_DURATION = 5000;

/* Dashboard card — muted bg, squared */
const DashCard = ({ children, className = "", highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) => (
  <div className={`border ${highlight ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/60'} ${className}`}>
    {children}
  </div>
);

/* Mini bar chart */
const BarChart = ({ bars, accentIndex = -1 }: { bars: number[]; accentIndex?: number }) => (
  <div className="flex items-end gap-[2px] h-8">
    {bars.map((h, i) => (
      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
        transition={{ duration: 0.3, delay: i * 0.02 }}
        className={`w-[2px] ${i === accentIndex ? 'bg-primary' : 'bg-muted-foreground/25'}`}
      />
    ))}
  </div>
);

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
    <div className="h-full flex flex-col bg-background p-4 gap-2">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">SearchPro+ · AI-Powered</div>

      <div className="flex gap-2">
        <div className="w-5 h-5 bg-foreground flex items-center justify-center flex-shrink-0">
          <span className="text-[8px] font-bold text-background">AI</span>
        </div>
        <DashCard className="px-2.5 py-1.5 text-[11px] text-foreground">
          What are you looking for?
        </DashCard>
      </div>

      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <DashCard className="px-2.5 py-1.5 text-[11px] text-foreground max-w-[80%]">
            Implantable medical device components
          </DashCard>
        </motion.div>
      )}

      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          <div className="w-5 h-5 bg-foreground flex items-center justify-center flex-shrink-0">
            <span className="text-[8px] font-bold text-background">AI</span>
          </div>
          <DashCard className="px-2.5 py-1.5 text-[11px] text-foreground">
            Searching: ISO 13485 + FDA + Titanium…
          </DashCard>
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
          {["MediParts GmbH · Munich", "BioTech Precision SA · Geneva"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <DashCard highlight={i === 0} className="px-2.5 py-1.5 text-[10px] text-foreground">
                {s}
              </DashCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {phase >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-center">
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Step 1 · Discover</span>
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
    <div className="h-full flex flex-col bg-background p-4 gap-3">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">Auditor Matching</div>

      <DashCard className="p-3">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-xl font-bold text-foreground">3</span>
          <span className="text-[10px] text-primary font-semibold -translate-y-1.5">+3</span>
        </div>
        <span className="text-[9px] text-muted-foreground uppercase">Auditors Matched</span>
        <div className="mt-2">
          <BarChart bars={matchBars} accentIndex={12} />
        </div>
      </DashCard>

      {phase >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <DashCard highlight className="p-3 flex items-center gap-3">
            <img src={auditorGen2} alt="Dr. Schmidt" className="w-10 h-10 object-cover" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">Dr. Klaus Schmidt</div>
              <div className="text-[11px] text-muted-foreground">ISO 13485 Certified</div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-foreground">94</span>
              <span className="text-[10px] text-muted-foreground">%</span>
            </div>
          </DashCard>
        </motion.div>
      )}

      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DashCard highlight className="flex items-center gap-2 p-2.5">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-xs font-semibold text-foreground">Confirmed — On-site Dec 22</span>
          </DashCard>
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

  const items = ["Sterile environment validated", "Quality management active", "Traceability complete", "Personnel qualified"];

  return (
    <div className="h-full flex flex-col bg-background">
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
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">ISO 13485 Checklist</div>
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-2">
            <div className={`w-4 h-4 flex items-center justify-center ${i < checked ? 'bg-foreground' : 'border border-border'}`}>
              {i < checked && (
                <svg className="w-2.5 h-2.5 text-background" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
            <span className={`text-xs ${i < checked ? 'text-foreground' : 'text-muted-foreground'}`}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileIntelligenceScreen = () => {
  const scoreBars = [40, 55, 45, 60, 50, 65, 70, 55, 75, 80, 60, 85, 70, 90, 91];
  const scores = [
    { name: "Quality", score: 93 },
    { name: "Equipment", score: 89 },
    { name: "Docs", score: 94 },
    { name: "Process", score: 88 },
  ];

  return (
    <div className="h-full flex flex-col bg-background p-4 gap-3">
      <DashCard className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">91.3</span>
              <span className="text-sm text-muted-foreground">%</span>
              <span className="text-[10px] text-primary font-semibold -translate-y-2">+2.1</span>
            </div>
            <span className="text-[9px] text-muted-foreground uppercase">Overall Score</span>
          </div>
          <div className="text-sm font-semibold text-foreground">MediParts GmbH</div>
        </div>
        <BarChart bars={scoreBars} accentIndex={14} />
      </DashCard>

      <DashCard className="p-3">
        <div className="flex items-end justify-between gap-2">
          {scores.map((p) => (
            <div key={p.name} className="text-center">
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-lg font-bold text-foreground">{p.score}</span>
                <span className="text-[9px] text-muted-foreground">%</span>
              </div>
              <span className="text-[8px] text-muted-foreground uppercase">{p.name}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-3 border border-border overflow-hidden">
          <div className="px-2.5 py-1 text-[9px] font-semibold bg-foreground text-background flex-1 text-center">0 Major</div>
          <div className="px-2.5 py-1 text-[9px] font-semibold bg-background text-muted-foreground flex-1 text-center">1 Minor</div>
        </div>
      </DashCard>
    </div>
  );
};

const MobilePlatformDemo = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [MobileDiscoverScreen, MobileMatchScreen, MobileAuditScreen, MobileIntelligenceScreen];
  const labels = ["Discover", "Match", "Audit", "Intel"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 4);
    }, SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const Screen = screens[currentScreen];

  return (
    <div className="w-full aspect-[3/4] border border-border shadow-xl overflow-hidden flex flex-col bg-background">
      <div className="flex items-center justify-center gap-3 py-2 bg-muted/20 border-b border-border">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 transition-colors ${i === currentScreen ? 'bg-primary' : 'bg-border'}`} />
            <span className={`text-[10px] font-medium ${i === currentScreen ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
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

      <div className="py-2 text-center bg-muted/20 border-t border-border">
        <span className="text-[10px] text-muted-foreground">Discover → Match → Audit → Intelligence. All in 3 days.</span>
      </div>
    </div>
  );
};

export default MobilePlatformDemo;
