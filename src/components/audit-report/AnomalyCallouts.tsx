import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Zap, TrendingDown } from "lucide-react";

const severityColor: Record<string, string> = {
  critical: 'hsl(0, 48%, 46%)',
  high: 'hsl(24, 72%, 63%)',
  medium: 'hsl(24, 72%, 63%)',
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
    <section className="py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-warning" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">AI Anomaly Detection</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {topAnomalies.length} hidden patterns found by Atlas AI
      </h2>
      <p className="text-[15px] max-w-2xl leading-relaxed text-muted-foreground">
        Cross-correlation analysis identified patterns not visible during manual inspection.
      </p>

      <div className="space-y-4">
        {topAnomalies.map((anomaly) => {
          const color = severityColor[anomaly.severity];
          return (
            <div key={anomaly.id} className="flex gap-6 p-6 bg-card border border-border">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: `${color}10` }}>
                  <Zap className="w-5 h-5" style={{ color }} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color }}>{anomaly.severity}</span>
                <span className="text-[11px] font-mono font-bold text-muted-foreground">{anomaly.confidence}%</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-bold text-foreground mb-1">{anomaly.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{anomaly.description}</p>
                {anomaly.connectedFindings.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] text-muted-foreground">Linked findings:</span>
                    {anomaly.connectedFindings.map(f => (
                      <span key={f} className="text-[11px] font-mono px-2 py-0.5 bg-destructive/5 text-destructive">{f}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {criticalSignals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {criticalSignals.map(signal => (
            <div key={signal.signal} className="p-5 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">Critical Signal</span>
              </div>
              <p className="text-[14px] font-medium text-foreground">{signal.signal}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[24px] font-mono font-bold text-destructive">{signal.value}</span>
                <span className="text-[12px] text-muted-foreground">threshold: {signal.threshold}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}