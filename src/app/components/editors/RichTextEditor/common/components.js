import styled from 'styled-components';

export const Button = styled.div`
  cursor: pointer;
  color: ${props =>
    props.reversed
      ? props.active
        ? 'white'
        : '#aaa'
      : props.active
      ? 'black'
      : '#ccc'};
  margin-right: 10px;
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  //background-color: #57c5f7;

  &:hover {
    opacity: 0.4;
  }
`;

export const Menu = styled.div`
  display: flex;
`;

export const Toolbar = styled(Menu)`
  display: flex;
  outline: 1px solid crimson;
`;
