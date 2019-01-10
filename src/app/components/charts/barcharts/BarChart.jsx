/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { Box } from 'grommet';
const ComponentBase = styled(Box)`
  height: 280px;
  width: 100%;
  //outline: 1px solid red;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Global: PropTypes.number,
      GlobalColor: PropTypes.string,
      Kenya: PropTypes.number,
      KenyaColor: PropTypes.string,
      country: PropTypes.string,
    })
  ),
};
const defaultProps = {
  data: [],
};

const BarChart = props => {
  return (
    <ComponentBase>
      <ResponsiveBar
        data={props.data}
        keys={['Kenya', 'Global']}
        indexBy="country"
        margin={{
          top: -35,
          right: 0,
          bottom: 20,
          left: 0,
        }}
        padding={0.4}
        innerPadding={10}
        groupMode="grouped"
        layout="horizontal"
        colors="nivo"
        colorBy={e => {
          const t = e.id;
          return e.data[''.concat(t, 'Color')];
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#000000"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-left',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 19,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </ComponentBase>
  );
};

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;

export default BarChart;
