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
  PaneButContainer,
  PaneButtonTextVar,
  PaneButtonVar,
  PaneButtonText
} from 'components/AppBar/AppBar.styles';

/* icons */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconCloseSmall from 'assets/icons/IconCloseSmaller';
import SvgIconBack from 'assets/icons/IconBack';

/* actions */
import * as actions from 'services/actions/general';
import initialState from '__consts__/InitialChartDataConst';

const propTypes = {
  toggleSideBar: PropTypes.func
};
const defaultProps = {
  // toggleSideBar: undefined,
};

export class AppBar extends React.Component {
  constructor(props) {
    super(props);

    const yearRange = ''
      .concat(initialState.yearPeriod[0])
      .concat(',')
      .concat(initialState.yearPeriod[initialState.yearPeriod.length - 1]);

    this.state = {
      auth: true,
      anchorEl: null,
      paneButton: null
    };

    this.closeSave = this.closeSave.bind(this);
  }

  componentDidMount() {
    this.loadPaneButton();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.dataPaneOpen !== prevProps.dataPaneOpen
    ) {
      this.loadPaneButton();
    }
  }

  closeSave() {
    this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.none));
    this.props.history.push('/dashboard');
    console.log('chart saved!!');
  }

  loadPaneButton() {
    let paneButton = '';
    let buttonLabel = '';
    let paneType = 'none';

    if (this.props.auth0Client.isAuthenticated()) {
      if (this.props.dataPaneOpen === paneTypes.none) {
        if (this.props.location.pathname.indexOf('/home') !== -1) {
          paneType = paneTypes.privPane;
          buttonLabel = 'Create';
        } else if (this.props.location.pathname.indexOf('/visualizer') !== -1) {
          paneType = paneTypes.visualizer;
          buttonLabel = 'Show Filters';
        }
      } else {
        paneType = paneTypes.none;
        buttonLabel =
          this.props.location.pathname.indexOf('/visualizer') !== -1
            ? 'Hide Filters'
            : 'Close';
      }
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
        this.props.location.pathname === '/focus/NL' ||
        this.props.location.pathname === '/focus/nl' ||
        this.props.location.pathname === '/focus/KE' ||
        this.props.location.pathname === '/focus/ke' ||
        this.props.location.pathname === '/callback':
        paneButton = (
          <PaneButton
            data-cy="geomap-filter-button"
            onClick={() =>
              this.props.dispatch(actions.dataPaneToggleRequest(paneType))
            }
          >
            {paneIcon}
            <PaneButtonText data-cy="appbar-right-button">
              {buttonLabel}
            </PaneButtonText>
          </PaneButton>
        );
        break;
      case this.props.location.pathname.indexOf('/visualizer') !== -1:
        paneButton = (
          <PaneButContainer>
            <PaneButtonVar
              data-cy="geomap-close-save-button"
              onClick={() => this.closeSave()}
            >
              <PaneButtonTextVar data-cy="appbar-right-button">
                Close & Save
              </PaneButtonTextVar>
            </PaneButtonVar>
            <PaneButtonVar
              data-cy="geomap-filter-button"
              onClick={() =>
                this.props.dispatch(actions.dataPaneToggleRequest(paneType))
              }
            >
              <PaneButtonTextVar data-cy="appbar-right-button">
                {buttonLabel}
              </PaneButtonTextVar>
            </PaneButtonVar>
          </PaneButContainer>
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
            src="https://zoom.aidsfonds.nl/static/b459aca02fec5b684d4a8fb3fe7b44a6.svg"
          />
        </Box>

        {this.state.paneButton}
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
