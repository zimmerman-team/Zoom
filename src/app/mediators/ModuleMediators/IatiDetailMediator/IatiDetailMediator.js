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
  activityData: PropTypes.object,
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
    this.props.dispatch(
      oipaActions.activityDataRequest(mock.activityID),
    );
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(
        this.props.activityData.data,
        prevProps.activityData.data,
      )
    ) {
      const activityData = formatActivityData(
        get(this.props.activityData, 'data', {}),
      );
      this.setState({ activityData });
    }
  }

  render() {
    return <IatiDetailModule data={this.state.activityData} />;
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
