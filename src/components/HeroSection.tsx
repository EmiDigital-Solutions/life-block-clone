import InteractiveGlobe from "./InteractiveGlobe";

const HeroSection = () => {
  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Interactive Globe Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveGlobe />
      </div>
    </section>
  );
};

export default HeroSection;
