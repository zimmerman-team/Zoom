/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import { ComponentBase } from 'components/charts/nivo_linechart/LineChart.styles';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      data: PropTypes.PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number
        })
      ),
      id: PropTypes.string
    })
  )
};
const defaultProps = {
  data: []
};

const LineChart = props => {
  return (
    <ComponentBase>
      <ResponsiveLine
        data={props.data}
        margin={{
          top: 20,
          right: 30,
          bottom: 30,
          left: 80
        }}
        xScale={{
          type: 'point'
        }}
        yScale={{
          type: 'linear',
          stacked: false
        }}
        minY="auto"
        maxY="auto"
        stacked
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        dotSize={9}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel
        dotLabel="y"
        dotLabelYOffset={-12}
        animate
        motionStiffness={90}
        motionDamping={15}
        legends={[]}
      />
    </ComponentBase>
  );
};

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
