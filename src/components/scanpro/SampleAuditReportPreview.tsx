import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import InteractiveAuditReportMockup from "./InteractiveAuditReportMockup";
import ResponsiveDemoFrame from "../ResponsiveDemoFrame";

/**
 * Editorial teaser for the full Sample Audit Report.
 * Sells the report — does not reproduce it. Drives clicks to /scanpro-plus/sample-report.
 */
export default function SampleAuditReportPreview() {
  const insideGroups = [
    {
      group: "Audit scope",
      items: ["Report hero & metadata", "VDA 6.3 / ISO 9001 scoring", "Executive KPI band"],
    },
    {
      group: "Process & evidence",
      items: ["14 station cards", "Station heatmap", "Evidence vault (120+)"],
    },
    {
      group: "Findings & action",
      items: ["NCR register", "CAPA timeline"],
    },
    {
      group: "Atlas AI intelligence",
      items: ["Risk score", "Root-cause clusters", "Machine-park / TTF", "Voice briefing"],
    },
    {
      group: "Sign-off",
      items: ["Digital signature"],
    },
  ];

  const stats = [
    { value: "14", label: "Process stations" },
    { value: "47", label: "ISO clauses covered" },
    { value: "120+", label: "Photo evidence items" },
    { value: "40-80", label: "Pages (full report)" },
  ];

  return (
    <section data-nav-theme="light" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Eyebrow + Headline */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="section-eyebrow">What you receive</span>
          </div>
          <h2 className="section-headline text-foreground mb-6">
              A complete CEIP-ready report in 3 days
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every ScanPro+ mission ends with one structured, evidence-backed report —
            covering site readiness, findings and corrective actions CEIP buyers need to decide.
          </p>
        </div>

        {/* Image + What's inside */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          <div className="md:col-span-8">
            <ResponsiveDemoFrame designWidth={1100} designHeight={900}>
              <InteractiveAuditReportMockup />
            </ResponsiveDemoFrame>
          </div>
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                What's inside
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground tabular-nums">
                {insideGroups.reduce((a, g) => a + g.items.length, 0)} sections
              </div>
            </div>
            <div className="w-12 h-px bg-foreground mb-6" />

            <div className="divide-y divide-border border-y border-border">
              {insideGroups.map((group, gi) => (
                <div key={group.group} className="py-5 grid grid-cols-[32px_1fr_auto] gap-4 items-baseline">
                  <span className="font-mono text-sm text-primary tabular-nums">
                    0{gi + 1}
                  </span>
                  <div>
                    <div className="font-mono text-sm uppercase tracking-wider text-foreground mb-3">
                      {group.group}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(item => (
                        <span
                          key={item}
                          className="inline-block px-2.5 py-1.5 bg-muted text-sm text-foreground/80 leading-tight"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-12">
          {stats.map(item => (
            <div key={item.label} className="bg-background p-6">
              <div className="text-3xl md:text-4xl font-light text-foreground mb-1">
                {item.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Representative CEIP sample · Anonymized data
          </div>
          <Link
            to="/audit-report"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-white h-16 px-12 py-5 font-mono text-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Open Full Sample Report
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
