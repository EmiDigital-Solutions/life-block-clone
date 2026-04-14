/**
 * Traffic-light Decision Dashboard
 * Single-screen: Verdict → Top 3 Risks → Required Conditions → Sign-off
 */
import { useState } from "react";
import { X, Shield, AlertTriangle, CheckCircle2, Clock, TrendingDown, Volume2, Loader2 } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";

interface TrafficLightDashboardProps {
  open: boolean;
  onClose: () => void;
}

const verdictConfig: Record<string, { bg: string; border: string; text: string; label: string; icon: typeof Shield }> = {
  go: { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent', label: 'APPROVED', icon: CheckCircle2 },
  conditional: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', label: 'CONDITIONAL', icon: AlertTriangle },
  hold: { bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', label: 'ON HOLD', icon: AlertTriangle },
  nogo: { bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', label: 'REJECTED', icon: X },
};

export default function TrafficLightDashboard({ open, onClose }: TrafficLightDashboardProps) {
  const { reportMeta, allNCRs, stations, kpis, iatfWeightedScore } = useAuditReportContext();
  const [speaking, setSpeaking] = useState(false);

  if (!open) return null;

  const v = verdictConfig[reportMeta.verdict] || verdictConfig.conditional;
  const VerdictIcon = v.icon;
  const majorNCRs = allNCRs.filter(n => n.severity === 'major');
  const openNCRs = allNCRs.filter(n => n.status === 'open');

  const topRisks = stations
    .filter(s => s.index >= 2 && s.index <= 9)
    .sort((a, b) => {
      const order = { red: 0, amber: 1, green: 2, grey: 3 };
      return (order[a.health] ?? 3) - (order[b.health] ?? 3);
    })
    .slice(0, 3)
    .map(s => ({
      station: s.name,
      health: s.health,
      ncrCount: s.ncrs.length,
      observation: s.observation,
    }));

  const conditions = [
    ...majorNCRs.map(n => `Close Major NCR ${n.id}: ${n.title}`),
    ...(iatfWeightedScore < 70 ? [`Raise VDA 6.3 score from ${Math.round(iatfWeightedScore)}% to ≥70%`] : []),
    ...(openNCRs.length > 3 ? [`Resolve ${openNCRs.length} open NCRs before next shipment`] : []),
  ];

  const costKPI = kpis.find(k => k.label.toLowerCase().includes('cost'));
  const costExposure = reportMeta.totalCostExposure || costKPI?.value || '€0';

  const speakSummary = () => {
    const text = `Audit verdict: ${v.label}. Supplier: ${reportMeta.supplier}. Cost exposure: ${typeof costExposure === 'number' ? `${costExposure} euros` : costExposure}. ${majorNCRs.length} major NCRs. Top risk: ${topRisks[0]?.station || 'none'}. ${conditions.length} conditions required for approval.`;
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[960px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Quick Decision Dashboard</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">One-screen verdict for procurement sign-off</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={speakSummary}
              disabled={speaking}
              className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer"
              title="Voice briefing"
            >
              {speaking ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Volume2 className="w-5 h-5 text-muted-foreground" />}
            </button>
            <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Verdict Hero */}
          <div className={`p-8 rounded-xl border-2 ${v.bg} ${v.border}`}>
            <div className="flex items-center gap-6">
              <VerdictIcon className={`w-16 h-16 ${v.text}`} />
              <div className="flex-1">
                <div className={`text-[36px] font-black tracking-tight ${v.text}`}>{v.label}</div>
                <div className="text-[16px] text-muted-foreground mt-1">{reportMeta.supplier} · {reportMeta.po}</div>
              </div>
              <div className="text-right">
                <div className="text-[32px] font-bold text-foreground">{typeof costExposure === 'number' ? `€${(costExposure / 1000).toFixed(0)}k` : costExposure}</div>
                <div className="text-[13px] text-muted-foreground uppercase tracking-wider mt-1">Cost Exposure</div>
              </div>
            </div>

            {/* Key metrics row */}
            <div className="grid grid-cols-4 gap-6 mt-8 pt-6 border-t border-foreground/10">
              {[
                { value: allNCRs.length, label: 'Total NCRs', color: 'text-foreground' },
                { value: majorNCRs.length, label: 'Major NCRs', color: 'text-destructive' },
                { value: `${Math.round(iatfWeightedScore)}%`, label: 'VDA Score', color: 'text-foreground' },
                { value: openNCRs.length, label: 'Open NCRs', color: 'text-foreground' },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <div className={`text-[28px] font-bold ${m.color}`}>{m.value}</div>
                  <div className="text-[12px] text-muted-foreground uppercase tracking-wider mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-column layout: Risks + Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top 3 Risks */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <h3 className="text-[16px] font-bold text-foreground">Top 3 Risks</h3>
              </div>
              <div className="space-y-3">
                {topRisks.map((risk, i) => (
                  <div key={i} className="p-4 bg-muted/30 rounded-lg border border-border/40">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${
                        risk.health === 'red' ? 'bg-destructive' : risk.health === 'amber' ? 'bg-warning' : 'bg-accent'
                      }`} />
                      <span className="text-[15px] font-semibold text-foreground">{risk.station}</span>
                      {risk.ncrCount > 0 && (
                        <span className="text-[12px] font-semibold text-destructive ml-auto">{risk.ncrCount} NCR{risk.ncrCount > 1 ? 's' : ''}</span>
                      )}
                    </div>
                    <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-2 pl-6">{risk.observation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Conditions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-warning" />
                <h3 className="text-[16px] font-bold text-foreground">Required Conditions</h3>
                <span className="text-[13px] text-muted-foreground">({conditions.length})</span>
              </div>
              {conditions.length > 0 ? (
                <div className="space-y-3">
                  {conditions.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                      <span className="text-[14px] text-foreground leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg text-[14px] text-accent">
                  No blocking conditions — ready for approval
                </div>
              )}
            </div>
          </div>

          {/* Sign-off buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <button
              className="flex-1 py-4 text-[14px] font-bold uppercase tracking-wider text-primary-foreground bg-accent hover:bg-accent/90 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
              disabled={majorNCRs.filter(n => n.status === 'open').length > 0}
            >
              Approve with Conditions
            </button>
            <button className="px-8 py-4 text-[14px] font-bold uppercase tracking-wider text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-colors cursor-pointer">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
