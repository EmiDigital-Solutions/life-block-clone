import { useAuditReportContext } from "@/contexts/AuditReportContext";

export default function DelayForecast() {
  const { delayForecastData } = useAuditReportContext();

  const baseDate = new Date('2026-04-15');
  const endDate = new Date('2026-06-25');
  const totalDays = (endDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);

  const dayOffset = (dateStr: string) => {
    const d = new Date(dateStr);
    return ((d.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100;
  };

  const delayedCount = delayForecastData.filter(d => d.predicted > d.contracted).length;

  return (
    <section id="station-12" className="scroll-mt-20 py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-warning" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Delay Forecast</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {delayedCount} of {delayForecastData.length} milestones predicted late
      </h2>

      <div className="p-8 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-6 mb-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block bg-primary opacity-50" /> Contracted
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block bg-warning" /> Predicted (if late)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block bg-accent" /> On time
          </span>
        </div>

        <div className="space-y-6">
          {delayForecastData.map((item, i) => {
            const isLate = item.predicted > item.contracted;
            const contractedPct = dayOffset(item.contracted);
            const predictedPct = dayOffset(item.predicted);

            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[15px] font-medium text-foreground">{item.milestone}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-muted-foreground">P{item.confidence}</span>
                    {isLate && (
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-warning/10 text-warning">
                        +{Math.round((new Date(item.predicted).getTime() - new Date(item.contracted).getTime()) / (1000 * 60 * 60 * 24))}d
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-6 bg-muted">
                  {/* Contracted bar */}
                  <div className="absolute top-0 h-full bg-primary/15" style={{ width: `${contractedPct}%` }}>
                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-primary" />
                  </div>
                  {/* Predicted overshoot */}
                  {isLate && (
                    <div className="absolute top-0 h-full bg-warning/30" style={{ left: `${contractedPct}%`, width: `${predictedPct - contractedPct}%` }}>
                      <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-warning" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-[11px] font-mono mt-1.5 text-muted-foreground">
                  <span>{item.contracted}</span>
                  {isLate && <span className="text-warning">{item.predicted}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}