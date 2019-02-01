/* base */
import React from 'react';
/* components */
import Stepper from 'components/Stepper/Stepper';

/* styles */
import {
  ModuleContainer,
  ModuleHeader,
  ModuleFooter,
  ModuleContent,
} from './DataMapperModule.styles';

/* fragments */
import ErrorStep from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep';
import ManMappingStep from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep';
import OverviewStep from 'modules/datamapper/fragments/OverviewStep/OverviewStep';
import WrapUpStep from 'modules/datamapper/fragments/WrapUpStep/WrapUpStep';
import MetaDataMediator from 'mediators/DataMapperMediators/MetaDataMediator/MetaDataMediator';
import UploadMediator from 'mediators/DataMapperMediators/UploadMediator/UploadMediator';

class DataMapperModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      // So this will basically store the data required for each step
      stepData: [],
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.saveStepData = this.saveStepData.bind(this);
  }

  nextStep() {
    this.setState(prevState => {
      return { step: prevState.step + 1 };
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

  renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <MetaDataMediator
            uploadData={this.state.stepData[1]}
            data={this.state.stepData[0]}
            saveStepData={this.saveStepData}
            dropDownData={this.props.dropDownData}
          />
        );
      case 2:
        return (
          <UploadMediator
            prevStepData={this.state.stepData[0]}
            data={this.state.stepData[1]}
            saveStepData={this.saveStepData}
          />
        );
      case 3:
        return <OverviewStep />;
      case 4:
        return <ErrorStep />;
      case 5:
        return <ManMappingStep />;
      case 6:
        return <WrapUpStep />;
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
          />
        </ModuleHeader>

        <ModuleContent>{this.renderStep()}</ModuleContent>

        <ModuleFooter>
          <Stepper
            onlyButtons
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
        </ModuleFooter>
      </ModuleContainer>
    );
  }
}

export default DataMapperModule;
