/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* componenets */
import {ComponentBase, IconLabel} from './GridListOption.styles';

const propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string,
    visibility: PropTypes.string,
};
const defaultProps = {
    label: '',
    visibility: 'visible',
};

const GridListOption = props => {
  function handleClick(){
    console.log('Click!')
  }

  return (
    <ComponentBase visibility={props.visibility} onClick={() => {
      handleClick();
    }}>
        {props.icon}
        <IconLabel>{props.label}</IconLabel>
    </ComponentBase>);
};
GridListOption.propTypes = propTypes;
GridListOption.defaultProps = defaultProps;
export default GridListOption;
