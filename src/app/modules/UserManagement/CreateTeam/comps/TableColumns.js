/* base */
import React from 'react';

/* components */
import IconSort from 'assets/icons/icon_sort.svg';
import {
  UsersTableColHeader,
  UsersTableCellValue,
} from 'modules/UserManagement/CreateTeam/CreateTeamModule.styles';
import { aidsFondsRed } from 'components/theme/ThemeSheet';
import { CheckBox } from 'grommet';

export default function getColumns(selectedValues, addRemoveSelectionFunc) {
  return [
    {
      property: 'selected',
      header: (
        <UsersTableColHeader>
          <CheckBox />
        </UsersTableColHeader>
      ),
      render: val => (
        <UsersTableCellValue>
          <CheckBox
            id={val.id}
            name={val.name}
            onChange={addRemoveSelectionFunc}
            checked={selectedValues.indexOf(val.id) !== -1}
          />
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
      search: false,
      sortable: false,
    },
    {
      property: 'role',
      header: <UsersTableColHeader>Role</UsersTableColHeader>,
      render: val => <UsersTableCellValue>{val.role}</UsersTableCellValue>,
      search: false,
      sortable: false,
    },
    {
      property: 'sort',
      header: (
        <UsersTableColHeader>
          <IconSort />
        </UsersTableColHeader>
      ),
      render: val => <UsersTableCellValue />,
    },
  ];
}
