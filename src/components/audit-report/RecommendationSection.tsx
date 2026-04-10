import { Mail, CalendarPlus, ExternalLink } from "lucide-react";

export default function RecommendationSection() {
  const nextSteps = [
    { icon: Mail, label: 'Email SPM with this report link', action: 'Send email' },
    { icon: CalendarPlus, label: 'Schedule re-audit in 14 days for NCR-0003', action: 'Add to calendar' },
    { icon: ExternalLink, label: 'Release partial PO for Lot A only', action: 'Open ERP' },
  ];

  return (
    <section id="station-12" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-[32px] font-semibold text-[#F5F6FA] tracking-tight leading-none">
          Recommendation & Next Steps
        </span>
      </div>

      {/* Monday morning block */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
        <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-6">Monday Morning — 3 actions</h4>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <span className="text-[16px] font-mono text-[#6B7085] w-6">{i + 1}.</span>
              <step.icon className="w-4 h-4 text-[#22D3EE] shrink-0" />
              <span className="text-[14px] text-[#F5F6FA] flex-1">{step.label}</span>
              <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#22D3EE] border border-[#22D3EE]/20 hover:bg-[#22D3EE]/10 opacity-0 group-hover:opacity-100 transition-all">
                {step.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Supplier view toggle */}
      <div className="rounded-2xl border border-dashed border-white/[0.12] p-6 text-center">
        <p className="text-[14px] text-[#A1A5B7] mb-3">Share this report from the supplier's perspective</p>
        <button className="px-6 py-2.5 rounded-xl text-[13px] font-medium text-[#F5F6FA] border border-white/[0.12] hover:bg-white/[0.06] transition-colors">
          Switch to Supplier View →
        </button>
      </div>
    </section>
  );
}
