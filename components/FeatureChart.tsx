import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { LinguisticFeatures } from '../types';

interface FeatureChartProps {
  features: LinguisticFeatures;
  isReal: boolean;
}

const FeatureChart: React.FC<FeatureChartProps> = ({ features, isReal }) => {
  const data = [
    { subject: 'Emotional Tone', A: features.emotionalTone, fullMark: 100 },
    { subject: 'Sensationalism', A: features.sensationalism, fullMark: 100 },
    { subject: 'Factuality', A: features.factuality, fullMark: 100 },
    { subject: 'Credibility', A: features.sourceCredibility, fullMark: 100 },
    { subject: 'Bias Level', A: features.biasLevel, fullMark: 100 },
  ];

  const strokeColor = isReal ? '#10b981' : '#ef4444'; // Emerald or Red
  const fillColor = isReal ? '#10b981' : '#ef4444';

  return (
    <div className="w-full h-64 md:h-80 relative">
        <h3 className="text-center text-slate-400 text-sm mb-2 font-mono uppercase tracking-wider">Linguistic Feature Vector</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="A"
            stroke={strokeColor}
            strokeWidth={2}
            fill={fillColor}
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureChart;