/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const MaterialStyle = () => ({
  root: {
    backgroundColor: theme.color.aidsFondsRed,
    // borderRight: '1px solid #e8e8e8',
    opacity: 1,
    '&:hover': {
      backgroundColor: theme.color.aidsFondsBlue,
      opacity: 1
    }
  },
  selected: {
    backgroundColor: theme.color.aidsFondsBlue
  }
});

const Component = styled(Tab)`
  && {
    padding: 0;
    margin: 0;
    width: 55px;
    height: 40px;
    min-width: initial;
    max-width: initial;
    border-right: 1px solid white;
  }
`;

const propTypes = {
  to: PropTypes.string
};
const defaultProps = {};

const Container = props => {
  return (
    <NoSsr>
      <NavLink to={props.to}>
        <Component
          disableRipple
          classes={{
            root: MaterialStyle.root,
            selected: MaterialStyle.selected
          }}
          {...props}
        />
      </NavLink>
    </NoSsr>
  );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default withStyles(MaterialStyle)(Container);
