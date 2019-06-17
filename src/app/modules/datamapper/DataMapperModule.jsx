/* base */
import React from 'react';
import { connect } from 'react-redux';
/* actions */
import * as actions from 'services/actions/general';
/* components */
import Stepper from 'components/Stepper/Stepper';
import Snackbar from 'components/Snackbar/Snackbar';
/* consts */
import { columnValues } from 'mediators/DataMapperMediators/WrapUpMediator/WrapUpMediator.const';

/* utils */
import {
  addInEmptyFieldRows,
  checkEmptyFields
} from 'modules/datamapper/DataMapperModule.util';
import find from 'lodash/find';
import { Helmet } from 'react-helmet';
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

      metaDataEmptyFields: [],
      stepsDisabled: false,

      openSnackbar: false,
      errorMessage: ''
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this);
  }

  componentWillUnmount() {
    // and we reset the values in the reducer
    this.props.dispatch(actions.saveStepDataInitial());
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
        const metaDataEmptyFields = [];

        // we check if the title is empty
        if (!stepData.metaData.title || stepData.metaData.title.length === 0) {
          metaDataEmptyFields.push('title');
        }

        // we check if the description is empty
        if (!stepData.metaData.desc || stepData.metaData.desc.length === 0) {
          metaDataEmptyFields.push('desc');
        }

        // we check if the datasource is empty
        if (
          !stepData.metaData.dataSource.value ||
          stepData.metaData.dataSource.value.length === 0
        ) {
          metaDataEmptyFields.push('dataSource');
        }

        // we check if the organisation is empty
        if (!stepData.metaData.org || stepData.metaData.org.length === 0) {
          metaDataEmptyFields.push('org');
        }

        // we check if the year is empty
        if (
          !stepData.metaData.year ||
          stepData.metaData.year.length === 0 ||
          !/^\d+$/.test(this.props.stepData.metaData.year) ||
          this.props.stepData.metaData.year.length > 4
        ) {
          metaDataEmptyFields.push('year');
        }

        if (metaDataEmptyFields.length > 0) {
          this.setState({ openSnackbar: true });
          this.setState({ errorMessage: 'Please fill the required fields' });

          props.dispatch(actions.saveStepDataRequest(stepData));
          return { metaDataEmptyFields };
        } else {
          return { metaDataEmptyFields, step: prevState.step + 1 };
        }
      } else if (prevState.step === 2) {
        if (!stepData.uploadData) {
          this.setState({ openSnackbar: true });
          this.setState({ errorMessage: 'Please upload a file' });
        } else if (!stepData.manMapData || stepData.manMapData.length === 0) {
          this.setState({ openSnackbar: true });
          this.setState({ errorMessage: 'File uploading please wait...' });
        } else {
          return { step: prevState.step + 1 };
        }
      } else if (prevState.step === 4) {
        // So here we check if the fourth steps data has been saved
        // and if it contains anything because what we actually save here
        // are the error that we retrieve for this step
        // and the user should be able to progress only if they've fixed
        // all the found errors
        if (!prevState.stepsDisabled && stepData.errorColumns.length > 0) {
          this.setState({ openSnackbar: true });
          this.setState({
            errorMessage: 'Please correct errors before proceeding'
          });
        } else {
          return { step: prevState.step + 1 };
        }
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
        if (manMapEmptyFormat) {
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

  renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <MetaDataMediator
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

    return (
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
            onlyButtons
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            nextDisabled={this.nextDisabled()}
          />
        </ModuleFooter>
      </ModuleContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    stepData: state.stepData.stepzData
  };
};

export default connect(mapStateToProps)(DataMapperModule);
