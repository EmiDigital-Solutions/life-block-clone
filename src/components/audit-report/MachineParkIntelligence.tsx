import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Camera, Cpu, Zap, Clock, Gauge, ThermometerSun, AlertTriangle,
  CheckCircle2, XCircle, ChevronDown, ChevronUp, Sparkles, Factory,
  CalendarDays, Weight, Ruler, Settings2, Shield, TrendingDown, TrendingUp,
  BarChart3, Wrench, Leaf
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

/* ── Helpers ── */
const conditionColor = (c: string) => {
  switch (c) {
    case 'excellent': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'good': return 'text-emerald-700 bg-emerald-50/60 border-emerald-200';
    case 'fair': return 'text-amber-700 bg-amber-50 border-amber-200';
    case 'poor': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-[#7B8E80]';
  }
};

const suitabilityConfig = {
  'approved': { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Client Approved' },
  'conditional': { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Conditional' },
  'not-suitable': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Not Suitable' },
};

const originBadge = (tier: string) => {
  switch (tier) {
    case 'oem-premium': return { label: 'OEM Premium', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    case 'oem-standard': return { label: 'OEM Standard', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    case 'economy': return { label: 'Economy / Clone', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    default: return { label: tier, color: 'text-[#7B8E80]' };
  }
};

function OEEGauge({ label, value, threshold }: { label: string; value: number; threshold: number }) {
  const met = value >= threshold;
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-1.5">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
            stroke={met ? "#059669" : "#D97706"}
            strokeWidth="3" strokeDasharray={`${value}, 100`} strokeLinecap="round" />
        </svg>
        <span className={cn("absolute inset-0 flex items-center justify-center text-[11px] font-bold", met ? "text-emerald-700" : "text-amber-700")}>
          {value}%
        </span>
      </div>
      <span className="text-[10px] text-[#7B8E80] font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ── Machine Card ── */
function MachineCard({ machine }: { machine: MachineProfile }) {
  const [expanded, setExpanded] = useState(false);
  const suit = suitabilityConfig[machine.clientSuitability];
  const SuitIcon = suit.icon;
  const origin = originBadge(machine.originTier);

  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#F0F0F0] flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-[#0A7FA5] bg-[#0A7FA5]/8 px-2 py-0.5 rounded">{machine.id}</span>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", origin.color)}>{origin.label}</span>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", conditionColor(machine.condition))}>
              {machine.condition.charAt(0).toUpperCase() + machine.condition.slice(1)} · {machine.conditionScore}/100
            </span>
          </div>
          <h4 className="text-[15px] font-bold text-[#0A0A0A] leading-tight">
            {machine.manufacturer} {machine.model}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-[#7B8E80]">
            <span className="flex items-center gap-1"><Factory className="w-3 h-3" />{machine.category}</span>
            <span>·</span>
            <span>{machine.location}</span>
            <span>·</span>
            <span>S/N: {machine.serialNumber}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-[#0A7FA5]" />
            <span className="text-[10px] text-[#0A7FA5] font-medium">Atlas AI Captured</span>
          </div>
          <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-lg border", suit.bg, suit.border)}>
            <SuitIcon className={cn("w-3.5 h-3.5", suit.color)} />
            <span className={cn("text-[11px] font-semibold", suit.color)}>{suit.label}</span>
          </div>
        </div>
      </div>

      {/* Key metrics row */}
      <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-6 gap-4 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#7B8E80]" />
          <div>
            <div className="text-[10px] text-[#7B8E80] uppercase tracking-wider">Age</div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{machine.age} yrs <span className="text-[10px] font-normal text-[#7B8E80]">({machine.yearManufactured})</span></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#7B8E80]" />
          <div>
            <div className="text-[10px] text-[#7B8E80] uppercase tracking-wider">Energy</div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{machine.energyConsumption} kWh <span className={cn("text-[10px] font-semibold", machine.energyClass.startsWith('A') ? "text-emerald-600" : "text-amber-600")}>{machine.energyClass}</span></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#7B8E80]" />
          <div>
            <div className="text-[10px] text-[#7B8E80] uppercase tracking-wider">CO₂/yr</div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{machine.co2PerYear} t</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#7B8E80]" />
          <div>
            <div className="text-[10px] text-[#7B8E80] uppercase tracking-wider">Last Maint.</div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{machine.lastMaintenance}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#7B8E80]" />
          <div>
            <div className="text-[10px] text-[#7B8E80] uppercase tracking-wider">Next Maint.</div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{machine.nextMaintenance}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#7B8E80]" />
          <div>
            <div className="text-[10px] text-[#7B8E80] uppercase tracking-wider">Origin</div>
            <div className="text-[13px] font-bold text-[#0A0A0A]">{machine.origin}</div>
          </div>
        </div>
      </div>

      {/* OEE Gauges */}
      <div className="px-5 py-5 border-b border-[#F0F0F0]">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-[#0A0A0A]" />
          <span className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider">OEE Performance</span>
          <span className="text-[10px] text-[#7B8E80] ml-auto">BMW Threshold: ≥85%</span>
        </div>
        <div className="flex items-center justify-around">
          <OEEGauge label="OEE" value={machine.oee} threshold={85} />
          <OEEGauge label="Availability" value={machine.availability} threshold={90} />
          <OEEGauge label="Performance" value={machine.performance} threshold={90} />
          <OEEGauge label="Quality" value={machine.quality} threshold={97} />
        </div>
      </div>

      {/* Client Suitability Assessment */}
      <div className={cn("px-5 py-3 border-b border-[#F0F0F0]", suit.bg)}>
        <div className="flex items-start gap-2">
          <SuitIcon className={cn("w-4 h-4 mt-0.5 shrink-0", suit.color)} />
          <div>
            <span className={cn("text-[11px] font-bold uppercase tracking-wider", suit.color)}>BMW Suitability Assessment</span>
            <p className="text-[12px] text-[#0A0A0A] mt-0.5 leading-relaxed">{machine.clientSuitabilityReason}</p>
          </div>
        </div>
      </div>

      {/* Expand/Collapse for full specs */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-3 flex items-center justify-between text-[11px] font-semibold text-[#0A7FA5] hover:bg-[#FAFAFA] transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5" />
          {expanded ? "Hide" : "Show"} Full Technical Data Sheet & Capabilities
        </span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="border-t border-[#F0F0F0]">
          {/* Technical Specs Table */}
          <div className="px-5 py-4">
            <h5 className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Technical Data Sheet
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#E5E7EB] rounded-lg overflow-hidden">
              {machine.specs.map((spec, i) => (
                <div key={i} className="bg-white px-3 py-2.5">
                  <div className="text-[9px] text-[#7B8E80] uppercase tracking-wider mb-0.5">{spec.label}</div>
                  <div className="text-[13px] font-bold text-[#0A0A0A]">
                    {spec.value} {spec.unit && <span className="text-[10px] font-normal text-[#7B8E80]">{spec.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="px-5 py-4 border-t border-[#F0F0F0]">
            <h5 className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5" /> Process Capabilities
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {machine.capabilities.map((cap, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-[#0A7FA5]/6 text-[#0A7FA5] font-medium border border-[#0A7FA5]/10">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Risks */}
          {machine.risks.length > 0 && (
            <div className="px-5 py-4 border-t border-[#F0F0F0] bg-amber-50/30">
              <h5 className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Identified Risks
              </h5>
              <ul className="space-y-1">
                {machine.risks.map((risk, i) => (
                  <li key={i} className="text-[12px] text-amber-800 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Atlas AI Insight */}
          <div className="px-5 py-4 border-t border-[#F0F0F0] bg-[#0A7FA5]/3">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#0A7FA5] mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-[#0A7FA5] uppercase tracking-wider">Atlas AI Insight</span>
                <p className="text-[12px] text-[#0A0A0A] mt-0.5 leading-relaxed">{machine.atlasInsight}</p>
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
        <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
          <Factory className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-[#0A0A0A] tracking-tight">Machine Park Intelligence</h2>
          <p className="text-[11px] text-[#7B8E80]">Atlas AI · Type Plate Recognition · Automated Capability Profiling</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A7FA5]/6 border border-[#0A7FA5]/15">
          <Camera className="w-3.5 h-3.5 text-[#0A7FA5]" />
          <span className="text-[10px] font-semibold text-[#0A7FA5]">{totalMachines} Machines Captured</span>
        </div>
      </div>

      <p className="text-[13px] text-[#555] mb-6 max-w-[720px] leading-relaxed">
        Atlas AI automatically identifies equipment from captured type plate images, cross-references manufacturer databases for full technical specifications, 
        and evaluates each machine's capability against <span className="font-semibold text-[#0A0A0A]">BMW Tier-1 supplier requirements</span>.
      </p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-px bg-[#E5E7EB] rounded-xl overflow-hidden mb-8">
        {[
          { label: "Avg OEE", value: `${avgOEE}%`, icon: Gauge, ok: Number(avgOEE) >= 85 },
          { label: "Avg Age", value: `${avgAge} yrs`, icon: Clock, ok: Number(avgAge) <= 8 },
          { label: "Total Energy", value: `${totalEnergy} kWh`, icon: Zap, ok: true },
          { label: "CO₂ / Year", value: `${totalCO2} t`, icon: Leaf, ok: true },
          { label: "OEM Premium", value: `${oemPremium}/${totalMachines}`, icon: Shield, ok: oemPremium >= totalMachines * 0.5 },
          { label: "Approved", value: `${approved}`, icon: CheckCircle2, ok: true },
          { label: "Conditional", value: `${conditional}`, icon: AlertTriangle, ok: conditional === 0 },
        ].map((s, i) => (
          <div key={i} className="bg-white px-4 py-3 flex flex-col items-center text-center">
            <s.icon className={cn("w-4 h-4 mb-1", s.ok ? "text-emerald-600" : "text-amber-600")} />
            <span className={cn("text-[15px] font-bold", s.ok ? "text-[#0A0A0A]" : "text-amber-700")}>{s.value}</span>
            <span className="text-[9px] text-[#7B8E80] uppercase tracking-wider mt-0.5">{s.label}</span>
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
      <div className="mt-6 px-4 py-3 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-[#0A7FA5] mt-0.5 shrink-0" />
        <div>
          <span className="text-[11px] font-bold text-[#0A0A0A]">Atlas AI Machine Intelligence</span>
          <p className="text-[11px] text-[#7B8E80] mt-0.5 leading-relaxed">
            All machine profiles are auto-generated from on-site type plate captures. Atlas AI cross-references manufacturer datasheets, 
            maintenance records, and energy monitoring data to build comprehensive capability profiles. Suitability assessments are 
            calibrated against the specific client's (BMW) technical requirements and tolerance specifications.
          </p>
        </div>
      </div>
    </section>
  );
}