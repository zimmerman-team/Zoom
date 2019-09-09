/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';

const propTypes = {
  type: PropTypes.string,
  loggedIn: PropTypes.bool
};

const SidebarNavListItem = styled(props => {
  const show =
    (props.type === 'private' && props.loggedIn) || props.type === 'public';
  const { loggedIn, ...otherProps } = props;
  return show && <ListItem button disableRipple {...otherProps} />;
})`
  && {
    display: flex;
    padding-top: 6px;
    padding-bottom: 6px;
    line-height: 1;
  }
`;

SidebarNavListItem.propTypes = propTypes;

export default SidebarNavListItem;
