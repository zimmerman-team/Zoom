/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {};
const defaultProps = {};

const VisibilityTab = props => {
  return <BaseTab>visibility</BaseTab>;
};

VisibilityTab.propTypes = propTypes;
VisibilityTab.defaultProps = defaultProps;

export default VisibilityTab;
