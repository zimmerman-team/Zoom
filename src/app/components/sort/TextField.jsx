import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import withStyles from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* todo: read up https://stackoverflow.com/questions/52176177/how-to-override-textfield-of-floating-label-text-and-underline-color-in-material */

const styles = theme => ({
  error: {
    background: 'yellow',
    display: 'flex',
    color: 'yellow'
  }
});

const Container = styled(props => (
  <TextField
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
))`
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

    & [class*='MuiInputLabel-error'] {
      color: ${theme.color.aidsFondsRed};
    }
    & [class*='MuiInput-error'] {
      input,
      textarea {
        border-bottom: 1px solid ${theme.color.aidsFondsRed};
      }
    }
  }
`;

export default withStyles(styles)(Container);
