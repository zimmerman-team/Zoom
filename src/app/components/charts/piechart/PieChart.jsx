/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import { ResponsivePie } from '@nivo/pie';
const ComponentBase = styled(Box)`
  height: 400px;
  width: 100%;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.number
    })
  )
};
const defaultProps = {
  data: []
};

const PieChart = props => {
  return (
    <ComponentBase>
      <ResponsivePie
        animate
        data={props.data}
        margin={{
          top: 40,
          right: 80,
          bottom: 80,
          left: 80
        }}
        innerRadius={0.65}
        padAngle={0.7}
        cornerRadius={4}
        colors="nivo"
        colorBy="id"
        borderWidth={1}
        borderColor="inherit:darker(0.2)"
        enableSlicesLabels={false}
        radialLabelsSkipAngle={5}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        motionStiffness={90}
        motionDamping={15}
        radialLabel={item => {
          if (item.label.length > 13) {
            return `${item.label.substr(0, 13)}...`;
          }
          return item.label;
        }}
        tooltipFormat={l => {
          return `EUR ${l.toLocaleString(
            {},
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            }
          )}`;
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
      />
    </ComponentBase>
  );
};

PieChart.propTypes = propTypes;
PieChart.defaultProps = defaultProps;

export default PieChart;
