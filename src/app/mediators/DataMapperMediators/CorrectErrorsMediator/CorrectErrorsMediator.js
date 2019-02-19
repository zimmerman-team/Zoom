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
  rowCount: PropTypes.number,
  saveStepData: PropTypes.func
};

const defaultProps = {
  fileId: '-1',
  relay: {},
  fileCorrection: {},
  rowCount: 100,
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
      page: 0
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
  }

  componentDidMount() {
    if (this.props.fileId !== '-1') this.refetch();
  }

  handleCellsErrorsCompleted(response) {
    if (response) {
      const results = JSON.parse(
        JSON.parse(response.fileErrorCorrection.result)
      );

      const errorTableData = JSON.parse(results.data_table);
      const command = JSON.parse(
        JSON.parse(response.fileErrorCorrection.command)
      );

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

      this.setState(
        {
          errorTableData,
          errorCells
        },
        () => this.props.saveStepData(this.state.errorCells, 4)
      );
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
    if (isEqual(correctCommand, this.state.correctCommand)) {
      command.start_pos = startPos;
      command.end_pos = endPos;
    }
    const input = {
      id: command.file_id,
      // cause it needs to be passed in as a double stringified json ...
      command: JSON.stringify(JSON.stringify(command))
    };

    FileErrorResultMutation.commit(
      this.props.relay.environment,
      input,
      this.handleCellsErrorsCompleted,
      this.handleCellsErrorsError
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

    // we need to retrieve all of the found values, cause pagination cannot be applied
    // to these cells as of now
    command.start_pos = 0;
    command.end_pos = 10000;

    if (replaceValue) {
      command.replace_value = replaceValue;
      command.replace_pressed = true;
    }

    this.getFileCellsErrors(command);
  }

  refetch() {
    const refetchVars = {
      entryId: this.props.fileId
    };

    this.props.relay.refetch(refetchVars, null, () =>
      this.saveCorrectionCommand()
    );
  }

  render() {
    return (
      <ErrorStep
        pageCount={this.props.rowCount / this.state.pageSize}
        changePage={this.changePage}
        data={this.state.errorTableData}
        errorCells={this.state.errorCells}
        findReplaceValues={this.findReplaceValues}
        columnHeaders={this.state.columnHeaders}
        resetTable={this.getFileCellsErrors}
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
