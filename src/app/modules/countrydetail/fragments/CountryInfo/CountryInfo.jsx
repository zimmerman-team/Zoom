/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* components */
import { Box } from 'grommet/components/Box';
import { Element } from 'react-scroll/modules';
import { SimpleText } from 'components/sort/Misc';
import { PageIntroInitial, PageIntroSecondary } from 'components/sort/Paragraphs';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { CountryName } from 'modules/countrydetail/fragments/CountryInfo/CountryInfo.styles';
import HorizontalBarChart from 'components/charts/barcharts/horizontal/HorizontalBarChart';
/* theme */
import theme from 'theme/Theme';
/* mock */
import { countryDetailMockData } from '__mocks__/countryDetailMock';
/* utils */
import get from 'lodash/get';

// FRAGMENT 2: country info
const propTypes = {
  excerpts: PropTypes.arrayOf(PropTypes.string),
  infoBarData: PropTypes.arrayOf(
    PropTypes.shape({
      CountryColor: PropTypes.string,
      Global: PropTypes.number,
      GlobalColor: PropTypes.string,
      indicator: PropTypes.string
    })
  ),
  countryName: PropTypes.string
};
const defaultProps = {
  excerpts: [],
  infoBarData: [],
  countryName: countryDetailMockData.country
};

const CountryInfo = props => {
  return (
    <Element name="Summary">
      <ModuleFragment>
        <CountryName>
          Zoom in on{' '}
          {`${get(
            props.countryName,
            '[0]',
            ''
          ).toUpperCase()}${props.countryName.slice(1)}`}
        </CountryName>
        <Box direction="row">
          <Box width="50%">
            <PageIntroInitial>{props.excerpts[0]}</PageIntroInitial>
            <PageIntroSecondary>{props.excerpts[1]}</PageIntroSecondary>
            <SimpleText color={theme.color.aidsFondsRed}>
              {countryDetailMockData.fragments[0].description[2]}
            </SimpleText>
          </Box>
          <Box width="50%">
            {/* <BarChartHorizontal
              data={props.infoBarData}
              countryName={props.countryName}
            /> */}
            <HorizontalBarChart
              showLegend={false}
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
