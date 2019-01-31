/* DATAMAPPER STEP 1 */

/* base */
import React from 'react';
import PropTypes from 'prop-types';
import MetaData from 'modules/datamapper/fragments/MetaData/MetaData';
import { createFragmentContainer, graphql } from 'react-relay';
import findIndex from 'lodash/findIndex';

const propTypes = {
  dropDownData: PropTypes.shape({
    allFileSources: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
    }),
  }),
  saveStepData: PropTypes.func,
};

const defaultProps = {
  dropDownData: {},
  saveStepData: undefined,
};

class MetaDataMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: undefined,
        desc: undefined,
        tags: [],
        dataSource: {
          key: '',
          label: '',
          value: '',
        },
        shared: false,
        surveyData: false,
        q1: undefined,
        q2: [],
        q21: undefined,
        q22: undefined,
        q3: [],
        q4: {
          key: '',
          label: '',
          value: '',
        },
        q5: undefined,
        q51: [],
        sourceText: '',
        q3Text: '',
        q4Text: '',
        q51Text: '',
      },
      fileSources: [],
    };

    this.simpleChange = this.simpleChange.bind(this);
    this.checkBoxChange = this.checkBoxChange.bind(this);
    this.otherCheckBoxText = this.otherCheckBoxText.bind(this);
    this.dropDownChange = this.dropDownChange.bind(this);
    this.otherDropdownText = this.otherDropdownText.bind(this);
  }

  componentDidMount() {
    const fileSources = this.props.dropDownData.allFileSources.edges.map(
      node => {
        return { label: node.node.name, value: node.node.name };
      },
    );
    this.setState({ fileSources });
  }

  // So we will save the step data when this component will be unmounting
  // as this data will be used in other components
  componentWillUnmount() {
    this.props.saveStepData(this.state.data);
  }

  simpleChange(value, question) {
    this.setState(prevState => {
      const { data } = prevState;
      data[question] = value;
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
        value: val,
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
      item => item.label.toLowerCase() === 'other',
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
        value: val,
      },
      question,
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
          value,
        },
        question,
      );
    else if (this.state.data[question].key === '') {
      const labelInd = findIndex(options, ['value', 'other']);
      this.simpleChange(
        {
          key: 'other',
          label: options[labelInd].label,
          value,
        },
        question,
      );
    }

    this.simpleChange(value, qText);
  }

  render() {
    return (
      <MetaData
        fileSources={this.state.fileSources}
        data={this.state.data}
        simpleChange={this.simpleChange}
        checkBoxChange={this.checkBoxChange}
        otherCheckBoxText={this.otherCheckBoxText}
        dropDownChange={this.dropDownChange}
        otherDropdownText={this.otherDropdownText}
      />
    );
  }
}

MetaDataMediator.propTypes = propTypes;
MetaDataMediator.defaultProps = defaultProps;

export default createFragmentContainer(
  MetaDataMediator,
  graphql`
    fragment MetaDataMediator_dropDownData on Query {
      allFileSources {
        edges {
          node {
            name
          }
        }
      }
    }
  `,
);
