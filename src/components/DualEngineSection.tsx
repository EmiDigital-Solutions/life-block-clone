import { motion } from "framer-motion";

const DualEngineSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden" data-nav-theme="light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground mb-4">
            From Vague Ideas to Verified Reality in Days
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            The YVOO Dual-Engine Ecosystem
          </p>
        </motion.div>

        {/* Infinity Diagram Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block relative" style={{ height: '400px' }}>
            
            {/* Left Features */}
            {/* AI-Powered B2B Discovery - Top Left */}
            <div className="absolute left-0 top-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-2 border-secondary flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
                  <path d="M5 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
                  <path d="M18 14l.75 1.5 1.5.75-1.5.75-.75 1.5-.75-1.5-1.5-.75 1.5-.75.75-1.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">AI-Powered</p>
                <p className="text-sm text-muted-foreground">B2B Discovery</p>
              </div>
              <div className="w-16 h-px bg-secondary/40" />
            </div>

            {/* 90% Time Savings - Mid Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-2 border-secondary flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6v6l4 2" />
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">90% Time</p>
                <p className="text-sm text-muted-foreground">Savings</p>
              </div>
              <div className="w-12 h-px bg-secondary/40" />
            </div>

            {/* 100% Market Coverage - Bottom Left */}
            <div className="absolute left-0 bottom-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-2 border-secondary flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">100% Market</p>
                <p className="text-sm text-muted-foreground">Coverage</p>
              </div>
              <div className="w-16 h-px bg-secondary/40" />
            </div>

            {/* Right Features */}
            {/* AI-Guided On-Site Audits - Top Right */}
            <div className="absolute right-0 top-4 flex items-center gap-3 flex-row-reverse">
              <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">AI-Guided</p>
                <p className="text-sm text-muted-foreground">On-Site Audits</p>
              </div>
              <div className="w-16 h-px bg-primary/40" />
            </div>

            {/* 60% Cost Reduction - Mid Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 flex-row-reverse">
              <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12" />
                  <path d="M15 9.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5 1.5 2.5 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">60% Cost</p>
                <p className="text-sm text-muted-foreground">Reduction</p>
              </div>
              <div className="w-12 h-px bg-primary/40" />
            </div>

            {/* Actionable Intelligence - Bottom Right */}
            <div className="absolute right-0 bottom-4 flex items-center gap-3 flex-row-reverse">
              <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="5" cy="6" r="2" />
                  <circle cx="12" cy="18" r="2" />
                  <circle cx="19" cy="6" r="2" />
                  <path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
                  <path d="M12 14v2" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">Actionable</p>
                <p className="text-sm text-muted-foreground">Intelligence</p>
              </div>
              <div className="w-16 h-px bg-primary/40" />
            </div>

            {/* Infinity Symbol - Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', height: '300px' }}>
              <svg
                viewBox="0 0 600 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Glow filters */}
                <defs>
                  <filter id="glow-blue-light" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                  <filter id="glow-green-light" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>

                {/* Left Loop (FIND) - Blue/Teal */}
                <ellipse 
                  cx="175" 
                  cy="150" 
                  rx="130" 
                  ry="110"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.9"
                />
                
                {/* Right Loop (VERIFY) - Green */}
                <ellipse 
                  cx="425" 
                  cy="150" 
                  rx="130" 
                  ry="110"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.9"
                />

                {/* Center crossing mask - white background to create infinity effect */}
                <rect x="270" y="100" width="60" height="100" fill="white" />

                {/* Crossing lines */}
                <line x1="270" y1="100" x2="330" y2="200" stroke="hsl(var(--secondary))" strokeWidth="3" />
                <line x1="270" y1="200" x2="330" y2="100" stroke="hsl(var(--primary))" strokeWidth="3" />

                {/* FIND Label */}
                <text x="175" y="130" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="700" fontSize="18">
                  FIND
                </text>
                
                {/* Engine 1: SearchPro+ */}
                <text x="175" y="155" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                  Engine 1:
                </text>
                <text x="175" y="175" textAnchor="middle" fill="hsl(var(--secondary))" fontWeight="600" fontSize="14">
                  SearchPro+
                </text>

                {/* VERIFY Label */}
                <text x="425" y="130" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="700" fontSize="18">
                  VERIFY
                </text>
                
                {/* Engine 2: ScanPro+ */}
                <text x="425" y="155" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                  Engine 2:
                </text>
                <text x="425" y="175" textAnchor="middle" fill="hsl(var(--primary))" fontWeight="600" fontSize="14">
                  ScanPro+
                </text>

                {/* Ground Truth - Center */}
                <text x="300" y="145" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontStyle="italic" fontSize="14">
                  Ground
                </text>
                <text x="300" y="165" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontStyle="italic" fontSize="14">
                  Truth
                </text>
              </svg>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Simplified Mobile View */}
            <div className="flex flex-col items-center gap-8">
              {/* Infinity Symbol Mobile */}
              <svg
                viewBox="0 0 400 200"
                className="w-full max-w-md h-auto"
                fill="none"
              >
                {/* Left Loop */}
                <ellipse cx="115" cy="100" rx="85" ry="70" stroke="hsl(var(--secondary))" strokeWidth="2.5" fill="none" />
                {/* Right Loop */}
                <ellipse cx="285" cy="100" rx="85" ry="70" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" />
                
                {/* Center mask */}
                <rect x="175" y="60" width="50" height="80" fill="white" />
                
                {/* Crossing */}
                <line x1="175" y1="60" x2="225" y2="140" stroke="hsl(var(--secondary))" strokeWidth="2.5" />
                <line x1="175" y1="140" x2="225" y2="60" stroke="hsl(var(--primary))" strokeWidth="2.5" />

                {/* Labels */}
                <text x="115" y="90" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="700" fontSize="14">FIND</text>
                <text x="115" y="108" textAnchor="middle" fill="hsl(var(--secondary))" fontWeight="600" fontSize="10">SearchPro+</text>
                
                <text x="285" y="90" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="700" fontSize="14">VERIFY</text>
                <text x="285" y="108" textAnchor="middle" fill="hsl(var(--primary))" fontWeight="600" fontSize="10">ScanPro+</text>
                
                <text x="200" y="95" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontStyle="italic" fontSize="10">Ground</text>
                <text x="200" y="110" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontStyle="italic" fontSize="10">Truth</text>
              </svg>

              {/* Mobile Features Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {/* Left Column - SearchPro+ Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">AI-Powered</p>
                      <p className="text-xs text-muted-foreground">B2B Discovery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">90% Time</p>
                      <p className="text-xs text-muted-foreground">Savings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">100% Market</p>
                      <p className="text-xs text-muted-foreground">Coverage</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - ScanPro+ Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-foreground">AI-Guided</p>
                      <p className="text-xs text-muted-foreground">On-Site Audits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v12" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-foreground">60% Cost</p>
                      <p className="text-xs text-muted-foreground">Reduction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="5" cy="6" r="2" />
                        <circle cx="12" cy="18" r="2" />
                        <circle cx="19" cy="6" r="2" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-foreground">Actionable</p>
                      <p className="text-xs text-muted-foreground">Intelligence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualEngineSection;
