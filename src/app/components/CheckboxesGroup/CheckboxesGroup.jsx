import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from 'components/CheckboxesGroup/CheckBox';
import FormLabel from 'components/RadioButtonGroup/FormLabel';
import { Box } from 'grommet';
import NoSsr from '@material-ui/core/NoSsr';
import {
  zoomFontFamTwo,
  aidsFondsBlue,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';
import styled from 'styled-components';
import RadioButtonGroup from 'components/RadioButtonGroup/RadioButtonGroup';

const ZimmermanFormGroup = styled(FormGroup)`
  && {
    margin: 0;
    height: 70px;
    display: flex;
  }
`;

const propTypes = {
  options: PropTypes.array,
  direction: PropTypes.string,
};
const defaultProps = {
  options: [
    {
      label: 'Lorem ipsum dolor',
      value: 'option1',
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option2',
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option3',
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option4',
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option5',
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option6',
    },
  ],
  direction: 'row',
};

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
    this.props.onChange && this.props.onChange(name);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <NoSsr>
        <FormControl component="fieldset">
          <ZimmermanFormGroup>
            {this.props.options.map(option => (
              <FormLabel
                key={option.value}
                control={
                  <Checkbox
                    // checked={option1}
                    onChange={this.handleChange(option.value)}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </ZimmermanFormGroup>
        </FormControl>
      </NoSsr>
    );
  }
}

CheckboxesGroup.propTypes = propTypes;
CheckboxesGroup.defaultProps = defaultProps;

export default CheckboxesGroup;
