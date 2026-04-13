import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { X, AlertTriangle } from "lucide-react";

const healthLabel: Record<string, { label: string; color: string }> = {
  green: { label: 'Conforming', color: 'hsl(155, 24%, 45%)' },
  amber: { label: 'Observation', color: 'hsl(24, 72%, 53%)' },
  red: { label: 'Critical', color: 'hsl(0, 48%, 46%)' },
  grey: { label: 'N/A', color: 'hsl(220, 10%, 50%)' },
};

function riskFromHealth(health: string) {
  if (health === 'red') return { label: 'High', color: 'hsl(0, 48%, 46%)' };
  if (health === 'amber') return { label: 'Medium', color: 'hsl(24, 72%, 53%)' };
  return { label: 'Low', color: 'hsl(155, 24%, 45%)' };
}

interface SectionInspectorProps {
  activeStation: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function SectionInspector({ activeStation, isOpen, onClose }: SectionInspectorProps) {
  const { stations, allNCRs } = useAuditReportContext();
  const station = stations.find(s => s.index === activeStation);
  if (!station) return null;

  const stationNCRs = allNCRs.filter(n => n.stationIndex === activeStation);
  const hl = healthLabel[station.health];
  const risk = riskFromHealth(station.health);
  const avgScore = station.auditQuestions && station.auditQuestions.length > 0
    ? Math.round(station.auditQuestions.reduce((s, q) => s + (q.score || 0), 0) / station.auditQuestions.length * 10)
    : null;

  return (
    <aside className={cn(
      "flex flex-col transition-all duration-300 overflow-hidden",
      isOpen ? "w-[300px] xl:w-[320px] opacity-100" : "w-0 opacity-0"
    )} style={{ background: 'hsl(220, 18%, 13%)', borderLeft: '1px solid hsl(220, 14%, 18%)' }}>

      {/* Header */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid hsl(220, 14%, 20%)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/40">Inspector</span>
          <button onClick={onClose} className="p-1 cursor-pointer">
            <X className="w-4 h-4 text-white/30 hover:text-white/60 transition-colors" />
          </button>
        </div>
        <h3 className="text-[15px] font-semibold text-white/90">
          {station.name}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Properties */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid hsl(220, 14%, 20%)' }}>
          <div className="space-y-3">
            <PropRow label="Classification" value={hl.label} color={hl.color} />
            <PropRow label="Risk level" value={risk.label} color={risk.color} />
            <PropRow label="Score" value={avgScore ? `${avgScore}/100` : '—'} color={avgScore && avgScore >= 70 ? 'hsl(155, 24%, 50%)' : 'hsl(24, 72%, 58%)'} />
            <PropRow label="Standard" value="VDA 6.3" />
            <PropRow label="Evidence" value={`${station.evidenceCount.photos + station.evidenceCount.measurements + station.evidenceCount.videos} files`} />
          </div>
        </div>

        {/* NCRs */}
        {stationNCRs.length > 0 && (
          <div className="px-5 py-5" style={{ borderBottom: '1px solid hsl(220, 14%, 20%)' }}>
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 block mb-3">NCRs</span>
            <div className="space-y-2">
              {stationNCRs.map(ncr => (
                <div key={ncr.id} className="flex items-center gap-3 p-3" style={{ background: 'hsl(220, 14%, 18%)', border: '1px solid hsl(220, 14%, 22%)' }}>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: ncr.severity === 'major' ? 'hsl(0, 48%, 50%)' : 'hsl(24, 72%, 58%)' }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] font-mono text-white/50 block">{ncr.id}</span>
                    <span className="text-[13px] text-white/80 truncate block">{ncr.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evidence thumbnails */}
        {station.evidenceCount.photos > 0 && (
          <div className="px-5 py-5">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 block mb-3">Evidence</span>
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: Math.min(station.evidenceCount.photos, 6) }).map((_, i) => (
                <div key={i} className="aspect-square" style={{ background: 'hsl(220, 14%, 18%)', border: '1px solid hsl(220, 14%, 22%)' }}>
                  <div className="w-full h-full flex items-end p-1.5">
                    <span className="text-[9px] font-mono text-white/30">PHO-{String(27 + i).padStart(3, '0')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function PropRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-white/40">{label}</span>
      <span className="text-[13px] font-medium" style={{ color: color || 'hsl(0, 0%, 85%)' }}>{value}</span>
    </div>
  );
}