/* base */
import React from 'react';
import PropTypes from 'prop-types';
import ZimmermanQuill from 'components/ZimmermanQuill/ZimmermanQuil';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {
  saveDesc: PropTypes.func,
  defaultVal: PropTypes.string,
  placeholder: PropTypes.string
};
const defaultProps = {
  saveDesc: undefined,
  defaultVal: '',
  placeholder: '[ Insert body text here ]'
};

class TextEditor extends React.Component {
  state = {
    editorHtml: this.props.defaultVal ? this.props.defaultVal : ''
  };

  handleChange = html => {
    this.props.saveDesc(html);
    this.setState({ editorHtml: html });
  };

  render() {
    return (
      <ZimmermanQuill
        onChange={this.handleChange}
        value={this.state.editorHtml}
        placeholder={this.props.placeholder}
      />
    );
  }
}

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

export default TextEditor;
