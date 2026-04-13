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
    <section id="station-12" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(24, 72%, 63%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Delay Forecast</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {delayedCount} of {delayForecastData.length} milestones predicted late
      </h2>

      <div className="p-8" style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
        <div className="flex items-center gap-6 mb-6 text-[11px]" style={{ color: 'hsl(0,0%,50%)' }}>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block" style={{ background: 'hsl(195, 89%, 34%)', opacity: 0.5 }} /> Contracted
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block" style={{ background: 'hsl(24, 72%, 63%)' }} /> Predicted (if late)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-2 inline-block" style={{ background: 'hsl(155, 24%, 55%)' }} /> On time
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
                    <span className="text-[12px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>P{item.confidence}</span>
                    {isLate && (
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5" style={{ background: 'hsl(24, 72%, 63%, 0.1)', color: 'hsl(24, 72%, 63%)' }}>
                        +{Math.round((new Date(item.predicted).getTime() - new Date(item.contracted).getTime()) / (1000 * 60 * 60 * 24))}d
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-6" style={{ background: 'hsl(0,0%,95%)' }}>
                  {/* Contracted bar */}
                  <div className="absolute top-0 h-full" style={{ width: `${contractedPct}%`, background: 'hsl(195, 89%, 34%)', opacity: 0.15 }}>
                    <div className="absolute right-0 top-0 bottom-0 w-0.5" style={{ background: 'hsl(195, 89%, 34%)' }} />
                  </div>
                  {/* Predicted overshoot */}
                  {isLate && (
                    <div className="absolute top-0 h-full" style={{ left: `${contractedPct}%`, width: `${predictedPct - contractedPct}%`, background: 'hsl(24, 72%, 63%)', opacity: 0.3 }}>
                      <div className="absolute right-0 top-0 bottom-0 w-0.5" style={{ background: 'hsl(24, 72%, 63%)' }} />
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-[11px] font-mono mt-1.5" style={{ color: 'hsl(0,0%,55%)' }}>
                  <span>{item.contracted}</span>
                  {isLate && <span style={{ color: 'hsl(24, 72%, 63%)' }}>{item.predicted}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
