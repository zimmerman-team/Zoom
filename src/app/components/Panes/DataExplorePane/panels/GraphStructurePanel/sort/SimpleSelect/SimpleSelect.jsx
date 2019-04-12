/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '@material-ui/core/Select/index';
import theme from 'theme/Theme';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles/index';
import Input from '@material-ui/core/Input/index';
import OutlinedInput from '@material-ui/core/OutlinedInput/index';
import FilledInput from '@material-ui/core/FilledInput/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormHelperText from '@material-ui/core/FormHelperText/index';
import FormControl from '@material-ui/core/FormControl/index';
import themes from 'theme/Theme';
import IconPointer from 'assets/icons/IconPointer';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  //margin-left: 10px;
  //margin-right: 10px;
`;

const propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  optionPlaceHolder: PropTypes.string,
  options: PropTypes.array
};
const defaultProps = {
  label: 'empty axis',
  optionPlaceHolder: 'empty',
  options: [
    {
      name: 'Option 1',
      value: 1
    },
    {
      name: 'Option 2',
      value: 1
    },
    {
      name: 'Option 3',
      value: 1
    }
  ]
};

const ZimFormControl = styled(props => <FormControl {...props} />)`
  && {
    
`;

const ZimSelect = styled(props => <Select {...props} />)`
  && {
    margin: 0 !important;
    background-color: white;

    & [class*='MuiSelect-root'] {
      font-family: ${themes.font.zoomFontFamTwo};
      font-size: 14px;
      display: flex;
      padding: 0;
    align-items: center;
      color: red;
      width: 135px;
    }

    & [class*='MuiSelect-select'] {
    font-family: ${themes.font.zoomFontFamOne};
      order: 2;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0;
      width: 110px;
      background: white;

      &:focus {
        background-color: white !important;
      }
    }

  & [class*='MuiSelect-icon'] {
    position: relative;
    order: 1;
  }

  &:before {
    display: none;
  }
  &:after {
    display: none;
  }
`;

const ZimMenuItem = styled(props => <MenuItem {...props} />)`
  && {
    font-family: ${themes.font.zoomFontFamTwo};
    font-size: 14px;
    padding: 0;
    height: 40px;
    background-color: white;
    padding-left: 20px;

    & [class*='MuiMenuItem-root'] {
      width: 135px;
      height: 40px;
      background-color: white;
    }
    & [class*='MuiMenuItem-selected'] {
      color: red;
    }
  }
`;

const ZimLabel = styled(props => (
  <InputLabel htmlFor="axis-label-placeholder" {...props} />
))`
  && {
    font-family: ${themes.font.zoomFontFamTwo};
    font-size: 11px;
    position: relative;
    height: initial;
    margin-bottom: 5px;
    line-height: 1;
    display: flex;
    top: initial;
    left: initial;
    transform: initial;
  }
`;

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
        <FormControl>
          <ZimLabel>{this.props.label}</ZimLabel>
          <ZimSelect
            value={this.state.axis}
            onChange={this.handleChange}
            input={<Input name="axis" id="axis-label-placeholder" />}
            displayEmpty
            name="axis"
            IconComponent={IconPointer}
          >
            <ZimMenuItem value="">Select x-axis</ZimMenuItem>
            <ZimMenuItem value={10}>Linear</ZimMenuItem>
            <ZimMenuItem value={20}>None</ZimMenuItem>
          </ZimSelect>
        </FormControl>
      </React.Fragment>
    );
  }
}

SimpleSelect.propTypes = propTypes;
SimpleSelect.defaultProps = defaultProps;

export default SimpleSelect;