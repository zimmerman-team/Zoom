/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { ResponsiveBar } from '@nivo/bar';
import { BarchartMockData } from './BachartMockData';
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

const BarchartFragment = props => {
  return (
    <ComponentBase>
      <Box>
        <ResponsiveBar
          data={BarchartMockData}
          keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
          indexBy="country"
          margin={{
            top: 20,
            right: 0,
            bottom: 25,
            left: 30
          }}
          padding={0.3}
          groupMode="grouped"
          colors="nivo"
          colorBy="id"
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'fries'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'sandwich'
              },
              id: 'lines'
            }
          ]}
          borderColor="inherit:darker(1.6)"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
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

BarchartFragment.propTypes = propTypes;
BarchartFragment.defaultProps = defaultProps;

export default BarchartFragment;