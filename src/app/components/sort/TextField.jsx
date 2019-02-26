import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import theme from 'theme/Theme';

const styles = () => ({
  inputLabel: {
    transform: 'scale(1)',
    fontSize: '14px',
    fontFamily: theme.font.zoomFontFamOne,
    color: theme.color.zoomGreyFive,

    '&$inputLabelFocused': {
      color: theme.color.aidsFondsBlue,
    },
    '&$inputLabelError': {
      color: theme.color.aidsFondsRed
    }
  },
  inputLabelFocused: {},
  inputLabelError: {},

  input: {
    fontFamily: theme.font.zoomFontFamTwo,
    fontSize: '14px',
  },
});


const styleOverrides = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid' + theme.color.aidsFondsBlue
        },
      },
    },
  },
});

class TextFields extends React.Component {
  render() {
    const { classes, ...props } = this.props;

    return (
      <MuiThemeProvider theme={styleOverrides}>
      <TextField
          id="standard-full-width"
          fullWidth
          margin="none"
          InputLabelProps={{
            disableAnimation: false,
            shrink: true,
            classes: {
              root: classes.inputLabel,
              focused: classes.inputLabelFocused,
              error: classes.inputLabelError,
            }
          }}
          InputProps={{
            classes: {
              root: classes.input,
              focused: classes.underline
            }
          }}
          {...props}
        />
      </MuiThemeProvider>
        );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
