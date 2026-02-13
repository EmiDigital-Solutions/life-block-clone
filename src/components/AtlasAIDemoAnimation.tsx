import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SCREEN_BG = "bg-[hsl(0,0%,85%)]";

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
  <div className="h-1.5 w-full bg-background/10 overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, delay }} className={`h-full ${color}`} />
  </div>
);

const Check = ({ done = false }: { done?: boolean }) => (
  <div className={`w-3 h-3 border flex items-center justify-center shrink-0 ${done ? 'bg-[#3DC88E] border-[#3DC88E]' : 'border-background/30'}`}>
    {done && <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>}
  </div>
);

/* ── LEFT PANEL ── */
const LeftPanel = () => (
  <div className="h-full flex flex-col p-3 gap-2 overflow-hidden">
    <C layer={2} className="p-2">
      <span className="text-[10px] font-bold text-background uppercase tracking-wider">Audit Checklist</span>
      <div className="text-[8px] text-background/50 mt-1">IATF 16949 · Precision Parts</div>
      <div className="mt-1.5"><Bar value={45} /></div>
      <div className="text-[8px] text-background/40 mt-1">Progress: 45%</div>
    </C>

    <div className="flex-1 overflow-hidden space-y-1">
      <div className="text-[9px] font-bold text-foreground/60">▼ 4. QUALITY MGMT</div>
      <div className="pl-3 space-y-1">
        <div className="flex items-center gap-1.5"><Check done /> <span className="text-[8px] text-foreground/50">4.1.1 Process</span></div>
        <div className="text-[9px] text-foreground/50 font-semibold">▼ 4.2 Documentation</div>
        <div className="pl-3 space-y-1">
          <div className="flex items-center gap-1.5"><Check done /> <span className="text-[8px] text-foreground/50">4.2.1 General</span></div>
          <div className="flex items-center gap-1.5"><Check done /> <span className="text-[8px] text-foreground/50">4.2.2 Manual</span></div>
          <C highlight className="p-1.5 -ml-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-background">4.2.3 Control</span>
              <span className="text-[7px] px-1 bg-[#E04545] text-white font-bold ml-auto">HIGH</span>
            </div>
          </C>
          <div className="flex items-center gap-1.5 text-foreground/30"><div className="w-3 h-3 border border-foreground/20" /> <span className="text-[8px]">4.2.4 Records</span></div>
        </div>
      </div>
      <div className="text-[9px] font-bold text-foreground/60 mt-2">▼ 5. MANAGEMENT</div>
      <div className="pl-3 flex items-center gap-1.5 text-foreground/30">
        <div className="w-3 h-3 border border-foreground/20" /> <span className="text-[8px]">5.1 Commitment</span>
      </div>
    </div>
  </div>
);

/* ── MIDDLE PANEL ── */
const MiddlePanel = () => {
  const [vis, setVis] = useState(0);
  useEffect(() => {
    const t = [300, 900, 1800, 2800].map((d, i) => setTimeout(() => setVis(i + 1), d));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col p-3 gap-2 overflow-y-auto overflow-x-hidden">
      <div>
        <span className="text-[12px] font-bold text-foreground/80">4.2.3 Control of Documents</span>
        <div className="text-[8px] text-foreground/40 mt-0.5">IATF 16949:2016 · ISO 9001:2015 7.5.3</div>
      </div>

      {vis >= 1 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C highlight className="p-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-bold text-primary uppercase tracking-wider">AI Context</span>
              <span className="text-[7px] px-1 bg-[#E04545] text-white font-bold">HIGH PRIORITY</span>
            </div>
            <p className="text-[8px] text-background/60 mt-1 leading-relaxed">
              BMW Tier-2 rejected 2 suppliers for document control gaps. Issues appear in 73% of 47 similar audits.
            </p>
          </C>
        </motion.div>
      )}

      {vis >= 2 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={1} className="p-2">
            <span className="text-[8px] font-semibold text-background/70 uppercase tracking-wider">What to Check</span>
            <div className="mt-1.5 space-y-1.5">
              {[
                "Document control procedure exists?",
                "Approval signatures on documents?",
                "Revision history tracked?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[8px] text-primary font-bold shrink-0">{i + 1}.</span>
                  <span className="text-[8px] text-background/60">{q}</span>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {vis >= 3 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C layer={2} className="p-2">
            <span className="text-[8px] font-semibold text-[#F5A623] uppercase tracking-wider">Common Issues</span>
            <div className="mt-1 space-y-1">
              {[
                "Register not used (73%)",
                "Obsolete docs accessible (68%)",
                "Missing signatures (54%)",
              ].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-[#F5A623]" />
                  <span className="text-[8px] text-background/50">{t}</span>
                </div>
              ))}
            </div>
          </C>
        </motion.div>
      )}

      {vis >= 4 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          <C highlight className="p-2">
            <span className="text-[8px] font-semibold text-primary uppercase tracking-wider">AI Assessment</span>
            <p className="text-[8px] text-background/50 mt-1 leading-relaxed">
              "Document register not current. Last 4 revisions missing from master list."
            </p>
          </C>
        </motion.div>
      )}
    </div>
  );
};

/* ── RIGHT PANEL ── */
const RightPanel = () => (
  <div className="h-full flex flex-col p-3 gap-2 overflow-hidden">
    <span className="text-[9px] font-bold text-foreground/60 uppercase tracking-wider">Intelligence</span>

    <C highlight className="p-2">
      <span className="text-[8px] font-bold text-[#E04545] uppercase">Priority</span>
      <div className="mt-1 text-[8px] text-background/60 space-y-0.5">
        <div>• Calibration (78%)</div>
        <div>• Training (62%)</div>
        <div className="text-primary mt-1">→ Check proactively</div>
      </div>
    </C>

    <C layer={1} className="p-2">
      <span className="text-[8px] font-bold text-background/70 uppercase">Client Focus</span>
      <div className="mt-1 space-y-1 text-[8px] text-background/50">
        <div><span className="px-1 bg-[#E04545] text-white font-bold text-[7px]">1</span> Documentation</div>
        <div><span className="px-1 bg-[#E04545] text-white font-bold text-[7px]">2</span> Calibration</div>
        <div><span className="px-1 bg-[#F5A623] text-white font-bold text-[7px]">3</span> Process Cap.</div>
      </div>
    </C>

    <C layer={1} className="p-2">
      <span className="text-[8px] font-bold text-background/70 uppercase">Progress</span>
      <div className="mt-1"><Bar value={45} delay={0.5} /></div>
      <div className="mt-1 space-y-0.5 text-[8px] text-background/50">
        <div>Major NC: <span className="text-[#E04545] font-bold">1</span></div>
        <div>Minor NC: <span className="text-[#F5A623] font-bold">3</span></div>
      </div>
    </C>

    <C layer={2} className="p-2 mt-auto">
      <span className="text-[8px] font-bold text-background/70 uppercase">Benchmark</span>
      <div className="mt-1 space-y-1">
        <div className="flex justify-between text-[8px]"><span className="text-background/50">This</span><span className="text-background/70 font-bold">7.2/10</span></div>
        <Bar value={72} delay={0.3} />
        <div className="flex justify-between text-[8px]"><span className="text-background/50">Industry</span><span className="text-background/70 font-bold">8.1/10</span></div>
        <Bar value={81} color="bg-background/30" delay={0.5} />
      </div>
      <div className="text-[8px] text-[#3DC88E] font-semibold mt-1.5">Approved with conditions</div>
    </C>
  </div>
);

/* ── MAIN ── */
const AtlasAIDemoAnimation = () => (
  <div className={`w-full h-full flex flex-col ${SCREEN_BG} overflow-hidden`}>
    <div className="flex items-center px-4 py-2 border-b border-muted-foreground/10">
      <div className="flex-[22] text-center">
        <span className="text-[9px] font-medium text-foreground/50 uppercase tracking-wider">Checklist</span>
      </div>
      <div className="w-px h-3 bg-muted-foreground/10" />
      <div className="flex-[50] text-center">
        <span className="text-[9px] font-medium text-primary uppercase tracking-wider">AI Guidance</span>
      </div>
      <div className="w-px h-3 bg-muted-foreground/10" />
      <div className="flex-[28] text-center">
        <span className="text-[9px] font-medium text-foreground/50 uppercase tracking-wider">Intelligence</span>
      </div>
    </div>
    <div className="flex-1 flex overflow-hidden min-h-0">
      <div className="flex-[22] border-r border-muted-foreground/10 overflow-hidden"><LeftPanel /></div>
      <div className="flex-[50] border-r border-muted-foreground/10 overflow-hidden"><MiddlePanel /></div>
      <div className="flex-[28] overflow-hidden"><RightPanel /></div>
    </div>
  </div>
);

export default AtlasAIDemoAnimation;
