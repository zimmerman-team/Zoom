/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Box, Button, Grommet, Text, Paragraph, Heading, Grid } from 'grommet';

const ComponentBase = styled(Box)`
  height: 400px;
  width: 100%;
`;

const propTypes = {
  data: PropTypes.array,
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
          top: 30,
          right: 30,
          bottom: 30,
          left: 30,
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
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
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
