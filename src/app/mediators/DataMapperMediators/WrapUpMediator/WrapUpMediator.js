import React from 'react';
import PropTypes from 'prop-types';

/* components */
import WrapUpStep from 'modules/datamapper/fragments/WrapUpStep/WrapUpStep';

/* mutations */
import AddFileMutation from 'mediators/DataMapperMediators/mutations/UploadFileMutation';
import AddSourceMutation from 'mediators/DataMapperMediators/mutations/AddSourceMutation';
import SurveyMutation from 'mediators/DataMapperMediators/WrapUpMediator/mutations/SurveyMutation';
import MappingMutation from 'mediators/DataMapperMediators/WrapUpMediator/mutations/MappingMutation';

/* consts */
import { uploadInitialstate } from '__consts__/UploadMediatorConst';
import { step1InitialData } from '__consts__/MetaDataStepConsts';

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
  )
};
const defaultProps = {
  metaData: step1InitialData,
  file: uploadInitialstate.file,
  fileId: uploadInitialstate.fileId,
  fileUrl: '',
  environment: {},
  mappingJson: uploadInitialstate.mappingJson,
  mappingData: uploadInitialstate.manMapData
};

export default class WrapUpMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceId: undefined,
      surveyId: ''
    };

    this.handleSourceCompleted = this.handleSourceCompleted.bind(this);
    this.handleSourceError = this.handleSourceError.bind(this);
    this.addDataSource = this.addDataSource.bind(this);
    this.handleSurveyCompleted = this.handleMetaDataCompleted.bind(this);
    this.handleSurveyError = this.handleMetaDataError.bind(this);
    this.addSurveyData = this.addSurveyData.bind(this);
    this.handleMetaDataCompleted = this.handleMetaDataCompleted.bind(this);
    this.handleMetaDataError = this.handleMetaDataError.bind(this);
    this.addMetaData = this.addMetaData.bind(this);
    this.handleMappingCompleted = this.handleMappingCompleted.bind(this);
    this.handleMappingError = this.handleMappingError.bind(this);
    this.addMapping = this.addMapping.bind(this);
  }

  componentDidMount() {
    if (!this.props.stepsDisabled) {
      this.props.disableSteps();
      // so here we'll handle the metada step
      if (this.props.metaData.surveyData === 'Yes')
        // we add the survey data
        this.addSurveyData();
      else if (this.props.metaData.dataSource.key === 'other')
        // we add the new source
        this.addDataSource(this.props.metaData.dataSource.value);
      // otherwise we just add the existing source id
      // and then add the metadata
      else this.addMetaData();
    }
  }

  handleSourceCompleted(response) {
    if (response) {
      this.setState(
        { sourceId: response.fileSource.entryId },
        this.addMetaData
      );
    }
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

  handleSurveyCompleted(response, error) {
    if (error) console.log('error adding survey data:', error);
    if (response) {
      this.setState(
        {
          surveyId: response.surveyData.id
        },
        this.props.metaData.dataSource.key === 'other'
          ? () => this.addDataSource(this.props.metaData.dataSource.value)
          : () => this.addMetaData()
      );
    }
  }

  handleSurveyError(error) {
    console.log('error adding survey data: ', error);
  }

  addSurveyData() {
    const { metaData } = this.props;

    const selectRespondents = [];
    metaData.q3.forEach(q => {
      // Cause currently we need to skip the other option
      // as the only accepted value is 'Other'
      if (q.label !== 'Other') selectRespondents.push(q.value);
    });

    const dataCleaningTechniques = [];
    metaData.q51.forEach(q => {
      // Cause currently we need to skip the other option
      // as the only accepted value is 'Other'
      if (q.label !== 'Other') dataCleaningTechniques.push(q.value);
    });

    const variables = {
      haveYouTestedTool: metaData.q1,
      whoDidYouTestWith: metaData.q2.map(q => {
        return q.value;
      }),
      consideredSenstive: metaData.q22,
      staffTrained: metaData.q21,
      askSensitive: metaData.q22,
      selectRespondents,
      other: 'Not needed field',
      howManyRespondents: metaData.q4.value,
      editSheet: metaData.q5,
      dataCleaningTechniques
    };

    // and here we upload all the metadata for the file
    SurveyMutation.commit(
      this.props.environment,
      variables,
      this.handleSurveyCompleted,
      this.handleSurveyError
    );
  }

  handleMetaDataCompleted(response, error) {
    if (error) console.log('error uploading file:', error);

    if (response) {
      this.addMapping();
    }
  }

  handleMetaDataError(error) {
    console.log('error uploading file: ', error);
  }

  addMetaData() {
    const { metaData } = this.props;

    // okay so the fileType has
    const today = new Date().toISOString();
    const isoDate = today.substring(0, today.indexOf('T'));

    const fileType = /[.]/.exec(this.props.file.name)
      ? /[^.]+$/.exec(this.props.file.name)
      : [''];

    // TODO: this commented out logic below will be added in the last step
    // along with every other metadata field
    // This is shared data set 'p' for private, 'o' for public
    const accessibility =
      typeof metaData.shared === 'string' && metaData.shared === 'Yes'
        ? 'o'
        : 'p';

    const tags = metaData.tags.map(tag => {
      return { name: tag };
    });

    // and here we just use some random data, just to be able to upload the file
    const variables = {
      id: this.props.fileId,
      title: metaData.title,
      description: metaData.desc,
      containsSubnationalData: true,
      organisation: 'Unavailable field',
      maintainer: 'Unavailable field',
      methodology: 'Unavailable field',
      defineMethodology: 'Unavailable field',
      updateFrequency: 'Unavailable field',
      comments: 'Unavailable field',
      dateOfDataset: isoDate,
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
      tags,
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
    if (error) {
      console.log('MAPPING ERROR', error);
    }
    if (response) {
      // console.log('MAPPING FINISHED', response);
    }
  }

  handleMappingError(error) {
    console.log('error mapping data: ', error);
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
    return <WrapUpStep />;
  }
}

WrapUpMediator.propTypes = propTypes;
WrapUpMediator.defaultProps = defaultProps;
