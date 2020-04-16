/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';
import themes from 'app/theme/Theme';
import IconPointer from 'app/assets/icons/IconPointer';

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
  defValue: PropTypes.any,
  selectKey: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.array
};
const defaultProps = {
  label: 'empty axis',
  optionPlaceHolder: 'empty',
  defValue: undefined,
  disabled: false,
  selectKey: 'simpleSelect',
  onChange: null,
  options: [
    {
      label: 'Option 1',
      value: 1
    },
    {
      label: 'Option 2',
      value: 2
    },
    {
      label: 'Option 3',
      value: 3
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

// note because of some nonsenses happening in material ui MenuItem component
// we get warnings about some refs when this menu item is wrapped the same way as others are
// so currently its wrapped in a simpler way and doesn't produce the warning
const ZimMenuItem = styled(MenuItem)`
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
    axis: this.props.defValue || this.props.options[0].value,
    name: 'hai',
    labelWidth: '135px'
  };

  handleChange = event => {
    this.props.onChange &&
      this.props.onChange(event.target.value, this.props.selectKey);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <FormControl
          disabled={this.props.disabled}
          style={
            this.props.disabled ? { pointerEvents: 'none', opacity: '0.4' } : {}
          }
        >
          <ZimLabel>{this.props.label}</ZimLabel>
          <ZimSelect
            value={this.state.axis}
            onChange={this.handleChange}
            input={<Input name="axis" id="axis-label-placeholder" />}
            displayEmpty
            name="axis"
            IconComponent={IconPointer}
          >
            {this.props.options.map(option => (
              <ZimMenuItem value={option.value} key={option.value}>
                {option.label}
              </ZimMenuItem>
            ))}
          </ZimSelect>
        </FormControl>
      </React.Fragment>
    );
  }
}

SimpleSelect.propTypes = propTypes;
SimpleSelect.defaultProps = defaultProps;

export default SimpleSelect;
