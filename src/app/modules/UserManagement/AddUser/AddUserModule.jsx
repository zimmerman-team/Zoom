/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import {
  AddUserForm,
  DropDownsBox,
  DropDown,
  DropDownLabel,
  SubmitButton,
  Message,
} from 'modules/UserManagement/AddUser/AddUserModule.styles';
import { aidsFondsRed } from 'components/theme/ThemeSheet';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';
import FormSelect from 'components/FormSelect/FormSelect';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';
import userManagementMockData from '__mocks__/userManagementMock';

const propTypes = {
  email: PropTypes.string,
  success: PropTypes.bool,
  errorMessage: PropTypes.string,
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
  success: false,
  errorMessage: null,
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
  const disableSubmit =
    props.firstName === '' || props.lastName === '' || props.email === '';
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

        {/* Tooltip will be removed once we implement functionality of this */}
        <Tooltip
          trigger="mouseenter"
          position="top-start"
          html={<SimpleToolTip title="Functionality not implemented yet" />}
        >
          <DropDownsBox direction="row-responsive">
            <DropDown>
              <DropDownLabel>User role</DropDownLabel>
              <FormSelect
                data={props.roleOptions}
                placeHolder=""
                selectVal={props.changeUserRole}
                valueSelected={props.roleSelected.label}
              />
            </DropDown>
            <DropDown>
              <DropDownLabel>Organisation</DropDownLabel>
              <FormSelect
                data={props.orgOptions}
                placeHolder=""
                selectVal={props.changeOrganisation}
                valueSelected={props.orgSelected.label}
              />
            </DropDown>
          </DropDownsBox>
        </Tooltip>

        <Tooltip
          trigger="mouseenter"
          position="bottom-start"
          disabled={!disableSubmit}
          html={<SimpleToolTip title="All the fields are required" />}
        >
          <SubmitButton type="submit" disabled={disableSubmit}>
            send invitation
          </SubmitButton>
        </Tooltip>

        {props.success && (
          <Message theme={{ color: 'green' }}>
            User created and invitation sent successfully.
          </Message>
        )}
        {!props.success && props.errorMessage && (
          <Message theme={{ color: aidsFondsRed }}>
            {props.errorMessage}
          </Message>
        )}
      </AddUserForm>
    </ModuleFragment>
  );
};

AddUserModule.propTypes = propTypes;
AddUserModule.defaultProps = defaultProps;

export default AddUserModule;
