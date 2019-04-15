/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* mock */
import { BarchartMockData } from './BachartMockData';

/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import { YearContainer } from 'components/CustomYearSelector/CustomYearSelector.style';
import CustomYearSelector from 'components/CustomYearSelector/CustomYearSelector';
import { ResponsivePie } from '@nivo/pie';

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

const propTypes = {
  indicatorData: PropTypes.arrayOf(PropTypes.shape({})),
  chartKeys: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
  indicatorData: [],
  chartKeys: []
};

const DonutchartFragment = props => {
  return (
    <ComponentBase>
      <Box>
        <ResponsivePie
          animate
          /* todo: currently indicator data is empty, needs to get data */
          data={[
            {
              id: 'php',
              label: 'php',
              value: 89,
              color: 'hsl(101, 70%, 50%)'
            },
            {
              id: 'lisp',
              label: 'lisp',
              value: 507,
              color: 'hsl(296, 70%, 50%)'
            },
            {
              id: 'make',
              label: 'make',
              value: 542,
              color: 'hsl(312, 70%, 50%)'
            },
            {
              id: 'sass',
              label: 'sass',
              value: 160,
              color: 'hsl(117, 70%, 50%)'
            },
            {
              id: 'python',
              label: 'python',
              value: 592,
              color: 'hsl(122, 70%, 50%)'
            }
          ]}
          keys={props.chartKeys}
          indexBy="geolocation"
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
      </Box>
      <ChartLegends />
      <YearContainer>
        <CustomYearSelector
          selectedYear={props.selectedYear}
          selectYear={props.selectYear}
        />
      </YearContainer>
    </ComponentBase>
  );
};

DonutchartFragment.propTypes = propTypes;
DonutchartFragment.defaultProps = defaultProps;

export default DonutchartFragment;
