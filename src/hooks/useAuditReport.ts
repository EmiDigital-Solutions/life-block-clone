import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  VerdictType, Station, NCR, KPITile, StationHealth, NCRStatus,
  Finding, FindingSeverity, SubCategory, AtlasAIInsight, AuditQuestion,
  SubCategoryEvidence, AIPattern, BMWImpact,
} from "@/data/auditReportData";
import {
  reportMeta as fallbackMeta,
  stations as fallbackStations,
  kpis as fallbackKpis,
  allNCRs as fallbackNCRs,
  costImpactData as fallbackCostData,
  radarData as fallbackRadarData,
  delayForecastData as fallbackDelayData,
  ncrSeverityData as fallbackNCRSeverityData,
} from "@/data/auditReportData";

// ── Type helpers for JSONB → typed data ──────────────────────

function mapFindings(raw: any[]): Finding[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(f => ({
    type: (f.type || 'observation') as FindingSeverity,
    title: f.title || '',
    description: f.description || '',
    ncrId: f.ncrId || f.ncr_id,
    isoClause: f.isoClause || f.iso_clause,
  }));
}

function mapEvidence(raw: any[]): SubCategoryEvidence[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(e => ({
    id: e.id || '',
    type: e.type || 'document',
    label: e.label || '',
    thumbnail: e.thumbnail,
    timestamp: e.timestamp,
  }));
}

function mapPatterns(raw: any[]): AIPattern[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(p => ({
    id: p.id || '',
    type: p.type || 'pattern',
    title: p.title || '',
    body: p.body || '',
    confidence: p.confidence || 0,
    impact: p.impact || 'low',
    timeframe: p.timeframe,
  }));
}

function mapBMWImpact(raw: any): BMWImpact | undefined {
  if (!raw) return undefined;
  const mapDim = (d: any) => ({ rating: d?.rating || 'none', detail: d?.detail || '' });
  return { quality: mapDim(raw.quality), time: mapDim(raw.time), cost: mapDim(raw.cost) };
}

function mapSubCategories(raw: any[]): SubCategory[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(sc => ({
    id: sc.id || '',
    label: sc.label || '',
    health: (sc.health || 'grey') as StationHealth,
    score: sc.score || 0,
    findings: mapFindings(sc.findings),
    aiInsight: sc.aiInsight || sc.ai_insight || '',
    aiConfidence: sc.aiConfidence || sc.ai_confidence || 0,
    evidence: mapEvidence(sc.evidence || []),
    aiPatterns: mapPatterns(sc.aiPatterns || sc.ai_patterns || []),
    bmwImpact: mapBMWImpact(sc.bmwImpact || sc.bmw_impact),
  }));
}

function mapAtlasInsights(raw: any[]): AtlasAIInsight[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(i => ({
    type: i.type || 'risk',
    title: i.title || '',
    body: i.body || '',
    confidence: i.confidence || 0,
    impact: i.impact || 'low',
    connectedNCRs: i.connectedNCRs || i.connected_ncrs,
    dataPointsAnalyzed: i.dataPointsAnalyzed || i.data_points_analyzed,
  }));
}

function mapAuditQuestions(raw: any[]): AuditQuestion[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(q => ({
    id: q.id || '',
    clause: q.clause || '',
    question: q.question || '',
    score: q.score ?? null,
    notes: q.notes || '',
  }));
}

// ── Main hook ────────────────────────────────────────────────

export interface AuditReportData {
  reportMeta: typeof fallbackMeta;
  stations: Station[];
  kpis: KPITile[];
  allNCRs: NCR[];
  costImpactData: typeof fallbackCostData;
  radarData: typeof fallbackRadarData;
  delayForecastData: typeof fallbackDelayData;
  ncrSeverityData: typeof fallbackNCRSeverityData;
  isLive: boolean;
}

async function fetchAuditReport(reportId: string): Promise<AuditReportData | null> {
  // Fetch report + stations + NCRs + radar scores in parallel
  const [reportRes, stationsRes, ncrsRes, radarRes] = await Promise.all([
    supabase.from("audit_reports").select("*").eq("id", reportId).single(),
    supabase.from("report_stations").select("*").eq("report_id", reportId).order("station_index"),
    supabase.from("report_ncrs").select("*").eq("report_id", reportId).order("created_at"),
    supabase.from("report_radar_scores").select("*").eq("report_id", reportId).order("sort_order"),
  ]);

  if (reportRes.error || !reportRes.data) return null;
  const report = reportRes.data;

  // Map NCRs
  const ncrs: NCR[] = (ncrsRes.data || []).map(n => ({
    id: n.ncr_code,
    severity: n.severity as 'minor' | 'major',
    station: '', // will be resolved below
    stationIndex: 0,
    title: n.title,
    observation: n.description || '',
    rootCause: (n.meta as any)?.rootCause || '',
    recommendedAction: (n.meta as any)?.recommendedAction || '',
    owner: (n.meta as any)?.owner || null,
    dueDate: n.deadline,
    evidenceIds: Array.isArray(n.evidence_refs) ? (n.evidence_refs as string[]) : [],
    status: n.status as NCRStatus,
    isoClause: n.iso_clause || undefined,
  }));

  // Map stations
  const dbStations = stationsRes.data || [];
  const stations: Station[] = dbStations.map(s => {
    const stationNCRs = ncrs.filter(n => {
      if ((n as any)._stationId === s.id) return true;
      // Try matching by station_id on the NCR row
      const matchingNCR = (ncrsRes.data || []).find(nr => nr.station_id === s.id && nr.ncr_code === n.id);
      return !!matchingNCR;
    });

    // Also update station info on NCRs
    stationNCRs.forEach(n => {
      n.station = s.name;
      n.stationIndex = s.station_index;
    });

    return {
      index: s.station_index,
      name: s.name,
      health: s.health as StationHealth,
      heroPhoto: s.hero_photo_url || '',
      observation: s.observation || '',
      interpretation: s.interpretation || '',
      confidence: s.confidence || 0,
      actionType: ((s.meta as any)?.actionType || 'none') as Station['actionType'],
      findings: mapFindings(s.findings as any[]),
      evidenceCount: {
        photos: s.evidence_photos || 0,
        measurements: s.evidence_measurements || 0,
        videos: s.evidence_videos || 0,
      },
      ncrs: stationNCRs,
      auditQuestions: mapAuditQuestions(s.audit_questions as any[]),
      subCategories: mapSubCategories(s.sub_categories as any[]),
      atlasInsights: mapAtlasInsights(s.atlas_insights as any[]),
    };
  });

  // Build report meta
  const execSummary = report.executive_summary as any[];
  const meta = report.meta as any || {};
  const reportMeta = {
    verdict: report.verdict as VerdictType,
    verdictLabel: meta.verdictLabel || report.verdict.toUpperCase(),
    heroReason: meta.heroReason || '',
    supplier: report.supplier_name,
    po: meta.po || '',
    auditor: report.auditor_name || '',
    date: report.audit_date || '',
    location: report.supplier_location || '',
    standard: report.standard,
    client: report.client_name,
    scope: meta.scope || '',
    auditType: meta.auditType || '',
    previousAuditDate: meta.previousAuditDate || '',
    previousScore: meta.previousScore || 0,
    certBody: meta.certBody || '',
    certNumber: meta.certNumber || '',
    certExpiry: meta.certExpiry || '',
    iatfScore: report.iatf_score || 0,
    totalCostExposure: Number(report.cost_exposure_eur) || 0,
    mitigatedCostExposure: Number(report.mitigation_savings_eur) || 0,
  };

  // Build KPIs from meta or derive from data
  const kpis: KPITile[] = Array.isArray(meta.kpis) ? meta.kpis : fallbackKpis;

  // Radar data
  const radarData = (radarRes.data || []).map(r => ({
    station: r.dimension_label,
    score: Number(r.actual_score),
    fullMark: Number(r.max_score),
  }));

  return {
    reportMeta: reportMeta as typeof fallbackMeta,
    stations: stations.length > 0 ? stations : fallbackStations,
    kpis,
    allNCRs: ncrs.length > 0 ? ncrs : fallbackNCRs,
    costImpactData: Array.isArray(meta.costImpactData) ? meta.costImpactData : fallbackCostData,
    radarData: radarData.length > 0 ? radarData : fallbackRadarData,
    delayForecastData: Array.isArray(meta.delayForecastData) ? meta.delayForecastData : fallbackDelayData,
    ncrSeverityData: Array.isArray(meta.ncrSeverityData) ? meta.ncrSeverityData : fallbackNCRSeverityData,
    isLive: true,
  };
}

export function useAuditReport(reportId?: string | null) {
  return useQuery({
    queryKey: ["audit-report", reportId],
    queryFn: async (): Promise<AuditReportData> => {
      if (!reportId) {
        return {
          reportMeta: fallbackMeta,
          stations: fallbackStations,
          kpis: fallbackKpis,
          allNCRs: fallbackNCRs,
          costImpactData: fallbackCostData,
          radarData: fallbackRadarData,
          delayForecastData: fallbackDelayData,
          ncrSeverityData: fallbackNCRSeverityData,
          isLive: false,
        };
      }
      const result = await fetchAuditReport(reportId);
      if (!result) {
        // Fallback to hardcoded data
        return {
          reportMeta: fallbackMeta,
          stations: fallbackStations,
          kpis: fallbackKpis,
          allNCRs: fallbackNCRs,
          costImpactData: fallbackCostData,
          radarData: fallbackRadarData,
          delayForecastData: fallbackDelayData,
          ncrSeverityData: fallbackNCRSeverityData,
          isLive: false,
        };
      }
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
