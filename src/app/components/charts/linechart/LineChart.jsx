/* base */
import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Box } from 'grommet';
import { LineChartDataPropTypes } from 'PropTypes';

const ComponentBase = styled(Box)`
  height: 400px;
  width: 100%;
`;

const propTypes = {
  data: LineChartDataPropTypes,
};
const defaultProps = {
  data: [],
};

const LineChart = props => {
  return (
    <ComponentBase>
      <ResponsiveLine
        data={props.data}
        margin={{
          top: 0,
          right: 30,
          bottom: 30,
          left: 50,
        }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
          stacked: true,
          min: 0,
          max: 1150,
        }}
        minY="auto"
        maxY="auto"
        stacked={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        dotSize={9}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
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
