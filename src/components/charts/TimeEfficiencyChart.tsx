import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { motion } from 'framer-motion';

const TimeEfficiencyChart = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    {
      phase: 'Auditor Search & Booking',
      Traditional: 14,
      'ScanPro+': 0.5,
    },
    {
      phase: 'Preparation & Planning',
      Traditional: 7,
      'ScanPro+': 1,
    },
    {
      phase: 'On-site Audit',
      Traditional: 3,
      'ScanPro+': 2,
    },
    {
      phase: 'Report & Documentation',
      Traditional: 10,
      'ScanPro+': 0.5,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.phase}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} days
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 80, left: 150, bottom: 20 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis 
            type="number" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            label={{ value: 'Days', position: 'insideBottom', offset: -10, fill: '#6B7280' }}
          />
          <YAxis 
            dataKey="phase" 
            type="category"
            tick={{ fill: '#6B7280', fontSize: 13 }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="Traditional" 
            fill="#DC2626" 
            radius={[0, 8, 8, 0]}
            animationDuration={1200}
            animationBegin={0}
          >
            <LabelList 
              dataKey="Traditional" 
              position="right" 
              formatter={(value: number) => `${value}d`}
              style={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
          <Bar 
            dataKey="ScanPro+" 
            fill="#14B8A6" 
            radius={[0, 8, 8, 0]}
            animationDuration={1200}
            animationBegin={200}
          >
            <LabelList 
              dataKey="ScanPro+" 
              position="right" 
              formatter={(value: number) => `${value}d`}
              style={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 grid grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Traditional</p>
            <p className="text-2xl font-bold text-red-600">34 days</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">ScanPro+</p>
            <p className="text-2xl font-bold text-green-600">4 days</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TimeEfficiencyChart;
