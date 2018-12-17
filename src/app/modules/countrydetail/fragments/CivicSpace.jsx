/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FragmentDescription,
  FragmentHeader,
  FragmentVisualisation,
} from '../../../components/theme/ThemeSheet';
import countryDetailMockData from '../../../__mocks__/countryDetailMock';
import { barChartMockData } from '../../../__mocks__/barChartMock';
import BarChart from '../../../components/charts/barcharts/BarChart';
import ModuleFragment from '../../../components/layout/ModuleFragment/ModuleFragment';

const propTypes = {
  background: PropTypes.string,
};
const defaultProps = {};

const CivicSpace = props => {
  return (
    <ModuleFragment background={props.background}>
      <FragmentHeader>
        {countryDetailMockData.fragments[3].title}
      </FragmentHeader>
      <FragmentDescription>
        {countryDetailMockData.fragments[3].description[0]}
      </FragmentDescription>
      <FragmentVisualisation>
        <BarChart data={barChartMockData} />
      </FragmentVisualisation>
    </ModuleFragment>
  );
};

CivicSpace.propTypes = propTypes;
CivicSpace.defaultProps = defaultProps;

export default CivicSpace;
