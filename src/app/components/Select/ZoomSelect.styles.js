import styled from 'styled-components';

export const DropDownItem = styled.div`
  padding: 5px;
  max-width: 277px;
`;

export const ComponentBase = styled.div`
  display: flex;
  & button {
    border-style: none !important;
  }
`;

export const ResetContainer = styled.div`
  display: flex;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;
