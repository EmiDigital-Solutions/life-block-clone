import { useAuditReportContext } from "@/contexts/AuditReportContext";

/**
 * VDA 6.3 Process Element Scoring Table
 * Formal tabular layout matching real VDA 6.3:2023 audit reports
 */

const vdaClassification = (score: number): { grade: string; color: string; bg: string; label: string } => {
  if (score >= 90) return { grade: 'A', color: 'hsl(155, 24%, 40%)', bg: 'hsl(155, 24%, 40%, 0.12)', label: 'Qualified' };
  if (score >= 80) return { grade: 'AB', color: 'hsl(155, 24%, 50%)', bg: 'hsl(155, 24%, 50%, 0.12)', label: 'Conditionally Qualified' };
  if (score >= 70) return { grade: 'B', color: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 53%, 0.12)', label: 'Conditionally Qualified' };
  if (score >= 60) return { grade: 'B', color: 'hsl(24, 72%, 53%)', bg: 'hsl(24, 72%, 53%, 0.12)', label: 'Not Qualified — Development Required' };
  return { grade: 'C', color: 'hsl(0, 48%, 46%)', bg: 'hsl(0, 48%, 46%, 0.12)', label: 'Not Qualified' };
};

const degradationRules = [
  'Any element with a single question scored 0 → element result = 0%',
  'Any question with score ≤4 triggers mandatory corrective action',
  'Sub-elements P5.1–P5.7 are individually assessed (VDA 6.3:2023 §8.3)',
];

// VDA 6.3 question-level data for each process element
const vdaQuestions: Record<string, { id: string; question: string; score: number; max: number; notes: string; star?: boolean }[]> = {
  'P1': [
    { id: 'P1.1', question: 'Is the supplier management system established for external provided products/services?', score: 8, max: 10, notes: 'System established. Matrix covers 42 suppliers.' },
    { id: 'P1.2', question: 'Are customer requirements considered in the potential analysis?', score: 8, max: 10, notes: 'BMW requirements mapped.' },
    { id: 'P1.3', question: 'Is the feasibility of manufacturing assessed?', score: 8, max: 10, notes: 'Feasibility study complete.' },
  ],
  'P2': [
    { id: 'P2.1', question: 'Is the project plan established with all relevant milestones?', score: 8, max: 10, notes: 'Gantt chart maintained in SAP PS.' },
    { id: 'P2.2', question: 'Are project resources planned and available?', score: 6, max: 10, notes: 'Resource gaps in quality dept.' },
    { id: 'P2.3', question: 'Is project organization established with responsibilities?', score: 8, max: 10, notes: 'RACI matrix documented.' },
    { id: 'P2.4', question: 'Are changes in the project managed systematically?', score: 6, max: 10, notes: 'Change management process needs improvement.' },
  ],
  'P4': [
    { id: 'P4.1', question: 'Are there defined criteria for selection, evaluation and re-evaluation of suppliers?', score: 6, max: 10, notes: 'Criteria defined. 6 suppliers overdue for re-eval.' },
    { id: 'P4.2', question: 'Is supplier quality performance monitored?', score: 6, max: 10, notes: 'DPPM tracked but threshold actions not enforced.' },
    { id: 'P4.3', question: 'Are agreed quality targets met by suppliers?', score: 6, max: 10, notes: 'S-017 exceeds rejection target by 60%.' },
    { id: 'P4.4', question: 'Are incoming goods inspections performed as planned?', score: 8, max: 10, notes: 'Inspections performed. 3 unsigned records.' },
  ],
  'P5': [
    { id: 'P5.1', question: 'Are only approved and released materials used for production?', score: 8, max: 10, notes: 'SAP release workflow enforced.' },
    { id: 'P5.2', question: 'Are production materials handled appropriately?', score: 8, max: 10, notes: 'Proper handling observed.' },
    { id: 'P5.3*', question: 'Is the equipment/tooling suitable to ensure product requirements?', score: 4, max: 10, notes: 'CNC #2, #4 out of calibration. Boring bar at 123% life.', star: true },
    { id: 'P5.4*', question: 'Are the production processes controlled?', score: 4, max: 10, notes: 'Cpk 0.98 on bore ID — process not capable.', star: true },
    { id: 'P5.5', question: 'Is the effectiveness of production monitored?', score: 6, max: 10, notes: 'OEE tracked but not displayed real-time.' },
    { id: 'P5.6', question: 'Can traceability be ensured during production?', score: 8, max: 10, notes: 'Full lot traceability via SAP.' },
    { id: 'P5.7*', question: 'Are nonconforming products segregated and managed?', score: 4, max: 10, notes: 'Red bin system in place but quarantine area unmarked.', star: true },
  ],
  'P6': [
    { id: 'P6.1', question: 'Does the organization determine the requirements of customers?', score: 10, max: 10, notes: 'BMW CSR fully mapped.' },
    { id: 'P6.2', question: 'Are customer complaints processed systematically?', score: 8, max: 10, notes: '8D process established.' },
    { id: 'P6.3', question: 'Is customer satisfaction monitored?', score: 8, max: 10, notes: 'Annual survey + monthly scorecard.' },
    { id: 'P6.4', question: 'Are products delivered according to customer schedule?', score: 8, max: 10, notes: 'OTD 94%. Target 96%.' },
  ],
  'P7': [
    { id: 'P7.1', question: 'Is a process for continual improvement established?', score: 6, max: 10, notes: 'CI process exists. Limited Kaizen activity.' },
    { id: 'P7.2*', question: 'Are corrective and preventive actions implemented effectively?', score: 4, max: 10, notes: 'CAPA closure rate 62.5%. 3 overdue.', star: true },
    { id: 'P7.3', question: 'Are lessons learned systematically documented?', score: 6, max: 10, notes: 'Lessons learned database exists. Inconsistent use.' },
    { id: 'P7.4', question: 'Is internal audit planning risk-based?', score: 6, max: 10, notes: 'Audit plan exists. Risk weighting weak.' },
  ],
};

export default function VDA63ScoringTable() {
  const { iatfProcessScores, iatfWeightedScore } = useAuditReportContext();
  const overall = vdaClassification(iatfWeightedScore);

  return (
    <section className="scroll-mt-20 mt-4">
      <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
          <span className="text-[15px] font-semibold text-foreground">VDA 6.3 Element Scoring</span>
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-muted-foreground">VDA 6.3:2023</span>
            <span className="text-[18px] font-semibold font-mono" style={{ color: overall.color }}>{Math.round(iatfWeightedScore)}%</span>
            <span className="text-[14px] font-medium px-2 py-0.5 rounded-md" style={{ background: overall.bg, color: overall.color }}>
              Grade {overall.grade}
            </span>
          </div>
        </div>

        {/* Classification banner */}
        <div className="px-4 py-2 flex items-center gap-3 border-b border-border" style={{ background: overall.bg }}>
          <div className="w-3 h-3" style={{ background: overall.color }} />
          <span className="text-[14px] font-bold" style={{ color: overall.color }}>
            Result: {overall.label}
          </span>
          <span className="text-[13px] text-foreground/60 ml-auto">
            Classification per VDA 6.3:2023 §10.2
          </span>
        </div>

        {/* Scoring table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/20">
              <th className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border w-[140px]">Element</th>
              <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border border-l">Score</th>
              <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border border-l w-[60px]">Weight</th>
              <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border border-l w-[80px]">Weighted</th>
              <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border border-l w-[50px]">Grade</th>
              <th className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border border-l">Score Distribution</th>
            </tr>
          </thead>
          <tbody>
            {iatfProcessScores.map((p, idx) => {
              const cls = vdaClassification(p.score);
              const pCode = `P${idx + 1}`;
              const questions = vdaQuestions[pCode] || [];
              const weighted = (p.score * p.weight).toFixed(1);

              return (
                <tr key={idx} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] font-bold text-foreground">{p.process.split(' — ')[0]}</div>
                    <div className="text-[12px] text-muted-foreground">{p.process.split(' — ')[1]}</div>
                  </td>
                  <td className="px-3 py-2.5 border-l border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="w-[100px] h-[8px] bg-muted overflow-hidden">
                        <div className="h-full transition-all" style={{ width: `${p.score}%`, background: cls.color }} />
                      </div>
                      <span className="text-[15px] font-bold font-mono tabular-nums" style={{ color: cls.color }}>{p.score}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 border-l border-border/60 text-[13px] font-mono text-muted-foreground text-center">
                    {(p.weight * 100).toFixed(0)}%
                  </td>
                  <td className="px-3 py-2.5 border-l border-border/60 text-[14px] font-bold font-mono tabular-nums text-foreground text-center">
                    {weighted}
                  </td>
                  <td className="px-3 py-2.5 border-l border-border/60 text-center">
                    <span className="text-[13px] font-bold px-2 py-0.5" style={{ background: cls.bg, color: cls.color }}>
                      {cls.grade}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 border-l border-border/60">
                    {/* Mini question score strip */}
                    <div className="flex items-center gap-1">
                      {questions.map(q => {
                        const qCls = vdaClassification(q.score * 10);
                        return (
                          <div key={q.id} className="group relative">
                            <div
                              className={`w-5 h-5 flex items-center justify-center text-[8px] font-bold font-mono border ${q.star ? 'ring-1 ring-warning ring-offset-1' : ''}`}
                              style={{ background: qCls.bg, color: qCls.color, borderColor: `${qCls.color}40` }}
                              title={`${q.id}${q.star ? ' ★ STAR QUESTION' : ''}: ${q.score}/${q.max} — ${q.notes}`}
                            >
                              {q.score}
                            </div>
                            {q.star && (
                              <span className="absolute -top-1.5 -right-1.5 text-[7px] text-warning font-bold">★</span>
                            )}
                          </div>
                        );
                      })}
                      {questions.length === 0 && (
                        <span className="text-[11px] text-muted-foreground italic">N/A</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-muted/30">
              <td className="px-4 py-2.5 text-[13px] font-bold uppercase tracking-wider text-foreground border-t border-border">
                Overall Result
              </td>
              <td className="px-3 py-2.5 border-t border-border border-l">
                <span className="text-[15px] font-bold font-mono" style={{ color: overall.color }}>{Math.round(iatfWeightedScore)}%</span>
              </td>
              <td className="px-3 py-2.5 border-t border-border border-l text-[13px] font-mono text-muted-foreground text-center">100%</td>
              <td className="px-3 py-2.5 border-t border-border border-l text-[15px] font-bold font-mono text-foreground text-center">
                {iatfWeightedScore.toFixed(1)}
              </td>
              <td className="px-3 py-2.5 border-t border-border border-l text-center">
                <span className="text-[14px] font-bold px-2.5 py-1" style={{ background: overall.bg, color: overall.color }}>
                  {overall.grade}
                </span>
              </td>
              <td className="px-4 py-2.5 border-t border-border border-l text-[12px] text-muted-foreground">
                {overall.label}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Degradation rules */}
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Degradation Rules (VDA 6.3:2023 §10.1)</div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {degradationRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[12px] text-foreground/70">
                <span className="text-[8px] mt-0.5 shrink-0">▪</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Classification legend */}
        <div className="px-4 py-2 border-t border-border bg-card flex items-center gap-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Classification:</span>
          {[
            { grade: 'A', range: '≥90%', color: 'hsl(155, 24%, 40%)' },
            { grade: 'AB', range: '80–89%', color: 'hsl(155, 24%, 50%)' },
            { grade: 'B', range: '60–79%', color: 'hsl(24, 72%, 53%)' },
            { grade: 'C', range: '<60%', color: 'hsl(0, 48%, 46%)' },
          ].map(l => (
            <div key={l.grade} className="flex items-center gap-1.5">
              <div className="w-3 h-3" style={{ background: l.color }} />
              <span className="text-[12px] font-bold" style={{ color: l.color }}>{l.grade}</span>
              <span className="text-[12px] text-muted-foreground">{l.range}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
