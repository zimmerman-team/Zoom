/* base */
import React from 'react';
import PropTypes from 'prop-types';

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

const propTypes = {
  xAxisKey: PropTypes.string
};
const defaultProps = {
  xAxisKey: 'year'
};

const LineChart = ({ data, indicators, xAxisKey }) => {
  return (
    <ResponsiveContainer>
      <ReLineChart
        data={data}
        margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid />
        <XAxis dataKey={xAxisKey} interval={0} tick={{ fontSize: 10 }} />
        <YAxis yAxisId="left" tickCount={10} tick={{ fontSize: 10 }} />
        <YAxis
          tickCount={10}
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          content={<TooltipContent xAxisKey={xAxisKey} />}
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

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
