import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import { json as requestJson } from 'd3-request';
import isEqual from 'lodash/isEqual';
import {
  formatCountryCenterData,
  formatCountryLayerData,
} from 'mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator.utils';
import { updatePercentiles } from 'components/geo/GeoMap/components/utils';
import HomeModule from 'modules/home/HomeModule';

class HomeModuleMediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCenters: [],
      worldMap: [],
      indicators: [],
      selectedInd1: undefined,
      selectedInd2: undefined,
      selectedYear1: undefined,
      selectedYear2: undefined,
    };

    this.selectInd1 = this.selectInd1.bind(this);
    this.selectInd2 = this.selectInd2.bind(this);
    this.selectYear1 = this.selectYear1.bind(this);
    this.selectYear2 = this.selectYear2.bind(this);
  }

  componentDidMount() {
    requestJson(`static/country_center.json`, (error, countryCenters) => {
      if (!error) {
        requestJson(`static/world.json`, (error2, worldMap) => {
          if (!error2) {
            this.setState(
              {
                countryCenters,
                worldMap,
              },
              this.updateIndicators,
            );
          }
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(
        this.props.indicatorAggregations,
        prevProps.indicatorAggregations,
      )
    ) {
      this.updateIndicators();
    }
  }

  updateIndicators() {
    const countryLayerData = formatCountryLayerData(
      this.props.indicatorAggregations.indicators1,
      this.state.worldMap,
    );
    const countryCircleData = formatCountryCenterData(
      this.props.indicatorAggregations.indicators2,
      this.state.countryCenters,
    );

    updatePercentiles(countryLayerData, f => f.properties.indicator.value);

    const indicators = [];

    if (countryLayerData.features.length > 0) {
      indicators.push({
        type: 'layer',
        data: countryLayerData,
        legendName: `${this.state.selectedInd1} - ${this.state.selectedYear1}`,
      });
    }

    if (countryCircleData.length > 0) {
      indicators.push({
        type: 'circle',
        data: countryCircleData,
        legendName: `${this.state.selectedInd2} - ${this.state.selectedYear2}`,
      });
    }

    this.setState({ indicators });
  }

  refetch() {
    this.props.relay.refetch({
      indicator1: [this.state.selectedInd1],
      indicator2: [this.state.selectedInd2],
      date1: [this.state.selectedYear1],
      date2: [this.state.selectedYear2],
    });
  }

  selectInd1(val) {
    this.setState({ selectedInd1: val.value }, this.refetch);
  }

  selectInd2(val) {
    this.setState({ selectedInd2: val.value }, this.refetch);
  }

  selectYear1(val) {
    this.setState({ selectedYear1: val.value }, this.refetch);
  }

  selectYear2(val) {
    this.setState({ selectedYear2: val.value }, this.refetch);
  }

  render() {
    return (
      <HomeModule
        indicators={this.state.indicators}
        allIndNames={this.props.allIndNames}
        selectInd1={this.selectInd1}
        selectInd2={this.selectInd2}
        selectYear1={this.selectYear1}
        selectYear2={this.selectYear2}
        selectedInd1={this.state.selectedInd1}
        selectedInd2={this.state.selectedInd2}
        selectedYear1={this.state.selectedYear1}
        selectedYear2={this.state.selectedYear2}
      />
    );
  }
}

export default createRefetchContainer(
  HomeModuleMediator,
  graphql`
    fragment HomeModuleMediator_indicatorAggregations on Query
      @argumentDefinitions(
        date1: { type: "[String]", defaultValue: ["undefined"] }
        date2: { type: "[String]", defaultValue: ["undefined"] }
        indicator1: { type: "[String]", defaultValue: ["undefined"] }
        indicator2: { type: "[String]", defaultValue: ["undefined"] }
      ) {
      indicators1: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        date_In: $date1
        indicatorName_In: $indicator1
      ) {
        indicatorName
        geolocationIso2
        geolocationTag
        date
        value
      }
      indicators2: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        date_In: $date2
        indicatorName_In: $indicator2
      ) {
        indicatorName
        geolocationIso2
        geolocationTag
        date
        value
      }
    }
  `,
  graphql`
    query HomeModuleMediatorRefetchQuery(
      $date1: [String]!
      $date2: [String]!
      $indicator1: [String]!
      $indicator2: [String]!
    ) {
      ...HomeModuleMediator_indicatorAggregations
        @arguments(
          date1: $date1
          date2: $date2
          indicator1: $indicator1
          indicator2: $indicator2
        )
    }
  `,
);
