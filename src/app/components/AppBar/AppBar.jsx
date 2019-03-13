/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Menu } from 'grommet-icons';
import theme from 'theme/Theme';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* utils */
import isEqual from 'lodash/isEqual';

/* components */
import {
  AidsFondLogo,
  MenuButton,
  ComponentBase,
  PaneButton,
  PaneButtonText
} from 'components/AppBar/AppBar.styles';

/* icons */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconCloseSmall from 'assets/icons/IconCloseSmaller';
import SvgIconBack from 'assets/icons/IconBack';

/* actions */
import * as actions from 'services/actions/general';

const propTypes = {
  toggleSideBar: PropTypes.func
};
const defaultProps = {
  // toggleSideBar: undefined,
};

export class AppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    paneButton: null
  };

  componentDidMount() {
    this.loadPaneButton();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.dataPaneOpen !== prevProps.dataPaneOpen
    ) {
      this.loadPaneButton();
    }
  }

  loadPaneButton() {
    let paneButton = '';
    let buttonLabel = '';
    let paneType = 'none';

    if (this.props.auth0Client.isAuthenticated()) {
      paneType =
        this.props.dataPaneOpen === paneTypes.none
          ? paneTypes.privPane
          : paneTypes.none;
      buttonLabel = paneType !== paneTypes.none ? 'Create' : 'Close';
    } else {
      paneType =
        this.props.dataPaneOpen === paneTypes.none
          ? paneTypes.pubPane
          : paneTypes.none;
      buttonLabel = paneType !== paneTypes.none ? 'Geo map filters' : 'Hide';
    }

    let paneIcon =
      paneType !== paneTypes.none ? <SvgIconPlus /> : <SvgIconCloseSmall />;

    // so this be some extra confusing logic for navpane
    if (
      this.props.dataPaneOpen === paneTypes.createChart ||
      this.props.dataPaneOpen === paneTypes.convertData
    ) {
      paneType = paneTypes.privPane;
      buttonLabel = 'back';
      paneIcon = <SvgIconBack />;
    }

    switch (true) {
      case this.props.location.pathname === '/home' ||
        this.props.location.pathname === '/callback':
        paneButton = (
          <PaneButton
            data-cy="geomap-filter-button"
            onClick={() =>
              this.props.dispatch(actions.dataPaneToggleRequest(paneType))
            }
          >
            {paneIcon}
            <PaneButtonText>{buttonLabel}</PaneButtonText>
          </PaneButton>
        );
        break;
      default:
        break;
    }

    this.setState({ paneButton });
  }

  render() {
    return (
      <ComponentBase
        elevation="small"
        direction="row"
        justify="between"
        align="center"
      >
        <Box direction="row" justify="center">
          <MenuButton
            plain
            icon={<Menu color={theme.color.aidsFondsRed} />}
            onClick={this.props.toggleSideBar}
            data-cy="sidebar-toggle"
          />
          <AidsFondLogo
            a11yTitle="Aidsfonds logo"
            fit="contain"
            alignSelf="center"
            src="https://aidsfonds.nl/Assets/images/aidsfonds_logo_red.png"
          />
        </Box>

        {this.state.paneButton}

        <Box direction="row">{/*<div>button</div>*/}</Box>
      </ComponentBase>
    );
  }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(withRouter(AppBar));
