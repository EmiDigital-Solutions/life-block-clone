/**
 * Objective Evidence Traceability Matrix — IATF 16949 / VDA 6.3 compliant
 * Cross-references each NCR to specific evidence items (photos, docs, measurements)
 */

import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { FileCheck, Camera, FileText, Ruler, Video } from "lucide-react";

const evidenceTypeIcons: Record<string, typeof Camera> = {
  photo: Camera,
  document: FileText,
  measurement: Ruler,
  video: Video,
};

// Evidence registry linking NCRs to specific auditable evidence
const evidenceRegistry: Record<string, { id: string; type: string; description: string; location: string; timestamp: string }[]> = {
  'NCR-001': [
    { id: 'EV-001', type: 'measurement', description: 'CMM report — Bore ID Ø42H7, Cpk 0.98', location: 'CNC Cell #3', timestamp: '2025-03-14 09:42' },
    { id: 'EV-002', type: 'photo', description: 'CNC #2 calibration sticker — expired 2024-12-01', location: 'CNC Cell #1', timestamp: '2025-03-14 10:15' },
    { id: 'EV-003', type: 'document', description: 'Calibration schedule — no responsible person assigned', location: 'QA Office', timestamp: '2025-03-14 14:30' },
    { id: 'EV-004', type: 'measurement', description: 'SPC chart — bore ID last 200 parts, Cpk trend declining', location: 'CNC Cell #3', timestamp: '2025-03-14 09:55' },
  ],
  'NCR-002': [
    { id: 'EV-005', type: 'photo', description: 'Quarantine area — unmarked boundary, no barrier tape', location: 'Production Floor', timestamp: '2025-03-15 08:20' },
    { id: 'EV-006', type: 'document', description: 'Nonconforming material log — 3 entries missing disposition', location: 'QA Office', timestamp: '2025-03-15 09:00' },
    { id: 'EV-007', type: 'photo', description: 'Red bin overflow — parts touching conforming product', location: 'Assembly Line 2', timestamp: '2025-03-15 08:35' },
  ],
  'NCR-003': [
    { id: 'EV-008', type: 'document', description: 'CAPA register — 3 actions overdue >30 days', location: 'QA System', timestamp: '2025-03-14 15:00' },
    { id: 'EV-009', type: 'document', description: '8D report #2024-R017 — effectiveness check not performed', location: 'QA Office', timestamp: '2025-03-14 15:20' },
  ],
  'NCR-004': [
    { id: 'EV-010', type: 'measurement', description: 'Incoming inspection — S-017 ABS resin, 3 unsigned records', location: 'Incoming Dock', timestamp: '2025-03-14 11:10' },
    { id: 'EV-011', type: 'document', description: 'Supplier scorecard — S-017 rejection rate 4.2% (target 2.5%)', location: 'Procurement', timestamp: '2025-03-14 11:30' },
  ],
  'NCR-005': [
    { id: 'EV-012', type: 'photo', description: 'Boring bar tool — visible wear beyond specification limit', location: 'Tool Crib', timestamp: '2025-03-14 10:45' },
    { id: 'EV-013', type: 'document', description: 'Tool life tracking sheet — 123% of rated life', location: 'CNC Cell #2', timestamp: '2025-03-14 10:50' },
  ],
};

// PFMEA and Control Plan cross-references
const fmeaLinkage: Record<string, { pfmeaItem: string; controlPlanItem: string; characteristic: string; controlMethod: string }> = {
  'NCR-001': { pfmeaItem: 'PFMEA-042-H7', controlPlanItem: 'CP-042-007', characteristic: 'Bore ID Ø42H7 ±0.025mm', controlMethod: 'SPC — 100% CMM every 25th part' },
  'NCR-002': { pfmeaItem: 'PFMEA-NC-001', controlPlanItem: 'CP-NC-003', characteristic: 'Nonconforming material segregation', controlMethod: 'Visual inspection — red bin system' },
  'NCR-004': { pfmeaItem: 'PFMEA-INC-012', controlPlanItem: 'CP-INC-005', characteristic: 'ABS resin melt flow index', controlMethod: 'Incoming lot sampling — AQL 1.0' },
  'NCR-005': { pfmeaItem: 'PFMEA-TOOL-003', controlPlanItem: 'CP-TOOL-001', characteristic: 'Tool wear / replacement cycle', controlMethod: 'Tool life counter — replace at 80% rated life' },
};

export default function EvidenceTraceabilityMatrix({ depth = 'standard' }: { depth?: string }) {
  const { allNCRs } = useAuditReportContext();

  if (depth === 'executive') {
    // Compact executive view
    return (
      <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40">
          <FileCheck className="w-4 h-4 text-primary" />
          <span className="text-[15px] font-semibold text-foreground">Evidence Traceability Matrix</span>
          <span className="ml-auto text-[12px] text-muted-foreground">
            {Object.values(evidenceRegistry).flat().length} evidence items linked to {allNCRs.length} NCRs
          </span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/20">
              {['NCR', 'Finding', 'Evidence Count', 'Types', 'PFMEA Ref', 'Control Plan Ref'].map(h => (
                <th key={h} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allNCRs.map(ncr => {
              const evidence = evidenceRegistry[ncr.id] || [];
              const fmea = fmeaLinkage[ncr.id];
              const types = [...new Set(evidence.map(e => e.type))];
              return (
                <tr key={ncr.id} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-4 py-2">
                    <span className={`text-[12px] font-bold font-mono px-1.5 py-0.5 ${ncr.severity === 'major' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'}`}>
                      {ncr.id}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[13px] text-foreground max-w-[200px] truncate">{ncr.title}</td>
                  <td className="px-4 py-2 text-[14px] font-bold font-mono text-foreground">{evidence.length}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1">
                      {types.map(t => {
                        const Icon = evidenceTypeIcons[t] || FileText;
                        return <Icon key={t} className="w-3.5 h-3.5 text-muted-foreground" />;
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[12px] font-mono text-primary">{fmea?.pfmeaItem || '—'}</td>
                  <td className="px-4 py-2 text-[12px] font-mono text-primary">{fmea?.controlPlanItem || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Standard/Full view — detailed matrix
  return (
    <section id="evidence-matrix" className="scroll-mt-20 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <FileCheck className="w-5 h-5 text-primary" />
        <h2 className="text-[22px] font-light text-foreground tracking-tight">Objective Evidence Matrix</h2>
      </div>

      {allNCRs.map(ncr => {
        const evidence = evidenceRegistry[ncr.id] || [];
        const fmea = fmeaLinkage[ncr.id];
        if (evidence.length === 0) return null;

        return (
          <div key={ncr.id} className="bg-card border border-border/60 rounded-lg overflow-hidden">
            {/* NCR header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border/40">
              <span className={`text-[12px] font-bold font-mono px-2 py-0.5 ${ncr.severity === 'major' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'}`}>
                {ncr.id} · {ncr.severity.toUpperCase()}
              </span>
              <span className="text-[14px] font-medium text-foreground">{ncr.title}</span>
              {ncr.isoClause && (
                <span className="ml-auto text-[12px] font-mono text-primary bg-primary/8 px-2 py-0.5">{ncr.isoClause}</span>
              )}
            </div>

            {/* PFMEA / Control Plan linkage */}
            {fmea && (
              <div className="px-5 py-2 bg-primary/5 border-b border-border/30 grid grid-cols-4 gap-4">
                {[
                  ['PFMEA Item', fmea.pfmeaItem],
                  ['Control Plan', fmea.controlPlanItem],
                  ['Characteristic', fmea.characteristic],
                  ['Control Method', fmea.controlMethod],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                    <div className="text-[13px] text-foreground mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Evidence items */}
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/10">
                  {['Evidence ID', 'Type', 'Description', 'Location', 'Timestamp'].map(h => (
                    <th key={h} className="px-5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evidence.map(ev => {
                  const Icon = evidenceTypeIcons[ev.type] || FileText;
                  return (
                    <tr key={ev.id} className="border-b border-border/20 hover:bg-muted/20">
                      <td className="px-5 py-2 text-[12px] font-mono font-bold text-primary">{ev.id}</td>
                      <td className="px-5 py-2">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-[12px] capitalize text-muted-foreground">{ev.type}</span>
                        </div>
                      </td>
                      <td className="px-5 py-2 text-[13px] text-foreground">{ev.description}</td>
                      <td className="px-5 py-2 text-[12px] text-muted-foreground">{ev.location}</td>
                      <td className="px-5 py-2 text-[12px] font-mono text-muted-foreground">{ev.timestamp}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </section>
  );
}
