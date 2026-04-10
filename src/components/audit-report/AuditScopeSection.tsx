import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AuditScopeSection() {
  const { auditScope } = useAuditReportContext();

  return (
    <section id="station-2" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// 02</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Audit Scope</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none">Audit Scope</h2>

      <div className=" border border-[#E5E7EB] bg-white p-6 md:p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-2">Standard</h4>
            <p className="text-[15px] text-[#0A0A0A] font-medium">{auditScope.standard}</p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-2">Audit Type</h4>
            <p className="text-[15px] text-[#0A0A0A] font-medium">{auditScope.auditType}</p>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-2">Scope of Certification</h4>
          <p className="text-[14px] text-[#1A1A1A] leading-relaxed">{auditScope.scope}</p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-3">Exclusions</h4>
          <div className="space-y-2">
            {auditScope.exclusions.map((ex, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-[#7B8E80]">
                <XCircle className="w-4 h-4 text-[#C0C0C0] mt-0.5 shrink-0" />
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-3">VDA 6.3 Process Elements</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {auditScope.processElements.map(pe => (
              <div key={pe.code} className={`flex items-center gap-2 px-3 py-2  border ${pe.applicable ? 'border-[#6EA996]/20 bg-[#6EA996]/5' : 'border-[#E5E7EB] bg-[#F5F5F5]'}`}>
                {pe.applicable ? <CheckCircle2 className="w-3.5 h-3.5 text-[#6EA996]" /> : <XCircle className="w-3.5 h-3.5 text-[#C0C0C0]" />}
                <span className={`text-[12px] font-medium ${pe.applicable ? 'text-[#0A0A0A]' : 'text-[#C0C0C0] line-through'}`}>{pe.code} — {pe.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-3">Product Scope</h4>
          <div className=" border border-[#E5E7EB] overflow-hidden">
            <div className="grid grid-cols-4 gap-0 bg-[#F5F5F5] px-4 py-2">
              {['Part Number', 'Description', 'Annual Volume', 'Customer'].map(h => (
                <span key={h} className="text-[10px] uppercase tracking-wider text-[#7B8E80] font-semibold">{h}</span>
              ))}
            </div>
            {auditScope.productScope.map(p => (
              <div key={p.partNumber} className="grid grid-cols-4 gap-0 px-4 py-2.5 border-t border-[#E5E7EB]">
                <span className="text-[13px] font-mono text-[#0A7FA5]">{p.partNumber}</span>
                <span className="text-[13px] text-[#0A0A0A]">{p.description}</span>
                <span className="text-[13px] text-[#1A1A1A] tabular-nums">{p.volume}</span>
                <span className="text-[13px] text-[#7B8E80]">{p.customer}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-3">Site Details</h4>
            <div className="space-y-2">
              {[
                ['Production area', auditScope.siteDetails.area],
                ['Employees', String(auditScope.siteDetails.employees)],
                ['Shifts', String(auditScope.siteDetails.shifts)],
                ['CNC machines', String(auditScope.siteDetails.machines)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[13px] text-[#7B8E80]">{k}</span>
                  <span className="text-[13px] font-medium text-[#0A0A0A]">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-3">Previous Audit Carry-forward</h4>
            <div className="space-y-2">
              {[
                ['Total findings', String(auditScope.previousFindings.total)],
                ['Closed', String(auditScope.previousFindings.closed)],
                ['Open carry-forward', String(auditScope.previousFindings.openCarryForward)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[13px] text-[#7B8E80]">{k}</span>
                  <span className="text-[13px] font-medium text-[#0A0A0A]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-2">Sampling Basis</h4>
          <p className="text-[13px] text-[#1A1A1A] leading-relaxed">{auditScope.samplingBasis}</p>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-2">Audit Team</h4>
          {auditScope.auditorQualifications.map((aq, i) => (
            <p key={i} className="text-[13px] text-[#1A1A1A] leading-relaxed">{aq}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
