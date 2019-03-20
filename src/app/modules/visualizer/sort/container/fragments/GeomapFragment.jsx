/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { matchPath } from 'react-router';

import GeoMap from 'components/GeoMap/GeoMap';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 100%;
  background-color: #96dbfa;
  height: ${props => props.height};
`;

const propTypes = {};
const defaultProps = {};

const GeomapFragment = props => {
  return (
    <ComponentBase height={props.mode ? '400px' : '100%'}>
      <GeoMap />
    </ComponentBase>
  );
};

GeomapFragment.propTypes = propTypes;
GeomapFragment.defaultProps = defaultProps;

export default GeomapFragment;
