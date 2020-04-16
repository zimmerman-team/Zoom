/* base */
import React from 'react';
/* components */
import Checkbox from 'app/components/Checkbox/CheckBox';
import {
  SortByIcon,
  UsersTableCellValue,
  UsersTableColHeader
} from 'app/modules/UserManagement/CreateTeam/CreateTeamModule.styles';
import theme from 'app/theme/Theme';
import SortbyDialog from 'app/components/Dialog/SortbyDialog/SortbyDialog';

const sortByOptions = [
  { label: 'Name (asc)', value: 'name' },
  { label: 'Name (desc)', value: '-name' },
  { label: 'Role (asc)', value: 'role' },
  { label: 'Role (desc)', value: '-role' }
];

export default function getColumns(
  selectedValues,
  addRemoveSelectionFunc,
  addRemoveAllSelectionsFunc,
  isSortByOpen,
  changeIsSortByOpen,
  setWrapperRef,
  onSortOptionClick,
  selectedSortBy,
  disableCheckbox = false
) {
  return [
    {
      property: 'id',
      header: (
        <UsersTableColHeader>
          <Checkbox
            onChange={addRemoveAllSelectionsFunc}
            disabled={disableCheckbox}
          />
        </UsersTableColHeader>
      ),
      render: val => (
        <UsersTableCellValue>
          <Checkbox
            id={val.id}
            name={val.name}
            disabled={disableCheckbox}
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
