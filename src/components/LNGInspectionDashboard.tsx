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
    ncr: "NCR-25-100471",
    equipment: "Deethanizer Condenser",
    tag: "G1-22E05",
    type: "Shell & Tube HEX",
    fabricator: "Shanghai Bu Hau Technology",
    inspectionDate: "Feb 6, 2026",
    defectsFound: 5,
    criticalCount: 2,
    majorCount: 3,
    status: "REJECTED",
    claimAmount: "€76K–€118K",
    repairDays: "56 days",
    codes: "GOST-34347 · ASME IX",
    summary: "Surface cracks in HAZ, underfilled welds, longitudinal crack in seam, rust contamination. Hydrostatic test blocked. Return to fabricator recommended.",
  },
  {
    id: "2",
    ncr: "NCR-25-100489",
    equipment: "LP Separator Vessel",
    tag: "G1-31V02",
    type: "Pressure Vessel",
    fabricator: "Wuxi Chengtong Heavy Ind.",
    inspectionDate: "Feb 12, 2026",
    defectsFound: 3,
    criticalCount: 1,
    majorCount: 2,
    status: "REJECTED",
    claimAmount: "€42K–€67K",
    repairDays: "38 days",
    codes: "ASME Sec VIII Div 1 · API 510",
    summary: "Nozzle-to-shell weld porosity cluster, saddle plate misalignment 8mm (spec ±3mm), missing PWHT documentation for Cr-Mo material. Vessel quarantined.",
  },
  {
    id: "3",
    ncr: "NCR-25-100502",
    equipment: "Amine Regenerator Column",
    tag: "G1-42C01",
    type: "Distillation Column",
    fabricator: "Lanzhou LS Heavy Equipment",
    inspectionDate: "Feb 18, 2026",
    defectsFound: 4,
    criticalCount: 0,
    majorCount: 4,
    status: "CONDITIONAL",
    claimAmount: "€28K–€41K",
    repairDays: "21 days",
    codes: "ASME Sec VIII · NACE MR0175",
    summary: "Tray support ring alignment 5mm off (spec ±2mm), DFT below minimum on internal coating, 2 weld repairs not backed by approved WPS, manway gasket face scored.",
  },
  {
    id: "4",
    ncr: "NCR-25-100515",
    equipment: "Propane Compressor",
    tag: "G1-51K01",
    type: "Centrifugal Compressor",
    fabricator: "Shenyang Blower Works",
    inspectionDate: "Feb 22, 2026",
    defectsFound: 2,
    criticalCount: 1,
    majorCount: 1,
    status: "ON HOLD",
    claimAmount: "€95K–€185K",
    repairDays: "45 days",
    codes: "API 617 · ISO 10816",
    summary: "Vibration 4.5 mm/s exceeds API 617 limit (3.5 mm/s). Coupling misalignment suspected. Baseplate grouting voids detected by borescope. Vendor specialist mobilization required.",
  },
  {
    id: "5",
    ncr: "NCR-25-100528",
    equipment: "Cryogenic Heat Exchanger",
    tag: "G1-11E01",
    type: "Brazed Aluminum HEX",
    fabricator: "Chart Industries (Dalian)",
    inspectionDate: "Mar 1, 2026",
    defectsFound: 1,
    criticalCount: 0,
    majorCount: 1,
    status: "CONDITIONAL",
    claimAmount: "€18K–€25K",
    repairDays: "14 days",
    codes: "ASME Sec VIII · EN 13445",
    summary: "Helium leak test shows 1.2×10⁻⁷ mbar·l/s at header-to-core joint (spec <1×10⁻⁸). Minor — repair in-situ with vendor supervision. Shipping preservation acceptable.",
  },
  {
    id: "6",
    ncr: "NCR-25-100541",
    equipment: "LNG Storage Tank",
    tag: "G1-71T01",
    type: "Full Containment Tank",
    fabricator: "China Huanqiu Contracting",
    inspectionDate: "Mar 5, 2026",
    defectsFound: 6,
    criticalCount: 3,
    majorCount: 3,
    status: "REJECTED",
    claimAmount: "€210K–€340K",
    repairDays: "90 days",
    codes: "API 620 App Q · EN 14620",
    summary: "Bottom plate weld cracks (3 locations), 9% Ni steel impact test failure at -196°C, inner tank roundness 15mm out (spec ±10mm), anchor strap welds incomplete. Major rework required.",
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
                <span className="text-foreground/40">Fabricator</span>
                <span className="text-foreground/70 font-medium text-right max-w-[60%] truncate">{c.fabricator}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-foreground/40">Inspection</span>
                <span className="text-foreground/70 font-medium">{c.inspectionDate}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-foreground/40">Codes</span>
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
                    <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Repair Time</div>
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
