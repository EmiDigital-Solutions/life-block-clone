import { cn } from "@/lib/utils";
import type { KPITile } from "@/data/auditReportData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

const kpiThresholds: Record<string, { threshold: string; label: string }> = {
  'Overall Score': { threshold: '70', label: 'BMW Min' },
  'IATF Score': { threshold: '70%', label: 'BMW Min' },
  'Open NCRs': { threshold: '0', label: 'Target' },
  'DPPM': { threshold: '50', label: 'BMW Max' },
  'Cost Exposure': { threshold: '€0', label: 'Target' },
  'Cpk Critical': { threshold: '1.33', label: 'BMW Min' },
  'On-time Forecast': { threshold: '95%', label: 'BMW Min' },
  'Innovation Index': { threshold: '63', label: 'Tier-2 Median' },
};

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
          || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
        const trendColor = kpi.trend === 'flat' ? 'hsl(0,0%,50%)' : isNegativeTrend ? 'hsl(0, 48%, 46%)' : 'hsl(155, 24%, 55%)';
        const sparkColor = isNegativeTrend ? 'hsl(0, 48%, 46%)' : 'hsl(195, 89%, 34%)';
        const threshold = kpiThresholds[kpi.label];

        return (
          <div
            key={i}
            className="p-4 group cursor-pointer transition-colors"
            style={{
              background: 'hsla(0,0%,100%,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid hsl(0,0%,80%)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-3.5 h-3.5" style={{ color: 'hsl(0,0%,45%)' }} />
              <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>
                {kpi.label}
              </span>
            </div>
            <div className="flex items-end justify-between mt-2 gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-bold text-foreground leading-none tracking-tight tabular-nums">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[13px] font-light" style={{ color: 'hsl(0,0%,55%)' }}>{kpi.unit}</span>
                )}
              </div>
              {kpi.sparkline && <MiniSparkline data={kpi.sparkline} color={sparkColor} />}
            </div>

            {threshold && (
              <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: '1px solid hsl(0,0%,88%)' }}>
                <div className="text-[10px]">
                  <span style={{ color: 'hsl(0,0%,55%)' }}>Actual</span>
                  <span className="font-mono font-semibold text-foreground ml-1">{kpi.value}{kpi.unit || ''}</span>
                </div>
                <div className="text-[10px]">
                  <span style={{ color: 'hsl(0,0%,55%)' }}>{threshold.label}</span>
                  <span className="font-mono font-semibold ml-1" style={{ color: 'hsl(0,0%,45%)' }}>{threshold.threshold}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 mt-2">
              <Icon className="w-3.5 h-3.5" style={{ color: trendColor }} />
              <span className="text-[12px] font-mono font-medium" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[11px]" style={{ color: 'hsl(0,0%,55%)' }}>vs. prior</span>
            </div>
            <p className="text-[12px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity leading-relaxed" style={{ color: 'hsl(0,0%,50%)' }}>{kpi.interpretation}</p>
          </div>
        );
      })}
    </div>
  );
}