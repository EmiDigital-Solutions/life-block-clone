import { cn } from "@/lib/utils";
import type { KPITile } from "@/data/auditReportData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

interface KPIBandProps {
  kpis: KPITile[];
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 56;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) * step} cy={h - ((data[data.length - 1] - min) / range) * h} r="2" fill={color} />
    </svg>
  );
}

export default function KPIBand({ kpis }: KPIBandProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
          || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
        const trendColor = kpi.trend === 'flat' ? '#9CA3AF' : isNegativeTrend ? '#EF4444' : '#10B981';
        const sparkColor = isNegativeTrend ? '#EF4444' : '#0052FF';

        return (
          <div
            key={i}
            className="rounded-xl border border-[#E5E7EB] bg-white p-5 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">
              {kpi.label}
            </span>
            <div className="flex items-end justify-between mt-2 gap-2">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[36px] font-light text-[#111827] leading-none tracking-tight tabular-nums">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[14px] text-[#9CA3AF] font-light">{kpi.unit}</span>
                )}
              </div>
              {kpi.sparkline && <MiniSparkline data={kpi.sparkline} color={sparkColor} />}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Icon className="w-3 h-3" style={{ color: trendColor }} />
              <span className="text-[11px] font-mono" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[10px] text-[#D1D5DB]">vs. prior</span>
            </div>
            <p className="text-[11px] text-[#9CA3AF] mt-2 opacity-0 group-hover:opacity-100 transition-opacity leading-relaxed">{kpi.interpretation}</p>
          </div>
        );
      })}
    </div>
  );
}
