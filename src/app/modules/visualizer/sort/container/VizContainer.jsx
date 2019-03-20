/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Route, withRouter } from 'react-router';

import theme from 'theme/Theme';

import ContextPreview from 'components/chartcontext/ContextPreview/ContextPreview';
import BarchartFragment from 'modules/visualizer/sort/container/fragments/BarchartFragment';
import GeomapFragment from 'modules/visualizer/sort/container/fragments/GeomapFragment';
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import LinechartFragment from 'modules/visualizer/sort/container/fragments/LinechartFragment';
import { PreviewTextContainer, ComponentBase, Box } from './VizContainer.style';

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
  mode: PropTypes.string,
  type: PropTypes.string
};
const defaultProps = {
  type: 'geomap'
};

const VizContainer = props => {
  let preview;

  props.history.listen((location, action) => {
    preview = location.pathname.includes('preview');
    console.log('action', action);
    console.log('pre', preview);
  });

  return (
    <ComponentBase mode={preview ? 'initial' : 'center'}>
      <PreviewTextContainer mode={preview ? 'flex' : 'none'}>
        <ContextPreview desc={props.chartData.desc} />
      </PreviewTextContainer>

      <React.Fragment>
        <PropsRoute
          path="/visualizer/geomap/:code/:tab"
          component={GeomapFragment}
          mode={preview}
        />

        <PropsRoute
          path="/visualizer/linechart/:code/:tab"
          component={LinechartFragment}
          mode={preview}
        />

        <PropsRoute
          path="/visualizer/barchart/:code/:tab"
          component={BarchartFragment}
          mode={preview}
        />
      </React.Fragment>
    </ComponentBase>
  );
};

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData
  };
};

VizContainer.propTypes = propTypes;
VizContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(withRouter(VizContainer));
