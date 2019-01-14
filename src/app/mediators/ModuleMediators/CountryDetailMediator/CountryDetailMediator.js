/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import { createRefetchContainer, graphql } from 'react-relay';

/* helpers */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {
  formatBarChartInfoIndicators,
  formatLineChartData,
  formatProjectData,
  formatWikiExcerpts,
} from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.utils';

/* actions */
import * as actions from 'services/actions/index';
import * as oipaActions from 'services/actions/oipa';

/* mock */
import mock from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.mock';

const propTypes = {
  excerpts: PropTypes.shape({
    values: PropTypes.shape({
      origin: PropTypes.string,
      action: PropTypes.string,
      prop: PropTypes.string,
      exsentences: PropTypes.number,
      exintro: PropTypes.number,
      explaintext: PropTypes.number,
      exsectionformat: PropTypes.string,
      formatversion: PropTypes.number,
      titles: PropTypes.string,
      format: PropTypes.string,
    }),
    request: PropTypes.bool,
    success: PropTypes.bool,
    data: PropTypes.shape({
      batchcomplete: PropTypes.bool,
      query: PropTypes.shape({
        pages: PropTypes.arrayOf(
          PropTypes.shape({
            pageid: PropTypes.number,
            ns: PropTypes.number,
            title: PropTypes.string,
            extract: PropTypes.string,
          }),
        ),
      }),
    }),
    error: PropTypes.shape({
      status: PropTypes.string,
      statusText: PropTypes.string,
      result: PropTypes.object,
    }),
  }),
  countryActivities: PropTypes.shape({
    values: PropTypes.shape({
      recipient_country: PropTypes.string,
      page: PropTypes.number,
      page_size: PropTypes.number,
      fields: PropTypes.string,
    }),
    request: PropTypes.bool,
    success: PropTypes.bool,
    data: PropTypes.shape({
      count: PropTypes.number,
      next: PropTypes.string,
      previous: PropTypes.string,
      results: PropTypes.array,
    }),
    error: PropTypes.shape({
      status: PropTypes.string,
      statusText: PropTypes.string,
      result: PropTypes.object,
    }),
  }),
  indicatorAggregations: PropTypes.shape({
    country: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        geolocationTag: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
    global: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
    aidsEpidemic: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
  }),
};
const defaultProps = {
  excerpts: {},
  countryActivities: {},
  indicatorAggregations: {},
};

class CountryDetailMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transParams: mock.transParams,
      wikiParams: mock.wikiParams,
      projectData: [],
      excerpts: ['', ''],
      barChartIndicators: mock.barChartIndicators,
      aidsEpIndicators: mock.aidsEpIndicators,
      aidsLineChartData: [],
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
    this.props.dispatch(actions.countryExcerptRequest(this.state.wikiParams));

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

    if (!isEqual(this.props.excerpts.data, prevProps.excerpts.data)) {
      const excerpts = formatWikiExcerpts(this.props.excerpts);
      this.setState({ excerpts });
    }

    // Here we format the data retrieved from graphql
    if (
      !isEqual(
        this.props.indicatorAggregations,
        prevProps.indicatorAggregations,
      )
    ) {
      // Save the countries name that we retrieved
      // from the indicators
      const countryName = get(
        this.props.indicatorAggregations,
        'country[0].geolocationTag',
        'CountryNotFound',
      );
      // Here we format the bar chart indicator data
      const infoBarData = formatBarChartInfoIndicators(
        this.props.indicatorAggregations.country,
        this.props.indicatorAggregations.global,
        this.state.barChartIndicators,
        countryName,
      );

      const aidsLineChartData = formatLineChartData(
        this.props.indicatorAggregations.aidsEpidemic,
      );

      this.setState({ infoBarData, countryName, aidsLineChartData });
    }
  }

  refetch() {
    this.props.relay.refetch({
      countryCode: [mock.countryCode.toLowerCase()],
      barChartIndicators: this.state.barChartIndicators,
      aidsEpIndicators: this.state.aidsEpIndicators,
    });
  }

  render() {
    return (
      <CountryDetailModule
        projectData={this.state.projectData}
        infoBarData={this.state.infoBarData}
        aidsLineChartData={this.state.aidsLineChartData}
        countryName={this.state.countryName}
        excerpts={this.state.excerpts}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    excerpts: state.countryExcerpt,
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
        barChartIndicators: { type: "[String]", defaultValue: ["undefined"] }
        aidsEpIndicators: { type: "[String]", defaultValue: ["undefined"] }
      ) {
      country: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
        indicatorName_In: $barChartIndicators
      ) {
        indicatorName
        geolocationTag
        value
      }
      global: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        indicatorName_In: $barChartIndicators
      ) {
        indicatorName
        value
      }
      aidsEpidemic: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
        indicatorName_In: $aidsEpIndicators
      ) {
        indicatorName
        date
        value
      }
    }
  `,
  graphql`
    query CountryDetailMediatorRefetchQuery(
      $countryCode: [String]
      $barChartIndicators: [String]
      $aidsEpIndicators: [String]
    ) {
      ...CountryDetailMediator_indicatorAggregations
        @arguments(
          countryCode: $countryCode
          barChartIndicators: $barChartIndicators
          aidsEpIndicators: $aidsEpIndicators
        )
    }
  `,
);
