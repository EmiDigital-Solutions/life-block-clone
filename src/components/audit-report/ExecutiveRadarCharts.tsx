import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const productionData = [
  { dimension: 'Process Capability', supplier: 73, clientMin: 90, industryMin: 60 },
  { dimension: 'Defect Rate', supplier: 48, clientMin: 85, industryMin: 50 },
  { dimension: 'Machine Park', supplier: 72, clientMin: 85, industryMin: 55 },
  { dimension: 'OEE', supplier: 78, clientMin: 85, industryMin: 65 },
  { dimension: 'Maintenance', supplier: 62, clientMin: 88, industryMin: 55 },
  { dimension: 'Calibration', supplier: 55, clientMin: 95, industryMin: 70 },
  { dimension: 'Tooling', supplier: 45, clientMin: 80, industryMin: 55 },
  { dimension: 'Capacity', supplier: 80, clientMin: 75, industryMin: 55 },
  { dimension: 'Facility', supplier: 68, clientMin: 82, industryMin: 55 },
  { dimension: 'HSE', supplier: 58, clientMin: 85, industryMin: 60 },
  { dimension: 'Quality Sys.', supplier: 70, clientMin: 88, industryMin: 60 },
  { dimension: 'Traceability', supplier: 72, clientMin: 92, industryMin: 65 },
  { dimension: 'Workforce', supplier: 85, clientMin: 80, industryMin: 60 },
  { dimension: 'Automation', supplier: 42, clientMin: 70, industryMin: 45 },
];

const commercialData = [
  { dimension: 'Cost', supplier: 76, benchmark: 70 },
  { dimension: 'Transparency', supplier: 68, benchmark: 75 },
  { dimension: 'Delivery', supplier: 87, benchmark: 90 },
  { dimension: 'Lead Time', supplier: 72, benchmark: 78 },
  { dimension: 'Financial', supplier: 82, benchmark: 75 },
  { dimension: 'IP Discipline', supplier: 75, benchmark: 80 },
  { dimension: 'Resilience', supplier: 35, benchmark: 65 },
  { dimension: 'BCP', supplier: 40, benchmark: 70 },
  { dimension: 'Innovation', supplier: 45, benchmark: 63 },
  { dimension: 'ESG', supplier: 38, benchmark: 58 },
  { dimension: 'Comms', supplier: 80, benchmark: 75 },
  { dimension: 'Scalability', supplier: 65, benchmark: 70 },
];

function GapBar({ label, supplierVal, targetVal }: { label: string; supplierVal: number; targetVal: number }) {
  const gap = supplierVal - targetVal;
  const isBelow = gap < 0;
  const color = isBelow ? 'hsl(var(--destructive))' : 'hsl(var(--accent))';
  const barWidth = Math.min(100, Math.abs(gap) * 2.5);

  return (
    <div className="flex items-center gap-3 py-2.5 ">
      <span className="text-[13px] text-foreground w-[140px] shrink-0">{label}</span>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-2 relative bg-muted">
          <div
            className="absolute top-0 h-full transition-all opacity-80"
            style={{
              background: color,
              width: `${barWidth}%`,
              left: isBelow ? undefined : '50%',
              right: isBelow ? '50%' : undefined,
            }}
          />
          <div className="absolute top-0 bottom-0 w-px left-1/2 bg-muted-foreground/30" />
        </div>
        <span className="text-[13px] font-mono font-bold w-[48px] text-right" style={{ color }}>
          {isBelow ? '' : '+'}{gap}
        </span>
      </div>
    </div>
  );
}

export default function ExecutiveRadarCharts() {
  const productionGaps = productionData
    .map(d => ({ label: d.dimension, supplierVal: d.supplier, targetVal: d.clientMin, gap: d.supplier - d.clientMin }))
    .sort((a, b) => a.gap - b.gap);

  const commercialGaps = commercialData
    .map(d => ({ label: d.dimension, supplierVal: d.supplier, targetVal: d.benchmark, gap: d.supplier - d.benchmark }))
    .sort((a, b) => a.gap - b.gap);

  const criticalCount = productionGaps.filter(g => g.gap < -15).length + commercialGaps.filter(g => g.gap < -15).length;

  return (
    <section className="py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-primary" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Gap Analysis</span>
        </div>
        <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
          {criticalCount} critical gaps identified
        </h2>
        <p className="text-[15px] mt-2 max-w-2xl leading-relaxed text-muted-foreground">
          Supplier performance mapped against BMW/Linde requirements and Tier-2 automotive benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Manufacturing Radar */}
        <div className="p-8 bg-card shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-warning">Manufacturing</span>
              <h3 className="text-[20px] font-bold text-foreground mt-1">Production Capability</h3>
            </div>
            <div className="text-right">
              <div className="text-[28px] font-bold font-mono text-foreground leading-none">
                {Math.round(productionData.reduce((a, d) => a + d.supplier, 0) / productionData.length)}
              </div>
              <span className="text-[11px] text-muted-foreground">avg. score</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-2"><span className="w-3 h-[2px] inline-block bg-primary" /> Supplier</span>
            <span className="flex items-center gap-2"><span className="w-3 h-[2px] inline-block border-t border-dashed border-warning" /> BMW Requirement</span>
          </div>

          <div style={{ height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="68%" data={productionData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: 'hsl(0,0%,40%)', fontWeight: 500 }} tickLine={false} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="BMW Req." dataKey="clientMin" stroke="hsl(24, 72%, 63%)" fill="hsl(24, 72%, 63%)" fillOpacity={0.04} strokeWidth={1.5} strokeDasharray="6 3" />
                <Radar name="Supplier" dataKey="supplier" stroke="hsl(195, 89%, 34%)" fill="hsl(195, 89%, 34%)" fillOpacity={0.12} strokeWidth={2.5} dot={{ r: 3.5, fill: 'hsl(195, 89%, 34%)' }} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid hsl(var(--border))', borderRadius: 0, background: 'white' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 pt-4 border-t border-border/40">
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">Gap to BMW requirement</span>
            <div className="mt-3">
              {productionGaps.filter(g => g.gap < 0).slice(0, 5).map(g => (
                <GapBar key={g.label} label={g.label} supplierVal={g.supplierVal} targetVal={g.targetVal} />
              ))}
            </div>
          </div>
        </div>

        {/* Commercial Radar */}
        <div className="p-8 bg-card shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent">Commercial</span>
              <h3 className="text-[20px] font-bold text-foreground mt-1">Business & Risk Profile</h3>
            </div>
            <div className="text-right">
              <div className="text-[28px] font-bold font-mono text-foreground leading-none">
                {Math.round(commercialData.reduce((a, d) => a + d.supplier, 0) / commercialData.length)}
              </div>
              <span className="text-[11px] text-muted-foreground">avg. score</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-2"><span className="w-3 h-[2px] inline-block bg-primary" /> Supplier</span>
            <span className="flex items-center gap-2"><span className="w-3 h-[2px] inline-block bg-accent" /> Tier-2 Benchmark</span>
          </div>

          <div style={{ height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="68%" data={commercialData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: 'hsl(0,0%,40%)', fontWeight: 500 }} tickLine={false} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="hsl(155, 24%, 55%)" fill="hsl(155, 24%, 55%)" fillOpacity={0.04} strokeWidth={1.5} strokeDasharray="6 3" />
                <Radar name="Supplier" dataKey="supplier" stroke="hsl(195, 89%, 34%)" fill="hsl(195, 89%, 34%)" fillOpacity={0.12} strokeWidth={2.5} dot={{ r: 3.5, fill: 'hsl(195, 89%, 34%)' }} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid hsl(var(--border))', borderRadius: 0, background: 'white' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 pt-4 border-t border-border/40">
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground">Gap to benchmark</span>
            <div className="mt-3">
              {commercialGaps.filter(g => g.gap < 0).slice(0, 5).map(g => (
                <GapBar key={g.label} label={g.label} supplierVal={g.supplierVal} targetVal={g.targetVal} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Takeaway bar */}
      <div className="flex items-center gap-8 p-6 bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center gap-6 shrink-0">
          <div className="text-center">
            <div className="text-[36px] font-bold font-mono leading-none text-destructive">{criticalCount}</div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Critical Gaps</span>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-[36px] font-bold font-mono leading-none text-warning">
              {productionGaps.filter(g => g.gap < 0).length + commercialGaps.filter(g => g.gap < 0).length}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Total Below Target</span>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Critical weaknesses in <strong className="text-foreground">supply chain resilience</strong>, <strong className="text-foreground">business continuity</strong>, <strong className="text-foreground">ESG readiness</strong>, and <strong className="text-foreground">automation level</strong>. Machine park tooling and calibration compliance require immediate investment.
        </p>
      </div>
    </section>
  );
}