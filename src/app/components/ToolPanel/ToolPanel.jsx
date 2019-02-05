import React from 'react';
import PropTypes from 'prop-types';
import Paper from './common/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from './common/Tabs';
import Tab from './common/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import IconFilter from 'assets/icons/toolpanel/IconFilter';
import IconContext from 'assets/icons/toolpanel/IconContext';
import IconPreview from 'assets/icons/toolpanel/IconPreview';
import IconDownload from 'assets/icons/toolpanel/IconDownload';
import IconDuplicate from 'assets/icons/toolpanel/IconDuplicate';
import IconVisibility from 'assets/icons/toolpanel/IconVisibility';
// import IconFilter from 'assets/icons/toolpanel/IconFilter'

class ToolPanel extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          // variant="fullWidth"
          // indicatorColor="primary"
          // textColor="primary"
        >
          <Tab icon={<IconFilter />} />
          <Tab icon={<IconContext />} />
          <Tab icon={<IconPreview />} />
          <Tab icon={<IconDownload />} />
          <Tab icon={<IconDuplicate />} />
          <Tab icon={<IconVisibility />} />
        </Tabs>
      </Paper>
    );
  }
}

ToolPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ToolPanel;
