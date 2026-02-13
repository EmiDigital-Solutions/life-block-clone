import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCREEN_DURATION = 5000;
const SCREEN_BG = "bg-[hsl(0,0%,85%)]";

/* Solid dark cards — matching PlatformDemoAnimation */
const Card = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
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

/* ── Progress bar ── */
const ProgressBar = ({ value, color = "bg-primary", delay = 0 }: { value: number; color?: string; delay?: number }) => (
  <div className="h-1 w-full bg-background/10 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1.2, delay }}
      className={`h-full ${color}`}
    />
  </div>
);

/* ── SCREEN 1: Checklist Panel ── */
const ChecklistScreen = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const items = [
    { section: "4. QUALITY MGMT", items: ["4.1 General Req.", "4.1.1 Process", "4.2 Documentation"] },
    { section: "5. MANAGEMENT", items: ["5.1 Commitment", "5.2 Policy"] }
  ];

  useEffect(() => {
    const timers = [600, 1200, 2000, 2800, 3600].map((d, i) =>
      setTimeout(() => setCheckedItems(prev => [...prev, i]), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  let itemIndex = 0;

  return (
    <div className="w-full h-full flex">
      {/* Left sidebar - Checklist */}
      <div className="w-[35%] p-3 flex flex-col gap-2 border-r border-muted-foreground/10">
        <Card layer={2} className="p-2 mb-1">
          <span className="text-[9px] font-bold text-background uppercase tracking-wider">Audit Checklist</span>
          <div className="mt-1"><ProgressBar value={60} /></div>
          <span className="text-[8px] text-background/50 mt-0.5 block">IATF 16949 · 60%</span>
        </Card>
        {items.map((group) => (
          <div key={group.section} className="space-y-0.5">
            <span className="text-[8px] font-semibold text-foreground/60 uppercase tracking-wider">{group.section}</span>
            {group.items.map((item) => {
              const idx = itemIndex++;
              const checked = checkedItems.includes(idx);
              return (
                <motion.div
                  key={item}
                  className="flex items-center gap-1.5 py-0.5"
                  animate={checked ? { x: [0, 2, 0] } : {}}
                >
                  <div className={`w-2.5 h-2.5 border flex items-center justify-center transition-colors ${
                    checked ? 'bg-primary border-primary' : 'border-foreground/20 bg-transparent'
                  }`}>
                    {checked && (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M2 6l3 3 5-5" />
                      </motion.svg>
                    )}
                  </div>
                  <span className={`text-[8px] ${checked ? 'text-foreground/80 line-through' : 'text-foreground/50'}`}>{item}</span>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right - AI Context */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1.5 h-1.5 bg-primary" />
          <span className="text-[10px] font-bold text-foreground/80">4.2.3 Control of Documents</span>
        </div>

        <Card highlight className="p-2">
          <span className="text-[8px] font-bold text-primary uppercase tracking-wider">AI Context</span>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[8px] text-background/70 mt-1 leading-relaxed"
          >
            BMW Tier-2 has rejected 2 previous suppliers for document control gaps. Focus on revision control and obsolete document handling.
          </motion.p>
        </Card>

        <Card layer={1} className="p-2">
          <span className="text-[8px] font-semibold text-background/80">Standard Requirement</span>
          <p className="text-[7px] text-background/50 mt-0.5 leading-relaxed">
            Documents required by the QMS shall be controlled. Approve, review, update, and re-approve documents.
          </p>
        </Card>

        <Card layer={1} className="p-2">
          <span className="text-[8px] font-semibold text-background/80">What to Check</span>
          <div className="space-y-0.5 mt-1">
            {["Document Control Procedure", "Approval signatures on samples", "Revision history tracking"].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 + i * 0.3 }} className="flex items-center gap-1">
                <div className="w-1 h-1 bg-primary/60" />
                <span className="text-[7px] text-background/60">{item}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ── SCREEN 2: AI Copilot Conversation ── */
const CopilotScreen = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [400, 1200, 2200, 3200, 4000].map((d, i) =>
      setTimeout(() => setStep(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const messages = [
    { role: "ai", text: "I'll guide you through Section 4.2.3. Let's start with document control procedures." },
    { role: "user", text: "Found the procedure manual at reception desk." },
    { role: "ai", text: "Good. Check revision dates — last 3 audits show 68% had outdated versions. Verify current revision number." },
    { role: "user", text: "Revision is from 2022, last update overdue." },
    { role: "ai", text: "⚠️ Generating Minor NC: Document revision overdue. Recommend capturing evidence photo of the revision page." },
  ];

  return (
    <div className="w-full h-full flex flex-col p-3">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-muted-foreground/10">
        <div className="w-5 h-5 bg-primary flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">AI</span>
        </div>
        <span className="text-[10px] font-bold text-foreground/80">Atlas Copilot</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#3DC88E] rounded-full" />
          <span className="text-[8px] text-foreground/50">Voice Active</span>
        </div>
      </div>

      <div className="flex-1 space-y-1.5 overflow-hidden">
        {messages.map((msg, i) => (
          i < step && (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                layer={msg.role === "ai" ? 2 : 1}
                highlight={msg.role === "ai" && i === 4}
                className={`p-2 max-w-[80%] ${msg.role === "user" ? "bg-[hsl(0,0%,50%)] border-[hsl(0,0%,45%)]" : ""}`}
              >
                <p className={`text-[8px] leading-relaxed ${
                  i === 4 ? "text-primary font-semibold" : "text-background/70"
                }`}>{msg.text}</p>
              </Card>
            </motion.div>
          )
        ))}
      </div>

      {/* Input bar */}
      <div className="mt-2 pt-2 border-t border-muted-foreground/10">
        <Card layer={1} className="p-1.5 flex items-center gap-2">
          <div className="w-4 h-4 bg-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-primary" />
          </div>
          <span className="text-[8px] text-background/40">Speak or type your observation...</span>
        </Card>
      </div>
    </div>
  );
};

/* ── SCREEN 3: Intelligence Dashboard ── */
const IntelligenceScreen = () => {
  const findings = [
    { type: "Major NC", label: "Document revision overdue", severity: "bg-[#E04545]" },
    { type: "Minor NC", label: "Calibration cert missing date", severity: "bg-[#F5A623]" },
    { type: "OFI", label: "Digital records recommended", severity: "bg-primary" },
  ];

  return (
    <div className="w-full h-full flex">
      {/* Left: Score + findings */}
      <div className="w-[55%] p-3 flex flex-col gap-2 border-r border-muted-foreground/10">
        <span className="text-[9px] font-bold text-foreground/70 uppercase tracking-wider">Audit Score</span>

        <Card layer={2} className="p-3 flex items-center gap-3">
          {/* Score circle */}
          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 56 56" className="w-full h-full">
              <circle cx="28" cy="28" r="22" fill="none" stroke="hsl(0,0%,30%)" strokeWidth="4" />
              <motion.circle
                cx="28" cy="28" r="22" fill="none" stroke="hsl(199,91%,64%)" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - 0.72)}`}
                strokeLinecap="butt"
                initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - 0.72) }}
                transition={{ duration: 1.5, delay: 0.3 }}
                transform="rotate(-90 28 28)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-background">72%</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-background">Conditional Pass</span>
            <p className="text-[7px] text-background/50 mt-0.5">1 Major · 1 Minor · 1 OFI</p>
          </div>
        </Card>

        <span className="text-[8px] font-semibold text-foreground/60 uppercase tracking-wider mt-1">Findings</span>
        <div className="space-y-1">
          {findings.map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.3 }}>
              <Card layer={1} className="p-1.5 flex items-center gap-2">
                <div className={`w-1.5 h-4 ${f.severity}`} />
                <div>
                  <span className="text-[7px] font-bold text-background/80 uppercase">{f.type}</span>
                  <p className="text-[7px] text-background/50">{f.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Benchmark + CAPA */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        <span className="text-[9px] font-bold text-foreground/70 uppercase tracking-wider">Benchmark</span>

        <Card layer={1} className="p-2 space-y-1.5">
          {[
            { label: "This Supplier", val: 72, color: "bg-primary" },
            { label: "Industry Avg", val: 81, color: "bg-background/30" },
          ].map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between">
                <span className="text-[7px] text-background/60">{b.label}</span>
                <span className="text-[7px] font-bold text-background/80">{b.val}%</span>
              </div>
              <ProgressBar value={b.val} color={b.color} delay={0.5 + i * 0.3} />
            </div>
          ))}
        </Card>

        <span className="text-[8px] font-semibold text-foreground/60 uppercase tracking-wider mt-1">CAPA Status</span>
        <Card highlight className="p-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#F5A623]" />
            <span className="text-[8px] font-bold text-background/80">Action Required</span>
          </div>
          <p className="text-[7px] text-background/50 mt-1">30-day corrective action window. Root cause analysis due in 14 days.</p>
        </Card>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          <Card layer={2} className="p-2 mt-auto">
            <span className="text-[7px] font-semibold text-primary">AI Recommendation</span>
            <p className="text-[7px] text-background/50 mt-0.5">Schedule follow-up audit in 60 days. Focus areas: document control, calibration records.</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const AtlasAIDemoAnimation = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [ChecklistScreen, CopilotScreen, IntelligenceScreen];
  const labels = ["Brain", "Copilot", "Intelligence"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const CurrentScreenComponent = screens[currentScreen];

  return (
    <div className={`w-full h-full flex flex-col ${SCREEN_BG} overflow-hidden`}>
      {/* Top bar — progress steps */}
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

      {/* Screen content */}
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

export default AtlasAIDemoAnimation;
