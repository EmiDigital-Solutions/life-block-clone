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
  const h = 32;
  const w = 80;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <circle cx={(data.length - 1) * step} cy={h - ((data[data.length - 1] - min) / range) * h} r="3" fill={color} />
    </svg>
  );
}

export default function KPIBand({ kpis }: KPIBandProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
          || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
        const trendColor = kpi.trend === 'flat' ? 'hsl(0,0%,50%)' : isNegativeTrend ? 'hsl(0, 48%, 46%)' : 'hsl(155, 24%, 55%)';
        const sparkColor = isNegativeTrend ? 'hsl(0, 48%, 46%)' : 'hsl(195, 89%, 34%)';

        return (
          <div key={i} className="p-5" style={{ background: 'hsl(0,0%,100%)' }}>
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>
              {kpi.label}
            </span>
            <div className="flex items-end justify-between mt-3 gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[32px] font-bold text-foreground leading-none tracking-tight font-mono tabular-nums">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[14px]" style={{ color: 'hsl(0,0%,50%)' }}>{kpi.unit}</span>
                )}
              </div>
              {kpi.sparkline && <MiniSparkline data={kpi.sparkline} color={sparkColor} />}
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid hsl(0,0%,90%)' }}>
              <Icon className="w-4 h-4" style={{ color: trendColor }} />
              <span className="text-[13px] font-mono font-medium" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[11px]" style={{ color: 'hsl(0,0%,55%)' }}>vs. prior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
