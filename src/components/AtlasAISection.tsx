import AtlasAIDemo from "./AtlasAIDemo";
import factoryBg from "@/assets/atlas-ai-factory-bg.jpg";

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

        {/* Demo with factory background */}
        <div className="max-w-[1200px] mx-auto relative rounded-2xl overflow-hidden">
          <img
            src={factoryBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <AtlasAIDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtlasAISection;
