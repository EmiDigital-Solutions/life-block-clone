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
  go: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-600', label: 'APPROVED', icon: CheckCircle2 },
  conditional: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-600', label: 'CONDITIONAL', icon: AlertTriangle },
  hold: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-600', label: 'ON HOLD', icon: AlertTriangle },
  nogo: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-600', label: 'REJECTED', icon: X },
};

export default function TrafficLightDashboard({ open, onClose }: TrafficLightDashboardProps) {
  const { reportMeta, allNCRs, stations, kpis, iatfWeightedScore } = useAuditReportContext();
  const [speaking, setSpeaking] = useState(false);

  if (!open) return null;

  const v = verdictConfig[reportMeta.verdict] || verdictConfig.conditional;
  const VerdictIcon = v.icon;
  const majorNCRs = allNCRs.filter(n => n.severity === 'major');
  const openNCRs = allNCRs.filter(n => n.status === 'open');

  // Top 3 risks from worst stations
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

  // Conditions for approval
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-[14px] font-bold uppercase tracking-wider text-primary">Quick Decision Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={speakSummary}
              disabled={speaking}
              className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
              title="Voice briefing"
            >
              {speaking ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Volume2 className="w-4 h-4 text-muted-foreground" />}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Verdict Hero */}
        <div className={`mx-6 mt-4 p-6 rounded-lg border ${v.bg} ${v.border}`}>
          <div className="flex items-center gap-4">
            <VerdictIcon className={`w-12 h-12 ${v.text}`} />
            <div>
              <div className={`text-[28px] font-black tracking-tight ${v.text}`}>{v.label}</div>
              <div className="text-[14px] text-muted-foreground">{reportMeta.supplier} · {reportMeta.po}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[24px] font-bold text-foreground">{typeof costExposure === 'number' ? `€${(costExposure / 1000).toFixed(0)}k` : costExposure}</div>
              <div className="text-[12px] text-muted-foreground uppercase tracking-wider">Cost Exposure</div>
            </div>
          </div>
          <div className="flex gap-6 mt-4 pt-4 border-t border-border/30">
            <div className="text-center">
              <div className="text-[20px] font-bold text-foreground">{allNCRs.length}</div>
              <div className="text-[11px] text-muted-foreground uppercase">Total NCRs</div>
            </div>
            <div className="text-center">
              <div className="text-[20px] font-bold text-destructive">{majorNCRs.length}</div>
              <div className="text-[11px] text-muted-foreground uppercase">Major</div>
            </div>
            <div className="text-center">
              <div className="text-[20px] font-bold text-foreground">{Math.round(iatfWeightedScore)}%</div>
              <div className="text-[11px] text-muted-foreground uppercase">VDA Score</div>
            </div>
            <div className="text-center">
              <div className="text-[20px] font-bold text-foreground">{openNCRs.length}</div>
              <div className="text-[11px] text-muted-foreground uppercase">Open</div>
            </div>
          </div>
        </div>

        {/* Top 3 Risks */}
        <div className="mx-6 mt-4">
          <div className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
            <TrendingDown className="w-3.5 h-3.5" /> Top 3 Risks
          </div>
          <div className="space-y-2">
            {topRisks.map((risk, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded border border-border/30">
                <div className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${
                  risk.health === 'red' ? 'bg-red-500' : risk.health === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-foreground">{risk.station}</div>
                  <div className="text-[13px] text-muted-foreground line-clamp-2">{risk.observation}</div>
                  {risk.ncrCount > 0 && (
                    <span className="text-[11px] font-medium text-destructive">{risk.ncrCount} NCR{risk.ncrCount > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Conditions */}
        <div className="mx-6 mt-4">
          <div className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" /> Required Conditions ({conditions.length})
          </div>
          {conditions.length > 0 ? (
            <div className="space-y-1.5">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-amber-500/5 border border-amber-500/20 rounded">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-[13px] text-foreground">{c}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded text-[13px] text-emerald-600">
              No blocking conditions — ready for approval
            </div>
          )}
        </div>

        {/* Sign-off */}
        <div className="mx-6 my-6 flex gap-3">
          <button
            className="flex-1 py-3 text-[13px] font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors cursor-pointer disabled:opacity-40"
            disabled={majorNCRs.filter(n => n.status === 'open').length > 0}
          >
            Approve with Conditions
          </button>
          <button className="px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-destructive bg-destructive/10 hover:bg-destructive/20 rounded transition-colors cursor-pointer">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
