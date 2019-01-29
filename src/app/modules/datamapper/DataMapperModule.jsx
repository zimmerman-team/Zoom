/* base */
import React from 'react';

/* components */
import Stepper from 'components/stepper/Stepper';

/* styles */
import {
  StepperContainer,
  ModuleContainer,
  BottomStepCont,
} from './DataMapperModule.styles';

/* fragments */
import ErrorStep from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep';
import MetaData from 'modules/datamapper/fragments/MetaData/MetaData';
import ManMappingStep from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep';
import UploadStep from 'modules/datamapper/fragments/UploadStep/UploadStep';
import OverviewStep from 'modules/datamapper/fragments/OverviewStep/OverviewStep';
import WrapUpStep from 'modules/datamapper/fragments/WrapUpStep/WrapUpStep';

class DataMapperModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
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

  renderStep() {
    switch (this.state.step) {
      case 1:
        return <MetaData />;
      case 2:
        return <UploadStep />;
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
      <ModuleContainer width="100%">
        <StepperContainer>
          <Stepper
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
        </StepperContainer>
        {this.renderStep()}
        <BottomStepCont>
          <Stepper
            onlyButtons
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
        </BottomStepCont>
      </ModuleContainer>
    );
  }
}

export default DataMapperModule;
