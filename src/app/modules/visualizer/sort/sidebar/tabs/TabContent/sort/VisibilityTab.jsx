/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from 'app/theme/Theme';
import BaseTab from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import get from 'lodash/get';
import pull from 'lodash/pull';
import find from 'lodash/find';
/* actions */
import * as actions from 'app/services/actions/general';
import ZoomSelect from 'app/components/Select/ZoomSelect';

/** Button component description */

const propTypes = {
  /** Button component description */
  publicVisibility: PropTypes.bool,

  /** Button component description */
  teamVisibility: PropTypes.bool
};
const defaultProps = {};

const useStyles = makeStyles(() => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: 'white',
      '& + $iOSBar': {
        backgroundColor: themes.color.switchGreen
      }
    }
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

const Box = styled.div`
  padding: 15px;
`;

const ZoomFormLabel = styled(FormLabel)`
  && {
    font-family: ${themes.font.zoomFontFamOne};
    //font-weight: 700;
    font-size: 14px;
    color: ${themes.color.aidsFondsBlue};
  }
`;

const ControlLabel = styled(FormControlLabel)`
  && {
    span:nth-child(2) {
      font-family: ${themes.font.zoomFontFamTwo};
      font-weight: 300;
      font-size: 14px;
    }
  }
`;

const Label = styled.span`
  color: rgba(0, 0, 0, 0.87);
  font-family: ${themes.font.zoomFontFamTwo};
  font-weight: 300;
  font-size: 14px;
`;

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
    }
  }
`;

function VisibilityTab(props) {
  const options = get(props.user, 'groups', []).map(team => ({
    value: team.name,
    label: team.name
  }));
  const classes = useStyles();

  const handleChange = name => event => {
    props.dispatch(
      actions.storeChartDataRequest({
        [name]: event.target.checked
      })
    );
  };

  const handleAllTeamSelect = (reset = false) => {
    const newTeams = !reset ? options.map(o => o.value) : [];
    props.dispatch(
      actions.storeChartDataRequest({
        teams: newTeams
      })
    );
  };

  const handleTeamSelect = (team, selectAll = false) => {
    if (selectAll || team === 'reset') {
      handleAllTeamSelect(
        team === 'reset' || props.chartData.teams.length === options.length
      );
    } else if (team.value) {
      let newTeams = [...props.chartData.teams];
      if (find(newTeams, t => t === team.value)) {
        newTeams = pull(newTeams, team.value);
      } else {
        newTeams.push(team.value);
      }
      props.dispatch(
        actions.storeChartDataRequest({
          teams: newTeams
        })
      );
    }
  };

  /*todo: figure out why the custom styling is resetting to the default styling*/

  return (
    <BaseTab>
      <Box>
        <FormControl component="fieldset">
          <ZoomFormLabel component="legend">
            Chart shared settings
          </ZoomFormLabel>
          <FormGroup>
            <ControlLabel
              control={
                <Switch
                  data-cy="publish-chart-to-public"
                  checked={props.chartData._public}
                  onChange={handleChange('_public')}
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

            <Label>Published with my team</Label>
            <ZoomSelect
              border
              multiple
              selectAll
              // defaultAll
              data={options}
              selectVal={handleTeamSelect}
              placeHolderText="Select team"
              placeHolderNumber={options.length}
              valueSelected={props.chartData.teams}
              arraySelected={props.chartData.teams}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </BaseTab>
  );
}

VisibilityTab.propTypes = propTypes;
VisibilityTab.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData,
    user: state.currentUser.data
  };
};

export default connect(mapStateToProps)(VisibilityTab);
