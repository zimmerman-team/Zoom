import React from 'react';
import PropTypes from 'prop-types';
/* styles */
import {
  BrowseLink,
  EmptyInput,
  IconContainer,
  ModuleContainer,
  TextContainer,
  UploadContainer,
  UploadedContainer
} from 'app/modules/datamapper/fragments/UploadStep/UploadStep.styles';
import theme from 'app/theme/Theme';
/* icons */
import IconUpload from 'app/assets/icons/IconUpload';
/* component */
import { SectionHeading } from 'app/components/sort/Headings';
import ProgressIcon from 'app/components/ProgressIcon/ProgressIcon';

const propTypes = {
  handleFileUpload: PropTypes.func,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  file: PropTypes.shape({})
};
const defaultProps = {
  handleFileUpload: undefined,
  error: false,
  loading: false
};

class UploadStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
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
        {this.props.loading && <ProgressIcon />}
        <SectionHeading>Upload CSV</SectionHeading>
        <UploadContainer
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          style={{
            backgroundColor: this.state.active ? theme.color.zoomGreyZero : '',
            borderColor: this.props.error ? theme.color.aidsFondsRed : ''
          }}
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
              data-cy="input"
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
