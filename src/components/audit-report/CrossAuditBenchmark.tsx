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
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(195, 89%, 34%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Cross-Audit Benchmarking</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {worstArea.label} ranks P{worstArea.percentile} — bottom quartile vs. {benchmarkData[0].totalAudits} peers
      </h2>

      <div className="p-8" style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
        <div className="space-y-6">
          {benchmarkData.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[15px] font-medium text-foreground">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>{item.supplier}/100</span>
                  <span className="text-[13px] font-mono font-bold" style={{ color: item.percentile < 30 ? 'hsl(0, 48%, 46%)' : 'hsl(155, 24%, 55%)' }}>
                    P{item.percentile}
                  </span>
                </div>
              </div>
              {/* Percentile bar */}
              <div className="relative h-4" style={{ background: 'linear-gradient(90deg, hsl(0, 48%, 46%, 0.12) 0%, hsl(24, 72%, 63%, 0.12) 50%, hsl(155, 24%, 55%, 0.12) 100%)' }}>
                <div
                  className="absolute top-0 bottom-0 w-1"
                  style={{ left: `${item.percentile}%`, background: item.percentile < 30 ? 'hsl(0, 48%, 46%)' : 'hsl(155, 24%, 55%)' }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {item.percentile < 30 ? (
                  <TrendingDown className="w-3.5 h-3.5" style={{ color: 'hsl(0, 48%, 46%)' }} />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: 'hsl(155, 24%, 55%)' }} />
                )}
                <span className="text-[12px]" style={{ color: 'hsl(0,0%,50%)' }}>
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
