import type { KPITile } from "@/data/auditReportData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

interface KPIBandProps {
  kpis: KPITile[];
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
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
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <circle cx={(data.length - 1) * step} cy={h - ((data[data.length - 1] - min) / range) * h} r="3" fill={color} />
    </svg>
  );
}

export default function KPIBand({ kpis }: KPIBandProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'hsl(0,0%,88%)' }}>
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
          || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
        const trendColor = kpi.trend === 'flat' ? 'hsl(0,0%,55%)' : isNegativeTrend ? 'hsl(0, 48%, 46%)' : 'hsl(155, 24%, 45%)';

        return (
          <div key={i} className="bg-white p-6 group">
            <div className="text-[11px] font-medium tracking-wide uppercase mb-3" style={{ color: 'hsl(0,0%,55%)' }}>
              {kpi.label}
            </div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <span className="text-[32px] font-semibold text-foreground leading-none tabular-nums">
                  {kpi.value}
                </span>
                {kpi.unit && <span className="text-[14px] ml-1" style={{ color: 'hsl(0,0%,55%)' }}>{kpi.unit}</span>}
              </div>
              {kpi.sparkline && <Sparkline data={kpi.sparkline} color={trendColor} />}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Icon className="w-3.5 h-3.5" style={{ color: trendColor }} />
              <span className="text-[13px] font-medium tabular-nums" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[12px]" style={{ color: 'hsl(0,0%,55%)' }}>vs. prior</span>
            </div>
            <p className="text-[12px] mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'hsl(0,0%,50%)' }}>{kpi.interpretation}</p>
          </div>
        );
      })}
    </div>
  );
}