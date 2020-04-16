import React from 'react';
import {
  ButtonContainer,
  ButtonLabel,
  buttonStyle,
  ComponentBase,
  EmptyInput,
  FieldContainer,
  InputContainer,
  InputLabel,
  InputLabelContainer
} from 'app/modules/datamapper/fragments/ErrorsStep/components/FindReplace/FindReplace.styles';
import PropTypes from 'prop-types';
import ZoomButton from 'app/components/ZoomButton/ZoomButton';
import ZoomSelect from 'app/components/Select/ZoomSelect';

const propTypes = {
  open: PropTypes.bool,
  findReplaceValues: PropTypes.func,
  setWrapperRef: PropTypes.func,
  columnHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  saveSelectedHeader: PropTypes.func
};

const defaultProps = {
  open: false,
  findReplaceValues: undefined,
  columnHeaders: [],
  setWrapperRef: null,
  saveSelectedHeader: undefined
};

class FindReplace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      findValue: '',
      replaceValue: '',
      selectedHeader: undefined
    };

    this.handleSelectHeader = this.handleSelectHeader.bind(this);
    this.handleFind = this.handleFind.bind(this);
  }

  handleSelectHeader(e) {
    this.setState({ selectedHeader: e.value });
  }

  handleFind() {
    this.props.saveSelectedHeader(this.state.selectedHeader);
    this.props.findReplaceValues(
      this.state.selectedHeader,
      this.state.findValue
    );
  }

  handleReplace() {
    this.props.saveSelectedHeader(this.state.selectedHeader);
    this.props.findReplaceValues(
      this.state.selectedHeader,
      this.state.findValue,
      this.state.replaceValue
    );
  }

  render() {
    return (
      <div>
        {this.props.open && (
          <ComponentBase ref={this.props.setWrapperRef}>
            <FieldContainer>
              <ZoomSelect
                search={false}
                placeHolderText="Select column"
                data={this.props.columnHeaders}
                valueSelected={this.state.selectedHeader}
                selectVal={this.handleSelectHeader}
              />
            </FieldContainer>
            <FieldContainer>
              <InputLabelContainer>
                <InputLabel>Find in file</InputLabel>
                <InputContainer>
                  <EmptyInput
                    type="text"
                    value={this.state.findValue}
                    onChange={e => this.setState({ findValue: e.target.value })}
                  />
                </InputContainer>
              </InputLabelContainer>
              <ButtonContainer>
                <ZoomButton
                  disabled={!this.state.selectedHeader}
                  style={buttonStyle}
                  plain
                  focusIndicator={false}
                  onClick={() => this.handleFind()}
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
                    value={this.state.replaceValue}
                    onChange={e =>
                      this.setState({ replaceValue: e.target.value })
                    }
                  />
                </InputContainer>
              </InputLabelContainer>
              <ButtonContainer>
                <ZoomButton
                  disabled={!this.state.selectedHeader}
                  style={buttonStyle}
                  plain
                  focusIndicator={false}
                  onClick={() => this.handleReplace()}
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
