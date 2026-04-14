import { cn } from "@/lib/utils";
import ExecutiveRadarCharts from "@/components/audit-report/ExecutiveRadarCharts";
import type { VerdictType, DepthLevel } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Shield, AlertTriangle, Clock, TrendingDown, ChevronDown, FileCheck } from "lucide-react";

const verdictConfig: Record<VerdictType, { label: string; color: string; accent: string; bg: string }> = {
  go: { label: 'APPROVED', color: 'hsl(var(--accent))', accent: 'hsl(155, 24%, 45%)', bg: 'hsl(var(--accent) / 0.08)' },
  conditional: { label: 'CONDITIONAL', color: 'hsl(var(--warning))', accent: 'hsl(24, 72%, 53%)', bg: 'hsl(var(--warning) / 0.08)' },
  hold: { label: 'ON HOLD', color: 'hsl(var(--destructive))', accent: 'hsl(0, 48%, 36%)', bg: 'hsl(var(--destructive) / 0.08)' },
  nogo: { label: 'REJECTED', color: 'hsl(0, 48%, 36%)', accent: 'hsl(0, 48%, 30%)', bg: 'hsl(0, 48%, 36%, 0.08)' },
};

function ProcessScoreBar({ label, fullName, score }: { label: string; fullName: string; score: number }) {
  const color = score >= 80 ? 'hsl(var(--accent))' : score >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
  return (
    <div className="group flex items-center gap-3 py-1">
      <div className="flex items-center gap-2 w-[52px] shrink-0">
        <span className="text-[10px] font-bold px-1.5 py-0.5" style={{ background: `${color}15`, color }}>{label}</span>
      </div>
      <div className="flex-1 h-[6px] overflow-hidden bg-muted">
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
  depth?: DepthLevel;
}

export default function ReportHero({ verdict, verdictLabel, heroReason, supplier, po, auditor, date, location, onDecide, onWalk, depth = 'standard' }: ReportHeroProps) {
  const { reportMeta, allNCRs, iatfProcessScores, iatfWeightedScore } = useAuditReportContext();
  const config = verdictConfig[verdict];
  const majorNCRs = allNCRs.filter(n => n.severity === 'major').length;
  const minorNCRs = allNCRs.filter(n => n.severity === 'minor').length;

  // ── Executive mode: Dense formal engineering document header ──
  if (depth === 'executive') {
    const overallCls = iatfWeightedScore >= 90 ? { grade: 'A', color: 'hsl(155, 24%, 40%)', bg: 'hsl(155, 24%, 40%, 0.12)' }
      : iatfWeightedScore >= 80 ? { grade: 'AB', color: 'hsl(155, 24%, 50%)', bg: 'hsl(155, 24%, 50%, 0.12)' }
      : iatfWeightedScore >= 60 ? { grade: 'B', color: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 53%, 0.12)' }
      : { grade: 'C', color: 'hsl(0, 48%, 46%)', bg: 'hsl(0, 48%, 46%, 0.12)' };

    return (
      <section id="station-1" className="scroll-mt-20 pt-6 pb-2">
        {/* ══════ FORMAL AUDIT REPORT COVER SHEET ══════ */}
        <div className="border-2 border-foreground/20">
          {/* Document title block — ISO standard cover page */}
          <div className="px-6 py-5 text-center border-b-2 border-foreground/20" style={{ background: 'hsl(220,20%,14%)' }}>
            <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">Confidential — For Authorized Recipients Only</div>
            <h1 className="text-[20px] font-bold tracking-[0.08em] uppercase text-white leading-tight">
              Process Audit Report
            </h1>
            <div className="text-[12px] font-medium text-white/60 mt-1">
              per VDA 6.3:2023 / ISO 9001:2015 / IATF 16949:2016
            </div>
          </div>

          {/* Report identification table */}
          <table className="w-full border-collapse text-left">
            <tbody>
              {[
                ['Report No.', `PA-${date.replace(/-/g, '')}-001`, 'Revision', '1.0'],
                ['Supplier', supplier, 'DUNS No.', '36-421-8847'],
                ['Client / OEM', reportMeta.client, 'End Customer', 'BMW AG'],
                ['Site Address', location, 'Production Area', '4,200 m²'],
                ['Audit Date', new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }), 'Audit Duration', '2.0 days'],
                ['Audit Type', reportMeta.auditType, 'Previous Audit', reportMeta.previousAuditDate],
                ['Lead Auditor', 'I. Petrović, IRCA #A21849', 'Co-Auditor', 'M. Kovačević (VDA 6.3)'],
                ['Cert. Body', reportMeta.certBody, 'Cert. No.', reportMeta.certNumber],
                ['PO Reference', po, 'Cert. Expiry', reportMeta.certExpiry],
              ].map(([k1, v1, k2, v2], i) => (
                <tr key={i} className="border-b border-border/60">
                  <td className="px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground w-[130px]" style={{ background: 'hsl(220,14%,94%)' }}>{k1}</td>
                  <td className="px-4 py-2 text-[12px] font-medium text-foreground">{v1}</td>
                  <td className="px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground w-[130px] border-l border-border/60" style={{ background: 'hsl(220,14%,94%)' }}>{k2}</td>
                  <td className="px-4 py-2 text-[12px] font-medium text-foreground border-l border-border/60">{v2}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── AUDIT RESULT ── */}
          <div className="border-t-2 border-foreground/20">
            <div className="px-4 py-2" style={{ background: 'hsl(220,20%,14%)' }}>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">§10 — Audit Result</span>
            </div>
            <div className="grid grid-cols-5 divide-x divide-border">
              {/* VDA Score */}
              <div className="px-4 py-4 text-center">
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">VDA 6.3 Score</div>
                <div className="text-[28px] font-bold font-mono tabular-nums leading-none" style={{ color: overallCls.color }}>{Math.round(iatfWeightedScore)}%</div>
                <div className="text-[11px] font-bold px-2 py-0.5 mt-1.5 inline-block" style={{ background: overallCls.bg, color: overallCls.color }}>
                  Grade {overallCls.grade}
                </div>
              </div>
              {/* Verdict */}
              <div className="px-4 py-4 text-center">
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Verdict</div>
                <div className="text-[22px] font-bold leading-none" style={{ color: config.color }}>{verdictLabel}</div>
                <div className="text-[10px] mt-1.5 text-muted-foreground">{verdict === 'conditional' ? 'With Conditions' : verdict === 'go' ? 'Without Conditions' : 'Rejected'}</div>
              </div>
              {/* Previous */}
              <div className="px-4 py-4 text-center">
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Previous Score</div>
                <div className="text-[28px] font-bold font-mono tabular-nums leading-none text-foreground">{reportMeta.previousScore}%</div>
                <div className="text-[10px] mt-1.5 font-mono" style={{ color: iatfWeightedScore < reportMeta.previousScore ? 'hsl(0,48%,46%)' : 'hsl(155,24%,45%)' }}>
                  {iatfWeightedScore >= reportMeta.previousScore ? '▲' : '▼'} {Math.abs(Math.round(iatfWeightedScore) - reportMeta.previousScore)}pts
                </div>
              </div>
              {/* NCRs */}
              <div className="px-4 py-4 text-center">
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Non-Conformities</div>
                <div className="flex items-center justify-center gap-3">
                  <div>
                    <div className="text-[22px] font-bold font-mono text-destructive leading-none">{majorNCRs}</div>
                    <div className="text-[9px] uppercase text-destructive font-bold">Major</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="text-[22px] font-bold font-mono text-warning leading-none">{minorNCRs}</div>
                    <div className="text-[9px] uppercase text-warning font-bold">Minor</div>
                  </div>
                </div>
              </div>
              {/* Cost */}
              <div className="px-4 py-4 text-center">
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Risk Exposure</div>
                <div className="text-[22px] font-bold font-mono tabular-nums leading-none text-destructive">€{(reportMeta.totalCostExposure / 1000).toFixed(0)}K</div>
                <div className="text-[10px] mt-1.5 text-muted-foreground">Mitigatable to €{(reportMeta.mitigatedCostExposure / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>

          {/* ── EXECUTIVE SUMMARY ── */}
          <div className="border-t-2 border-foreground/20">
            <div className="px-4 py-2" style={{ background: 'hsl(220,20%,14%)' }}>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">§1 — Executive Summary</span>
            </div>
            <div className="px-6 py-4 bg-card">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-border/40">
                    <td className="py-2 pr-4 align-top w-[24px]"><div className="w-3 h-3 bg-destructive mt-0.5" /></td>
                    <td className="py-2 pr-3 text-[10px] font-bold uppercase text-destructive w-[80px] align-top">Critical</td>
                    <td className="py-2 text-[12px] leading-snug text-foreground">Bore ID Cpk 0.98 — below BMW minimum 1.33 (§8.5.1). CNC machines #2 & #4 calibration overdue. Process capability not demonstrated per IATF 16949 §9.1.1.1.</td>
                  </tr>
                  <tr className="border-b border-border/40">
                    <td className="py-2 pr-4 align-top"><div className="w-3 h-3 bg-warning mt-0.5" /></td>
                    <td className="py-2 pr-3 text-[10px] font-bold uppercase text-warning align-top">Warning</td>
                    <td className="py-2 text-[12px] leading-snug text-foreground">DPPM 410 vs. target 50. Accelerating trend since Oct 2025. 6/42 supplier re-evaluations overdue (§8.4.1). CAPA closure rate 62.5% — below 90% threshold.</td>
                  </tr>
                  <tr className="border-b border-border/40">
                    <td className="py-2 pr-4 align-top"><div className="w-3 h-3 bg-accent mt-0.5" /></td>
                    <td className="py-2 pr-3 text-[10px] font-bold uppercase text-accent align-top">Strength</td>
                    <td className="py-2 text-[12px] leading-snug text-foreground">Workforce competency above benchmark (P6 score 88%). CEO engagement confirmed (§5.1). Customer care score highest across all process elements.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top"><div className="w-3 h-3 bg-primary mt-0.5" /></td>
                    <td className="py-2 pr-3 text-[10px] font-bold uppercase text-primary align-top">Action Req.</td>
                    <td className="py-2 text-[12px] leading-snug text-foreground">2 major NCRs require assigned owners + corrective action deadlines before PO release. Re-audit within 90 days per VDA 6.3 §10.3.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── §9 — GAP ANALYSIS RADAR CHARTS ── */}
          <div className="border-t border-foreground/20">
            <ExecutiveRadarCharts depth="executive" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-6 py-3 border-t-2 border-foreground/20 bg-card">
            <div className="text-[9px] text-muted-foreground">
              Document generated: {new Date().toLocaleDateString('de-DE')} · Distribution: Restricted
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onWalk} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer bg-muted text-foreground hover:bg-muted/80">
                Detailed Findings ↓
              </button>
              <button onClick={onDecide} className="px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider bg-primary hover:bg-primary/90 cursor-pointer">
                Review & Sign Off →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Standard / Full mode ──
  return (
    <section id="station-1" className="min-h-[100dvh] flex flex-col justify-center relative scroll-mt-20 py-12">
      <div className="relative z-10 max-w-[880px] mx-auto w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5" style={{ background: config.color }} />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Audit Report</span>
            <span className="text-[11px] text-border">·</span>
            <span className="text-[11px] font-mono text-muted-foreground">{po}</span>
          </div>
          <div className="flex items-center gap-2">
            {['ISO 9001', 'IATF 16949', 'VDA 6.3'].map(badge => (
              <span key={badge} className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 bg-muted text-muted-foreground">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Verdict block — solid card */}
        <div className="bg-card shadow-sm mb-6">
          {/* Dark header band */}
          <div className="px-8 py-4 flex items-center gap-3" style={{ background: 'hsl(220,20%,12%)' }}>
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${config.color}20` }}>
              {verdict === 'go' ? <Shield className="w-4 h-4" style={{ color: config.color }} /> :
               <AlertTriangle className="w-4 h-4" style={{ color: config.color }} />}
            </div>
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: config.color }}>
              Verdict
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-[42px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-foreground">
                  {verdictLabel}
                </h1>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[16px] font-semibold text-foreground">{supplier}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-[14px] text-muted-foreground">{reportMeta.client}</span>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed max-w-lg text-muted-foreground">
                  {heroReason}
                </p>

                {/* Executive Summary */}
                <div className="mt-5 p-4 bg-muted">
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2 text-muted-foreground">Executive Summary</div>
                  <ul className="space-y-2 text-[13px] leading-relaxed text-foreground/80">
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
                    <div className="w-7 h-7 flex items-center justify-center bg-destructive/10">
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-foreground leading-none">{majorNCRs}</div>
                      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Major</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center bg-warning/10">
                      <Clock className="w-3.5 h-3.5 text-warning" />
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-foreground leading-none">{minorNCRs}</div>
                      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Minor</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center bg-muted">
                      <TrendingDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-[18px] font-bold text-foreground leading-none">{reportMeta.previousScore} → 72</div>
                      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Score trend</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — IATF score panel */}
              <div className="w-full md:w-[300px] shrink-0">
                <div className="p-5 bg-muted/50 border border-border">
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
                      <span className="font-mono font-semibold text-foreground">{reportMeta.previousScore}%</span>
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
        </div>

        {/* Cost exposure banner */}
        <div className="bg-card shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-destructive/10">
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
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={onDecide}
            className="px-5 py-2.5 text-[11px] font-semibold text-white uppercase tracking-wider transition-all duration-200 active:scale-[0.98] bg-primary hover:bg-primary/90 cursor-pointer"
          >
            Review & decide →
          </button>
          <button
            onClick={onWalk}
            className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer bg-muted text-foreground hover:bg-muted/80"
          >
            Walk the factory
            <ChevronDown className="w-3 h-3 inline ml-1 -mt-0.5" />
          </button>
          <button
            className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] cursor-pointer bg-muted text-foreground hover:bg-muted/80"
          >
            <FileCheck className="w-3 h-3 inline mr-1 -mt-0.5" />
            Export PDF
          </button>
        </div>

        {/* Audit metadata footer */}
        <div className="pt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Lead Auditor', value: 'I. Petrović', sub: 'IRCA Cert. #A21849' },
              { label: 'Date', value: date, sub: reportMeta.auditType.split(' — ')[0] },
              { label: 'Location', value: location.split(' — ')[0], sub: location.split(' — ')[1] || '' },
              { label: 'Cert. Body', value: reportMeta.certBody.split(' ')[0] + ' ' + reportMeta.certBody.split(' ')[1], sub: `Expires ${reportMeta.certExpiry}` },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-[10px] font-bold tracking-[0.1em] uppercase mb-1 text-muted-foreground">{item.label}</div>
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
