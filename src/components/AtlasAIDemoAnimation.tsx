import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCREEN_BG = "bg-[hsl(0,0%,85%)]";

/* Solid dark cards — matching PlatformDemoAnimation design system */
const C = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
  const bg = layer === 1
    ? 'bg-[hsl(0,0%,45%)] border-[hsl(0,0%,40%)]'
    : layer === 2
    ? 'bg-[hsl(0,0%,38%)] border-[hsl(0,0%,33%)]'
    : 'bg-[hsl(0,0%,32%)] border-[hsl(0,0%,28%)]';
  return (
    <div className={`border ${highlight ? 'border-primary/30 bg-[hsl(0,0%,42%)]' : bg} ${className}`}>
      {children}
    </div>
  );
};

const Bar = ({ value, color = "bg-primary", delay = 0 }: { value: number; color?: string; delay?: number }) => (
  <div className="h-1 w-full bg-background/10 overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, delay }} className={`h-full ${color}`} />
  </div>
);

const Check = ({ done = false }: { done?: boolean }) => (
  <div className={`w-2 h-2 border flex items-center justify-center shrink-0 ${done ? 'bg-[#3DC88E] border-[#3DC88E]' : 'border-background/30'}`}>
    {done && <svg className="w-1.5 h-1.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>}
  </div>
);

/* ── LEFT PANEL: Standards Checklist ── */
const LeftPanel = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(45), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-full flex flex-col p-2 gap-1.5 overflow-hidden">
      <C layer={2} className="p-1.5">
        <span className="text-[7px] font-bold text-background uppercase tracking-wider">Audit Checklist</span>
        <div className="text-[6px] text-background/50 mt-0.5">Supplier: Precision Parts</div>
        <div className="text-[6px] text-background/50">Standard: IATF 16949</div>
        <div className="mt-1"><Bar value={progress} /></div>
        <div className="text-[6px] text-background/40 mt-0.5">Progress: 45%</div>
      </C>

      <div className="flex-1 overflow-hidden space-y-0.5 text-[6px]">
        {/* Section 4 */}
        <div className="text-[7px] font-bold text-foreground/60 mt-1">▼ 4. QUALITY MGMT</div>
        <div className="pl-2 space-y-0.5">
          <div className="text-foreground/40">4.1 General Req.</div>
          <div className="pl-2 flex items-center gap-1"><Check done /> <span className="text-foreground/50">4.1.1 Process</span></div>
          <div className="pl-4 text-[5px] text-[#3DC88E]">Completed</div>

          <div className="text-foreground/50 font-semibold">▼ 4.2 Documentation</div>
          <div className="pl-2 space-y-0.5">
            <div className="flex items-center gap-1"><Check done /> <span className="text-foreground/50">4.2.1 General</span></div>
            <div className="flex items-center gap-1"><Check done /> <span className="text-foreground/50">4.2.2 Manual</span></div>

            {/* Active item */}
            <C highlight className="p-1 -ml-1">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                <span className="text-[6px] font-bold text-background">4.2.3 Control</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 pl-2.5">
                <span className="text-[5px] text-primary">In Progress</span>
                <span className="text-[5px] px-0.5 bg-[#E04545] text-white font-bold">HIGH</span>
              </div>
            </C>

            <div className="flex items-center gap-1 text-foreground/30"><div className="w-2 h-2 border border-foreground/20" /> <span>4.2.4 Records</span></div>
            <div className="pl-4 text-[5px] text-foreground/25">Not Started</div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="text-[7px] font-bold text-foreground/60 mt-1">▼ 5. MANAGEMENT</div>
        <div className="pl-2 flex items-center gap-1 text-foreground/30">
          <div className="w-2 h-2 border border-foreground/20" /> <span>5.1 Commitment</span>
        </div>
      </div>
    </div>
  );
};

/* ── MIDDLE PANEL: AI Guidance & Documentation ── */
const MiddlePanel = () => {
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const timers = [300, 800, 1500, 2200, 3000, 3800, 4500].map((d, i) =>
      setTimeout(() => setVisibleSections(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col p-2.5 gap-1.5 overflow-y-auto overflow-x-hidden">
      {/* Title */}
      <div>
        <span className="text-[9px] font-bold text-foreground/80">4.2.3 Control of Documents</span>
        <div className="text-[5px] text-foreground/40 mt-0.5">IATF 16949:2016 Clause 4.2.3 · ISO 9001:2015 7.5.3</div>
      </div>

      {/* AI Context */}
      {visibleSections >= 1 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C highlight className="p-1.5">
            <span className="text-[6px] font-bold text-primary uppercase tracking-wider">AI Context</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[5px] px-0.5 bg-[#E04545] text-white font-bold">HIGH PRIORITY</span>
              <span className="text-[5px] text-background/50">for this client</span>
            </div>
            <p className="text-[5.5px] text-background/60 mt-0.5 leading-relaxed">
              BMW Tier-2 has rejected 2 previous suppliers for document control gaps. Based on 47 similar automotive audits, issues appear in 73% of cases.
            </p>
            <div className="mt-1 space-y-0.5">
              {["Revision control (82%)", "Obsolete document control (68%)", "Approval signatures (54%)"].map(t => (
                <div key={t} className="flex items-center gap-1">
                  <div className="w-0.5 h-0.5 bg-primary" />
                  <span className="text-[5px] text-background/50">{t}</span>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {/* Standard Requirement */}
      {visibleSections >= 2 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={1} className="p-1.5">
            <span className="text-[6px] font-semibold text-background/70 uppercase tracking-wider">Standard Requirement</span>
            <p className="text-[5px] text-background/50 mt-0.5 leading-relaxed">
              Documents required by the QMS shall be controlled. Approve documents before issue, review and re-approve, ensure changes identified, ensure relevant versions available.
            </p>
          </C>
        </motion.div>
      )}

      {/* What to Check */}
      {visibleSections >= 3 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={1} className="p-1.5">
            <span className="text-[6px] font-semibold text-background/70 uppercase tracking-wider">What to Check</span>
            <div className="mt-1 space-y-1">
              {[
                { q: "Documented procedure for document control?", hint: 'Ask to see: "Document Control Procedure"' },
                { q: "How are documents approved before release?", hint: "Check: Approval signatures on samples" },
                { q: "How is revision history tracked?", hint: "Ask to see: Document register/master list" },
                { q: "How are obsolete documents controlled?", hint: "Critical: Old versions removed or marked?" },
              ].map((item, i) => (
                <div key={i} className="space-y-0">
                  <div className="flex items-start gap-1">
                    <span className="text-[5px] text-primary font-bold shrink-0">{i + 1}.</span>
                    <span className="text-[5px] text-background/60">{item.q}</span>
                  </div>
                  <div className="pl-2 text-[4.5px] text-background/40">→ {item.hint}</div>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {/* Best Practices */}
      {visibleSections >= 4 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={2} className="p-1.5">
            <span className="text-[6px] font-semibold text-background/70 uppercase tracking-wider">Best Practices</span>
            <div className="mt-0.5 space-y-0.5">
              {[
                "Master list: title, revision #, date, approval",
                'Stamp "CONTROLLED COPY" with copy numbers',
                "Use PDM/PLM with access controls",
                'Mark obsolete as "DO NOT USE"',
              ].map(t => (
                <div key={t} className="flex items-start gap-1">
                  <div className="w-0.5 h-0.5 bg-[#3DC88E] mt-[2px] shrink-0" />
                  <span className="text-[5px] text-background/50">{t}</span>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {/* Common Issues */}
      {visibleSections >= 5 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={1} className="p-1.5">
            <span className="text-[6px] font-semibold text-[#F5A623] uppercase tracking-wider">Common Issues (47 Audits)</span>
            <div className="mt-0.5 space-y-0.5">
              {[
                { issue: "Register exists but not used (73%)", verify: "Check 3-4 recent revisions" },
                { issue: "Obsolete docs on shared drives (68%)", verify: "Check archived folders" },
                { issue: "No approval signatures (54%)", verify: "Review 5 sample documents" },
              ].map((item, i) => (
                <div key={i}>
                  <span className="text-[5px] text-background/60">{item.issue}</span>
                  <div className="text-[4.5px] text-background/40 pl-1">→ {item.verify}</div>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {/* Evidence to Collect */}
      {visibleSections >= 6 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={2} className="p-1.5">
            <span className="text-[6px] font-semibold text-background/70 uppercase tracking-wider">Evidence to Collect</span>
            <div className="mt-0.5 grid grid-cols-2 gap-x-2 gap-y-0.5">
              {["Document control procedure", "Document register", "Approved document sample", "Obsolete doc control", "Approval authority matrix"].map(t => (
                <div key={t} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 border border-background/20 shrink-0" />
                  <span className="text-[4.5px] text-background/50">{t}</span>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {/* Assessment bar */}
      {visibleSections >= 7 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C highlight className="p-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[6px] font-semibold text-background/70 uppercase tracking-wider">Assessment</span>
              <div className="flex gap-1">
                {["Compliant", "Minor NC", "Major NC", "Observation"].map(s => (
                  <span key={s} className={`text-[4.5px] px-1 py-0.5 border ${s === "Minor NC" ? 'border-[#F5A623] text-[#F5A623]' : 'border-background/20 text-background/40'}`}>{s}</span>
                ))}
              </div>
            </div>
            <div className="mt-1 p-1 bg-background/5 border border-background/10">
              <span className="text-[5px] text-primary font-semibold">AI Suggested:</span>
              <p className="text-[4.5px] text-background/50 mt-0.5 leading-relaxed">
                "Document control register is not current. Last 4 revisions not reflected in master list."
              </p>
            </div>
          </C>
        </motion.div>
      )}
    </div>
  );
};

/* ── RIGHT PANEL: Intelligence Insights ── */
const RightPanel = () => {
  return (
    <div className="h-full flex flex-col p-2 gap-1.5 overflow-hidden">
      <span className="text-[7px] font-bold text-foreground/60 uppercase tracking-wider">Intelligence Insights</span>

      {/* Priority */}
      <C highlight className="p-1.5">
        <span className="text-[6px] font-bold text-[#E04545] uppercase">Priority</span>
        <div className="mt-0.5 text-[5px] text-background/60">
          <div className="font-semibold text-background/70">Pattern detected</div>
          <div>Doc issues correlate:</div>
          <div className="pl-1">• Calibration (78%)</div>
          <div className="pl-1">• Training (62%)</div>
          <div className="text-primary mt-0.5">→ Check proactively</div>
        </div>
      </C>

      {/* Client Focus */}
      <C layer={1} className="p-1.5">
        <span className="text-[6px] font-bold text-background/70 uppercase">Client Focus</span>
        <div className="text-[5px] text-background/50 mt-0.5 space-y-0.5">
          <div className="flex items-center gap-1"><span className="text-[5px] px-0.5 bg-[#E04545] text-white font-bold">1</span> Documentation — 67% rejection</div>
          <div className="flex items-center gap-1"><span className="text-[5px] px-0.5 bg-[#E04545] text-white font-bold">2</span> Calibration — Required</div>
          <div className="flex items-center gap-1"><span className="text-[5px] px-0.5 bg-[#F5A623] text-white font-bold">3</span> Process Cap.</div>
        </div>
      </C>

      {/* Photo evidence */}
      <C layer={2} className="p-1.5">
        <span className="text-[6px] font-bold text-background/70 uppercase">Photo</span>
        <div className="text-[5px] text-background/40 mt-0.5">Doc Control Board · 2 min ago</div>
        <div className="mt-0.5 space-y-0.5 text-[5px]">
          <div className="text-[#3DC88E]">✓ Register visible</div>
          <div className="text-[#3DC88E]">✓ Procedure posted</div>
          <div className="text-[#F5A623]">⚠ Signatures unclear</div>
          <div className="text-[#F5A623]">⚠ Date not visible</div>
          <div className="text-primary mt-0.5">→ Take closer shot</div>
        </div>
      </C>

      {/* Progress */}
      <C layer={1} className="p-1.5">
        <span className="text-[6px] font-bold text-background/70 uppercase">Progress</span>
        <div className="mt-0.5"><Bar value={45} delay={0.5} /></div>
        <div className="text-[5px] text-background/40 mt-0.5">2h 15m elapsed · 2h 45m remaining</div>
        <div className="mt-1 space-y-0.5 text-[5px] text-background/50">
          <div>• Major NC: <span className="text-[#E04545] font-bold">1</span></div>
          <div>• Minor NC: <span className="text-[#F5A623] font-bold">3</span></div>
          <div>• Observations: <span className="text-background/70 font-bold">2</span></div>
        </div>
      </C>

      {/* AI Tips */}
      <C highlight className="p-1.5">
        <span className="text-[6px] font-bold text-primary uppercase">AI Tips</span>
        <div className="mt-0.5 space-y-0.5 text-[5px] text-background/50">
          <div>1. Check calibration — 78%</div>
          <div>2. Verify training — 62%</div>
        </div>
      </C>

      {/* Benchmark */}
      <C layer={2} className="p-1.5 mt-auto">
        <span className="text-[6px] font-bold text-background/70 uppercase">Benchmark</span>
        <div className="mt-0.5 space-y-0.5">
          <div className="flex justify-between text-[5px]"><span className="text-background/50">This</span><span className="text-background/70 font-bold">7.2/10</span></div>
          <Bar value={72} delay={0.3} />
          <div className="flex justify-between text-[5px]"><span className="text-background/50">Industry</span><span className="text-background/70 font-bold">8.1/10</span></div>
          <Bar value={81} color="bg-background/30" delay={0.5} />
        </div>
        <div className="text-[5px] text-[#3DC88E] font-semibold mt-1">Likely: Approved with conditions</div>
      </C>
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const AtlasAIDemoAnimation = () => {
  return (
    <div className={`w-full h-full flex flex-col ${SCREEN_BG} overflow-hidden`}>
      {/* Top bar — 3 panel labels */}
      <div className="flex items-center px-3 py-1.5 border-b border-muted-foreground/10">
        <div className="flex-[22] text-center">
          <span className="text-[7px] font-medium text-foreground/50 uppercase tracking-wider">Standards Checklist</span>
        </div>
        <div className="w-px h-3 bg-muted-foreground/10" />
        <div className="flex-[50] text-center">
          <span className="text-[7px] font-medium text-primary uppercase tracking-wider">AI Guidance & Documentation</span>
        </div>
        <div className="w-px h-3 bg-muted-foreground/10" />
        <div className="flex-[28] text-center">
          <span className="text-[7px] font-medium text-foreground/50 uppercase tracking-wider">Intelligence Insights</span>
        </div>
      </div>

      {/* Three panels */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-[22] border-r border-muted-foreground/10 overflow-hidden">
          <LeftPanel />
        </div>
        <div className="flex-[50] border-r border-muted-foreground/10 overflow-hidden">
          <MiddlePanel />
        </div>
        <div className="flex-[28] overflow-hidden">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default AtlasAIDemoAnimation;
