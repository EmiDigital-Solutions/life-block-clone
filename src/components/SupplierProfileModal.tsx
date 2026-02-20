import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Shield, MapPin, Globe, Factory, ChevronDown, ChevronRight,
  FileCheck, AlertTriangle, CheckCircle2, Clock, Lock, Zap,
  BarChart3, TrendingUp, Wrench, Database, Eye, ExternalLink,
  Building2, Users, Gauge, Flame, Cable, Box, Star, FileText,
  ShieldCheck, Activity, DollarSign, Scale, Truck, Archive,
  Fingerprint, Cpu, Leaf, Camera, BookOpen
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SupplierProfile {
  name: string;
  country: string;
  category: string;
  rating: number;
  audits: number;
  risk: string;
  certifications: string[];
  fitScore: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: SupplierProfile | null;
}

// Section navigation tabs
const profileSections = [
  { id: "identity", label: "Identity", icon: Fingerprint },
  { id: "capability", label: "Capabilities", icon: Wrench },
  { id: "products", label: "Products", icon: Box },
  { id: "quality", label: "Quality", icon: ShieldCheck },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "commercial", label: "Commercials", icon: DollarSign },
  { id: "risk", label: "Risk Layer", icon: AlertTriangle },
  { id: "documents", label: "Doc Vault", icon: Archive },
  { id: "provenance", label: "Trust", icon: Eye },
  { id: "outputs", label: "AI Outputs", icon: Zap },
];

// Maturity score badge
const MaturityBadge = ({ score, label }: { score: number; label: string }) => {
  const colors = [
    "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]",
    "bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))]",
    "bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]",
  ];
  return (
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${colors[score - 1]}`}>
        {score}/5
      </span>
      <span className="text-xs text-[hsl(var(--slate))]">{label}</span>
    </div>
  );
};

// Verification badge
const VerificationTag = ({ status }: { status: "verified" | "partial" | "unverified" }) => {
  const config = {
    verified: { icon: CheckCircle2, text: "Verified", cls: "text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10" },
    partial: { icon: Clock, text: "Partial", cls: "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10" },
    unverified: { icon: AlertTriangle, text: "Unverified", cls: "text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-sm ${c.cls}`}>
      <c.icon className="w-3 h-3" /> {c.text}
    </span>
  );
};

// Data row component
const DataRow = ({ label, value, verification, mono }: { label: string; value: string; verification?: "verified" | "partial" | "unverified"; mono?: boolean }) => (
  <div className="flex items-start justify-between py-2 border-b border-white/5 last:border-0">
    <span className="text-[11px] text-[hsl(var(--slate))] uppercase tracking-wider">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`text-sm text-white ${mono ? 'font-mono' : ''}`}>{value}</span>
      {verification && <VerificationTag status={verification} />}
    </div>
  </div>
);

// Section card wrapper
const ProfileSection = ({ title, icon: Icon, children, id }: { title: string; icon: any; children: React.ReactNode; id: string }) => (
  <div id={id} className="bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden">
    <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
      <Icon className="w-4 h-4 text-[hsl(var(--accent))]" />
      <h3 className="text-xs font-mono text-[hsl(var(--accent))] uppercase tracking-[0.15em]">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const SupplierProfileModal = ({ open, onOpenChange, supplier }: Props) => {
  const [activeSection, setActiveSection] = useState("identity");

  if (!supplier) return null;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(`profile-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-6xl max-h-[92vh] overflow-hidden p-0 gap-0 bg-[hsl(var(--hero-background))] border-white/10">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] uppercase tracking-[0.2em] mb-2">
                AI-Native Supplier Profile — Digital Twin
              </p>
              <h2 className="text-2xl font-medium text-white">{supplier.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-[hsl(var(--slate))] flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {supplier.country}
                </span>
                <span className="text-sm text-[hsl(var(--slate))]">{supplier.category}</span>
                <span className="text-[hsl(var(--warning))] font-mono text-sm">★ {supplier.rating}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
                  supplier.risk === "Low"
                    ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]'
                    : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                }`}>{supplier.risk} Risk</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono text-[hsl(var(--accent))] font-medium">{supplier.fitScore}%</div>
              <div className="text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider">AI Fit Score</div>
            </div>
          </div>

          {/* Section nav */}
          <div className="flex gap-1 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {profileSections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeSection === s.id
                    ? 'bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))]'
                    : 'text-[hsl(var(--slate))] hover:bg-white/5'
                }`}
              >
                <s.icon className="w-3 h-3" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 space-y-4 max-h-[calc(92vh-200px)]">

          {/* 1. Identity */}
          <ProfileSection title="Identity + Single Source of Truth" icon={Fingerprint} id="profile-identity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-1">
                <DataRow label="Legal Name" value={supplier.name} verification="verified" />
                <DataRow label="Trade Name" value={supplier.name.split(" ")[0]} verification="verified" />
                <DataRow label="Canonical ID" value={`SUP-${Math.floor(Math.random() * 90000 + 10000)}`} mono verification="verified" />
                <DataRow label="D-U-N-S" value="31-561-7842" mono verification="verified" />
                <DataRow label="VAT / Tax ID" value="DE814156529" mono verification="verified" />
                <DataRow label="LEI" value="529900NXKHV4P5GV8X06" mono verification="partial" />
              </div>
              <div className="space-y-1">
                <DataRow label="UBO" value="Parent Corp (89.4%)" verification="verified" />
                <DataRow label="HQ" value={`${supplier.country} · +01:00 UTC`} verification="verified" />
                <DataRow label="Sites" value="3 manufacturing, 2 service" verification="partial" />
                <DataRow label="KYC/KYB Status" value="Cleared" verification="verified" />
                <DataRow label="Ownership Tier" value="Public Listed" verification="verified" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/[0.03] border border-white/5 rounded-sm">
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] mb-1">AI-NATIVE KEYS</p>
              <div className="flex flex-wrap gap-2">
                {["supplier_id: SUP-47291", "site_id: SITE-001…003", "product_family_id: PF-ROT-EQ", "alias_table: 4 entries"].map(k => (
                  <span key={k} className="text-[10px] font-mono bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] px-2 py-0.5 rounded-sm">{k}</span>
                ))}
              </div>
            </div>
          </ProfileSection>

          {/* 2. Capabilities */}
          <ProfileSection title="Capability Truth — What They Actually Do" icon={Wrench} id="profile-capability">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {["CNC Machining", "Precision Casting", "TIG/MIG Welding", "Heat Treatment", "Surface Finishing", "NDT (UT/RT/MT)", "CMM Metrology", "Assembly & Test"].map(cap => (
                <div key={cap} className="bg-white/5 border border-white/10 rounded-sm p-3 text-center">
                  <CheckCircle2 className="w-3 h-3 text-[hsl(var(--accent))] mx-auto mb-1" />
                  <span className="text-[11px] text-white">{cap}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <DataRow label="Machine Park" value="42 CNC, 8 lathes, 3 5-axis" verification="verified" />
              <DataRow label="Tolerance Class" value="IT6 / ±0.01mm" mono verification="verified" />
              <DataRow label="Max Workpiece" value="Ø 2400mm × 6000mm" mono verification="partial" />
              <DataRow label="CAD/CAE" value="NX, CATIA V5, SolidWorks" verification="verified" />
              <DataRow label="Special Processes" value="WPS/PQR 48 qualified, NADCAP pending" verification="partial" />
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-mono text-[hsl(var(--slate))] uppercase mb-2">Key Personnel Depth</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: "Welding Engineer", count: 3 },
                  { role: "NDT Level III", count: 2 },
                  { role: "Quality Manager", count: 1 },
                  { role: "Metallurgist", count: 1 },
                  { role: "Project Eng.", count: 4 },
                  { role: "Design Eng.", count: 6 },
                ].map(p => (
                  <div key={p.role} className="flex items-center justify-between bg-white/[0.03] px-3 py-1.5 rounded-sm">
                    <span className="text-[11px] text-[hsl(var(--slate))]">{p.role}</span>
                    <span className="text-xs font-mono text-white">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </ProfileSection>

          {/* 3. Products */}
          <ProfileSection title="Product + Scope Clarity" icon={Box} id="profile-products">
            <div className="space-y-1 mb-4">
              <DataRow label="Product Families" value="Centrifugal Compressors, Pumps, Turbines" verification="verified" />
              <DataRow label="Material Grades" value="SS 316L, Inconel 625, Duplex 2205, CS A105" verification="verified" />
              <DataRow label="Pressure Class" value="API 150–2500 / ASME Class III" mono verification="verified" />
              <DataRow label="Temp Range" value="−196°C to +540°C" mono verification="partial" />
              <DataRow label="Dimensional Envelope" value="DN 25 – DN 900 / up to 30t unit weight" mono verification="verified" />
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-sm">
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] mb-2">CTQ CHARACTERISTICS</p>
              <div className="grid grid-cols-2 gap-2">
                {["Impeller balance G2.5", "Shaft runout ≤0.02mm", "Bearing clearance ISO 286", "Seal face flatness 0.3µm", "Vibration API 617 limit", "Hydro test 1.5×MAWP"].map(ctq => (
                  <div key={ctq} className="text-[11px] text-[hsl(var(--slate))] flex items-center gap-1.5">
                    <Gauge className="w-3 h-3 text-[hsl(var(--accent))]" /> {ctq}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 p-3 bg-white/[0.03] border border-white/5 rounded-sm">
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] mb-1">INDUSTRY REFERENCES</p>
              <div className="flex flex-wrap gap-2">
                {["LNG/FLNG", "Offshore O&G", "Petrochemical", "Power Generation", "Hydrogen"].map(ind => (
                  <span key={ind} className="text-[10px] bg-white/5 text-white px-2 py-0.5 rounded-sm">{ind}</span>
                ))}
              </div>
            </div>
          </ProfileSection>

          {/* 4. Quality */}
          <ProfileSection title="Quality System + Audit-Ready Maturity" icon={ShieldCheck} id="profile-quality">
            <div className="flex flex-wrap gap-2 mb-4">
              {[...supplier.certifications, "ISO 14001", "ISO 45001", "ISO 3834-2", "PED 2014/68/EU"].map(cert => (
                <span key={cert} className="text-[10px] font-mono bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] px-2 py-1 rounded-sm border border-[hsl(var(--accent))]/20">
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-[10px] font-mono text-[hsl(var(--slate))] uppercase mb-2">Maturity Scoring</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              <MaturityBadge score={5} label="Process" />
              <MaturityBadge score={4} label="Quality System" />
              <MaturityBadge score={4} label="Delivery" />
              <MaturityBadge score={3} label="Documentation" />
              <MaturityBadge score={4} label="EHS" />
              <MaturityBadge score={5} label="Traceability" />
            </div>
            <div className="space-y-1">
              <DataRow label="NCR Rate" value="1.2% (12-mo avg)" mono verification="verified" />
              <DataRow label="Rework Rate" value="0.8%" mono verification="verified" />
              <DataRow label="First Pass Yield" value="97.4%" mono verification="partial" />
              <DataRow label="CoPQ" value="~1.1% of revenue" mono verification="partial" />
              <DataRow label="APQP/PPAP" value="Full capability — Level 3 default" verification="verified" />
              <DataRow label="Audit Findings" value={`${supplier.audits} audits · 94% closure rate`} verification="verified" />
            </div>
          </ProfileSection>

          {/* 5. Delivery */}
          <ProfileSection title="Delivery + Capacity + Reliability" icon={Truck} id="profile-delivery">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "OTIF", value: "94.2%", good: true },
                { label: "Avg Lead Time", value: "12 wks", good: true },
                { label: "OEE", value: "78%", good: true },
                { label: "Shift Model", value: "3-shift", good: true },
              ].map(m => (
                <div key={m.label} className="bg-white/5 border border-white/10 rounded-sm p-3 text-center">
                  <div className="text-lg font-mono text-[hsl(var(--accent))]">{m.value}</div>
                  <div className="text-[10px] text-[hsl(var(--slate))] uppercase">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <DataRow label="Bottleneck" value="Heat treatment furnace (max 2 batches/day)" verification="verified" />
              <DataRow label="Expedite Capability" value="Yes — 30% premium, 4-wk reduction" verification="partial" />
              <DataRow label="Sub-tier Risk" value="Castings from 2 tier-2 foundries (medium risk)" verification="partial" />
              <DataRow label="Tooling Strategy" value="In-house tool shop, 12-mo PM cycle" verification="verified" />
            </div>
            <div className="mt-3 p-3 bg-white/[0.03] border border-white/5 rounded-sm">
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] mb-1">SCENARIO FLAG</p>
              <p className="text-[11px] text-[hsl(var(--slate))]">
                If volume doubles → heat treatment becomes critical path (+3 wks). Recommend pre-booking furnace slots or qualifying alternative sub-tier.
              </p>
            </div>
          </ProfileSection>

          {/* 6. Commercials */}
          <ProfileSection title="Structured Commercials" icon={DollarSign} id="profile-commercial">
            <div className="space-y-1">
              <DataRow label="Pricing Model" value="Should-cost + raw material index" verification="verified" />
              <DataRow label="FX Exposure" value="EUR base, USD/CNY hedged quarterly" verification="partial" />
              <DataRow label="Material Pass-through" value="Yes — LME Nickel, Cr, Mo indexed" verification="verified" />
              <DataRow label="Payment Terms" value="Net 60 / 2% discount at Net 10" verification="verified" />
              <DataRow label="Incoterms" value="DAP / FOB available" verification="verified" />
              <DataRow label="MOQ" value="5 units or €50k min order value" mono verification="verified" />
              <DataRow label="Warranty" value="24 months from commissioning" verification="verified" />
              <DataRow label="Claims Handling" value="FIDIC-based, 30-day response SLA" verification="partial" />
            </div>
          </ProfileSection>

          {/* 7. Risk Layer */}
          <ProfileSection title="Risk Layer — Real-Time, Explainable" icon={AlertTriangle} id="profile-risk">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {[
                { label: "Financial", score: "Low", icon: DollarSign, detail: "Strong balance sheet, no payment incidents" },
                { label: "Compliance", score: "Low", icon: Scale, detail: "Clear sanctions, no export flags" },
                { label: "Legal", score: "Low", icon: FileText, detail: "No active litigation" },
                { label: "Operational", score: "Medium", icon: Activity, detail: "Seismic zone 2, single-site for HT" },
                { label: "Cyber", score: "Low", icon: Cpu, detail: "ISO 27001 certified, OT segmented" },
                { label: "ESG", score: "Medium", icon: Leaf, detail: "Scope 1+2 reported, Scope 3 partial" },
              ].map(r => (
                <div key={r.label} className="bg-white/[0.03] border border-white/10 rounded-sm p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <r.icon className="w-3 h-3 text-[hsl(var(--accent))]" />
                    <span className="text-xs text-white">{r.label}</span>
                    <span className={`text-[10px] font-mono ml-auto px-1.5 py-0.5 rounded-sm ${
                      r.score === "Low" ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                    }`}>{r.score}</span>
                  </div>
                  <p className="text-[10px] text-[hsl(var(--slate))]">{r.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-[hsl(var(--slate))]">
              <Clock className="w-3 h-3 text-[hsl(var(--accent))]" />
              <span>Last refreshed: 2 hours ago · Sources: D&B, Orbis, internal audit DB, OFAC, EU sanctions list</span>
            </div>
          </ProfileSection>

          {/* 8. Document Vault */}
          <ProfileSection title="Documentation Vault — LLM-Queryable" icon={Archive} id="profile-documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { name: "ISO 9001:2015 Certificate", type: "PDF", date: "2025-08", status: "verified" as const },
                { name: "API Q1 Certificate", type: "PDF", date: "2025-03", status: "verified" as const },
                { name: "WPS/PQR Package (48 procedures)", type: "ZIP", date: "2024-11", status: "verified" as const },
                { name: "CMM Calibration Report #CMM-002", type: "PDF", date: "2025-06", status: "verified" as const },
                { name: "Audit Report — Site Pune", type: "PDF", date: "2025-01", status: "verified" as const },
                { name: "Process Flow Diagram", type: "DWG", date: "2024-09", status: "partial" as const },
                { name: "Plant Layout Map (geo-tagged)", type: "PDF", date: "2024-07", status: "partial" as const },
                { name: "Sample Inspection Report", type: "PDF", date: "2025-04", status: "verified" as const },
              ].map(doc => (
                <div key={doc.name} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-sm px-3 py-2">
                  <FileText className="w-4 h-4 text-[hsl(var(--accent))] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-white truncate">{doc.name}</div>
                    <div className="text-[10px] text-[hsl(var(--slate))] font-mono">{doc.type} · {doc.date}</div>
                  </div>
                  <VerificationTag status={doc.status} />
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 rounded-sm">
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] mb-1">AI-QUERYABLE</p>
              <p className="text-[11px] text-[hsl(var(--slate))] italic">
                "Show me the latest calibration evidence for CMM #2" → Resolved in 1.2s via OCR + embeddings
              </p>
            </div>
          </ProfileSection>

          {/* 9. Provenance & Trust */}
          <ProfileSection title="Provenance, Freshness & Trust" icon={Eye} id="profile-provenance">
            <div className="space-y-1">
              <DataRow label="Data Freshness" value="87% fields updated < 90 days" verification="verified" />
              <DataRow label="Source Mix" value="42% auditor-verified · 31% ERP · 27% self-declared" verification="partial" />
              <DataRow label="Confidence Score" value="0.91 / 1.00" mono verification="verified" />
              <DataRow label="Change Log" value="Last 30d: 14 field updates, 3 document uploads" verification="verified" />
              <DataRow label="Last Audit" value="2025-01-15 · On-site · Assessor: RCA Senior Auditor" verification="verified" />
            </div>
            <div className="mt-3 p-3 bg-white/[0.03] border border-white/5 rounded-sm">
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] mb-1">TRUST LEVEL</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: "91%" }} />
                </div>
                <span className="text-sm font-mono text-[hsl(var(--accent))]">91%</span>
                <span className="text-[10px] text-[hsl(var(--slate))]">Audit-grade digital twin</span>
              </div>
            </div>
          </ProfileSection>

          {/* 10. AI Outputs */}
          <ProfileSection title="AI-Generated Outputs" icon={Zap} id="profile-outputs">
            <div className="space-y-3">
              {[
                { icon: BarChart3, title: "Board-Ready Comparison", desc: "vs reference supplier: +12% technical fit, −38% cost, comparable delivery. Risk delta: +0.3 (operational)." },
                { icon: Star, title: "Shortlist Recommendation", desc: "Ranked #2 of 47 qualified suppliers. Decision rationale: best cost-quality ratio in pressure class >900." },
                { icon: DollarSign, title: "Negotiation Levers", desc: "Volume commitment (>€2M) unlocks 8% discount. Heat treatment sub-tier is switchable (est. −5% CoPQ)." },
                { icon: FileCheck, title: "Audit Plan", desc: "Priority areas: heat treatment process validation, sub-tier foundry traceability, WPS cryo qualification. Est. 2-day on-site." },
                { icon: AlertTriangle, title: "Red Flags Summary", desc: "1 flag: single heat-treatment furnace creates capacity bottleneck at >120% utilization. Evidence: OEE logs + shift plan." },
              ].map(out => (
                <div key={out.title} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-sm p-3">
                  <out.icon className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white font-medium">{out.title}</p>
                    <p className="text-[11px] text-[hsl(var(--slate))] mt-0.5">{out.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierProfileModal;
