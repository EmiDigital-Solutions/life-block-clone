import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Zap, AlertTriangle, TrendingDown } from "lucide-react";

const severityColor: Record<string, string> = {
  critical: 'hsl(0, 48%, 46%)',
  high: 'hsl(24, 72%, 63%)',
  medium: '#D4A843',
  low: 'hsl(155, 24%, 55%)',
};

export default function AnomalyCallouts() {
  const { crossCorrelations, supplierRiskSignals } = useAuditReportContext();

  const topAnomalies = crossCorrelations
    .filter(c => !c.humanVisible)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  const criticalSignals = supplierRiskSignals.filter(s => s.status === 'critical');

  return (
    <section className="py-12 border-b border-border">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-3.5 h-3.5 text-primary" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">AI Anomaly Detection</span>
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] font-mono text-muted-foreground">{topAnomalies.length} hidden patterns found</span>
      </div>

      <div className="space-y-3">
        {topAnomalies.map(anomaly => {
          const color = severityColor[anomaly.severity];
          return (
            <div key={anomaly.id} className="border border-border bg-white p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <AlertTriangle className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider" style={{ background: `${color}15`, color }}>{anomaly.severity}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-muted text-muted-foreground">{anomaly.confidence}% conf.</span>
                    <span className="text-[9px] text-grey-mid">· Not visible to human auditor</span>
                  </div>
                  <p className="text-[14px] font-semibold text-foreground">{anomaly.title}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mt-1">{anomaly.description}</p>
                  {anomaly.connectedFindings.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                      {anomaly.connectedFindings.map(f => (
                        <span key={f} className="text-[9px] font-mono px-1.5 py-0.5 bg-destructive/10 text-destructive">{f}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {criticalSignals.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {criticalSignals.map(signal => (
            <div key={signal.signal} className="border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-3 h-3 text-destructive" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-destructive">Critical</span>
              </div>
              <p className="text-[13px] font-medium text-foreground">{signal.signal}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[18px] font-mono font-bold text-destructive">{signal.value}</span>
                <span className="text-[11px] text-muted-foreground">threshold: {signal.threshold}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
