/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Layer } from 'grommet';
import {
  DialogHeading,
  SimpleText,
  ZoomButton,
} from 'components/theme/ThemeSheet';
import theme from 'theme/Theme';

const DialogLayer = styled(Layer)`
  width: 840px;
  height: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  background-color: ${theme.color.aidsFondsWhite};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
};
const defaultProps = {
  open: true,
  title: 'Explore global data on HIV/AIDS',
  message: 'Start exploring the map by selecting indicators',
  buttonText: 'start exploring',
  buttonEnabled: true,
  onClose: undefined,
};

class BaseDialog extends Component {
  state = {
    open: this.props.open,
  };

  onClose = () => {
    this.setState({ open: undefined });
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.open && (
          <DialogLayer
            plain
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box
              align="center"
              justify="center"
              direction="column"
              gap="medium"
            >
              <DialogHeading>{this.props.title}</DialogHeading>
              <SimpleText alignSelf="center" textAlign="center">
                {this.props.message}
              </SimpleText>
              {this.props.buttonEnabled && (
                <ZoomButton
                  plain
                  label={this.props.buttonText}
                  focusIndicator={false}
                  onClick={this.onClose}
                />
              )}
            </Box>
          </DialogLayer>
        )}
      </React.Fragment>
    );
  }
}

BaseDialog.propTypes = propTypes;
BaseDialog.defaultProps = defaultProps;

export default BaseDialog;
