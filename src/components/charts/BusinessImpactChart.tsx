import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const BusinessImpactChart = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    {
      category: 'Cost per Audit',
      Traditional: 20000,
      'ScanPro+': 700,
    },
    {
      category: 'Annual Cost (20 audits)',
      Traditional: 400000,
      'ScanPro+': 14000,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.category}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: €{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            angle={-15}
            textAnchor="end"
            height={80}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar 
            dataKey="Traditional" 
            fill="#DC2626" 
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationBegin={0}
          />
          <Bar 
            dataKey="ScanPro+" 
            fill="#14B8A6" 
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationBegin={200}
          />
        </BarChart>
      </ResponsiveContainer>
      
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            <span className="font-bold text-green-600">96% cost savings</span> with ScanPro+
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BusinessImpactChart;
