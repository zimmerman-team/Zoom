/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 1024px;
  height: 798px;
  outline: 1px solid red;
`;

const propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishDate: PropTypes.string,
};
const defaultProps = {
  title: 'Untitled chart 01',
  author: 'Jane Doe',
  publishDate: 'January 12th 2019',
};

const ContextEditor = props => {
  return <ComponentBase />;
};

ContextEditor.propTypes = propTypes;
ContextEditor.defaultProps = defaultProps;

export default ContextEditor;
