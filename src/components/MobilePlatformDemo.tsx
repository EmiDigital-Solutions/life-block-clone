import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";

const SCREEN_DURATION = 5000;

const MobileMatchScreen = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="h-full flex flex-col bg-white p-4 gap-3">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">Auditor Matching</div>
      <div className="bg-muted/30 border border-border/40 p-3">
        <div className="text-xs text-muted-foreground mb-1">Search</div>
        <div className="text-sm font-medium text-foreground">TechMold Industries, Shanghai, VDA 6.3</div>
      </div>
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="border border-primary/30 bg-primary/5 p-3 flex items-center gap-3">
          <img src={auditorGen2} alt="Wei Liu" className="w-10 h-10 object-cover" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">Wei Liu <span className="text-xs text-primary font-bold ml-1">98%</span></div>
            <div className="text-[11px] text-muted-foreground">VDA 6.3 Certified</div>
          </div>
        </motion.div>
      )}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-2 bg-accent/10 border border-accent/30">
          <svg className="w-4 h-4 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span className="text-xs font-semibold text-foreground">Confirmed — On-site Dec 21</span>
        </motion.div>
      )}
    </div>
  );
};

const MobileLiveAuditScreen = () => {
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

  const items = [
    { code: "P6.4.1", label: "Process inputs defined" },
    { code: "P6.4.2", label: "Process sequence planned" },
    { code: "P6.5.1", label: "Personnel qualified" },
    { code: "P6.5.2", label: "Responsibility defined" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="relative h-32 overflow-hidden">
        <img src={equipmentImage} alt="CNC Machine" className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-foreground/70 text-background text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> Live Audit
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="absolute bottom-2 left-2 border border-primary bg-primary/10 px-2 py-1">
          <span className="text-[10px] text-primary font-semibold">CNC Lathe NLX 2500</span>
        </motion.div>
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">VDA 6.3 Checklist</div>
        {items.map((item, i) => (
          <div key={item.code} className="flex items-center gap-2">
            <div className={`w-4 h-4 flex items-center justify-center ${i < checked ? 'bg-accent' : 'border border-border/40'}`}>
              {i < checked && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{item.code}</span>
            <span className={`text-xs ${i < checked ? 'text-foreground' : 'text-muted-foreground'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileIntelligenceScreen = () => {
  const scores = [
    { code: "P2", name: "Project Mgmt", score: 88 },
    { code: "P5", name: "Supplier Mgmt", score: 79 },
    { code: "P6", name: "Process Analysis", score: 84 },
    { code: "P7", name: "Customer Care", score: 91 },
  ];

  return (
    <div className="h-full flex flex-col bg-white p-4 gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">TechMold Industries</div>
          <div className="text-[11px] text-muted-foreground">VDA 6.3 Report</div>
        </div>
        <div className="text-2xl font-bold text-primary">84.2%</div>
      </div>
      <div className="space-y-2">
        {scores.map((p, i) => (
          <motion.div key={p.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
            className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground w-6">{p.code}</span>
            <span className="text-xs text-foreground flex-1">{p.name}</span>
            <div className="w-16 h-1.5 bg-muted overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.score}%` }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`h-full ${p.score >= 85 ? 'bg-accent' : p.score >= 80 ? 'bg-primary' : 'bg-amber-500'}`} />
            </div>
            <span className="text-xs font-bold w-8 text-right text-foreground">{p.score}%</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <div className="px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-semibold">2 Major</div>
        <div className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-semibold">1 Minor</div>
        <div className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-semibold">1 OFI</div>
      </div>
    </div>
  );
};

const MobilePlatformDemo = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [MobileMatchScreen, MobileLiveAuditScreen, MobileIntelligenceScreen];
  const labels = ["Match", "Audit", "Intel"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const Screen = screens[currentScreen];

  return (
    <div className="w-full aspect-[3/4] border border-border/20 shadow-xl overflow-hidden flex flex-col bg-white">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-4 py-2 bg-muted/20 border-b border-border/20">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full transition-colors ${i === currentScreen ? 'bg-primary' : 'bg-border/40'}`} />
            <span className={`text-[10px] font-medium ${i === currentScreen ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom tag */}
      <div className="py-2 text-center bg-muted/20 border-t border-border/20">
        <span className="text-[10px] text-muted-foreground">Match → Audit → Intelligence. All in 3 days.</span>
      </div>
    </div>
  );
};

export default MobilePlatformDemo;
