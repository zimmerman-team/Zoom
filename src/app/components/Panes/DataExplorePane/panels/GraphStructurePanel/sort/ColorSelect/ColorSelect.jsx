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

const Palet1 = styled.div`
  height: 17px;
  width: 85px;
  background-color: blue;
`;
const Palet2 = styled.div`
  height: 17px;
  width: 85px;
  background-color: #ff0000;
`;
const Palet3 = styled.div`
  height: 17px;
  width: 85px;
  background-color: #008000;
`;

const PaletFragment = styled.div`
  width: 17px;
  height: 17px;
  background-color: ${props => props.colors};
`;

const colorSet1 = ['#57c5f7', '#518ec8', '#366d8f', '#214457', '#151d2b'];
const colorSet2 = ['#ff0000', '#c00000', '#820000', '#640000', '#340000'];
const colorSet3 = ['#00ee00', '#00c200', '#00c800', '#00ac00', '#008000'];

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
    colorSet: '',
    name: 'hai'
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
            value={this.state.colorSet}
            onChange={this.handleChange}
            input={<Input name="colorSet" id="colorSet-label-placeholder" />}
            displayEmpty
            name="colorSet"
            IconComponent={IconPointer}
          >
            <ZimMenuItem value="">Select palet</ZimMenuItem>
            <ZimMenuItem value={1}>
              {colorSet2.map(color => (
                <PaletFragment key={color} colors={color} />
              ))}
            </ZimMenuItem>
            <ZimMenuItem value={2}>
              <PaletContainer>
                {colorSet1.map(color => (
                  <PaletFragment key={color} colors={color} />
                ))}
              </PaletContainer>
            </ZimMenuItem>
            <ZimMenuItem value={3}>
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
