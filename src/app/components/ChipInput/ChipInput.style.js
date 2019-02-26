import { createMuiTheme } from '@material-ui/core';
import theme from 'theme/Theme';

export const styles = () => {
  return {
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
    underline: {
      '&:hover:not($disabled):after': {
        // aidsfondsBlue, but to override given opacity.
        backgroundColor: 'rgba(0, 0, 255, 1)'
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.color.zoomBlack
      },
      '&:after': {
        // aidsfondsBlue, but to override given opacity.
        backgroundColor: 'rgba(0, 0, 255, 1)'
      }
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
      fontSize: '14px',
      fontFamily: theme.font.zoomFontFamTwo
    }
  };
};

export const styleOverrides = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      focused: {
        color: theme.color.aidsFondsBlue + '!important'
      }
    }
  }
});
