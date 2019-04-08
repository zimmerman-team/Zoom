import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import theme from 'theme/Theme';

const styles = theme => ({
  root: {
    // background: 'green'
  },
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
    // error
    label="Empty"
    InputLabelProps={{
      disableAnimation: true,
      shrink: false
    }}
    InputProps={{
      disableUnderline: true
      // error: styles.error
    }}
    // className={styles.error}
    /* classes={{
      error: styles.error
    }}*/
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
    & [class*='MuiInputLabel-error'] {
      color: ${theme.color.aidsFondsRed};
    }
    & [class*='MuiInput-error'] {
      input,
      textarea {
        border-bottom: 1px solid ${theme.color.aidsFondsRed};
      }
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

export default withStyles(styles)(Container);
