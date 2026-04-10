import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { Diamond, Square, User, Calendar, ChevronRight } from "lucide-react";

const severityConfig = {
  minor: { icon: Diamond, color: 'text-[#F97316]', bg: 'bg-[#FFF7ED]', border: 'border-[#FDBA74]', label: 'Minor' },
  major: { icon: Square, color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]', border: 'border-[#FCA5A5]', label: 'Major' },
};

const statusConfig: Record<string, string> = {
  open: 'bg-[#FEF2F2] text-[#EF4444]',
  'in-progress': 'bg-[#FFFBEB] text-[#F59E0B]',
  closed: 'bg-[#ECFDF5] text-[#10B981]',
  escalated: 'bg-[#EBF0FF] text-[#0052FF]',
};

interface NCRCardProps {
  ncr: NCR;
  compact?: boolean;
  onAssign?: (id: string) => void;
  onAction?: (id: string, action: string) => void;
}

export default function NCRCard({ ncr, compact, onAssign, onAction }: NCRCardProps) {
  const sev = severityConfig[ncr.severity];
  const Icon = sev.icon;

  if (compact) {
    return (
      <div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-white", sev.border)}>
        <Icon className={cn("w-4 h-4 shrink-0", sev.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono text-[#9CA3AF]">{ncr.id}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full uppercase font-medium", statusConfig[ncr.status])}>
              {ncr.status}
            </span>
          </div>
          <p className="text-[13px] text-[#111827] truncate">{ncr.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-[#D1D5DB]" />
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border p-5 transition-all bg-white", sev.border)}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", sev.bg)}>
          <Icon className={cn("w-4 h-4", sev.color)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono text-[#6B7280]">{ncr.id}</span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider", sev.bg, sev.color)}>
              {sev.label}
            </span>
          </div>
          <p className="text-[15px] font-medium text-[#111827] mt-0.5">{ncr.title}</p>
          {ncr.isoClause && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#9CA3AF] mt-1 inline-block">
              ISO 9001 §{ncr.isoClause}
            </span>
          )}
        </div>
      </div>

      <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3">{ncr.observation}</p>

      <div className="rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] p-3 mb-4">
        <span className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-medium">Root Cause (AI)</span>
        <p className="text-[13px] text-[#6B7280] mt-1">{ncr.rootCause}</p>
      </div>

      <p className="text-[13px] text-[#111827] mb-4">{ncr.recommendedAction}</p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onAssign?.(ncr.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-[#D1D5DB] text-[12px] text-[#9CA3AF] hover:border-[#6B7280] hover:text-[#6B7280] transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          {ncr.owner || 'Assign owner'}
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-[#D1D5DB] text-[12px] text-[#9CA3AF] hover:border-[#6B7280] hover:text-[#6B7280] transition-colors">
          <Calendar className="w-3.5 h-3.5" />
          {ncr.dueDate || 'Set due date'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {ncr.severity === 'major' ? (
          <>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5 rounded-lg bg-[#FEF2F2] text-[#EF4444] text-[12px] font-medium hover:bg-[#FEE2E2] transition-colors">Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5 rounded-lg bg-[#EBF0FF] text-[#0052FF] text-[12px] font-medium hover:bg-[#DBEAFE] transition-colors">Escalate</button>
            <button onClick={() => onAction?.(ncr.id, 'accept-deviation')} className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] text-[#6B7280] text-[12px] font-medium hover:bg-[#E5E7EB] transition-colors">Accept w/ deviation</button>
          </>
        ) : (
          <>
            <button onClick={() => onAction?.(ncr.id, 'accept')} className="px-3 py-1.5 rounded-lg bg-[#ECFDF5] text-[#10B981] text-[12px] font-medium hover:bg-[#D1FAE5] transition-colors">Accept</button>
            <button onClick={() => onAction?.(ncr.id, 'rework')} className="px-3 py-1.5 rounded-lg bg-[#FFFBEB] text-[#F59E0B] text-[12px] font-medium hover:bg-[#FEF3C7] transition-colors">Rework</button>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5 rounded-lg bg-[#FEF2F2] text-[#EF4444] text-[12px] font-medium hover:bg-[#FEE2E2] transition-colors">Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] text-[#6B7280] text-[12px] font-medium hover:bg-[#E5E7EB] transition-colors">Escalate</button>
          </>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
        <span className="text-[12px] text-[#9CA3AF]">
          Evidence: {ncr.evidenceIds.length} files · {ncr.evidenceIds.join(', ')}
        </span>
      </div>
    </div>
  );
}
