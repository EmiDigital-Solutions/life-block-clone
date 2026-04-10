import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/auditReportData";
import { iatfProcessScores, iatfWeightedScore, reportMeta, allNCRs, kpis } from "@/data/auditReportData";
import { Shield, AlertTriangle, Clock, TrendingDown, ChevronDown, FileCheck } from "lucide-react";

const verdictConfig: Record<VerdictType, { label: string; color: string; accent: string; bgGradient: string; iconBg: string; borderColor: string }> = {
  go: { label: 'APPROVED', color: '#22C55E', accent: '#16A34A', bgGradient: 'from-emerald-50/80 to-white', iconBg: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  conditional: { label: 'CONDITIONAL', color: '#D97706', accent: '#B45309', bgGradient: 'from-amber-50/60 to-white', iconBg: 'bg-amber-50', borderColor: 'border-amber-200' },
  hold: { label: 'ON HOLD', color: '#DC2626', accent: '#B91C1C', bgGradient: 'from-red-50/60 to-white', iconBg: 'bg-red-50', borderColor: 'border-red-200' },
  nogo: { label: 'REJECTED', color: '#991B1B', accent: '#7F1D1D', bgGradient: 'from-red-100/60 to-white', iconBg: 'bg-red-100', borderColor: 'border-red-300' },
};

function ProcessScoreBar({ label, fullName, score }: { label: string; fullName: string; score: number }) {
  const color = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';
  const bg = score >= 80 ? 'bg-emerald-50' : score >= 60 ? 'bg-amber-50' : 'bg-red-50';
  return (
    <div className="group flex items-center gap-3 py-1">
      <div className="flex items-center gap-2 w-[52px] shrink-0">
        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", bg)} style={{ color }}>{label}</span>
      </div>
      <div className="flex-1 h-[6px] bg-[#F1F5F9] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}CC, ${color})` }}
        />
      </div>
      <span className="text-[12px] font-mono font-semibold text-[#1E293B] w-[32px] text-right tabular-nums">{score}</span>
    </div>
  );
}

interface ReportHeroProps {
  verdict: VerdictType;
  verdictLabel: string;
  heroReason: string;
  supplier: string;
  po: string;
  auditor: string;
  date: string;
  location: string;
  onDecide: () => void;
  onWalk: () => void;
}

export default function ReportHero({ verdict, verdictLabel, heroReason, supplier, po, auditor, date, location, onDecide, onWalk }: ReportHeroProps) {
  const config = verdictConfig[verdict];
  const majorNCRs = allNCRs.filter(n => n.severity === 'major').length;
  const minorNCRs = allNCRs.filter(n => n.severity === 'minor').length;
  const openNCRs = allNCRs.filter(n => n.status === 'open').length;

  return (
    <section id="station-1" className="min-h-[100dvh] flex flex-col justify-center relative scroll-mt-20 py-12">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-[880px] mx-auto w-full">
        {/* Top bar — document identifier */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full" style={{ background: config.color }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#64748B]">Audit Report</span>
            <span className="text-[11px] text-[#CBD5E1]">·</span>
            <span className="text-[11px] font-mono text-[#94A3B8]">{po}</span>
          </div>
          <div className="flex items-center gap-2">
            {['ISO 9001', 'IATF 16949', 'VDA 6.3'].map(badge => (
              <span key={badge} className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Verdict block */}
        <div className={cn("rounded-2xl border p-8 md:p-10 mb-6", config.borderColor)} style={{
          background: `linear-gradient(135deg, ${config.color}08, white 60%)`,
        }}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left — verdict + supplier */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.iconBg)}>
                  {verdict === 'go' ? <Shield className="w-5 h-5" style={{ color: config.color }} /> :
                   verdict === 'conditional' ? <AlertTriangle className="w-5 h-5" style={{ color: config.color }} /> :
                   <AlertTriangle className="w-5 h-5" style={{ color: config.color }} />}
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: config.color }}>
                    Verdict
                  </div>
                </div>
              </div>

              <h1 className="text-[42px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0F172A]">
                {verdictLabel}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-[16px] font-semibold text-[#1E293B]">{supplier}</span>
                <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                <span className="text-[14px] text-[#64748B]">{reportMeta.client}</span>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-[#475569] max-w-lg">
                {heroReason}
              </p>

              {/* Quick stats row */}
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#0F172A] leading-none">{majorNCRs}</div>
                    <div className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wide">Major</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#0F172A] leading-none">{minorNCRs}</div>
                    <div className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wide">Minor</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center">
                    <TrendingDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#0F172A] leading-none">{reportMeta.previousScore} → 72</div>
                    <div className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wide">Score trend</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — IATF score panel */}
            <div className="w-full md:w-[300px] shrink-0">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#64748B]">IATF 16949</div>
                    <div className="text-[10px] text-[#94A3B8]">Weighted Process Score</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold leading-none tabular-nums" style={{ color: config.color }}>
                      {Math.round(iatfWeightedScore)}
                      <span className="text-[16px] font-medium text-[#94A3B8]">%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {iatfProcessScores.map(p => (
                    <ProcessScoreBar
                      key={p.process}
                      label={p.process.split(' — ')[0]}
                      fullName={p.process}
                      score={p.score}
                    />
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#94A3B8]">Previous audit</span>
                    <span className="font-mono font-semibold text-[#64748B]">{reportMeta.previousScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                    <span className="text-[#94A3B8]">BMW threshold</span>
                    <span className="font-mono font-semibold text-red-500">70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost exposure banner */}
        <div className="rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#64748B]">Total Cost Exposure</div>
                <div className="text-[10px] text-[#94A3B8]">If no corrective action is taken</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-[22px] font-bold text-red-600 tabular-nums leading-none">€{(reportMeta.totalCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-[#94A3B8]">at risk</div>
              </div>
              <div className="w-px h-8 bg-[#E2E8F0]" />
              <div className="text-right">
                <div className="text-[22px] font-bold text-emerald-600 tabular-nums leading-none">€{(reportMeta.mitigatedCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-[#94A3B8]">after mitigation</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onDecide}
            className="px-7 py-3 rounded-xl text-[13px] font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, ${config.color}, ${config.accent})` }}
          >
            Review & decide →
          </button>
          <button
            onClick={onWalk}
            className="px-7 py-3 rounded-xl text-[13px] font-semibold text-[#475569] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200 active:scale-[0.98]"
          >
            Walk the factory
            <ChevronDown className="w-3.5 h-3.5 inline ml-1.5 -mt-0.5" />
          </button>
          <button
            className="px-7 py-3 rounded-xl text-[13px] font-semibold text-[#475569] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200 active:scale-[0.98]"
          >
            <FileCheck className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Export PDF
          </button>
        </div>

        {/* Audit metadata footer */}
        <div className="border-t border-[#F1F5F9] pt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Lead Auditor', value: 'I. Petrović', sub: 'IRCA Cert. #A21849' },
              { label: 'Date', value: date, sub: reportMeta.auditType.split(' — ')[0] },
              { label: 'Location', value: location.split(' — ')[0], sub: location.split(' — ')[1] || '' },
              { label: 'Cert. Body', value: reportMeta.certBody.split(' ')[0] + ' ' + reportMeta.certBody.split(' ')[1], sub: `Expires ${reportMeta.certExpiry}` },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-1">{item.label}</div>
                <div className="text-[13px] font-medium text-[#1E293B]">{item.value}</div>
                {item.sub && <div className="text-[11px] text-[#94A3B8]">{item.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
