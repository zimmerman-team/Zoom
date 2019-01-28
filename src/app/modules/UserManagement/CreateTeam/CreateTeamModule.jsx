/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Text } from 'grommet';

/* components */
import {
  CreateTeamForm,
  TableBox,
  UsersTable,
  SubmitButton,
  Message,
  TextField,
} from 'modules/UserManagement/CreateTeam/CreateTeamModule.styles';
import { aidsFondsRed, zoomGreyFive } from 'components/theme/ThemeSheet';
import Pagination from 'components/Pagination/Pagination';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import IconSearch from 'assets/icons/icon_search.svg';
import getColumns from 'modules/UserManagement/CreateTeam/comps/TableColumns';

const propTypes = {
  success: PropTypes.bool,
  secondaryInfoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  name: PropTypes.string,
  changeName: PropTypes.func,
  changeSearchKeyword: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.string),
  addRemoveUser: PropTypes.func,
  userOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  changePage: PropTypes.func,
  totalPages: PropTypes.number,
  submitForm: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  changeIsSortByOpen: PropTypes.func,
  setWrapperRef: PropTypes.func,
  changeSortBy: PropTypes.func,
  addRemoveAllUsers: PropTypes.func,
  selectedSortBy: PropTypes.string,
};
const defaultProps = {
  success: false,
  secondaryInfoMessage: null,
  errorMessage: null,
  name: '',
  changeName: null,
  changeSearchKeyword: null,
  users: [],
  addRemoveUser: null,
  userOptions: [],
  changePage: null,
  totalPages: 0,
  submitForm: null,
  isSortByOpen: false,
  changeIsSortByOpen: null,
  setWrapperRef: null,
  changeSortBy: null,
  addRemoveAllUsers: null,
  selectedSortBy: 'name:1',
};

const CreateTeam = props => {
  const disableSubmit = props.name === '' || props.users.length === 0;
  return (
    <ModuleFragment title="Create team">
      <CreateTeamForm onSubmit={props.submitForm}>
        {props.success && (
          <Message theme={{ color: 'green' }}>
            Team created successfully
          </Message>
        )}
        {!props.success && props.errorMessage && (
          <Message theme={{ color: aidsFondsRed }}>
            {props.errorMessage}
          </Message>
        )}
        {props.secondaryInfoMessage && (
          <Message theme={{ color: 'orange' }}>
            {props.secondaryInfoMessage}
          </Message>
        )}

        <InputField
          label="Team name"
          id="teamName-input"
          name="teamName"
          required
          validate={{ regexp: /^[a-z]/i }}
          value={props.name}
          onChange={props.changeName}
        />

        <Text color={zoomGreyFive} size="15px">
          Add team members
        </Text>
        <TextField
          placeholder={<IconSearch />}
          onChange={props.changeSearchKeyword}
        />

        <TableBox>
          <UsersTable
            primaryKey="id"
            data={props.userOptions}
            columns={getColumns(
              props.users,
              props.addRemoveUser,
              props.addRemoveAllUsers,
              props.isSortByOpen,
              props.changeIsSortByOpen,
              props.setWrapperRef,
              props.changeSortBy,
              props.selectedSortBy,
            )}
          />
          <Pagination
            pageCount={props.totalPages}
            changePage={props.changePage}
          />
        </TableBox>

        <Tooltip
          trigger="mouseenter"
          position="bottom-start"
          disabled={!disableSubmit}
          html={<SimpleToolTip title="All the fields are required" />}
        >
          <SubmitButton type="submit" disabled={disableSubmit}>
            create team
          </SubmitButton>
        </Tooltip>
      </CreateTeamForm>
    </ModuleFragment>
  );
};

CreateTeam.propTypes = propTypes;
CreateTeam.defaultProps = defaultProps;

export default CreateTeam;
