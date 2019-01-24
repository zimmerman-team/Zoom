import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Box } from 'grommet';
import NoSsr from '@material-ui/core/NoSsr';
import {
  zoomFontFamTwo,
  aidsFondsBlue,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';
import styled from 'styled-components';

const ZimmermanRadio = styled(Radio)`
  && {
    padding: 0;
    margin-right: 5px;
    svg {
      fill: gray;
    }
  }
`;

const ZimmermanLabel = styled(FormControlLabel)`
  && {
    margin: 0;
    margin-bottom: 10px;
    margin-right: 40px;
    span {
      font-family: ${zoomFontFamTwo};
      line-height: 1;
      color: black;
      font-size: 14px;
    }
  }
`;

const ZimmermanRadioGroup = styled(RadioGroup)`
  && {
    margin: 0;
    display: flex;
    flex-direction: row;
  }
`;

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <NoSsr>
        <FormControl component="fieldset">
          <ZimmermanRadioGroup
            aria-label="Gender"
            name="gender1"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <ZimmermanLabel
              value="female"
              control={<ZimmermanRadio disableRipple />}
              label="Yes"
            />
            <ZimmermanLabel
              value="male"
              control={<ZimmermanRadio disableRipple />}
              label="No"
            />
            <ZimmermanLabel
              value="other"
              control={<ZimmermanRadio disableRipple />}
              label="Don't know"
            />
          </ZimmermanRadioGroup>
        </FormControl>
      </NoSsr>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default RadioButtonsGroup;
