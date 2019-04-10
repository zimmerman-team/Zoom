/* base */
import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import theme from 'theme/Theme';

const formats = [
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
  'align',
  'background',
  'color'
];

const modules = {
  toolbar: [
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
    ['link'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

const ZimmermanQuil = styled(props => (
  <ReactQuill modules={modules} formats={formats} bounds=".app" {...props} />
))`
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
        color: ${theme.color.zoomGreyOne};
        font-family: ${theme.font.zoomFontFamOne};
        font-size: 14px;
        font-style: normal;
      }
      p {
        font-family: ${theme.font.zoomFontFamTwo};
        font-size: 14px;
        color: ${theme.color.zoomGreyOne};
      }
    }
  }
`;

export default ZimmermanQuil;
