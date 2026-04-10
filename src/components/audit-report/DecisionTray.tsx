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
      "flex flex-col border-l border-white/[0.08] bg-[#0E1017] transition-all duration-300 overflow-hidden",
      isOpen ? "w-[300px] opacity-100" : "w-0 opacity-0",
      className
    )}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.08]">
        <div>
          <h3 className="text-[14px] font-semibold text-[#F5F6FA]">Decision Tray</h3>
          <p className="text-[12px] text-[#6B7085] mt-0.5">
            {pending} pending · {assigned} assigned
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#6B7085] hover:text-[#F5F6FA] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-white/[0.08]">
        <div className="text-center">
          <AlertCircle className="w-4 h-4 text-[#F04464] mx-auto mb-1" />
          <span className="text-[18px] font-semibold text-[#F5F6FA] tabular-nums">{pending}</span>
          <span className="block text-[10px] text-[#6B7085] uppercase tracking-wider">Pending</span>
        </div>
        <div className="text-center">
          <Clock className="w-4 h-4 text-[#F5B544] mx-auto mb-1" />
          <span className="text-[18px] font-semibold text-[#F5F6FA] tabular-nums">{assigned}</span>
          <span className="block text-[10px] text-[#6B7085] uppercase tracking-wider">Assigned</span>
        </div>
        <div className="text-center">
          <CheckCircle2 className="w-4 h-4 text-[#22D3A5] mx-auto mb-1" />
          <span className="text-[18px] font-semibold text-[#F5F6FA] tabular-nums">0</span>
          <span className="block text-[10px] text-[#6B7085] uppercase tracking-wider">Closed</span>
        </div>
      </div>

      {/* Time estimate */}
      <div className="px-4 py-3 border-b border-white/[0.08]">
        <p className="text-[12px] text-[#A1A5B7]">
          Est. <span className="text-[#F5F6FA] font-medium">12 min</span> to sign off
        </p>
      </div>

      {/* NCR list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {ncrs.map(ncr => (
          <NCRCard key={ncr.id} ncr={ncr} compact />
        ))}
      </div>

      {/* Sign off button */}
      <div className="p-4 border-t border-white/[0.08]">
        <button
          disabled={pending > 0}
          className={cn(
            "w-full py-3 rounded-xl text-[14px] font-semibold transition-all duration-200",
            pending > 0
              ? "bg-white/[0.06] text-[#6B7085] cursor-not-allowed"
              : "bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-[#22D3A5] text-white hover:opacity-90"
          )}
        >
          {pending > 0 ? `${pending} decisions pending` : 'Sign off & send'}
        </button>
      </div>
    </aside>
  );
}
