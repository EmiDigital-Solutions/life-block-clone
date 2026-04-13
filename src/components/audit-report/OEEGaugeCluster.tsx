import { Gauge } from "lucide-react";

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
  const color = value >= threshold ? 'hsl(155, 24%, 55%)' : value >= 75 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] w-[40px] shrink-0" style={{ color: 'hsl(0,0%,50%)' }}>{label}</span>
      <div className="flex-1 h-4 relative" style={{ background: 'hsl(0,0%,93%)' }}>
        <div className="absolute top-0 h-full" style={{ width: `${value}%`, background: color, opacity: 0.7 }} />
        <div className="absolute top-0 bottom-0 w-px" style={{ left: `${threshold}%`, background: 'hsl(0,0%,60%)', borderLeft: '1px dashed hsl(0,0%,60%)' }} />
      </div>
      <span className="text-[13px] font-mono font-bold w-[40px] text-right" style={{ color }}>{value}%</span>
    </div>
  );
}

export default function OEEGaugeCluster() {
  const avgOEE = Math.round(machines.reduce((s, m) => s + m.oee, 0) / machines.length);
  const belowThreshold = machines.filter(m => m.oee < BMW_THRESHOLD).length;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(195, 89%, 34%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>OEE Performance</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        Fleet OEE {avgOEE}% — {belowThreshold > 0 ? `${belowThreshold} machine${belowThreshold > 1 ? 's' : ''} below BMW threshold` : 'all above threshold'}
      </h2>

      {/* Machine cards */}
      <div className="space-y-3">
        {machines.map(m => {
          const oeeColor = m.oee >= BMW_THRESHOLD ? 'hsl(155, 24%, 55%)' : m.oee >= 75 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
          const isBelow = m.oee < BMW_THRESHOLD;

          return (
            <div key={m.id} className="flex items-stretch gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
              {/* Left: machine info + OEE hero number */}
              <div className="w-[240px] shrink-0 p-5 flex items-center gap-4" style={{ background: 'hsl(0,0%,100%)' }}>
                <div>
                  <div className="text-[36px] font-bold font-mono leading-none" style={{ color: oeeColor }}>{m.oee}%</div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>OEE</span>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-[11px] font-mono font-bold" style={{ color: 'hsl(0,0%,40%)' }}>{m.id}</span>
                  <p className="text-[13px] font-medium text-foreground">{m.name}</p>
                  {isBelow && (
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'hsl(0, 48%, 46%)' }}>Below {BMW_THRESHOLD}%</span>
                  )}
                </div>
              </div>

              {/* Right: sub-metric bars */}
              <div className="flex-1 p-5 space-y-2" style={{ background: 'hsl(0,0%,100%)' }}>
                <OEEBar value={m.availability} label="Avail." threshold={BMW_THRESHOLD} />
                <OEEBar value={m.performance} label="Perf." threshold={BMW_THRESHOLD} />
                <OEEBar value={m.quality} label="Qual." threshold={95} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Threshold legend */}
      <div className="flex items-center gap-6 text-[11px]" style={{ color: 'hsl(0,0%,50%)' }}>
        <span className="flex items-center gap-2">
          <span className="w-px h-3 inline-block" style={{ borderLeft: '1px dashed hsl(0,0%,60%)' }} /> BMW Threshold ({BMW_THRESHOLD}%)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 inline-block" style={{ background: 'hsl(155, 24%, 55%)' }} /> Above target
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 inline-block" style={{ background: 'hsl(0, 48%, 46%)' }} /> Below target
        </span>
      </div>
    </section>
  );
}
