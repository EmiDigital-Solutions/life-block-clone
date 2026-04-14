import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Shield } from "lucide-react";
import type { DepthLevel } from "@/data/auditReportData";

function RiskGauge({ score }: { score: number }) {
  const color = score >= 70 ? 'hsl(155, 24%, 55%)' : score >= 40 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  const label = score >= 70 ? 'LOW RISK' : score >= 40 ? 'MODERATE RISK' : 'HIGH RISK';
  const angle = (score / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 90" className="w-[240px]">
        <path d="M 12 80 A 68 68 0 0 1 148 80" fill="none" stroke="hsl(var(--border))" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M 12 80 A 68 68 0 0 1 148 80"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 213} 213`}
        />
        <text x="80" y="72" textAnchor="middle" fontSize="36" fontWeight="800" fill={color} fontFamily="ui-monospace, monospace">
          {score}
        </text>
      </svg>
      <div className="flex items-center gap-2 mt-2">
        <Shield className="w-4 h-4" style={{ color }} />
        <span className="text-[12px] font-bold tracking-[0.15em] uppercase" style={{ color }}>{label}</span>
      </div>
    </div>
  );
}

export default function AtlasRiskScore({ depth = 'standard' }: { depth?: DepthLevel }) {
  const { stations, allNCRs, kpis, costImpactData } = useAuditReportContext();

  const healthScores = { green: 100, amber: 60, red: 20, grey: 50 };
  const stationStations = stations.filter(s => s.index >= 2 && s.index <= 9);
  const stationAvg = stationStations.length > 0
    ? stationStations.reduce((acc, s) => acc + (healthScores[s.health] || 50), 0) / stationStations.length
    : 50;

  const majorCount = allNCRs.filter(n => n.severity === 'major').length;
  const minorCount = allNCRs.filter(n => n.severity === 'minor').length;
  const ncrScore = Math.max(0, 100 - (majorCount * 25) - (minorCount * 10));

  const totalExposure = costImpactData.reduce((a, c) => a + c.currentExposure, 0);
  const costScore = Math.max(0, 100 - (totalExposure / 10000));

  const overallKpi = kpis.find(k => k.label === 'Overall Score');
  const overallScore = overallKpi ? parseInt(overallKpi.value) : 72;

  const score = Math.max(0, Math.min(100, Math.round(
    stationAvg * 0.4 + ncrScore * 0.3 + costScore * 0.2 + overallScore * 0.1
  )));

  const components = [
    { label: 'Station Health', value: Math.round(stationAvg), weight: '40%', color: stationAvg >= 70 ? 'hsl(var(--accent))' : 'hsl(var(--warning))' },
    { label: 'NCR Impact', value: ncrScore, weight: '30%', color: ncrScore >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))' },
    { label: 'Cost Risk', value: Math.round(Math.max(0, 100 - (totalExposure / 10000))), weight: '20%', color: totalExposure > 500000 ? 'hsl(var(--destructive))' : 'hsl(var(--warning))' },
    { label: 'Overall Score', value: overallScore, weight: '10%', color: 'hsl(var(--primary))' },
  ];

  if (depth === 'executive') {
    const color = score >= 70 ? 'hsl(155, 24%, 55%)' : score >= 40 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
    return (
      <section className="py-2">
        <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
            <span className="text-[13px] font-semibold text-foreground">Atlas Risk Score</span>
            <span className="text-[18px] font-semibold font-mono" style={{ color }}>{score}/100</span>
          </div>
          <div className="grid grid-cols-4 divide-x divide-border bg-card">
            {components.map(c => (
              <div key={c.label} className="px-3 py-2 text-center">
                <div className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">{c.label}</div>
                <div className="text-[16px] font-bold font-mono mt-0.5" style={{ color: c.color }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Atlas AI</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        Composite risk score: {score}/100
      </h2>

      <div className="p-8 bg-card shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <RiskGauge score={score} />

          <div className="flex-1 space-y-4 w-full">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Weighted composite of station health, NCR severity, cost exposure, and overall audit performance. This supplier ranks in the <strong className="text-foreground">23rd percentile</strong> across 47 automotive plastics audits.
            </p>

            <div className="space-y-3 mt-6">
              {components.map(comp => (
                <div key={comp.label} className="flex items-center gap-4">
                  <span className="text-[13px] text-foreground w-[120px] shrink-0">{comp.label}</span>
                  <span className="text-[10px] font-mono w-[36px] shrink-0 text-muted-foreground">{comp.weight}</span>
                  <div className="flex-1 h-3 relative bg-muted">
                    <div className="absolute top-0 h-full opacity-70" style={{ width: `${comp.value}%`, background: comp.color }} />
                  </div>
                  <span className="text-[14px] font-mono font-bold w-[40px] text-right" style={{ color: comp.color }}>{comp.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}