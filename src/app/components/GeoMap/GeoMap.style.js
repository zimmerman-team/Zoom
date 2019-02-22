import styled from 'styled-components';

export const MapContainer = styled.div`
  height: calc(100vh - 40px);
`;

export const NavContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;

export const LegendContainer = styled.div`
  position: fixed;
  width: fit-content;
  left: 10px;
  display: flex;
  flex-direction: column;
`;

export const YearContainer = styled.div`
  position: fixed;
  width: 98%;
  bottom: 12px;
  z-index: 2;
  left: 1%;
`;

export const NavControlContainer = styled.div`
  height: 100px;
`;

export const CountyInfo = styled.div`
  width: 200px;
  z-index: 100;
  border-radius: 5px;
  padding: 15px;
  font-size: 14px;
`;

export const ControlsContainer = styled.div`
  position: fixed;
  top: 54px;
  right: 26px;
  background-color: rgba(239, 239, 239, 0.72);
  z-index: 1;
`;
