/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router';

import theme from 'theme/Theme';
import GeoMap from 'components/GeoMap/GeoMap';
import ContextPreview from 'components/chartcontext/ContextPreview/ContextPreview';
import BarchartFragment from 'modules/visualizer/sort/container/fragments/BarchartFragment';
import ChartLegends from 'modules/visualizer/sort/container/fragments/common/ChartLegends';
import LinechartFragment from 'modules/visualizer/sort/container/fragments/LinechartFragment';
import { PrevieTextContainer, ComponentBase, Box } from './VizContainer.style';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {
  mode: PropTypes.string,
  type: PropTypes.string
};
const defaultProps = {
  type: 'geomap'
};

const VizContainer = props => {
  const preview = props.location.pathname.includes('preview');

  return (
    <ComponentBase mode={preview ? 'initial' : 'center'}>
      <PrevieTextContainer mode={preview ? 'flex' : 'none'}>
        <ContextPreview desc={props.chartData.desc} />
      </PrevieTextContainer>

      {props.type === 'linechart' && (
        <Box>
          <LinechartFragment />
        </Box>
      )}
      {props.type === 'barchart' && (
        <Box>
          <BarchartFragment />
        </Box>
      )}
      {props.type === 'donutchart' && <Box>donut chart</Box>}
      {props.type === 'tablechart' && <Box>table chart</Box>}
      {props.type === 'geomap' && (
        <Box height={preview ? '400px' : '100%'}>
          <GeoMap
            indicatorData={props.indicators}
            selectedYears={props.yearPeriod}
            selectYear={props.selectYear}
            latitude={52.1326}
            longitude={5.2913}
            zoom={7}
          />
        </Box>
      )}
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
