import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Camera, Cpu, Zap, Clock, Gauge, AlertTriangle,
  CheckCircle2, XCircle, ChevronDown, ChevronUp, Sparkles, Factory,
  CalendarDays, Shield, Settings2, Wrench, Leaf, BarChart3
} from "lucide-react";

/* ── Machine data (simulated Atlas AI capture) ── */
interface MachineSpec {
  label: string;
  value: string;
  unit?: string;
}

interface MachineProfile {
  id: string;
  typePlateImage: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  yearManufactured: number;
  age: number;
  origin: string;
  originTier: 'oem-premium' | 'oem-standard' | 'economy';
  category: string;
  location: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  conditionScore: number;
  lastMaintenance: string;
  nextMaintenance: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
  energyConsumption: number;
  energyClass: string;
  co2PerYear: number;
  clientSuitability: 'approved' | 'conditional' | 'not-suitable';
  clientSuitabilityReason: string;
  bmwRequirementsMet: boolean;
  specs: MachineSpec[];
  capabilities: string[];
  risks: string[];
  atlasInsight: string;
}

const machines: MachineProfile[] = [
  {
    id: "M-001",
    typePlateImage: "atlas-capture-001.jpg",
    manufacturer: "ENGEL",
    model: "victory 500/120 tech",
    serialNumber: "EN-2019-VT-44821",
    yearManufactured: 2019,
    age: 7,
    origin: "Austria",
    originTier: 'oem-premium',
    category: "Injection Moulding",
    location: "Hall A — Line 2",
    condition: 'good',
    conditionScore: 82,
    lastMaintenance: "2026-02-18",
    nextMaintenance: "2026-05-18",
    oee: 84.2,
    availability: 92.1,
    performance: 93.8,
    quality: 97.5,
    energyConsumption: 78,
    energyClass: "A+",
    co2PerYear: 14.2,
    clientSuitability: 'approved',
    clientSuitabilityReason: "Meets BMW Tier-1 precision requirements. Servo-hydraulic drive delivers Cpk > 1.67 on critical dimensions.",
    bmwRequirementsMet: true,
    specs: [
      { label: "Clamping Force", value: "5,000", unit: "kN" },
      { label: "Shot Volume", value: "1,204", unit: "cm³" },
      { label: "Screw Diameter", value: "80", unit: "mm" },
      { label: "Max Mould Weight", value: "3,200", unit: "kg" },
      { label: "Platen Size", value: "1,120 × 920", unit: "mm" },
      { label: "Dry Cycle Time", value: "2.8", unit: "s" },
      { label: "Injection Pressure", value: "2,300", unit: "bar" },
      { label: "Hydraulic System", value: "Servo ecodrive", unit: "" },
      { label: "Control System", value: "CC300", unit: "" },
      { label: "Tolerance Capability", value: "±0.02", unit: "mm" },
    ],
    capabilities: [
      "Multi-component injection (2K)",
      "Gas-assisted moulding",
      "In-mould decoration (IMD)",
      "MuCell® microcellular foaming",
      "Automotive-grade surface finish (VDI 3400)",
    ],
    risks: [
      "Hydraulic hose set approaching 5-year replacement cycle",
    ],
    atlasInsight: "Atlas AI detected thermal imaging anomaly on barrel zone 3 heater band — recommend thermographic inspection within 30 days to prevent unplanned downtime.",
  },
  {
    id: "M-002",
    typePlateImage: "atlas-capture-002.jpg",
    manufacturer: "Haitian",
    model: "Mars III MA3200",
    serialNumber: "HT-2021-M3-78432",
    yearManufactured: 2021,
    age: 5,
    origin: "China",
    originTier: 'economy',
    category: "Injection Moulding",
    location: "Hall B — Line 5",
    condition: 'fair',
    conditionScore: 61,
    lastMaintenance: "2026-01-10",
    nextMaintenance: "2026-04-10",
    oee: 71.8,
    availability: 85.3,
    performance: 88.2,
    quality: 95.4,
    energyConsumption: 112,
    energyClass: "B",
    co2PerYear: 22.8,
    clientSuitability: 'conditional',
    clientSuitabilityReason: "Meets dimensional tolerance for non-Class-A surfaces only. Repeatability variance (Cpk 1.21) below BMW minimum of 1.33 for visible components.",
    bmwRequirementsMet: false,
    specs: [
      { label: "Clamping Force", value: "3,200", unit: "kN" },
      { label: "Shot Volume", value: "980", unit: "cm³" },
      { label: "Screw Diameter", value: "70", unit: "mm" },
      { label: "Max Mould Weight", value: "2,800", unit: "kg" },
      { label: "Platen Size", value: "980 × 860", unit: "mm" },
      { label: "Dry Cycle Time", value: "3.6", unit: "s" },
      { label: "Injection Pressure", value: "1,850", unit: "bar" },
      { label: "Hydraulic System", value: "Standard toggle", unit: "" },
      { label: "Control System", value: "KEBA i700", unit: "" },
      { label: "Tolerance Capability", value: "±0.05", unit: "mm" },
    ],
    capabilities: [
      "Standard injection moulding",
      "Basic insert moulding",
      "Non-visible structural parts",
    ],
    risks: [
      "Cpk variance on precision dimensions (1.21 vs. 1.33 BMW min)",
      "Toggle mechanism showing wear — 8% higher energy draw vs. baseline",
      "No servo drive — higher cycle-to-cycle variation",
    ],
    atlasInsight: "Atlas AI cross-referenced this machine's output data with BMW SLP requirements: 23% of parts from this machine required rework in Q4 2025. Recommend restricting to non-Class-A components or upgrading servo drive.",
  },
  {
    id: "M-003",
    typePlateImage: "atlas-capture-003.jpg",
    manufacturer: "Zeiss",
    model: "CONTURA 7/10/6 RDS",
    serialNumber: "ZS-2022-CT-11094",
    yearManufactured: 2022,
    age: 4,
    origin: "Germany",
    originTier: 'oem-premium',
    category: "CMM — Coordinate Measuring",
    location: "Quality Lab",
    condition: 'excellent',
    conditionScore: 96,
    lastMaintenance: "2026-03-01",
    nextMaintenance: "2026-09-01",
    oee: 94.5,
    availability: 98.2,
    performance: 97.1,
    quality: 99.1,
    energyConsumption: 8,
    energyClass: "A++",
    co2PerYear: 1.6,
    clientSuitability: 'approved',
    clientSuitabilityReason: "Exceeds BMW metrology requirements. MPEP ≤ 1.5µm certified, fully calibrated to ISO 10360-2.",
    bmwRequirementsMet: true,
    specs: [
      { label: "Measuring Range", value: "700 × 1000 × 600", unit: "mm" },
      { label: "Resolution", value: "0.1", unit: "µm" },
      { label: "MPEP", value: "1.5", unit: "µm" },
      { label: "Max Workpiece", value: "450", unit: "kg" },
      { label: "Probe System", value: "VAST XXT", unit: "" },
      { label: "Software", value: "CALYPSO 2024", unit: "" },
      { label: "Temperature Comp.", value: "Active", unit: "" },
      { label: "Calibration Status", value: "ISO 10360-2", unit: "" },
    ],
    capabilities: [
      "Full GD&T dimensional inspection",
      "Surface profile scanning",
      "SPC data export to BMW Q-DAS",
      "Automated measurement programs",
      "First Article Inspection (FAI / PPAP)",
    ],
    risks: [],
    atlasInsight: "Atlas AI verified calibration certificate validity until 2027-03. Measurement uncertainty budget within BMW Tier-1 acceptance criteria.",
  },
];

/* ── Helpers using project palette ── */
const suitabilityConfig = {
  'approved': { icon: CheckCircle2, color: 'text-accent', label: 'Approved' },
  'conditional': { icon: AlertTriangle, color: 'text-warning', label: 'Conditional' },
  'not-suitable': { icon: XCircle, color: 'text-destructive', label: 'Not Suitable' },
};

const originLabel = (tier: string) => {
  switch (tier) {
    case 'oem-premium': return 'OEM Premium';
    case 'oem-standard': return 'OEM Standard';
    case 'economy': return 'Economy';
    default: return tier;
  }
};

const conditionScoreColor = (score: number) => {
  if (score >= 85) return 'hsl(155, 24%, 55%)';
  if (score >= 60) return 'hsl(24, 72%, 63%)';
  return 'hsl(0, 48%, 46%)';
};

function OEEGauge({ label, value, threshold }: { label: string; value: number; threshold: number }) {
  const met = value >= threshold;
  const color = met ? 'hsl(155, 24%, 55%)' : 'hsl(24, 72%, 63%)';
  return (
    <div className="text-center">
      <div className="relative w-14 h-14 mx-auto mb-1">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="2.5" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
            stroke={color} strokeWidth="2.5" strokeDasharray={`${value}, 100`} strokeLinecap="butt" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-mono font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.1em]">{label}</span>
    </div>
  );
}

/* ── Machine Card ── */
function MachineCard({ machine }: { machine: MachineProfile }) {
  const [expanded, setExpanded] = useState(false);
  const suit = suitabilityConfig[machine.clientSuitability];
  const SuitIcon = suit.icon;
  const cColor = conditionScoreColor(machine.conditionScore);

  return (
    <div className="border border-border bg-white">
      {/* Header */}
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-mono font-bold text-primary">{machine.id}</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] text-muted-foreground font-medium">{originLabel(machine.originTier)}</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] font-mono" style={{ color: cColor }}>
              {machine.condition} {machine.conditionScore}/100
            </span>
          </div>
          <h4 className="text-[16px] font-light text-foreground tracking-tight leading-tight">
            {machine.manufacturer} <span className="font-medium">{machine.model}</span>
          </h4>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
            <span>{machine.category}</span>
            <span className="text-[#E5E7EB]">|</span>
            <span>{machine.location}</span>
            <span className="text-[#E5E7EB]">|</span>
            <span className="font-mono text-[10px]">S/N {machine.serialNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <SuitIcon className={cn("w-4 h-4", suit.color)} />
          <span className={cn("text-[11px] font-semibold", suit.color)}>{suit.label}</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="border-t border-border grid grid-cols-6 divide-x divide-[#E5E7EB]">
        {[
          { label: "Age", value: `${machine.age} yrs`, sub: String(machine.yearManufactured), icon: CalendarDays },
          { label: "Energy", value: `${machine.energyConsumption} kWh`, sub: machine.energyClass, icon: Zap },
          { label: "CO₂/yr", value: `${machine.co2PerYear} t`, sub: "", icon: Leaf },
          { label: "Last Maint.", value: machine.lastMaintenance, sub: "", icon: Wrench },
          { label: "Next Maint.", value: machine.nextMaintenance, sub: "", icon: CalendarDays },
          { label: "Origin", value: machine.origin, sub: "", icon: Shield },
        ].map((m, i) => (
          <div key={i} className="px-3 py-3">
            <div className="text-[9px] text-muted-foreground uppercase tracking-[0.1em] mb-0.5">{m.label}</div>
            <div className="text-[12px] font-mono font-medium text-foreground">
              {m.value}{m.sub && <span className="text-[10px] text-muted-foreground ml-1">{m.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* OEE Gauges */}
      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold text-foreground uppercase tracking-[0.12em] flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" /> OEE Performance
          </span>
          <span className="text-[9px] text-muted-foreground font-mono">Threshold ≥ 85%</span>
        </div>
        <div className="flex items-center justify-around">
          <OEEGauge label="OEE" value={machine.oee} threshold={85} />
          <OEEGauge label="Avail." value={machine.availability} threshold={90} />
          <OEEGauge label="Perf." value={machine.performance} threshold={90} />
          <OEEGauge label="Quality" value={machine.quality} threshold={97} />
        </div>
      </div>

      {/* Client Suitability */}
      <div className="border-t border-border px-5 py-3">
        <div className="flex items-start gap-2">
          <SuitIcon className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", suit.color)} />
          <div>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">BMW Suitability</span>
            <p className="text-[12px] text-foreground mt-0.5 leading-relaxed">{machine.clientSuitabilityReason}</p>
          </div>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full border-t border-border px-5 py-2.5 flex items-center justify-between text-[11px] font-medium text-primary hover:bg-[#FAFAFA] transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5" />
          {expanded ? "Hide" : "Show"} Technical Data Sheet
        </span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {expanded && (
        <div className="border-t border-border">
          {/* Specs grid */}
          <div className="px-5 py-4">
            <h5 className="text-[10px] font-semibold text-foreground uppercase tracking-[0.12em] mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-muted-foreground" /> Technical Specifications
            </h5>
            <div className="grid grid-cols-5 gap-px bg-border">
              {machine.specs.map((spec, i) => (
                <div key={i} className="bg-white px-3 py-2.5">
                  <div className="text-[9px] text-muted-foreground uppercase tracking-[0.08em] mb-0.5">{spec.label}</div>
                  <div className="text-[12px] font-mono font-medium text-foreground">
                    {spec.value}{spec.unit && <span className="text-[9px] text-muted-foreground ml-0.5">{spec.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="border-t border-border px-5 py-4">
            <h5 className="text-[10px] font-semibold text-foreground uppercase tracking-[0.12em] mb-2.5 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-muted-foreground" /> Process Capabilities
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {machine.capabilities.map((cap, i) => (
                <span key={i} className="text-[10px] px-2 py-1 border border-border text-foreground font-medium">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Risks */}
          {machine.risks.length > 0 && (
            <div className="border-t border-border px-5 py-4">
              <h5 className="text-[10px] font-semibold text-warning uppercase tracking-[0.12em] mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Identified Risks
              </h5>
              <ul className="space-y-1">
                {machine.risks.map((risk, i) => (
                  <li key={i} className="text-[11px] text-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-[#E39B5C] mt-1.5 shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Atlas AI Insight */}
          <div className="border-t border-border px-5 py-4">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.1em]">Atlas AI Insight</span>
                <p className="text-[11px] text-foreground mt-0.5 leading-relaxed">{machine.atlasInsight}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Section ── */
export default function MachineParkIntelligence() {
  const totalMachines = machines.length;
  const approved = machines.filter(m => m.clientSuitability === 'approved').length;
  const conditional = machines.filter(m => m.clientSuitability === 'conditional').length;
  const avgOEE = (machines.reduce((s, m) => s + m.oee, 0) / totalMachines).toFixed(1);
  const avgAge = (machines.reduce((s, m) => s + m.age, 0) / totalMachines).toFixed(1);
  const totalEnergy = machines.reduce((s, m) => s + m.energyConsumption, 0);
  const totalCO2 = machines.reduce((s, m) => s + m.co2PerYear, 0).toFixed(1);
  const oemPremium = machines.filter(m => m.originTier === 'oem-premium').length;

  return (
    <section id="machine-park" className="py-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// 15</span>
        <span className="w-1.5 h-1.5 bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">Machine Park Intelligence</span>
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-mono text-primary">{totalMachines} captured</span>
        </div>
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none mb-3">Machine Park Intelligence</h2>
      <p className="text-[13px] text-muted-foreground mb-8 max-w-[680px] leading-relaxed">
        Atlas AI identifies equipment from type plate captures, cross-references manufacturer databases,
        and evaluates capability against <span className="font-medium text-foreground">BMW Tier-1</span> requirements.
      </p>

      {/* Summary Stats */}
      <div className="grid grid-cols-7 divide-x divide-[#E5E7EB] border border-border mb-8">
        {[
          { label: "Avg OEE", value: `${avgOEE}%`, ok: Number(avgOEE) >= 85 },
          { label: "Avg Age", value: `${avgAge} yrs`, ok: Number(avgAge) <= 8 },
          { label: "Energy", value: `${totalEnergy} kWh`, ok: true },
          { label: "CO₂/yr", value: `${totalCO2} t`, ok: true },
          { label: "OEM Premium", value: `${oemPremium}/${totalMachines}`, ok: oemPremium >= totalMachines * 0.5 },
          { label: "Approved", value: `${approved}`, ok: true },
          { label: "Conditional", value: `${conditional}`, ok: conditional === 0 },
        ].map((s, i) => (
          <div key={i} className="px-3 py-3 text-center">
            <span className={cn("text-[15px] font-mono font-bold block", s.ok ? "text-foreground" : "text-warning")}>{s.value}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-[0.1em]">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Machine Cards */}
      <div className="space-y-4">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-6 px-4 py-3 border border-border flex items-start gap-2.5">
        <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
        <div>
          <span className="text-[10px] font-semibold text-foreground uppercase tracking-[0.1em]">Atlas AI Machine Intelligence</span>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
            All machine profiles are auto-generated from on-site type plate captures. Suitability assessments are
            calibrated against BMW technical requirements and tolerance specifications.
          </p>
        </div>
      </div>
    </section>
  );
}
