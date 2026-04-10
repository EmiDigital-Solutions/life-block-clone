import { cn } from "@/lib/utils";
import type { Station, NCR, KPITile } from "@/data/auditReportData";
import { iatfProcessScores, iatfWeightedScore } from "@/data/auditReportData";
import { Shield, AlertTriangle, TrendingDown, TrendingUp, Minus, ArrowRight, CheckCircle2, Clock, DollarSign, Activity, BarChart3, Target } from "lucide-react";

const healthColor: Record<string, string> = {
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
  grey: '#94A3B8',
};

const healthBg: Record<string, string> = {
  green: 'bg-emerald-50',
  amber: 'bg-amber-50',
  red: 'bg-red-50',
  grey: 'bg-slate-50',
};

const verdictConfig: Record<string, { label: string; color: string; bg: string }> = {
  go: { label: 'APPROVED', color: '#16A34A', bg: 'bg-emerald-50' },
  conditional: { label: 'CONDITIONAL', color: '#D97706', bg: 'bg-amber-50' },
  hold: { label: 'ON HOLD', color: '#DC2626', bg: 'bg-red-50' },
  nogo: { label: 'REJECTED', color: '#991B1B', bg: 'bg-red-100' },
};

interface ExecutiveReportViewProps {
  reportMeta: {
    verdict: string;
    verdictLabel: string;
    heroReason: string;
    supplier: string;
    po: string;
    auditor: string;
    date: string;
    location: string;
    client: string;
    standard: string;
    auditType: string;
    certBody: string;
    certExpiry: string;
    previousScore: number;
    totalCostExposure: number;
    mitigatedCostExposure: number;
    iatfScore: number;
  };
  stations: Station[];
  kpis: KPITile[];
  allNCRs: NCR[];
  onDecide: () => void;
}

function MetricCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub?: string; icon: any; color: string }) {
  return (
    <div className="border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${color}12` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#94A3B8]">{label}</span>
      </div>
      <div className="text-[28px] font-bold text-[#0F172A] leading-none tabular-nums">{value}</div>
      {sub && <div className="text-[11px] text-[#94A3B8] mt-1">{sub}</div>}
    </div>
  );
}

export default function ExecutiveReportView({ reportMeta, stations, kpis, allNCRs, onDecide }: ExecutiveReportViewProps) {
  const config = verdictConfig[reportMeta.verdict] || verdictConfig.conditional;
  const majorNCRs = allNCRs.filter(n => n.severity === 'major');
  const minorNCRs = allNCRs.filter(n => n.severity === 'minor');
  const openNCRs = allNCRs.filter(n => n.status === 'open');
  const displayStations = stations.filter(s => s.index >= 2 && s.index <= 9);
  const redStations = displayStations.filter(s => s.health === 'red');
  const amberStations = displayStations.filter(s => s.health === 'amber');
  const greenStations = displayStations.filter(s => s.health === 'green');

  const costSaved = reportMeta.totalCostExposure - reportMeta.mitigatedCostExposure;
  const mitigationPct = reportMeta.totalCostExposure > 0 ? Math.round((costSaved / reportMeta.totalCostExposure) * 100) : 0;

  return (
    <div className="max-w-[880px] mx-auto px-4 md:px-8 py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 rounded-full" style={{ background: config.color }} />
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#94A3B8]">Executive Summary</span>
          <span className="text-[10px] text-[#CBD5E1]">·</span>
          <span className="text-[10px] font-mono text-[#94A3B8]">{reportMeta.po}</span>
          <span className="text-[10px] text-[#CBD5E1]">·</span>
          <span className="text-[10px] text-[#94A3B8]">{reportMeta.date}</span>
        </div>
        <h1 className="text-[36px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0F172A] mb-1">
          {reportMeta.supplier}
        </h1>
        <p className="text-[15px] text-[#64748B]">{reportMeta.location} · {reportMeta.client} · {reportMeta.standard}</p>
      </div>

      {/* Verdict banner */}
      <div className="border border-[#E2E8F0] p-6" style={{ background: `linear-gradient(135deg, ${config.color}08, white 60%)` }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center" style={{ background: `${config.color}15` }}>
              {reportMeta.verdict === 'go' ? <Shield className="w-7 h-7" style={{ color: config.color }} /> :
               <AlertTriangle className="w-7 h-7" style={{ color: config.color }} />}
            </div>
            <div>
              <div className="text-[32px] font-bold leading-none" style={{ color: config.color }}>{reportMeta.verdictLabel}</div>
              <p className="text-[13px] text-[#64748B] mt-1 max-w-md">{reportMeta.heroReason}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-[28px] font-bold tabular-nums" style={{ color: config.color }}>{Math.round(iatfWeightedScore)}%</div>
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">IATF Score</div>
            </div>
            <div className="w-px h-10 bg-[#E2E8F0]" />
            <div className="text-center">
              <div className="text-[28px] font-bold tabular-nums text-[#0F172A]">{reportMeta.previousScore}%</div>
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Previous</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Major NCRs" value={String(majorNCRs.length)} sub={`${openNCRs.length} open`} icon={AlertTriangle} color="#DC2626" />
        <MetricCard label="Minor NCRs" value={String(minorNCRs.length)} icon={Clock} color="#D97706" />
        <MetricCard label="Cost at Risk" value={`€${(reportMeta.totalCostExposure / 1000).toFixed(0)}K`} sub={`${mitigationPct}% mitigable`} icon={DollarSign} color="#DC2626" />
        <MetricCard label="After Mitigation" value={`€${(reportMeta.mitigatedCostExposure / 1000).toFixed(0)}K`} icon={Target} color="#16A34A" />
      </div>

      {/* Station overview — compact heatmap table */}
      <div className="border border-[#E2E8F0] bg-white">
        <div className="px-5 py-3 border-b border-[#F1F5F9] flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B]">Process Audit Stations</span>
          <div className="flex items-center gap-3 text-[10px] text-[#94A3B8]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />{greenStations.length} Pass</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />{amberStations.length} Risk</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />{redStations.length} Fail</span>
          </div>
        </div>
        <div className="divide-y divide-[#F8FAFC]">
          {displayStations.map(station => {
            const stationNCRs = allNCRs.filter(n => n.stationIndex === station.index);
            const majors = stationNCRs.filter(n => n.severity === 'major').length;
            const minors = stationNCRs.filter(n => n.severity === 'minor').length;
            return (
              <div key={station.index} className="flex items-center px-5 py-3 gap-4 hover:bg-[#FAFBFC] transition-colors">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: healthColor[station.health] }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#1E293B] truncate">
                    P{station.index} — {station.name}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {majors > 0 && (
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5">{majors} major</span>
                  )}
                  {minors > 0 && (
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5">{minors} minor</span>
                  )}
                  {majors === 0 && minors === 0 && (
                    <span className="text-[11px] font-medium text-emerald-600">Clear</span>
                  )}
                  <div className="w-[60px] h-[4px] bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${station.confidence}%`,
                        background: healthColor[station.health],
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical findings only */}
      {majorNCRs.length > 0 && (
        <div className="border border-red-200 bg-red-50/30">
          <div className="px-5 py-3 border-b border-red-100">
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-red-700">Critical Findings Requiring Action</span>
          </div>
          <div className="divide-y divide-red-100">
            {majorNCRs.map(ncr => (
              <div key={ncr.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5">{ncr.id}</span>
                      {ncr.isoClause && <span className="text-[10px] text-[#94A3B8]">§{ncr.isoClause}</span>}
                    </div>
                    <div className="text-[14px] font-semibold text-[#0F172A]">{ncr.title}</div>
                    <div className="text-[12px] text-[#64748B] mt-1">{ncr.rootCause}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-medium text-[#64748B]">{ncr.owner || 'Unassigned'}</div>
                    <div className="text-[10px] text-[#94A3B8]">{ncr.dueDate || 'No deadline'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IATF process scores — compact bar chart */}
      <div className="border border-[#E2E8F0] bg-white p-5">
        <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B] mb-4">IATF 16949 Process Scores</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
          {iatfProcessScores.map(p => {
            const color = p.score >= 80 ? '#16A34A' : p.score >= 60 ? '#D97706' : '#DC2626';
            return (
              <div key={p.process} className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-[#475569] w-[140px] truncate">{p.process}</span>
                <div className="flex-1 h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: color }} />
                </div>
                <span className="text-[12px] font-mono font-semibold text-[#1E293B] w-[28px] text-right tabular-nums">{p.score}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom-line recommendation */}
      <div className="border border-[#E2E8F0] bg-[#FAFBFC] p-6">
        <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B] mb-3">Recommendation</div>
        <p className="text-[15px] leading-relaxed text-[#334155]">
          {reportMeta.verdict === 'go'
            ? `${reportMeta.supplier} meets all requirements. PO release is recommended with standard monitoring.`
            : reportMeta.verdict === 'conditional'
            ? `${reportMeta.supplier} shows capability but has ${majorNCRs.length} major NCR${majorNCRs.length !== 1 ? 's' : ''} requiring resolution before PO release. Estimated cost exposure is €${(reportMeta.totalCostExposure / 1000).toFixed(0)}K if unaddressed. Recommend conditional approval with a 30-day CAPA deadline and follow-up verification audit.`
            : `${reportMeta.supplier} does not currently meet minimum requirements. ${majorNCRs.length} major NCR${majorNCRs.length !== 1 ? 's' : ''} identified with €${(reportMeta.totalCostExposure / 1000).toFixed(0)}K at risk. Recommend holding PO release until corrective actions are verified.`
          }
        </p>
      </div>

      {/* Sign-off CTA */}
      <div className="flex items-center gap-3">
        <button
          onClick={onDecide}
          className="px-7 py-3 text-[13px] font-semibold text-white shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}CC)` }}
        >
          Review & Sign Off →
        </button>
      </div>

      {/* Footer metadata */}
      <div className="border-t border-[#F1F5F9] pt-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Lead Auditor', value: reportMeta.auditor },
            { label: 'Audit Type', value: reportMeta.auditType?.split(' — ')[0] || 'Process Audit' },
            { label: 'Cert. Body', value: reportMeta.certBody?.split(' ').slice(0, 2).join(' ') || '—' },
            { label: 'Cert. Expiry', value: reportMeta.certExpiry || '—' },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-0.5">{item.label}</div>
              <div className="text-[13px] font-medium text-[#1E293B]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
