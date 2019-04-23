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

/* utils */
import isEqual from 'lodash/isEqual';

/* consts */
import { colorSet1, colorSet2, colorSet3 } from '__consts__/PaneConst';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  defValue: PropTypes.array,
  optionPlaceHolder: PropTypes.string,
  selectKey: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
};
const defaultProps = {
  label: 'empty axis',
  optionPlaceHolder: 'empty',
  defValue: colorSet1,
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
    colorSet: this.props.defValue,
    name: 'hai'
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
            <ZimMenuItem value={colorSet2}>
              {colorSet2.map(color => (
                <PaletFragment key={color} colors={color} />
              ))}
            </ZimMenuItem>
            <ZimMenuItem value={colorSet1}>
              <PaletContainer>
                {colorSet1.map(color => (
                  <PaletFragment key={color} colors={color} />
                ))}
              </PaletContainer>
            </ZimMenuItem>
            <ZimMenuItem value={colorSet3}>
              {colorSet3.map(color => (
                <PaletFragment key={color} colors={color} />
              ))}
            </ZimMenuItem>
          </ZimSelect>
        </FormControl>
      </React.Fragment>
    );
  }
}

ColorSelect.propTypes = propTypes;
ColorSelect.defaultProps = defaultProps;

export default ColorSelect;
