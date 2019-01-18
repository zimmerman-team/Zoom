/* base */
import React from 'react';
import BarChartHorizontal from 'components/charts/barcharts/horizontal/BarChartHorizontal';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { Box } from 'grommet';
import { Element } from "react-scroll/modules";
import {
  aidsFondsRed,
  PageIntroInitial,
  PageIntroSecondary,
  SimpleText,
} from 'components/theme/ThemeSheet';
import { barChartMockData } from '__mocks__/barChartVerticalMock';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { CountryName } from 'modules/countrydetail/fragments/CountryInfo/CountryInfo.styles';
import PropTypes from 'prop-types';

// FRAGMENT 2: country info

const propTypes = {
  excerpts: PropTypes.array,
  infoBarData: PropTypes.arrayOf(
    PropTypes.shape({
      CountryColor: PropTypes.string,
      Global: PropTypes.number,
      GlobalColor: PropTypes.string,
      indicator: PropTypes.string,
    }),
  ),
  countryName: PropTypes.string,
};
const defaultProps = {
  excerpts: [],
  infoBarData: [],
  countryName: countryDetailMockData.country,
};

const CountryInfo = props => {
  return (
    <Element name='Summary' >
      <ModuleFragment>
        <CountryName>Zoom in on {props.countryName}</CountryName>
        <Box direction="row">
          <Box width="50%">
            <PageIntroInitial>{props.excerpts[0]}</PageIntroInitial>
            <PageIntroSecondary>{props.excerpts[1]}</PageIntroSecondary>
            <SimpleText color={aidsFondsRed}>
              {countryDetailMockData.fragments[0].description[2]}
            </SimpleText>
          </Box>
          <Box width="50%">
            <BarChartHorizontal
              data={props.infoBarData}
              countryName={props.countryName}
            />
          </Box>
        </Box>
      </ModuleFragment>
    </Element>
  );
};

CountryInfo.propTypes = propTypes;
CountryInfo.defaultProps = defaultProps;

export default CountryInfo;
