/* base */
import React from 'react';

/* components */
import {
  CellValue,
  ColumnHeader,
  aidsFondsRed,
} from 'components/theme/ThemeSheet';
import { CheckBox } from 'grommet';

export const columns = [
  {
    property: 'selected',
    header: (
      <ColumnHeader>
        <CheckBox />
      </ColumnHeader>
    ),
    render: val => (
      <CellValue>
        <CheckBox />
      </CellValue>
    ),
  },
  {
    property: 'name',
    header: <ColumnHeader>Name</ColumnHeader>,
    render: val => (
      <CellValue theme={{ color: aidsFondsRed }}>{val.name}</CellValue>
    ),
    search: true,
    sortable: true,
  },
  {
    property: 'role',
    header: <ColumnHeader>Role</ColumnHeader>,
    render: val => <CellValue>{val.role}</CellValue>,
    search: true,
    sortable: true,
  },
];

export const tableData = [
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Administrator',
  },
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Administrator',
  },
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Administrator',
  },
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Administrator',
  },
  {
    id: '1',
    name: 'Jane Doe',
    role: 'Administrator',
  },
];
