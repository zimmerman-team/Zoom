import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 20px 0;
  justify-content: space-around;
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-radius: 50%;
  border-style: solid;
  border-color: ${props => props.color};
  background: ${props => (props.active ? props.color : 'transparent')};
`;

export const Text = styled.div`
  display: flex;
`;

export const StateTooltip = styled.div`
  width: 300px;
  display: flex;
  padding: 20px;
  font-size: 12px;
  overflow: hidden;
  border-radius: 2%;
  line-height: 17px;
  align-items: center;
  background-color: #fff;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;
