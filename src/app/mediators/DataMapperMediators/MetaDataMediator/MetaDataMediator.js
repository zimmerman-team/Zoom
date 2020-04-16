// @ts-nocheck
/* eslint-disable */

/* DATAMAPPER STEP 1 */

/* base */
import React from "react";
import PropTypes from "prop-types";
import MetaData from "app/modules/datamapper/fragments/MetaData/MetaData";
import graphql from "babel-plugin-relay/macro";
import { createRefetchContainer } from "react-relay";

import { connect } from "react-redux";
/* actions */
import * as actions from "app/services/actions/general";
/* utils */
import findIndex from "lodash/findIndex";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";
/* consts */
import { step1InitialData } from "app/__consts__/DataMapperStepConsts";
import { fetchQuery } from "relay-runtime";

const surveyQuery = graphql`
  query MetaDataMediatorQuery($entryId: Float!) {
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
  dropDownData: PropTypes.shape({
    allFileSources: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
          }),
        })
      ),
    }),
  }),
  id: PropTypes.number,
  path: PropTypes.string,
  dataSetEdit: PropTypes.bool,
  saveStepData: PropTypes.func,
  stepData: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    org: PropTypes.string,
    year: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    dataSource: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    accessibility: PropTypes.string,
    surveyData: PropTypes.Boolean,
    q1: PropTypes.string,
    q2: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    q21: PropTypes.string,
    q22: PropTypes.string,
    q3: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
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
      })
    ),
    sourceText: PropTypes.string,
    q3Text: PropTypes.string,
    q4Text: PropTypes.string,
    q51Text: PropTypes.string,
    alwaysSave: PropTypes.bool,
    fileSources: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }),
};

const defaultProps = {
  dropDownData: {},
  path: "mapper",
  id: -1,
  alwaysSave: false,
  dataSetEdit: false,
  saveStepData: undefined,
  stepData: step1InitialData,
  environment: null,
};

class MetaDataMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMetaLoading: false,
      dataLoaded: false,
      data: props.stepData.metaData
        ? props.stepData.metaData
        : step1InitialData.metaData,
    };

    this.simpleChange = this.simpleChange.bind(this);
    this.checkBoxChange = this.checkBoxChange.bind(this);
    this.dropDownChange = this.dropDownChange.bind(this);
    this.otherDropdownText = this.otherDropdownText.bind(this);
    this.onChipAdd = this.onChipAdd.bind(this);
    this.onChipDelete = this.onChipDelete.bind(this);
    this.getGQLMetadata = this.getGQLMetadata.bind(this);
  }

  componentDidMount() {
    if (
      this.props.path.indexOf("dataset") !== -1 &&
      Object.keys(this.props.stepData).length === 0
    ) {
      this.props.relay.refetch({
        entryId: this.props.id,
      });
    } else if (!this.props.stepData.metaData) {
      // so we set the initial state of the step data
      const stepData = { ...this.props.stepData };
      stepData.metaData = step1InitialData.metaData;
      stepData.environment = this.props.relay.environment;
      this.props.dispatch(actions.saveStepDataRequest(stepData));
    } else if (
      typeof this.props.stepData.environment === "string" ||
      !this.props.stepData.environment
    ) {
      const stepData = { ...this.props.stepData };
      stepData.environment = this.props.relay.environment;
      this.props.dispatch(actions.saveStepDataRequest(stepData));
    }

    let fileSources = this.props.dropDownData.allFileSources.edges.map(
      (node) => {
        return { label: node.node.name, value: node.node.entryId };
      }
    );
    fileSources = sortBy(fileSources, ["label"]);
    this.simpleChange(fileSources, "fileSources");
  }

  componentDidUpdate(prevProps) {
    // so we want the data to load only once from the props here.
    // this is mainly used for the dataset metadata edit page
    if (
      prevProps.stepData.metaData &&
      this.props.stepData.metaData &&
      this.props.stepData.metaData.title !==
        prevProps.stepData.metaData.title &&
      !this.state.dataLoaded
    ) {
      this.setState({
        dataLoaded: true,
        data: this.props.stepData.metaData,
      });
    }

    if (
      !isEqual(this.props.stepData, prevProps.stepData) &&
      (typeof this.props.stepData.environment === "string" ||
        !this.props.stepData.environment)
    ) {
      const stepData = { ...this.props.stepData };
      stepData.environment = this.props.relay.environment;
      this.props.dispatch(actions.saveStepDataRequest(stepData));
    }

    // this handles ONLY graphql retrieved metadata
    // and mainly used for old datasets
    if (!isEqual(this.props.metaData, prevProps.metaData)) {
      this.setState(
        {
          newMetaLoading: true,
        },
        () => this.getGQLMetadata()
      );
    }

    if (
      !isEqual(this.props.stepData.metaData, prevProps.stepData.metaData) &&
      this.state.newMetaLoading
    ) {
      this.setState({
        newMetaLoading: false,
        data: this.props.stepData.metaData,
      });
    }
  }

  onChipAdd(value) {
    const { tags } = this.state.data;
    tags.push(value);
    this.simpleChange(tags, "tags");
  }

  onChipDelete(index) {
    const { tags } = this.state.data;
    tags.splice(index, 1);
    this.simpleChange(tags, "tags");
  }

  getGQLMetadata() {
    const { node: fileMetaData } = this.props.metaData.allFiles.edges[0];

    const yearEndInd = fileMetaData.dateOfDataset.indexOf("-");

    const year =
      yearEndInd !== -1
        ? fileMetaData.dateOfDataset.substring(0, yearEndInd)
        : fileMetaData.dateOfDataset;

    let accessibility = "Private";

    if (fileMetaData.accessibility.toLowerCase() === "a") {
      accessibility = "Public";
    } else if (fileMetaData.accessibility.toLowerCase() === "o") {
      accessibility = "Team";
    }

    const file = fileMetaData.file.substring(
      fileMetaData.file.indexOf("datasets")
    );

    let metaStepData = {
      ...step1InitialData.metaData,
      ...this.state.data,
      title: fileMetaData.title,
      desc: fileMetaData.description,
      org: fileMetaData.organisation,
      year,
      dataSource: {
        key: fileMetaData.source.entryId,
        label: fileMetaData.source.name,
        value: fileMetaData.source.entryId,
      },
      accessibility,
      surveyData: "Yes",
    };

    if (fileMetaData.surveyData) {
      const refetchVars = {
        entryId: fileMetaData.surveyData.entryId,
      };

      fetchQuery(this.props.relay.environment, surveyQuery, refetchVars).then(
        (data) => {
          // so we set the initial state of the step data
          const { node: actualSurveyData } = data.allSurveyDatas.edges[0];

          metaStepData.surveyData = "Yes";

          const q2 = actualSurveyData.whoDidYouTestWith.split(",");

          const q51 = [];

          actualSurveyData.dataCleaningTechniques.split(",").forEach((item) => {
            if (item.indexOf("None") === -1) {
              const newIt = item.length > 0 ? item.trim() : "2";
              q51.push({ label: newIt, value: newIt });
            }
          });

          const surveyStepData = {
            q1: actualSurveyData.haveYouTestedTool,
            q2: q2.map((item) => {
              const newIt = item.length > 0 ? item.trim() : "2";

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
            q51Text: actualSurveyData.otherCleaningTechnique,
          };

          metaStepData = {
            ...metaStepData,
            ...surveyStepData,
          };

          const stepData = { ...this.props.stepData };
          stepData.metaData = metaStepData;
          stepData.environment = this.props.relay.environment;
          stepData.uploadData = {
            url: file,
          };
          this.props.dispatch(actions.saveStepDataRequest(stepData));
        }
      );
    } else {
      const stepData = { ...this.props.stepData };
      stepData.metaData = metaStepData;
      stepData.environment = this.props.relay.environment;
      stepData.uploadData = {
        url: file,
      };
      this.props.dispatch(actions.saveStepDataRequest(stepData));
    }
  }

  simpleChange(value, question) {
    this.setState((prevState, props) => {
      const data = { ...prevState.data };
      data[question] = value;

      // here we will only save data into props
      // if its about one of the required fields
      // or if its the dataset edit page where we will always save
      if (
        data.requiredFields.indexOf(question) !== -1 ||
        this.props.alwaysSave
      ) {
        const stepData = { ...props.stepData };
        stepData.metaData = data;

        props.dispatch(actions.saveStepDataRequest(stepData));
      }

      return { data };
    });
  }

  checkBoxChange(value, question) {
    const check = this.state.data[question];
    const checkInd = findIndex(check, ["label", value]);

    if (checkInd === -1) {
      // so if a checked doesnt exist we add it
      // and if it does exist we remove it
      check.push({
        label: value,
        value,
      });
    } else {
      check.splice(checkInd, 1);
    }

    this.simpleChange(check, question);
  }

  // for dropdown selection we'll also have a little tweek
  // of change logic, cause of those freetexts as well
  dropDownChange(value, question, qText) {
    let val = value.value;
    if (val === "other") val = this.state.data[qText];

    this.simpleChange(
      {
        key: value.value,
        label: value.label,
        value: val,
      },
      question
    );
  }

  // and we'll have a specific text change
  // if 'other' option is chosen from the dropdowns
  otherDropdownText(value, question, qText, options) {
    if (this.state.data[question].key === "other") {
      this.simpleChange(
        {
          key: this.state.data[question].key,
          label: this.state.data[question].label,
          value,
        },
        question
      );
    } else if (this.state.data[question].key === "") {
      const labelInd = findIndex(options, ["value", "other"]);
      this.simpleChange(
        {
          key: "other",
          label: options[labelInd].label,
          value,
        },
        question
      );
    }

    const existingItem = findIndex(options, ["label", value]);
    if (existingItem !== -1) {
      this.simpleChange(
        {
          key: value,
          label: value,
          value: options[existingItem].value,
        },
        question
      );
    }

    this.simpleChange(value, qText);
  }

  render() {
    return (
      <>
        {!this.state.newMetaLoading && (
          <MetaData
            metaDataEmptyFields={this.props.metaDataEmptyFields}
            data={this.state.data}
            simpleChange={this.simpleChange}
            checkBoxChange={this.checkBoxChange}
            dropDownChange={this.dropDownChange}
            otherDropdownText={this.otherDropdownText}
            onChipAdd={this.onChipAdd}
            onChipDelete={this.onChipDelete}
          />
        )}
      </>
    );
  }
}

MetaDataMediator.propTypes = propTypes;
MetaDataMediator.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    stepData: state.stepData.stepzData,
  };
};

export default createRefetchContainer(
  connect(mapStateToProps)(MetaDataMediator),
  graphql`
    fragment MetaDataMediator_dropDownData on Query {
      allFileSources {
        edges {
          node {
            name
            entryId
          }
        }
      }
    }
    fragment MetaDataMediator_metaData on Query
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
    query MetaDataMediator_metaDataRefetchQuery($entryId: Float!) {
      ...MetaDataMediator_metaData @arguments(entryId: $entryId)
    }
  `
);
