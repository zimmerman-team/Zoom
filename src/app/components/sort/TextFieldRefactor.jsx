import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import theme from 'theme/Theme';

const styles = () => ({
  inputLabel: {
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: theme.font.zoomFontFamTwo,
    color: theme.color.zoomGreyFive,
    marginBottom: '10px !important',

    '&$inputLabelFocused': {
      color: theme.color.aidsFondsBlue
    },
  },
  inputLabelFocused: {},

  input: {
    fontFamily: theme.font.zoomFontFamTwo,
    fontSize: '14px',

  },

  overrides:{
    MuiInput:{
      underline:{
        '&&&&:hover:before':{
          borderBottom: '1px solid theme.color.aidsFondsBlue'
        }
      }
    }
  }

});


class TextFields extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <TextField
          id="standard-full-width"
          label="Test label"
          fullWidth
          margin="none"
          InputLabelProps={{
            disableAnimation: false,
            shrink: true,
            classes:{
              root: classes.inputLabel,
              focused: classes.inputLabelFocused,
            }
          }}

          InputProps={{
            classes:{
              root: classes.input,
              underline: classes.underline,
            }
          }}
        />
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
