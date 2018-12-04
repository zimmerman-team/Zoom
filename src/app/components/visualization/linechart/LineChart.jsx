/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Box, Button, Grommet, Text, Paragraph, Heading, Grid } from 'grommet';

const ComponentBase = styled(Box)`
  height: 400px;
  //background-color: white;
  width: 100%;
  max-width: 977px;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const data = [
  {
    id: 'japan',
    color: 'hsl(172, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 62,
      },
      {
        x: 'helicopter',
        y: 202,
      },
      {
        x: 'boat',
        y: 47,
      },
      {
        x: 'train',
        y: 6,
      },
      {
        x: 'subway',
        y: 236,
      },
      {
        x: 'bus',
        y: 250,
      },
      {
        x: 'car',
        y: 133,
      },
      {
        x: 'moto',
        y: 49,
      },
      {
        x: 'bicycle',
        y: 42,
      },
      {
        x: 'others',
        y: 257,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(91, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 264,
      },
      {
        x: 'helicopter',
        y: 86,
      },
      {
        x: 'boat',
        y: 108,
      },
      {
        x: 'train',
        y: 106,
      },
      {
        x: 'subway',
        y: 31,
      },
      {
        x: 'bus',
        y: 176,
      },
      {
        x: 'car',
        y: 220,
      },
      {
        x: 'moto',
        y: 179,
      },
      {
        x: 'bicycle',
        y: 50,
      },
      {
        x: 'others',
        y: 199,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(313, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 233,
      },
      {
        x: 'helicopter',
        y: 276,
      },
      {
        x: 'boat',
        y: 114,
      },
      {
        x: 'train',
        y: 222,
      },
      {
        x: 'subway',
        y: 1,
      },
      {
        x: 'bus',
        y: 89,
      },
      {
        x: 'car',
        y: 228,
      },
      {
        x: 'moto',
        y: 223,
      },
      {
        x: 'bicycle',
        y: 163,
      },
      {
        x: 'others',
        y: 39,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(221, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 226,
      },
      {
        x: 'helicopter',
        y: 26,
      },
      {
        x: 'boat',
        y: 217,
      },
      {
        x: 'train',
        y: 237,
      },
      {
        x: 'subway',
        y: 185,
      },
      {
        x: 'bus',
        y: 162,
      },
      {
        x: 'car',
        y: 42,
      },
      {
        x: 'moto',
        y: 108,
      },
      {
        x: 'bicycle',
        y: 297,
      },
      {
        x: 'others',
        y: 263,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(48, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 101,
      },
      {
        x: 'helicopter',
        y: 30,
      },
      {
        x: 'boat',
        y: 152,
      },
      {
        x: 'train',
        y: 268,
      },
      {
        x: 'subway',
        y: 277,
      },
      {
        x: 'bus',
        y: 197,
      },
      {
        x: 'car',
        y: 65,
      },
      {
        x: 'moto',
        y: 203,
      },
      {
        x: 'bicycle',
        y: 82,
      },
      {
        x: 'others',
        y: 41,
      },
    ],
  },
];

const LineChart = props => {
  return (
    <ComponentBase>
      <ResponsiveLine
        data={data}
        margin={{
          top: 11,
          right: 98,
          bottom: 50,
          left: 93,
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
