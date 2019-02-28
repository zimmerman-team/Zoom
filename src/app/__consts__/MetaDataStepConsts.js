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
    q1: "Don't know",
    q2: [],
    q21: "Don't know",
    q22: "Don't know",
    q3: [],
    q4: {
      key: '',
      label: '',
      value: ''
    },
    q5: "Don't know",
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
  environment: {}
};
