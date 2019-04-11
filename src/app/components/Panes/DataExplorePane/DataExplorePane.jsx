/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* icons */
import IconRedIndicators from 'assets/icons/IconRedIndicators';
import IconRedLocation from 'assets/icons/IconRedLocation';
import IconRedPeriod from 'assets/icons/IconRedPeriod';
import IconGraphStructure from 'assets/icons/data_explorer/IconGraphStructure';
import ResetIcon from 'assets/icons/IconReset';

/* styles */
import {
  ComponentBase,
  ResetContainer,
  PanelAccordion
} from './DataExplorerPane.style';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';
import ExpansionPanelContainer from './sort/ExpansionPanelContainer';
import TimePeriodPanel from './panels/TimePeriodPanel/TimePeriodPanel';
import DropdownMenuPanel from './panels/DropdownMenuPanel/DropdownMenuPanel';
import GraphStructurePanel from './panels/GraphStructurePanel/GraphStructurePanel';

const propTypes = {
  selectedInd2: PropTypes.string,
  selectedInd1: PropTypes.string,
  regionAmount: PropTypes.number,
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
  selectedRegionLabels: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  selectCountry: PropTypes.func,
  selectRegion: PropTypes.func,
  selectYearRange: PropTypes.func,
  yearRange: PropTypes.array,
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
  selectedInd2: undefined,
  selectedInd1: undefined,
  locationSelected: true,
  subInd1AllSelected: true,
  subInd2AllSelected: true,
  selectYearRange: undefined,
  yearRange: [2003, 2016],
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

  render() {
    return (
      <ComponentBase style={{ display: this.props.display }}>
        <PanelAccordion
          animate
          multiple
          onActive={newActiveIndex =>
            this.setState({ activeIndex: newActiveIndex })
          }
        >
          {/*TODO: Store props somewhere different to improve readablitity */}

          {/*DATASOURCE*/}
          <ExpansionPanelContainer
            icon={<IconRedIndicators />}
            label="Datasource"
            data-cy="nav-pane-item-datasource"
          >
            <DropdownMenuPanel
              panelDetails={[
                {
                  multiple: true,
                  selectAll: true,
                  placeHolderText: 'Select datasource',
                  placeHolderNumber: this.props.allFileSources.length,
                  selectDataSource: this.props.selectDataSource,
                  allFileSources: this.props.allFileSources,
                  defaultAll: this.props.locationSelected,
                  selectedSources: this.props.selectedSources,
                  valueSelected: this.props.selectedSources,
                  reset: () => this.props.selectDataSource('reset')
                }
              ]}
            />
          </ExpansionPanelContainer>

          {/*GEO LOCATION*/}
          <ExpansionPanelContainer
            icon={<IconRedLocation />}
            label="Geo location"
            data-cy="nav-pane-item-geo-location"
          >
            <DropdownMenuPanel
              panelDetails={[
                {
                  multiple: true,
                  selectAll: true,
                  placeHolderText: 'Select region',
                  placeHolderNumber: this.props.regions.length,
                  selectDataSource: this.props.selectRegion,
                  allFileSources: this.props.regions,
                  defaultAll: this.props.locationSelected,
                  selectedSources: this.props.selectedRegionVal,
                  valueSelected: this.props.selectedRegionLabels,
                  reset: () => this.props.selectRegion('reset')
                },
                {
                  multiple: true,
                  selectAll: true,
                  placeHolderText: 'Select country',
                  placeHolderNumber: this.props.countries.length,
                  selectDataSource: this.props.selectCountry,
                  allFileSources: this.props.countries,
                  defaultAll: this.props.locationSelected,
                  selectedSources: this.props.selectedCountryVal,
                  valueSelected: this.props.selectedCountryLabel,
                  reset: () => this.props.selectCountry('reset')
                }
              ]}
            />
          </ExpansionPanelContainer>

          {/*TIME PERIOD*/}
          <ExpansionPanelContainer
            icon={<IconRedPeriod />}
            label="Time Period"
            data-cy="nav-pane-item-time-period"
          >
            <TimePeriodPanel
              selectYearRange={this.props.selectYearRange}
              yearRange={this.props.yearRange}
            />
          </ExpansionPanelContainer>

          {/*INDICATORS*/}
          <ExpansionPanelContainer
            icon={<IconRedIndicators />}
            label="Indicators"
            data-cy="nav-pane-item-indicator"
          >
            <DropdownMenuPanel
              panelDetails={[
                {
                  categorise: true,
                  placeHolderText: 'Select indicator',
                  placeHolderNumber: this.props.indNames.length,
                  selectDataSource: this.props.selectInd1,
                  allFileSources: this.props.indNames,
                  selectedSources: this.props.selectedInd1,
                  valueSelected: this.props.selectedInd1,
                  reset: () => this.props.selectInd1('reset')
                },
                {
                  categorise: true,
                  multiple: true,
                  selectAll: true,
                  placeHolderText: 'Select sub indicator',
                  selectDataSource: this.props.selectSubInd1,
                  defaultAll: this.props.subInd1AllSelected,
                  allFileSources: this.props.subIndicators1,
                  selectedSources: this.props.selectedSubInd1
                },
                {
                  categorise: true,
                  placeHolderText: 'Select indicator',
                  placeHolderNumber: this.props.indNames.length,
                  selectDataSource: this.props.selectInd2,
                  allFileSources: this.props.indNames,
                  selectedSources: this.props.selectedInd2,
                  valueSelected: this.props.selectedInd2,
                  reset: () => this.props.selectInd2('reset')
                },
                {
                  categorise: true,
                  multiple: true,
                  selectAll: true,
                  placeHolderText: 'Select sub indicator',
                  selectDataSource: this.props.selectSubInd2,
                  defaultAll: this.props.subInd2AllSelected,
                  allFileSources: this.props.subIndicators2,
                  selectedSources: this.props.selectedSubInd2
                }
              ]}
            />
          </ExpansionPanelContainer>

          <ExpansionPanelContainer
            icon={<IconGraphStructure />}
            label="Graph structure"
            data-cy="nav-pane-item-time-period"
          >
            <GraphStructurePanel />
          </ExpansionPanelContainer>
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
