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
  fullScreen: PropTypes.func,
};
const defaultProps = {
  zoomIn: null,
  zoomOut: null,
  fullScreen: null,
};

const MapControls = props => (
  <ComponentBase>
    <ButtonContainer onClick={props.zoomIn} data-cy="home-zoom-out-button">
      <IconOnlyPlus />
    </ButtonContainer>
    <ButtonContainer onClick={props.zoomOut} data-cy="home-zoom-in-button">
      <IconOnlyMinus />
    </ButtonContainer>
    <ButtonContainer onClick={props.fullScreen} data-cy="home-fullscreen-button">
      <IconOnlyFullScreen />
    </ButtonContainer>
  </ComponentBase>
);

MapControls.propTypes = propTypes;
MapControls.defaultProps = defaultProps;

export default MapControls;
