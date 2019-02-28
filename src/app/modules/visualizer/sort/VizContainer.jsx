/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import GeoMap from 'components/GeoMap/GeoMap';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  background-color: #96dbfa;
  width: 100%;
  height: calc(100vh - 40px);
`;

const propTypes = {};
const defaultProps = {};

const VizContainer = props => {
  return (
    <ComponentBase>
      <GeoMap
        indicatorData={props.indicators}
        selectedYears={props.yearPeriod}
        selectYear={props.selectYear}
        latitude={52.1326}
        longitude={5.2913}
        zoom={7}
      />
    </ComponentBase>
  );
};

VizContainer.propTypes = propTypes;
VizContainer.defaultProps = defaultProps;

export default VizContainer;
