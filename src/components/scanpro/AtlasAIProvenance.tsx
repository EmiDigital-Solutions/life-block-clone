const tiles = [
  {
    label: "Training data",
    value: "Audit findings, NCRs, machine records and Croatian supplier evidence, anonymized and securely hosted.",
  },
  {
    label: "Validation",
    value: "Outputs are benchmarked against reviews by accredited auditors, engineers and inspectors on reference assignments.",
  },
  {
    label: "Boundary",
    value: "Atlas proposes findings. The assigned CEIP-vetted expert reviews, decides and signs.",
  },
  {
    label: "Governance",
    value: "ISO/IEC 42001 aligned · conflict-of-interest and evidence-chain controls per assignment.",
  },
];

const AtlasAIProvenance = () => {
  return (
    <section data-nav-theme="light" className="bg-background border-t border-foreground/10">
      <div className="mx-auto max-w-[1400px] px-8 py-12 md:py-16">
        <div className="flex items-start gap-3 mb-8">
          <div className="w-12 h-px bg-foreground mt-3" />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              AI Provenance
            </p>
            <h2 className="section-headline text-foreground">
              How Atlas supports an CEIP finding
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="bg-background p-6 border-t-2 border-foreground"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {tile.label}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {tile.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtlasAIProvenance;
