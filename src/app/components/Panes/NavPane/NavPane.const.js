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
    navTo: '/visualizer/geomap/vizID/edit',
  },
  {
    label: 'Country Focus Page Kenya',
    navTo: '/visualizer/focusKE/vizID/edit',
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
    navTo: '/visualizer/barchart/vizID/edit',
    style: {color: theme.color.zoomGreyEleven, cursor: 'default', fill: theme.color.zoomGreyEleven, backgroundColor: theme.color.aidsFondsWhite}
  },
  {
    label: 'Table chart',
    navTo: '/visualizer/tablechart/vizID/edit',
    style: {
      color: theme.color.zoomGreyEleven,
      cursor: 'default',
      fill: theme.color.zoomGreyEleven,
      backgroundColor: theme.color.aidsFondsWhite }
    },
  {
    label: 'Donut chart',
    navTo: '/visualizer/donutchart/vizID/edit',
    style: {
      color: theme.color.zoomGreyEleven,
      cursor: 'default',
      fill: theme.color.zoomGreyEleven,
      backgroundColor: theme.color.aidsFondsWhite }
  }];

export const convertDataItems = [
  {
    label: 'Convert data',
    navTo: '/mapper'
  }
];
