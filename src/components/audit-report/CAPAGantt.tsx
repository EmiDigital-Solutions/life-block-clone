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
  open: { bg: 'bg-[#F5F5F5]', text: 'text-[#7B8E80]', border: 'border-[#E5E7EB]' },
  'in-progress': { bg: 'bg-[#0A7FA5]/5', text: 'text-[#0A7FA5]', border: 'border-[#0A7FA5]/20' },
  overdue: { bg: 'bg-[#AD3D3D]/5', text: 'text-[#AD3D3D]', border: 'border-[#AD3D3D]/20' },
  completed: { bg: 'bg-[#6EA996]/5', text: 'text-[#6EA996]', border: 'border-[#6EA996]/20' },
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
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// CAPA</span>
        <Clock className="w-3.5 h-3.5 text-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Corrective Action Timeline</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none">
        CAPA Timeline & Predictions
      </h2>

      <div className="border border-[#E5E7EB] bg-white p-6">
        <div className="flex items-center gap-4 text-[11px] text-[#7B8E80] mb-6 pb-3 border-b border-[#E5E7EB]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#AD3D3D] inline-block" /> Major NCR</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#E39B5C] inline-block" /> Minor NCR</span>
          <span className="flex items-center gap-1.5"><span className="w-px h-3 bg-[#0A7FA5] inline-block" /> Today</span>
          <span className="ml-auto flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-[#E39B5C]" /> AI Success Prediction</span>
        </div>

        <div className="space-y-3">
          {capaItems.map(item => {
            const style = statusColors[item.status];
            const barColor = item.severity === 'major' ? '#AD3D3D' : '#E39B5C';
            const startPct = dayOffset(item.startDate);
            const endPct = dayOffset(item.dueDate);
            const successColor = item.predictedSuccess >= 80 ? '#6EA996' : item.predictedSuccess >= 60 ? '#E39B5C' : '#AD3D3D';

            return (
              <div key={item.id} className={cn("border p-3", style.border)}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono text-[#7B8E80]">{item.id}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#F5F5F5] text-[#7B8E80]">{item.ncrId}</span>
                  <span className={cn("text-[9px] px-1.5 py-0.5 uppercase font-semibold tracking-wider", style.bg, style.text)}>
                    {item.status}
                  </span>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#C0C0C0]" />
                    <span className="text-[10px] text-[#7B8E80]">{item.owner}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5" style={{ background: `${successColor}10` }}>
                    <span className="text-[9px] font-mono font-bold" style={{ color: successColor }}>{item.predictedSuccess}%</span>
                    <span className="text-[8px] text-[#7B8E80]">on-time</span>
                  </div>
                </div>
                <p className="text-[12px] text-[#0A0A0A] mb-2 truncate">{item.title}</p>
                <div className="relative h-5 bg-[#F5F5F5]">
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
                <div className="flex justify-between text-[9px] font-mono text-[#C0C0C0] mt-1">
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
