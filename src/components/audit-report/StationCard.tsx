import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Station, DepthLevel, FindingSeverity } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { CheckCircle2, Circle, Triangle, Diamond, Square, Minus, Camera, Ruler, Video, Sparkles, ChevronDown, ChevronRight, BookOpen } from "lucide-react";

const findingIcon: Record<FindingSeverity, React.ElementType> = {
  pass: CheckCircle2, observation: Circle, concern: Triangle, 'minor-ncr': Diamond, 'major-ncr': Square, na: Minus,
};

const findingColor: Record<FindingSeverity, string> = {
  pass: 'text-[#10B981]', observation: 'text-[#6B7280]', concern: 'text-[#F59E0B]',
  'minor-ncr': 'text-[#F97316]', 'major-ncr': 'text-[#EF4444]', na: 'text-[#D1D5DB]',
};

const healthChip: Record<string, string> = {
  green: 'bg-[#ECFDF5] text-[#10B981]',
  amber: 'bg-[#FFFBEB] text-[#F59E0B]',
  red: 'bg-[#FEF2F2] text-[#EF4444]',
  grey: 'bg-[#F3F4F6] text-[#9CA3AF]',
};

const scoreColor = (score: number | null) => {
  if (score === null) return 'text-[#D1D5DB]';
  if (score >= 8) return 'text-[#10B981]';
  if (score >= 6) return 'text-[#F59E0B]';
  return 'text-[#EF4444]';
};

const scoreBar = (score: number | null) => {
  if (score === null) return '#D1D5DB';
  if (score >= 8) return '#10B981';
  if (score >= 6) return '#F59E0B';
  return '#EF4444';
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
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#9CA3AF]">// {String(station.index).padStart(2, '0')}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#9CA3AF]">{station.name}</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className={cn("text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold", healthChip[station.health])}>
          {station.health === 'green' ? 'Pass' : station.health === 'amber' ? 'Concern' : station.health === 'red' ? 'Fail' : 'N/A'}
        </span>
      </div>

      {/* Station header */}
      <h2 className="text-[32px] font-light text-[#111827] tracking-tight leading-none mb-8">
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
            <div className="aspect-video rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
                <span className="text-[13px] text-[#9CA3AF]">Factory photo — Station {station.index}</span>
              </div>
            </div>
          )}

          {/* WHAT WE SAW */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-3">What we saw</h4>
            <p className="text-[15px] text-[#374151] leading-relaxed">{station.observation}</p>
          </div>

          {/* WHAT IT MEANS */}
          {depth !== 'executive' && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">What it means</h4>
                {station.confidence > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EBF0FF]">
                    <Sparkles className="w-3 h-3 text-[#0052FF]" />
                    <span className="text-[11px] font-mono text-[#0052FF]">Atlas · {station.confidence}%</span>
                  </div>
                )}
              </div>
              <p className="text-[14px] text-[#6B7280] leading-relaxed">{station.interpretation}</p>
            </div>
          )}

          {/* Findings */}
          {station.findings.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-4">What you should do</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {station.findings.map((finding, i) => {
                  const Icon = findingIcon[finding.type];
                  return (
                    <div key={i} className="flex gap-3 p-4 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC]">
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", findingColor[finding.type])} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-medium text-[#111827]">{finding.title}</p>
                          {finding.isoClause && depth === 'full' && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#9CA3AF] shrink-0">§{finding.isoClause}</span>
                          )}
                        </div>
                        {depth !== 'executive' && (
                          <p className="text-[13px] text-[#6B7280] mt-1">{finding.description}</p>
                        )}
                        {finding.ncrId && (
                          <span className="inline-block mt-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-[#FEF2F2] text-[#EF4444]">{finding.ncrId}</span>
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
                className="flex items-center gap-2 text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors mb-4"
              >
                <BookOpen className="w-4 h-4" />
                <span>ISO 9001 Audit Checklist — {station.auditQuestions!.length} questions</span>
                {questionsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {questionsOpen && (
                <div className="space-y-2">
                  {station.auditQuestions!.map((q) => (
                    <div key={q.id} className="flex gap-3 p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC]">
                      <div className="shrink-0 w-10 text-center">
                        <span className={cn("text-[18px] font-mono font-light tabular-nums", scoreColor(q.score))}>
                          {q.score ?? '—'}
                        </span>
                        <div className="w-full h-1 rounded-full bg-[#F3F4F6] mt-1 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(q.score ?? 0) * 10}%`, background: scoreBar(q.score) }} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#9CA3AF]">§{q.clause}</span>
                          <span className="text-[10px] font-mono text-[#D1D5DB]">{q.id}</span>
                        </div>
                        <p className="text-[13px] text-[#111827] leading-snug">{q.question}</p>
                        <p className="text-[12px] text-[#9CA3AF] mt-1 leading-relaxed">{q.notes}</p>
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
              <div className="flex items-center gap-4 text-[12px] text-[#9CA3AF]">
                {station.evidenceCount.photos > 0 && <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /> {station.evidenceCount.photos} photos</span>}
                {station.evidenceCount.measurements > 0 && <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {station.evidenceCount.measurements} measurements</span>}
                {station.evidenceCount.videos > 0 && <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {station.evidenceCount.videos} video</span>}
              </div>
              <button className="text-[12px] text-[#0052FF] hover:text-[#0043D6] transition-colors font-medium">
                View evidence →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
