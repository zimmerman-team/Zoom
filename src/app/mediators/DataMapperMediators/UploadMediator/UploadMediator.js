/* DATAMAPPER STEP 2 */

/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { ToastsStore } from 'react-toasts';

/* mutations */
import AddFileMutation from 'mediators/DataMapperMediators/mutations/UploadFileMutation';
import AddSourceMutation from 'mediators/DataMapperMediators/mutations/AddSourceMutation';
import FileValidationMutation from 'mediators/DataMapperMediators/UploadMediator/mutations/FileValidation';

/* consts */
import { step1InitialData } from '__consts__/MetaDataStepConsts';
import { uploadInitialstate } from '__consts__/UploadMediatorConst';

/* actions */
import * as actions from 'services/actions';

/* components */
import UploadStep from 'modules/datamapper/fragments/UploadStep/UploadStep';
import { SimpleErrorText } from 'components/sort/Misc';

/* utils */
import isEqual from 'lodash/isEqual';
import {
  formatOverviewData,
  formatModelOptions,
  formatManData,
  getRowCount
} from './UploadMediator.util';

const propTypes = {
  dataSource: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
  }),
  environment: PropTypes.shape({}),
  data: PropTypes.shape({
    url: PropTypes.string,
    file: PropTypes.shape({}),
    fileId: PropTypes.string,
    sourceId: PropTypes.string,
    overviewData: PropTypes.arrayOf(
      PropTypes.shape({
        fileColumn: PropTypes.string,
        summary: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any // cause it can be number or string
          })
        ),
        dataTypes: PropTypes.arrayOf(PropTypes.string),
        blankCells: PropTypes.number
      })
    ),
    modelOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    manMapData: PropTypes.arrayOf(
      PropTypes.shape({
        lockedIn: PropTypes.boolean,
        fileType: PropTypes.string,
        zoomModel: PropTypes.string,
        label: PropTypes.string,
        selectDisabled: PropTypes.bool
      })
    ),
    rowCount: PropTypes.number,
    mappingJson: PropTypes.shape({})
  })
};

const defaultProps = {
  environment: {},
  dataSource: step1InitialData.dataSource,
  data: uploadInitialstate
};

// Note: even though survey data is is part of the files metada
// we'll add this survey data only when the last step is finished
// as we don't want to add it in this step because it serves no purpose to later steps
// and adding it in this step might result in the need for a deleting mutation
// if the user might DEselect addding the survey data
// We will also do a similar approach with other metadata and source data
// as it makes most sense to attach it to the file only when all the steps have been made
// and instead some random values will be attached to the file until the final step
// in the final step they will be reedited according to the users input
class UploadMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.data;

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSourceCompleted = this.handleSourceCompleted.bind(this);
    this.handleSourceError = this.handleSourceError.bind(this);
    this.addDataSource = this.addDataSource.bind(this);
    this.handleMetaDataCompleted = this.handleMetaDataCompleted.bind(this);
    this.handleMetaDataError = this.handleMetaDataError.bind(this);
    this.addMetaData = this.addMetaData.bind(this);
    this.handleValidationCompleted = this.handleValidationCompleted.bind(this);
    this.handleValidationError = this.handleValidationError.bind(this);
    this.fileValidation = this.fileValidation.bind(this);
    this.afterFileInput = this.afterFileInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.upload.data, prevProps.upload.data) &&
      this.props.upload.data
    ) {
      this.setState({ url: this.props.upload.data.url }, this.afterFileInput);
    }
  }

  handleSourceCompleted(response) {
    if (response)
      this.setState(
        { sourceId: response.fileSource.entryId },
        this.addMetaData
      );
  }

  handleSourceError(error) {
    console.log('error adding data source: ', error);
  }

  addDataSource(name) {
    AddSourceMutation.commit(
      this.props.environment,
      name,
      this.handleSourceCompleted,
      this.handleSourceError
    );
  }

  handleMetaDataCompleted(response, error) {
    if (error) console.log('error uploading file:', error);

    if (response) {
      const mappingJson = JSON.parse(
        response.file.dataModelHeading.replace(/'/g, '"')
      );

      this.setState(
        {
          mappingJson,
          modelOptions: formatModelOptions(mappingJson),
          fileId: response.file.entryId
        },
        this.fileValidation
      );
    }
  }

  handleMetaDataError(error) {
    console.log('error uploading file: ', error);
  }

  addMetaData() {
    const today = new Date().toISOString();
    const isoDate = today.substring(0, today.indexOf('T'));

    const fileType = /[.]/.exec(this.state.file.name)
      ? /[^.]+$/.exec(this.state.file.name)
      : [''];

    // TODO: this commented out logic below will be added in the last step
    // along with every other metadata field
    // This is shared data set 'p' for private, 'o' for public
    // const accessibility =
    //   typeof prevStepData.shared === 'string' && prevStepData.shared === 'Yes'
    //     ? 'o'
    //     : 'p';
    //
    //
    // const tags = prevStepData.tags.map(tag => {
    //   return { name: tag };
    // });

    // and here we just use some random data, just to be able to upload the file
    const variables = {
      title: 'ZZTemporary',
      description: 'ZZTemporary',
      containsSubnationalData: true,
      organisation: 'ZZTemporary',
      maintainer: 'ZZTemporary',
      methodology: 'ZZTemporary',
      defineMethodology: 'ZZTemporary',
      updateFrequency: 'ZZTemporary',
      comments: 'ZZTemporary',
      dateOfDataset: isoDate,
      accessibility: 'p',
      dataQuality: 'ZZTemporary',
      numberOfRows: '1',
      fileTypes: fileType[0],
      // Location should always be 2, until we start using different data
      // or we get more selections in the metadata step.
      // Location 2 is for the 'world' location
      location: '2',
      source: this.state.sourceId,
      tags: [],
      file: this.state.url
    };

    // but if the user has already uploaded a file
    // we edit only the required uploaded files data
    // using the previous file id
    if (this.state.fileId.length !== 0) {
      variables.id = this.state.fileId;
    }

    // and here we upload all the metadata for the file
    AddFileMutation.commit(
      this.props.environment,
      variables,
      this.handleMetaDataCompleted,
      this.handleMetaDataError
    );
  }

  // NOTE: So this whole file validation logic which retrieves
  // data for the overview step needs to be here, cause it should change whenever a new file is uploaded
  // same will be with other steps that are dependant on the file
  handleValidationCompleted(response) {
    if (response) {
      const overviewData = formatOverviewData(
        response.fileValidationResults.summary,
        response.fileValidationResults.foundList
      );
      const rowCount = getRowCount(overviewData);
      this.setState(
        {
          manMapData: formatManData(response.fileValidationResults.foundList),
          overviewData,
          rowCount
        },
        () => this.props.saveStepData(this.state, 2)
      );
    }
  }

  handleValidationError(error) {
    console.log('error validating file: ', error);
  }

  fileValidation() {
    FileValidationMutation.commit(
      this.props.environment,
      this.state.fileId,
      this.handleValidationCompleted,
      this.handleValidationError
    );
  }

  afterFileInput() {
    // So the only reason why we would add the file source here
    // is if there's currently no file sources on the database
    // otherwise we always use an existing file source from the first filesource list
    // to just be able to upload the file for following steps
    // more explenation about this step is above the class name
    // TODO: add the actual source in the final step
    if (this.props.fileSources.length <= 0)
      this.addDataSource(this.props.dataSource.value);
    // otherwise we just add the file to the first source
    else
      this.setState(
        { sourceId: this.props.fileSources[0].value },
        this.addMetaData
      );
  }

  handleFileUpload(e) {
    // we save the uploaded file in state
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const fileType = /[.]/.exec(file.name) ? /[^.]+$/.exec(file.name) : [''];

    if (fileType[0] !== 'csv') {
      ToastsStore.error(
        <SimpleErrorText> Only csv files are accepted </SimpleErrorText>
      );
      this.setState({ url: undefined });
    } else if (file) {
      this.setState({ file });
      // and we upload the file to the server
      const values = new FormData();
      values.append('file', file);
      this.props.dispatch(actions.uploadRequest(values));
      // we also reset the manMapData when a new file is uploaded
      // so that the loading icon would initiate
      this.setState(
        { file, manMapData: [] },
        this.props.saveStepData(this.state, 2)
      );
    } else {
      ToastsStore.error(
        <SimpleErrorText>
          Some error uploading the file occurred
        </SimpleErrorText>
      );
    }
  }

  render() {
    return (
      <UploadStep
        loading={this.state.file.name && this.state.manMapData.length === 0}
        error={this.state.url === undefined}
        file={this.state.file}
        handleFileUpload={this.handleFileUpload}
      />
    );
  }
}

UploadMediator.propTypes = propTypes;
UploadMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    upload: state.upload
  };
};

export default connect(mapStateToProps)(UploadMediator);
