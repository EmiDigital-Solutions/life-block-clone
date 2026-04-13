import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { Diamond, Square, User, Calendar, ChevronRight } from "lucide-react";

const severityConfig = {
  minor: { icon: Diamond, color: 'text-warning', bg: 'hsl(24, 72%, 63%, 0.1)', label: 'Minor', borderColor: 'hsl(24, 72%, 63%, 0.3)' },
  major: { icon: Square, color: 'text-destructive', bg: 'hsl(0, 48%, 46%, 0.1)', label: 'Major', borderColor: 'hsl(0, 48%, 46%, 0.3)' },
};

const statusConfig: Record<string, { bg: string; color: string }> = {
  open: { bg: 'hsl(0, 48%, 46%, 0.1)', color: 'hsl(0, 48%, 46%)' },
  'in-progress': { bg: 'hsl(24, 72%, 63%, 0.1)', color: 'hsl(24, 72%, 63%)' },
  closed: { bg: 'hsl(155, 24%, 55%, 0.1)', color: 'hsl(155, 24%, 55%)' },
  escalated: { bg: 'hsl(195, 89%, 34%, 0.1)', color: 'hsl(195, 89%, 34%)' },
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
  const status = statusConfig[ncr.status] || statusConfig.open;

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5" className="bg-card" >
        <Icon className={cn("w-4 h-4 shrink-0", sev.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>{ncr.id}</span>
            <span className="text-[10px] px-1.5 py-0.5 uppercase font-medium" style={{ background: status.bg, color: status.color }}>
              {ncr.status}
            </span>
          </div>
          <p className="text-[13px] text-foreground truncate">{ncr.title}</p>
        </div>
        <ChevronRight className="w-4 h-4" style={{ color: 'hsl(0,0%,55%)' }} />
      </div>
    );
  }

  return (
    <div className="p-5 transition-all" className="bg-card shadow-sm" >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 flex items-center justify-center" style={{ background: sev.bg }}>
          <Icon className={cn("w-4 h-4", sev.color)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono" style={{ color: 'hsl(0,0%,50%)' }}>{ncr.id}</span>
            <span className="text-[10px] px-2 py-0.5 uppercase font-semibold tracking-wider" style={{ background: sev.bg, color: sev.color === 'text-warning' ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)' }}>
              {sev.label}
            </span>
          </div>
          <p className="text-[15px] font-bold text-foreground mt-0.5">{ncr.title}</p>
          {ncr.isoClause && (
            <a
              href={`https://www.iso.org/standard/62085.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono px-1.5 py-0.5 text-primary mt-1 inline-flex items-center gap-1 cursor-pointer transition-colors"
              style={{ background: 'hsl(195, 89%, 34%, 0.1)' }}
              title={`ISO 9001:2015 / IATF 16949 Clause ${ncr.isoClause}`}
            >
              <span>ISO 9001 §{ncr.isoClause}</span>
              <span className="text-[8px]">↗</span>
            </a>
          )}
        </div>
      </div>

      <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'hsl(0,0%,45%)' }}>{ncr.observation}</p>

      <div className="p-3 mb-4" style={{ background: 'hsl(0,0%,92%)' }}>
        <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>Root Cause (AI)</span>
        <p className="text-[13px] mt-1" style={{ color: 'hsl(0,0%,25%)' }}>{ncr.rootCause}</p>
      </div>

      <p className="text-[14px] text-foreground mb-4 leading-relaxed">{ncr.recommendedAction}</p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onAssign?.(ncr.id)}
          className="flex items-center gap-2 px-3 py-1.5 text-[12px] transition-colors cursor-pointer"
          style={{ color: 'hsl(0,0%,50%)' }}
        >
          <User className="w-3.5 h-3.5" />
          {ncr.owner || 'Assign owner'}
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] transition-colors cursor-pointer" style={{ color: 'hsl(0,0%,50%)' }}>
          <Calendar className="w-3.5 h-3.5" />
          {ncr.dueDate || 'Set due date'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {ncr.severity === 'major' ? (
          <>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5 text-[12px] font-medium text-destructive cursor-pointer transition-colors" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5 text-[12px] font-medium text-primary cursor-pointer transition-colors" style={{ background: 'hsl(195, 89%, 34%, 0.1)' }}>Escalate</button>
            <button onClick={() => onAction?.(ncr.id, 'accept-deviation')} className="px-3 py-1.5 text-[12px] font-medium cursor-pointer transition-colors" style={{ background: 'hsl(0,0%,88%)', color: 'hsl(0,0%,45%)' }}>Accept w/ deviation</button>
          </>
        ) : (
          <>
            <button onClick={() => onAction?.(ncr.id, 'accept')} className="px-3 py-1.5 text-[12px] font-medium text-accent cursor-pointer transition-colors" style={{ background: 'hsl(155, 24%, 55%, 0.1)' }}>Accept</button>
            <button onClick={() => onAction?.(ncr.id, 'rework')} className="px-3 py-1.5 text-[12px] font-medium text-warning cursor-pointer transition-colors" style={{ background: 'hsl(24, 72%, 63%, 0.1)' }}>Rework</button>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5 text-[12px] font-medium text-destructive cursor-pointer transition-colors" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5 text-[12px] font-medium cursor-pointer transition-colors" style={{ background: 'hsl(0,0%,88%)', color: 'hsl(0,0%,45%)' }}>Escalate</button>
          </>
        )}
      </div>

      <div className="mt-3 pt-3" >
        <span className="text-[12px]" style={{ color: 'hsl(0,0%,50%)' }}>
          Evidence: {ncr.evidenceIds.length} files · {ncr.evidenceIds.join(', ')}
        </span>
      </div>
    </div>
  );
}