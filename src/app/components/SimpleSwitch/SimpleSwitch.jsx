/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';

import { withStyles } from '@material-ui/core/styles';

import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 100%;
  height: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const SwitchLabel = styled.span`
  font-size: 11px;
  font-family: ${theme.font.zoomFontFamTwo};
  color: #9b9b9b;
  min-width: 45px;
  overflow: hidden;
  &:last-child {
    // note: let's not make a habit out of tweaking the position of element with transforms
    transform: translateX(-13px);
  }
`;

const styles = props => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: 'white',
      '& + $iOSBar': {
        backgroundColor: theme.color.aidsFondsWhite
      }
    }
  },
  iOSChecked: {
    transform: 'translateX(19px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none'
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 34,
    height: 14,
    marginTop: -7,
    marginLeft: -15,
    border: 'none',

    backgroundColor: theme.color.aidsFondsWhite,
    opacity: 1
  },
  iOSIcon: {
    width: 14,
    height: 14
  }
});

const ZimSwitch = styled(props => <Switch disableRipple {...props} />)`
  && {
    transform: translateX(-10px);

    //outline: solid green;
    & [class*='MuiSwitch-root'] {
      outline: 1px solid yellowgreen;
    }

    &[class*='MuiSwitch-bar'] {
      background-color: red !important;
      opacity: 1;
    }

    & [class*='MuiSwitch-checked'] {
      //outline: 1px solid darkslategray;
    }

    & [class*='MuiButtonBase-root'] {
      //outline: 1px solid blue;
    }

    & [class*='MuiIconButton-label'] {
      //outline: 1px solid red;
    }

    & [class*='MuiSwitch-icon'] {
      //outline: 1px solid cyan;
      background-color: red;
      width: 14px;
      height: 14px;
      box-shadow: initial;
    }

    & [class*='MuiPrivateSwitchBase-input'] {
      outline: 1px solid yellow;
    }
  }
`;

const propTypes = {
  classes: PropTypes.object,
  onSwitch: PropTypes.func,
  defaultCheck: PropTypes.bool,
  option1: PropTypes.string,
  option2: PropTypes.string
};
const defaultProps = {
  option1: 'empty 1',
  defaultCheck: false,
  onSwitch: null,
  option2: 'empty 2'
};

class SimpleSwitch extends React.Component {
  state = {
    checked: this.props.defaultCheck
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.onSwitch && this.props.onSwitch(event.target.checked);
  };

  render() {
    const { classes } = this.props;
    return (
      <ComponentBase>
        <SwitchLabel>{this.props.option1}</SwitchLabel>
        <ZimSwitch
          classes={{
            switchBase: classes.iOSSwitchBase,
            bar: classes.iOSBar,
            icon: classes.iOSIcon,
            iconChecked: classes.iOSIconChecked,
            checked: classes.iOSChecked
          }}
          checked={this.state.checked}
          onChange={this.handleChange('checked')}
          value="checked"
        />
        <SwitchLabel>{this.props.option2}</SwitchLabel>
      </ComponentBase>
    );
  }
}

SimpleSwitch.propTypes = propTypes;
SimpleSwitch.defaultProps = defaultProps;

export default withStyles(styles)(SimpleSwitch);
