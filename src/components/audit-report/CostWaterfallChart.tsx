import { useAuditReportContext } from "@/contexts/AuditReportContext";

export default function CostWaterfallChart() {
  const { costImpactData } = useAuditReportContext();

  const totalExposure = costImpactData.reduce((a, c) => a + c.currentExposure, 0);
  const totalMitigated = costImpactData.reduce((a, c) => a + c.mitigatedCost, 0);
  const savings = totalExposure - totalMitigated;
  const maxExposure = Math.max(...costImpactData.map(c => c.currentExposure));

  return (
    <section className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(0, 48%, 46%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Cost Analysis</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        €{Math.round(savings / 1000)}K recoverable through mitigation
      </h2>
      <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: 'hsl(0,0%,45%)' }}>
        Total cost exposure of €{Math.round(totalExposure / 1000)}K can be reduced to €{Math.round(totalMitigated / 1000)}K with recommended corrective actions.
      </p>

      {/* Hero stat row */}
      <div className="flex items-stretch gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
        {[
          { label: 'Total Exposure', value: `€${Math.round(totalExposure / 1000)}K`, color: 'hsl(0, 48%, 46%)' },
          { label: 'After Mitigation', value: `€${Math.round(totalMitigated / 1000)}K`, color: 'hsl(155, 24%, 55%)' },
          { label: 'Savings', value: `€${Math.round(savings / 1000)}K`, color: 'hsl(195, 89%, 34%)' },
          { label: 'Avg. Confidence', value: `${Math.round(costImpactData.reduce((a, c) => a + c.confidence, 0) / costImpactData.length)}%`, color: 'hsl(0,0%,30%)' },
        ].map(stat => (
          <div key={stat.label} className="flex-1 p-5" style={{ background: 'hsl(0,0%,100%)' }}>
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>{stat.label}</span>
            <div className="text-[28px] font-bold font-mono tabular-nums mt-1 leading-none" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Horizontal bar chart — one bar per category, exposure vs mitigated */}
      <div className="p-8" style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
        <div className="flex items-center gap-6 mb-6 text-[11px]" style={{ color: 'hsl(0,0%,50%)' }}>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block" style={{ background: 'hsl(0, 48%, 46%)', opacity: 0.7 }} /> At Risk
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block" style={{ background: 'hsl(155, 24%, 55%)' }} /> After Mitigation
          </span>
        </div>

        <div className="space-y-5">
          {costImpactData.map(item => {
            const exposurePct = (item.currentExposure / maxExposure) * 100;
            const mitigatedPct = (item.mitigatedCost / maxExposure) * 100;
            const name = item.category.split(' — ')[0];

            return (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-medium text-foreground">{name}</span>
                  <div className="flex items-center gap-4 text-[13px] font-mono tabular-nums">
                    <span style={{ color: 'hsl(0, 48%, 46%)' }}>€{Math.round(item.currentExposure / 1000)}K</span>
                    <span style={{ color: 'hsl(0,0%,70%)' }}>→</span>
                    <span style={{ color: 'hsl(155, 24%, 55%)' }}>€{Math.round(item.mitigatedCost / 1000)}K</span>
                  </div>
                </div>
                <div className="relative h-6" style={{ background: 'hsl(0,0%,95%)' }}>
                  <div
                    className="absolute top-0 h-full"
                    style={{ width: `${exposurePct}%`, background: 'hsl(0, 48%, 46%)', opacity: 0.2 }}
                  />
                  <div
                    className="absolute top-0 h-full"
                    style={{ width: `${mitigatedPct}%`, background: 'hsl(155, 24%, 55%)', opacity: 0.6 }}
                  />
                </div>
                <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color: 'hsl(0,0%,50%)' }}>
                  {item.driver.substring(0, 120)}{item.driver.length > 120 ? '…' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
