/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* consts */
import { chartColors } from '__consts__/ChartConst';
/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import { ResponsivePie } from '@nivo/pie';

/* styles */
import { FragmentBase } from '../VizContainer.style';

const Box = styled.div`
  width: 1024px;
  height: 500px;
  outline: 1px solid gray;
`;

const propTypes = {
  indicatorData: PropTypes.arrayOf(PropTypes.shape({})),
  chartKeys: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  )
};
const defaultProps = {
  indicatorData: [],
  chartKeys: []
};

const DonutchartFragment = props => {
  return (
    <FragmentBase>
      <Box>
        <ResponsivePie
          animate
          /* todo: currently indicator data is empty, needs to get data */
          data={props.indicatorData}
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
          colors={chartColors.donutChartColors}
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
      <ChartLegends data={props.chartKeys} />
    </FragmentBase>
  );
};

DonutchartFragment.propTypes = propTypes;
DonutchartFragment.defaultProps = defaultProps;

export default DonutchartFragment;
