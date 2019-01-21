/* DATAMAPPER STEP 1 */

/* base */
import React from 'react';
import filter from 'lodash/filter';

const propTypes = {};

const defaultProps = {};

export class MetaDataMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      tags: [],
      dataSource: '',
      shareDataSet: false,
      isSurveyDataSet: false,
      isTested: false,
      testGroups: [],
      isStaffTrained: false,
      notAnsweredQuestions: false,
      responderSelection: [],
      numberOfResponders: 0,
      isCleanEdit: false,
      dataCleaningMethods: [],
    };

    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.changeDataSource = this.changeDataSource.bind(this);
    this.changeShareDataSet = this.changeShareDataSet.bind(this);
    this.changeIsSurveyDataSet = this.changeIsSurveyDataSet.bind(this);
    this.isTested = this.isTested.bind(this);
    this.addTestGroup = this.addTestGroup.bind(this);
    this.removeTestGroup = this.removeTestGroup.bind(this);
    this.changeIsStaffTrained = this.changeIsStaffTrained.bind(this);
    this.changeNotAnsweredQuestions = this.changeNotAnsweredQuestions.bind(
      this,
    );
    this.addResponderSelection = this.addResponderSelection.bind(this);
    this.removeResponderSelection = this.removeResponderSelection.bind(this);
    this.changeNumberOfResponders = this.changeNumberOfResponders.bind(this);
    this.changeIsCleanEdit = this.changeIsCleanEdit.bind(this);
    this.addDataCleaningMethod = this.addDataCleaningMethod.bind(this);
    this.removeDataCleaningMethod = this.removeDataCleaningMethod.bind(this);
  }

  componentDidMount() {
    // Load existing file if in edit mode (fileId passed through url paramaters)
  }

  changeTitle(e) {
    this.setState({ title: e.target.value });
  }

  changeDescription(e) {
    this.setState({ description: e.target.value });
  }

  addTag(e) {
    this.setState(prevState => ({
      tags: prevState.tags.push(e.target.value),
    }));
  }

  removeTag(value) {
    this.setState(prevState => ({
      tags: filter(prevState.tags, tag => {
        return tag !== value;
      }),
    }));
  }

  changeDataSource(e) {
    this.setState({ dataSource: e.target.value });
  }

  changeShareDataSet(value) {
    this.setState({ shareDataSet: value });
  }

  changeIsSurveyDataSet(value) {
    this.setState({ isSurveyDataSet: value });
  }

  changeIsTested(value) {
    this.setState({ isTested: value });
  }

  addTestGroup(value) {
    this.setState(prevState => ({
      testGroups: prevState.testGroups.push(value),
    }));
  }

  removeTestGroup(value) {
    this.setState(prevState => ({
      testGroups: filter(prevState.testGroups, group => {
        return group !== value;
      }),
    }));
  }

  changeIsStaffTrained(value) {
    this.setState({ isStaffTrained: value });
  }

  changeNotAnsweredQuestions(value) {
    this.setState({ notAnsweredQuestions: value });
  }

  addResponderSelection(value) {
    this.setState(prevState => ({
      responderSelection: prevState.responderSelection.push(value),
    }));
  }

  removeResponderSelection(value) {
    this.setState(prevState => ({
      responderSelection: filter(prevState.responderSelection, selection => {
        return selection !== value;
      }),
    }));
  }

  changeNumberOfResponders(value) {
    this.setState({ numberOfResponders: value });
  }

  changeIsCleanEdit(value) {
    this.setState({ isCleanEdit: value });
  }

  addDataCleaningMethod(value) {
    this.setState(prevState => ({
      dataCleaningMethods: prevState.dataCleaningMethods.push(value),
    }));
  }

  removeDataCleaningMethod(value) {
    this.setState(prevState => ({
      dataCleaningMethods: filter(prevState.dataCleaningMethods, method => {
        return method !== value;
      }),
    }));
  }

  render() {
    return <React.Fragment />;
  }
}

MetaDataMediator.propTypes = propTypes;
MetaDataMediator.defaultProps = defaultProps;

export default MetaDataMediator;
