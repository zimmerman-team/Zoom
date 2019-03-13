/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { ResponsiveLine } from '@nivo/line';
import { LinechartMockData } from './LinechartMockData';
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Box = styled.div`
  width: 1024px;
  height: 500px;
  outline: 1px solid gray;
`;

const propTypes = {};
const defaultProps = {};

const LinechartFragment = () => {
  return (
    <ComponentBase>
      <Box>
        <ResponsiveLine
          data={LinechartMockData}
          margin={{
            top: 50,
            right: 110,
            bottom: 50,
            left: 60
          }}
          xScale={{
            type: 'point'
          }}
          yScale={{
            type: 'linear',
            stacked: true,
            min: 'auto',
            max: 'auto'
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          dotSize={10}
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
      </Box>
      <ChartLegends />
    </ComponentBase>
  );
};

LinechartFragment.propTypes = propTypes;
LinechartFragment.defaultProps = defaultProps;

export default LinechartFragment;
