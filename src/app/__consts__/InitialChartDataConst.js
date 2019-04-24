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
  yearPeriod: formatYearParam([1992, 2018]),
  chartMounted: false,
  authorName: 'You',
  createdDate: formatDate(today),
  chartId: 'vizID',
  name: 'Chart',
  selectedYear: '2005',
  _public: false,
  team: false,
  chartKeys:
    process.env.NODE_ENV === 'development'
      ? [
          {
            color: 'hsl(23, 70%, 50%)',
            name: 'aids related deaths (unaids)',
            orientation: 'left'
          }
        ]
      : [],
  // this is the actual data loaded into the chart
  data: [],
  // so this array will basically store the data
  // about the selected indicators and their sub-indicators
  // and the indicator associated dataSource
  selectedInd: [
    {
      indicator:
        process.env.NODE_ENV === 'development'
          ? 'aids related deaths (unaids)'
          : undefined,
      // so these are all of the sub-indicators
      // of the selected indicator
      subIndicators: [],
      // so this is the dataSource
      // of the selected indicator
      dataSource: undefined,
      selectedSubInd: []
    },
    {
      indicator: undefined,
      // so these are all of the sub-indicators
      // of the selected indicator
      subIndicators: [],
      // so this is the dataSource
      // of the selected indicator
      dataSource: undefined,
      selectedSubInd: []
    }
  ],
  selectedCountryVal: [],
  selectedCountryLabels: [],
  desc: '',
  descIntro: '',
  selectedRegionVal: [],
  selectedRegionLabels: [],
  // this is the variable for saving
  // specific chart options
  // like the graph structure options
  // for linechart/barchart
  // or the viewport for geocharts
  specOptions: {}
};

export default initialState;
