/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import PropTypes from 'prop-types';

/* helpers */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

/* actions */
import * as oipaActions from 'services/actions/oipa';

const propTypes = {
  countryActivities: PropTypes.object,
};
const defaultProps = {
  countryActivities: {},
};

class CountryDetailMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transParams: {
        // so for now we using data for kenya specifically
        // until the full country detail user flow is implemented
        recipient_country: 'KE',
        // and also so for now we only display the first
        // 10 activities, until we implement pagination
        page: 1,
        page_size: 10,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(
      oipaActions.countryActivitiesRequest(this.state.transParams),
    );
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(
        this.props.countryActivities.data,
        prevProps.countryActivities.data,
      )
    ) {
    }
  }

  render() {
    console.log('countryActivities', this.props.countryActivities);
    return <CountryDetailModule />;
  }
}

const mapStateToProps = state => {
  return {
    countryActivities: state.countryActivities,
  };
};

CountryDetailMediator.propTypes = propTypes;
CountryDetailMediator.defaultProps = defaultProps;

export default connect(mapStateToProps)(CountryDetailMediator);
