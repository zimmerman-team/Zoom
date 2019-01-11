/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import IatiDetailModule from 'modules/IATI_Detail/IatiDetail';
import PropTypes from 'prop-types';

/* helpers */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

/* actions */
import * as oipaActions from 'services/actions/oipa';

/* mock */
import mock from 'mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator.mock';
import formatActivityData from 'mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator.utils';

const propTypes = {
  activityData: PropTypes.shape({
    values: PropTypes.shape({
      activityID: PropTypes.string,
      fields: PropTypes.string,
    }),
    request: PropTypes.bool,
    success: PropTypes.bool,
    data: PropTypes.shape({
      iati_identifier: PropTypes.string,
      title: PropTypes.shape({
        id: PropTypes.number,
        narratives: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
            language: PropTypes.shape({
              code: PropTypes.string,
              name: PropTypes.string,
            }),
          }),
        ),
      }),
      activity_status: PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
      }),
      activity_dates: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          iso_date: PropTypes.string,
          type: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
          }),
        }),
      ),
      recipient_countries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          country: PropTypes.shape({
            url: PropTypes.string,
            code: PropTypes.string,
            name: PropTypes.string,
          }),
          percentage: PropTypes.number,
        }),
      ),
      sectors: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          sector: PropTypes.shape({
            url: PropTypes.string,
            code: PropTypes.string,
            name: PropTypes.string,
          }),
          percentage: PropTypes.number,
          vocabulary: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
          }),
          vocabulary_uri: PropTypes.string,
        }),
      ),
      last_updated_datetime: PropTypes.string,
    }),
    error: PropTypes.shape({
      status: PropTypes.string,
      statusText: PropTypes.string,
      result: PropTypes.object,
    }),
  }),
};
const defaultProps = {
  activityData: {},
};

class IatiDetailMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(oipaActions.activityDataRequest(mock.oipaParams));
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.activityData.data, prevProps.activityData.data)) {
      const activityData = formatActivityData(
        get(this.props.activityData, 'data', {}),
      );
      this.setState({ activityData });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.activityData && (
          <IatiDetailModule data={this.state.activityData} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activityData: state.activityData,
  };
};

IatiDetailMediator.propTypes = propTypes;
IatiDetailMediator.defaultProps = defaultProps;

export default connect(mapStateToProps)(IatiDetailMediator);
