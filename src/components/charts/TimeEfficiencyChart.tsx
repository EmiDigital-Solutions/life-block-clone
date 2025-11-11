import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

const TimeEfficiencyChart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const phases = [
    { name: 'Auditor Search', traditional: 14, scanpro: 0.5, color: '#3B82F6' },
    { name: 'Preparation', traditional: 7, scanpro: 1, color: '#14B8A6' },
    { name: 'On-site Audit', traditional: 3, scanpro: 2, color: '#6B7280' },
    { name: 'Report & Docs', traditional: 10, scanpro: 0.5, color: '#3B82F6' },
  ];

  const totalTraditional = phases.reduce((sum, p) => sum + p.traditional, 0);
  const totalScanPro = phases.reduce((sum, p) => sum + p.scanpro, 0);
  const maxTotal = Math.max(totalTraditional, totalScanPro);

  return (
    <div className="w-full">
      <div className="space-y-10 mb-10">
        {/* Traditional Timeline */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-base font-bold text-gray-300 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              Traditional Approach
            </h4>
            <span className="text-3xl font-black text-gray-300">{totalTraditional} days</span>
          </div>
          <div className="flex gap-1 h-16 rounded-xl overflow-hidden bg-black/30" style={{ width: `${(totalTraditional / maxTotal) * 100}%` }}>
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100">
                      {phase.traditional}d
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ScanPro+ Timeline */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-base font-bold text-gray-200 flex items-center gap-3">
              <Zap className="w-5 h-5 text-emerald-400" />
              ScanPro+ Approach
            </h4>
            <span className="text-3xl font-black text-emerald-400">{totalScanPro} days</span>
          </div>
          <div className="flex gap-1 h-16 rounded-xl overflow-hidden bg-black/30" style={{ width: `${(totalScanPro / maxTotal) * 100}%` }}>
            {phases.map((phase, idx) => {
              const width = (phase.scanpro / totalScanPro) * 100;
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100">
                      {phase.scanpro}d
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Legend - Simple Text */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
        {phases.map((phase, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: phase.color }} />
            <p className="text-sm text-gray-300">{phase.name}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-200 mb-2 font-semibold uppercase">Time Reduction</p>
            <p className="text-5xl font-black text-emerald-300">
              {Math.round((1 - totalScanPro / totalTraditional) * 100)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-200 mb-2 font-semibold uppercase">Days Saved</p>
            <p className="text-5xl font-black text-emerald-300">
              {totalTraditional - totalScanPro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeEfficiencyChart;
