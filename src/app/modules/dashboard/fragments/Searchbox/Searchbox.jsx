import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import SvgIconSearch from '../../../../assets/icons/IconSearch';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
    // outline: '2px solid blue',
  },

  fullWidth: {
    outline: '2px solid red',
    padding: 0
  },

  MuiOutlinedInput: {
    outline: '6px solid yellow'
  }
});

const StyledTextField = styled(TextField)`
  && {
    padding: 0;
  }
`;

class OutlinedInputAdornments extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <StyledTextField
        id="outlined-adornment-password"
        // className={classNames(classes.root, classes.OutlinedInput)}
        classes={{
          root: classes.root,
          fullWidth: classes.fullWidth,
          MuiOutlinedInput: classes.MuiOutlinedInput
        }}
        variant="outlined"
        type="search"
        placeholder="Search"
        fullWidth={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIconSearch />
            </InputAdornment>
          )
        }}
      />
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedInputAdornments);
