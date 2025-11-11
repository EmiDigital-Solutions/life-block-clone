import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';

const BusinessImpactChart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    {
      label: 'Traditional Provider',
      value: 20000,
      color: '#9CA3AF',
      bgColor: 'from-gray-400 to-gray-500',
      percentage: 100
    },
    {
      label: 'ScanPro+',
      value: 700,
      color: '#10B981',
      bgColor: 'from-teal-400 to-emerald-500',
      percentage: 3.5
    }
  ];

  const savings = ((20000 - 700) / 20000 * 100).toFixed(0);

  return (
    <div className="w-full">
      <div className="space-y-10">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ delay: idx * 0.3, duration: 0.6, type: "spring" }}
          >
            <div className="flex items-center justify-between mb-4">
              <motion.span 
                className="text-base font-bold"
                style={{ color: metric.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ delay: idx * 0.3 + 0.2 }}
              >
                {metric.label}
              </motion.span>
              <motion.span 
                className="text-4xl font-black" 
                style={{ color: metric.color }}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ delay: idx * 0.3 + 0.3, type: "spring", stiffness: 200 }}
              >
                €{metric.value.toLocaleString()}
              </motion.span>
            </div>
            
            <div className="relative h-20 bg-black/30 rounded-xl overflow-hidden">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: isVisible ? `${metric.percentage}%` : 0,
                  opacity: isVisible ? 1 : 0
                }}
                transition={{ 
                  delay: idx * 0.3 + 0.4, 
                  duration: 1.5, 
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`h-full bg-gradient-to-r ${metric.bgColor} relative`}
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
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 30,
          scale: isVisible ? 1 : 0.9
        }}
        transition={{ delay: 1, duration: 0.6, type: "spring" }}
        className="mt-10 flex items-center gap-6 p-8 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0 relative z-10"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <TrendingDown className="w-8 h-8 text-white" />
        </motion.div>
        <div className="relative z-10">
          <p className="text-sm text-gray-200 mb-1 font-medium">Cost Reduction per Audit</p>
          <motion.p 
            className="text-5xl font-black text-teal-300"
            initial={{ scale: 0 }}
            animate={{ scale: isVisible ? 1 : 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            -{savings}%
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessImpactChart;
