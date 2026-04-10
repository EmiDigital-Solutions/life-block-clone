import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  costImpactData,
  qualityTrajectoryData,
  qualityTrajectoryMitigated,
  innovationSignals,
  crossCorrelations,
  supplierRiskSignals,
  scenarioOutcomes,
  iatfProcessScores,
  iatfWeightedScore,
} from "@/data/auditReportData";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
  AreaChart, Area, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  Sparkles, Brain, TrendingDown, TrendingUp, Minus,
  AlertTriangle, Eye, Zap, ChevronDown, ChevronRight,
  DollarSign, Shield, Lightbulb, Link2, Target,
} from "lucide-react";

const trendIcon = { improving: TrendingUp, declining: TrendingDown, stable: Minus };
const trendColor = { improving: '#22D3A5', declining: '#F04464', stable: '#6B7085' };
const severityColor = { critical: '#F04464', high: '#FF7A59', medium: '#F5B544', low: '#A1A5B7' };
const statusColor = { safe: '#22D3A5', warning: '#F5B544', critical: '#F04464' };

export default function AtlasIntelligence() {
  const [showMitigated, setShowMitigated] = useState(false);
  const [expandedCorrelation, setExpandedCorrelation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cost' | 'quality' | 'innovation' | 'correlations' | 'scenarios'>('cost');

  const totalExposure = costImpactData.reduce((s, c) => s + c.currentExposure, 0);
  const totalMitigated = costImpactData.reduce((s, c) => s + c.mitigatedCost, 0);
  const trajectoryData = showMitigated ? qualityTrajectoryMitigated : qualityTrajectoryData;

  const tabs = [
    { id: 'cost' as const, label: 'Cost Impact', icon: DollarSign },
    { id: 'quality' as const, label: 'Quality Trajectory', icon: Shield },
    { id: 'innovation' as const, label: 'Innovation', icon: Lightbulb },
    { id: 'correlations' as const, label: 'Hidden Patterns', icon: Brain },
    { id: 'scenarios' as const, label: 'Scenarios', icon: Target },
  ];

  return (
    <section id="station-11" className="scroll-mt-20 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-[32px] font-semibold text-[#F5F6FA] tracking-tight leading-none">
          Atlas Intelligence
        </span>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-gradient-to-r from-[#6366F1]/20 to-[#22D3EE]/20 text-[#22D3EE]">
          <Sparkles className="w-3 h-3 inline mr-1" />Super-Intelligence
        </span>
      </div>

      <p className="text-[14px] text-[#A1A5B7] max-w-[640px]">
        Atlas analyzes cross-domain correlations invisible to human auditors — connecting calibration patterns, 
        financial exposure, quality trajectories, and innovation gaps into a unified risk model.
      </p>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-white/[0.08] text-[#F5F6FA]"
                : "text-[#6B7085] hover:text-[#A1A5B7]"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════ COST IMPACT ═══════ */}
      {activeTab === 'cost' && (
        <div className="space-y-4">
          {/* Summary tiles */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#F04464]/20 bg-[#F04464]/[0.04] p-5">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">Total Exposure</span>
              <p className="text-[36px] font-semibold text-[#F04464] leading-none mt-2 tabular-nums" style={{ fontFeatureSettings: "'tnum'" }}>
                €{(totalExposure / 1000).toFixed(0)}K
              </p>
              <span className="text-[11px] text-[#A1A5B7] mt-1 block">if no action taken</span>
            </div>
            <div className="rounded-2xl border border-[#22D3A5]/20 bg-[#22D3A5]/[0.04] p-5">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">After Mitigation</span>
              <p className="text-[36px] font-semibold text-[#22D3A5] leading-none mt-2 tabular-nums" style={{ fontFeatureSettings: "'tnum'" }}>
                €{(totalMitigated / 1000).toFixed(0)}K
              </p>
              <span className="text-[11px] text-[#A1A5B7] mt-1 block">with full remediation</span>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">ROI of Action</span>
              <p className="text-[36px] font-semibold text-[#F5F6FA] leading-none mt-2 tabular-nums" style={{ fontFeatureSettings: "'tnum'" }}>
                {((1 - totalMitigated / totalExposure) * 100).toFixed(0)}%
              </p>
              <span className="text-[11px] text-[#A1A5B7] mt-1 block">cost reduction achievable</span>
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">Cost Exposure by Category</h4>
            {costImpactData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#F5F6FA] font-medium">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-[#F04464]">€{item.currentExposure.toLocaleString()}</span>
                    <span className="text-[10px] text-[#6B7085]">→</span>
                    <span className="text-[12px] font-mono text-[#22D3A5]">€{item.mitigatedCost.toLocaleString()}</span>
                    <span className="text-[10px] font-mono text-[#6B7085] px-1.5 py-0.5 rounded bg-white/[0.04]">{item.confidence}%</span>
                  </div>
                </div>
                <div className="relative h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#F04464]/40"
                    style={{ width: `${(item.currentExposure / totalExposure) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#22D3A5]"
                    style={{ width: `${(item.mitigatedCost / totalExposure) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6B7085] leading-relaxed">{item.driver}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ QUALITY TRAJECTORY ═══════ */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">DPPM Forecast — 12 Month</h4>
                <p className="text-[12px] text-[#A1A5B7] mt-1">BMW target: 50 DPPM (red line)</p>
              </div>
              <button
                onClick={() => setShowMitigated(!showMitigated)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border",
                  showMitigated
                    ? "border-[#22D3A5]/30 text-[#22D3A5] bg-[#22D3A5]/10"
                    : "border-white/[0.08] text-[#A1A5B7] hover:text-[#F5F6FA]"
                )}
              >
                {showMitigated ? '✓ With remediation' : 'Show mitigated'}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#6B7085', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7085', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#13151C', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', fontSize: '12px', color: '#F5F6FA',
                  }}
                />
                {/* Confidence band */}
                <Area type="monotone" dataKey="upperBound" stroke="none" fill="#6366F1" fillOpacity={0.08} />
                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#0A0B0F" fillOpacity={1} />
                {/* Predicted */}
                <Area
                  type="monotone" dataKey="predicted" stroke="#6366F1" strokeWidth={2}
                  fill="url(#qualityGradient)" fillOpacity={0.15} strokeDasharray="6 3"
                />
                {/* Actual */}
                <Area
                  type="monotone" dataKey="actual" stroke="#22D3EE" strokeWidth={2}
                  fill="none" dot={{ r: 4, fill: '#22D3EE' }} connectNulls={false}
                />
                {/* BMW target line */}
                <Area type="monotone" dataKey={() => 50} stroke="#F04464" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                <defs>
                  <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 text-[11px] text-[#6B7085]">
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#22D3EE] rounded-full inline-block" /> Actual</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#6366F1] rounded-full inline-block" style={{ borderBottom: '1px dashed' }} /> Predicted</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#F04464] rounded-full inline-block" style={{ borderBottom: '1px dashed' }} /> BMW Target (50)</span>
            </div>
          </div>

          {/* Risk signals */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-4">Supplier Risk Signals</h4>
            <div className="space-y-2">
              {supplierRiskSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: statusColor[signal.status] }} />
                  <span className="text-[13px] text-[#F5F6FA] font-medium flex-1 min-w-0">{signal.signal}</span>
                  <span className="text-[14px] font-mono tabular-nums shrink-0" style={{ color: statusColor[signal.status], fontFeatureSettings: "'tnum'" }}>
                    {signal.value}
                  </span>
                  <span className="text-[10px] text-[#6B7085] shrink-0">/ {signal.threshold}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ INNOVATION ═══════ */}
      {activeTab === 'innovation' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Radar */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-4">Innovation Radar vs. Tier-2 Benchmark</h4>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={innovationSignals.map(s => ({ dimension: s.dimension.replace(/\s/g, '\n'), score: s.score, benchmark: s.benchmark }))}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6B7085', fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="benchmark" stroke="#6B7085" fill="none" strokeWidth={1} strokeDasharray="4 4" />
                  <Radar dataKey="score" stroke="#22D3EE" fill="url(#innovationGradient)" fillOpacity={0.3} strokeWidth={2} />
                  <defs>
                    <linearGradient id="innovationGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-2 text-[11px] text-[#6B7085]">
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#22D3EE] rounded-full inline-block" /> MV Motors</span>
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#6B7085] rounded-full inline-block" style={{ borderBottom: '1px dashed' }} /> Tier-2 Median</span>
              </div>
            </div>

            {/* Signal list */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-2">Innovation Signals</h4>
              {innovationSignals.map((signal, i) => {
                const TIcon = trendIcon[signal.trend];
                return (
                  <div key={i} className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] text-[#F5F6FA] font-medium">{signal.dimension}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: signal.score >= signal.benchmark ? '#22D3A5' : '#F5B544', fontFeatureSettings: "'tnum'" }}>
                          {signal.score}
                        </span>
                        <span className="text-[11px] text-[#6B7085]">/ {signal.benchmark}</span>
                        <TIcon className="w-3 h-3" style={{ color: trendColor[signal.trend] }} />
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-white/[0.04] rounded-full overflow-hidden mb-2">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-[#22D3EE]/60" style={{ width: `${signal.score}%` }} />
                      <div className="absolute top-0 bottom-0 w-px bg-[#6B7085]" style={{ left: `${signal.benchmark}%` }} />
                    </div>
                    <p className="text-[11px] text-[#6B7085] leading-relaxed">{signal.insight}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IATF Process Scores */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">IATF 16949 Process Audit Scores</h4>
              <span className="text-[14px] font-mono tabular-nums text-[#F5B544]" style={{ fontFeatureSettings: "'tnum'" }}>
                Weighted: {Math.round(iatfWeightedScore)}%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={iatfProcessScores} margin={{ left: 120 }} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6B7085', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="process" tick={{ fill: '#A1A5B7', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={14}>
                  {iatfProcessScores.map((entry, index) => (
                    <Cell key={index} fill={entry.score >= 80 ? '#22D3A5' : entry.score >= 60 ? '#F5B544' : '#F04464'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ═══════ HIDDEN PATTERNS ═══════ */}
      {activeTab === 'correlations' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/[0.03] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-[#6366F1]" />
              <span className="text-[13px] font-medium text-[#F5F6FA]">What Atlas sees that humans don't</span>
            </div>
            <p className="text-[12px] text-[#A1A5B7] leading-relaxed">
              Atlas cross-referenced 847 data points across all stations, historical audit data (5 prior audits), 
              supplier financials, BMW quality gateway submissions, and regional industry benchmarks to identify 
              6 hidden patterns. Items marked with <Eye className="w-3 h-3 inline text-[#6366F1]" /> were not flagged by the auditor.
            </p>
          </div>

          {crossCorrelations.map((cc) => (
            <div
              key={cc.id}
              className={cn(
                "rounded-2xl border p-5 transition-all cursor-pointer",
                cc.severity === 'critical' ? "border-[#F04464]/20 bg-[#F04464]/[0.02]" :
                cc.severity === 'high' ? "border-[#FF7A59]/20 bg-[#FF7A59]/[0.02]" :
                "border-white/[0.08] bg-white/[0.02]"
              )}
              onClick={() => setExpandedCorrelation(expandedCorrelation === cc.id ? null : cc.id)}
            >
              <div className="flex items-start gap-3">
                {!cc.humanVisible && <Eye className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[14px] font-medium text-[#F5F6FA]">{cc.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                      style={{ background: `${severityColor[cc.severity]}15`, color: severityColor[cc.severity] }}>
                      {cc.severity}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-[#6B7085]">
                      {cc.confidence}% conf.
                    </span>
                  </div>
                  {expandedCorrelation === cc.id && (
                    <div className="mt-3 space-y-3">
                      <p className="text-[13px] text-[#A1A5B7] leading-relaxed">{cc.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link2 className="w-3 h-3 text-[#6B7085]" />
                        {cc.connectedFindings.map(f => (
                          <span key={f} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#A1A5B7]">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {expandedCorrelation === cc.id ? <ChevronDown className="w-4 h-4 text-[#6B7085]" /> : <ChevronRight className="w-4 h-4 text-[#6B7085]" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════ SCENARIOS ═══════ */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <p className="text-[13px] text-[#A1A5B7]">What happens under each decision path — cost, delivery, and quality modeled simultaneously.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarioOutcomes.map((sc, i) => {
              const isRecommended = sc.scenario === 'Full Remediation';
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-2xl border p-5 space-y-4",
                    isRecommended ? "border-[#22D3A5]/30 bg-[#22D3A5]/[0.03]" : "border-white/[0.08] bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-semibold text-[#F5F6FA]">{sc.scenario}</span>
                    {isRecommended && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22D3A5]/20 text-[#22D3A5] font-semibold uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6B7085]">Delay</span>
                      <p className="text-[24px] font-mono tabular-nums text-[#F5F6FA]" style={{ fontFeatureSettings: "'tnum'" }}>
                        +{sc.deliveryDelay}d
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#6B7085]">Cost</span>
                      <p className="text-[24px] font-mono tabular-nums" style={{ color: sc.costImpact > 200000 ? '#F04464' : sc.costImpact > 100000 ? '#F5B544' : '#22D3A5', fontFeatureSettings: "'tnum'" }}>
                        €{(sc.costImpact / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#A1A5B7] leading-relaxed">{sc.qualityRisk}</p>
                  <p className="text-[11px] font-medium" style={{ color: isRecommended ? '#22D3A5' : '#6B7085' }}>{sc.recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
