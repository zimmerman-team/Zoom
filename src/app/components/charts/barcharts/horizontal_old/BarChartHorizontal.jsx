/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { Box } from 'grommet/components/Box';
import get from 'lodash/get';
import Theme from 'app/theme/Theme';

const ComponentBase = styled(Box)`
  height: 280px;
  width: 100%;
  //outline: 1px solid red;
`;

const propTypes = {
  countryName: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Global: PropTypes.number,
      GlobalColor: PropTypes.string,
      Kenya: PropTypes.number,
      KenyaColor: PropTypes.string,
      country: PropTypes.string
    })
  )
};
const defaultProps = {
  data: [],
  countryName: 'Kenya'
};

const BarChart = props => {
  const customTick = tick => {
    // console.log(tick);
    return (
      <g
        transform={`translate(0, ${tick.y - 40})`}
        style={{ opacity: 1 }}
        key={`indicator-${tick.key}`}
      >
        <text style={{ fontSize: 11, fontWeight: '700' }}>{tick.key}</text>
      </g>
    );
  };

  return (
    <ComponentBase>
      <ResponsiveBar
        data={props.data}
        keys={[props.countryName, 'Global']}
        indexBy="indicator"
        margin={{
          top: 0,
          right: 0,
          bottom: 20,
          left: 10
        }}
        padding={0.4}
        innerPadding={10}
        groupMode="grouped"
        layout="horizontal"
        colors="nivo"
        colorBy={e => get(e, 'data.CountryColor', '#000')}
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
        borderColor="inherit:darker(1.6)"
        axisBottom={null}
        enableGridY={false}
        axisLeft={{
          renderTick: customTick
        }}
        enableLabel
        labelTextColor={Theme.color.zoomBlack}
        label={d => <tspan y={-2}>{d.value}</tspan>}
        animate
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
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </ComponentBase>
  );
};

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;

export default BarChart;
