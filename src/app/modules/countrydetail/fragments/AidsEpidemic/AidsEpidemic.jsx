/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
// import LineChart from 'components/charts/linechart/LineChart';
import LineChart2 from 'components/charts/recharts_linechart/LineChart';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { Element } from 'react-scroll/modules';
/* styles */
import { ChartContainer } from 'modules/countrydetail/fragments/AidsEpidemic/AidsEpidemic.style';

const propTypes = {
  // data: PropTypes.object,
  background: PropTypes.string,
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
  )
};
const defaultProps = {
  // data: undefined,
  background: '',
  aidsLineChartData: []
};

const AidsEpidemic = props => {
  return (
    <Element name="Aids epidemic">
      <ModuleFragment
        background={props.background}
        title={countryDetailMockData.fragments[1].title}
        showInfoButton
      >
        <ChartContainer data-cy="aids-chart">
          {/* <LineChart data={props.aidsLineChartData} /> */}
          <LineChart2
            chartKeys={props.indicators}
            data={props.aidsLineChartData}
          />
        </ChartContainer>
      </ModuleFragment>
    </Element>
  );
};

AidsEpidemic.propTypes = propTypes;
AidsEpidemic.defaultProps = defaultProps;

export default AidsEpidemic;
