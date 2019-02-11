/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Menu } from 'grommet-icons';
import theme from 'theme/Theme';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* Components */
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

/* actions */
import * as actions from 'services/actions/general';

const propTypes = {
  toggleSideBar: PropTypes.func
};
const defaultProps = {
  // toggleSideBar: undefined,
};

class AppBar extends React.Component {
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
    switch (this.props.location.pathname) {
      case '/home':
        paneButton = (
          <PaneButton
            onClick={() =>
              this.props.dispatch(
                actions.dataPaneToggleRequest(!this.props.dataPaneOpen)
              )
            }
          >
            {!this.props.dataPaneOpen ? <SvgIconPlus /> : <SvgIconCloseSmall />}
            <PaneButtonText>
              {!this.props.dataPaneOpen ? 'Geo map filters' : 'Close & save '}
            </PaneButtonText>
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
