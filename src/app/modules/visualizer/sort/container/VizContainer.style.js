import styled from 'styled-components';

export const ComponentBase = styled.div`
  background-color: white;

  //width: calc(100vw - 320px);
  //height: calc(100vh - 40px);
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  align-items: center;
  justify-content: ${props => props.mode};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 100%;
  background-color: #96dbfa;
  height: ${props => props.height};
`;

export const PreviewTextContainer = styled.div`
  display: ${props => props.mode};
`;

export const LineYearContainer = styled.div`
  width: calc(100% - 40px);
`;

export const FragmentBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* todo: solve this in a cleaner manner */
  padding-top: ${props => props.paddingTop || 'initial'};
  background-color: white;
  overflow-y: auto;
`;

export const ChartContainer = styled.div`
  margin: auto;
  padding-top: 40px;
`;
