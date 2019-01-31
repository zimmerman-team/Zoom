import React, { Component, createRef, PureComponent } from 'react';
import { css } from 'styled-components';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customRoundedTheme = deepMerge(grommet, {
  global: {
    control: {
      border: {
        radius: '0',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '14px',
    },
  },
  text: {
    medium: '14px',
  },
  textInput: {
    extend: 'padding: 0 12px;',
  },
  select: {
    control: {
      extend: css`
        padding: 0;
        height: 40px;
        background-color: #efefef;
        padding: 0;
        margin: 0;
        border: none;
      `,
    },
  },
});

const defaultOptions = [];
const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  });
}

class SearchSelect extends Component {
  state = {
    options: defaultOptions,
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={customRoundedTheme}>
        <Box>
          <Select
            placeholder="Connect to Zoom data source"
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
            onClose={() => this.setState({ options: defaultOptions })}
            onSearch={text => {
              const exp = new RegExp(text, 'i');
              this.setState({
                options: defaultOptions.filter(o => exp.test(o)),
              });
            }}
          />
        </Box>
      </Grommet>
    );
  }
}

export default SearchSelect;
