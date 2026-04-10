import { cn } from "@/lib/utils";
import type { Station, NCR } from "@/data/auditReportData";
import { stations, allNCRs } from "@/data/auditReportData";
import { X, AlertTriangle } from "lucide-react";

const severityDot: Record<string, string> = {
  minor: 'bg-[#E39B5C]',
  major: 'bg-[#AD3D3D]',
};

const healthLabel: Record<string, { label: string; color: string }> = {
  green: { label: 'Conforming', color: '#6EA996' },
  amber: { label: 'Observation', color: '#E39B5C' },
  red: { label: 'Critical', color: '#AD3D3D' },
  grey: { label: 'N/A', color: '#C0C0C0' },
};

function gradeFromScore(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

function riskFromHealth(health: string): { label: string; color: string } {
  if (health === 'red') return { label: 'High', color: '#AD3D3D' };
  if (health === 'amber') return { label: 'Medium', color: '#E39B5C' };
  return { label: 'Low', color: '#6EA996' };
}

interface SectionInspectorProps {
  activeStation: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function SectionInspector({ activeStation, isOpen, onClose }: SectionInspectorProps) {
  const station = stations.find(s => s.index === activeStation);
  if (!station) return null;

  const stationNCRs = allNCRs.filter(n => n.stationIndex === activeStation);
  const hl = healthLabel[station.health];
  const risk = riskFromHealth(station.health);
  const avgScore = station.auditQuestions && station.auditQuestions.length > 0
    ? Math.round(station.auditQuestions.reduce((s, q) => s + (q.score || 0), 0) / station.auditQuestions.length * 10)
    : null;

  const timelineEvents = [
    { time: '08 apr · 09:14', label: 'Audit started', color: '#6EA996' },
    { time: '08 apr · 11:12', label: `Entered ${station.name.toLowerCase()}`, color: '#6EA996' },
    ...(stationNCRs.length > 0 ? stationNCRs.map(n => ({
      time: '08 apr · 11:42',
      label: `${n.id} raised`,
      color: '#0A7FA5',
    })) : []),
    { time: '08 apr · 12:20', label: `Exit ${station.name.toLowerCase()}`, color: '#C0C0C0' },
  ];

  return (
    <aside className={cn(
      "flex flex-col border-l border-[#E5E7EB] bg-white transition-all duration-300 overflow-hidden",
      isOpen ? "w-[320px] xl:w-[340px] opacity-100" : "w-0 opacity-0"
    )}>
      {/* Auto-save */}
      <div className="text-right px-4 pt-3 pb-1">
        <span className="text-[11px] text-[#7B8E80]">Last saved <span className="text-[#0A7FA5]">2 min ago</span> · Auto-save on</span>
      </div>

      {/* Header */}
      <div className="px-5 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80]">Section Inspector</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#F5F5F5] text-[#C0C0C0] hover:text-[#0A0A0A] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <h3 className="text-[16px] font-semibold text-[#0A0A0A] mt-1">
          5.{activeStation > 1 ? activeStation - 1 : 1} · {station.name}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Properties */}
        <div className="px-5 py-4 border-b border-[#E5E7EB]">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80] mb-3 block">Properties</span>
          <div className="space-y-2.5">
            <PropertyRow label="Section id" value={`5.${activeStation > 1 ? activeStation - 1 : 1}`} />
            <PropertyRow label="Process element" value={`P${Math.min(activeStation + 3, 7)} · ${station.name}`} valueColor="#0A7FA5" />
            <PropertyRow label="Standard" value="VDA 6.3" valueColor="#0A7FA5" />
            <PropertyRow label="Classification" value={hl.label} valueColor={hl.color} />
            <PropertyRow label="Score" value={avgScore ? `${avgScore} / 100` : '—'} valueColor={avgScore && avgScore >= 70 ? '#6EA996' : '#E39B5C'} />
            <PropertyRow label="Grade" value={avgScore ? gradeFromScore(avgScore) : '—'} />
            <PropertyRow label="Risk" value={risk.label} valueColor={risk.color} />
            <PropertyRow label="Created" value="2026-04-08 11:12" valueColor="#0A7FA5" />
            <PropertyRow label="Last modified" value="2026-04-08 16:44" valueColor="#0A7FA5" />
          </div>
        </div>

        {/* Linked NCRs */}
        {stationNCRs.length > 0 && (
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80] mb-3 block">Linked NCRs</span>
            <div className="space-y-2">
              {stationNCRs.map(ncr => (
                <div key={ncr.id} className="flex items-center gap-3 py-1.5">
                  <div className={cn("w-5 h-5 rounded flex items-center justify-center", ncr.severity === 'major' ? 'bg-[#AD3D3D]/10' : 'bg-[#E39B5C]/10')}>
                    <AlertTriangle className="w-3 h-3" style={{ color: ncr.severity === 'major' ? '#AD3D3D' : '#E39B5C' }} />
                  </div>
                  <span className="text-[13px] font-medium text-[#0A0A0A] flex-1">{ncr.id} · {ncr.title.toLowerCase().split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[12px] text-[#7B8E80] capitalize">{ncr.severity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Linked Evidence */}
        {(station.evidenceCount.photos > 0 || station.evidenceCount.measurements > 0 || station.evidenceCount.videos > 0) && (
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80] mb-3 block">Linked Evidence</span>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: Math.min(station.evidenceCount.photos, 4) }).map((_, i) => (
                <div key={i} className="aspect-square  bg-gradient-to-br from-[#ACC5D9]/30 to-[#B2CDBC]/20 border border-[#E5E7EB] flex items-end p-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0A0A0A]/60 text-white">
                    PHO-{String(27 + i).padStart(3, '0')}
                  </span>
                </div>
              ))}
              {station.evidenceCount.videos > 0 && (
                <div className="aspect-square  bg-gradient-to-br from-[#ACC5D9]/20 to-[#B2CDBC]/10 border border-[#E5E7EB] flex items-end p-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0A0A0A]/60 text-white">
                    VID-002
                  </span>
                </div>
              )}
              {(station.evidenceCount.photos + station.evidenceCount.measurements + station.evidenceCount.videos) > 5 && (
                <div className="aspect-square  bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center">
                  <span className="text-[12px] font-medium text-[#7B8E80]">
                    +{station.evidenceCount.photos + station.evidenceCount.measurements + station.evidenceCount.videos - 5}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Audit Timeline */}
        <div className="px-5 py-4">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80] mb-3 block">Audit Timeline</span>
          <div className="space-y-0">
            {timelineEvents.map((evt, i) => (
              <div key={i} className="flex gap-3 py-2">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5" style={{ background: evt.color }} />
                  {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB] mt-1" />}
                </div>
                <div>
                  <span className="text-[11px] text-[#7B8E80] block">{evt.time}</span>
                  <span className="text-[13px] text-[#0A0A0A] font-medium">{evt.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function PropertyRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-[#7B8E80]">{label}</span>
      <span className="text-[13px] font-medium tabular-nums" style={{ color: valueColor || '#0A0A0A' }}>{value}</span>
    </div>
  );
}
