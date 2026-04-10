import { delayForecastData } from "@/data/auditReportData";
import { cn } from "@/lib/utils";

export default function DelayForecast() {
  // Simple visual Gantt
  const baseDate = new Date('2026-04-15');
  const endDate = new Date('2026-06-25');
  const totalDays = (endDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);

  const dayOffset = (dateStr: string) => {
    const d = new Date(dateStr);
    return ((d.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100;
  };

  return (
    <section id="station-11" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-[32px] font-semibold text-[#F5F6FA] tracking-tight leading-none">
          Delay Forecast
        </span>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-white/[0.06] text-[#6B7085]">
          Atlas AI
        </span>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-6">
        <div className="flex items-center gap-6 text-[12px] text-[#6B7085]">
          <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#22D3EE] rounded-full inline-block" /> Contracted</span>
          <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#F5B544] rounded-full inline-block" /> Predicted</span>
        </div>

        {delayForecastData.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#F5F6FA] font-medium">{item.milestone}</span>
              <span className="text-[12px] font-mono text-[#6B7085]">P{item.confidence}</span>
            </div>
            <div className="relative h-6 bg-white/[0.04] rounded-lg overflow-hidden">
              {/* Contracted */}
              <div
                className="absolute top-1 h-4 bg-[#22D3EE]/30 rounded"
                style={{ left: '0%', width: `${dayOffset(item.contracted)}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#22D3EE]" />
              </div>
              {/* Predicted */}
              <div
                className="absolute top-1 h-4 rounded"
                style={{
                  left: '0%',
                  width: `${dayOffset(item.predicted)}%`,
                  background: item.predicted > item.contracted
                    ? 'rgba(245,181,68,0.2)'
                    : 'rgba(34,211,165,0.2)',
                }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-0.5" style={{
                  background: item.predicted > item.contracted ? '#F5B544' : '#22D3A5'
                }} />
              </div>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#6B7085]">
              <span>{item.contracted}</span>
              {item.predicted !== item.contracted && (
                <span className="text-[#F5B544]">{item.predicted} (predicted)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
