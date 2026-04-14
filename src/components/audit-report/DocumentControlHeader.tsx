/**
 * Document Control Header — VDA 6.3:2023 / IATF 16949 compliant
 * Report identification, revision history, distribution list, confidentiality classification
 */

import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Lock, FileText } from "lucide-react";

const revisionHistory = [
  { rev: '1.0', date: '2025-03-15', author: 'I. Petrović', change: 'Initial issue — audit conducted 14–15 Mar 2025' },
  { rev: '0.9', date: '2025-03-14', author: 'I. Petrović', change: 'Draft for internal review' },
];

const distributionList = [
  { name: 'J. Müller', role: 'BMW SQE', org: 'BMW AG', access: 'Full Report' },
  { name: 'T. Schwarz', role: 'Procurement Lead', org: 'BMW AG', access: 'Executive Summary + NCRs' },
  { name: 'M. Jurić', role: 'Managing Director', org: 'AD Plastik d.o.o.', access: 'Full Report' },
  { name: 'A. Horvat', role: 'Quality Manager', org: 'AD Plastik d.o.o.', access: 'Full Report' },
  { name: 'I. Petrović', role: 'Lead Auditor', org: 'YVOO GmbH', access: 'Full Report' },
];

export default function DocumentControlHeader() {
  const { reportMeta } = useAuditReportContext();

  return (
    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
      {/* Confidentiality banner */}
      <div className="flex items-center gap-2 px-5 py-2 bg-destructive/8 border-b border-destructive/20">
        <Lock className="w-3.5 h-3.5 text-destructive" />
        <span className="text-[12px] font-bold uppercase tracking-wider text-destructive">
          Confidential — BMW Supplier Quality
        </span>
        <span className="ml-auto text-[11px] text-destructive/70">
          Distribution restricted to named recipients only
        </span>
      </div>

      {/* Document identification */}
      <div className="px-5 py-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-[15px] font-semibold text-foreground">Document Control</span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-border/30">
        {/* Left — document ID */}
        <div className="px-5 py-3 space-y-2">
          {[
            ['Document ID', `PA-${reportMeta.date.replace(/-/g, '')}-001`],
            ['Document Type', 'Process Audit Report'],
            ['Current Revision', '1.0'],
            ['Status', 'Issued'],
            ['Classification', 'Confidential — OEM Supplier Quality'],
            ['Retention Period', '15 years (IATF 16949 §7.5.3.2)'],
          ].map(([k, v], i) => (
            <div key={i} className="flex justify-between py-0.5">
              <span className="text-[13px] text-muted-foreground">{k}</span>
              <span className="text-[13px] font-medium text-foreground">{v}</span>
            </div>
          ))}
        </div>

        {/* Right — revision history */}
        <div className="px-5 py-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Revision History</div>
          <table className="w-full text-left">
            <thead>
              <tr>
                {['Rev', 'Date', 'Author', 'Description'].map(h => (
                  <th key={h} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pb-1.5 pr-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revisionHistory.map((r, i) => (
                <tr key={i} className="border-t border-border/20">
                  <td className="py-1.5 pr-3 text-[12px] font-mono font-bold text-primary">{r.rev}</td>
                  <td className="py-1.5 pr-3 text-[12px] text-foreground">{new Date(r.date).toLocaleDateString('de-DE')}</td>
                  <td className="py-1.5 pr-3 text-[12px] text-foreground">{r.author}</td>
                  <td className="py-1.5 text-[12px] text-muted-foreground">{r.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution list */}
      <div className="border-t border-border/40">
        <div className="px-5 py-2 bg-muted/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Authorized Distribution</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/10">
              {['Recipient', 'Role', 'Organization', 'Access Level'].map(h => (
                <th key={h} className="px-5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distributionList.map((d, i) => (
              <tr key={i} className="border-b border-border/20">
                <td className="px-5 py-1.5 text-[13px] font-medium text-foreground">{d.name}</td>
                <td className="px-5 py-1.5 text-[12px] text-muted-foreground">{d.role}</td>
                <td className="px-5 py-1.5 text-[12px] text-foreground">{d.org}</td>
                <td className="px-5 py-1.5 text-[12px] text-muted-foreground">{d.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
