import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Theme from '../../../theme/Theme';

const body2 = {
  color: Theme.color.zoomBlack,
  fontFamily: Theme.font.zoomFontFamTwo,
  fontWeight: Theme.weight.book,
  fontSize: Theme.fontSize.body2,
  letterSpacing: '0.5px',
  lineHeight: '22px'
};

const h6 = {
  color: Theme.color.zoomBlack,
  fontFamily: Theme.font.zoomFontFamThree,
  fontSize: '20px',
  fontWeight: Theme.weight.medium,
  letterSpacing: '0.5px',
  lineHeight: '26px'
};

const caption = {
  color: Theme.color.smallTextBlack,
  fontFamily: Theme.font.zoomFontFamTwo,
  fontSize: Theme.fontSize.caption,
  fontWeight: Theme.weight.book,
  letterSpacing: 0.2,
  lineHeight: '14.4px'
};

export default () =>
  createMuiTheme({
    overrides: {
      MuiTypography: {
        h6,
        subtitle1: body2,
        caption
      },
      MUIDataTableHeadCell: {
        data: caption,
        fixedHeader: {
          borderTop: `1px solid ${Theme.color.zoomGreyThirteen}`
        }
      },
      MuiTableRow: {
        root: {
          '&:nth-child(even)': {
            backgroundColor: Theme.color.zoomGreyZero,
            height: '51px'
          }
        },
        hover: {
          '&&:hover': {
            backgroundColor: Theme.color.zoomGreyTwelf
          }
        },
        head: {
          height: '54px'
        }
      },
      MuiTableCell: {
        body: {
          //Body 2
          border: 'none',
          color: Theme.color.zoomBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          fontWeight: Theme.weight.book,
          letterSpacing: '0.5px',
          lineHeight: '22px'
        }
      },
      MuiTable: {
        root: {
          borderCollapse: 'separate',
          marginBottom: '41px'
        }
      },
      MUIDataTableSelectCell: {
        checkboxRoot: {
          // border: '1px red solid',
          color: Theme.color.zoomGreyEleven
        },
        checked: {
          // border: '1px red solid',
          color: `${Theme.color.aidsFondsBlue}!important`
        },
        headerCell: {
          borderTop: `1px solid ${Theme.color.zoomGreyThirteen}`
        }
      },
      MuiTablePagination: {
        caption,
        select: caption
      },
      MUIDataTableToolbar: {
        icon: {
          '&:hover': {
            // border: '1px red solid',
            color: Theme.color.aidsFondsBlue
          }
        },
        iconActive: {
          // border: '1px red solid',
          color: Theme.color.aidsFondsBlue
        }
      },
      MuiInput: {
        input: body2,
        underline: {
          '&::after': {
            borderBottomColor: Theme.color.aidsFondsBlue
          }
        }
      },
      MUIDataTableSearch: {
        clearIcon: {
          '&:hover': {
            color: Theme.color.aidsFondsRed
          }
        }
      },
      MuiTableFooter: {
        root: {
          backgroundColor: Theme.color.aidsFondsWhite,
          borderTop: `1px solid ${Theme.color.zoomGreyThirteen}`
        }
      },
      MUIDataTableFilter: {
        title: {
          //Body 2
          color: Theme.color.zoomBlack,
          fontFamily: Theme.font.zoomFontFamOne,
          fontWeight: Theme.weight.bold,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px',
          textTransform: 'lowercase' // => fixme
        },
        resetLink: {
          //Body 2
          color: Theme.color.aidsFondsBlue,
          fontWeight: Theme.weight.book,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px',
          textTransform: 'lowercase' // => fixme
        }
      },
      MuiInputLabel: {
        formControl: caption
      },
      MUIDataTableToolbarSelect: {
        root: {
          boxShadow: 'none',
          backgroundColor: Theme.color.zoomGreyZero,
          zIndex: 0
        },
        title: {
          //Body 2
          color: Theme.color.zoomBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontWeight: Theme.weight.book,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px',
          textTransform: 'lowercase' // => fixme
        }
      },
      MUIDataTableViewCol: {
        title: body2,
        label: body2,
        checked: {
          color: `${Theme.color.aidsFondsBlue}!important`
        },
        checkboxRoot: {
          color: `${Theme.color.zoomGreyEleven}`
        }
      },
      MuiMenuItem: {
        root: body2
      }
    }
  });
