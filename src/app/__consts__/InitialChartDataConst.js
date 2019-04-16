import { formatYearParam } from 'utils/genericUtils';

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
  createdDate: '',
  chartId: 'vizID',
  name: 'Chart',
  selectedYear: '2005',
  _public: false,
  team: false,
  // this is the actual data loaded into the chart
  indicators: [],
  dataSource1: undefined,
  dataSource2: undefined,
  selectedInd1:
    process.env.NODE_ENV === 'development'
      ? 'aids related deaths (unaids)'
      : undefined,
  selectedInd2: undefined,
  selectedCountryVal: [],
  selectedCountryLabels: [],
  desc: '',
  descIntro: '',
  selectedSubInd1: [],
  selectedSubInd2: [],
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
