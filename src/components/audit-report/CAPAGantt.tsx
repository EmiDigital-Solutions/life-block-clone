import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { cn } from "@/lib/utils";
import { Clock, User, AlertTriangle } from "lucide-react";

interface CAPAItem {
  id: string;
  ncrId: string;
  title: string;
  owner: string;
  severity: 'minor' | 'major';
  startDate: string;
  dueDate: string;
  status: 'open' | 'in-progress' | 'overdue' | 'completed';
  predictedSuccess: number;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  open: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' },
  'in-progress': { bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/20' },
  overdue: { bg: 'bg-destructive/5', text: 'text-destructive', border: 'border-destructive/20' },
  completed: { bg: 'bg-accent/5', text: 'text-accent', border: 'border-accent/20' },
};

export default function CAPAGantt() {
  const { allNCRs } = useAuditReportContext();

  const capaItems: CAPAItem[] = allNCRs.map((ncr, i) => ({
    id: `CAPA-${String(i + 1).padStart(3, '0')}`,
    ncrId: ncr.id,
    title: ncr.recommendedAction.substring(0, 60) + '...',
    owner: ncr.owner || 'Unassigned',
    severity: ncr.severity,
    startDate: '2026-04-10',
    dueDate: ncr.dueDate || '2026-05-15',
    status: ncr.owner ? (ncr.status === 'open' ? 'in-progress' : ncr.status as any) : 'open',
    predictedSuccess: ncr.severity === 'major' ? Math.round(55 + Math.random() * 20) : Math.round(70 + Math.random() * 25),
  }));

  const baseDate = new Date('2026-04-08');
  const endDate = new Date('2026-06-01');
  const totalDays = (endDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
  const today = new Date('2026-04-10');

  const dayOffset = (dateStr: string) => {
    const d = new Date(dateStr);
    return Math.max(0, Math.min(100, ((d.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100));
  };

  const todayOffset = dayOffset(today.toISOString().split('T')[0]);

  return (
    <section className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// CAPA</span>
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">Corrective Action Timeline</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">
        CAPA Timeline & Predictions
      </h2>

      <div className="border border-border bg-white p-6">
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-6 pb-3 border-b border-border">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#AD3D3D] inline-block" /> Major NCR</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#E39B5C] inline-block" /> Minor NCR</span>
          <span className="flex items-center gap-1.5"><span className="w-px h-3 bg-[#0A7FA5] inline-block" /> Today</span>
          <span className="ml-auto flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-warning" /> AI Success Prediction</span>
        </div>

        <div className="space-y-3">
          {capaItems.map(item => {
            const style = statusColors[item.status];
            const barColor = item.severity === 'major' ? 'hsl(0, 48%, 46%)' : 'hsl(24, 72%, 63%)';
            const startPct = dayOffset(item.startDate);
            const endPct = dayOffset(item.dueDate);
            const successColor = item.predictedSuccess >= 80 ? 'hsl(155, 24%, 55%)' : item.predictedSuccess >= 60 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';

            return (
              <div key={item.id} className={cn("border p-3", style.border)}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{item.id}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-muted text-muted-foreground">{item.ncrId}</span>
                  <span className={cn("text-[9px] px-1.5 py-0.5 uppercase font-semibold tracking-wider", style.bg, style.text)}>
                    {item.status}
                  </span>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-grey-mid" />
                    <span className="text-[10px] text-muted-foreground">{item.owner}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5" style={{ background: `${successColor}10` }}>
                    <span className="text-[9px] font-mono font-bold" style={{ color: successColor }}>{item.predictedSuccess}%</span>
                    <span className="text-[8px] text-muted-foreground">on-time</span>
                  </div>
                </div>
                <p className="text-[12px] text-foreground mb-2 truncate">{item.title}</p>
                <div className="relative h-5 bg-muted">
                  <div
                    className="absolute top-0 h-full opacity-70"
                    style={{
                      left: `${startPct}%`,
                      width: `${endPct - startPct}%`,
                      background: barColor,
                    }}
                  />
                  <div className="absolute top-0 bottom-0 w-px bg-[#0A7FA5]" style={{ left: `${todayOffset}%` }} />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-grey-mid mt-1">
                  <span>{item.startDate}</span>
                  <span>{item.dueDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
