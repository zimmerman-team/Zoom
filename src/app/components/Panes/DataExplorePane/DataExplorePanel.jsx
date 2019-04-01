/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* icons */
import IconRedIndicators from 'assets/icons/IconRedIndicators';
import IconRedLocation from 'assets/icons/IconRedLocation';
import IconRedPeriod from 'assets/icons/IconRedPeriod';
import IconBlueIndicators from 'assets/icons/IconBlueIndicators';
import IconBlueLocation from 'assets/icons/IconBlueLocation';
import IconBluePeriod from 'assets/icons/IconBluePeriod';

/* components */
import ZoomSelect from '../../Select/ZoomSelect';
import AccordionSelection from './components/AccordionSelection/AccordionSelection';
import YearSelector from '../../YearSelector/YearSelector';
import ResetIcon from 'assets/icons/IconReset';

/* styles */
import {
  ComponentBase,
  ResetContainer,
  FilterContainer,
  PanelAccordion,
  AccordionSection,
  DropDownCont
} from './DataExplorerPane.style';
import SimpleToolTip from '../../ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';

const propTypes = {
  selectedInd2: PropTypes.string,
  selectedInd1: PropTypes.string,
  regionAmount: PropTypes.number,
  yearRange: PropTypes.arrayOf(PropTypes.number),
  indNames: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.arrayOf(
        PropTypes.shape({
          iso2: PropTypes.string
        })
      )
    })
  ),
  subIndicators1: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  subIndicators2: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  selectedCountryVal: PropTypes.arrayOf(PropTypes.string),
  selectedCountryLabels: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string
      })
    )
  ),
  selectedRegionVal: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        iso2: PropTypes.string
      })
    )
  ),
  selectedRegionLabels: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string
      })
    )
  ),
  selectCountry: PropTypes.func,
  selectRegion: PropTypes.func,
  selectYearRange: PropTypes.func,
  selectInd1: PropTypes.func,
  selectInd2: PropTypes.func,
  selectedSubInd1: PropTypes.arrayOf(PropTypes.string),
  selectedSubInd2: PropTypes.arrayOf(PropTypes.string),
  selectSubInd1: PropTypes.func,
  selectSubInd2: PropTypes.func,
  subInd1AllSelected: PropTypes.bool,
  subInd2AllSelected: PropTypes.bool,
  locationSelected: PropTypes.bool,
  resetAll: PropTypes.func
};
const defaultProps = {
  yearRange: '2003,2016',
  selectedInd2: undefined,
  selectedInd1: undefined,
  locationSelected: true,
  subInd1AllSelected: true,
  subInd2AllSelected: true,
  selectYearRange: undefined,
  indNames: [],
  countries: [],
  regions: [],
  subIndicators1: [],
  subIndicators2: [],
  selectedCountryVal: [],
  selectedCountryLabels: [],
  selectedRegionVal: [],
  selectedRegionLabels: [],
  selectCountry: null,
  selectRegion: null,
  selectInd1: null,
  selectInd2: null,
  selectedSubInd1: [],
  selectedSubInd2: [],
  selectSubInd1: null,
  selectSubInd2: null,
  resetAll: null
};

class DataExplorePane extends React.Component {
  state = {
    activeIndex: []
  };

  renderHeader(label) {
    let active = false;
    let icon = '';
    switch (label) {
      case 'Datasource':
        // checks if indicators is active
        if (this.state.activeIndex.indexOf(0) !== -1) {
          active = true;
          icon = <IconBlueIndicators />;
        } else icon = <IconRedIndicators />;
        break;
      case 'Geo location':
        // checks if geolocations is active
        if (this.state.activeIndex.indexOf(1) !== -1) {
          active = true;
          icon = <IconBlueLocation />;
        } else icon = <IconRedLocation />;
        break;
      case 'Time period':
        // checks if time period is active
        if (this.state.activeIndex.indexOf(2) !== -1) {
          active = true;
          icon = <IconBluePeriod />;
        } else icon = <IconRedPeriod />;
        break;
      case 'Indicators':
        // checks if indicators is active
        if (this.state.activeIndex.indexOf(3) !== -1) {
          active = true;
          icon = <IconBlueIndicators />;
        } else icon = <IconRedIndicators />;
        break;
    }

    return <AccordionSelection icon={icon} label={label} active={active} />;
  }

  render() {
    // console.log('this.props.indNames', this.props.indNames);
    return (
      <ComponentBase style={{ display: this.props.display }}>
        <PanelAccordion
          animate
          multiple
          onActive={newActiveIndex =>
            this.setState({ activeIndex: newActiveIndex })
          }
        >
          <AccordionSection header={this.renderHeader('Datasource')}>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  defaultAll={this.props.locationSelected}
                  selectAll
                  // reset={() => this.props.selectDataSource('reset')}
                  multiple
                  placeHolderText={'Select datasource'}
                  data={this.props.allFileSources}
                  arraySelected={this.props.selectedSources}
                  selectVal={this.props.selectDataSource}
                />
              </DropDownCont>
            </FilterContainer>
          </AccordionSection>
          <AccordionSection header={this.renderHeader('Geo location')}>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  defaultAll={this.props.locationSelected}
                  selectAll
                  multiple
                  placeHolderText="Select region"
                  placeHolderNumber={this.props.regions.length}
                  data={this.props.regions}
                  arraySelected={this.props.selectedRegionVal}
                  selectVal={this.props.selectRegion}
                  valueSelected={this.props.selectedRegionLabels}
                  reset={() => this.props.selectRegion('reset')}
                />
              </DropDownCont>
              <DropDownCont>
                <ZoomSelect
                  defaultAll={this.props.locationSelected}
                  selectAll
                  reset={() => this.props.selectCountry('reset')}
                  multiple
                  placeHolderText={'Select country'}
                  placeHolderNumber={this.props.countries.length}
                  data={this.props.countries}
                  arraySelected={this.props.selectedCountryVal}
                  valueSelected={this.props.selectedCountryLabel}
                  selectVal={this.props.selectCountry}
                />
              </DropDownCont>
            </FilterContainer>
          </AccordionSection>
          <AccordionSection header={this.renderHeader('Time period')}>
            <FilterContainer>
              <YearSelector
                selectYearRange={this.props.selectYearRange}
                yearRange={this.props.yearRange}
              />
            </FilterContainer>
          </AccordionSection>
          <AccordionSection header={this.renderHeader('Indicators')}>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  categorise
                  reset={() => this.props.selectInd1({ value: undefined })}
                  placeHolderText="Select indicator"
                  placeHolderNumber={this.props.indNames.length}
                  data={this.props.indNames}
                  valueSelected={this.props.selectedInd1}
                  selectVal={this.props.selectInd1}
                />
              </DropDownCont>
              <DropDownCont>
                <ZoomSelect
                  defaultAll={this.props.subInd1AllSelected}
                  selectAll
                  categorise
                  placeHolderText="Select sub indicator"
                  data={this.props.subIndicators1}
                  multiple
                  arraySelected={this.props.selectedSubInd1}
                  selectVal={this.props.selectSubInd1}
                />
              </DropDownCont>
            </FilterContainer>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  categorise
                  reset={() => this.props.selectInd2({ value: undefined })}
                  placeHolderText="Select indicator"
                  placeHolderNumber={this.props.indNames.length}
                  data={this.props.indNames}
                  valueSelected={this.props.selectedInd2}
                  selectVal={this.props.selectInd2}
                />
              </DropDownCont>
              <DropDownCont>
                <ZoomSelect
                  defaultAll={this.props.subInd2AllSelected}
                  selectAll
                  categorise
                  placeHolderText="Select sub indicator"
                  data={this.props.subIndicators2}
                  multiple
                  arraySelected={this.props.selectedSubInd2}
                  selectVal={this.props.selectSubInd2}
                />
              </DropDownCont>
            </FilterContainer>
          </AccordionSection>
        </PanelAccordion>
        <ResetContainer
          data-cy="data-explorer-panel-reset"
          onClick={() => this.props.resetAll()}
        >
          <Tooltip
            html={<SimpleToolTip title="Reset" />}
            position="top"
            trigger="mouseenter"
          >
            <ResetIcon />
          </Tooltip>
        </ResetContainer>
      </ComponentBase>
    );
  }
}

DataExplorePane.propTypes = propTypes;
DataExplorePane.defaultProps = defaultProps;

export default DataExplorePane;
