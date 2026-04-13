import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Shield, AlertTriangle, Clock, TrendingDown, ChevronDown, FileCheck } from "lucide-react";

const verdictConfig: Record<VerdictType, { label: string; color: string; accent: string; iconBg: string; borderColor: string }> = {
  go: { label: 'APPROVED', color: 'hsl(155, 24%, 55%)', accent: 'hsl(155, 24%, 45%)', iconBg: 'bg-accent/10', borderColor: 'border-accent/20' },
  conditional: { label: 'CONDITIONAL', color: 'hsl(24, 72%, 63%)', accent: 'hsl(24, 72%, 53%)', iconBg: 'bg-warning/10', borderColor: 'border-warning/20' },
  hold: { label: 'ON HOLD', color: 'hsl(0, 48%, 46%)', accent: 'hsl(0, 48%, 36%)', iconBg: 'bg-destructive/10', borderColor: 'border-destructive/20' },
  nogo: { label: 'REJECTED', color: 'hsl(0, 48%, 36%)', accent: 'hsl(0, 48%, 30%)', iconBg: 'bg-destructive/15', borderColor: 'border-destructive/20' },
};

function ProcessScoreBar({ label, fullName, score }: { label: string; fullName: string; score: number }) {
  const color = score >= 80 ? 'hsl(155, 24%, 55%)' : score >= 60 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  const bg = score >= 80 ? 'bg-accent/10' : score >= 60 ? 'bg-warning/10' : 'bg-destructive/10';
  return (
    <div className="group flex items-center gap-3 py-1">
      <div className="flex items-center gap-2 w-[52px] shrink-0">
        <span className={cn("text-[10px] font-bold px-1.5 py-0.5", bg)} style={{ color }}>{label}</span>
      </div>
      <div className="flex-1 h-[6px] bg-muted overflow-hidden">
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
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Audit Report</span>
            <span className="text-[11px] text-grey-mid">·</span>
            <span className="text-[11px] font-mono text-muted-foreground">{po}</span>
          </div>
          <div className="flex items-center gap-2">
            {['ISO 9001', 'IATF 16949', 'VDA 6.3'].map(badge => (
              <span key={badge} className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 audit-surface-sunken text-muted-foreground">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Verdict block — glassmorphic */}
        <div className={cn("audit-glass-card p-8 md:p-10 mb-6", config.borderColor)} style={{
          background: `linear-gradient(135deg, ${config.color}06, hsl(var(--card)) 60%)`,
        }}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-10 h-10 flex items-center justify-center", config.iconBg)}>
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
                <span className="w-1 h-1 rounded-full bg-grey-mid" />
                <span className="text-[14px] text-muted-foreground">{reportMeta.client}</span>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-lg">
                {heroReason}
              </p>

              {/* Executive Summary — elevated surface */}
              <div className="mt-5 p-4 audit-surface-sunken">
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-2">Executive Summary</div>
                <ul className="space-y-2 text-[13px] text-charcoal leading-relaxed">
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
                  <div className="w-7 h-7 bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-foreground leading-none">{majorNCRs}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Major</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-warning/10 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-warning" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-foreground leading-none">{minorNCRs}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Minor</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-muted flex items-center justify-center">
                    <TrendingDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-foreground leading-none">{reportMeta.previousScore} → 72</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Score trend</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — IATF score panel */}
            <div className="w-full md:w-[300px] shrink-0">
              <div className="audit-glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">IATF 16949</div>
                    <div className="text-[10px] text-muted-foreground">Weighted Process Score</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[32px] font-bold leading-none tabular-nums" style={{ color: config.color }}>
                      {Math.round(iatfWeightedScore)}
                      <span className="text-[16px] font-medium text-muted-foreground">%</span>
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
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Previous audit</span>
                    <span className="font-mono font-semibold text-muted-foreground">{reportMeta.previousScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                    <span className="text-muted-foreground">BMW threshold</span>
                    <span className="font-mono font-semibold text-destructive">70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost exposure banner — glass */}
        <div className="audit-glass-card p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground">Total Cost Exposure</div>
                <div className="text-[10px] text-muted-foreground">If no corrective action is taken</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-[22px] font-bold text-destructive tabular-nums leading-none">€{(reportMeta.totalCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-muted-foreground">at risk</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-right">
                <div className="text-[22px] font-bold text-accent tabular-nums leading-none">€{(reportMeta.mitigatedCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-muted-foreground">after mitigation</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onDecide}
            className="px-7 py-3 text-[13px] font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${config.color}, ${config.accent})` }}
          >
            Review & decide →
          </button>
          <button
            onClick={onWalk}
            className="px-7 py-3 text-[13px] font-semibold text-muted-foreground audit-surface hover:bg-muted transition-all duration-200 active:scale-[0.98]"
          >
            Walk the factory
            <ChevronDown className="w-3.5 h-3.5 inline ml-1.5 -mt-0.5" />
          </button>
          <button
            className="px-7 py-3 text-[13px] font-semibold text-muted-foreground audit-surface hover:bg-muted transition-all duration-200 active:scale-[0.98]"
          >
            <FileCheck className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Export PDF
          </button>
        </div>

        {/* Audit metadata footer */}
        <div className="border-t border-border pt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Lead Auditor', value: 'I. Petrović', sub: 'IRCA Cert. #A21849' },
              { label: 'Date', value: date, sub: reportMeta.auditType.split(' — ')[0] },
              { label: 'Location', value: location.split(' — ')[0], sub: location.split(' — ')[1] || '' },
              { label: 'Cert. Body', value: reportMeta.certBody.split(' ')[0] + ' ' + reportMeta.certBody.split(' ')[1], sub: `Expires ${reportMeta.certExpiry}` },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-1">{item.label}</div>
                <div className="text-[13px] font-medium text-foreground">{item.value}</div>
                {item.sub && <div className="text-[11px] text-muted-foreground">{item.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
