/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import {
  ModuleContainer,
  AddUserForm,
} from 'modules/UserManagement/AddUser/AddUserModule.styles';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';

const propTypes = {
  email: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  changeEmail: PropTypes.func,
  changeLastName: PropTypes.func,
  changeFirstName: PropTypes.func,
};
const defaultProps = {
  email: '',
  lastName: '',
  firstName: '',
  changeEmail: null,
  changeLastName: null,
  changeFirstName: null,
};

const AddUserModule = props => {
  return (
    <ModuleContainer>
      <ModuleFragment title="Add user">
        <AddUserForm>
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
        </AddUserForm>
      </ModuleFragment>
    </ModuleContainer>
  );
};

AddUserModule.propTypes = propTypes;
AddUserModule.defaultProps = defaultProps;

export default AddUserModule;
