import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import theme from 'theme/Theme';

const styles = () => ({
  inputLabel: {
    fontSize: '20px',
    fontWeight: 500,
    fontFamily: theme.font.zoomFontFamTwo,
    color: theme.color.zoomGreyFive,
    marginBottom: '15px !important',

    '&$inputLabelFocused': {
      color: theme.color.aidsFondsBlue
    },
    '&$inputLabelError': {
      color: theme.color.aidsFondsRed
    },
  },
  inputLabelFocused: {},
  inputLabelError: {},

  input: {
    fontFamily: theme.font.zoomFontFamTwo,
    fontSize: '14px',
  },
});

//fixme: hackey way of changing input underline
const hack = createMuiTheme({
  palette:{
    primary: {main: theme.color.aidsFondsBlue},
  }
});

class TextFields extends React.Component {
  render() {
    const { classes, ...props} = this.props;

    return(
      <MuiThemeProvider theme={hack}>
        <TextField
          id="standard-full-width"
          fullWidth
          margin="none"
          InputLabelProps={{
            disableAnimation: false,
            shrink: true,
            classes:{
              root: classes.inputLabel,
              focused: classes.inputLabelFocused,
              error: classes.inputLabelError
            }
          }}

          InputProps={{
            classes:{
              root: classes.input,
            }
          }}
          {...props}
        />
      </MuiThemeProvider>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
