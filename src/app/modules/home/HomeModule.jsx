/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Theme from 'theme/Theme';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';

import { Helmet } from 'react-helmet';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* components */
import GeoMap from 'components/GeoMap/GeoMap';
import { ModuleContainer } from 'modules/home/HomeModule.styles';
import ExplorePanelMediator from 'mediators/ComponentMediators/PaneMediators/ExplorePanelMediator/ExplorePanelMediator';
import DataPaneContainer from 'components/Panes/DataPaneContainer/DataPaneContainer';
import NavPane from 'components/Panes/NavPane/NavPane';
import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';
import CustomYearSelector from 'components/CustomYearSelector/CustomYearSelector';
import { YearContainer } from '../../components/CustomYearSelector/CustomYearSelector.style';

const propTypes = {
  loading: PropTypes.bool,
  indicators: PropTypes.arrayOf(PropTypes.shape)
};

const defaultProps = {
  loading: false,
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

    const paneContVis =
      this.props.dataPaneOpen === paneTypes.none ? 'none' : 'block';
    const explorePaneVis =
      this.props.dataPaneOpen === paneTypes.pubPane ? 'block' : 'none';

    return (
      <React.Fragment>
        <Helmet>
          <title>Zoom - Home</title>
        </Helmet>
        <ModuleContainer
          style={
            //todo: without nesting..
            this.props.loading
              ? { pointerEvents: 'none', opacity: '0.4' }
              : {} && this.props.dataPaneOpen !== paneTypes.none
              ? { width: 'calc(100vw - 320px)' }
              : { width: '100vw' }
          }
          display={this.props.dataPaneOpen === paneTypes.visualizer}
        >
          {this.props.loading && <ProgressIcon />}

          {this.state.dialogShown === 'false' && (
            <BaseDialog open={this.state.dialogOpen} onClose={this.onClose} />
          )}

          <GeoMap
            outerHistory={this.props.history}
            indicatorData={indicators}
            selectedYear={this.props.selectedYear}
            selectYear={this.props.selectYear}
            latitude={15}
            longitude={0}
            zoom={2}
          />

          <YearContainer
            style={
              this.props.disableYear
                ? { pointerEvents: 'none', opacity: '0.4' }
                : {}
            }
          >
            <CustomYearSelector
              backgroundColor={Theme.color.aidsFondsWhiteOpacity}
              selectedYear={this.props.selectedYear}
              selectYear={this.props.selectYear}
            />
          </YearContainer>

          <DataPaneContainer display={paneContVis}>
            <ExplorePanelMediator display={explorePaneVis} {...otherProps} />
            {(this.props.dataPaneOpen === paneTypes.privPane ||
              this.props.dataPaneOpen === paneTypes.createChart ||
              this.props.dataPaneOpen === paneTypes.convertData) && <NavPane />}
          </DataPaneContainer>
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

export default withRouter(connect(mapStateToProps)(HomeModule));
