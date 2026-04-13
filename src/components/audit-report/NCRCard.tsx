import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { Diamond, Square, User, Calendar, ChevronRight } from "lucide-react";

const severityConfig = {
  minor: { icon: Diamond, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Minor' },
  major: { icon: Square, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Major' },
};

const statusConfig: Record<string, string> = {
  open: 'bg-destructive/10 text-destructive',
  'in-progress': 'bg-warning/10 text-warning',
  closed: 'bg-accent/10 text-accent',
  escalated: 'bg-primary/10 text-primary',
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
      <div className={cn("flex items-center gap-3 px-3 py-2.5 audit-glass-card", sev.border)}>
        <Icon className={cn("w-4 h-4 shrink-0", sev.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono text-muted-foreground">{ncr.id}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full uppercase font-medium", statusConfig[ncr.status])}>
              {ncr.status}
            </span>
          </div>
          <p className="text-[13px] text-foreground truncate">{ncr.title}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-grey-mid" />
      </div>
    );
  }

  return (
    <div className={cn("audit-glass-card p-5 transition-all", sev.border)}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-8 h-8  flex items-center justify-center", sev.bg)}>
          <Icon className={cn("w-4 h-4", sev.color)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono text-muted-foreground">{ncr.id}</span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider", sev.bg, sev.color)}>
              {sev.label}
            </span>
          </div>
          <p className="text-[15px] font-bold text-foreground mt-0.5">{ncr.title}</p>
          {ncr.isoClause && (
            <a
              href={`https://www.iso.org/standard/62085.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono px-1.5 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors mt-1 inline-flex items-center gap-1 cursor-pointer"
              title={`ISO 9001:2015 / IATF 16949 Clause ${ncr.isoClause}`}
            >
              <span>ISO 9001 §{ncr.isoClause}</span>
              <span className="text-[8px]">↗</span>
            </a>
          )}
        </div>
      </div>

      <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{ncr.observation}</p>

      <div className="audit-surface-sunken p-3 mb-4">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Root Cause (AI)</span>
        <p className="text-[13px] text-charcoal mt-1">{ncr.rootCause}</p>
      </div>

      <p className="text-[14px] text-foreground mb-4 leading-relaxed">{ncr.recommendedAction}</p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onAssign?.(ncr.id)}
          className="flex items-center gap-2 px-3 py-1.5  border border-dashed border-grey-mid text-[12px] text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          {ncr.owner || 'Assign owner'}
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5  border border-dashed border-grey-mid text-[12px] text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Calendar className="w-3.5 h-3.5" />
          {ncr.dueDate || 'Set due date'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {ncr.severity === 'major' ? (
          <>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5  bg-destructive/10 text-destructive text-[12px] font-medium hover:bg-destructive/20 transition-colors">Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5  bg-primary/10 text-primary text-[12px] font-medium hover:bg-primary/20 transition-colors">Escalate</button>
            <button onClick={() => onAction?.(ncr.id, 'accept-deviation')} className="px-3 py-1.5  bg-muted text-muted-foreground text-[12px] font-medium hover:bg-border transition-colors">Accept w/ deviation</button>
          </>
        ) : (
          <>
            <button onClick={() => onAction?.(ncr.id, 'accept')} className="px-3 py-1.5  bg-accent/10 text-accent text-[12px] font-medium hover:bg-accent/20 transition-colors">Accept</button>
            <button onClick={() => onAction?.(ncr.id, 'rework')} className="px-3 py-1.5  bg-warning/10 text-warning text-[12px] font-medium hover:bg-warning/20 transition-colors">Rework</button>
            <button onClick={() => onAction?.(ncr.id, 'reject')} className="px-3 py-1.5  bg-destructive/10 text-destructive text-[12px] font-medium hover:bg-destructive/20 transition-colors">Reject</button>
            <button onClick={() => onAction?.(ncr.id, 'escalate')} className="px-3 py-1.5  bg-muted text-muted-foreground text-[12px] font-medium hover:bg-border transition-colors">Escalate</button>
          </>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <span className="text-[12px] text-muted-foreground">
          Evidence: {ncr.evidenceIds.length} files · {ncr.evidenceIds.join(', ')}
        </span>
      </div>
    </div>
  );
}
