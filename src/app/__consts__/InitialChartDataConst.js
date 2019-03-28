import { formatYearParam } from 'utils/genericUtils';

// As discussed with Siem default year period selected should be
// current year and 15 years before
// const now = new Date();
// const currentYear = now.getFullYear();
// const yearBefore = currentYear - 15;

const initialState = {
  yearPeriod: formatYearParam([2003, 2016]),
  chartMounted: false,
  authorName: 'You',
  createdDate: '',
  chartId: 'vizID',
  name: 'Chart',
  selectedYear: '2003',
  indicators: [],
  selectedInd1: undefined,
  selectedInd2: undefined,
  selectedCountryVal: [],
  desc: '',
  selectedSubInd1: [],
  selectedSubInd2: [],
  selectedRegionVal: []
};

export default initialState;
