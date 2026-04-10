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

function MiniGauge({ value, label, size = 48 }: { value: number; label: string; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= BMW_THRESHOLD ? '#6EA996' : value >= 75 ? '#E39B5C' : '#AD3D3D';

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size / 2 + 4} viewBox={`0 0 ${size} ${size / 2 + 4}`}>
        <path
          d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
          fill="none" stroke="#F5F5F5" strokeWidth={3} strokeLinecap="round"
        />
        <path
          d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
          fill="none" stroke={color} strokeWidth={3} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
        />
        <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
          {value}%
        </text>
      </svg>
      <span className="text-[8px] uppercase tracking-wider text-[#7B8E80]">{label}</span>
    </div>
  );
}

export default function OEEGaugeCluster() {
  const avgOEE = Math.round(machines.reduce((s, m) => s + m.oee, 0) / machines.length);
  const belowThreshold = machines.filter(m => m.oee < BMW_THRESHOLD).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Gauge className="w-4 h-4 text-[#0A7FA5]" />
        <h3 className="text-[14px] font-semibold text-[#0A0A0A]">OEE Cockpit View</h3>
        <span className="text-[11px] text-[#7B8E80]">Fleet avg: {avgOEE}%</span>
        {belowThreshold > 0 && (
          <span className="text-[10px] px-2 py-0.5 bg-[#AD3D3D]/10 text-[#AD3D3D] font-semibold">
            {belowThreshold} below BMW threshold ({BMW_THRESHOLD}%)
          </span>
        )}
      </div>

      <div className="border border-[#E5E7EB] bg-white p-6">
        {/* BMW threshold line label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 border-t border-dashed border-[#0A7FA5]/30" />
          <span className="text-[9px] font-mono text-[#0A7FA5]">BMW Threshold: {BMW_THRESHOLD}%</span>
          <div className="h-px flex-1 border-t border-dashed border-[#0A7FA5]/30" />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {machines.map(m => (
            <div key={m.id} className="border border-[#E5E7EB] p-3 space-y-2 text-center">
              <span className="text-[10px] font-mono text-[#7B8E80]">{m.id}</span>
              <p className="text-[11px] font-medium text-[#0A0A0A] truncate">{m.name}</p>
              <MiniGauge value={m.oee} label="OEE" size={56} />
              <div className="flex justify-center gap-3">
                <MiniGauge value={m.availability} label="A" size={36} />
                <MiniGauge value={m.performance} label="P" size={36} />
                <MiniGauge value={m.quality} label="Q" size={36} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
