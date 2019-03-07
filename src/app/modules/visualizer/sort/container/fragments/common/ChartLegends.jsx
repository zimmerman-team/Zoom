/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import ChartLegendItem from 'modules/visualizer/sort/container/fragments/common/ChartLegendItem';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  height: 80px;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const propTypes = {};
const defaultProps = {};

const ChartLegends = () => {
  return (
    <ComponentBase>
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
      <ChartLegendItem />
    </ComponentBase>
  );
};

ChartLegends.propTypes = propTypes;
ChartLegends.defaultProps = defaultProps;

export default ChartLegends;
