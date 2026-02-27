import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Search, ChevronDown, ChevronRight, Shield, 
  MapPin, BarChart3, Globe, Zap, CheckCircle2,
  Factory, Flame, Gauge, Wrench, Box, Cable, Check
} from "lucide-react";
import SupplierBenchmarkModal from "./SupplierBenchmarkModal";
import SupplierProfileModal from "./SupplierProfileModal";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryData = [
  { 
    icon: Gauge, name: "Pressure Vessels", standard: "ASME Sec VIII", 
    suppliers: 1847, avgRating: 4.3, audited: 72,
    subcategories: ["Shell & Tube HX", "Columns & Towers", "Reactors", "Accumulators"]
  },
  { 
    icon: Flame, name: "Cryogenic Equipment", standard: "EN 13445 / API 620", 
    suppliers: 923, avgRating: 4.5, audited: 81,
    subcategories: ["LNG Storage Tanks", "Cryogenic Valves", "Cold Boxes", "Vaporizers"]
  },
  { 
    icon: Wrench, name: "Rotating Equipment", standard: "API 617 / 618", 
    suppliers: 1254, avgRating: 4.1, audited: 68,
    subcategories: ["Centrifugal Compressors", "Reciprocating Compressors", "Turbines", "Pumps"]
  },
  { 
    icon: Cable, name: "Piping & Fittings", standard: "ASME B31.3", 
    suppliers: 3412, avgRating: 4.0, audited: 55,
    subcategories: ["Carbon Steel Pipe", "Alloy Fittings", "Flanges", "Expansion Joints"]
  },
  { 
    icon: Box, name: "Structural Steel", standard: "EN 1090 / AWS D1.1", 
    suppliers: 2156, avgRating: 3.9, audited: 48,
    subcategories: ["Module Fabrication", "Pipe Racks", "Platforms", "Skid Packages"]
  },
  { 
    icon: Factory, name: "Instrumentation & Control", standard: "IEC 61511 / ISA 84", 
    suppliers: 1678, avgRating: 4.4, audited: 76,
    subcategories: ["DCS Systems", "Safety PLCs", "Flow Meters", "Control Valves"]
  },
];

const supplierRows = [
  { name: "KSB SE & Co. KGaA", country: "Germany", category: "Rotating Equipment", rating: 4.8, audits: 12, risk: "Low", certifications: ["ISO 9001", "API Q1", "PED"], fitScore: 97 },
  { name: "Emerson Automation", country: "USA", category: "Instrumentation", rating: 4.7, audits: 8, risk: "Low", certifications: ["ISO 9001", "IECEx", "SIL 3"], fitScore: 94 },
  { name: "Chart Industries", country: "USA", category: "Cryogenic Equipment", rating: 4.6, audits: 15, risk: "Low", certifications: ["ASME U", "ASME U2", "NB"], fitScore: 96 },
  { name: "Burckhardt Compression", country: "Switzerland", category: "Rotating Equipment", rating: 4.5, audits: 6, risk: "Low", certifications: ["ISO 9001", "API 618", "PED"], fitScore: 91 },
  { name: "Dresser-Rand (Siemens)", country: "Germany", category: "Rotating Equipment", rating: 4.7, audits: 18, risk: "Low", certifications: ["API 617", "ISO 9001", "ATEX"], fitScore: 95 },
  { name: "Velan Inc.", country: "Canada", category: "Cryogenic Valves", rating: 4.4, audits: 9, risk: "Medium", certifications: ["API 6D", "ASME B16.34", "PED"], fitScore: 88 },
  { name: "BHGE (Baker Hughes)", country: "Italy", category: "Rotating Equipment", rating: 4.6, audits: 22, risk: "Low", certifications: ["API 617", "API 618", "ISO 9001"], fitScore: 93 },
  { name: "Linde Engineering", country: "Germany", category: "Cryogenic Equipment", rating: 4.8, audits: 14, risk: "Low", certifications: ["EN 13445", "AD 2000", "PED"], fitScore: 98 },
  { name: "Sumitomo SHI FW", country: "Finland", category: "Pressure Vessels", rating: 4.3, audits: 7, risk: "Medium", certifications: ["ASME U", "PED", "ISO 3834"], fitScore: 85 },
  { name: "IMI Critical Engineering", country: "UK", category: "Control Valves", rating: 4.5, audits: 11, risk: "Low", certifications: ["API 6A", "PED", "SIL 3"], fitScore: 92 },
];

const stats = [
  { label: "Suppliers indexed", value: "11,270+", icon: Shield },
  { label: "Countries", value: "84", icon: Globe },
  { label: "Completed Audits", value: "28,400+", icon: CheckCircle2 },
  { label: "Product Groups", value: "340+", icon: Database },
];

const SupplierDatabaseDemo = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [benchmarkOpen, setBenchmarkOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<typeof supplierRows[0] | null>(null);
  const { t } = useLanguage();
  
  const filteredSuppliers = supplierRows.filter(s => {
    const matchesSearch = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "low-risk" && s.risk === "Low") ||
      (selectedFilter === "high-fit" && s.fitScore >= 90);
    return matchesSearch && matchesFilter;
  });

  return (
    <section data-nav-theme="light" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header — matching LNGSearchDemo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50">
              {t.supplierDb.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
            {t.supplierDb.headline1}<br />
            <span className="text-foreground/50">{t.supplierDb.headline2}</span>
          </h2>
          <p className="text-lg text-foreground/50 mt-6">
            {t.supplierDb.subtitle}
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-3 bg-white/70 backdrop-blur-md border border-white/80"
              style={{ background: 'hsla(0,0%,92%,0.7)', borderColor: 'hsla(0,0%,85%,1)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-[hsl(0,0%,45%)]" />
                <span className="text-[10px] text-[hsl(0,0%,50%)] uppercase tracking-wider font-semibold">{stat.label}</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Demo Window — matching LNGSearchDemo chrome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <DatabaseDemoWindow
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            expandedCategory={expandedCategory}
            setExpandedCategory={setExpandedCategory}
            hoveredRow={hoveredRow}
            setHoveredRow={setHoveredRow}
            filteredSuppliers={filteredSuppliers}
            onSupplierClick={(s) => { setSelectedSupplier(s); setProfileOpen(true); }}
            t={t}
          />
        </motion.div>
      </div>

      <SupplierBenchmarkModal
        open={benchmarkOpen}
        onOpenChange={setBenchmarkOpen}
      />

      <SupplierProfileModal
        open={profileOpen}
        onOpenChange={setProfileOpen}
        supplier={selectedSupplier}
      />
    </section>
  );
};

interface DatabaseDemoWindowProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedFilter: string;
  setSelectedFilter: (v: string) => void;
  expandedCategory: number | null;
  setExpandedCategory: (v: number | null) => void;
  hoveredRow: number | null;
  setHoveredRow: (v: number | null) => void;
  filteredSuppliers: typeof supplierRows;
  onSupplierClick: (s: typeof supplierRows[0]) => void;
  t: any;
}

const DatabaseDemoWindow = ({
  searchQuery, setSearchQuery, selectedFilter, setSelectedFilter,
  expandedCategory, setExpandedCategory, hoveredRow, setHoveredRow,
  filteredSuppliers, onSupplierClick, t
}: DatabaseDemoWindowProps) => {
  const menuItems = ["Dashboard", "Database", "Saved Lists", "RFQ Manager", "Audit Orders", "Reports"];

  return (
    <div className="bg-[hsl(0,0%,85%)] overflow-hidden border border-[hsl(0,0%,80%)] flex flex-col relative">
      {/* Window title bar */}
      <div className="h-8 bg-[hsl(0,0%,88%)] flex items-center px-3 border-b border-[hsl(0,0%,80%)] flex-shrink-0">
        <span className="text-[10px] text-[hsl(0,0%,35%)] font-medium">Hilti Supplier Database — 11,270 Suppliers · 84 Countries</span>
        <div className="ml-auto flex gap-1">
          {["Browse", "Search", "Analytics"].map((label, i) => (
            <button
              key={i}
              className={`px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                i === 0 ? 'bg-primary text-white' : 'bg-[hsl(0,0%,78%)] text-[hsl(0,0%,45%)] hover:bg-[hsl(0,0%,72%)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex h-[600px] md:h-[650px]">
        {/* Left sidebar — matching LNGSearchDemo sidebar */}
        <div className="w-[100px] md:w-[140px] bg-[hsl(0,0%,28%)] border-r border-[hsl(0,0%,22%)] flex flex-col flex-shrink-0">
          <div className="p-2.5 border-b border-[hsl(0,0%,22%)]">
            <span className="text-[10px] text-[hsl(0,0%,60%)] uppercase tracking-widest font-bold">Database</span>
          </div>
          <div className="flex-1 py-1">
            {menuItems.map((item, i) => (
              <div key={i} className={`px-3 py-2 text-[11px] font-medium cursor-default ${i === 1 ? 'bg-primary/20 text-primary border-l-2 border-primary' : 'text-[hsl(0,0%,65%)]'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="px-3 py-2.5 border-b border-[hsl(0,0%,78%)] flex items-center gap-3 flex-shrink-0 bg-[hsl(0,0%,88%)]">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(0,0%,55%)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.supplierDb.searchPlaceholder}
                className="w-full h-8 bg-white border border-[hsl(0,0%,75%)] pl-8 pr-3 text-[11px] text-foreground placeholder:text-[hsl(0,0%,55%)] focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-px">
              {[
                { key: "all", label: t.supplierDb.filterAll },
                { key: "low-risk", label: t.supplierDb.filterLowRisk },
                { key: "high-fit", label: t.supplierDb.filterHighFit },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedFilter === f.key 
                      ? 'bg-primary text-white' 
                      : 'bg-[hsl(0,0%,78%)] text-[hsl(0,0%,45%)] hover:bg-[hsl(0,0%,72%)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content split: categories + table */}
          <div className="flex-1 flex overflow-hidden">
            {/* Categories filter panel */}
            <div className="w-[130px] md:w-[160px] bg-[hsl(0,0%,82%)] border-r border-[hsl(0,0%,76%)] p-2.5 flex-shrink-0 overflow-y-auto">
              <p className="text-[10px] text-[hsl(0,0%,30%)] uppercase tracking-widest font-bold mb-2.5">{t.supplierDb.productGroups}</p>
              {categoryData.map((cat, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
                    className={`w-full flex items-center gap-2 px-2 py-2 text-left transition-colors ${
                      expandedCategory === i 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-[hsl(0,0%,35%)] hover:text-[hsl(0,0%,20%)]'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium truncate">{cat.name}</div>
                      <div className="text-[9px] text-[hsl(0,0%,50%)]">{cat.suppliers} suppliers</div>
                    </div>
                    {expandedCategory === i ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </button>
                  <AnimatePresence>
                    {expandedCategory === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-7 py-1 space-y-0.5">
                          {cat.subcategories.map((sub, j) => (
                            <div key={j} className="flex items-center gap-1.5 py-0.5">
                              <div className={`w-3 h-3 border flex items-center justify-center ${j === 0 ? 'border-primary bg-primary/20' : 'border-[hsl(0,0%,55%)]'}`}>
                                {j === 0 && <Check className="w-2 h-2 text-primary" />}
                              </div>
                              <span className="text-[10px] text-[hsl(0,0%,30%)] font-medium">{sub}</span>
                            </div>
                          ))}
                          <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-[hsl(0,0%,72%)]">
                            <span className="text-[9px] text-[hsl(0,0%,45%)]">
                              <span className="font-bold text-primary">{cat.audited}%</span> audited
                            </span>
                            <span className="text-[9px] text-[hsl(0,0%,45%)]">
                              Avg <span className="font-bold text-primary">★ {cat.avgRating}</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Supplier table */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Info bar */}
              <div className="p-2.5 bg-[hsl(0,0%,88%)] border-b border-[hsl(0,0%,78%)]">
                <p className="text-[10px] text-[hsl(0,0%,30%)] leading-relaxed">
                  <span className="font-bold text-primary">Fit Score</span> — AI-calculated match based on certifications, audit history, capacity, and project references. <span className="font-semibold text-primary">Click a supplier for full profile.</span>
                </p>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
                {filteredSuppliers.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => onSupplierClick(s)}
                    className={`p-3 bg-white/70 backdrop-blur-md border border-white/80 flex items-start gap-2.5 cursor-pointer transition-colors ${
                      hoveredRow === i ? 'bg-white/90' : ''
                    }`}
                  >
                    <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-white">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-foreground truncate">{s.name}</p>
                      <p className="text-[11px] text-[hsl(0,0%,50%)] font-medium mb-1.5">
                        <MapPin className="w-3 h-3 inline mr-0.5" />{s.country} · {s.category}
                      </p>
                      <div className="flex gap-1.5 flex-wrap">
                        {s.certifications.map((c, j) => (
                          <span key={j} className="px-1.5 py-0.5 border border-primary/40 text-primary text-[9px] font-bold uppercase">{c}</span>
                        ))}
                        <span className="px-1.5 py-0.5 border border-foreground/20 text-[hsl(0,0%,50%)] text-[9px] font-semibold">{s.audits} audits</span>
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          s.risk === "Low" 
                            ? 'bg-primary/15 text-primary border border-primary/30' 
                            : 'bg-[hsl(45,100%,50%)]/15 text-[hsl(45,80%,35%)] border border-[hsl(45,100%,50%)]/30'
                        }`}>
                          {s.risk} Risk
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center flex-shrink-0 gap-0.5">
                      <span className="text-xl font-bold text-primary leading-none">{s.fitScore}</span>
                      <span className="text-[9px] text-[hsl(0,0%,50%)] uppercase tracking-wider font-medium">Fit</span>
                      <div className="w-10 h-1.5 bg-foreground/10 mt-0.5">
                        <div className="h-full bg-primary" style={{ width: `${s.fitScore}%` }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status bar */}
              <div className="px-3 py-2 border-t border-[hsl(0,0%,78%)] bg-[hsl(0,0%,88%)] flex items-center justify-between flex-shrink-0">
                <span className="text-[10px] text-[hsl(0,0%,45%)] font-medium">
                  Showing <span className="font-bold text-foreground">{filteredSuppliers.length}</span> of <span className="font-bold text-foreground">11,270</span> suppliers
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[hsl(0,0%,45%)] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" /> AI Portfolio Matching
                  </span>
                  <span className="text-[10px] text-[hsl(0,0%,45%)] flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-primary" /> 28,400+ audit data points
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDatabaseDemo;
