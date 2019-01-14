/* base */
import React from 'react';
import PropTypes from 'prop-types';
import ZoomSelect from 'components/Select/ZoomSelect';

import {
  ComponentBase,
  Divider,
  ExplorerHeader,
  FilterContainer,
  FilterLabel,
  FilterTitle,
} from './DataExplorerPane.style';

const propTypes = {
  data: PropTypes.array,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  currentYear: PropTypes.number,
  regionAmount: PropTypes.number,
  totalCountries: PropTypes.number,
  totalIndicators: PropTypes.number,
};
const defaultProps = {
  data: [],
  startYear: 2000,
  endYear: 2019,
  currentYear: 2010,
  regionAmount: 12,
  totalCountries: 211,
  totalIndicators: 289,
};

class DataExplorePane extends React.Component {
  render() {
    return (
      <ComponentBase>
        <ExplorerHeader>
          <FilterTitle>Modify chart</FilterTitle>
        </ExplorerHeader>
        <Divider />
        <FilterContainer>
          <FilterLabel>Location</FilterLabel>
          <ZoomSelect
            placeHolder={'Select region (' + this.props.regionAmount + ')'}
          />
          <ZoomSelect
            placeHolder={'Select country (' + this.props.totalCountries + ')'}
          />
        </FilterContainer>
        <FilterContainer>
          <FilterLabel>Period</FilterLabel>
          <ZoomSelect placeHolder="Select begin year" />
          <ZoomSelect placeHolder="Select end year" />
        </FilterContainer>
        <FilterContainer>
          <FilterLabel>Indicators</FilterLabel>
          <ZoomSelect
            placeHolder={
              'Select indicator (' + this.props.totalIndicators + ')'
            }
          />
          <ZoomSelect placeHolder="Select sub indicator" />
        </FilterContainer>
        <Divider />
        <FilterContainer>
          <ZoomSelect
            placeHolder={
              'Select indicator (' + this.props.totalIndicators + ')'
            }
          />
          <ZoomSelect placeHolder="Select sub indicator" />
        </FilterContainer>
      </ComponentBase>
    );
  }
}

DataExplorePane.propTypes = propTypes;
DataExplorePane.defaultProps = defaultProps;

export default DataExplorePane;
