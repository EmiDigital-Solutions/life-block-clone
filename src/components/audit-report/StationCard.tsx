import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Station, DepthLevel, FindingSeverity, SubCategory, AtlasAIInsight } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { CheckCircle2, Circle, Triangle, Diamond, Square, Minus, Camera, Ruler, Video, Sparkles, ChevronDown, ChevronRight, BookOpen, Brain, AlertTriangle, TrendingUp } from "lucide-react";

const findingIcon: Record<FindingSeverity, React.ElementType> = {
  pass: CheckCircle2, observation: Circle, concern: Triangle, 'minor-ncr': Diamond, 'major-ncr': Square, na: Minus,
};

const findingColor: Record<FindingSeverity, string> = {
  pass: 'text-[#6EA996]', observation: 'text-[#7B8E80]', concern: 'text-[#E39B5C]',
  'minor-ncr': 'text-[#E39B5C]', 'major-ncr': 'text-[#AD3D3D]', na: 'text-[#C0C0C0]',
};

const healthChip: Record<string, string> = {
  green: 'bg-[#6EA996]/10 text-[#6EA996]',
  amber: 'bg-[#E39B5C]/10 text-[#E39B5C]',
  red: 'bg-[#AD3D3D]/10 text-[#AD3D3D]',
  grey: 'bg-[#F5F5F5] text-[#C0C0C0]',
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
      {/* Section marker */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// {String(station.index).padStart(2, '0')}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">{station.name}</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className={cn("text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold", healthChip[station.health])}>
          {station.health === 'green' ? 'Pass' : station.health === 'amber' ? 'Concern' : station.health === 'red' ? 'Fail' : 'N/A'}
        </span>
      </div>

      {/* Station header */}
      <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none mb-8">
        {station.name}
      </h2>

      {station.observation && (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 space-y-8">
          {/* Hero photo */}
          {station.heroPhoto ? (
            <div className="aspect-video rounded-lg overflow-hidden border border-[#E5E7EB]">
              <img src={station.heroPhoto} alt={`Factory photo — ${station.name}`} className="w-full h-full object-cover" loading="lazy" width={960} height={540} />
            </div>
          ) : (
            <div className="aspect-video rounded-lg bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center">
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
                    <div key={i} className="flex gap-3 p-4 rounded-lg border border-[#E5E7EB] bg-[#F5F5F5]">
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

          {/* NCR Cards */}
          {station.ncrs.length > 0 && (
            <div className="space-y-4">
              {station.ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
            </div>
          )}

          {/* Audit Questions */}
          {hasQuestions && depth === 'full' && (
            <div className="border-t border-[#E5E7EB] pt-6">
              <button
                onClick={() => setQuestionsOpen(!questionsOpen)}
                className="flex items-center gap-2 text-[13px] font-medium text-[#7B8E80] hover:text-[#0A0A0A] transition-colors mb-4"
              >
                <BookOpen className="w-4 h-4" />
                <span>ISO 9001 Audit Checklist — {station.auditQuestions!.length} questions</span>
                {questionsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {questionsOpen && (
                <div className="space-y-2">
                  {station.auditQuestions!.map((q) => (
                    <div key={q.id} className="flex gap-3 p-3 rounded-lg border border-[#E5E7EB] bg-[#F5F5F5]">
                      <div className="shrink-0 w-10 text-center">
                        <span className={cn("text-[18px] font-mono font-light tabular-nums", scoreColor(q.score))}>
                          {q.score ?? '—'}
                        </span>
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
              <button className="text-[12px] text-[#0A7FA5] hover:text-[#087A9E] transition-colors font-medium">
                View evidence →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
