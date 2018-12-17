/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FragmentContent,
  FragmentHeader,
  FragmentVisualisation,
} from 'components/theme/ThemeSheet';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import LineChart from 'components/charts/linechart/LineChart';
import { lineChartMockData } from '__mocks__/lineChartMock';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
  background: PropTypes.string,
};
const defaultProps = {
  data: undefined,
};

const AidsEpidemic = props => {
  return (
    <ModuleFragment
      background={props.background}
      title={countryDetailMockData.fragments[1].title}
      showInfoButton
    >
      <LineChart data={lineChartMockData} />
    </ModuleFragment>
  );
};

AidsEpidemic.propTypes = propTypes;
AidsEpidemic.defaultProps = defaultProps;

export default AidsEpidemic;
