import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Box } from 'grommet';
import NoSsr from '@material-ui/core/NoSsr';
import {
  zoomFontFamTwo,
  aidsFondsBlue,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';
import styled from 'styled-components';

const ZimmermanChip = styled(Chip)`
  && {
    background-color: ${aidsFondsBlue};
    border-radius: 5px;
    span {
      line-height: 1;
      color: ${aidsFondsWhite};
      font-family: ${zoomFontFamTwo};
      margin-right: 10px;
    }

    svg {
      fill: white;
      fill-opacity: 0.7;
    }
  }
`;

const styles = theme => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
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
        <ZimmermanChip
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

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
