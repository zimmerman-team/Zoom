/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div``;

const propTypes = {};
const defaultProps = {};

const ErrorBoundaryFallback = ({ componentStack, error }) => {
  return (
    <ComponentBase>
      <p>
        <strong>Oops! An error occured!</strong>
      </p>
      <p>Here’s what we know…</p>
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
      <p>
        <strong>Stacktrace:</strong> {componentStack}
      </p>
    </ComponentBase>
  );
};

ErrorBoundaryFallback.propTypes = propTypes;
ErrorBoundaryFallback.defaultProps = defaultProps;

export default ErrorBoundaryFallback;
