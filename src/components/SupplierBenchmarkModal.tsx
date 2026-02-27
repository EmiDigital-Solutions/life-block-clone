import { motion } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, XCircle, Star, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Benchmark data — brushless motor suppliers for Hilti power tool production
const referenceSupplier = "Nidec Corporation";

interface BenchmarkCriterion {
  name: string;
  weight: number;
  scores: number[]; // one per supplier
  notes: string;
}

const suppliers = [
  { name: "Nidec Corporation", country: "Japan", role: "Current Supplier (Benchmark)", blocked: true },
  { name: "Mabuchi Motor", country: "Japan", role: "#1 Alternative", blocked: false },
  { name: "Johnson Electric", country: "Hong Kong", role: "#2 Alternative", blocked: false },
  { name: "Minebea Mitsumi", country: "Japan", role: "#3 Alternative", blocked: false },
  { name: "ebm-papst", country: "Germany", role: "#4 Alternative", blocked: false },
];

const criteria: BenchmarkCriterion[] = [
  { name: "BLDC Motor Power (≥1,500W)", weight: 5, scores: [5, 4, 5, 4, 3], notes: "Nidec & Johnson cover ≥1,500W; Mabuchi strong at mid-range; ebm-papst primarily fan motors" },
  { name: "IEC 60034 Compliance", weight: 5, scores: [5, 5, 5, 5, 4], notes: "All Japanese suppliers full IEC; ebm-papst primarily EN 60335 focused" },
  { name: "Bearing MTBF ≥ 8,000h", weight: 5, scores: [5, 4, 5, 5, 4], notes: "Nidec & Johnson use NSK/NMB sealed bearings; Mabuchi standard sintered" },
  { name: "Sensorless FOC Capability", weight: 4, scores: [5, 3, 5, 4, 3], notes: "Johnson & Nidec lead on integrated FOC; Mabuchi developing" },
  { name: "Volume Capacity (>5M/yr)", weight: 4, scores: [5, 5, 4, 5, 3], notes: "Mabuchi highest volume (1.6B motors/yr); ebm-papst smaller scale" },
  { name: "Thermal Class H Insulation", weight: 4, scores: [5, 4, 4, 5, 4], notes: "Nidec & Minebea standard Class H; others Class F upgradable" },
  { name: "EU/EMEA Production Site", weight: 4, scores: [3, 2, 4, 3, 5], notes: "ebm-papst strongest EU presence; Johnson has EU plant in Hungary" },
  { name: "Cost Competitiveness", weight: 4, scores: [3, 5, 4, 4, 2], notes: "Mabuchi 20–30% lower; ebm-papst premium pricing" },
  { name: "Lead Time (target ≤8 wks)", weight: 3, scores: [4, 4, 4, 3, 5], notes: "ebm-papst fastest (3–5 wks from DE); Asian suppliers 6–10 wks" },
  { name: "Power Tool Track Record", weight: 5, scores: [5, 4, 4, 3, 2], notes: "Nidec & Mabuchi strongest power tool references; ebm-papst minimal" },
  { name: "Vertical Integration", weight: 3, scores: [5, 3, 4, 5, 4], notes: "Nidec & Minebea fully vertical (magnets, bearings, windings)" },
  { name: "IATF 16949 Certification", weight: 3, scores: [5, 4, 5, 5, 3], notes: "Most have IATF; ebm-papst primarily ISO 9001" },
];

const totals = suppliers.map((_, si) =>
  criteria.reduce((sum, c) => sum + c.scores[si] * c.weight, 0)
);
const maxTotal = criteria.reduce((sum, c) => sum + 5 * c.weight, 0);

const overallRatings = [
  { label: "Current Supplier (Benchmark)", color: "text-[hsl(var(--destructive))]" },
  { label: "★★★★ Very High — #1 Alt.", color: "text-[hsl(var(--accent))]" },
  { label: "★★★★ High — #2 Alt.", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ High — #3 Alt.", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ Moderate — #4 Alt.", color: "text-[hsl(var(--accent))]" },
];

const availabilityFeasibility = [
  { label: "✓ Active", feasible: true },
  { label: "✓ Available", feasible: true },
  { label: "✓ Available", feasible: true },
  { label: "✓ Available", feasible: true },
  { label: "◐ Limited PT exp.", feasible: true },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const scoreColor = (score: number, isReference: boolean) => {
  if (isReference) return "text-muted-foreground";
  if (score >= 5) return "text-[hsl(var(--accent))] font-bold";
  if (score >= 4) return "text-[hsl(var(--accent))]";
  if (score >= 3) return "text-[hsl(var(--warning))]";
  return "text-[hsl(var(--destructive))]";
};

const SupplierBenchmarkModal = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-7xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-[hsl(var(--accent))] uppercase tracking-[0.2em] mb-2">
                Supplier Benchmark — Brushless Motors for Power Tool Production
              </p>
              <h2 className="text-2xl font-medium text-foreground">
                Technical Comparison — 5 Motor Suppliers
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Reference: {referenceSupplier} (current supplier) · Weighted scoring across 12 criteria
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-[10px] text-muted-foreground uppercase tracking-wider font-mono font-normal sticky left-0 bg-background min-w-[180px] z-10">
                  Criterion
                </th>
                {suppliers.map((s, i) => (
                  <th key={i} className="text-center p-3 min-w-[120px]">
                    <div className={`text-xs font-medium ${i === 0 ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {s.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{s.country}</div>
                    {i === 0 && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-mono bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))] uppercase">
                        Reference
                      </span>
                    )}
                    {i === 1 && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-mono bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))] uppercase">
                        Recommended
                      </span>
                    )}
                  </th>
                ))}
                <th className="text-left p-3 text-[10px] text-muted-foreground uppercase tracking-wider font-mono font-normal min-w-[200px]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c, ci) => (
                <tr key={ci} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-3 sticky left-0 bg-background z-10">
                    <div className="text-xs text-foreground font-medium">{c.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">weight: {c.weight}</div>
                  </td>
                  {c.scores.map((score, si) => (
                    <td key={si} className="p-3 text-center">
                      <span className={`text-lg font-mono ${scoreColor(score, si === 0)}`}>
                        {score}
                      </span>
                    </td>
                  ))}
                  <td className="p-3 text-[10px] text-muted-foreground leading-relaxed">
                    {c.notes}
                  </td>
                </tr>
              ))}

              {/* Weighted Total */}
              <tr className="border-t-2 border-border bg-muted/30">
                <td className="p-3 sticky left-0 bg-muted/50 z-10">
                  <div className="text-xs text-foreground font-bold uppercase">Weighted Total</div>
                  <div className="text-[10px] text-muted-foreground font-mono">out of {maxTotal}</div>
                </td>
                {totals.map((t, i) => (
                  <td key={i} className="p-3 text-center">
                    <span className={`text-xl font-mono font-bold ${i === 0 ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {t}
                    </span>
                  </td>
                ))}
                <td className="p-3" />
              </tr>

              {/* Availability */}
              <tr className="border-b border-border/50">
                <td className="p-3 sticky left-0 bg-background z-10">
                  <div className="text-xs text-foreground font-medium">Availability</div>
                </td>
                {availabilityFeasibility.map((s, i) => (
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
              <tr className="bg-muted/30">
                <td className="p-3 sticky left-0 bg-muted/50 z-10">
                  <div className="text-xs text-foreground font-bold uppercase">Overall Rating</div>
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
        <div className="p-6 border-t border-border">
          <div className="bg-[hsl(var(--accent))]/5 border border-[hsl(var(--accent))]/20 p-5 rounded-sm">
            <p className="text-[10px] font-mono text-[hsl(var(--accent))] uppercase tracking-[0.2em] mb-3">
              AI Recommendation
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Mabuchi Motor — Primary alternative recommendation</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Best cost-performance ratio among alternative motor suppliers. 20–30% lower unit cost vs. Nidec with comparable quality for mid-power applications.
                    World's largest small motor manufacturer (1.6B units/yr) ensures supply security. Strong power tool references with Makita and TTI Group.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Next steps</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    1. Request Mabuchi sample motors for 36V BLDC platform validation testing ·
                    2. Schedule qualification audit at Mabuchi Dongguan plant (highest power tool volume) ·
                    3. Obtain Johnson Electric pricing as backup for cost negotiation leverage ·
                    4. Evaluate Minebea Mitsumi for high-precision applications requiring integrated bearings
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Risk note</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No alternative supplier currently matches Nidec's vertical integration depth (in-house magnets + bearings + windings).
                    Dual-sourcing Nidec + Mabuchi recommended to balance cost reduction with supply chain resilience.
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
