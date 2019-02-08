import styled from 'styled-components';

export const ColorGradient = styled.div`
  min-width: 268px;
  height: 12px;
  margin: 0 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.5) 0%,
    #5961bb 100%
  );
`;
