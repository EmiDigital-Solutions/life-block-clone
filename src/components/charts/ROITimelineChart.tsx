import { useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const ROITimelineChart = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, amount: 0.3 });

  const data = [
    { month: 1, traditional: 33400, scanpro: 1400, label: 'M1' },
    { month: 2, traditional: 66800, scanpro: 2800, label: 'M2' },
    { month: 3, traditional: 100200, scanpro: 4200, label: 'M3' },
    { month: 4, traditional: 133600, scanpro: 5600, label: 'M4' },
    { month: 5, traditional: 167000, scanpro: 7000, label: 'M5' },
    { month: 6, traditional: 200400, scanpro: 8400, label: 'M6' },
    { month: 7, traditional: 233800, scanpro: 9800, label: 'M7' },
    { month: 8, traditional: 267200, scanpro: 11200, label: 'M8' },
    { month: 9, traditional: 300600, scanpro: 12600, label: 'M9' },
    { month: 10, traditional: 334000, scanpro: 14000, label: 'M10' },
    { month: 11, traditional: 367400, scanpro: 15400, label: 'M11' },
    { month: 12, traditional: 400000, scanpro: 16800, label: 'M12' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const savings = payload[0].value - payload[1].value;
      return (
        <div className="bg-white border border-gray-200 shadow-lg p-5 rounded-xl">
          <p className="font-bold text-gray-900 mb-3 text-base">{`Month ${payload[0].payload.month}`}</p>
          <div className="space-y-2">
            <div className="flex justify-between gap-8">
              <span className="text-sm text-gray-600">Traditional:</span>
              <span className="font-bold text-gray-900">€{payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-sm text-gray-600">ScanPro+:</span>
              <span className="font-black drop-shadow-sm" style={{ color: '#A8C5B8' }}>€{payload[1].value.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between gap-8">
                <span className="text-sm font-bold text-gray-900">Saved:</span>
                <span className="font-black drop-shadow-md" style={{ color: '#A8C5B8', textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>€{savings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalSavings = 400000 - 16800;

  return (
    <div ref={ref} className="w-full">
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 5, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="traditionalLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>
              <linearGradient id="scanproLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A8C5B8" />
                <stop offset="100%" stopColor="#A8C5B8" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis 
              dataKey="label" 
              tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }}
              axisLine={{ stroke: '#D1D5DB', strokeWidth: 2 }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              axisLine={{ stroke: '#D1D5DB', strokeWidth: 2 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="traditional"
              stroke="url(#traditionalLine)"
              strokeWidth={3}
              dot={{ fill: '#6B7280', r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="scanpro"
              stroke="url(#scanproLine)"
              strokeWidth={4}
              dot={{ fill: '#A8C5B8', r: 5 }}
              activeDot={{ r: 7 }}
              animationDuration={2000}
              animationBegin={300}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:gap-5"
      >
        <div className="p-3 sm:p-4 md:p-5 bg-gray-100 rounded-lg sm:rounded-xl">
          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-1 sm:mb-2 font-semibold uppercase">Traditional</p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-gray-900">€400k</p>
        </div>
        
        <div className="p-3 sm:p-4 md:p-5 bg-[#A8C5B8]/10 rounded-lg sm:rounded-xl">
          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-1 sm:mb-2 font-semibold uppercase">ScanPro+</p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black drop-shadow-md" style={{ color: '#A8C5B8', textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>€17k</p>
        </div>
        
        <div className="p-3 sm:p-4 md:p-5 bg-[#A8C5B8]/20 rounded-lg sm:rounded-xl">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 drop-shadow-md" style={{ color: '#A8C5B8' }} strokeWidth={3} />
            <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 font-bold uppercase">Savings</p>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-gray-900">€{(totalSavings / 1000).toFixed(0)}k</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ROITimelineChart;
