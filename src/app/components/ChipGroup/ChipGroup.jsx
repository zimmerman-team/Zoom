import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from 'components/Chip/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';

/*TODO: get rid of material-ui theming */
/*TODO: clean up and refactor this components*/
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

/*TODO: add proptypes*/
class ChipGroup extends React.Component {
  state = {
    chipData: [
      { key: 0, label: 'Primary test data set' },
      { key: 1, label: 'Aidsfonds' },
      { key: 2, label: 'Kenya' },
      { key: 3, label: 'Hiv prevelance' },
    ],
  };

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;

    return this.state.chipData.map(data => {
      let icon = null;

      if (data.label === 'React') {
        icon = <TagFacesIcon />;
      }

      return (
        <Chip
          key={data.key}
          icon={icon}
          label={data.label}
          onDelete={this.handleDelete(data)}
          className={classes.chip}
        />
      );
    });
  }
}

ChipGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipGroup);
