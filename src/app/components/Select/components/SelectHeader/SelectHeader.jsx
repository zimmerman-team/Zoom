import React from 'react';
import PropTypes from 'prop-types';
import {
  ComponentBase,
  LabelContainer,
  PointerContainer,
  Span
} from 'components/Select/components/SelectHeader/SelectHeader.styles';

import IconPointer from 'assets/icons/IconPointer';

const propTypes = {
  headerStyle: PropTypes.object,
  arrowMargins: PropTypes.string,
  capitalize: PropTypes.bool
};
const defaultProps = {
  headerStyle: {},
  arrowMargins: null,
  capitalize: false
};

const SelectHeader = props => (
  <ComponentBase
    data-name="selectHeader"
    // data-cy="select-header"
    style={props.headerStyle ? props.headerStyle : ''}
    onClick={props.onClick}
    capitalize={props.capitalize}
  >
    <input style={{ display: 'none' }} />
    <PointerContainer
      style={{ margin: props.arrowMargins ? props.arrowMargins : '' }}
    >
      <IconPointer />
    </PointerContainer>
    <LabelContainer>
      {props.label}
      {props.placeHolderNumber !== undefined ? (
        <Span> ({props.placeHolderNumber})</Span>
      ) : (
        ''
      )}
    </LabelContainer>
  </ComponentBase>
);

SelectHeader.propTypes = propTypes;
SelectHeader.defaultProps = defaultProps;

export default SelectHeader;
