import { useState } from "react";
import { motion } from "framer-motion";
import LNGPredictionModal from "./LNGPredictionModal";
import LNGClaimModal from "./LNGClaimModal";

interface InspectionCase {
  id: string;
  ncr: string;
  equipment: string;
  tag: string;
  type: string;
  fabricator: string;
  inspectionDate: string;
  defectsFound: number;
  criticalCount: number;
  majorCount: number;
  status: "REJECTED" | "CONDITIONAL" | "ACCEPTED" | "ON HOLD";
  claimAmount?: string;
  repairDays?: string;
  codes: string;
  summary: string;
}

const inspectionCases: InspectionCase[] = [
  {
    id: "1",
    ncr: "NCR-26-200471",
    equipment: "Steel Bridge Component EN 1090-2",
    tag: "STR-BR-042",
    type: "Welded Steel Structure",
    fabricator: "Đuro Đaković (Slavonski Brod)",
    inspectionDate: "Feb 6, 2026",
    defectsFound: 4,
    criticalCount: 2,
    majorCount: 2,
    status: "REJECTED",
    claimAmount: "€48K–€72K",
    repairDays: "28 days",
    codes: "EN 1090-2 · EN ISO 3834-2",
    summary: "Butt weld on main girder flange shows incomplete fusion at root (UT indication >6mm). Surface preparation only Sa 2.0 instead of Sa 2.5 on 3 beam sections. Dimensional deviation +8mm on bearing plate (spec: ±3mm). Full re-welding and re-blasting required.",
  },
  {
    id: "2",
    ncr: "NCR-26-200489",
    equipment: "Distribution Transformer 630 kVA",
    tag: "TRAFO-DT-630",
    type: "Oil-Immersed Transformer",
    fabricator: "Končar (Zagreb)",
    inspectionDate: "Feb 12, 2026",
    defectsFound: 3,
    criticalCount: 1,
    majorCount: 2,
    status: "REJECTED",
    claimAmount: "€35K–€55K",
    repairDays: "21 days",
    codes: "IEC 60076 · EN 50588",
    summary: "No-load losses exceed Tier 2 limit by 12% (spec: EU 548/2014). Winding resistance imbalance >2% between phases (spec: ≤0.5%). Oil dielectric strength test shows 48 kV/2.5mm (spec: ≥60 kV). Core re-lamination and oil replacement required.",
  },
  {
    id: "3",
    ncr: "NCR-26-200502",
    equipment: "Automotive Door Panel — PP-T20",
    tag: "TRIM-DP-A7",
    type: "Injection Molded Component",
    fabricator: "AD Plastik (Solin)",
    inspectionDate: "Feb 18, 2026",
    defectsFound: 3,
    criticalCount: 0,
    majorCount: 3,
    status: "CONDITIONAL",
    claimAmount: "€22K–€35K",
    repairDays: "14 days",
    codes: "VDA 6.3 · IATF 16949",
    summary: "Surface sink marks visible on B-side near rib intersection (VDI 3400 ref: CH30 required). Flash at parting line exceeds 0.15mm spec. Grain texture depth variation ±12% across panel face (spec: ±5%). Tool re-work and process parameter adjustment feasible.",
  },
  {
    id: "4",
    ncr: "NCR-26-200515",
    equipment: "Offshore Jacket Section — AH36",
    tag: "OFF-JK-S12",
    type: "Offshore Steel Structure",
    fabricator: "Brodosplit (Split)",
    inspectionDate: "Feb 22, 2026",
    defectsFound: 2,
    criticalCount: 1,
    majorCount: 1,
    status: "ON HOLD",
    claimAmount: "€120K–€210K",
    repairDays: "56 days",
    codes: "DNV GL · AWS D1.1",
    summary: "FCAW weld on Class I joint shows porosity cluster exceeding DNV acceptance criteria. NDT UT scan reveals lack of sidewall fusion on 2 of 8 node connections. Brodosplit NDT Level III re-inspection scheduled. Full re-welding likely required.",
  },
  {
    id: "5",
    ncr: "NCR-26-200528",
    equipment: "HV Battery Module 800V",
    tag: "BAT-HV-800",
    type: "EV Battery System",
    fabricator: "Rimac Technology (Sveta Nedelja)",
    inspectionDate: "Mar 1, 2026",
    defectsFound: 1,
    criticalCount: 0,
    majorCount: 1,
    status: "CONDITIONAL",
    claimAmount: "€8K–€14K",
    repairDays: "7 days",
    codes: "UN ECE R100 · ISO 26262",
    summary: "BMS firmware reports incorrect SoC at temperatures below −10°C (deviation >5%). Cell balancing algorithm timeout on 2 of 12 modules. Rimac to issue firmware update. Minor — field-upgradable via OTA.",
  },
  {
    id: "6",
    ncr: "NCR-26-200541",
    equipment: "Transmission Tower Section",
    tag: "TWR-110kV-S4",
    type: "Lattice Steel Tower",
    fabricator: "Dalekovod (Zagreb)",
    inspectionDate: "Mar 5, 2026",
    defectsFound: 5,
    criticalCount: 2,
    majorCount: 3,
    status: "REJECTED",
    claimAmount: "€65K–€98K",
    repairDays: "35 days",
    codes: "EN 1090-1 · ISO 8501",
    summary: "Bolt hole diameter deviation +1.5mm on 6 of 24 gusset plate connections (spec: ±0.5mm). Hot-dip galvanizing thickness 45μm on leg members (spec: ≥85μm per ISO 1461). Angle member straightness out of tolerance. Major rework at supplier required.",
  },
];

const statusColors: Record<InspectionCase["status"], { bg: string; text: string }> = {
  "REJECTED": { bg: "bg-[#AE3D3D]/15", text: "text-[#AE3D3D]" },
  "CONDITIONAL": { bg: "bg-[#F5A623]/15", text: "text-[#F5A623]" },
  "ACCEPTED": { bg: "bg-[#6EA996]/15", text: "text-[#6EA996]" },
  "ON HOLD": { bg: "bg-white/10", text: "text-white/60" },
};

const LNGInspectionDashboard = () => {
  const [showPrediction, setShowPrediction] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [selectedCase, setSelectedCase] = useState<InspectionCase | null>(null);

  const openPrediction = (c: InspectionCase) => {
    setSelectedCase(c);
    setShowPrediction(true);
  };

  const openClaim = (c: InspectionCase) => {
    setSelectedCase(c);
    setShowClaim(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
        {inspectionCases.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white p-0 group"
          >
            {/* Card Header */}
            <div className="px-5 pt-5 pb-3 border-b border-foreground/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-foreground/30">{c.ncr}</span>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${statusColors[c.status].bg} ${statusColors[c.status].text}`}>
                  {c.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground leading-tight">{c.equipment}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-foreground/40">{c.tag}</span>
                <span className="text-foreground/20">·</span>
                <span className="text-[11px] text-foreground/40">{c.type}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-5 py-3 space-y-2.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-foreground/40">Supplier</span>
                <span className="text-foreground/70 font-medium text-right max-w-[60%] truncate">{c.fabricator}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-foreground/40">Inspection</span>
                <span className="text-foreground/70 font-medium">{c.inspectionDate}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-foreground/40">Standards</span>
                <span className="text-foreground/50 font-mono text-[9px]">{c.codes}</span>
              </div>

              {/* Defect counts */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] text-foreground/40">{c.defectsFound} Defects:</span>
                {c.criticalCount > 0 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#AE3D3D]/10 text-[#AE3D3D]">
                    {c.criticalCount} CRIT
                  </span>
                )}
                {c.majorCount > 0 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F5A623]/10 text-[#F5A623]">
                    {c.majorCount} MAJOR
                  </span>
                )}
              </div>

              {/* Summary */}
              <p className="text-[10px] text-foreground/40 leading-relaxed line-clamp-3">{c.summary}</p>
            </div>

            {/* Card Footer — Claim & Prediction */}
            <div className="px-5 py-3 border-t border-foreground/5 space-y-2">
              {c.claimAmount && (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Claim Amount</div>
                    <div className="text-sm font-bold text-[#AE3D3D]">{c.claimAmount}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Resolution Time</div>
                    <div className="text-sm font-bold text-foreground">{c.repairDays}</div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => openPrediction(c)}
                  className="flex-1 text-[10px] font-bold text-[#F5A623] border border-[#F5A623]/20 rounded px-3 py-2 hover:bg-[#F5A623]/5 transition-colors uppercase tracking-wider"
                >
                  Prediction Report
                </button>
                <button
                  onClick={() => openClaim(c)}
                  className="flex-1 text-[10px] font-bold text-[#AE3D3D] border border-[#AE3D3D]/20 rounded px-3 py-2 hover:bg-[#AE3D3D]/5 transition-colors uppercase tracking-wider"
                >
                  Claim Letter
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modals — reuse existing */}
      <LNGPredictionModal open={showPrediction} onClose={() => setShowPrediction(false)} />
      <LNGClaimModal open={showClaim} onClose={() => setShowClaim(false)} />
    </>
  );
};

export default LNGInspectionDashboard;
