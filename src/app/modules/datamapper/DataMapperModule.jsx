/* base */
import React from 'react';
import { Box } from 'grommet';
/* components */
import Stepper from 'components/Stepper/Stepper';

/* styles */
import {
  StepperContainer,
  ModuleContainer,
  BottomStepCont,
  ModuleHeader,
  ModuleFooter,
  ModuleContent,
} from './DataMapperModule.styles';

/* fragments */
import ErrorStep from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep';
import ManMappingStep from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep';
import UploadStep from 'modules/datamapper/fragments/UploadStep/UploadStep';
import OverviewStep from 'modules/datamapper/fragments/OverviewStep/OverviewStep';
import WrapUpStep from 'modules/datamapper/fragments/WrapUpStep/WrapUpStep';
import MetaDataMediator from 'mediators/DataMapperMediators/MetaDataMediator';

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
        return <MetaDataMediator dropDownData={this.props.dropDownData} />;
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
