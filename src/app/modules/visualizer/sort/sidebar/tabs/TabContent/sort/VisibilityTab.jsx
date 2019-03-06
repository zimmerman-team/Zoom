/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from 'theme/Theme';
import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles(materialTheme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: 'white',
      '& + $iOSBar': {
        backgroundColor: themes.color.switchGreen
      }
    } /*,
    transition: materialTheme.transitions.create('transform', {
      duration: materialTheme.transitions.duration.shortest,
      easing: materialTheme.transitions.easing.sharp
    })*/
  },
  iOSChecked: {
    transform: 'translateX(10px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none'
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 31,
    height: 21,
    marginTop: -10,
    marginLeft: -17,
    border: 'none',
    // borderColor: 'gray',
    backgroundColor: themes.color.zoomGreyNine,
    opacity: 1
    // transition: materialTheme.transitions.create(['background-color', 'border'])
  },
  iOSIcon: {
    width: 19,
    height: 19
  },
  iOSIconChecked: {
    // boxShadow: materialTheme.shadows[1]
  }
}));

const ZoomSwitch = styled(Switch)`
  && {
    span:nth-child(1) {
      span:nth-child(1) {
        span:nth-child(1) {
          background-color: white;
          width: 19px;
          height: 19px;
          margin-left: -2px;
          margin-top: 6px;
        }
      }
    }

    span:nth-child(2) {
      background-color: ${themes.color.switchGreen};
      height: 21px;
      width: 100px;
      opacity: 1;
      border: none;

      //border-radius: 50%;
      //margin-top: -10px;
      //margin-left: 10px;
      //border-radius: 25%;
    }
  }
`;

function VisibilityTab() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    public: true,
    team: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  /*todo: figure out why the custom styling is resetting to the default styling*/

  return (
    <BaseTab>
      <FormControl component="fieldset">
        <FormLabel component="legend">Chart shared settings</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.public}
                onChange={handleChange('public')}
                value="public"
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked
                }}
                disableRipple
              />
            }
            label="Publish to public Zoom library"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.team}
                onChange={handleChange('team')}
                value="team"
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked
                }}
                disableRipple
              />
            }
            label="Published with my team"
          />
        </FormGroup>
      </FormControl>
    </BaseTab>
  );
}

VisibilityTab.propTypes = propTypes;
VisibilityTab.defaultProps = defaultProps;

export default VisibilityTab;
