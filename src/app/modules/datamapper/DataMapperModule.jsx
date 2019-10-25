/* base */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
/* actions */
import * as actions from 'services/actions/general';
import * as nodeActions from 'services/actions/nodeBackend';

/* mutations */
import SurveyMutation from 'mediators/DataMapperMediators/WrapUpMediator/mutations/SurveyMutation';

/* components */
import Stepper from 'components/Stepper/Stepper';
import Snackbar from 'components/Snackbar/Snackbar';
/* consts */
import { columnValues } from 'mediators/DataMapperMediators/WrapUpMediator/WrapUpMediator.const';
import { defModelOptions } from 'mediators/DataMapperMediators/UploadMediator/UploadMediator.util';

/* utils */
import {
  addInEmptyFieldRows,
  checkEmptyFields,
  checkMetadata
} from 'modules/datamapper/DataMapperModule.util';
import find from 'lodash/find';
import { Helmet } from 'react-helmet';
import isEqual from 'lodash/isEqual';
/* styles */
import {
  ModuleContainer,
  ModuleContent,
  ModuleFooter,
  ModuleHeader
} from './DataMapperModule.styles';
/* fragments */
import ManMappingStep from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep';
import MetaDataMediator from 'mediators/DataMapperMediators/MetaDataMediator/MetaDataMediator';
import UploadMediator from 'mediators/DataMapperMediators/UploadMediator/UploadMediator';
import OverviewStep from 'modules/datamapper/fragments/OverviewStep/OverviewStep';
import CorrectErrorsMediator from 'mediators/DataMapperMediators/CorrectErrorsMediator/CorrectErrorsMediator';
import WrapUpMediator from 'mediators/DataMapperMediators/WrapUpMediator/WrapUpMediator';
import AddSourceMutation from 'mediators/DataMapperMediators/mutations/AddSourceMutation';
import AddFileMutation from 'mediators/DataMapperMediators/mutations/UploadFileMutation';

class DataMapperModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      // these are the required fields that the users
      // needs to have in their data model and map it
      // if they don't select or dont have these fields
      // the manual mapping will have to be adjusted
      // for the to be able to populate/fill them
      mapReqFields: ['indicator', 'date', 'geolocation'],

      manMapEmptyValue: false,
      manMapEmptyFields: false,
      manMapEmptyFormat: false,
      emptyValColFormat: false,
      mapStepDisabled: false,
      loading: props.edit,

      metaDataEmptyFields: [],
      stepsDisabled: false,

      openSnackbar: false,
      errorMessage: ''
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this);
    this.saveMetadata = this.saveMetadata.bind(this);
    this.handleSourceCompleted = this.handleSourceCompleted.bind(this);
    this.handleSourceError = this.handleSourceError.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
    this.handleSurveyCompleted = this.handleSurveyCompleted.bind(this);
    this.handleSurveyError = this.handleSurveyError.bind(this);
    this.updateSurveyData = this.updateSurveyData.bind(this);
    this.handleMetaDataCompleted = this.handleMetaDataCompleted.bind(this);
    this.handleMetaDataError = this.handleMetaDataError.bind(this);
    this.updateMetaData = this.updateMetaData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.saveStepDataInitial());
    // so if its the edit dataset page
    // we will call the stepData from the zoomBackend
    if (this.props.match.path.indexOf('dataset') !== -1) {
      this.props.dispatch(
        nodeActions.getDatasetRequest({
          authId: this.props.user.authId,
          datasetId: this.props.match.params.id
        })
      );
      this.setState({ loading: true });
    }
  }

  componentDidUpdate(prevProps) {
    // and when we have retrieved the datasets data we update the stepData
    // redux variable with the data from it
    if (
      !isEqual(this.props.dataset.data, prevProps.dataset.data) &&
      this.props.dataset.data
    ) {
      if (!isEqual(this.props.dataset.data.stepData, this.props.stepData)) {
        if (this.props.dataset.data.stepData) {
          this.props.dispatch(
            actions.saveStepDataRequest({
              ...this.props.dataset.data.stepData,
              uploadData: {
                ...this.props.dataset.data.stepData.uploadData,
                modelOptions: defModelOptions
              }
            })
          );
          this.setState({
            loading: true
          });
        } else {
          this.setState({ loading: false });
          this.props.dispatch(actions.saveStepDataInitial());
        }
      } else {
        this.setState({ loading: false });
      }
    }

    if (
      this.state.loading &&
      !isEqual(this.props.stepData, prevProps.stepData)
    ) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    // and we reset the values in the reducer
    this.props.dispatch(actions.saveStepDataInitial());
    this.props.dispatch(nodeActions.getDatasetInitial());
  }

  // basically checks if next button should be disabled
  // depending on the current step
  nextDisabled() {
    if (this.state.step === 1) {
      // we check if the title is empty
      return (
        !this.props.stepData.metaData ||
        !this.props.stepData.metaData.title ||
        this.props.stepData.metaData.title.length === 0 ||
        !this.props.stepData.metaData.desc ||
        this.props.stepData.metaData.desc.length === 0 ||
        !this.props.stepData.metaData.dataSource.value ||
        this.props.stepData.metaData.dataSource.value.length === 0 ||
        !this.props.stepData.metaData.org ||
        this.props.stepData.metaData.org.length === 0 ||
        !this.props.stepData.metaData.year ||
        this.props.stepData.metaData.year.length === 0 ||
        !/^\d+$/.test(this.props.stepData.metaData.year) ||
        this.props.stepData.metaData.year.length > 4
      );
    }

    if (this.state.step === 2) {
      return (
        !this.props.stepData.manMapData ||
        this.props.stepData.manMapData.length === 0
      );
    }

    if (this.state.step === 4) {
      // So here we check if the fourth steps data has been saved
      // and if it contains anything because what we actually save here
      // are the error that we retrieve for this step
      // and the user should be able to progress only if they've fixed
      // all the found errors
      return (
        !this.state.stepsDisabled && this.props.stepData.errorColumns.length > 0
      );
    }

    return false;
  }

  nextStep() {
    // so here we'l incapsulate the user restrictions
    // for progressing forward though we really need
    // TODO: retweek the whole datamapper data saving
    // in a DataMapperMediator, cause now its scattered
    // all over the place
    this.setState((prevState, props) => {
      const { stepData } = props;
      if (prevState.step === 1) {
        // and this bool will be used to save the general state if some
        // fields are undefined
        const metaDataEmptyFields = checkMetadata(stepData);

        if (metaDataEmptyFields.length > 0) {
          props.dispatch(actions.saveStepDataRequest(stepData));
          return {
            openSnackbar: true,
            errorMessage: 'Please fill the required fields',
            metaDataEmptyFields
          };
        }

        if (
          this.props.match.path.indexOf('dataset') !== -1 &&
          (!this.props.dataset.data ||
            !this.props.dataset.data.stepData ||
            !this.props.dataset.data.stepData.overviewData)
        ) {
          return {
            openSnackbar: true,
            errorMessage: `Only datasets mapped out after ${process.env.REACT_APP_OLD_INFO_DATE} can have all of their data edited`,
            metaDataEmptyFields
          };
        }

        return { metaDataEmptyFields, step: prevState.step + 1 };
      } else if (prevState.step === 2) {
        if (!stepData.uploadData) {
          return {
            openSnackbar: true,
            errorMessage: 'Please upload a file'
          };
        } else if (!stepData.manMapData || stepData.manMapData.length === 0) {
          return {
            openSnackbar: true,
            errorMessage: 'File uploading please wait...'
          };
        }

        return { step: prevState.step + 1 };
      } else if (prevState.step === 4) {
        // So here we check if the fourth steps data has been saved
        // and if it contains anything because what we actually save here
        // are the error that we retrieve for this step
        // and the user should be able to progress only if they've fixed
        // all the found errors
        if (!prevState.stepsDisabled && stepData.errorColumns.length > 0) {
          return {
            openSnackbar: true,
            errorMessage: 'Please correct errors before proceeding'
          };
        }

        return { step: prevState.step + 1 };
      }
      // restriction for the manual mapping step
      else if (prevState.step === 5) {
        const { manMapData } = stepData;

        const emptyFields = checkEmptyFields(
          manMapData,
          prevState.mapReqFields
        );

        // here we add in the logic to check if the value format needs to be in the
        // users file and if its selected or not
        let manMapEmptyFormat = false;
        if (
          find(manMapData, ['zoomModel', 'Mixed Value']) &&
          !find(manMapData, ['zoomModel', 'value_format'])
        ) {
          manMapEmptyFormat = true;
        }

        let emptyValColFormat = false;

        for (let i = 0; i < manMapData.length; i += 1) {
          if (
            columnValues.indexOf(manMapData[i].zoomModel) !== -1 &&
            (!manMapData[i].label ||
              !manMapData[i].lockedIn ||
              manMapData[i].label.length === 0)
          ) {
            emptyValColFormat = true;
          }
        }

        if (
          emptyFields.length > 0 ||
          find(manMapData, item => {
            return (
              item.emptyFieldRow &&
              (!item.label || item.label.length === 0 || !item.lockedIn)
            );
          })
        ) {
          const manMapEmptyFields = emptyFields.length > 1;

          stepData.manMapData = addInEmptyFieldRows(emptyFields, manMapData);

          props.dispatch(actions.saveStepDataRequest(stepData));

          return {
            emptyValColFormat,
            manMapEmptyFields,
            manMapEmptyFormat
          };
        }
        if (manMapEmptyFormat || emptyValColFormat) {
          return { manMapEmptyFormat, emptyValColFormat };
        }
        return {
          step: prevState.step + 1,
          manMapEmptyFormat,
          emptyValColFormat,
          manMapEmptyFields: false,
          manMapEmptyValue: false
        };
      } else return { step: prevState.step + 1 };
    });
  }

  prevStep() {
    this.setState(prevState => {
      return { step: prevState.step - 1 };
    });
  }

  updateSurveyData() {
    const { metaData } = this.props.stepData;

    const dataCleaningTechniques = [];
    metaData.q51.forEach(q => {
      dataCleaningTechniques.push(q.value.trim());
    });
    const variables = {
      id: this.state.surveyId,
      haveYouTestedTool: metaData.q1,
      whoDidYouTestWith: metaData.q2.map(q => {
        return q.value;
      }),
      consideredSenstive: metaData.q21,
      askSensitive: metaData.q22,
      selectRespondents: metaData.q3Text,
      howManyRespondents: metaData.q4Text,
      staffTrained: metaData.q22,
      editSheet: metaData.q5,
      dataCleaningTechniques,
      otherCleaningTechnique:
        dataCleaningTechniques.indexOf('0') !== -1 ? metaData.q51Text : ''
    };

    // and here we upload all the metadata for the file
    SurveyMutation.commit(
      this.props.stepData.environment,
      variables,
      this.handleSurveyCompleted,
      this.handleSurveyError
    );
  }

  saveMetadata() {
    const metaDataEmptyFields = checkMetadata(this.props.stepData);

    if (metaDataEmptyFields.length > 0) {
      this.setState({
        openSnackbar: true,
        errorMessage: 'Please fill the required fields',
        metaDataEmptyFields
      });
    } else if (this.props.stepData.metaData.surveyData === 'Yes') {
      // we add the survey data
      this.updateSurveyData();
    } else if (this.props.stepData.metaData.dataSource.key === 'other') {
      this.updateDataSource(this.props.stepData.metaData.dataSource.value);
    } else {
      // otherwise we just add the existing source id
      // and then add the metadata
      this.updateMetaData();
    }
  }

  handleSurveyCompleted(response, error) {
    if (error) {
      console.log('error adding survey data:', error);
    } else if (response) {
      this.setState(
        {
          surveyId: response.surveyData.id
        },
        this.afterSurvey
      );
    }
  }

  handleSourceCompleted(response) {
    if (response) {
      this.setState(
        {
          sourceId: response.fileSource.entryId,
          sourceName: response.fileSource.name
        },
        this.updateMetaData
      );
    }
  }

  handleSourceError(error) {
    console.log('error adding data source: ', error);
  }

  updateDataSource(name) {
    AddSourceMutation.commit(
      this.props.stepData.environment,
      name,
      this.handleSourceCompleted,
      this.handleSourceError
    );
  }

  afterSurvey() {
    if (this.props.stepData.metaData.dataSource.key === 'other') {
      this.updateDataSource(this.props.stepData.metaData.dataSource.value);
    } else {
      this.updateMetaData();
    }
  }

  handleSurveyError(error) {
    console.log('error adding survey data: ', error);
  }

  handleMetaDataCompleted(response, error) {
    if (error) {
      console.log('error uploading file:', error);
    } else if (response) {
      let teams = [];

      // and after everything is done mapping we can actually
      // save the dataset into our zoom backend
      let accessibility = 'p';

      if (this.props.stepData.metaData.accessibility === 'Public') {
        accessibility = 'a';
      } else if (this.props.stepData.metaData.accessibility === 'Team') {
        accessibility = 'o';
        teams = this.props.user.groups.map(group => group.name);
      }

      // and after everything is done mapping we can actually
      // save the dataset into our zoom backend
      this.props.dispatch(
        nodeActions.updateDatasetRequest({
          authId: this.props.user.authId,
          datasetId: this.props.match.params.id,
          name: this.props.stepData.metaData.title,
          dataSource:
            this.state.sourceName ||
            this.props.stepData.metaData.dataSource.label,
          teams,
          public: accessibility,
          stepData: {
            ...this.props.stepData,
            metaData: {
              ...this.props.stepData.metaData,
              dataSource:
                this.props.stepData.metaData.dataSource.label.toLowerCase() ===
                'add new'
                  ? {
                      label: this.state.sourceName,
                      key: this.state.sourceId,
                      value: this.state.sourceId
                    }
                  : this.props.stepData.metaData.dataSource
            }
          }
        })
      );

      this.props.history.push('/dashboard');
    }
  }

  handleMetaDataError(error) {
    console.log('error uploading file: ', error);
  }

  updateMetaData() {
    const { metaData } = this.props.stepData;

    // This is shared data set 'p' for private, 'o' for team and 'a' public for all
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
      id: parseInt(this.props.match.params.id, 10),
      title: metaData.title,
      description: metaData.desc,
      containsSubnationalData: true,
      organisation: metaData.org,
      maintainer: 'Unavailable',
      methodology: 'Unavailable',
      defineMethodology: 'Unavailable',
      updateFrequency: 'Unavailable',
      comments: 'Unavailable',
      accessibility,
      dataQuality: 'Unavailable',
      dateOfDataset: metaData.year,
      fileTypes: 'csv',
      file: this.props.stepData.uploadData.url,
      numberOfRows: '1',
      // Location should always be 2, until we start using different data
      // or we get more selections in the metadata step.
      // Location 2 is for the 'world' location
      location: '2',
      surveyData:
        this.state.surveyId || this.props.stepData.wrapUpData.surveyId || null,
      source: this.state.sourceId || metaData.dataSource.value
      // tags
    };

    // and here we upload all the metadata for the file
    AddFileMutation.commit(
      this.props.stepData.environment,
      variables,
      this.handleMetaDataCompleted,
      this.handleMetaDataError
    );
  }

  renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <MetaDataMediator
            metaData={this.props.metaData}
            path={this.props.match.path}
            id={this.props.match.params.id}
            alwaysSave
            dropDownData={this.props.dropDownData}
            metaDataEmptyFields={this.state.metaDataEmptyFields}
          />
        );
      case 2:
        return this.props.stepData.metaData && <UploadMediator />;
      case 3:
        return this.props.stepData.overviewData && <OverviewStep />;
      case 4:
        return (
          this.props.stepData.uploadData && (
            <CorrectErrorsMediator
              stepsDisabled={this.state.stepsDisabled}
              fileCorrection={this.props.fileCorrection}
            />
          )
        );
      case 5:
        return (
          this.props.stepData.manMapData && (
            <ManMappingStep
              emptyValColFormat={this.state.emptyValColFormat}
              emptyFormat={this.state.manMapEmptyFormat}
              emptyValue={this.state.manMapEmptyValue}
              manMapEmptyFields={this.state.manMapEmptyFields}
              mapReqFields={this.state.mapReqFields}
            />
          )
        );
      case 6:
        return (
          this.props.stepData.metaData &&
          this.props.stepData.uploadData && (
            <WrapUpMediator
              auth0Client={this.props.auth0Client}
              disableSteps={() => this.setState({ stepsDisabled: true })}
              disableMapStep={value =>
                this.setState({ mapStepDisabled: value })
              }
              mapStepDisabled={this.state.mapStepDisabled}
            />
          )
        );
      default:
        return <div> No Such Step </div>;
    }
  }

  render() {
    let moduleDisabled = false;

    if (this.state.step === 5 && this.state.mapStepDisabled) {
      moduleDisabled = true;
    } else if (
      this.state.stepsDisabled &&
      this.state.step !== 6 &&
      this.state.step !== 5
    ) {
      moduleDisabled = true;
    }

    const oldDataset =
      this.props.match.path.indexOf('dataset') !== -1 &&
      (!this.props.dataset.data ||
        !this.props.dataset.data.stepData ||
        !this.props.dataset.data.stepData.overviewData);

    return (
      <>
        {!this.state.loading && (
          <ModuleContainer>
            <Helmet>
              <title>Zoom - Convert Data</title>
            </Helmet>
            <Snackbar
              message={this.state.errorMessage}
              open={this.state.openSnackbar}
              onClose={() => this.setState({ openSnackbar: false })}
            />
            <ModuleHeader>
              <Stepper
                oldDataset={oldDataset}
                saveMetadata={() => this.saveMetadata()}
                path={this.props.match.path}
                step={this.state.step}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                nextDisabled={this.nextDisabled()}
              />
            </ModuleHeader>

            <ModuleContent
              style={
                moduleDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}
              }
            >
              {this.renderStep()}
            </ModuleContent>

            <ModuleFooter>
              <Stepper
                oldDataset={oldDataset}
                saveMetadata={() => this.saveMetadata()}
                path={this.props.match.path}
                onlyButtons
                step={this.state.step}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                nextDisabled={this.nextDisabled()}
              />
            </ModuleFooter>
          </ModuleContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataset: state.dataset,
    stepData: state.stepData.stepzData,
    user: state.currentUser.data
  };
};

export default withRouter(connect(mapStateToProps)(DataMapperModule));
