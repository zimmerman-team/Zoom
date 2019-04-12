import { createMuiTheme } from '@material-ui/core';
import Theme from '../../../theme/Theme';

export default () =>
  createMuiTheme({
    overrides: {
      MuiTypography: {
        h6: {
          // H6
          // border: '1px red solid',
          color: Theme.color.zoomBlack,
          fontFamily: Theme.font.zoomFontFamThree,
          fontSize: '20px',
          fontWeight: Theme.weight.medium,
          letterSpacing: '0.5px',
          lineHeight: '26px'
        },
        subtitle1: {
          //Body 2
          // border: '1px blue solid',
          color: Theme.color.zoomBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontWeight: Theme.weight.book,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px'
        },
        caption: {
          color: Theme.color.smallTextBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.caption,
          fontWeight: Theme.weight.book,
          letterSpacing: 0.2,
          lineHeight: '14.4px'
        }
      },
      MUIDataTableHeadRow: {
        root: {
          borderTop: `1px solid ${Theme.color.zoomGreyThirteen}`
        }
      },
      MUIDataTableHeadCell: {
        data: {
          // CAPTION
          // border: '1px red solid',
          color: Theme.color.smallTextBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.caption,
          fontWeight: Theme.weight.book,
          letterSpacing: 0.2,
          lineHeight: '14.4px'
        },
        fixedHeader: {
          // CAPTION
          // border: '1px red solid',
          color: Theme.color.smallTextBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.caption,
          fontWeight: Theme.weight.book,
          letterSpacing: 0.2,
          lineHeight: '14.4px'
        }
      },
      MuiTableRow: {
        root: {
          '&:nth-child(even)': {
            // border: '1px red solid',
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
          // border: '1px red solid',
          border: 'none',
          color: Theme.color.zoomBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          fontWeight: Theme.weight.book,
          letterSpacing: '0.5px',
          lineHeight: '22px'
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
        }
      },
      MuiTablePagination: {
        caption: {
          // CAPTION
          // border: '1px red solid',
          color: Theme.color.smallTextBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.caption,
          fontWeight: Theme.weight.book,
          letterSpacing: 0.2,
          lineHeight: '14.4px'
        },
        select: {
          // CAPTION
          // border: '1px red solid',
          color: Theme.color.smallTextBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.caption,
          fontWeight: Theme.weight.book,
          letterSpacing: 0.2,
          lineHeight: '14.4px'
        }
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
        input: {
          //// border: '1px blue solid',
          color: Theme.color.zoomBlack,
          fontWeight: Theme.weight.book,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px'
        },
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
          // border: '1px blue solid',
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
          // border: '1px blue solid',
          color: Theme.color.aidsFondsBlue,
          fontWeight: Theme.weight.book,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px',
          textTransform: 'lowercase' // => fixme
        },
        selectFormControl: {
          // border: '1px red solid'
        }
      },
      MuiInputLabel: {
        formControl: {
          // CAPTION
          // border: '1px red solid',
          color: Theme.color.smallTextBlack,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.caption,
          fontWeight: Theme.weight.book,
          letterSpacing: 0.2,
          lineHeight: '14.4px'
        }
      },
      MUIDataTableToolbarSelect: {
        root: {
          boxShadow: 'none',
          backgroundColor: Theme.color.zoomGreyZero
          // height: '54px',
          // paddingTop: '0px',
          // paddingBottom: '0px'
        },
        title: {
          //Body 2
          Theme: Theme.text.body2,
          // border: '1px red solid',
          textTransform: 'lowercase' // => fixme
        }
      },
      MUIDataTableViewCol: {
        title: {
          //Body 2
          // border: '1px red solid',
          color: Theme.color.zoomBlack,
          fontWeight: Theme.weight.book,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px'
        },
        label: {
          //Body 2
          // border: '1px red solid',
          color: Theme.color.zoomBlack,
          fontWeight: Theme.weight.book,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px'
        },
        checked: {
          // border: '1px red solid',
          color: `${Theme.color.aidsFondsBlue}!important`
        },
        checkboxRoot: {
          // border: '1px red solid',
          color: `${Theme.color.zoomGreyEleven}`
        }
      },
      MuiMenuItem: {
        root: {
          //Body 2
          // border: '1px red solid',
          color: Theme.color.zoomBlack,
          fontWeight: Theme.weight.book,
          fontFamily: Theme.font.zoomFontFamTwo,
          fontSize: Theme.fontSize.body2,
          letterSpacing: '0.5px',
          lineHeight: '22px'
        }
      }
    }
  });
