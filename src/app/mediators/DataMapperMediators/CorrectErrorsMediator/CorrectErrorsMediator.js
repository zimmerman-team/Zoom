/* DATAMAPPER STEP 4 */

/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { createRefetchContainer, graphql } from 'react-relay';
import ErrorStep from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep';

/* mutations */
import FileErrorResultMutation from 'mediators/DataMapperMediators/CorrectErrorsMediator/mutations/FileErrorResultMutation';

/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { formatErrorCells } from './CorrectErrorsMediator.util';

const propTypes = {
  fileId: PropTypes.string,
  relay: PropTypes.shape({}),
  fileCorrection: PropTypes.shape({}),
  saveStepData: PropTypes.func
};

const defaultProps = {
  fileId: '-1',
  relay: {},
  fileCorrection: {},
  saveStepData: undefined
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
      rowCount: 100
    };

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
  }

  componentDidMount() {
    if (this.props.fileId !== '-1') this.refetch();
  }

  handleCellsErrorsCompleted(response, error) {
    if (response) {
      const command = JSON.parse(
        JSON.parse(response.fileErrorCorrection.command)
      );

      if (command.update) {
        // so because when we update a cell
        // we don't get back the error data
        // we need to reset the update after it is done
        // and then call data again to get the updated
        // datas errors
        command.update = false;
        this.setState({ correctCommand: command }, this.getFileCellsErrors);
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

        // so if replace was activated we need to
        // we need to re-toggle the replace value
        // cause we don't want to replace stuff again
        // and we need to set the find value as the newly replaced value
        // as thats what we'll want to show the user, what they actually replaced
        if (command.replace_pressed) {
          command.replace_pressed = false;
          command.find_value = command.replace_value;
        }

        this.setState(
          {
            errorTableData,
            errorCells,
            correctCommand: command,
            rowCount: results.total_amount
          },
          () => this.props.saveStepData(this.state.errorCells, 4)
        );
      }
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

    this.setState({ correctCommand: command }, () =>
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

  render() {
    return (
      <ErrorStep
        updateCell={this.updateCell}
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

export default createRefetchContainer(
  CorrectErrorsMediator,
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
