/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Layer } from 'grommet';
import {
  DialogHeading,
  ZoomButton,
  Basictext,
  aidsFondsWhite,
} from '../../Theme/ThemeSheet';

const DialogLayer = styled(Layer)`
  width: 840px;
  height: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  background-color: ${aidsFondsWhite};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const propTypes = {
  onClose: PropTypes.func,
};
const defaultProps = {
  onClose: () => {
    console.log('joehoe');
  },
};

const Dialog = ({ onClose }) => (
  <DialogLayer plain position="top" onClickOutside={onClose}>
    <Box align="center" justify="center" direction="column" gap="medium">
      <DialogHeading>Explore global data on HIV/AIDS</DialogHeading>
      <Basictext alignSelf="center" textAlign="center">
        Start exploring the map by selecting indicators
      </Basictext>
      <ZoomButton
        plain
        label="start exploring"
        focusIndicator={false}
        onClick={onClose}
      />
    </Box>
  </DialogLayer>
);

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;
