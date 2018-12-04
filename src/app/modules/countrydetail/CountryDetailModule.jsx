/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Grommet, Text, Paragraph, Heading, Grid } from 'grommet';
import { lineChartMockData } from '../../__mocks__/lineChartMock';
import { barChartMockData } from '../../__mocks__/barChartMock';
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

const PageNavItems = [
  'Summary',
  'Aids epidemic',
  'Economic indicators',
  'Civic space',
  'Human rights',
  'Financials',
  'Projects',
];
// FRAGMENT 2: country info
const CountryInfoContainer = styled(Box)``;
const CountryName = styled(PageHeading)`
  margin-top: 0;
`;
const CountryInfoIntro = styled.p``;
const CountryInfoMore = styled.p``;
const CountryInfoDisclaimer = styled.p``;
const CountryInfoBarContainer = styled(Box)``;

// FRAGMENT 3:

// FRAGMENT 4

// FRAGMENT 5: civic space

// FRAGMENT 6

// FRAGMENT 7

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
                {PageNavItems.map(item => (
                  <PageNavItem key={item}>{item}</PageNavItem>
                ))}
              </PageNavList>
            </PageNavigation>
          </FragmentContent>
        </NavigationContainer>

        {/* Fragment 2: Country info */}
        <FragmentContainer>
          <FragmentContent>
            <CountryName>Zoom in on Kenya</CountryName>
            <Box direction="row">
              <Box width="50%">
                <PageIntroInitial>
                  Kenya (/ˈkɛnjə/; locally [ˈkɛɲa] (About this sound listen)),
                  officially the Republic of Kenya (Swahili: Jamhuri ya Kenya),
                  is a country in Africa with its capital and largest city in
                  Nairobi. Kenya's territory lies on the equator and overlies
                  the East African Rift, covering a diverse and expansive
                  terrain that extends roughly from Lake Victoria to Lake
                  Turkana (formerly called Lake Rudolf) and further south-east
                  to the Indian Ocean.
                </PageIntroInitial>
                <PageIntroSecondary>
                  It is bordered by Tanzania to the south and south-west, Uganda
                  to the west, South Sudan to the north-west, Ethiopia to the
                  north and Somalia to the north-east. Kenya covers 581,309 km2
                  (224,445 sq mi) has a population of approximately 48
                  million.[2] Kenya's capital and largest city is Nairobi…
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
            <FragmentHeader>Aids epidemic</FragmentHeader>
            <FragmentVisualisation>
              <LineChart data={lineChartMockData} />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 3: Indicator chart */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>Economic indicators</FragmentHeader>
            <FragmentVisualisation>
              <LineChart data={lineChartMockData} />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 4: Indicator chart */}
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <FragmentHeader>Civic space</FragmentHeader>
            <FragmentDescription>
              Civic space is the political, legislative, social and economic
              environment which enables citizens to come together, share their
              interests and concerns and act individually and collectively to
              influence and shape they policy-making.
            </FragmentDescription>
            <FragmentVisualisation />
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 5: Indicator chart */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>Human rights</FragmentHeader>
            <FragmentDescription>
              Data on stigma and discrimination and the legal environment were
              extracted and mapped to better capture
            </FragmentDescription>
            <FragmentVisualisation />
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 5: Indicator chart */}
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <FragmentHeader>Aidsfonds financial transactions</FragmentHeader>
            <FragmentVisualisation />
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 5: Projects */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>Projects</FragmentHeader>
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
