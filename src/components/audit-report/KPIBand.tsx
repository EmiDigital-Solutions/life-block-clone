import { cn } from "@/lib/utils";
import type { KPITile } from "@/data/auditReportData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const trendColor = {
  up: 'text-[#22D3A5]',
  down: 'text-[#22D3A5]', // down NCRs is good
  flat: 'text-[#6B7085]',
};

interface KPIBandProps {
  kpis: KPITile[];
}

export default function KPIBand({ kpis }: KPIBandProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        return (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5 hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer"
          >
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">
              {kpi.label}
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-[48px] font-semibold text-[#F5F6FA] leading-none tracking-tight tabular-nums" style={{ fontFeatureSettings: "'tnum'" }}>
                {kpi.value}
              </span>
              {kpi.unit && (
                <span className="text-[20px] text-[#6B7085] font-medium">{kpi.unit}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Icon className={cn("w-3.5 h-3.5", trendColor[kpi.trend])} />
              <span className={cn("text-[12px] font-mono", trendColor[kpi.trend])}>{kpi.trendValue}</span>
              <span className="text-[12px] text-[#6B7085]">vs. last audit</span>
            </div>
            <p className="text-[12px] text-[#6B7085] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{kpi.interpretation}</p>
          </div>
        );
      })}
    </div>
  );
}
