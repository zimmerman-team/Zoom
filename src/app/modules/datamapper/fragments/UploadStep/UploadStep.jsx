import React from 'react';
import PropTypes from 'prop-types';

/* styles */
import {
  ModuleContainer,
  UploadContainer,
  IconContainer,
  TextContainer,
  BrowseLink,
  EmptyInput,
  UploadedContainer
} from 'modules/datamapper/fragments/UploadStep/UploadStep.styles';
import theme from 'theme/Theme';

/* icons */
import IconUpload from 'assets/icons/IconUpload';

/* component */
import { SectionHeading } from 'components/sort/Headings';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';

const propTypes = {
  handleFileUpload: PropTypes.func,
  error: PropTypes.bool,
  loading: PropTypes.bool
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
