/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* utils */
import get from 'lodash/get';

/* components */
import {
  BarsContainer,
  Bar,
  BarContainer,
  BarName,
  Value,
  LegendContainer,
  Legend,
  LegendColor,
  LegendText
} from './HorizontalBarChart.styles';

const propTypes = {
  countryName: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Global: PropTypes.number,
      GlobalColor: PropTypes.string,
      Kenya: PropTypes.number,
      KenyaColor: PropTypes.string,
      country: PropTypes.string
    })
  )
};
const defaultProps = {
  data: [],
  countryName: 'Kenya'
};

const HorizontalBarChart = ({ data, countryName }) => (
  <React.Fragment>
    <BarsContainer>
      {data.map(item => (
        <React.Fragment key={item.indicator}>
          <BarName>{item.indicator}</BarName>
          <BarContainer>
            <Bar
              theme={{ width: `${item.percentage}%`, color: item.CountryColor }}
            />
            <Value>{item[countryName]}</Value>
          </BarContainer>
        </React.Fragment>
      ))}
    </BarsContainer>
    <LegendContainer>
      <Legend>
        <LegendColor theme={{ color: get(data, '[0].CountryColor', '#fff') }} />
        <LegendText>{countryName}</LegendText>
      </Legend>
    </LegendContainer>
  </React.Fragment>
);

HorizontalBarChart.propTypes = propTypes;
HorizontalBarChart.defaultProps = defaultProps;

export default HorizontalBarChart;
