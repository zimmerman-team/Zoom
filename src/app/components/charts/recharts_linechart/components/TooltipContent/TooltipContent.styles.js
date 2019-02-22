import styled from 'styled-components';
import Theme from 'theme/Theme';

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

export const Rect = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 5px;
  background-color: ${props => props.theme.color};
`;
