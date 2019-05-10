/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* mock */
import { BarchartMockData } from 'modules/visualizer/sort/container/fragments/BarchartFragment/BachartMockData';

/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import { ResponsiveBar } from '@nivo/bar';
import TooltipContent from 'modules/visualizer/sort/container/fragments/common/ToolTipContent';

/* styles */
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';

const Box = styled.div`
  width: 100%;
  max-width: 1024px;
  height: 500px;
  outline: 1px solid gray;
`;

const propTypes = {
  indicatorData: PropTypes.arrayOf(PropTypes.shape({})),
  chartKeys: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
  indicatorData: [],
  chartKeys: []
};

const BarchartFragment = props => {
  return (
    <FragmentBase>
      <Box>
        <ResponsiveBar
          data={props.indicatorData}
          keys={props.chartKeys.map(item => {
            return item.key;
          })}
          indexBy="geolocation"
          margin={{
            top: 20,
            right: 0,
            bottom: 25,
            left: 30
          }}
          tooltip={payload => (
            <TooltipContent
              xKey={payload.indexValue}
              index={payload.index}
              color={payload.color}
              valueLabel={payload.data[`${payload.id}Label`]}
              value={payload.value}
            />
          )}
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
          // fill={[
          //   {
          //     match: {
          //       id: 'fries'
          //     },
          //     id: 'dots'
          //   },
          //   {
          //     match: {
          //       id: 'sandwich'
          //     },
          //     id: 'lines'
          //   }
          // ]}
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
      <ChartLegends data={props.chartKeys} />
    </FragmentBase>
  );
};

BarchartFragment.propTypes = propTypes;
BarchartFragment.defaultProps = defaultProps;

export default BarchartFragment;
