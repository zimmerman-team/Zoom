import styled from 'styled-components';
import { Box } from 'grommet/components/Box';

export const ControlPanelContainer = styled.div`
  position: fixed;
  right: 0;
  top: 40px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  padding-top: 20px;
  height: calc(100vh - 40px);
`;

export const PanelDuo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
`;

export const ModuleContainer = styled(Box)`
  width: 100vw;
  height: calc(100vh - 40px);
`;
