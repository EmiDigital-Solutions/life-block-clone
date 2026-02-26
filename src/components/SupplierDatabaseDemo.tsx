import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Search, ChevronDown, ChevronRight, Shield, 
  MapPin, BarChart3, Globe, Zap, CheckCircle2,
  Factory, Flame, Gauge, Wrench, Box, Cable
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
    <section data-nav-theme="light" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          {/* Header — matching AtlasAI grid layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-start-2 lg:col-span-5 mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">
                {t.supplierDb.eyebrow}
              </span>
            </div>
            <h2 className="section-headline text-foreground mb-6">
              {t.supplierDb.headline1}<br />
              <span className="text-foreground/50">{t.supplierDb.headline2}</span>
            </h2>
            <p className="text-lg text-foreground/50 max-w-xl">
              {t.supplierDb.subtitle}
            </p>
          </motion.div>

          {/* Stats row — matching AtlasAI feature cards exactly */}
          <div className="lg:col-start-2 lg:col-span-5 mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t-2 border-foreground/10 pt-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-foreground/40" />
                    <span className="text-sm text-foreground/50">{stat.label}</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-start-2 lg:col-span-5 border border-foreground/10 overflow-hidden bg-white"
          >
          {/* Toolbar */}
          <div className="border-b border-foreground/10 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.supplierDb.searchPlaceholder}
                className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30"
              />
            </div>
            <div className="flex gap-px bg-foreground/10">
              {[
                { key: "all", label: t.supplierDb.filterAll },
                { key: "low-risk", label: t.supplierDb.filterLowRisk },
                { key: "high-fit", label: t.supplierDb.filterHighFit },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-all ${
                    selectedFilter === f.key 
                      ? 'bg-foreground text-background' 
                      : 'bg-white text-foreground/40 hover:text-foreground'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left: Categories */}
            <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-foreground/10 p-4">
              <p className="text-xs text-foreground/40 uppercase tracking-[0.15em] mb-3 font-medium">{t.supplierDb.productGroups}</p>
              <div className="space-y-0.5">
                {categoryData.map((cat, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all ${
                        expandedCategory === i 
                          ? 'bg-foreground/[0.04] text-foreground' 
                          : 'text-foreground/50 hover:text-foreground hover:bg-foreground/[0.02]'
                      }`}
                    >
                      <cat.icon className="w-4 h-4 flex-shrink-0 text-foreground/40" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{cat.name}</div>
                        <div className="text-xs text-foreground/40">{cat.suppliers} {t.supplierDb.suppliers}</div>
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
                          <div className="pl-10 py-1 space-y-0.5">
                            {cat.subcategories.map((sub, j) => (
                              <div key={j} className="text-sm text-foreground/40 py-1 px-2 hover:text-foreground cursor-pointer transition-colors">
                                {sub}
                              </div>
                            ))}
                            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-foreground/10">
                              <div className="text-xs text-foreground/40">
                                <span className="text-foreground font-medium">{cat.audited}%</span> {t.supplierDb.audited}
                              </div>
                              <div className="text-xs text-foreground/40">
                                Avg <span className="text-[hsl(var(--warning))]">★ {cat.avgRating}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Supplier Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium">{t.supplierDb.thSupplier}</th>
                    <th className="text-left p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium hidden md:table-cell">{t.supplierDb.thProductGroup}</th>
                    <th className="text-center p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium">{t.supplierDb.thRating}</th>
                    <th className="text-center p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium hidden lg:table-cell">{t.supplierDb.thAudits}</th>
                    <th className="text-center p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium hidden md:table-cell">{t.supplierDb.thRisk}</th>
                    <th className="text-center p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium">{t.supplierDb.thFit}</th>
                    <th className="text-left p-3 text-xs text-foreground/40 uppercase tracking-[0.15em] font-medium hidden xl:table-cell">{t.supplierDb.thCertifications}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((s, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => { setSelectedSupplier(s); setProfileOpen(true); }}
                      className={`border-b border-foreground/5 cursor-pointer transition-all ${
                        hoveredRow === i ? 'bg-foreground/[0.03]' : ''
                      }`}
                    >
                      <td className="p-3">
                        <div className="text-foreground font-medium text-sm">{s.name}</div>
                        <div className="text-xs text-foreground/40 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {s.country}
                        </div>
                      </td>
                      <td className="p-3 text-foreground/50 text-sm hidden md:table-cell">{s.category}</td>
                      <td className="p-3 text-center">
                        <span className="text-[hsl(var(--warning))] text-sm">★ {s.rating}</span>
                      </td>
                      <td className="p-3 text-center text-foreground/50 text-sm hidden lg:table-cell">{s.audits}</td>
                      <td className="p-3 text-center hidden md:table-cell">
                        <span className={`text-xs font-medium px-2 py-0.5 ${
                          s.risk === "Low" 
                            ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' 
                            : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                        }`}>
                          {s.risk}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-12 h-1 bg-foreground/10 overflow-hidden">
                            <div 
                              className="h-full bg-foreground" 
                              style={{ width: `${s.fitScore}%` }} 
                            />
                          </div>
                          <span className="text-foreground text-xs">{s.fitScore}%</span>
                        </div>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {s.certifications.slice(0, 3).map((c, j) => (
                            <span key={j} className="text-xs bg-foreground/[0.04] text-foreground/50 px-1.5 py-0.5 border border-foreground/10">
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Status Bar */}
              <div className="border-t border-foreground/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-sm text-foreground/50">
                  {t.supplierDb.showing} <span className="text-foreground font-medium">{filteredSuppliers.length}</span> {t.supplierDb.of} <span className="text-foreground font-medium">11,270</span> {t.supplierDb.records}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/40">
                    <Zap className="w-3 h-3 text-foreground/30" />
                    {t.supplierDb.portfolioMatching}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/40">
                    <BarChart3 className="w-3 h-3 text-foreground/30" />
                    {t.supplierDb.auditDataPoints}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
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

export default SupplierDatabaseDemo;
