/* consts */
import paneTypes from '__consts__/PaneTypesConst';

export const startItems = [
  {
    label: 'Create chart',
    navTo: paneTypes.createChart
  },
  {
    label: 'Convert data',
    navTo: paneTypes.convertData
  },
  {
    label: 'Explore data',
    navTo: paneTypes.pubPane
  }
];

export const createChartItems = [
  {
    label: 'Geo Map Chart',
    navTo: '/create/geo'
  },
  {
    label: 'Country Focus Page Kenya',
    navTo: '/create/focus/kenya'
  },
  {
    label: 'Country Focus Page Netherlands',
    navTo: '/create/focus/NL'
  },
  {
    label: 'Line chart',
    navTo: '/create/linechart'
  },
  {
    label: 'Bar chart',
    navTo: '/create/barchart'
  },
  {
    label: 'Table',
    navTo: '/create/table'
  }
];

export const convertDataItems = [
  {
    label: 'Convert data',
    navTo: '#'
  }
];
