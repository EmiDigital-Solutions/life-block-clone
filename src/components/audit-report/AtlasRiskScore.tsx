import { cn } from "@/lib/utils";
import { stations, allNCRs, kpis, costImpactData } from "@/data/auditReportData";
import { Sparkles, Shield, TrendingUp } from "lucide-react";

// Compute composite Atlas Risk Score 0-100
function computeRiskScore() {
  // Station health component (40% weight)
  const healthScores = { green: 100, amber: 60, red: 20, grey: 50 };
  const stationStations = stations.filter(s => s.index >= 2 && s.index <= 9);
  const stationAvg = stationStations.reduce((acc, s) => acc + healthScores[s.health], 0) / stationStations.length;

  // NCR severity component (30% weight) — inverted: more NCRs = lower score
  const majorCount = allNCRs.filter(n => n.severity === 'major').length;
  const minorCount = allNCRs.filter(n => n.severity === 'minor').length;
  const ncrScore = Math.max(0, 100 - (majorCount * 25) - (minorCount * 10));

  // Cost exposure (20% weight)
  const totalExposure = costImpactData.reduce((a, c) => a + c.currentExposure, 0);
  const costScore = Math.max(0, 100 - (totalExposure / 10000));

  // Overall score composite (10% weight)
  const overallKpi = kpis.find(k => k.label === 'Overall Score');
  const overallScore = overallKpi ? parseInt(overallKpi.value) : 72;

  const composite = Math.round(
    stationAvg * 0.4 +
    ncrScore * 0.3 +
    costScore * 0.2 +
    overallScore * 0.1
  );

  return Math.max(0, Math.min(100, composite));
}

function RiskGauge({ score }: { score: number }) {
  const color = score >= 70 ? '#6EA996' : score >= 40 ? '#E39B5C' : '#AD3D3D';
  const label = score >= 70 ? 'LOW RISK' : score >= 40 ? 'MODERATE RISK' : 'HIGH RISK';
  const angle = (score / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 70" className="w-[200px]">
        {/* Background arc */}
        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" />
        {/* Score arc */}
        <path
          d="M 10 65 A 50 50 0 0 1 110 65"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 157} 157`}
        />
        {/* Score text */}
        <text x="60" y="58" textAnchor="middle" className="text-[28px] font-bold" fill={color} style={{ fontFamily: 'monospace' }}>
          {score}
        </text>
      </svg>
      <div className="flex items-center gap-1.5 mt-1">
        <Shield className="w-3 h-3" style={{ color }} />
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color }}>{label}</span>
      </div>
    </div>
  );
}

export default function AtlasRiskScore() {
  const score = computeRiskScore();
  const percentile = 23; // mock cross-audit benchmarking
  const totalAudits = 47;

  return (
    <section className="py-12 border-b border-[#E5E7EB]">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// ATLAS</span>
        <Sparkles className="w-3.5 h-3.5 text-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Composite Risk Score</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="border border-[#E5E7EB] bg-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Gauge */}
          <RiskGauge score={score} />

          {/* Breakdown */}
          <div className="flex-1 space-y-3">
            <h3 className="text-[18px] font-semibold text-[#0A0A0A]">Atlas Risk Score</h3>
            <p className="text-[13px] text-[#7B8E80] leading-relaxed">
              Composite score combining station health, NCR severity, machine OEE, cost exposure, and delay probability into a single metric.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Station Health', value: '62%', color: '#E39B5C' },
                { label: 'NCR Impact', value: '20/100', color: '#AD3D3D' },
                { label: 'Cost Risk', value: '€937K', color: '#AD3D3D' },
                { label: 'OEE Avg', value: '82%', color: '#E39B5C' },
              ].map(item => (
                <div key={item.label} className="border border-[#E5E7EB] p-3">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">{item.label}</span>
                  <div className="text-[16px] font-mono font-bold mt-1" style={{ color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Cross-audit benchmarking */}
            <div className="flex items-center gap-2 mt-4 p-3 bg-[#0A7FA5]/5 border border-[#0A7FA5]/10">
              <TrendingUp className="w-4 h-4 text-[#0A7FA5]" />
              <span className="text-[12px] text-[#0A0A0A]">
                This supplier scores in the <strong>{percentile}rd percentile</strong> compared to {totalAudits} audits in Automotive Plastics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
