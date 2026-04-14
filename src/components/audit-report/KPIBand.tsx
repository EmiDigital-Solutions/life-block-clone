import type { KPITile, DepthLevel } from "@/data/auditReportData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import AtlasTooltip from "./AtlasTooltip";

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

// Atlas AI contextual insights for each KPI
const kpiInsights: Record<string, { insight: string; benchmark: string; recommendation?: string; severity: 'info' | 'warning' | 'critical' }> = {
  'DPPM': {
    insight: 'Defective Parts Per Million has increased 720% vs. prior period. This trend correlates with CNC calibration gaps detected in Station 5.',
    benchmark: 'BMW target: ≤50 DPPM. Industry avg (Tier-2 automotive): 120 DPPM. Current: 410 DPPM — 8.2× above OEM target.',
    recommendation: 'Immediate containment sort required. Address CNC #2/#4 calibration to arrest trend within 2 weeks.',
    severity: 'critical',
  },
  'NCR': {
    insight: '5 Non-Conformity Reports issued — 2 Major, 3 Minor. Major NCRs block PO release per BMW QMT 0800 §7.1.',
    benchmark: 'Industry avg for Tier-2 process audit: 2-3 NCRs. Previous audit: 3 NCRs (1 Major). Trend: worsening.',
    recommendation: 'Assign owners and CAPA deadlines for both Major NCRs before sign-off.',
    severity: 'critical',
  },
  'OEE': {
    insight: 'Overall Equipment Effectiveness at 68% is driven by low availability on CNC cells. Performance and quality components are adequate.',
    benchmark: 'World-class OEE: ≥85%. Automotive industry avg: 72%. This supplier: 68% — below sector median.',
    recommendation: 'Focus on planned maintenance schedule adherence to recover 8-12% availability.',
    severity: 'warning',
  },
  'Cost': {
    insight: 'Total quality cost exposure of €937K represents 4.8% of contract value. €580K is mitigatable through CAPA implementation.',
    benchmark: 'BMW target: quality costs <2% of contract. Current exposure: 4.8% — 2.4× above threshold.',
    recommendation: 'Prioritize calibration fix (€340K exposure) and quarantine improvement (€180K) for highest ROI.',
    severity: 'critical',
  },
  'Score': {
    insight: 'VDA 6.3 weighted score of 72% places the supplier in Grade B — Conditionally Qualified. Score declined 6 points from previous audit.',
    benchmark: 'BMW minimum for continued supply: 70% (Grade B). Re-qualification at <60% (Grade C). Current score: 2pts above threshold.',
    severity: 'warning',
  },
  'Cpk': {
    insight: 'Process capability index of 0.98 on critical bore ID dimension means ~6.8% of parts fall outside specification limits.',
    benchmark: 'BMW minimum Cpk: 1.33 (≤63 ppm out-of-spec). Industry standard: 1.67. Current 0.98 = ~31,700 ppm defect rate.',
    recommendation: 'Root cause: worn boring bar at 123% life + CNC drift. Replace tooling and recalibrate.',
    severity: 'critical',
  },
};

const getKPIInsight = (label: string) => {
  for (const key of Object.keys(kpiInsights)) {
    if (label.toUpperCase().includes(key.toUpperCase())) return kpiInsights[key];
  }
  return { insight: 'Atlas is analyzing this metric.', benchmark: 'Benchmark data being computed.', severity: 'info' as const };
};

interface KPIBandProps {
  kpis: KPITile[];
  depth?: DepthLevel;
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

export default function KPIBand({ kpis, depth = 'standard' }: KPIBandProps) {
  if (depth === 'executive') {
    return (
      <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-border/30">
          {kpis.map((kpi, i) => {
            const Icon = trendIcon[kpi.trend];
            const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
              || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
            const trendColor = kpi.trend === 'flat' ? 'hsl(var(--muted-foreground))' : isNegativeTrend ? 'hsl(var(--destructive))' : 'hsl(var(--accent))';
            const ai = getKPIInsight(kpi.label);

            return (
              <div key={i} className="px-4 py-4 text-center">
                <div className="text-[13px] text-muted-foreground mb-1">{kpi.label}</div>
                <AtlasTooltip
                  metric={kpi.label}
                  value={`${kpi.value}${kpi.unit || ''}`}
                  insight={ai.insight}
                  benchmark={ai.benchmark}
                  recommendation={ai.recommendation}
                  severity={ai.severity}
                >
                  <div className="text-[22px] font-semibold font-mono tabular-nums text-foreground leading-none cursor-help">
                    {kpi.value}{kpi.unit && <span className="text-[14px] text-muted-foreground ml-0.5">{kpi.unit}</span>}
                  </div>
                </AtlasTooltip>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Icon className="w-3 h-3" style={{ color: trendColor }} />
                  <span className="text-[13px] font-mono" style={{ color: trendColor }}>{kpi.trendValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi, i) => {
        const Icon = trendIcon[kpi.trend];
        const isNegativeTrend = (kpi.trend === 'up' && (kpi.label.includes('NCR') || kpi.label.includes('DPPM') || kpi.label.includes('Cost')))
          || (kpi.trend === 'down' && !kpi.label.includes('NCR') && !kpi.label.includes('DPPM') && !kpi.label.includes('Cost'));
        const trendColor = kpi.trend === 'flat' ? 'hsl(var(--muted-foreground))' : isNegativeTrend ? 'hsl(var(--destructive))' : 'hsl(var(--accent))';
        const sparkColor = isNegativeTrend ? 'hsl(var(--destructive))' : 'hsl(var(--primary))';
        const ai = getKPIInsight(kpi.label);

        return (
          <div key={i} className="p-5 bg-card shadow-sm">
            <span className="text-[12px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
              {kpi.label}
            </span>
            <div className="flex items-end justify-between mt-3 gap-3">
              <AtlasTooltip
                metric={kpi.label}
                value={`${kpi.value}${kpi.unit || ''}`}
                insight={ai.insight}
                benchmark={ai.benchmark}
                recommendation={ai.recommendation}
                severity={ai.severity}
              >
                <div className="flex items-baseline gap-1.5 cursor-help">
                  <span className="text-[32px] font-bold text-foreground leading-none tracking-tight font-mono tabular-nums">
                    {kpi.value}
                  </span>
                  {kpi.unit && (
                    <span className="text-[14px] text-muted-foreground">{kpi.unit}</span>
                  )}
                </div>
              </AtlasTooltip>
              {kpi.sparkline && <MiniSparkline data={kpi.sparkline} color={sparkColor} />}
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
              <Icon className="w-4 h-4" style={{ color: trendColor }} />
              <span className="text-[15px] font-mono font-medium" style={{ color: trendColor }}>{kpi.trendValue}</span>
              <span className="text-[13px] text-muted-foreground">vs. prior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}