const data = {
  activityParams: {
    recipient_country: 'KE',
    page: 1,
    page_size: 400,
    fields:
      'sectors,title,id,activity_dates,reporting_organisation,aggregations',
    ordering: '-activity_budget_value',
    reporting_organisation_identifier: 'NL-KVK-41207989'
  },
  wikiParams: {
    origin: '*',
    action: 'query',
    prop: 'extracts',
    exsentences: 5,
    exlimit: 1,
    exintro: 1,
    explaintext: 1,
    exsectionformat: 'raw',
    formatversion: 2,
    titles: 'Kenya'
  },
  transactionParams: {
    group_by: 'sector',
    aggregations: 'commitment,disbursement',
    convert_to: 'eur',
    reporting_organisation_identifier: 'NL-KVK-41207989'
  },
  countryCode: 'ke',
  // So currently these are the default indicators
  // that are gonna be used for all country details
  barChartIndicators: [
    'people living with hiv',
    'new hiv infections',
    'aids-related deaths'
  ],
  // So currently for aids epidemics data we will use
  // this array of indicators
  aidsEpIndicators: [
    'new hiv infections',
    'aids-related deaths',
    'people living with hiv',
    'children living with hiv',
    'coverage of people receiving art'
  ],
  lineChartInd: [
    { name: 'new hiv infections', color: 'hsl(172, 70%, 50%)' },
    { name: 'aids-related deaths', color: 'hsl(91, 70%, 50%)' },
    { name: 'people living with hiv', color: 'hsl(313, 70%, 50%)' },
    { name: 'children living with hiv', color: 'hsl(221, 70%, 50%)' },
    { name: 'coverage of people receiving art', color: 'hsl(48, 70%, 50%)' }
  ]
};

export default data;
