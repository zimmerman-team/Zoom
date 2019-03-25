/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import ZoomButton from 'components/ZoomButton/ZoomButton';

const ComponentBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

const propTypes = {
  disableSave: PropTypes.bool
};
const defaultProps = {
  disableSave: true
};

const ButtonContainer = props => {
  return (
    <ComponentBase>
      <ZoomButton
        color={
          props.disableSave ? theme.color.zoomGreySix : theme.color.aidsFondsRed
        }
        width={160}
        fontSize={14}
      >
        save changes
      </ZoomButton>
      <ZoomButton
        width={160}
        fontSize={14}
        style={{ backgroundColor: '#ff8080' }}
      >
        remove profile
      </ZoomButton>
    </ComponentBase>
  );
};
ButtonContainer.propTypes = propTypes;
ButtonContainer.defaultProps = defaultProps;
export default ButtonContainer;
