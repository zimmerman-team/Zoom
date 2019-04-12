/* consts */
import paneTypes from '__consts__/PaneTypesConst';

export const startItems = [
  {
    label: 'Create chart',
    navTo: paneTypes.createChart
  },
  {
    label: 'Convert data',
    navTo: '/mapper'
  },
  {
    label: 'Explore data',
    navTo: paneTypes.pubPane
  }
];

export const createChartItems = [
  {
    label: 'Geo Map Chart',

    navTo: '/visualizer/geomap/vizID/edit'
  },
  {
    label: 'Country Focus Page Kenya',
    navTo: '/visualizer/focusKE/vizID/edit'
  },
  {
    label: 'Country Focus Page Netherlands',
    navTo: '/visualizer/focusNL/vizID/edit'
  },
  {
    label: 'Line chart',
    navTo: '/visualizer/linechart/vizID/edit'
  },
  {
    label: 'Bar chart',
    navTo: '/visualizer/barchart/vizID/edit'
  } /*,
  {
    label: 'Table',
    navTo: '/create/table'
  }*/
];

export const convertDataItems = [
  {
    label: 'Convert data',
    navTo: '/mapper'
  }
];
