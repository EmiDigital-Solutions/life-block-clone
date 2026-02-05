import { motion } from "framer-motion";
import { Sparkles, Hourglass, Globe, Search, DollarSign, Network } from "lucide-react";

const DualEngineSection = () => {
  const leftFeatures = [
    { icon: Sparkles, label: "AI-Powered", sublabel: "B2B Discovery", position: "top-left" },
    { icon: Hourglass, label: "90% Time", sublabel: "Savings", position: "mid-left" },
    { icon: Globe, label: "100% Market", sublabel: "Coverage", position: "bottom-left" },
  ];

  const rightFeatures = [
    { icon: Search, label: "AI-Guided", sublabel: "On-Site Audits", position: "top-right" },
    { icon: DollarSign, label: "60% Cost", sublabel: "Reduction", position: "mid-right" },
    { icon: Network, label: "Actionable", sublabel: "Intelligence", position: "bottom-right" },
  ];

  return (
    <section className="py-24 md:py-32 bg-white" data-nav-theme="light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground mb-4">
            From Vague Ideas to Verified Reality in Days
          </h2>
          <p className="text-xl text-muted-foreground">
            The YVOO Dual-Engine Ecosystem
          </p>
        </motion.div>

        {/* Infinity Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Container */}
          <div className="relative flex items-center justify-center py-16">
            
            {/* Left Features */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-8 lg:py-4">
              {leftFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center bg-white">
                    <feature.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-right lg:text-left">
                    <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.sublabel}</p>
                  </div>
                  {/* Connector line */}
                  <div className="hidden lg:block w-8 h-px bg-border" />
                </motion.div>
              ))}
            </div>

            {/* Right Features */}
            <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-8 lg:py-4">
              {rightFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3 flex-row-reverse lg:flex-row"
                >
                  {/* Connector line */}
                  <div className="hidden lg:block w-8 h-px bg-border" />
                  <div className="text-left lg:text-right">
                    <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.sublabel}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center bg-white">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Infinity Symbol SVG */}
            <div className="relative w-full max-w-2xl mx-auto px-24 lg:px-32">
              <svg
                viewBox="0 0 400 200"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer glow effect */}
                <defs>
                  <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Left Loop (FIND) - Blue */}
                <path
                  d="M200 100 C200 45, 130 20, 80 20 C30 20, 10 55, 10 100 C10 145, 30 180, 80 180 C130 180, 200 155, 200 100"
                  stroke="#0A7FA5"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow-blue)"
                  className="drop-shadow-sm"
                />
                
                {/* Right Loop (VERIFY) - Green */}
                <path
                  d="M200 100 C200 155, 270 180, 320 180 C370 180, 390 145, 390 100 C390 55, 370 20, 320 20 C270 20, 200 45, 200 100"
                  stroke="#6EA996"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow-green)"
                  className="drop-shadow-sm"
                />

                {/* FIND Label */}
                <text x="80" y="70" textAnchor="middle" className="fill-foreground text-sm font-bold" style={{ fontSize: '14px' }}>
                  FIND
                </text>
                
                {/* Engine 1: SearchPro+ */}
                <text x="80" y="110" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '10px' }}>
                  Engine 1:
                </text>
                <text x="80" y="125" textAnchor="middle" className="fill-[#0A7FA5] font-semibold" style={{ fontSize: '12px' }}>
                  SearchPro+
                </text>

                {/* VERIFY Label */}
                <text x="320" y="70" textAnchor="middle" className="fill-foreground text-sm font-bold" style={{ fontSize: '14px' }}>
                  VERIFY
                </text>
                
                {/* Engine 2: ScanPro+ */}
                <text x="320" y="110" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '10px' }}>
                  Engine 2:
                </text>
                <text x="320" y="125" textAnchor="middle" className="fill-primary font-semibold" style={{ fontSize: '12px' }}>
                  ScanPro+
                </text>

                {/* Ground Truth - Center */}
                <text x="200" y="96" textAnchor="middle" className="fill-muted-foreground italic" style={{ fontSize: '11px' }}>
                  Ground
                </text>
                <text x="200" y="112" textAnchor="middle" className="fill-muted-foreground italic" style={{ fontSize: '11px' }}>
                  Truth
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualEngineSection;
