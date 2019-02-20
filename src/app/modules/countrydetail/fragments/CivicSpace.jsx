/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { barChartMockData } from '__mocks__/barChartVerticalMock';
import BarChart from 'components/charts/barcharts/horizontal_old/BarChartHorizontal';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { Element } from 'react-scroll';

const propTypes = {
  background: PropTypes.string
};
const defaultProps = {
  background: ''
};

const CivicSpace = props => {
  return (
    <Element name="Civic space">
      <ModuleFragment
        background={props.background}
        title={countryDetailMockData.fragments[3].title}
        description={countryDetailMockData.fragments[3].description[0]}
        showInfoButton
      >
        <BarChart data={barChartMockData} />
      </ModuleFragment>
    </Element>
  );
};

CivicSpace.propTypes = propTypes;
CivicSpace.defaultProps = defaultProps;

export default CivicSpace;
