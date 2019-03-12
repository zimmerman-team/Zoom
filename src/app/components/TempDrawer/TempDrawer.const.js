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
    path: pathPrefix + 'home',
    icon: <IconHome />
  },
  {
    label: 'Country Detail',
    path: pathPrefix + 'country/ke',
    icon: <IconCharts />
  },
  {
    label: 'IATI Detail',
    path: pathPrefix + 'iati',
    icon: <IconCharts />
  },
  {
    label: 'Datamapper',
    path: pathPrefix + 'mapper',
    icon: <IconCharts />
  },
  {
    label: 'NL Focus',
    path: pathPrefix + 'focus/nl',
    icon: <IconCharts />
  },
  {
    label: 'Kenya Focus',
    path: pathPrefix + 'focus/kenya',
    icon: <IconCharts />
  },
  {
    label: 'Visualizer',
    path: pathPrefix + 'visualizer/vizID/edit',
    icon: <IconCharts />
  },
  {
    label: 'About ZOOM',
    path: pathPrefix + 'about',
    icon: <IconAbout />
  }
];
