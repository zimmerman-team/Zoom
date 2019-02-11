/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconSort from 'assets/icons/IconSort';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';
import { ViewContainer, AddTeamLink, ControlsRow } from './TeamsTabView.styles';
import GridList from '../GridList/GridList';

/* consts */
const teams = [
  {
    id: 0,
    title: 'Team A',
    info: {
      'Created by': 'Jane Doe',
      'Publication date': '01-01-2019',
      'Linked organisations': 'Aidsfonds'
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

const TeamsTabView = ({
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy
}) => (
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
);

TeamsTabView.propTypes = propTypes;
TeamsTabView.defaultProps = defaultProps;

export default TeamsTabView;
