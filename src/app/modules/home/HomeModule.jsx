/* base */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

/* utils */
import * as actions from 'services/actions/general';

/* consts */
import initialState from '__consts__/InitialChartDataConst';
import initialPaneState from '__consts__/InitialPaneDataConst';
import paneTypes from '__consts__/PaneTypesConst';

/* components */
import NavPane from 'components/Panes/NavPane/NavPane';
import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';
import DataPaneContainer from 'components/Panes/DataPaneContainer/DataPaneContainer';
import VizPaneMediator from 'mediators/ComponentMediators/PaneMediators/VisPaneMediator/VizPaneMediator';
import VisualizerModuleMediator from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator';

const propTypes = {
  auth0Client: PropTypes.shape({}),
  dropDownData: PropTypes.shape({})
};

const defaultProps = {
  auth0Client: {},
  dropDownData: {}
};

export class HomeModule extends Component {
  state = {
    dialogOpen: true,
    dialogShown: 'false'
  };

  componentDidMount = () => {
    /* todo: the cookie logic is pretty rudimentary, suffices for now but should be optimised */
    const cookies = new Cookies();
    this.setState({ dialogShown: cookies.get('homeDialogShown') || 'false' });
    let d = new Date();
    d.setTime(d.getTime() + 1440 * 60 * 1000);
    cookies.set('homeDialogShown', 'true', { path: '/', expires: d });
  };

  componentWillUnmount() {
    // AAAND when this component unmounts we reset the chart and pane variables in redux

    this.props.dispatch(
      actions.storeChartDataRequest({
        ...initialState
      })
    );

    this.props.dispatch(
      actions.storePaneDataRequest({
        ...initialPaneState
      })
    );
  }

  render = () => {
    const paneContVis =
      this.props.dataPaneOpen === paneTypes.none ? 'none' : 'block';
    const explorePaneVis =
      this.props.dataPaneOpen === paneTypes.pubPane ? 'block' : 'none';

    return (
      <React.Fragment>
        {this.state.dialogShown === 'false' && (
          <BaseDialog open={this.state.dialogOpen} onClose={this.onClose} />
        )}
        <VisualizerModuleMediator
          home
          dropDownData={this.props.dropDownData}
          auth0Client={this.props.auth0Client}
        />
        <DataPaneContainer display={paneContVis}>
          <VizPaneMediator display={explorePaneVis} {...this.props} />
          {(this.props.dataPaneOpen === paneTypes.privPane ||
            this.props.dataPaneOpen === paneTypes.createChart ||
            this.props.dataPaneOpen === paneTypes.convertData) && (
            <NavPane auth0Client={this.props.auth0Client} />
          )}
        </DataPaneContainer>
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
