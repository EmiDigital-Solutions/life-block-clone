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

const SCREEN_DURATION = 5000;

// ─── SCREEN 1: MATCH ────────────────────────────────────────────
const MatchScreen = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground">Auditor Matching</span>
        </div>
        <span className="text-xs text-muted-foreground">ScanPro+ Platform</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-5">
        {/* Search query */}
        <div className="bg-muted/30 border border-border/40 p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Search Query</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 0 ? 1 : 0 }}
            className="text-base font-medium text-foreground"
          >
            TechMold Industries, Shanghai, VDA 6.3
          </motion.div>
        </div>

        {/* Result */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-primary/30 bg-primary/5 p-4"
          >
            <div className="flex items-center gap-4">
              <img src={auditorGen2} alt="Wei Liu" className="w-14 h-14 object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-semibold text-foreground">Wei Liu</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5">98% Match</span>
                </div>
                <div className="text-sm text-muted-foreground">VDA 6.3 Certified · Shanghai Region · 12 yrs experience</div>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent-foreground font-medium">VDA 6.3</span>
                  <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent-foreground font-medium">IATF 16949</span>
                  <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent-foreground font-medium">Mandarin</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Confirmed */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-3 bg-accent/10 border border-accent/30"
          >
            <svg className="w-5 h-5 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-sm font-semibold text-foreground">Confirmed — On-site Dec 21</span>
          </motion.div>
        )}

        {/* Final overlay text */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto text-center"
          >
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Step 1 of 3 · Match</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ─── SCREEN 2: LIVE AUDIT ───────────────────────────────────────
const LiveAuditScreen = () => {
  const [checkedItems, setCheckedItems] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCheckedItems(1), 600),
      setTimeout(() => setCheckedItems(2), 1500),
      setTimeout(() => setCheckedItems(3), 2500),
      setTimeout(() => setCheckedItems(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const checklistItems = [
    { code: "P6.4.1", label: "Process inputs defined" },
    { code: "P6.4.2", label: "Process sequence planned" },
    { code: "P6.5.1", label: "Personnel qualified" },
    { code: "P6.5.2", label: "Responsibility defined" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-sm font-semibold text-foreground">Live Audit</span>
          <span className="text-xs text-muted-foreground">· TechMold Industries</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={auditorGen2} alt="Wei Liu" className="w-6 h-6 object-cover rounded-full" />
          <span className="text-xs text-muted-foreground">Wei Liu · VDA 6.3</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left: Factory photo with CV overlay */}
        <div className="w-1/2 relative overflow-hidden">
          <img src={equipmentImage} alt="Factory floor CNC" className="w-full h-full object-cover" />
          {/* CV detection overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-4 left-4 right-4"
          >
            <div className="border-2 border-primary p-2 bg-primary/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs font-semibold text-primary">CNC Lathe NLX 2500</span>
              </div>
              <span className="text-[10px] text-primary/80 mt-1 block">Computer Vision Detected</span>
            </div>
          </motion.div>

          <div className="absolute bottom-3 left-3">
            <div className="px-2 py-1 bg-foreground/70 text-background text-[10px] font-medium">
              Control Panel
            </div>
          </div>
        </div>

        {/* Right: VDA 6.3 Checklist */}
        <div className="w-1/2 flex flex-col border-l border-border/30">
          <div className="px-4 py-3 border-b border-border/20">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wider">VDA 6.3 Checklist</div>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {checklistItems.map((item, i) => (
              <motion.div
                key={item.code}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: i < checkedItems ? 1 : 0.4 }}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 flex items-center justify-center transition-colors duration-300 ${
                  i < checkedItems ? 'bg-accent' : 'border-2 border-border/40'
                }`}>
                  {i < checkedItems && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </motion.svg>
                  )}
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">{item.code}</span>
                <span className={`text-sm ${i < checkedItems ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="px-4 py-3 bg-muted/20 border-t border-border/20">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Step 2 of 3 · Live Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 3: INTELLIGENCE ─────────────────────────────────────
const IntelligenceScreen = () => {
  const [showElements, setShowElements] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(1), 400),
      setTimeout(() => setShowElements(2), 1200),
      setTimeout(() => setShowElements(3), 2200),
      setTimeout(() => setShowElements(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const processScores = [
    { code: "P2", name: "Project Management", score: 88 },
    { code: "P3", name: "Product & Process Dev.", score: 82 },
    { code: "P4", name: "Realization", score: 85 },
    { code: "P5", name: "Supplier Management", score: 79 },
    { code: "P6", name: "Process Analysis", score: 84 },
    { code: "P7", name: "Customer Care", score: 91 },
  ];

  const evidenceImages = [evidenceCNC, evidenceCMM, evidenceControlPlan, evidenceAssembly, evidenceCertification, evidenceInspector];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border/30 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">TechMold Industries Co., Ltd. Shanghai</div>
          <div className="text-xs text-muted-foreground">VDA 6.3 Process Audit Report</div>
        </div>
        <div className="flex items-center gap-2">
          <img src={auditorGen2} alt="Wei Liu" className="w-6 h-6 object-cover rounded-full" />
          <span className="text-xs text-muted-foreground">Wei Liu</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left: Scores */}
        <div className="w-3/5 p-5 flex flex-col gap-4 overflow-hidden">
          {/* Overall Score */}
          {showElements >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-2"
            >
              <div className="text-4xl font-bold text-primary">84.2%</div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                <span className="text-sm text-accent-foreground font-medium">+2.1% vs last audit</span>
              </div>
            </motion.div>
          )}

          {/* Process Element Scores */}
          {showElements >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Process Element Scores</div>
              {processScores.map((p, i) => (
                <motion.div
                  key={p.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[10px] font-mono text-muted-foreground w-6">{p.code}</span>
                  <span className="text-xs text-foreground flex-1 truncate">{p.name}</span>
                  <div className="w-24 h-1.5 bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.score}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className={`h-full ${p.score >= 85 ? 'bg-accent' : p.score >= 80 ? 'bg-primary' : 'bg-amber-500'}`}
                    />
                  </div>
                  <span className={`text-xs font-bold w-8 text-right ${p.score >= 85 ? 'text-accent-foreground' : p.score >= 80 ? 'text-primary' : 'text-amber-600'}`}>
                    {p.score}%
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Non-Conformances */}
          {showElements >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto"
            >
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Non-Conformances</div>
              <div className="flex gap-3">
                <div className="px-3 py-1.5 bg-destructive/10 text-destructive text-xs font-semibold">2 Major</div>
                <div className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold">1 Minor</div>
                <div className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-semibold">1 OFI</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Evidence Gallery + Lead Auditor */}
        <div className="w-2/5 border-l border-border/30 flex flex-col">
          {showElements >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 flex-1"
            >
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Evidence Gallery</div>
              <div className="grid grid-cols-3 gap-1.5">
                {evidenceImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square overflow-hidden"
                  >
                    <img src={img} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {showElements >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border-t border-border/20"
            >
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Lead Auditor</div>
              <div className="flex items-center gap-3">
                <img src={auditorGen2} alt="Wei Liu" className="w-10 h-10 object-cover" />
                <div>
                  <div className="text-sm font-medium text-foreground">Wei Liu</div>
                  <div className="text-[11px] text-muted-foreground">VDA 6.3 Certified</div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="px-4 py-3 bg-muted/20 border-t border-border/20">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Step 3 of 3 · Intelligence</span>
          </div>
        </div>
      </div>

      {/* Final overlay */}
      {showElements >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-12 left-0 right-0 text-center pointer-events-none"
        >
        </motion.div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────
const PlatformDemoAnimation = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [MatchScreen, LiveAuditScreen, IntelligenceScreen];
  const labels = ["Match", "Live Audit", "Intelligence"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const CurrentScreenComponent = screens[currentScreen];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Progress indicators */}
      <div className="flex items-center gap-1 px-4 py-2 bg-muted/30 border-b border-border/20">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1 flex-1">
            <div className={`h-1 flex-1 transition-colors duration-500 ${
              i <= currentScreen ? 'bg-primary' : 'bg-border/40'
            }`} />
            <span className={`text-[10px] font-medium transition-colors duration-300 ${
              i === currentScreen ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Screen content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <CurrentScreenComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
