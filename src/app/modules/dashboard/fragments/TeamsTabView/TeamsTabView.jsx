/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconSort from 'assets/icons/IconSort';
import { NoItems } from 'modules/dashboard/DashboardModule.styles';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';
import { ViewContainer, AddTeamLink, ControlsRow } from './TeamsTabView.styles';
import GridList from '../GridList/GridList';

/* consts */
const sortByOptions = [
  { label: 'Name (asc)', value: 'name' },
  { label: 'Name (desc)', value: '-name' }
];

const propTypes = {
  sort: PropTypes.string,
  changeSortBy: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  setWrapperRef: PropTypes.func,
  setIsSortByOpen: PropTypes.func,
  teams: PropTypes.arrayOf(PropTypes.shape({}))
};
const defaultProps = {
  sort: '',
  changeSortBy: null,
  setWrapperRef: null,
  isSortByOpen: false,
  setIsSortByOpen: null,
  teams: []
};

const TeamsTabView = ({
  teams,
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy
}) => (
  <React.Fragment>
    {teams.length > 0 ? (
      <ViewContainer>
        <ControlsRow>
          <AddTeamLink to="/create-team">
            <SvgIconPlus /> create team
          </AddTeamLink>
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
        <GridList items={teams} />
      </ViewContainer>
    ) : (
      <NoItems>No items in Teams</NoItems>
    )}
  </React.Fragment>
);

TeamsTabView.propTypes = propTypes;
TeamsTabView.defaultProps = defaultProps;

export default TeamsTabView;
