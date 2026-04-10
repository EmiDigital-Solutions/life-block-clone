import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { reportMeta, kpis, stations, allNCRs } from "@/data/auditReportData";
import type { DepthLevel } from "@/data/auditReportData";
import ReportSidebar from "@/components/audit-report/ReportSidebar";
import ReportHero from "@/components/audit-report/ReportHero";
import KPIBand from "@/components/audit-report/KPIBand";
import StationCard from "@/components/audit-report/StationCard";
import NCRRegister from "@/components/audit-report/NCRRegister";
import DelayForecast from "@/components/audit-report/DelayForecast";
import AtlasIntelligence from "@/components/audit-report/AtlasIntelligence";
import RecommendationSection from "@/components/audit-report/RecommendationSection";
import EvidenceVault from "@/components/audit-report/EvidenceVault";
import DecisionTray from "@/components/audit-report/DecisionTray";
import { Menu, X, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const depthLabels: Record<DepthLevel, string> = {
  executive: 'Executive',
  standard: 'Standard',
  full: 'Full',
};

export default function AuditReport() {
  const [activeStation, setActiveStation] = useState(1);
  const [depth, setDepth] = useState<DepthLevel>('standard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(true);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [askAtlasInput, setAskAtlasInput] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrolledPastHero(container.scrollTop > window.innerHeight * 0.6);
      const stationEls = container.querySelectorAll('[id^="station-"]');
      let current = 1;
      stationEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = parseInt(el.id.replace('station-', ''));
        }
      });
      setActiveStation(current);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStation = useCallback((index: number) => {
    const el = document.getElementById(`station-${index}`);
    el?.scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (isMobile) setTrayOpen(false);
  }, [isMobile]);

  return (
    <div className="h-[100dvh] flex bg-white text-[#111827]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 w-[280px] bg-white border-r border-[#E5E7EB]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
              <span className="text-[13px] font-medium text-[#111827]">Factory Map</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-4 h-4 text-[#9CA3AF]" /></button>
            </div>
            <ReportSidebar activeStation={activeStation} onStationClick={scrollToStation} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <ReportSidebar
          activeStation={activeStation}
          onStationClick={scrollToStation}
          className="w-[240px] xl:w-[260px] shrink-0 border-r border-[#E5E7EB] bg-[#FAFBFC]"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Sticky verdict bar */}
        <div className={cn(
          "sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-12 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm transition-all duration-300",
          scrolledPastHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}>
          <div className="flex items-center gap-3">
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-[#F3F4F6]">
                <Menu className="w-4 h-4 text-[#6B7280]" />
              </button>
            )}
            <span className="text-[13px] text-[#6B7280]">{reportMeta.supplier}</span>
            <span className="text-[13px] font-semibold text-[#F59E0B]">{reportMeta.verdictLabel}</span>
            <span className="text-[12px] text-[#9CA3AF]">· {allNCRs.length} open NCRs</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-[#E5E7EB] overflow-hidden">
              {(['executive', 'standard', 'full'] as DepthLevel[]).map(d => (
                <button
                  key={d}
                  onClick={() => setDepth(d)}
                  className={cn(
                    "px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
                    depth === d ? "bg-[#0052FF] text-white" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]"
                  )}
                >
                  {depthLabels[d]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setTrayOpen(!trayOpen)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white bg-[#0052FF] hover:bg-[#0043D6] transition-colors"
            >
              Decide →
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 flex overflow-hidden">
          <div ref={contentRef} className="flex-1 overflow-y-auto">
            <div className="max-w-[960px] mx-auto px-4 md:px-8">
              <ReportHero
                verdict={reportMeta.verdict}
                verdictLabel={reportMeta.verdictLabel}
                heroReason={reportMeta.heroReason}
                supplier={reportMeta.supplier}
                po={reportMeta.po}
                auditor={reportMeta.auditor}
                date={reportMeta.date}
                location={reportMeta.location}
                onDecide={() => setTrayOpen(true)}
                onWalk={() => scrollToStation(2)}
              />

              <section className="py-16 md:py-24">
                <KPIBand kpis={kpis} />
              </section>

              <div className="space-y-16 md:space-y-24 pb-16">
                {stations.filter(s => s.index >= 2 && s.index <= 9).map((station) => (
                  <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                ))}
                <NCRRegister ncrs={allNCRs} />
                <AtlasIntelligence />
                <DelayForecast />
                <RecommendationSection />
                <EvidenceVault />
              </div>

              {/* Ask Atlas */}
              <div className="sticky bottom-4 z-30 mb-8">
                <div className="max-w-[640px] mx-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#E5E7EB] bg-white/95 backdrop-blur-sm shadow-lg">
                  <Sparkles className="w-4 h-4 text-[#0052FF] shrink-0" />
                  <input
                    value={askAtlasInput}
                    onChange={e => setAskAtlasInput(e.target.value)}
                    placeholder="Ask Atlas about this audit..."
                    className="flex-1 bg-transparent text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none"
                  />
                  <button className="px-3 py-1 rounded-lg text-[12px] font-medium text-[#0052FF] hover:bg-[#EBF0FF] transition-colors">
                    Ask
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!isMobile && (
            <DecisionTray ncrs={allNCRs} isOpen={trayOpen} onClose={() => setTrayOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
