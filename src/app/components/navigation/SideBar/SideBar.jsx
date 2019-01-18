/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
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
import {
  CloseButton,
  SidebarHeader,
  SideBarLayer,
  SidebarNavList,
  SidebarNavListContainer,
  SidebarNavListItem,
} from 'components/navigation/SideBar/SideBar.styles';

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
                    data-cy="sidebar-country"
                  />

                  <SidebarNavListItem
                    label="IATI Detail"
                    path="/iati"
                    onClick={this.props.toggleSideBar}
                    icon={<IconCharts />}
                    type="button"
                    plain={true}
                    data-cy="sidebar-iati"
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
