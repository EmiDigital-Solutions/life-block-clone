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
      { label: 'Observations', count: 12, color: 'hsl(135, 8%, 52%)' },
      { label: 'Concerns', count: 5, color: 'hsl(24, 72%, 63%)' },
      { label: 'Non-Conformities', count: 4, color: 'hsl(0, 48%, 46%)' },
    ],
  },
  {
    title: 'NCRs',
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
      { label: 'Long-term', count: 1, color: 'hsl(135, 8%, 52%)' },
    ],
  },
  {
    title: 'Resolution',
    nodes: [
      { label: 'Closed', count: 1, color: 'hsl(155, 24%, 55%)' },
      { label: 'In Progress', count: 3, color: 'hsl(24, 72%, 63%)' },
      { label: 'Open', count: 2, color: 'hsl(0, 48%, 46%)' },
    ],
  },
];

export default function FindingSankeyDiagram() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// FLOW</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">Finding Resolution Pipeline</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="border border-border bg-white p-6">
        <div className="grid grid-cols-4 gap-4">
          {stages.map((stage, si) => (
            <div key={si} className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold text-center">{stage.title}</h4>
              <div className="space-y-2">
                {stage.nodes.map((node, ni) => {
                  const barWidth = Math.max(20, (node.count / 12) * 100);
                  return (
                    <div key={ni} className="relative">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-7 flex items-center px-2 transition-all"
                          style={{ width: `${barWidth}%`, backgroundColor: `${node.color}15`, borderLeft: `3px solid ${node.color}` }}
                        >
                          <span className="text-[10px] font-medium truncate" style={{ color: node.color }}>{node.label}</span>
                        </div>
                        <span className="text-[12px] font-mono font-bold shrink-0" style={{ color: node.color }}>{node.count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {si < stages.length - 1 && (
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-grey-mid" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
