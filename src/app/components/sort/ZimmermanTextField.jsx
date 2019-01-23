import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import NoSsr from '@material-ui/core/NoSsr';
import { zoomFontFamTwo } from 'components/theme/ThemeSheet';
const StyledTextField = styled(TextField)`
  && {
    font-size: 14px;
    color: black;
    font-family: ${zoomFontFamTwo};
    margin: 0 !important;

    transition: none;
    &:before {
      transition: none;
    }
    &:after {
      transition: none;
    }
  }
`;

function ZimmermanTextField() {
  return (
    <NoSsr>
      <StyledTextField
        id="standard-full-width"
        placeholder="Placeholder"
        fullWidth
        disableRipple
        margin="none"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </NoSsr>
  );
}

export default ZimmermanTextField;
