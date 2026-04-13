import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { User } from "lucide-react";

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

export default function CAPAGantt() {
  const { allNCRs } = useAuditReportContext();

  const capaItems: CAPAItem[] = allNCRs.map((ncr, i) => ({
    id: `CAPA-${String(i + 1).padStart(3, '0')}`,
    ncrId: ncr.id,
    title: ncr.recommendedAction.substring(0, 80),
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

  const overdueCount = capaItems.filter(c => c.status === 'overdue').length;
  const avgSuccess = Math.round(capaItems.reduce((a, c) => a + c.predictedSuccess, 0) / capaItems.length);

  return (
    <section className="scroll-mt-20 py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">CAPA Timeline</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {capaItems.length} corrective actions — {avgSuccess}% avg. on-time probability
      </h2>

      {/* Stat bar */}
      <div className="flex items-stretch gap-px bg-border">
        {[
          { label: 'Total Actions', value: capaItems.length, color: 'hsl(var(--foreground))' },
          { label: 'In Progress', value: capaItems.filter(c => c.status === 'in-progress').length, color: 'hsl(var(--primary))' },
          { label: 'Overdue', value: overdueCount, color: 'hsl(var(--destructive))' },
          { label: 'Avg. Success', value: `${avgSuccess}%`, color: avgSuccess >= 70 ? 'hsl(var(--accent))' : 'hsl(var(--warning))' },
        ].map(s => (
          <div key={s.label} className="flex-1 p-4 bg-card">
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">{s.label}</span>
            <div className="text-[24px] font-bold font-mono mt-1 leading-none" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="p-8 bg-card shadow-sm">
        <div className="flex justify-between mb-4 text-[11px] font-mono text-muted-foreground">
          <span>Apr 8</span>
          <span>Apr 22</span>
          <span>May 6</span>
          <span>May 20</span>
          <span>Jun 1</span>
        </div>

        <div className="space-y-1">
          {capaItems.map(item => {
            const barColor = item.severity === 'major' ? 'hsl(var(--destructive))' : 'hsl(var(--primary))';
            const startPct = dayOffset(item.startDate);
            const endPct = dayOffset(item.dueDate);
            const successColor = item.predictedSuccess >= 80 ? 'hsl(var(--accent))' : item.predictedSuccess >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';

            const statusStyles: Record<string, string> = {
              open: 'bg-muted text-muted-foreground',
              'in-progress': 'bg-primary/10 text-primary',
              overdue: 'bg-destructive/10 text-destructive',
              completed: 'bg-accent/10 text-accent',
            };

            return (
              <div key={item.id} className="flex items-center gap-4 py-3 ">
                {/* Left info */}
                <div className="w-[280px] shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold text-muted-foreground">{item.id}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 ${statusStyles[item.status] || 'bg-muted text-muted-foreground'}`}>{item.status}</span>
                    {item.severity === 'major' && (
                      <span className="text-[9px] px-1.5 py-0.5 font-bold uppercase bg-destructive/10 text-destructive">Major</span>
                    )}
                  </div>
                  <p className="text-[13px] text-foreground truncate">{item.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">{item.owner}</span>
                  </div>
                </div>

                {/* Gantt bar */}
                <div className="flex-1 relative h-8 bg-muted">
                  <div
                    className="absolute top-1 bottom-1 opacity-70"
                    style={{
                      left: `${startPct}%`,
                      width: `${Math.max(2, endPct - startPct)}%`,
                      background: barColor,
                    }}
                  />
                  <div className="absolute top-0 bottom-0 w-px bg-primary/50" style={{ left: `${todayOffset}%` }} />
                </div>

                {/* Success */}
                <div className="w-[60px] text-right shrink-0">
                  <span className="text-[14px] font-mono font-bold" style={{ color: successColor }}>{item.predictedSuccess}%</span>
                  <div className="text-[9px] text-muted-foreground">on-time</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}