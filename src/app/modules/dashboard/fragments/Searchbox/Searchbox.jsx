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
    flexWrap: 'wrap',
    height: '50px'
  }
});

const StyledTextField = styled(TextField)`
  && {
    padding: 0;
    width: 100%;
    margin-bottom: 0;

    fieldset {
      border-radius: 0;
      /*todo: find way to set padding without using !important*/
      padding: 0 !important;
    }

    input {
      padding: 15px;
      padding-left: 0;
    }
  }
`;

class OutlinedInputAdornments extends React.Component {
  onEnterPressed(e) {
    if (e.keyCode === 13 && this.props.onEnterPressed)
      this.props.onEnterPressed();
  }

  render() {
    return (
      <StyledTextField
        classes={{
          root: this.props.classes.root,
          input: this.props.classes.input,
          /*todo: find out how to reset height of input adornment*/
          MuiInputAdornment: this.props.classes.MuiInputAdornment
        }}
        onKeyDown={this.onEnterPressed.bind(this)}
        variant="outlined"
        type="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIconSearch />
            </InputAdornment>
          )
        }}
        onChange={this.props.inputChange}
      />
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
  inputChange: PropTypes.func
};

export default withStyles(styles)(OutlinedInputAdornments);
