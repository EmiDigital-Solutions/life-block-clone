import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import LNGSupplierDetailModal, { suppliersData, type LNGSupplier } from "./LNGSupplierDetailModal";

// LNG-adapted 3-Window Demo: Chatbot → Search Results → Supplier Profile
const LNGSearchDemo = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<LNGSupplier | null>(null);

  return (
    <section data-nav-theme="light" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50">
              SearchPro+
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
            Find verified suppliers<br />in seconds, not months
          </h2>
          <p className="text-lg text-foreground/50 mt-6">
            AI-powered supplier discovery for LNG, gas processing, and energy infrastructure. Describe what you need — get matched suppliers with verified capabilities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <LNGSearchDemoWindows onSupplierClick={setSelectedSupplier} />
        </motion.div>
      </div>

      <LNGSupplierDetailModal
        supplier={selectedSupplier}
        open={!!selectedSupplier}
        onOpenChange={(open) => !open && setSelectedSupplier(null)}
      />
    </section>
  );
};

const LNGSearchDemoWindows = ({ onSupplierClick }: { onSupplierClick: (s: LNGSupplier) => void }) => {
  const [activeWindow, setActiveWindow] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const durations = [6000, 3000, 6000];

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setTimeout(() => {
      setActiveWindow((prev) => (prev + 1) % 3);
    }, durations[activeWindow]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPaused, activeWindow]);

  const stepLabels = ["Discover", "Results", "Profile"];
  const windowTitles = [
    "SearchPro+ — AI Agent",
    "SearchPro+ — Search Results",
    "SearchPro+ — Supplier Profile"
  ];

  return (
    <div className="bg-[hsl(0,0%,85%)] overflow-hidden border border-[hsl(0,0%,80%)] aspect-[16/9] flex flex-col relative">
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-1.5 right-1.5 z-30 w-7 h-7 bg-[hsl(0,0%,30%)] hover:bg-[hsl(0,0%,20%)] flex items-center justify-center transition-colors cursor-pointer"
      >
        {isPaused ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><polygon points="0,0 10,6 0,12" fill="white" /></svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="3" height="12" fill="white" /><rect x="7" y="0" width="3" height="12" fill="white" /></svg>
        )}
      </button>

      <div className="h-8 bg-[hsl(0,0%,88%)] flex items-center px-3 border-b border-[hsl(0,0%,80%)] flex-shrink-0">
        <span className="text-[10px] text-[hsl(0,0%,35%)] font-medium">{windowTitles[activeWindow]}</span>
        <div className="ml-auto flex gap-1 mr-9">
          {stepLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => { setActiveWindow(i); setIsPaused(true); }}
              className={`px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                activeWindow === i ? 'bg-primary text-white' : 'bg-[hsl(0,0%,78%)] text-[hsl(0,0%,45%)] hover:bg-[hsl(0,0%,72%)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <motion.div
          key={activeWindow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-hidden"
        >
          {activeWindow === 0 && <LNGDemoChatbot />}
          {activeWindow === 1 && <LNGDemoResults onSupplierClick={onSupplierClick} />}
          {activeWindow === 2 && <LNGDemoProfile />}
        </motion.div>
      </div>
    </div>
  );
};

// Window 1: LNG Chatbot
const LNGDemoChatbot = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers = [200, 700, 1400, 2100, 3200, 4200].map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-[hsl(0,0%,85%)] flex flex-col h-full">
      <div className="px-4 py-2 border-b border-[hsl(0,0%,78%)] bg-[hsl(0,0%,88%)] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[hsl(0,0%,30%)] uppercase tracking-wider">AI Agent</span>
          <span className="text-[10px] text-[hsl(0,0%,55%)]">LNG Supplier Discovery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="px-2 py-0.5 bg-primary/15 text-primary text-[10px] font-bold">Preference Engine Active</span>
        </div>
      </div>

      <div className="p-3 space-y-2 flex-1 overflow-hidden">
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-2.5 bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1.5">Preference Engine — Context Detected</span>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "LNG / Gas Processing", type: "Industry" },
                  { label: "Middle East / Asia", type: "Region" },
                  { label: "ASME Required", type: "Standard" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-[hsl(0,0%,85%)] text-[hsl(0,0%,40%)]">{item.type}</span>
                    <span className="text-[11px] font-semibold text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="p-2.5 bg-white/80 backdrop-blur-md border border-white/85 w-fit">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 block mb-0.5">You</span>
              <p className="text-[12px] font-semibold text-foreground leading-relaxed">I need cryogenic valve manufacturers for LNG storage tanks</p>
            </div>
          </motion.div>
        )}

        {step >= 3 && step < 4 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-2.5 bg-white/70 backdrop-blur-md border border-white/80 w-fit">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[11px] text-primary font-bold">Preference Engine analyzing requirements...</span>
              </div>
            </div>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-3 bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">Preference Engine — I identified the following</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { tag: "Cryogenic Valves", cat: "Product" },
                  { tag: "LNG Storage", cat: "Application" },
                  { tag: "ASME B16.34", cat: "Standard" },
                  { tag: "API 6D", cat: "Standard" },
                  { tag: "Inconel 625", cat: "Material" },
                  { tag: "−196°C Rating", cat: "Spec" },
                  { tag: "NACE MR0175", cat: "Compliance" },
                  { tag: "Helium Leak Test", cat: "Testing" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-primary/20 text-primary">{item.cat}</span>
                    <span className="text-[11px] font-semibold text-foreground">{item.tag}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-white/30">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary/80 block mb-1">Also recommended</span>
                <div className="flex gap-1.5 flex-wrap">
                  {["PED 2014/68/EU", "Fire Safe API 607", "SIL 3 Rated", "ATEX Zone 1"].map((opt, i) => (
                    <span key={i} className="px-2 py-0.5 text-[9px] font-semibold bg-primary/10 text-primary border border-primary/25">+ {opt}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="p-2.5 bg-white/80 backdrop-blur-md border border-white/85 w-fit">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 block mb-0.5">You</span>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 text-[9px] font-bold bg-primary/30 text-primary">✓ Confirmed</span>
              </div>
              <p className="text-[11px] font-semibold text-foreground leading-relaxed">Add Fire Safe API 607 and min DN150 bore size</p>
            </div>
          </motion.div>
        )}

        {step >= 6 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-2.5 bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1.5">Preference Engine — Ready to Search</span>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[9px] font-bold bg-primary/25 text-primary">+ Fire Safe API 607</span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-primary/25 text-primary">+ DN150 min</span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-primary/25 text-primary">+ PED ✓</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 border-t border-[hsl(0,0%,78%)] flex gap-2 flex-shrink-0 bg-[hsl(0,0%,88%)] mt-auto">
        <div className="flex-1 h-9 bg-white border border-[hsl(0,0%,75%)] flex items-center px-3">
          <span className="text-[hsl(0,0%,55%)] text-[11px]">Describe what you need...</span>
        </div>
        <div className="w-9 h-9 bg-primary flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

// Window 2: LNG Search Results
const LNGDemoResults = ({ onSupplierClick }: { onSupplierClick: (s: LNGSupplier) => void }) => {
  const results = suppliersData.map(s => ({
    name: s.name,
    location: s.location,
    match: s.match,
    certs: s.certs.slice(0, 3),
    capacity: s.capacity,
    speciality: s.speciality,
  }));

  const menuItems = ["Dashboard", "Search", "Saved Lists", "RFQ Manager", "Audit Orders", "Reports"];

  return (
    <div className="bg-[hsl(0,0%,85%)] flex h-full">
      <div className="w-[100px] md:w-[120px] bg-[hsl(0,0%,28%)] border-r border-[hsl(0,0%,22%)] flex flex-col flex-shrink-0">
        <div className="p-2.5 border-b border-[hsl(0,0%,22%)]">
          <span className="text-[10px] text-[hsl(0,0%,60%)] uppercase tracking-widest font-bold">SearchPro+</span>
        </div>
        <div className="flex-1 py-1">
          {menuItems.map((item, i) => (
            <div key={i} className={`px-3 py-2 text-[11px] font-medium cursor-default ${i === 1 ? 'bg-primary/20 text-primary border-l-2 border-primary' : 'text-[hsl(0,0%,65%)]'}`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-3 py-2.5 border-b border-[hsl(0,0%,78%)] flex items-center justify-between flex-shrink-0 bg-[hsl(0,0%,88%)]">
          <div>
            <p className="text-[11px] text-[hsl(0,0%,30%)] uppercase tracking-wider font-bold">18 Suppliers Found</p>
            <p className="text-[10px] text-[hsl(0,0%,50%)]">Cryogenic Valves · LNG Storage · ASME B16.34 · API 6D</p>
          </div>
          <div className="flex gap-1.5">
            <span className="px-2 py-1 bg-white/80 border border-white/85 text-[10px] text-foreground font-medium">Sort: Match</span>
            <span className="px-2 py-1 bg-white/80 border border-white/85 text-[10px] text-foreground font-medium">Export</span>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-[110px] md:w-[130px] bg-[hsl(0,0%,82%)] border-r border-[hsl(0,0%,76%)] p-2.5 flex-shrink-0">
            <p className="text-[10px] text-[hsl(0,0%,30%)] uppercase tracking-widest font-bold mb-2.5">Filters</p>
            {[
              { label: "Standard", values: ["ASME B16.34", "API 6D", "PED"] },
              { label: "Region", values: ["Europe", "Middle East", "Asia"] },
              { label: "Rating", values: ["Cryogenic", "Fire Safe"] },
            ].map((filter, i) => (
              <div key={i} className="mb-2.5">
                <p className="text-[10px] text-[hsl(0,0%,35%)] font-bold uppercase mb-1">{filter.label}</p>
                {filter.values.map((v, j) => (
                  <div key={j} className="flex items-center gap-1.5 py-0.5">
                    <div className={`w-3 h-3 border flex items-center justify-center ${j === 0 ? 'border-primary bg-primary/20' : 'border-[hsl(0,0%,55%)]'}`}>
                      {j === 0 && <Check className="w-2 h-2 text-primary" />}
                    </div>
                    <span className="text-[10px] text-[hsl(0,0%,30%)] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex-1 p-2.5 space-y-1.5">
            <div className="p-2.5 bg-[hsl(0,0%,88%)] border border-[hsl(0,0%,78%)] mb-1.5">
              <p className="text-[10px] text-[hsl(0,0%,30%)] leading-relaxed">
                <span className="font-bold text-primary">Match Score</span> — AI-calculated fit based on code compliance, cryogenic capability, test certifications, and project references. <span className="font-semibold text-primary">Click a supplier for full details.</span>
              </p>
            </div>

            {results.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                onClick={() => onSupplierClick(suppliersData[i])}
                className="p-3 bg-white/70 backdrop-blur-md border border-white/80 flex items-start gap-2.5 cursor-pointer hover:bg-white/90 transition-colors"
              >
                <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[11px] font-bold text-white">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-foreground truncate">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground font-medium mb-1.5">{s.location} · {s.speciality}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {s.certs.map((c, j) => (
                      <span key={j} className="px-1.5 py-0.5 border border-primary/40 text-primary text-[9px] font-bold uppercase">{c}</span>
                    ))}
                    <span className="px-1.5 py-0.5 border border-foreground/20 text-muted-foreground text-[9px] font-semibold">{s.capacity}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center flex-shrink-0 gap-0.5">
                  <span className="text-xl font-bold text-primary leading-none">{s.match}</span>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Score</span>
                  <div className="w-10 h-1.5 bg-foreground/10 mt-0.5">
                    <div className="h-full bg-primary" style={{ width: `${s.match}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Window 3: LNG Supplier Profile
const LNGDemoProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % 4;
      setActiveTab(i);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const tabLabels = ["Overview", "Audit History", "Intelligence", "Audit Order"];

  return (
    <div className="bg-[hsl(0,0%,85%)] flex flex-col h-full">
      <div className="p-4 md:px-6 md:pt-4 md:pb-3 border-b border-[hsl(0,0%,78%)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/80 border border-white/85 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">CV</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-[hsl(0,0%,15%)]">CryoValve Engineering AG</h3>
              <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold">97% Match</span>
            </div>
            <p className="text-[11px] text-[hsl(0,0%,45%)] font-medium">Zurich, Switzerland · Est. 1992 · 450 employees</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-accent text-white text-[11px] font-semibold">Request Quote</button>
            <button className="px-3 py-1.5 bg-accent text-white text-[11px] font-semibold">Order Audit</button>
          </div>
        </div>
      </div>

      <div className="flex gap-0 border-b border-[hsl(0,0%,78%)] px-4 md:px-6 flex-shrink-0">
        {tabLabels.map((tab, i) => (
          <button key={tab} className={`px-3 py-2.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-[hsl(0,0%,50%)]'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-5 flex-1 overflow-hidden">
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {activeTab === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Capacity", value: "800 units/yr" },
                { label: "Lead Time", value: "16–24 weeks" },
                { label: "Testing", value: "Helium leak, cryo cycle" },
                { label: "Quality Score", value: "96/100" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white/70 border border-white/80">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                  <p className="text-[14px] font-bold text-foreground">{item.value}</p>
                </div>
              ))}
              <div className="col-span-2 md:col-span-4 p-3 bg-white/70 border border-white/80">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Certifications & Compliance</p>
                <div className="flex gap-2 flex-wrap">
                  {["ASME B16.34", "API 6D", "PED 2014/68/EU", "NACE MR0175", "Fire Safe API 607", "ATEX", "SIL 3"].map((c, i) => (
                    <span key={i} className="px-2 py-1 border border-primary/40 text-primary text-[10px] font-bold uppercase">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-2.5">
              {[
                { type: "Pressure Equipment Directive Audit", date: "Dec 2025", score: "94/100", auditor: "R. Andersen", status: "Completed" },
                { type: "ASME Code Compliance Review", date: "Oct 2025", score: "97/100", auditor: "J. Martinez", status: "Completed" },
                { type: "Cryogenic Test Facility Inspection", date: "Aug 2025", score: "91/100", auditor: "H. Nakamura", status: "Completed" },
              ].map((audit, i) => (
                <div key={i} className="p-3 bg-white/70 border border-white/80">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[13px] font-bold text-foreground">{audit.type}</p>
                    <span className="text-[11px] font-bold text-primary">{audit.score}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium">{audit.date} · Auditor: {audit.auditor}</p>
                  <div className="mt-2 h-2 bg-foreground/10 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: audit.score.split('/')[0] + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Risk Score", value: "Low", color: "text-secondary" },
                  { label: "Financial Health", value: "Strong", color: "text-primary" },
                  { label: "Delivery Rating", value: "98.1%", color: "text-primary" },
                ].map((kpi, i) => (
                  <div key={i} className="p-3 bg-white/70 border border-white/80 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">{kpi.label}</p>
                    <p className={`text-[14px] font-bold ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-white/70 border border-white/80">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">LNG Project References</p>
                {["Yamal LNG — Cryogenic isolation valves", "Ichthys LNG — ESD valve package", "Prelude FLNG — Tank isolation system"].map((ref, i) => (
                  <p key={i} className="text-[11px] text-foreground font-medium py-1.5 border-b border-white/30 last:border-0">{ref}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-3">
              <div className="p-3 bg-white/70 border border-white/80">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Order On-Site Audit</p>
                <div className="flex gap-2 mb-3">
                  {["Code Compliance", "Process Audit", "Test Witness"].map((type, i) => (
                    <span key={i} className={`px-2.5 py-1 text-[10px] font-semibold ${i === 0 ? 'bg-accent text-white' : 'bg-foreground/10 border border-foreground/15 text-foreground'}`}>{type}</span>
                  ))}
                </div>
                <div className="space-y-0">
                  {[
                    { field: "Audit Standard", value: "ASME / API / PED" },
                    { field: "Duration", value: "3 days on-site" },
                    { field: "Earliest Date", value: "March 15, 2026" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-white/30 last:border-0">
                      <span className="text-[11px] text-muted-foreground font-medium">{row.field}</span>
                      <span className="text-[11px] font-bold text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-2.5 bg-accent text-white text-[12px] font-semibold">
                Schedule Audit Now
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LNGSearchDemo;
