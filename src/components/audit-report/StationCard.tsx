import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Station, DepthLevel, FindingSeverity, SubCategory, AtlasAIInsight, AIPattern, BMWImpact, SubCategoryEvidence } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { CheckCircle2, Circle, Triangle, Diamond, Square, Minus, Camera, Ruler, Video, Sparkles, ChevronDown, ChevronRight, BookOpen, Brain, AlertTriangle, TrendingUp, FileText, Image, Film, Gauge, Clock, DollarSign, Zap, Eye } from "lucide-react";


const findingIcon: Record<FindingSeverity, React.ElementType> = {
  pass: CheckCircle2, observation: Circle, concern: Triangle, 'minor-ncr': Diamond, 'major-ncr': Square, na: Minus,
};
const findingColor: Record<FindingSeverity, string> = {
  pass: 'text-accent', observation: 'text-muted-foreground', concern: 'text-warning',
  'minor-ncr': 'text-warning', 'major-ncr': 'text-destructive', na: 'text-[hsl(0,0%,55%)]',
};
const healthChip: Record<string, { bg: string; color: string }> = {
  green: { bg: 'hsl(155, 24%, 55%, 0.1)', color: 'hsl(155, 24%, 55%)' },
  amber: { bg: 'hsl(24, 72%, 63%, 0.1)', color: 'hsl(24, 72%, 63%)' },
  red: { bg: 'hsl(0, 48%, 46%, 0.1)', color: 'hsl(0, 48%, 46%)' },
  grey: { bg: 'hsl(0,0%,88%)', color: 'hsl(0,0%,55%)' },
};
const scoreColor = (score: number | null) => {
  if (score === null) return 'hsl(0,0%,55%)';
  if (score >= 8) return 'hsl(155, 24%, 55%)';
  if (score >= 6) return 'hsl(24, 72%, 63%)';
  return 'hsl(0, 48%, 46%)';
};
const scoreBar = (score: number | null) => {
  if (score === null) return 'hsl(0, 0%, 75%)';
  if (score >= 8) return 'hsl(155, 24%, 55%)';
  if (score >= 6) return 'hsl(24, 72%, 63%)';
  return 'hsl(0, 48%, 46%)';
};
const impactRatingColor: Record<string, string> = {
  critical: 'hsl(0, 48%, 46%)', high: 'hsl(24, 72%, 63%)', medium: 'hsl(24, 72%, 63%)', low: 'hsl(155, 24%, 55%)', none: 'hsl(0, 0%, 75%)',
};
const evidenceTypeIcon: Record<string, React.ElementType> = {
  photo: Image, document: FileText, video: Film, measurement: Gauge,
};

// ─── Sub-components ─────────────────────────────────────────

function EvidenceGrid({ evidence }: { evidence: SubCategoryEvidence[] }) {
  return (
    <div className="mt-3">
      <span className="text-[12px] uppercase tracking-[0.12em] font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>Evidence</span>
      <div className="flex flex-wrap gap-2 mt-1.5">
        {evidence.map(ev => {
          const Icon = evidenceTypeIcon[ev.type] || FileText;
          return (
            <button key={ev.id} className="flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] transition-colors cursor-pointer bg-muted text-foreground">
              {ev.thumbnail ? (
                <img src={ev.thumbnail} alt={ev.label} className="w-8 h-8 object-cover" />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'hsl(0,0%,92%)' }}>
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <span className="max-w-[160px] truncate">{ev.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InlineEvidenceThumbnails({ evidence }: { evidence: SubCategoryEvidence[] }) {
  const photos = evidence.filter(e => e.type === 'photo').slice(0, 4);
  if (photos.length === 0) return null;
  return (
    <div className="flex items-center gap-1 mt-2">
      {photos.map(p => (
        <div key={p.id} className="w-8 h-8 overflow-hidden" style={{ background: 'hsl(0,0%,92%)' }}>
          {p.thumbnail ? (
            <img src={p.thumbnail} alt={p.label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="w-3 h-3" style={{ color: 'hsl(0,0%,55%)' }} />
            </div>
          )}
        </div>
      ))}
      {evidence.length > 4 && (
        <span className="text-[11px] ml-1" style={{ color: 'hsl(0,0%,50%)' }}>+{evidence.length - 4}</span>
      )}
    </div>
  );
}

function AIPatternsList({ patterns }: { patterns: AIPattern[] }) {
  return (
    <div className="mt-3 space-y-2">
      <span className="text-[12px] uppercase tracking-[0.12em] font-semibold flex items-center gap-1.5" style={{ color: 'hsl(0,0%,50%)' }}>
        <Zap className="w-3 h-3 text-primary" /> AI-Identified Patterns & Predictions
      </span>
      {patterns.map(p => {
        const color = impactRatingColor[p.impact];
        return (
          <div key={p.id} className="p-3" style={{ background: 'hsl(195, 89%, 34%, 0.04)' }}>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] px-1.5 py-0.5 font-semibold uppercase tracking-wider" style={{ background: `${color}15`, color }}>{p.type}</span>
              <span className="text-[11px] px-1.5 py-0.5 font-mono" style={{ background: 'hsl(0,0%,88%)', color: 'hsl(0,0%,50%)' }}>{p.confidence}%</span>
              {p.timeframe && <span className="text-[11px]" style={{ color: 'hsl(0,0%,50%)' }}>⏱ {p.timeframe}</span>}
            </div>
            <p className="text-[14px] font-medium text-foreground">{p.title}</p>
            <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: 'hsl(0,0%,50%)' }}>{p.body}</p>
          </div>
        );
      })}
    </div>
  );
}

function BMWImpactPanel({ impact }: { impact: BMWImpact }) {
  const items = [
    { key: 'quality', label: 'Quality', icon: Eye, data: impact.quality },
    { key: 'time', label: 'Time', icon: Clock, data: impact.time },
    { key: 'cost', label: 'Cost', icon: DollarSign, data: impact.cost },
  ];
  const hasAnyImpact = items.some(i => i.data.rating !== 'none');
  if (!hasAnyImpact) return null;

  return (
    <div className="mt-3">
      <span className="text-[12px] uppercase tracking-[0.12em] font-semibold flex items-center gap-1.5" style={{ color: 'hsl(0,0%,50%)' }}>
        <AlertTriangle className="w-3 h-3 text-warning" /> BMW Impact Assessment
      </span>
      <div className="grid grid-cols-3 gap-2 mt-1.5">
        {items.map(({ key, label, icon: Icon, data }) => {
          const color = impactRatingColor[data.rating];
          return (
            <div key={key} className="p-2.5 bg-card">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3 h-3" style={{ color }} />
                <span className="text-[12px] font-semibold text-foreground">{label}</span>
                <span className="text-[8px] px-1.5 py-0.5 font-bold uppercase ml-auto" style={{ background: `${color}15`, color }}>{data.rating}</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: 'hsl(0,0%,50%)' }}>{data.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

interface StationCardProps {
  station: Station;
  depth: DepthLevel;
  totalStations: number;
}

export default function StationCard({ station, depth, totalStations }: StationCardProps) {
  const [questionsOpen, setQuestionsOpen] = useState(false);

  if (!station.observation && station.index !== 10 && station.index !== 11 && station.index !== 12) return null;

  const hasQuestions = station.auditQuestions && station.auditQuestions.length > 0;
  const hc = healthChip[station.health];

  // ── Executive mode: Dense engineering document row ──
  if (depth === 'executive') {
    const majorNCRs = station.ncrs.filter(n => n.severity === 'major');
    const minorNCRs = station.ncrs.filter(n => n.severity === 'minor');
    const totalFindings = station.findings.length;

    // Calculate element score from audit questions
    const avgScore = hasQuestions
      ? (station.auditQuestions!.reduce((sum, q) => sum + (q.score || 0), 0) / station.auditQuestions!.length)
      : null;
    const elementPct = avgScore !== null ? Math.round(avgScore * 10) : null;
    const elementColor = elementPct !== null
      ? elementPct >= 80 ? 'hsl(155, 24%, 40%)' : elementPct >= 60 ? 'hsl(24, 72%, 53%)' : 'hsl(0, 48%, 46%)'
      : 'hsl(0,0%,55%)';

    return (
      <section id={`station-${station.index}`} className="scroll-mt-20">
        <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
          {/* Clean header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: hc.color }} />
              <span className="text-[15px] font-semibold text-foreground">{station.name}</span>
              <span className="text-[13px] text-muted-foreground">P{station.index}</span>
            </div>
            <div className="flex items-center gap-3">
              {elementPct !== null && (
                <span className="text-[15px] font-semibold font-mono" style={{ color: elementColor }}>{elementPct}%</span>
              )}
              <span className="text-[13px] px-2.5 py-1 font-medium rounded-md" style={{ background: `${hc.color}12`, color: hc.color }}>
                {station.health === 'green' ? 'Conform' : station.health === 'amber' ? 'Deviation' : station.health === 'red' ? 'Non-Conform' : 'N/A'}
              </span>
            </div>
          </div>

          {/* Observation */}
          <div className="px-5 py-3 border-b border-border/30">
            <p className="text-[14px] leading-relaxed text-muted-foreground">{station.observation}</p>
          </div>

          {/* Audit question scoring table */}
          {hasQuestions && (
            <div>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30 w-[50px]">Ref.</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30">Clause</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30">Question</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30 w-[50px] text-center">Score</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {station.auditQuestions!.map(q => {
                    const s = q.score || 0;
                    const qColor = s >= 8 ? 'hsl(155, 24%, 40%)' : s >= 6 ? 'hsl(24, 72%, 53%)' : 'hsl(0, 48%, 46%)';
                    return (
                      <tr key={q.id} className="border-b border-border/20 hover:bg-muted/10">
                        <td className="px-3 py-2 text-[13px] font-mono text-primary">{q.id}</td>
                        <td className="px-3 py-2 text-[13px] font-mono text-muted-foreground">§{q.clause}</td>
                        <td className="px-3 py-2 text-[13px] text-foreground max-w-[400px]">{q.question}</td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-[14px] font-semibold font-mono" style={{ color: qColor }}>{s}</span>
                          <span className="text-[12px] text-muted-foreground">/10</span>
                        </td>
                        <td className="px-3 py-2 text-[13px] text-muted-foreground">{q.notes}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border/30">
                    <td colSpan={3} className="px-3 py-2 text-[13px] font-semibold text-foreground">
                      Element Result
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="text-[15px] font-semibold font-mono" style={{ color: elementColor }}>{elementPct}%</span>
                    </td>
                    <td className="px-3 py-2 text-[13px] font-medium" style={{ color: elementColor }}>
                      {elementPct !== null && elementPct >= 80 ? 'Qualified' : elementPct !== null && elementPct >= 60 ? 'Conditionally Qualified' : 'Not Qualified'}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Findings as formal table */}
          {station.findings.length > 0 && (
            <div className="border-t border-border/30">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30 w-[80px]">Type</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30">Finding</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30 w-[70px]">Clause</th>
                    <th className="px-3 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30 w-[80px]">NCR Ref.</th>
                  </tr>
                </thead>
                <tbody>
                  {station.findings.map((finding, i) => {
                    const Icon = findingIcon[finding.type];
                    return (
                      <tr key={i} className="border-b border-border/20">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <Icon className={cn("w-3 h-3 shrink-0", findingColor[finding.type])} />
                            <span className={cn("text-[12px] font-medium", findingColor[finding.type])}>
                              {finding.type === 'major-ncr' ? 'Major' : finding.type === 'minor-ncr' ? 'Minor' : finding.type === 'pass' ? 'Pass' : finding.type === 'concern' ? 'Concern' : finding.type === 'observation' ? 'Obs.' : 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-[13px] text-foreground">{finding.title}</td>
                        <td className="px-3 py-2 text-[13px] font-mono text-primary">{finding.isoClause ? `§${finding.isoClause}` : '—'}</td>
                        <td className="px-3 py-2">
                          {finding.ncrId ? (
                            <span className="text-[12px] font-mono font-medium px-1.5 py-0.5 rounded text-destructive bg-destructive/8">{finding.ncrId}</span>
                          ) : <span className="text-[13px] text-muted-foreground">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* NCR summary */}
          {(majorNCRs.length > 0 || minorNCRs.length > 0) && (
            <div className="px-5 py-2.5 flex items-center gap-4 text-[13px] border-t border-border/30">
              {majorNCRs.length > 0 && <span className="font-medium text-destructive">{majorNCRs.length} Major NCR</span>}
              {minorNCRs.length > 0 && <span className="font-medium text-warning">{minorNCRs.length} Minor NCR</span>}
              <span className="text-muted-foreground ml-auto">{totalFindings} findings</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Standard / Full mode ──
  return (
    <section id={`station-${station.index}`} className="scroll-mt-20">
      {/* Sticky section header */}
      <div className="sticky top-12 z-20 -mx-4 md:-mx-8 px-4 md:px-8 py-3 mb-4 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium tracking-[0.1em]" style={{ color: 'hsl(0,0%,50%)' }}>// {String(station.index).padStart(2, '0')}</span>
          <div className="w-2 h-2" style={{ background: hc.color }} />
          <span className="text-[15px] font-semibold text-foreground">{station.name}</span>
          <div className="flex-1 h-px" style={{ background: 'hsl(0,0%,78%)' }} />
          <span className="text-[12px] px-2.5 py-1 uppercase tracking-wider font-semibold" style={{ background: hc.bg, color: hc.color }}>
            {station.health === 'green' ? 'Pass' : station.health === 'amber' ? 'Concern' : station.health === 'red' ? 'Fail' : 'N/A'}
          </span>
          {/* Evidence count summary */}
          <div className="flex items-center gap-2 text-[12px]" style={{ color: 'hsl(0,0%,55%)' }}>
            {station.evidenceCount.photos > 0 && <span className="flex items-center gap-0.5"><Camera className="w-3 h-3" />{station.evidenceCount.photos}</span>}
            {station.evidenceCount.videos > 0 && <span className="flex items-center gap-0.5"><Video className="w-3 h-3" />{station.evidenceCount.videos}</span>}
            {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-0.5"><Ruler className="w-3 h-3" />{station.evidenceCount.measurements}</span>}
          </div>
        </div>
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none mb-8">{station.name}</h2>

      {station.observation && (
        <div className="p-6 md:p-8 space-y-8 bg-card shadow-sm">
          {/* Hero photo */}
          {station.heroPhoto ? (
            <div className="aspect-video overflow-hidden">
              <img src={station.heroPhoto} alt={`Factory photo — ${station.name}`} className="w-full h-full object-cover" loading="lazy" width={960} height={540} />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center" style={{ background: 'hsl(0,0%,92%)' }}>
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: 'hsl(0,0%,55%)' }} />
                <span className="text-[15px]" style={{ color: 'hsl(0,0%,50%)' }}>Factory photo — Station {station.index}</span>
              </div>
            </div>
          )}

          {/* WHAT WE SAW */}
          <div>
            <h4 className="text-[13px] uppercase tracking-[0.15em] font-semibold mb-3" style={{ color: 'hsl(0,0%,50%)' }}>What we saw</h4>
            <p className="text-[15px] font-light leading-relaxed" style={{ color: 'hsl(0,0%,25%)' }}>{station.observation}</p>
          </div>

          {/* WHAT IT MEANS */}
          {true && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-[13px] uppercase tracking-[0.15em] font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>What it means</h4>
                {station.confidence > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5" style={{ background: 'hsl(195, 89%, 34%, 0.05)' }}>
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-[13px] font-mono text-primary">Atlas · {station.confidence}%</span>
                  </div>
                )}
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: 'hsl(0,0%,45%)' }}>{station.interpretation}</p>
            </div>
          )}

          {/* Findings */}
          {station.findings.length > 0 && (
            <div>
              <h4 className="text-[13px] uppercase tracking-[0.15em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>What you should do</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {station.findings.map((finding, i) => {
                  const Icon = findingIcon[finding.type];
                  return (
                    <div key={i} className="flex gap-3 p-4" style={{ background: 'hsl(0,0%,92%)' }}>
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", findingColor[finding.type])} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[14px] font-semibold text-foreground">{finding.title}</p>
                          {finding.isoClause && (
                            <a
                              href={`https://www.iso.org/standard/62085.html`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[12px] font-mono px-1.5 py-0.5 text-primary cursor-pointer transition-colors"
                              style={{ background: 'hsl(195, 89%, 34%, 0.1)' }}
                              title={`ISO 9001:2015 Clause ${finding.isoClause}`}
                            >
                              §{finding.isoClause}
                            </a>
                          )}
                        </div>
                        <p className="text-[15px] font-light mt-1 leading-relaxed" style={{ color: 'hsl(0,0%,50%)' }}>{finding.description}</p>
                        {finding.ncrId && (
                          <span className="inline-block mt-1.5 text-[13px] font-mono font-bold px-2 py-0.5 text-destructive" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>{finding.ncrId}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-Categories */}
          {station.subCategories && station.subCategories.length > 0 && (
            <div>
              <h4 className="text-[13px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>Process Element Breakdown</h4>
              <div className="space-y-3">
                {station.subCategories.map(sub => {
                  const subHealthColor = sub.health === 'green' ? 'hsl(155, 24%, 55%)' : sub.health === 'amber' ? 'hsl(24, 72%, 63%)' : sub.health === 'red' ? 'hsl(0, 48%, 46%)' : 'hsl(0, 0%, 75%)';
                  return (
                    <div key={sub.id} className="p-4 space-y-3" style={{ background: 'hsl(0,0%,92%)' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2" style={{ background: subHealthColor }} />
                          <span className="text-[14px] font-medium text-foreground">{sub.label}</span>
                        </div>
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: subHealthColor }}>{sub.score}/100</span>
                      </div>
                      <div className="h-1.5 overflow-hidden" style={{ background: 'hsl(0,0%,82%)' }}>
                        <div className="h-full transition-all" style={{ width: `${sub.score}%`, background: subHealthColor }} />
                      </div>
                      {sub.findings.map((f, fi) => {
                        const FIcon = findingIcon[f.type];
                        return (
                          <div key={fi} className="flex items-start gap-2 text-[15px]">
                            <FIcon className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", findingColor[f.type])} />
                            <span style={{ color: 'hsl(0,0%,25%)' }}><strong>{f.title}</strong> — {f.description}</span>
                          </div>
                        );
                      })}
                      {depth === 'full' && (
                        <div className="flex gap-2 p-3" style={{ background: 'hsl(195, 89%, 34%, 0.05)' }}>
                          <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[12px] font-semibold uppercase tracking-wider text-primary">Atlas AI · {sub.aiConfidence}%</span>
                            <p className="text-[14px] leading-relaxed mt-1" style={{ color: 'hsl(0,0%,25%)' }}>{sub.aiInsight}</p>
                          </div>
                        </div>
                      )}
                      {sub.evidence && sub.evidence.length > 0 && (
                        <EvidenceGrid evidence={sub.evidence} />
                      )}
                      {sub.aiPatterns && sub.aiPatterns.length > 0 && depth === 'full' && (
                        <AIPatternsList patterns={sub.aiPatterns} />
                      )}
                      {sub.bmwImpact && (
                        <BMWImpactPanel impact={sub.bmwImpact} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Atlas AI Insights */}
          {station.atlasInsights && station.atlasInsights.length > 0 && (
            <div>
              <h4 className="text-[13px] uppercase tracking-[0.12em] font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(0,0%,50%)' }}>
                <Brain className="w-4 h-4 text-primary" /> Atlas Intelligence
              </h4>
              <div className="space-y-3">
                {station.atlasInsights.map((insight, ii) => {
                  const ic = impactRatingColor[insight.impact];
                  return (
                    <div key={ii} className="p-4" style={{ background: 'hsl(195, 89%, 34%, 0.04)' }}>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[12px] px-2 py-0.5 font-semibold uppercase tracking-wider" style={{ background: `${ic}15`, color: ic }}>{insight.impact}</span>
                        <span className="text-[12px] px-2 py-0.5 font-mono" style={{ background: 'hsl(0,0%,88%)', color: 'hsl(0,0%,50%)' }}>{insight.confidence}% conf.</span>
                        {insight.dataPointsAnalyzed && <span className="text-[12px]" style={{ color: 'hsl(0,0%,50%)' }}>{insight.dataPointsAnalyzed.toLocaleString()} data points</span>}
                      </div>
                      <p className="text-[14px] font-medium text-foreground mb-1">{insight.title}</p>
                      <p className="text-[15px] leading-relaxed" style={{ color: 'hsl(0,0%,50%)' }}>{insight.body}</p>
                      {insight.connectedNCRs && insight.connectedNCRs.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {insight.connectedNCRs.map(n => <span key={n} className="text-[12px] font-mono px-2 py-0.5 text-destructive" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>{n}</span>)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* NCR Cards */}
          {station.ncrs.length > 0 && (
            <div className="space-y-4">
              {station.ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
            </div>
          )}

          {/* Audit Questions */}
          {hasQuestions && depth === 'full' && (
            <div className="pt-6">
              <button onClick={() => setQuestionsOpen(!questionsOpen)} className="flex items-center gap-2 text-[15px] font-medium transition-colors mb-4 cursor-pointer" style={{ color: 'hsl(0,0%,45%)' }}>
                <BookOpen className="w-4 h-4" />
                <span>ISO 9001 Audit Checklist — {station.auditQuestions!.length} questions</span>
                {questionsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {questionsOpen && (
                <div className="space-y-2">
                  {station.auditQuestions!.map((q) => (
                    <div key={q.id} className="flex gap-3 p-3" style={{ background: 'hsl(0,0%,92%)' }}>
                      <div className="shrink-0 w-10 text-center">
                        <span className="text-[18px] font-mono font-light tabular-nums" style={{ color: scoreColor(q.score) }}>{q.score ?? '—'}</span>
                        <div className="w-full h-1 mt-1 overflow-hidden" style={{ background: 'hsl(0,0%,82%)' }}>
                          <div className="h-full" style={{ width: `${(q.score ?? 0) * 10}%`, background: scoreBar(q.score) }} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[12px] font-mono px-1.5 py-0.5" style={{ background: 'hsl(0,0%,85%)', color: 'hsl(0,0%,50%)' }}>§{q.clause}</span>
                          <span className="text-[12px] font-mono" style={{ color: 'hsl(0,0%,55%)' }}>{q.id}</span>
                        </div>
                        <p className="text-[15px] text-foreground leading-snug">{q.question}</p>
                        <p className="text-[14px] mt-1 leading-relaxed" style={{ color: 'hsl(0,0%,50%)' }}>{q.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Evidence footer */}
          {(station.evidenceCount.photos > 0 || station.evidenceCount.measurements > 0 || station.evidenceCount.videos > 0) && (
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4 text-[14px]" style={{ color: 'hsl(0,0%,50%)' }}>
                {station.evidenceCount.photos > 0 && <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /> {station.evidenceCount.photos} photos</span>}
                {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {station.evidenceCount.measurements} measurements</span>}
                {station.evidenceCount.videos > 0 && <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {station.evidenceCount.videos} video</span>}
              </div>
              <button className="text-[14px] text-primary font-medium cursor-pointer transition-colors">View evidence →</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}