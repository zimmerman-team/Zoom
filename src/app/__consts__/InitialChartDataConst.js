import { formatYearParam } from 'utils/genericUtils';
import { formatDate } from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator.utils';

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

// As discussed with Siem default year period selected should be
// current year and 15 years before
// const now = new Date();
// const currentYear = now.getFullYear();
// const yearBefore = currentYear - 15;

export const initIndItem = {
  indicator: undefined,
  indLabel: undefined,
  // so these are all of the sub-indicators
  // of the selected indicator
  subIndicators: [],
  aggregate: false,
  // so this is the dataSource
  // of the selected indicator
  dataSource: undefined,
  selectedSubInd: []
};

export const devIndicatorInd = 109;

export const devIndicatorName = 'aids related deaths (unaids)';

const initialState = {
  // so this variable is mainly used to control
  // the loading of data from zoombackend or DUCT
  // initially before changes are made in the data pane
  // the indicator data saved in the zoombackend will load
  // and if changes have been made then the data from DUCT
  // will be loading
  // and this ofcourse becomes false only when
  // actual chart data from the zoombackend has been loaded
  changesMade: true,
  yearPeriod: formatYearParam([1990, 2020]),
  chartMounted: false,
  authorName: 'You',
  createdDate: formatDate(today),
  chartId: 'vizID',
  name: 'Chart',
  selectedYear: '2005',
  selectedYears: formatYearParam([2000, 2010]),
  _public: false,
  refetch: false,
  // so this variable will be used in special cases
  // where one indicator is selected but all indicators
  // still need to be refetched, this will be used
  // for example with the reselect data year functionality
  // when an indicator is selected
  refetchAll: false,
  teams: [],
  chartKeys:
    process.env.NODE_ENV === 'development'
      ? [
          {
            color: 'hsl(23, 70%, 50%)',
            name: `${devIndicatorName} - adolescents (10 to 19) realistic estimate`,
            label: `${devIndicatorName} - adolescents (10 to 19) realistic estimate`,
            indIndex: 0,
            orientation: 'left'
          }
        ]
      : [],
  indKeys: [],
  // this is the actual data loaded into the chart
  data: [],
  // so this array will basically store the data
  // about the selected indicators and their sub-indicators
  // and the indicator associated dataSource
  selectedInd: [
    {
      indicator:
        process.env.NODE_ENV === 'development' ? devIndicatorInd : undefined,
      indLabel:
        process.env.NODE_ENV === 'development' ? devIndicatorName : undefined,
      // so these are all of the sub-indicators
      // of the selected indicator
      subIndicators: [],
      // so this is the dataSource
      // of the selected indicator
      dataSource:
        process.env.NODE_ENV === 'development' ? 'UNAIDS 2018' : undefined,
      selectedSubInd: [],
      // this variable mainly controls the data formating for charts
      // as in if the data should be formated by adding the sub-indicator
      // values, or if they should be seperated into different legends
      aggregate: false
    },
    {
      indicator: undefined,
      indLabel: undefined,
      // so these are all of the sub-indicators
      // of the selected indicator
      subIndicators: [],
      // so this is the dataSource
      // of the selected indicator
      dataSource: undefined,
      selectedSubInd: [],
      // this variable mainly controls the data formating for charts
      // as in if the data should be formated by adding the sub-indicator
      // values, or if they should be seperated into different legends
      aggregate: false
    }
  ],
  // so we use this 'indSelectedIndex' variable to detect
  // when an indicator gets selected
  // cause currently checking this change
  // in selectedInd would be a very messy
  // solution and might intil issues
  indSelectedIndex: process.env.NODE_ENV === 'development' ? 0 : -1,
  indicatorSelected: process.env.NODE_ENV === 'development',
  selectedCountryVal: [],
  selectedCountryLabels: [],
  desc: '',
  descIntro: '',
  selectedRegionVal: [],
  selectedRegionLabels: [],
  selectedRegionCodes: [],
  // this is the variable for saving
  // specific chart options
  // like the graph structure options
  // for linechart/barchart
  // or the viewport for geocharts
  specOptions: {}
};

export default initialState;
