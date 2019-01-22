/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Grommet, FormField, TextInput } from 'grommet';
import { ZoomTheme } from 'styles/ZoomTheme';

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
    <Grommet theme={ZoomTheme}>
      <FormField
        label={props.label}
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
    </Grommet>
  );
};

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;
