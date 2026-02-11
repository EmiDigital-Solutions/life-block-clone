import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AILoadingSpinner } from "@/components/AILoadingSpinner";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen7 from "@/assets/auditor-gen-7.jpg";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";

interface DemoStep {
  id: number;
  title: string;
  label: string;
}

const demoSteps: DemoStep[] = [
  { id: 1, title: "AI-Powered Discovery", label: "Discover" },
  { id: 2, title: "Order On-Site Audit", label: "Verify" },
  { id: 3, title: "Auditor Dispatch", label: "Dispatch" },
  { id: 4, title: "Audit Execution", label: "Audit" },
  { id: 5, title: "Ground Truth Report", label: "Intelligence" },
  { id: 6, title: "Supplier Development", label: "Develop" },
];

// --- Simplified mobile step demos ---

const MobileDiscoverStep = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    { role: 'ai' as const, text: "What are you looking for?" },
    { role: 'user' as const, text: "CNC machining, automotive" },
    { role: 'ai' as const, text: "Certifications needed?" },
    { role: 'user' as const, text: "IATF 16949" },
    { role: 'ai' as const, text: "Found 4 matching suppliers ✓" },
  ];

  useEffect(() => {
    if (msgIndex >= messages.length) return;
    const timer = setTimeout(() => setMsgIndex(prev => prev + 1), 1200);
    return () => clearTimeout(timer);
  }, [msgIndex]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#0A7FA5] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-900">AI Search</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6EA996] animate-pulse" />
          <span className="text-[10px] text-[#6EA996]">Online</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        {messages.slice(0, msgIndex).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            <div className={`rounded-xl px-3 py-2 max-w-[75%] ${
              msg.role === 'user' ? 'bg-[#0A7FA5] text-white' : 'bg-gray-100 text-gray-700'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {msgIndex >= messages.length && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mt-2">
            {[
              { name: "DMG MORI AG", loc: "Germany", match: 98 },
              { name: "Precision CNC", loc: "Germany", match: 94 },
              { name: "TechMold Ind.", loc: "China", match: 91 },
            ].map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100">
                <div>
                  <div className="text-sm font-medium text-gray-900">{s.name}</div>
                  <div className="text-[11px] text-gray-500">{s.loc}</div>
                </div>
                <span className="text-sm font-bold text-[#6EA996]">{s.match}%</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const MobileVerifyStep = () => (
  <div className="h-full flex flex-col bg-white">
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="text-sm font-medium text-gray-900">Audit Order #ORD-2025-0847</div>
      <div className="text-[11px] text-gray-500">3 suppliers selected</div>
    </div>
    <div className="flex-1 p-4 space-y-3">
      {[
        { name: "DMG MORI AG", std: "IATF 16949", price: "€700" },
        { name: "TechMold Ind.", std: "VDA 6.3", price: "€700" },
        { name: "Precision CNC", std: "ISO 9001", price: "€700" },
      ].map((s, i) => (
        <motion.div key={s.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
          className="flex items-center justify-between p-3 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-[#0A7FA5] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{s.name}</div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#6EA996]/10 text-[#6EA996] font-medium">{s.std}</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-900">{s.price}</span>
        </motion.div>
      ))}

      <div className="mt-4 p-3 bg-gray-50 border border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900">Total</span>
        <span className="text-lg font-bold text-[#0A7FA5]">€2,100</span>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="w-full py-3 bg-[#6EA996] text-white text-sm font-medium text-center mt-2">
        ✓ Order Confirmed
      </motion.div>
    </div>
  </div>
);

const MobileDispatchStep = () => {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setConfirmed(true), 3000); return () => clearTimeout(t); }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-900">Auditor Assignment</div>
        <div className="text-[11px] text-gray-500">TechMold Industries · VDA 6.3</div>
      </div>
      <div className="flex-1 p-4 space-y-3">
        {[
          { name: "Wei Liu", role: "Lead · VDA 6.3", match: 98, img: auditorGen2 },
          { name: "Dr. Klaus Schmidt", role: "Senior · IATF", match: 94, img: auditorGen7 },
        ].map((a, i) => (
          <motion.div key={a.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
            className={`flex items-center gap-3 p-3 border transition-all ${i === 0 ? 'border-[#0A7FA5]/30 bg-[#0A7FA5]/5' : 'border-gray-100'}`}>
            <img src={a.img} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{a.name}</div>
              <div className="text-[11px] text-gray-500">{a.role}</div>
            </div>
            <span className={`text-sm font-bold ${a.match >= 95 ? 'text-[#6EA996]' : 'text-[#0A7FA5]'}`}>{a.match}%</span>
          </motion.div>
        ))}

        {confirmed && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-[#6EA996]/10 text-[#6EA996] text-sm font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Wei Liu assigned & notified
          </motion.div>
        )}
      </div>
    </div>
  );
};

const MobileAuditStep = () => (
  <div className="h-full flex flex-col bg-white">
    {/* Live image */}
    <div className="relative h-40 overflow-hidden">
      <img src={equipmentImage} alt="Equipment" className="w-full h-full object-cover" />
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-black/60 rounded text-white text-[10px]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#6EA996] animate-pulse" />
        Live Audit
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="absolute top-8 left-3 border border-[#6EA996] rounded bg-[#6EA996]/10 px-2 py-1">
        <span className="text-[9px] text-[#6EA996] font-medium">✓ CNC Lathe NLX 2500</span>
      </motion.div>
    </div>

    {/* Checklist */}
    <div className="flex-1 p-3 space-y-2 overflow-y-auto">
      <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">VDA 6.3 Progress</div>
      {[
        { code: "P6.1.1", item: "Process inputs", done: true, score: 9 },
        { code: "P6.1.2", item: "Process sequence", done: true, score: 8 },
        { code: "P6.2.1", item: "Personnel qualified", done: true, score: 9 },
        { code: "P6.2.2", item: "Responsibility", done: false, current: true },
        { code: "P6.3.1", item: "Equipment suitable", done: false },
      ].map((c, i) => (
        <motion.div key={c.code} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-2 p-2 border ${c.current ? 'border-[#0A7FA5]/30 bg-[#0A7FA5]/5' : 'border-gray-100'}`}>
          {c.done ? (
            <div className="w-5 h-5 rounded-full bg-[#6EA996] flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          ) : c.current ? (
            <div className="w-5 h-5 rounded-full bg-[#0A7FA5] flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-2.5 h-2.5 border-[1.5px] border-white border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
          )}
          <span className="text-[10px] font-mono text-gray-400">{c.code}</span>
          <span className="text-xs text-gray-700 flex-1">{c.item}</span>
          {c.score && <span className="text-xs font-bold text-[#6EA996]">{c.score}</span>}
        </motion.div>
      ))}
    </div>

    {/* Stats bar */}
    <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px]">
      <span className="text-gray-500">3/6 complete</span>
      <span className="text-gray-500">Avg: <span className="font-bold text-[#6EA996]">8.7</span></span>
      <span className="text-gray-500">47 evidence items</span>
    </div>
  </div>
);

const MobileReportStep = () => (
  <div className="h-full flex flex-col bg-white">
    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-gray-900">VDA 6.3 Report</div>
        <div className="text-[11px] text-gray-500">TechMold Industries</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#0A7FA5]">84.2%</span>
        <span className="text-xs font-bold px-1.5 py-0.5 bg-[#0A7FA5]/10 text-[#0A7FA5]">B</span>
      </div>
    </div>
    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
      {[
        { code: "P2", name: "Project Mgmt", score: 88 },
        { code: "P3", name: "Dev Planning", score: 82 },
        { code: "P5", name: "Supplier Mgmt", score: 79 },
        { code: "P6", name: "Production", score: 84 },
        { code: "P7", name: "Customer Care", score: 91 },
      ].map((p, i) => (
        <motion.div key={p.code} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-gray-400 w-6">{p.code}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700">{p.name}</span>
              <span className={`text-xs font-bold ${p.score >= 85 ? 'text-[#6EA996]' : 'text-[#0A7FA5]'}`}>{p.score}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.score}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`h-full rounded-full ${p.score >= 85 ? 'bg-[#6EA996]' : 'bg-[#0A7FA5]'}`} />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-[10px] font-medium text-gray-400 uppercase mb-2">Key Findings</div>
        {[
          { id: "NC-001", text: "Calibration records incomplete", sev: "major" },
          { id: "NC-002", text: "Operator matrix not updated", sev: "minor" },
        ].map((nc) => (
          <div key={nc.id} className="flex items-center gap-2 py-1.5">
            <span className={`text-[9px] px-1 py-0.5 font-medium ${nc.sev === 'major' ? 'bg-[#AD3D3D]/10 text-[#AD3D3D]' : 'bg-[#E39B5C]/10 text-[#E39B5C]'}`}>
              {nc.sev.toUpperCase()}
            </span>
            <span className="text-xs text-gray-600">{nc.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MobileDevelopStep = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 1500);
    const t2 = setTimeout(() => setProgress(2), 3000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-900">Corrective Actions</div>
        <div className="text-[11px] text-gray-500">Follow-up tracking</div>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {[
          { id: "CA-001", action: "Update calibration records", due: "Mar 15", status: progress >= 1 ? "done" : "pending" },
          { id: "CA-002", action: "Revise operator matrix", due: "Mar 20", status: progress >= 2 ? "done" : progress >= 1 ? "active" : "pending" },
          { id: "CA-003", action: "Review process FMEA", due: "Apr 01", status: "pending" },
        ].map((ca, i) => (
          <motion.div key={ca.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            className={`p-3 border ${ca.status === 'active' ? 'border-[#0A7FA5]/30 bg-[#0A7FA5]/5' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2 mb-1">
              {ca.status === 'done' ? (
                <div className="w-5 h-5 rounded-full bg-[#6EA996] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              ) : ca.status === 'active' ? (
                <div className="w-5 h-5 rounded-full bg-[#0A7FA5] flex items-center justify-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-2.5 h-2.5 border-[1.5px] border-white border-t-transparent rounded-full" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
              )}
              <span className="text-xs font-mono text-gray-400">{ca.id}</span>
              <span className="ml-auto text-[10px] text-gray-400">Due: {ca.due}</span>
            </div>
            <p className="text-sm text-gray-700 ml-7">{ca.action}</p>
          </motion.div>
        ))}

        {progress >= 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-[#6EA996]/10 text-center">
            <span className="text-sm font-medium text-[#6EA996]">✓ Re-audit scheduled for April 15</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Main Mobile Demo Component ---
const MobilePlatformDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const stepLoadingStatuses: Record<number, string[]> = {
    0: ["Connecting to databases...", "Loading supplier network..."],
    1: ["Validating audit scope...", "Preparing order..."],
    2: ["Finding auditors...", "Matching expertise..."],
    3: ["Collecting evidence...", "Processing VDA criteria..."],
    4: ["Compiling findings...", "Building report..."],
    5: ["Loading action items...", "Tracking deadlines..."],
  };

  const stepDurations = [18000, 10000, 10000, 10000, 10000, 10000];
  const loadingDuration = 2500;

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), loadingDuration);
    return () => clearTimeout(t);
  }, [currentStep]);

  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentStep(prev => (prev + 1) % demoSteps.length);
    }, stepDurations[currentStep]);
    return () => clearTimeout(t);
  }, [currentStep]);

  const renderDemo = () => {
    if (isLoading) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-white">
          <AILoadingSpinner statuses={stepLoadingStatuses[currentStep] || ["Processing..."]} size="md" interval={800} />
        </div>
      );
    }
    switch (currentStep) {
      case 0: return <MobileDiscoverStep />;
      case 1: return <MobileVerifyStep />;
      case 2: return <MobileDispatchStep />;
      case 3: return <MobileAuditStep />;
      case 4: return <MobileReportStep />;
      case 5: return <MobileDevelopStep />;
      default: return <MobileDiscoverStep />;
    }
  };

  return (
    <div className="w-full">
      {/* Step title + dot navigation */}
      <div className="mb-3">
        <div className="text-center mb-3">
          <p className="text-xs font-medium text-primary tracking-wider uppercase">
            Step {currentStep + 1} of {demoSteps.length}
          </p>
          <p className="text-sm font-semibold text-foreground mt-1">
            {demoSteps[currentStep].title}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          {demoSteps.map((step, i) => (
            <button key={step.id} onClick={() => setCurrentStep(i)} className="relative">
              <motion.div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === currentStep ? 'bg-primary scale-125' : i < currentStep ? 'bg-secondary' : 'bg-muted-foreground/30'
                }`}
                animate={i === currentStep ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {i < currentStep && (
                <svg className="absolute -top-0.5 -left-0.5 w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative bg-[#0A0A0A] shadow-xl overflow-hidden rounded-lg">
        <div className="aspect-[3/4] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              {renderDemo()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {currentStep === demoSteps.length - 1 && (
        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs text-secondary mt-2 font-medium text-center">
          ✓ From search to verified partnership
        </motion.p>
      )}
    </div>
  );
};

export default MobilePlatformDemo;
