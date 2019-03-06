/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import GeoMap from 'components/GeoMap/GeoMap';
import { createBrowserHistory } from 'history';
import ContextPreview from 'components/chartcontext/ContextPreview/ContextPreview';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  background-color: white;
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 100%;
  background-color: #96dbfa;
  height: ${props => props.height};
`;

const PrevieTextContainer = styled.div`
  display: ${props => props.mode};
`;

const propTypes = {
  mode: PropTypes.string
};
const defaultProps = {};

const VizContainer = props => {
  const history = createBrowserHistory();

  const preview = history.location.pathname.includes('preview');
  return (
    <ComponentBase>
      <PrevieTextContainer mode={preview ? 'flex' : 'none'}>
        <ContextPreview />
      </PrevieTextContainer>
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
    </ComponentBase>
  );
};

VizContainer.propTypes = propTypes;
VizContainer.defaultProps = defaultProps;

export default VizContainer;
