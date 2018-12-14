/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import { lineChartMockData } from '__mocks__/lineChartMock';
import { barChartMockData } from '__mocks__/barChartMock';
import countryDetailMockData from '__mocks__/countryDetailMock';
import ThemeSheet, {
  aidsFondsWhite,
  zoomGreyZero,
  FragmentVisualisation,
  FragmentHeader,
  FragmentDescription,
  FragmentContent,
  FragmentContainer,
} from 'components/theme/ThemeSheet';
import AppBar from 'components/navigation/AppBar/AppBar';

import CountryInfo from 'modules/countrydetail/fragments/CountryInfo';
import HumanRights from 'modules/countrydetail/fragments/HumanRights';
import CivicSpace from 'modules/countrydetail/fragments/CivicSpace';
import AidsEpidemic from 'modules/countrydetail/fragments/AidsEpidemic';
import EconomicIndicators from 'modules/countrydetail/fragments/EconomicIndicators';
import AidsfondsTransactions from 'modules/countrydetail/fragments/AidsfondsTransactions';
import PageNavigation from 'modules/countrydetail/fragments/PageNavigation';

const ModuleContainer = styled(Box)`
  background-color: ${aidsFondsWhite};
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

class CountryDetailModule extends React.Component {
  scrollToNode = node => {
    node.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <ModuleContainer>
          {/* Fragment 1: Page navigation */}
          <PageNavigation />

          {/* Fragment 2: Country info */}
          <CountryInfo />

          {/* Fragment 2: aids epidemic*/}
          <AidsEpidemic background={zoomGreyZero} />

          {/* Fragment 3: economic indicators */}
          <EconomicIndicators />

          {/* Fragment 4: civic space */}
          <CivicSpace background={zoomGreyZero} />

          {/* Fragment 5: human rights */}
          <HumanRights />

          {/* Fragment 5: aidsfonds financial transactions */}
          <AidsfondsTransactions background={zoomGreyZero} />

          {/* Fragment 5: Projects */}
          <FragmentContainer>
            <FragmentContent>
              <FragmentHeader>
                {countryDetailMockData.fragments[6].title}
              </FragmentHeader>
              <FragmentVisualisation />
            </FragmentContent>
          </FragmentContainer>
        </ModuleContainer>
      </React.Fragment>
    );
  }
}

CountryDetailModule.propTypes = propTypes;
CountryDetailModule.defaultProps = defaultProps;

export default CountryDetailModule;
