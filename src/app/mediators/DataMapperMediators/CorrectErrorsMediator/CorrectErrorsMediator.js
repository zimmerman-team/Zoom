/* DATAMAPPER STEP 4 */

/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { createRefetchContainer, graphql } from 'react-relay';
import ErrorStep from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep';
import connect from 'react-redux/es/connect/connect';

/* mutations */
import FileErrorResultMutation from 'mediators/DataMapperMediators/CorrectErrorsMediator/mutations/FileErrorResultMutation';
import FileValidationMutation from 'mediators/DataMapperMediators/mutations/FileValidation';

/* utils */
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import { formatErrorCells } from './CorrectErrorsMediator.util';
import * as actions from 'services/actions';
import * as generalActions from 'services/actions/general';

const propTypes = {
  fileId: PropTypes.string,
  relay: PropTypes.shape({}),
  fileCorrection: PropTypes.shape({}),
  stepsDisabled: PropTypes.bool
};

const defaultProps = {
  stepsDisabled: false,
  fileId: '-1',
  relay: {},
  fileCorrection: {}
};

class CorrectErrorsMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correctCommand: {},
      errorTableData: [],
      errorCells: [],
      pageSize: 10,
      columnHeaders: [],
      page: 0,
      checkedRows: false,
      rowsDeleted: false,
      errorsExists: false,
      ignoredErrors:
        props.stepData.errorData && props.stepData.errorData.ignoredErrors
          ? props.stepData.errorData.ignoredErrors
          : [],
      loading: false,
      rowCount: 100
    };

    this.handleValidationCompleted = this.handleValidationCompleted.bind(this);
    this.handleValidationError = this.handleValidationError.bind(this);
    this.fileValidation = this.fileValidation.bind(this);
    this.handleCellsErrorsCompleted = this.handleCellsErrorsCompleted.bind(
      this
    );
    this.handleCellsErrorsError = this.handleCellsErrorsError.bind(this);
    this.getFileCellsErrors = this.getFileCellsErrors.bind(this);
    this.saveCorrectionCommand = this.saveCorrectionCommand.bind(this);
    this.changePage = this.changePage.bind(this);
    this.refetch = this.refetch.bind(this);
    this.findReplaceValues = this.findReplaceValues.bind(this);
    this.resetFindReplace = this.resetFindReplace.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this.checkRows = this.checkRows.bind(this);
    this.deleteRows = this.deleteRows.bind(this);
    this.afterErrorTableUpdate = this.afterErrorTableUpdate.bind(this);
    this.ignoreErrors = this.ignoreErrors.bind(this);
    this.checkIfErrors = this.checkIfErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.fileId !== '-1') this.refetch();
  }

  handleValidationCompleted(response, error) {
    if (response) this.getFileCellsErrors();
    if (error) console.log('file validation error', error);
  }

  handleValidationError(error) {
    console.log('error validating file: ', error);
  }

  fileValidation() {
    FileValidationMutation.commit(
      this.props.relay.environment,
      this.props.fileId,
      this.handleValidationCompleted,
      this.handleValidationError
    );
  }

  handleCellsErrorsCompleted(response) {
    if (response) {
      const command = { ...this.state.correctCommand };
      if (command.delete) {
        command.delete = false;
        command.delete_data.row_keys = [];
        this.setState({ correctCommand: command }, this.fileValidation);
      } else if (command.update) {
        // so because when we update a cell
        // we don't get back the error data
        // we need to reset the update after it is done
        // and then call data again to get the updated
        // datas errors
        command.update = false;
        this.setState({ correctCommand: command }, this.fileValidation);
      } else if (command.replace_pressed) {
        // so if replace was activated we need to
        // we need to re-toggle the replace value
        // cause we don't want to replace stuff again
        // and we need to set the find value as the newly replaced value
        // as thats what we'll want to show the user, what they actually replaced
        command.replace_pressed = false;
        command.find_value = command.replace_value;
        this.setState({ correctCommand: command }, this.fileValidation);
      } else {
        const results = JSON.parse(
          JSON.parse(response.fileErrorCorrection.result)
        );

        const errorTableData = JSON.parse(results.data_table);

        let repCol = null;
        if (command.replace_pressed && command.filter_column_heading)
          repCol = command.filter_column_heading;

        const errorCells = formatErrorCells(
          results.error_data.error_messages,
          results.columns,
          errorTableData,
          repCol
        );

        if (this.state.columnHeaders.length === 0) {
          const columnHeaders = results.columns.map(column => {
            return {
              label: column,
              value: column
            };
          });

          this.setState({ columnHeaders });
        }

        const errorsExists = this.checkIfErrors(
          errorCells,
          this.state.ignoredErrors
        );

        this.setState(
          {
            errorTableData,
            errorCells,
            correctCommand: command,
            rowCount: results.total_amount,
            loading: false,
            errorsExists
          },
          this.afterErrorTableUpdate
        );
      }
    }
  }

  checkIfErrors(errorCells, ignoredErrors) {
    // so we form this errorsExists variable according
    // to the errors message that we get from duct
    // and according to the ignored error array
    let errorsExists = false;

    for (let i = 0; i < errorCells.length; i++) {
      // so if we find a key with a column name
      // that isn't in the ignoredErrors array,
      // we set errorsExists to true and break out of loop
      if (ignoredErrors.indexOf(errorCells[i].col) === -1) {
        errorsExists = true;
        break;
      }
    }

    return errorsExists;
  }

  afterErrorTableUpdate() {
    if (this.state.rowsDeleted) {
      // we also reset the checkboxes
      this.checkRows('all', false);
      this.setState({ rowsDeleted: false });
    }

    // we save the shared data
    if (!this.props.stepsDisabled) {
      const stepData = { ...this.props.stepData };
      stepData.errorData = {
        ...stepData.errorData,
        errorsExists: this.state.errorsExists
      };
      this.props.dispatch(generalActions.saveStepDataRequest(stepData));
    }
  }

  handleCellsErrorsError(error) {
    console.log('error while getting file cells and their errors: ', error);
  }

  getFileCellsErrors(correctCommand = this.state.correctCommand) {
    // We will calculate the start position and end position for the
    // files rows, and we'll call the general fileCellsErrors
    const startPos = this.state.pageSize * this.state.page;
    const endPos = startPos + this.state.pageSize;

    // so here we will adjust the command for error corrections
    // so that we would retrieve the actual errors for cells
    // and the cell values in one go
    const command = { ...correctCommand };

    command.error_toggle = true;
    command.start_pos = startPos;
    command.end_pos = endPos;

    const input = {
      id: command.file_id,
      // cause it needs to be passed in as a double stringified json ...
      command: JSON.stringify(JSON.stringify(command))
    };

    this.setState({ correctCommand: command, loading: true }, () =>
      FileErrorResultMutation.commit(
        this.props.relay.environment,
        input,
        this.handleCellsErrorsCompleted,
        this.handleCellsErrorsError
      )
    );
  }

  saveCorrectionCommand() {
    const correctCommand = JSON.parse(
      JSON.parse(
        get(
          this.props.fileCorrection,
          'allFileErrorCorrection.edges[0].node.command',
          // so yeah this will basically be a double stringified empty json
          // cause we receive double stringified JSONS from backend as 'command' ^
          JSON.stringify(JSON.stringify({}))
        )
      )
    );

    this.setState({ correctCommand }, this.getFileCellsErrors);
  }

  // NOTE: this is not your normal everyday pagination
  // this is some weird json string data, row count pagination
  // using the weird command for variables
  changePage(value) {
    // NOTE this value selected is 1 smaller than an actual page would be
    // so page 1 is returned as 0 and etc.
    const page = value.selected;

    this.setState({ page }, this.getFileCellsErrors);
  }

  findReplaceValues(header, findValue, replaceValue) {
    const command = { ...this.state.correctCommand };

    command.filter_column_heading = header;
    command.find_value = findValue;
    command.filter_toggle = true;

    if (replaceValue) {
      command.replace_value = replaceValue;
      command.replace_pressed = true;
    }

    // we also need to reset the page to the first one
    // so that if the user was in page 3 when they
    // initiated the find, they wouldn't end up in
    // a blank page cause the found values are
    // only made up of one page
    this.setState({ page: 0 }, () => this.getFileCellsErrors(command));
  }

  // so we want to reset the find and replace
  // table when another tab is entered
  resetFindReplace() {
    const correctCommand = { ...this.state.correctCommand };
    correctCommand.filter_toggle = false;
    correctCommand.replace_pressed = false;

    this.setState({ correctCommand }, this.getFileCellsErrors);
  }

  refetch() {
    const refetchVars = {
      entryId: this.props.fileId
    };

    this.props.relay.refetch(refetchVars, null, () =>
      this.saveCorrectionCommand()
    );
  }

  updateCell(text, otherVal) {
    const command = { ...this.state.correctCommand };

    command.update = true;
    command.update_data.column = otherVal.colName;
    command.update_data.line_no = parseInt(otherVal.rowInd, 10);
    command.update_data.cell_value = text;

    this.getFileCellsErrors(command);
  }

  checkRows(index, checked) {
    this.setState(prevState => {
      const errorTableData = [...prevState.errorTableData];
      let checkedRows = false;
      if (index === 'all') {
        // so if all is checked === true, it means that all rows are checked
        // and viceversa unchecked so we can set the checked rows thingy here
        checkedRows = checked;

        errorTableData.map(row => {
          row.checked = checked;
          return row;
        });
      } else {
        const actualInd = findIndex(errorTableData, ['index', index]);
        errorTableData[actualInd].checked = !errorTableData[actualInd].checked;
        checkedRows = findIndex(errorTableData, ['checked', true]) !== -1;
      }
      return { errorTableData, checkedRows };
    });
  }

  deleteRows() {
    const command = this.state.correctCommand;

    const delIndex = [];

    this.state.errorTableData.forEach(row => {
      if (row.checked) {
        delIndex.push(parseInt(row.index, 10));
      }
    });

    if (delIndex.length > 0) {
      command.delete = true;
      command.delete_data.row_keys = delIndex;

      this.setState({ checkedRows: false, rowsDeleted: true }, () =>
        this.getFileCellsErrors(command)
      );
    }
  }

  // basically will addin/remove the column names for errors to be ignored
  // and will save these errors in the props ofcourse
  ignoreErrors(headerName) {
    this.setState((prevState, props) => {
      const ignoredErrors = [...prevState.ignoredErrors];
      const headerInd = ignoredErrors.indexOf(headerName);

      if (headerInd === -1) ignoredErrors.push(headerName);
      else ignoredErrors.splice(headerInd, 1);

      // and we save it in the props
      const stepData = { ...props.stepData };
      const errorsExists = this.checkIfErrors(
        this.state.errorCells,
        ignoredErrors
      );

      stepData.errorData = {
        errorsExists,
        ignoredErrors: ignoredErrors
      };

      props.dispatch(generalActions.saveStepDataRequest(stepData));

      return { ignoredErrors, errorsExists };
    });
  }

  render() {
    return (
      <ErrorStep
        ignoreErrors={this.ignoreErrors}
        ignoredErrors={this.state.ignoredErrors}
        loading={this.state.loading}
        updateCell={this.updateCell}
        checkedRows={this.state.checkedRows}
        deleteRows={this.deleteRows}
        checkRows={this.checkRows}
        forcePage={this.state.page}
        resetFindReplace={this.resetFindReplace}
        pageCount={this.state.rowCount / this.state.pageSize}
        changePage={this.changePage}
        data={this.state.errorTableData}
        errorCells={this.state.errorCells}
        findReplaceValues={this.findReplaceValues}
        columnHeaders={this.state.columnHeaders}
      />
    );
  }
}

CorrectErrorsMediator.propTypes = propTypes;
CorrectErrorsMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    fileId: state.stepData.stepzData.uploadData.fileId,
    stepData: state.stepData.stepzData
  };
};

export default createRefetchContainer(
  connect(mapStateToProps)(CorrectErrorsMediator),
  graphql`
    fragment CorrectErrorsMediator_fileCorrection on Query
      @argumentDefinitions(entryId: { type: "Float", defaultValue: -1 }) {
      allFileErrorCorrection(entryId: $entryId) {
        edges {
          node {
            entryId
            command
          }
        }
      }
    }
  `,
  graphql`
    query CorrectErrorsMediatorRefetchQuery($entryId: Float!) {
      ...CorrectErrorsMediator_fileCorrection @arguments(entryId: $entryId)
    }
  `
);
