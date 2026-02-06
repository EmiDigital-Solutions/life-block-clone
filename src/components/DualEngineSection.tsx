import { motion } from "framer-motion";
import { Sparkles, Clock, Globe, Search, CircleDollarSign, Lightbulb } from "lucide-react";

const DualEngineSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="section-headline text-foreground">
            From Vague Ideas to Verified Reality in Days
          </h2>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-lg md:text-xl text-muted-foreground mb-12 md:mb-16"
        >
          The YVOO Dual-Engine Ecosystem
        </motion.p>

        {/* Infinity Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block relative">
            {/* Left Features */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-16 w-40">
              <FeatureNode 
                icon={<Sparkles className="w-5 h-5" />}
                title="AI-Powered"
                subtitle="B2B Discovery"
                color="charcoal"
                align="left"
              />
              <FeatureNode 
                icon={<Clock className="w-5 h-5" />}
                title="90% Time"
                subtitle="Savings"
                color="charcoal"
                align="left"
                highlight
              />
              <FeatureNode 
                icon={<Globe className="w-5 h-5" />}
                title="100% Market"
                subtitle="Coverage"
                color="charcoal"
                align="left"
              />
            </div>

            {/* Right Features */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-16 w-40">
              <FeatureNode 
                icon={<Search className="w-5 h-5" />}
                title="AI-Guided"
                subtitle="On-Site Audits"
                color="green"
                align="right"
              />
              <FeatureNode 
                icon={<CircleDollarSign className="w-5 h-5" />}
                title="60% Cost"
                subtitle="Reduction"
                color="green"
                align="right"
                highlight
              />
              <FeatureNode 
                icon={<Lightbulb className="w-5 h-5" />}
                title="Actionable"
                subtitle="Intelligence"
                color="green"
                align="right"
              />
            </div>

            {/* Center Infinity SVG */}
            <div className="mx-auto" style={{ maxWidth: '750px', padding: '0 180px' }}>
              <svg
                viewBox="0 0 600 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Loop (FIND) - Charcoal */}
                <path 
                  d="M300 150 
                     C260 80, 180 40, 120 40 
                     C50 40, 10 90, 10 150 
                     C10 210, 50 260, 120 260 
                     C180 260, 260 220, 300 150"
                  stroke="#3D3D3D"
                  strokeWidth="45"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Right Loop (VERIFY) - Green */}
                <path 
                  d="M300 150 
                     C340 220, 420 260, 480 260 
                     C550 260, 590 210, 590 150 
                     C590 90, 550 40, 480 40 
                     C420 40, 340 80, 300 150"
                  stroke="#6EA996"
                  strokeWidth="45"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Center Overlap - Gradient effect */}
                <defs>
                  <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3D3D3D" />
                    <stop offset="50%" stopColor="#5A7A6E" />
                    <stop offset="100%" stopColor="#6EA996" />
                  </linearGradient>
                </defs>
                <ellipse cx="300" cy="150" rx="30" ry="45" fill="url(#centerGradient)" />

                {/* FIND Label */}
                <text x="120" y="140" textAnchor="middle" fill="white" fontWeight="700" fontSize="24" letterSpacing="0.05em">
                  FIND
                </text>
                <text x="120" y="165" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">
                  Engine 1:
                </text>
                <text x="120" y="182" textAnchor="middle" fill="white" fontWeight="600" fontSize="14">
                  SearchPro+
                </text>

                {/* VERIFY Label */}
                <text x="480" y="140" textAnchor="middle" fill="white" fontWeight="700" fontSize="24" letterSpacing="0.05em">
                  VERIFY
                </text>
                <text x="480" y="165" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">
                  Engine 2:
                </text>
                <text x="480" y="182" textAnchor="middle" fill="white" fontWeight="600" fontSize="14">
                  ScanPro+
                </text>

                {/* Ground Truth - Center */}
                <text x="300" y="145" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="14" fontWeight="500">
                  Ground
                </text>
                <text x="300" y="165" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="14" fontWeight="500">
                  Truth
                </text>
              </svg>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center gap-8">
              {/* Mobile Infinity SVG */}
              <svg
                viewBox="0 0 320 160"
                className="w-full max-w-xs h-auto"
                fill="none"
              >
                {/* Left Loop */}
                <path 
                  d="M160 80 
                     C140 45, 100 25, 70 25 
                     C35 25, 10 50, 10 80 
                     C10 110, 35 135, 70 135 
                     C100 135, 140 115, 160 80"
                  stroke="#3D3D3D"
                  strokeWidth="25"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Right Loop */}
                <path 
                  d="M160 80 
                     C180 115, 220 135, 250 135 
                     C285 135, 310 110, 310 80 
                     C310 50, 285 25, 250 25 
                     C220 25, 180 45, 160 80"
                  stroke="#6EA996"
                  strokeWidth="25"
                  fill="none"
                  strokeLinecap="round"
                />

                <text x="70" y="77" textAnchor="middle" fill="white" fontWeight="700" fontSize="12">FIND</text>
                <text x="70" y="92" textAnchor="middle" fill="white" fontSize="8">SearchPro+</text>
                
                <text x="250" y="77" textAnchor="middle" fill="white" fontWeight="700" fontSize="12">VERIFY</text>
                <text x="250" y="92" textAnchor="middle" fill="white" fontSize="8">ScanPro+</text>
                
                <text x="160" y="77" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="8">Ground</text>
                <text x="160" y="88" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="8">Truth</text>
              </svg>

              {/* Mobile Features Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="space-y-4">
                  <MobileFeature icon={<Sparkles className="w-4 h-4" />} title="AI-Powered" subtitle="B2B Discovery" color="charcoal" />
                  <MobileFeature icon={<Clock className="w-4 h-4" />} title="90% Time" subtitle="Savings" color="charcoal" highlight />
                  <MobileFeature icon={<Globe className="w-4 h-4" />} title="100% Market" subtitle="Coverage" color="charcoal" />
                </div>
                <div className="space-y-4">
                  <MobileFeature icon={<Search className="w-4 h-4" />} title="AI-Guided" subtitle="On-Site Audits" color="green" align="right" />
                  <MobileFeature icon={<CircleDollarSign className="w-4 h-4" />} title="60% Cost" subtitle="Reduction" color="green" align="right" highlight />
                  <MobileFeature icon={<Lightbulb className="w-4 h-4" />} title="Actionable" subtitle="Intelligence" color="green" align="right" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: "charcoal" | "green";
  align: "left" | "right";
  highlight?: boolean;
}

const FeatureNode = ({ icon, title, subtitle, color, align, highlight }: FeatureNodeProps) => {
  const colorClass = color === "charcoal" ? "border-[#3D3D3D] text-[#3D3D3D]" : "border-primary text-primary";
  const titleColor = highlight 
    ? (color === "charcoal" ? "text-[#3D3D3D]" : "text-primary")
    : "text-foreground";
  
  return (
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <div className={`w-12 h-12 rounded-full border-2 ${colorClass} flex items-center justify-center shrink-0 bg-white`}>
        {icon}
      </div>
      <div>
        <p className={`text-sm font-medium ${titleColor}`}>{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

interface MobileFeatureProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: "charcoal" | "green";
  align?: "left" | "right";
  highlight?: boolean;
}

const MobileFeature = ({ icon, title, subtitle, color, align = "left", highlight }: MobileFeatureProps) => {
  const colorClass = color === "charcoal" ? "border-[#3D3D3D] text-[#3D3D3D]" : "border-primary text-primary";
  const titleColor = highlight 
    ? (color === "charcoal" ? "text-[#3D3D3D]" : "text-primary")
    : "text-foreground";
  
  return (
    <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <div className={`w-10 h-10 rounded-full border ${colorClass} flex items-center justify-center shrink-0 bg-white`}>
        {icon}
      </div>
      <div>
        <p className={`text-xs font-medium ${titleColor}`}>{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

export default DualEngineSection;
