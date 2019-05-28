/* base */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* utils */
import * as actions from 'services/actions/general';

/* consts */
import initialState from '__consts__/InitialChartDataConst';
import initialPaneState from '__consts__/InitialPaneDataConst';
import paneTypes from '__consts__/PaneTypesConst';

/* components */
import NavPane from 'components/Panes/NavPane/NavPane';
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
