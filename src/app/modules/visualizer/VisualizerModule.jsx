/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* components */

import VizSidebar from 'modules/visualizer/sort/sidebar/VizSidebar';
import VizContainer from 'modules/visualizer/sort/container/VizContainer';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';

// import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';

const ModuleBase = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const propTypes = {
  // indicators: PropTypes.arrayOf(PropTypes.shape),
  loggedIn: PropTypes.bool,
  sideBarOpen: PropTypes.bool,
  dropDownData: PropTypes.shape({}),
  indicators: PropTypes.arrayOf(PropTypes.shape({})),
  dataPaneOpen: PropTypes.string,
  auth0Client: PropTypes.shape({}),
  chartKeys: PropTypes.arrayOf(PropTypes.string),
  chartType: PropTypes.string,
  publicPage: PropTypes.bool,
  moduleMode: PropTypes.string
};

const defaultProps = {
  indicators: [],
  publicPage: false,
  dataPaneOpen: 'visualizer',
  chartKeys: [],
  auth0Client: {},
  dropDownData: {},
  chartType: PropTypes.string,
  loggedIn: true
};

class BuilderModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
      sideBarOpen: false,
      indicators: []
    };

    this.onClose = this.onClose.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    this.setState({ sideBarOpen: true });
  };

  render() {
    return (
      <Router>
        <ModuleBase
          style={
            this.props.loading ? { pointerEvents: 'none', opacity: '0.4' } : {}
          }
        >
          {this.props.loading && <ProgressIcon />}
          {!this.props.publicPage && (
            <VizSidebar
              auth0Client={this.props.auth0Client}
              chartType={this.props.chartType}
              code={this.props.code}
              dropDownData={this.props.dropDownData}
              outerHistory={this.props.outerHistory}
              display={this.props.dataPaneOpen === paneTypes.visualizer}
            />
          )}
          <VizContainer
            chartKeys={this.props.chartKeys}
            publicPage={this.props.publicPage}
            chartType={this.props.chartType}
            outerHistory={this.props.outerHistory}
            indicators={this.props.indicators}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
          />
        </ModuleBase>
      </Router>
    );
  }
}
BuilderModule.propTypes = propTypes;
BuilderModule.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(BuilderModule);
