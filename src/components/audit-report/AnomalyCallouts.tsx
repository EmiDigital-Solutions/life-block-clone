import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Zap, AlertTriangle, TrendingDown } from "lucide-react";

const severityColor: Record<string, string> = {
  critical: '#AD3D3D',
  high: '#E39B5C',
  medium: '#D4A843',
  low: '#6EA996',
};

export default function AnomalyCallouts() {
  const { crossCorrelations, supplierRiskSignals } = useAuditReportContext();

  const topAnomalies = crossCorrelations
    .filter(c => !c.humanVisible)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  const criticalSignals = supplierRiskSignals.filter(s => s.status === 'critical');

  return (
    <section className="py-12 border-b border-[#E5E7EB]">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-3.5 h-3.5 text-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">AI Anomaly Detection</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-[10px] font-mono text-[#7B8E80]">{topAnomalies.length} hidden patterns found</span>
      </div>

      <div className="space-y-3">
        {topAnomalies.map(anomaly => {
          const color = severityColor[anomaly.severity];
          return (
            <div key={anomaly.id} className="border border-[#E5E7EB] bg-white p-5 hover:border-[#0A7FA5]/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <AlertTriangle className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider" style={{ background: `${color}15`, color }}>{anomaly.severity}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#F5F5F5] text-[#7B8E80]">{anomaly.confidence}% conf.</span>
                    <span className="text-[9px] text-[#C0C0C0]">· Not visible to human auditor</span>
                  </div>
                  <p className="text-[14px] font-semibold text-[#0A0A0A]">{anomaly.title}</p>
                  <p className="text-[12px] text-[#7B8E80] leading-relaxed mt-1">{anomaly.description}</p>
                  {anomaly.connectedFindings.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                      {anomaly.connectedFindings.map(f => (
                        <span key={f} className="text-[9px] font-mono px-1.5 py-0.5 bg-[#AD3D3D]/10 text-[#AD3D3D]">{f}</span>
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
            <div key={signal.signal} className="border border-[#AD3D3D]/20 bg-[#AD3D3D]/5 p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-3 h-3 text-[#AD3D3D]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#AD3D3D]">Critical</span>
              </div>
              <p className="text-[13px] font-medium text-[#0A0A0A]">{signal.signal}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[18px] font-mono font-bold text-[#AD3D3D]">{signal.value}</span>
                <span className="text-[11px] text-[#7B8E80]">threshold: {signal.threshold}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
