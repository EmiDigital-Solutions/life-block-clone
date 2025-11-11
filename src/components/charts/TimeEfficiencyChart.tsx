import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, ArrowRight } from 'lucide-react';

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

  return (
    <div className="w-full">
      {/* Timeline Comparison */}
      <div className="space-y-10 mb-10">
        {/* Traditional Timeline */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <motion.h4 
              className="text-base font-bold text-gray-300 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.5 }}
            >
              <Clock className="w-5 h-5 text-gray-400" />
              Traditional Approach
            </motion.h4>
            <motion.span 
              className="text-3xl font-black text-gray-300"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {totalTraditional} days
            </motion.span>
          </div>
          <div className="flex gap-1 h-16 rounded-xl overflow-hidden bg-black/30">
            {phases.map((phase, idx) => {
              const width = (phase.traditional / totalTraditional) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isVisible ? `${width}%` : 0, opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: idx * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: phase.color }}
                >
                  <motion.div 
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                      ],
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "linear"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-base opacity-0 group-hover:opacity-100 transition-opacity">
                      {phase.traditional}d
                    </span>
                  </div>
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/95 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {phase.name}: {phase.traditional} days
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-black/95"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Arrow Indicator */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 text-teal-400"
          >
            <ArrowRight className="w-6 h-6 rotate-90" />
            <span className="text-sm font-bold uppercase tracking-wider">88% Faster</span>
            <ArrowRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>

        {/* ScanPro+ Timeline */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <motion.h4 
              className="text-base font-bold text-gray-200 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Zap className="w-5 h-5 text-emerald-400" />
              ScanPro+ Approach
            </motion.h4>
            <motion.span 
              className="text-3xl font-black text-emerald-400"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              {totalScanPro} days
            </motion.span>
          </div>
          <div className="flex gap-1 h-16 rounded-xl overflow-hidden bg-black/30">
            {phases.map((phase, idx) => {
              const width = (phase.scanpro / totalScanPro) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isVisible ? `${width}%` : 0, opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: idx * 0.15 + 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: phase.color }}
                >
                  <motion.div 
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                      ],
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "linear"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-base opacity-0 group-hover:opacity-100 transition-opacity">
                      {phase.scanpro}d
                    </span>
                  </div>
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/95 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {phase.name}: {phase.scanpro} days
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-black/95"></div>
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
        transition={{ delay: 1.2, duration: 0.5 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        {phases.map((phase, idx) => (
          <motion.div 
            key={idx} 
            className="flex items-center gap-3 p-4 bg-black/30 rounded-xl"
            whileHover={{ scale: 1.05, x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div 
              className="w-4 h-4 rounded flex-shrink-0"
              style={{ backgroundColor: phase.color }}
            />
            <p className="text-sm font-bold text-gray-200 truncate">{phase.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 30,
          scale: isVisible ? 1 : 0.9
        }}
        transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
        className="p-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-sm text-gray-200 mb-2 font-semibold uppercase tracking-wider">Time Reduction</p>
            <motion.p 
              className="text-5xl font-black text-emerald-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {Math.round((1 - totalScanPro / totalTraditional) * 100)}%
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-200 mb-2 font-semibold uppercase tracking-wider">Days Saved</p>
            <motion.p 
              className="text-5xl font-black text-emerald-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {totalTraditional - totalScanPro}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeEfficiencyChart;
