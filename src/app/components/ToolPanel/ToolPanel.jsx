import React from 'react';
import PropTypes from 'prop-types';
import Paper from './common/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from './common/Tabs';
import Tab from './common/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import themes from 'theme/Theme';
import Typography from '@material-ui/core/Typography';
import IconFilter from 'assets/icons/toolpanel/IconFilter';
import IconContext from 'assets/icons/toolpanel/IconContext';
import IconPreview from 'assets/icons/toolpanel/IconPreview';
import IconDownload from 'assets/icons/toolpanel/IconDownload';
import IconDuplicate from 'assets/icons/toolpanel/IconDuplicate';
import IconVisibility from 'assets/icons/toolpanel/IconVisibility';

/*TODO: refactor styling*/

const styles = theme => ({
  tabRoot: {
    backgroundColor: themes.color.aidsFondsRed,
    borderRight: '1px solid #e8e8e8',
    opacity: 1,
    '&:hover': {
      backgroundColor: themes.color.aidsFondsBlue,
      opacity: 1,
    },
  },
  tabSelected: {
    backgroundColor: themes.color.aidsFondsBlue,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class ToolPanel extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
          }}
        >
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<IconFilter />}
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<IconContext />}
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<IconPreview />}
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<IconDownload />}
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<IconDuplicate />}
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<IconVisibility />}
          />
        </Tabs>

        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
      </React.Fragment>
    );
  }
}

ToolPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolPanel);
