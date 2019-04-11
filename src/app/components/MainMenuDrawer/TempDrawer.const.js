import React from 'react';
import EditorTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/EditorTab';
import IconFilter from 'assets/icons/toolpanel/IconFilter';
import IconHome from 'assets/icons/IconHome';
import IconCharts from 'assets/icons/IconCharts';
import IconClose from 'assets/icons/IconClose';
import IconAbout from 'assets/icons/IconAbout';

const pathPrefix = '/';
export const data = [
  {
    label: 'Home',
    path: `${pathPrefix}home`,
    icon: <IconHome />,
    env: 'production',
    type: 'public'
  },
  {
    label: 'Home',
    path: `${pathPrefix}home`,
    icon: <IconHome />,
    env: 'development',
    type: 'public'
  },
  {
    label: 'Country Detail',
    path: `${pathPrefix}country/ke`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  {
    label: 'IATI Detail',
    path: `${pathPrefix}iati`,
    icon: <IconCharts />,
    env: 'development',
    atype: 'private'
  },
  {
    label: 'Datamapper',
    path: `${pathPrefix}mapper`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  {
    label: 'NL Focus',
    path: `${pathPrefix}focus/NL`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  {
    label: 'Visualizer',
    path: `${pathPrefix}visualizer/geomap/vizID/edit`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  {
    label: 'Public Charts',
    path: `${pathPrefix}public/chart-library`,
    icon: <IconCharts />,
    env: 'production',
    type: 'public'
  },
  {
    label: 'Public Charts',
    path: `${pathPrefix}public/chart-library`,
    icon: <IconCharts />,
    env: 'development',
    type: 'public'
  },
  {
    label: 'Dashboard',
    path: `${pathPrefix}dashboard`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  {
    label: 'Dashboard',
    path: `${pathPrefix}dashboard`,
    icon: <IconCharts />,
    env: 'production',
    type: 'private'
  },
  {
    label: 'About ZOOM',
    path: `${pathPrefix}about`,
    icon: <IconAbout />,
    env: 'production',
    type: 'public'
  },
  {
    label: 'About ZOOM',
    path: `${pathPrefix}about`,
    icon: <IconAbout />,
    env: 'development',
    type: 'public'
  }
];
