import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Search, ChevronDown, ChevronRight, Shield, 
  MapPin, BarChart3, Globe, Zap, CheckCircle2,
  Factory, Flame, Gauge, Wrench, Box, Cable, Check, Cpu
} from "lucide-react";
import SupplierBenchmarkModal from "./SupplierBenchmarkModal";
import SupplierProfileModal from "./SupplierProfileModal";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryData = [
  { 
    icon: Zap, name: "Motors & Drives", standard: "IEC 60034 / IEC 62841", 
    suppliers: 1834, avgRating: 4.4, audited: 78,
    subcategories: ["Brushless DC Motors", "Universal Motors", "Gear Assemblies", "Motor Controllers"]
  },
  { 
    icon: Flame, name: "Battery Cells & Packs", standard: "UN 38.3 / IEC 62133", 
    suppliers: 956, avgRating: 4.6, audited: 85,
    subcategories: ["21700 Cells", "18650 Cells", "Battery Pack Assemblies", "BMS Modules"]
  },
  { 
    icon: Gauge, name: "Housings & Casings", standard: "ISO 1043 / ASTM E505", 
    suppliers: 2340, avgRating: 4.1, audited: 65,
    subcategories: ["Magnesium Die-Cast", "Aluminum Die-Cast", "PA66-GF Injection", "Overmolded Grips"]
  },
  { 
    icon: Cpu, name: "Electronics & PCBs", standard: "IPC-A-610 / AEC-Q100", 
    suppliers: 1425, avgRating: 4.3, audited: 71,
    subcategories: ["Motor Driver ICs", "Power MOSFETs", "Main PCB Assemblies", "Sensor Modules"]
  },
  { 
    icon: Wrench, name: "Precision Components", standard: "ISO 2768 / DIN 7168", 
    suppliers: 3120, avgRating: 4.0, audited: 58,
    subcategories: ["Gears & Spindles", "Bearings", "Chucks & Collets", "Seals & O-Rings"]
  },
  { 
    icon: Box, name: "Fasteners & Assembly", standard: "EN 15048 / VDA 6.3", 
    suppliers: 1680, avgRating: 4.2, audited: 72,
    subcategories: ["Thread-forming Screws", "Rivets & Inserts", "Springs & Clips", "Labels & Packaging"]
  },
];

const supplierRows = [
  { name: "Nidec Corporation", country: "Japan", category: "Brushless Motors", rating: 4.8, audits: 14, risk: "Low", certifications: ["IEC 60034", "IATF 16949", "ISO 9001"], fitScore: 97 },
  { name: "Samsung SDI", country: "South Korea", category: "Battery Cells", rating: 4.7, audits: 11, risk: "Low", certifications: ["UN 38.3", "IEC 62133", "ISO 14001"], fitScore: 94 },
  { name: "Georg Fischer (GF)", country: "Switzerland", category: "Die-Cast Housings", rating: 4.7, audits: 18, risk: "Low", certifications: ["IATF 16949", "EN 9100", "ISO 9001"], fitScore: 95 },
  { name: "Infineon Technologies", country: "Germany", category: "Motor Driver ICs", rating: 4.5, audits: 8, risk: "Medium", certifications: ["AEC-Q100", "IATF 16949", "ISO 9001"], fitScore: 89 },
  { name: "Bossard Group", country: "Switzerland", category: "Assembly Fasteners", rating: 4.6, audits: 12, risk: "Low", certifications: ["VDA 6.3", "EN 15048", "ISO 9001"], fitScore: 93 },
  { name: "Mabuchi Motor", country: "Japan", category: "DC Motors", rating: 4.4, audits: 9, risk: "Low", certifications: ["IEC 60034", "ISO 9001", "IATF 16949"], fitScore: 88 },
  { name: "NSK Ltd", country: "Japan", category: "Bearings", rating: 4.8, audits: 22, risk: "Low", certifications: ["ISO 9001", "IATF 16949", "ISO 14001"], fitScore: 96 },
  { name: "BASF Engineering", country: "Germany", category: "PA66-GF Compounds", rating: 4.5, audits: 15, risk: "Low", certifications: ["ISO 9001", "REACH", "UL 94"], fitScore: 91 },
  { name: "Murata Manufacturing", country: "Japan", category: "Sensors & Capacitors", rating: 4.6, audits: 10, risk: "Low", certifications: ["AEC-Q200", "ISO 9001", "IATF 16949"], fitScore: 92 },
  { name: "Johnson Electric", country: "Hong Kong", category: "Motor Assemblies", rating: 4.3, audits: 7, risk: "Medium", certifications: ["IEC 60034", "ISO 9001", "ISO 14001"], fitScore: 85 },
];

const stats = [
  { label: "Component suppliers indexed", value: "11,355+", icon: Shield },
  { label: "Countries", value: "68", icon: Globe },
  { label: "Completed Audits", value: "28,400+", icon: CheckCircle2 },
  { label: "Component Groups", value: "340+", icon: Database },
];

const SupplierDatabaseDemo = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
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
        {/* Header */}
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

        {/* Demo Window */}
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
  const menuItems = ["Dashboard", "Database", "Saved Lists", "RFQ Manager", "Purchase Orders", "Reports"];

  return (
    <div className="bg-[hsl(0,0%,85%)] overflow-hidden border border-[hsl(0,0%,80%)] flex flex-col relative">
      {/* Window title bar */}
      <div className="h-8 bg-[hsl(0,0%,88%)] flex items-center px-3 border-b border-[hsl(0,0%,80%)] flex-shrink-0">
        <span className="text-[10px] text-[hsl(0,0%,35%)] font-medium">Hilti Component Supplier Database — 11,355 Suppliers · 68 Countries</span>
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
        {/* Left sidebar */}
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
                  <span className="font-bold text-primary">Fit Score</span> — AI-calculated match based on certifications, audit history, production capacity, and Hilti component requirements. <span className="font-semibold text-primary">Click a supplier for full profile.</span>
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
                            ? 'bg-secondary/10 text-secondary' 
                            : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                        }`}>
                          {s.risk} risk
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDatabaseDemo;
