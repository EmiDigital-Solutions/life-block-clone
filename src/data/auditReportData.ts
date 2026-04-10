// Mock data for the ScanPro+ Audit Report demo
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
}

export interface Finding {
  type: FindingSeverity;
  title: string;
  description: string;
  ncrId?: string;
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
}

export const reportMeta = {
  verdict: 'conditional' as VerdictType,
  verdictLabel: 'CONDITIONAL GO',
  heroReason: '3 open non-conformities require your decision',
  supplier: 'MV Motors d.o.o.',
  po: 'PO 4500938221',
  auditor: 'I. Petrović',
  date: '2026-04-08',
  location: 'Zagreb, HR',
  standard: 'IATF 16949:2016',
  client: 'Linde Engineering',
};

export const kpis: KPITile[] = [
  { label: 'Overall Score', value: '78', unit: '/100', trend: 'up', trendValue: '+4', interpretation: 'Improved from 74 in last audit' },
  { label: 'Open NCRs', value: '3', trend: 'down', trendValue: '-2', interpretation: 'Down from 5 in Q3 2025' },
  { label: 'On-time Delivery', value: '94', unit: '%', trend: 'up', trendValue: '+6%', interpretation: 'Forecast based on current NCR load' },
  { label: 'Audit Coverage', value: '12', unit: '/13', trend: 'flat', trendValue: '—', interpretation: 'Station 11 N/A for this supplier' },
];

export const stations: Station[] = [
  {
    index: 1,
    name: 'Verdict & Summary',
    health: 'amber',
    heroPhoto: '',
    observation: '',
    interpretation: '',
    confidence: 0,
    actionType: 'none',
    findings: [],
    evidenceCount: { photos: 0, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 2,
    name: 'Supplier Snapshot',
    health: 'green',
    heroPhoto: '',
    observation: 'MV Motors d.o.o. is a Tier-2 automotive supplier specializing in precision-machined engine mounts and structural brackets. 280 employees, ISO 9001:2015 & IATF 16949:2016 certified.',
    interpretation: 'Stable supplier with 8-year relationship. Revenue grew 12% YoY. Key risk: single-source for CNC boring operations.',
    confidence: 95,
    actionType: 'none',
    findings: [],
    evidenceCount: { photos: 2, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 3,
    name: 'Reception & Management',
    health: 'green',
    heroPhoto: '',
    observation: 'Reception area clean and organized. Visitor registration protocol followed. Management team present and engaged during opening meeting.',
    interpretation: 'Strong management commitment to quality evidenced by CEO participation in the audit opening. Positive indicator for corrective action follow-through.',
    confidence: 94,
    actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Visitor protocol', description: 'Full PPE provided, NDA signed, escort assigned.' },
      { type: 'observation', title: 'Quality policy display', description: 'Quality policy displayed in reception but dated 2023 — recommend annual review.' },
    ],
    evidenceCount: { photos: 3, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 4,
    name: 'Incoming Goods / QC',
    health: 'green',
    heroPhoto: '',
    observation: 'Incoming inspection area well-lit with dedicated measurement bench. All raw material lots traced via barcode system.',
    interpretation: 'Material traceability fully digitized. Rejection rate for incoming steel at 1.2% — within industry benchmark.',
    confidence: 91,
    actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Material traceability', description: 'Barcode scanning system linked to ERP. Full lot trace demonstrated.' },
      { type: 'pass', title: 'Incoming inspection records', description: 'Last 30 days of records reviewed — no gaps.' },
    ],
    evidenceCount: { photos: 4, measurements: 3, videos: 0 },
    ncrs: [],
  },
  {
    index: 5,
    name: 'Production Lines',
    health: 'amber',
    heroPhoto: '',
    observation: 'Two of four CNC machines running without current calibration stickers. Coolant temperature on Machine #3 measured at 28°C vs. 22°C specification.',
    interpretation: 'Risk of dimensional drift on critical bores. Historical data on this supplier shows a 14% rework rate when calibration lapses >30 days.',
    confidence: 92,
    actionType: 'rework',
    findings: [
      { type: 'concern', title: 'Coolant temperature deviation', description: 'Machine #3 coolant at 28°C vs. 22°C spec. May affect surface finish on bore ID.' },
      { type: 'minor-ncr', title: 'Calibration lapse on CNC #2 & #4', description: 'Last calibration certificate expired 2026-03-15. 24 days overdue.', ncrId: 'NCR-0003' },
    ],
    evidenceCount: { photos: 6, measurements: 4, videos: 1 },
    ncrs: [
      {
        id: 'NCR-0003',
        severity: 'minor',
        station: 'Production Lines',
        stationIndex: 5,
        title: 'Calibration lapse on CNC #2 & #4',
        observation: 'Two of four CNC machines running without current calibration stickers. Last calibration expired 2026-03-15.',
        rootCause: 'Calibration scheduling system not integrated with maintenance calendar (AI-suggested)',
        recommendedAction: 'Request calibration certificates before first-article inspection.',
        owner: null,
        dueDate: null,
        evidenceIds: ['EVD-012', 'EVD-013', 'EVD-014'],
        status: 'open',
      },
    ],
  },
  {
    index: 6,
    name: 'Assembly & Sub-assy',
    health: 'green',
    heroPhoto: '',
    observation: 'Assembly line running at 92% OEE. Torque wrenches calibrated and logged. Poka-yoke fixtures verified on all critical stations.',
    interpretation: 'Well-controlled assembly process. No systemic risk identified.',
    confidence: 96,
    actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Torque verification', description: 'All 12 torque stations within ±2% of target. Calibration current.' },
      { type: 'pass', title: 'Poka-yoke fixtures', description: 'Error-proofing active on 8/8 critical assembly points.' },
    ],
    evidenceCount: { photos: 5, measurements: 6, videos: 0 },
    ncrs: [],
  },
  {
    index: 7,
    name: 'Final Test & Validation',
    health: 'red',
    heroPhoto: '',
    observation: 'Dimensional check on Bore ID Ø42H7 showed Cpk = 0.98 against BMW minimum requirement of Cpk ≥ 1.33. Test fixture alignment off by 0.02mm.',
    interpretation: 'Critical process capability gap. At current Cpk, expected reject rate is ~2.7% — unacceptable for BMW Tier-1 supply chain. Immediate fixture recalibration required.',
    confidence: 88,
    actionType: 'reject',
    findings: [
      { type: 'major-ncr', title: 'Cpk below requirement on Bore ID Ø42H7', description: 'Cpk = 0.98 vs. required ≥ 1.33. Critical dimension for engine mount assembly.', ncrId: 'NCR-0001' },
      { type: 'minor-ncr', title: 'Test fixture misalignment', description: 'CMM fixture offset by 0.02mm. Contributing factor to measurement variation.', ncrId: 'NCR-0002' },
    ],
    evidenceCount: { photos: 4, measurements: 8, videos: 1 },
    ncrs: [
      {
        id: 'NCR-0001',
        severity: 'major',
        station: 'Final Test & Validation',
        stationIndex: 7,
        title: 'Cpk below requirement on Bore ID Ø42H7',
        observation: 'Dimensional check showed Cpk = 0.98 against BMW minimum of Cpk ≥ 1.33.',
        rootCause: 'Tool wear on boring bar combined with coolant temperature drift (AI-suggested)',
        recommendedAction: 'Reject current lot. Require 30-piece capability study after fixture recalibration.',
        owner: null,
        dueDate: null,
        evidenceIds: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-004'],
        status: 'open',
      },
      {
        id: 'NCR-0002',
        severity: 'minor',
        station: 'Final Test & Validation',
        stationIndex: 7,
        title: 'Test fixture misalignment',
        observation: 'CMM fixture offset by 0.02mm from nominal.',
        rootCause: 'Fixture not re-zeroed after last calibration cycle (AI-suggested)',
        recommendedAction: 'Recalibrate CMM fixture and re-measure last 50 parts.',
        owner: null,
        dueDate: null,
        evidenceIds: ['EVD-005', 'EVD-006'],
        status: 'open',
      },
    ],
  },
  {
    index: 8,
    name: 'Packing & Outgoing',
    health: 'green',
    heroPhoto: '',
    observation: 'Packing specifications followed. VCI paper used for corrosion protection. Shipping labels match PO requirements.',
    interpretation: 'Outgoing quality gate well-controlled. No issues found in this station.',
    confidence: 97,
    actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Packing conformity', description: 'VCI protection, labeling, and documentation all conform to Linde spec LP-PKG-004.' },
    ],
    evidenceCount: { photos: 3, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 9,
    name: 'Documentation & QMS',
    health: 'amber',
    heroPhoto: '',
    observation: 'QMS documentation generally well-maintained. Control plan current. However, two work instructions reference superseded drawing revisions.',
    interpretation: 'Document control process exists but has gaps in revision management. Low risk but indicates systemic weakness.',
    confidence: 89,
    actionType: 'rework',
    findings: [
      { type: 'pass', title: 'Control plan', description: 'Control plan Rev. C current and matches production floor.' },
      { type: 'concern', title: 'Outdated work instructions', description: 'WI-042 and WI-057 reference Drawing Rev. B instead of current Rev. D.' },
    ],
    evidenceCount: { photos: 2, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 10,
    name: 'NCR Register',
    health: 'red',
    heroPhoto: '',
    observation: '',
    interpretation: '',
    confidence: 0,
    actionType: 'none',
    findings: [],
    evidenceCount: { photos: 0, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 11,
    name: 'Delay Forecast',
    health: 'grey',
    heroPhoto: '',
    observation: '',
    interpretation: '',
    confidence: 0,
    actionType: 'none',
    findings: [],
    evidenceCount: { photos: 0, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 12,
    name: 'Recommendation & Next',
    health: 'amber',
    heroPhoto: '',
    observation: '',
    interpretation: '',
    confidence: 0,
    actionType: 'none',
    findings: [],
    evidenceCount: { photos: 0, measurements: 0, videos: 0 },
    ncrs: [],
  },
  {
    index: 13,
    name: 'Evidence Vault',
    health: 'green',
    heroPhoto: '',
    observation: '',
    interpretation: '',
    confidence: 0,
    actionType: 'none',
    findings: [],
    evidenceCount: { photos: 0, measurements: 0, videos: 0 },
    ncrs: [],
  },
];

export const allNCRs: NCR[] = stations.flatMap(s => s.ncrs);

export const radarData = [
  { station: 'Reception', score: 95, fullMark: 100 },
  { station: 'Incoming', score: 90, fullMark: 100 },
  { station: 'Production', score: 62, fullMark: 100 },
  { station: 'Assembly', score: 94, fullMark: 100 },
  { station: 'Testing', score: 45, fullMark: 100 },
  { station: 'Packing', score: 96, fullMark: 100 },
  { station: 'Docs/QMS', score: 72, fullMark: 100 },
];

export const delayForecastData = [
  { milestone: 'FAI Approval', contracted: '2026-04-20', predicted: '2026-04-24', confidence: 75 },
  { milestone: 'Lot A Ship', contracted: '2026-05-05', predicted: '2026-05-08', confidence: 80 },
  { milestone: 'Lot B Ship', contracted: '2026-05-20', predicted: '2026-05-20', confidence: 94 },
  { milestone: 'Final Delivery', contracted: '2026-06-15', predicted: '2026-06-18', confidence: 70 },
];

export const ncrSeverityData = [
  { name: 'Major', count: 1, color: '#F04464' },
  { name: 'Minor', count: 2, color: '#FF7A59' },
  { name: 'Concern', count: 2, color: '#F5B544' },
  { name: 'Observation', count: 1, color: '#A1A5B7' },
];
