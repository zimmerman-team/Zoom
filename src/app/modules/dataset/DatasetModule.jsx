import React from 'react';
import MetaDataMediator from 'mediators/DataMapperMediators/MetaDataMediator/MetaDataMediator';

/* styles */
import {
  ButtonContainer,
  ButtonLabel,
  ModuleContainer,
  ModuleContent,
  ModuleSection
} from './DatasetModule.style';

/* components */
import ZoomButton from 'components/ZoomButton/ZoomButton';

class DatasetModule extends React.Component {
  render() {
    return (
      <ModuleContainer>
        <ModuleSection>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{ width: 75 }}
              onClick={() => console.log('save')}
            >
              <ButtonLabel>save</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </ModuleSection>

        <ModuleContent>
          <MetaDataMediator dropDownData={this.props.dropDownData} />
        </ModuleContent>

        <ModuleSection>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{ width: 75 }}
              onClick={() => console.log('save')}
            >
              <ButtonLabel>save</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </ModuleSection>
      </ModuleContainer>
    );
  }
}

export default DatasetModule;
