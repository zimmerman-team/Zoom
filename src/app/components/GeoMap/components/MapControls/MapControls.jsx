/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* icons */
import IconOnlyPlus from 'assets/icons/IconOnlyPlus';
import IconOnlyMinus from 'assets/icons/IconOnlyMinus';
import IconOnlyFullScreen from 'assets/icons/IconOnlyFullScreen';

/* styles */
import { ComponentBase, ButtonContainer } from './MapControls.style';

const propTypes = {
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  fullScreen: PropTypes.func
};
const defaultProps = {
  zoomIn: null,
  zoomOut: null,
  fullScreen: null
};

const MapControls = props => (
  <ComponentBase>
    <ButtonContainer onClick={props.zoomIn}>
      <IconOnlyPlus />
    </ButtonContainer>
    <ButtonContainer onClick={props.zoomOut}>
      <IconOnlyMinus />
    </ButtonContainer>
    <ButtonContainer onClick={props.fullScreen}>
      <IconOnlyFullScreen />
    </ButtonContainer>
  </ComponentBase>
);

MapControls.propTypes = propTypes;
MapControls.defaultProps = defaultProps;

export default MapControls;
