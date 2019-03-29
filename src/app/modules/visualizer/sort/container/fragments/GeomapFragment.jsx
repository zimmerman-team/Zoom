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

class GeomapFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 2,
      longitude: 0,
      latitude: 15
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.chartType !== prevProps.chartType) {
      this.setState({
        focus: getFocus(this.props.chartType)
      });
    }
  }

  render() {
    const { mode, ...otherProps } = this.props;
    return (
      <ComponentBase height={mode ? '400px' : '100%'}>
        <GeoMap focus={this.state.focus} {...otherProps} />
      </ComponentBase>
    );
  }
}

GeomapFragment.propTypes = propTypes;
GeomapFragment.defaultProps = defaultProps;

export default GeomapFragment;
