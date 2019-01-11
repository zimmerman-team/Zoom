/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grommet, Stack, Box, Text, RangeSelector } from 'grommet';
import { grommet } from 'grommet/themes';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
  direction: PropTypes.string,
};
const defaultProps = {
  data: undefined,
  direction: 'horizontal',
};

class YearSelector extends React.Component {
  state = { values: [15, 17] };

  onChange = values => this.setState({ values });

  render() {
    return (
      <ComponentBase>
        <Grommet theme={grommet}>
          <Box align="center" pad="large">
            <Stack>
              <Box
                direction={
                  this.props.direction === 'vertical' ? 'column' : 'row'
                }
                justify="between"
              >
                {[14, 15, 16, 17, 18, 19].map(value => (
                  <Box
                    key={value}
                    width="xxsmall"
                    height="xxsmall"
                    align="center"
                    pad="small"
                    border={false}
                  >
                    <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
                  </Box>
                ))}
              </Box>
              <RangeSelector
                direction={this.props.direction}
                min={10}
                max={20}
                size="full"
                values={this.state.values}
                onChange={this.onChange}
              />
            </Stack>
          </Box>
        </Grommet>
      </ComponentBase>
    );
  }
}

YearSelector.propTypes = propTypes;
YearSelector.defaultProps = defaultProps;

export default YearSelector;
