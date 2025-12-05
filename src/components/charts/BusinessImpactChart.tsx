import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown } from 'lucide-react';

const BusinessImpactChart = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, amount: 0.3 });

  const metrics = [
    {
      label: 'Traditional Provider',
      value: 20000,
      color: '#1A1A1A',
      bgColor: '#C0C0C0',
      percentage: 100
    },
    {
      label: 'ScanPro+',
      value: 700,
      color: 'hsl(195, 88%, 34%)',
      bgColor: 'hsl(195, 88%, 34%)',
      percentage: 3.5
    }
  ];

  const savings = ((20000 - 700) / 20000 * 100).toFixed(0);

  return (
    <div ref={ref} className="w-full">
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <span className="text-xs sm:text-sm md:text-base font-bold truncate" style={{ color: metric.color }}>
                {metric.label}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black flex-shrink-0" style={{ color: metric.color }}>
                €{metric.value.toLocaleString()}
              </span>
            </div>
            
            <div className="relative h-14 sm:h-16 md:h-20 bg-[#F5F5F5] rounded-2xl sm:rounded-3xl overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${metric.percentage}%` : 0 }}
                transition={{ 
                  delay: idx * 0.3, 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="h-full rounded-2xl sm:rounded-3xl"
                style={{ backgroundColor: metric.bgColor }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8 bg-[#ACC5D9]/20 rounded-2xl sm:rounded-3xl"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#6EA996] flex items-center justify-center flex-shrink-0">
          <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs md:text-sm text-[#1A1A1A] mb-1 font-semibold">Cost Reduction per Audit</p>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0A0A0A]">-{savings}%</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessImpactChart;
