/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* components */
import {
  EditUserForm,
  Message,
  Container,
  DropDownContainer,
  DropDownLabel
} from 'app/modules/UserManagement/EditUser/EditUserModule.styles';

import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
import InputField from 'app/components/InputField/InputField';
import SimpleToolTip from 'app/components/ToolTips/SimpleToolTip/SimpleToolTip';
import { Tooltip } from 'react-tippy';
// import userManagementMockData from 'app/__mocks__/userManagementMock';
import theme from 'app/theme/Theme';
// import ZoomSelect from 'app/components/Select/ZoomSelect';
import ZoomButton from 'app/components/ZoomButton/ZoomButton';
import ZoomSelect from 'app/components/Select/ZoomSelect';

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
  changeUserRole: PropTypes.func,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  isAdmin: PropTypes.bool,
  roleSelected: PropTypes.string,
  viewOnly: PropTypes.bool
};
const defaultProps = {
  email: '',
  success: false,
  secondaryInfoMessage: null,
  changeUserRole: null,
  roleOptions: [],
  errorMessage: null,
  lastName: '',
  firstName: '',
  changeEmail: null,
  changeLastName: null,
  changeFirstName: null,
  roleSelected: '',
  submitForm: null,
  isAdmin: false,
  viewOnly: false
};

const EditUserModule = props => {
  const disableSubmit =
    props.firstName === '' ||
    props.lastName === '' ||
    props.email === '' ||
    !props.dataIsChanged;

  const tooltipText = props.dataIsChanged
    ? 'All the fields are required.'
    : 'No changed detected.';

  return (
    <ModuleFragment
      paddingTop="65px"
      title={props.viewOnly ? 'View user' : 'Edit user'}
    >
      <EditUserForm onSubmit={props.submitForm}>
        {/* first name field */}
        <InputField
          label="First name"
          id="firstName-input"
          name="firstName"
          required
          validate={{ regexp: /^[a-z]/i }}
          value={props.firstName}
          onChange={props.changeFirstName}
          disabled={props.viewOnly}
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
          disabled={props.viewOnly}
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
          disabled={props.viewOnly}
        />

        {props.isAdmin && (
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
                valueSelected={props.roleSelected}
              />
            </DropDownContainer>
          </Container>
        )}

        {!props.viewOnly && (
          <Tooltip
            trigger="mouseenter"
            position="bottom-start"
            disabled={!disableSubmit}
            html={<SimpleToolTip title={tooltipText} />}
          >
            <ZoomButton
              type="submit"
              disabled={disableSubmit}
              fontSize={14}
              width={160}
            >
              Submit
            </ZoomButton>
          </Tooltip>
        )}

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
            User edited and saved successfully.
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
      </EditUserForm>
    </ModuleFragment>
  );
};

EditUserModule.propTypes = propTypes;
EditUserModule.defaultProps = defaultProps;

export default EditUserModule;
