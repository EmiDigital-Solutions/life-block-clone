import { TrendingUp, TrendingDown } from "lucide-react";

const benchmarkData = [
  { label: 'Overall Score', supplier: 72, percentile: 23, totalAudits: 47, industry: 'Automotive Plastics' },
  { label: 'Quality System', supplier: 68, percentile: 18, totalAudits: 47, industry: 'Automotive Plastics' },
  { label: 'Machine Park', supplier: 81, percentile: 55, totalAudits: 47, industry: 'Automotive Plastics' },
  { label: 'Documentation', supplier: 45, percentile: 8, totalAudits: 47, industry: 'Automotive Plastics' },
];

export default function CrossAuditBenchmark() {
  const worstArea = benchmarkData.reduce((a, b) => a.percentile < b.percentile ? a : b);

  return (
    <section className="py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary" />
        <span className="text-[13px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Cross-Audit Benchmarking</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {worstArea.label} ranks P{worstArea.percentile} — bottom quartile vs. {benchmarkData[0].totalAudits} peers
      </h2>

      <div className="p-8 bg-card shadow-sm">
        <div className="space-y-6">
          {benchmarkData.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[15px] font-medium text-foreground">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-mono text-muted-foreground">{item.supplier}/100</span>
                  <span className="text-[15px] font-mono font-bold" style={{ color: item.percentile < 30 ? 'hsl(var(--destructive))' : 'hsl(var(--accent))' }}>
                    P{item.percentile}
                  </span>
                </div>
              </div>
              {/* Percentile bar */}
              <div className="relative h-4" style={{ background: 'linear-gradient(90deg, hsl(var(--destructive) / 0.12) 0%, hsl(var(--warning) / 0.12) 50%, hsl(var(--accent) / 0.12) 100%)' }}>
                <div
                  className="absolute top-0 bottom-0 w-1"
                  style={{ left: `${item.percentile}%`, background: item.percentile < 30 ? 'hsl(var(--destructive))' : 'hsl(var(--accent))' }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {item.percentile < 30 ? (
                  <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                )}
                <span className="text-[14px] text-muted-foreground">
                  {item.percentile < 30
                    ? `Below ${100 - item.percentile}% of peers in ${item.industry}`
                    : `Above ${item.percentile}% of peers`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}