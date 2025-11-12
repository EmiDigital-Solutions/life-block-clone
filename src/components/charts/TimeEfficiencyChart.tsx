import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

const TimeEfficiencyChart = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, amount: 0.3 });

  const phases = [
    { name: 'Auditor Search', traditional: 14, scanpro: 1, visualScanpro: 0.8, color: '#3B82F6' },
    { name: 'Preparation', traditional: 7, scanpro: 2, visualScanpro: 0.8, color: '#14B8A6' },
    { name: 'On-site Audit', traditional: 3, scanpro: 2, visualScanpro: 0.8, color: '#6B7280' },
    { name: 'Report', traditional: 10, scanpro: 0.5, visualScanpro: 0.5, color: '#3B82F6' },
  ];

  const totalTraditional = phases.reduce((sum, p) => sum + p.traditional, 0);
  const totalScanPro = phases.reduce((sum, p) => sum + p.scanpro, 0);
  const totalVisualScanPro = phases.reduce((sum, p) => sum + (p.visualScanpro || p.scanpro), 0);
  const maxTotal = Math.max(totalTraditional, totalScanPro);

  return (
    <div ref={ref} className="w-full">
      <div className="space-y-6 sm:space-y-10 mb-6 sm:mb-10">
        {/* Traditional Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <h4 className="text-xs sm:text-sm md:text-base font-bold text-gray-300 flex items-center gap-2 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="hidden sm:inline">Traditional Approach</span>
              <span className="sm:hidden">Traditional</span>
            </h4>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-300">{totalTraditional} days</span>
          </div>
          <div className="flex gap-0.5 sm:gap-1 h-12 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-black/30" style={{ width: '100%' }}>
            {phases.map((phase, idx) => {
              const width = (phase.traditional / totalTraditional) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ width: 0 }}
                  animate={{ width: isVisible ? `${width}%` : 0 }}
                  transition={{ 
                    delay: idx * 0.15, 
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: phase.color }}
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white font-bold text-xs sm:text-sm text-center px-1 leading-tight bg-black/60 py-1 px-2 rounded">
                      {phase.name}<br />{phase.traditional}d
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ScanPro+ Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <h4 className="text-xs sm:text-sm md:text-base font-bold text-gray-200 flex items-center gap-2 sm:gap-3">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span className="hidden sm:inline">ScanPro+ Approach</span>
              <span className="sm:hidden">ScanPro+</span>
            </h4>
          </div>
          <div className="relative flex items-center gap-2 sm:gap-4">
            <div className="flex gap-0.5 sm:gap-1 h-12 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-black/30" style={{ width: '18%' }}>
              {phases.map((phase, idx) => {
                const width = ((phase.visualScanpro || phase.scanpro) / totalVisualScanPro) * 100;
                return (
                  <motion.div
                    key={idx}
                    initial={{ width: 0 }}
                    animate={{ width: isVisible ? `${width}%` : 0 }}
                    transition={{ 
                      delay: idx * 0.15 + 0.6, 
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative group cursor-pointer"
                    style={{ backgroundColor: phase.color }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white font-bold text-xs sm:text-sm text-center px-1 leading-tight bg-black/60 py-1 px-2 rounded">
                        {phase.name}<br />{phase.scanpro}d
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-black text-emerald-400">{totalScanPro} days</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Phase Legend - Simple Text */}
      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 mb-6 sm:mb-8">
        {phases.map((phase, idx) => (
          <div key={idx} className="flex items-center gap-2 sm:gap-3">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded flex-shrink-0" style={{ backgroundColor: phase.color }} />
            <p className="text-xs sm:text-sm text-gray-300">{phase.name}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl sm:rounded-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-200 mb-1 sm:mb-2 font-semibold uppercase">Time Reduction</p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-emerald-300">
              {Math.round((1 - totalScanPro / totalTraditional) * 100)}%
            </p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-200 mb-1 sm:mb-2 font-semibold uppercase">Days Saved</p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-emerald-300">
              {totalTraditional - totalScanPro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeEfficiencyChart;
