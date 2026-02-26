import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Shield, MapPin, Globe, Factory, ChevronDown, ChevronRight,
  FileCheck, AlertTriangle, CheckCircle2, Clock, Lock, Zap,
  BarChart3, TrendingUp, Wrench, Database, Eye, ExternalLink,
  Building2, Users, Gauge, Flame, Cable, Box, Star, FileText,
  ShieldCheck, Activity, DollarSign, Scale, Truck, Archive,
  Fingerprint, Cpu, Leaf, Camera, BookOpen, GitBranch, Bot,
  RefreshCw, Search, Target, Award, Layers, Package, Play,
  HardHat, Thermometer, CircleDot, ArrowRight
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Contextual images mapped to manufacturing process stages
import imgIncomingWarehouse from "@/assets/evidence-incoming-warehouse.jpg";
import imgMaterialStock from "@/assets/checkpoint-material-stock.jpg";
import imgCMMmeasurement from "@/assets/evidence-cmm-measurement.jpg";
import imgMeasurementSystems from "@/assets/checkpoint-measurement-systems.jpg";
import imgControlPlan from "@/assets/evidence-control-plan.jpg";
import imgProcessCapability from "@/assets/checkpoint-process-capability.jpg";
import imgMachinePark from "@/assets/checkpoint-machine-park.jpg";
import imgFactoryHero from "@/assets/factory-hero-background.jpg";
import imgWeldInspection from "@/assets/lng-weld-inspection.jpg";
import imgWeldDefect from "@/assets/claim-weld-defect.jpg";
import imgCryogenicValve from "@/assets/industry-cryogenic-valve.jpg";
import imgCryogenicModern from "@/assets/industry-cryogenic-modern.jpg";
import imgCNCmachine from "@/assets/evidence-cnc-machine.jpg";
import imgDMGnlx from "@/assets/cnc-machine-dmg-nlx.jpg";
import imgCoatingFailure from "@/assets/claim-coating-failure.jpg";
import imgHSEinspection from "@/assets/evidence-hse-inspection.jpg";
import imgAssemblyStation from "@/assets/evidence-assembly-station.jpg";
import imgCapacityAssessment from "@/assets/checkpoint-capacity-assessment.jpg";
import imgInspector from "@/assets/evidence-inspector.jpg";
import imgAuditInspection from "@/assets/ai-audit-inspection.jpg";
import imgStorageTanks from "@/assets/lng-storage-tanks.jpg";
import imgDimensionalControl from "@/assets/lng-dimensional-control.jpg";
import imgCertification from "@/assets/evidence-certification.jpg";
import imgRotatingEquipment from "@/assets/lng-rotating-equipment.jpg";
import imgEquipmentIntel from "@/assets/checkpoint-equipment-intelligence.jpg";
import imgHeatTreatmentFurnace from "@/assets/process-heat-treatment-furnace.jpg";
import imgHeatTreatmentMonitoring from "@/assets/process-heat-treatment-monitoring.jpg";
import imgOutgoingWarehouse from "@/assets/process-outgoing-warehouse.jpg";
import imgShippingStaged from "@/assets/process-shipping-staged.jpg";

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

// Section navigation tabs — expanded with all Digital Twin layers
const profileSections = [
  { id: "identity", label: "Identity Twin", icon: Fingerprint },
  { id: "operational", label: "Operational Twin", icon: Factory },
  { id: "decision", label: "Decision Twin", icon: Target },
  { id: "knowledge-graph", label: "Knowledge Graph", icon: GitBranch },
  { id: "time-machine", label: "Time Machine", icon: Clock },
  { id: "evidence", label: "Evidence Vault", icon: Camera },
  { id: "capability-dna", label: "Capability DNA", icon: Gauge },
  { id: "process-twin", label: "Process Twin", icon: Layers },
  { id: "risk-twin", label: "Risk Twin", icon: AlertTriangle },
  { id: "commercial", label: "Commercial Twin", icon: DollarSign },
  { id: "compliance", label: "Compliance Twin", icon: ShieldCheck },
  { id: "ncr-capa", label: "NCR / CAPA", icon: RefreshCw },
  { id: "site-shadow", label: "Site Shadow", icon: MapPin },
  { id: "fit-simulator", label: "Fit Simulator", icon: Search },
  { id: "ai-agents", label: "AI Agents", icon: Bot },
  { id: "trust", label: "Trust Layer", icon: Eye },
  { id: "views", label: "Role Views", icon: Users },
  { id: "roadmap", label: "Roadmap", icon: Award },
  { id: "wow", label: "Wow Features", icon: Zap },
];

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
      <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${colors[score - 1]}`}>
        {score}/5
      </span>
      <span className="text-sm text-foreground/60">{label}</span>
    </div>
  );
};

const VerificationTag = ({ status }: { status: "verified" | "partial" | "unverified" | "ai-inferred" }) => {
  const config = {
    verified: { icon: CheckCircle2, text: "On-site verified", cls: "text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10" },
    partial: { icon: Clock, text: "Document-verified", cls: "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10" },
    unverified: { icon: AlertTriangle, text: "Self-declared", cls: "text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10" },
    "ai-inferred": { icon: Bot, text: "AI-inferred", cls: "text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-sm whitespace-nowrap ${c.cls}`}>
      <c.icon className="w-3 h-3" /> {c.text}
    </span>
  );
};

const DataRow = ({ label, value, verification, mono }: { label: string; value: string; verification?: "verified" | "partial" | "unverified" | "ai-inferred"; mono?: boolean }) => (
  <div className="flex items-center py-2.5 border-b border-foreground/5 last:border-0 gap-4">
    <span className="text-xs text-foreground/40 uppercase tracking-wider whitespace-nowrap min-w-[200px]">{label}</span>
    <div className="flex items-center gap-3 ml-auto">
      <span className={`text-sm text-foreground/80 text-right ${mono ? 'font-mono' : ''}`}>{value}</span>
      {verification && <VerificationTag status={verification} />}
    </div>
  </div>
);

const ProfileSection = ({ title, icon: Icon, children, id }: { title: string; icon: any; children: React.ReactNode; id: string }) => (
  <div id={id} className="bg-white border border-foreground/10 overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-foreground/10 bg-foreground/[0.02]">
      <Icon className="w-4 h-4 text-foreground/40" />
      <h3 className="text-sm font-medium text-foreground uppercase tracking-[0.15em]">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const GraphNode = ({ label, connections }: { label: string; connections: string }) => (
  <div className="bg-white border border-foreground/10 p-3 text-center">
    <div className="text-xs text-foreground font-medium">{label}</div>
    <div className="text-[10px] text-foreground/40 mt-0.5">↔ {connections}</div>
  </div>
);

const RiskCategoryCard = ({ label, score, icon: Icon, detail }: { label: string; score: string; icon: any; detail: string }) => (
  <div className="bg-white border border-foreground/10 p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-foreground/40" />
      <span className="text-sm text-foreground">{label}</span>
      <span className={`text-xs font-mono ml-auto px-2 py-0.5 rounded-sm ${
        score === "Low" ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' : score === "Medium" ? 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]' : 'bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]'
      }`}>{score}</span>
    </div>
    <p className="text-xs text-foreground/50">{detail}</p>
  </div>
);

// Process steps data with detail panels
const processSteps = [
  {
    id: "incoming", step: "Incoming\nWarehouse", time: "—", risk: "none" as const, icon: Archive, gate: false, hse: false,
    detail: {
      photos: [{ src: imgIncomingWarehouse, label: "Incoming goods area" }, { src: imgMaterialStock, label: "Material storage racks" }],
      checklist: [
        { item: "Material certificates received (EN 10204 3.1/3.2)", status: "pass" as const, note: null },
        { item: "Incoming inspection per ITP", status: "pass" as const, note: null },
        { item: "Material traceability marking verified", status: "warning" as const, note: "Sub-tier castings: partial traceability" },
        { item: "Storage conditions adequate (humidity, temp)", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Material Mix-up", severity: "low" as const, detail: "Barcode-based tracking in place", mitigation: null },
        { category: "Cert Authenticity", severity: "medium" as const, detail: "Sub-tier cert verification manual", mitigation: "Cross-check with mill source" },
      ],
      hseNote: "",
    }
  },
  {
    id: "material-insp", step: "Material\nInspection", time: "2d", risk: "none" as const, icon: Search, gate: true, hse: false,
    detail: {
      photos: [{ src: imgCMMmeasurement, label: "CMM dimensional check" }, { src: imgMeasurementSystems, label: "Measurement systems" }],
      checklist: [
        { item: "PMI verification (XRF)", status: "pass" as const, note: null },
        { item: "Dimensional check on raw material", status: "pass" as const, note: null },
        { item: "Visual surface inspection", status: "pass" as const, note: null },
        { item: "Hardness testing", status: "pass" as const, note: null },
        { item: "Certificate cross-reference to PO", status: "warning" as const, note: "Manual process — no ERP link" },
      ],
      risks: [
        { category: "Wrong Alloy", severity: "low" as const, detail: "PMI on 100% of batches", mitigation: null },
      ],
      hseNote: "",
    }
  },
  {
    id: "engineering", step: "Engineering\nReview", time: "3 wk", risk: "none" as const, icon: FileText, gate: false, hse: false,
    detail: {
      photos: [{ src: imgControlPlan, label: "Control plan review" }, { src: imgProcessCapability, label: "Process planning" }],
      checklist: [
        { item: "Drawing review & mark-up complete", status: "pass" as const, note: null },
        { item: "WPS/PQR selection per joint", status: "pass" as const, note: null },
        { item: "ITP generated and approved", status: "pass" as const, note: null },
        { item: "Risk assessment (FMEA) for new scope", status: "warning" as const, note: "FMEA only for critical joints" },
      ],
      risks: [
        { category: "Scope Misinterpretation", severity: "medium" as const, detail: "Complex specs require senior review", mitigation: "Mandatory design review meeting with client" },
      ],
      hseNote: "",
    }
  },
  {
    id: "cutting", step: "Cutting /\nPreparation", time: "1 wk", risk: "none" as const, icon: Wrench, gate: false, hse: true,
    detail: {
      photos: [{ src: imgMachinePark, label: "Cutting equipment" }, { src: imgFactoryHero, label: "Preparation bay" }],
      checklist: [
        { item: "Cutting plan per nesting layout", status: "pass" as const, note: null },
        { item: "Edge preparation per WPS", status: "pass" as const, note: null },
        { item: "Traceability transfer to cut pieces", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Material Waste", severity: "low" as const, detail: "Nesting software optimises yield to >92%", mitigation: null },
      ],
      hseNote: "Grinding and cutting: mandatory eye/ear protection, spark containment, fire extinguisher within 5m",
    }
  },
  {
    id: "welding", step: "Welding /\nFabrication", time: "3 wk", risk: "critical" as const, icon: Flame, gate: true, hse: true,
    detail: {
      photos: [{ src: imgWeldInspection, label: "GTAW root pass" }, { src: imgWeldDefect, label: "Weld quality close-up" }],
      checklist: [
        { item: "Welder qualification valid for scope", status: "pass" as const, note: null },
        { item: "WPS/PQR approved and at station", status: "pass" as const, note: null },
        { item: "Preheat temperature verified", status: "pass" as const, note: null },
        { item: "Interpass temperature monitored", status: "warning" as const, note: "Manual monitoring — no data logger" },
        { item: "Root pass visual + PT before fill", status: "pass" as const, note: null },
        { item: "Filler material batch traceability", status: "fail" as const, note: "Gap: cryo filler batches not fully traced" },
      ],
      risks: [
        { category: "Weld Porosity", severity: "high" as const, detail: "Root pass porosity pattern detected (3x in 12mo)", mitigation: "Mandate WPS revalidation + welder retest on Inconel" },
        { category: "Distortion", severity: "medium" as const, detail: "Large bore fabrication prone to angular distortion", mitigation: "Stage inspection at fit-up before final weld" },
      ],
      hseNote: "Welding fume extraction mandatory. Fire watch required for GTAW areas. Hot work permit for each shift.",
    }
  },
  {
    id: "heat-treatment", step: "Heat\nTreatment", time: "1 wk", risk: "bottleneck" as const, icon: Thermometer, gate: true, hse: true,
    detail: {
      photos: [{ src: imgHeatTreatmentFurnace, label: "HT furnace bay" }, { src: imgHeatTreatmentMonitoring, label: "Temperature monitoring" }],
      checklist: [
        { item: "Furnace calibration valid", status: "pass" as const, note: null },
        { item: "Thermocouple placement per procedure", status: "pass" as const, note: null },
        { item: "Temperature uniformity survey current", status: "warning" as const, note: "TUS last done 8 months ago" },
        { item: "Heating/cooling rates recorded", status: "pass" as const, note: null },
        { item: "Post-HT hardness verification", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Capacity Bottleneck", severity: "high" as const, detail: "Single furnace — max 2 batches/day. Any breakdown stops production.", mitigation: "Pre-book HT slots, identify backup facility" },
        { category: "Over-tempering", severity: "medium" as const, detail: "Risk on Duplex if hold time exceeded", mitigation: "Automated furnace controller with alarm" },
      ],
      hseNote: "Burn risk zone. Restricted access. Heat-resistant PPE mandatory. Emergency shower within 10m.",
    }
  },
  {
    id: "cnc", step: "CNC\nMachining", time: "2 wk", risk: "none" as const, icon: Cpu, gate: false, hse: false,
    detail: {
      photos: [{ src: imgCNCmachine, label: "CNC turning centre" }, { src: imgDMGnlx, label: "DMG NLX 5-axis" }],
      checklist: [
        { item: "CNC program verified (first article)", status: "pass" as const, note: null },
        { item: "Tool wear monitoring active", status: "pass" as const, note: null },
        { item: "In-process measurement (probe)", status: "pass" as const, note: null },
        { item: "Surface finish Ra verification", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Dimensional Deviation", severity: "low" as const, detail: "5-axis with probing achieves IT6 consistently", mitigation: null },
      ],
      hseNote: "",
    }
  },
  {
    id: "surface", step: "Surface\nTreatment", time: "1 wk", risk: "none" as const, icon: Layers, gate: false, hse: true,
    detail: {
      photos: [{ src: imgCoatingFailure, label: "Surface treatment line" }, { src: imgHSEinspection, label: "Chemical storage area" }],
      checklist: [
        { item: "Passivation / pickling per ASTM A380", status: "pass" as const, note: null },
        { item: "Coating thickness verification (DFT)", status: "pass" as const, note: null },
        { item: "Cleanliness level ISO 15001", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Chemical Handling", severity: "medium" as const, detail: "Acid pickling requires certified operators", mitigation: "Monthly refresher training" },
      ],
      hseNote: "Chemical hazard zone. Full face shield, acid-resistant gloves, emergency eye wash station mandatory.",
    }
  },
  {
    id: "assembly", step: "Assembly /\nIntegration", time: "2 wk", risk: "none" as const, icon: Package, gate: true, hse: false,
    detail: {
      photos: [{ src: imgAssemblyStation, label: "Assembly station" }, { src: imgRotatingEquipment, label: "Component integration" }],
      checklist: [
        { item: "Sub-assembly dimensional verification", status: "pass" as const, note: null },
        { item: "Torque values per spec", status: "pass" as const, note: null },
        { item: "Gasket/seal installation verified", status: "pass" as const, note: null },
        { item: "Pre-assembly cleanliness check", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Fit-up Error", severity: "low" as const, detail: "Template-guided assembly with QC sign-off", mitigation: null },
      ],
      hseNote: "",
    }
  },
  {
    id: "ndt", step: "NDT /\nInspection", time: "2 wk", risk: "bottleneck" as const, icon: Eye, gate: true, hse: false,
    detail: {
      photos: [{ src: imgAuditInspection, label: "NDT inspection" }, { src: imgInspector, label: "NDT Level III operator" }],
      checklist: [
        { item: "RT/UT per ITP acceptance criteria", status: "pass" as const, note: null },
        { item: "MT/PT on accessible surfaces", status: "pass" as const, note: null },
        { item: "NDT operator Level II/III qualified", status: "warning" as const, note: "Only 1 Level III — single point of failure" },
        { item: "Film quality / digital UT data archived", status: "pass" as const, note: null },
        { item: "TOFD for critical welds (outsourced)", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Personnel Bottleneck", severity: "high" as const, detail: "Single NDT Level III for all interpretation", mitigation: "Cross-train Level II, contract backup Level III" },
        { category: "Delayed Reporting", severity: "medium" as const, detail: "RT film development adds 2-3 days", mitigation: "Transition to digital RT (planned Q4)" },
      ],
      hseNote: "",
    }
  },
  {
    id: "pressure", step: "Pressure\nTest", time: "3d", risk: "critical" as const, icon: Gauge, gate: true, hse: true,
    detail: {
      photos: [{ src: imgStorageTanks, label: "Pressure test bay" }, { src: imgDimensionalControl, label: "Safety exclusion zone" }],
      checklist: [
        { item: "Test procedure approved by client/TPI", status: "pass" as const, note: null },
        { item: "Pressure gauge calibration valid", status: "pass" as const, note: null },
        { item: "Safety exclusion zone established", status: "pass" as const, note: null },
        { item: "Hold time per code (ASME/PED)", status: "pass" as const, note: null },
        { item: "Leak detection method defined", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Safety Incident", severity: "high" as const, detail: "High-pressure hydro test — catastrophic failure risk", mitigation: "Remote monitoring, blast shields, exclusion zone enforced" },
        { category: "Weld Failure at Test", severity: "medium" as const, detail: "Root cause usually from upstream welding defects", mitigation: "Ensure 100% NDT acceptance before test" },
      ],
      hseNote: "HIGH PRESSURE ZONE. Exclusion radius 15m. Remote monitoring only during hold. Emergency stop accessible. Medical team on standby.",
    }
  },
  {
    id: "final-qc", step: "Final QC /\nDocumentation", time: "1 wk", risk: "none" as const, icon: CheckCircle2, gate: true, hse: false,
    detail: {
      photos: [{ src: imgCertification, label: "Final inspection report" }, { src: imgDimensionalControl, label: "CMM final dims" }],
      checklist: [
        { item: "Final dimensional report complete", status: "pass" as const, note: null },
        { item: "MDR / data book compiled", status: "pass" as const, note: null },
        { item: "All NCRs closed or dispositioned", status: "pass" as const, note: null },
        { item: "Client/TPI release obtained", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Documentation Delay", severity: "low" as const, detail: "Structured MDR template reduces errors", mitigation: null },
      ],
      hseNote: "",
    }
  },
  {
    id: "packing", step: "Packing /\nPreservation", time: "3d", risk: "none" as const, icon: Box, gate: false, hse: false,
    detail: {
      photos: [{ src: imgEquipmentIntel, label: "Export packing" }, { src: imgCapacityAssessment, label: "Crating & preservation" }],
      checklist: [
        { item: "Preservation per client spec", status: "pass" as const, note: null },
        { item: "Export packaging (seaworthy)", status: "pass" as const, note: null },
        { item: "Shipping marks and labels correct", status: "pass" as const, note: null },
        { item: "Packing list matches BOM", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Transport Damage", severity: "low" as const, detail: "Custom crating with shock indicators", mitigation: null },
      ],
      hseNote: "",
    }
  },
  {
    id: "outgoing", step: "Outgoing\nWarehouse", time: "—", risk: "none" as const, icon: Truck, gate: false, hse: false,
    detail: {
      photos: [{ src: imgOutgoingWarehouse, label: "Dispatch & loading bay" }, { src: imgShippingStaged, label: "Staged for shipment" }],
      checklist: [
        { item: "Release note signed by QA", status: "pass" as const, note: null },
        { item: "Transport documentation complete", status: "pass" as const, note: null },
        { item: "Customs / export clearance", status: "pass" as const, note: null },
      ],
      risks: [
        { category: "Logistics Delay", severity: "low" as const, detail: "Pre-booked transport slots", mitigation: null },
      ],
      hseNote: "",
    }
  },
];

const SupplierProfileModal = ({ open, onOpenChange, supplier }: Props) => {
  const [activeSection, setActiveSection] = useState("identity");
  const [activeProcessStep, setActiveProcessStep] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; label: string } | null>(null);

  if (!supplier) return null;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(`profile-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] overflow-hidden p-0 gap-0 bg-[hsl(0,0%,85%)] border-none rounded-none">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-foreground/10 bg-[hsl(0,0%,88%)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] mb-2 text-foreground/40">
                Verified Supplier Digital Twin — AI-Native Profile
              </p>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{supplier.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-foreground/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {supplier.country}
                </span>
                <span className="text-sm text-foreground/50">{supplier.category}</span>
                <span className="text-[hsl(var(--warning))] text-sm">★ {supplier.rating}</span>
                <span className={`text-xs font-medium px-2 py-0.5 ${
                  supplier.risk === "Low"
                    ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]'
                    : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                }`}>{supplier.risk} Risk</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground tracking-tight">{supplier.fitScore}%</div>
              <div className="text-[10px] text-foreground/40 uppercase tracking-wider">AI Fit Score</div>
            </div>
          </div>

          {/* Section nav */}
          <div className="flex gap-px mt-4 overflow-x-auto pb-1 scrollbar-hide bg-foreground/10">
            {profileSections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeSection === s.id
                    ? 'bg-foreground text-white'
                    : 'bg-[hsl(0,0%,88%)] text-foreground/50 hover:text-foreground'
                }`}
              >
                <s.icon className="w-3 h-3" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 space-y-4 max-h-[calc(95vh-200px)]">

          {/* ═══════════ LAYER 1: IDENTITY TWIN ═══════════ */}
          <ProfileSection title="Layer 1 — Identity Twin: Who is the supplier?" icon={Fingerprint} id="profile-identity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-1">
                <DataRow label="Legal Entity" value={supplier.name} verification="verified" />
                <DataRow label="Trade Name" value={supplier.name.split(" ")[0]} verification="verified" />
                <DataRow label="D-U-N-S" value="31-561-7842" mono verification="verified" />
                <DataRow label="VAT / Tax ID" value="DE814156529" mono verification="verified" />
                <DataRow label="Ownership" value="Parent Corp (89.4%) — Public Listed" verification="verified" />
                <DataRow label="UBO" value="Disclosed, KYC cleared" verification="verified" />
              </div>
              <div className="space-y-1">
                <DataRow label="HQ Location" value={`${supplier.country} · +01:00 UTC`} verification="verified" />
                <DataRow label="Sites / Plants" value="3 manufacturing, 2 service (Geo-Map)" verification="partial" />
                <DataRow label="Contacts + Roles" value="Sales (3), QA (2), Engineering (5), SCM (2)" verification="verified" />
                <DataRow label="Languages" value="EN, DE, FR, CN" verification="verified" />
                <DataRow label="Export Capability" value="Worldwide — EAR/ITAR compliant" verification="partial" />
                <DataRow label="Incoterms" value="DAP / FOB / CIF available" verification="verified" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white border border-foreground/10 p-4">
                <p className="text-xs font-medium text-foreground/40 mb-2 uppercase tracking-[0.1em]">PRODUCT / SERVICE PORTFOLIO</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Centrifugal Compressors", "Pumps", "Turbines", "Aftermarket Services"].map(p => (
                    <span key={p} className="text-xs bg-foreground/[0.04] text-foreground px-2.5 py-1 border border-foreground/10">{p}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-foreground/10 p-4">
                <p className="text-xs font-medium text-foreground/40 mb-2 uppercase tracking-[0.1em]">CERTIFICATIONS</p>
                <div className="flex flex-wrap gap-1.5">
                  {[...supplier.certifications, "ISO 14001", "ISO 3834-2", "PED"].map(c => (
                    <span key={c} className="text-xs font-mono bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] px-2.5 py-1">{c}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-foreground/10 p-4">
                <p className="text-xs font-medium text-foreground/40 mb-2 uppercase tracking-[0.1em]">MARKETS / INDUSTRIES</p>
                <div className="flex flex-wrap gap-1.5">
                  {["LNG/FLNG", "Offshore O&G", "Petrochemical", "Power Gen", "Hydrogen"].map(m => (
                    <span key={m} className="text-xs bg-foreground/[0.04] text-foreground px-2.5 py-1 border border-foreground/10">{m}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <DataRow label="Machine Park (high-level)" value="42 CNC, 8 lathes, 3 five-axis, 2 HT furnaces" verification="partial" />
              <DataRow label="Payment Capability" value="Net 60 / Bankable — Dun & Bradstreet A+" verification="verified" />
            </div>
          </ProfileSection>

          {/* ═══════════ LAYER 2: OPERATIONAL TWIN ═══════════ */}
          <ProfileSection title="Layer 2 — Operational Twin: How does the supplier actually work?" icon={Factory} id="profile-operational">
            <div className="p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 mb-4">
              <p className="text-xs font-medium text-[hsl(var(--accent))]">USP: Not self-declared — AI-guided, on-site verified operational truth.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Capacity (theoretical)", value: "1,200 units/yr", status: "verified" as const },
                { label: "Capacity (realistic)", value: "940 units/yr", status: "verified" as const },
                { label: "Current Utilization", value: "78%", status: "verified" as const },
                { label: "Capacity Window", value: "Q3–Q4 2026", status: "partial" as const },
              ].map(m => (
                <div key={m.label} className="bg-white border border-foreground/10 p-4 text-center">
                  <div className="text-xl font-mono text-foreground">{m.value}</div>
                  <div className="text-xs text-foreground/40 uppercase tracking-wider mt-1">{m.label}</div>
                  <div className="mt-2"><VerificationTag status={m.status} /></div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <DataRow label="Lead Time (historical avg)" value="14 weeks" mono verification="verified" />
              <DataRow label="Lead Time (current)" value="12 weeks" mono verification="verified" />
              <DataRow label="OTD (12-mo)" value="94.2% — trend: stable" verification="verified" />
              <DataRow label="Quality Trends" value="NCR rate declining (1.8% → 1.2%)" verification="verified" />
            </div>
            <p className="text-xs font-medium text-foreground/40 uppercase tracking-[0.1em] mt-4 mb-3">Process Maturity per Step</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
              <MaturityBadge score={5} label="Welding" />
              <MaturityBadge score={4} label="Machining" />
              <MaturityBadge score={4} label="Assembly" />
              <MaturityBadge score={3} label="Testing / NDT" />
              <MaturityBadge score={4} label="Heat Treatment" />
              <MaturityBadge score={3} label="Surface Treatment" />
              <MaturityBadge score={5} label="Dimensional Control" />
              <MaturityBadge score={4} label="Packaging / Dispatch" />
            </div>
            <div className="space-y-1">
              <DataRow label="Critical Bottlenecks" value="HT furnace (max 2 batches/day), NDT Level III (1 person)" verification="verified" />
              <DataRow label="Subsupplier Dependencies" value="Castings: 2 tier-2 foundries (single-source risk)" verification="partial" />
              <DataRow label="Change Mgmt Capability" value="Moderate — 3-week avg response to scope changes" verification="partial" />
              <DataRow label="Documentation Quality" value="4/5 — structured but some manual gaps" verification="verified" />
              <DataRow label="Traceability Maturity" value="4/5 — material full, filler partial" verification="verified" />
              <DataRow label="QA/QC Organisation" value="Independent QA dept, 12 inspectors, escalation to CEO" verification="verified" />
              <DataRow label="Shopfloor Discipline" value="4/5 — clean, organized, minor 5S gaps in tooling area" verification="verified" />
              <DataRow label="Maintenance / Housekeeping" value="PM cycle 12-mo, 92% uptime, condition-based for CNC" verification="partial" />
            </div>
          </ProfileSection>

          {/* ═══════════ LAYER 3: DECISION TWIN ═══════════ */}
          <ProfileSection title="Layer 3 — Decision Twin: How well does the supplier fit my need?" icon={Target} id="profile-decision">
            <div className="p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 mb-4">
              <p className="text-xs font-medium text-[hsl(var(--accent))]">Game-changer: Not just a profile — a decision copilot for procurement.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Fit-to-Requirement", value: `${supplier.fitScore}%`, sub: "for current RFQ/Package" },
                { label: "Risk Score", value: supplier.risk, sub: "qualitative + quantitative" },
                { label: "Cost Competitiveness", value: "Top 25%", sub: "TCO hypothesis" },
                { label: "Ramp-up Capability", value: "Medium", sub: "EPC / series start" },
              ].map(m => (
                <div key={m.label} className="bg-white border border-foreground/10 p-4 text-center">
                  <div className="text-xl font-mono text-foreground">{m.value}</div>
                  <div className="text-xs text-foreground uppercase mt-1">{m.label}</div>
                  <div className="text-[10px] text-foreground/40">{m.sub}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <DataRow label="Project Risk (EPC)" value="Medium — HT bottleneck at high volume" verification="verified" />
              <DataRow label="Compliance Fit" value="92% — gap in cryo filler traceability" verification="verified" />
              <DataRow label="Regional / Geo Risk" value="Low — stable jurisdiction, no sanctions" verification="verified" />
              <DataRow label="vs Reference Supplier" value="+12% tech fit, −38% cost, comparable delivery" verification="ai-inferred" />
              <DataRow label="Best Use Cases" value="Medium-pressure rotating equipment, API scope" verification="ai-inferred" />
              <DataRow label="Limitations" value="Not recommended for ultra-cryogenic (<-196°C)" verification="ai-inferred" />
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20">
              <p className="text-xs font-medium text-[hsl(var(--accent))] uppercase mb-3 tracking-[0.1em]">AI-GENERATED RECOMMENDATION</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Use", active: false },
                  { label: "Use with conditions", active: true },
                  { label: "Develop first", active: false },
                  { label: "Do not use for critical scope", active: false },
                ].map(r => (
                  <span key={r.label} className={`text-sm px-3 py-1.5 border ${
                    r.active
                      ? 'bg-foreground text-white border-foreground font-bold'
                      : 'bg-white text-foreground/50 border-foreground/10'
                  }`}>{r.label}</span>
                ))}
              </div>
              <p className="text-sm text-foreground/50 mt-3 italic">
                Condition: Pre-qualify HT process for cryogenic scope. Recommend resident inspector for first order. FAI mandatory.
              </p>
            </div>
          </ProfileSection>

          {/* ═══════════ A) KNOWLEDGE GRAPH ═══════════ */}
          <ProfileSection title="A) 360° Supplier Identity Graph (Knowledge Graph)" icon={GitBranch} id="profile-knowledge-graph">
            <p className="text-sm text-foreground/50 mb-4">AI reasons on relationships — not just tables.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <GraphNode label="Supplier" connections="Sites, Sub-suppliers" />
              <GraphNode label="Sites / Plants" connections="Processes" />
              <GraphNode label="Processes" connections="Machines" />
              <GraphNode label="Machines" connections="Tolerances" />
              <GraphNode label="Capabilities" connections="Standards / Certs" />
              <GraphNode label="Customer References" connections="Supplier" />
              <GraphNode label="Sub-suppliers" connections="Supplier" />
              <GraphNode label="Incidents / NCRs" connections="Audits" />
              <GraphNode label="Regional Risks" connections="Supplier" />
              <GraphNode label="Materials / Product Families" connections="Supplier" />
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15">
              <p className="text-xs font-medium text-[hsl(var(--accent))]">ADVANTAGE: AI can reason — "Can this supplier really handle this scope?" — by traversing graph relationships.</p>
            </div>
          </ProfileSection>

          {/* ═══════════ B) TIME MACHINE ═══════════ */}
          <ProfileSection title="B) Time Machine / Evolution Layer" icon={Clock} id="profile-time-machine">
            <p className="text-sm text-foreground/50 mb-4">A Twin must understand time. "Supplier changed significantly in the last 12 months" → AI summarises what improved/deteriorated.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { event: "Audit / Re-Assessment Timeline", detail: "Last: 2025-01-15 · Next scheduled: 2025-07", status: "verified" as const },
                { event: "Certificate Changes", detail: "ISO 9001 renewed 2025-08 · API Q1 expiry 2026-03", status: "verified" as const },
                { event: "Quality / Delivery Trends", detail: "OTD improved +4%, NCR rate −0.6% YoY", status: "verified" as const },
                { event: "CAPA / NCR History", detail: "14 CAPAs in 24mo, 12 closed effectively", status: "verified" as const },
                { event: "Capacity Changes", detail: "New CNC line added Q2-2025 (+15% capacity)", status: "partial" as const },
                { event: "New Equipment / Halls", detail: "Hall 4 commissioned Q1-2025 (assembly)", status: "partial" as const },
                { event: "Ownership / Mgmt Change", detail: "No changes in 36 months", status: "verified" as const },
                { event: "Sanctions / Regulations", detail: "No new exposure — monitored weekly", status: "verified" as const },
                { event: "Commodity Exposure", detail: "Nickel +22% YoY — moderate impact", status: "ai-inferred" as const },
              ].map(e => (
                <div key={e.event} className="flex items-start gap-3 bg-white border border-foreground/10 p-4">
                  <Clock className="w-4 h-4 text-foreground/30 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{e.event}</div>
                    <div className="text-xs text-foreground/50">{e.detail}</div>
                  </div>
                  <VerificationTag status={e.status} />
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* ═══════════ C) EVIDENCE VAULT ═══════════ */}
          <ProfileSection title="C) Evidence Vault / Ground Truth Layer" icon={Camera} id="profile-evidence">
            <div className="p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 mb-4">
              <p className="text-xs font-medium text-[hsl(var(--accent))]">Not just statements — evidence. Every field has an Evidence Confidence Status.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {[
                { name: "Audit Photos (geotagged/timestamped)", type: "IMG", count: "47 photos", status: "verified" as const },
                { name: "Videos (production walkthrough)", type: "MP4", count: "3 clips", status: "verified" as const },
                { name: "Interview Transcripts", type: "PDF", count: "5 sessions", status: "verified" as const },
                { name: "WPS/PQR Package (48 procedures)", type: "ZIP", count: "48 docs", status: "verified" as const },
                { name: "ISO Certificates + Calibrations", type: "PDF", count: "12 docs", status: "verified" as const },
                { name: "Org Charts + Competency Matrix", type: "PDF", count: "3 docs", status: "partial" as const },
                { name: "Production Observations", type: "JSON", count: "28 entries", status: "verified" as const },
                { name: "Checklist Results", type: "PDF", count: "6 checklists", status: "verified" as const },
                { name: "Measurement / Sample Data", type: "CSV", count: "142 records", status: "verified" as const },
                { name: "Signed Audit Evidence Package", type: "ZIP", count: "1 package", status: "verified" as const },
              ].map(doc => (
                <div key={doc.name} className="flex items-center gap-3 bg-white border border-foreground/10 px-4 py-3">
                  <FileText className="w-4 h-4 text-foreground/30 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{doc.name}</div>
                    <div className="text-xs text-foreground/50 font-mono">{doc.type} · {doc.count}</div>
                  </div>
                  <VerificationTag status={doc.status} />
                </div>
              ))}
            </div>
            <p className="text-xs font-medium text-foreground/40 uppercase tracking-[0.1em] mb-2">Evidence Confidence Status Levels</p>
            <div className="flex flex-wrap gap-2">
              <VerificationTag status="unverified" />
              <VerificationTag status="partial" />
              <VerificationTag status="verified" />
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-sm text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10">
                <Shield className="w-3 h-3" /> Third-party verified
              </span>
              <VerificationTag status="ai-inferred" />
            </div>
          </ProfileSection>

          {/* ═══════════ D) CAPABILITY DNA ═══════════ */}
          <ProfileSection title="D) Capability DNA / Manufacturing Capability Model" icon={Gauge} id="profile-capability-dna">
            <p className="text-sm text-foreground/50 mb-4">Not just "does welding" — how good, in what spectrum, with what risk. Maturity (1–5) + Confidence + Evidence links.</p>
            <div className="space-y-1 mb-4">
              <DataRow label="Materials Handled" value="CS, SS 316L, Duplex 2205, Inconel 625, Monel" verification="verified" />
              <DataRow label="Thickness Ranges" value="2mm – 120mm" mono verification="verified" />
              <DataRow label="Tolerances Achieved" value="IT6 / ±0.01mm" mono verification="verified" />
              <DataRow label="Heat Treatment" value="Normalising, Stress Relief, PWHT — in-house" verification="verified" />
              <DataRow label="NDT Capability" value="UT, RT, MT, PT — in-house; TOFD outsourced" verification="verified" />
              <DataRow label="Welding Processes" value="GTAW, SMAW, SAW, FCAW — 48 WPS qualified" verification="verified" />
              <DataRow label="Pressure Testing" value="Hydrostatic up to 500 bar" mono verification="verified" />
              <DataRow label="Machining Envelope" value="Ø 2400mm × 6000mm, 5-axis available" mono verification="partial" />
              <DataRow label="Crane Capacity" value="80t (main hall), 20t (assembly)" mono verification="verified" />
              <DataRow label="Cleanliness / Packaging" value="ISO 15001 compliant, custom export packaging" verification="partial" />
              <DataRow label="Documentation Package" value="4/5 maturity — MDR, ITP, as-built" verification="verified" />
            </div>
            <p className="text-xs font-medium text-foreground/40 uppercase tracking-[0.1em] mb-3">Capability Maturity Scores</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <MaturityBadge score={5} label="Welding (GTAW/SAW)" />
              <MaturityBadge score={4} label="CNC Machining" />
              <MaturityBadge score={4} label="NDT (in-house)" />
              <MaturityBadge score={3} label="Heat Treatment" />
              <MaturityBadge score={4} label="Dimensional Control" />
              <MaturityBadge score={3} label="Surface Treatment" />
              <MaturityBadge score={5} label="Assembly / Integration" />
              <MaturityBadge score={4} label="Documentation" />
            </div>
          </ProfileSection>

          {/* ═══════════ E) PROCESS DIGITAL TWIN ═══════════ */}
          <ProfileSection title="E) Process Digital Twin (Shopfloor)" icon={Layers} id="profile-process-twin">
            <p className="text-sm text-foreground/50 mb-4">End-to-end manufacturing flow — click any step for detail panel with photos, checklist, and risk assessment.</p>
            
            {/* ── Animated Process Flow ── */}
            <div className="relative mb-6">
              <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-3">Manufacturing Process Flow <span className="text-foreground/50 normal-case">— click a step for details</span></p>
              <div className="relative overflow-x-auto pb-4">
                <div className="flex items-stretch gap-0 min-w-[900px]">
                  {processSteps.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center"
                    >
                      <div
                        className="relative flex flex-col items-center cursor-pointer"
                        onClick={() => setActiveProcessStep(activeProcessStep === i ? null : i)}
                      >
                        {/* Risk / HSE badges */}
                        <div className="flex gap-0.5 mb-1 h-5">
                          {s.risk === "bottleneck" && (
                            <span className="text-[9px] font-mono font-bold bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))] px-1.5 py-0.5 rounded-sm border border-[hsl(var(--destructive))]/30 uppercase">Bottleneck</span>
                          )}
                          {s.risk === "critical" && (
                            <span className="text-[9px] font-mono font-bold bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))] px-1.5 py-0.5 rounded-sm border border-[hsl(var(--destructive))]/30 uppercase">Critical</span>
                          )}
                          {s.hse && (
                            <span className="text-[9px] font-mono bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))] px-1.5 py-0.5 rounded-sm border border-[hsl(var(--warning))]/30 uppercase">HSE</span>
                          )}
                        </div>
                        {/* Process step box */}
                        <div className={`relative w-[85px] h-[85px] flex flex-col items-center justify-center rounded-sm border text-center transition-all ${
                          activeProcessStep === i
                            ? 'bg-[hsl(var(--accent))]/15 border-[hsl(var(--accent))]/50 ring-1 ring-[hsl(var(--accent))]/30'
                            : s.risk === "bottleneck" ? 'bg-[hsl(var(--destructive))]/10 border-[hsl(var(--destructive))]/30 hover:bg-[hsl(var(--destructive))]/15'
                            : s.risk === "critical" ? 'bg-[hsl(var(--destructive))]/8 border-[hsl(var(--destructive))]/20 hover:bg-[hsl(var(--destructive))]/12'
                            : 'bg-white border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.03]'
                        }`}>
                          <s.icon className={`w-5 h-5 mb-1 ${
                            activeProcessStep === i ? 'text-[hsl(var(--accent))]'
                            : s.risk === "bottleneck" || s.risk === "critical" ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--accent))]'
                          }`} />
                          <div className="text-[10px] text-foreground font-medium leading-tight whitespace-pre-line">{s.step}</div>
                        </div>
                        {/* Time */}
                        <div className="text-[10px] font-mono text-foreground/50 mt-1">{s.time}</div>
                        {/* Quality gate */}
                        {s.gate && (
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                            <span className="text-[9px] font-mono text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded-sm border border-[hsl(var(--accent))]/20">QG</span>
                          </div>
                        )}
                        {/* Active indicator */}
                        {activeProcessStep === i && (
                          <motion.div
                            layoutId="processIndicator"
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[hsl(var(--accent))]/30"
                          />
                        )}
                      </div>
                      {/* Arrow connector */}
                      {i < processSteps.length - 1 && (
                        <div className="flex items-center px-0.5">
                          <motion.div
                            animate={s.risk !== "none" ? { opacity: [0.4, 1, 0.4] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className={`w-3 h-3 ${
                              s.risk === "bottleneck" || s.risk === "critical" ? 'text-[hsl(var(--destructive))]' : 'text-foreground/20'
                            }`} />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── Expanded Detail Panel ── */}
              <AnimatePresence>
                {activeProcessStep !== null && processSteps[activeProcessStep] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-8"
                  >
                    {(() => {
                      const step = processSteps[activeProcessStep];
                      return (
                         <div className="bg-foreground/[0.02] border border-[hsl(var(--accent))]/20 rounded-sm overflow-hidden">
                          {/* Detail header */}
                          <div className="flex items-center justify-between px-4 py-3 bg-[hsl(var(--accent))]/5 border-b border-[hsl(var(--accent))]/10">
                            <div className="flex items-center gap-3">
                              <step.icon className={`w-5 h-5 ${step.risk !== 'none' ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--accent))]'}`} />
                              <div>
                                <h4 className="text-sm text-foreground font-medium">{step.step.replace('\n', ' ')}</h4>
                                <span className="text-[10px] text-foreground/50 font-mono">Duration: {step.time} · Step {activeProcessStep + 1} of {processSteps.length}</span>
                              </div>
                            </div>
                            <button onClick={() => setActiveProcessStep(null)} className="text-foreground/50 hover:text-foreground transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Photos */}
                            <div>
                              <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Evidence Photos</p>
                              <div className="grid grid-cols-2 gap-2">
                                {step.detail.photos.map((photo, pi) => (
                                  <div key={pi} className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-foreground/10">
                                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                                      <span className="text-[10px] text-white">{photo.label}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 text-[10px] text-foreground/50 italic">
                                {step.detail.photos.length} photos · geotagged · timestamped
                              </div>
                            </div>

                            {/* Checklist */}
                            <div>
                              <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Inspection Checklist</p>
                              <div className="space-y-2">
                                {step.detail.checklist.map((item, ci) => (
                                  <div key={ci} className="flex items-start gap-2">
                                <div className={`w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                      item.status === 'pass' ? 'bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))]'
                                      : item.status === 'warning' ? 'bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]'
                                      : 'bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))]'
                                    }`}>
                                      {item.status === 'pass' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                    </div>
                                    <div>
                                      <span className="text-xs text-foreground">{item.item}</span>
                                      {item.note && <p className="text-[10px] text-foreground/50">{item.note}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Risk Details */}
                            <div>
                              <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Risk Assessment</p>
                              <div className="space-y-2">
                                {step.detail.risks.map((risk, ri) => (
                                  <div key={ri} className={`p-3 rounded-sm border ${
                                    risk.severity === 'high' ? 'bg-[hsl(var(--destructive))]/8 border-[hsl(var(--destructive))]/20'
                                    : risk.severity === 'medium' ? 'bg-[hsl(var(--warning))]/8 border-[hsl(var(--warning))]/20'
                                    : 'bg-white border-foreground/10'
                                  }`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-foreground font-medium">{risk.category}</span>
                                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase ${
                                        risk.severity === 'high' ? 'bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))]'
                                        : risk.severity === 'medium' ? 'bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]'
                                        : 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]'
                                      }`}>{risk.severity}</span>
                                    </div>
                                    <p className="text-[10px] text-foreground/50">{risk.detail}</p>
                                    {risk.mitigation && (
                                      <p className="text-[10px] text-[hsl(var(--accent))] mt-1">↳ {risk.mitigation}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                              {step.hse && (
                              <div className="mt-2 p-3 bg-[hsl(var(--warning))]/8 border border-[hsl(var(--warning))]/20 rounded-sm">
                                  <p className="text-[10px] font-mono text-[hsl(var(--warning))] uppercase mb-1">HSE Requirements</p>
                                  <p className="text-xs text-foreground/50">{step.detail.hseNote}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-3 border-t border-foreground/5">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30" /><span className="text-[10px] text-foreground/50">Bottleneck</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[hsl(var(--destructive))]/8 border border-[hsl(var(--destructive))]/20" /><span className="text-[10px] text-foreground/50">Critical Area</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[hsl(var(--warning))]/15 border border-[hsl(var(--warning))]/30" /><span className="text-[10px] text-foreground/50">HSE Critical</span></div>
                <div className="flex items-center gap-1.5"><span className="text-[9px] font-mono text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-1.5 py-0.5 rounded-sm border border-[hsl(var(--accent))]/20">QG</span><span className="text-[10px] text-foreground/50">Quality Gate</span></div>
              </div>
            </div>

            {/* ── Workshop / Production Images ── */}
            <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Production Area Evidence</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              {[
                { src: imgIncomingWarehouse, label: "Incoming Warehouse" },
                { src: imgWeldInspection, label: "Welding Bay" },
                { src: imgCNCmachine, label: "CNC Machining" },
                { src: imgCMMmeasurement, label: "CMM Measurement" },
                { src: imgHSEinspection, label: "HSE Inspection" },
                { src: imgControlPlan, label: "Control Plan" },
              ].map(img => (
                <div key={img.label} className="group relative aspect-square rounded-sm overflow-hidden border border-foreground/10 cursor-pointer hover:border-[hsl(var(--accent))]/30 transition-all">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                    <span className="text-[10px] text-white font-medium">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <DataRow label="Typical Total Lead Time" value="18 weeks" mono verification="verified" />
              <DataRow label="Bottlenecks" value="HT furnace (max 2 batches/day), NDT Level III (1 person)" verification="verified" />
              <DataRow label="Quality Gates" value="7 gates defined — ITP-based" verification="verified" />
              <DataRow label="HSE Critical Zones" value="Welding (fume), HT (burn risk), Surface (chemical), Pressure Test (high-pressure)" verification="verified" />
              <DataRow label="Documented Weaknesses" value="Sub-tier casting traceability, rework at weld-fit-up" verification="verified" />
              <DataRow label="Delay Root Causes" value="60% material, 25% capacity, 15% documentation" verification="ai-inferred" />
              <DataRow label="Rework Zones" value="Weld-fit-up station (3.2% rework rate)" verification="verified" />
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 rounded-sm">
              <p className="text-xs font-mono text-[hsl(var(--accent))] mb-2">AI PREDICTIONS</p>
            <div className="space-y-1.5 text-sm text-foreground/50">
                <p>• Delay risk: Medium (procurement-driven, mitigate with pre-ordering)</p>
                <p>• Likely failure modes: Weld porosity at root pass, dimensional deviation on large bore</p>
                <p>• Recommended controls: Stage inspection at fit-up, 100% RT on critical welds</p>
                <p>• HSE recommendation: Mandatory PPE audit before site access, fire watch for GTAW areas</p>
              </div>
            </div>
          </ProfileSection>

          {/* ═══════════ F) RISK TWIN ═══════════ */}
          <ProfileSection title="F) Risk Twin (Dynamic, Explainable)" icon={AlertTriangle} id="profile-risk-twin">
            <p className="text-sm text-foreground/50 mb-4">Not static — dynamic. Explainable AI. Risk under your specific package.</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              <RiskCategoryCard label="Quality Risk" score="Low" icon={ShieldCheck} detail="1.2% NCR rate, declining trend" />
              <RiskCategoryCard label="Delivery Risk" score="Medium" icon={Truck} detail="OTD 94%, but HT bottleneck at scale" />
              <RiskCategoryCard label="Capacity Risk" score="Medium" icon={Gauge} detail="78% utilization — limited buffer" />
              <RiskCategoryCard label="Financial Risk" score="Low" icon={DollarSign} detail="Strong balance sheet, D&B A+" />
              <RiskCategoryCard label="Compliance Risk" score="Low" icon={Scale} detail="Clean sanctions, active export license" />
              <RiskCategoryCard label="ESG / HSE Risk" score="Medium" icon={Leaf} detail="Scope 1+2 reported, Scope 3 partial" />
              <RiskCategoryCard label="Geo / Regional Risk" score="Low" icon={Globe} detail="EU-based, stable jurisdiction" />
              <RiskCategoryCard label="Single-Point-of-Failure" score="Medium" icon={AlertTriangle} detail="Single NDT Level III, single HT furnace" />
              <RiskCategoryCard label="Subsupplier Dependency" score="Medium" icon={Cable} detail="2 tier-2 foundries, limited alternatives" />
              <RiskCategoryCard label="Documentation Risk" score="Low" icon={FileText} detail="4/5 maturity, structured MDR" />
              <RiskCategoryCard label="Project Execution Risk" score="Medium" icon={Activity} detail="First EPC project — learning curve" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white border border-foreground/10 rounded-sm">
                <p className="text-xs font-mono text-[hsl(var(--warning))] mb-2">⚠ EARLY WARNING INDICATORS</p>
                <div className="space-y-1.5 text-sm text-foreground/50">
                  <p>• OTD trend deteriorating last 2 months</p>
                  <p>• 2 repeat NCR patterns detected</p>
                  <p>• Nickel price volatility (+22% YoY)</p>
                </div>
              </div>
              <div className="p-4 bg-white border border-foreground/10 rounded-sm">
                <p className="text-xs font-mono text-[hsl(var(--accent))] mb-2">MITIGATION ACTIONS</p>
                <div className="space-y-1.5 text-sm text-foreground/50">
                  <p>• Pre-book HT furnace slots for critical path</p>
                  <p>• Qualify alternative casting subsupplier</p>
                  <p>• Deploy resident inspector for first order</p>
                </div>
              </div>
            </div>
          </ProfileSection>

          {/* ═══════════ G) COMMERCIAL TWIN ═══════════ */}
          <ProfileSection title="G) Commercial Twin / Procurement Intelligence" icon={DollarSign} id="profile-commercial">
            <p className="text-sm text-foreground/50 mb-4">TCO instead of unit price only. Real procurement value.</p>
            <div className="space-y-1">
              <DataRow label="Price Level Hypothesis" value="Mid-range — 10-15% below Tier-1 OEMs" verification="ai-inferred" />
              <DataRow label="Should-Cost Indicators" value="€85k–€110k per unit (range-based)" mono verification="ai-inferred" />
              <DataRow label="Cost Driver Map" value="Material 42% · Labor 28% · Energy 8% · Overhead 14% · Logistics 8%" verification="ai-inferred" />
              <DataRow label="MOQ / Lot-size" value="5 units or €50k min order value" mono verification="verified" />
              <DataRow label="Payment Terms" value="Net 60 / 2% discount at Net 10" verification="verified" />
              <DataRow label="Commercial Flexibility" value="Open to framework agreements, consignment stock" verification="partial" />
              <DataRow label="Negotiation Levers" value="Volume commitment (>€2M) unlocks 8% discount" verification="ai-inferred" />
              <DataRow label="Regional Sourcing" value="EU advantage: no import duties, short logistics" verification="verified" />
              <DataRow label="Logistics Routes" value="Road (EU), sea (global) — 2-3 week transit" verification="partial" />
              <DataRow label="TCO Advantage" value="−18% vs benchmark (lower rework, closer logistics)" verification="ai-inferred" />
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 rounded-sm">
              <p className="text-xs font-mono text-[hsl(var(--accent))]">AI INSIGHT: Not the cheapest unit price, but probably best TCO for this package due to lower rework and closer logistics.</p>
            </div>
          </ProfileSection>

          {/* ═══════════ H) COMPLIANCE TWIN ═══════════ */}
          <ProfileSection title="H) Compliance & Standards Twin" icon={ShieldCheck} id="profile-compliance">
            <p className="text-sm text-foreground/50 mb-4">Not just a certificate list — which requirements are met, partially met, or gaps exist?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {[
                { standard: "ASME Sec VIII Div 1", readiness: 95, status: "Fulfilled", gap: "None" },
                { standard: "PED 2014/68/EU", readiness: 92, status: "Fulfilled", gap: "Minor doc gap" },
                { standard: "API 617 (Compressors)", readiness: 88, status: "Partial", gap: "Cryo filler traceability" },
                { standard: "ISO 3834-2 (Welding)", readiness: 96, status: "Fulfilled", gap: "None" },
                { standard: "EN 10204 (Material Certs)", readiness: 90, status: "Fulfilled", gap: "Sub-tier partial" },
                { standard: "NACE MR0175 (Sour Service)", readiness: 78, status: "Partial", gap: "HIC testing not routine" },
              ].map(s => (
                <div key={s.standard} className="bg-white border border-foreground/10 rounded-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground font-medium">{s.standard}</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
                      s.readiness >= 90 ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' : 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
                    }`}>{s.readiness}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: `${s.readiness}%` }} />
                  </div>
                  <div className="text-xs text-foreground/50">Gap: {s.gap}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <DataRow label="Requalification Status" value="Active — next review 2025-07" verification="verified" />
              <DataRow label="Expiry Tracking" value="API Q1 expires 2026-03 (auto-alert set)" verification="verified" />
              <DataRow label="Documentation Gaps" value="2 minor gaps in sub-tier traceability" verification="verified" />
            </div>
          </ProfileSection>

          {/* ═══════════ I) NCR / CAPA INTELLIGENCE ═══════════ */}
          <ProfileSection title="I) NCR / CAPA Intelligence Layer" icon={RefreshCw} id="profile-ncr-capa">
            <p className="text-sm text-foreground/50 mb-4">Predictive — not just descriptive. Pattern recognition for failure prevention.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Total NCRs (24mo)", value: "14" },
                { label: "Repeat Patterns", value: "2" },
                { label: "CAPAs Closed", value: "12/14" },
                { label: "Avg Time-to-Close", value: "28 days" },
              ].map(m => (
                <div key={m.label} className="bg-white border border-foreground/10 rounded-sm p-4 text-center">
                  <div className="text-xl font-mono text-[hsl(var(--accent))]">{m.value}</div>
                  <div className="text-xs text-foreground/50 uppercase mt-1">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <DataRow label="Failure Classification" value="Weld defects 40%, Dimensional 30%, Doc 20%, Other 10%" verification="verified" />
              <DataRow label="Repeat Failures" value="Weld porosity at root pass (3x in 12mo)" verification="verified" />
              <DataRow label="CAPA Effectiveness" value="85% — 2 CAPAs reopened after recurrence" verification="verified" />
              <DataRow label="Root Cause Maturity" value="3/5 — 5-Why used, Ishikawa partial" verification="verified" />
              <DataRow label="Escalation Pattern" value="CEO involved at NCR #3 — effective resolution" verification="partial" />
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 rounded-sm">
              <p className="text-xs font-mono text-[hsl(var(--accent))] mb-2">AI PATTERN RECOGNITION</p>
              <div className="space-y-1.5 text-sm text-foreground/50">
                <p>• Recurring pattern: root pass porosity → linked to welder qualification gaps for GTAW on Inconel</p>
                <p>• Preventive control: mandate WPS revalidation + welder retest before next order</p>
                <p>• Predicted failure probability for similar scope: 8% (down from 15% after last CAPA)</p>
              </div>
            </div>
          </ProfileSection>

          {/* ═══════════ J) SITE SHADOW ═══════════ */}
          <ProfileSection title="J) Digital Shadow of the Site (Visual)" icon={MapPin} id="profile-site-shadow">
            <p className="text-sm text-foreground/50 mb-4">Semi-visual operational map — clickable production zones, photos per area, audit route replay.</p>
            
            {/* Production zones — interactive */}
            <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Production Zones — Click to Explore</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {[
                { zone: "Hall 1 — CNC Machining", status: "Active", photos: [{ src: imgCNCmachine, label: "CNC Turning Centre" }, { src: imgDMGnlx, label: "DMG NLX 5-Axis" }], rating: "4/5", hse: false, details: "12 CNC machines, 5-axis capability, IT6 tolerance. Probe-based in-process measurement on all centres." },
                { zone: "Hall 2 — Welding Shop", status: "Active", photos: [{ src: imgWeldInspection, label: "GTAW Root Pass" }, { src: imgWeldDefect, label: "Weld Quality Check" }], rating: "5/5", hse: true, details: "GTAW, SMAW, SAW, FCAW. 48 qualified WPS. Fume extraction mandatory. Fire watch for all shifts." },
                { zone: "Hall 3 — Heat Treatment", status: "Active", photos: [{ src: imgHeatTreatmentFurnace, label: "HT Furnace Bay" }, { src: imgHeatTreatmentMonitoring, label: "Temperature Monitoring" }], rating: "3/5", hse: true, details: "Single furnace — max 2 batches/day. Bottleneck risk. TUS last done 8 months ago. Burn risk zone." },
                { zone: "Hall 4 — Assembly", status: "New (2025)", photos: [{ src: imgAssemblyStation, label: "Assembly Station" }, { src: imgRotatingEquipment, label: "Component Integration" }], rating: "4/5", hse: false, details: "New hall commissioned Q1-2025. Template-guided assembly with QC sign-off at each stage." },
                { zone: "NDT Lab", status: "Active", photos: [{ src: imgAuditInspection, label: "NDT Inspection" }, { src: imgInspector, label: "NDT Level III" }], rating: "4/5", hse: false, details: "UT, RT, MT, PT in-house. TOFD outsourced. Single Level III — personnel bottleneck risk." },
                { zone: "Metrology Room", status: "Active", photos: [{ src: imgCMMmeasurement, label: "CMM Measurement" }, { src: imgMeasurementSystems, label: "Measurement Systems" }], rating: "5/5", hse: false, details: "CMM with 3D scanning. Calibration current. Temperature-controlled environment." },
                { zone: "Incoming Warehouse", status: "Active", photos: [{ src: imgIncomingWarehouse, label: "Incoming Goods" }, { src: imgMaterialStock, label: "Material Storage" }], rating: "3/5", hse: false, details: "Barcode-based tracking. Sub-tier cert verification still manual. Storage conditions adequate." },
                { zone: "Dispatch / Packing", status: "Active", photos: [{ src: imgOutgoingWarehouse, label: "Dispatch Bay" }, { src: imgShippingStaged, label: "Staged for Shipment" }], rating: "4/5", hse: false, details: "Custom export crating. Shock indicators on all packages. Pre-booked transport slots." },
              ].map((z, zi) => (
                <div key={z.zone}>
                  <div 
                    onClick={() => setActiveZone(activeZone === zi ? null : zi)}
                    className={`bg-white border rounded-sm p-4 cursor-pointer transition-all ${
                      activeZone === zi 
                        ? 'border-[hsl(var(--accent))]/50 ring-1 ring-[hsl(var(--accent))]/20' 
                        : z.hse ? 'border-[hsl(var(--warning))]/30 hover:border-[hsl(var(--accent))]/30' : 'border-foreground/10 hover:border-[hsl(var(--accent))]/30'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs text-foreground font-medium">{z.zone}</span>
                      {z.hse && <span className="text-[9px] font-mono bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))] px-1.5 py-0.5 rounded-sm">HSE</span>}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-foreground/50">
                      <span>{z.status}</span>
                      <Camera className="w-3 h-3" />
                      <span>{z.photos.length}</span>
                      <span className="text-[hsl(var(--accent))]">★ {z.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded zone detail */}
            <AnimatePresence>
              {activeZone !== null && (() => {
                const zones = [
                  { zone: "Hall 1 — CNC Machining", photos: [{ src: imgCNCmachine, label: "CNC Turning Centre" }, { src: imgDMGnlx, label: "DMG NLX 5-Axis" }], rating: "4/5", hse: false, details: "12 CNC machines, 5-axis capability, IT6 tolerance. Probe-based in-process measurement on all centres." },
                  { zone: "Hall 2 — Welding Shop", photos: [{ src: imgWeldInspection, label: "GTAW Root Pass" }, { src: imgWeldDefect, label: "Weld Quality Check" }], rating: "5/5", hse: true, details: "GTAW, SMAW, SAW, FCAW. 48 qualified WPS. Fume extraction mandatory. Fire watch for all shifts." },
                  { zone: "Hall 3 — Heat Treatment", photos: [{ src: imgHeatTreatmentFurnace, label: "HT Furnace Bay" }, { src: imgHeatTreatmentMonitoring, label: "Temperature Monitoring" }], rating: "3/5", hse: true, details: "Single furnace — max 2 batches/day. Bottleneck risk. TUS last done 8 months ago. Burn risk zone." },
                  { zone: "Hall 4 — Assembly", photos: [{ src: imgAssemblyStation, label: "Assembly Station" }, { src: imgRotatingEquipment, label: "Component Integration" }], rating: "4/5", hse: false, details: "New hall commissioned Q1-2025. Template-guided assembly with QC sign-off at each stage." },
                  { zone: "NDT Lab", photos: [{ src: imgAuditInspection, label: "NDT Inspection" }, { src: imgInspector, label: "NDT Level III" }], rating: "4/5", hse: false, details: "UT, RT, MT, PT in-house. TOFD outsourced. Single Level III — personnel bottleneck risk." },
                  { zone: "Metrology Room", photos: [{ src: imgCMMmeasurement, label: "CMM Measurement" }, { src: imgMeasurementSystems, label: "Measurement Systems" }], rating: "5/5", hse: false, details: "CMM with 3D scanning. Calibration current. Temperature-controlled environment." },
                  { zone: "Incoming Warehouse", photos: [{ src: imgIncomingWarehouse, label: "Incoming Goods" }, { src: imgMaterialStock, label: "Material Storage" }], rating: "3/5", hse: false, details: "Barcode-based tracking. Sub-tier cert verification still manual. Storage conditions adequate." },
                  { zone: "Dispatch / Packing", photos: [{ src: imgOutgoingWarehouse, label: "Dispatch Bay" }, { src: imgShippingStaged, label: "Staged for Shipment" }], rating: "4/5", hse: false, details: "Custom export crating. Shock indicators on all packages. Pre-booked transport slots." },
                ];
                const z = zones[activeZone];
                return (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="bg-white border border-[hsl(var(--accent))]/20 rounded-sm overflow-hidden">
                      <div className="flex items-center justify-between px-5 py-3 bg-[hsl(var(--accent))]/5 border-b border-[hsl(var(--accent))]/10">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-[hsl(var(--accent))]" />
                          <div>
                            <h4 className="text-sm text-foreground font-medium">{z.zone}</h4>
                            <span className="text-xs text-foreground/50">Rating: {z.rating} {z.hse ? '· HSE Critical Zone' : ''}</span>
                          </div>
                        </div>
                        <button onClick={() => setActiveZone(null)} className="text-foreground/50 hover:text-foreground transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Zone Photos</p>
                          <div className="grid grid-cols-2 gap-2">
                            {z.photos.map((photo, pi) => (
                              <div 
                                key={pi} 
                                className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-foreground/10 cursor-pointer hover:border-[hsl(var(--accent))]/30"
                                onClick={() => setLightboxImg(photo)}
                              >
                                <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                  <span className="text-[10px] text-white font-medium">{photo.label}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Zone Assessment</p>
                          <p className="text-sm text-foreground/60 mb-3">{z.details}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground/40 uppercase">Condition Rating</span>
                              <span className="text-[hsl(var(--accent))] font-mono">{z.rating}</span>
                            </div>
                            <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                              <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: `${parseInt(z.rating) * 20}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Product / Equipment inventory images */}
            <p className="text-xs font-mono text-[hsl(var(--accent))] uppercase mb-2">Product & Equipment Reference</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              {[
                { src: imgCNCmachine, label: "CNC Centre" },
                { src: imgCMMmeasurement, label: "CMM / 3D Scan" },
                { src: imgControlPlan, label: "Control Plan" },
                { src: imgCapacityAssessment, label: "Capacity Review" },
                { src: imgProcessCapability, label: "Process Validation" },
                { src: imgCertification, label: "Material Certs" },
              ].map(img => (
                <div 
                  key={img.label} 
                  className="group relative aspect-square rounded-sm overflow-hidden border border-foreground/10 cursor-pointer hover:border-[hsl(var(--accent))]/30 transition-all"
                  onClick={() => setLightboxImg(img)}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                    <span className="text-[10px] text-white font-medium">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Equipment Map", "Safety Hotspots", "5S Ratings", "Quality Hotspots", "Audit Route Replay"].map(f => (
                <span key={f} className="text-xs bg-white text-foreground/50 px-3 py-1.5 rounded-sm border border-foreground/10">{f}</span>
              ))}
            </div>
          </ProfileSection>

          {/* ── Image Lightbox ── */}
          <AnimatePresence>
            {lightboxImg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setLightboxImg(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl w-full max-h-[85vh] m-4"
                  onClick={e => e.stopPropagation()}
                >
                  <img src={lightboxImg.src} alt={lightboxImg.label} className="w-full h-full object-contain rounded-sm" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="text-sm text-white font-medium">{lightboxImg.label}</span>
                  </div>
                  <button 
                    onClick={() => setLightboxImg(null)} 
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-sm bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════ K) FIT SIMULATOR ═══════════ */}
          <ProfileSection title="K) Supplier Fit Simulator" icon={Search} id="profile-fit-simulator">
            <p className="text-sm text-foreground/50 mb-4">Upload spec/RFQ/drawing → Twin simulates fit across all dimensions. Board-/Procurement-Decision-Support.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {[
                { dim: "Technical Fit", score: 92, color: "accent" },
                { dim: "Process Fit", score: 88, color: "accent" },
                { dim: "Quality Fit", score: 90, color: "accent" },
                { dim: "Compliance Fit", score: 85, color: "warning" },
                { dim: "Capacity Fit", score: 76, color: "warning" },
                { dim: "Risk Fit", score: 82, color: "warning" },
              ].map(f => (
                <div key={f.dim} className="bg-white border border-foreground/10 rounded-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">{f.dim}</span>
                    <span className={`font-mono text-sm text-[hsl(var(--${f.color}))]`}>{f.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                    <div className={`h-full bg-[hsl(var(--${f.color}))] rounded-full`} style={{ width: `${f.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white border border-foreground/10 rounded-sm">
                <p className="text-xs font-mono text-[hsl(var(--warning))] mb-2">CRITICAL GAPS</p>
                <div className="space-y-1.5 text-sm text-foreground/50">
                  <p>• Cryo filler material traceability not fully qualified</p>
                  <p>• Capacity buffer thin at current utilization</p>
                </div>
              </div>
              <div className="p-4 bg-white border border-foreground/10 rounded-sm">
                <p className="text-xs font-mono text-[hsl(var(--accent))] mb-2">MUST-HAVE MITIGATIONS</p>
                <div className="space-y-1.5 text-sm text-foreground/50">
                  <p>• Resident inspector for first article</p>
                  <p>• FAI mandatory before series release</p>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <DataRow label="Onboarding Plan" value="6 weeks — WPS requalification + FAI + audit" verification="ai-inferred" />
              <DataRow label="Qualification Effort" value="~40 man-days incl. on-site verification" mono verification="ai-inferred" />
              <DataRow label="vs Alternatives" value="Ranked #2 of 47 — best cost-quality ratio in class" verification="ai-inferred" />
            </div>
          </ProfileSection>

          {/* ═══════════ L) AI AGENT LAYER ═══════════ */}
          <ProfileSection title="L) AI Agent Layer on the Twin" icon={Bot} id="profile-ai-agents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Atlas Auditor Copilot",
                  items: ["Explain audit findings", "Show evidence gaps", "Suggest next questions", "Create requalification plan"],
                  color: "accent"
                },
                {
                  name: "Procurement Decision Copilot",
                  items: ["Approval decision for Package X", "Compare with reference supplier", "Risk / cost / time trade-off", "Board decision template"],
                  color: "accent"
                },
                {
                  name: "Supplier Development Copilot",
                  items: ["Identify development fields", "Generate 90-day improvement plan", "Prioritise actions by impact", "Track progress against plan"],
                  color: "accent"
                },
                {
                  name: "Expediting / Inspection Copilot",
                  items: ["Identify critical control points", "Suggest inspection hold points", "Generate evidence checklist", "FIDIC/EPC claim recovery support"],
                  color: "accent"
                },
              ].map(agent => (
                <div key={agent.name} className="bg-white border border-foreground/10 rounded-sm p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-[hsl(var(--accent))]" />
                    <span className="text-sm text-foreground font-medium">{agent.name}</span>
                  </div>
                  <div className="space-y-2">
                    {agent.items.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--accent))]/50" />
                        <span className="text-sm text-foreground/50">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/15 rounded-sm">
              <p className="text-xs font-mono text-[hsl(var(--accent))] mb-2">AI CHAT WITH THE TWIN</p>
              <div className="space-y-1.5 text-sm text-foreground/50 italic">
                <p>"Can this supplier deliver 40 units in 12 weeks?"</p>
                <p>"What critical risks exist for Duplex material scope?"</p>
                <p>"What improved since the last RCA audit?"</p>
                <p>"Compare with Končar for this package."</p>
              </div>
            </div>
          </ProfileSection>

          {/* ═══════════ M) TRUST & PROVENANCE ═══════════ */}
          <ProfileSection title="M) Trust, Provenance & Explainability" icon={Eye} id="profile-trust">
            <p className="text-sm text-foreground/50 mb-4">Every insight: source · timestamp · confidence · verification · reasoning logic. Enterprise-ready.</p>
            <div className="p-4 bg-white border border-foreground/10 rounded-sm mb-4">
              <p className="text-xs font-mono text-[hsl(var(--warning))] mb-2">EXAMPLE — EXPLAINABLE SCORE</p>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">Delivery Risk = High (82/100)</p>
                <div className="text-foreground/50 space-y-1">
                  <p>Reasons: Rising utilization, OTD decline, 2 open CAPAs, subsupplier dependency on critical component</p>
                  <p>Confidence: Medium-High</p>
                  <p>Evidence: RCA audit 2026-01-14, OTD trend Q4, supplier interview</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <DataRow label="Data Freshness" value="87% fields updated < 90 days" verification="verified" />
              <DataRow label="Source Mix" value="42% auditor-verified · 31% ERP · 27% self-declared" verification="verified" />
              <DataRow label="Confidence Score" value="0.91 / 1.00" mono verification="verified" />
              <DataRow label="Change Log" value="Last 30d: 14 field updates, 3 document uploads" verification="verified" />
              <DataRow label="Last Audit" value="2025-01-15 · On-site · RCA Senior Auditor" verification="verified" />
            </div>
            <div className="mt-4 p-4 bg-white border border-foreground/10 rounded-sm">
              <p className="text-xs font-mono text-[hsl(var(--accent))] mb-2">TRUST LEVEL</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: "91%" }} />
                </div>
                <span className="text-sm font-mono text-[hsl(var(--accent))]">91%</span>
                <span className="text-xs text-foreground/50">Audit-grade digital twin</span>
              </div>
            </div>
          </ProfileSection>

          {/* ═══════════ ROLE-BASED VIEWS ═══════════ */}
          <ProfileSection title="UX Views — Role-Based Twin Experience" icon={Users} id="profile-views">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { view: "Twin Cockpit (Executive)", items: ["Fit score", "Risk radar", "Capability summary", "Verification status", "Trend since last audit", "Recommended action"] },
                { view: "Operational View (Engineer/QA)", items: ["Process capabilities", "Machines / Qualifications", "Quality gaps", "Evidence explorer", "Standards requirement matrix"] },
                { view: "Procurement View", items: ["Commercial fit", "Lead time / capacity", "Risk vs. cost", "Alternative supplier comparison", "Negotiation levers"] },
                { view: "Audit View", items: ["Latest audits", "Findings", "Evidence-based scoring", "Reaudit trigger", "Open actions"] },
                { view: "AI Chat with the Twin", items: ["Scope / risk / comparison questions", "Twin-aware answers with evidence links", "Score-referenced insights", "Natural language queries"] },
              ].map(v => (
                <div key={v.view} className="bg-white border border-foreground/10 rounded-sm p-5">
                  <p className="text-sm text-[hsl(var(--accent))] font-medium mb-3">{v.view}</p>
                  <div className="space-y-1.5">
                    {v.items.map(item => (
                      <div key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[hsl(var(--accent))]/50" />
                        <span className="text-xs text-foreground/50">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* ═══════════ ROADMAP ═══════════ */}
          <ProfileSection title="Modular Rollout — Phased Implementation" icon={Award} id="profile-roadmap">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  phase: "Phase 1 — MVP+",
                  desc: "Already very strong",
                  items: ["Supplier identity + site map", "Capability matrix (1–5 scoring)", "Certifications + expiry tracking", "Audit findings + evidence vault", "Verification status (self-declared vs on-site verified)", "Basic dynamic risk score", "AI summary + recommendation", "Supplier comparison vs reference"]
                },
                {
                  phase: "Phase 2 — Differentiation",
                  desc: "Competitive edge",
                  items: ["Time-series twin / change tracking", "Compliance requirement mapping by standard/scope", "CAPA / NCR intelligence", "Regional risk layer", "Capacity & lead time intelligence", "Fit-to-RFQ simulator", "Role-based views (Procurement / QA)"]
                },
                {
                  phase: "Phase 3 — Category-Defining",
                  desc: "Market leadership",
                  items: ["Knowledge graph reasoning", "Predictive risk / delay / quality forecasting", "AI onboarding plan generator", "Supplier development copilot", "Portfolio-level twin benchmarking", "Autonomous monitoring + alerts (requalification triggers)"]
                },
              ].map(p => (
                <div key={p.phase} className="bg-white border border-foreground/10 rounded-sm p-5">
                  <p className="text-sm text-[hsl(var(--accent))] font-bold mb-1">{p.phase}</p>
                  <p className="text-xs text-foreground/50 mb-3">{p.desc}</p>
                  <div className="space-y-2">
                    {p.items.map(item => (
                      <div key={item} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--accent))]/50 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-foreground/50">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* ═══════════ WOW FEATURES ═══════════ */}
          <ProfileSection title="Wow Features — New User Experience" icon={Zap} id="profile-wow">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { label: "Twin Health Score", desc: "Incl. data quality" },
                { label: "Data Freshness Meter", desc: "42% critical data > 6mo" },
                { label: "Evidence Coverage Score", desc: "How much is proven?" },
                { label: "Contradiction Detector", desc: "Claim vs Evidence" },
                { label: "Twin Confidence Index", desc: "Overall reliability" },
                { label: "Requalification Trigger", desc: "Automated engine" },
                { label: "Scenario Mode", desc: "What-if volume doubles?" },
                { label: "Supplier DNA Fingerprint", desc: "Visual competence profile" },
                { label: "Peer Benchmark", desc: "Anonymised, cluster-based" },
                { label: "Board Memo Generator", desc: "1-click decision note" },
              ].map(f => (
                <div key={f.label} className="bg-white border border-foreground/10 rounded-sm p-4 hover:border-[hsl(var(--accent))]/30 transition-all cursor-pointer">
                  <div className="text-sm text-foreground font-medium">{f.label}</div>
                  <div className="text-xs text-foreground/50 mt-0.5">{f.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20 rounded-sm text-center">
              <p className="text-sm text-[hsl(var(--accent))] font-medium italic">
                "From supplier profiles to verified supplier digital twins — built for AI-native procurement decisions."
              </p>
            </div>
          </ProfileSection>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierProfileModal;
