import React from 'react';
import styled from 'styled-components';
import theme from 'app/theme/Theme';

const TitleEditor = styled(props => <input {...props} />)`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  width: 100%;
  margin: 0;
  border: 0;
  text-align: center;
  margin-bottom: 5px;
  border: 2px solid transparent;

  &:focus {
    outline: none;
  }

  &:hover {
    border-color: #cccccc;
  }
`;

export default TitleEditor;
