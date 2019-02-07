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
  outline: 1px solid ${theme.color.aidsFondsRed};

  height: 300px;
  width: 500px;
`;

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

class TextEditor extends React.Component {
  state = {};

  render() {
    return <ComponentBase />;
  }
}

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

export default TextEditor;
