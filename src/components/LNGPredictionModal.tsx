import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LNGPredictionModalProps {
  open: boolean;
  onClose: () => void;
}

const LNGPredictionModal = ({ open, onClose }: LNGPredictionModalProps) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[hsl(220,18%,10%)] border border-white/10 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse" />
                <span className="text-sm font-bold text-white tracking-wide">REPAIR PREDICTION ANALYSIS</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/40 font-mono">NCR 532RHI-MEC-NCR-25-100471</span>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-60px)] p-6 space-y-6" style={{ scrollbarWidth: "thin" }}>
              {/* Equipment Info */}
              <div className="bg-white/5 border border-white/8 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Equipment", value: "Deethanizer Condenser" },
                    { label: "Equipment No.", value: "G1-22E05" },
                    { label: "Analysis Date", value: "February 6, 2026" },
                    { label: "Status", value: "REJECTED", color: "text-[#AE3D3D]" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">{item.label}</div>
                      <div className={`text-sm font-semibold ${item.color || "text-white"} mt-0.5`}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Predictions Summary */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Key Predictions Summary</h3>
                <div className="grid grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden">
                  <div className="bg-[hsl(220,18%,12%)] p-4 text-center">
                    <div className="text-[10px] text-white/40 uppercase mb-1">Best Case</div>
                    <div className="text-2xl font-bold text-[#6EA996]">42 <span className="text-sm">days</span></div>
                    <div className="text-xs text-white/50 mt-1">€52,000</div>
                    <div className="text-[10px] text-[#6EA996] font-semibold mt-0.5">85% success</div>
                  </div>
                  <div className="bg-[hsl(220,18%,12%)] p-4 text-center border-x border-white/5">
                    <div className="text-[10px] text-[#F5A623] uppercase mb-1 font-bold">Most Likely</div>
                    <div className="text-2xl font-bold text-[#F5A623]">56 <span className="text-sm">days</span></div>
                    <div className="text-xs text-white/50 mt-1">€74,000</div>
                    <div className="text-[10px] text-[#F5A623] font-semibold mt-0.5">70% success</div>
                  </div>
                  <div className="bg-[hsl(220,18%,12%)] p-4 text-center">
                    <div className="text-[10px] text-white/40 uppercase mb-1">Worst Case</div>
                    <div className="text-2xl font-bold text-[#AE3D3D]">84 <span className="text-sm">days</span></div>
                    <div className="text-xs text-white/50 mt-1">€128,000</div>
                    <div className="text-[10px] text-[#AE3D3D] font-semibold mt-0.5">45% success</div>
                  </div>
                </div>
              </div>

              {/* Root Cause Analysis */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Root Cause Probability Ranking</h3>
                <div className="space-y-2">
                  {[
                    { rank: 1, cause: "Inadequate Welder Qualification", prob: 95, cost: "€5K–8K", impact: "High" },
                    { rank: 2, cause: "Improper Storage/Preservation", prob: 95, cost: "€10K–15K", impact: "Medium" },
                    { rank: 3, cause: "Insufficient FAT/Inspection", prob: 90, cost: "€8K–12K", impact: "High" },
                    { rank: 4, cause: "WPS Deviation/Non-compliance", prob: 85, cost: "€3K–5K", impact: "High" },
                    { rank: 5, cause: "Hydrogen-Induced Cracking", prob: 75, cost: "€5K–10K", impact: "Very High" },
                    { rank: 6, cause: "Improper Heat Treatment Control", prob: 70, cost: "€4K–7K", impact: "High" },
                    { rank: 7, cause: "Base Material Issues", prob: 40, cost: "€15K–50K", impact: "Critical" },
                  ].map((item) => (
                    <div key={item.rank} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5">
                      <div className="w-6 h-6 flex items-center justify-center bg-white/5 rounded text-xs font-bold text-white/50">{item.rank}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white">{item.cause}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20">
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.prob >= 90 ? 'bg-[#AE3D3D]' : item.prob >= 70 ? 'bg-[#F5A623]' : 'bg-white/30'}`} style={{ width: `${item.prob}%` }} />
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-white/50 w-8 text-right">{item.prob}%</span>
                        <span className="text-[10px] text-white/40 w-20 text-right">{item.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defects Identified */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">5 Major Defects Identified</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { id: 1, name: "Underfilled Weld", loc: "Seam weld joint", dim: "0.8mm × 7mm", severity: "MAJOR", standard: "GOST-34347-2017 §6.3" },
                    { id: 2, name: "Surface Crack (HAZ)", loc: "40mm from weld toe", dim: "Propagating", severity: "CRITICAL", standard: "GOST-34347-2017 §5.2" },
                    { id: 3, name: "Longitudinal Weld Crack", loc: "Seam weld joint", dim: "4mm visible", severity: "CRITICAL", standard: "Zero tolerance" },
                    { id: 4, name: "Rust Contamination", loc: "Saddle support, earthing lug", dim: "Extensive", severity: "MAJOR", standard: "GSP-QA-PR-004" },
                    { id: 5, name: "General Weld Quality Issues", loc: "Multiple locations", dim: "Systemic", severity: "MAJOR", standard: "Approved WPS" },
                  ].map((defect) => (
                    <div key={defect.id} className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">#{defect.id} {defect.name}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${defect.severity === 'CRITICAL' ? 'bg-[#AE3D3D]/20 text-[#AE3D3D]' : 'bg-[#F5A623]/20 text-[#F5A623]'}`}>{defect.severity}</span>
                      </div>
                      <div className="text-[10px] text-white/40 space-y-0.5">
                        <div>Location: {defect.loc}</div>
                        <div>Dimension: {defect.dim}</div>
                        <div>Standard: {defect.standard}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repair Scenarios */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Repair Scenario Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { scenario: "On-Site Repair", time: "42 days", cost: "€52K", risk: "High", recommended: false, note: "Not recommended — limited controls" },
                    { scenario: "Return to Fabricator", time: "56 days", cost: "€74K", risk: "Medium", recommended: true, note: "Recommended — best quality control" },
                    { scenario: "Replace Equipment", time: "84 days", cost: "€128K", risk: "Low", recommended: false, note: "Fallback — if repair fails" },
                  ].map((s) => (
                    <div key={s.scenario} className={`rounded-lg p-4 ${s.recommended ? 'bg-[#6EA996]/10 border-2 border-[#6EA996]/40' : 'bg-white/[0.03] border border-white/5'}`}>
                      {s.recommended && <div className="text-[9px] font-bold text-[#6EA996] uppercase tracking-wider mb-2">✓ Recommended</div>}
                      <div className="text-sm font-semibold text-white mb-2">{s.scenario}</div>
                      <div className="space-y-1 text-[10px] text-white/50">
                        <div className="flex justify-between"><span>Lead Time</span><span className="font-semibold text-white">{s.time}</span></div>
                        <div className="flex justify-between"><span>Est. Cost</span><span className="font-semibold text-white">{s.cost}</span></div>
                        <div className="flex justify-between"><span>Quality Risk</span><span className={`font-semibold ${s.risk === 'High' ? 'text-[#AE3D3D]' : s.risk === 'Medium' ? 'text-[#F5A623]' : 'text-[#6EA996]'}`}>{s.risk}</span></div>
                      </div>
                      <div className="text-[9px] text-white/30 mt-2 italic">{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WPS Deviations Table */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Suspected WPS Deviations</h3>
                <div className="bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 gap-px text-[10px] font-bold text-white/40 uppercase tracking-wider bg-white/5 px-4 py-2">
                    <span>Parameter</span><span>Specified</span><span>Suspected</span><span>Impact</span>
                  </div>
                  {[
                    { param: "Preheat Temp", spec: "150–200°C", actual: "<100°C", impact: "HAZ cracking" },
                    { param: "Interpass Temp", spec: "<250°C", actual: ">300°C", impact: "Reduced toughness" },
                    { param: "Heat Input", spec: "1.0–1.5 kJ/mm", actual: ">2.0 kJ/mm", impact: "Excessive HAZ" },
                    { param: "Travel Speed", spec: "15–20 cm/min", actual: "Too fast", impact: "Underfill" },
                    { param: "Electrode Storage", spec: "120°C oven", actual: "Ambient", impact: "H₂ cracking" },
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-4 gap-px text-[10px] px-4 py-2 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      <span className="text-white/60 font-medium">{row.param}</span>
                      <span className="text-[#6EA996]">{row.spec}</span>
                      <span className="text-[#AE3D3D]">{row.actual}</span>
                      <span className="text-white/40">{row.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LNGPredictionModal;
