/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* mock */
// import { LinechartMockData } from './LinechartMockData';

/* components */
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import CustomYearSelector from 'components/CustomYearSelector/CustomYearSelector';
import LineChart from 'components/charts/recharts_linechart/LineChart';

/* styles */
import { LineYearContainer } from 'modules/visualizer/sort/container/VizContainer.style';
/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  ),
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
  indicators: [],
  indicatorData: []
};

const LinechartFragment = props => {
  return (
    <ComponentBase>
      <Box>
        <LineChart
          indicators={props.indicators}
          data={props.indicatorData}
          xAxisKey="geolocation"
        />
      </Box>
      <ChartLegends data={props.indicators} />
      <LineYearContainer>
        <CustomYearSelector
          selectedYear={props.selectedYear}
          selectYear={props.selectYear}
        />
      </LineYearContainer>
    </ComponentBase>
  );
};

LinechartFragment.propTypes = propTypes;
LinechartFragment.defaultProps = defaultProps;

export default LinechartFragment;
