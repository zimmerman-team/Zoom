/* base */
import React from 'react';
import PropTypes from 'prop-types';
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
  selectedRegionCodes: PropTypes.arrayOf(PropTypes.string),
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
  indSelectedIndex: PropTypes.number,
  addIndicator: PropTypes.func,
  removeIndicator: PropTypes.func,
  locationSelected: PropTypes.bool,
  indicatorSelected: PropTypes.bool,
  saveGraphOption: PropTypes.func,
  subIndAggrToggle: PropTypes.func,
  resetAll: PropTypes.func
};

const defaultProps = {
  selectedInd: [],
  saveGraphOption: null,
  handleAxisSwitch: null,
  removeIndicator: null,
  locationSelected: true,
  indicatorSelected: false,
  subInd1AllSelected: true,
  subInd2AllSelected: true,
  indSelectedIndex: -1,
  chartType: chartTypes.geoMap,
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
  selectedRegionCodes: [],
  selectedRegionLabels: [],
  selectCountry: null,
  selectRegion: null,
  selectInd: null,
  selectSubInd: null,
  subIndAggrToggle: null,
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

      const isGeoChart =
        this.props.chartType === chartTypes.focusNL ||
        this.props.chartType === chartTypes.geoMap ||
        this.props.chartType === chartTypes.focusKE;

      let addIndLabel = 'Add Indicator';

      let indicatorLabel = `Indicator ${labelNumb}`;

      if (isGeoChart) {
        addIndLabel = 'Add Long/Lat Indicator';

        switch (index) {
          case 0:
            indicatorLabel = indicatorLabel.concat(' (layer)');
            break;
          case 1:
            indicatorLabel = indicatorLabel.concat(' (bubble)');
            break;
          default:
            indicatorLabel = indicatorLabel.concat(' (point)');
            break;
        }
      }

      // we push in the indicator dropdown data
      indPanels.push({
        indIndex: index,
        removeIndicator: () => this.props.removeIndicator(index),
        isIndicator: true,
        indicatorLabel,
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
        addIndLabel,
        sectionAdd: index === this.props.selectedInd.length - 1,
        subIndicator: true,
        categorise: true,
        multiple: true,
        selectAll: true,
        defaultAll: false,
        aggrCheck: indItem.aggregate,
        openSubInd:
          this.props.indicatorSelected && this.props.indSelectedIndex === index
            ? index
            : -1,
        placeHolderText: 'Select sub indicator',
        selectDataSource: (val, isArray) =>
          this.props.selectSubInd(val, isArray, index),
        allFileSources: indItem.subIndicators,
        selectedSources: indItem.selectedSubInd
      });
    });

    return indPanels;
  }

  render() {
    /* TODO: put this in the state so that it wouldn't
        render everytime when unneeded changes are made
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
                  selectedRegionCodes: this.props.selectedRegionCodes,
                  valueSelected: this.props.selectedRegionLabels,
                  capitalize: true,
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
                  capitalize: true,
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
              subIndAggrToggle={this.props.subIndAggrToggle}
              chartKeys={this.props.chartKeys}
              aggrToggle={this.props.chartType !== chartTypes.tableChart}
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
