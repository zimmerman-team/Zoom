/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* consts */
import graphKeys from '__consts__/GraphStructKeyConst';
/* components */
import {
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
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

const LineChart = ({ data, chartKeys, xAxisKey, specOptions }) => {
  return (
    <ResponsiveContainer>
      <ReLineChart
        data={data}
        margin={{ top: 30, right: 10, left: 10, bottom: 0 }}
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
          tickFormatter={tick =>
            tick.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            })
          }
        />
        <YAxis
          tickCount={10}
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10 }}
          type={specOptions[graphKeys.rightYAxis]}
          tickFormatter={tick =>
            tick.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            })
          }
        />
        <Tooltip
          content={<TooltipContent xAxisKey={xAxisKey} />}
          cursor={{ stroke: 'grey', strokeWidth: 1 }}
        />
        {chartKeys.map(chartKey => (
          <Line
            type="monotone"
            strokeWidth={2}
            key={chartKey.name}
            dot={{
              r: 4,
              strokeWidth: 1,
              stroke: '#fff',
              fill: chartKey.color
            }}
            activeDot={{
              r: 4,
              strokeWidth: 2,
              stroke: '#fff',
              fill: chartKey.color
            }}
            name={chartKey.label}
            dataKey={chartKey.name}
            stroke={chartKey.color}
            yAxisId={chartKey.orientation}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
