/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Text } from 'grommet/components/Text';
/* components */
import {
  CreateTeamForm,
  Message,
  SubmitButton,
  TableBox,
  TextField,
  UsersTable
} from 'app/modules/UserManagement/CreateTeam/CreateTeamModule.styles';

import ProgressIcon from 'app/components/ProgressIcon/ProgressIcon';
import Pagination from 'app/components/Pagination/Pagination';
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
import InputField from 'app/components/InputField/InputField';
import SimpleToolTip from 'app/components/ToolTips/SimpleToolTip/SimpleToolTip';
import IconSearch from 'app/assets/icons/IconSearch';
import getColumns from 'app/modules/UserManagement/CreateTeam/comps/TableColumns';
import theme from 'app/theme/Theme';

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
      id: PropTypes.string
    })
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
  pageTitle: PropTypes.string,
  buttonTxt: PropTypes.string,
  successMessage: PropTypes.string,
  disableSubmit: PropTypes.bool,
  viewOnly: PropTypes.bool
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
  pageTitle: 'Create team',
  buttonTxt: 'create team',
  successMessage: 'Team created successfully',
  disableSubmit: undefined,
  viewOnly: false
};

const CreateTeam = props => {
  const disableSubmit =
    props.disableSubmit === undefined ? props.name === '' : props.disableSubmit;
  return (
    <ModuleFragment paddingTop="65px" title={props.pageTitle}>
      {props.loading && <ProgressIcon />}
      <CreateTeamForm onSubmit={props.submitForm}>
        {props.success && (
          <Message theme={{ color: 'green' }}>{props.successMessage}</Message>
        )}
        {!props.success && props.errorMessage && (
          <Message theme={{ color: theme.color.aidsFondsRed }}>
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
          disabled={props.viewOnly}
        />

        {!props.viewOnly && (
          <React.Fragment>
            <Text color={theme.color.zoomGreyFive} size="15px">
              Add team members
            </Text>
            <TextField
              placeholder={<IconSearch />}
              onChange={props.changeSearchKeyword}
            />
          </React.Fragment>
        )}

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
              props.viewOnly
            )}
          />
          <Pagination
            pageCount={props.totalPages}
            changePage={props.changePage}
          />
        </TableBox>

        {!props.viewOnly && (
          <Tooltip
            trigger="mouseenter"
            position="bottom-start"
            disabled={!disableSubmit}
            html={<SimpleToolTip title="All the fields are required" />}
          >
            <SubmitButton type="submit" disabled={disableSubmit}>
              {props.buttonTxt}
            </SubmitButton>
          </Tooltip>
        )}
      </CreateTeamForm>
    </ModuleFragment>
  );
};

CreateTeam.propTypes = propTypes;
CreateTeam.defaultProps = defaultProps;

export default CreateTeam;
