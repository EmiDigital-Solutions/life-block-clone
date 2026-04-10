import { Mail, CalendarPlus, ExternalLink } from "lucide-react";

export default function RecommendationSection() {
  const nextSteps = [
    { icon: Mail, label: 'Email SPM with this report link', action: 'Send email' },
    { icon: CalendarPlus, label: 'Schedule re-audit in 14 days for NCR-0003', action: 'Add to calendar' },
    { icon: ExternalLink, label: 'Release partial PO for Lot A only', action: 'Open ERP' },
  ];

  return (
    <section id="station-13" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// 13</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Recommendation</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none">
        Recommendation & Next Steps
      </h2>

      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8">
        <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-6">Monday Morning — 3 actions</h4>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F5F5] transition-colors group">
              <span className="text-[16px] font-mono text-[#C0C0C0] w-6">{i + 1}.</span>
              <step.icon className="w-4 h-4 text-[#0A7FA5] shrink-0" />
              <span className="text-[14px] text-[#0A0A0A] flex-1">{step.label}</span>
              <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#0A7FA5] border border-[#0A7FA5]/20 hover:bg-[#0A7FA5]/5 opacity-0 group-hover:opacity-100 transition-all">
                {step.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-[#C0C0C0] p-6 text-center">
        <p className="text-[14px] text-[#7B8E80] mb-3">Share this report from the supplier's perspective</p>
        <button className="px-6 py-2.5 rounded-lg text-[13px] font-medium text-[#0A0A0A] border border-[#E5E7EB] hover:bg-[#F5F5F5] transition-colors">
          Switch to Supplier View →
        </button>
      </div>
    </section>
  );
}
