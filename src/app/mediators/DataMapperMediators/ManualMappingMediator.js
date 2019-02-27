/* DATAMAPPER STEP 5 */

/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/* components */
import actions from 'services/actions';

const propTypes = {
  fileId: PropTypes.string // Somehow needs to be passed through props
};

const defaultProps = {
  fileId: ''
};

class ManualMappingMediator extends React.Component {
  componentWillMount() {
    this.props.dispatch(
      actions.manualMapDataRequest({
        file_id: this.props.fileId
      })
    );
  }

  render() {
    return <React.Fragment />;
  }
}

ManualMappingMediator.propTypes = propTypes;
ManualMappingMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    manualMapData: state.manualMapData
  };
};

export default connect(mapStateToProps)(ManualMappingMediator);
