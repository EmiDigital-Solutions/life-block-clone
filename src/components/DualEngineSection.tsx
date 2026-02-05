import { motion } from "framer-motion";

const DualEngineSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] overflow-hidden" data-nav-theme="dark">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white mb-4">
            From Vague Ideas to Verified Reality in Days
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            The Supplier Dual-Engine Ecosystem
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
          <div className="hidden lg:block relative" style={{ height: '500px' }}>
            
            {/* Left Features */}
            {/* AI-Powered B2B Discovery - Top Left */}
            <div className="absolute left-0 top-8 flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-300">AI-Powered</p>
                <p className="text-sm text-gray-400">B2B Discovery</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[#4a9ead] flex items-center justify-center bg-[#0a0a0a]">
                <svg className="w-5 h-5 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
                  <path d="M5 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
                  <path d="M18 14l.75 1.5 1.5.75-1.5.75-.75 1.5-.75-1.5-1.5-.75 1.5-.75.75-1.5z" />
                </svg>
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-[#4a9ead]/60 to-transparent" />
            </div>

            {/* 90% Time Savings - Mid Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-[#4a9ead]">90% Time</p>
                <p className="text-sm text-gray-400">Savings</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[#4a9ead] flex items-center justify-center bg-[#0a0a0a]">
                <svg className="w-5 h-5 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6v6l4 2" />
                  <path d="M5 4l2 2M19 4l-2 2M12 2v2" />
                  <path d="M6.5 17.5L5 22h14l-1.5-4.5" />
                  <path d="M6 12a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" />
                </svg>
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-[#4a9ead]/60 to-transparent" />
            </div>

            {/* 100% Market Coverage - Bottom Left */}
            <div className="absolute left-0 bottom-8 flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-300">100% Market</p>
                <p className="text-sm text-gray-400">Coverage</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[#4a9ead] flex items-center justify-center bg-[#0a0a0a]">
                <svg className="w-5 h-5 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-[#4a9ead]/60 to-transparent" />
            </div>

            {/* Right Features */}
            {/* AI-Guided On-Site Audits - Top Right */}
            <div className="absolute right-0 top-8 flex items-center gap-3 flex-row-reverse">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-300">AI-Guided</p>
                <p className="text-sm text-gray-400">On-Site Audits</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[#6ea996] flex items-center justify-center bg-[#0a0a0a]">
                <svg className="w-5 h-5 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div className="w-20 h-px bg-gradient-to-l from-[#6ea996]/60 to-transparent" />
            </div>

            {/* 60% Cost Reduction - Mid Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 flex-row-reverse">
              <div className="text-left">
                <p className="text-sm font-medium text-[#6ea996]">60% Cost</p>
                <p className="text-sm text-gray-400">Reduction</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[#6ea996] flex items-center justify-center bg-[#0a0a0a]">
                <svg className="w-5 h-5 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12" />
                  <path d="M15 9.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5 1.5 2.5 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5" />
                  <path d="M8 8l8 8" />
                </svg>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-[#6ea996]/60 to-transparent" />
            </div>

            {/* Actionable Intelligence - Bottom Right */}
            <div className="absolute right-0 bottom-8 flex items-center gap-3 flex-row-reverse">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-300">Actionable</p>
                <p className="text-sm text-gray-400">Intelligence</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-[#6ea996] flex items-center justify-center bg-[#0a0a0a]">
                <svg className="w-5 h-5 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="5" cy="6" r="2" />
                  <circle cx="12" cy="18" r="2" />
                  <circle cx="19" cy="6" r="2" />
                  <path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
                  <path d="M12 14v2" />
                </svg>
              </div>
              <div className="w-20 h-px bg-gradient-to-l from-[#6ea996]/60 to-transparent" />
            </div>

            {/* Infinity Symbol - Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '700px', height: '400px' }}>
              <svg
                viewBox="0 0 700 400"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Glow filters */}
                <defs>
                  <filter id="glow-blue" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="12" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glow-green" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="12" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a9ead" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#4a9ead" stopOpacity="1"/>
                  </linearGradient>
                  <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6ea996" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#6ea996" stopOpacity="1"/>
                  </linearGradient>
                </defs>

                {/* Left Loop (FIND) - Blue/Teal - Figure 8 style */}
                <path 
                  d="M350 200 
                     C350 120, 280 60, 200 60 
                     C120 60, 50 120, 50 200 
                     C50 280, 120 340, 200 340 
                     C280 340, 350 280, 350 200"
                  stroke="url(#blue-gradient)"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#glow-blue)"
                />
                
                {/* Right Loop (VERIFY) - Green - Figure 8 style */}
                <path 
                  d="M350 200 
                     C350 280, 420 340, 500 340 
                     C580 340, 650 280, 650 200 
                     C650 120, 580 60, 500 60 
                     C420 60, 350 120, 350 200"
                  stroke="url(#green-gradient)"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#glow-green)"
                />

                {/* FIND Label */}
                <text x="200" y="160" textAnchor="middle" fill="white" fontWeight="700" fontSize="24" letterSpacing="0.05em">
                  FIND
                </text>
                
                {/* Engine 1: SearchPro+ */}
                <text x="200" y="200" textAnchor="middle" fill="#888888" fontSize="14">
                  Engine 1:
                </text>
                <text x="200" y="225" textAnchor="middle" fill="#4a9ead" fontWeight="600" fontSize="18">
                  SearchPro+
                </text>

                {/* VERIFY Label */}
                <text x="500" y="160" textAnchor="middle" fill="white" fontWeight="700" fontSize="24" letterSpacing="0.05em">
                  VERIFY
                </text>
                
                {/* Engine 2: ScanPro+ */}
                <text x="500" y="200" textAnchor="middle" fill="#888888" fontSize="14">
                  Engine 2:
                </text>
                <text x="500" y="225" textAnchor="middle" fill="#6ea996" fontWeight="600" fontSize="18">
                  ScanPro+
                </text>

                {/* Ground Truth - Center */}
                <text x="350" y="190" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="16">
                  Ground
                </text>
                <text x="350" y="215" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="16">
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
                viewBox="0 0 400 250"
                className="w-full max-w-md h-auto"
                fill="none"
              >
                <defs>
                  <filter id="glow-blue-mobile" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glow-green-mobile" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Left Loop */}
                <path 
                  d="M200 125 
                     C200 75, 155 35, 110 35 
                     C65 35, 20 75, 20 125 
                     C20 175, 65 215, 110 215 
                     C155 215, 200 175, 200 125"
                  stroke="#4a9ead"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow-blue-mobile)"
                />
                {/* Right Loop */}
                <path 
                  d="M200 125 
                     C200 175, 245 215, 290 215 
                     C335 215, 380 175, 380 125 
                     C380 75, 335 35, 290 35 
                     C245 35, 200 75, 200 125"
                  stroke="#6ea996"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow-green-mobile)"
                />

                {/* Labels */}
                <text x="110" y="110" textAnchor="middle" fill="white" fontWeight="700" fontSize="16">FIND</text>
                <text x="110" y="130" textAnchor="middle" fill="#4a9ead" fontWeight="600" fontSize="11">SearchPro+</text>
                
                <text x="290" y="110" textAnchor="middle" fill="white" fontWeight="700" fontSize="16">VERIFY</text>
                <text x="290" y="130" textAnchor="middle" fill="#6ea996" fontWeight="600" fontSize="11">ScanPro+</text>
                
                <text x="200" y="118" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="11">Ground</text>
                <text x="200" y="135" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="11">Truth</text>
              </svg>

              {/* Mobile Features Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {/* Left Column - SearchPro+ Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-[#4a9ead] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-300">AI-Powered</p>
                      <p className="text-xs text-gray-500">B2B Discovery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-[#4a9ead] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#4a9ead]">90% Time</p>
                      <p className="text-xs text-gray-500">Savings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-[#4a9ead] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-300">100% Market</p>
                      <p className="text-xs text-gray-500">Coverage</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - ScanPro+ Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full border border-[#6ea996] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-300">AI-Guided</p>
                      <p className="text-xs text-gray-500">On-Site Audits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full border border-[#6ea996] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v12" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#6ea996]">60% Cost</p>
                      <p className="text-xs text-gray-500">Reduction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full border border-[#6ea996] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="5" cy="6" r="2" />
                        <circle cx="12" cy="18" r="2" />
                        <circle cx="19" cy="6" r="2" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-300">Actionable</p>
                      <p className="text-xs text-gray-500">Intelligence</p>
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
