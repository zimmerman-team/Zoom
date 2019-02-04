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
import ZoomSelect from 'components/Select/ZoomSelect';
import AccordionSelection from 'components/DataExplorePane/components/AccordionSelection/AccordionSelection';
import YearSelector from 'components/YearSelector/YearSelector';
import ResetIcon from 'assets/icons/IconReset';

/* styles */
import {
  ComponentBase,
  ResetContainer,
  FilterContainer,
  PanelAccordion,
  AccordionSection,
  DropDownCont,
} from './DataExplorerPane.style';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';

const propTypes = {
  selectedInd2: PropTypes.string,
  selectedInd1: PropTypes.string,
  regionAmount: PropTypes.number,
  indNames: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.arrayOf(
        PropTypes.shape({
          iso2: PropTypes.string,
        }),
      ),
    }),
  ),
  subIndicators1: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  subIndicators2: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  selectedCountryVal: PropTypes.arrayOf(PropTypes.string),
  selectedRegionVal: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        iso2: PropTypes.string,
      }),
    ),
  ),
  selectCountry: PropTypes.func,
  selectRegion: PropTypes.func,
  selectYear: PropTypes.func,
  selectInd1: PropTypes.func,
  selectInd2: PropTypes.func,
  selectedSubInd1: PropTypes.string,
  selectedSubInd2: PropTypes.string,
  selectSubInd1: PropTypes.func,
  selectSubInd2: PropTypes.func,
  resetAll: PropTypes.func,
};
const defaultProps = {
  selectedInd2: undefined,
  selectedInd1: undefined,
  selectYear: undefined,
  indNames: [],
  countries: [],
  regions: [],
  subIndicators1: [],
  subIndicators2: [],
  selectedCountryVal: [],
  selectedRegionVal: [],
  selectCountry: null,
  selectRegion: null,
  selectInd1: null,
  selectInd2: null,
  selectedSubInd1: undefined,
  selectedSubInd2: undefined,
  selectSubInd1: null,
  selectSubInd2: null,
  resetAll: null,
};

class DataExplorePane extends React.Component {
  state = {
    activeIndex: [],
  };

  renderHeader(label) {
    let active = false;
    let icon = '';
    switch (label) {
      case 'Geo location':
        // checks if geolocations is active
        if (this.state.activeIndex.indexOf(0) !== -1) {
          active = true;
          icon = <IconBlueLocation />;
        } else icon = <IconRedLocation />;
        break;
      case 'Time period':
        // checks if time period is active
        if (this.state.activeIndex.indexOf(1) !== -1) {
          active = true;
          icon = <IconBluePeriod />;
        } else icon = <IconRedPeriod />;
        break;
      case 'Indicators':
        // checks if indicators is active
        if (this.state.activeIndex.indexOf(2) !== -1) {
          active = true;
          icon = <IconBlueIndicators />;
        } else icon = <IconRedIndicators />;
        break;
    }

    return <AccordionSelection icon={icon} label={label} active={active} />;
  }

  render() {
    return (
      <ComponentBase>
        <PanelAccordion
          animate
          multiple
          onActive={newActiveIndex =>
            this.setState({ activeIndex: newActiveIndex })
          }
        >
          <AccordionSection header={this.renderHeader('Geo location')}>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  selectAll
                  multiple
                  placeHolder={
                    'Select region (' + this.props.regions.length + ')'
                  }
                  data={this.props.regions}
                  arraySelected={this.props.selectedRegionVal}
                  selectVal={this.props.selectRegion}
                  reset={() => this.props.selectRegion('reset')}
                />
              </DropDownCont>
              <DropDownCont>
                <ZoomSelect
                  selectAll
                  reset={() => this.props.selectCountry('reset')}
                  multiple
                  placeHolder={
                    'Select country (' + this.props.countries.length + ')'
                  }
                  data={this.props.countries}
                  arraySelected={this.props.selectedCountryVal}
                  selectVal={this.props.selectCountry}
                />
              </DropDownCont>
            </FilterContainer>
          </AccordionSection>
          <AccordionSection header={this.renderHeader('Time period')}>
            <FilterContainer>
              <YearSelector selectYear={this.props.selectYear} />
            </FilterContainer>
          </AccordionSection>
          <AccordionSection header={this.renderHeader('Indicators')}>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  categorise
                  reset={() => this.props.selectInd1({ value: undefined })}
                  placeHolder={
                    'Select indicator (' + this.props.indNames.length + ')'
                  }
                  data={this.props.indNames}
                  valueSelected={this.props.selectedInd1}
                  selectVal={this.props.selectInd1}
                />
              </DropDownCont>
              <DropDownCont>
                <ZoomSelect
                  categorise
                  placeHolder="Select sub indicator"
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
                  placeHolder={
                    'Select indicator (' + this.props.indNames.length + ')'
                  }
                  data={this.props.indNames}
                  valueSelected={this.props.selectedInd2}
                  selectVal={this.props.selectInd2}
                />
              </DropDownCont>
              <DropDownCont>
                <ZoomSelect
                  categorise
                  placeHolder="Select sub indicator"
                  data={this.props.subIndicators2}
                  multiple
                  arraySelected={this.props.selectedSubInd2}
                  selectVal={this.props.selectSubInd2}
                />
              </DropDownCont>
            </FilterContainer>
          </AccordionSection>
        </PanelAccordion>
        <ResetContainer onClick={() => this.props.resetAll()}>
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
