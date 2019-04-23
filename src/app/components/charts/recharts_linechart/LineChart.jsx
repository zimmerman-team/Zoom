/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* consts */
import graphKeys from '__consts__/GraphStructKeyConst';

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
  specOptions: PropTypes.shape({}),
  xAxisKey: PropTypes.string
};
const defaultProps = {
  specOptions: {},
  xAxisKey: 'year'
};

const LineChart = ({ data, indicators, xAxisKey, specOptions }) => {
  return (
    <ResponsiveContainer>
      <ReLineChart
        data={data}
        margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid />
        <XAxis
          dataKey={xAxisKey}
          type={specOptions[graphKeys.xAxis]}
          interval={0}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          yAxisId="left"
          type={specOptions[graphKeys.leftYAxis]}
          tickCount={10}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          tickCount={10}
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10 }}
          type={specOptions[graphKeys.rightYAxis]}
        />
        <Tooltip
          content={<TooltipContent xAxisKey={xAxisKey} />}
          cursor={{ stroke: 'grey', strokeWidth: 1 }}
        />
        {indicators.map(indicator => (
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
            yAxisId={indicator.orientation}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
