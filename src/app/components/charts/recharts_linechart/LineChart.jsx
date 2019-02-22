/* base */
import React from 'react';

/* components */
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import TooltipContent from './components/TooltipContent/TooltipContent';

const LineChart = ({ data, indicators }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReLineChart
        data={data}
        margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid />
        <XAxis dataKey="year" interval={0} tick={{ fontSize: 10 }} />
        <YAxis yAxisId="left" tickCount={10} tick={{ fontSize: 10 }} />
        <YAxis
          tickCount={10}
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          content={<TooltipContent />}
          cursor={{ stroke: 'grey', strokeWidth: 1 }}
        />
        {indicators.map((indicator, index) => (
          <Line
            type="monotone"
            strokeWidth={2}
            key={indicator.name}
            dot={{
              r: 4,
              strokeWidth: 1,
              stroke: '#fff',
              fill: indicator.color
            }}
            activeDot={{
              r: 4,
              strokeWidth: 2,
              stroke: '#fff',
              fill: indicator.color
            }}
            dataKey={indicator.name}
            stroke={indicator.color}
            yAxisId={index > 1 ? 'right' : 'left'}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
