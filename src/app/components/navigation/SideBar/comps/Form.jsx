/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const Form = props => {
  return <FormField />;
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
