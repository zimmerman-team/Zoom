/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layer, Box, Button, RoutedButton } from 'grommet';
import {
  aidsFondsRed,
  zoomFontFamOne,
  zoomFontFamTwo,
  zoomGreyOne,
  zoomGreyZero,
  zoomGreyTwo,
} from 'components/theme/ThemeSheet';

import IconHome from './icon_home.svg';
import IconCharts from './icon_charts.svg';
import IconClose from './icon_close.svg';
import IconAbout from './icon_about.svg';

const CloseButton = styled(Button)`
  padding: 0;
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamTwo};
  font-size: 14px;
`;

const SidebarNavListContainer = styled(Box)`
  background-color: ${zoomGreyZero};
  padding: 20px;
`;

const SidebarNavList = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SidebarNavListItem = styled(RoutedButton)`
  border: none;
  color: ${aidsFondsRed};
  border-radius: initial;
  font-family: ${zoomFontFamTwo};
  display: flex;
  padding-left: 0;
  padding-right: 0;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 16px;
  transition: opacity 200ms ease-out;

  &:last-child {
    margin-bottom: 0;
    opacity: 0.5;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const SideBarLayer = styled(Layer)`
  border-radius: 0;
`;

const SidebarHeader = styled(Box)`
  padding: 20px;
  padding-bottom: 8px;
  padding-top: 8px;
`;

const LoginContainer = styled(Box)`
  width: 100px;
  height: 100px;
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

  render() {
    return (
      <React.Fragment>
        {this.props.open && (
          <SideBarLayer
            position="left"
            full="vertical"
            modal
            onClickOutside={this.props.toggleSideBar}
            onEsc={this.props.toggleSideBar}
          >
            <Box fill="vertical" overflow="auto" width="320px">
              <SidebarHeader
                flex={false}
                align="center"
                direction="row"
                justify="between"
              >
                <CloseButton
                  plain
                  icon={<IconClose />}
                  onClick={this.props.toggleSideBar}
                  label="Close"
                />
              </SidebarHeader>

              <SidebarNavListContainer>
                <SidebarNavList>
                  <SidebarNavListItem
                    label="Home"
                    path={'/home'}
                    icon={<IconHome />}
                    onClick={this.props.toggleSideBar}
                    hoverIndicator={false}
                    type="button"
                    plain={true}
                  />

                  <SidebarNavListItem
                    label="Country Detail"
                    path={'/country'}
                    onClick={this.props.toggleSideBar}
                    icon={<IconCharts />}
                    type="button"
                    plain={true}
                  />

                  <SidebarNavListItem
                    label="IATI Detail"
                    path="/iati"
                    onClick={this.props.toggleSideBar}
                    icon={<IconCharts />}
                    type="button"
                    plain={true}
                  />

                  <SidebarNavListItem
                    disabled={true}
                    active={false}
                    label="About ZOOM"
                    path="/about"
                    onClick={this.props.toggleSideBar}
                    icon={<IconAbout />}
                    type="button"
                    plain={true}
                  />
                </SidebarNavList>
              </SidebarNavListContainer>
            </Box>
          </SideBarLayer>
        )}
      </React.Fragment>
    );
  }
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
