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
      color: '#6B7280',
      bgColor: 'from-gray-500 to-gray-600'
    },
    {
      label: 'ScanPro+',
      value: 700,
      color: '#14B8A6',
      bgColor: 'from-teal-500 to-teal-600'
    }
  ];

  const savings = ((20000 - 700) / 20000 * 100).toFixed(0);
  const maxValue = 20000;

  return (
    <div className="w-full">
      <div className="space-y-8">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-300">{metric.label}</span>
              <span className="text-3xl font-bold" style={{ color: metric.color }}>
                €{metric.value.toLocaleString()}
              </span>
            </div>
            
            <div className="relative h-16 bg-white/5 rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${(metric.value / maxValue) * 100}%` : 0 }}
                transition={{ delay: idx * 0.2 + 0.3, duration: 1.2, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${metric.bgColor} rounded-lg`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 flex items-center gap-4 p-6 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl border border-teal-500/30"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
          <TrendingDown className="w-7 h-7 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-300 mb-1">Cost Reduction per Audit</p>
          <p className="text-4xl font-bold text-teal-400">-{savings}%</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessImpactChart;
