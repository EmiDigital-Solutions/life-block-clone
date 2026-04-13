import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { X, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface DecisionTrayProps {
  ncrs: NCR[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function DecisionTray({ ncrs, isOpen, onClose, className }: DecisionTrayProps) {
  const pending = ncrs.filter(n => n.status === 'open').length;
  const assigned = ncrs.filter(n => n.owner).length;

  return (
    <aside className={cn(
      "flex flex-col border-l border-border/40 bg-muted transition-all duration-300 overflow-hidden",
      isOpen ? "w-[300px] opacity-100" : "w-0 opacity-0",
      className
    )}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-border/40">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground">Decision Tray</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">{pending} pending · {assigned} assigned</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 border-b border-border/40">
        <div className="text-center">
          <AlertCircle className="w-4 h-4 text-warning mx-auto mb-1" />
          <span className="text-[18px] font-light text-foreground tabular-nums">{pending}</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Pending</span>
        </div>
        <div className="text-center">
          <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
          <span className="text-[18px] font-light text-foreground tabular-nums">{assigned}</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Assigned</span>
        </div>
        <div className="text-center">
          <CheckCircle2 className="w-4 h-4 text-accent mx-auto mb-1" />
          <span className="text-[18px] font-light text-foreground tabular-nums">0</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Closed</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-border/40">
        <p className="text-[12px] text-muted-foreground">
          Est. <span className="text-foreground font-medium">12 min</span> to sign off
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} compact />)}
      </div>

      <div className="p-4 border-t border-border">
        <button
          disabled={pending > 0}
          className={cn(
            "w-full py-3 text-[14px] font-medium transition-all duration-200",
            pending > 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {pending > 0 ? `${pending} decisions pending` : 'Sign off & send'}
        </button>
      </div>
    </aside>
  );
}