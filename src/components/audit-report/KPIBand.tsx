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
  const h = 28;
  const w = 64;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={(data.length - 1) * step} cy={h - ((data[data.length - 1] - min) / range) * h} r="2.5" fill={color} />
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
        const trendColor = kpi.trend === 'flat' ? '#7B8E80' : isNegativeTrend ? '#AD3D3D' : '#6EA996';
        const sparkColor = isNegativeTrend ? '#AD3D3D' : '#0A7FA5';

        return (
          <div
            key={i}
            className=" border border-[#E5E7EB] bg-white p-5 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">
              {kpi.label}
            </span>
            <div className="flex items-end justify-between mt-3 gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] font-light text-[#0A0A0A] leading-none tracking-tight tabular-nums">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[14px] text-[#C0C0C0] font-light">{kpi.unit}</span>
                )}
              </div>
              {kpi.sparkline && <MiniSparkline data={kpi.sparkline} color={sparkColor} />}
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Icon className="w-3.5 h-3.5" style={{ color: trendColor }} />
              <span className="text-[12px] font-mono font-medium" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[11px] text-[#C0C0C0]">vs. prior</span>
            </div>
            <p className="text-[12px] text-[#7B8E80] mt-2 opacity-0 group-hover:opacity-100 transition-opacity leading-relaxed">{kpi.interpretation}</p>
          </div>
        );
      })}
    </div>
  );
}
