/* DATAMAPPER STEP 2 */

/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

/* utils */
import isEqual from 'lodash/isEqual';

/* components */
import UploadStep from 'modules/datamapper/fragments/UploadStep/UploadStep';

/* mutations */
import AddFileMutation from 'mediators/DataMapperMediators/UploadMediator/mutations/UploadFileMutation';
import AddSourceMutation from 'mediators/DataMapperMediators/UploadMediator/mutations/AddSourceMutation';

/* consts */
import { step1InitialData } from '__consts__/MetaDataStepConsts';
import { uploadInitialstate } from 'mediators/DataMapperMediators/UploadMediator/UploadMediator.consts';
import * as actions from 'services/actions';

const propTypes = {
  prevStepData: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    dataSource: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    shared: PropTypes.Boolean,
    surveyData: PropTypes.Boolean,
    q1: PropTypes.string,
    q2: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    q21: PropTypes.string,
    q22: PropTypes.string,
    q3: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    q4: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    q5: PropTypes.string,
    q51: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    sourceText: PropTypes.string,
    q3Text: PropTypes.string,
    q4Text: PropTypes.string,
    q51Text: PropTypes.string,
    fileSources: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    environment: PropTypes.shape({}),
  }),
  data: PropTypes.shape({
    url: PropTypes.string,
    file: PropTypes.object,
  }),
};

const defaultProps = {
  prevStepData: step1InitialData,
  data: uploadInitialstate,
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

  // So we will save the step data when this component will be unmounting
  // as this data will be used in other components
  // or when the user comes back to this component
  componentWillUnmount() {
    this.props.saveStepData(this.state, 2);
  }

  handleSourceCompleted(response) {
    if (response)
      this.setState(
        { sourceId: response.fileSource.entryId },
        this.addMetaData,
      );
  }

  handleSourceError(error) {
    console.log('error adding data source: ', error);
  }

  addDataSource(name) {
    AddSourceMutation.commit(
      this.props.prevStepData.environment,
      name,
      this.handleSourceCompleted,
      this.handleSourceError,
    );
  }

  handleMetaDataCompleted(response, error) {
    if (error) console.log('error uploading file:', error);
    if (response) {
      this.setState({ fileId: response.file.entryId });
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
      file: this.state.url,
    };

    // but if the user has already uploaded a file
    // we edit only the required uploaded files data
    // using the previous file id
    if (this.state.fileId.length !== 0) {
      variables.id = this.state.fileId;
    }

    // and here we upload all the metadata for the file
    AddFileMutation.commit(
      this.props.prevStepData.environment,
      variables,
      this.handleMetaDataCompleted,
      this.handleMetaDataError,
    );
  }

  afterFileInput() {
    // So the only reason why we would add the file source here
    // is if there's currently no file sources on the database
    // otherwise we always use an existing file source from the first filesource list
    // to just be able to upload the file for following steps
    // more explenation about this step is above the class name
    // TODO: add the actual source in the final step
    if (this.props.prevStepData.fileSources.length <= 0)
      this.addDataSource(this.props.prevStepData.dataSource.value);
    // otherwise we just add the file to the first source
    else
      this.setState(
        { sourceId: this.props.prevStepData.fileSources[0].value },
        this.addMetaData,
      );
  }

  handleFileUpload(e) {
    // we save the uploaded file in state
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.setState({ file });
    // and we upload the file to the server
    const values = new FormData();
    values.append('file', file);
    this.props.dispatch(actions.uploadRequest(values));
  }

  render() {
    return (
      <UploadStep
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
    upload: state.upload,
  };
};

export default connect(mapStateToProps)(UploadMediator);
