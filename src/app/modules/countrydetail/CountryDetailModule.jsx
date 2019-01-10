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
import Projects from 'modules/countrydetail/fragments/Projects';

const ModuleContainer = styled(Box)`
  background-color: ${aidsFondsWhite};
`;

const propTypes = {
  data: PropTypes.object,
  projectData: PropTypes.array,
  countryName: PropTypes.string,
};
const defaultProps = {
  data: undefined,
  projectData: [],
  countryName: '',
};

class CountryDetailModule extends React.Component {
  scrollToNode = node => {
    node.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <ModuleContainer>
        {/* Fragment 1: Page navigation */}
        <PageNavigation />

        {/* Fragment 2: Country info */}
        <CountryInfo infoBarData={this.props.infoBarData}
                     countryName={this.props.countryName}/>

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
        <Projects projectData={this.props.projectData} />
      </ModuleContainer>
    );
  }
}

CountryDetailModule.propTypes = propTypes;
CountryDetailModule.defaultProps = defaultProps;

export default CountryDetailModule;
