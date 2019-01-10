/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';

/* helpers */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

/* actions */
import * as actions from 'services/actions/index';
import * as oipaActions from 'services/actions/oipa';

/* mock */
import mock from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.mock';
import {
  formatProjectData,
  formatWikiExcerpts,
} from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.utils';

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
        pages: PropTypes.arrayOf(PropTypes.shape({
          pageid: PropTypes.number,
          ns: PropTypes.number,
          title: PropTypes.string,
          extract: PropTypes.string
        }))
      })
    }),
    error: PropTypes.shape({
      status: PropTypes.string,
      statusText: PropTypes.string,
      result: PropTypes.object,
    })
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
    })
  }),
};
const defaultProps = {
  excerpts: {},
  countryActivities: {},
};

class CountryDetailMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transParams: mock.transParams,
      wikiParams: mock.wikiParams,
      projectData: [],
      excerpts: ['', ''],
    };
  }

  componentDidMount() {
    this.props.dispatch(
      oipaActions.countryActivitiesRequest(this.state.transParams),
    );
    this.props.dispatch(actions.countryExcerptRequest(this.state.wikiParams));
  }

  componentDidUpdate(prevProps) {
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
  }

  render() {
    return (
      <CountryDetailModule
        excerpts={this.state.excerpts}
        projectData={this.state.projectData}
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

export default connect(mapStateToProps)(CountryDetailMediator);
