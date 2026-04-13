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
  'minor-ncr': 'text-warning', 'major-ncr': 'text-destructive', na: 'text-grey-mid',
};
const healthChip: Record<string, string> = {
  green: 'bg-accent/10 text-accent', amber: 'bg-warning/10 text-warning',
  red: 'bg-destructive/10 text-destructive', grey: 'bg-muted text-grey-mid',
};
const scoreColor = (score: number | null) => {
  if (score === null) return 'text-grey-mid';
  if (score >= 8) return 'text-accent';
  if (score >= 6) return 'text-warning';
  return 'text-destructive';
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
      <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Evidence</span>
      <div className="flex flex-wrap gap-2 mt-1.5">
        {evidence.map(ev => {
          const Icon = evidenceTypeIcon[ev.type] || FileText;
          return (
            <button key={ev.id} className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border bg-white hover:bg-muted transition-colors text-[11px] text-charcoal">
              {ev.thumbnail ? (
                <img src={ev.thumbnail} alt={ev.label} className="w-8 h-8 object-cover border border-border" />
              ) : (
                <div className="w-8 h-8 bg-muted border border-border flex items-center justify-center">
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
        <div key={p.id} className="w-8 h-8 bg-muted border border-border overflow-hidden">
          {p.thumbnail ? (
            <img src={p.thumbnail} alt={p.label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="w-3 h-3 text-grey-mid" />
            </div>
          )}
        </div>
      ))}
      {evidence.length > 4 && (
        <span className="text-[9px] text-muted-foreground ml-1">+{evidence.length - 4}</span>
      )}
    </div>
  );
}

function AIPatternsList({ patterns }: { patterns: AIPattern[] }) {
  return (
    <div className="mt-3 space-y-2">
      <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-primary" /> AI-Identified Patterns & Predictions
      </span>
      {patterns.map(p => {
        const color = impactRatingColor[p.impact];
        return (
          <div key={p.id} className=" border border-primary/10 bg-primary/3 p-3">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider" style={{ background: `${color}15`, color }}>{p.type}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">{p.confidence}%</span>
              {p.timeframe && <span className="text-[9px] text-muted-foreground">⏱ {p.timeframe}</span>}
            </div>
            <p className="text-[12px] font-medium text-foreground">{p.title}</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{p.body}</p>
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
      <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3 text-warning" /> BMW Impact Assessment
      </span>
      <div className="grid grid-cols-3 gap-2 mt-1.5">
        {items.map(({ key, label, icon: Icon, data }) => {
          const color = impactRatingColor[data.rating];
          return (
            <div key={key} className=" border border-border bg-white p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3 h-3" style={{ color }} />
                <span className="text-[10px] font-semibold text-foreground">{label}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ml-auto" style={{ background: `${color}15`, color }}>{data.rating}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{data.detail}</p>
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

  return (
    <section id={`station-${station.index}`} className="scroll-mt-20">
      {/* Sticky section header — glass */}
      <div className="sticky top-12 z-20 backdrop-blur-md border-b border-border -mx-4 md:-mx-8 px-4 md:px-8 py-3 mb-4" style={{ background: 'hsl(var(--background) / 0.85)' }}>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// {String(station.index).padStart(2, '0')}</span>
          <div className={cn("w-2 h-2", station.health === 'green' ? 'bg-accent' : station.health === 'amber' ? 'bg-warning' : station.health === 'red' ? 'bg-destructive' : 'bg-grey-mid')} />
          <span className="text-[13px] font-semibold text-foreground">{station.name}</span>
          <div className="flex-1 h-px bg-border" />
          <span className={cn("text-[10px] px-2.5 py-1 uppercase tracking-wider font-semibold", healthChip[station.health])}>
            {station.health === 'green' ? 'Pass' : station.health === 'amber' ? 'Concern' : station.health === 'red' ? 'Fail' : 'N/A'}
          </span>
          {/* Evidence count summary */}
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            {station.evidenceCount.photos > 0 && <span className="flex items-center gap-0.5"><Camera className="w-3 h-3" />{station.evidenceCount.photos}</span>}
            {station.evidenceCount.videos > 0 && <span className="flex items-center gap-0.5"><Video className="w-3 h-3" />{station.evidenceCount.videos}</span>}
            {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-0.5"><Ruler className="w-3 h-3" />{station.evidenceCount.measurements}</span>}
          </div>
        </div>
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none mb-8">{station.name}</h2>

      {station.observation && (
        <div className="audit-glass-card p-6 md:p-8 space-y-8">
          {/* Hero photo */}
          {station.heroPhoto ? (
            <div className="aspect-video  overflow-hidden border border-border">
              <img src={station.heroPhoto} alt={`Factory photo — ${station.name}`} className="w-full h-full object-cover" loading="lazy" width={960} height={540} />
            </div>
          ) : (
            <div className="aspect-video  bg-muted border border-border flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-grey-mid mx-auto mb-2" />
                <span className="text-[13px] text-muted-foreground">Factory photo — Station {station.index}</span>
              </div>
            </div>
          )}

          {/* WHAT WE SAW — font-light for observations */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3">What we saw</h4>
            <p className="text-[15px] font-light text-charcoal leading-relaxed">{station.observation}</p>
          </div>

          {/* WHAT IT MEANS */}
          {depth !== 'executive' && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">What it means</h4>
                {station.confidence > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/5">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-[11px] font-mono text-primary">Atlas · {station.confidence}%</span>
                  </div>
                )}
              </div>
              <p className="text-[14px] text-muted-foreground leading-relaxed">{station.interpretation}</p>
            </div>
          )}

          {/* Findings */}
          {station.findings.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-4">What you should do</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {station.findings.map((finding, i) => {
                  const Icon = findingIcon[finding.type];
                  return (
                    <div key={i} className="flex gap-3 p-4 audit-surface-sunken">
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", findingColor[finding.type])} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* font-semibold for findings */}
                          <p className="text-[14px] font-semibold text-foreground">{finding.title}</p>
                          {finding.isoClause && (
                            <a
                              href={`https://www.iso.org/standard/62085.html`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono px-1.5 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                              title={`ISO 9001:2015 Clause ${finding.isoClause}`}
                            >
                              §{finding.isoClause}
                            </a>
                          )}
                        </div>
                        {depth !== 'executive' && (
                          <p className="text-[13px] font-light text-muted-foreground mt-1 leading-relaxed">{finding.description}</p>
                        )}
                        {finding.ncrId && (
                          <span className="inline-block mt-1.5 text-[11px] font-mono font-bold px-2 py-0.5 bg-destructive/10 text-destructive">{finding.ncrId}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-Categories with enriched data */}
          {station.subCategories && station.subCategories.length > 0 && depth !== 'executive' && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4">Process Element Breakdown</h4>
              <div className="space-y-3">
                {station.subCategories.map(sub => {
                  const subHealthColor = sub.health === 'green' ? 'hsl(155, 24%, 55%)' : sub.health === 'amber' ? 'hsl(24, 72%, 63%)' : sub.health === 'red' ? 'hsl(0, 48%, 46%)' : 'hsl(0, 0%, 75%)';
                  return (
                    <div key={sub.id} className="audit-surface-sunken p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: subHealthColor }} />
                          <span className="text-[14px] font-medium text-foreground">{sub.label}</span>
                        </div>
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: subHealthColor }}>{sub.score}/100</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${sub.score}%`, background: subHealthColor }} />
                      </div>
                      {sub.findings.map((f, fi) => {
                        const FIcon = findingIcon[f.type];
                        return (
                          <div key={fi} className="flex items-start gap-2 text-[13px]">
                            <FIcon className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", findingColor[f.type])} />
                            <span className="text-charcoal"><strong>{f.title}</strong> — {f.description}</span>
                          </div>
                        );
                      })}
                      {depth === 'full' && (
                        <div className="flex gap-2 p-3  bg-primary/5 border border-primary/10">
                          <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Atlas AI · {sub.aiConfidence}%</span>
                            <p className="text-[12px] text-charcoal leading-relaxed mt-1">{sub.aiInsight}</p>
                          </div>
                        </div>
                      )}
                      {/* Evidence */}
                      {sub.evidence && sub.evidence.length > 0 && (
                        <EvidenceGrid evidence={sub.evidence} />
                      )}
                      {/* AI Patterns & Predictions */}
                      {sub.aiPatterns && sub.aiPatterns.length > 0 && depth === 'full' && (
                        <AIPatternsList patterns={sub.aiPatterns} />
                      )}
                      {/* BMW Impact */}
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
          {station.atlasInsights && station.atlasInsights.length > 0 && depth !== 'executive' && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" /> Atlas Intelligence
              </h4>
              <div className="space-y-3">
                {station.atlasInsights.map((insight, ii) => {
                  const ic = impactRatingColor[insight.impact];
                  return (
                    <div key={ii} className=" border border-primary/15 bg-primary/3 p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider" style={{ background: `${ic}15`, color: ic }}>{insight.impact}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">{insight.confidence}% conf.</span>
                        {insight.dataPointsAnalyzed && <span className="text-[10px] text-muted-foreground">{insight.dataPointsAnalyzed.toLocaleString()} data points</span>}
                      </div>
                      <p className="text-[14px] font-medium text-foreground mb-1">{insight.title}</p>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">{insight.body}</p>
                      {insight.connectedNCRs && insight.connectedNCRs.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {insight.connectedNCRs.map(n => <span key={n} className="text-[10px] font-mono px-2 py-0.5 rounded bg-destructive/10 text-destructive">{n}</span>)}
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
            <div className="border-t border-border pt-6">
              <button onClick={() => setQuestionsOpen(!questionsOpen)} className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors mb-4">
                <BookOpen className="w-4 h-4" />
                <span>ISO 9001 Audit Checklist — {station.auditQuestions!.length} questions</span>
                {questionsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {questionsOpen && (
                <div className="space-y-2">
                  {station.auditQuestions!.map((q) => (
                    <div key={q.id} className="flex gap-3 p-3  border border-border bg-muted">
                      <div className="shrink-0 w-10 text-center">
                        <span className={cn("text-[18px] font-mono font-light tabular-nums", scoreColor(q.score))}>{q.score ?? '—'}</span>
                        <div className="w-full h-1 rounded-full bg-border mt-1 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(q.score ?? 0) * 10}%`, background: scoreBar(q.score) }} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-border text-muted-foreground">§{q.clause}</span>
                          <span className="text-[10px] font-mono text-grey-mid">{q.id}</span>
                        </div>
                        <p className="text-[13px] text-foreground leading-snug">{q.question}</p>
                        <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{q.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Evidence footer */}
          {(station.evidenceCount.photos > 0 || station.evidenceCount.measurements > 0 || station.evidenceCount.videos > 0) && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                {station.evidenceCount.photos > 0 && <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /> {station.evidenceCount.photos} photos</span>}
                {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {station.evidenceCount.measurements} measurements</span>}
                {station.evidenceCount.videos > 0 && <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {station.evidenceCount.videos} video</span>}
              </div>
              <button className="text-[12px] text-primary hover:text-primary/80 transition-colors font-medium">View evidence →</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
