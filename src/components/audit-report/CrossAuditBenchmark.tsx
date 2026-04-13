import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const benchmarkData = [
  { label: 'Overall Score', supplier: 72, percentile: 23, totalAudits: 47, industry: 'Automotive Plastics' },
  { label: 'Quality System', supplier: 68, percentile: 18, totalAudits: 47, industry: 'Automotive Plastics' },
  { label: 'Machine Park', supplier: 81, percentile: 55, totalAudits: 47, industry: 'Automotive Plastics' },
  { label: 'Documentation', supplier: 45, percentile: 8, totalAudits: 47, industry: 'Automotive Plastics' },
];

export default function CrossAuditBenchmark() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h3 className="text-[14px] font-semibold text-foreground">Cross-Audit Benchmarking</h3>
        <span className="text-[11px] text-muted-foreground">vs. {benchmarkData[0].totalAudits} audits in {benchmarkData[0].industry}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {benchmarkData.map((item) => (
          <div key={item.label} className="border border-border bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-foreground">{item.label}</span>
              <span className="text-[11px] font-mono text-muted-foreground">{item.supplier}/100</span>
            </div>
            {/* Percentile bar */}
            <div className="relative h-6 bg-muted">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-destructive/20 via-warning/20 to-accent/20"
                style={{ width: '100%' }}
              />
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
                style={{ left: `${item.percentile}%` }}
              />
              <div
                className="absolute -top-5 text-[9px] font-mono text-primary font-bold whitespace-nowrap"
                style={{ left: `${item.percentile}%`, transform: 'translateX(-50%)' }}
              >
                P{item.percentile}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {item.percentile < 30 ? (
                <TrendingDown className="w-3 h-3 text-destructive" />
              ) : (
                <TrendingUp className="w-3 h-3 text-accent" />
              )}
              <span className="text-[10px] text-muted-foreground">
                {item.percentile < 30
                  ? `Bottom quartile — below ${100 - item.percentile}% of peers`
                  : `Above ${item.percentile}% of peers`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
