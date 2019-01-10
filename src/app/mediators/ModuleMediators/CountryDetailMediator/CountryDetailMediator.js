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

/* mock */
import mock from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.mock';
import { formatProjectData } from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.utils';

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
      transParams: mock.transParams,
      projectData: [],
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
      const projectData = formatProjectData(
        get(this.props.countryActivities, 'data.results', []),
      );
      this.setState({ projectData });
    }
  }

  render() {
    return <CountryDetailModule projectData={this.state.projectData} />;
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
