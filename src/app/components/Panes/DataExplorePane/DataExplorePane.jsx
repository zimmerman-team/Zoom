/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
/* consts */
import chartTypes from '__consts__/ChartConst';
/* utils */
/* icons */
import IconRedIndicators from 'assets/icons/IconRedIndicators';
import IconRedLocation from 'assets/icons/IconRedLocation';
import IconRedPeriod from 'assets/icons/IconRedPeriod';
import IconGraphStructure from 'assets/icons/data_explorer/IconGraphStructure';
import ResetIcon from 'assets/icons/IconReset';
/* styles */
import {
  ComponentBase,
  PanelAccordion,
  ResetContainer
} from './DataExplorerPane.style';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';
import ExpansionPanelContainer from './sort/ExpansionPanelContainer';
import TimePeriodPanel from './panels/TimePeriodPanel/TimePeriodPanel';
import DropdownMenuPanel from './panels/DropdownMenuPanel/DropdownMenuPanel';
import GraphStructurePanel from './panels/GraphStructurePanel/GraphStructurePanel';

const propTypes = {
  selectedInd: PropTypes.arrayOf(
    PropTypes.shape({
      indicator: PropTypes.string,
      subIndicators: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      dataSource: PropTypes.string,
      selectedSubInd: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  chartKeys: PropTypes.arrayOf(PropTypes.shape({})),
  regionAmount: PropTypes.number,
  changesMade: PropTypes.bool,
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
  /* todo: solve the issue of this prop sometimes receiving a boolean */
  handleAxisSwitch: PropTypes.func,
  selectRegion: PropTypes.func,
  selectYearRange: PropTypes.func,
  yearRange: PropTypes.array,
  chartType: PropTypes.string,
  selectInd: PropTypes.func,
  specOptions: PropTypes.shape({}),
  selectSubInd: PropTypes.func,
  subInd1AllSelected: PropTypes.bool,
  subInd2AllSelected: PropTypes.bool,
  addIndicator: PropTypes.func,
  removeIndicator: PropTypes.func,
  locationSelected: PropTypes.bool,
  multipleInd: PropTypes.bool,
  saveGraphOption: PropTypes.func,
  resetAll: PropTypes.func
};

const defaultProps = {
  selectedInd: [],
  saveGraphOption: null,
  handleAxisSwitch: null,
  removeIndicator: null,
  locationSelected: true,
  subInd1AllSelected: true,
  subInd2AllSelected: true,
  multipleInd: false,
  chartType: chartTypes.geoMap,
  changesMade: true,
  addIndicator: null,
  specOptions: {},
  chartKeys: [],
  selectYearRange: undefined,
  yearRange: [2003, 2016],
  indNames: [],
  countries: [],
  regions: [],
  selectedCountryVal: [],
  selectedCountryLabels: [],
  selectedRegionVal: [],
  selectedRegionLabels: [],
  selectCountry: null,
  selectRegion: null,
  selectInd: null,
  selectSubInd: null,
  resetAll: null
};

class DataExplorePane extends React.Component {
  state = {
    activeIndex: []
  };

  generateIndicatorPanels() {
    const indPanels = [];

    this.props.selectedInd.forEach((indItem, index) => {
      let labelNumb = index + 1 + '';

      labelNumb = labelNumb.length > 1 ? labelNumb : '0'.concat(labelNumb);

      // we push in the indicator dropdown data
      indPanels.push({
        indIndex: index,
        sectionRemove: this.props.multipleInd,
        removeIndicator: () => this.props.removeIndicator(index),
        isIndicator: true,
        indicatorLabel: `Indicator ${labelNumb}`,
        categorise: true,
        placeHolderText: 'Select indicator',
        placeHolderNumber: this.props.indNames.length,
        selectDataSource: val => this.props.selectInd(val, index),
        allFileSources: this.props.indNames,
        selectedSources: indItem.indicator,
        valueSelected: indItem.indicator,
        reset: () => this.props.selectInd('reset', index)
      });

      // and we push in the sub-indicator dropdown data
      indPanels.push({
        indIndex: index,
        addIndicator: this.props.addIndicator,
        sectionAdd:
          index === this.props.selectedInd.length - 1 && this.props.multipleInd,
        subIndicator: true,
        categorise: true,
        multiple: true,
        selectAll: true,
        placeHolderText: 'Select sub indicator',
        selectDataSource: (val, isArray) =>
          this.props.selectSubInd(val, isArray, index),
        defaultAll:
          this.props.changesMade && indItem.selectedSubInd.length === 0,
        allFileSources: indItem.subIndicators,
        selectedSources: indItem.selectedSubInd
      });
    });

    return indPanels;
  }

  render() {
    /* TODO: put this in the state so that it wouldn't
        everytime when unneeded changes are made
        right now there some referencing bs happening
        so can't catch the did update prop change*/
    const indPanels = this.generateIndicatorPanels();

    const graphStruct =
      this.props.chartType === chartTypes.barChart ||
      this.props.chartType === chartTypes.lineChart ||
      this.props.chartType === chartTypes.donutChart;

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
              data-cy="dropdown-geolocation"
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
              data-cy="slider-time-period"
            />
          </ExpansionPanelContainer>

          {/*INDICATORS*/}
          <ExpansionPanelContainer
            icon={<IconRedIndicators />}
            label="Indicators"
            data-cy="nav-pane-item-indicator"
          >
            <DropdownMenuPanel
              handleAxisSwitch={this.props.handleAxisSwitch}
              chartKeys={this.props.chartKeys}
              panelDetails={indPanels}
            />
          </ExpansionPanelContainer>

          {graphStruct && (
            <ExpansionPanelContainer
              icon={<IconGraphStructure />}
              label="Graph structure"
              data-cy="nav-pane-item-time-period"
            >
              <GraphStructurePanel
                chartType={this.props.chartType}
                specOptions={this.props.specOptions}
                saveGraphOption={this.props.saveGraphOption}
              />
            </ExpansionPanelContainer>
          )}
        </PanelAccordion>
        <ResetContainer
          data-cy="data-explorer-panel-reset"
          onClick={() => this.props.resetAll()}
        >
          <Tooltip
            data-cy="reset-all"
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
