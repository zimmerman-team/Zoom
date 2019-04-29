/* consts */
import paneTypes from '__consts__/PaneTypesConst';
import theme from 'theme/Theme';

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
    navTo: '/visualizer/focusKE/vizID/edit',
    style: {color: theme.color.zoomGreyEleven, cursor: 'default'}
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
  },
  {
    label: 'Table chart',
    navTo: '/visualizer/tablechart/vizID/edit',
    style: {color: theme.color.zoomGreyEleven, cursor: 'default'}
  },
  {
    label: 'Donut chart',
    navTo: '/visualizer/donutchart/vizID/edit',
    style: {color: theme.color.zoomGreyEleven, cursor: 'default'}
  }
];

export const convertDataItems = [
  {
    label: 'Convert data',
    navTo: '/mapper'
  }
];
