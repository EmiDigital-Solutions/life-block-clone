import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Shield, AlertTriangle, ChevronDown, ArrowRight } from "lucide-react";

const verdictConfig: Record<VerdictType, { label: string; color: string; bg: string }> = {
  go: { label: 'APPROVED', color: 'hsl(155, 24%, 45%)', bg: 'hsl(155, 24%, 55%, 0.06)' },
  conditional: { label: 'CONDITIONAL', color: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 63%, 0.06)' },
  hold: { label: 'ON HOLD', color: 'hsl(0, 48%, 46%)', bg: 'hsl(0, 48%, 46%, 0.06)' },
  nogo: { label: 'REJECTED', color: 'hsl(0, 48%, 36%)', bg: 'hsl(0, 48%, 36%, 0.06)' },
};

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
  const { reportMeta, allNCRs, iatfProcessScores, iatfWeightedScore } = useAuditReportContext();
  const config = verdictConfig[verdict];
  const majorNCRs = allNCRs.filter(n => n.severity === 'major').length;
  const minorNCRs = allNCRs.filter(n => n.severity === 'minor').length;

  return (
    <section id="station-1" className="scroll-mt-20 pt-16 pb-12">
      {/* Standards & PO */}
      <div className="flex items-center gap-3 mb-10">
        {['ISO 9001:2015', 'IATF 16949', 'VDA 6.3'].map(badge => (
          <span key={badge} className="text-[11px] font-medium tracking-wide px-2.5 py-1" style={{ color: 'hsl(0,0%,50%)', border: '1px solid hsl(0,0%,85%)' }}>
            {badge}
          </span>
        ))}
        <span className="text-[12px] font-mono ml-auto" style={{ color: 'hsl(0,0%,55%)' }}>{po}</span>
      </div>

      {/* ── Hero verdict ──────────────────────────────── */}
      <div className="mb-10">
        <div className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: config.color }}>
          Verdict
        </div>
        <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-semibold tracking-[-0.03em] leading-[1] text-foreground mb-4">
          {verdictLabel}
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[18px] font-medium text-foreground">{supplier}</span>
          <span className="text-[16px]" style={{ color: 'hsl(0,0%,70%)' }}>→</span>
          <span className="text-[16px]" style={{ color: 'hsl(0,0%,50%)' }}>{reportMeta.client}</span>
        </div>
        <p className="text-[16px] leading-[1.7] max-w-2xl" style={{ color: 'hsl(0,0%,40%)' }}>
          {heroReason}
        </p>
      </div>

      {/* ── Key metrics row ───────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px mb-10" style={{ background: 'hsl(0,0%,88%)' }}>
        {[
          { label: 'IATF Score', value: `${Math.round(iatfWeightedScore)}%`, color: config.color },
          { label: 'Major NCRs', value: String(majorNCRs), color: majorNCRs > 0 ? 'hsl(0, 48%, 46%)' : 'hsl(155, 24%, 45%)' },
          { label: 'Minor NCRs', value: String(minorNCRs), color: 'hsl(24, 72%, 53%)' },
          { label: 'Cost at risk', value: `€${(reportMeta.totalCostExposure / 1000).toFixed(0)}K`, color: 'hsl(0, 48%, 46%)' },
          { label: 'After mitigation', value: `€${(reportMeta.mitigatedCostExposure / 1000).toFixed(0)}K`, color: 'hsl(155, 24%, 45%)' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-5">
            <div className="text-[11px] font-medium tracking-wide uppercase mb-2" style={{ color: 'hsl(0,0%,55%)' }}>{m.label}</div>
            <div className="text-[28px] md:text-[32px] font-semibold tabular-nums leading-none" style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* ── Executive summary ─────────────────────────── */}
      <div className="bg-white p-8 md:p-10 mb-10" style={{ border: '1px solid hsl(0,0%,90%)' }}>
        <h3 className="text-[13px] font-semibold tracking-[0.15em] uppercase mb-6" style={{ color: 'hsl(0,0%,45%)' }}>Executive Summary</h3>
        <div className="space-y-5">
          {[
            { dot: 'hsl(0, 48%, 46%)', label: 'Critical', text: 'Bore ID Cpk dropped to 0.98 (BMW min: 1.33). CNC calibration overdue on 2 machines — root cause traced to single-person dependency in calibration scheduling.' },
            { dot: 'hsl(24, 72%, 53%)', label: 'Warning', text: 'DPPM at 410 vs. BMW target of 50. Accelerating trend since Oct 2025. If uncorrected, Atlas AI projects supplier downgrade within 2 audit cycles.' },
            { dot: 'hsl(155, 24%, 45%)', label: 'Strength', text: 'Workforce competency above benchmark. Production capacity meets demand. CEO engagement confirmed during audit.' },
            { dot: 'hsl(195, 89%, 34%)', label: 'Action required', text: `${majorNCRs} major NCRs must be resolved with assigned owners and due dates before PO release. Total cost exposure: €${(reportMeta.totalCostExposure / 1000).toFixed(0)}K if no action.` },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: item.dot }} />
              <div>
                <span className="text-[14px] font-semibold text-foreground">{item.label}: </span>
                <span className="text-[14px] leading-[1.7]" style={{ color: 'hsl(0,0%,35%)' }}>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IATF process scores ───────────────────────── */}
      <div className="bg-white p-8 md:p-10 mb-10" style={{ border: '1px solid hsl(0,0%,90%)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[13px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,45%)' }}>IATF 16949 Process Scores</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-[36px] font-semibold tabular-nums leading-none" style={{ color: config.color }}>{Math.round(iatfWeightedScore)}</span>
            <span className="text-[16px]" style={{ color: 'hsl(0,0%,55%)' }}>/ 100</span>
          </div>
        </div>
        <div className="space-y-3">
          {iatfProcessScores.map(p => {
            const color = p.score >= 80 ? 'hsl(155, 24%, 45%)' : p.score >= 60 ? 'hsl(24, 72%, 53%)' : 'hsl(0, 48%, 46%)';
            return (
              <div key={p.process} className="flex items-center gap-4">
                <span className="text-[13px] w-24 shrink-0 font-medium" style={{ color: 'hsl(0,0%,40%)' }}>{p.process.split(' — ')[0]}</span>
                <div className="flex-1 h-2 overflow-hidden" style={{ background: 'hsl(0,0%,93%)' }}>
                  <div className="h-full transition-all duration-700 ease-out" style={{ width: `${p.score}%`, background: color }} />
                </div>
                <span className="text-[14px] font-semibold tabular-nums w-10 text-right" style={{ color }}>{p.score}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-8 mt-6 pt-5" style={{ borderTop: '1px solid hsl(0,0%,92%)' }}>
          <div className="text-[13px]"><span style={{ color: 'hsl(0,0%,55%)' }}>Previous audit: </span><span className="font-semibold tabular-nums">{reportMeta.previousScore}%</span></div>
          <div className="text-[13px]"><span style={{ color: 'hsl(0,0%,55%)' }}>BMW threshold: </span><span className="font-semibold text-destructive tabular-nums">70%</span></div>
        </div>
      </div>

      {/* ── CTAs ──────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-10">
        <button onClick={onDecide} className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">
          Review & decide <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={onWalk} className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold transition-colors cursor-pointer" style={{ background: 'hsl(0,0%,93%)', color: 'hsl(0,0%,30%)' }}>
          Walk the factory <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* ── Metadata ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8" style={{ borderTop: '1px solid hsl(0,0%,88%)' }}>
        {[
          { label: 'Lead Auditor', value: 'I. Petrović', sub: 'IRCA Cert. #A21849' },
          { label: 'Audit Date', value: date, sub: reportMeta.auditType.split(' — ')[0] },
          { label: 'Location', value: location.split(' — ')[0], sub: location.split(' — ')[1] || '' },
          { label: 'Cert. Body', value: reportMeta.certBody.split(' ').slice(0, 2).join(' '), sub: `Expires ${reportMeta.certExpiry}` },
        ].map((item, i) => (
          <div key={i}>
            <div className="text-[11px] font-medium tracking-wide uppercase mb-1.5" style={{ color: 'hsl(0,0%,55%)' }}>{item.label}</div>
            <div className="text-[14px] font-medium text-foreground">{item.value}</div>
            {item.sub && <div className="text-[12px] mt-0.5" style={{ color: 'hsl(0,0%,55%)' }}>{item.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}