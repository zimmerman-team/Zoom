import React from 'react';
import styled from 'styled-components';
import {RadioButton, Grommet, Box} from 'grommet';



class CustomRadioButton extends React.Component {
  state = { selected: undefined };

  onChange = event => this.setState({ selected: event.target.value });

  render() {
    const { selected } = this.state;
    return (
        <Box >
          <RadioButton
            label="Yes"
            name="radio"
            value="c1"
            checked={selected === "c1"}
            onChange={this.onChange}
          />
          <RadioButton
            label="No"
            name="radio"
            value="c2"
            checked={selected === "c2"}
            onChange={this.onChange}
          />

      {/*<ZoomButton*/}
        </Box>

    );
  }
}

export default CustomRadioButton;
