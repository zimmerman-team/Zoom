/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layer, Box, Button } from 'grommet';
import { FormClose } from 'grommet-icons';
import {
  aidsFondsRed,
  zoomFontFamOne,
  zoomFontFamTwo,
} from 'components/theme/ThemeSheet';

const ComponentBase = styled.div``;

const CloseIcon = styled(FormClose)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${aidsFondsRed};
  border-radius: 50%;
`;

const CloseButton = styled(Button)`
  padding: 0;
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamTwo};
  font-size: 14px;
`;
const propTypes = {
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func,
};
const defaultProps = {
  open: undefined,
};

class SideBar extends React.Component {
  state = {
    open: this.props.open,
  };

  onOpen = () => this.setState({ open: true });

  onClose = () => {
    this.setState({ open: undefined });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.open && (
          <Layer
            position="left"
            full="vertical"
            modal
            onClickOutside={this.props.toggleSideBar}
            onEsc={this.props.toggleSideBar}
          >
            <Box
              tag="form"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={this.onClose}
            >
              <Box
                flex={false}
                align="center"
                direction="row"
                justify="between"
              >
                <CloseButton
                  plain
                  icon={<CloseIcon color="white" />}
                  onClick={this.props.toggleSideBar}
                  label="Close"
                />
              </Box>
            </Box>
          </Layer>
        )}
      </React.Fragment>
    );
  }
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
