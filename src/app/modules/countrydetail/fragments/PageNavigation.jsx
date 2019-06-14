/* base */
import React from 'react';
import styled from 'styled-components';
import { FragmentContainer, FragmentContent } from 'components/sort/Fragments';
import theme from 'theme/Theme';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { Box } from 'grommet/components/Box';
import { scroller } from 'react-scroll';

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
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  color: ${theme.color.aidsFondsRed};
  cursor: pointer;

  &:hover {
    color: ${theme.color.aidsFondsBlue};
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
  const handleClick = elName => {
    scroller.scrollTo(elName, {
      duration: 1000,
      delay: 100,
      smooth: true,
      offset: -105 // Scrolls to element + 50 pixels down the page
    });
  };

  return (
    <NavigationContainer
      background={theme.color.zoomGreyZero}
      data-cy="navbar-country-detail"
    >
      <FragmentContent>
        <PageNavigationContainer>
          <PageNavList>
            {countryDetailMockData.fragments.map(item => (
              <PageNavItem
                onClick={() => handleClick(item.id)}
                key={item.id}
                data-cy={`navbar-item-${item.id}`}
              >
                {item.id}
              </PageNavItem>
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
