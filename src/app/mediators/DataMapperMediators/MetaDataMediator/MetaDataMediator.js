/* DATAMAPPER STEP 1 */

/* base */
import React from 'react';
import PropTypes from 'prop-types';
import MetaData from 'modules/datamapper/fragments/MetaData/MetaData';
import { createFragmentContainer, graphql } from 'react-relay';
import { connect } from 'react-redux';

/* actions */
import * as actions from 'services/actions/general';

/* utils */
import findIndex from 'lodash/findIndex';

/* consts */
import { step1InitialData } from '__consts__/DataMapperStepConsts';

const propTypes = {
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
  }),
  saveStepData: PropTypes.func,
  stepData: PropTypes.shape({
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
    )
  })
};

const defaultProps = {
  dropDownData: {},
  saveStepData: undefined,
  stepData: step1InitialData,
  environment: null
};

class MetaDataMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.stepData.metaData
        ? props.stepData.metaData
        : step1InitialData.metaData
    };

    this.simpleChange = this.simpleChange.bind(this);
    this.checkBoxChange = this.checkBoxChange.bind(this);
    this.otherCheckBoxText = this.otherCheckBoxText.bind(this);
    this.dropDownChange = this.dropDownChange.bind(this);
    this.otherDropdownText = this.otherDropdownText.bind(this);
    this.onChipAdd = this.onChipAdd.bind(this);
    this.onChipDelete = this.onChipDelete.bind(this);
  }

  componentDidMount() {
    if (!this.props.stepData.metaData) {
      // so we set the initial state of the step data
      const stepData = { ...this.props.stepData };
      stepData.metaData = step1InitialData.metaData;
      stepData.environment = this.props.relay.environment;
      this.props.dispatch(actions.saveStepDataRequest(stepData));
    }

    const fileSources = this.props.dropDownData.allFileSources.edges.map(
      node => {
        return { label: node.node.name, value: node.node.entryId };
      }
    );
    this.simpleChange(fileSources, 'fileSources');
  }

  // and we save the first steps data in redux
  componentWillUnmount() {
    const stepData = { ...this.props.stepData };
    stepData.metaData = this.state.data;
    this.props.dispatch(actions.saveStepDataRequest(stepData));
  }

  onChipAdd(value) {
    const { tags } = this.state.data;
    tags.push(value);
    this.simpleChange(tags, 'tags');
  }

  onChipDelete(index) {
    const { tags } = this.state.data;
    tags.splice(index, 1);
    this.simpleChange(tags, 'tags');
  }

  simpleChange(value, question) {
    this.setState((prevState, props) => {
      const data = { ...prevState.data };
      data[question] = value;

      // here we will only save data into props
      // if its about one of the required fields
      if (data.requiredFields.indexOf(question) !== -1) {
        const stepData = { ...props.stepData };
        stepData.metaData = data;
        props.dispatch(actions.saveStepDataRequest(stepData));
      }

      return { data };
    });
  }

  // so for check box change we tweek the changing a little
  // bit to encapsulate the 'other' logic
  checkBoxChange(value, question, qText = false) {
    const check = this.state.data[question];
    const checkInd = findIndex(check, ['label', value]);

    if (checkInd === -1) {
      // so if a checked doesnt exist we add it
      // and if it does exist we remove it
      let val = value;
      // so if its other we gonna add the text as value for it
      if (value.toLowerCase() === 'other' && qText) {
        val = this.state.data[qText];
      }
      check.push({
        label: value,
        value: val
      });
    } else {
      check.splice(checkInd, 1);
    }

    this.simpleChange(check, question);
  }

  // so this will happen when the other text will be changed,
  // and it will be a bit more than just
  otherCheckBoxText(value, question, qText) {
    const check = this.state.data[question];

    const otherInd = findIndex(
      check,
      item => item.label.toLowerCase() === 'other'
    );

    // so if 'other' label exists in the selected checkboxes
    // we add it the changed text value straight to the array
    if (otherInd !== -1) {
      check[otherInd].value = value;
      this.simpleChange(check, question);
    }

    // otherwise it will be added when the checkbox is selected, but we still
    // save the currently entered text
    this.simpleChange(value, qText);
  }

  // for dropdown selection we'll also have a little tweek
  // of change logic, cause of those freetexts as well
  dropDownChange(value, question, qText) {
    let val = value.value;
    if (val === 'other') val = this.state.data[qText];

    this.simpleChange(
      {
        key: value.value,
        label: value.label,
        value: val
      },
      question
    );
  }

  // and we'll have a specific text change
  // if 'other' option is chosen from the dropdowns
  otherDropdownText(value, question, qText, options) {
    if (this.state.data[question].key === 'other')
      this.simpleChange(
        {
          key: this.state.data[question].key,
          label: this.state.data[question].label,
          value
        },
        question
      );
    else if (this.state.data[question].key === '') {
      const labelInd = findIndex(options, ['value', 'other']);
      this.simpleChange(
        {
          key: 'other',
          label: options[labelInd].label,
          value
        },
        question
      );
    }

    const existingItem = findIndex(options, ['label', value]);
    if (existingItem !== -1)
      this.simpleChange(
        {
          key: value,
          label: value,
          value: options[existingItem].value
        },
        question
      );

    this.simpleChange(value, qText);
  }

  render() {
    return (
      <MetaData
        metaDataEmptyFields={this.props.metaDataEmptyFields}
        data={this.state.data}
        simpleChange={this.simpleChange}
        checkBoxChange={this.checkBoxChange}
        otherCheckBoxText={this.otherCheckBoxText}
        dropDownChange={this.dropDownChange}
        otherDropdownText={this.otherDropdownText}
        onChipAdd={this.onChipAdd}
        onChipDelete={this.onChipDelete}
      />
    );
  }
}

MetaDataMediator.propTypes = propTypes;
MetaDataMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    stepData: state.stepData.stepzData
  };
};

export default createFragmentContainer(
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
  `
);
