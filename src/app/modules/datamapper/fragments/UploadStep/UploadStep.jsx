import React from 'react';
import PropTypes from 'prop-types';
import { SectionHeading, zoomGreyZero } from 'components/theme/ThemeSheet';
import {
  ModuleContainer,
  UploadContainer,
  IconContainer,
  TextContainer,
  BrowseLink,
  EmptyInput,
  UploadedContainer,
} from 'modules/datamapper/fragments/UploadStep/UploadStep.styles';
import IconUpload from 'assets/icons/IconUpload';

const propTypes = {
  handleFileUpload: PropTypes.func,
};
const defaultProps = {
  handleFileUpload: undefined,
};

class UploadStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.inputOpenFileRef = React.createRef();
  }

  onDragEnter() {
    this.setState({ active: true });
  }

  onDragLeave() {
    this.setState({ active: false });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ active: false });
    this.props.handleFileUpload(e);
  }

  render() {
    return (
      <ModuleContainer>
        <SectionHeading>Upload CSV</SectionHeading>
        <UploadContainer
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          style={{ backgroundColor: this.state.active ? zoomGreyZero : '' }}
        >
          <IconContainer>
            <IconUpload />
          </IconContainer>
          <TextContainer>
            Drag & drop your files here or{' '}
            <BrowseLink
              onClick={() => {
                this.inputOpenFileRef.current.click();
              }}
            >
              browse
            </BrowseLink>
            <EmptyInput
              type="file"
              ref={this.inputOpenFileRef}
              onChange={e => this.props.handleFileUpload(e)}
            />
          </TextContainer>
        </UploadContainer>
        {this.props.file && (
          <UploadedContainer>{this.props.file.name}</UploadedContainer>
        )}
      </ModuleContainer>
    );
  }
}

UploadStep.propTypes = propTypes;
UploadStep.defaultProps = defaultProps;

export default UploadStep;
