// Comprehensive ISO 9001:2015 / IATF 16949:2016 Supplier Audit Report Data
// Supplier: MV Motors d.o.o. — Tier-2 automotive (engine mounts & brackets)
// Standard: ISO 9001:2015 + IATF 16949:2016

import stationSupplier from '@/assets/audit/station-supplier.jpg';
import stationReception from '@/assets/audit/station-reception.jpg';
import stationIncoming from '@/assets/audit/station-incoming.jpg';
import stationProduction from '@/assets/audit/station-production.jpg';
import stationAssembly from '@/assets/audit/station-assembly.jpg';
import stationTesting from '@/assets/audit/station-testing.jpg';
import stationPacking from '@/assets/audit/station-packing.jpg';
import stationDocumentation from '@/assets/audit/station-documentation.jpg';

export type VerdictType = 'go' | 'conditional' | 'hold' | 'nogo';
export type FindingSeverity = 'pass' | 'observation' | 'concern' | 'minor-ncr' | 'major-ncr' | 'na';
export type NCRStatus = 'open' | 'in-progress' | 'closed' | 'escalated';
export type StationHealth = 'green' | 'amber' | 'red' | 'grey';
export type DepthLevel = 'executive' | 'standard' | 'full';

export interface KPITile {
  label: string;
  value: string;
  unit?: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  interpretation: string;
  sparkline?: number[];
}

export interface NCR {
  id: string;
  severity: 'minor' | 'major';
  station: string;
  stationIndex: number;
  title: string;
  observation: string;
  rootCause: string;
  recommendedAction: string;
  owner: string | null;
  dueDate: string | null;
  evidenceIds: string[];
  status: NCRStatus;
  isoClause?: string;
}

export interface Finding {
  type: FindingSeverity;
  title: string;
  description: string;
  ncrId?: string;
  isoClause?: string;
}

export interface AuditQuestion {
  id: string;
  clause: string;
  question: string;
  score: number | null;
  notes: string;
}

export interface SubCategory {
  id: string;
  label: string;
  health: StationHealth;
  score: number;
  findings: Finding[];
  aiInsight: string;
  aiConfidence: number;
}

export interface AtlasAIInsight {
  type: 'prediction' | 'correlation' | 'anomaly' | 'benchmark' | 'risk';
  title: string;
  body: string;
  confidence: number;
  impact: 'critical' | 'high' | 'medium' | 'low';
  connectedNCRs?: string[];
  dataPointsAnalyzed?: number;
}

export interface Station {
  index: number;
  name: string;
  health: StationHealth;
  heroPhoto: string;
  observation: string;
  interpretation: string;
  confidence: number;
  actionType: 'accept' | 'rework' | 'reject' | 'escalate' | 'none';
  findings: Finding[];
  evidenceCount: { photos: number; measurements: number; videos: number };
  ncrs: NCR[];
  auditQuestions?: AuditQuestion[];
  subCategories?: SubCategory[];
  atlasInsights?: AtlasAIInsight[];
}

// ─── Audit Scope ─────────────────────────────────────────────
export interface AuditScopeData {
  standard: string;
  auditType: string;
  scope: string;
  exclusions: string[];
  processElements: { code: string; name: string; applicable: boolean }[];
  productScope: { partNumber: string; description: string; volume: string; customer: string }[];
  siteDetails: { area: string; employees: number; shifts: number; machines: number };
  previousFindings: { total: number; closed: number; openCarryForward: number };
  samplingBasis: string;
  auditorQualifications: string[];
}

export const auditScope: AuditScopeData = {
  standard: 'ISO 9001:2015 / IATF 16949:2016 / VDA 6.3:2023',
  auditType: 'Surveillance Audit — Annual (2nd of 3-year cycle)',
  scope: 'Manufacture of precision-machined engine mounts (P/N EM-4200 series) and structural brackets (P/N SB-7100 series) for BMW N20 powertrain platform. Covers raw material receipt through final packaging and shipment. Design responsibility excluded — design owned by Linde Engineering GmbH.',
  exclusions: [
    'Clause 8.3 — Design and development (outsourced to Linde Engineering GmbH)',
    'Clause 8.5.5 — Post-delivery activities (handled by customer logistics)',
  ],
  processElements: [
    { code: 'P1', name: 'Potential Analysis', applicable: true },
    { code: 'P2', name: 'Project Management', applicable: true },
    { code: 'P3', name: 'Product & Process Development', applicable: false },
    { code: 'P4', name: 'Supplier Management', applicable: true },
    { code: 'P5', name: 'Production (Series)', applicable: true },
    { code: 'P6', name: 'Customer Care & Satisfaction', applicable: true },
    { code: 'P7', name: 'Continual Improvement', applicable: true },
  ],
  productScope: [
    { partNumber: 'EM-4201', description: 'Engine mount bracket — LH', volume: '24,000 pcs/yr', customer: 'BMW (via Linde)' },
    { partNumber: 'EM-4202', description: 'Engine mount bracket — RH', volume: '24,000 pcs/yr', customer: 'BMW (via Linde)' },
    { partNumber: 'SB-7101', description: 'Structural bracket — upper', volume: '18,000 pcs/yr', customer: 'BMW (via Linde)' },
    { partNumber: 'SB-7102', description: 'Structural bracket — lower', volume: '18,000 pcs/yr', customer: 'BMW (via Linde)' },
  ],
  siteDetails: { area: '4,200 m²', employees: 280, shifts: 2, machines: 23 },
  previousFindings: { total: 8, closed: 6, openCarryForward: 2 },
  samplingBasis: 'Risk-based sampling per ISO 19011:2018 Annex A. High-risk processes (Production, Final Test) sampled at 2× standard intensity. 47 audit questions across 14 ISO 9001 clauses.',
  auditorQualifications: [
    'I. Petrović — Lead Auditor, IRCA Cert. #A21849, 14 years automotive audit experience',
    'M. Kovačević — Technical Expert, CNC machining (VDA 6.3 qualified)',
  ],
};

// ─── Atlas AI Predictions ────────────────────────────────────────

export interface CostImpactPrediction {
  category: string;
  currentExposure: number;
  projectedCost: number;
  mitigatedCost: number;
  confidence: number;
  driver: string;
}

export interface QualityTrajectory {
  month: string;
  actual: number | null;
  predicted: number;
  lowerBound: number;
  upperBound: number;
}

export interface InnovationSignal {
  dimension: string;
  score: number;
  benchmark: number;
  insight: string;
  trend: 'improving' | 'declining' | 'stable';
}

export interface CrossCorrelation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  connectedFindings: string[];
  humanVisible: boolean;
}

export interface SupplierRiskSignal {
  signal: string;
  value: number;
  threshold: number;
  status: 'safe' | 'warning' | 'critical';
  explanation: string;
}

export interface ScenarioOutcome {
  scenario: string;
  deliveryDelay: number;
  costImpact: number;
  qualityRisk: string;
  recommendation: string;
}

// ─── Cost Impact Data ────────────────────────────────────────

export const costImpactData: CostImpactPrediction[] = [
  {
    category: 'Rework & Scrap — Bore ID',
    currentExposure: 127400,
    projectedCost: 89200,
    mitigatedCost: 12800,
    confidence: 88,
    driver: 'Cpk 0.98 → 2.7% reject rate on €4.7M annual volume. Boring bar replacement + coolant fix reduces to 0.3%.',
  },
  {
    category: 'Calibration Quarantine',
    currentExposure: 34200,
    projectedCost: 34200,
    mitigatedCost: 4100,
    confidence: 92,
    driver: '~1,400 parts require 100% inspection (€24.40/part). Post-recalibration: only FAI needed.',
  },
  {
    category: 'Line Stoppage — BMW',
    currentExposure: 480000,
    projectedCost: 96000,
    mitigatedCost: 0,
    confidence: 71,
    driver: 'BMW penalty: €8,000/hour line-stop. Atlas predicts 20% probability of quality escape causing 12h stop.',
  },
  {
    category: 'Warranty Claims (12mo)',
    currentExposure: 62000,
    projectedCost: 41300,
    mitigatedCost: 8200,
    confidence: 76,
    driver: 'Surface roughness exceedance on sealing face → leak risk. Historical claim rate: 0.4% at this Cpk.',
  },
  {
    category: 'Re-audit & Administration',
    currentExposure: 18500,
    projectedCost: 18500,
    mitigatedCost: 4200,
    confidence: 95,
    driver: 'Mandatory re-audit within 14 days for major NCRs. Full resolution avoids second cycle.',
  },
  {
    category: 'Supply Chain Disruption',
    currentExposure: 215000,
    projectedCost: 64500,
    mitigatedCost: 0,
    confidence: 63,
    driver: 'Single-source CNC boring dependency. If MV Motors fails, lead time to qualify alternate: 16 weeks.',
  },
];

// ─── Quality Trajectory (DPPM forecast) ────────────────────────

export const qualityTrajectoryData: QualityTrajectory[] = [
  { month: 'Jan 25', actual: 180, predicted: 180, lowerBound: 150, upperBound: 210 },
  { month: 'Apr 25', actual: 220, predicted: 210, lowerBound: 170, upperBound: 250 },
  { month: 'Jul 25', actual: 195, predicted: 200, lowerBound: 160, upperBound: 240 },
  { month: 'Oct 25', actual: 340, predicted: 280, lowerBound: 220, upperBound: 360 },
  { month: 'Jan 26', actual: 410, predicted: 390, lowerBound: 310, upperBound: 470 },
  { month: 'Apr 26', actual: null, predicted: 520, lowerBound: 380, upperBound: 660 },
  { month: 'Jul 26', actual: null, predicted: 680, lowerBound: 450, upperBound: 910 },
  { month: 'Oct 26', actual: null, predicted: 840, lowerBound: 520, upperBound: 1160 },
];

export const qualityTrajectoryMitigated: QualityTrajectory[] = [
  { month: 'Jan 25', actual: 180, predicted: 180, lowerBound: 150, upperBound: 210 },
  { month: 'Apr 25', actual: 220, predicted: 210, lowerBound: 170, upperBound: 250 },
  { month: 'Jul 25', actual: 195, predicted: 200, lowerBound: 160, upperBound: 240 },
  { month: 'Oct 25', actual: 340, predicted: 280, lowerBound: 220, upperBound: 360 },
  { month: 'Jan 26', actual: 410, predicted: 390, lowerBound: 310, upperBound: 470 },
  { month: 'Apr 26', actual: null, predicted: 280, lowerBound: 180, upperBound: 380 },
  { month: 'Jul 26', actual: null, predicted: 140, lowerBound: 80, upperBound: 200 },
  { month: 'Oct 26', actual: null, predicted: 65, lowerBound: 30, upperBound: 100 },
];

// ─── Innovation Signals ────────────────────────────────────

export const innovationSignals: InnovationSignal[] = [
  { dimension: 'Process Automation', score: 42, benchmark: 68, insight: 'No robotic loading on CNC. Manual chip clearing. Automation index 38% below Tier-2 median.', trend: 'stable' },
  { dimension: 'Digital Maturity', score: 55, benchmark: 72, insight: 'SAP ERP but no MES layer. No real-time OEE dashboards. Calibration tracked via spreadsheet.', trend: 'improving' },
  { dimension: 'Tooling Innovation', score: 38, benchmark: 61, insight: 'Boring bar at 1,847 cycles vs. 1,500 recommended — no adaptive tool-life management. No tool-wear sensors.', trend: 'declining' },
  { dimension: 'Workforce Development', score: 71, benchmark: 65, insight: 'Training matrix above benchmark. But no formal succession plan for Quality Manager (single point of failure).', trend: 'improving' },
  { dimension: 'Sustainability / ESG', score: 34, benchmark: 58, insight: 'No energy monitoring on CNC machines. Coolant disposal process undocumented. No scope 3 tracking.', trend: 'stable' },
  { dimension: 'Supply Chain Resilience', score: 29, benchmark: 55, insight: 'Single-source dependency for boring operations. 6 sub-suppliers overdue for re-evaluation. No dual-sourcing strategy.', trend: 'declining' },
];

// ─── Cross-Correlations (things humans wouldn't see) ──────────

export const crossCorrelations: CrossCorrelation[] = [
  {
    id: 'CC-001',
    title: 'Calibration Decay ↔ Quality Manager Absence Pattern',
    description: 'Calibration lapses on CNC #2 & #4 coincide with Quality Manager vacation windows in 3 of last 4 instances. The calibration system has no automated escalation — it depends on one person. This is a systemic single-point-of-failure, not a process gap.',
    confidence: 91,
    severity: 'critical',
    connectedFindings: ['NCR-0003', 'Q2-06', 'Q5-01'],
    humanVisible: false,
  },
  {
    id: 'CC-002',
    title: 'Coolant Temperature Drift → Bore Cpk Degradation → Surface Roughness Chain',
    description: 'Machine #3 coolant pump was flagged for service in Feb 2026 — still pending. The 6°C temperature rise causes ~14µm thermal expansion on 200mm workpieces, directly shifting the bore Cpk from 1.33 → 0.98. The same thermal instability increases tool chatter, degrading surface roughness from Ra 1.4 → 1.8µm. Three seemingly separate findings are one root cause.',
    confidence: 94,
    severity: 'critical',
    connectedFindings: ['NCR-0001', 'NCR-0005'],
    humanVisible: false,
  },
  {
    id: 'CC-003',
    title: 'CAPA Closure Rate Predicts Next-Audit Score with r² = 0.87',
    description: 'Across MV Motors\' last 5 audits, the % of CAPAs closed on time predicts the subsequent audit score with 87% accuracy. Current CAPA closure rate is 62.5% (5/8) — projecting a next-audit score of 66–69, which would trigger BMW\'s supplier downgrade threshold of 70.',
    confidence: 87,
    severity: 'high',
    connectedFindings: ['Q9-04', 'Q9-05'],
    humanVisible: false,
  },
  {
    id: 'CC-004',
    title: 'Supplier Re-evaluation Gaps Correlate with Incoming Rejection Spike',
    description: 'The 6 overdue supplier re-evaluations include Supplier #S-017, whose incoming rejection rate rose from 0.8% → 2.4% over 12 months. Without re-evaluation, the defective material enters production undetected. Atlas traces 23% of MV Motors\' own rework to parts containing S-017 material.',
    confidence: 82,
    severity: 'high',
    connectedFindings: ['NCR-0004', 'Q4-06'],
    humanVisible: false,
  },
  {
    id: 'CC-005',
    title: 'Document Revision Lag → Operator Error Probability',
    description: '4 work instructions reference obsolete drawings. Historical analysis shows that when WI-to-drawing revision mismatch exists for >30 days, operator error rate increases 3.2x. Two of the four affected WIs cover CNC operations on the Bore ID dimension — compounding the Cpk issue.',
    confidence: 79,
    severity: 'medium',
    connectedFindings: ['NCR-0006', 'NCR-0001'],
    humanVisible: false,
  },
  {
    id: 'CC-006',
    title: 'Assembly OEE Masking Upstream Instability',
    description: 'Assembly line shows 92% OEE — best-in-class. But this high performance is absorbing upstream variation rather than detecting it. Assembly torque SPC shows increasing Cp/Cpk scatter since Oct 2025, tracking the same period as production line degradation. Assembly is compensating, not immune.',
    confidence: 76,
    severity: 'medium',
    connectedFindings: ['Q6-01', 'NCR-0001'],
    humanVisible: false,
  },
];

// ─── Supplier Risk Signals (early warning) ──────────────────

export const supplierRiskSignals: SupplierRiskSignal[] = [
  { signal: 'DPPM Trend (6mo)', value: 410, threshold: 50, status: 'critical', explanation: 'Current DPPM 8.2x above BMW target. Accelerating trajectory since Oct 2025.' },
  { signal: 'Cpk Bore ID Ø42H7', value: 0.98, threshold: 1.33, status: 'critical', explanation: 'Process not capable. 27,000 DPPM expected at current capability.' },
  { signal: 'CAPA Closure Rate', value: 62.5, threshold: 90, status: 'warning', explanation: '5 of 8 CAPAs closed. 3 overdue avg 47 days. Below 90% minimum.' },
  { signal: 'Calibration Compliance', value: 50, threshold: 100, status: 'critical', explanation: '2 of 4 CNC machines out of calibration. 50% compliance.' },
  { signal: 'Supplier Eval Currency', value: 85.7, threshold: 100, status: 'warning', explanation: '36/42 suppliers current. 6 overdue — including high-risk S-017.' },
  { signal: 'Gauge R&R', value: 18, threshold: 20, status: 'warning', explanation: '18% total variation — 2 points from action limit. Trending up from 12%.' },
  { signal: 'Document Revision Match', value: 85.7, threshold: 100, status: 'warning', explanation: '24/28 WIs current. 4 reference obsolete drawings.' },
  { signal: 'OEE — Production', value: 78, threshold: 85, status: 'warning', explanation: 'Below benchmark due to chip evacuation blockage and unplanned stops.' },
  { signal: 'OEE — Assembly', value: 92, threshold: 85, status: 'safe', explanation: 'Best-in-class. But masking upstream instability (see CC-006).' },
  { signal: 'Management Review', value: 100, threshold: 100, status: 'safe', explanation: 'All required inputs addressed. CEO participation confirmed.' },
];

// ─── Scenario Outcomes ──────────────────────────────────────

export const scenarioOutcomes: ScenarioOutcome[] = [
  {
    scenario: 'Do Nothing',
    deliveryDelay: 28,
    costImpact: 937100,
    qualityRisk: 'Cpk continues to degrade. BMW line-stop probability rises to 45% within 60 days. Warranty claims expected.',
    recommendation: 'Not recommended.',
  },
  {
    scenario: 'Fix Critical Only',
    deliveryDelay: 14,
    costImpact: 142300,
    qualityRisk: 'Bore Cpk restored. Calibration current. Minor NCRs remain open — residual document control risk.',
    recommendation: 'Minimum viable. Release Lot A only.',
  },
  {
    scenario: 'Full Remediation',
    deliveryDelay: 21,
    costImpact: 68700,
    qualityRisk: 'All NCRs addressed. Cpk > 1.67 target achievable. Supplier re-evaluations completed. Long-term stability.',
    recommendation: 'Recommended. Highest ROI over 12 months.',
  },
  {
    scenario: 'Switch Supplier',
    deliveryDelay: 112,
    costImpact: 485000,
    qualityRisk: 'Zero production risk during qualification. But 16-week lead time + new PPAP + BMW re-approval required.',
    recommendation: 'Only if MV Motors fails re-audit.',
  },
];

// ─── IATF 16949 Process Audit Scores ─────────────────────────

export const iatfProcessScores = [
  { process: 'P1 — Potential Analysis', score: 82, weight: 0.05 },
  { process: 'P2 — Project Management', score: 75, weight: 0.10 },
  { process: 'P3 — Product & Process Dev', score: 68, weight: 0.15 },
  { process: 'P4 — Supplier Management', score: 64, weight: 0.10 },
  { process: 'P5 — Production (Series)', score: 52, weight: 0.25 },
  { process: 'P6 — Customer Care', score: 88, weight: 0.15 },
  { process: 'P7 — Continual Improvement', score: 58, weight: 0.20 },
];

export const iatfWeightedScore = iatfProcessScores.reduce((acc, p) => acc + p.score * p.weight, 0);

// ─── Report Metadata ───────────────────────────────────────────
export const reportMeta = {
  verdict: 'conditional' as VerdictType,
  verdictLabel: 'CONDITIONAL GO',
  heroReason: '5 open non-conformities across 3 stations require your decision before PO release',
  supplier: 'MV Motors d.o.o.',
  po: 'PO 4500938221',
  auditor: 'I. Petrović, Lead Auditor (IRCA Cert. #A21849)',
  date: '2026-04-08',
  location: 'Zagreb, HR — Žitnjak Industrial Zone, Hall B',
  standard: 'ISO 9001:2015 / IATF 16949:2016',
  client: 'Linde Engineering GmbH',
  scope: 'Manufacture of precision-machined engine mounts (P/N EM-4200 series) and structural brackets (P/N SB-7100 series) for BMW N20 powertrain platform',
  auditType: 'Surveillance Audit — Annual (2nd of 3-year cycle)',
  previousAuditDate: '2025-04-12',
  previousScore: 74,
  certBody: 'TÜV SÜD Management Service GmbH',
  certNumber: 'ISO 9001:2015 — TÜV-MS/QM/2024/0847',
  certExpiry: '2027-03-15',
  iatfScore: Math.round(iatfWeightedScore),
  totalCostExposure: 937100,
  mitigatedCostExposure: 29300,
};

// ─── KPIs ──────────────────────────────────────────────────────
export const kpis: KPITile[] = [
  { label: 'Overall Score', value: '72', unit: '/100', trend: 'down', trendValue: '−2', interpretation: 'Declined from 74 in last audit due to new NCRs in Testing & Production', sparkline: [81, 78, 76, 74, 72] },
  { label: 'IATF Score', value: String(Math.round(iatfWeightedScore)), unit: '%', trend: 'down', trendValue: '−6', interpretation: 'IATF 16949 weighted process score. Production (P5) dragging overall.', sparkline: [74, 72, 71, 69, Math.round(iatfWeightedScore)] },
  { label: 'Open NCRs', value: '5', trend: 'up', trendValue: '+3', interpretation: 'Up from 2 in Apr 2025 — 2 major, 3 minor', sparkline: [1, 0, 2, 2, 5] },
  { label: 'DPPM', value: '410', trend: 'up', trendValue: '+190', interpretation: 'Defective parts per million. BMW target: 50. Accelerating since Oct 2025.', sparkline: [120, 180, 195, 340, 410] },
  { label: 'Cost Exposure', value: '€937K', trend: 'up', trendValue: 'new', interpretation: 'Total projected cost if no action taken. Mitigatable to €29K.', sparkline: [45, 62, 89, 210, 937] },
  { label: 'Cpk Critical', value: '0.98', trend: 'down', trendValue: '−0.35', interpretation: 'Bore ID Ø42H7. BMW min: 1.33. Process not capable.', sparkline: [1.52, 1.45, 1.33, 1.18, 0.98] },
  { label: 'On-time Forecast', value: '87', unit: '%', trend: 'down', trendValue: '−7%', interpretation: 'Adjusted for calibration rework delay. P80 scenario.', sparkline: [96, 94, 93, 91, 87] },
  { label: 'Innovation Index', value: '45', unit: '/100', trend: 'flat', trendValue: '−2', interpretation: 'Below Tier-2 median of 63. Automation and tooling gaps.', sparkline: [48, 47, 47, 46, 45] },
];

// ─── Stations ──────────────────────────────────────────────────
export const stations: Station[] = [
  {
    index: 1, name: 'Verdict & Summary', health: 'amber', heroPhoto: '',
    observation: '', interpretation: '', confidence: 0, actionType: 'none',
    findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [],
  },
  {
    index: 2, name: 'Supplier Snapshot', health: 'green',
    heroPhoto: stationSupplier,
    observation: 'MV Motors d.o.o. is a Tier-2 automotive supplier specializing in precision-machined engine mounts and structural brackets for European OEMs. 280 employees across two shifts, 4,200 m² production area with 23 CNC machines. ISO 9001:2015 & IATF 16949:2016 certified since 2019. Primary customer: BMW via Linde Engineering. Annual revenue €18.4M (2025).',
    interpretation: 'Stable supplier with 8-year relationship. Revenue grew 12% YoY. Workforce turnover at 6.2% — below regional average of 11%. Key risk: single-source dependency for CNC boring operations on Mazak Integrex machines. Second risk: no formal succession plan for Quality Manager.',
    confidence: 95, actionType: 'none',
    findings: [
      { type: 'pass', title: 'Organizational context (4.1)', description: 'Organization has documented internal/external issues affecting the QMS. SWOT analysis updated Q1 2026.', isoClause: '4.1' },
      { type: 'pass', title: 'Interested parties (4.2)', description: 'Stakeholder register maintained and reviewed semi-annually. Customer requirements clearly mapped.', isoClause: '4.2' },
      { type: 'observation', title: 'Business continuity planning', description: 'No formal BCP for single-source CNC boring operations. Recommend documenting contingency plan.', isoClause: '6.1' },
    ],
    evidenceCount: { photos: 4, measurements: 0, videos: 1 }, ncrs: [],
    auditQuestions: [
      { id: 'Q2-01', clause: '4.1', question: 'Has the organization determined external and internal issues relevant to its purpose and strategic direction?', score: 9, notes: 'SWOT analysis updated Q1 2026.' },
      { id: 'Q2-02', clause: '4.2', question: 'Has the organization determined the interested parties relevant to the QMS?', score: 9, notes: 'Stakeholder register maintained.' },
      { id: 'Q2-03', clause: '4.3', question: 'Has the organization determined the boundaries and applicability of the QMS scope?', score: 8, notes: 'Scope documented. Design excluded — outsourced.' },
      { id: 'Q2-04', clause: '4.4', question: 'Has the organization established, implemented, and continually improved its QMS?', score: 8, notes: 'QMS sound. Some change management gaps.' },
      { id: 'Q2-05', clause: '5.1', question: 'Does top management demonstrate leadership and commitment to the QMS?', score: 9, notes: 'CEO participated in opening meeting.' },
      { id: 'Q2-06', clause: '6.1', question: 'Has the organization planned actions to address risks and opportunities?', score: 6, notes: 'Risk register exists but no BCP for CNC boring dependency.' },
    ],
  },
  {
    index: 3, name: 'Reception & Management', health: 'green',
    heroPhoto: stationReception,
    observation: 'Reception area clean and organized. Full PPE set provided on arrival. Visitor log digitized with NDA auto-signature via tablet. Management team — including CEO, Quality Manager, and Production Director — present for opening meeting. Quality policy displayed at entrance and all production stations. Management review minutes from Q1 2026 presented, covering all ISO 9001 Clause 9.3 required inputs.',
    interpretation: 'Strong management commitment evidenced by CEO participation and well-structured management review process. The quality culture is visibly embedded at leadership level. Positive indicator for corrective action follow-through on previous audit findings.',
    confidence: 94, actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Leadership commitment (5.1)', description: 'CEO actively engaged in audit opening. Quality objectives cascaded to department KPIs.', isoClause: '5.1' },
      { type: 'pass', title: 'Quality policy (5.2)', description: 'Policy displayed, understood by interviewed staff, and appropriate to organizational context.', isoClause: '5.2' },
      { type: 'pass', title: 'Management review (9.3)', description: 'Q1 2026 minutes complete: customer feedback, audit results, process performance, risks, improvement opportunities all addressed.', isoClause: '9.3' },
      { type: 'observation', title: 'Quality objectives measurability', description: 'Two of six quality objectives lack quantifiable targets. Recommend adding specific KPIs.', isoClause: '6.2' },
      { type: 'pass', title: 'Organizational roles & authorities (5.3)', description: 'Org chart current. Quality Manager has authority to stop production.', isoClause: '5.3' },
    ],
    evidenceCount: { photos: 5, measurements: 0, videos: 0 }, ncrs: [],
    subCategories: [
      { id: 'mgmt-personnel', label: 'Personnel & Leadership', health: 'green', score: 92,
        findings: [
          { type: 'pass', title: 'CEO engagement', description: 'CEO participated in opening & closing meetings. Quality is Board KPI.', isoClause: '5.1' },
          { type: 'pass', title: 'Quality Manager authority', description: 'QM has stop-production authority. Exercised 2× in 2025.', isoClause: '5.3' },
        ],
        aiInsight: 'Atlas detected that management review attendance correlates 0.87 with CAPA close-out speed across 127 Tier-2 suppliers. MV Motors\' CEO participation places them in top 12% — a strong leading indicator for NCR resolution velocity.',
        aiConfidence: 91,
      },
      { id: 'mgmt-system', label: 'QMS Structure', health: 'green', score: 88,
        findings: [
          { type: 'pass', title: 'Management review completeness', description: 'All 9.3.2 inputs addressed. Output actions tracked in SAP.', isoClause: '9.3' },
          { type: 'observation', title: 'KPI targets incomplete', description: '2/6 quality objectives lack measurable targets. Risk of drift.', isoClause: '6.2' },
        ],
        aiInsight: 'Cross-referencing 5 prior audits: MV Motors consistently scores 85–92 on management system structure. However, the 2 unmeasurable objectives (Customer Satisfaction & Innovation) are the exact areas where Tier-2 suppliers typically regress. Atlas recommends quantifying these within 30 days.',
        aiConfidence: 88,
      },
      { id: 'mgmt-communication', label: 'Communication & Culture', health: 'green', score: 90,
        findings: [
          { type: 'pass', title: 'Quality culture visibility', description: 'Policy displayed at entrance, cafeteria, and all 23 workstations.', isoClause: '7.4' },
        ],
        aiInsight: 'Sentiment analysis of employee interview transcripts (8 operators, 3 managers) shows 94% positive quality culture alignment — highest in YVOO\'s Croatian supplier database. This is a hidden competitive advantage.',
        aiConfidence: 86,
      },
    ],
    atlasInsights: [
      { type: 'benchmark', title: 'Leadership Score: Top 12% Tier-2', body: 'MV Motors\' management engagement score of 92/100 ranks in the top 12th percentile of 127 Tier-2 automotive suppliers audited by YVOO in 2024-2026. This is a strong predictor of successful NCR remediation — suppliers with leadership scores >85 close major NCRs 2.3× faster.', confidence: 91, impact: 'low', dataPointsAnalyzed: 847 },
      { type: 'risk', title: 'Quality Manager succession gap', body: 'The Quality Manager (age 58, 14 years tenure) has no documented successor. Atlas models show 23% probability of retirement within 24 months. Without succession planning, institutional knowledge loss could degrade QMS maturity by 15-20 points.', confidence: 78, impact: 'medium' },
    ],
    auditQuestions: [
      { id: 'Q3-01', clause: '5.1.1', question: 'Does top management demonstrate leadership and commitment with respect to the QMS?', score: 9, notes: 'CEO personally chairs quarterly management reviews.' },
      { id: 'Q3-02', clause: '5.1.2', question: 'Does top management ensure customer requirements are determined and met?', score: 9, notes: 'Customer requirements matrix maintained.' },
      { id: 'Q3-03', clause: '5.2', question: 'Has top management established a quality policy appropriate to the purpose of the organization?', score: 8, notes: 'Policy current but dated 2024.' },
      { id: 'Q3-04', clause: '5.3', question: 'Has top management assigned relevant QMS responsibilities and authorities?', score: 9, notes: 'Clear authority matrix.' },
      { id: 'Q3-05', clause: '6.2', question: 'Has the organization established quality objectives at relevant functions and levels?', score: 7, notes: 'Objectives exist but 2/6 lack measurable targets.' },
      { id: 'Q3-06', clause: '9.3', question: 'Does management review address all required inputs per ISO 9001:2015?', score: 9, notes: 'Minutes cover all 9.3.2 inputs.' },
    ],
  },
  {
    index: 4, name: 'Incoming Goods / QC', health: 'amber',
    heroPhoto: stationIncoming,
    observation: 'Incoming inspection area well-lit with dedicated measurement bench. Raw material lots traced via barcode system linked to SAP. However, 3 of 12 incoming inspection records from March 2026 were missing inspector signatures. Material certificates (3.1 per EN 10204) available for all steel batches. Supplier evaluation matrix covers 42 active suppliers but 6 have not been re-evaluated in over 18 months.',
    interpretation: 'Material traceability is fully digitized and reliable. The unsigned inspection records indicate a process discipline gap — not a systemic failure, but requiring corrective action. Supplier re-evaluation delays could mask quality deterioration in the supply chain.',
    confidence: 87, actionType: 'rework',
    findings: [
      { type: 'pass', title: 'Material traceability (8.5.2)', description: 'Barcode scanning system linked to SAP ERP. Full lot trace demonstrated.', isoClause: '8.5.2' },
      { type: 'minor-ncr', title: 'Unsigned inspection records', description: '3 of 12 incoming inspection records missing inspector signatures.', ncrId: 'NCR-0004', isoClause: '7.5' },
      { type: 'concern', title: 'Supplier re-evaluation overdue', description: '6 of 42 active suppliers not re-evaluated within the 12-month cycle.', isoClause: '8.4' },
      { type: 'pass', title: 'Material certificates', description: 'EN 10204 Type 3.1 certificates present for all steel batches.', isoClause: '8.4.2' },
      { type: 'observation', title: 'Incoming rejection tracking', description: 'Rejection rate at 1.8% — above 1.5% target. Main contributor: Supplier #S-017.', isoClause: '8.4.2' },
    ],
    evidenceCount: { photos: 6, measurements: 4, videos: 0 },
    ncrs: [
      {
        id: 'NCR-0004', severity: 'minor', station: 'Incoming Goods / QC', stationIndex: 4,
        title: 'Unsigned incoming inspection records',
        observation: '3 of 12 incoming inspection records missing inspector signatures.',
        rootCause: 'Inspector shift handover process does not include signature verification step',
        recommendedAction: 'Implement shift-end signature verification checklist.',
        owner: null, dueDate: null, evidenceIds: ['EVD-020', 'EVD-021', 'EVD-022'], status: 'open', isoClause: '7.5.3',
      },
    ],
    subCategories: [
      { id: 'inc-material', label: 'Material Verification', health: 'green', score: 90,
        findings: [
          { type: 'pass', title: 'Material certificates', description: 'EN 10204 Type 3.1 certificates present for all 14 steel batches received in March 2026.', isoClause: '8.4.2' },
          { type: 'pass', title: 'Chemical composition', description: 'Spectrometer spot-check on 3 heats — all within EN 10083-3 limits for 42CrMo4.', isoClause: '8.6' },
        ],
        aiInsight: 'Atlas cross-referenced material certificates against BMW SOR-0042 requirements. All 14 batches comply. However, Supplier S-017\'s last 3 heats show phosphorus trending toward upper limit (0.024% vs 0.025% max). Recommend tightening incoming spec to 0.020% to create early warning buffer.',
        aiConfidence: 89,
      },
      { id: 'inc-inspection', label: 'Inspection Process', health: 'amber', score: 68,
        findings: [
          { type: 'minor-ncr', title: 'Unsigned records', description: '3 of 12 incoming inspection records missing inspector signatures — pattern: all from night shift.', ncrId: 'NCR-0004', isoClause: '7.5' },
          { type: 'observation', title: 'Inspection time pressure', description: 'Average inspection time: 4.2 min vs. 8 min standard. Night shift rushing.', isoClause: '8.6' },
        ],
        aiInsight: 'Atlas identified a hidden pattern: all 3 unsigned records occurred during night shift (22:00-06:00), when only 1 inspector covers incoming + in-process. This is not a discipline issue — it\'s a staffing capacity constraint. Adding a second night inspector would eliminate 94% of documentation gaps based on similar supplier models.',
        aiConfidence: 92,
      },
      { id: 'inc-supplier', label: 'Supplier Management', health: 'amber', score: 72,
        findings: [
          { type: 'concern', title: 'Re-evaluation overdue', description: '6 of 42 active suppliers not re-evaluated within 12-month cycle. 3 are single-source.', isoClause: '8.4' },
        ],
        aiInsight: 'Of the 6 overdue suppliers, Atlas flagged 2 as high-risk: Supplier S-017 (steel bar stock, incoming rejection rate 3.2× average) and S-031 (cutting tools, 2 field recalls in 2025). These 2 suppliers feed directly into the Bore ID process where Cpk is failing. There is a 67% probability that supplier material variation is a root contributor to the Cpk decline.',
        aiConfidence: 84,
      },
    ],
    atlasInsights: [
      { type: 'correlation', title: 'Night shift staffing → documentation gaps', body: 'Atlas analyzed 847 incoming inspection records over 18 months. Night shift documentation errors are 4.7× higher than day shift. Root cause: single inspector covering 2 functional areas. This is a systemic capacity issue, not a training gap.', confidence: 92, impact: 'medium', connectedNCRs: ['NCR-0004'], dataPointsAnalyzed: 847 },
      { type: 'prediction', title: 'Supplier S-017 quality deterioration', body: 'Phosphorus levels in S-017 steel have increased 0.003% per quarter for 4 quarters. At current trajectory, material will exceed BMW spec by Q3 2026. Recommend preemptive qualification of alternative source.', confidence: 78, impact: 'high', dataPointsAnalyzed: 56 },
    ],
    auditQuestions: [
      { id: 'Q4-01', clause: '8.4.1', question: 'Does the organization ensure externally provided products conform to requirements?', score: 7, notes: 'Incoming inspection effective but signature discipline needs improvement.' },
      { id: 'Q4-02', clause: '8.4.2', question: 'Has the organization defined controls for externally provided products?', score: 8, notes: 'Inspection plan well-defined.' },
      { id: 'Q4-03', clause: '8.4.3', question: 'Has the organization communicated applicable requirements to external providers?', score: 7, notes: 'POs include quality requirements.' },
      { id: 'Q4-04', clause: '8.5.2', question: 'Can the organization identify outputs throughout production?', score: 9, notes: 'Full barcode traceability.' },
      { id: 'Q4-05', clause: '7.5.3', question: 'Are documented records controlled?', score: 5, notes: 'Missing signatures on 3/12 records.' },
      { id: 'Q4-06', clause: '8.4.1', question: 'Does the organization evaluate and re-evaluate external providers?', score: 6, notes: '6 suppliers overdue for re-evaluation.' },
    ],
  },
  {
    index: 5, name: 'Production Lines', health: 'red',
    heroPhoto: stationProduction,
    observation: 'Two of four CNC machines (Mazak #2 and #4) running without current calibration stickers — last calibration expired 2026-03-15 (24 days overdue). Coolant temperature on Machine #3 measured at 28°C vs. 22°C specification limit. Work instructions at stations are current revision. Operator competency records verified for all 8 operators on shift. Chip evacuation system on Machine #1 blocked.',
    interpretation: 'Critical calibration lapse on 50% of CNC machines creates uncontrolled measurement uncertainty. Historical data shows a 14% rework rate when calibration lapses >30 days. Coolant temperature drift compounds the dimensional risk.',
    confidence: 88, actionType: 'reject',
    findings: [
      { type: 'major-ncr', title: 'Calibration lapse — CNC #2 & #4', description: 'Two CNC machines operating 24 days past calibration due date. All parts produced since have unverified accuracy.', ncrId: 'NCR-0003', isoClause: '7.1.5' },
      { type: 'concern', title: 'Coolant temperature deviation', description: 'Machine #3 coolant at 28°C vs. 22°C spec. 6°C deviation causes ~14µm drift on 200mm workpiece.', isoClause: '8.5.1' },
      { type: 'minor-ncr', title: 'Chip evacuation system blocked', description: 'Machine #1 chip conveyor blocked. Quality and safety risk.', ncrId: 'NCR-0005', isoClause: '7.1.4' },
      { type: 'pass', title: 'Operator competency (7.2)', description: 'All 8 operators on shift have current competency records.', isoClause: '7.2' },
      { type: 'pass', title: 'Work instructions (8.5.1)', description: 'Work instructions current revision D at each station.', isoClause: '8.5.1' },
      { type: 'observation', title: 'Preventive maintenance schedule', description: 'Machine #3 coolant pump flagged Feb 2026 — still pending.', isoClause: '7.1.3' },
    ],
    evidenceCount: { photos: 12, measurements: 8, videos: 2 },
    ncrs: [
      {
        id: 'NCR-0003', severity: 'major', station: 'Production Lines', stationIndex: 5,
        title: 'Calibration lapse on CNC machines #2 & #4',
        observation: 'Two CNC machines operating without valid calibration. Certificates expired 2026-03-15 — 24 days overdue.',
        rootCause: 'Calibration scheduling system not integrated with ERP. Manual spreadsheet failed during technician leave.',
        recommendedAction: 'Quarantine ~1,400 parts. Recalibrate within 48 hours. 100% inspection of quarantined parts. Integrate scheduling into SAP PM.',
        owner: null, dueDate: null, evidenceIds: ['EVD-012', 'EVD-013', 'EVD-014', 'EVD-015'], status: 'open', isoClause: '7.1.5',
      },
      {
        id: 'NCR-0005', severity: 'minor', station: 'Production Lines', stationIndex: 5,
        title: 'Chip evacuation system blocked on CNC #1',
        observation: 'Chip conveyor blocked. Metal chips accumulating near spindle.',
        rootCause: 'Conveyor belt worn and slipping. Replacement part on order but not expedited.',
        recommendedAction: 'Expedite belt replacement. Interim manual clearing every 30 minutes.',
        owner: null, dueDate: null, evidenceIds: ['EVD-016', 'EVD-017'], status: 'open', isoClause: '7.1.4',
      },
    ],
    auditQuestions: [
      { id: 'Q5-01', clause: '7.1.5.1', question: 'Has the organization determined the monitoring and measuring resources needed?', score: 3, notes: 'CRITICAL: 2 of 4 CNC machines out of calibration.' },
      { id: 'Q5-02', clause: '7.1.5.2', question: 'Is measurement traceability maintained?', score: 4, notes: 'Expired certificates void traceability.' },
      { id: 'Q5-03', clause: '8.5.1', question: 'Has the organization implemented production under controlled conditions?', score: 5, notes: 'Coolant temperature out of spec.' },
      { id: 'Q5-04', clause: '7.2', question: 'Has the organization determined necessary competence?', score: 9, notes: 'All operators trained and certified.' },
      { id: 'Q5-05', clause: '7.1.4', question: 'Has the organization determined the environment necessary?', score: 5, notes: 'Chip evacuation blocked.' },
      { id: 'Q5-06', clause: '7.1.3', question: 'Has the organization determined necessary infrastructure?', score: 6, notes: 'PM schedule exists but not executed consistently.' },
      { id: 'Q5-07', clause: '8.5.1', question: 'Are work instructions available at point of use?', score: 9, notes: 'All WIs current revision D.' },
      { id: 'Q5-08', clause: '8.5.6', question: 'Has the organization implemented control of changes?', score: 7, notes: 'Recent tooling change not fully documented.' },
    ],
  },
  {
    index: 6, name: 'Assembly & Sub-assy', health: 'green',
    heroPhoto: stationAssembly,
    observation: 'Assembly line running at 92% OEE. All 12 torque wrenches calibrated. Poka-yoke fixtures verified on 8 critical stations. FIFO enforced via digital pick-to-light. SPC charts updated hourly. No rework observed during 2-hour window.',
    interpretation: 'Well-controlled assembly with mature error-proofing. SPC shows all monitored characteristics within control limits for 30 days. OEE of 92% is best-in-class. No systemic risk identified.',
    confidence: 96, actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Torque verification (8.5.1)', description: 'All 12 stations within ±2%. Cpk > 1.67 on all critical torques.', isoClause: '8.5.1' },
      { type: 'pass', title: 'Error-proofing / Poka-yoke', description: 'Active on 8/8 critical points. Tested during audit — correctly rejected misoriented parts.', isoClause: '8.5.1' },
      { type: 'pass', title: 'FIFO enforcement (8.5.4)', description: 'Lane markers, color coding, and digital pick-to-light.', isoClause: '8.5.4' },
      { type: 'pass', title: 'Traceability through assembly', description: 'Laser-marked serial number on each sub-assembly.', isoClause: '8.5.2' },
      { type: 'pass', title: 'Competency & awareness', description: 'Operators passed practical skills assessment.', isoClause: '7.2' },
    ],
    evidenceCount: { photos: 8, measurements: 12, videos: 1 }, ncrs: [],
    auditQuestions: [
      { id: 'Q6-01', clause: '8.5.1', question: 'Has the organization implemented production under controlled conditions?', score: 9, notes: 'SPC on 3 critical torques. All within limits.' },
      { id: 'Q6-02', clause: '8.5.1', question: 'Are error-proofing devices implemented and verified?', score: 10, notes: 'Poka-yoke tested live. All 8 fixtures functional.' },
      { id: 'Q6-03', clause: '8.5.2', question: 'Is traceability maintained through assembly?', score: 9, notes: 'Laser-marked serials. Full genealogy in SAP.' },
      { id: 'Q6-04', clause: '8.5.4', question: 'Is preservation of outputs ensured?', score: 9, notes: 'FIFO strictly enforced.' },
      { id: 'Q6-05', clause: '7.2', question: 'Are personnel competent?', score: 9, notes: 'All operators have current skills matrix.' },
    ],
  },
  {
    index: 7, name: 'Final Test & Validation', health: 'red',
    heroPhoto: stationTesting,
    observation: 'Dimensional check on Bore ID Ø42H7 showed Cpk = 0.98 against BMW minimum of Cpk ≥ 1.33. 30-piece sample on Zeiss CONTURA CMM. Test fixture offset 0.02mm from datum A. Surface roughness Ra 1.8µm vs. ≤1.6µm spec on 2 of 5 parts. Gauge R&R at 18% — approaching 20% threshold.',
    interpretation: 'Critical process capability gap. At Cpk 0.98, expected defect rate is ~2.7% or 27,000 DPPM — far exceeding BMW\'s 50 DPPM target. Fixture misalignment is a contributing factor. Surface roughness exceedance creates leak risk.',
    confidence: 85, actionType: 'reject',
    findings: [
      { type: 'major-ncr', title: 'Cpk below requirement — Bore ID Ø42H7', description: 'Cpk = 0.98 vs. BMW Cpk ≥ 1.33. Expected reject rate ~2.7% (27,000 DPPM).', ncrId: 'NCR-0001', isoClause: '8.6' },
      { type: 'minor-ncr', title: 'CMM fixture misalignment', description: 'Fixture offset 0.02mm from datum A. Gauge R&R at 18%.', ncrId: 'NCR-0002', isoClause: '7.1.5' },
      { type: 'concern', title: 'Surface roughness exceedance', description: 'Ra = 1.8µm on 2 of 5 parts vs. Ra ≤ 1.6µm on sealing face.', isoClause: '8.6' },
      { type: 'observation', title: 'Gauge R&R trending upward', description: '18% total variation — up from 12% in 2025.', isoClause: '7.1.5.1' },
      { type: 'pass', title: 'Test equipment calibration', description: 'Zeiss CMM and Mitutoyo SJ-410 calibration current.', isoClause: '7.1.5.2' },
      { type: 'pass', title: 'Test records (7.5)', description: 'All records complete, signed, and archived.', isoClause: '7.5.3' },
    ],
    evidenceCount: { photos: 8, measurements: 16, videos: 2 },
    ncrs: [
      {
        id: 'NCR-0001', severity: 'major', station: 'Final Test & Validation', stationIndex: 7,
        title: 'Cpk below requirement on Bore ID Ø42H7',
        observation: 'Cpk = 0.98 vs. BMW minimum Cpk ≥ 1.33. Process mean shifted +0.008mm from nominal.',
        rootCause: 'Tool wear on boring bar (1,847 cycles vs. 1,500 recommended) combined with coolant temperature drift.',
        recommendedAction: 'Reject current lot (~340 parts). Replace boring bar. Fix coolant. Run new 50-piece study. PPAP Level 3 re-approval.',
        owner: null, dueDate: null, evidenceIds: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-004', 'EVD-005'], status: 'open', isoClause: '8.6',
      },
      {
        id: 'NCR-0002', severity: 'minor', station: 'Final Test & Validation', stationIndex: 7,
        title: 'CMM fixture misalignment — datum A offset',
        observation: 'CMM fixture offset 0.02mm from datum A. Gauge R&R at 18%.',
        rootCause: 'Fixture locating pin worn. Not re-zeroed after last calibration.',
        recommendedAction: 'Replace worn pin. Re-zero fixture. Re-run Gauge R&R. Re-measure last 50 parts.',
        owner: null, dueDate: null, evidenceIds: ['EVD-006', 'EVD-007'], status: 'open', isoClause: '7.1.5',
      },
    ],
    auditQuestions: [
      { id: 'Q7-01', clause: '8.6', question: 'Has the organization implemented planned arrangements to verify product requirements?', score: 3, notes: 'CRITICAL: Cpk = 0.98. Process not capable.' },
      { id: 'Q7-02', clause: '7.1.5.1', question: 'Is measurement equipment suitable?', score: 5, notes: 'CMM fixture misaligned. Gauge R&R at 18%.' },
      { id: 'Q7-03', clause: '7.1.5.2', question: 'Is measurement traceability maintained?', score: 8, notes: 'CMM and roughness tester both have current calibration.' },
      { id: 'Q7-04', clause: '8.6', question: 'Is evidence of conformity retained?', score: 8, notes: 'All records complete and signed.' },
      { id: 'Q7-05', clause: '8.7', question: 'Has the organization dealt with nonconforming outputs?', score: 7, notes: 'Procedure exists. Red-tag quarantine active.' },
      { id: 'Q7-06', clause: '9.1.1', question: 'Has the organization determined what to monitor and measure?', score: 6, notes: 'SPC not applied to surface roughness.' },
    ],
  },
  {
    index: 8, name: 'Packing & Outgoing', health: 'green',
    heroPhoto: stationPacking,
    observation: 'Packing per Linde Engineering LP-PKG-004 Rev. C. VCI paper on all machined surfaces. Parts individually wrapped in foam-lined dividers. Final outgoing gate includes visual inspection, dimensional spot-check (3/100), and packaging integrity verification.',
    interpretation: 'Outgoing quality gate well-controlled. Zero customer complaints related to shipping damage in 12 months. This station is a strength.',
    confidence: 97, actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Packing conformity (8.5.4)', description: 'VCI, foam dividers, labeling all conform to Linde spec.', isoClause: '8.5.4' },
      { type: 'pass', title: 'Product identification', description: 'QR code links to electronic CoC.', isoClause: '8.5.2' },
      { type: 'pass', title: 'Final outgoing inspection', description: 'Visual + dimensional spot-check + packaging check.', isoClause: '8.6' },
      { type: 'pass', title: 'Customer property care', description: 'Customer fixtures in locked storage.', isoClause: '8.5.3' },
    ],
    evidenceCount: { photos: 5, measurements: 2, videos: 0 }, ncrs: [],
    auditQuestions: [
      { id: 'Q8-01', clause: '8.5.4', question: 'Does the organization preserve outputs during production?', score: 10, notes: 'Best-in-class packing. Zero shipping damage in 12 months.' },
      { id: 'Q8-02', clause: '8.5.2', question: 'Is product identification maintained through delivery?', score: 9, notes: 'QR-coded labels with full traceability.' },
      { id: 'Q8-03', clause: '8.6', question: 'Is final inspection performed before release?', score: 9, notes: 'Three-tier final gate.' },
      { id: 'Q8-04', clause: '8.5.3', question: 'Does the organization care for customer property?', score: 9, notes: 'Locked storage. Regular reconciliation.' },
    ],
  },
  {
    index: 9, name: 'Documentation & QMS', health: 'amber',
    heroPhoto: stationDocumentation,
    observation: 'QMS generally well-maintained. Quality Manual QM-001 Rev. G current. Control plan CP-EM4200-C current. However, 4 of 28 work instructions reference superseded drawings. Internal audit program: 2 planned audits from Q4 2025 postponed. CAPA register: 3 of 8 corrective actions overdue.',
    interpretation: 'Document control has significant gaps — 14% of WIs reference obsolete drawings. Delayed audits weaken self-correction. Overdue CAPAs suggest insufficient follow-through.',
    confidence: 82, actionType: 'rework',
    findings: [
      { type: 'pass', title: 'Quality Manual (7.5)', description: 'QM-001 Rev. G current and accessible.', isoClause: '7.5.2' },
      { type: 'pass', title: 'Control plan (8.5.1)', description: 'CP-EM4200-C current. Matches production.', isoClause: '8.5.1' },
      { type: 'minor-ncr', title: 'Outdated work instructions', description: '4 of 28 WIs reference superseded drawings.', ncrId: 'NCR-0006', isoClause: '7.5.3' },
      { type: 'concern', title: 'Postponed internal audits', description: '2 of 12 planned audits not conducted. Clauses 8.5/9.1 unaudited 15 months.', isoClause: '9.2' },
      { type: 'concern', title: 'Overdue corrective actions', description: '3 of 8 CAPAs overdue avg 47 days.', isoClause: '10.2' },
      { type: 'observation', title: 'Document control improvement', description: 'Recommend migrating to DMS with automatic revision alerts.', isoClause: '7.5.3' },
    ],
    evidenceCount: { photos: 4, measurements: 0, videos: 0 },
    ncrs: [
      {
        id: 'NCR-0006', severity: 'minor', station: 'Documentation & QMS', stationIndex: 9,
        title: 'Work instructions referencing obsolete drawing revisions',
        observation: '4 of 28 WIs reference superseded drawings.',
        rootCause: 'Manual cross-referencing process. No automated linking between drawing revisions and WIs.',
        recommendedAction: 'Update all 4 WIs. Full cross-reference audit. Implement automated revision linking.',
        owner: null, dueDate: null, evidenceIds: ['EVD-030', 'EVD-031', 'EVD-032'], status: 'open', isoClause: '7.5.3',
      },
    ],
    auditQuestions: [
      { id: 'Q9-01', clause: '7.5.2', question: 'Has the organization ensured appropriate identification and format of documented information?', score: 7, notes: 'Quality Manual well-maintained. Some WIs have revision gaps.' },
      { id: 'Q9-02', clause: '7.5.3', question: 'Is documented information controlled?', score: 4, notes: '4/28 WIs reference obsolete drawings.' },
      { id: 'Q9-03', clause: '9.2', question: 'Does the organization conduct internal audits at planned intervals?', score: 5, notes: '2 planned audits postponed.' },
      { id: 'Q9-04', clause: '10.2', question: 'Does the organization take corrective action?', score: 5, notes: '3/8 CAPAs overdue avg 47 days.' },
      { id: 'Q9-05', clause: '10.3', question: 'Does the organization continually improve?', score: 6, notes: 'Improvement intentions documented but execution lagging.' },
      { id: 'Q9-06', clause: '9.1.3', question: 'Has the organization analyzed data from monitoring and measurement?', score: 7, notes: 'Data analysis quarterly. Trends identified but not always acted upon.' },
    ],
  },
  // Meta-stations
  { index: 10, name: 'NCR Register', health: 'red', heroPhoto: '', observation: '', interpretation: '', confidence: 0, actionType: 'none', findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [] },
  { index: 11, name: 'Atlas Intelligence', health: 'grey', heroPhoto: '', observation: '', interpretation: '', confidence: 0, actionType: 'none', findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [] },
  { index: 12, name: 'Delay Forecast', health: 'grey', heroPhoto: '', observation: '', interpretation: '', confidence: 0, actionType: 'none', findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [] },
  { index: 13, name: 'Recommendation & Next', health: 'amber', heroPhoto: '', observation: '', interpretation: '', confidence: 0, actionType: 'none', findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [] },
  { index: 14, name: 'Evidence Vault', health: 'green', heroPhoto: '', observation: '', interpretation: '', confidence: 0, actionType: 'none', findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [] },
];

export const allNCRs: NCR[] = stations.flatMap(s => s.ncrs);

export const radarData = [
  { station: 'Context (4)', score: 88, fullMark: 100 },
  { station: 'Leadership (5)', score: 92, fullMark: 100 },
  { station: 'Planning (6)', score: 70, fullMark: 100 },
  { station: 'Support (7)', score: 55, fullMark: 100 },
  { station: 'Operations (8)', score: 48, fullMark: 100 },
  { station: 'Performance (9)', score: 60, fullMark: 100 },
  { station: 'Improvement (10)', score: 58, fullMark: 100 },
];

export const delayForecastData = [
  { milestone: 'Calibration Rework', contracted: '2026-04-12', predicted: '2026-04-18', confidence: 65 },
  { milestone: 'FAI Re-approval', contracted: '2026-04-20', predicted: '2026-04-28', confidence: 55 },
  { milestone: 'Lot A Ship', contracted: '2026-05-05', predicted: '2026-05-14', confidence: 60 },
  { milestone: 'Lot B Ship', contracted: '2026-05-20', predicted: '2026-05-24', confidence: 75 },
  { milestone: 'Final Delivery', contracted: '2026-06-15', predicted: '2026-06-22', confidence: 60 },
];

export const ncrSeverityData = [
  { name: 'Major', count: 2, color: '#F04464' },
  { name: 'Minor', count: 3, color: '#FF7A59' },
  { name: 'Concern', count: 4, color: '#F5B544' },
  { name: 'Observation', count: 5, color: '#A1A5B7' },
];
