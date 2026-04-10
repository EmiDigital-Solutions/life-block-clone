import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
  AreaChart, Area, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  Sparkles, Brain, TrendingDown, TrendingUp, Minus,
  Eye, ChevronDown, ChevronRight,
  DollarSign, Shield, Lightbulb, Link2, Target,
} from "lucide-react";

const trendIcon = { improving: TrendingUp, declining: TrendingDown, stable: Minus };
const trendColor = { improving: '#6EA996', declining: '#AD3D3D', stable: '#7B8E80' };
const severityColor = { critical: '#AD3D3D', high: '#E39B5C', medium: '#E39B5C', low: '#7B8E80' };
const statusColor = { safe: '#6EA996', warning: '#E39B5C', critical: '#AD3D3D' };

export default function AtlasIntelligence() {
  const [showMitigated, setShowMitigated] = useState(false);
  const [expandedCorrelation, setExpandedCorrelation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cost' | 'quality' | 'innovation' | 'correlations' | 'scenarios'>('cost');

  const totalExposure = costImpactData.reduce((s, c) => s + c.currentExposure, 0);
  const totalMitigated = costImpactData.reduce((s, c) => s + c.mitigatedCost, 0);
  const trajectoryData = showMitigated ? qualityTrajectoryMitigated : qualityTrajectoryData;

  const tabs = [
    { id: 'cost' as const, label: 'Cost Impact', icon: DollarSign },
    { id: 'quality' as const, label: 'Quality', icon: Shield },
    { id: 'innovation' as const, label: 'Innovation', icon: Lightbulb },
    { id: 'correlations' as const, label: 'Patterns', icon: Brain },
    { id: 'scenarios' as const, label: 'Scenarios', icon: Target },
  ];

  return (
    <section id="station-11" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// 11</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Atlas Intelligence</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none">Atlas Intelligence</h2>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-[#0A7FA5]/10 text-[#0A7FA5]">
          <Sparkles className="w-3 h-3 inline mr-1" />AI
        </span>
      </div>

      <p className="text-[14px] text-[#7B8E80] max-w-[640px] leading-relaxed">
        Cross-domain correlations invisible to human auditors — connecting calibration patterns,
        financial exposure, quality trajectories, and innovation gaps.
      </p>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1  bg-[#F5F5F5] border border-[#E5E7EB] overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2  text-[12px] font-medium whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#7B8E80] hover:text-[#0A0A0A]"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* COST */}
      {activeTab === 'cost' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className=" border border-[#AD3D3D]/20 bg-[#AD3D3D]/5 p-5">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">Total Exposure</span>
              <p className="text-[32px] font-light text-[#AD3D3D] leading-none mt-2 tabular-nums">€{(totalExposure / 1000).toFixed(0)}K</p>
              <span className="text-[12px] text-[#7B8E80] mt-1 block">if no action taken</span>
            </div>
            <div className=" border border-[#6EA996]/20 bg-[#6EA996]/5 p-5">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">After Mitigation</span>
              <p className="text-[32px] font-light text-[#6EA996] leading-none mt-2 tabular-nums">€{(totalMitigated / 1000).toFixed(0)}K</p>
              <span className="text-[12px] text-[#7B8E80] mt-1 block">with full remediation</span>
            </div>
            <div className=" border border-[#E5E7EB] bg-white p-5">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">ROI of Action</span>
              <p className="text-[32px] font-light text-[#0A0A0A] leading-none mt-2 tabular-nums">{((1 - totalMitigated / totalExposure) * 100).toFixed(0)}%</p>
              <span className="text-[12px] text-[#7B8E80] mt-1 block">cost reduction achievable</span>
            </div>
          </div>

          <div className=" border border-[#E5E7EB] bg-white p-6 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">Cost Exposure by Category</h4>
            {costImpactData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#0A0A0A] font-medium">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-mono text-[#AD3D3D]">€{item.currentExposure.toLocaleString()}</span>
                    <span className="text-[11px] text-[#C0C0C0]">→</span>
                    <span className="text-[13px] font-mono text-[#6EA996]">€{item.mitigatedCost.toLocaleString()}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#7B8E80]">{item.confidence}%</span>
                  </div>
                </div>
                <div className="relative h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#AD3D3D]/15" style={{ width: `${(item.currentExposure / totalExposure) * 100}%` }} />
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#6EA996]" style={{ width: `${(item.mitigatedCost / totalExposure) * 100}%` }} />
                </div>
                <p className="text-[12px] text-[#7B8E80] leading-relaxed">{item.driver}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUALITY */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className=" border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">DPPM Forecast — 12 Month</h4>
                <p className="text-[12px] text-[#7B8E80] mt-1">BMW target: 50 DPPM (red line)</p>
              </div>
              <button
                onClick={() => setShowMitigated(!showMitigated)}
                className={cn(
                  "px-3 py-1.5  text-[11px] font-medium transition-all border",
                  showMitigated ? "border-[#6EA996] text-[#6EA996] bg-[#6EA996]/5" : "border-[#E5E7EB] text-[#7B8E80] hover:text-[#0A0A0A]"
                )}
              >
                {showMitigated ? '✓ With remediation' : 'Show mitigated'}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fill: '#7B8E80', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7B8E80', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', color: '#0A0A0A' }} />
                <Area type="monotone" dataKey="upperBound" stroke="none" fill="#0A7FA5" fillOpacity={0.04} />
                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#fff" fillOpacity={1} />
                <Area type="monotone" dataKey="predicted" stroke="#0A7FA5" strokeWidth={2} fill="#0A7FA5" fillOpacity={0.06} strokeDasharray="6 3" />
                <Area type="monotone" dataKey="actual" stroke="#0A0A0A" strokeWidth={2} fill="none" dot={{ r: 4, fill: '#0A0A0A' }} connectNulls={false} />
                <Area type="monotone" dataKey={() => 50} stroke="#AD3D3D" strokeWidth={1} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 text-[12px] text-[#7B8E80]">
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0A0A0A] rounded-full inline-block" /> Actual</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0A7FA5] rounded-full inline-block" /> Predicted</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#AD3D3D] rounded-full inline-block" /> BMW Target (50)</span>
            </div>
          </div>

          <div className=" border border-[#E5E7EB] bg-white p-6">
            <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-4">Supplier Risk Signals</h4>
            <div className="space-y-2">
              {supplierRiskSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-3 p-3  border border-[#E5E7EB] bg-[#F5F5F5]">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: statusColor[signal.status] }} />
                  <span className="text-[13px] text-[#0A0A0A] font-medium flex-1 min-w-0">{signal.signal}</span>
                  <span className="text-[15px] font-mono tabular-nums shrink-0" style={{ color: statusColor[signal.status] }}>{signal.value}</span>
                  <span className="text-[11px] text-[#7B8E80] shrink-0">/ {signal.threshold}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INNOVATION */}
      {activeTab === 'innovation' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className=" border border-[#E5E7EB] bg-white p-6">
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-4">Innovation Radar vs. Tier-2</h4>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={innovationSignals.map(s => ({ dimension: s.dimension.replace(/\s/g, '\n'), score: s.score, benchmark: s.benchmark }))}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#7B8E80', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="benchmark" stroke="#C0C0C0" fill="none" strokeWidth={1} strokeDasharray="4 4" />
                  <Radar dataKey="score" stroke="#0A7FA5" fill="#0A7FA5" fillOpacity={0.08} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-2 text-[12px] text-[#7B8E80]">
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0A7FA5] rounded-full inline-block" /> MV Motors</span>
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#C0C0C0] rounded-full inline-block" /> Tier-2 Median</span>
              </div>
            </div>

            <div className=" border border-[#E5E7EB] bg-white p-6 space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold mb-2">Innovation Signals</h4>
              {innovationSignals.map((signal, i) => {
                const TIcon = trendIcon[signal.trend];
                return (
                  <div key={i} className="p-3  border border-[#E5E7EB] bg-[#F5F5F5]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] text-[#0A0A0A] font-medium">{signal.dimension}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: signal.score >= signal.benchmark ? '#6EA996' : '#E39B5C' }}>{signal.score}</span>
                        <span className="text-[12px] text-[#7B8E80]">/ {signal.benchmark}</span>
                        <TIcon className="w-3.5 h-3.5" style={{ color: trendColor[signal.trend] }} />
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden mb-2">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-[#0A7FA5]/40" style={{ width: `${signal.score}%` }} />
                      <div className="absolute top-0 bottom-0 w-px bg-[#7B8E80]" style={{ left: `${signal.benchmark}%` }} />
                    </div>
                    <p className="text-[12px] text-[#7B8E80] leading-relaxed">{signal.insight}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">IATF 16949 Process Audit Scores</h4>
              <span className="text-[14px] font-mono tabular-nums text-[#E39B5C]">Weighted: {Math.round(iatfWeightedScore)}%</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={iatfProcessScores} margin={{ left: 120 }} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#7B8E80', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="process" tick={{ fill: '#1A1A1A', fontSize: 12 }} axisLine={false} tickLine={false} width={120} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                  {iatfProcessScores.map((entry, index) => (
                    <Cell key={index} fill={entry.score >= 80 ? '#6EA996' : entry.score >= 60 ? '#E39B5C' : '#AD3D3D'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* HIDDEN PATTERNS */}
      {activeTab === 'correlations' && (
        <div className="space-y-4">
          <div className=" border border-[#ACC5D9] bg-[#ACC5D9]/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-[#0A7FA5]" />
              <span className="text-[13px] font-semibold text-[#0A0A0A]">What Atlas sees that humans don't</span>
            </div>
            <p className="text-[13px] text-[#7B8E80] leading-relaxed">
              Atlas cross-referenced 847 data points across all stations, historical audit data (5 prior audits),
              supplier financials, BMW quality gateway submissions, and regional industry benchmarks to identify
              6 hidden patterns. Items marked with <Eye className="w-3 h-3 inline text-[#0A7FA5]" /> were not flagged by the auditor.
            </p>
          </div>

          {crossCorrelations.map((cc) => (
            <div
              key={cc.id}
              className={cn(
                " border p-5 transition-all cursor-pointer bg-white",
                cc.severity === 'critical' ? "border-[#AD3D3D]/30" :
                cc.severity === 'high' ? "border-[#E39B5C]/30" :
                "border-[#E5E7EB]"
              )}
              onClick={() => setExpandedCorrelation(expandedCorrelation === cc.id ? null : cc.id)}
            >
              <div className="flex items-start gap-3">
                {!cc.humanVisible && <Eye className="w-4 h-4 text-[#0A7FA5] mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[14px] font-medium text-[#0A0A0A]">{cc.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                      style={{ background: `${severityColor[cc.severity]}15`, color: severityColor[cc.severity] }}>
                      {cc.severity}
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#7B8E80]">{cc.confidence}% conf.</span>
                  </div>
                  {expandedCorrelation === cc.id && (
                    <div className="mt-3 space-y-3">
                      <p className="text-[13px] text-[#7B8E80] leading-relaxed">{cc.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link2 className="w-3 h-3 text-[#7B8E80]" />
                        {cc.connectedFindings.map(f => (
                          <span key={f} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F5F5F5] text-[#1A1A1A]">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {expandedCorrelation === cc.id ? <ChevronDown className="w-4 h-4 text-[#7B8E80]" /> : <ChevronRight className="w-4 h-4 text-[#7B8E80]" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCENARIOS */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <p className="text-[13px] text-[#7B8E80] leading-relaxed">What happens under each decision path — cost, delivery, and quality modeled simultaneously.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarioOutcomes.map((sc, i) => {
              const isRecommended = sc.scenario === 'Full Remediation';
              return (
                <div key={i} className={cn(
                  " border p-5 space-y-4 bg-white",
                  isRecommended ? "border-[#6EA996]/30 bg-[#6EA996]/5" : "border-[#E5E7EB]"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-medium text-[#0A0A0A]">{sc.scenario}</span>
                    {isRecommended && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6EA996]/15 text-[#6EA996] font-semibold uppercase tracking-wider">Recommended</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7B8E80] font-semibold">Delay</span>
                      <p className="text-[24px] font-mono font-light tabular-nums text-[#0A0A0A]">+{sc.deliveryDelay}d</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7B8E80] font-semibold">Cost</span>
                      <p className="text-[24px] font-mono font-light tabular-nums" style={{ color: sc.costImpact > 200000 ? '#AD3D3D' : sc.costImpact > 100000 ? '#E39B5C' : '#6EA996' }}>
                        €{(sc.costImpact / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#7B8E80] leading-relaxed">{sc.qualityRisk}</p>
                  <p className="text-[12px] font-medium" style={{ color: isRecommended ? '#6EA996' : '#7B8E80' }}>{sc.recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
