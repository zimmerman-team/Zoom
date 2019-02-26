import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import theme from 'theme/Theme';

const Component = styled(TextField)`
  && {
    display: flex;
    flex-direction: column;

    label {
      position: relative;
      margin-bottom: 10px;
      color: ${theme.color.colHeadColor};
      font-family: ${theme.font.zoomFontFamOne};
      font-size: 14px;
      line-height: 1;
    }

    textarea,
    input {
      color: ${theme.color.zoomBlack};
      font-family: ${theme.font.zoomFontFamTwo};
      font-size: 14px;
      line-height: 1;
      border-bottom: 1px solid ${theme.color.colHeadColor};
      padding-bottom: 5px;

      &:focus {
        border-bottom: 1px solid ${theme.color.aidsFondsBlue};
      }
    }
  }
`;

const Container = props => {
  return (
    <NoSsr>
      <Component
        id="standard-full-width"
        fullWidth
        margin="none"
        label="Empty"
        InputLabelProps={{
          disableAnimation: true,
          shrink: false
        }}
        InputProps={{
          disableUnderline: true
        }}
        {...props}
      />
    </NoSsr>
  );
};

export default Container;
