/* DATAMAPPER STEP 2 */

/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';

/* components */
import actions from 'services/actions';

const propTypes = {};

const defaultProps = {};

class UploadMediator extends React.Component {
  handleFileUpload(e) {
    const values = new FormData();
    values.append('file', e.target.files[0]);
    this.props.dispatch(actions.uploadRequest(values));
  }

  render() {
    return <React.Fragment />;
  }
}

UploadMediator.propTypes = propTypes;
UploadMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    upload: state.upload,
  };
};

export default connect(mapStateToProps)(UploadMediator);
