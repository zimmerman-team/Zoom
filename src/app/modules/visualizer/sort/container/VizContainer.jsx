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
import CustomYearSelector from 'components/GeoMap/GeoMap';
import { YearContainer } from 'components/CustomYearSelector/CustomYearSelector.style';

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
  chartType: PropTypes.string,
  publicPage: PropTypes.bool,
  mode: PropTypes.bool
};
const defaultProps = {
  chartType: 'geomap',
  publicPage: false,
  mode: location.pathname.includes('preview')
};

class VizContainer extends React.Component {
  state = {
    preview: this.props.mode
  };

  componentDidMount() {
    // need an initial set here, because those default props, don't actually set
    // the state correctly
    this.setState({ preview: location.pathname.includes('preview') });

    this.props.history.listen((location, action) => {
      const mode = location.pathname.includes('preview');
      this.setState({ preview: mode });
    });
  }

  render() {
    return (
      <ComponentBase
        mode={
          this.state.preview || this.props.publicPage ? 'initial' : 'center'
        }
      >
        <PreviewTextContainer
          mode={this.state.preview || this.props.publicPage ? 'flex' : 'none'}
        >
          <ContextPreview
            createdDate={this.props.chartData.createdDate}
            authorName={this.props.chartData.authorName}
            title={this.props.chartData.name}
            desc={this.props.chartData.desc}
            descIntro={this.props.chartData.descIntro}
            show={'descIntro'}
          />
        </PreviewTextContainer>

        <React.Fragment>
          <PropsRoute
            chartType={this.props.chartType}
            outerHistory={this.props.outerHistory}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.indicators}
            path="/(visualizer|public)/(geomap|focusKE|focusNL)/:code/:tab"
            component={GeomapFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            chartType={this.props.chartType}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.indicators}
            path="/(visualizer|public)/linechart/:code/:tab"
            component={LinechartFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            chartType={this.props.chartType}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.indicators}
            path="/(visualizer|public)/barchart/:code/:tab"
            component={BarchartFragment}
            mode={this.state.preview}
          />
        </React.Fragment>
        <PreviewTextContainer mode={this.state.preview ? 'flex' : 'none'}>
          <ContextPreview
            createdDate={this.props.chartData.createdDate}
            authorName={this.props.chartData.authorName}
            title={this.props.chartData.name}
            desc={this.props.chartData.desc}
            descIntro={this.props.chartData.descIntro}
            show={'descBody'}
          />
        </PreviewTextContainer>
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
