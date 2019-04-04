/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { matchPath } from 'react-router';

import GeoMap from 'components/GeoMap/GeoMap';
import theme from 'theme/Theme';
import initialState from '__consts__/InitialChartDataConst';

/* utils */
import { getFocus } from 'modules/visualizer/VisualizerModule.utils';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 100%;
  background-color: #96dbfa;
  height: ${props => props.height};
`;

const propTypes = {};
const defaultProps = {};

const boundsNL = [[0.2252, 50.2378], [10.756, 54.2068]];
const boundsKE = [[26.82, -7.15], [50.89, 7.57]];

class GeomapFragment extends React.Component {
  state = {
    zoom: 2,
    longitude: 0,
    latitude: 15
  };

  componentWillMount = () => {
    const isNL = location.pathname.includes('NL');
    const isKE = location.pathname.includes('KE');

    const boundsNL = [[0.2252, 50.2378], [10.756, 54.2068]];
    const boundsKE = [[26.82, -7.15], [50.89, 7.57]];

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
        focus: getFocus(this.props.chartType)
      });
    }
  }

  render() {
    const { mode, ...otherProps } = this.props;

    // console.log(this.state.focus);
    return (
      <ComponentBase height={mode ? '400px' : '100%'}>
        <GeoMap
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

export default GeomapFragment;
