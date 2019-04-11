/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* components */
import { FormField, TextInput } from 'grommet';

const Label = styled.span`
  margin-left: -12px;
`;

const ZoomFormField = styled(FormField)`
  && {
    span {
      font-size: 14px;
      font-weight: 500;
      font-family: ${theme.font.zoomFontFamOne};
    }
  }
`;

const ZoomTextInput = styled(TextInput)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  color: ${theme.color.aidsFondsBlue};
  padding: 0;
  padding-bottom: 6px;
`;
const propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.shape({
    regexp: PropTypes.instanceOf(RegExp)
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

const defaultProps = {
  label: '',
  id: '',
  name: '',
  required: false,
  type: 'text',
  validate: {
    regexp: /^[a-z]/i
  },
  value: '',
  onChange: null,
  disabled: false
};

const InputField = props => {
  return (
    <ZoomFormField
      label={<Label>{props.label}</Label>}
      htmlFor={props.id}
      name={props.name}
      required={props.required}
      validate={props.validate}
    >
      <ZoomTextInput
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        disabled={props.disabled}
      />
    </ZoomFormField>
  );
};

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;
