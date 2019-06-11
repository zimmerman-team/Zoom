/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.aidsFondsWhite};
  padding: 70px 26% 80px 26%;
`;

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const ModuleContainer = props => {
  return (
    <ComponentBase>
      <Helmet>
        <title>Zoom - {props.title}</title>
      </Helmet>
      {props.children}
    </ComponentBase>
  );
};

ModuleContainer.propTypes = propTypes;

export default ModuleContainer;
