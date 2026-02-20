import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Search, ChevronDown, ChevronRight, Shield, 
  MapPin, BarChart3, Globe, Zap, CheckCircle2,
  Factory, Flame, Gauge, Wrench, Box, Cable
} from "lucide-react";
import SupplierBenchmarkModal from "./SupplierBenchmarkModal";
import SupplierProfileModal from "./SupplierProfileModal";

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
    <section className="py-24 md:py-32 bg-[hsl(var(--hero-background))] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="section-eyebrow text-[hsl(var(--accent))] mb-4 font-mono tracking-[0.2em]">
            VISION — RCA SUPPLIER DATABASE
          </p>
          <h2 className="section-headline text-white mb-6">
            Full EPC Supplier Coverage.<br />
            <span className="text-[hsl(var(--accent))]">One Integrated Data Layer.</span>
          </h2>
          <p className="text-[hsl(var(--slate))] text-lg max-w-3xl mx-auto">
            Structured supplier data for Oil & Gas, LNG, and Energy — 
            search results, audit findings, and technical portfolio analysis in one system.
          </p>
        </motion.div>

        {/* Vision Label */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px flex-1 max-w-[80px] bg-[hsl(var(--accent))]/30" />
          <span className="text-[10px] font-mono text-[hsl(var(--accent))]/60 uppercase tracking-[0.3em]">Target Architecture</span>
          <div className="h-px flex-1 max-w-[80px] bg-[hsl(var(--accent))]/30" />
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-sm p-5 text-center">
              <stat.icon className="w-5 h-5 text-[hsl(var(--accent))] mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-medium text-white font-mono">{stat.value}</div>
              <div className="text-xs text-[hsl(var(--slate))] mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Demo Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden"
        >
          {/* Toolbar */}
          <div className="border-b border-white/10 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--slate))]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by supplier, product group, certification..."
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[hsl(var(--slate))] focus:outline-none focus:border-[hsl(var(--accent))]/50"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: "all", label: "All" },
                { key: "low-risk", label: "Low Risk" },
                { key: "high-fit", label: "Fit ≥ 90%" },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedFilter === f.key 
                      ? 'bg-[hsl(var(--accent))] text-black' 
                      : 'bg-white/5 text-[hsl(var(--slate))] hover:bg-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left: Categories */}
            <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-white/10 p-4">
              <p className="text-xs text-[hsl(var(--slate))] uppercase tracking-wider mb-3 font-mono">Product Groups</p>
              <div className="space-y-1">
                {categoryData.map((cat, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all ${
                        expandedCategory === i 
                          ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' 
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <cat.icon className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{cat.name}</div>
                        <div className="text-[10px] text-[hsl(var(--slate))] font-mono">{cat.suppliers} suppliers</div>
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
                              <div key={j} className="text-xs text-[hsl(var(--slate))] py-1 px-2 hover:text-[hsl(var(--accent))] cursor-pointer transition-colors">
                                {sub}
                              </div>
                            ))}
                            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
                              <div className="text-[10px] text-[hsl(var(--slate))]">
                                <span className="text-[hsl(var(--accent))]">{cat.audited}%</span> audited
                              </div>
                              <div className="text-[10px] text-[hsl(var(--slate))]">
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
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal">Supplier</th>
                    <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden md:table-cell">Product Group</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal">Rating</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden lg:table-cell">Audits</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden md:table-cell">Risk</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal">Fit</th>
                    <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden xl:table-cell">Certifications</th>
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
                      className={`border-b border-white/5 cursor-pointer transition-all ${
                        hoveredRow === i ? 'bg-[hsl(var(--accent))]/5' : ''
                      }`}
                    >
                      <td className="p-3">
                        <div className="text-white font-medium text-sm">{s.name}</div>
                        <div className="text-[10px] text-[hsl(var(--slate))] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {s.country}
                        </div>
                      </td>
                      <td className="p-3 text-[hsl(var(--slate))] text-xs hidden md:table-cell">{s.category}</td>
                      <td className="p-3 text-center">
                        <span className="text-[hsl(var(--warning))] font-mono text-sm">★ {s.rating}</span>
                      </td>
                      <td className="p-3 text-center text-[hsl(var(--slate))] font-mono text-xs hidden lg:table-cell">{s.audits}</td>
                      <td className="p-3 text-center hidden md:table-cell">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
                          s.risk === "Low" 
                            ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' 
                            : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                        }`}>
                          {s.risk}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[hsl(var(--accent))] rounded-full" 
                              style={{ width: `${s.fitScore}%` }} 
                            />
                          </div>
                          <span className="text-[hsl(var(--accent))] font-mono text-xs">{s.fitScore}%</span>
                        </div>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {s.certifications.slice(0, 3).map((c, j) => (
                            <span key={j} className="text-[10px] bg-white/5 text-[hsl(var(--slate))] px-1.5 py-0.5 rounded-sm font-mono">
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
              <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[hsl(var(--slate))]">
                  Showing <span className="text-white font-mono">{filteredSuppliers.length}</span> of <span className="text-white font-mono">11,270</span> records
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--slate))]">
                    <Zap className="w-3 h-3 text-[hsl(var(--accent))]" />
                    Portfolio matching active
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--slate))]">
                    <BarChart3 className="w-3 h-3 text-[hsl(var(--accent))]" />
                    28,400+ audit data points
                  </div>
                </div>
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
        supplier={selectedSupplier}
      />
    </section>
  );
};

export default SupplierDatabaseDemo;
