/* base */
import React from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';
import Tab from 'components/ToolPanel/common/Tab';

export default styled(props => (
  <NoSsr>
    <Tabs
      TabIndicatorProps={{
        style: {
          backgroundColor: theme.color.aidsFondsBlue,
          transition: 'none',
          width: '49px',
        },
      }}
      TabsProps={{
        style: {
          selectedBackgroundColor: theme.color.aidsFondsBlue,
        },
      }}
      {...props}
    />
  </NoSsr>
))`
  && {
    padding: 0;
    margin: 0;
    transition: none;
  }
`;
