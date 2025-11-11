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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-bold" style={{ color: metric.color }}>
                {metric.label}
              </span>
              <span className="text-4xl font-black" style={{ color: metric.color }}>
                €{metric.value.toLocaleString()}
              </span>
            </div>
            
            <div className="relative h-20 bg-black/30 rounded-xl overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${metric.percentage}%` : 0 }}
                transition={{ delay: idx * 0.2 + 0.3, duration: 1.2 }}
                className={`h-full bg-gradient-to-r ${metric.bgColor}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 flex items-center gap-6 p-8 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl"
      >
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
          <TrendingDown className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-200 mb-1 font-medium">Cost Reduction per Audit</p>
          <p className="text-5xl font-black text-teal-300">-{savings}%</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessImpactChart;
