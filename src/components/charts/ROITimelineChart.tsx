import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const savings = payload[0].value - payload[1].value;
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-gray-200">
          <p className="font-bold text-gray-900 mb-3">{`Month ${payload[0].payload.month}`}</p>
          <div className="space-y-2">
            <div className="flex justify-between gap-6">
              <span className="text-sm text-gray-600">Traditional:</span>
              <span className="font-semibold text-red-600">€{payload[0].value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-sm text-gray-600">ScanPro+:</span>
              <span className="font-semibold text-teal-600">€{payload[1].value.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between gap-6">
                <span className="text-sm font-semibold text-gray-900">Saved:</span>
                <span className="font-bold text-green-600">€{savings.toLocaleString()}</span>
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
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="traditionalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DC2626" stopOpacity={0.1}/>
                <stop offset="100%" stopColor="#DC2626" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="scanproGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#14B8A6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="label" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="traditional"
              stroke="#DC2626"
              strokeWidth={3}
              dot={{ fill: '#DC2626', r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
              name="Traditional"
            />
            <Line
              type="monotone"
              dataKey="scanpro"
              stroke="#14B8A6"
              strokeWidth={4}
              dot={{ fill: '#14B8A6', r: 5 }}
              activeDot={{ r: 7 }}
              animationDuration={1500}
              animationBegin={200}
              name="ScanPro+"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 grid grid-cols-3 gap-4"
      >
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
          <p className="text-xs text-gray-600 mb-1">Traditional Cost</p>
          <p className="text-lg font-bold text-red-600">€400k</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
          <p className="text-xs text-gray-600 mb-1">ScanPro+ Cost</p>
          <p className="text-lg font-bold text-teal-600">€17k</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-300">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-xs text-gray-600">Total Savings</p>
          </div>
          <p className="text-lg font-bold text-green-600">€{(totalSavings / 1000).toFixed(0)}k</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ROITimelineChart;
