/* base */
import React from 'react';

import ButtonContainer from './ButtonContainer';
import { Textfield, ComponentBase } from './EditProfileForm.styles';

const EditProfileForm = () => {
  // [value, setValue() = initial value]
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [twitter, setTwitter] = React.useState('');
  const [role, setRole] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatedPassword, setRepeatedPassword] = React.useState('');
  const values = [
    firstName,
    lastName,
    email,
    twitter,
    role,
    password,
    repeatedPassword
  ];
  const [isDisabled, setIsDisabled] = React.useState(true);

  // Determines whether button should be disabled
  function handleChange() {
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== '') {
        setIsDisabled(false);
        break;
      } else {
        setIsDisabled(true);
      }
    }
  }

  //Component did mount, run again after values have changed
  React.useEffect(() => {
    handleChange();
  }, [values]);

  return (
    <ComponentBase>
      <Textfield
        label="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        autofocus
      />
      <Textfield
        label="Last name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <Textfield
        label="E-mail"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Textfield
        label="Twitter"
        value={twitter}
        onChange={e => setTwitter(e.target.value)}
      />
      <Textfield
        label="Role"
        value={role}
        onChange={e => setRole(e.target.value)}
      />
      <Textfield
        label="Change password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Textfield
        label="Repeat password"
        type="password"
        value={repeatedPassword}
        onChange={e => setRepeatedPassword(e.target.value)}
      />
      <ButtonContainer disableSave={isDisabled} />
    </ComponentBase>
  );
};
export default EditProfileForm;
