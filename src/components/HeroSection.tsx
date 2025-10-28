import { Hexagon, Boxes, Zap, Compass } from "lucide-react";
import heroImage from "@/assets/hero-architecture.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Hexagon, label: "+ 350 projects" },
    { icon: Boxes, label: "23 architects" },
    { icon: Zap, label: "Fast launch" },
    { icon: Compass, label: "Build and planning" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-navy-deep/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Tagline */}
          <div className="inline-block">
            <div className="flex items-center gap-4 text-white/60 text-sm font-sans mb-8">
              <div className="h-px w-16 bg-white/40"></div>
              <span>Welcome to Architect Nicolai</span>
              <div className="h-px w-16 bg-white/40"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
            Architecture Should Speak Of Its Time <br />
            And Place But Yearn For Timelessness
          </h1>

          {/* Subtitle */}
          <h2 className="text-3xl md:text-4xl font-serif text-white/90 mt-6">
            Timeless Architecture
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-white font-sans text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
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
