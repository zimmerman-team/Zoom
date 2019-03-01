/* base */
import React from 'react';
import PropTypes from 'prop-types';
// import shortid from 'shortid';

/* styles */
// import styles from './TabContent.module.scss';
/* mock */

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {
  children: PropTypes.node,
  path: PropTypes.string
};
const defaultProps = {
  children: undefined
};

const TabContent = props => <div>{props.children} </div>;

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default TabContent;
