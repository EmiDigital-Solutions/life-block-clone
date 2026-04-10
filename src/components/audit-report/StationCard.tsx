import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Station, DepthLevel, FindingSeverity, SubCategory, AtlasAIInsight, AIPattern, BMWImpact, SubCategoryEvidence } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { CheckCircle2, Circle, Triangle, Diamond, Square, Minus, Camera, Ruler, Video, Sparkles, ChevronDown, ChevronRight, BookOpen, Brain, AlertTriangle, TrendingUp, FileText, Image, Film, Gauge, Clock, DollarSign, Zap, Eye } from "lucide-react";

const findingIcon: Record<FindingSeverity, React.ElementType> = {
  pass: CheckCircle2, observation: Circle, concern: Triangle, 'minor-ncr': Diamond, 'major-ncr': Square, na: Minus,
};
const findingColor: Record<FindingSeverity, string> = {
  pass: 'text-[#6EA996]', observation: 'text-[#7B8E80]', concern: 'text-[#E39B5C]',
  'minor-ncr': 'text-[#E39B5C]', 'major-ncr': 'text-[#AD3D3D]', na: 'text-[#C0C0C0]',
};
const healthChip: Record<string, string> = {
  green: 'bg-[#6EA996]/10 text-[#6EA996]', amber: 'bg-[#E39B5C]/10 text-[#E39B5C]',
  red: 'bg-[#AD3D3D]/10 text-[#AD3D3D]', grey: 'bg-[#F5F5F5] text-[#C0C0C0]',
};
const scoreColor = (score: number | null) => {
  if (score === null) return 'text-[#C0C0C0]';
  if (score >= 8) return 'text-[#6EA996]';
  if (score >= 6) return 'text-[#E39B5C]';
  return 'text-[#AD3D3D]';
};
const scoreBar = (score: number | null) => {
  if (score === null) return '#C0C0C0';
  if (score >= 8) return '#6EA996';
  if (score >= 6) return '#E39B5C';
  return '#AD3D3D';
};
const impactRatingColor: Record<string, string> = {
  critical: '#AD3D3D', high: '#E39B5C', medium: '#D4A843', low: '#6EA996', none: '#C0C0C0',
};
const evidenceTypeIcon: Record<string, React.ElementType> = {
  photo: Image, document: FileText, video: Film, measurement: Gauge,
};

// ─── Sub-components ─────────────────────────────────────────

function EvidenceGrid({ evidence }: { evidence: SubCategoryEvidence[] }) {
  return (
    <div className="mt-3">
      <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">Evidence</span>
      <div className="flex flex-wrap gap-2 mt-1.5">
        {evidence.map(ev => {
          const Icon = evidenceTypeIcon[ev.type] || FileText;
          return (
            <button key={ev.id} className="flex items-center gap-1.5 px-2.5 py-1.5  border border-[#E5E7EB] bg-white hover:bg-[#F5F5F5] transition-colors text-[11px] text-[#1A1A1A]">
              <Icon className="w-3 h-3 text-[#0A7FA5]" />
              <span className="max-w-[160px] truncate">{ev.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AIPatternsList({ patterns }: { patterns: AIPattern[] }) {
  return (
    <div className="mt-3 space-y-2">
      <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-[#0A7FA5]" /> AI-Identified Patterns & Predictions
      </span>
      {patterns.map(p => {
        const color = impactRatingColor[p.impact];
        return (
          <div key={p.id} className=" border border-[#0A7FA5]/10 bg-[#0A7FA5]/3 p-3">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider" style={{ background: `${color}15`, color }}>{p.type}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#7B8E80] font-mono">{p.confidence}%</span>
              {p.timeframe && <span className="text-[9px] text-[#7B8E80]">⏱ {p.timeframe}</span>}
            </div>
            <p className="text-[12px] font-medium text-[#0A0A0A]">{p.title}</p>
            <p className="text-[11px] text-[#7B8E80] leading-relaxed mt-0.5">{p.body}</p>
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
      <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3 text-[#E39B5C]" /> BMW Impact Assessment
      </span>
      <div className="grid grid-cols-3 gap-2 mt-1.5">
        {items.map(({ key, label, icon: Icon, data }) => {
          const color = impactRatingColor[data.rating];
          return (
            <div key={key} className=" border border-[#E5E7EB] bg-white p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3 h-3" style={{ color }} />
                <span className="text-[10px] font-semibold text-[#0A0A0A]">{label}</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ml-auto" style={{ background: `${color}15`, color }}>{data.rating}</span>
              </div>
              <p className="text-[10px] text-[#7B8E80] leading-relaxed">{data.detail}</p>
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
      {/* Sticky section header */}
      <div className="sticky top-12 z-20 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] -mx-4 md:-mx-8 px-4 md:px-8 py-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// {String(station.index).padStart(2, '0')}</span>
          <div className={cn("w-2 h-2", station.health === 'green' ? 'bg-[#6EA996]' : station.health === 'amber' ? 'bg-[#E39B5C]' : station.health === 'red' ? 'bg-[#AD3D3D]' : 'bg-[#C0C0C0]')} />
          <span className="text-[13px] font-semibold text-[#0A0A0A]">{station.name}</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className={cn("text-[10px] px-2.5 py-1 uppercase tracking-wider font-semibold", healthChip[station.health])}>
            {station.health === 'green' ? 'Pass' : station.health === 'amber' ? 'Concern' : station.health === 'red' ? 'Fail' : 'N/A'}
          </span>
          {/* Evidence count summary */}
          <div className="flex items-center gap-2 text-[10px] text-[#7B8E80]">
            {station.evidenceCount.photos > 0 && <span className="flex items-center gap-0.5"><Camera className="w-3 h-3" />{station.evidenceCount.photos}</span>}
            {station.evidenceCount.videos > 0 && <span className="flex items-center gap-0.5"><Video className="w-3 h-3" />{station.evidenceCount.videos}</span>}
            {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-0.5"><Ruler className="w-3 h-3" />{station.evidenceCount.measurements}</span>}
          </div>
        </div>
      </div>

      <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none mb-8">{station.name}</h2>

      {station.observation && (
        <div className=" border border-[#E5E7EB] bg-white p-6 md:p-8 space-y-8">
          {/* Hero photo */}
          {station.heroPhoto ? (
            <div className="aspect-video  overflow-hidden border border-[#E5E7EB]">
              <img src={station.heroPhoto} alt={`Factory photo — ${station.name}`} className="w-full h-full object-cover" loading="lazy" width={960} height={540} />
            </div>
          ) : (
            <div className="aspect-video  bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-[#C0C0C0] mx-auto mb-2" />
                <span className="text-[13px] text-[#7B8E80]">Factory photo — Station {station.index}</span>
              </div>
            </div>
          )}

          {/* WHAT WE SAW */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#7B8E80] font-semibold mb-3">What we saw</h4>
            <p className="text-[15px] text-[#1A1A1A] leading-relaxed">{station.observation}</p>
          </div>

          {/* WHAT IT MEANS */}
          {depth !== 'executive' && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#7B8E80] font-semibold">What it means</h4>
                {station.confidence > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0A7FA5]/5">
                    <Sparkles className="w-3 h-3 text-[#0A7FA5]" />
                    <span className="text-[11px] font-mono text-[#0A7FA5]">Atlas · {station.confidence}%</span>
                  </div>
                )}
              </div>
              <p className="text-[14px] text-[#7B8E80] leading-relaxed">{station.interpretation}</p>
            </div>
          )}

          {/* Findings */}
          {station.findings.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#7B8E80] font-semibold mb-4">What you should do</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {station.findings.map((finding, i) => {
                  const Icon = findingIcon[finding.type];
                  return (
                    <div key={i} className="flex gap-3 p-4  border border-[#E5E7EB] bg-[#F5F5F5]">
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", findingColor[finding.type])} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-medium text-[#0A0A0A]">{finding.title}</p>
                          {finding.isoClause && depth === 'full' && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E5E7EB] text-[#7B8E80] shrink-0">§{finding.isoClause}</span>
                          )}
                        </div>
                        {depth !== 'executive' && (
                          <p className="text-[13px] text-[#7B8E80] mt-1 leading-relaxed">{finding.description}</p>
                        )}
                        {finding.ncrId && (
                          <span className="inline-block mt-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-[#AD3D3D]/10 text-[#AD3D3D]">{finding.ncrId}</span>
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
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-4">Process Element Breakdown</h4>
              <div className="space-y-3">
                {station.subCategories.map(sub => {
                  const subHealthColor = sub.health === 'green' ? '#6EA996' : sub.health === 'amber' ? '#E39B5C' : sub.health === 'red' ? '#AD3D3D' : '#C0C0C0';
                  return (
                    <div key={sub.id} className=" border border-[#E5E7EB] bg-[#F5F5F5] p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: subHealthColor }} />
                          <span className="text-[14px] font-medium text-[#0A0A0A]">{sub.label}</span>
                        </div>
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: subHealthColor }}>{sub.score}/100</span>
                      </div>
                      <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${sub.score}%`, background: subHealthColor }} />
                      </div>
                      {sub.findings.map((f, fi) => {
                        const FIcon = findingIcon[f.type];
                        return (
                          <div key={fi} className="flex items-start gap-2 text-[13px]">
                            <FIcon className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", findingColor[f.type])} />
                            <span className="text-[#1A1A1A]"><strong>{f.title}</strong> — {f.description}</span>
                          </div>
                        );
                      })}
                      {depth === 'full' && (
                        <div className="flex gap-2 p-3  bg-[#0A7FA5]/5 border border-[#0A7FA5]/10">
                          <Sparkles className="w-3.5 h-3.5 text-[#0A7FA5] mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0A7FA5]">Atlas AI · {sub.aiConfidence}%</span>
                            <p className="text-[12px] text-[#1A1A1A] leading-relaxed mt-1">{sub.aiInsight}</p>
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
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#0A7FA5]" /> Atlas Intelligence
              </h4>
              <div className="space-y-3">
                {station.atlasInsights.map((insight, ii) => {
                  const ic = impactRatingColor[insight.impact];
                  return (
                    <div key={ii} className=" border border-[#0A7FA5]/15 bg-[#0A7FA5]/3 p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider" style={{ background: `${ic}15`, color: ic }}>{insight.impact}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#7B8E80] font-mono">{insight.confidence}% conf.</span>
                        {insight.dataPointsAnalyzed && <span className="text-[10px] text-[#7B8E80]">{insight.dataPointsAnalyzed.toLocaleString()} data points</span>}
                      </div>
                      <p className="text-[14px] font-medium text-[#0A0A0A] mb-1">{insight.title}</p>
                      <p className="text-[13px] text-[#7B8E80] leading-relaxed">{insight.body}</p>
                      {insight.connectedNCRs && insight.connectedNCRs.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {insight.connectedNCRs.map(n => <span key={n} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#AD3D3D]/10 text-[#AD3D3D]">{n}</span>)}
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
            <div className="border-t border-[#E5E7EB] pt-6">
              <button onClick={() => setQuestionsOpen(!questionsOpen)} className="flex items-center gap-2 text-[13px] font-medium text-[#7B8E80] hover:text-[#0A0A0A] transition-colors mb-4">
                <BookOpen className="w-4 h-4" />
                <span>ISO 9001 Audit Checklist — {station.auditQuestions!.length} questions</span>
                {questionsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {questionsOpen && (
                <div className="space-y-2">
                  {station.auditQuestions!.map((q) => (
                    <div key={q.id} className="flex gap-3 p-3  border border-[#E5E7EB] bg-[#F5F5F5]">
                      <div className="shrink-0 w-10 text-center">
                        <span className={cn("text-[18px] font-mono font-light tabular-nums", scoreColor(q.score))}>{q.score ?? '—'}</span>
                        <div className="w-full h-1 rounded-full bg-[#E5E7EB] mt-1 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(q.score ?? 0) * 10}%`, background: scoreBar(q.score) }} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E5E7EB] text-[#7B8E80]">§{q.clause}</span>
                          <span className="text-[10px] font-mono text-[#C0C0C0]">{q.id}</span>
                        </div>
                        <p className="text-[13px] text-[#0A0A0A] leading-snug">{q.question}</p>
                        <p className="text-[12px] text-[#7B8E80] mt-1 leading-relaxed">{q.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Evidence footer */}
          {(station.evidenceCount.photos > 0 || station.evidenceCount.measurements > 0 || station.evidenceCount.videos > 0) && (
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-4 text-[12px] text-[#7B8E80]">
                {station.evidenceCount.photos > 0 && <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /> {station.evidenceCount.photos} photos</span>}
                {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {station.evidenceCount.measurements} measurements</span>}
                {station.evidenceCount.videos > 0 && <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {station.evidenceCount.videos} video</span>}
              </div>
              <button className="text-[12px] text-[#0A7FA5] hover:text-[#087A9E] transition-colors font-medium">View evidence →</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
