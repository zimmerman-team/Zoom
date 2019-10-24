import React from 'react';
import DatasetModule from 'modules/dataset/DatasetModule';
import { withRouter } from 'react-router';
import { createRefetchContainer, graphql } from 'react-relay';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
/* mutations */
import AddSourceMutation from 'mediators/DataMapperMediators/mutations/AddSourceMutation';
import SurveyMutation from 'mediators/DataMapperMediators/WrapUpMediator/mutations/SurveyMutation';
import AddFileMutation from 'mediators/DataMapperMediators/mutations/UploadFileMutation';
/* utils */
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { fetchQuery } from 'relay-runtime';
/* actions */
import * as actions from 'services/actions/general';
import * as nodeActions from 'services/actions/nodeBackend';
/* consts */
import { numberOptions } from 'modules/datamapper/fragments/MetaData/MetaData.consts';
import { step1InitialData } from '__consts__/DataMapperStepConsts';
/* components */
import Snackbar from 'components/Snackbar/Snackbar';

const surveyQuery = graphql`
  query DatasetMediatorQuery($entryId: Float!) {
    allSurveyDatas(entryId: $entryId) {
      edges {
        node {
          entryId
          haveYouTestedTool
          whoDidYouTestWith
          consideredSenstive
          staffTrained
          askSensitive
          selectRespondents
          howManyRespondents
          editSheet
          dataCleaningTechniques
          otherCleaningTechnique
        }
      }
    }
  }
`;

const propTypes = {
  datasetUpdated: PropTypes.shape({}),
  stepMetaData: PropTypes.shape({}),
  stepData: PropTypes.shape({
    metaData: PropTypes.shape({})
  }),
  dropDownData: PropTypes.shape({
    allFileSources: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    })
  })
};

const defaultProps = {
  datasetUpdated: {},
  stepMetaData: { ...step1InitialData.metaData },
  stepData: {
    metaData: { ...step1InitialData.metaData }
  },
  dropDownData: {}
};

class DatasetMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateOfDataset: '',
      fileTypes: '',
      file: '',
      team: '',
      loadComponent: false,
      sourceName: undefined,
      surveyId: null,
      openSnackbar: false,
      errorMessage: 'error',
      metaDataEmptyFields: []
    };

    this.refetch = this.refetch.bind(this);
    this.saveStepData = this.saveStepData.bind(this);
    this.saveDataset = this.saveDataset.bind(this);
    this.handleSourceCompleted = this.handleSourceCompleted.bind(this);
    this.handleSourceError = this.handleSourceError.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
    this.handleSurveyCompleted = this.handleSurveyCompleted.bind(this);
    this.handleSurveyError = this.handleSurveyError.bind(this);
    this.updateSurveyData = this.updateSurveyData.bind(this);
    this.handleMetaDataCompleted = this.handleMetaDataCompleted.bind(this);
    this.handleMetaDataError = this.handleMetaDataError.bind(this);
    this.updateMetaData = this.updateMetaData.bind(this);
    this.saveDisabled = this.saveDisabled.bind(this);
  }

  componentDidMount() {
    this.refetch();
  }

  componentDidUpdate(prevProps) {
    // so this should happen only once and then we get the survey data
    // things
    if (!isEqual(this.props.metaData, prevProps.metaData)) {
      const { node: fileMetaData } = this.props.metaData.allFiles.edges[0];

      const yearEndInd = fileMetaData.dateOfDataset.indexOf('-');

      const year =
        yearEndInd !== -1
          ? fileMetaData.dateOfDataset.substring(0, yearEndInd)
          : fileMetaData.dateOfDataset;

      let accessibility = 'Private';

      if (fileMetaData.accessibility.toLowerCase() === 'a') {
        accessibility = 'Public';
      } else if (fileMetaData.accessibility.toLowerCase() === 'o') {
        accessibility = 'Team';
      }

      let metaStepData = {
        title: fileMetaData.title,
        desc: fileMetaData.description,
        org: fileMetaData.organisation,
        year,
        dataSource: {
          key: fileMetaData.source.name,
          label: fileMetaData.source.name,
          value: fileMetaData.source.entryId
        },
        accessibility,
        surveyData: 'Yes'
      };

      if (fileMetaData.surveyData) {
        const refetchVars = {
          entryId: fileMetaData.surveyData.entryId
        };

        fetchQuery(this.props.relay.environment, surveyQuery, refetchVars).then(
          data => {
            // so we set the initial state of the step data
            const { node: actualSurveyData } = data.allSurveyDatas.edges[0];

            metaStepData.surveyData = 'Yes';

            const q2 = actualSurveyData.whoDidYouTestWith.split(',');

            const q51 = [];

            actualSurveyData.dataCleaningTechniques.split(',').forEach(item => {
              if (item.indexOf('None') === -1) {
                const newIt = item.length > 0 ? item.trim() : '2';
                q51.push({ label: newIt, value: newIt });
              }
            });

            const surveyStepData = {
              q1: actualSurveyData.haveYouTestedTool,
              q2: q2.map(item => {
                const newIt = item.length > 0 ? item.trim() : '2';

                return { label: newIt, value: newIt };
              }),
              q21: actualSurveyData.consideredSenstive,
              q22: actualSurveyData.askSensitive,
              q5: actualSurveyData.editSheet,
              q51,
              // will be adjusted later on
              q3Text: actualSurveyData.selectRespondents,
              q4Text: actualSurveyData.howManyRespondents,
              // will be adjusted later on
              q51Text: actualSurveyData.otherCleaningTechnique
            };

            metaStepData = {
              ...metaStepData,
              ...surveyStepData
            };

            this.setState(
              {
                fileTypes: fileMetaData.fileTypes,
                dateOfDataset: fileMetaData.dateOfDataset,
                file: fileMetaData.file.substring(
                  fileMetaData.file.indexOf('datasets')
                )
              },
              () => this.saveStepData(metaStepData)
            );
          }
        );
      } else {
        this.setState(
          {
            fileTypes: fileMetaData.fileTypes,
            dateOfDataset: fileMetaData.dateOfDataset,
            file: fileMetaData.file.substring(
              fileMetaData.file.indexOf('datasets')
            )
          },
          () => this.saveStepData(metaStepData)
        );
      }
    }

    // we render the underlying components
    if (
      !this.state.loadComponent &&
      !isEqual(this.props.stepData, prevProps.stepData) &&
      this.props.stepData.metaData.title.length > 0
    ) {
      this.setState({ loadComponent: true });
    }

    // and after the dataset gets updated
    // we redirect the user to the dashboard of datasets
    if (
      !isEqual(this.props.datasetUpdated.data, prevProps.datasetUpdated.data)
    ) {
      this.props.history.push('/dashboard/data-sets');
    }
  }

  componentWillUnmount() {
    // and we reset the values in the reducer
    this.props.dispatch(actions.saveStepDataInitial());
  }

  saveStepData(metaData) {
    const stepData = { ...this.props.stepData };
    stepData.metaData = {
      ...step1InitialData.metaData,
      ...metaData
    };

    this.props.dispatch(actions.saveStepDataRequest(stepData));
  }

  refetch() {
    const refetchVars = {
      entryId: this.props.match.params.id
    };

    this.props.relay.refetch(refetchVars);
  }

  saveDataset() {}

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
      this.props.relay.environment,
      name,
      this.handleSourceCompleted,
      this.handleSourceError
    );
  }

  handleSurveyCompleted(response, error) {
    if (error) console.log('error adding survey data:', error);
    else if (response) {
      this.setState(
        {
          surveyId: response.surveyData.id
        },
        this.afterSurvey
      );
    }
  }

  afterSurvey() {
    if (this.props.stepMetaData.dataSource.key === 'other') {
      this.updateDataSource(this.props.stepMetaData.dataSource.value);
    } else this.updateMetaData();
  }

  handleSurveyError(error) {
    console.log('error adding survey data: ', error);
  }

  updateSurveyData() {
    const { stepMetaData: metaData } = this.props;

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
      this.props.relay.environment,
      variables,
      this.handleSurveyCompleted,
      this.handleSurveyError
    );
  }

  handleMetaDataCompleted(response, error) {
    if (error) console.log('error uploading file:', error);
    else if (response) {
      let teams = [];

      // and after everything is done mapping we can actually
      // save the dataset into our zoom backend
      let accessibility = 'p';

      if (this.props.stepMetaData.accessibility === 'Public') {
        accessibility = 'a';
      } else if (this.props.stepMetaData.accessibility === 'Team') {
        accessibility = 'o';
        teams = this.props.user.groups.map(group => group.name);
      }

      // and after everything is done mapping we can actually
      // save the dataset into our zoom backend
      this.props.dispatch(
        nodeActions.updateDatasetRequest({
          authId: this.props.user.authId,
          datasetId: this.props.match.params.id,
          name: this.props.stepMetaData.title,
          dataSource:
            this.state.sourceName || this.props.stepMetaData.dataSource.label,
          teams,
          public: accessibility
        })
      );
    }
  }

  handleMetaDataError(error) {
    console.log('error uploading file: ', error);
  }

  updateMetaData() {
    const { stepMetaData: metaData } = this.props;

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
      fileTypes: this.state.fileTypes.toLowerCase(),
      file: this.state.file,
      numberOfRows: '1',
      // Location should always be 2, until we start using different data
      // or we get more selections in the metadata step.
      // Location 2 is for the 'world' location
      location: '2',
      surveyData: this.state.surveyId,
      source: this.state.sourceId
        ? this.state.sourceId
        : metaData.dataSource.value
      // tags
    };

    // and here we upload all the metadata for the file
    AddFileMutation.commit(
      this.props.relay.environment,
      variables,
      this.handleMetaDataCompleted,
      this.handleMetaDataError
    );
  }

  saveDisabled() {
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

  render() {
    // so we want to load the component only when the actual stepData
    // is filled in with the metadata of the dataset
    // for all of the underlying components to render properly
    return (
      <div>
        <Snackbar
          message={this.state.errorMessage}
          open={this.state.openSnackbar}
          onClose={() => this.setState({ openSnackbar: false })}
        />
        {this.state.loadComponent && (
          <DatasetModule
            metaDataEmptyFields={this.state.metaDataEmptyFields}
            saveDisabled={this.saveDisabled()}
            dropDownData={this.props.dropDownData}
            saveDataset={this.saveDataset}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser.data,
    datasetUpdated: state.datasetUpdated,
    stepMetaData: state.stepData.stepzData.metaData,
    stepData: state.stepData.stepzData
  };
};

DatasetMediator.propTypes = propTypes;
DatasetMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  connect(mapStateToProps)(withRouter(DatasetMediator)),
  graphql`
    fragment DatasetMediator_metaData on Query
      @argumentDefinitions(entryId: { type: "Float", defaultValue: -1 }) {
      allFiles(entryId: $entryId) {
        edges {
          node {
            entryId
            title
            description
            file
            organisation
            fileTypes
            dateOfDataset
            accessibility
            source {
              entryId
              name
            }
            surveyData {
              entryId
            }
          }
        }
      }
    }
  `,
  graphql`
    query DatasetMediator_metaDataRefetchQuery($entryId: Float!) {
      ...DatasetMediator_metaData @arguments(entryId: $entryId)
    }
  `
);
