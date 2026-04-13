import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { User, Calendar, ChevronRight } from "lucide-react";

const severityConfig = {
  minor: { color: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 53%, 0.06)', label: 'Minor', border: 'hsl(24, 72%, 53%, 0.2)' },
  major: { color: 'hsl(0, 48%, 46%)', bg: 'hsl(0, 48%, 46%, 0.06)', label: 'Major', border: 'hsl(0, 48%, 46%, 0.2)' },
};

interface NCRCardProps {
  ncr: NCR;
  compact?: boolean;
  onAssign?: (id: string) => void;
  onAction?: (id: string, action: string) => void;
}

export default function NCRCard({ ncr, compact, onAssign, onAction }: NCRCardProps) {
  const sev = severityConfig[ncr.severity];

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderLeft: `3px solid ${sev.color}`, border: `1px solid hsl(0,0%,90%)`, borderLeftWidth: 3, borderLeftColor: sev.color }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[12px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>{ncr.id}</span>
            <span className="text-[10px] px-2 py-0.5 uppercase font-semibold" style={{ background: sev.bg, color: sev.color }}>{sev.label}</span>
          </div>
          <p className="text-[14px] text-foreground truncate">{ncr.title}</p>
        </div>
        <ChevronRight className="w-4 h-4" style={{ color: 'hsl(0,0%,65%)' }} />
      </div>
    );
  }

  return (
    <div className="bg-white" style={{ border: '1px solid hsl(0,0%,90%)', borderLeft: `3px solid ${sev.color}` }}>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>{ncr.id}</span>
              <span className="text-[11px] px-2.5 py-0.5 uppercase font-semibold tracking-wide" style={{ background: sev.bg, color: sev.color }}>{sev.label}</span>
              {ncr.isoClause && (
                <a href="https://www.iso.org/standard/62085.html" target="_blank" rel="noopener noreferrer"
                  className="text-[11px] font-mono px-2 py-0.5 text-primary cursor-pointer" style={{ background: 'hsl(195, 89%, 34%, 0.06)' }}>
                  §{ncr.isoClause}
                </a>
              )}
            </div>
            <h4 className="text-[17px] font-semibold text-foreground leading-snug">{ncr.title}</h4>
          </div>
        </div>

        <p className="text-[14px] leading-[1.7] mb-5" style={{ color: 'hsl(0,0%,40%)' }}>{ncr.observation}</p>

        {/* Root cause */}
        <div className="p-4 mb-5" style={{ background: 'hsl(220, 14%, 96%)', border: '1px solid hsl(0,0%,90%)' }}>
          <span className="text-[11px] font-medium tracking-wide uppercase block mb-1.5" style={{ color: 'hsl(0,0%,55%)' }}>Root Cause (Atlas AI)</span>
          <p className="text-[14px] leading-[1.7]" style={{ color: 'hsl(0,0%,25%)' }}>{ncr.rootCause}</p>
        </div>

        <p className="text-[14px] text-foreground mb-5 leading-[1.7]">{ncr.recommendedAction}</p>

        {/* Assign & date */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => onAssign?.(ncr.id)} className="flex items-center gap-2 px-4 py-2 text-[13px] transition-colors cursor-pointer" style={{ border: '1px dashed hsl(0,0%,80%)', color: 'hsl(0,0%,45%)' }}>
            <User className="w-4 h-4" />
            {ncr.owner || 'Assign owner'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-[13px] transition-colors cursor-pointer" style={{ border: '1px dashed hsl(0,0%,80%)', color: 'hsl(0,0%,45%)' }}>
            <Calendar className="w-4 h-4" />
            {ncr.dueDate || 'Set due date'}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {ncr.severity === 'major' ? (
            <>
              <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-4 py-2 text-[13px] font-medium text-destructive cursor-pointer" style={{ background: 'hsl(0, 48%, 46%, 0.06)' }}>Reject</button>
              <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-4 py-2 text-[13px] font-medium text-primary cursor-pointer" style={{ background: 'hsl(195, 89%, 34%, 0.06)' }}>Escalate</button>
              <button onClick={() => onAction?.(ncr.id, 'accept-deviation')} className="px-4 py-2 text-[13px] font-medium cursor-pointer" style={{ background: 'hsl(0,0%,95%)', color: 'hsl(0,0%,40%)' }}>Accept w/ deviation</button>
            </>
          ) : (
            <>
              <button onClick={() => onAction?.(ncr.id, 'accept')} className="px-4 py-2 text-[13px] font-medium text-accent cursor-pointer" style={{ background: 'hsl(155, 24%, 45%, 0.06)' }}>Accept</button>
              <button onClick={() => onAction?.(ncr.id, 'rework')} className="px-4 py-2 text-[13px] font-medium text-warning cursor-pointer" style={{ background: 'hsl(24, 72%, 53%, 0.06)' }}>Rework</button>
              <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-4 py-2 text-[13px] font-medium text-destructive cursor-pointer" style={{ background: 'hsl(0, 48%, 46%, 0.06)' }}>Reject</button>
            </>
          )}
        </div>
      </div>

      <div className="px-6 md:px-8 py-3" style={{ borderTop: '1px solid hsl(0,0%,92%)', background: 'hsl(220, 14%, 98%)' }}>
        <span className="text-[12px]" style={{ color: 'hsl(0,0%,50%)' }}>
          Evidence: {ncr.evidenceIds.length} files · {ncr.evidenceIds.join(', ')}
        </span>
      </div>
    </div>
  );
}