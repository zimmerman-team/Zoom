/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import {
  AddUserForm,
  DropDown,
  DropDownLabel,
  SubmitButton,
} from 'modules/UserManagement/AddUser/AddUserModule.styles';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';
import ZoomSelect from 'components/Select/ZoomSelect';
import { Box } from 'grommet';
import userManagementMockData from '__mocks__/userManagementMock';

const propTypes = {
  email: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  changeEmail: PropTypes.func,
  changeLastName: PropTypes.func,
  changeFirstName: PropTypes.func,
  submitForm: PropTypes.func,
  roleSelected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  orgSelected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  changeUserRole: PropTypes.func,
  changeOrganisation: PropTypes.func,
  orgOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};
const defaultProps = {
  email: '',
  lastName: '',
  firstName: '',
  changeEmail: null,
  changeLastName: null,
  changeFirstName: null,
  submitForm: null,
  roleSelected: { label: '', value: '' },
  changeUserRole: null,
  orgSelected: { label: '', value: '' },
  changeOrganisation: null,
  roleOptions: userManagementMockData.roleOptions,
  orgOptions: userManagementMockData.orgOptions,
};

const AddUserModule = props => {
  return (
    <ModuleFragment title="Add user">
      <AddUserForm onSubmit={props.submitForm}>
        <InputField
          label="First name"
          id="firstName-input"
          name="firstName"
          required
          validate={{ regexp: /^[a-z]/i }}
          value={props.firstName}
          onChange={props.changeFirstName}
        />

        <InputField
          label="Last name"
          id="lastName-input"
          name="lastName"
          required
          validate={{ regexp: /^[a-z]/i }}
          value={props.lastName}
          onChange={props.changeLastName}
        />

        <InputField
          label="Email"
          id="email-input"
          name="email"
          required
          type="email"
          value={props.email}
          onChange={props.changeEmail}
        />

        <Box direction="row-responsive">
          <DropDown>
            <DropDownLabel>User role</DropDownLabel>
            <ZoomSelect
              data={props.roleOptions}
              placeHolder=""
              selectVal={props.changeUserRole}
              valueSelected={props.roleSelected.label}
            />
          </DropDown>
          <DropDown>
            <DropDownLabel>Organisation</DropDownLabel>
            <ZoomSelect
              data={props.orgOptions}
              placeHolder=""
              selectVal={props.changeOrganisation}
              valueSelected={props.orgSelected.label}
            />
          </DropDown>
        </Box>

        <SubmitButton type="submit">send invitation</SubmitButton>
      </AddUserForm>
    </ModuleFragment>
  );
};

AddUserModule.propTypes = propTypes;
AddUserModule.defaultProps = defaultProps;

export default AddUserModule;
