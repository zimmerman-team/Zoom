/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
/* consts */
import graphKeys from '__consts__/GraphStructKeyConst';
/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import LineChart from 'components/charts/recharts_linechart/LineChart';
/* styles */
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';

/* mock */
// import { LinechartMockData } from './LinechartMockData';

const Box = styled.div`
  width: 1024px;
  height: 500px;
  outline: 1px solid gray;
`;

const propTypes = {
  chartKeys: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  ),
  specOptions: PropTypes.shape({}),
  indicatorData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number
        })
      )
    })
  )
};
const defaultProps = {
  chartKeys: [],
  specOptions: {},
  indicatorData: []
};

const LinechartFragment = props => {
  return (
    <FragmentBase>
      <Box>
        <LineChart
          chartKeys={props.chartKeys}
          data={props.indicatorData}
          xAxisKey={props.specOptions[graphKeys.aggregate]}
          specOptions={props.specOptions}
        />
      </Box>
      <ChartLegends data={props.chartKeys} />
    </FragmentBase>
  );
};

LinechartFragment.propTypes = propTypes;
LinechartFragment.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    specOptions: state.chartData.chartData.specOptions
  };
};

export default connect(mapStateToProps)(LinechartFragment);
