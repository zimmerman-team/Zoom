import { YearContainer } from 'components/CustomYearSelector/CustomYearSelector.style';
import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const NavContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 10px;
`;

export const LegendContainer = styled.div`
  position: absolute;
  left: 11px;
  top: 2px;
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

export const NavControlContainer = styled.div`
  height: 100px;
`;

export const CountyInfo = styled.div`
  z-index: 100;
  width: 200px;
  padding: 15px;
  font-size: 14px;
  border-radius: 5px;
`;

export const ControlsContainer = styled.div`
  position: relative;
  z-index: 1;
  background-color: rgba(239, 239, 239, 0.72);
  width: fit-content;
  margin: 16px 11px 0 auto;
`;

export const GeoYearContainer = styled(YearContainer)`
  top: calc(100% - 186px);
  margin: 0 auto;
  z-index: 1;
`;
