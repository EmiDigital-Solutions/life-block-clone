import { motion } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, XCircle, Star, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Benchmark data modeled after the Excel reference — pipe support suppliers for LNG
const referenceSupplier = "LISEGA SE";

interface BenchmarkCriterion {
  name: string;
  weight: number;
  scores: number[]; // one per supplier
  notes: string;
}

const suppliers = [
  { name: "LISEGA SE", country: "Germany", role: "Reference (Benchmark)", blocked: true },
  { name: "Bergen PS India (BPSI)", country: "India", role: "#1 Priority", blocked: false },
  { name: "Jianeng/Wintech", country: "China", role: "#2 Priority", blocked: false },
  { name: "SeongHwa", country: "S. Korea", role: "#3 Priority", blocked: false },
  { name: "JIMC", country: "S. Korea", role: "#4 Priority", blocked: false },
];

const criteria: BenchmarkCriterion[] = [
  { name: "44 kN Load Capacity", weight: 5, scores: [5, 5, 5, 4, 4], notes: "All cover 44 kN; Korea/Iran need verification" },
  { name: "Cryogenic to −100°C (springs)", weight: 5, scores: [5, 4, 2, 2, 3], notes: "BPSI Bergatherm closest to LISEGA HIPAC; verify cryo range" },
  { name: "TR CU 010/2011 Compliance", weight: 5, scores: [2, 1, 1, 1, 1], notes: "No alternative holds Russian cert — all need qualification" },
  { name: "LNG/Petrochemical Track Record", weight: 4, scores: [5, 5, 3, 4, 4], notes: "BPSI: published LNG Industry magazine; LNG terminal refs" },
  { name: "Spring Rate / Travel Range", weight: 4, scores: [5, 5, 3, 3, 4], notes: "BPSI: Bergen range = 25 sizes, 5 travels to 254mm" },
  { name: "Cold Insulation Spacers (PTFE)", weight: 3, scores: [5, 5, 2, 2, 3], notes: "BPSI manufactures PTFE sliding supports in-house" },
  { name: "Pricing vs LISEGA (est.)", weight: 4, scores: [2, 3, 4, 3, 3], notes: "India/China 40–60% lower; Korea ~30–40% lower" },
  { name: "Lead Time / Delivery", weight: 4, scores: [5, 4, 3, 4, 4], notes: "BPSI: established global logistics; Korea: good intl track record" },
  { name: "After-Sales / Warranty", weight: 3, scores: [5, 4, 3, 3, 3], notes: "BPSI: Hill & Smith group global service network" },
  { name: "3D Model / Design Software", weight: 3, scores: [5, 4, 2, 2, 2], notes: "BPSI: PSL CAD + PS Designer software" },
  { name: "Company Scale / Stability", weight: 3, scores: [5, 5, 4, 4, 3], notes: "BPSI: Hill & Smith PLC (£800M+ group)" },
  { name: "Sanctions Feasibility", weight: 5, scores: [1, 5, 5, 4, 4], notes: "LISEGA blocked; BPSI Indian entity = clear" },
];

const totals = suppliers.map((_, si) => 
  criteria.reduce((sum, c) => sum + c.scores[si] * c.weight, 0)
);
const maxTotal = criteria.reduce((sum, c) => sum + 5 * c.weight, 0);

const overallRatings = [
  { label: "Benchmark (Blocked)", color: "text-[hsl(var(--destructive))]" },
  { label: "★★★★ Very High — #1 Priority", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ High — #2 Priority", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ High — #3 Priority", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ High — #4 Priority", color: "text-[hsl(var(--accent))]" },
];

const sanctionsFeasibility = [
  { label: "✕ Blocked", feasible: false },
  { label: "✓ Feasible", feasible: true },
  { label: "✓ Feasible", feasible: true },
  { label: "✓ Feasible", feasible: true },
  { label: "✓ Feasible", feasible: true },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const scoreColor = (score: number, isReference: boolean) => {
  if (isReference) return "text-[hsl(var(--slate))]";
  if (score >= 5) return "text-[hsl(var(--accent))] font-bold";
  if (score >= 4) return "text-[hsl(var(--accent))]";
  if (score >= 3) return "text-[hsl(var(--warning))]";
  return "text-[hsl(var(--destructive))]";
};

const SupplierBenchmarkModal = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-7xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-[hsl(0,0%,4%)] border-white/10">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] uppercase tracking-[0.2em] mb-2">
                Supplier Benchmark — Pipe Supports for LNG
              </p>
              <h2 className="text-2xl font-medium text-white">
                Technical Comparison — 5 Suppliers
              </h2>
              <p className="text-sm text-[hsl(var(--slate))] mt-1">
                Reference: {referenceSupplier} (sanctioned) · Weighted scoring across 12 criteria
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal sticky left-0 bg-[hsl(0,0%,4%)] min-w-[180px] z-10">
                  Criterion
                </th>
                {suppliers.map((s, i) => (
                  <th key={i} className="text-center p-3 min-w-[120px]">
                    <div className={`text-xs font-medium ${i === 0 ? 'text-[hsl(var(--slate))]' : 'text-white'}`}>
                      {s.name}
                    </div>
                    <div className="text-[10px] text-[hsl(var(--slate))] font-mono mt-0.5">{s.country}</div>
                    {i === 0 && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-mono bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))] uppercase">
                        Reference
                      </span>
                    )}
                    {i === 1 && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-mono bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))] uppercase">
                        Recommended
                      </span>
                    )}
                  </th>
                ))}
                <th className="text-left p-3 text-[10px] text-[hsl(var(--slate))] uppercase tracking-wider font-mono font-normal min-w-[200px]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c, ci) => (
                <tr key={ci} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 sticky left-0 bg-[hsl(0,0%,4%)] z-10">
                    <div className="text-xs text-white font-medium">{c.name}</div>
                    <div className="text-[10px] text-[hsl(var(--slate))] font-mono">weight: {c.weight}</div>
                  </td>
                  {c.scores.map((score, si) => (
                    <td key={si} className="p-3 text-center">
                      <span className={`text-lg font-mono ${scoreColor(score, si === 0)}`}>
                        {score}
                      </span>
                    </td>
                  ))}
                  <td className="p-3 text-[10px] text-[hsl(var(--slate))] leading-relaxed">
                    {c.notes}
                  </td>
                </tr>
              ))}

              {/* Weighted Total */}
              <tr className="border-t-2 border-white/20 bg-white/[0.03]">
                <td className="p-3 sticky left-0 bg-[hsl(0,0%,6%)] z-10">
                  <div className="text-xs text-white font-bold uppercase">Weighted Total</div>
                  <div className="text-[10px] text-[hsl(var(--slate))] font-mono">out of {maxTotal}</div>
                </td>
                {totals.map((t, i) => (
                  <td key={i} className="p-3 text-center">
                    <span className={`text-xl font-mono font-bold ${i === 0 ? 'text-[hsl(var(--slate))]' : 'text-white'}`}>
                      {t}
                    </span>
                  </td>
                ))}
                <td className="p-3" />
              </tr>

              {/* Sanctions */}
              <tr className="border-b border-white/5">
                <td className="p-3 sticky left-0 bg-[hsl(0,0%,4%)] z-10">
                  <div className="text-xs text-white font-medium">Sanctions Feasibility</div>
                </td>
                {sanctionsFeasibility.map((s, i) => (
                  <td key={i} className="p-3 text-center">
                    <span className={`text-xs font-mono px-2 py-1 rounded-sm ${
                      s.feasible 
                        ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]' 
                        : 'bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]'
                    }`}>
                      {s.label}
                    </span>
                  </td>
                ))}
                <td className="p-3" />
              </tr>

              {/* Overall Rating */}
              <tr className="bg-white/[0.03]">
                <td className="p-3 sticky left-0 bg-[hsl(0,0%,6%)] z-10">
                  <div className="text-xs text-white font-bold uppercase">Overall Rating</div>
                </td>
                {overallRatings.map((r, i) => (
                  <td key={i} className="p-3 text-center">
                    <span className={`text-[11px] font-medium ${r.color}`}>
                      {r.label}
                    </span>
                  </td>
                ))}
                <td className="p-3" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recommendation */}
        <div className="p-6 border-t border-white/10">
          <div className="bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/20 p-5">
            <p className="text-[10px] font-mono text-[hsl(var(--accent))] uppercase tracking-[0.2em] mb-3">
              AI Recommendation
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">Bergen PS India (BPSI) — Primary recommendation</p>
                  <p className="text-xs text-[hsl(var(--slate))] mt-1">
                    Highest weighted score (50/{maxTotal}) among feasible suppliers. Hill & Smith PLC backing provides financial stability. 
                    Bergatherm product line is closest technical equivalent to LISEGA HIPAC. 
                    40–60% cost reduction vs European reference. In-house PTFE manufacturing and PSL CAD software.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">Next steps</p>
                  <p className="text-xs text-[hsl(var(--slate))] mt-1">
                    1. Request BPSI technical submittal for 44 kN spring hangers with cryogenic springs · 
                    2. Schedule on-site audit at Pune facility (capacity + QMS verification) · 
                    3. Obtain Jianeng/Wintech pricing as backup for cost negotiation leverage · 
                    4. Verify SeongHwa and JIMC cryogenic spring qualification status
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">Risk note</p>
                  <p className="text-xs text-[hsl(var(--slate))] mt-1">
                    No alternative supplier currently holds TR CU 010/2011 (Russian certification). 
                    All candidates require qualification if Russian market scope is maintained.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierBenchmarkModal;
