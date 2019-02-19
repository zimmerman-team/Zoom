/* base */
import React from 'react';
/* components */
import Stepper from 'components/Stepper/Stepper';

/* utils */
import {
  checkEmptyFields,
  addInEmptyFieldRows
} from 'modules/datamapper/DataMapperModule.util';
import find from 'lodash/find';
import { ToastsStore } from 'react-toasts';

/* styles */
import {
  ModuleContainer,
  ModuleHeader,
  ModuleFooter,
  ModuleContent
} from './DataMapperModule.styles';
import { SimpleErrorText } from 'components/sort/Misc';

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
      // So this will basically store the data required for each step
      stepData: [],
      environment: null,
      // these are the required fields that the users
      // needs to have in their data model and map it
      // if they don't select or dont have these fields
      // the manual mapping will have to be adjusted
      // for the to be able to populate/fill them
      mapReqFields: ['indicator', 'date', 'value_format', 'value'],

      manMapEmptyValue: false,
      manMapEmptyFields: false,
      stepsDisabled: false
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.saveStepData = this.saveStepData.bind(this);
    this.saveEnvironment = this.saveEnvironment.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this);
  }

  // basically checks if next button should be disabled
  // depending on the current step
  nextDisabled() {
    if (this.state.step === 1)
      // we check if the title is empty
      return (
        !this.state.stepData[0] ||
        !this.state.stepData[0].title ||
        this.state.stepData[0].title.length === 0 ||
        !this.state.stepData[0].desc ||
        this.state.stepData[0].desc.length === 0 ||
        !this.state.stepData[0].dataSource.value ||
        this.state.stepData[0].dataSource.value.length === 0
      );

    if (this.state.step === 2)
      return (
        !this.state.stepData[1] ||
        this.state.stepData[1].manMapData.length === 0
      );

    if (this.state.step === 4)
      // So here we check if the fourth steps data has been saved
      // and if it contains anything because what we actually save here
      // are the error that we retrieve for this step
      // and the user should be able to progress only if they've fixed
      // all the found errors
      return !this.state.stepData[3] || this.state.stepData[3].length > 0;

    return false;
  }

  nextStep() {
    // so here we'l incapsulate the user restrictions
    // for progressing forward though we really need
    // TODO: retweek the whole datamapper data saving
    // in a DataMapperMediator, cause now its scattered
    // all over the place
    this.setState(prevState => {
      const { stepData } = prevState;
      if (prevState.step === 1) {
        // and this bool will be used to save the general state if some
        // fields are undefined
        let emptyFields = false;

        // we check if the title is empty
        if (!stepData[0].title || stepData[0].title.length === 0) {
          emptyFields = true;
          stepData[0].title = undefined;
        }

        // we check if the description is empty
        if (!stepData[0].desc || stepData[0].desc.length === 0) {
          emptyFields = true;
          stepData[0].desc = undefined;
        }

        // we check if the datasource is empty
        if (
          !stepData[0].dataSource.value ||
          stepData[0].dataSource.value.length === 0
        ) {
          emptyFields = true;
          stepData[0].dataSource.value = undefined;
        }

        if (emptyFields) {
          ToastsStore.error(
            <SimpleErrorText> Please fill the required fields </SimpleErrorText>
          );
          return { stepData };
        }
      } else if (prevState.step === 2) {
        if (!stepData[1]) {
          ToastsStore.error(
            <SimpleErrorText> Please upload a file </SimpleErrorText>
          );
          return { stepData };
        } else if (stepData[1].manMapData.length === 0) {
          ToastsStore.error(
            <SimpleErrorText> File Uploading please wait... </SimpleErrorText>
          );
          return { stepData };
        }
      } else if (prevState.step === 4) {
        // So here we check if the fourth steps data has been saved
        // and if it contains anything because what we actually save here
        // are the error that we retrieve for this step
        // and the user should be able to progress only if they've fixed
        // all the found errors
        if (!stepData[3] || stepData[3].length > 0) {
          ToastsStore.error(
            <SimpleErrorText>
              {' '}
              Please fix the errors before proceeding{' '}
            </SimpleErrorText>
          );
          return { stepData };
        }
      }
      // restriction for the manual mapping step
      else if (prevState.step === 5) {
        const manMapData = stepData[5] ? stepData[5] : stepData[1].manMapData;

        const emptyFields = checkEmptyFields(
          manMapData,
          prevState.mapReqFields
        );

        if (
          emptyFields.length > 0 ||
          find(manMapData, item => {
            return (
              item.emptyFieldRow && (!item.label || item.label.length === 0)
            );
          })
        ) {
          // so here we check if one of the empty manual mapping
          // values is actually 'value' === a number for data
          // we will not let the user populate it but just give them
          // a message about it, cause their data needs to have a column like this
          const emptyValue = emptyFields.indexOf('value') !== -1;
          const manMapEmptyFields = emptyValue ? emptyFields.length > 1 : true;

          stepData[5] = addInEmptyFieldRows(emptyFields, manMapData);

          return { manMapEmptyValue: emptyValue, stepData, manMapEmptyFields };
        }
      }

      return {
        step: prevState.step + 1,
        manMapEmptyFields: false,
        manMapEmptyValue: false
      };
    });
  }

  prevStep() {
    this.setState(prevState => {
      return { step: prevState.step - 1 };
    });
  }

  saveStepData(data, step) {
    this.setState(prevState => {
      const { stepData } = prevState;
      stepData[step - 1] = data;
      return { stepData };
    });
  }

  saveEnvironment(environment) {
    this.setState({ environment });
  }

  renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <MetaDataMediator
            saveEnvironment={this.saveEnvironment}
            environment={this.state.environment}
            data={this.state.stepData[0]}
            saveStepData={this.saveStepData}
            dropDownData={this.props.dropDownData}
          />
        );
      case 2:
        return (
          this.state.stepData[0] && (
            <UploadMediator
              environment={this.state.environment}
              // for the upload mediator we only need the file sources from the first step
              // and the data source
              fileSources={this.state.stepData[0].fileSources}
              dataSource={this.state.stepData[0].dataSource}
              data={this.state.stepData[1]}
              saveStepData={this.saveStepData}
            />
          )
        );
      case 3:
        return (
          this.state.stepData[1] && (
            <OverviewStep data={this.state.stepData[1].overviewData} />
          )
        );
      case 4:
        return (
          this.state.stepData[1] && (
            <CorrectErrorsMediator
              fileId={this.state.stepData[1].fileId}
              rowCount={this.state.stepData[1].rowCount}
              fileCorrection={this.props.fileCorrection}
              saveStepData={this.saveStepData}
            />
          )
        );
      case 5:
        return (
          this.state.stepData[1] && (
            <ManMappingStep
              saveStepData={this.saveStepData}
              modelOptions={this.state.stepData[1].modelOptions}
              // so the data from the upload step is the initial data
              // for the manual mapping
              data={
                this.state.stepData[4]
                  ? this.state.stepData[4]
                  : this.state.stepData[1].manMapData
              }
              emptyValue={this.state.manMapEmptyValue}
              manMapEmptyFields={this.state.manMapEmptyFields}
              mapReqFields={this.state.mapReqFields}
            />
          )
        );
      case 6:
        return (
          this.state.stepData[0] &&
          this.state.stepData[1] && (
            <WrapUpMediator
              environment={this.state.environment}
              metaData={this.state.stepData[0]}
              fileId={this.state.stepData[1].fileId}
              file={this.state.stepData[1].file}
              fileUrl={this.state.stepData[1].url}
              mappingJson={this.state.stepData[1].mappingJson}
              mappingData={this.state.stepData[4]}
              disableSteps={() => this.setState({ stepsDisabled: true })}
              stepsDisabled={this.state.stepsDisabled}
            />
          )
        );
      default:
        return <div> No Such Step </div>;
    }
  }

  render() {
    return (
      <ModuleContainer>
        <ModuleHeader>
          <Stepper
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            nextDisabled={this.nextDisabled}
          />
        </ModuleHeader>

        <ModuleContent
          style={
            this.state.stepsDisabled && this.state.step !== 6
              ? { pointerEvents: 'none', opacity: '0.4' }
              : {}
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
            nextDisabled={this.nextDisabled}
          />
        </ModuleFooter>
      </ModuleContainer>
    );
  }
}

export default DataMapperModule;
