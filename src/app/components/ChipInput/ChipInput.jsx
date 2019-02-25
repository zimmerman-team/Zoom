import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import theme from 'theme/Theme';
import ChipInput from 'material-ui-chip-input';

//Custom styles of material ui components. Used in classes attribute.
const styles = () => ({
  chip: {
    fontFamily: theme.font.zoomFontFamTwo,
    fontWeight: '100',
    color: theme.color.aidsFondsWhite,
    backgroundColor: theme.color.aidsFondsBlue,
    borderRadius: '5px',
    height: '25px',

    '&:hover, &:focus': {
      backgroundColor: theme.color.aidsFondsBlue
    },
    // fixme: not conform material-ui guidelines
    '& svg': {
      fill: theme.color.aidsFondsWhite,
      fillOpacity: theme.opacity.iconInLabel
    }
  },
  chipContainer: {
    minHeight: '30px'
  },

  label: {
    transform: 'scale(1)',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: theme.font.zoomFontFamOne,
    color: theme.color.zoomGreyFive,
    marginBottom: '5px'
  },

  input: {
    fontSize: '14px'
  }
});

//General theme provided for the ui element.
const muiTheme = createMuiTheme({
  palette: {
    primary: { main: theme.color.aidsFondsBlue }
  },
  typography: {
    fontFamily: theme.font.zoomFontFamTwo,
    //Using typography v2 for no deprecation warnings...
    useNextVariants: true
  }
});

class ChipInputs extends React.Component {
  render() {
    const { classes, ...props } = this.props;

    return (
      <MuiThemeProvider theme={muiTheme}>
        <ChipInput
          clickable={false}
          classes={{
            chip: classes.chip,
            chipContainer: classes.chipContainer,
            label: classes.label,
            input: classes.input
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
