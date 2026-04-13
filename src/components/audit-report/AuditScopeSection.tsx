import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AuditScopeSection() {
  const { auditScope } = useAuditReportContext();

  return (
    <section id="station-2" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// 02</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">Audit Scope</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">Audit Scope</h2>

      <div className=" bg-card shadow-sm p-6 md:p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-2">Standard</h4>
            <p className="text-[15px] text-foreground font-medium">{auditScope.standard}</p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-2">Audit Type</h4>
            <p className="text-[15px] text-foreground font-medium">{auditScope.auditType}</p>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-2">Scope of Certification</h4>
          <p className="text-[14px] text-charcoal leading-relaxed">{auditScope.scope}</p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-3">Exclusions</h4>
          <div className="space-y-2">
            {auditScope.exclusions.map((ex, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                <XCircle className="w-4 h-4 text-grey-mid mt-0.5 shrink-0" />
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-3">VDA 6.3 Process Elements</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {auditScope.processElements.map(pe => (
              <div key={pe.code} className={`flex items-center gap-2 px-3 py-2  border ${pe.applicable ? 'border-accent/20 bg-accent/5' : 'border-border bg-muted'}`}>
                {pe.applicable ? <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> : <XCircle className="w-3.5 h-3.5 text-grey-mid" />}
                <span className={`text-[12px] font-medium ${pe.applicable ? 'text-foreground' : 'text-grey-mid line-through'}`}>{pe.code} — {pe.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-3">Product Scope</h4>
          <div className=" overflow-hidden">
            <div className="grid grid-cols-4 gap-0 bg-muted px-4 py-2">
              {['Part Number', 'Description', 'Annual Volume', 'Customer'].map(h => (
                <span key={h} className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{h}</span>
              ))}
            </div>
            {auditScope.productScope.map(p => (
              <div key={p.partNumber} className="grid grid-cols-4 gap-0 px-4 py-2.5 border-t border-border/40">
                <span className="text-[13px] font-mono text-primary">{p.partNumber}</span>
                <span className="text-[13px] text-foreground">{p.description}</span>
                <span className="text-[13px] text-charcoal tabular-nums">{p.volume}</span>
                <span className="text-[13px] text-muted-foreground">{p.customer}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-3">Site Details</h4>
            <div className="space-y-2">
              {[
                ['Production area', auditScope.siteDetails.area],
                ['Employees', String(auditScope.siteDetails.employees)],
                ['Shifts', String(auditScope.siteDetails.shifts)],
                ['CNC machines', String(auditScope.siteDetails.machines)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[13px] text-muted-foreground">{k}</span>
                  <span className="text-[13px] font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-3">Previous Audit Carry-forward</h4>
            <div className="space-y-2">
              {[
                ['Total findings', String(auditScope.previousFindings.total)],
                ['Closed', String(auditScope.previousFindings.closed)],
                ['Open carry-forward', String(auditScope.previousFindings.openCarryForward)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[13px] text-muted-foreground">{k}</span>
                  <span className="text-[13px] font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-2">Sampling Basis</h4>
          <p className="text-[13px] text-charcoal leading-relaxed">{auditScope.samplingBasis}</p>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-2">Audit Team</h4>
          {auditScope.auditorQualifications.map((aq, i) => (
            <p key={i} className="text-[13px] text-charcoal leading-relaxed">{aq}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
