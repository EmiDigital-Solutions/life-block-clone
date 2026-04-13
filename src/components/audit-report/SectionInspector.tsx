import { cn } from "@/lib/utils";
import type { Station, NCR } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { X, AlertTriangle } from "lucide-react";

const severityDot: Record<string, string> = {
  minor: 'bg-[#E39B5C]',
  major: 'bg-[#AD3D3D]',
};

const healthLabel: Record<string, { label: string; color: string }> = {
  green: { label: 'Conforming', color: 'hsl(155, 24%, 55%)' },
  amber: { label: 'Observation', color: 'hsl(24, 72%, 63%)' },
  red: { label: 'Critical', color: 'hsl(0, 48%, 46%)' },
  grey: { label: 'N/A', color: 'hsl(0, 0%, 75%)' },
};

function gradeFromScore(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

function riskFromHealth(health: string): { label: string; color: string } {
  if (health === 'red') return { label: 'High', color: 'hsl(0, 48%, 46%)' };
  if (health === 'amber') return { label: 'Medium', color: 'hsl(24, 72%, 63%)' };
  return { label: 'Low', color: 'hsl(155, 24%, 55%)' };
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

  const timelineEvents = [
    { time: '08 apr · 09:14', label: 'Audit started', color: 'hsl(155, 24%, 55%)' },
    { time: '08 apr · 11:12', label: `Entered ${station.name.toLowerCase()}`, color: 'hsl(155, 24%, 55%)' },
    ...(stationNCRs.length > 0 ? stationNCRs.map(n => ({
      time: '08 apr · 11:42',
      label: `${n.id} raised`,
      color: 'hsl(195, 89%, 34%)',
    })) : []),
    { time: '08 apr · 12:20', label: `Exit ${station.name.toLowerCase()}`, color: 'hsl(0, 0%, 75%)' },
  ];

  return (
    <aside className={cn(
      "flex flex-col border-l border-border bg-white transition-all duration-300 overflow-hidden",
      isOpen ? "w-[320px] xl:w-[340px] opacity-100" : "w-0 opacity-0"
    )}>
      {/* Auto-save */}
      <div className="text-right px-4 pt-3 pb-1">
        <span className="text-[11px] text-muted-foreground">Last saved <span className="text-primary">2 min ago</span> · Auto-save on</span>
      </div>

      {/* Header */}
      <div className="px-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Section Inspector</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted text-grey-mid hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <h3 className="text-[16px] font-semibold text-foreground mt-1">
          5.{activeStation > 1 ? activeStation - 1 : 1} · {station.name}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Properties */}
        <div className="px-5 py-4 border-b border-border">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3 block">Properties</span>
          <div className="space-y-2.5">
            <PropertyRow label="Section id" value={`5.${activeStation > 1 ? activeStation - 1 : 1}`} />
            <PropertyRow label="Process element" value={`P${Math.min(activeStation + 3, 7)} · ${station.name}`} valueColor="hsl(195, 89%, 34%)" />
            <PropertyRow label="Standard" value="VDA 6.3" valueColor="hsl(195, 89%, 34%)" />
            <PropertyRow label="Classification" value={hl.label} valueColor={hl.color} />
            <PropertyRow label="Score" value={avgScore ? `${avgScore} / 100` : '—'} valueColor={avgScore && avgScore >= 70 ? 'hsl(155, 24%, 55%)' : 'hsl(24, 72%, 63%)'} />
            <PropertyRow label="Grade" value={avgScore ? gradeFromScore(avgScore) : '—'} />
            <PropertyRow label="Risk" value={risk.label} valueColor={risk.color} />
            <PropertyRow label="Created" value="2026-04-08 11:12" valueColor="hsl(195, 89%, 34%)" />
            <PropertyRow label="Last modified" value="2026-04-08 16:44" valueColor="hsl(195, 89%, 34%)" />
          </div>
        </div>

        {/* Linked NCRs */}
        {stationNCRs.length > 0 && (
          <div className="px-5 py-4 border-b border-border">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3 block">Linked NCRs</span>
            <div className="space-y-2">
              {stationNCRs.map(ncr => (
                <div key={ncr.id} className="flex items-center gap-3 py-1.5">
                  <div className={cn("w-5 h-5 rounded flex items-center justify-center", ncr.severity === 'major' ? 'bg-destructive/10' : 'bg-warning/10')}>
                    <AlertTriangle className="w-3 h-3" style={{ color: ncr.severity === 'major' ? 'hsl(0, 48%, 46%)' : 'hsl(24, 72%, 63%)' }} />
                  </div>
                  <span className="text-[13px] font-medium text-foreground flex-1">{ncr.id} · {ncr.title.toLowerCase().split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[12px] text-muted-foreground capitalize">{ncr.severity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Linked Evidence */}
        {(station.evidenceCount.photos > 0 || station.evidenceCount.measurements > 0 || station.evidenceCount.videos > 0) && (
          <div className="px-5 py-4 border-b border-border">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3 block">Linked Evidence</span>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: Math.min(station.evidenceCount.photos, 4) }).map((_, i) => (
                <div key={i} className="aspect-square  bg-gradient-to-br from-[#ACC5D9]/30 to-[#B2CDBC]/20 border border-border flex items-end p-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-foreground/60 text-white">
                    PHO-{String(27 + i).padStart(3, '0')}
                  </span>
                </div>
              ))}
              {station.evidenceCount.videos > 0 && (
                <div className="aspect-square  bg-gradient-to-br from-[#ACC5D9]/20 to-[#B2CDBC]/10 border border-border flex items-end p-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-foreground/60 text-white">
                    VID-002
                  </span>
                </div>
              )}
              {(station.evidenceCount.photos + station.evidenceCount.measurements + station.evidenceCount.videos) > 5 && (
                <div className="aspect-square  bg-muted border border-border flex items-center justify-center">
                  <span className="text-[12px] font-medium text-muted-foreground">
                    +{station.evidenceCount.photos + station.evidenceCount.measurements + station.evidenceCount.videos - 5}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Audit Timeline */}
        <div className="px-5 py-4">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3 block">Audit Timeline</span>
          <div className="space-y-0">
            {timelineEvents.map((evt, i) => (
              <div key={i} className="flex gap-3 py-2">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5" style={{ background: evt.color }} />
                  {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground block">{evt.time}</span>
                  <span className="text-[13px] text-foreground font-medium">{evt.label}</span>
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
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="text-[13px] font-medium tabular-nums" style={{ color: valueColor || '#0A0A0A' }}>{value}</span>
    </div>
  );
}
