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
import { formatErrorCells } from './CorrectErrorsMediator.util';

const propTypes = {
  fileId: PropTypes.string,
  relay: PropTypes.shape({}),
  fileCorrection: PropTypes.shape({})
};

const defaultProps = {
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
      errorCells: []
    };

    this.handleCellsErrorsCompleted = this.handleCellsErrorsCompleted.bind(
      this
    );
    this.handleCellsErrorsError = this.handleCellsErrorsError.bind(this);
    this.getFileCellsErrors = this.getFileCellsErrors.bind(this);
    this.saveCorrectionCommand = this.saveCorrectionCommand.bind(this);
    this.refetch = this.refetch.bind(this);
  }

  componentDidMount() {
    console.log('MOUNT', this.props.fileId);
    if (this.props.fileId !== '-1') this.refetch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.fileId !== prevProps.fileId) this.refetch();
  }

  handleCellsErrorsCompleted(response) {
    if (response) {
      const results = JSON.parse(
        JSON.parse(response.fileErrorCorrection.result)
      );

      const errorCells = formatErrorCells(results.error_data.error_messages);

      const errorTableData = JSON.parse(results.data_table);
      this.setState({ errorTableData, errorCells });
    }
  }

  handleCellsErrorsError(error) {
    console.log('error while getting file cells and their errors: ', error);
  }

  getFileCellsErrors() {
    // so here we will adjust the command for error corrections
    // so that we would retrieve the actual errors for cells
    // and the cell values in one go
    const command = { ...this.state.correctCommand };
    command.error_toggle = true;
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

  refetch() {
    const refetchVars = {
      entryId: this.props.fileId
    };

    this.props.relay.refetch(refetchVars, null, () =>
      this.saveCorrectionCommand()
    );
  }

  render() {
    console.log(this.props);
    return (
      <ErrorStep
        data={this.state.errorTableData}
        errorCells={this.state.errorCells}
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
