import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'theme/Theme';
import tableDataMock from './TableData.mock';
import tableColumnsMock from './TableColumns.mock';

const propTypes = {};
const defaultProps = {};

class TableChart extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTypography: {
          h6: {
            // H6
            border: '1px red solid',
            color: Theme.color.zoomBlack,
            fontFamily: Theme.font.zoomFontFamThree, // ==> double check
            fontSize: '20px',
            fontWeight: Theme.weight.medium,
            letterSpacing: '0.5px',
            lineHeight: '26px'
          }
        },
        MUIDataTableHeadCell: {
          data: {
            // CAPTION
            border: '1px red solid',
            color: Theme.color.fontDarkSecondary,
            fontFamily: Theme.font.zoomFontFamTwo,
            fontSize: Theme.fontSize.caption,
            fontWeight: Theme.weight.book,
            letterSpacing: 0.2,
            lineHeight: '14.4px'
          },
          fixedHeader: {
            // CAPTION
            border: '1px red solid',
            color: Theme.color.fontDarkSecondary,
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
              border: '1px red solid',
              backgroundColor: Theme.color.greyLight50
            }
          },
          hover: {
            '&&:hover': {
              backgroundColor: Theme.color.zoomGreyTwelf
            }
          }
        },
        MuiTableCell: {
          body: {
            border: '1px red solid',
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
            border: '1px red solid',
            color: Theme.color.greyLight25
          },
          checked: {
            border: '1px red solid',
            color: `${Theme.color.aidsFondsBlue}!important`
          }
        },
        MuiTablePagination: {
          caption: {
            // CAPTION
            border: '1px red solid',
            color: Theme.color.fontDarkSecondary,
            fontFamily: Theme.font.zoomFontFamTwo,
            fontSize: Theme.fontSize.caption,
            fontWeight: Theme.weight.book,
            letterSpacing: 0.2,
            lineHeight: '14.4px'
          },
          select: {
            // CAPTION
            border: '1px red solid',
            color: Theme.color.fontDarkSecondary,
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
              border: '1px red solid',
              color: Theme.color.aidsFondsBlue
            }
          },
          iconActive: {
            border: '1px red solid',
            color: Theme.color.aidsFondsBlue
          }
        },
        MuiInput: {
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
            backgroundColor: Theme.color.aidsFondsWhite
          }
        }
      }
    });

  render() {
    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked'
    };

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title="H6 Headline"
          data={tableDataMock}
          columns={tableColumnsMock}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

TableChart.propTypes = propTypes;
TableChart.defaultProps = defaultProps;

export default TableChart;
