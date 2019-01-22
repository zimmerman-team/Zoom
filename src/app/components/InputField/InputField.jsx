/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import { FormField, TextInput } from 'grommet';

const Label = styled.span`
  margin-left: -12px;
`;

const propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.shape({
    regexp: PropTypes.instanceOf(RegExp),
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  label: '',
  id: '',
  name: '',
  required: false,
  type: 'text',
  validate: {
    regexp: /^[a-z]/i,
  },
  value: '',
  onChange: null,
};

const InputField = props => {
  return (
    <FormField
      label={<Label>{props.label}</Label>}
      htmlFor={props.id}
      name={props.name}
      required={props.required}
      validate={props.validate}
    >
      <TextInput
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
      />
    </FormField>
  );
};

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;
