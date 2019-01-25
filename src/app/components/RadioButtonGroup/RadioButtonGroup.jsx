import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';

import RadioButton from 'components/RadioButtonGroup/RadioButton';
import FormLabel from 'components/RadioButtonGroup/FormLabel';
import RadioGroup from 'components/RadioButtonGroup/RadioGroup';

const propTypes = {
  options: PropTypes.array,
  direction: PropTypes.string,
};
const defaultProps = {
  options: [
    {
      label: 'yes',
      value: 'Yes',
    },
    {
      label: 'no',
      value: 'No',
    },
    {
      label: 'maybe',
      value: 'Maybe',
    },
  ],
  direction: 'row',
};

class RadioButtonGroup extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Gender"
          name="gender1"
          value={this.state.value}
          onChange={this.handleChange}
          direction={this.props.direction}
        >
          {this.props.options.map(option => (
            <FormLabel
              key={option.value}
              value={option.value}
              control={<RadioButton />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;

export default RadioButtonGroup;