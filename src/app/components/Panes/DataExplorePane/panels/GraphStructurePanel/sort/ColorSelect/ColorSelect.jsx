/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '@material-ui/core/Select/index';

import Input from '@material-ui/core/Input/index';

import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';

import FormControl from '@material-ui/core/FormControl/index';
import themes from 'theme/Theme';
import IconPointer from 'assets/icons/IconPointer';
/* utils */
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
/* consts */
import { colorSet as colorSetz } from '__consts__/PaneConst';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  defValue: PropTypes.arrayOf(PropTypes.string),
  optionPlaceHolder: PropTypes.string,
  selectKey: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
};
const defaultProps = {
  label: 'empty axis',
  optionPlaceHolder: 'empty',
  defValue: colorSetz[0].colors,
  selectKey: 'colorSelect',
  onChange: null,
  options: [
    {
      name: 'Option 1',
      value: []
    },
    {
      name: 'Option 2',
      value: []
    },
    {
      name: 'Option 3',
      value: []
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
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0;
      width: 110px;
      background: white;
order: 2;
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

const PaletFragment = styled.div`
  width: 17px;
  height: 17px;
  background-color: ${props => props.colors};
`;

const PaletContainer = styled.div`
  display: flex;
`;

const ZimLabel = styled(props => (
  <InputLabel htmlFor="colorSet-label-placeholder" {...props} />
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

class ColorSelect extends React.Component {
  state = {
    colorSet: find(colorSetz, set => {
      return isEqual(set.colors, this.props.defValue);
    }).index,
    name: 'hai'
  };

  handleChange = event => {
    if (this.props.onChange) {
      const colors = find(colorSetz, ['index', event.target.value]).colors;

      this.props.onChange(colors, this.props.selectKey);
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <FormControl>
          <ZimLabel>{this.props.label}</ZimLabel>
          <ZimSelect
            value={this.state.colorSet}
            onChange={this.handleChange}
            input={<Input name="colorSet" id="colorSet-label-placeholder" />}
            displayEmpty
            name="colorSet"
            IconComponent={IconPointer}
          >
            {colorSetz.map(set => (
              <ZimMenuItem key={set.index} value={set.index}>
                {set.colors.map(color => (
                  <PaletFragment key={color} colors={color} />
                ))}
              </ZimMenuItem>
            ))}
          </ZimSelect>
        </FormControl>
      </React.Fragment>
    );
  }
}

ColorSelect.propTypes = propTypes;
ColorSelect.defaultProps = defaultProps;

export default ColorSelect;
