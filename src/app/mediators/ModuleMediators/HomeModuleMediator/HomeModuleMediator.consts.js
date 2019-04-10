export const initialState = {
  indicators: [],
  selectedInd1:
    process.env.NODE_ENV === 'development'
      ? 'aids related deaths (unaids)'
      : undefined,
  selectedInd2: undefined,
  subIndicators1: [],
  subIndicators2: [],
  selectedCountryVal: [],
  selectedSubInd1: [],
  selectedSubInd2: [],
  selectedRegionVal: []
};
