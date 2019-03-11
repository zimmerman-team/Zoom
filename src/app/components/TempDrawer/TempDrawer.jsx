/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* material ui */
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

/* project */

/** materual ui styling */
const useStyles = makeStyles({
  list: {
    width: 320
  }
});

/** styled comps styling */

const propTypes = {
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func
};
const defaultProps = {
  open: undefined
};

function TempDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: true
  });

  const toggleDrawer = (side, open) => () => {
    setState({ ...state, [side]: open });
  };

  const sideList = (
    <div className={classes.list}>
      <List>
        {[
          'Home',
          'Country Detail',
          'IATI Detail',
          'Datamapper',
          'NL Focus',
          'Visualizer',
          'About ZOOM'
        ].map(text => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('left', true)}>Open Left</Button>

      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          {sideList}
        </div>
      </Drawer>
    </React.Fragment>
  );
}

TempDrawer.propTypes = propTypes;
TempDrawer.defaultProps = defaultProps;

export default TempDrawer;
