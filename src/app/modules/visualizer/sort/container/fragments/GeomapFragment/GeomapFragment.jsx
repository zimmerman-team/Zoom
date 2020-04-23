// @ts-nocheck
/* eslint-disable */

/* base */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import GeoMap from "app/components/GeoMap/GeoMap";
/* utils */
import { getFocus } from "app/modules/visualizer/VisualizerModule.utils";

const ComponentBase = styled.div`
  width: 100%;
  height: ${props => props.height};
  z-index: 0;
`;

const propTypes = {
  saveViewport: PropTypes.func,
  selectedYear: PropTypes.string,
  selectYear: PropTypes.func
};
const defaultProps = {
  selectedYear: "2005",
  selectYear: null,
  saveViewport: null
};

class GeomapFragment extends React.Component {
  state = {
    zoom: 1,
    longitude: 0,
    latitude: 15
  };

  componentWillMount = () => {
    /* bounds are made with http://boundingbox.klokantech.com/ */
    /* we can also use a generalized list of country bounds, the problem with those bounds is that they're too narrow, which in turns causes problems when zooming in/out*/
    /* a possible solution could also be to device a way of dynamically calculating optimal bounds */
    const isNL = location.pathname.includes("NL");
    const isKE = location.pathname.includes("KE");
    const boundsNL = [
      [0.2252, 50.2378],
      [10.756, 54.2068]
    ];
    const boundsKE = [
      [26.82, -7.15],
      [50.89, 7.57]
    ];

    if (isNL) {
      this.setState({
        latitude: 52.1326,
        longitude: 5.2913,
        zoom: 7,
        bounds: boundsNL
      });
    } else if (isKE) {
      this.setState({
        latitude: 0.0236,
        longitude: 37.9062,
        zoom: 6,
        bounds: boundsKE
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.chartType !== prevProps.chartType) {
      this.setState({
        /* morty, i don't know bout this solution */
        focus: getFocus(this.props.chartType)
      });
    }
  }

  render() {
    const { mode, ...otherProps } = this.props;
    return (
      <ComponentBase height={mode ? "400px" : "100%"} id="geo-map">
        <GeoMap
          chartMounted={this.props.chartMounted}
          viewport={this.props.viewport}
          saveViewport={this.props.saveViewport}
          focus={this.state.focus && this.state.focus}
          {...otherProps}
          mapOptions={{ maxBounds: this.state.bounds }}
        />
      </ComponentBase>
    );
  }
}

GeomapFragment.propTypes = propTypes;
GeomapFragment.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartMounted: state.chartData.chartData.chartMounted,
    viewport: state.chartData.chartData.specOptions
  };
};

export default connect(mapStateToProps)(withRouter(GeomapFragment));
