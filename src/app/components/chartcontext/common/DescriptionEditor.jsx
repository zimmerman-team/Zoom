/* base */
import React from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import theme from 'theme/Theme';

const DescriptionEditor = styled(props => (
  <InputBase
    multiline
    placeholder="[ Insert description here ]"
    rows={3}
    rowsMax={3}
    type="text"
    {...props}
  />
))`
  && {
    font-family: ${theme.font.zoomFontFamOne};
    font-size: 14px;
    width: 100%;
    border-top: 2px solid black;
    padding: 15px;

    textarea {
      &::placeholder {
        color: black;
        opacity: 1;
        font-size: 14px;
      }
    }
  }
`;

export default DescriptionEditor;
