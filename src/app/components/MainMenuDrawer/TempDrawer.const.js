import React from 'react';
import IconHome from 'assets/icons/IconHome';
import IconCharts from 'assets/icons/IconCharts';
import IconAbout from 'assets/icons/IconAbout';

const pathPrefix = '/';
export const data = [
  //////////////////////////////////////////////////////////////////////////////
  // HOME
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
  //////////////////////////////////////////////////////////////////////////////
  // COUNTRY DETAIL
  {
    label: 'Country Detail',
    path: `${pathPrefix}country/ke`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  //////////////////////////////////////////////////////////////////////////////
  // IATI DETAIL
  {
    label: 'IATI Detail',
    path: `${pathPrefix}iati`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  //////////////////////////////////////////////////////////////////////////////
  // DATA MAPPER
  {
    label: 'Datamapper',
    path: `${pathPrefix}mapper`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  //////////////////////////////////////////////////////////////////////////////
  // HOME
  {
    label: 'Visualizer',
    path: `${pathPrefix}visualizer/geomap/vizID/edit`,
    icon: <IconCharts />,
    env: 'development',
    type: 'private'
  },
  //////////////////////////////////////////////////////////////////////////////
  // DASHBOARD
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
  //////////////////////////////////////////////////////////////////////////////
  // PUBLIC CHARTS
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
  //////////////////////////////////////////////////////////////////////////////
  // ABOUT
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
  },
  {
    label: 'Cookies policy',
    path: `${pathPrefix}cookies`,
    icon: <IconAbout />,
    env: 'production',
    type: 'public'
  },
  {
    label: 'Cookies policy',
    path: `${pathPrefix}cookies`,
    icon: <IconAbout />,
    env: 'development',
    type: 'public'
  },
  {
    label: 'Privacy statement',
    path: `${pathPrefix}privacy`,
    icon: <IconAbout />,
    env: 'production',
    type: 'public'
  },
  {
    label: 'Privacy statement',
    path: `${pathPrefix}privacy`,
    icon: <IconAbout />,
    env: 'development',
    type: 'public'
  }
];
