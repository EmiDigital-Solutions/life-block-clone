/**
 * Customer-Specific Requirements (CSR) Compliance Mapping
 * Maps findings to OEM-specific requirements beyond IATF 16949
 */

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type CSRStatus = 'compliant' | 'non-compliant' | 'partial' | 'not-assessed';

interface CSRItem {
  id: string;
  oemRef: string;
  requirement: string;
  iatfClause: string;
  status: CSRStatus;
  ncrRef?: string;
  finding: string;
}

const bmwCSRs: CSRItem[] = [
  {
    id: 'CSR-01', oemRef: 'QMT 0800 §4.2', requirement: 'Process capability Cpk ≥ 1.33 for special characteristics',
    iatfClause: 'IATF §8.5.1.1', status: 'non-compliant', ncrRef: 'NCR-001',
    finding: 'Bore ID Cpk 0.98 — below BMW minimum 1.33. Immediate containment required.',
  },
  {
    id: 'CSR-02', oemRef: 'QMT 0800 §5.1', requirement: 'Supplier DPPM ≤ 50 rolling 12 months',
    iatfClause: 'IATF §9.1.2', status: 'non-compliant', ncrRef: 'NCR-004',
    finding: 'Current DPPM 410 — exceeds target by 8.2×. Escalation to Q-Status 3 triggered.',
  },
  {
    id: 'CSR-03', oemRef: 'QMT 0800 §6.3', requirement: 'Calibration system — all gauges within validity',
    iatfClause: 'IATF §7.1.5.1', status: 'non-compliant', ncrRef: 'NCR-001',
    finding: 'CNC #2 and #4 calibration expired. No backup responsible assigned.',
  },
  {
    id: 'CSR-04', oemRef: 'GS 95003-1 §3.4', requirement: 'Nonconforming product — segregation with physical barrier',
    iatfClause: 'IATF §8.7.1', status: 'non-compliant', ncrRef: 'NCR-002',
    finding: 'Quarantine area exists but boundary unmarked. Risk of cross-contamination.',
  },
  {
    id: 'CSR-05', oemRef: 'QMT 0800 §7.1', requirement: 'CAPA closure within 30 days for major findings',
    iatfClause: 'IATF §10.2.1', status: 'non-compliant', ncrRef: 'NCR-003',
    finding: 'CAPA closure rate 62.5%. 3 actions overdue >30 days.',
  },
  {
    id: 'CSR-06', oemRef: 'QMT 0800 §4.1', requirement: 'PFMEA — update within 30 days of process change',
    iatfClause: 'IATF §8.3.5.2', status: 'partial',
    finding: 'PFMEA exists and is current. Minor gap: last revision 45 days after tooling change.',
  },
  {
    id: 'CSR-07', oemRef: 'GS 95003-1 §2.1', requirement: 'Traceability — lot-level tracking for all safety-critical parts',
    iatfClause: 'IATF §8.5.2.1', status: 'compliant',
    finding: 'Full lot traceability via SAP. Verified for 3 sample lots.',
  },
  {
    id: 'CSR-08', oemRef: 'QMT 0800 §8.1', requirement: 'Sub-supplier management — approved supplier list maintained',
    iatfClause: 'IATF §8.4.1.2', status: 'compliant',
    finding: 'ASL covers 42 suppliers. All tier-1 subs have current quality agreements.',
  },
  {
    id: 'CSR-09', oemRef: 'GS 95003-1 §5.2', requirement: 'Annual management review including quality cost analysis',
    iatfClause: 'IATF §9.3.2.1', status: 'compliant',
    finding: 'Management review conducted Jan 2025. Quality costs reported at 3.2% of revenue.',
  },
];

const statusConfig: Record<CSRStatus, { label: string; color: string; bg: string; Icon: typeof CheckCircle2 }> = {
  'compliant': { label: 'Compliant', color: 'hsl(155, 24%, 40%)', bg: 'hsl(155, 24%, 40%, 0.1)', Icon: CheckCircle2 },
  'non-compliant': { label: 'Non-Compliant', color: 'hsl(0, 48%, 46%)', bg: 'hsl(0, 48%, 46%, 0.1)', Icon: XCircle },
  'partial': { label: 'Partial', color: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 53%, 0.1)', Icon: AlertTriangle },
  'not-assessed': { label: 'N/A', color: 'hsl(220, 10%, 60%)', bg: 'hsl(220, 10%, 60%, 0.1)', Icon: CheckCircle2 },
};

export default function CSRComplianceMapping({ depth = 'standard' }: { depth?: string }) {
  const compliant = bmwCSRs.filter(c => c.status === 'compliant').length;
  const nonCompliant = bmwCSRs.filter(c => c.status === 'non-compliant').length;
  const partial = bmwCSRs.filter(c => c.status === 'partial').length;

  if (depth === 'executive') {
    return (
      <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-border/40 flex items-center justify-between">
          <span className="text-[15px] font-semibold text-foreground">BMW Customer-Specific Requirements (CSR)</span>
          <div className="flex items-center gap-3 text-[12px]">
            <span className="text-accent font-bold">✓ {compliant}</span>
            <span className="text-destructive font-bold">✕ {nonCompliant}</span>
            <span className="text-warning font-bold">◐ {partial}</span>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/20">
              {['BMW Ref', 'Requirement', 'IATF Clause', 'Status', 'NCR'].map(h => (
                <th key={h} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bmwCSRs.map(csr => {
              const config = statusConfig[csr.status];
              const Icon = config.Icon;
              return (
                <tr key={csr.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="px-4 py-2 text-[12px] font-mono text-foreground">{csr.oemRef}</td>
                  <td className="px-4 py-2 text-[13px] text-foreground max-w-[280px]">{csr.requirement}</td>
                  <td className="px-4 py-2 text-[12px] font-mono text-primary">{csr.iatfClause}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                      <span className="text-[12px] font-bold" style={{ color: config.color }}>{config.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {csr.ncrRef ? (
                      <span className="text-[11px] font-mono font-bold text-destructive bg-destructive/10 px-1.5 py-0.5">{csr.ncrRef}</span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Standard/Full — detailed view with findings
  return (
    <section id="csr-mapping" className="scroll-mt-20 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-[22px] font-light text-foreground tracking-tight">Customer-Specific Requirements — BMW</h2>
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-3 text-[13px]">
          <span className="text-accent font-bold">✓ {compliant} Compliant</span>
          <span className="text-destructive font-bold">✕ {nonCompliant} Non-Compliant</span>
          <span className="text-warning font-bold">◐ {partial} Partial</span>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
        {bmwCSRs.map((csr, i) => {
          const cfg = statusConfig[csr.status];
          const Icon = cfg.Icon;
          return (
            <div key={csr.id} className={`px-5 py-3 ${i > 0 ? 'border-t border-border/30' : ''} hover:bg-muted/20`}>
              <div className="flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cfg.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[12px] font-mono font-bold text-foreground">{csr.oemRef}</span>
                    <span className="text-[12px] text-border">→</span>
                    <span className="text-[12px] font-mono text-primary">{csr.iatfClause}</span>
                    {csr.ncrRef && (
                      <span className="text-[11px] font-mono font-bold text-destructive bg-destructive/10 px-1.5 py-0.5">{csr.ncrRef}</span>
                    )}
                    <span className="text-[12px] font-bold px-1.5 py-0.5" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <p className="text-[14px] text-foreground mt-1">{csr.requirement}</p>
                  <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{csr.finding}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
