/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
/* consts */
import paneTypes from '__consts__/PaneTypesConst';
import initialState from '__consts__/InitialChartDataConst';
/* components */
import VizSidebar from 'modules/visualizer/sort/sidebar/VizSidebar';
import VizContainer from 'modules/visualizer/sort/container/VizContainer';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';

/* utils */
import { formatWindowTitle } from './VisualizerModule.utils';
// import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';

const ModuleBase = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

const propTypes = {
  data: PropTypes.any,
  loggedIn: PropTypes.bool,
  sideBarOpen: PropTypes.bool,
  dropDownData: PropTypes.shape({}),
  dataPaneOpen: PropTypes.string,
  auth0Client: PropTypes.shape({}),
  chartKeys: PropTypes.array,
  selectYearRange: PropTypes.func,
  chartType: PropTypes.string,
  chartTitle: PropTypes.string,
  publicPage: PropTypes.bool,
  saveViewport: PropTypes.func,
  chartData: PropTypes.shape({}),
  home: PropTypes.bool,
  moduleMode: PropTypes.string
};

const defaultProps = {
  data: [],
  publicPage: false,
  chartData: initialState,
  dataPaneOpen: 'visualizer',
  chartKeys: [],
  auth0Client: {},
  selectYearRange: null,
  dropDownData: {},
  chartType: 'geomap',
  chartTitle: '',
  saveViewport: null,
  home: false,
  loggedIn: true
};

class BuilderModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
      sideBarOpen: false,
      data: []
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

  renderWindowTitle = (chartType, pathname) => {
    return (
      <Helmet>
        {pathname.includes('vizID') || this.props.home ? (
          <title>{formatWindowTitle(chartType, this.props.home)}</title>
        ) : (
          <title>{this.props.chartTitle}</title>
        )}
      </Helmet>
    );
  };

  render() {
    return (
      <Router>
        <ModuleBase
          id="home-geomap"
          style={
            this.props.loading ? { pointerEvents: 'none', opacity: '0.4' } : {}
          }
        >
          {this.props.loading && <ProgressIcon />}

          {this.renderWindowTitle(
            this.props.chartType,
            this.props.outerHistory.location.pathname
          )}

          <VizContainer
            chartData={this.props.chartData}
            home={this.props.home}
            saveViewport={this.props.saveViewport}
            chartKeys={this.props.chartKeys}
            publicPage={this.props.publicPage}
            chartType={this.props.chartType}
            outerHistory={this.props.outerHistory}
            data={this.props.data}
            selectYearRange={this.props.selectYearRange}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            display={
              this.props.dataPaneOpen === paneTypes.visualizer ||
              (this.props.home && this.props.dataPaneOpen !== paneTypes.none)
            }
          />

          {!this.props.publicPage && !this.props.home && (
            <VizSidebar
              auth0Client={this.props.auth0Client}
              chartType={this.props.chartType}
              code={this.props.code}
              dropDownData={this.props.dropDownData}
              chartTitle={this.props.chartTitle}
              outerHistory={this.props.outerHistory}
              /* todo: convoluted logic, refactor */
              display={this.props.dataPaneOpen === paneTypes.visualizer}
            />
          )}
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
