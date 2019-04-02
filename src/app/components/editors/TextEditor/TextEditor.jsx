/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES
import theme from 'theme/Theme';
import CreateTeam from 'modules/UserManagement/CreateTeam/CreateTeamModule';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ZoomQuill = styled(props => <ReactQuill {...props} />)`
  && {
    .ql-toolbar {
      border-top-color: black;
      border-top-width: 2px;
      border-right: initial;
      border-left: initial;
    }
    .ql-container {
      border: initial;
      border-bottom: initial !important;
    }

    .ql-editor {
      &:before {
        color: ${theme.color.zoomBlack};
        font-family: ${theme.font.zoomFontFamOne};
        font-size: 14px;
        font-style: normal;
      }

      p {
        font-family: ${theme.font.zoomFontFamTwo};
        font-size: 14px;
      }
    }
  }
`;

const EditAreaOne = styled.div`
  background-color: #e3e3e3;
`;

const propTypes = {
  saveDesc: PropTypes.func,
  defaultVal: PropTypes.string,
  placeholder: PropTypes.string
};
const defaultProps = {
  saveDesc: undefined,
  defaultVal: '',
  data: [],
  placeholder: '[Inset text here]'
};

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: props.defaultVal ? props.defaultVal : '',
      theme: 'snow'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.props.saveDesc(html);
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === 'core') newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <ZoomQuill
        theme={this.state.theme}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        bounds=".app"
        placeholder={this.props.placeholder}
      />
    );
  }
}

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;
TextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'background',
  'color'
];

TextEditor.modules = {
  toolbar: [
    // [{ header: '1' }, { header: '2' }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

export default TextEditor;
