import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";

const SCREEN_DURATION = 5000;

/* Shared dark-glass card */
const GlassCard = ({ children, className = "", accent = false }: { children: React.ReactNode; className?: string; accent?: boolean }) => (
  <div className={`rounded-2xl border ${accent ? 'border-primary/40 bg-primary/10' : 'border-white/10 bg-white/5'} backdrop-blur-md ${className}`}>
    {children}
  </div>
);

const Pill = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-semibold ${
    active ? 'bg-primary text-white' : 'bg-white/10 text-white/50'
  }`}>
    {children}
  </span>
);

const CircleScore = ({ score, size = 56 }: { score: number; size?: number }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="hsl(199, 91%, 64%)" strokeWidth={3} strokeLinecap="round"
          initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span className="text-sm font-bold text-white">{score}%</span>
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
    <div className="h-full flex flex-col p-4 gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/40 uppercase tracking-wider">SearchPro+</span>
        <Pill active>AI-Powered</Pill>
      </div>

      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[8px] font-bold text-primary">AI</span>
        </div>
        <GlassCard className="px-2.5 py-1.5 text-[11px] text-white/70">
          What are you looking for?
        </GlassCard>
      </div>

      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <GlassCard accent className="px-2.5 py-1.5 text-[11px] text-white max-w-[80%]">
            Implantable medical device components
          </GlassCard>
        </motion.div>
      )}

      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          <div className="w-5 h-5 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[8px] font-bold text-primary">AI</span>
          </div>
          <GlassCard className="px-2.5 py-1.5 text-[11px] text-white/70">
            Searching: ISO 13485 + FDA + Titanium…
          </GlassCard>
        </motion.div>
      )}

      {phase >= 3 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-2 h-2 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-white">4 Suppliers Found</span>
          </div>
          {["MediParts GmbH · Munich", "BioTech Precision SA · Geneva"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <GlassCard accent={i === 0} className="px-2.5 py-1.5 text-[10px] text-white/80">
                {s}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {phase >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-center">
          <span className="text-[9px] text-white/20 uppercase tracking-wider">Step 1 · Discover</span>
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
    <div className="h-full flex flex-col p-4 gap-3">
      <div className="text-xs text-white/40 uppercase tracking-wider">Auditor Matching</div>
      <GlassCard className="p-3">
        <div className="text-xs text-white/30 mb-1">Verify</div>
        <div className="text-sm font-medium text-white">MediParts GmbH, Munich, ISO 13485</div>
      </GlassCard>
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard accent className="p-3 flex items-center gap-3">
            <img src={auditorGen2} alt="Dr. Schmidt" className="w-10 h-10 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Dr. Klaus Schmidt <Pill active>94%</Pill></div>
              <div className="text-[11px] text-white/40">ISO 13485 Certified</div>
            </div>
          </GlassCard>
        </motion.div>
      )}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlassCard accent className="flex items-center gap-2 p-2.5">
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white">Confirmed — On-site Dec 22</span>
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

  const items = ["Sterile environment validated", "Quality management active", "Traceability complete", "Personnel qualified"];

  return (
    <div className="h-full flex flex-col">
      <div className="relative h-28 overflow-hidden">
        <img src={equipmentImage} alt="Cleanroom" className="w-full h-full object-cover brightness-50" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white/70 text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Audit
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="absolute bottom-2 left-2 rounded-lg border border-primary/40 bg-black/60 backdrop-blur-sm px-2 py-1">
          <span className="text-[10px] text-primary font-semibold">Clean Room Class 7</span>
        </motion.div>
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">ISO 13485 Checklist</div>
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-md flex items-center justify-center ${i < checked ? 'bg-primary' : 'border border-white/15'}`}>
              {i < checked && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
            <span className={`text-xs ${i < checked ? 'text-white' : 'text-white/30'}`}>{item}</span>
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
    <div className="h-full flex flex-col p-4 gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">MediParts GmbH</div>
          <div className="text-[11px] text-white/30">ISO 13485 Report</div>
        </div>
        <CircleScore score={91} size={56} />
      </div>
      <div className="space-y-2">
        {scores.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
            className="flex items-center gap-2">
            <span className="text-xs text-white/60 flex-1">{p.name}</span>
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.score}%` }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full rounded-full bg-primary" />
            </div>
            <span className="text-xs font-bold w-8 text-right text-primary">{p.score}%</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <Pill active>0 Major</Pill>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500/20 text-amber-400">1 Minor</span>
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
    <div className="w-full aspect-[3/4] rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col bg-[#0d0d0d]">
      <div className="flex items-center justify-center gap-3 py-2 border-b border-white/5">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full transition-colors ${i === currentScreen ? 'bg-primary' : 'bg-white/10'}`} />
            <span className={`text-[10px] font-medium ${i === currentScreen ? 'text-primary' : 'text-white/25'}`}>{label}</span>
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

      <div className="py-2 text-center border-t border-white/5">
        <span className="text-[10px] text-white/20">Discover → Match → Audit → Intelligence. All in 3 days.</span>
      </div>
    </div>
  );
};

export default MobilePlatformDemo;
