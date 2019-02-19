/* DATAMAPPER STEP 4 */

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

class CorrectErrorsMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'Overview', // one of ['Overview', 'Find errors', 'Find & replace']
      page: 1,
      page_size: 10,
      type: 'csv',
      filter_value: '',
      error_filter_value: '',
      find_value: '',
      filter_toggle: false,
      replace_pressed: false,
      replace_value: ''
    };

    this.getColumns = this.getColumns.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeView = this.changeView.bind(this);
    this.highlightErrors = this.highlightErrors.bind(this);
    this.changeFindValue = this.changeFindValue.bind(this);
    this.changeFilterValue = this.changeFilterValue.bind(this);
    this.changeReplaceValue = this.changeReplaceValue.bind(this);
    this.handleSaveTableCell = this.handleSaveTableCell.bind(this);
    this.handleDeleteTableRow = this.handleDeleteTableRow.bind(this);
  }

  componentWillMount() {
    this.getColumns();
  }

  getColumns() {
    this.props.dispatch(
      actions.getColumnsRequest({
        file_id: this.props.fileId,
        start_pos: (this.state.page - 1) * this.state.page_size,
        end_pos: this.state.page * this.state.page_size,
        type: this.state.type,
        find_value: this.state.find_value,
        filter_value: this.state.filter_value,
        filter_toggle: this.state.filter_toggle,
        replace_value: this.state.replace_value,
        replace_pressed: this.state.replace_pressed,
        error_toggle: this.state.error_toggle,
        error_filter_value: this.state.error_filter_value
      })
    );
  }

  highlightErrors() {
    this.props.dispatch(
      actions.getFileErrorsRequest({
        file_id: this.props.fileId,
        start_pos: (this.state.page - 1) * this.state.page_size,
        end_pos: this.state.page * this.state.page_size,
        get_errors: 1,
        type: this.state.type,
        error_filter_value: this.state.error_filter_value,
        apiError: false,
        apiErrorMessage: ''
      })
    );
  }

  handleSaveTableCell(row, cellName) {
    this.props.dispatch(
      actions.errorCorrectionSaveRequest({
        file_id: this.props.fileId,
        column: cellName,
        row,
        type: this.state.type,
        save: 1
      })
    );
  }

  handleDeleteTableRow(rowKeys) {
    this.props.dispatch(
      actions.errorCorrectionDeleteRowRequest({
        file_id: this.props.fileId,
        row_keys: rowKeys,
        type: this.state.type,
        delete: 1
      })
    );
  }

  changePage(value) {
    this.setState({ page: value });
  }

  changeView(value) {
    this.setState({ view: value });
  }

  changeFilterValue(e) {
    this.setState({ filter_value: e.target.value });
  }

  changeFindValue(e) {
    this.setState({ find_value: e.target.value });
  }

  changeReplaceValue(e) {
    this.setState({ replace_value: e.target.value });
  }

  render() {
    return <React.Fragment />;
  }
}

CorrectErrorsMediator.propTypes = propTypes;
CorrectErrorsMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    fileErrors: state.fileErrors,
    columns: state.errorCorrection,
    errorCorrectionSave: state.errorCorrectionSave,
    errorCorrectionDeleteRow: state.errorCorrectionDeleteRow
  };
};

export default connect(mapStateToProps)(CorrectErrorsMediator);
