import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { AlertTriangle, Diamond, Square, User, Calendar, ChevronRight } from "lucide-react";

const severityConfig = {
  minor: { icon: Diamond, color: 'text-[#FF7A59]', bg: 'bg-[#FF7A59]/10', border: 'border-[#FF7A59]/20', label: 'Minor' },
  major: { icon: Square, color: 'text-[#F04464]', bg: 'bg-[#F04464]/10', border: 'border-[#F04464]/20', label: 'Major' },
};

const statusConfig: Record<string, string> = {
  open: 'bg-[#F04464]/20 text-[#F04464]',
  'in-progress': 'bg-[#F5B544]/20 text-[#F5B544]',
  closed: 'bg-[#22D3A5]/20 text-[#22D3A5]',
  escalated: 'bg-[#6366F1]/20 text-[#6366F1]',
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
      <div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-white/[0.02]", sev.border)}>
        <Icon className={cn("w-4 h-4 shrink-0", sev.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono text-[#6B7085]">{ncr.id}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full uppercase font-medium", statusConfig[ncr.status])}>
              {ncr.status}
            </span>
          </div>
          <p className="text-[13px] text-[#F5F6FA] truncate">{ncr.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-[#6B7085]" />
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border p-5 transition-all", sev.border, "bg-white/[0.03] hover:bg-white/[0.05]")}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", sev.bg)}>
          <Icon className={cn("w-4 h-4", sev.color)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono text-[#A1A5B7]">{ncr.id}</span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider", sev.bg, sev.color)}>
              {sev.label}
            </span>
          </div>
          <p className="text-[15px] font-medium text-[#F5F6FA] mt-0.5">{ncr.title}</p>
          {ncr.isoClause && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-[#6B7085] mt-1 inline-block">
              ISO 9001 §{ncr.isoClause}
            </span>
          )}
        </div>
      </div>

      {/* Observation */}
      <p className="text-[13px] text-[#A1A5B7] leading-relaxed mb-3">{ncr.observation}</p>

      {/* Root cause */}
      <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 mb-4">
        <span className="text-[11px] uppercase tracking-wider text-[#6B7085] font-medium">Root Cause (AI)</span>
        <p className="text-[13px] text-[#A1A5B7] mt-1">{ncr.rootCause}</p>
      </div>

      {/* Recommended action */}
      <p className="text-[13px] text-[#F5F6FA] mb-4">{ncr.recommendedAction}</p>

      {/* Owner & Due */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onAssign?.(ncr.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-white/[0.12] text-[12px] text-[#6B7085] hover:border-white/[0.24] hover:text-[#A1A5B7] transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          {ncr.owner || 'Assign owner'}
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-white/[0.12] text-[12px] text-[#6B7085] hover:border-white/[0.24] hover:text-[#A1A5B7] transition-colors">
          <Calendar className="w-3.5 h-3.5" />
          {ncr.dueDate || 'Set due date'}
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {ncr.severity === 'major' ? (
          <>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5 rounded-lg bg-[#F04464]/10 text-[#F04464] text-[12px] font-medium hover:bg-[#F04464]/20 transition-colors">
              Reject
            </button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5 rounded-lg bg-[#6366F1]/10 text-[#6366F1] text-[12px] font-medium hover:bg-[#6366F1]/20 transition-colors">
              Escalate
            </button>
            <button onClick={() => onAction?.(ncr.id, 'accept-deviation')} className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-[#A1A5B7] text-[12px] font-medium hover:bg-white/[0.1] transition-colors">
              Accept w/ deviation
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onAction?.(ncr.id, 'accept')} className="px-3 py-1.5 rounded-lg bg-[#22D3A5]/10 text-[#22D3A5] text-[12px] font-medium hover:bg-[#22D3A5]/20 transition-colors">
              Accept
            </button>
            <button onClick={() => onAction?.(ncr.id, 'rework')} className="px-3 py-1.5 rounded-lg bg-[#F5B544]/10 text-[#F5B544] text-[12px] font-medium hover:bg-[#F5B544]/20 transition-colors">
              Rework
            </button>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5 rounded-lg bg-[#F04464]/10 text-[#F04464] text-[12px] font-medium hover:bg-[#F04464]/20 transition-colors">
              Reject
            </button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-[#A1A5B7] text-[12px] font-medium hover:bg-white/[0.1] transition-colors">
              Escalate
            </button>
          </>
        )}
      </div>

      {/* Evidence link */}
      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        <span className="text-[12px] text-[#6B7085]">
          Evidence: {ncr.evidenceIds.length} files · {ncr.evidenceIds.join(', ')}
        </span>
      </div>
    </div>
  );
}
