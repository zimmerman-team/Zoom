/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

/* utils */
import find from 'lodash/find';

/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import { ResponsiveBar } from '@nivo/bar';
import TooltipContent from 'modules/visualizer/sort/container/fragments/common/ToolTipContent';
/* styles */
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';
import graphKeys from '__consts__/GraphStructKeyConst';

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
  const margin = props.specOptions[graphKeys.horizont]
    ? {
        top: 0,
        right: 20,
        bottom: 30,
        left: 40
      }
    : {
        top: 20,
        right: 0,
        bottom: 25,
        left: 60
      };

  return (
    <FragmentBase>
      <Box>
        <ResponsiveBar
          data={props.indicatorData}
          keys={props.chartKeys.map(item => {
            return item.key;
          })}
          margin={margin}
          indexBy={props.specOptions[graphKeys.aggregate]}
          tooltip={payload => (
            <TooltipContent
              aggrType={props.specOptions[graphKeys.aggregate]}
              xKey={payload.indexValue}
              index={payload.index}
              color={payload.color}
              valueLabel={payload.data[`${payload.id}Label`]}
              format={payload.data[`${payload.id}Format`]}
              value={payload.value}
            />
          )}
          padding={0.3}
          groupMode={
            props.specOptions[graphKeys.grouped] ? 'grouped' : 'stacked'
          }
          colorBy={d => {
            const chartItem = find(props.chartKeys, ['key', d.id]);
            if (chartItem) {
              return chartItem.color;
            }
            return '#38bcb2';
          }}
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

          layout={
            props.specOptions[graphKeys.horizont] ? 'horizontal' : 'vertical'
          }
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

const mapStateToProps = state => {
  return {
    specOptions: state.chartData.chartData.specOptions
  };
};

export default connect(mapStateToProps)(BarchartFragment);
