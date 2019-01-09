const data = {
  transParams: {
    recipient_country: 'KE',
    page: 1,
    page_size: 10,
    fields:
      'sectors,title,id,activity_dates,reporting_organisation,aggregations',
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
  }
};

export default data;
