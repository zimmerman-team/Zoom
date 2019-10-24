import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
/* actions */
import * as generalActions from 'services/actions/general';
import * as nodeActions from 'services/actions/nodeBackend';
/* components */
import WrapUpStep from 'modules/datamapper/fragments/WrapUpStep/WrapUpStep';
/* mutations */
import AddFileMutation from 'mediators/DataMapperMediators/mutations/UploadFileMutation';
import AddSourceMutation from 'mediators/DataMapperMediators/mutations/AddSourceMutation';
import SurveyMutation from 'mediators/DataMapperMediators/WrapUpMediator/mutations/SurveyMutation';
import MappingMutation from 'mediators/DataMapperMediators/WrapUpMediator/mutations/MappingMutation';
/* consts */
import { uploadInitialstate } from '__consts__/UploadMediatorConst';
import { step1InitialData } from '__consts__/DataMapperStepConsts';
/* utils */
import { formatMapJson } from 'mediators/DataMapperMediators/WrapUpMediator/WrapUpMediator.util';

const propTypes = {
  environment: PropTypes.shape({}),
  metaData: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    dataSource: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    }),
    shared: PropTypes.Boolean,
    surveyData: PropTypes.Boolean,
    q1: PropTypes.string,
    q2: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    q21: PropTypes.string,
    q22: PropTypes.string,
    q3: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    q4: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    }),
    q5: PropTypes.string,
    q51: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    errorColumns: PropTypes.arrayOf(PropTypes.string),
    sourceText: PropTypes.string,
    q3Text: PropTypes.string,
    q4Text: PropTypes.string,
    q51Text: PropTypes.string,
    fileSources: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    environment: PropTypes.shape({})
  }),
  file: PropTypes.shape({}),
  fileId: PropTypes.string,
  fileUrl: PropTypes.string,
  mappingJson: PropTypes.shape({}),
  mappingData: PropTypes.arrayOf(
    PropTypes.shape({
      lockedIn: PropTypes.bool,
      fileType: PropTypes.string,
      zoomModel: PropTypes.string,
      label: PropTypes.string,
      selectDisabled: PropTypes.bool
    })
  ),
  wrapUpData: PropTypes.shape({
    sourceId: PropTypes.string,
    surveyId: PropTypes.string
  }),
  disableMapStep: PropTypes.func,
  saveStepData: PropTypes.func,
  disableSteps: PropTypes.func
};
const defaultProps = {
  metaData: step1InitialData,
  file: uploadInitialstate.file,
  fileId: uploadInitialstate.fileId,
  fileUrl: '',
  environment: {},
  wrapUpData: {},
  mappingJson: uploadInitialstate.mappingJson,
  mappingData: uploadInitialstate.manMapData,
  disableMapStep: undefined,
  saveStepData: undefined,
  disableSteps: undefined
};

class WrapUpMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      mappingErrors: [],
      sourceName: undefined,
      sourceId: undefined,
      surveyId: ''
    };

    this.handleSourceCompleted = this.handleSourceCompleted.bind(this);
    this.handleSourceError = this.handleSourceError.bind(this);
    this.addDataSource = this.addDataSource.bind(this);
    this.handleSurveyCompleted = this.handleSurveyCompleted.bind(this);
    this.handleSurveyError = this.handleSurveyError.bind(this);
    this.addSurveyData = this.addSurveyData.bind(this);
    this.handleMetaDataCompleted = this.handleMetaDataCompleted.bind(this);
    this.handleMetaDataError = this.handleMetaDataError.bind(this);
    this.addMetaData = this.addMetaData.bind(this);
    this.handleMappingCompleted = this.handleMappingCompleted.bind(this);
    this.handleMappingError = this.handleMappingError.bind(this);
    this.addMapping = this.addMapping.bind(this);
    this.afterSurvey = this.afterSurvey.bind(this);
    this.afterSource = this.afterSource.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    if (!this.props.stepsDisabled) {
      this.props.disableSteps();
      if (this.props.metaData.surveyData === 'Yes') {
        // we add the survey data
        this.addSurveyData();
      } else if (this.props.metaData.dataSource.key === 'other') {
        this.addDataSource(this.props.metaData.dataSource.value);
      }
      // otherwise we just add the existing source id
      // and then add the metadata
      else this.addMetaData();
    }
  }

  handleSourceCompleted(response, error) {
    if (response) {
      this.props.dispatch(
        generalActions.saveStepDataRequest({
          ...this.props.stepData,
          metaData: {
            ...this.props.stepData.metaData,
            dataSource: {
              ...this.props.stepData.metaData.dataSource,
              key: response.fileSource.entryId,
              value: response.fileSource.entryId
            }
          }
        })
      );
      this.setState(
        {
          sourceId: response.fileSource.entryId,
          sourceName: response.fileSource.name
        },
        this.addMetaData
      );
    }
  }

  handleSourceError(error) {
    console.log('error adding data source: ', error);
  }

  addDataSource(name) {
    if (!this.props.wrapUpData.sourceId) {
      AddSourceMutation.commit(
        this.props.environment,
        name,
        this.handleSourceCompleted,
        this.handleSourceError
      );
    } else {
      this.setState(
        { sourceId: this.props.wrapUpData.sourceId },
        this.afterSource
      );
    }
  }

  saveData() {
    const stepData = { ...this.props.stepData };

    stepData.wrapUpData = {
      sourceId: this.state.sourceId,
      surveyId: this.state.surveyId
    };
    this.props.dispatch(generalActions.saveStepDataRequest(stepData));
  }

  afterSource() {
    this.addMetaData();
    this.saveData();
  }

  handleSurveyCompleted(response, error) {
    if (error) console.log('error adding survey data:', error);
    if (response) {
      this.setState(
        {
          surveyId: response.surveyData.id
        },
        this.afterSurvey
      );
    }
  }

  afterSurvey() {
    if (this.props.metaData.dataSource.key === 'other') {
      this.addDataSource(this.props.metaData.dataSource.value);
    } else this.addMetaData();

    this.saveData();
  }

  handleSurveyError(error) {
    console.log('error adding survey data: ', error);
  }

  addSurveyData() {
    if (!this.props.wrapUpData.surveyId) {
      const { metaData } = this.props;

      const dataCleaningTechniques = [];
      metaData.q51.forEach(q => {
        dataCleaningTechniques.push(q.value.trim());
      });

      const variables = {
        haveYouTestedTool: metaData.q1,
        whoDidYouTestWith: metaData.q2.map(q => {
          return q.value;
        }),
        consideredSenstive: metaData.q21,
        staffTrained: metaData.q22,
        askSensitive: metaData.q22,
        selectRespondents: metaData.q3Text,
        howManyRespondents: metaData.q4Text,
        editSheet: metaData.q5,
        dataCleaningTechniques
      };

      // so if other choice has been selected, we add in the
      // text value in other
      if (dataCleaningTechniques.indexOf('0') !== -1) {
        variables.otherCleaningTechnique = metaData.q51Text;
      }

      // and here we upload all the metadata for the file
      SurveyMutation.commit(
        this.props.environment,
        variables,
        this.handleSurveyCompleted,
        this.handleSurveyError
      );
    } else {
      this.setState(
        { surveyId: this.props.wrapUpData.surveyId },
        this.afterSurvey
      );
    }
  }

  handleMetaDataCompleted(response, error) {
    if (error) console.log('error uploading file:', error);

    if (response) this.addMapping();
  }

  handleMetaDataError(error) {
    console.log('error uploading file: ', error);
  }

  addMetaData() {
    const { metaData } = this.props;

    const fileType = /[.]/.exec(this.props.file.name)
      ? /[^.]+$/.exec(this.props.file.name)
      : [''];

    let accessibility = 'p';

    if (metaData.accessibility === 'Public') {
      accessibility = 'a';
    } else if (metaData.accessibility === 'Team') {
      accessibility = 'o';
    }

    // const tags = metaData.tags.map(tag => {
    //   return { name: tag };
    // });

    // and here we just use some random data, just to be able to upload the file
    const variables = {
      id: this.props.fileId,
      title: metaData.title,
      description: metaData.desc,
      containsSubnationalData: true,
      organisation: metaData.org,
      maintainer: 'Unavailable field',
      methodology: 'Unavailable field',
      defineMethodology: 'Unavailable field',
      updateFrequency: 'Unavailable field',
      comments: 'Unavailable field',
      dateOfDataset: metaData.year,
      accessibility,
      dataQuality: 'Unavailable field',
      numberOfRows: '1',
      fileTypes: fileType[0],
      // Location should always be 2, until we start using different data
      // or we get more selections in the metadata step.
      // Location 2 is for the 'world' location
      location: '2',

      source: this.state.sourceId
        ? this.state.sourceId
        : this.props.metaData.dataSource.value,
      // tags,
      file: this.props.fileUrl
    };

    if (
      this.props.metaData.surveyData === 'Yes' &&
      this.state.surveyId &&
      this.state.surveyId.length > 0
    ) {
      variables.surveyData = this.state.surveyId;
    }

    // and here we upload all the metadata for the file
    AddFileMutation.commit(
      this.props.environment,
      variables,
      this.handleMetaDataCompleted,
      this.handleMetaDataError
    );
  }

  handleMappingCompleted(response, error) {
    const mappingErrors = [...this.state.mappingErrors];
    if (error) {
      this.props.disableMapStep(false);
      mappingErrors.push(error);
    }
    if (response && !error) {
      this.props.disableMapStep(true);

      let teams = [];

      // and after everything is done mapping we can actually
      // save the dataset into our zoom backend
      let accessibility = 'p';

      if (this.props.metaData.accessibility === 'Public') {
        accessibility = 'a';
      } else if (this.props.metaData.accessibility === 'Team') {
        accessibility = 'o';
        teams = this.props.user.groups.map(group => group.name);
      }

      const datasetData = {
        authId: this.props.user.authId,
        datasetId: this.props.fileId,
        name: this.props.metaData.title,
        dataSource:
          this.state.sourceName || this.props.metaData.dataSource.label,
        teams,
        public: accessibility,
        stepData: {
          ...this.props.stepData,
          uploadData: {
            ...this.props.stepData.uploadData,
            file: {
              name: this.props.stepData.uploadData.file.name
            }
          }
        }
      };

      if (this.props.dataset.data) {
        this.props.dispatch(nodeActions.updateDatasetRequest(datasetData));
      } else {
        this.props.dispatch(nodeActions.addNewDatasetRequest(datasetData));
      }
    }

    this.setState({ loading: false, mappingErrors });
  }

  handleMappingError(error) {
    const mappingErrors = [...this.state.mappingErrors];
    if (error) {
      this.props.disableMapStep(false);
      mappingErrors.push(error);
    }
    this.setState({ loading: false, mappingErrors });
  }

  addMapping() {
    const data = JSON.stringify(
      formatMapJson(
        this.props.mappingJson,
        this.props.mappingData,
        this.props.fileId
      )
    );

    const variables = {
      data
    };

    MappingMutation.commit(
      this.props.environment,
      variables,
      this.handleMappingCompleted,
      this.handleMappingError
    );
  }

  render() {
    return (
      <WrapUpStep
        loading={this.state.loading}
        errors={this.state.mappingErrors}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser.data,
    datasetAdded: state.datasetAdded,
    metaData: state.stepData.stepzData.metaData,
    wrapUpData: state.stepData.stepzData.wrapUpData,
    environment: state.stepData.stepzData.environment,
    file: state.stepData.stepzData.uploadData.file,
    fileId: state.stepData.stepzData.uploadData.fileId,
    fileUrl: state.stepData.stepzData.uploadData.url,
    mappingJson: state.stepData.stepzData.uploadData.mappingJson,
    mappingData: state.stepData.stepzData.manMapData,
    stepData: state.stepData.stepzData,
    dataset: state.dataset
  };
};

WrapUpMediator.propTypes = propTypes;
WrapUpMediator.defaultProps = defaultProps;

export default connect(mapStateToProps)(WrapUpMediator);
