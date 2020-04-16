/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* icons */
import IconOnlyPlus from 'app/assets/icons/IconOnlyPlus';
import IconOnlyMinus from 'app/assets/icons/IconOnlyMinus';
import IconOnlyFullScreen from 'app/assets/icons/IconOnlyFullScreen';
/* styles */
import { ButtonContainer, ComponentBase } from './MapControls.style';

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
    <ButtonContainer onClick={props.onZoomIn} data-cy="home-zoom-out-button">
      <IconOnlyPlus />
    </ButtonContainer>
    <ButtonContainer onClick={props.onZoomOut} data-cy="home-zoom-in-button">
      <IconOnlyMinus />
    </ButtonContainer>
    {/*<DisabledElement>*/}
    <ButtonContainer
      onClick={props.onFullScreen}
      data-cy="home-fullscreen-button"
    >
      <IconOnlyFullScreen />
    </ButtonContainer>
    {/* <div>
      <input
        type="number"
        onChange={props.setClusterRadius}
        value={props.clusterRadius}
        style={{ width: 32 }}
      />
    </div> */}
    {/*</DisabledElement>*/}
  </ComponentBase>
);

MapControls.propTypes = propTypes;
MapControls.defaultProps = defaultProps;

export default MapControls;
