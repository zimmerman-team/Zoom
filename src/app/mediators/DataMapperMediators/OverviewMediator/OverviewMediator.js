/* DATAMAPPER STEP 3 */

/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/* components */
import actions from 'services/actions';

const propTypes = {
  fileMetaData: PropTypes.object, // State data from MetaDataMediator
  validate: PropTypes.object, // Prop from redux-store that returns data from validateRequest action
};

const defaultProps = {
  fileMetaData: {},
  validate: {},
};

class OverviewMediator extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.validateRequest(this.props.fileMetaData));
  }

  render() {
    return <React.Fragment />;
  }
}

OverviewMediator.propTypes = propTypes;
OverviewMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    validate: state.validate, // Should include data to show the overview table
  };
};

export default connect(mapStateToProps)(OverviewMediator);
