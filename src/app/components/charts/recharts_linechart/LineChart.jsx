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

/* utils */
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

const propTypes = {
  specOptions: PropTypes.shape({}),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number
  }),
  xAxisKey: PropTypes.string
};
const defaultProps = {
  specOptions: {},
  margin: { top: 30, right: 10, left: 10, bottom: 0 },
  xAxisKey: 'year'
};

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      realKeys: []
    };
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.data, prevProps.data) ||
      !isEqual(this.props.chartKeys, prevProps.chartKeys)
    ) {
      // these will basically be the keys for the actual data that exists
      // cause when render lines for data that doesnt exist you get nothing
      // #JustRechartLogic
      const realKeys = [];

      this.props.chartKeys.forEach(chartKey => {
        if (
          find(this.props.data, item => {
            return item[chartKey.name] !== undefined;
          })
        ) {
          realKeys.push(chartKey);
        }
      });

      this.setState({ realKeys });
    }
  }

  render() {
    const { data, xAxisKey, specOptions } = this.props;

    return (
      <ResponsiveContainer>
        <ReLineChart data={data} margin={this.props.margin}>
          <CartesianGrid />
          <XAxis dataKey={xAxisKey} interval={0} tick={{ fontSize: 10 }} />
          <YAxis
            yAxisId="left"
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
            tickFormatter={tick =>
              tick.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })
            }
          />
          <Tooltip
            data-cy="linechart-tooltip"
            content={<TooltipContent />}
            cursor={{ stroke: 'grey', strokeWidth: 1 }}
          />
          {this.state.realKeys.map(chartKey => (
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
  }
}

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
