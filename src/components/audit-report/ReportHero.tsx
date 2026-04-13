import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Shield, AlertTriangle, Clock, TrendingDown, ChevronDown, FileCheck } from "lucide-react";

const verdictConfig: Record<VerdictType, { label: string; color: string; accent: string; bg: string }> = {
  go: { label: 'APPROVED', color: 'hsl(155, 24%, 55%)', accent: 'hsl(155, 24%, 45%)', bg: 'hsl(155, 24%, 55%, 0.08)' },
  conditional: { label: 'CONDITIONAL', color: 'hsl(24, 72%, 63%)', accent: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 63%, 0.08)' },
  hold: { label: 'ON HOLD', color: 'hsl(0, 48%, 46%)', accent: 'hsl(0, 48%, 36%)', bg: 'hsl(0, 48%, 46%, 0.08)' },
  nogo: { label: 'REJECTED', color: 'hsl(0, 48%, 36%)', accent: 'hsl(0, 48%, 30%)', bg: 'hsl(0, 48%, 36%, 0.08)' },
};

function ProcessScoreBar({ label, fullName, score }: { label: string; fullName: string; score: number }) {
  const color = score >= 80 ? 'hsl(155, 24%, 55%)' : score >= 60 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  return (
    <div className="group flex items-center gap-3 py-1">
      <div className="flex items-center gap-2 w-[52px] shrink-0">
        <span className="text-[10px] font-bold px-1.5 py-0.5" style={{ background: `${color}15`, color }}>{label}</span>
      </div>
      <div className="flex-1 h-[6px] overflow-hidden" style={{ background: 'hsl(0,0%,88%)' }}>
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}CC, ${color})` }}
        />
      </div>
      <span className="text-[12px] font-mono font-semibold text-foreground w-[32px] text-right tabular-nums">{score}</span>
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
  const { reportMeta, allNCRs, iatfProcessScores, iatfWeightedScore } = useAuditReportContext();
  const config = verdictConfig[verdict];
  const majorNCRs = allNCRs.filter(n => n.severity === 'major').length;
  const minorNCRs = allNCRs.filter(n => n.severity === 'minor').length;

  return (
    <section id="station-1" className="min-h-[100dvh] flex flex-col justify-center relative scroll-mt-20 py-12">
      <div className="relative z-10 max-w-[880px] mx-auto w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5" style={{ background: config.color }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Audit Report</span>
            <span className="text-[11px]" style={{ color: 'hsl(0,0%,72%)' }}>·</span>
            <span className="text-[11px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>{po}</span>
          </div>
          <div className="flex items-center gap-2">
            {['ISO 9001', 'IATF 16949', 'VDA 6.3'].map(badge => (
              <span key={badge} className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1" style={{ background: 'hsl(0,0%,88%)', color: 'hsl(0,0%,45%)', border: '1px solid hsl(0,0%,80%)' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Verdict block — glass card */}
        <div className="p-8 md:p-10 mb-6" style={{
          background: 'hsla(0,0%,100%,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid hsl(0,0%,80%)',
        }}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: config.bg }}>
                  {verdict === 'go' ? <Shield className="w-5 h-5" style={{ color: config.color }} /> :
                   <AlertTriangle className="w-5 h-5" style={{ color: config.color }} />}
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: config.color }}>
                    Verdict
                  </div>
                </div>
              </div>

              <h1 className="text-[42px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-foreground">
                {verdictLabel}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-[16px] font-semibold text-foreground">{supplier}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: 'hsl(0,0%,72%)' }} />
                <span className="text-[14px]" style={{ color: 'hsl(0,0%,50%)' }}>{reportMeta.client}</span>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed max-w-lg" style={{ color: 'hsl(0,0%,45%)' }}>
                {heroReason}
              </p>

              {/* Executive Summary */}
              <div className="mt-5 p-4" style={{ background: 'hsl(0,0%,92%)', border: '1px solid hsl(0,0%,85%)' }}>
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2" style={{ color: 'hsl(0,0%,50%)' }}>Executive Summary</div>
                <ul className="space-y-2 text-[13px] leading-relaxed" style={{ color: 'hsl(0,0%,30%)' }}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                    <span><strong className="text-foreground">Critical:</strong> Bore ID Cpk dropped to 0.98 (BMW min: 1.33). CNC calibration overdue on 2 machines — root cause traced to single-person dependency in calibration scheduling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                    <span><strong className="text-foreground">Warning:</strong> DPPM at 410 vs. BMW target of 50. Accelerating trend since Oct 2025. If uncorrected, Atlas AI projects supplier downgrade within 2 audit cycles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span><strong className="text-foreground">Strength:</strong> Workforce competency above benchmark. Production capacity meets demand. CEO engagement confirmed during audit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span><strong className="text-foreground">Action required:</strong> 2 major NCRs must be resolved with assigned owners and due dates before PO release. Total cost exposure: €937K if no action.</span>
                  </li>
                </ul>
              </div>

              {/* Quick stats row */}
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>
                    <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-foreground leading-none">{majorNCRs}</div>
                    <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'hsl(0,0%,50%)' }}>Major</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center" style={{ background: 'hsl(24, 72%, 63%, 0.1)' }}>
                    <Clock className="w-3.5 h-3.5 text-warning" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-foreground leading-none">{minorNCRs}</div>
                    <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'hsl(0,0%,50%)' }}>Minor</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center" style={{ background: 'hsl(0,0%,92%)' }}>
                    <TrendingDown className="w-3.5 h-3.5" style={{ color: 'hsl(0,0%,50%)' }} />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-foreground leading-none">{reportMeta.previousScore} → 72</div>
                    <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'hsl(0,0%,50%)' }}>Score trend</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — IATF score panel */}
            <div className="w-full md:w-[300px] shrink-0">
              <div className="p-5" style={{ background: 'hsla(0,0%,100%,0.5)', border: '1px solid hsl(0,0%,80%)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>IATF 16949</div>
                    <div className="text-[10px]" style={{ color: 'hsl(0,0%,55%)' }}>Weighted Process Score</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold leading-none tabular-nums" style={{ color: config.color }}>
                      {Math.round(iatfWeightedScore)}
                      <span className="text-[16px] font-medium" style={{ color: 'hsl(0,0%,55%)' }}>%</span>
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
                <div className="mt-3 pt-3" style={{ borderTop: '1px solid hsl(0,0%,85%)' }}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span style={{ color: 'hsl(0,0%,55%)' }}>Previous audit</span>
                    <span className="font-mono font-semibold" style={{ color: 'hsl(0,0%,45%)' }}>{reportMeta.previousScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                    <span style={{ color: 'hsl(0,0%,55%)' }}>BMW threshold</span>
                    <span className="font-mono font-semibold text-destructive">70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost exposure banner */}
        <div className="p-4 mb-6" style={{ background: 'hsla(0,0%,100%,0.7)', backdropFilter: 'blur(12px)', border: '1px solid hsl(0,0%,80%)' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Total Cost Exposure</div>
                <div className="text-[10px]" style={{ color: 'hsl(0,0%,55%)' }}>If no corrective action is taken</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-[22px] font-bold text-destructive tabular-nums leading-none">€{(reportMeta.totalCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px]" style={{ color: 'hsl(0,0%,55%)' }}>at risk</div>
              </div>
              <div className="w-px h-8" style={{ background: 'hsl(0,0%,80%)' }} />
              <div className="text-right">
                <div className="text-[22px] font-bold text-accent tabular-nums leading-none">€{(reportMeta.mitigatedCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px]" style={{ color: 'hsl(0,0%,55%)' }}>after mitigation</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs — matching SupplierDatabaseDemo button style */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={onDecide}
            className="px-5 py-2.5 text-[11px] font-semibold text-white uppercase tracking-wider transition-all duration-200 active:scale-[0.98] bg-primary hover:bg-primary/90 cursor-pointer"
          >
            Review & decide →
          </button>
          <button
            onClick={onWalk}
            className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer hover:bg-[hsl(0,0%,72%)]"
            style={{ background: 'hsl(0,0%,78%)', color: 'hsl(0,0%,35%)' }}
          >
            Walk the factory
            <ChevronDown className="w-3 h-3 inline ml-1 -mt-0.5" />
          </button>
          <button
            className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer hover:bg-[hsl(0,0%,72%)]"
            style={{ background: 'hsl(0,0%,78%)', color: 'hsl(0,0%,35%)' }}
          >
            <FileCheck className="w-3 h-3 inline mr-1 -mt-0.5" />
            Export PDF
          </button>
        </div>

        {/* Audit metadata footer */}
        <div className="pt-5" style={{ borderTop: '1px solid hsl(0,0%,80%)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Lead Auditor', value: 'I. Petrović', sub: 'IRCA Cert. #A21849' },
              { label: 'Date', value: date, sub: reportMeta.auditType.split(' — ')[0] },
              { label: 'Location', value: location.split(' — ')[0], sub: location.split(' — ')[1] || '' },
              { label: 'Cert. Body', value: reportMeta.certBody.split(' ')[0] + ' ' + reportMeta.certBody.split(' ')[1], sub: `Expires ${reportMeta.certExpiry}` },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-[10px] font-bold tracking-[0.1em] uppercase mb-1" style={{ color: 'hsl(0,0%,50%)' }}>{item.label}</div>
                <div className="text-[13px] font-medium text-foreground">{item.value}</div>
                {item.sub && <div className="text-[11px]" style={{ color: 'hsl(0,0%,55%)' }}>{item.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}