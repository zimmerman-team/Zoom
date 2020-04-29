/* base */
import React from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { Route, withRouter } from "react-router";
/* consts */
import graphKeys from "app/__consts__/GraphStructKeyConst";
import chartTypes from "app/__consts__/ChartConst";

import ContextPreview from "app/components/ContextPreview/ContextPreview";
import BarchartFragment from "app/modules/visualizer/sort/container/fragments/BarchartFragment/BarchartFragment";
import GeomapFragment from "app/modules/visualizer/sort/container/fragments/GeomapFragment/GeomapFragment";

import LinechartFragment from "app/modules/visualizer/sort/container/fragments/LinechartFragment/LinechartFragment";
import TablechartFragment from "app/modules/visualizer/sort/container/fragments/TablechartFragment/TablechartFragment";
import DonutchartFragment from "app/modules/visualizer/sort/container/fragments/DonutchartFragment/DonutchartFragment";
import { ComponentBase, PreviewTextContainer } from "./VizContainer.style";
import CustomYearSelector from "../../../../components/CustomYearSelector/CustomYearSelector";
import { YearContainer } from "../../../../components/CustomYearSelector/CustomYearSelector.style";

import YearRangeSelector from "app/components/YearRangeSelector/YearRangeSelector";
import { aggrOptions } from "app/__consts__/GraphStructOptionConsts";

/* style */
import theme from "app/theme/Theme";
import initialState from "app/__consts__/InitialChartDataConst";

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
      render={(routeProps) => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const propTypes = {
  chartType: PropTypes.string,
  publicPage: PropTypes.bool,
  chartKeys: PropTypes.array,
  saveViewport: PropTypes.func,
  home: PropTypes.bool,
  mode: PropTypes.bool,
  chartData: PropTypes.shape({}),
  context: PropTypes.bool,
};
const defaultProps = {
  chartType: "geomap",
  publicPage: false,
  chartKeys: [],
  saveViewport: null,
  home: false,
  chartData: initialState,
  mode: window.location.pathname.includes("preview"),
  context: window.location.pathname.includes("context"),
};

class VizContainer extends React.Component {
  state = {
    preview: this.props.mode,
  };

  componentDidMount() {
    // need an initial set here, because those default props, don't actually set
    // the state correctly
    this.setState({
      preview: window.location.pathname.includes("preview"),
      context: window.location.pathname.includes("context"),
    });

    this.props.history.listen((location, action) => {
      const mode = location.pathname.includes("preview");
      const context = location.pathname.includes("context");
      if (this.state.preview !== mode || this.state.context !== context) {
        this.setState({ preview: mode, context });
      }
    });
  }

  render() {
    const isGeoChart =
      this.props.chartType === chartTypes.geoMap ||
      this.props.chartType === chartTypes.focusKE ||
      this.props.chartType === chartTypes.focusNL;

    const geoChartPath = this.props.home
      ? "/home"
      : "/(visualizer|public)/(geomap|focusKE|focusNL)/:code/:tab";

    return (
      <ComponentBase
        id="viz-container"
        mode={
          this.state.preview || this.props.publicPage ? "initial" : "center"
        }
        style={{
          width:
            !this.state.context && !this.state.preview && this.props.display
              ? "calc(100vw - 320px)"
              : "100vw",
        }}
      >
        <PreviewTextContainer
          mode={this.state.preview || this.props.publicPage ? "flex" : "none"}
        >
          <ContextPreview
            createdDate={this.props.chartData.createdDate}
            authorName={this.props.chartData.authorName}
            title={this.props.chartData.name}
            desc={this.props.chartData.desc}
            descIntro={this.props.chartData.descIntro}
            show="descIntro"
          />
        </PreviewTextContainer>

        <React.Fragment>
          <PropsRoute
            chartType={this.props.chartType}
            outerHistory={this.props.outerHistory}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.data}
            saveViewport={this.props.saveViewport}
            path={geoChartPath}
            component={GeomapFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            chartType={this.props.chartType}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.data}
            chartKeys={this.props.chartKeys}
            path="/(visualizer|public)/linechart/:code/:tab"
            component={LinechartFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            chartType={this.props.chartType}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.data}
            chartKeys={this.props.chartKeys}
            path="/(visualizer|public)/barchart/:code/:tab"
            component={BarchartFragment}
            mode={this.state.preview}
          />
          <PropsRoute
            chartType={this.props.chartType}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.data}
            chartKeys={this.props.chartKeys}
            path="/(visualizer|public)/tablechart/:code/:tab"
            component={TablechartFragment}
            mode={this.state.preview}
          />

          <PropsRoute
            chartType={this.props.chartType}
            selectYear={this.props.selectYear}
            selectedYear={this.props.selectedYear}
            indicatorData={this.props.data}
            chartKeys={this.props.chartKeys}
            path="/(visualizer|public)/donutchart/:code/:tab"
            component={DonutchartFragment}
            mode={this.state.preview}
          />

          {/*So for the geocharts we load the this component inside the
            fragment for the fullscreen to work properly*/}
          {!isGeoChart && !this.props.home && (
            <YearContainer
              bottom="24px"
              backgroundColor={theme.color.aidsFondsGreyOpacity}
              css={`
                display: flex;
                justify-content: center;
              `}
            >
              {/* so the second item in the aggrOptions array is the year aggregation option*/}
              {this.props.chartData.specOptions[graphKeys.aggregate] ===
              aggrOptions[1].value ? (
                <YearRangeSelector
                  selectYearRange={this.props.selectYearRange}
                  selectedYears={this.props.chartData.selectedYears}
                />
              ) : (
                <CustomYearSelector
                  selectedYear={this.props.selectedYear}
                  selectYear={this.props.selectYear}
                />
              )}
            </YearContainer>
          )}
        </React.Fragment>
        <PreviewTextContainer mode={this.state.preview ? "flex" : "none"}>
          <ContextPreview
            createdDate={this.props.chartData.createdDate}
            authorName={this.props.chartData.authorName}
            title={this.props.chartData.name}
            desc={this.props.chartData.desc}
            descIntro={this.props.chartData.descIntro}
            show="descBody"
          />
        </PreviewTextContainer>
      </ComponentBase>
    );
  }
}

VizContainer.propTypes = propTypes;
VizContainer.defaultProps = defaultProps;

export default withRouter(VizContainer);
