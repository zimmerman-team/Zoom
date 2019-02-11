/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconSort from 'assets/icons/IconSort';
import { NoItems } from 'modules/dashboard/DashboardModule.styles';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';
import { ViewContainer, AddUserLink, ControlsRow } from './UsersTabView.styles';
import GridList from '../GridList/GridList';

/* consts */
const sortByOptions = [
  { label: 'Name (asc)', value: 'name:1' },
  { label: 'Name (desc)', value: 'name:-1' }
];

const propTypes = {
  sort: PropTypes.string,
  changeSortBy: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  setWrapperRef: PropTypes.func,
  setIsSortByOpen: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape({}))
};
const defaultProps = {
  sort: '',
  changeSortBy: null,
  setWrapperRef: null,
  isSortByOpen: false,
  setIsSortByOpen: null,
  users: []
};

const UsersTabView = ({
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy,
  users
}) => (
  <React.Fragment>
    {users.length > 0 ? (
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
    ) : (
      <NoItems>No items in Users</NoItems>
    )}
  </React.Fragment>
);

UsersTabView.propTypes = propTypes;
UsersTabView.defaultProps = defaultProps;

export default UsersTabView;
