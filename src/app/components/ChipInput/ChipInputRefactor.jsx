import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from 'theme/Theme';
import ChipInput from 'material-ui-chip-input';

const styles = () => ({

});

//fixme: hackey way of changing input underline
const hack = createMuiTheme({
  palette:{
    primary: {main: theme.color.aidsFondsBlue},
  }
});


class ChipInputRefactor extends React.Component {
  render() {
    const { classes, ...props} = this.props;

    return(
      <MuiThemeProvider theme={hack}>
      <ChipInput
                 InputLabelProps={{
                   shrink: true
                 }}
      />
      </MuiThemeProvider>
    );
  }
}

ChipInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipInput);
