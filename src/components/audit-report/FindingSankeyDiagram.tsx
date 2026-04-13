import { ArrowRight } from "lucide-react";

interface FlowNode {
  label: string;
  count: number;
  semantic: 'accent' | 'warning' | 'destructive' | 'primary' | 'muted';
}

interface FlowStage {
  title: string;
  nodes: FlowNode[];
}

const stages: FlowStage[] = [
  {
    title: 'Findings',
    nodes: [
      { label: 'Observations', count: 12, semantic: 'accent' },
      { label: 'Concerns', count: 5, semantic: 'warning' },
      { label: 'Non-Conformities', count: 4, semantic: 'destructive' },
    ],
  },
  {
    title: 'NCRs Raised',
    nodes: [
      { label: 'Major NCR', count: 1, semantic: 'destructive' },
      { label: 'Minor NCR', count: 3, semantic: 'warning' },
    ],
  },
  {
    title: 'CAPA Actions',
    nodes: [
      { label: 'Immediate', count: 2, semantic: 'destructive' },
      { label: 'Short-term', count: 3, semantic: 'warning' },
      { label: 'Long-term', count: 1, semantic: 'accent' },
    ],
  },
  {
    title: 'Status',
    nodes: [
      { label: 'Closed', count: 1, semantic: 'accent' },
      { label: 'In Progress', count: 3, semantic: 'primary' },
      { label: 'Open', count: 2, semantic: 'destructive' },
    ],
  },
];

const semanticStyles: Record<string, { bg: string; text: string; bar: string }> = {
  accent: { bg: 'bg-accent/8', text: 'text-accent', bar: 'bg-accent' },
  warning: { bg: 'bg-warning/8', text: 'text-warning', bar: 'bg-warning' },
  destructive: { bg: 'bg-destructive/8', text: 'text-destructive', bar: 'bg-destructive' },
  primary: { bg: 'bg-primary/8', text: 'text-primary', bar: 'bg-primary' },
  muted: { bg: 'bg-muted', text: 'text-muted-foreground', bar: 'bg-muted-foreground' },
};

export default function FindingSankeyDiagram() {
  const totalFindings = stages[0].nodes.reduce((a, n) => a + n.count, 0);
  const openCount = stages[3].nodes.find(n => n.label === 'Open')?.count || 0;
  const maxCount = Math.max(...stages.flatMap(s => s.nodes.map(n => n.count)));

  return (
    <section className="py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Resolution Pipeline</span>
      </div>

      <div className="flex items-baseline gap-3">
        <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
          {openCount} of {totalFindings} findings still open
        </h2>
        <span className="text-[13px] text-muted-foreground">
          — {Math.round(((totalFindings - openCount) / totalFindings) * 100)}% resolved
        </span>
      </div>

      {/* Pipeline flow */}
      <div className="bg-card/60 backdrop-blur-sm p-6">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-0">
          {stages.map((stage, si) => (
            <>
              {/* Stage column */}
              <div key={`stage-${si}`} className="space-y-3">
                <div className="text-center pb-3 border-b border-border/40 mb-1">
                  <h4 className="text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground">{stage.title}</h4>
                  <span className="text-[20px] font-mono font-bold text-foreground tabular-nums">
                    {stage.nodes.reduce((a, n) => a + n.count, 0)}
                  </span>
                </div>
                {stage.nodes.map((node, ni) => {
                  const style = semanticStyles[node.semantic];
                  const barWidth = Math.max(20, (node.count / maxCount) * 100);
                  return (
                    <div key={ni} className={`p-3 ${style.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[12px] font-medium ${style.text}`}>{node.label}</span>
                        <span className={`text-[16px] font-mono font-bold tabular-nums ${style.text}`}>{node.count}</span>
                      </div>
                      <div className="h-1.5 bg-background/60 overflow-hidden">
                        <div className={`h-full ${style.bar} transition-all`} style={{ width: `${barWidth}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Arrow connector */}
              {si < stages.length - 1 && (
                <div key={`arrow-${si}`} className="flex items-center justify-center w-10 pt-20 shrink-0">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30" />
                </div>
              )}
            </>
          ))}
        </div>

        {/* Summary bar */}
        <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-6">
          {stages[3].nodes.map((node, i) => {
            const style = semanticStyles[node.semantic];
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 ${style.bar}`} />
                <span className="text-[11px] text-muted-foreground">{node.label}</span>
                <span className={`text-[12px] font-mono font-bold tabular-nums ${style.text}`}>{node.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
