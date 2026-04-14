/**
 * Voice Briefing button
 * SpeechSynthesis to narrate the executive summary on demand
 */
import { useState, useCallback } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function VoiceBriefing() {
  const { reportMeta, allNCRs, kpis, iatfWeightedScore, stations } = useAuditReportContext();
  const [speaking, setSpeaking] = useState(false);

  const toggle = useCallback(() => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const majorNCRs = allNCRs.filter(n => n.severity === 'major');
    const worstStation = stations
      .filter(s => s.index >= 2 && s.index <= 9)
      .sort((a, b) => (a.health === 'red' ? 0 : 1) - (b.health === 'red' ? 0 : 1))[0];

    const text = [
      `Atlas AI Executive Briefing for ${reportMeta.supplier}.`,
      `Audit verdict: ${reportMeta.verdictLabel}.`,
      `VDA 6.3 weighted score: ${Math.round(iatfWeightedScore)} percent.`,
      `Total non-conformity reports: ${allNCRs.length}, of which ${majorNCRs.length} are major.`,
      worstStation ? `Highest risk area: ${worstStation.name}, rated ${worstStation.health}.` : '',
      reportMeta.totalCostExposure ? `Total cost exposure: ${reportMeta.totalCostExposure}.` : '',
      majorNCRs.length > 0 ? `Key action required: Close ${majorNCRs.length} major NCRs before approval.` : 'No major NCRs outstanding.',
      `This concludes the executive briefing.`,
    ].filter(Boolean).join(' ');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  }, [speaking, reportMeta, allNCRs, kpis, iatfWeightedScore, stations]);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer rounded ${
              speaking ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            {speaking ? 'Stop' : 'Brief'}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-[12px]">
          {speaking ? 'Stop voice briefing' : 'Atlas AI narrates the executive summary'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
