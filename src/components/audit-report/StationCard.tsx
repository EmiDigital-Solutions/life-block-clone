import { cn } from "@/lib/utils";
import type { Station, DepthLevel, FindingSeverity } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { CheckCircle2, Circle, Triangle, Diamond, Square, Minus, Camera, Ruler, Video, Sparkles } from "lucide-react";

const findingIcon: Record<FindingSeverity, React.ElementType> = {
  pass: CheckCircle2,
  observation: Circle,
  concern: Triangle,
  'minor-ncr': Diamond,
  'major-ncr': Square,
  na: Minus,
};

const findingColor: Record<FindingSeverity, string> = {
  pass: 'text-[#22D3A5]',
  observation: 'text-[#A1A5B7]',
  concern: 'text-[#F5B544]',
  'minor-ncr': 'text-[#FF7A59]',
  'major-ncr': 'text-[#F04464]',
  na: 'text-[#6B7085]',
};

const healthBorder: Record<string, string> = {
  green: 'border-[#22D3A5]/20',
  amber: 'border-[#F5B544]/20',
  red: 'border-[#F04464]/20',
  grey: 'border-white/[0.08]',
};

const healthChip: Record<string, string> = {
  green: 'bg-[#22D3A5]/10 text-[#22D3A5]',
  amber: 'bg-[#F5B544]/10 text-[#F5B544]',
  red: 'bg-[#F04464]/10 text-[#F04464]',
  grey: 'bg-white/[0.06] text-[#6B7085]',
};

interface StationCardProps {
  station: Station;
  depth: DepthLevel;
  totalStations: number;
}

export default function StationCard({ station, depth, totalStations }: StationCardProps) {
  // Skip hero and non-content stations
  if (!station.observation && station.index !== 10 && station.index !== 11 && station.index !== 12) return null;

  return (
    <section
      id={`station-${station.index}`}
      className="scroll-mt-20"
    >
      {/* Progress ribbon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-[2px] flex-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-[#22D3A5]"
            style={{ width: `${(station.index / totalStations) * 100}%` }}
          />
        </div>
        <span className="text-[12px] font-mono text-[#6B7085] whitespace-nowrap">
          {String(station.index).padStart(2, '0')} of {totalStations}
        </span>
      </div>

      {/* Station header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[32px] font-semibold text-[#F5F6FA] tracking-tight leading-none">
          {station.name}
        </span>
        <span className={cn("text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold", healthChip[station.health])}>
          {station.health === 'green' ? 'Pass' : station.health === 'amber' ? 'Concern' : station.health === 'red' ? 'Fail' : 'N/A'}
        </span>
      </div>

      {/* Three-beat rhythm */}
      {station.observation && (
        <div className={cn("rounded-2xl border p-6 md:p-8 space-y-8", healthBorder[station.health], "bg-white/[0.02]")}>
          {/* Hero photo placeholder */}
          <div className="aspect-video rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-8 h-8 text-[#6B7085] mx-auto mb-2" />
              <span className="text-[13px] text-[#6B7085]">Factory photo — Station {station.index}</span>
            </div>
          </div>

          {/* WHAT WE SAW */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-3">What we saw</h4>
            <p className="text-[16px] text-[#F5F6FA] leading-relaxed">{station.observation}</p>
          </div>

          {/* WHAT IT MEANS */}
          {depth !== 'executive' && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">What it means</h4>
                {station.confidence > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.06]">
                    <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                    <span className="text-[11px] font-mono text-[#A1A5B7]">Atlas · {station.confidence}%</span>
                    <div className="w-12 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${station.confidence}%`,
                          background: station.confidence >= 70
                            ? 'linear-gradient(90deg, #22D3EE, #22D3A5)'
                            : '#6B7085',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[15px] text-[#A1A5B7] leading-relaxed">{station.interpretation}</p>
            </div>
          )}

          {/* WHAT YOU SHOULD DO — Findings */}
          {station.findings.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-4">What you should do</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {station.findings.map((finding, i) => {
                  const Icon = findingIcon[finding.type];
                  return (
                    <div key={i} className="flex gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", findingColor[finding.type])} />
                      <div>
                        <p className="text-[14px] font-medium text-[#F5F6FA]">{finding.title}</p>
                        {depth !== 'executive' && (
                          <p className="text-[13px] text-[#A1A5B7] mt-1">{finding.description}</p>
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
              {station.ncrs.map(ncr => (
                <NCRCard key={ncr.id} ncr={ncr} />
              ))}
            </div>
          )}

          {/* Evidence footer */}
          {(station.evidenceCount.photos > 0 || station.evidenceCount.measurements > 0 || station.evidenceCount.videos > 0) && (
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-4 text-[12px] text-[#6B7085]">
                {station.evidenceCount.photos > 0 && (
                  <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /> {station.evidenceCount.photos} photos</span>
                )}
                {station.evidenceCount.measurements > 0 && (
                  <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {station.evidenceCount.measurements} measurements</span>
                )}
                {station.evidenceCount.videos > 0 && (
                  <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {station.evidenceCount.videos} video</span>
                )}
              </div>
              <button className="text-[12px] text-[#22D3EE] hover:text-[#22D3A5] transition-colors font-medium">
                View evidence →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
