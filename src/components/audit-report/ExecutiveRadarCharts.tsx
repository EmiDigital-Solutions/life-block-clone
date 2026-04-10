import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

// ─── Manufacturing Capability Radar ──────────────────────────
// Expert auditor / engineer assessment: covers process, equipment grade,
// conditions, HSE, workforce, tooling, quality systems, and more.
const productionData = [
  // Process & output quality
  { dimension: 'Process\nCapability (Cpk)', supplier: 73, clientMin: 90, industryMin: 60, fullLabel: 'Process Capability (Cpk) — Statistical process control, Cpk/Ppk on critical dimensions' },
  { dimension: 'Defect Rate\n(DPPM)', supplier: 48, clientMin: 85, industryMin: 50, fullLabel: 'Defect Rate Control (DPPM) — BMW target 50 DPPM, current: 410' },
  // Machine park — grade, age, technology, OEM vs. copy
  { dimension: 'Machine Park\nGrade', supplier: 72, clientMin: 85, industryMin: 55, fullLabel: 'Machine Park Grade — OEM quality (Mazak, DMG Mori) vs. low-cost clones. Avg. age, technology level, axis count, repeatability specs' },
  { dimension: 'Equipment\nReliability (OEE)', supplier: 78, clientMin: 85, industryMin: 65, fullLabel: 'Equipment Reliability (OEE) — Overall Equipment Effectiveness: availability x performance x quality rate' },
  { dimension: 'Maintenance\n& TPM', supplier: 62, clientMin: 88, industryMin: 55, fullLabel: 'Maintenance & TPM — Preventive/predictive maintenance program, TPM implementation, spare parts availability, MTBF/MTTR tracking' },
  // Calibration & metrology
  { dimension: 'Calibration\nCompliance', supplier: 55, clientMin: 95, industryMin: 70, fullLabel: 'Calibration Compliance — Gauge management, CMM calibration status, MSA (Gage R&R), external lab accreditation' },
  // Tooling
  { dimension: 'Tooling\nManagement', supplier: 45, clientMin: 80, industryMin: 55, fullLabel: 'Tooling Management — Tool life monitoring, adaptive wear compensation, tool-change discipline, spare tool availability' },
  // Throughput & capacity
  { dimension: 'Production\nCapacity', supplier: 80, clientMin: 75, industryMin: 55, fullLabel: 'Production Capacity — Shift utilization, bottleneck analysis, capacity vs. demand ratio, cycle time adherence' },
  // Facility conditions
  { dimension: 'Facility\nConditions', supplier: 68, clientMin: 82, industryMin: 55, fullLabel: 'Facility Conditions — Cleanliness (5S score), lighting, temperature/humidity control, floor markings, material flow layout' },
  // HSE — Health, Safety, Environment
  { dimension: 'HSE\nCompliance', supplier: 58, clientMin: 85, industryMin: 60, fullLabel: 'HSE Compliance — Health, Safety & Environment: PPE discipline, incident rate, chemical handling, fire protection, ergonomics, ISO 14001/45001' },
  // Quality systems
  { dimension: 'Quality\nSystems', supplier: 70, clientMin: 88, industryMin: 60, fullLabel: 'Quality Systems — SPC deployment, FMEA maturity, control plans, inspection frequency, non-conformance handling, 8D capability' },
  // Traceability
  { dimension: 'Material\nTraceability', supplier: 72, clientMin: 92, industryMin: 65, fullLabel: 'Material Traceability — Lot tracking, material certs, FIFO compliance, batch-to-serial linkage, recall readiness' },
  // Workforce
  { dimension: 'Workforce\nCompetency', supplier: 85, clientMin: 80, industryMin: 60, fullLabel: 'Workforce Competency — Training matrix, skills versatility, operator certification, succession planning' },
  // Automation & digitalization
  { dimension: 'Automation\nLevel', supplier: 42, clientMin: 70, industryMin: 45, fullLabel: 'Automation Level — Robotic loading, automated inspection, MES integration, real-time OEE dashboards, Industry 4.0 readiness' },
];

// ─── Commercial & Business Radar ─────────────────────────────
// Expert commercial assessment: pricing, logistics, financial health,
// risk, sustainability, IP, contract discipline, and strategic fit.
const commercialData = [
  // Pricing & cost
  { dimension: 'Cost\nCompetitiveness', supplier: 76, benchmark: 70, fullLabel: 'Cost Competitiveness — Price vs. market, should-cost analysis alignment, VA/VE willingness, total cost of ownership' },
  { dimension: 'Cost\nTransparency', supplier: 68, benchmark: 75, fullLabel: 'Cost Transparency — Open-book costing readiness, detailed cost breakdowns, willingness to share material & overhead splits' },
  // Delivery & logistics
  { dimension: 'Delivery\nReliability', supplier: 87, benchmark: 90, fullLabel: 'On-Time Delivery — OTD rate, lead time consistency, expedite capability, logistics infrastructure' },
  { dimension: 'Lead Time\nFlexibility', supplier: 72, benchmark: 78, fullLabel: 'Lead Time Flexibility — Ability to absorb demand spikes, short-notice changes, buffer stock strategy, MOQ flexibility' },
  // Financial & legal
  { dimension: 'Financial\nStability', supplier: 82, benchmark: 75, fullLabel: 'Financial Stability — Revenue trend, EBITDA margin, credit rating, payment history, dependency on single customer' },
  { dimension: 'Contract &\nIP Discipline', supplier: 75, benchmark: 80, fullLabel: 'Contract & IP Discipline — NDA compliance, IP protection, contract adherence, warranty terms, liability coverage' },
  // Risk
  { dimension: 'Supply Chain\nResilience', supplier: 35, benchmark: 65, fullLabel: 'Supply Chain Resilience — Dual-sourcing strategy, sub-supplier risk, geographic concentration, raw material hedging' },
  { dimension: 'Business\nContinuity', supplier: 40, benchmark: 70, fullLabel: 'Business Continuity — BCP documentation, disaster recovery, key-person dependencies, insurance coverage' },
  // Strategic
  { dimension: 'Innovation\nCapability', supplier: 45, benchmark: 63, fullLabel: 'Innovation Capability — R&D investment, new technology adoption, co-development willingness, patent activity' },
  { dimension: 'Sustainability\n(ESG)', supplier: 38, benchmark: 58, fullLabel: 'ESG & Sustainability — Carbon footprint tracking, energy management, waste reduction, social compliance, scope 3 reporting' },
  // Relationship
  { dimension: 'Communication\n& Responsiveness', supplier: 80, benchmark: 75, fullLabel: 'Communication & Responsiveness — Response time, escalation effectiveness, key account management, language capability' },
  { dimension: 'Scalability', supplier: 65, benchmark: 70, fullLabel: 'Scalability — Capacity to grow with client demand, CAPEX willingness, workforce expansion ability, second-shift readiness' },
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
    .map(d => ({ label: d.fullLabel.split(' — ')[0], gap: d.supplier - d.clientMin, direction: (d.supplier < d.clientMin ? 'below' : 'above') as 'below' | 'above' }))
    .filter(d => d.direction === 'below')
    .sort((a, b) => a.gap - b.gap);

  // Calculate gaps for commercial radar
  const commercialGaps = commercialData
    .map(d => ({ label: d.fullLabel.split(' — ')[0], gap: d.supplier - d.benchmark, direction: (d.supplier < d.benchmark ? 'below' : 'above') as 'below' | 'above' }))
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

          <div className="w-full" style={{ height: 420 }}>
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
              {productionGaps.slice(0, 6).map((g, i) => (
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

          <div className="w-full" style={{ height: 420 }}>
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
              {commercialGaps.slice(0, 6).map((g, i) => (
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
              MV Motors meets workforce and throughput requirements but shows critical weaknesses in <strong className="text-[#0F172A]">tooling management</strong>, <strong className="text-[#0F172A]">automation level</strong>, <strong className="text-[#0F172A]">calibration</strong>, <strong className="text-[#0F172A]">HSE compliance</strong>, and <strong className="text-[#0F172A]">supply chain resilience</strong>. Machine park is aging Mazak fleet with no predictive maintenance. Commercially, <strong className="text-[#0F172A]">business continuity planning</strong> and <strong className="text-[#0F172A]">ESG readiness</strong> are significantly below automotive Tier-2 benchmarks.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#DC2626] leading-none tabular-nums">{productionGaps.length + commercialGaps.length}</div>
              <div className="text-[10px] text-[#94A3B8] font-medium uppercase mt-1">Gaps total</div>
            </div>
            <div className="w-px h-10 bg-[#E2E8F0]" />
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#D97706] leading-none tabular-nums">{productionGaps.length}</div>
              <div className="text-[10px] text-[#94A3B8] font-medium uppercase mt-1">Manufacturing</div>
            </div>
            <div className="w-px h-10 bg-[#E2E8F0]" />
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#0A7FA5] leading-none tabular-nums">{commercialGaps.length}</div>
              <div className="text-[10px] text-[#94A3B8] font-medium uppercase mt-1">Commercial</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
