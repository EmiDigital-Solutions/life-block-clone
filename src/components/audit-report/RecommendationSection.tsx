import { Mail, CalendarPlus, ExternalLink, FileDown, Printer, Users, Eye } from "lucide-react";
import DigitalSignatureWorkflow from "./DigitalSignatureWorkflow";
import CommentingAnnotation from "./CommentingAnnotation";
import VersionComparison from "./VersionComparison";
import CrossAuditBenchmark from "./CrossAuditBenchmark";

export default function RecommendationSection() {
  const nextSteps = [
    { icon: Mail, label: 'Email SPM with this report link', action: 'Send email' },
    { icon: CalendarPlus, label: 'Schedule re-audit in 14 days for NCR-0003', action: 'Add to calendar' },
    { icon: ExternalLink, label: 'Release partial PO for Lot A only', action: 'Open ERP' },
  ];

  return (
    <section id="station-13" className="scroll-mt-20 space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// 13</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">Recommendation</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">
        Recommendation & Next Steps
      </h2>

      {/* Monday Morning Actions */}
      <div className="border border-border bg-white p-6 md:p-8">
        <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-6">Monday Morning — 3 actions</h4>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-border hover:bg-muted transition-colors group">
              <span className="text-[16px] font-mono text-grey-mid w-6">{i + 1}.</span>
              <step.icon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-foreground flex-1">{step.label}</span>
              <button className="px-3 py-1.5 text-[12px] font-medium text-primary border border-primary/20 hover:bg-primary/5 opacity-0 group-hover:opacity-100 transition-all">
                {step.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Audit Benchmarking */}
      <CrossAuditBenchmark />

      {/* Digital Signature Workflow */}
      <DigitalSignatureWorkflow />

      {/* Export & Role-Based Views */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-border bg-white p-5 space-y-3">
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Export</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-muted transition-colors text-left">
              <FileDown className="w-4 h-4 text-primary" />
              <div>
                <span className="text-[13px] text-foreground font-medium">PDF with Corporate Branding</span>
                <p className="text-[10px] text-muted-foreground">Client logo, custom header/footer, cover page</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-muted transition-colors text-left">
              <Printer className="w-4 h-4 text-primary" />
              <div>
                <span className="text-[13px] text-foreground font-medium">Print-Ready Format</span>
                <p className="text-[10px] text-muted-foreground">Optimized for A4, grayscale safe</p>
              </div>
            </button>
          </div>
        </div>

        <div className="border border-border bg-white p-5 space-y-3">
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Role-Based Views</h4>
          <div className="space-y-2">
            {[
              { role: 'Procurement', desc: 'Cost data, supplier terms, risk exposure', icon: Users },
              { role: 'Quality Engineering', desc: 'Technical findings, NCRs, CAPA status', icon: Eye },
              { role: 'C-Suite', desc: 'Executive summary, verdict, key metrics', icon: Eye },
            ].map((view, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-muted transition-colors text-left">
                <view.icon className="w-4 h-4 text-primary" />
                <div>
                  <span className="text-[13px] text-foreground font-medium">{view.role}</span>
                  <p className="text-[10px] text-muted-foreground">{view.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Version Comparison */}
      <VersionComparison />

      {/* Commenting & Annotation */}
      <CommentingAnnotation />

      {/* Switch to Supplier View */}
      <div className="border border-dashed border-[#C0C0C0] p-6 text-center">
        <p className="text-[14px] text-muted-foreground mb-3">Share this report from the supplier's perspective</p>
        <button className="px-6 py-2.5 text-[13px] font-medium text-foreground border border-border hover:bg-muted transition-colors">
          Switch to Supplier View →
        </button>
      </div>
    </section>
  );
}
