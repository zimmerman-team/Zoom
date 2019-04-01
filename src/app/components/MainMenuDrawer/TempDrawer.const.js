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
    env: 'production'
  },
  {
    label: 'Home',
    path: `${pathPrefix}home`,
    icon: <IconHome />,
    env: 'development'
  },
  {
    label: 'Country Detail',
    path: `${pathPrefix}country/ke`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'IATI Detail',
    path: `${pathPrefix}iati`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'Datamapper',
    path: `${pathPrefix}mapper`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'NL Focus',
    path: `${pathPrefix}focus/NL`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'KEN Focus',
    path: `${pathPrefix}focus/KE`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'Visualizer',
    path: `${pathPrefix}visualizer/geomap/vizID/edit`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'Dashboard public',
    path: `${pathPrefix}public/chart-library`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'Dashboard',
    path: `${pathPrefix}dashboard`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'Dashboard',
    path: `${pathPrefix}dashboard`,
    icon: <IconCharts />,
    env: 'production'
  },
  {
    label: 'Dashboard users ',
    path: `${pathPrefix}dashboard/users`,
    icon: <IconCharts />,
    env: 'development'
  },
  {
    label: 'About ZOOM',
    path: `${pathPrefix}about`,
    icon: <IconAbout />,
    env: 'production'
  },
  {
    label: 'About ZOOM',
    path: `${pathPrefix}about`,
    icon: <IconAbout />,
    env: 'development'
  }
];
