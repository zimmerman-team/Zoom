export const step1InitialData = {
  metaData: {
    title: '',
    desc: '',
    tags: [],
    dataSource: {
      key: '',
      label: '',
      value: ''
    },
    shared: 'Yes',
    surveyData: 'No',
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
    requiredFields: ['title', 'desc', 'dataSource'],
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
  environment: {}
};
