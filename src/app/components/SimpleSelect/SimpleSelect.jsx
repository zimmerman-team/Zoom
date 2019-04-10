/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import theme from 'theme/Theme';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div``;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    background: 'gray',
    height: 40
  },
  formControl: {
    margin: 0,
    minWidth: 135
  },
  selectEmpty: {
    margin: 0,
    background: 'gray'
  },
  select: {
    height: 40
  }
});

const propTypes = {
  classes: PropTypes.object
};
const defaultProps = {};

class SimpleSelect extends React.Component {
  state = {
    axis: '',
    name: 'hai',
    labelWidth: '135px'
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="axis-label-placeholder">
            X-axis
          </InputLabel>
          <Select
            value={this.state.axis}
            onChange={this.handleChange}
            input={<Input name="axis" id="axis-label-placeholder" />}
            displayEmpty
            name="axis"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select x-axis</em>
            </MenuItem>
            <MenuItem value={10}>Linear</MenuItem>
            <MenuItem value={20}>Logarithmic</MenuItem>
            <MenuItem value={30}>Misc</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

SimpleSelect.propTypes = propTypes;
SimpleSelect.defaultProps = defaultProps;

export default withStyles(styles)(SimpleSelect);
