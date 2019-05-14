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
import PropTypes from 'prop-types';

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
  saveDataset: PropTypes.func
};

const defaultProps = {
  dropDownData: {},
  saveDataset: null
};

class DatasetModule extends React.Component {
  render() {
    return (
      <ModuleContainer>
        <ModuleSection>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{ width: 75 }}
              onClick={() => this.props.saveDataset()}
            >
              <ButtonLabel>save</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </ModuleSection>

        <ModuleContent>
          <MetaDataMediator
            dataSetEdit
            alwaysSave
            dropDownData={this.props.dropDownData}
          />
        </ModuleContent>

        <ModuleSection>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{ width: 75 }}
              onClick={() => this.props.saveDataset()}
            >
              <ButtonLabel>save</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </ModuleSection>
      </ModuleContainer>
    );
  }
}

DatasetModule.propTypes = propTypes;
DatasetModule.defaultProps = defaultProps;

export default DatasetModule;
