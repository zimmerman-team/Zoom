/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { format } from 'd3-format';

const ComponentBase = styled.div`
  height: 280px;
  width: 100%;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Budget: PropTypes.number,
      BudgetColor: PropTypes.string,
      Spent: PropTypes.number,
      SpentColor: PropTypes.string,
      year: PropTypes.string,
    }),
  ),
  keys: PropTypes.arrayOf(PropTypes.string),
};
const defaultProps = {
  data: [],
  keys: ['', ''],
};

const BarChartVertical = props => {
  return (
    <ComponentBase>
      <ResponsiveBar
        data={props.data}
        keys={props.keys}
        indexBy="year"
        margin={{
          top: 0,
          right: 0,
          bottom: 50,
          left: 60,
        }}
        padding={0.5}
        groupMode="grouped"
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
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
          format: value => `$${format('.2s')(value)}`,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={false}
        motionStiffness={90}
        motionDamping={15}
        tooltipFormat={value =>
          `$ ${value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}`
        }
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-left',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 15,
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

BarChartVertical.propTypes = propTypes;
BarChartVertical.defaultProps = defaultProps;

export default BarChartVertical;
