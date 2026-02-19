import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LNGClaimModalProps {
  open: boolean;
  onClose: () => void;
}

const LNGClaimModal = ({ open, onClose }: LNGClaimModalProps) => {
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
                <div className="w-2.5 h-2.5 rounded-full bg-[#AE3D3D] animate-pulse" />
                <span className="text-sm font-bold text-white tracking-wide">OFFICIAL CLAIM NOTICE</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/40 font-mono">February 6, 2026</span>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-60px)] p-6 space-y-6" style={{ scrollbarWidth: "thin" }}>
              {/* Parties */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { role: "From", company: 'LLC "ABC" (ABC Engineering)', person: "Project Quality Manager" },
                  { role: "To", company: "Shanghai Bu Hau Technology", person: "QA Manager / General Manager" },
                  { role: "Copy To", company: 'АО "DEF" (DEF)', person: "Maks Maksomimov" },
                ].map((party) => (
                  <div key={party.role} className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{party.role}</div>
                    <div className="text-xs font-semibold text-white">{party.company}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{party.person}</div>
                  </div>
                ))}
              </div>

              {/* Subject */}
              <div className="bg-[#AE3D3D]/10 border border-[#AE3D3D]/30 rounded-lg p-4">
                <div className="text-xs font-bold text-[#AE3D3D] uppercase tracking-wider mb-2">RE: Formal Claim — Breach of Contract</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                  {[
                    { label: "Equipment", value: "Deethanizer Condenser" },
                    { label: "Equipment No.", value: "G1-22E05 / G1-B1410SX0" },
                    { label: "Inspection Date", value: "February 6, 2026" },
                    { label: "Defects Found", value: "5 Major" },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="text-white/40">{item.label}: </span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Claim Amount */}
              <div className="bg-white/5 border border-white/8 rounded-lg p-5">
                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Total Claim Amount</div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-[#AE3D3D]">€76,400</span>
                  <span className="text-lg text-white/40">—</span>
                  <span className="text-3xl font-bold text-[#AE3D3D]">€118,000</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                  <div><span className="text-white/40">Base Case</span><div className="text-sm font-bold text-white">€76,400</div></div>
                  <div><span className="text-white/40">Conservative</span><div className="text-sm font-bold text-white">€86,250</div></div>
                  <div><span className="text-white/40">Adverse</span><div className="text-sm font-bold text-white">€118,000</div></div>
                  <div><span className="text-white/40">Max Exposure</span><div className="text-sm font-bold text-white/60">€166,250</div></div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Cost Breakdown by Category</h3>
                <div className="space-y-2">
                  {[
                    { category: "Direct Repair Costs", min: 34000, max: 57000, items: "Weld repair, NDT, coating, PWHT, pressure test", pct: 40 },
                    { category: "Schedule Impact", min: 15000, max: 44000, items: "Equipment idle time, project delay, expediting", pct: 25 },
                    { category: "Risk Premium & Contingency", min: 14250, max: 29750, items: "Rework risk reserve, 15% contingency", pct: 18 },
                    { category: "Inspection & Engineering", min: 12000, max: 19000, items: "TPI visits, engineering support, RCA reporting", pct: 12 },
                    { category: "Transportation / Logistics", min: 11000, max: 16500, items: "Return freight, packaging, customs", pct: 10 },
                  ].map((cost) => (
                    <div key={cost.category} className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-white">{cost.category}</span>
                        <span className="text-xs font-bold text-[#F5A623]">€{(cost.min / 1000).toFixed(0)}K – €{(cost.max / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="text-[10px] text-white/40 mb-2">{cost.items}</div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#AE3D3D] rounded-full" style={{ width: `${cost.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breach of Contract */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Breach of Contract Basis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { clause: "Express Warranties §X.X", breach: "5 major defects violating GOST-34347-2017 and drawing specifications", severity: "Material Breach" },
                    { clause: "Implied Warranty of Merchantability", breach: "Not fit for ordinary purpose — cracks constitute safety hazard", severity: "Material Breach" },
                    { clause: "Fitness for Purpose", breach: "Pressure containment integrity compromised for LNG processing", severity: "Material Breach" },
                    { clause: "Factory Acceptance Test", breach: "No evidence of adequate NDE — defects visible to naked eye", severity: "Potential Fraud" },
                    { clause: "Preservation Requirements", breach: "No rust inhibitor, extended outdoor storage without protection", severity: "Contract Violation" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">{item.clause}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${item.severity === 'Potential Fraud' ? 'bg-[#AE3D3D]/20 text-[#AE3D3D]' : 'bg-[#F5A623]/20 text-[#F5A623]'}`}>{item.severity}</span>
                      </div>
                      <div className="text-[10px] text-white/40">{item.breach}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demand for Remedy */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Demand for Remedy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-lg p-4">
                    <div className="text-xs font-bold text-[#F5A623] uppercase mb-2">Immediate — Within 7 Days</div>
                    <div className="space-y-1.5 text-[10px] text-white/60">
                      {["Acknowledge receipt in writing", "Accept responsibility", "Provide root cause analysis", "Submit corrective action plan"].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#F5A623] font-bold">{i + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#AE3D3D]/10 border border-[#AE3D3D]/30 rounded-lg p-4">
                    <div className="text-xs font-bold text-[#AE3D3D] uppercase mb-2">Repair Actions — Within 60 Days</div>
                    <div className="space-y-1.5 text-[10px] text-white/60">
                      {["Return logistics at fabricator's expense", "Complete weld repair per approved WPS", "100% NDE of all repaired areas", "Third-party witness at all hold points"].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#AE3D3D] font-bold">{i + 1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <div className="text-[10px] text-white/30 leading-relaxed">
                  <strong className="text-white/50">Legal Notice:</strong> We reserve the right to increase this claim if additional defects are discovered, base material non-conformance is identified, repair attempts fail, or schedule delays result in liquidated damages. All rights under the contract, applicable law (Russian Civil Code / CISG / UCC), and GOST-34347-2017 are expressly reserved.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LNGClaimModal;
