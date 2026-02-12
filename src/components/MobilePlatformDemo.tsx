import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";

const SCREEN_DURATION = 5000;

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
    <div className="h-full flex flex-col bg-white p-4 gap-2">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">SearchPro+ · AI-Powered</div>
      
      <div className="flex gap-2">
        <div className="w-5 h-5 bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-[8px] font-bold text-primary-foreground">AI</span>
        </div>
        <div className="bg-muted/40 border border-border/30 px-2.5 py-1.5 text-[11px] text-foreground">
          What are you looking for?
        </div>
      </div>

      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <div className="bg-primary/10 border border-primary/20 px-2.5 py-1.5 text-[11px] text-foreground max-w-[80%]">
            Implantable medical device components
          </div>
        </motion.div>
      )}

      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          <div className="w-5 h-5 bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-[8px] font-bold text-primary-foreground">AI</span>
          </div>
          <div className="bg-muted/40 border border-border/30 px-2.5 py-1.5 text-[11px] text-foreground">
            Searching: ISO 13485 + FDA + Titanium…
          </div>
        </motion.div>
      )}

      {phase >= 3 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5 mt-1">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-[11px] font-semibold text-foreground">4 Suppliers Found</span>
          </div>
          {["MediParts GmbH · Munich", "BioTech Precision SA · Geneva"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
              className={`px-2.5 py-1.5 border text-[10px] ${i === 0 ? 'border-primary/30 bg-primary/5 font-medium' : 'border-border/30'} text-foreground`}>
              {s}
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

  return (
    <div className="h-full flex flex-col bg-white p-4 gap-3">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">Auditor Matching</div>
      <div className="bg-muted/30 border border-border/40 p-3">
        <div className="text-xs text-muted-foreground mb-1">Verify</div>
        <div className="text-sm font-medium text-foreground">MediParts GmbH, Munich, ISO 13485</div>
      </div>
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="border border-primary/30 bg-primary/5 p-3 flex items-center gap-3">
          <img src={auditorGen2} alt="Dr. Schmidt" className="w-10 h-10 object-cover" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">Dr. Klaus Schmidt <span className="text-xs text-primary font-bold ml-1">94%</span></div>
            <div className="text-[11px] text-muted-foreground">ISO 13485 Certified</div>
          </div>
        </motion.div>
      )}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-2 bg-accent/10 border border-accent/30">
          <svg className="w-4 h-4 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span className="text-xs font-semibold text-foreground">Confirmed — On-site Dec 22</span>
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
    <div className="h-full flex flex-col bg-white">
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
            <div className={`w-4 h-4 flex items-center justify-center ${i < checked ? 'bg-accent' : 'border border-border/40'}`}>
              {i < checked && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
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
  const scores = [
    { name: "Quality Mgmt", score: 93 },
    { name: "Equipment", score: 89 },
    { name: "Documentation", score: 94 },
    { name: "Process Control", score: 88 },
  ];

  return (
    <div className="h-full flex flex-col bg-white p-4 gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">MediParts GmbH</div>
          <div className="text-[11px] text-muted-foreground">ISO 13485 Report</div>
        </div>
        <div className="text-2xl font-bold text-primary">91.3%</div>
      </div>
      <div className="space-y-2">
        {scores.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
            className="flex items-center gap-2">
            <span className="text-xs text-foreground flex-1">{p.name}</span>
            <div className="w-16 h-1.5 bg-muted overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.score}%` }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`h-full ${p.score >= 92 ? 'bg-accent' : p.score >= 89 ? 'bg-primary' : 'bg-amber-500'}`} />
            </div>
            <span className="text-xs font-bold w-8 text-right text-foreground">{p.score}%</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <div className="px-2 py-1 bg-accent/10 text-accent-foreground text-[10px] font-semibold">0 Major</div>
        <div className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-semibold">1 Minor</div>
      </div>
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
    <div className="w-full aspect-[3/4] border border-border/20 shadow-xl overflow-hidden flex flex-col bg-white">
      <div className="flex items-center justify-center gap-3 py-2 bg-muted/20 border-b border-border/20">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full transition-colors ${i === currentScreen ? 'bg-primary' : 'bg-border/40'}`} />
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

      <div className="py-2 text-center bg-muted/20 border-t border-border/20">
        <span className="text-[10px] text-muted-foreground">Discover → Match → Audit → Intelligence. All in 3 days.</span>
      </div>
    </div>
  );
};

export default MobilePlatformDemo;
