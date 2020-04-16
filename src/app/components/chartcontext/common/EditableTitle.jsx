/* base */
import React from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import theme from 'app/theme/Theme';

const EditableTitle = styled(props => <InputBase {...props} />)`
  && {
    color: ${theme.color.zoomBlack};
    letter-spacing: 0;
    font-family: ${theme.font.zoomFontFamOne};
    font-size: 32px;
    font-weight: 400;
    line-height: 1;
    margin: 0;
    margin-bottom: 5px;
    border: 2px solid transparent;

    input {
      text-align: center;
    }

    &:hover {
      border-color: #cccccc;
    }
  }
`;

export default EditableTitle;
