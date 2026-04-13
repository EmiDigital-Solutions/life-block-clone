import { ArrowRight } from "lucide-react";

interface FlowNode {
  label: string;
  count: number;
  color: string;
}

interface FlowStage {
  title: string;
  nodes: FlowNode[];
}

const stages: FlowStage[] = [
  {
    title: 'Findings',
    nodes: [
      { label: 'Observations', count: 12, color: 'hsl(155, 24%, 55%)' },
      { label: 'Concerns', count: 5, color: 'hsl(24, 72%, 63%)' },
      { label: 'Non-Conformities', count: 4, color: 'hsl(0, 48%, 46%)' },
    ],
  },
  {
    title: 'NCRs Raised',
    nodes: [
      { label: 'Major NCR', count: 1, color: 'hsl(0, 48%, 46%)' },
      { label: 'Minor NCR', count: 3, color: 'hsl(24, 72%, 63%)' },
    ],
  },
  {
    title: 'CAPA Actions',
    nodes: [
      { label: 'Immediate', count: 2, color: 'hsl(0, 48%, 46%)' },
      { label: 'Short-term', count: 3, color: 'hsl(24, 72%, 63%)' },
      { label: 'Long-term', count: 1, color: 'hsl(155, 24%, 55%)' },
    ],
  },
  {
    title: 'Status',
    nodes: [
      { label: 'Closed', count: 1, color: 'hsl(155, 24%, 55%)' },
      { label: 'In Progress', count: 3, color: 'hsl(24, 72%, 63%)' },
      { label: 'Open', count: 2, color: 'hsl(0, 48%, 46%)' },
    ],
  },
];

export default function FindingSankeyDiagram() {
  const totalFindings = stages[0].nodes.reduce((a, n) => a + n.count, 0);
  const openCount = stages[3].nodes.find(n => n.label === 'Open')?.count || 0;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(195, 89%, 34%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>Resolution Pipeline</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {openCount} of {totalFindings} findings still open
      </h2>

      <div className="p-8" style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
        <div className="grid grid-cols-4 gap-6">
          {stages.map((stage, si) => (
            <div key={si}>
              <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-center" style={{ color: 'hsl(0,0%,50%)' }}>{stage.title}</h4>
              <div className="space-y-3">
                {stage.nodes.map((node, ni) => {
                  const barHeight = Math.max(36, (node.count / 12) * 120);
                  return (
                    <div key={ni} className="relative overflow-hidden" style={{ height: barHeight, background: `${node.color}10`, borderLeft: `3px solid ${node.color}` }}>
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <span className="text-[13px] font-medium" style={{ color: node.color }}>{node.label}</span>
                        <span className="text-[18px] font-mono font-bold" style={{ color: node.color }}>{node.count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {si < stages.length - 1 && (
                <div className="flex justify-center mt-4">
                  <ArrowRight className="w-5 h-5" style={{ color: 'hsl(0,0%,70%)' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
