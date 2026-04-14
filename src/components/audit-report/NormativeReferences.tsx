/**
 * Normative References & Definitions — VDA 6.3:2023 compliant
 * Lists applicable standards, customer-specific requirements, and key definitions
 */

const normativeRefs = [
  { standard: 'VDA 6.3:2023', title: 'Process Audit — Automotive Industry', scope: 'Primary audit standard' },
  { standard: 'ISO 9001:2015', title: 'Quality Management Systems — Requirements', scope: 'QMS baseline' },
  { standard: 'IATF 16949:2016', title: 'Automotive QMS — Particular Requirements', scope: 'Automotive-specific requirements' },
  { standard: 'VDA 6.5', title: 'Product Audit', scope: 'Product-level verification' },
  { standard: 'ISO 19011:2018', title: 'Guidelines for Auditing Management Systems', scope: 'Audit methodology' },
  { standard: 'BMW QMT 0800', title: 'BMW Group Supplier Quality Management', scope: 'Customer-specific requirement (CSR)' },
  { standard: 'BMW GS 95003-1', title: 'General Specification — Quality Assurance Agreements', scope: 'CSR overlay' },
];

const definitions = [
  { term: 'NCR', definition: 'Non-Conformity Report — documented deviation from specified requirements' },
  { term: 'CAPA', definition: 'Corrective and Preventive Action — systematic approach to eliminate root causes' },
  { term: 'Cpk', definition: 'Process Capability Index — statistical measure of process performance (min. 1.33 for BMW)' },
  { term: 'DPPM', definition: 'Defective Parts Per Million — quality metric for delivered product' },
  { term: 'OEE', definition: 'Overall Equipment Effectiveness — composite metric: Availability × Performance × Quality' },
  { term: 'Star Question (*)', definition: 'VDA 6.3 mandatory question — score of 0 triggers automatic element degradation to 0%' },
  { term: 'CSR', definition: 'Customer-Specific Requirement — additional requirements beyond IATF 16949 imposed by OEM' },
  { term: 'PFMEA', definition: 'Process Failure Mode and Effects Analysis — risk assessment tool per AIAG/VDA' },
];

const abbreviations = [
  ['BMW', 'Bayerische Motoren Werke AG'],
  ['SQE', 'Supplier Quality Engineer'],
  ['IRCA', 'International Register of Certificated Auditors'],
  ['VDA', 'Verband der Automobilindustrie'],
  ['IATF', 'International Automotive Task Force'],
  ['QMS', 'Quality Management System'],
  ['SPC', 'Statistical Process Control'],
  ['MSA', 'Measurement System Analysis'],
  ['PPAP', 'Production Part Approval Process'],
  ['APQP', 'Advanced Product Quality Planning'],
];

export default function NormativeReferences() {
  return (
    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
      <div className="px-5 py-3 border-b border-border/40">
        <span className="text-[15px] font-semibold text-foreground">Normative References & Definitions</span>
      </div>

      {/* Normative references table */}
      <div className="border-b border-border/40">
        <div className="px-5 py-2 bg-muted/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Applicable Standards</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/10">
              {['Standard', 'Title', 'Application'].map(h => (
                <th key={h} className="px-5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {normativeRefs.map((ref, i) => (
              <tr key={i} className="border-b border-border/20">
                <td className="px-5 py-1.5 text-[13px] font-mono font-bold text-primary">{ref.standard}</td>
                <td className="px-5 py-1.5 text-[13px] text-foreground">{ref.title}</td>
                <td className="px-5 py-1.5 text-[12px] text-muted-foreground">{ref.scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Definitions and abbreviations — side by side */}
      <div className="grid grid-cols-2 divide-x divide-border/30">
        <div>
          <div className="px-5 py-2 bg-muted/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Key Definitions</span>
          </div>
          <div className="px-5 py-2 space-y-1.5">
            {definitions.map((d, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[12px] font-bold font-mono text-foreground shrink-0 w-[100px]">{d.term}</span>
                <span className="text-[12px] text-muted-foreground leading-snug">{d.definition}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="px-5 py-2 bg-muted/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Abbreviations</span>
          </div>
          <div className="px-5 py-2 space-y-1">
            {abbreviations.map(([abbr, full], i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[12px] font-bold font-mono text-foreground shrink-0 w-[60px]">{abbr}</span>
                <span className="text-[12px] text-muted-foreground">{full}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
