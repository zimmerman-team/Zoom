/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BarChart from '../../../components/charts/barcharts/BarChart';
import countryDetailMockData from '../../../__mocks__/countryDetailMock';
import { Box } from 'grommet/es6';
import {
  aidsFondsRed,
  PageIntroInitial,
  PageIntroSecondary,
  SimpleText,
  PageHeading,
} from '../../../components/theme/ThemeSheet';
import { barChartMockData } from '../../../__mocks__/barChartMock';
import ModuleFragment from '../../../components/layout/ModuleFragment/ModuleFragment';

// FRAGMENT 2: country info
const CountryInfoContainer = styled(Box)``;
const CountryName = styled(PageHeading)`
  margin-top: 0;
`;
const CountryInfoIntro = styled.p``;
const CountryInfoMore = styled.p``;
const CountryInfoDisclaimer = styled.p``;
const CountryInfoBarContainer = styled(Box)``;

const propTypes = {};
const defaultProps = {};

const CountryInfo = props => {
  return (
    <ModuleFragment>
      <CountryName>Zoom in on {countryDetailMockData.country}</CountryName>
      <Box direction="row">
        <Box width="50%">
          <PageIntroInitial>
            {countryDetailMockData.fragments[0].description[0]}
          </PageIntroInitial>
          <PageIntroSecondary>
            {countryDetailMockData.fragments[0].description[1]}
          </PageIntroSecondary>
          <SimpleText color={aidsFondsRed}>
            {countryDetailMockData.fragments[0].description[2]}
          </SimpleText>
        </Box>
        <Box width="50%">
          <BarChart data={barChartMockData} />
        </Box>
      </Box>
    </ModuleFragment>
  );
};

CountryInfo.propTypes = propTypes;
CountryInfo.defaultProps = defaultProps;

export default CountryInfo;
