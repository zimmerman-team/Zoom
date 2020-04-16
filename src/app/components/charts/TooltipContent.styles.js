import styled from 'styled-components';
import Theme from 'app/theme/Theme';

export const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: ${Theme.color.aidsFondsWhite};
`;

export const Title = styled.div`
  font-size: 16px;
`;

export const Row = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  flex-direction: row;
  white-space: pre-wrap;
`;

export const ToolTipValue = styled.span`
  font-weight: bold;
`;

export const ToolTipText = styled.div`
  max-width: 250px;
`;

export const Rect = styled.div`
  width: 14px;
  height: 14px;
  margin: 6px 5px auto 0;
  background-color: ${props => props.theme.color};
`;
