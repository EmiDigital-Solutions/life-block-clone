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
    equipment: "36V BLDC Motor Assembly",
    tag: "MOT-4270-B",
    type: "Brushless DC Motor",
    fabricator: "Nidec Corporation (Kyoto)",
    inspectionDate: "Feb 6, 2026",
    defectsFound: 4,
    criticalCount: 2,
    majorCount: 2,
    status: "REJECTED",
    claimAmount: "€48K–€72K",
    repairDays: "28 days",
    codes: "IEC 60034 · IATF 16949",
    summary: "Stator winding insulation breakdown at 142°C (spec: Class H, 180°C min). Bearing pre-load out of spec on 12% of batch. Rotor magnet adhesive delamination on 3 units. Full batch quarantined pending root cause.",
  },
  {
    id: "2",
    ncr: "NCR-26-200489",
    equipment: "21700 Li-ion Battery Pack",
    tag: "BAT-22V-5AH",
    type: "Battery Assembly",
    fabricator: "Samsung SDI (Yongin)",
    inspectionDate: "Feb 12, 2026",
    defectsFound: 3,
    criticalCount: 1,
    majorCount: 2,
    status: "REJECTED",
    claimAmount: "€85K–€130K",
    repairDays: "42 days",
    codes: "UN 38.3 · IEC 62133",
    summary: "Cell impedance variance >15% within pack (spec: ±5%). BMS firmware reports incorrect SoC at <10°C. One cell showed elevated self-discharge rate. Batch hold pending Samsung SDI 8D report.",
  },
  {
    id: "3",
    ncr: "NCR-26-200502",
    equipment: "Magnesium Die-Cast Housing",
    tag: "HSG-DC7050",
    type: "AZ91D Housing",
    fabricator: "Georg Fischer (Schaffhausen)",
    inspectionDate: "Feb 18, 2026",
    defectsFound: 3,
    criticalCount: 0,
    majorCount: 3,
    status: "CONDITIONAL",
    claimAmount: "€22K–€35K",
    repairDays: "14 days",
    codes: "ASTM E505 · ISO 1043",
    summary: "Porosity >0.8% detected by X-ray at gear housing wall (spec: <0.5%). E-coat thickness below minimum on 2 internal ribs. Dimensional deviation +0.12mm on motor mount bore (spec: ±0.05mm). Rework feasible in-house.",
  },
  {
    id: "4",
    ncr: "NCR-26-200515",
    equipment: "MOTIX™ Motor Driver IC",
    tag: "IC-IMD700A",
    type: "Power Semiconductor",
    fabricator: "Infineon Technologies (Neubiberg)",
    inspectionDate: "Feb 22, 2026",
    defectsFound: 2,
    criticalCount: 1,
    majorCount: 1,
    status: "ON HOLD",
    claimAmount: "€120K–€210K",
    repairDays: "56 days",
    codes: "AEC-Q100 · IPC-A-610",
    summary: "Gate driver output impedance drift under thermal cycling (−40°C to +150°C, 500 cycles). Solder ball voiding >25% on BGA package (spec: <15%). Infineon failure analysis in progress. Alternate source evaluation initiated.",
  },
  {
    id: "5",
    ncr: "NCR-26-200528",
    equipment: "ecosyn® Thread-forming Screws",
    tag: "FST-M5x16",
    type: "Assembly Fasteners",
    fabricator: "Bossard Group (Zug)",
    inspectionDate: "Mar 1, 2026",
    defectsFound: 1,
    criticalCount: 0,
    majorCount: 1,
    status: "CONDITIONAL",
    claimAmount: "€8K–€14K",
    repairDays: "7 days",
    codes: "EN 15048 · ISO 9227",
    summary: "Friction coefficient out of spec on 4% of batch (μ = 0.18, spec: 0.12–0.16). Torque-tension relationship affected for automated assembly. Bossard to adjust ecosyn-lubric coating process. Minor — sortable on incoming inspection.",
  },
  {
    id: "6",
    ncr: "NCR-26-200541",
    equipment: "Planetary Gear Assembly",
    tag: "GBX-3STG-36V",
    type: "3-Stage Gearbox",
    fabricator: "Harmonic Drive SE (Limburg)",
    inspectionDate: "Mar 5, 2026",
    defectsFound: 5,
    criticalCount: 2,
    majorCount: 3,
    status: "REJECTED",
    claimAmount: "€65K–€98K",
    repairDays: "35 days",
    codes: "ISO 2768 · DIN 3990",
    summary: "Stage 2 sun gear tooth profile deviation 18μm (spec: ±8μm). Bearing pre-load torque 40% above spec causing efficiency loss. Output shaft runout 0.04mm (spec: 0.02mm). Grease fill volume inconsistent. Major rework at supplier required.",
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
