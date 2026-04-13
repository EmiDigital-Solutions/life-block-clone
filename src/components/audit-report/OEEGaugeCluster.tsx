interface MachineOEE {
  id: string;
  name: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
}

const machines: MachineOEE[] = [
  { id: 'M-001', name: 'ENGEL Victory 500', oee: 87, availability: 92, performance: 91, quality: 98 },
  { id: 'M-002', name: 'ENGEL Victory 300', oee: 82, availability: 88, performance: 90, quality: 96 },
  { id: 'M-003', name: 'ARBURG 570A', oee: 72, availability: 78, performance: 85, quality: 92 },
  { id: 'M-004', name: 'Zeiss Contura', oee: 94, availability: 96, performance: 97, quality: 99 },
  { id: 'M-005', name: 'ABB IRB 6700', oee: 89, availability: 93, performance: 94, quality: 97 },
];

const BMW_THRESHOLD = 85;

function OEEBar({ value, label, threshold }: { value: number; label: string; threshold: number }) {
  const color = value >= threshold ? 'hsl(var(--accent))' : value >= 75 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] w-[40px] shrink-0 text-muted-foreground">{label}</span>
      <div className="flex-1 h-4 relative bg-muted">
        <div className="absolute top-0 h-full opacity-70" style={{ width: `${value}%`, background: color }} />
        <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-muted-foreground/40" style={{ left: `${threshold}%` }} />
      </div>
      <span className="text-[13px] font-mono font-bold w-[40px] text-right" style={{ color }}>{value}%</span>
    </div>
  );
}

export default function OEEGaugeCluster({ depth = 'standard' }: { depth?: import("@/data/auditReportData").DepthLevel }) {
  const avgOEE = Math.round(machines.reduce((s, m) => s + m.oee, 0) / machines.length);
  const belowThreshold = machines.filter(m => m.oee < BMW_THRESHOLD).length;

  if (depth === 'executive') {
    return (
      <div className="border border-border">
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: 'hsl(220,20%,14%)' }}>
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/80">OEE Fleet Performance</span>
          <span className="text-[10px] font-mono text-white/60">BMW Threshold: {BMW_THRESHOLD}%</span>
        </div>
        <div className="bg-card">
          <div className="grid grid-cols-5 divide-x divide-border">
            {machines.map(m => {
              const oeeColor = m.oee >= BMW_THRESHOLD ? 'hsl(var(--accent))' : m.oee >= 75 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
              return (
                <div key={m.id} className="px-3 py-3 text-center">
                  <div className="text-[9px] font-mono text-muted-foreground mb-1">{m.id}</div>
                  <div className="text-[22px] font-bold font-mono leading-none mb-1" style={{ color: oeeColor }}>{m.oee}%</div>
                  <div className="text-[9px] text-muted-foreground truncate">{m.name.split(' ').slice(0, 2).join(' ')}</div>
                  <div className="mt-2 space-y-1">
                    {[
                      { label: 'A', value: m.availability },
                      { label: 'P', value: m.performance },
                      { label: 'Q', value: m.quality },
                    ].map(sub => {
                      const c = sub.value >= BMW_THRESHOLD ? 'hsl(var(--accent))' : sub.value >= 75 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
                      return (
                        <div key={sub.label} className="flex items-center gap-1">
                          <span className="text-[8px] text-muted-foreground w-[10px]">{sub.label}</span>
                          <div className="flex-1 h-[3px] bg-muted">
                            <div className="h-full" style={{ width: `${sub.value}%`, background: c }} />
                          </div>
                          <span className="text-[8px] font-mono w-[22px] text-right" style={{ color: c }}>{sub.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[9px] text-muted-foreground">
            <span>Fleet Avg: <strong className="text-foreground font-mono">{avgOEE}%</strong></span>
            {belowThreshold > 0 && <span className="text-destructive font-semibold">{belowThreshold} below threshold</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">OEE Performance</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        Fleet OEE {avgOEE}% — {belowThreshold > 0 ? `${belowThreshold} machine${belowThreshold > 1 ? 's' : ''} below BMW threshold` : 'all above threshold'}
      </h2>

      {/* Machine cards */}
      <div className="space-y-3">
        {machines.map(m => {
          const oeeColor = m.oee >= BMW_THRESHOLD ? 'hsl(var(--accent))' : m.oee >= 75 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
          const isBelow = m.oee < BMW_THRESHOLD;

          return (
            <div key={m.id} className="flex items-stretch gap-px bg-border">
              <div className="w-[240px] shrink-0 p-5 flex items-center gap-4 bg-card">
                <div>
                  <div className="text-[36px] font-bold font-mono leading-none" style={{ color: oeeColor }}>{m.oee}%</div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">OEE</span>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-[11px] font-mono font-bold text-muted-foreground">{m.id}</span>
                  <p className="text-[13px] font-medium text-foreground">{m.name}</p>
                  {isBelow && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-destructive">Below {BMW_THRESHOLD}%</span>
                  )}
                </div>
              </div>

              <div className="flex-1 p-5 space-y-2 bg-card">
                <OEEBar value={m.availability} label="Avail." threshold={BMW_THRESHOLD} />
                <OEEBar value={m.performance} label="Perf." threshold={BMW_THRESHOLD} />
                <OEEBar value={m.quality} label="Qual." threshold={95} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="w-px h-3 inline-block border-l border-dashed border-muted-foreground/40" /> BMW Threshold ({BMW_THRESHOLD}%)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 inline-block bg-accent" /> Above target
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 inline-block bg-destructive" /> Below target
        </span>
      </div>
    </section>
  );
}