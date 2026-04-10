import { createContext, useContext, type ReactNode } from "react";
import type { AuditReportData } from "@/hooks/useAuditReport";
import type { Station, NCR, KPITile } from "@/data/auditReportData";
import {
  reportMeta as fallbackMeta,
  stations as fallbackStations,
  kpis as fallbackKpis,
  allNCRs as fallbackNCRs,
  costImpactData as fallbackCostData,
  radarData as fallbackRadarData,
  delayForecastData as fallbackDelayData,
  ncrSeverityData as fallbackNCRSeverityData,
  auditScope as fallbackAuditScope,
  crossCorrelations as fallbackCrossCorrelations,
  supplierRiskSignals as fallbackSupplierRiskSignals,
  innovationSignals as fallbackInnovationSignals,
  scenarioOutcomes as fallbackScenarioOutcomes,
  qualityTrajectoryData as fallbackQualityTrajectory,
  qualityTrajectoryMitigated as fallbackQualityTrajectoryMitigated,
  iatfProcessScores as fallbackIatfProcessScores,
  iatfWeightedScore as fallbackIatfWeightedScore,
} from "@/data/auditReportData";

export interface AuditReportContextValue {
  reportMeta: typeof fallbackMeta;
  stations: Station[];
  kpis: KPITile[];
  allNCRs: NCR[];
  costImpactData: typeof fallbackCostData;
  radarData: typeof fallbackRadarData;
  delayForecastData: typeof fallbackDelayData;
  ncrSeverityData: typeof fallbackNCRSeverityData;
  auditScope: typeof fallbackAuditScope;
  crossCorrelations: typeof fallbackCrossCorrelations;
  supplierRiskSignals: typeof fallbackSupplierRiskSignals;
  innovationSignals: typeof fallbackInnovationSignals;
  scenarioOutcomes: typeof fallbackScenarioOutcomes;
  qualityTrajectoryData: typeof fallbackQualityTrajectory;
  qualityTrajectoryMitigated: typeof fallbackQualityTrajectoryMitigated;
  iatfProcessScores: typeof fallbackIatfProcessScores;
  iatfWeightedScore: number;
  isLive: boolean;
  isLoading: boolean;
}

const defaultValue: AuditReportContextValue = {
  reportMeta: fallbackMeta,
  stations: fallbackStations,
  kpis: fallbackKpis,
  allNCRs: fallbackNCRs,
  costImpactData: fallbackCostData,
  radarData: fallbackRadarData,
  delayForecastData: fallbackDelayData,
  ncrSeverityData: fallbackNCRSeverityData,
  auditScope: fallbackAuditScope,
  crossCorrelations: fallbackCrossCorrelations,
  supplierRiskSignals: fallbackSupplierRiskSignals,
  innovationSignals: fallbackInnovationSignals,
  scenarioOutcomes: fallbackScenarioOutcomes,
  qualityTrajectoryData: fallbackQualityTrajectory,
  qualityTrajectoryMitigated: fallbackQualityTrajectoryMitigated,
  iatfProcessScores: fallbackIatfProcessScores,
  iatfWeightedScore: fallbackIatfWeightedScore,
  isLive: false,
  isLoading: false,
};

const AuditReportContext = createContext<AuditReportContextValue>(defaultValue);

export function useAuditReportContext() {
  return useContext(AuditReportContext);
}

interface AuditReportProviderProps {
  data: AuditReportData | undefined;
  isLoading: boolean;
  children: ReactNode;
}

export function AuditReportProvider({ data, isLoading, children }: AuditReportProviderProps) {
  // Merge hook data with fallbacks for fields not yet in DB
  const value: AuditReportContextValue = {
    reportMeta: data?.reportMeta ?? fallbackMeta,
    stations: data?.stations ?? fallbackStations,
    kpis: data?.kpis ?? fallbackKpis,
    allNCRs: data?.allNCRs ?? fallbackNCRs,
    costImpactData: data?.costImpactData ?? fallbackCostData,
    radarData: data?.radarData ?? fallbackRadarData,
    delayForecastData: data?.delayForecastData ?? fallbackDelayData,
    ncrSeverityData: data?.ncrSeverityData ?? fallbackNCRSeverityData,
    // These are not yet in the DB — always fallback for now
    auditScope: fallbackAuditScope,
    crossCorrelations: fallbackCrossCorrelations,
    supplierRiskSignals: fallbackSupplierRiskSignals,
    innovationSignals: fallbackInnovationSignals,
    scenarioOutcomes: fallbackScenarioOutcomes,
    qualityTrajectoryData: fallbackQualityTrajectory,
    qualityTrajectoryMitigated: fallbackQualityTrajectoryMitigated,
    iatfProcessScores: fallbackIatfProcessScores,
    iatfWeightedScore: fallbackIatfWeightedScore,
    isLive: data?.isLive ?? false,
    isLoading,
  };

  return (
    <AuditReportContext.Provider value={value}>
      {children}
    </AuditReportContext.Provider>
  );
}
