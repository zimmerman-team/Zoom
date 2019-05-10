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
  height: max-content;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  )
};

const defaultProps = {
  data: []
};

const ChartLegends = props => {
  return (
    <ComponentBase>
      {props.data.map(indicator => {
        return (
          indicator.label &&
          (
            <ChartLegendItem
              color={indicator.color}
              text={indicator.label}
              data-cy={console.log(indicator.name)}
            />
          )
        );
      })}
    </ComponentBase>
  );
};

ChartLegends.propTypes = propTypes;
ChartLegends.defaultProps = defaultProps;

export default ChartLegends;
