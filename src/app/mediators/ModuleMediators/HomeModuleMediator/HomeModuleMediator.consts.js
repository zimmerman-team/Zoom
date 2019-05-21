export const initialState = {
  data: [],
  selectedInd1:
    process.env.NODE_ENV === 'development'
      ? 'aids related deaths (unaids)'
      : undefined,
  subIndAggr1: false,
  selectedInd2: undefined,
  subIndAggr2: false,
  subIndicators1: [],
  indSelectedIndex: -1,
  subIndicators2: [],
  selectedCountryVal: [],
  selectedCountryLabel: [],
  selectedSubInd1: [],
  selectedSubInd2: [],
  selectedRegionVal: [],
  selectedRegionLabels: []
};
