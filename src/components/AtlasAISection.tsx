const AtlasAISection = () => {
  return (
    <section className="w-full bg-background">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-[120px] text-center">
        <h2 className="text-4xl md:text-[56px] font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-4">
          Atlas AI
        </h2>
        <p className="text-lg md:text-2xl font-normal text-muted-foreground mb-16">
          Expert guidance. Every auditor.
        </p>

        {/* Image Container */}
        <div className="max-w-[1200px] mx-auto rounded-2xl md:rounded-2xl rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Placeholder – replace src with your uploaded atlas-ai-action.png */}
          <div className="w-full aspect-video bg-[hsl(var(--navy-deep))] flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Atlas AI Interface</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtlasAISection;
