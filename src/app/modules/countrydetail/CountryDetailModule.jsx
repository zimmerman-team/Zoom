/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Grommet, Text, Paragraph, Heading, Grid } from 'grommet';

import ThemeSheet, {
  PageHeading,
  SectionHeading,
  FragmentParagraph,
  aidsFondsWhite,
  zoomGreyOne,
  zoomGreyZero,
  zoomFontFamOne,
  aidsFondsRed,
  fragmentContentWidth,
} from '../../components/theme/ThemeSheet';
import AppBar from '../../components/navigation/AppBar/AppBar';
import LineChart from '../../components/visualization/linechart/LineChart';

const ModuleContainer = styled(Box)`
  background-color: ${aidsFondsWhite};
`;

// COMMON
const FragmentContainer = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const FragmentContent = styled(Box)`
  width: 100%;
  max-width: ${fragmentContentWidth};
  justify-content: center;
  align-items: center;
`;

const FragmentHeader = styled(SectionHeading)``;
const FragmentDescription = styled(FragmentParagraph)`
  max-width: 900px;
`;
const FragmentVisualisation = styled(Box)`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 65px;
`;

// FRAGMENT 1: page navigation
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

  &:hover {
    color: ${zoomGreyOne};
  }

  &:after {
    content: '|';
    margin-right: 20px;
    margin-left: 20px;
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
const CountryName = styled(PageHeading)``;
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
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <PageNavigation>
              <PageNavList>
                {PageNavItems.map(item => (
                  <PageNavItem>{item}</PageNavItem>
                ))}
              </PageNavList>
            </PageNavigation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 2: Country info */}
        <FragmentContainer>
          <CountryName>Zoom in on Kenya</CountryName>
        </FragmentContainer>

        {/* Fragment 2: Indicator chart */}
        <FragmentContainer background={zoomGreyZero}>
          <FragmentContent>
            <FragmentHeader>Aids epidemic</FragmentHeader>
            <FragmentVisualisation>
              <LineChart />
            </FragmentVisualisation>
          </FragmentContent>
        </FragmentContainer>

        {/* Fragment 3: Indicator chart */}
        <FragmentContainer>
          <FragmentContent>
            <FragmentHeader>Economic indicators</FragmentHeader>
            <FragmentVisualisation>
              <LineChart />
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
