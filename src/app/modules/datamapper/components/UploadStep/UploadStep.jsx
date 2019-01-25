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
} from 'modules/datamapper/components/UploadStep/UploadStep.styles';
import IconUpload from 'assets/icons/icon_upload.svg';

const propTypes = {};
const defaultProps = {};

class UploadStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      loaded: false,
      filez: null,
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
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
    this.onFileChange(e, e.dataTransfer.files[0]);
  }

  onFileChange(e, file) {
    const filez = file || e.target.files[0];

    this.setState({ loaded: false, file: filez });
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
              onChange={this.onFileChange}
            />
          </TextContainer>
        </UploadContainer>
        {this.state.file && (
          <UploadedContainer>{this.state.file.name}</UploadedContainer>
        )}
      </ModuleContainer>
    );
  }
}

UploadStep.propTypes = propTypes;
UploadStep.defaultProps = defaultProps;

export default UploadStep;
