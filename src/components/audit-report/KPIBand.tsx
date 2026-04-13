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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
          || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
        const trendColor = kpi.trend === 'flat' ? 'hsl(var(--muted-foreground))' : isNegativeTrend ? 'hsl(var(--destructive))' : 'hsl(var(--accent))';
        const sparkColor = isNegativeTrend ? 'hsl(var(--destructive))' : 'hsl(var(--primary))';

        return (
          <div key={i} className="p-5 bg-card">
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
              {kpi.label}
            </span>
            <div className="flex items-end justify-between mt-3 gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[32px] font-bold text-foreground leading-none tracking-tight font-mono tabular-nums">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[14px] text-muted-foreground">{kpi.unit}</span>
                )}
              </div>
              {kpi.sparkline && <MiniSparkline data={kpi.sparkline} color={sparkColor} />}
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <Icon className="w-4 h-4" style={{ color: trendColor }} />
              <span className="text-[13px] font-mono font-medium" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[11px] text-muted-foreground">vs. prior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}