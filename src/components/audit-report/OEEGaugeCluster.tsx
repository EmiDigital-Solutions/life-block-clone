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

function OEECockpitGauge({ value, label, size = 64 }: { value: number; label: string; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= BMW_THRESHOLD ? 'hsl(155, 24%, 55%)' : value >= 75 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  const trackColor = 'hsl(0, 0%, 78%)';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size / 2 + 8} viewBox={`0 0 ${size} ${size / 2 + 8}`}>
        <path
          d={`M 5 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 5} ${size / 2}`}
          fill="none" stroke={trackColor} strokeWidth={4} strokeLinecap="round"
        />
        <path
          d={`M 5 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 5} ${size / 2}`}
          fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
        />
        <text x={size / 2} y={size / 2} textAnchor="middle" fontSize="14" fontWeight="700" fill={color} fontFamily="ui-monospace, monospace">
          {value}%
        </text>
      </svg>
      <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: 'hsl(0,0%,45%)' }}>{label}</span>
    </div>
  );
}

function SmallGauge({ value, label, size = 44 }: { value: number; label: string; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= BMW_THRESHOLD ? 'hsl(155, 24%, 55%)' : value >= 75 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
  const trackColor = 'hsl(0, 0%, 78%)';

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size / 2 + 6} viewBox={`0 0 ${size} ${size / 2 + 6}`}>
        <path
          d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
          fill="none" stroke={trackColor} strokeWidth={3} strokeLinecap="round"
        />
        <path
          d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
          fill="none" stroke={color} strokeWidth={3} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
        />
        <text x={size / 2} y={size / 2 - 1} textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="ui-monospace, monospace">
          {value}%
        </text>
      </svg>
      <span className="text-[8px] uppercase tracking-wider font-semibold" style={{ color: 'hsl(0,0%,50%)' }}>{label}</span>
    </div>
  );
}

export default function OEEGaugeCluster() {
  const avgOEE = Math.round(machines.reduce((s, m) => s + m.oee, 0) / machines.length);
  const belowThreshold = machines.filter(m => m.oee < BMW_THRESHOLD).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Gauge className="w-4 h-4 text-primary" />
        <h3 className="text-[14px] font-semibold text-foreground">OEE Cockpit View</h3>
        <span className="text-[11px]" style={{ color: 'hsl(0,0%,50%)' }}>Fleet avg: <span className="font-mono font-bold text-foreground">{avgOEE}%</span></span>
        {belowThreshold > 0 && (
          <span className="text-[10px] px-2 py-0.5 font-semibold text-destructive" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>
            {belowThreshold} below BMW threshold ({BMW_THRESHOLD}%)
          </span>
        )}
      </div>

      <div className="p-6" style={{ background: 'hsla(0,0%,100%,0.7)', backdropFilter: 'blur(12px)', border: '1px solid hsl(0,0%,80%)' }}>
        {/* BMW threshold line label */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-px flex-1" style={{ borderTop: '1px dashed hsl(195, 89%, 34%, 0.4)' }} />
          <span className="text-[10px] font-mono text-primary font-semibold">BMW Threshold: {BMW_THRESHOLD}%</span>
          <div className="h-px flex-1" style={{ borderTop: '1px dashed hsl(195, 89%, 34%, 0.4)' }} />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {machines.map(m => {
            const oeeColor = m.oee >= BMW_THRESHOLD ? 'hsl(155, 24%, 55%)' : m.oee >= 75 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';
            return (
              <div key={m.id} className="p-4 space-y-3 text-center" style={{ background: 'hsla(0,0%,100%,0.5)', border: '1px solid hsl(0,0%,80%)' }}>
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary">{m.id}</span>
                  <p className="text-[12px] font-medium text-foreground truncate mt-0.5">{m.name}</p>
                </div>

                {/* Main OEE gauge — larger */}
                <OEECockpitGauge value={m.oee} label="OEE" size={72} />

                {/* Sub-metrics */}
                <div className="flex justify-center gap-2">
                  <SmallGauge value={m.availability} label="Avail" size={48} />
                  <SmallGauge value={m.performance} label="Perf" size={48} />
                  <SmallGauge value={m.quality} label="Qual" size={48} />
                </div>

                {/* Below threshold indicator */}
                {m.oee < BMW_THRESHOLD && (
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-destructive pt-1" style={{ borderTop: '1px solid hsl(0,0%,85%)' }}>
                    Below Threshold
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}