import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';

const TimeEfficiencyChart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const phases = [
    { name: 'Auditor Search', traditional: 14, scanpro: 0.5, color: '#2563EB' },
    { name: 'Preparation', traditional: 7, scanpro: 1, color: '#14B8A6' },
    { name: 'On-site Audit', traditional: 3, scanpro: 2, color: '#8B5CF6' },
    { name: 'Report & Docs', traditional: 10, scanpro: 0.5, color: '#F59E0B' },
  ];

  const totalTraditional = phases.reduce((sum, p) => sum + p.traditional, 0);
  const totalScanPro = phases.reduce((sum, p) => sum + p.scanpro, 0);

  return (
    <div className="w-full">
      {/* Timeline Comparison */}
      <div className="space-y-6 mb-8">
        {/* Traditional Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              Traditional Approach
            </h4>
            <span className="text-lg font-bold text-red-600">{totalTraditional} days</span>
          </div>
          <div className="flex gap-1 h-12 rounded-xl overflow-hidden shadow-md">
            {phases.map((phase, idx) => {
              const width = (phase.traditional / totalTraditional) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ width: 0 }}
                  animate={{ width: isVisible ? `${width}%` : 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: phase.color }}
                >
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {phase.traditional}d
                    </span>
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {phase.name}: {phase.traditional} days
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ScanPro+ Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              ScanPro+ Approach
            </h4>
            <span className="text-lg font-bold text-green-600">{totalScanPro} days</span>
          </div>
          <div className="flex gap-1 h-12 rounded-xl overflow-hidden shadow-md">
            {phases.map((phase, idx) => {
              const width = (phase.scanpro / totalScanPro) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ width: 0 }}
                  animate={{ width: isVisible ? `${width}%` : 0 }}
                  transition={{ delay: idx * 0.1 + 0.4, duration: 0.8, ease: "easeOut" }}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: phase.color }}
                >
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {phase.scanpro}d
                    </span>
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {phase.name}: {phase.scanpro} days
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="grid grid-cols-2 gap-3"
      >
        {phases.map((phase, idx) => (
          <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: phase.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">{phase.name}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6 p-5 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border-2 border-green-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Time Reduction</p>
            <p className="text-3xl font-bold text-green-600">
              {Math.round((1 - totalScanPro / totalTraditional) * 100)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Days Saved</p>
            <p className="text-3xl font-bold text-green-600">
              {totalTraditional - totalScanPro}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeEfficiencyChart;
