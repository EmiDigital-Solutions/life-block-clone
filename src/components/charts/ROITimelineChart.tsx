import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

const ROITimelineChart = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate cumulative savings over 12 months (20 audits per year)
  const data = [
    { month: 'Month 1', savings: 0, traditional: 0 },
    { month: 'Month 2', savings: 32200, traditional: 33400 },
    { month: 'Month 3', savings: 64400, traditional: 66800 },
    { month: 'Month 4', savings: 96600, traditional: 100200 },
    { month: 'Month 6', savings: 161000, traditional: 167000 },
    { month: 'Month 9', savings: 257600, traditional: 267400 },
    { month: 'Month 12', savings: 386000, traditional: 400000 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <p className="text-sm text-green-600 font-medium">
            Cumulative Savings: €{payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            vs Traditional: €{payload[1]?.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="traditional"
            stroke="#DC2626"
            strokeWidth={2}
            fill="url(#colorTraditional)"
            name="Traditional Cost"
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#14B8A6"
            strokeWidth={3}
            fill="url(#colorSavings)"
            name="With ScanPro+"
            animationDuration={1500}
            animationBegin={200}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            Annual savings: <span className="font-bold text-green-600">€386,000</span> per year
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ROITimelineChart;
