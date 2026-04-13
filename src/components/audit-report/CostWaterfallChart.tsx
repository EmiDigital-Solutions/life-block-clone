import { useAuditReportContext } from "@/contexts/AuditReportContext";

export default function CostWaterfallChart() {
  const { costImpactData } = useAuditReportContext();

  const totalExposure = costImpactData.reduce((a, c) => a + c.currentExposure, 0);
  const totalMitigated = costImpactData.reduce((a, c) => a + c.mitigatedCost, 0);
  const savings = totalExposure - totalMitigated;
  const maxExposure = Math.max(...costImpactData.map(c => c.currentExposure));

  return (
    <section className="scroll-mt-20 py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-destructive" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Cost Analysis</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        €{Math.round(savings / 1000)}K recoverable through mitigation
      </h2>
      <p className="text-[15px] max-w-2xl leading-relaxed text-muted-foreground">
        Total cost exposure of €{Math.round(totalExposure / 1000)}K can be reduced to €{Math.round(totalMitigated / 1000)}K with recommended corrective actions.
      </p>

      {/* Hero stat row */}
      <div className="flex items-stretch gap-px bg-border">
        {[
          { label: 'Total Exposure', value: `€${Math.round(totalExposure / 1000)}K`, color: 'hsl(var(--destructive))' },
          { label: 'After Mitigation', value: `€${Math.round(totalMitigated / 1000)}K`, color: 'hsl(var(--accent))' },
          { label: 'Savings', value: `€${Math.round(savings / 1000)}K`, color: 'hsl(var(--primary))' },
          { label: 'Avg. Confidence', value: `${Math.round(costImpactData.reduce((a, c) => a + c.confidence, 0) / costImpactData.length)}%`, color: 'hsl(var(--foreground))' },
        ].map(stat => (
          <div key={stat.label} className="flex-1 p-5 bg-card">
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">{stat.label}</span>
            <div className="text-[28px] font-bold font-mono tabular-nums mt-1 leading-none" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Horizontal bar chart */}
      <div className="p-8 bg-card shadow-sm">
        <div className="flex items-center gap-6 mb-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block bg-destructive opacity-70" /> At Risk
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block bg-accent" /> After Mitigation
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
                    <span className="text-destructive">€{Math.round(item.currentExposure / 1000)}K</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-accent">€{Math.round(item.mitigatedCost / 1000)}K</span>
                  </div>
                </div>
                <div className="relative h-6 bg-muted">
                  <div className="absolute top-0 h-full bg-destructive opacity-20" style={{ width: `${exposurePct}%` }} />
                  <div className="absolute top-0 h-full bg-accent opacity-60" style={{ width: `${mitigatedPct}%` }} />
                </div>
                <p className="text-[12px] mt-1.5 leading-relaxed text-muted-foreground">
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