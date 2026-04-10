import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { Diamond, Square, User, Calendar, ChevronRight } from "lucide-react";

const severityConfig = {
  minor: { icon: Diamond, color: 'text-[#E39B5C]', bg: 'bg-[#E39B5C]/10', border: 'border-[#E39B5C]/30', label: 'Minor' },
  major: { icon: Square, color: 'text-[#AD3D3D]', bg: 'bg-[#AD3D3D]/10', border: 'border-[#AD3D3D]/30', label: 'Major' },
};

const statusConfig: Record<string, string> = {
  open: 'bg-[#AD3D3D]/10 text-[#AD3D3D]',
  'in-progress': 'bg-[#E39B5C]/10 text-[#E39B5C]',
  closed: 'bg-[#6EA996]/10 text-[#6EA996]',
  escalated: 'bg-[#0A7FA5]/10 text-[#0A7FA5]',
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
      <div className={cn("flex items-center gap-3 px-3 py-2.5  border bg-white", sev.border)}>
        <Icon className={cn("w-4 h-4 shrink-0", sev.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono text-[#7B8E80]">{ncr.id}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full uppercase font-medium", statusConfig[ncr.status])}>
              {ncr.status}
            </span>
          </div>
          <p className="text-[13px] text-[#0A0A0A] truncate">{ncr.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-[#C0C0C0]" />
      </div>
    );
  }

  return (
    <div className={cn(" border p-5 transition-all bg-white", sev.border)}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-8 h-8  flex items-center justify-center", sev.bg)}>
          <Icon className={cn("w-4 h-4", sev.color)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono text-[#7B8E80]">{ncr.id}</span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider", sev.bg, sev.color)}>
              {sev.label}
            </span>
          </div>
          <p className="text-[15px] font-medium text-[#0A0A0A] mt-0.5">{ncr.title}</p>
          {ncr.isoClause && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#7B8E80] mt-1 inline-block">
              ISO 9001 §{ncr.isoClause}
            </span>
          )}
        </div>
      </div>

      <p className="text-[13px] text-[#7B8E80] leading-relaxed mb-3">{ncr.observation}</p>

      <div className=" bg-[#F5F5F5] border border-[#E5E7EB] p-3 mb-4">
        <span className="text-[11px] uppercase tracking-wider text-[#7B8E80] font-semibold">Root Cause (AI)</span>
        <p className="text-[13px] text-[#1A1A1A] mt-1">{ncr.rootCause}</p>
      </div>

      <p className="text-[14px] text-[#0A0A0A] mb-4 leading-relaxed">{ncr.recommendedAction}</p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onAssign?.(ncr.id)}
          className="flex items-center gap-2 px-3 py-1.5  border border-dashed border-[#C0C0C0] text-[12px] text-[#7B8E80] hover:border-[#0A7FA5] hover:text-[#0A7FA5] transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          {ncr.owner || 'Assign owner'}
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5  border border-dashed border-[#C0C0C0] text-[12px] text-[#7B8E80] hover:border-[#0A7FA5] hover:text-[#0A7FA5] transition-colors">
          <Calendar className="w-3.5 h-3.5" />
          {ncr.dueDate || 'Set due date'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {ncr.severity === 'major' ? (
          <>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5  bg-[#AD3D3D]/10 text-[#AD3D3D] text-[12px] font-medium hover:bg-[#AD3D3D]/20 transition-colors">Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5  bg-[#0A7FA5]/10 text-[#0A7FA5] text-[12px] font-medium hover:bg-[#0A7FA5]/20 transition-colors">Escalate</button>
            <button onClick={() => onAction?.(ncr.id, 'accept-deviation')} className="px-3 py-1.5  bg-[#F5F5F5] text-[#7B8E80] text-[12px] font-medium hover:bg-[#E5E7EB] transition-colors">Accept w/ deviation</button>
          </>
        ) : (
          <>
            <button onClick={() => onAction?.(ncr.id, 'accept')} className="px-3 py-1.5  bg-[#6EA996]/10 text-[#6EA996] text-[12px] font-medium hover:bg-[#6EA996]/20 transition-colors">Accept</button>
            <button onClick={() => onAction?.(ncr.id, 'rework')} className="px-3 py-1.5  bg-[#E39B5C]/10 text-[#E39B5C] text-[12px] font-medium hover:bg-[#E39B5C]/20 transition-colors">Rework</button>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5  bg-[#AD3D3D]/10 text-[#AD3D3D] text-[12px] font-medium hover:bg-[#AD3D3D]/20 transition-colors">Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5  bg-[#F5F5F5] text-[#7B8E80] text-[12px] font-medium hover:bg-[#E5E7EB] transition-colors">Escalate</button>
          </>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
        <span className="text-[12px] text-[#7B8E80]">
          Evidence: {ncr.evidenceIds.length} files · {ncr.evidenceIds.join(', ')}
        </span>
      </div>
    </div>
  );
}
