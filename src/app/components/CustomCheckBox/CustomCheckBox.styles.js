import styled from 'styled-components';

export const EmptyInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CheckBoxStyle = styled.div`
  width: 16px;
  height: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  border: 1px solid #b4bfc9 !important;
  background-color: #ffffff;
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;

export const ComponentBase = styled.div`
  & input:checked ~ div:after {
    content: '\\2714 ';
    position: relative;
    bottom: 5px;
  }
`;
