/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import theme from 'app/theme/Theme';
import { Helmet } from 'react-helmet';

import CountryInfo from 'app/modules/countrydetail/fragments/CountryInfo/CountryInfo';
import HumanRights from 'app/modules/countrydetail/fragments/HumanRights';
import CivicSpace from 'app/modules/countrydetail/fragments/CivicSpace/CivicSpace';
import AidsEpidemic from 'app/modules/countrydetail/fragments/AidsEpidemic/AidsEpidemic';
import EconomicIndicators from 'app/modules/countrydetail/fragments/EconomicIndicators';
import AidsfondsTransactions from 'app/modules/countrydetail/fragments/AidsfondsTransactions';
import PageNavigation from 'app/modules/countrydetail/fragments/PageNavigation';
import Projects from 'app/modules/countrydetail/fragments/Projects/Projects';
/* utils */
import { capitalize } from './CountryDetailModule.utilis';

const ModuleContainer = styled(Box)`
  background-color: ${theme.color.aidsFondsWhite};
`;

const propTypes = {
  // data: PropTypes.object,
  excerpts: PropTypes.arrayOf(PropTypes.string),
  projectData: PropTypes.arrayOf(
    PropTypes.shape({
      budget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      endDat: PropTypes.string,
      organisation: PropTypes.string,
      sectors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      ),
      startDate: PropTypes.string,
      title: PropTypes.string
    })
  ),
  projectInfo: PropTypes.shape({
    count: PropTypes.number,
    commitment: PropTypes.string
  }),
  countryName: PropTypes.string,
  infoBarData: PropTypes.arrayOf(
    PropTypes.shape({
      CountryColor: PropTypes.string,
      Global: PropTypes.number,
      GlobalColor: PropTypes.string,
      indicator: PropTypes.string
    })
  ),
  aidsLineChartData: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number
        })
      ),
      id: PropTypes.string
    })
  ),
  ecoIndicatorsData: PropTypes.arrayOf(PropTypes.shape({})),
  ecoChartKeys: PropTypes.arrayOf(PropTypes.shape({})),
  projectsLoading: PropTypes.bool,
  projectSort: PropTypes.string,
  changeSortBy: PropTypes.func,
  setWrapperRef: PropTypes.func,
  setIsSortByOpen: PropTypes.func,
  isSortByOpen: PropTypes.bool
};
const defaultProps = {
  // data: undefined,
  excerpts: [],
  projectData: [],
  projectInfo: {
    count: 0,
    commitment: ''
  },
  countryName: '',
  infoBarData: [],
  ecoIndicatorsData: [],
  aidsLineChartData: [],
  projectsLoading: false,
  projectSort: '',
  changeSortBy: null,
  setWrapperRef: null,
  setIsSortByOpen: null,
  isSortByOpen: false
};

const CountryDetailModule = props => {
  return (
    <ModuleContainer>
      <Helmet>
        <title>Zoom - Country Detail {capitalize(props.countryName)}</title>
      </Helmet>

      {/* Fragment 1: Page navigation */}
      <PageNavigation />

      {/* Fragment 2: Country info */}
      <CountryInfo
        infoBarData={props.infoBarData}
        countryName={props.countryName}
        excerpts={props.excerpts}
      />

      {/* Fragment 2: aids epidemic */}
      <AidsEpidemic
        background={theme.color.zoomGreyZero}
        indicators={props.aidsEpIndicators}
        aidsLineChartData={props.aidsLineChartData}
      />

      {/* Fragment 3: economic indicators */}
      <EconomicIndicators
        data={props.ecoIndicatorsData}
        chartKeys={props.ecoChartKeys}
      />

      {/* Fragment 4: civic space */}
      <CivicSpace
        value={props.civicSpace}
        background={theme.color.zoomGreyZero}
      />

      {/* Fragment 5: human rights */}
      <HumanRights />

      {/* Fragment 5: aidsfonds financial transactions */}
      <AidsfondsTransactions
        background={theme.color.zoomGreyZero}
        data={props.countryOrganisations}
        countryName={props.countryName}
      />

      {/* Fragment 5: Projects */}
      <Projects
        projectData={props.projectData}
        projectInfo={props.projectInfo}
        projectsLoading={props.projectsLoading}
        sort={props.projectSort}
        changeSortBy={props.changeSortBy}
        setWrapperRef={props.setWrapperRef}
        setIsSortByOpen={props.setIsSortByOpen}
        isSortByOpen={props.isSortByOpen}
      />
    </ModuleContainer>
  );
};

CountryDetailModule.propTypes = propTypes;
CountryDetailModule.defaultProps = defaultProps;

export default CountryDetailModule;
