import { Check } from "lucide-react";

const AtlasAISection = () => {
  return (
    <section className="w-full bg-background">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-[120px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-[56px] font-bold text-foreground tracking-[-0.02em] leading-[1.1]">
            Atlas AI
          </h2>
          <p className="text-lg md:text-2xl font-normal text-muted-foreground mt-4">
            Expert guidance. Every auditor.
          </p>
        </div>

        {/* Split-Screen Mockup */}
        <div className="rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden bg-muted">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Audit Interface */}
            <div className="w-full md:w-[65%] p-6 md:p-10">
              <div className="bg-background rounded-xl p-6 md:p-8">
                {/* Question */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-2 block">
                    Question 4.2
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Are measuring instruments calibrated?
                  </h3>
                </div>

                {/* Radio Buttons */}
                <div className="flex gap-4 mb-8">
                  {["Yes", "No", "Partial"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-4 h-4 rounded-full border-2 border-border flex items-center justify-center">
                        {option === "Partial" && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </span>
                      <span className="text-sm text-foreground">{option}</span>
                    </label>
                  ))}
                </div>

                {/* Photo Placeholder */}
                <div className="bg-muted rounded-lg aspect-[16/10] flex items-center justify-center border border-border">
                  <div className="text-center text-muted-foreground">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-border/50 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                    <p className="text-sm">Measuring equipment photo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Atlas Brain Panel */}
            <div className="w-full md:w-[35%] bg-background border-t md:border-t-0 md:border-l-4 md:border-l-primary border-border p-6 md:p-6">
              {/* Panel Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <span className="text-xl">🧠</span>
                <span className="text-base font-semibold text-foreground">Atlas Brain</span>
              </div>

              {/* WHAT TO CHECK */}
              <div>
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-3">
                  What to Check
                </h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Calibration certificates (annual)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Equipment serial numbers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Measurement uncertainty specs
                  </li>
                </ul>
              </div>

              {/* BEST PRACTICE */}
              <div className="mt-6">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-3">
                  Best Practice
                </h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Check last 3 calibration dates for consistency. Look for trending issues.
                </p>
              </div>

              {/* COMMON ISSUES */}
              <div className="mt-6">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-3">
                  Common Issues
                </h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Expired certificates (32% of audits)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Missing uncertainty data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Uncalibrated backup equipment
                  </li>
                </ul>
              </div>

              {/* REQUIRED EVIDENCE */}
              <div className="mt-6">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-3">
                  Required Evidence
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </span>
                    <span className="text-foreground/80">Certificate photos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </span>
                    <span className="text-foreground/80">Equipment identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded border border-border" />
                    <span className="text-foreground/80">Calibration schedule</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtlasAISection;
