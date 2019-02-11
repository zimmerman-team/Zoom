/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FragmentHeader,
  FragmentVisualisation,
} from 'components/sort/Fragments';

import { countryDetailMockData } from '__mocks__/countryDetailMock';
import PieChart from 'components/charts/piechart/PieChart';
import LineChart from 'components/charts/linechart/LineChart';
import { pieChartMockData } from '__mocks__/pieChartMock';
import { lineChartMockData } from '__mocks__/lineChartMock';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { Element } from 'react-scroll/modules';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
  background: PropTypes.string,
};
const defaultProps = {
  data: undefined,
};

const AidsfondsTransactions = props => {
  return (
    <Element name="Financials">
      <ModuleFragment
        background={props.background}
        title={countryDetailMockData.fragments[5].title}
        showInfoButton
      >
        <FragmentHeader />
        <FragmentVisualisation direction="row">
          <PieChart data={pieChartMockData} />
          <PieChart data={pieChartMockData} />
        </FragmentVisualisation>
        <FragmentVisualisation>
          <LineChart data={lineChartMockData} />
        </FragmentVisualisation>
      </ModuleFragment>
    </Element>
  );
};

AidsfondsTransactions.propTypes = propTypes;
AidsfondsTransactions.defaultProps = defaultProps;

export default AidsfondsTransactions;
