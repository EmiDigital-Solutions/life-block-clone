import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Search, ChevronDown, ChevronRight, Shield, 
  MapPin, BarChart3, Globe, Zap, CheckCircle2,
  Factory, Flame, Gauge, Wrench, Box, Cable,
  Clock, AlertTriangle, Lock, CheckCircle, Bot, RefreshCw, GitBranch
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
            {t.supplierDb.eyebrow}
          </p>
          <h2 className="section-headline text-white mb-6">
            {t.supplierDb.headline1}<br />
            <span className="text-[hsl(var(--accent))]">{t.supplierDb.headline2}</span>
          </h2>
          <p className="text-[hsl(var(--slate))] text-lg max-w-3xl mx-auto">
            {t.supplierDb.subtitle}
          </p>
        </motion.div>

        {/* Vision Label */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px flex-1 max-w-[80px] bg-[hsl(var(--accent))]/30" />
          <span className="text-[10px] font-mono text-[hsl(var(--accent))]/60 uppercase tracking-[0.3em]">{t.supplierDb.targetArch}</span>
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
                placeholder={t.supplierDb.searchPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[hsl(var(--slate))] focus:outline-none focus:border-[hsl(var(--accent))]/50"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: "all", label: t.supplierDb.filterAll },
                { key: "low-risk", label: t.supplierDb.filterLowRisk },
                { key: "high-fit", label: t.supplierDb.filterHighFit },
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
              <p className="text-xs text-[hsl(var(--slate))] uppercase tracking-wider mb-3 font-mono">{t.supplierDb.productGroups}</p>
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
                        <div className="text-[10px] text-[hsl(var(--slate))]">{cat.suppliers} {t.supplierDb.suppliers}</div>
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
                                <span className="text-[hsl(var(--accent))]">{cat.audited}%</span> {t.supplierDb.audited}
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
                    <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal">{t.supplierDb.thSupplier}</th>
                    <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden md:table-cell">{t.supplierDb.thProductGroup}</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal">{t.supplierDb.thRating}</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden lg:table-cell">{t.supplierDb.thAudits}</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden md:table-cell">{t.supplierDb.thRisk}</th>
                    <th className="text-center p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal">{t.supplierDb.thFit}</th>
                    <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal hidden xl:table-cell">{t.supplierDb.thCertifications}</th>
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
                  {t.supplierDb.showing} <span className="text-white font-mono">{filteredSuppliers.length}</span> {t.supplierDb.of} <span className="text-white font-mono">11,270</span> {t.supplierDb.records}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--slate))]">
                    <Zap className="w-3 h-3 text-[hsl(var(--accent))]" />
                    {t.supplierDb.portfolioMatching}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--slate))]">
                    <BarChart3 className="w-3 h-3 text-[hsl(var(--accent))]" />
                    {t.supplierDb.auditDataPoints}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ SUPPLIER DIGITAL TWIN DEEP-DIVE ═══ */}
        <div className="mt-24 pt-20 border-t border-white/10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[hsl(var(--accent))]/60 mb-4">
              Supplier Digital Twin Architecture
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-4">
              3 Layers of the Twin
            </h3>
            <p className="text-[hsl(var(--slate))] text-base max-w-2xl leading-relaxed">
              Every supplier is represented as a structured, living digital twin — from identity foundation to operational truth to decision-ready intelligence.
            </p>
          </motion.div>

          {/* ─── Layer 1: Identity Twin ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-sm bg-[hsl(var(--accent))]/10 flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-[hsl(var(--accent))]">1</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Identity Twin</h4>
                <p className="text-xs text-[hsl(var(--slate))]">Who is the supplier? — The foundation layer</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {[
                "Legal entity · Ownership",
                "Plants · Production sites (Geo-Map)",
                "Contacts + Roles (Sales, QA, Eng., SCM)",
                "Product & service portfolio",
                "Certifications (ISO, IATF, ASME, PED)",
                "Markets · Industries · Regions",
                "Machine park (high-level)",
                "Languages · Export capability · Incoterms",
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm p-3">
                  <span className="text-xs text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[hsl(var(--slate))]/60 mt-3 font-mono">Foundation layer — not the final decision layer</p>
          </motion.div>

          {/* ─── Layer 2: Operational Twin ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-sm bg-[hsl(var(--accent))]/10 flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-[hsl(var(--accent))]">2</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Operational Twin</h4>
                <p className="text-xs text-[hsl(var(--slate))]">How does the supplier actually work? — The differentiator</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { title: "Capacity", desc: "Theoretical vs realistic · Utilization windows" },
                { title: "Lead Times", desc: "Historical + current · OTD / quality trends" },
                { title: "Process Maturity", desc: "Per step: Welding, Machining, Assembly, Testing" },
                { title: "Bottleneck Resources", desc: "Machines · Personnel · Test rigs" },
                { title: "Subsupplier Dependencies", desc: "Critical path · Single-source risks" },
                { title: "Documentation Quality", desc: "Traceability · QA/QC org · Escalation capability" },
                { title: "Shopfloor Discipline", desc: "Housekeeping · Maintenance · 5S (via audit/photo data)" },
                { title: "Change Management", desc: "Agility to respond to scope changes" },
                { title: "Rework Zones", desc: "Error focus areas · Failure modes" },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm p-3">
                  <span className="text-xs font-semibold text-white">{item.title}</span>
                  <p className="text-[10px] text-[hsl(var(--slate))] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
              <span className="text-[11px] text-[hsl(var(--accent))] font-medium">Not self-declared — AI-guided, on-site verified operational truth</span>
            </div>
          </motion.div>

          {/* ─── Layer 3: Decision Twin ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-sm bg-[hsl(var(--accent))]/10 flex items-center justify-center">
                <span className="text-sm font-mono font-bold text-[hsl(var(--accent))]">3</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">Decision Twin</h4>
                <p className="text-xs text-[hsl(var(--slate))]">How well does the supplier fit my requirement? — The game changer</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {[
                { title: "Fit-to-Requirement Score", desc: "Per concrete RFQ / package" },
                { title: "Risk Score", desc: "Qualitative + quantitative, explainable" },
                { title: "Cost Competitiveness", desc: "TCO hypothesis, not just unit price" },
                { title: "Ramp-up Capability", desc: "Project risk for EPC / series start" },
                { title: "Compliance Fit", desc: "Standard coverage vs scope requirements" },
                { title: "Regional / Geo Risk", desc: "Sanctions · Logistics · Political stability" },
                { title: "Comparison", desc: "Against reference supplier · Best use cases" },
                { title: "AI Recommendation", desc: "Use · Use with conditions · Develop first · Not for critical scope" },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm p-3">
                  <span className="text-xs font-semibold text-white">{item.title}</span>
                  <p className="text-[10px] text-[hsl(var(--slate))] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/20 rounded-sm p-4">
              <p className="text-xs text-[hsl(var(--accent))] font-medium">Not just a profile — a decision copilot for procurement.</p>
            </div>
          </motion.div>

          {/* ═══ ADVANCED MODULES ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-[hsl(var(--accent))]/30" />
              <span className="text-[10px] font-mono text-[hsl(var(--accent))]/60 uppercase tracking-[0.3em]">Advanced Twin Modules</span>
              <div className="h-px flex-1 max-w-[40px] bg-[hsl(var(--accent))]/30" />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">
              State-of-the-art twin capabilities
            </h3>
            <p className="text-[hsl(var(--slate))] text-sm max-w-2xl">
              Beyond standard profiles — modular intelligence layers that make the twin reasoning-ready, auditable, and enterprise-trusted.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
            {[
              {
                icon: GitBranch,
                title: "360° Supplier Knowledge Graph",
                desc: "Supplier as a relationship graph: entities ↔ sites ↔ processes ↔ machines ↔ certifications ↔ subsuppliers ↔ audits ↔ NCR patterns. AI reasons on connections.",
              },
              {
                icon: Clock,
                title: "Time Machine / Evolution Layer",
                desc: "Timeline of audits, cert changes, performance trends, CAPA history, capacity shifts, management changes. AI summarizes what improved or deteriorated.",
              },
              {
                icon: Shield,
                title: "Evidence Vault / Ground Truth",
                desc: "Audit photos (geotagged), documents, interview transcripts, checklists, measurements. Every field has confidence status: self-declared → document-verified → on-site verified → AI-inferred.",
              },
              {
                icon: Gauge,
                title: "Capability DNA / Manufacturing Model",
                desc: "Materials · Thickness ranges · Tolerances · NDT · Welding · Heat treatment · Machining envelope. Scored 1–5 with confidence + evidence links.",
              },
              {
                icon: Factory,
                title: "Process Digital Twin",
                desc: "Order intake → engineering → planning → procurement → production → inspection → dispatch. Bottlenecks, quality gates, rework zones, delay root causes.",
              },
              {
                icon: AlertTriangle,
                title: "Dynamic Risk Twin",
                desc: "Quality · Delivery · Capacity · Financial · Compliance · ESG · Geo · Subsupplier dependency risk. Explainable drivers, early warnings, mitigations.",
              },
              {
                icon: BarChart3,
                title: "Commercial / Procurement Intelligence",
                desc: "Should-cost indicators · Cost driver map · MOQ behavior · Negotiation levers · TCO analysis. Not just unit price — total cost of ownership.",
              },
              {
                icon: CheckCircle,
                title: "Compliance & Standards Twin",
                desc: "Standard ↔ requirement matrix (ASME, API, PED). Fulfilled / partial / unclear / not fulfilled per requirement. Audit findings by standard chapter.",
              },
              {
                icon: RefreshCw,
                title: "NCR / CAPA Intelligence",
                desc: "Issue history · Repeat patterns · CAPA closure quality · Root cause maturity · Time-to-close. AI suggests preventive controls for similar scope.",
              },
              {
                icon: MapPin,
                title: "Digital Site Shadow",
                desc: "Plant layout with clickable production zones · Equipment map · Safety/quality hotspots · Audit route replay. Visual operational context.",
              },
              {
                icon: Search,
                title: "Supplier Fit Simulator",
                desc: "Upload spec/RFQ → twin evaluates: technical fit, process fit, quality fit, compliance fit, capacity fit, risk fit. Output: score, gaps, mitigations, qualification effort.",
              },
              {
                icon: Bot,
                title: "AI Agent Layer",
                desc: "Atlas Auditor Copilot · Procurement Decision Copilot · Supplier Development Copilot · Expediting/Inspection Copilot. Context-aware, evidence-referenced reasoning.",
              },
            ].map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/[0.03] border border-white/5 rounded-sm p-4 hover:border-[hsl(var(--accent))]/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <mod.icon className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">{mod.title}</h5>
                    <p className="text-[11px] text-[hsl(var(--slate))] leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ═══ TRUST & EXPLAINABILITY ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[hsl(var(--accent))]" />
              Trust, Provenance & Explainability
            </h4>
            <div className="bg-white/[0.03] border border-white/5 rounded-sm p-5">
              <p className="text-xs text-[hsl(var(--slate))] mb-4 leading-relaxed">
                Every insight has: source · timestamp · confidence · verification status · reasoning logic. Enterprise-ready auditability.
              </p>
              <div className="bg-white/[0.02] rounded-sm p-4 font-mono text-[11px] text-white/60 leading-relaxed border border-white/5">
                <p className="text-[hsl(var(--warning))]">Delivery risk = High (82/100)</p>
                <p className="mt-1">Drivers: rising utilization, OTD decline, 2 open CAPAs, subsupplier dependency on critical component</p>
                <p className="mt-1">Confidence: Medium-High</p>
                <p className="mt-1 text-[hsl(var(--accent))]">Evidence: RCA audit 2026-01-14, OTD trend Q4, supplier interview</p>
              </div>
            </div>
          </motion.div>

          {/* ═══ "WOW" INDICATORS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Twin Quality & Intelligence Indicators</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                "Twin Health Score",
                "Data Freshness Meter",
                "Evidence Coverage Score",
                "Contradiction Detector",
                "Twin Confidence Index",
                "Requalification Triggers",
                "Scenario Mode (What-if)",
                "Supplier DNA Fingerprint",
                "Peer Benchmark (anonymized)",
                "Board Memo Generator",
              ].map((label, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm px-3 py-2.5 text-center">
                  <span className="text-[11px] text-white/70 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══ UX VIEWS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Role-based Twin Views</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {[
                { role: "Executive", items: "Fit score · Risk radar · Capability summary · Recommended action" },
                { role: "Engineer / QA", items: "Process capabilities · Machines · Quality gaps · Evidence explorer" },
                { role: "Procurement", items: "Commercial fit · Lead time · Risk vs cost · Negotiation levers" },
                { role: "Audit", items: "Last audits · Findings · Evidence scoring · Reaudit triggers" },
                { role: "AI Chat", items: "Ask the twin: capacity questions, risk queries, comparisons" },
              ].map((v, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm p-3">
                  <span className="text-xs font-bold text-[hsl(var(--accent))]">{v.role}</span>
                  <p className="text-[10px] text-[hsl(var(--slate))] mt-1">{v.items}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══ PHASED ROLLOUT ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h4 className="text-lg font-semibold text-white mb-6">Modular Rollout Roadmap</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  phase: "Phase 1 — MVP+",
                  items: ["Identity + site map", "Capability matrix (1–5)", "Certifications + expiry", "Audit findings + evidence vault", "Verification status", "Risk score (basic)", "AI summary + recommendation", "Supplier comparison"],
                },
                {
                  phase: "Phase 2 — Differentiation",
                  items: ["Time-series twin", "Compliance mapping by scope", "CAPA/NCR intelligence", "Regional risk layer", "Capacity & lead-time intelligence", "Fit-to-RFQ simulator", "Role-based views"],
                },
                {
                  phase: "Phase 3 — Category-defining",
                  items: ["Knowledge graph reasoning", "Predictive risk forecasting", "AI onboarding plan generator", "Supplier development copilot", "Portfolio-level benchmarking", "Autonomous monitoring + alerts"],
                },
              ].map((p, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-sm p-4">
                  <p className="text-xs font-bold text-[hsl(var(--accent))] mb-3 font-mono uppercase tracking-wider">{p.phase}</p>
                  <div className="space-y-1.5">
                    {p.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[hsl(var(--accent))]/50 mt-0.5 shrink-0" />
                        <span className="text-[11px] text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══ POSITIONING STATEMENT ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-12"
          >
            <div className="max-w-2xl">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--accent))]/60 mb-4">Positioning</p>
              <p className="text-xl md:text-2xl font-medium text-white leading-[1.3] mb-4">
                From supplier profiles to <span className="text-[hsl(var(--accent))]">verified supplier digital twins</span> — built for AI-native procurement decisions.
              </p>
              <p className="text-xs text-[hsl(var(--slate))] leading-relaxed">
                A normal profile says: "Supplier has ISO 9001 and 200 employees."
                A verified digital twin says: "Supplier is technically suitable for your scope, but with high ramp-up risk due to NDT bottleneck and weak documentation discipline; with additional QA gate and pre-FAI, project risk reduces significantly."
              </p>
              <p className="text-[10px] text-[hsl(var(--slate))]/50 mt-4 font-mono">
                That is the difference between data and decision competence.
              </p>
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
