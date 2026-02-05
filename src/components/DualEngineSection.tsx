import { motion } from "framer-motion";

const DualEngineSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" data-nav-theme="dark">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white mb-3">
            From Vague Ideas to Verified Reality in Days
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            The Supplier Dual-Engine Ecosystem
          </p>
        </motion.div>

        {/* Infinity Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <svg
              viewBox="0 0 1200 550"
              className="w-full h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glow filters */}
              <defs>
                <filter id="glow-blue" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="10" result="blur1"/>
                  <feGaussianBlur stdDeviation="5" result="blur2"/>
                  <feMerge>
                    <feMergeNode in="blur1"/>
                    <feMergeNode in="blur2"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="glow-green" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="10" result="blur1"/>
                  <feGaussianBlur stdDeviation="5" result="blur2"/>
                  <feMerge>
                    <feMergeNode in="blur1"/>
                    <feMergeNode in="blur2"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Loop (FIND) - Blue/Teal - Teardrop shape */}
              <path 
                d="M600 275 
                   C540 170, 420 90, 300 90 
                   C180 90, 100 170, 100 275 
                   C100 380, 180 460, 300 460 
                   C420 460, 540 380, 600 275"
                stroke="#4a9ead"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow-blue)"
              />
              
              {/* Right Loop (VERIFY) - Green - Teardrop shape */}
              <path 
                d="M600 275 
                   C660 380, 780 460, 900 460 
                   C1020 460, 1100 380, 1100 275 
                   C1100 170, 1020 90, 900 90 
                   C780 90, 660 170, 600 275"
                stroke="#6ea996"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow-green)"
              />

              {/* === LEFT SIDE FEATURES === */}
              
              {/* AI-Powered B2B Discovery - Top Left */}
              <text x="45" y="75" textAnchor="start" fill="#e5e5e5" fontSize="15" fontWeight="500">AI-Powered</text>
              <text x="45" y="95" textAnchor="start" fill="#888888" fontSize="15">B2B Discovery</text>
              <circle cx="175" cy="85" r="26" fill="#0a0a0a" stroke="#4a9ead" strokeWidth="1.2"/>
              <g transform="translate(163, 73)">
                <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" stroke="#4a9ead" strokeWidth="1.2" fill="none"/>
                <path d="M5 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" stroke="#4a9ead" strokeWidth="1" fill="none"/>
              </g>
              {/* Curved connector line */}
              <path d="M201 85 C260 85, 270 110, 260 150" stroke="#4a9ead" strokeWidth="1" fill="none" opacity="0.6"/>

              {/* 90% Time Savings - Mid Left */}
              <text x="20" y="265" textAnchor="start" fill="#4a9ead" fontSize="15" fontWeight="500">90% Time</text>
              <text x="20" y="285" textAnchor="start" fill="#888888" fontSize="15">Savings</text>
              <circle cx="145" cy="275" r="26" fill="#0a0a0a" stroke="#4a9ead" strokeWidth="1.2"/>
              <g transform="translate(133, 263)">
                <path d="M12 6v6l4 2" stroke="#4a9ead" strokeWidth="1.2" fill="none"/>
                <path d="M5 4l2 2M19 4l-2 2M12 2v2" stroke="#4a9ead" strokeWidth="1" fill="none"/>
                <path d="M6 12a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" stroke="#4a9ead" strokeWidth="1.2" fill="none"/>
              </g>
              {/* Connector line */}
              <path d="M171 275 L210 275" stroke="#4a9ead" strokeWidth="1" fill="none" opacity="0.6"/>

              {/* 100% Market Coverage - Bottom Left */}
              <text x="45" y="455" textAnchor="start" fill="#e5e5e5" fontSize="15" fontWeight="500">100% Market</text>
              <text x="45" y="475" textAnchor="start" fill="#888888" fontSize="15">Coverage</text>
              <circle cx="175" cy="465" r="26" fill="#0a0a0a" stroke="#4a9ead" strokeWidth="1.2"/>
              <g transform="translate(163, 453)">
                <circle cx="12" cy="12" r="10" stroke="#4a9ead" strokeWidth="1.2" fill="none"/>
                <path d="M2 12h20" stroke="#4a9ead" strokeWidth="1" fill="none"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#4a9ead" strokeWidth="1" fill="none"/>
              </g>
              {/* Curved connector line */}
              <path d="M201 465 C260 465, 270 440, 260 400" stroke="#4a9ead" strokeWidth="1" fill="none" opacity="0.6"/>

              {/* === RIGHT SIDE FEATURES === */}
              
              {/* AI-Guided On-Site Audits - Top Right */}
              <text x="1155" y="75" textAnchor="end" fill="#e5e5e5" fontSize="15" fontWeight="500">AI-Guided</text>
              <text x="1155" y="95" textAnchor="end" fill="#888888" fontSize="15">On-Site Audits</text>
              <circle cx="1025" cy="85" r="26" fill="#0a0a0a" stroke="#6ea996" strokeWidth="1.2"/>
              <g transform="translate(1013, 73)">
                <circle cx="11" cy="11" r="8" stroke="#6ea996" strokeWidth="1.2" fill="none"/>
                <path d="M21 21l-4.35-4.35" stroke="#6ea996" strokeWidth="1.2" fill="none"/>
              </g>
              {/* Curved connector line */}
              <path d="M999 85 C940 85, 930 110, 940 150" stroke="#6ea996" strokeWidth="1" fill="none" opacity="0.6"/>

              {/* 60% Cost Reduction - Mid Right */}
              <text x="1180" y="265" textAnchor="end" fill="#6ea996" fontSize="15" fontWeight="500">60% Cost</text>
              <text x="1180" y="285" textAnchor="end" fill="#888888" fontSize="15">Reduction</text>
              <circle cx="1055" cy="275" r="26" fill="#0a0a0a" stroke="#6ea996" strokeWidth="1.2"/>
              <g transform="translate(1043, 263)">
                <circle cx="12" cy="12" r="10" stroke="#6ea996" strokeWidth="1.2" fill="none"/>
                <path d="M12 6v12" stroke="#6ea996" strokeWidth="1" fill="none"/>
                <path d="M8 8l8 8" stroke="#6ea996" strokeWidth="1" fill="none"/>
              </g>
              {/* Connector line */}
              <path d="M1029 275 L990 275" stroke="#6ea996" strokeWidth="1" fill="none" opacity="0.6"/>

              {/* Actionable Intelligence - Bottom Right */}
              <text x="1155" y="455" textAnchor="end" fill="#e5e5e5" fontSize="15" fontWeight="500">Actionable</text>
              <text x="1155" y="475" textAnchor="end" fill="#888888" fontSize="15">Intelligence</text>
              <circle cx="1025" cy="465" r="26" fill="#0a0a0a" stroke="#6ea996" strokeWidth="1.2"/>
              <g transform="translate(1013, 453)">
                <circle cx="5" cy="6" r="2" stroke="#6ea996" strokeWidth="1" fill="none"/>
                <circle cx="12" cy="18" r="2" stroke="#6ea996" strokeWidth="1" fill="none"/>
                <circle cx="19" cy="6" r="2" stroke="#6ea996" strokeWidth="1" fill="none"/>
                <path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" stroke="#6ea996" strokeWidth="1" fill="none"/>
                <path d="M12 14v2" stroke="#6ea996" strokeWidth="1" fill="none"/>
              </g>
              {/* Curved connector line */}
              <path d="M999 465 C940 465, 930 440, 940 400" stroke="#6ea996" strokeWidth="1" fill="none" opacity="0.6"/>

              {/* === CENTER LABELS === */}
              
              {/* FIND Label - Left Loop */}
              <text x="300" y="255" textAnchor="middle" fill="white" fontWeight="700" fontSize="28" letterSpacing="0.1em">
                FIND
              </text>
              <text x="300" y="290" textAnchor="middle" fill="#888888" fontSize="14">
                Engine 1:
              </text>
              <text x="300" y="315" textAnchor="middle" fill="#4a9ead" fontWeight="600" fontSize="20">
                SearchPro+
              </text>

              {/* Ground Truth - Center crossing */}
              <text x="600" y="260" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="18">
                Ground
              </text>
              <text x="600" y="285" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="18">
                Truth
              </text>

              {/* VERIFY Label - Right Loop */}
              <text x="900" y="255" textAnchor="middle" fill="white" fontWeight="700" fontSize="28" letterSpacing="0.1em">
                VERIFY
              </text>
              <text x="900" y="290" textAnchor="middle" fill="#888888" fontSize="14">
                Engine 2:
              </text>
              <text x="900" y="315" textAnchor="middle" fill="#6ea996" fontWeight="600" fontSize="20">
                ScanPro+
              </text>
            </svg>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center gap-6">
              <svg
                viewBox="0 0 400 220"
                className="w-full max-w-sm h-auto"
                fill="none"
              >
                <defs>
                  <filter id="glow-blue-m" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="glow-green-m" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <path 
                  d="M200 110 
                     C175 60, 130 30, 90 30 
                     C50 30, 20 60, 20 110 
                     C20 160, 50 190, 90 190 
                     C130 190, 175 160, 200 110"
                  stroke="#4a9ead"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow-blue-m)"
                />
                <path 
                  d="M200 110 
                     C225 160, 270 190, 310 190 
                     C350 190, 380 160, 380 110 
                     C380 60, 350 30, 310 30 
                     C270 30, 225 60, 200 110"
                  stroke="#6ea996"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow-green-m)"
                />

                <text x="90" y="100" textAnchor="middle" fill="white" fontWeight="700" fontSize="14">FIND</text>
                <text x="90" y="118" textAnchor="middle" fill="#4a9ead" fontWeight="600" fontSize="10">SearchPro+</text>
                
                <text x="310" y="100" textAnchor="middle" fill="white" fontWeight="700" fontSize="14">VERIFY</text>
                <text x="310" y="118" textAnchor="middle" fill="#6ea996" fontWeight="600" fontSize="10">ScanPro+</text>
                
                <text x="200" y="105" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="10">Ground</text>
                <text x="200" y="120" textAnchor="middle" fill="#888888" fontStyle="italic" fontSize="10">Truth</text>
              </svg>

              <div className="grid grid-cols-2 gap-3 w-full max-w-sm px-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full border border-[#4a9ead] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-300">AI-Powered</p>
                      <p className="text-xs text-gray-500">B2B Discovery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full border border-[#4a9ead] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 6v6l4 2" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#4a9ead]">90% Time</p>
                      <p className="text-xs text-gray-500">Savings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full border border-[#4a9ead] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#4a9ead]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-9 h-9 rounded-full border border-[#6ea996] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                    <div className="w-9 h-9 rounded-full border border-[#6ea996] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v12" />
                        <path d="M8 8l8 8" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#6ea996]">60% Cost</p>
                      <p className="text-xs text-gray-500">Reduction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div className="w-9 h-9 rounded-full border border-[#6ea996] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#6ea996]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
