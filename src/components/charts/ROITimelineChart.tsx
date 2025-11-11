import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp } from 'lucide-react';

const ROITimelineChart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black/90 backdrop-blur-sm p-5 rounded-xl"
        >
          <p className="font-bold text-white mb-3 text-base">{`Month ${payload[0].payload.month}`}</p>
          <div className="space-y-2">
            <div className="flex justify-between gap-8">
              <span className="text-sm text-gray-400">Traditional:</span>
              <span className="font-bold text-gray-300">€{payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-sm text-gray-400">ScanPro+:</span>
              <span className="font-bold text-teal-300">€{payload[1].value.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-gray-700">
              <div className="flex justify-between gap-8">
                <span className="text-sm font-bold text-white">Saved:</span>
                <span className="font-black text-emerald-400">€{savings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const totalSavings = 400000 - 16800;

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="traditionalLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>
              <linearGradient id="scanproLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="label" 
              tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: '#4B5563', strokeWidth: 2 }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              axisLine={{ stroke: '#4B5563', strokeWidth: 2 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="traditional"
              stroke="url(#traditionalLine)"
              strokeWidth={4}
              dot={{ fill: '#9CA3AF', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 3 }}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="scanpro"
              stroke="url(#scanproLine)"
              strokeWidth={5}
              dot={{ fill: '#10B981', r: 6, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 9, strokeWidth: 3 }}
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
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 grid grid-cols-3 gap-5"
      >
        <motion.div 
          className="p-5 bg-black/30 rounded-xl relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Traditional</p>
          <p className="text-2xl font-black text-gray-300">€400k</p>
        </motion.div>
        
        <motion.div 
          className="p-5 bg-gradient-to-br from-teal-500/30 to-emerald-500/30 rounded-xl relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xs text-gray-200 mb-2 font-semibold uppercase tracking-wider relative z-10">ScanPro+</p>
          <p className="text-2xl font-black text-teal-300 relative z-10">€17k</p>
        </motion.div>
        
        <motion.div 
          className="p-5 bg-gradient-to-br from-emerald-500/40 to-teal-500/40 rounded-xl relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp className="w-4 h-4 text-emerald-300" />
            </motion.div>
            <p className="text-xs text-gray-100 font-bold uppercase tracking-wider">Savings</p>
          </div>
          <p className="text-2xl font-black text-emerald-300 relative z-10">€{(totalSavings / 1000).toFixed(0)}k</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ROITimelineChart;
