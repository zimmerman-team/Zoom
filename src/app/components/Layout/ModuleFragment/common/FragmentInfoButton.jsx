/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: darkgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.aidsFondsRed};
  }

  &:after {
    content: 'i';
    font-size: 13px;
    text-align: center;
    color: ${theme.color.aidsFondsWhite};
    font-family: ${theme.color.zoomFontFamOne};
    user-select: none;
  }
`;

const propTypes = {};
const defaultProps = {};

const FragmentInfoButton = () => {
  return <ComponentBase />;
};

FragmentInfoButton.propTypes = propTypes;
FragmentInfoButton.defaultProps = defaultProps;

export default FragmentInfoButton;
