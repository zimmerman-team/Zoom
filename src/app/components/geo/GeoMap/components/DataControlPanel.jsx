/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel';
import Select from '@material-ui/core/es/Select/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const ComponentBase = styled.div`
  width: 200px;
`;

const propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  settings: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

class DataControlPanel extends React.Component {
  render() {
    const { classes, selectedInd, indicators, label } = this.props;
    return (
      <ComponentBase>
        <Paper>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="indicator-id">{label}</InputLabel>
              <Select
                value={selectedInd.value}
                onChange={evt => this.props.onChange(evt.target.value)}
                inputProps={{
                  name: 'indicator',
                  id: 'indicator-id',
                }}
              >
                {indicators.map(indicator => (
                  <MenuItem value={indicator.id}>{indicator.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </Paper>
      </ComponentBase>
    );
  }
}

DataControlPanel.propTypes = propTypes;
DataControlPanel.defaultProps = defaultProps;

export default withStyles(styles)(DataControlPanel);
