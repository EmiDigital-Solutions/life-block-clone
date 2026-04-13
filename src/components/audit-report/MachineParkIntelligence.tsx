import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown, ChevronUp, Sparkles,
  CheckCircle2, AlertTriangle, XCircle, Settings2
} from "lucide-react";

/* ── Machine data ── */
interface MachineSpec {
  label: string;
  value: string;
  unit?: string;
}

interface MachineProfile {
  id: string;
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
  specs: MachineSpec[];
  capabilities: string[];
  risks: string[];
  atlasInsight: string;
}

const machines: MachineProfile[] = [
  {
    id: "M-001",
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
    specs: [
      { label: "Clamping Force", value: "5,000", unit: "kN" },
      { label: "Shot Volume", value: "1,204", unit: "cm³" },
      { label: "Screw Diameter", value: "80", unit: "mm" },
      { label: "Max Mould Weight", value: "3,200", unit: "kg" },
      { label: "Platen Size", value: "1,120 × 920", unit: "mm" },
      { label: "Dry Cycle Time", value: "2.8", unit: "s" },
      { label: "Injection Pressure", value: "2,300", unit: "bar" },
      { label: "Hydraulic System", value: "Servo ecodrive" },
      { label: "Control System", value: "CC300" },
      { label: "Tolerance", value: "±0.02", unit: "mm" },
    ],
    capabilities: ["Multi-component injection (2K)", "Gas-assisted moulding", "In-mould decoration (IMD)", "MuCell® microcellular foaming", "VDI 3400 surface finish"],
    risks: ["Hydraulic hose set approaching 5-year replacement cycle"],
    atlasInsight: "Thermal imaging anomaly on barrel zone 3 heater band — recommend thermographic inspection within 30 days.",
  },
  {
    id: "M-002",
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
    clientSuitabilityReason: "Cpk 1.21 below BMW minimum 1.33 for Class-A surfaces. Restrict to non-visible structural parts or upgrade servo drive.",
    specs: [
      { label: "Clamping Force", value: "3,200", unit: "kN" },
      { label: "Shot Volume", value: "980", unit: "cm³" },
      { label: "Screw Diameter", value: "70", unit: "mm" },
      { label: "Max Mould Weight", value: "2,800", unit: "kg" },
      { label: "Platen Size", value: "980 × 860", unit: "mm" },
      { label: "Dry Cycle Time", value: "3.6", unit: "s" },
      { label: "Injection Pressure", value: "1,850", unit: "bar" },
      { label: "Hydraulic System", value: "Standard toggle" },
      { label: "Control System", value: "KEBA i700" },
      { label: "Tolerance", value: "±0.05", unit: "mm" },
    ],
    capabilities: ["Standard injection moulding", "Basic insert moulding", "Non-visible structural parts"],
    risks: ["Cpk variance 1.21 vs. 1.33 BMW min", "Toggle mechanism wear — 8% higher energy draw", "No servo drive — higher cycle variation"],
    atlasInsight: "23% of parts from this machine required rework in Q4 2025. Recommend restricting to non-Class-A components or upgrading servo drive.",
  },
  {
    id: "M-003",
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
    clientSuitabilityReason: "Exceeds BMW metrology requirements. MPEP ≤ 1.5µm certified, ISO 10360-2 calibrated.",
    specs: [
      { label: "Range", value: "700 × 1000 × 600", unit: "mm" },
      { label: "Resolution", value: "0.1", unit: "µm" },
      { label: "MPEP", value: "1.5", unit: "µm" },
      { label: "Max Workpiece", value: "450", unit: "kg" },
      { label: "Probe System", value: "VAST XXT" },
      { label: "Software", value: "CALYPSO 2024" },
      { label: "Temp. Comp.", value: "Active" },
      { label: "Calibration", value: "ISO 10360-2" },
    ],
    capabilities: ["Full GD&T dimensional inspection", "Surface profile scanning", "SPC data export to Q-DAS", "Automated measurement programs", "FAI / PPAP"],
    risks: [],
    atlasInsight: "Calibration certificate valid until 2027-03. Measurement uncertainty within BMW Tier-1 acceptance criteria.",
  },
];

const suitabilityConfig = {
  'approved': { icon: CheckCircle2, color: 'hsl(155, 24%, 55%)', label: 'Approved' },
  'conditional': { icon: AlertTriangle, color: 'hsl(24, 72%, 63%)', label: 'Conditional' },
  'not-suitable': { icon: XCircle, color: 'hsl(0, 48%, 46%)', label: 'Not Suitable' },
};

const conditionColor = (score: number) => {
  if (score >= 85) return 'hsl(155, 24%, 55%)';
  if (score >= 60) return 'hsl(24, 72%, 63%)';
  return 'hsl(0, 48%, 46%)';
};

const originLabel = (tier: string) => {
  switch (tier) {
    case 'oem-premium': return 'OEM Premium';
    case 'oem-standard': return 'OEM Standard';
    case 'economy': return 'Economy';
    default: return tier;
  }
};

function MetricBar({ label, value, threshold, max = 100 }: { label: string; value: number; threshold: number; max?: number }) {
  const color = value >= threshold ? 'hsl(155, 24%, 55%)' : value >= threshold * 0.88 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  const pct = (value / max) * 100;
  const threshPct = (threshold / max) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] w-[50px] shrink-0" style={{ color: 'hsl(0,0%,45%)' }}>{label}</span>
      <div className="flex-1 h-3 relative" style={{ background: 'hsl(0,0%,93%)' }}>
        <div className="absolute top-0 h-full" style={{ width: `${pct}%`, background: color, opacity: 0.7 }} />
        <div className="absolute top-0 bottom-0 w-px" style={{ left: `${threshPct}%`, borderLeft: '1px dashed hsl(0,0%,55%)' }} />
      </div>
      <span className="text-[14px] font-mono font-bold w-[50px] text-right" style={{ color }}>{value}%</span>
    </div>
  );
}

function MachineCard({ machine }: { machine: MachineProfile }) {
  const [expanded, setExpanded] = useState(false);
  const suit = suitabilityConfig[machine.clientSuitability];
  const SuitIcon = suit.icon;
  const cColor = conditionColor(machine.conditionScore);
  const oeeColor = machine.oee >= 85 ? 'hsl(155, 24%, 55%)' : machine.oee >= 75 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';

  return (
    <div style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
      {/* Header row: hero OEE + machine info + suitability */}
      <div className="flex items-stretch gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
        {/* Hero OEE */}
        <div className="w-[160px] shrink-0 p-5 flex flex-col items-center justify-center" style={{ background: 'hsl(0,0%,100%)' }}>
          <div className="text-[42px] font-bold font-mono leading-none" style={{ color: oeeColor }}>{machine.oee}%</div>
          <span className="text-[10px] uppercase tracking-wider font-semibold mt-1" style={{ color: 'hsl(0,0%,50%)' }}>OEE</span>
        </div>

        {/* Machine identity */}
        <div className="flex-1 p-5" style={{ background: 'hsl(0,0%,100%)' }}>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[12px] font-mono font-bold" style={{ color: 'hsl(195, 89%, 34%)' }}>{machine.id}</span>
            <span className="text-[11px] px-2 py-0.5" style={{ background: 'hsl(0,0%,93%)', color: 'hsl(0,0%,45%)' }}>{originLabel(machine.originTier)}</span>
            <span className="text-[11px] px-2 py-0.5" style={{ background: `${cColor}10`, color: cColor }}>{machine.condition} · {machine.conditionScore}/100</span>
          </div>
          <h4 className="text-[18px] font-bold text-foreground tracking-tight">
            {machine.manufacturer} {machine.model}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-[12px]" style={{ color: 'hsl(0,0%,50%)' }}>
            <span>{machine.category}</span>
            <span style={{ color: 'hsl(0,0%,80%)' }}>|</span>
            <span>{machine.location}</span>
            <span style={{ color: 'hsl(0,0%,80%)' }}>|</span>
            <span className="font-mono text-[11px]">S/N {machine.serialNumber}</span>
            <span style={{ color: 'hsl(0,0%,80%)' }}>|</span>
            <span>{machine.yearManufactured} ({machine.age} yrs)</span>
          </div>
        </div>

        {/* BMW suitability badge */}
        <div className="w-[140px] shrink-0 p-5 flex flex-col items-center justify-center" style={{ background: 'hsl(0,0%,100%)' }}>
          <SuitIcon className="w-6 h-6 mb-1" style={{ color: suit.color }} />
          <span className="text-[12px] font-bold" style={{ color: suit.color }}>{suit.label}</span>
          <span className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'hsl(0,0%,55%)' }}>BMW Status</span>
        </div>
      </div>

      {/* Performance bars */}
      <div className="p-5 space-y-2" style={{ borderTop: '1px solid hsl(0,0%,85%)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'hsl(0,0%,50%)' }}>Performance Breakdown</span>
          <span className="text-[10px] font-mono" style={{ color: 'hsl(0,0%,55%)' }}>Dashed line = BMW threshold</span>
        </div>
        <MetricBar label="Avail." value={machine.availability} threshold={90} />
        <MetricBar label="Perf." value={machine.performance} threshold={90} />
        <MetricBar label="Quality" value={machine.quality} threshold={97} />
      </div>

      {/* Quick info row */}
      <div className="flex items-stretch gap-px" style={{ background: 'hsl(0,0%,85%)', borderTop: '1px solid hsl(0,0%,85%)' }}>
        {[
          { label: 'Energy', value: `${machine.energyConsumption} kWh` },
          { label: 'Class', value: machine.energyClass },
          { label: 'CO₂/yr', value: `${machine.co2PerYear} t` },
          { label: 'Last Maint.', value: machine.lastMaintenance },
          { label: 'Next Maint.', value: machine.nextMaintenance },
          { label: 'Origin', value: machine.origin },
        ].map((item, i) => (
          <div key={i} className="flex-1 px-3 py-3" style={{ background: 'hsl(0,0%,100%)' }}>
            <span className="text-[9px] uppercase tracking-[0.1em] block" style={{ color: 'hsl(0,0%,50%)' }}>{item.label}</span>
            <span className="text-[12px] font-mono font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Suitability reason */}
      <div className="px-5 py-3" style={{ borderTop: '1px solid hsl(0,0%,85%)' }}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'hsl(0,0%,40%)' }}>
          <strong className="text-foreground">BMW Assessment:</strong> {machine.clientSuitabilityReason}
        </p>
      </div>

      {/* Risks */}
      {machine.risks.length > 0 && (
        <div className="px-5 py-3" style={{ borderTop: '1px solid hsl(0,0%,85%)' }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" style={{ color: 'hsl(24, 72%, 63%)' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'hsl(24, 72%, 63%)' }}>
              {machine.risks.length} Risk{machine.risks.length > 1 ? 's' : ''} Identified
            </span>
          </div>
          {machine.risks.map((risk, i) => (
            <p key={i} className="text-[13px] pl-6 mb-1" style={{ color: 'hsl(0,0%,40%)' }}>• {risk}</p>
          ))}
        </div>
      )}

      {/* Atlas insight */}
      <div className="px-5 py-3 flex items-start gap-3" style={{ borderTop: '1px solid hsl(0,0%,85%)', background: 'hsl(195, 89%, 34%, 0.03)' }}>
        <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'hsl(195, 89%, 34%)' }} />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'hsl(195, 89%, 34%)' }}>Atlas AI</span>
          <p className="text-[13px] mt-0.5 leading-relaxed" style={{ color: 'hsl(0,0%,40%)' }}>{machine.atlasInsight}</p>
        </div>
      </div>

      {/* Expandable technical data */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-3 flex items-center justify-between text-[12px] font-medium transition-colors"
        style={{ borderTop: '1px solid hsl(0,0%,85%)', color: 'hsl(195, 89%, 34%)' }}
      >
        <span className="flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          {expanded ? "Hide" : "Show"} Technical Data Sheet
        </span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid hsl(0,0%,85%)' }}>
          {/* Specs grid */}
          <div className="p-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3 block" style={{ color: 'hsl(0,0%,50%)' }}>Specifications</span>
            <div className="grid grid-cols-5 gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
              {machine.specs.map((spec, i) => (
                <div key={i} className="px-3 py-2.5" style={{ background: 'hsl(0,0%,100%)' }}>
                  <span className="text-[9px] uppercase tracking-[0.08em] block" style={{ color: 'hsl(0,0%,50%)' }}>{spec.label}</span>
                  <span className="text-[13px] font-mono font-medium text-foreground">
                    {spec.value}{spec.unit && <span className="text-[10px] ml-0.5" style={{ color: 'hsl(0,0%,55%)' }}>{spec.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="px-5 pb-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2 block" style={{ color: 'hsl(0,0%,50%)' }}>Capabilities</span>
            <div className="flex flex-wrap gap-1.5">
              {machine.capabilities.map((cap, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 font-medium text-foreground" style={{ border: '1px solid hsl(0,0%,85%)' }}>
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MachineParkIntelligence() {
  const totalMachines = machines.length;
  const approved = machines.filter(m => m.clientSuitability === 'approved').length;
  const conditional = machines.filter(m => m.clientSuitability === 'conditional').length;
  const avgOEE = (machines.reduce((s, m) => s + m.oee, 0) / totalMachines).toFixed(1);
  const avgAge = (machines.reduce((s, m) => s + m.age, 0) / totalMachines).toFixed(1);
  const totalCO2 = machines.reduce((s, m) => s + m.co2PerYear, 0).toFixed(1);
  const oemPremium = machines.filter(m => m.originTier === 'oem-premium').length;
  const belowThreshold = machines.filter(m => m.oee < 85).length;

  return (
    <section id="machine-park" className="py-10 space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(195, 89%, 34%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Machine Park Intelligence</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {totalMachines} machines profiled — {belowThreshold > 0 ? `${belowThreshold} below OEE threshold` : 'all above OEE threshold'}
      </h2>
      <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: 'hsl(0,0%,45%)' }}>
        Atlas AI identifies equipment from type plate captures and evaluates capability against BMW Tier-1 requirements.
      </p>

      {/* Hero stat row */}
      <div className="flex items-stretch gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
        {[
          { label: 'Fleet OEE', value: `${avgOEE}%`, color: Number(avgOEE) >= 85 ? 'hsl(155, 24%, 55%)' : 'hsl(24, 72%, 63%)' },
          { label: 'Avg Age', value: `${avgAge} yrs`, color: 'hsl(0,0%,20%)' },
          { label: 'OEM Premium', value: `${oemPremium}/${totalMachines}`, color: oemPremium >= totalMachines * 0.5 ? 'hsl(155, 24%, 55%)' : 'hsl(24, 72%, 63%)' },
          { label: 'BMW Approved', value: String(approved), color: 'hsl(155, 24%, 55%)' },
          { label: 'Conditional', value: String(conditional), color: conditional > 0 ? 'hsl(24, 72%, 63%)' : 'hsl(155, 24%, 55%)' },
          { label: 'CO₂/yr', value: `${totalCO2} t`, color: 'hsl(0,0%,30%)' },
        ].map(s => (
          <div key={s.label} className="flex-1 p-4" style={{ background: 'hsl(0,0%,100%)' }}>
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold block" style={{ color: 'hsl(0,0%,50%)' }}>{s.label}</span>
            <div className="text-[24px] font-bold font-mono mt-1 leading-none" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Machine Cards */}
      <div className="space-y-4">
        {machines.map(machine => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="flex items-start gap-3 p-5" style={{ background: 'hsl(0,0%,97%)', border: '1px solid hsl(0,0%,88%)' }}>
        <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'hsl(195, 89%, 34%)' }} />
        <p className="text-[13px] leading-relaxed" style={{ color: 'hsl(0,0%,45%)' }}>
          All machine profiles auto-generated from on-site type plate captures. Suitability assessments calibrated against BMW technical requirements and tolerance specifications.
        </p>
      </div>
    </section>
  );
}
