import styled from 'styled-components';

export const MapContainer = styled.div`
  height: 100vh;
  //width: 100vw;
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
  position: absolute;
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
