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

  return (
    <section id="station-12" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// 12</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">Delay Forecast</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">
        Delay Forecast
      </h2>

      <div className=" border border-border bg-white p-6 space-y-6">
        <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0A7FA5] rounded-full inline-block" /> Contracted</span>
          <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#E39B5C] rounded-full inline-block" /> Predicted</span>
        </div>

        {delayForecastData.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-foreground font-medium">{item.milestone}</span>
              <span className="text-[12px] font-mono text-muted-foreground">P{item.confidence}</span>
            </div>
            <div className="relative h-6 bg-muted  overflow-hidden">
              <div className="absolute top-1 h-4 bg-primary/10 rounded" style={{ left: '0%', width: `${dayOffset(item.contracted)}%` }}>
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#0A7FA5]" />
              </div>
              <div className="absolute top-1 h-4 rounded" style={{
                left: '0%', width: `${dayOffset(item.predicted)}%`,
                background: item.predicted > item.contracted ? 'rgba(227,155,92,0.15)' : 'rgba(110,169,150,0.15)',
              }}>
                <div className="absolute right-0 top-0 bottom-0 w-0.5" style={{
                  background: item.predicted > item.contracted ? 'hsl(24, 72%, 63%)' : 'hsl(155, 24%, 55%)'
                }} />
              </div>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span>{item.contracted}</span>
              {item.predicted !== item.contracted && (
                <span className="text-warning">{item.predicted} (predicted)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
