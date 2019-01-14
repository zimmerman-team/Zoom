/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select, Box, RangeInput, Tabs, Tab, Text } from 'grommet';

// import RichtTabTitle from './comps/RichtTabTitle';
import { CircleInformation } from 'grommet-icons';
import DataExplorePane from 'components/DataExplorePane/DataExplorePanel';

const ComponentBase = styled.div`
  outline: 1px solid darkseagreen;
  width: 330px;
  height: 780px;
`;

const ToolNavigation = styled.div`
  outline: 1px solid darkgoldenrod;
  height: 40px;
  //display: flex;
`;

const ToolFragment = styled.div`
  outline: 1px solid green;
  height: 400px;
`;
const FragmentTitle = styled.span``;
const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

const RichTabTitle = ({ icon, label }) => (
  <Box
    direction="row"
    align="center"
    gap="xsmall"
    margin="none"
    background="red"
  >
    {icon}
  </Box>
);

class CountryFocusModule extends React.Component {
  render() {
    return (
      <ComponentBase>
        <Tabs flex>
          <Tab
            title={<RichTabTitle icon={<CircleInformation color="white" />} />}
          >
            <DataExplorePane />
          </Tab>
          <Tab
            title={<RichTabTitle icon={<CircleInformation color="white" />} />}
          >
            ipsume 2
          </Tab>
          <Tab
            title={<RichTabTitle icon={<CircleInformation color="white" />} />}
          >
            ipsum 3
          </Tab>
          <Tab
            title={<RichTabTitle icon={<CircleInformation color="white" />} />}
          >
            ipsum 4
          </Tab>
          <Tab
            title={<RichTabTitle icon={<CircleInformation color="white" />} />}
          >
            ipsum 5
          </Tab>
          <Tab
            title={<RichTabTitle icon={<CircleInformation color="white" />} />}
          >
            6
          </Tab>
        </Tabs>
        <ToolFragment />
      </ComponentBase>
    );
  }
}

CountryFocusModule.propTypes = propTypes;
CountryFocusModule.defaultProps = defaultProps;

export default CountryFocusModule;
