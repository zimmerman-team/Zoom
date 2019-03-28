/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Route, withRouter } from 'react-router';

import ContextPreview from 'components/chartcontext/ContextPreview/ContextPreview';
import BarchartFragment from 'modules/visualizer/sort/container/fragments/BarchartFragment';
import GeomapFragment from 'modules/visualizer/sort/container/fragments/GeomapFragment';

import LinechartFragment from 'modules/visualizer/sort/container/fragments/LinechartFragment';
import { PreviewTextContainer, ComponentBase, Box } from './VizContainer.style';
import VisualizerModule from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const propTypes = {
  type: PropTypes.string,
  mode: PropTypes.bool
};
const defaultProps = {
  type: 'geomap',
  mode: location.pathname.includes('preview')
};

class VizContainer extends React.Component {
  state = {
    preview: this.props.mode
  };

  componentDidMount() {
    this.props.history.listen((location, action) => {
      const mode = location.pathname.includes('preview');
      this.setState({ preview: mode });
    });
  }

  render() {
    return (
      <ComponentBase mode={this.state.preview ? 'initial' : 'center'}>
        <PreviewTextContainer mode={this.state.preview ? 'flex' : 'none'}>
          <ContextPreview
            createdDate={this.props.chartData.createdDate}
            authorName={this.props.chartData.authorName}
            title={this.props.chartData.name}
            desc={this.props.chartData.desc}
          />
        </PreviewTextContainer>

        <React.Fragment>
          <PropsRoute
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.indicators}
            path="/visualizer/geomap/:code/:tab"
            component={GeomapFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            indicatorData={this.props.indicators}
            path="/visualizer/linechart/:code/:tab"
            component={LinechartFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            indicatorData={this.props.indicators}
            path="/visualizer/barchart/:code/:tab"
            component={BarchartFragment}
            mode={this.state.preview}
          />
        </React.Fragment>
      </ComponentBase>
    );
  }
}

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData
  };
};

VizContainer.propTypes = propTypes;
VizContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(withRouter(VizContainer));
