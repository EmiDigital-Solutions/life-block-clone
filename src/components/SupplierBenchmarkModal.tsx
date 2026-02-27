import { motion } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, XCircle, Star, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Benchmark data — rotary hammer suppliers for construction fleet procurement
const referenceSupplier = "Hilti AG";

interface BenchmarkCriterion {
  name: string;
  weight: number;
  scores: number[]; // one per supplier
  notes: string;
}

const suppliers = [
  { name: "Hilti AG", country: "Liechtenstein", role: "Reference (Benchmark)", blocked: true },
  { name: "Makita Corporation", country: "Japan", role: "#1 Priority", blocked: false },
  { name: "Bosch Professional", country: "Germany", role: "#2 Priority", blocked: false },
  { name: "DeWalt Industrial", country: "USA", role: "#3 Priority", blocked: false },
  { name: "Milwaukee Tool", country: "USA", role: "#4 Priority", blocked: false },
];

const criteria: BenchmarkCriterion[] = [
  { name: "Impact Energy ≥ 12 J", weight: 5, scores: [5, 5, 5, 5, 4], notes: "All cover ≥12 J SDS-Max; Milwaukee slightly below at 11.6 J" },
  { name: "IP56 Dust/Water Rating", weight: 5, scores: [5, 5, 3, 4, 5], notes: "Makita & Milwaukee IP56 standard; Bosch IP54 needs verification" },
  { name: "IEC 62841 Compliance", weight: 5, scores: [5, 5, 5, 4, 4], notes: "Makita & Bosch full IEC; DeWalt/Milwaukee primarily UL Listed" },
  { name: "Fleet Mgmt / Connectivity", weight: 4, scores: [5, 3, 4, 3, 5], notes: "Milwaukee One-Key leads; Bosch Connected improving; Makita developing" },
  { name: "Battery Platform Breadth", weight: 4, scores: [5, 5, 4, 4, 4], notes: "Makita 300+ tools on 18V LXT; Bosch ProCORE growing" },
  { name: "Dust Extraction Integration", weight: 3, scores: [5, 5, 4, 5, 4], notes: "Makita AWS & DeWalt AirLock both excellent" },
  { name: "Pricing vs Hilti (est.)", weight: 4, scores: [2, 4, 4, 3, 3], notes: "Makita/Bosch 30–40% lower; DeWalt ~25% lower" },
  { name: "Lead Time / Delivery", weight: 4, scores: [5, 4, 5, 5, 4], notes: "Bosch & DeWalt fastest (3–6 weeks); Makita 4–8 weeks" },
  { name: "After-Sales / Warranty", weight: 3, scores: [5, 4, 4, 5, 4], notes: "DeWalt 3yr + 1yr free service; Hilti fleet management best" },
  { name: "Vibration Reduction Tech", weight: 3, scores: [5, 5, 3, 4, 4], notes: "Makita AVT system closest to Hilti Active Vibration Reduction" },
  { name: "Company Scale / Stability", weight: 3, scores: [5, 5, 5, 4, 4], notes: "Bosch largest (€6.1B tools div.); Makita €4.8B" },
  { name: "EU Availability & Support", weight: 5, scores: [5, 5, 5, 3, 3], notes: "Hilti/Makita/Bosch strong EU network; DeWalt/Milwaukee US-centric" },
];

const totals = suppliers.map((_, si) => 
  criteria.reduce((sum, c) => sum + c.scores[si] * c.weight, 0)
);
const maxTotal = criteria.reduce((sum, c) => sum + 5 * c.weight, 0);

const overallRatings = [
  { label: "Benchmark (In-house)", color: "text-[hsl(var(--destructive))]" },
  { label: "★★★★ Very High — #1 Priority", color: "text-[hsl(var(--accent))]" },
  { label: "★★★★ Very High — #2 Priority", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ High — #3 Priority", color: "text-[hsl(var(--accent))]" },
  { label: "★★★ High — #4 Priority", color: "text-[hsl(var(--accent))]" },
];

const availabilityFeasibility = [
  { label: "✓ In-house", feasible: true },
  { label: "✓ Available", feasible: true },
  { label: "✓ Available", feasible: true },
  { label: "◐ Limited EU", feasible: true },
  { label: "◐ Limited EU", feasible: true },
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
                Supplier Benchmark — Rotary Hammers for Construction Fleet
              </p>
              <h2 className="text-2xl font-medium text-foreground">
                Technical Comparison — 5 Suppliers
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Reference: {referenceSupplier} (in-house benchmark) · Weighted scoring across 12 criteria
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

              {/* EU Availability */}
              <tr className="border-b border-border/50">
                <td className="p-3 sticky left-0 bg-background z-10">
                  <div className="text-xs text-foreground font-medium">EU Availability</div>
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
                  <p className="text-sm text-foreground font-medium">Makita Corporation — Primary recommendation</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Highest weighted score among alternative suppliers. 300+ tools on single 18V LXT battery platform provides maximum fleet standardization.
                    AVT vibration reduction system is closest technical equivalent to Hilti Active Vibration Reduction.
                    30–40% cost reduction vs Hilti reference. In-house motor manufacturing and global service network.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Next steps</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    1. Request Makita fleet pricing for SDS-Max rotary hammer package (50+ units) · 
                    2. Schedule demo day at nearest Makita experience center for hands-on testing · 
                    3. Obtain Bosch Professional pricing as backup for cost negotiation leverage · 
                    4. Evaluate Milwaukee One-Key fleet management as add-on for tool tracking
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Risk note</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No alternative supplier currently matches Hilti's integrated fleet management (ON!Track). 
                    Milwaukee One-Key offers closest alternative but has limited EU availability.
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
