/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconSort from 'assets/icons/IconSort';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';
import { ViewContainer, AddUserLink, ControlsRow } from './UsersTabView.styles';
import GridList from '../GridList/GridList';

/* consts */
const users = [
  {
    id: 0,
    title: 'Jane Doe',
    info: {
      Role: 'Admin',
      'Mapped data sets': 1,
      Charts: 2,
      Twitter: ''
    }
  }
];

const sortByOptions = [
  { label: 'Name (asc)', value: 'name:1' },
  { label: 'Name (desc)', value: 'name:-1' }
];

const propTypes = {
  sort: PropTypes.string,
  changeSortBy: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  setWrapperRef: PropTypes.func,
  setIsSortByOpen: PropTypes.func
};
const defaultProps = {
  sort: '',
  changeSortBy: null,
  setWrapperRef: null,
  isSortByOpen: false,
  setIsSortByOpen: null
};

const UsersTabView = ({
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy
}) => (
  <ViewContainer>
    <ControlsRow>
      <AddUserLink to="/add-user">
        <SvgIconPlus /> add user
      </AddUserLink>
      <div>
        <SvgIconSort onClick={setIsSortByOpen} />
        <SortbyDialog
          open={isSortByOpen}
          options={sortByOptions}
          selectedOptionValue={sort}
          onOptionClick={changeSortBy}
          setWrapperRef={setWrapperRef}
          closeDialog={setIsSortByOpen}
        />
      </div>
    </ControlsRow>
    <GridList items={users} />
  </ViewContainer>
);

UsersTabView.propTypes = propTypes;
UsersTabView.defaultProps = defaultProps;

export default UsersTabView;
