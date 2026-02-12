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
    { name: "MediParts GmbH", location: "Munich, Germany", certs: "ISO 13485:2016, ISO 9001:2015" },
    { name: "BioTech Precision SA", location: "Geneva, Switzerland", certs: "ISO 13485:2016, FDA Registered" },
    { name: "MedTech Components Inc", location: "Boston, USA", certs: "ISO 13485:2016, FDA Registered" },
    { name: "SurgiPrecision Ltd", location: "Dublin, Ireland", certs: "ISO 13485:2016, CE Mark" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-3 bg-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm font-semibold text-primary-foreground">SearchPro+</span>
        </div>
        <span className="text-xs text-primary-foreground/60">AI-Powered</span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-2.5 overflow-hidden">
        {/* YVOO question */}
        {phase >= 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-primary-foreground">AI</span>
            </div>
            <div className="bg-muted/40 border border-border/30 px-3 py-2 text-xs text-foreground max-w-[80%]">
              What type of product or service are you looking for?
            </div>
          </motion.div>
        )}

        {/* User reply 1 */}
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="bg-primary/10 border border-primary/20 px-3 py-2 text-xs text-foreground max-w-[75%]">
              Implantable medical device components
            </div>
          </motion.div>
        )}

        {/* YVOO follow-up */}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-primary-foreground">AI</span>
            </div>
            <div className="bg-muted/40 border border-border/30 px-3 py-2 text-xs text-foreground max-w-[80%]">
              What certifications and materials do you require?
            </div>
          </motion.div>
        )}

        {/* User reply 2 */}
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="bg-primary/10 border border-primary/20 px-3 py-2 text-xs text-foreground max-w-[75%]">
              ISO 13485, FDA registered, titanium and medical-grade steel
            </div>
          </motion.div>
        )}

        {/* AI searching */}
        {phase >= 4 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-primary-foreground">AI</span>
            </div>
            <div className="bg-muted/40 border border-border/30 px-3 py-2 text-xs text-foreground max-w-[85%]">
              Searching: Implantable components + ISO 13485 + FDA + Titanium/Steel expertise
            </div>
          </motion.div>
        )}

        {/* Results */}
        {phase >= 5 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 mt-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span className="text-xs font-semibold text-foreground">4 Matching Suppliers Found</span>
            </div>
            {suppliers.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`px-3 py-2 border text-[11px] flex items-center justify-between ${
                  i === 0 ? 'border-primary/30 bg-primary/5' : 'border-border/30 bg-white'
                }`}
              >
                <div>
                  <span className="font-semibold text-foreground">{s.name}</span>
                  <span className="text-muted-foreground ml-1.5">({s.location})</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{s.certs}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Click indicator */}
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto text-center"
          >
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Step 1 of 4 · Discover</span>
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
    { name: "Dr. Klaus Schmidt", match: 94, cert: "ISO 13485 Certified · Munich-based · 15 yrs", img: auditorGen2 },
    { name: "Dr. Anna Weber", match: 91, cert: "ISO 13485 Certified · Frankfurt · 12 yrs", img: auditorGen3 },
    { name: "Thomas Richter", match: 88, cert: "ISO 13485 Certified · Stuttgart · 9 yrs", img: auditorGen4 },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-3 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground">Auditor Matching</span>
        </div>
        <span className="text-xs text-muted-foreground">ScanPro+ Platform</span>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Search query */}
        <div className="bg-muted/30 border border-border/40 p-3">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Verification Request</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase >= 0 ? 1 : 0 }}
            className="text-sm font-medium text-foreground">
            Verify MediParts GmbH, Munich, ISO 13485
          </motion.div>
        </div>

        {/* AI Processing */}
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-primary">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: phase < 2 ? Infinity : 0, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
            {phase < 2 ? "Matching auditors…" : "3 auditors matched"}
          </motion.div>
        )}

        {/* Results */}
        {phase >= 2 && (
          <div className="space-y-2">
            {auditors.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`flex items-center gap-3 p-3 border ${
                  i === 0 ? 'border-primary/30 bg-primary/5' : 'border-border/30'
                }`}
              >
                <img src={a.img} alt={a.name} className="w-10 h-10 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground truncate">{a.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 ${
                      i === 0 ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted'
                    }`}>{a.match}%</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">{a.cert}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Confirmed */}
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-3 bg-accent/10 border border-accent/30">
            <svg className="w-5 h-5 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-sm font-semibold text-foreground">Auditor confirmed: On-site Dec 22</span>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto text-center">
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Step 2 of 4 · Match</span>
          </motion.div>
        )}
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
    { label: "Sterile environment validated" },
    { label: "Quality management system active" },
    { label: "Traceability documentation complete" },
    { label: "Personnel qualified" },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-3 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-sm font-semibold text-foreground">Live Audit</span>
          <span className="text-xs text-muted-foreground">· MediParts GmbH</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={auditorGen2} alt="Dr. Klaus Schmidt" className="w-6 h-6 object-cover rounded-full" />
          <span className="text-xs text-muted-foreground">Dr. Schmidt · ISO 13485</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left: Factory photo with CV overlay */}
        <div className="w-1/2 relative overflow-hidden">
          <img src={equipmentImage} alt="Cleanroom" className="w-full h-full object-cover" />

          {/* Camera flash effect */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white"
              />
            )}
          </AnimatePresence>

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
                <span className="text-xs font-semibold text-primary">Clean Room Class 7</span>
              </div>
              <span className="text-[10px] text-primary/80 mt-1 block">Computer Vision Detected</span>
            </div>
          </motion.div>

          <div className="absolute bottom-3 left-3">
            <div className="px-2 py-1 bg-foreground/70 text-background text-[10px] font-medium">Control Panel</div>
          </div>
        </div>

        {/* Right: ISO 13485 Checklist */}
        <div className="w-1/2 flex flex-col border-l border-border/30">
          <div className="px-4 py-3 border-b border-border/20">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wider">ISO 13485 Checklist</div>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {checklistItems.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0.4 }} animate={{ opacity: i < checkedItems ? 1 : 0.4 }}
                className="flex items-center gap-3">
                <div className={`w-5 h-5 flex items-center justify-center transition-colors duration-300 ${
                  i < checkedItems ? 'bg-accent' : 'border-2 border-border/40'
                }`}>
                  {i < checkedItems && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </motion.svg>
                  )}
                </div>
                <span className={`text-sm ${i < checkedItems ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Evidence capture indicator */}
          {checkedItems >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-2 border-t border-border/20 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] text-primary font-medium">Evidence photos capturing…</span>
            </motion.div>
          )}

          <div className="px-4 py-3 bg-muted/20 border-t border-border/20">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Step 3 of 4 · Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN 4: INTELLIGENCE ─────────────────────────────────────
const IntelligenceScreen = () => {
  const [showElements, setShowElements] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(1), 400),
      setTimeout(() => setShowElements(2), 1200),
      setTimeout(() => setShowElements(3), 2200),
      setTimeout(() => setShowElements(4), 3200),
      setTimeout(() => setShowElements(5), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const processScores = [
    { name: "Quality Management", score: 93 },
    { name: "Equipment & Facilities", score: 89 },
    { name: "Documentation", score: 94 },
    { name: "Personnel", score: 91 },
    { name: "Process Control", score: 88 },
  ];

  const certs = [
    { name: "ISO 13485:2016", valid: true },
    { name: "FDA Registered", valid: true },
    { name: "CE Mark", valid: true },
  ];

  const evidenceImages = [evidenceCNC, evidenceCMM, evidenceControlPlan, evidenceAssembly, evidenceCertification, evidenceInspector, equipmentImage, auditorGen2];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-3 border-b border-border/30 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">MediParts GmbH, Munich, Germany</div>
          <div className="text-xs text-muted-foreground">ISO 13485 Audit Report</div>
        </div>
        <div className="flex items-center gap-2">
          <img src={auditorGen2} alt="Dr. Schmidt" className="w-6 h-6 object-cover rounded-full" />
          <span className="text-xs text-muted-foreground">Dr. Schmidt</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left: Scores */}
        <div className="w-3/5 p-5 flex flex-col gap-3 overflow-hidden">
          {showElements >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-1">
              <div className="text-4xl font-bold text-primary">91.3%</div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                <span className="text-sm text-accent-foreground font-medium">↗ trending up</span>
              </div>
            </motion.div>
          )}

          {showElements >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Process Element Scores</div>
              {processScores.map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }} className="flex items-center gap-2">
                  <span className="text-xs text-foreground flex-1 truncate">{p.name}</span>
                  <div className="w-24 h-1.5 bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.score}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className={`h-full ${p.score >= 92 ? 'bg-accent' : p.score >= 89 ? 'bg-primary' : 'bg-amber-500'}`} />
                  </div>
                  <span className={`text-xs font-bold w-8 text-right ${
                    p.score >= 92 ? 'text-accent-foreground' : p.score >= 89 ? 'text-primary' : 'text-amber-600'
                  }`}>{p.score}%</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certifications verified */}
          {showElements >= 3 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Certifications Verified</div>
              <div className="flex flex-wrap gap-2">
                {certs.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5 px-2 py-1 bg-accent/10 border border-accent/20">
                    <svg className="w-3 h-3 text-accent-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="text-[10px] font-medium text-foreground">{c.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showElements >= 4 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-auto">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Non-Conformances</div>
              <div className="flex gap-3">
                <div className="px-3 py-1.5 bg-accent/10 text-accent-foreground text-xs font-semibold">0 Major</div>
                <div className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold">1 Minor</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Evidence + Auditor */}
        <div className="w-2/5 border-l border-border/30 flex flex-col">
          {showElements >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 flex-1">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Evidence Gallery</div>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-4 border-t border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={auditorGen2} alt="Dr. Schmidt" className="w-10 h-10 object-cover" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Dr. Klaus Schmidt</div>
                    <div className="text-[11px] text-muted-foreground">ISO 13485 Certified</div>
                  </div>
                </div>
                <div className="text-[10px] text-primary font-semibold">Report: 24h</div>
              </div>
            </motion.div>
          )}

          <div className="px-4 py-3 bg-muted/20 border-t border-border/20">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Step 4 of 4 · Intelligence</span>
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
