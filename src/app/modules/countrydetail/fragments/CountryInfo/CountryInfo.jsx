/* base */
import React from 'react';
import BarChart from 'components/charts/barcharts/BarChart';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { Box } from 'grommet';
import {
  aidsFondsRed,
  PageIntroInitial,
  PageIntroSecondary,
  SimpleText,
} from 'components/theme/ThemeSheet';
import { barChartMockData } from '__mocks__/barChartMock';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { CountryName } from 'modules/countrydetail/fragments/CountryInfo/CountryInfo.styles';
import PropTypes from 'prop-types';

// FRAGMENT 2: country info

const propTypes = {
  excerpts: PropTypes.array,
};
const defaultProps = {
  excerpts: [],
};

const CountryInfo = props => {
  return (
    <ModuleFragment>
      <CountryName>Zoom in on {countryDetailMockData.country}</CountryName>
      <Box direction="row">
        <Box width="50%">
          <PageIntroInitial>{props.excerpts[0]}</PageIntroInitial>
          <PageIntroSecondary>{props.excerpts[1]}</PageIntroSecondary>
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
