import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Station, NCR } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { 
  X, Sparkles, FileText, Monitor, Clock, AlertTriangle, TrendingUp, 
  TrendingDown, Eye, AlertTriangle as WarnIcon, Lightbulb, BarChart3, Camera,
  Brain, Crosshair, Search, Volume2, VolumeX, Square
} from "lucide-react";

const SW = 1.5;

type TabId = 'atlas' | 'evidence' | 'equipment' | 'timeline';

const healthLabel: Record<string, { label: string; color: string }> = {
  green: { label: 'Conforming', color: 'var(--ar-pass)' },
  amber: { label: 'Observation', color: 'var(--ar-warn)' },
  red: { label: 'Critical', color: 'var(--ar-fail)' },
  grey: { label: 'N/A', color: 'var(--ar-tx-4)' },
};

// Station-specific Atlas Brain intelligence
const stationIntelligence: Record<number, {
  clientPriority: { level: 'HIGH' | 'MEDIUM' | 'LOW'; reason: string };
  standardRequirement: string;
  predictions: { title: string; body: string; confidence: number; impact: 'critical' | 'high' | 'medium'; icon: 'trend' | 'alert' | 'eye' | 'target' }[];
  hiddenPatterns: { title: string; body: string; dataPoints: number }[];
  auditStrategy: { step: string; detail: string; evidenceRequired?: string; done?: string }[];
}> = {
  1: {
    clientPriority: { level: 'HIGH', reason: 'As a Tier-1 BMW supplier, document control directly impacts IATF 16949 certification validity. Any gap here triggers an automatic minor NCR per BMW SQ requirements.' },
    standardRequirement: '"The organization shall maintain documented information to the extent necessary to support the operation of processes and retain documented information as evidence of conformity." — ISO 9001:2015 §7.5',
    predictions: [
      { title: 'Document revision lag detected', body: 'Atlas detected 3 work instructions with revision dates >12 months old. Based on 847 similar audits, this correlates with a 72% probability of finding outdated process parameters on the shop floor.', confidence: 87, impact: 'high', icon: 'trend' },
      { title: 'Calibration records gap', body: 'Cross-referencing equipment list vs. calibration logs shows 2 measurement devices with expired calibration certificates. This is a systemic issue seen in 34% of Croatian Tier-2 suppliers.', confidence: 91, impact: 'critical', icon: 'alert' },
    ],
    hiddenPatterns: [
      { title: 'Single-person dependency', body: 'Document control responsibility is concentrated on 1 employee. Atlas identified this as the root cause for the 2024 audit finding about delayed ECN implementation.', dataPoints: 142 },
    ],
    auditStrategy: [
      { step: 'Verify document master list', detail: 'Check completeness and revision status of all controlled documents', evidenceRequired: 'PHOTO OF DOCUMENT MASTER LIST', done: 'All 47 documents verified — 3 outdated revisions found' },
      { step: 'Cross-check shop floor copies', detail: 'Verify work instructions at each workstation match current revision', evidenceRequired: 'PHOTOS OF WORK INSTRUCTIONS AT STATIONS' },
      { step: 'Review change management', detail: 'Trace last 5 engineering changes from notification to implementation', evidenceRequired: 'ECN LOG SCREENSHOT' },
    ],
  },
  2: {
    clientPriority: { level: 'HIGH', reason: 'BMW requires all Tier-2 suppliers to maintain full traceability of incoming materials back to raw material source. Non-conforming incoming goods directly impact BMW SOP timeline.' },
    standardRequirement: '"Externally provided processes, products and services shall conform to requirements. The organization shall determine the verification activities needed." — ISO 9001:2015 §8.4',
    predictions: [
      { title: 'Incoming inspection skip rate rising', body: 'Atlas detected a 23% increase in skip-lot approvals over the past 6 months. Historical data from 1,200+ audits shows this precedes a quality escape within 4-8 months with 78% probability.', confidence: 78, impact: 'high', icon: 'trend' },
      { title: 'Sub-supplier concentration risk', body: '68% of raw material comes from a single source (Arcelor Mittal Sisak). If disrupted, lead time for alternative sourcing is estimated at 14-18 weeks based on material specifications.', confidence: 85, impact: 'medium', icon: 'target' },
    ],
    hiddenPatterns: [
      { title: 'Seasonal quality variation', body: 'Atlas detected a correlation between incoming material reject rates and Q1 deliveries. Steel batches from Jan-Mar show 2.3× higher dimensional variation, likely due to supplier furnace maintenance cycles.', dataPoints: 2847 },
    ],
    auditStrategy: [
      { step: 'Review incoming inspection records', detail: 'Check last 30 days of incoming inspection reports for completeness', evidenceRequired: 'PHOTO OF INSPECTION LOG' },
      { step: 'Verify material certificates', detail: 'Cross-reference 3.1 certificates against actual delivery batches', evidenceRequired: 'MATERIAL CERTIFICATE PHOTOS' },
      { step: 'Check supplier scorecard', detail: 'Review supplier performance ratings and trend analysis', evidenceRequired: 'SUPPLIER SCORECARD SCREENSHOT' },
    ],
  },
  3: {
    clientPriority: { level: 'HIGH', reason: 'Production line capability directly determines whether BMW dimensional specifications (Cpk ≥ 1.33) can be consistently met. This station has the highest impact on end-customer quality.' },
    standardRequirement: '"The organization shall implement production under controlled conditions including the use of suitable monitoring and measuring equipment at appropriate stages." — ISO 9001:2015 §8.5.1',
    predictions: [
      { title: 'CNC drift pattern emerging', body: 'Bore ID measurements show a systematic drift of +0.003mm/week on CNC-04. At current rate, parts will exceed USL within 3 weeks. Atlas recommends immediate tool offset adjustment.', confidence: 94, impact: 'critical', icon: 'alert' },
      { title: 'OEE decline trajectory', body: 'Production line OEE has dropped from 78% to 62% over 6 months. Primary contributor: unplanned downtime increased 340%. Pattern matches pre-failure behavior seen in 89 similar machine parks.', confidence: 88, impact: 'high', icon: 'trend' },
      { title: 'Operator skill gap detected', body: 'SPC chart interpretation errors detected in 3 of 5 operator logs reviewed. Operators are plotting but not reacting to Rule 2 (9 points on one side) violations.', confidence: 82, impact: 'medium', icon: 'eye' },
    ],
    hiddenPatterns: [
      { title: 'Temperature-dependent quality', body: 'Atlas cross-referenced reject data with facility temperature logs. Dimensional non-conformities increase 4.2× when ambient temperature exceeds 28°C. Current HVAC system has no closed-loop control in machining area.', dataPoints: 14200 },
      { title: 'Shift performance asymmetry', body: 'Night shift (C) produces 31% more rework than day shift (A), despite identical equipment. Root cause correlates with supervisor experience level — C shift supervisor has 8 months tenure vs. 12 years for A shift.', dataPoints: 8400 },
    ],
    auditStrategy: [
      { step: 'Verify process capability', detail: 'Review Cpk/Ppk studies for all critical characteristics', evidenceRequired: 'SPC CHARTS FOR BORE ID DIMENSION', done: 'Cpk = 0.98 — BELOW BMW minimum of 1.33' },
      { step: 'Check calibration status', detail: 'Verify all measurement equipment is within calibration date', evidenceRequired: 'CALIBRATION STICKERS ON CMM' },
      { step: 'Review control plan compliance', detail: 'Walk the line and verify control plan matches actual practice', evidenceRequired: 'CONTROL PLAN vs ACTUAL COMPARISON PHOTOS' },
      { step: 'Assess preventive maintenance', detail: 'Review PM schedules and completion rates for last 6 months', evidenceRequired: 'PM COMPLETION LOG' },
    ],
  },
  4: {
    clientPriority: { level: 'MEDIUM', reason: 'Assembly operations are semi-automated with torque-controlled fastening. BMW requires 100% torque verification with electronic documentation for safety-critical joints.' },
    standardRequirement: '"The organization shall control the unique identification of outputs when traceability is a requirement and retain documented information to enable traceability." — ISO 9001:2015 §8.5.2',
    predictions: [
      { title: 'Torque tool calibration cycle', body: 'Based on usage patterns, Atlas predicts 2 of 4 torque wrenches will exceed their calibration interval within 45 days. Current PM schedule does not account for actual usage cycles.', confidence: 76, impact: 'medium', icon: 'target' },
    ],
    hiddenPatterns: [
      { title: 'Ergonomic risk correlation', body: 'Rework rates at assembly station 3 are 2.1× higher after shift hour 6. This correlates with operator fatigue patterns observed across 340 similar manual assembly operations.', dataPoints: 3400 },
    ],
    auditStrategy: [
      { step: 'Verify torque documentation', detail: 'Check electronic torque logs for completeness and traceability', evidenceRequired: 'TORQUE MONITORING SYSTEM SCREENSHOT' },
      { step: 'Assess error-proofing', detail: 'Verify poka-yoke devices are functional and tested daily', evidenceRequired: 'POKA-YOKE TEST LOG PHOTOS' },
    ],
  },
  5: {
    clientPriority: { level: 'HIGH', reason: 'Final test is the last quality gate before shipment. BMW requires 100% dimensional verification of critical characteristics with automated data collection.' },
    standardRequirement: '"The organization shall monitor and measure the characteristics of the product to verify that requirements have been met at appropriate stages." — ISO 9001:2015 §8.6',
    predictions: [
      { title: 'Test coverage gap', body: 'Atlas identified that 2 of 8 critical dimensions listed in the PPAP are not included in the final inspection plan. This creates a 100% escape risk for these characteristics.', confidence: 96, impact: 'critical', icon: 'alert' },
      { title: 'Measurement system inadequacy', body: 'GR&R study for bore ID measurement shows 34% contribution — exceeding the 30% maximum. Measurement system cannot reliably distinguish good from bad parts.', confidence: 89, impact: 'high', icon: 'eye' },
    ],
    hiddenPatterns: [
      { title: 'Reject rate seasonality', body: 'Final inspection reject rates spike 2.8× in weeks following public holidays. Pattern consistent across 3 years of data, suggesting restart/warm-up procedures are inadequate.', dataPoints: 5600 },
    ],
    auditStrategy: [
      { step: 'Verify inspection plan coverage', detail: 'Cross-reference PPAP critical characteristics vs. inspection plan', evidenceRequired: 'INSPECTION PLAN vs PPAP COMPARISON' },
      { step: 'Review GR&R studies', detail: 'Check measurement system analysis for all critical gauges', evidenceRequired: 'GR&R STUDY RESULTS' },
      { step: 'Check non-conforming product handling', detail: 'Verify segregation and disposition process', evidenceRequired: 'QUARANTINE AREA PHOTO' },
    ],
  },
  6: {
    clientPriority: { level: 'LOW', reason: 'Packing and shipping operations follow standardized BMW packaging specifications. Risks are well-controlled through automated label verification systems.' },
    standardRequirement: '"The organization shall preserve outputs during production and service provision to the extent necessary to ensure conformity to requirements." — ISO 9001:2015 §8.5.4',
    predictions: [
      { title: 'Label accuracy stable', body: 'Atlas analysis of last 12 months shipping data shows 99.97% label accuracy. No predictive concerns identified for this station.', confidence: 92, impact: 'medium', icon: 'target' },
    ],
    hiddenPatterns: [],
    auditStrategy: [
      { step: 'Verify packaging compliance', detail: 'Check BMW packaging specification adherence', evidenceRequired: 'PACKAGING PHOTO WITH SPECIFICATION' },
      { step: 'Review shipping records', detail: 'Verify FIFO compliance and lot traceability', evidenceRequired: 'WAREHOUSE FIFO SYSTEM PHOTO' },
    ],
  },
  7: {
    clientPriority: { level: 'HIGH', reason: 'QMS documentation gaps are the leading cause of IATF 16949 certification withdrawal. BMW requires evidence of a living quality management system with measurable objectives.' },
    standardRequirement: '"The organization shall determine what needs to be monitored and measured, the methods needed, when results shall be analyzed, and who is responsible." — ISO 9001:2015 §9.1',
    predictions: [
      { title: 'CAPA closure rate declining', body: 'Current CAPA closure rate is 62.5% against the 90% target. Atlas projects this will trigger a BMW supplier downgrade within 2 audit cycles if trend continues.', confidence: 84, impact: 'critical', icon: 'trend' },
      { title: 'Management review overdue', body: 'Last management review was conducted 14 months ago. IATF 16949 requires minimum annual management reviews with defined inputs/outputs.', confidence: 98, impact: 'high', icon: 'alert' },
    ],
    hiddenPatterns: [
      { title: 'Recurring finding pattern', body: 'Atlas identified that 4 of the current 6 NCRs are repeat findings from the 2024 audit with different descriptions. The root causes were never fully addressed — only symptoms were treated.', dataPoints: 24 },
    ],
    auditStrategy: [
      { step: 'Review quality objectives', detail: 'Check measurability and achievement status of quality KPIs', evidenceRequired: 'QUALITY DASHBOARD SCREENSHOT' },
      { step: 'Verify CAPA effectiveness', detail: 'Trace 3 closed CAPAs to verify root cause elimination', evidenceRequired: 'CAPA RECORDS WITH EFFECTIVENESS CHECK' },
      { step: 'Check management review', detail: 'Review minutes and follow-up actions', evidenceRequired: 'MANAGEMENT REVIEW MINUTES' },
    ],
  },
};

// Equipment data per station
const stationEquipment: Record<number, { name: string; model: string; status: 'ok' | 'warning' | 'critical'; oee?: number; lastMaintenance: string }[]> = {
  3: [
    { name: 'CNC Machining Center', model: 'DMG Mori CMX 600V', status: 'warning', oee: 62, lastMaintenance: '2026-01-15' },
    { name: 'CNC Lathe', model: 'Okuma LB3000 EX II', status: 'ok', oee: 78, lastMaintenance: '2026-03-02' },
    { name: 'CMM', model: 'Zeiss Contura G2', status: 'critical', oee: undefined, lastMaintenance: '2025-11-20' },
    { name: 'Surface Grinder', model: 'Studer S33', status: 'ok', oee: 71, lastMaintenance: '2026-02-28' },
  ],
  4: [
    { name: 'Torque Station', model: 'Atlas Copco ST Wrench', status: 'ok', lastMaintenance: '2026-03-15' },
    { name: 'Press Fit Station', model: 'Promess UFM-30', status: 'ok', oee: 85, lastMaintenance: '2026-02-10' },
  ],
  5: [
    { name: 'Coordinate Measuring Machine', model: 'Hexagon Global S', status: 'warning', lastMaintenance: '2025-12-01' },
    { name: 'Hardness Tester', model: 'Zwick ZHU2.5', status: 'ok', lastMaintenance: '2026-03-20' },
  ],
};

interface SectionInspectorProps {
  activeStation: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function SectionInspector({ activeStation, isOpen, onClose }: SectionInspectorProps) {
  const { stations, allNCRs } = useAuditReportContext();
  const [activeTab, setActiveTab] = useState<TabId>('atlas');
  const [brainTab, setBrainTab] = useState<'intelligence' | 'timeline'>('intelligence');

  const resolvedStationIndex = useMemo(() => {
    const exactMatch = stations.some((s) => s.index === activeStation);
    if (exactMatch) return activeStation;

    const previousStation = [...stations]
      .sort((a, b) => a.index - b.index)
      .reverse()
      .find((s) => s.index < activeStation);

    return previousStation?.index ?? stations[0]?.index ?? activeStation;
  }, [activeStation, stations]);

  const station = stations.find((s) => s.index === resolvedStationIndex);
  if (!station) return null;

  const stationNCRs = allNCRs.filter((n) => n.stationIndex === resolvedStationIndex);
  const hl = healthLabel[station.health];

  // Atlas Brain data is authored for process stations 3-9.
  // Keep the inspector synced to the nearest valid process-station dataset.
  const intellKey = resolvedStationIndex <= 3 ? 1 : resolvedStationIndex >= 9 ? 7 : resolvedStationIndex - 2;
  const intel = stationIntelligence[intellKey] || stationIntelligence[1];
  const equipment = stationEquipment[intellKey] || [];

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'atlas', label: 'Atlas', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'evidence', label: 'Evidence', icon: <FileText className="w-4 h-4" /> },
    { id: 'equipment', label: 'Equipment', icon: <Monitor className="w-4 h-4" /> },
    { id: 'timeline', label: 'History', icon: <Clock className="w-4 h-4" /> },
  ];

  const timelineEvents = [
    { time: '08 apr · 09:14', label: 'Audit started', color: 'var(--ar-pass)' },
    { time: '08 apr · 11:12', label: `Entered ${station.name.toLowerCase()}`, color: 'var(--ar-pass)' },
    ...(stationNCRs.length > 0 ? stationNCRs.map(n => ({
      time: '08 apr · 11:42',
      label: `${n.id} raised — ${n.severity}`,
      color: n.severity === 'major' ? 'var(--ar-fail)' : 'var(--ar-warn)',
    })) : []),
    { time: '08 apr · 12:20', label: `Exit ${station.name.toLowerCase()}`, color: 'var(--ar-tx-4)' },
    { time: '08 apr · 12:22', label: 'Atlas analysis complete', color: 'var(--ar-cta)' },
  ];

  const predictionIcon = (icon: string) => {
    switch (icon) {
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" strokeWidth={SW} />;
      case 'eye': return <Eye className="w-4 h-4" />;
      case 'target': return <Crosshair className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const impactColor = (impact: string) => {
    if (impact === 'critical') return { bg: 'var(--ar-fail-bg)', text: 'var(--ar-fail)' };
    if (impact === 'high') return { bg: 'var(--ar-warn-bg)', text: 'var(--ar-warn)' };
    return { bg: 'var(--ar-pass-bg)', text: 'var(--ar-pass)' };
  };

  return (
    <aside className={cn(
      "flex flex-col transition-all duration-300 overflow-hidden",
      isOpen ? "w-[340px] xl:w-[380px] opacity-100" : "w-0 opacity-0"
    )} style={{ background: 'var(--ar-bg-surface)', borderLeft: '1px solid var(--ar-bd-hair)' }}>
      
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between" style={{ borderBottom: '1px solid var(--ar-bd-hair)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--ar-accent)' }} />
          <span className="text-[13px] font-semibold" style={{ color: 'var(--ar-tx-1)' }}>Atlas · inspector</span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer" style={{ color: 'var(--ar-tx-3)' }}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex" style={{ borderBottom: '1px solid var(--ar-bd-hair)', height: '36px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors cursor-pointer uppercase tracking-[0.08em]",
              activeTab === tab.id 
                ? "border-b-2"
                : "hover:text-foreground"
            )}
            style={{
              fontFamily: "'Space Mono', monospace",
              color: activeTab === tab.id ? 'var(--ar-accent)' : 'var(--ar-tx-3)',
              borderColor: activeTab === tab.id ? 'var(--ar-accent)' : 'transparent',
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'atlas' && (
          <AtlasTab 
            intel={intel} 
            station={station} 
            stationNCRs={stationNCRs}
            brainTab={brainTab}
            setBrainTab={setBrainTab}
            predictionIcon={predictionIcon}
            impactColor={impactColor}
            hl={hl}
            timelineEvents={timelineEvents}
          />
        )}
        {activeTab === 'evidence' && (
          <EvidenceTab station={station} stationNCRs={stationNCRs} />
        )}
        {activeTab === 'equipment' && (
          <EquipmentTab equipment={equipment} station={station} />
        )}
        {activeTab === 'timeline' && (
          <TimelineTab events={timelineEvents} station={station} stationNCRs={stationNCRs} />
        )}
      </div>
    </aside>
  );
}

// ─── Atlas Brain Tab ─────────────────────────────────────────

function AtlasTab({ intel, station, stationNCRs, brainTab, setBrainTab, predictionIcon, impactColor, hl, timelineEvents }: any) {
  const [speaking, setSpeaking] = useState(false);

  const toggleVoice = useCallback(() => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const predictions = intel.predictions.map((p: any) => `${p.title}: ${p.body}`).join('. ');
    const patterns = intel.hiddenPatterns.map((p: any) => p.title).join(', ');

    const text = [
      `Atlas Brain briefing for station ${station.name}.`,
      `Client priority: ${intel.clientPriority.level}. ${intel.clientPriority.reason}`,
      `Predictions: ${predictions}`,
      patterns ? `Hidden patterns detected: ${patterns}.` : '',
      `This concludes the station briefing.`,
    ].filter(Boolean).join(' ');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
      || voices.find(v => v.lang === 'en-US')
      || voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utterance.voice = enVoice;
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  }, [speaking, intel, station]);

  return (
    <div>
      {/* Atlas Brain header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="ar-mono-label">Atlas brain</span>
          <button
            onClick={toggleVoice}
            title={speaking ? "Stop listening" : "Listen to station briefing"}
            className="relative flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-all ml-auto"
          >
            {speaking && (
              <>
                <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'var(--ar-accent)', opacity: 0.3 }} />
                <span className="absolute inset-[-2px] rounded-full animate-pulse" style={{ border: '1.5px solid var(--ar-accent)', opacity: 0.25 }} />
              </>
            )}
            <span
              className={cn(
                "relative z-10 flex items-center justify-center w-7 h-7 rounded-full transition-colors",
                speaking
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{
                background: speaking ? 'var(--ar-accent)' : 'var(--ar-bg-soft)',
              }}
            >
              {speaking ? <Square className="w-2.5 h-2.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
            </span>
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setBrainTab('intelligence')}
            className={cn("text-[13px] font-medium pb-1 cursor-pointer transition-colors", 
              brainTab === 'intelligence' ? "border-b-2" : ""
            )}
            style={{
              color: brainTab === 'intelligence' ? 'var(--ar-cta)' : 'var(--ar-tx-3)',
              borderColor: brainTab === 'intelligence' ? 'var(--ar-cta)' : 'transparent',
            }}
          >
            Intelligence
          </button>
          <button 
            onClick={() => setBrainTab('timeline')}
            className={cn("text-[13px] font-medium pb-1 cursor-pointer transition-colors",
              brainTab === 'timeline' ? "border-b-2" : ""
            )}
            style={{
              color: brainTab === 'timeline' ? 'var(--ar-cta)' : 'var(--ar-tx-3)',
              borderColor: brainTab === 'timeline' ? 'var(--ar-cta)' : 'transparent',
            }}
          >
            Timeline
          </button>
        </div>
      </div>

      {brainTab === 'intelligence' ? (
        <>
          {/* Client Priority */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--ar-bd-hair)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[12px] font-semibold" style={{ color: 'var(--ar-tx-1)' }}>Client priority</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase" style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '0.1em',
                background: 'var(--ar-accent-bg)',
                color: 'var(--ar-accent)',
              }}>
                {intel.clientPriority.level}
              </span>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ar-tx-2)', lineHeight: '1.6' }}>
              {intel.clientPriority.reason}
            </p>
          </div>

          {/* Standard Requirement */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--ar-bd-hair)' }}>
            <span className="ar-mono-label block mb-2">Standard requirement</span>
            <blockquote className="ar-blockquote">
              {intel.standardRequirement}
            </blockquote>
          </div>

          {/* Atlas Predictions */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--ar-bd-hair)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4" style={{ color: 'var(--ar-accent)' }} />
              <span className="ar-mono-label">Atlas predictions</span>
            </div>
            <div className="space-y-3">
              {intel.predictions.map((pred: any, i: number) => {
                const colors = impactColor(pred.impact);
                return (
                  <div key={i} className="p-4" style={{ background: 'var(--ar-bg-soft)', border: '1px solid var(--ar-bd-hair)', borderRadius: 'var(--ar-radius)' }}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ color: colors.text }}>
                        {predictionIcon(pred.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] font-semibold" style={{ color: 'var(--ar-tx-1)' }}>{pred.title}</h4>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed ml-7" style={{ color: 'var(--ar-tx-2)', lineHeight: '1.55' }}>{pred.body}</p>
                    <div className="flex items-center gap-2 mt-2 ml-7">
                      <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: 'var(--ar-bd-line)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pred.confidence}%`, background: colors.text }} />
                      </div>
                      <span className="text-[10px] tabular-nums" style={{ fontFamily: "'Space Mono', monospace", color: 'var(--ar-tx-2)' }}>
                        Atlas · {pred.confidence}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hidden Patterns */}
          {intel.hiddenPatterns.length > 0 && (
            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--ar-bd-hair)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4" style={{ color: 'var(--ar-accent)' }} />
                <span className="ar-mono-label">Hidden patterns</span>
              </div>
              <div className="space-y-3">
                {intel.hiddenPatterns.map((pattern: any, i: number) => (
                  <div key={i} className="p-3" style={{ background: 'var(--ar-accent-bg)', borderRadius: 'var(--ar-radius)', border: '1px solid var(--ar-bd-hair)' }}>
                    <h4 className="text-[12px] font-semibold mb-1" style={{ color: 'var(--ar-tx-1)' }}>{pattern.title}</h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ar-tx-2)' }}>{pattern.body}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <BarChart3 className="w-3 h-3" style={{ color: 'var(--ar-accent)' }} />
                      <span className="text-[10px] font-medium" style={{ color: 'var(--ar-accent)', fontFamily: "'Space Mono', monospace" }}>{pattern.dataPoints.toLocaleString()} data points</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Strategy */}
          <div className="px-4 py-3">
            <span className="ar-mono-label block mb-3">Audit strategy</span>
            <div className="space-y-3">
              {intel.auditStrategy.map((step: any, i: number) => (
                <div key={i}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'var(--ar-accent-bg)', color: 'var(--ar-accent)' }}>
                      <span className="text-[10px] font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-semibold" style={{ color: 'var(--ar-tx-1)' }}>{step.step}</h4>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--ar-tx-2)' }}>{step.detail}</p>
                      {step.evidenceRequired && (
                        <div className="mt-1.5 rounded px-2 py-1.5" style={{ background: 'var(--ar-bg-soft)' }}>
                          <span className="ar-mono-label">{step.evidenceRequired}</span>
                        </div>
                      )}
                      {step.done && (
                        <p className="text-[11px] font-medium mt-1.5" style={{ color: 'var(--ar-accent)' }}>
                          <span className="font-bold">Done:</span> {step.done}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Timeline sub-tab */
        <TimelineTab events={[
          { time: '08 apr · 09:14', label: 'Audit started', color: 'hsl(155, 24%, 55%)' },
          { time: '08 apr · 11:12', label: `Entered ${station.name.toLowerCase()}`, color: 'hsl(155, 24%, 55%)' },
          { time: '08 apr · 11:18', label: 'Atlas began real-time analysis', color: 'hsl(195, 89%, 34%)' },
          { time: '08 apr · 11:24', label: 'First prediction generated', color: 'hsl(195, 89%, 34%)' },
          { time: '08 apr · 11:35', label: 'Pattern detected — flagged for review', color: 'hsl(24, 72%, 63%)' },
          { time: '08 apr · 12:20', label: `Exit ${station.name.toLowerCase()}`, color: 'hsl(0, 0%, 75%)' },
        ]} station={station} stationNCRs={[]} />
      )}
    </div>
  );
}

// ─── Evidence Tab ────────────────────────────────────────────

function EvidenceTab({ station, stationNCRs }: { station: any; stationNCRs: NCR[] }) {
  const evidenceItems = [
    ...(station.evidenceCount.photos > 0 ? Array.from({ length: Math.min(station.evidenceCount.photos, 6) }, (_, i) => ({
      id: `PHO-${String(27 + i).padStart(3, '0')}`,
      type: 'photo' as const,
      label: `Station photo ${i + 1}`,
      time: '08 apr · 11:' + String(15 + i * 3).padStart(2, '0'),
    })) : []),
    ...(station.evidenceCount.measurements > 0 ? Array.from({ length: Math.min(station.evidenceCount.measurements, 3) }, (_, i) => ({
      id: `MSR-${String(12 + i).padStart(3, '0')}`,
      type: 'measurement' as const,
      label: `Measurement record ${i + 1}`,
      time: '08 apr · 11:' + String(30 + i * 5).padStart(2, '0'),
    })) : []),
    ...(station.evidenceCount.videos > 0 ? [{
      id: 'VID-002',
      type: 'video' as const,
      label: 'Process walkthrough video',
      time: '08 apr · 11:45',
    }] : []),
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
          Linked Evidence ({evidenceItems.length})
        </span>
      </div>
      
      {evidenceItems.length === 0 ? (
        <div className="text-center py-8">
          <Camera className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-[13px] text-muted-foreground">No evidence captured yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {evidenceItems.map((item, i) => (
            <div key={i} className="bg-card rounded-lg border border-border/60 overflow-hidden">
              {/* Thumbnail placeholder */}
              <div className="h-24 flex items-center justify-center" style={{ 
                background: item.type === 'photo' 
                  ? 'linear-gradient(135deg, hsl(207,33%,85%), hsl(143,18%,85%))' 
                  : item.type === 'video'
                  ? 'linear-gradient(135deg, hsl(220,20%,85%), hsl(220,20%,75%))'
                  : 'linear-gradient(135deg, hsl(0,0%,90%), hsl(0,0%,85%))'
              }}>
                {item.type === 'photo' && <Camera className="w-6 h-6 text-muted-foreground/40" />}
                {item.type === 'video' && <Monitor className="w-6 h-6 text-muted-foreground/40" />}
                {item.type === 'measurement' && <BarChart3 className="w-6 h-6 text-muted-foreground/40" />}
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono font-medium text-foreground">{item.id}</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.type}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.label}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NCR-linked evidence */}
      {stationNCRs.length > 0 && (
        <div className="mt-4">
          <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-2 block">NCR Evidence</span>
          {stationNCRs.map(ncr => (
            <div key={ncr.id} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
              <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: ncr.severity === 'major' ? 'hsl(0, 48%, 46%)' : 'hsl(24, 72%, 63%)' }} />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-foreground block truncate">{ncr.id}</span>
                <span className="text-[11px] text-muted-foreground">{ncr.evidenceIds.length} evidence items</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Equipment Tab ───────────────────────────────────────────

function EquipmentTab({ equipment, station }: { equipment: any[]; station: any }) {
  if (equipment.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <Monitor className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
        <p className="text-[13px] text-muted-foreground">No equipment data for this station</p>
        <p className="text-[11px] text-muted-foreground/60 mt-1">Equipment intelligence is available for production, assembly, and testing stations</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3 block">
        Machine Park ({equipment.length})
      </span>
      <div className="space-y-2.5">
        {equipment.map((eq: any, i: number) => {
          const statusColor = eq.status === 'critical' ? 'hsl(0, 48%, 46%)' : eq.status === 'warning' ? 'hsl(24, 72%, 63%)' : 'hsl(155, 24%, 55%)';
          return (
            <div key={i} className="bg-card rounded-lg border border-border/60 p-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[13px] font-semibold text-foreground">{eq.name}</h4>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: statusColor }} />
              </div>
              <p className="text-[12px] text-muted-foreground">{eq.model}</p>
              <div className="flex items-center gap-4 mt-2">
                {eq.oee !== undefined && (
                  <div>
                    <span className="text-[10px] text-muted-foreground block">OEE</span>
                    <span className="text-[14px] font-bold font-mono tabular-nums" style={{ color: eq.oee >= 70 ? 'hsl(155, 24%, 55%)' : eq.oee >= 50 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)' }}>
                      {eq.oee}%
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-[10px] text-muted-foreground block">Last PM</span>
                  <span className="text-[12px] font-medium text-foreground">{new Date(eq.lastMaintenance).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Status</span>
                  <span className="text-[12px] font-semibold capitalize" style={{ color: statusColor }}>{eq.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Timeline Tab ────────────────────────────────────────────

function TimelineTab({ events, station, stationNCRs }: { events: any[]; station: any; stationNCRs: NCR[] }) {
  return (
    <div className="px-4 py-3">
      <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3 block">Audit Timeline</span>
      <div className="space-y-0">
        {events.map((evt: any, i: number) => (
          <div key={i} className="flex gap-3 py-2.5">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full shrink-0 mt-0.5" style={{ background: evt.color }} />
              {i < events.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'hsl(0,0%,85%)' }} />}
            </div>
            <div>
              <span className="text-[12px] block text-muted-foreground">{evt.time}</span>
              <span className="text-[14px] text-foreground font-medium">{evt.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Station summary */}
      <div className="mt-4 bg-muted/30 rounded-lg p-3">
        <span className="text-[12px] font-bold text-foreground block mb-1">Station Summary</span>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="text-center">
            <div className="text-[16px] font-bold text-foreground">{station.evidenceCount.photos}</div>
            <div className="text-[10px] text-muted-foreground">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-[16px] font-bold text-foreground">{station.evidenceCount.measurements}</div>
            <div className="text-[10px] text-muted-foreground">Measurements</div>
          </div>
          <div className="text-center">
            <div className="text-[16px] font-bold text-foreground">{stationNCRs.length}</div>
            <div className="text-[10px] text-muted-foreground">NCRs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
