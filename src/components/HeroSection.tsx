import InteractiveGlobe from "./InteractiveGlobe";

const HeroSection = () => {
  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Interactive 3D Globe */}
      <div className="absolute inset-0 z-0">
        <InteractiveGlobe />
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          className="w-full h-24 text-background"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
