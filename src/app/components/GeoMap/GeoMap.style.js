import styled from 'styled-components';

export const MapContainer = styled.div`
  height: 100%;
  position: relative;
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
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(239, 239, 239, 0.72);
  z-index: 1;
`;
