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
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onFullScreen: PropTypes.func
};
const defaultProps = {
  onZoomIn: null,
  onZoomOut: null,
  onFullScreen: null
};

const MapControls = props => (
  <ComponentBase>
    <ButtonContainer onClick={props.onZoomIn}>
      <IconOnlyPlus />
    </ButtonContainer>
    <ButtonContainer onClick={props.onZoomOut}>
      <IconOnlyMinus />
    </ButtonContainer>
    {/*<ButtonContainer onClick={props.onFullScreen}>
      <IconOnlyFullScreen />
    </ButtonContainer>*/}
  </ComponentBase>
);

MapControls.propTypes = propTypes;
MapControls.defaultProps = defaultProps;

export default MapControls;
