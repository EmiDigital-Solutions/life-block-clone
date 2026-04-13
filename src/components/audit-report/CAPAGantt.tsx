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

  const statusStyle: Record<string, { bg: string; text: string }> = {
    open: { bg: 'hsl(0,0%,93%)', text: 'hsl(0,0%,50%)' },
    'in-progress': { bg: 'hsl(195, 89%, 34%, 0.08)', text: 'hsl(195, 89%, 34%)' },
    overdue: { bg: 'hsl(0, 48%, 46%, 0.08)', text: 'hsl(0, 48%, 46%)' },
    completed: { bg: 'hsl(155, 24%, 55%, 0.08)', text: 'hsl(155, 24%, 55%)' },
  };

  return (
    <section className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(195, 89%, 34%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>CAPA Timeline</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {capaItems.length} corrective actions — {avgSuccess}% avg. on-time probability
      </h2>

      {/* Stat bar */}
      <div className="flex items-stretch gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
        {[
          { label: 'Total Actions', value: capaItems.length, color: 'hsl(0,0%,20%)' },
          { label: 'In Progress', value: capaItems.filter(c => c.status === 'in-progress').length, color: 'hsl(195, 89%, 34%)' },
          { label: 'Overdue', value: overdueCount, color: 'hsl(0, 48%, 46%)' },
          { label: 'Avg. Success', value: `${avgSuccess}%`, color: avgSuccess >= 70 ? 'hsl(155, 24%, 55%)' : 'hsl(24, 72%, 63%)' },
        ].map(s => (
          <div key={s.label} className="flex-1 p-4" style={{ background: 'hsl(0,0%,100%)' }}>
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>{s.label}</span>
            <div className="text-[24px] font-bold font-mono mt-1 leading-none" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="p-8" style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
        {/* Month labels */}
        <div className="flex justify-between mb-4 text-[11px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>
          <span>Apr 8</span>
          <span>Apr 22</span>
          <span>May 6</span>
          <span>May 20</span>
          <span>Jun 1</span>
        </div>

        <div className="space-y-1">
          {capaItems.map(item => {
            const barColor = item.severity === 'major' ? 'hsl(0, 48%, 46%)' : 'hsl(195, 89%, 34%)';
            const startPct = dayOffset(item.startDate);
            const endPct = dayOffset(item.dueDate);
            const successColor = item.predictedSuccess >= 80 ? 'hsl(155, 24%, 55%)' : item.predictedSuccess >= 60 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
            const style = statusStyle[item.status] || statusStyle.open;

            return (
              <div key={item.id} className="flex items-center gap-4 py-3" style={{ borderBottom: '1px solid hsl(0,0%,92%)' }}>
                {/* Left info */}
                <div className="w-[280px] shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold" style={{ color: 'hsl(0,0%,40%)' }}>{item.id}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5" style={{ background: style.bg, color: style.text }}>{item.status}</span>
                    {item.severity === 'major' && (
                      <span className="text-[9px] px-1.5 py-0.5 font-bold uppercase" style={{ background: 'hsl(0, 48%, 46%, 0.08)', color: 'hsl(0, 48%, 46%)' }}>Major</span>
                    )}
                  </div>
                  <p className="text-[13px] text-foreground truncate">{item.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <User className="w-3 h-3" style={{ color: 'hsl(0,0%,60%)' }} />
                    <span className="text-[11px]" style={{ color: 'hsl(0,0%,50%)' }}>{item.owner}</span>
                  </div>
                </div>

                {/* Gantt bar */}
                <div className="flex-1 relative h-8" style={{ background: 'hsl(0,0%,96%)' }}>
                  <div
                    className="absolute top-1 bottom-1"
                    style={{
                      left: `${startPct}%`,
                      width: `${Math.max(2, endPct - startPct)}%`,
                      background: barColor,
                      opacity: 0.7,
                    }}
                  />
                  <div className="absolute top-0 bottom-0 w-px" style={{ left: `${todayOffset}%`, background: 'hsl(195, 89%, 34%)', opacity: 0.5 }} />
                </div>

                {/* Success */}
                <div className="w-[60px] text-right shrink-0">
                  <span className="text-[14px] font-mono font-bold" style={{ color: successColor }}>{item.predictedSuccess}%</span>
                  <div className="text-[9px]" style={{ color: 'hsl(0,0%,55%)' }}>on-time</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
