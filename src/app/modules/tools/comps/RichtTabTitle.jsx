/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ComponentBase = styled.div``;

const propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};
const defaultProps = {
  data: undefined,
};

const RichTabTitle = props => {
  return (
    <Box direction="row" align="center" gap="xsmall" margin="xsmall">
      {icon}
      <Text size="small">
        <strong>{label}</strong>
      </Text>
    </Box>
  );
};

RichtTabTitle.propTypes = propTypes;
RichtTabTitle.defaultProps = defaultProps;

export default RichtTabTitle;
