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
  selectedStartYear: PropTypes.string,
  selectedEndYear: PropTypes.string,
  selectedInd2: PropTypes.string,
  selectedInd1: PropTypes.string,
  regionAmount: PropTypes.number,
  indNames: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  years: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  countries: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  regions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
      iso2: PropTypes.string,
    })),
  })),
  subIndicators1: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  subIndicators2: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  selectedCountryVal: PropTypes.arrayOf(PropTypes.string),
  selectedRegionVal: PropTypes.arrayOf(PropTypes.arrayOf(
    PropTypes.shape({
      iso2: PropTypes.string,
    })
  )),
  selectCountry: PropTypes.func,
  selectRegion: PropTypes.func,
  selectStartYear: PropTypes.func,
  selectEndYear: PropTypes.func,
  selectInd1: PropTypes.func,
  selectInd2: PropTypes.func,
  selectedSubInd1: PropTypes.string,
  selectedSubInd2: PropTypes.string,
  selectSubInd1: PropTypes.func,
  selectSubInd2: PropTypes.func,
};
const defaultProps = {
  selectedInd2: null,
  selectedInd1: null,
  selectedStartYear: null,
  selectedEndYear: null,
  indNames: [],
  years: [],
  countries: [],
  regions: [],
  subIndicators1: [],
  subIndicators2: [],
  selectedCountryVal: [],
  selectedRegionVal: [],
  selectCountry: null,
  selectRegion: null,
  selectStartYear: null,
  selectEndYear: null,
  selectInd1: null,
  selectInd2: null,
  selectedSubInd1: null,
  selectedSubInd2: null,
  selectSubInd1: null,
  selectSubInd2: null,
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
            multiple
            placeHolder={'Select region (' + this.props.regions.length + ')'}
            data={this.props.regions}
            arraySelected={this.props.selectedRegionVal}
            selectVal={this.props.selectRegion}
          />
          <ZoomSelect
            multiple
            placeHolder={'Select country (' + this.props.countries.length + ')'}
            data={this.props.countries}
            arraySelected={this.props.selectedCountryVal}
            selectVal={this.props.selectCountry}
          />
        </FilterContainer>
        <FilterContainer>
          <FilterLabel>Period</FilterLabel>
          <ZoomSelect placeHolder="Select begin year"
                      data={this.props.years}
                      valueSelected={this.props.selectedStartYear}
                      selectVal={this.props.selectStartYear}/>
          <ZoomSelect placeHolder="Select end year"
                      data={this.props.years}
                      valueSelected={this.props.selectedEndYear}
                      selectVal={this.props.selectEndYear}/>
        </FilterContainer>
        <FilterContainer>
          <FilterLabel>Indicators</FilterLabel>
          <ZoomSelect
            placeHolder={
              'Select indicator (' + this.props.indNames.length + ')'
            }
            data={this.props.indNames}
            valueSelected={this.props.selectedInd1}
            selectVal={this.props.selectInd1}
          />
          <ZoomSelect placeHolder="Select sub indicator"
                      data={this.props.subIndicators1}
                      valueSelected={this.props.selectedSubInd1}
                      selectVal={this.props.selectSubInd1}/>
        </FilterContainer>
        <Divider />
        <FilterContainer>
          <ZoomSelect
            placeHolder={
              'Select indicator (' + this.props.indNames.length + ')'
            }
            data={this.props.indNames}
            valueSelected={this.props.selectedInd2}
            selectVal={this.props.selectInd2}
          />
          <ZoomSelect placeHolder="Select sub indicator"
                      data={this.props.subIndicators2}
                      valueSelected={this.props.selectedSubInd2}
                      selectVal={this.props.selectSubInd2}/>
        </FilterContainer>
      </ComponentBase>
    );
  }
}

DataExplorePane.propTypes = propTypes;
DataExplorePane.defaultProps = defaultProps;

export default DataExplorePane;
