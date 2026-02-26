import { useState } from "react";
import { motion } from "framer-motion";
import SupplierBenchmarkModal from "./SupplierBenchmarkModal";
import SupplierProfileModal from "./SupplierProfileModal";
import { useLanguage } from "@/contexts/LanguageContext";

const supplierRows = [
  { name: "KSB SE & Co. KGaA", location: "Germany", description: "Rotating Equipment", certifications: ["ISO 9001", "API Q1", "PED"], capacity: "Industrial scale", fitScore: 97 },
  { name: "Emerson Automation", location: "USA", description: "Instrumentation & Control", certifications: ["ISO 9001", "IECEx", "SIL 3"], capacity: "Global operations", fitScore: 94 },
  { name: "Chart Industries", location: "USA", description: "Cryogenic Equipment", certifications: ["ASME U", "ASME U2", "NB"], capacity: "1,200 units/yr", fitScore: 96 },
  { name: "Burckhardt Compression", location: "Switzerland", description: "Rotating Equipment", certifications: ["ISO 9001", "API 618", "PED"], capacity: "600 units/yr", fitScore: 91 },
  { name: "Dresser-Rand (Siemens)", location: "Germany", description: "Rotating Equipment", certifications: ["API 617", "ISO 9001", "ATEX"], capacity: "800 units/yr", fitScore: 95 },
  { name: "Velan Inc.", location: "Canada", description: "Cryogenic Valves", certifications: ["API 6D", "ASME B16.34", "PED"], capacity: "900 units/yr", fitScore: 88 },
  { name: "BHGE (Baker Hughes)", location: "Italy", description: "Rotating Equipment", certifications: ["API 617", "API 618", "ISO 9001"], capacity: "Industrial scale", fitScore: 93 },
  { name: "Linde Engineering", location: "Germany", description: "Cryogenic Equipment", certifications: ["EN 13445", "AD 2000", "PED"], capacity: "500 units/yr", fitScore: 98 },
  { name: "Sumitomo SHI FW", location: "Finland", description: "Pressure Vessels", certifications: ["ASME U", "PED", "ISO 3834"], capacity: "700 units/yr", fitScore: 85 },
  { name: "IMI Critical Engineering", location: "UK", description: "Control Valves", certifications: ["API 6A", "PED", "SIL 3"], capacity: "1,500 units/yr", fitScore: 92 },
];

const sidebarNav = [
  { label: "Dashboard", active: false },
  { label: "Search", active: true },
  { label: "Saved Lists", active: false },
  { label: "RFQ Manager", active: false },
  { label: "Audit Orders", active: false },
  { label: "Reports", active: false },
];

const filterGroups = [
  {
    title: "STANDARD",
    options: [
      { label: "ASME B16.34", checked: true },
      { label: "API 6D", checked: false },
      { label: "PED", checked: false },
    ],
  },
  {
    title: "REGION",
    options: [
      { label: "Europe", checked: true },
      { label: "Middle East", checked: true },
      { label: "Asia", checked: false },
    ],
  },
  {
    title: "RATING",
    options: [
      { label: "Cryogenic", checked: true },
      { label: "Fire Safe", checked: false },
    ],
  },
];

const stats = [
  { label: "Suppliers indexed", value: "11,270+" },
  { label: "Countries", value: "84" },
  { label: "Completed Audits", value: "28,400+" },
  { label: "Product Groups", value: "340+" },
];

const SupplierDatabaseDemo = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [benchmarkOpen, setBenchmarkOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<typeof supplierRows[0] | null>(null);
  const { t } = useLanguage();

  const handleSupplierClick = (supplier: typeof supplierRows[0]) => {
    setSelectedSupplier(supplier);
    setProfileOpen(true);
  };

  return (
    <section data-nav-theme="light" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="section-eyebrow">
              {t.supplierDb.eyebrow}
            </span>
          </div>
          <h2 className="section-headline text-foreground mb-6">
            {t.supplierDb.headline1}<br />
            <span className="text-muted-foreground">{t.supplierDb.headline2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t.supplierDb.subtitle}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-8 mb-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="border-t-2 border-foreground/10 pt-6">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Database UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="border border-border overflow-hidden bg-white"
        >
          {/* Top Bar */}
          <div className="bg-foreground/[0.04] border-b border-border px-5 py-2.5 flex items-center justify-between">
            <span className="text-sm text-muted-foreground tracking-wide">RCA Supplier Database — Search Results</span>
            <div className="flex items-center gap-1">
              {(["discover", "results", "profile"] as const).map((tab) => (
                <span
                  key={tab}
                  className={`px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] ${
                    tab === "results"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar */}
            <div className="lg:w-[180px] border-b lg:border-b-0 lg:border-r border-border flex flex-col">
              <div className="border-b border-border">
                <nav className="py-2">
                  {sidebarNav.map((item) => (
                    <div
                      key={item.label}
                      className={`px-4 py-1.5 text-sm cursor-default ${
                        item.active
                          ? "text-primary font-medium border-l-2 border-primary bg-primary/5"
                          : "text-foreground/70"
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-4 space-y-5">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Filters</span>
                {filterGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-xs font-semibold text-foreground mb-2">{group.title}</p>
                    <div className="space-y-1.5">
                      {group.options.map((opt) => (
                        <label key={opt.label} className="flex items-center gap-2 cursor-default">
                          <div className={`w-3.5 h-3.5 border flex items-center justify-center ${
                            opt.checked ? "border-primary bg-primary/10" : "border-border"
                          }`}>
                            {opt.checked && <span className="text-primary text-[10px]">✓</span>}
                          </div>
                          <span className="text-sm text-foreground/80">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="px-6 pt-5 pb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-foreground">
                    {supplierRows.length} Suppliers Found
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Cryogenic Valves · LNG Storage · ASME B16.34 · API 6D
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground border border-border px-3 py-1.5">Sort: Match</span>
                  <span className="text-xs text-muted-foreground border border-border px-3 py-1.5">Export</span>
                </div>
              </div>

              {/* Match Score hint */}
              <div className="px-6 pb-3">
                <p className="text-sm">
                  <span className="text-primary font-medium">Match Score</span>
                  <span className="text-muted-foreground"> — AI-calculated fit based on code compliance, cryogenic capability, test certifications, and project references. </span>
                  <span className="text-primary">Click a supplier for full details.</span>
                </p>
              </div>

              {/* Result Cards */}
              <div className="px-6 pb-6 space-y-3">
                {supplierRows.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => handleSupplierClick(s)}
                    className={`border border-border p-5 cursor-pointer transition-all flex items-start gap-5 ${
                      hoveredRow === i ? "bg-muted/40 border-primary/30" : "bg-white"
                    }`}
                  >
                    {/* Rank Number */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{i + 1}</span>
                    </div>

                    {/* Supplier Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-foreground">{s.name}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {s.location} · {s.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {s.certifications.map((c, j) => (
                          <span
                            key={j}
                            className="text-xs font-medium text-primary border border-primary/40 px-2.5 py-1"
                          >
                            {c}
                          </span>
                        ))}
                        <span className="text-xs text-muted-foreground border border-border px-2.5 py-1">
                          {s.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 text-right pl-4">
                      <div className="text-3xl font-bold text-primary leading-none">{s.fitScore}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mt-1">Score</div>
                      <div className="w-12 h-1 bg-primary mt-1.5 ml-auto" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <SupplierBenchmarkModal
        open={benchmarkOpen}
        onOpenChange={setBenchmarkOpen}
      />

      <SupplierProfileModal
        open={profileOpen}
        onOpenChange={setProfileOpen}
        supplier={selectedSupplier ? {
          name: selectedSupplier.name,
          country: selectedSupplier.location,
          category: selectedSupplier.description,
          rating: 4.5,
          audits: 8,
          risk: "Low",
          certifications: selectedSupplier.certifications,
          fitScore: selectedSupplier.fitScore,
        } : null}
      />
    </section>
  );
};

export default SupplierDatabaseDemo;
