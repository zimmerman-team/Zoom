/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* components */
import GeoMap from 'components/GeoMap/GeoMap';
import { ModuleContainer } from 'modules/home/HomeModule.styles';
import ExplorePanelMediator from 'mediators/ComponentMediators/PaneMediators/ExplorePanelMediator/ExplorePanelMediator';
import DataPaneContainer from 'components/Panes/DataPaneContainer/DataPaneContainer';
import NavPane from 'components/Panes/NavPane/NavPane';
import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';

const propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.shape)
};

const defaultProps = {
  indicators: []
};

export class HomeModule extends Component {
  state = {
    dialogOpen: true,
    sideBarOpen: false,
    indicators: [],
    dialogShown: 'false'
  };

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    this.setState({ sideBarOpen: true });
  };

  componentDidMount = () => {
    /* todo: the cookie logic is pretty rudimentary, suffices for now but should be optimised */
    const cookies = new Cookies();
    this.setState({ dialogShown: cookies.get('homeDialogShown') || 'false' });
    let d = new Date();
    d.setTime(d.getTime() + 1440 * 60 * 1000);
    cookies.set('homeDialogShown', 'true', { path: '/', expires: d });
  };

  render = () => {
    const { indicators, ...otherProps } = this.props;

    return (
      <React.Fragment>
        <ModuleContainer>
          {this.state.dialogShown === 'false' && (
            <BaseDialog open={this.state.dialogOpen} onClose={this.onClose} />
          )}

          <GeoMap
            indicatorData={indicators}
            selectedYears={this.props.yearPeriod}
            selectYear={this.props.selectYear}
            latitude={15}
            longitude={0}
            zoom={2}
          />

          {this.props.dataPaneOpen !== paneTypes.none && (
            <DataPaneContainer>
              {this.props.dataPaneOpen === paneTypes.pubPane && (
                <ExplorePanelMediator {...otherProps} />
              )}
              {(this.props.dataPaneOpen === paneTypes.privPane ||
                this.props.dataPaneOpen === paneTypes.createChart ||
                this.props.dataPaneOpen === paneTypes.convertData) && (
                <NavPane {...otherProps} />
              )}
            </DataPaneContainer>
          )}
        </ModuleContainer>
      </React.Fragment>
    );
  };
}
HomeModule.propTypes = propTypes;
HomeModule.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(HomeModule);
