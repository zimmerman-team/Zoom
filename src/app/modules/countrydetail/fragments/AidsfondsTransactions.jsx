/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import Theme from 'theme/Theme';
import {
  FragmentHeader,
  FragmentVisualisation
} from 'components/sort/Fragments';
import { Element } from 'react-scroll/modules';
import PieChart from 'components/charts/piechart/PieChart';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';

/* mock */
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { pieChartMockData } from '__mocks__/pieChartMock';

const propTypes = {
  data: PropTypes.object,
  background: PropTypes.string
};
const defaultProps = {
  data: undefined,
  background: Theme.color.aidsFondsWhite
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
      </ModuleFragment>
    </Element>
  );
};

AidsfondsTransactions.propTypes = propTypes;
AidsfondsTransactions.defaultProps = defaultProps;

export default AidsfondsTransactions;
