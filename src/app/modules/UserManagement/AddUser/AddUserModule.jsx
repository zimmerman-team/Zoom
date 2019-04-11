/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* components */
import {
  AddUserForm,
  DropDownContainer,
  DropDownLabel,
  Message,
  SubmitButton,
  Container
} from 'modules/UserManagement/AddUser/AddUserModule.styles';

import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';
import SimpleToolTip from 'components/ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';

import userManagementMockData from '__mocks__/userManagementMock';
import { Box } from 'grommet';
import theme from 'theme/Theme';
import ZoomSelect from 'components/Select/ZoomSelect';
import ZoomButton from 'components/ZoomButton/ZoomButton';

const propTypes = {
  email: PropTypes.string,
  success: PropTypes.bool,
  secondaryInfoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  changeEmail: PropTypes.func,
  changeLastName: PropTypes.func,
  changeFirstName: PropTypes.func,
  submitForm: PropTypes.func,
  roleSelected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  orgSelected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  changeUserRole: PropTypes.func,
  changeOrganisation: PropTypes.func,
  orgOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};
const defaultProps = {
  email: '',
  success: false,
  secondaryInfoMessage: null,
  errorMessage: null,
  lastName: '',
  firstName: '',
  changeEmail: null,
  changeLastName: null,
  changeFirstName: null,
  submitForm: null,
  roleSelected: { label: '', value: '', _id: '' },
  changeUserRole: null,
  orgSelected: { label: '', value: '', _id: '' },
  changeOrganisation: null,
  roleOptions: userManagementMockData.roleOptions,
  orgOptions: userManagementMockData.orgOptions
};

const AddUserModule = props => {
  const disableSubmit =
    props.firstName === '' ||
    props.lastName === '' ||
    props.email === '' ||
    props.orgSelected._id === '' ||
    props.roleSelected._id === '';

  return (
    <ModuleFragment title="Add user">
      <AddUserForm onSubmit={props.submitForm}>
        {/* first name field */}
        <InputField
          label="First name"
          id="firstName-input"
          name="firstName"
          required
          validate={{ regexp: /^[a-z]/i }}
          value={props.firstName}
          onChange={props.changeFirstName}
        />

        {/* last name field */}
        <InputField
          label="Last name"
          id="lastName-input"
          name="lastName"
          required
          validate={{ regexp: /^[a-z]/i }}
          value={props.lastName}
          onChange={props.changeLastName}
        />

        {/* email field */}
        <InputField
          label="Email"
          id="email-input"
          name="email"
          required
          type="email"
          value={props.email}
          onChange={props.changeEmail}
        />

        <Container>
          {/* user role dropdown */}
          <DropDownContainer>
            <DropDownLabel>User role</DropDownLabel>
            <ZoomSelect
              border
              search={false}
              dropDownWidth={280}
              placeHolderText="Select user role"
              data={props.roleOptions}
              selectVal={props.changeUserRole}
              valueSelected={props.roleSelected.label}
            />
          </DropDownContainer>

          {/* organisation dropdown */}
          <DropDownContainer>
            <DropDownLabel>Select organisation</DropDownLabel>
            <ZoomSelect
              border
              search={false}
              dropDownWidth={280}
              placeHolderText="Select organisation"
              data={props.orgOptions}
              selectVal={props.changeOrganisation}
              valueSelected={props.orgSelected.label}
            />
          </DropDownContainer>
        </Container>

        <Tooltip
          trigger="mouseenter"
          position="bottom-start"
          disabled={!disableSubmit}
          html={<SimpleToolTip title="All the fields are required" />}
        >
          <ZoomButton
            type="submit"
            disabled={disableSubmit}
            fontSize={14}
            width={160}
          >
            send invitation
          </ZoomButton>
        </Tooltip>

        {/* todo: replace grommet based button with material ui based button */}
        {/* <React.Fragment>
          <ErrorBoundary>
            <Tooltip>
              <ZimmermanButton width={180}>send invitation</ZimmermanButton>
            </Tooltip>
          </ErrorBoundary>
        </React.Fragment> */}

        {props.success && (
          <Message theme={{ color: 'green' }}>
            User created and invitation sent successfully.
          </Message>
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
      </AddUserForm>
    </ModuleFragment>
  );
};

AddUserModule.propTypes = propTypes;
AddUserModule.defaultProps = defaultProps;

export default AddUserModule;
