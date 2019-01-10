/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import PropTypes from 'prop-types';
import { createRefetchContainer, graphql } from 'react-relay';

/* helpers */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {
  formatCountryIndNames,
  formatCountryInfoIndicators,
  formatProjectData,
} from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.utils';

/* actions */
import * as oipaActions from 'services/actions/oipa';

/* mock */
import mock from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.mock';

const propTypes = {
  countryActivities: PropTypes.object,
  indicatorAggregations: PropTypes.object,
};
const defaultProps = {
  countryActivities: {},
  indicatorAggregations: {},
};

class CountryDetailMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transParams: mock.transParams,
      projectData: [],
      indicatorNames: ['undefined'],
      countryName: '',
      infoBarData: [],
    };
  }

  componentDidMount() {
    // We get countries related activities here
    const transParams = this.state.transParams;
    transParams.recipient_country = mock.countryCode.toUpperCase();
    this.setState({ transParams });
    this.props.dispatch(
      oipaActions.countryActivitiesRequest(this.state.transParams),
    );

    // We get countries related indicator data here
    this.refetch();
  }

  componentDidUpdate(prevProps) {
    // We format the loaded country activities here and save it in state
    if (
      !isEqual(
        this.props.countryActivities.data,
        prevProps.countryActivities.data,
      )
    ) {
      const projectData = formatProjectData(
        get(this.props.countryActivities, 'data.results', []),
      );
      this.setState({ projectData });
    }

    // Here we format the countryIndicator names out of
    // country indicator data, and get global data
    // according to those indicators
    if (
      !isEqual(
        this.props.indicatorAggregations.country,
        prevProps.indicatorAggregations.country,
      ) &&
      this.props.indicatorAggregations.country.length > 0
    ) {
      const countryName = this.props.indicatorAggregations.country[0]
        .geolocationTag;
      const indicatorNames = formatCountryIndNames(
        this.props.indicatorAggregations.country,
      );
      this.setState({ indicatorNames, countryName }, this.refetch);
    }

    // Here we format the barChart data using the
    // retrieved indicator data for the country
    // and for the global values
    if (
      !isEqual(
        this.props.indicatorAggregations.global,
        prevProps.indicatorAggregations.global,
      )
    ) {
      const infoBarData = formatCountryInfoIndicators(
        this.props.indicatorAggregations.country,
        this.props.indicatorAggregations.global,
        this.state.indicatorNames,
        this.state.countryName,
      );
      this.setState({ infoBarData });
    }
  }

  refetch() {
    this.props.relay.refetch({
      countryCode: [mock.countryCode.toLowerCase()],
      indicatorNames: this.state.indicatorNames,
    });
  }

  render() {
    return (
      <CountryDetailModule
        projectData={this.state.projectData}
        infoBarData={this.state.infoBarData}
        countryName={this.state.countryName}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    countryActivities: state.countryActivities,
  };
};

CountryDetailMediator.propTypes = propTypes;
CountryDetailMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  connect(mapStateToProps)(CountryDetailMediator),
  graphql`
    fragment CountryDetailMediator_indicatorAggregations on Query
      @argumentDefinitions(
        countryCode: { type: "[String]", defaultValue: ["undefined"] }
        indicatorNames: { type: "[String]", defaultValue: ["undefined"] }
      ) {
      country: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
      ) {
        indicatorName
        geolocationTag
        value
      }
      global: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        indicatorName_In: $indicatorNames
      ) {
        indicatorName
        value
      }
    }
  `,
  graphql`
    query CountryDetailMediatorRefetchQuery(
      $countryCode: [String]
      $indicatorNames: [String]
    ) {
      ...CountryDetailMediator_indicatorAggregations
        @arguments(countryCode: $countryCode, indicatorNames: $indicatorNames)
    }
  `,
);
