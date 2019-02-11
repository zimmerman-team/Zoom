import React from 'react';
import {
  FieldContainer,
  ComponentBase,
  InputLabelContainer,
  InputLabel,
  InputContainer,
  EmptyInput,
  ButtonContainer,
  buttonStyle,
  ButtonLabel
} from 'modules/datamapper/fragments/ErrorsStep/components/FindReplace/FindReplace.styles';
import PropTypes from 'prop-types';
import { data } from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep.mock';
import ErrorStep from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep';
import ZoomButton from 'components/ZoomButton/ZoomButton';

const propTypes = {
  open: PropTypes.bool,
  setWrapperRef: PropTypes.func
};

const defaultProps = {
  open: false,
  setWrapperRef: null
};

class FindReplace extends React.Component {
  render() {
    return (
      <div>
        {this.props.open && (
          <ComponentBase ref={this.props.setWrapperRef}>
            <FieldContainer>
              <InputLabelContainer>
                <InputLabel>Find in file</InputLabel>
                <InputContainer>
                  <EmptyInput
                    type="text"
                    onChange={e => console.log('Find text: ', e.target.value)}
                  />
                </InputContainer>
              </InputLabelContainer>
              <ButtonContainer>
                <ZoomButton
                  style={buttonStyle}
                  plain
                  focusIndicator={false}
                  onClick={() => console.log('Find clicked')}
                >
                  <ButtonLabel>Find</ButtonLabel>
                </ZoomButton>
              </ButtonContainer>
            </FieldContainer>
            <FieldContainer>
              <InputLabelContainer>
                <InputLabel>Replace in file</InputLabel>
                <InputContainer>
                  <EmptyInput
                    type="text"
                    onChange={e =>
                      console.log('Replace text: ', e.target.value)
                    }
                  />
                </InputContainer>
              </InputLabelContainer>
              <ButtonContainer>
                <ZoomButton
                  style={buttonStyle}
                  plain
                  focusIndicator={false}
                  onClick={() => console.log('Replace clicked')}
                >
                  <ButtonLabel>Replace</ButtonLabel>
                </ZoomButton>
              </ButtonContainer>
            </FieldContainer>
          </ComponentBase>
        )}
      </div>
    );
  }
}

FindReplace.propTypes = propTypes;
FindReplace.defaultProps = defaultProps;

export default FindReplace;
