/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import { createRefetchContainer, graphql } from 'react-relay';
import { withRouter } from 'react-router';
/* helpers */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {
  formatBarChartInfoIndicators,
  formatEcoLineData,
  formatLineChart2Data,
  formatPieChartData,
  formatProjectData,
  formatWikiExcerpts,
  getProjectCountNCommitment
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
      format: PropTypes.string
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
            extract: PropTypes.string
          })
        )
      })
    }),
    error: PropTypes.shape({
      status: PropTypes.string,
      statusText: PropTypes.string,
      result: PropTypes.object
    })
  }),
  countryActivities: PropTypes.shape({
    values: PropTypes.shape({
      recipient_country: PropTypes.string,
      page: PropTypes.number,
      page_size: PropTypes.number,
      fields: PropTypes.string
    }),
    request: PropTypes.bool,
    success: PropTypes.bool,
    data: PropTypes.shape({
      count: PropTypes.number,
      next: PropTypes.string,
      previous: PropTypes.string,
      results: PropTypes.array
    }),
    error: PropTypes.shape({
      status: PropTypes.string,
      statusText: PropTypes.string,
      result: PropTypes.object
    })
  }),
  indicatorAggregations: PropTypes.shape({
    country: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        geolocationTag: PropTypes.string,
        value: PropTypes.number
      })
    ),
    global: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        value: PropTypes.number
      })
    ),
    aidsEpidemic: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number
      })
    ),
    ecoIndicators: PropTypes.arrayOf(
      PropTypes.shape({
        filterName: PropTypes.string,
        indicatorName: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number
      })
    )
  })
};
const defaultProps = {
  excerpts: {},
  countryActivities: {},
  indicatorAggregations: {}
};

class CountryDetailMediator extends React.Component {
  state = {
    activityParams: mock.activityParams,
    wikiParams: mock.wikiParams,
    transactionParams: mock.transactionParams,
    projectInfo: {},
    projectData: [],
    countryOrgCommitments: [],
    countryOrgDisbursements: [],
    excerpts: ['', ''],
    barChartIndicators: mock.barChartIndicators,
    aidsEpIndicators: mock.lineChartInd.map(lci => lci.name.split(' - ')[0]),
    subIndicators: mock.subIndicators,
    aidsLineChartData: [],
    countryName: '',
    infoBarData: [],
    projectSort: '-activity_budget_value',
    isSortByOpen: false,
    ecoIndicatorsData: [],
    ecoChartKeys: [],
    projectsLoading: false
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
    // We dispatch wiki api here, cause this is the place where we get the country name
    const nonZoomCountryName = get(
      mock.isoCountries,
      [this.props.match.params.iso2.toUpperCase()],
      ''
    );
    const wikiParams = this.state.wikiParams;
    wikiParams.titles = nonZoomCountryName;
    this.props.dispatch(actions.countryExcerptRequest(this.state.wikiParams));

    // We get countries related activities here
    const activityParams = this.state.activityParams;
    activityParams.recipient_country = this.props.match.params.iso2.toUpperCase();
    this.props.dispatch(oipaActions.countryActivitiesRequest(activityParams));

    // We get country participating orgs
    const transactionParams = this.state.transactionParams;
    transactionParams.recipient_country = this.props.match.params.iso2.toUpperCase();
    transactionParams.group_by = 'participating_organisation';
    this.props.dispatch(
      oipaActions.countryOrganisationsRequest(transactionParams)
    );

    this.setState({ activityParams });
    // We get countries related indicator data here
    this.refetch();
  };

  componentDidUpdate = prevProps => {
    // We format the loaded country activities here and save it in state
    if (
      !isEqual(
        this.props.countryActivities.data,
        prevProps.countryActivities.data
      )
    ) {
      const projectData = formatProjectData(
        get(this.props.countryActivities, 'data.results', [])
      );
      const projectInfo = getProjectCountNCommitment(
        get(this.props.countryActivities, 'data.results', [])
      );
      this.setState({
        projectData,
        projectInfo,
        projectsLoading: this.props.countryActivities.request
      });
    }

    if (!isEqual(this.props.excerpts.data, prevProps.excerpts.data)) {
      const excerpts = formatWikiExcerpts(this.props.excerpts);
      this.setState({ excerpts });
    }

    // Here we format the data retrieved from graphql
    if (
      !isEqual(
        this.props.indicatorAggregations,
        prevProps.indicatorAggregations
      )
    ) {
      // Save the countries name that we retrieved
      // from the indicators
      const countryName = get(
        this.props.indicatorAggregations,
        'country[0].geolocationTag',
        ''
      );
      // Here we format the bar chart indicator data
      const infoBarData = formatBarChartInfoIndicators(
        this.props.indicatorAggregations.country,
        this.state.subIndicators,
        this.state.barChartIndicators,
        countryName
      );

      const aidsLineChartData = formatLineChart2Data(
        this.props.indicatorAggregations.aidsEpidemic
      );

      const ecoData = formatEcoLineData(
        this.props.indicatorAggregations.ecoIndicators
      );

      this.setState({
        infoBarData,
        countryName,
        aidsLineChartData,
        ecoIndicatorsData: ecoData.data,
        ecoChartKeys: ecoData.chartKeys
        // wikiParams
      });
    }

    // We format the loaded country sectors here and save it in state
    if (
      !isEqual(
        this.props.countryOrganisations.data,
        prevProps.countryOrganisations.data
      )
    ) {
      const countryOrgCommitments = formatPieChartData(
        get(this.props.countryOrganisations, 'data.results', []),
        'participating_organisation',
        'commitment'
      );
      const countryOrgDisbursements = formatPieChartData(
        get(this.props.countryOrganisations, 'data.results', []),
        'participating_organisation',
        'disbursement'
      );
      this.setState({ countryOrgCommitments, countryOrgDisbursements });
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  setIsSortByOpen = () => {
    this.setState(prevState => ({
      isSortByOpen: !prevState.isSortByOpen
    }));
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  refetch = () => {
    this.props.relay.refetch({
      countryCode: [this.props.match.params.iso2.toLowerCase()],
      barChartIndicators: this.state.barChartIndicators,
      aidsEpIndicators: this.state.aidsEpIndicators,
      subInds: this.state.subIndicators
    });
  };

  changeSortBy = e => {
    const value = e.target.id;
    this.setState(
      {
        projectSort: value
      },
      () => {
        this.props.dispatch(
          oipaActions.countryActivitiesRequest({
            ...this.state.transParams,
            ordering: value
          })
        );
      }
    );
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  };

  render = () => {
    return (
      <CountryDetailModule
        projectData={this.state.projectData}
        projectInfo={this.state.projectInfo}
        infoBarData={this.state.infoBarData}
        aidsLineChartData={this.state.aidsLineChartData}
        ecoIndicatorsData={this.state.ecoIndicatorsData}
        ecoChartKeys={this.state.ecoChartKeys}
        countryName={this.state.countryName}
        excerpts={this.state.excerpts}
        aidsEpIndicators={mock.lineChartInd}
        countryOrganisations={{
          commitment: this.state.countryOrgCommitments,
          disbursement: this.state.countryOrgDisbursements
        }}
        projectSort={this.state.projectSort}
        changeSortBy={this.changeSortBy}
        setWrapperRef={this.setWrapperRef}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
        projectsLoading={this.state.projectsLoading}
        civicSpace={get(
          this.props.indicatorAggregations.civicSpace,
          '[0].value',
          0
        )}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    excerpts: state.countryExcerpt,
    countryActivities: state.countryActivities,
    countryOrganisations: state.countryOrganisations
  };
};

CountryDetailMediator.propTypes = propTypes;
CountryDetailMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  connect(mapStateToProps)(withRouter(CountryDetailMediator)),
  graphql`
    fragment CountryDetailMediator_indicatorAggregations on Query
      @argumentDefinitions(
        countryCode: { type: "[String]", defaultValue: ["undefined"] }
        barChartIndicators: { type: "[String]", defaultValue: ["undefined"] }
        aidsEpIndicators: { type: "[String]", defaultValue: ["undefined"] }
        subInds: { type: "[String]", defaultValue: ["undefined"] }
      ) {
      country: datapointsAggregation(
        groupBy: [
          "indicatorName"
          "geolocationTag"
          "date"
          "geolocationIso2"
          "filterName"
        ]
        uniqueIndicator: true
        indicatorFileAccesibility: "a"
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
        indicatorName_In: $barChartIndicators
        filterName_In: $subInds
      ) {
        filterName
        indicatorName
        geolocationTag
        value
        date
      }
      aidsEpidemic: datapointsAggregation(
        groupBy: [
          "indicatorName"
          "geolocationTag"
          "date"
          "geolocationIso2"
          "filterName"
        ]
        uniqueIndicator: true
        indicatorFileAccesibility: "a"
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
        indicatorName_In: $aidsEpIndicators
        filterName_In: $subInds
      ) {
        filterName
        indicatorName
        date
        value
      }
      civicSpace: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
        indicatorName_In: ["civicus score"]
        uniqueIndicator: true
        indicatorFileAccesibility: "a"
      ) {
        indicatorName
        date
        value
      }
      ecoIndicators: datapointsAggregation(
        groupBy: [
          "indicatorName"
          "geolocationTag"
          "date"
          "geolocationIso2"
          "filterName"
        ]
        uniqueIndicator: true
        indicatorFileAccesibility: "a"
        orderBy: ["date"]
        aggregation: ["Sum(value)"]
        geolocationIso2_In: $countryCode
        indicatorName_In: [
          "ghdx: total hiv/aids spending"
          "gdp per capita (current us$)"
        ]
        filterName_In: ["all ages", "the_total_mean"]
        date_In: [
          "1990"
          "1991"
          "1992"
          "1993"
          "1994"
          "1995"
          "1996"
          "1997"
          "1998"
          "1999"
          "2000"
          "2001"
          "2002"
          "2003"
          "2004"
          "2005"
          "2006"
          "2007"
          "2008"
          "2009"
          "2010"
          "2011"
          "2012"
          "2013"
          "2014"
          "2015"
          "2016"
          "2017"
        ]
      ) {
        filterName
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
      $subInds: [String]
    ) {
      ...CountryDetailMediator_indicatorAggregations
        @arguments(
          countryCode: $countryCode
          barChartIndicators: $barChartIndicators
          aidsEpIndicators: $aidsEpIndicators
          subInds: $subInds
        )
    }
  `
);
