import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { Box } from 'grommet';
import NoSsr from '@material-ui/core/NoSsr';
import {
  zoomFontFamTwo,
  aidsFondsBlue,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';
import styled from 'styled-components';

const ZimmermanCheckbox = styled(Checkbox)`
  && {
    padding: 0;
    margin-right: 5px;
    svg {
      fill: gray;
      //width: 23px;
      //height: 23px;
    }
  }
`;

const ZimmermanLabel = styled(FormControlLabel)`
  && {
    margin: 0;
    margin-bottom: 10px;
    span {
      font-family: ${zoomFontFamTwo};
      line-height: 1;
      color: black;
      font-size: 14px;
    }
  }
`;

const ZimmermanFormGroup = styled(FormGroup)`
  && {
    margin: 0;
    height: 70px;
    display: flex;
  }
`;

class CheckboxesGroup extends React.Component {
  state = {
    option1: true,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { option1, option2, option3, option4, option5, option6 } = this.state;
    const error =
      [option1, option2, option3, option3, option4, option5, option6].filter(
        v => v,
      ).length !== 2;

    return (
      <NoSsr>
        <FormControl component="fieldset">
          <ZimmermanFormGroup>
            <ZimmermanLabel
              control={
                <ZimmermanCheckbox
                  checked={option1}
                  onChange={this.handleChange('option1')}
                  value="option1"
                  disableRipple
                />
              }
              label="Simple random samplimng"
            />
            <ZimmermanLabel
              control={
                <ZimmermanCheckbox
                  checked={option2}
                  onChange={this.handleChange('option2')}
                  value="option2"
                  disableRipple
                />
              }
              label="Systematic sampling"
            />
            <ZimmermanLabel
              control={
                <ZimmermanCheckbox
                  checked={option3}
                  onChange={this.handleChange('option3')}
                  value="option3"
                  disableRipple
                />
              }
              label="Systematic sampling"
            />
            <ZimmermanLabel
              control={
                <ZimmermanCheckbox
                  checked={option4}
                  onChange={this.handleChange('option4')}
                  value="option4"
                  disableRipple
                />
              }
              label="Systematic sampling"
            />
            <ZimmermanLabel
              control={
                <ZimmermanCheckbox
                  checked={option5}
                  onChange={this.handleChange('option5')}
                  value="option5"
                  disableRipple
                />
              }
              label="Systematic sampling"
            />
            <ZimmermanLabel
              control={
                <ZimmermanCheckbox
                  checked={option6}
                  onChange={this.handleChange('option6')}
                  value="option6"
                  disableRipple
                />
              }
              label="Systematic sampling"
            />
          </ZimmermanFormGroup>
        </FormControl>
      </NoSsr>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default CheckboxesGroup;
