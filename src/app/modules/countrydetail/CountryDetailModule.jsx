/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import { aidsFondsWhite, zoomGreyZero } from 'components/theme/ThemeSheet';

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
  // data: PropTypes.object,
  excerpts: PropTypes.arrayOf(PropTypes.string),
  projectData: PropTypes.arrayOf(PropTypes.shape({
    budget: PropTypes.number,
    endDat: PropTypes.string,
    organisation: PropTypes.string,
    sectors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    startDate: PropTypes.string,
    title: PropTypes.string,
  })),
};
const defaultProps = {
  // data: undefined,
  excerpts: [],
  projectData: [],
};

class CountryDetailModule extends React.Component {
  render() {
    return (
      <ModuleContainer>
        {/* Fragment 1: Page navigation */}
        <PageNavigation />

        {/* Fragment 2: Country info */}
        <CountryInfo excerpts={this.props.excerpts} />

        {/* Fragment 2: aids epidemic */}
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
