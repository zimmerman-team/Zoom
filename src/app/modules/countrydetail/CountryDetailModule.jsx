/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Grommet, Text, Paragraph, Heading, Grid } from 'grommet';
import { lineChartMockData } from '../../__mocks__/lineChartMock';
import { barChartMockData } from '../../__mocks__/barChartMock';
import { countryDetailMockData } from '../../__mocks__/countryDetailMock';
import ThemeSheet, {
  PageHeading,
  SectionHeading,
  FragmentParagraph,
  aidsFondsWhite,
  zoomGreyOne,
  zoomGreyZero,
  zoomFontFamOne,
  aidsFondsRed,
  aidsFondsBlue,
  fragmentContentWidth,
  PageIntroInitial,
  PageIntroSecondary,
  SimpleText,
} from '../../components/theme/ThemeSheet';
import AppBar from '../../components/navigation/AppBar/AppBar';
import LineChart from '../../components/visualization/linechart/LineChart';
import BarChart from '../../components/visualization/barchart/BarChart';
import PieChart from '../../components/visualization/piechart/PieChart';
import { pieChartMockData } from '../../__mocks__/pieChartMock';

const ModuleContainer = styled(Box)`
  background-color: ${aidsFondsWhite};
`;

// COMMON

const FragmentContainer = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const FragmentContent = styled(Box)`
  width: 100%;
  max-width: ${fragmentContentWidth};
  justify-content: center;
  align-items: center;
`;

const FragmentHeader = styled(SectionHeading)`
  margin-top: 0;
  margin-bottom: 0;
`;
const FragmentDescription = styled(FragmentParagraph)`
  max-width: 900px;
  align-self: flex-start;
`;
const FragmentVisualisation = styled(Box)`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// FRAGMENT 1: page navigation
const NavigationContainer = styled(FragmentContainer)`
  position: sticky;
  top: 40px;
  z-index: 1;
  padding: 0;
`;

const PageNavigation = styled(Box)`
  height: 65px;
  align-items: center;
  justify-content: center;
`;

const PageNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const PageNavItem = styled.li`
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  color: ${aidsFondsRed};
  cursor: pointer;

  &:hover {
    color: ${aidsFondsBlue};
  }

  &:after {
    content: '|';
    margin-right: 15px;
    margin-left: 15px;
  }

  &:last-child {
    &:after {
      content: '';
    }
  }
`;

// FRAGMENT 2: country info
const CountryInfoContainer = styled(Box)``;
const CountryName = styled(PageHeading)`
  margin-top: 0;
`;
const CountryInfoIntro = styled.p``;
const CountryInfoMore = styled.p``;
const CountryInfoDisclaimer = styled.p``;
const CountryInfoBarContainer = styled(Box)``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const CountryDetailModule = props => {
  return (
    <React.Fragment>
      <AppBar />
      <ModuleContainer>
        {/* Fragment 1: Page navigation */}
        <NavigationContainer background={zoomGreyZero}>
          <FragmentContent>
            <PageNavigation>
              <PageNavList>
                {countryDetailMockData.nav.map(item => (
                  <PageNavItem key={item}>{item}</PageNavItem>
                ))}
              </PageNavList>
            </PageNavigation>
          </FragmentContent>
        </NavigationContainer>

        {/* Fragment 2: Country info */}
        <FragmentContainer>
          <FragmentContent>
            <CountryName>
              Zoom in on {countryDetailMockData.country}
            </CountryName>
            <Box direction="row">
              <Box width="50%">
                <PageIntroInitial>
                  {countryDetailMockData.info.initial}
                </PageIntroInitial>
                <PageIntroSecondary>
                  {countryDetailMockData.info.secondary}
                </PageIntroSecondary>
                <SimpleText color={aidsFondsRed}>
                  Source: Wikipedia, not endorsed by Aidsfonds
                </SimpleText>
              </Box>
              <Box width="50%">
                <BarChart data={barChartMockData} />
                {/*<Box>
                  <Text>HIV prevalance (adults and children)</Text>
                </Box>
                <Box>
                  <Text>HIV incidence per 1000 population</Text>
                </Box>
                <Box>
                  <Text>People living with HIV receiving ART</Text>
                </Box>*/}
              </Box>
            </Box>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 2: Indicator chart */}
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <FragmentHeader>
              {countryDetailMockData.fragments[0].name}
            </FragmentHeader>
            <FragmentVisualisation>
              <LineChart data={lineChartMockData} />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 3: Indicator chart */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>
              {countryDetailMockData.fragments[1].name}
            </FragmentHeader>
            <FragmentVisualisation>
              <LineChart data={lineChartMockData} />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 4: Indicator chart */}
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <FragmentHeader>
              {countryDetailMockData.fragments[2].name}
            </FragmentHeader>
            <FragmentDescription>
              {countryDetailMockData.fragments[2].description}
            </FragmentDescription>
            <FragmentVisualisation>
              <BarChart data={barChartMockData} />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 5: Indicator chart */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>
              {countryDetailMockData.fragments[3].name}
            </FragmentHeader>
            <FragmentDescription>
              {countryDetailMockData.fragments[3].description}
            </FragmentDescription>
            <FragmentVisualisation />
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 5: Indicator chart */}
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <FragmentHeader>
              {countryDetailMockData.fragments[4].name}
            </FragmentHeader>
            <FragmentVisualisation direction="row">
              <PieChart data={pieChartMockData} />
              <PieChart data={pieChartMockData} />
            </FragmentVisualisation>
            <FragmentVisualisation>
              <LineChart data={lineChartMockData} />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 5: Projects */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>
              {countryDetailMockData.fragments[5].name}
            </FragmentHeader>
            <FragmentVisualisation />
          </FragmentContent>
        </FragmentContainer>
      </ModuleContainer>
    </React.Fragment>
  );
};

CountryDetailModule.propTypes = propTypes;
CountryDetailModule.defaultProps = defaultProps;

export default CountryDetailModule;
