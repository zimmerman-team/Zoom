/* base */
import React from 'react';

/* components */
import {
  UsersTableColHeader,
  UsersTableCellValue,
} from 'modules/UserManagement/CreateTeam/CreateTeamModule.styles';
import { aidsFondsRed } from 'components/theme/ThemeSheet';
import { CheckBox } from 'grommet';

export const columns = [
  {
    property: 'selected',
    header: (
      <UsersTableColHeader>
        <CheckBox />
      </UsersTableColHeader>
    ),
    render: val => (
      <UsersTableCellValue>
        <CheckBox />
      </UsersTableCellValue>
    ),
  },
  {
    property: 'name',
    header: <UsersTableColHeader>Name</UsersTableColHeader>,
    render: val => (
      <UsersTableCellValue theme={{ color: aidsFondsRed }}>
        {val.name}
      </UsersTableCellValue>
    ),
    search: true,
    sortable: true,
  },
  {
    property: 'role',
    header: <UsersTableColHeader>Role</UsersTableColHeader>,
    render: val => <UsersTableCellValue>{val.role}</UsersTableCellValue>,
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
