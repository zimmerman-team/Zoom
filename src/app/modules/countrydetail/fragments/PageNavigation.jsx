/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  aidsFondsBlue,
  aidsFondsRed,
  FragmentContent,
  zoomFontFamOne,
  zoomGreyZero,
  FragmentContainer,
} from 'components/theme/ThemeSheet';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { Box } from 'grommet';

const NavigationContainer = styled(FragmentContainer)`
  position: sticky;
  top: 40px;
  z-index: 1;
  padding: 0;
`;

const PageNavigationContainer = styled(Box)`
  height: 65px;
  align-items: center;
  justify-content: center;
`;

const PageNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const PageNavItem = styled.li`
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  color: ${aidsFondsRed};
  cursor: pointer;

  &:hover {
    color: ${aidsFondsBlue};
  }

  &:after {
    content: '|';
    margin-right: 15px;
    margin-left: 15px;
  }

  &:last-child {
    &:after {
      content: '';
    }
  }
`;
const propTypes = {};
const defaultProps = {};

const PageNavigation = props => {
  return (
    <NavigationContainer
      background={zoomGreyZero}
      data-cy="navbar-country-detail"
    >
      <FragmentContent>
        <PageNavigationContainer>
          <PageNavList>
            {countryDetailMockData.fragments.map(item => (
              <PageNavItem key={item.id}>{item.id}</PageNavItem>
            ))}
          </PageNavList>
        </PageNavigationContainer>
      </FragmentContent>
    </NavigationContainer>
  );
};

PageNavigation.propTypes = propTypes;
PageNavigation.defaultProps = defaultProps;

export default PageNavigation;
