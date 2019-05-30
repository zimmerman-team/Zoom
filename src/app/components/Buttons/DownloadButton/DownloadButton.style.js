import styled from 'styled-components';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  vertical-align: -5px;
  display: inline-block;
  height: 22px;
  padding: 12px;
  border-radius: 50%;

  g {
    fill: ${theme.color.tableChartIconGreyOpacity};
  }

  &:hover {
    cursor: pointer;
    background-color: ${theme.color.tableToolHoverGeyOpacity};
    g {
      cursor: pointer;
      fill: ${theme.color.aidsFondsBlue};
    }
  }
`;
