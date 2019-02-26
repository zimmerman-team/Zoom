import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';
import { styleOverrides, styles } from './ChipInput.style';

class ChipInputs extends React.Component {
  render() {
    const { classes, ...props } = this.props;

    return (
      <MuiThemeProvider theme={styleOverrides}>
        <ChipInput
          clickable="false"
          classes={{
            chip: classes.chip,
            chipContainer: classes.chipContainer,
            label: classes.label,
            input: classes.input,
            underline: classes.underline
          }}
          InputLabelProps={{
            shrink: true
          }}
          {...props}
        />
      </MuiThemeProvider>
    );
  }
}

ChipInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipInputs);
