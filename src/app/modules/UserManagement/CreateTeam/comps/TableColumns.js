/* base */
import React from 'react';
/* components */
import { CheckBox } from 'grommet';
import {
  SortByIcon,
  UsersTableCellValue,
  UsersTableColHeader
} from 'modules/UserManagement/CreateTeam/CreateTeamModule.styles';
import theme from 'theme/Theme';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';

const sortByOptions = [
  { label: 'Name (asc)', value: 'name:1' },
  { label: 'Name (desc)', value: 'name:-1' }
];

export default function getColumns(
  selectedValues,
  addRemoveSelectionFunc,
  addRemoveAllSelectionsFunc,
  isSortByOpen,
  changeIsSortByOpen,
  setWrapperRef,
  onSortOptionClick,
  selectedSortBy
) {
  return [
    {
      property: 'id',
      header: (
        <UsersTableColHeader>
          <CheckBox onChange={addRemoveAllSelectionsFunc} />
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
      )
    },
    {
      property: 'name',
      header: <UsersTableColHeader>Name</UsersTableColHeader>,
      render: val => (
        <UsersTableCellValue theme={{ color: theme.color.aidsFondsRed }}>
          {val.name}
        </UsersTableCellValue>
      ),
      search: false,
      sortable: false
    },
    {
      property: 'role',
      header: <UsersTableColHeader>Role</UsersTableColHeader>,
      render: val => <UsersTableCellValue>{val.role}</UsersTableCellValue>,
      search: false,
      sortable: false
    },
    {
      property: 'sort',
      header: (
        <UsersTableColHeader>
          <SortByIcon onClick={changeIsSortByOpen} />
          <SortbyDialog
            open={isSortByOpen}
            options={sortByOptions}
            closeDialog={changeIsSortByOpen}
            setWrapperRef={setWrapperRef}
            onOptionClick={onSortOptionClick}
            selectedOptionValue={selectedSortBy}
          />
        </UsersTableColHeader>
      ),
      render: () => <UsersTableCellValue />
    }
  ];
}
