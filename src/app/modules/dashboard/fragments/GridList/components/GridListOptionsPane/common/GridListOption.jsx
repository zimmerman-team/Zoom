/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* componenets */
import { ComponentBase, IconLabel } from './GridListOption.styles';

const propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  visibility: PropTypes.string,
  isRemoveButton: PropTypes.bool
};
const defaultProps = {
  label: '',
  visibility: 'visible'
};

const RemoveButton = styled.div`
  width: 160px;
  height: 30px;
  border-radius: 15px;
  background-color: ${theme.color.aidsFondsRed};
`;

const GridListOption = props => {
  function handleClick() {
    console.log('Click!');
  }

  return (
    <ComponentBase visibility={props.visibility} onClick={() => handleClick}>
      {props.icon}
      <IconLabel>{props.label}</IconLabel>
      <RemoveButton>remove indefinite</RemoveButton>
    </ComponentBase>
  );
};
GridListOption.propTypes = propTypes;
GridListOption.defaultProps = defaultProps;
export default GridListOption;
