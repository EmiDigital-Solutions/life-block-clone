import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

// ─── Production Capability Radar ─────────────────────────────
// Measures how well the supplier meets client's production requirements
const productionData = [
  { dimension: 'Process Capability\n(Cpk)', supplier: 73, clientMin: 90, industryMin: 60, fullLabel: 'Process Capability (Cpk)' },
  { dimension: 'Equipment\nReliability', supplier: 82, clientMin: 85, industryMin: 65, fullLabel: 'Equipment Reliability (OEE)' },
  { dimension: 'Quality\nControl', supplier: 68, clientMin: 88, industryMin: 60, fullLabel: 'Quality Control Systems' },
  { dimension: 'Calibration\nCompliance', supplier: 55, clientMin: 95, industryMin: 70, fullLabel: 'Calibration Compliance' },
  { dimension: 'Workforce\nCompetency', supplier: 85, clientMin: 80, industryMin: 60, fullLabel: 'Workforce Competency' },
  { dimension: 'Throughput\nCapacity', supplier: 78, clientMin: 75, industryMin: 55, fullLabel: 'Throughput Capacity' },
  { dimension: 'Traceability', supplier: 72, clientMin: 92, industryMin: 65, fullLabel: 'Material Traceability' },
  { dimension: 'Defect Rate\n(DPPM)', supplier: 48, clientMin: 85, industryMin: 50, fullLabel: 'Defect Rate Control (DPPM)' },
];

// ─── Commercial Radar ────────────────────────────────────────
// Measures commercial viability and risk factors
const commercialData = [
  { dimension: 'Cost\nCompetitiveness', supplier: 76, benchmark: 70, fullLabel: 'Cost Competitiveness' },
  { dimension: 'Delivery\nReliability', supplier: 87, benchmark: 90, fullLabel: 'On-Time Delivery Rate' },
  { dimension: 'Financial\nStability', supplier: 82, benchmark: 75, fullLabel: 'Financial Health & Stability' },
  { dimension: 'Supply Chain\nResilience', supplier: 35, benchmark: 65, fullLabel: 'Supply Chain Resilience' },
  { dimension: 'Innovation\nCapability', supplier: 45, benchmark: 63, fullLabel: 'Innovation & Technology Index' },
  { dimension: 'Sustainability\n(ESG)', supplier: 38, benchmark: 58, fullLabel: 'ESG & Sustainability Score' },
  { dimension: 'Responsiveness', supplier: 80, benchmark: 75, fullLabel: 'Communication & Responsiveness' },
  { dimension: 'Scalability', supplier: 65, benchmark: 70, fullLabel: 'Capacity Scalability' },
];

function RadarLegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-[2px] rounded-full" style={{ background: color }} />
      <span className="text-[11px] text-[#64748B] font-medium">{label}</span>
    </div>
  );
}

function GapIndicator({ label, gap, direction }: { label: string; gap: number; direction: 'below' | 'above' }) {
  const isBelow = direction === 'below';
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
      <span className="text-[12px] text-[#475569]">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={`text-[12px] font-mono font-semibold ${isBelow ? 'text-red-500' : 'text-emerald-600'}`}>
          {isBelow ? '−' : '+'}{Math.abs(gap)}
        </span>
        <span className="text-[10px] text-[#94A3B8]">pts</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  if (!data) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-lg p-3 max-w-[200px]">
      <div className="text-[12px] font-semibold text-[#0F172A] mb-1">{data.fullLabel}</div>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 text-[11px]">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="font-mono font-semibold text-[#0F172A]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ExecutiveRadarCharts() {
  // Calculate gaps for production radar
  const productionGaps = productionData
    .map(d => ({ label: d.fullLabel, gap: d.supplier - d.clientMin, direction: (d.supplier < d.clientMin ? 'below' : 'above') as 'below' | 'above' }))
    .filter(d => d.direction === 'below')
    .sort((a, b) => a.gap - b.gap);

  // Calculate gaps for commercial radar
  const commercialGaps = commercialData
    .map(d => ({ label: d.fullLabel, gap: d.supplier - d.benchmark, direction: (d.supplier < d.benchmark ? 'below' : 'above') as 'below' | 'above' }))
    .filter(d => d.direction === 'below')
    .sort((a, b) => a.gap - b.gap);

  return (
    <section className="py-12">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#64748B]">Supplier Assessment</span>
      </div>
      <h2 className="text-[24px] md:text-[28px] font-bold text-[#0F172A] tracking-[-0.02em] mb-2">
        Capability & Commercial Profile
      </h2>
      <p className="text-[14px] text-[#64748B] max-w-2xl mb-10 leading-relaxed">
        Two-dimensional radar assessment comparing the supplier's current performance against BMW/Linde client requirements (production) and Tier-2 automotive benchmarks (commercial).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Production Capability Radar ───────────────────── */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-5">
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#D97706] mb-1">Production</div>
            <h3 className="text-[17px] font-bold text-[#0F172A]">Manufacturing Capability</h3>
            <p className="text-[12px] text-[#94A3B8] mt-1">Supplier vs. client requirements vs. industry minimum</p>
          </div>

          {/* Custom legend */}
          <div className="flex items-center gap-5 mb-4">
            <RadarLegendItem color="#0A7FA5" label="MV Motors (actual)" />
            <RadarLegendItem color="#D97706" label="BMW/Linde requirement" />
            <RadarLegendItem color="#CBD5E1" label="Industry minimum" />
          </div>

          <div className="w-full" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={productionData}>
                <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 10, fill: '#64748B', fontWeight: 500 }}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: '#94A3B8' }}
                  tickCount={5}
                  axisLine={false}
                />
                <Radar name="Industry Min" dataKey="industryMin" stroke="#CBD5E1" fill="#CBD5E1" fillOpacity={0.08} strokeWidth={1} strokeDasharray="4 4" />
                <Radar name="BMW/Linde Req." dataKey="clientMin" stroke="#D97706" fill="#D97706" fillOpacity={0.06} strokeWidth={1.5} strokeDasharray="6 3" />
                <Radar name="MV Motors" dataKey="supplier" stroke="#0A7FA5" fill="#0A7FA5" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3, fill: '#0A7FA5' }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Gap analysis below the chart */}
          <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
            <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-2">
              Critical gaps vs. client requirements
            </div>
            <div className="space-y-0">
              {productionGaps.slice(0, 4).map((g, i) => (
                <GapIndicator key={i} label={g.label} gap={g.gap} direction={g.direction} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Commercial Radar ─────────────────────────────── */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <div className="mb-5">
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#16A34A] mb-1">Commercial</div>
            <h3 className="text-[17px] font-bold text-[#0F172A]">Business & Risk Profile</h3>
            <p className="text-[12px] text-[#94A3B8] mt-1">Supplier vs. Tier-2 automotive benchmark</p>
          </div>

          {/* Custom legend */}
          <div className="flex items-center gap-5 mb-4">
            <RadarLegendItem color="#0A7FA5" label="MV Motors (actual)" />
            <RadarLegendItem color="#16A34A" label="Tier-2 benchmark" />
          </div>

          <div className="w-full" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={commercialData}>
                <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 10, fill: '#64748B', fontWeight: 500 }}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: '#94A3B8' }}
                  tickCount={5}
                  axisLine={false}
                />
                <Radar name="Tier-2 Benchmark" dataKey="benchmark" stroke="#16A34A" fill="#16A34A" fillOpacity={0.06} strokeWidth={1.5} strokeDasharray="6 3" />
                <Radar name="MV Motors" dataKey="supplier" stroke="#0A7FA5" fill="#0A7FA5" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3, fill: '#0A7FA5' }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Gap analysis below the chart */}
          <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
            <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#94A3B8] mb-2">
              Critical gaps vs. benchmark
            </div>
            <div className="space-y-0">
              {commercialGaps.slice(0, 4).map((g, i) => (
                <GapIndicator key={i} label={g.label} gap={g.gap} direction={g.direction} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom summary bar */}
      <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#64748B] mb-1">Assessment Summary</div>
            <p className="text-[13px] text-[#475569] leading-relaxed max-w-xl">
              MV Motors meets production capacity and workforce requirements but falls critically short on <strong className="text-[#0F172A]">calibration compliance</strong>, <strong className="text-[#0F172A]">defect rate control</strong>, and <strong className="text-[#0F172A]">supply chain resilience</strong>. These three dimensions must reach client thresholds before unconditional approval.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#D97706] leading-none tabular-nums">4</div>
              <div className="text-[10px] text-[#94A3B8] font-medium uppercase mt-1">Gaps to close</div>
            </div>
            <div className="w-px h-10 bg-[#E2E8F0]" />
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#0A7FA5] leading-none tabular-nums">70%</div>
              <div className="text-[10px] text-[#94A3B8] font-medium uppercase mt-1">Dimensions met</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
