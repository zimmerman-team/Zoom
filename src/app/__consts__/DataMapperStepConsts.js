export const step1InitialData = {
  metaData: {
    title: '',
    desc: '',
    org: '',
    year: '',
    tags: [],
    dataSource: {
      key: '',
      label: '',
      value: ''
    },
    accessibility: 'Private',
    surveyData: 'Yes',
    q1: '2',
    q2: [],
    q21: '2',
    q22: '2',
    q3: [],
    q4: {
      key: '',
      label: '',
      value: ''
    },
    q5: '2',
    q51: [],
    sourceText: '',
    q3Text: '',
    q4Text: '',
    q51Text: '',
    // the required fields need to have the same name as the
    // state variables
    requiredFields: ['title', 'desc', 'dataSource', 'org', 'year'],
    fileSources: []
  },
  uploadData: {
    url: '',
    file: {},
    fileId: '',
    sourceId: '',
    modelOptions: [],
    mappingJson: {}
  },
  manMapData: [],
  overviewData: [],
  errorColumns: [],
  orgErrorColumns: [],
  environment: {}
};
