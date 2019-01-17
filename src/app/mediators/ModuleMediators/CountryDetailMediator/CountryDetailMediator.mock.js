const data = {
  transParams: {
    recipient_country: 'KE',
    page: 1,
    page_size: 10,
    fields:
      'sectors,title,id,activity_dates,reporting_organisation,aggregations',
    ordering: 'activity_budget_value',
    reporting_organisation_identifier: 'NL-KVK-41207989',
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
    titles: 'Kenya',
  },
  countryCode: 'ke',
  // So currently these are the default indicators
  // that are gonna be used for all country details
  barChartIndicators: [
    'people living with hiv',
    'new hiv infections',
    'aids-related deaths',
  ],
  // So currently for aids epidemics data we will use
  // this array of indicators
  aidsEpIndicators: [
    'people living with hiv',
    'new hiv infections',
    'aids-related deaths',
    'children living with hiv',
    'coverage of people receiving art',
  ],
};

export default data;
