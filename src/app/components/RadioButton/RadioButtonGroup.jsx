import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RadioButton, Grommet, Box } from 'grommet';

const propTypes = {
  options: PropTypes.array,
  direction: PropTypes.string,
};
const defaultProps = {
  options: [
    {
      label: 'No',
      value: 'option1',
    },
    {
      label: 'Yes',
      value: 'option2',
    },
  ],

  direction: 'row',
};

class RadioButtonGroup extends React.Component {
  state = { selected: undefined };

  onChange = event => this.setState({ selected: event.target.value });

  render() {
    const { selected } = this.state;
    return (
      <Box direction={this.props.direction}>
        {this.props.options.map(option => (
          <RadioButton
            label={option.label}
            name="radio"
            value={option.value}
            checked={selected === option.value}
            onChange={this.onChange}
          />
        ))}
      </Box>
    );
  }
}

RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;

export default RadioButtonGroup;
